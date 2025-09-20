import { describe, test, expect, vi, beforeEach } from 'vitest';


vi.mock('../../src/ShogiCross/core/json/xhr.js', async () => {
    const boardsData = await import('../../src/ShogiCross/data/boards.js');
    const canvasFontData = await import('../../src/ShogiCross/data/canvasFont.js');
    const gameSoftData = await import('../../src/ShogiCross/data/gameSoft.js');
    const gamesData = await import('../../src/ShogiCross/data/games.js');
    const panelsData = await import('../../src/ShogiCross/data/panels.js');
    const piecesData = await import('../../src/ShogiCross/data/pieces.js');
    const pieceRangeData = await import('../../src/ShogiCross/data/pieceRange.js');
    const pieceCostData = await import('../../src/ShogiCross/data/pieceCost.js');
    return {
        json: {
            boards: boardsData.default,
            canvasFont: canvasFontData.default,
            gameSoft: gameSoftData.default,
            games: gamesData.default,
            panels: panelsData.default,
            pieces: piecesData.default,
            pieceRange: pieceRangeData.default,
            pieceCost: pieceCostData.default,
        },
    };
});

import { Board } from "@/ShogiCross/lib.js";

describe("Record redo/undo", () => {


    const createBoard = async (bod) => {
        const option = {
            playBoard: "将棋",
            playerOptions: [ { gameName: "将棋", pieceSet: "p4" }, { gameName: "将棋", pieceSet: "p4" } ],
            isHeadless: false,
            autoDrawing: false,
        };
        const canvas = document.createElement('canvas');
        canvas.getContext = vi.fn(() => ({
            clearRect: vi.fn(),
            fillRect: vi.fn(),
            strokeRect: vi.fn(),
            restore: vi.fn(),
            save: vi.fn(),
            translate: vi.fn(),
            beginPath: vi.fn(),
            closePath: vi.fn(),
            stroke: vi.fn(),
            moveTo: vi.fn(),
            rotate: vi.fn(),
            lineTo: vi.fn(),
            fill: vi.fn(),
            measureText: vi.fn(() => ({ width: 0 })),
            fillText: vi.fn(),
        }));
        const board = new Board(canvas, option);
        
        await new Promise(resolve => setTimeout(resolve, 500)); // 初期化を待つ

        if (bod) {
            board.setPiecesText(bod);
            console.log("Field after setPiecesText:", board.field.map(row => row.map(p => p.piece ? p.piece.char : ' ').join('')));
        }
        return board;
    };

    const getBoardStateText = (board) => board.getPiecesText("bod");

    test("should handle basic undo and redo using moveState", async () => {
        const board = await createBoard(`
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
+---------------------------+
先手の持駒：
`);
        const state0 = getBoardStateText(board);

        // 1手目
        await board.movePiece(board.field[2][6], board.field[1][6]); // ▲7三歩 -> 7二
        const state1 = getBoardStateText(board);
        console.log("State 1:", state1);
        expect(state0).not.toBe(state1);
        expect(board.record.records[1].moveState).not.toBeNull();

        // 2手目
        await board.movePiece(board.field[3][6], board.field[4][6]); // ▽7四歩 -> 7五
        const state2 = getBoardStateText(board);
        expect(state1).not.toBe(state2);

        // Undo 1
        board.record.undo();
        expect(getBoardStateText(board)).toBe(state1);

        // Undo 2
        board.record.undo();
        expect(getBoardStateText(board)).toBe(state0);

        // Redo 1
        board.record.redo();
        expect(getBoardStateText(board)).toBe(state1);

        // Redo 2
        board.record.redo();
        expect(getBoardStateText(board)).toBe(state2);
    });

    test("should prevent redo after a new move follows an undo", async () => {
        const board = await createBoard(`
後手の持駒：
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香v桂v銀v金v玉v金v銀v桂v香|一
|・・v飛・・・・・・v角・・|二
|v歩v歩v歩v歩v歩v歩v歩v歩v歩|三
|・・・・・・・・・・・・・・|四
|・・・・・・・・・・・・・・|五
|・・・・・・・・・・・・・・|六
| 歩 歩 歩 歩 歩 歩 歩 歩 歩|七
|・・ 角・・・・・・ 飛・・|八
| 香 桂 銀 金 玉 金 銀 桂 香|九
+---------------------------+
先手の持駒：
`);
        
        // 1手目
        await board.movePiece(board.field[2][6], board.field[1][6]); // ▲7三歩 -> 7二
        const state1 = getBoardStateText(board);

        // undo
        board.record.undo();
        
        // 別の手を指す
        await board.movePiece(board.field[2][6], board.field[3][6]); // ▲7三歩 -> 7四
        const state2_new = getBoardStateText(board);
        expect(state2_new).not.toBe(state1);

        // redoを試みる (何も起こらないはず)
        const currentState = getBoardStateText(board);
        board.record.redo();
        expect(getBoardStateText(board)).toBe(currentState);
    });

    test("should fallback to restoreField for old record format", async () => {
        const board = await createBoard();
        const originalState = getBoardStateText(board);

        // 手動でmoveStateのない棋譜を作成
        const board2 = await createBoard(originalState);
        // movePieceを使わずに盤面を変更
        const fromPanel = board2.field[6][0]; // 仮の駒（初期配置に依存）
        const toPanel = board2.field[5][0];
        if (!fromPanel.piece) fromPanel.piece = board.pieces["歩"].clone();
        board2.simpleMovePiece(fromPanel, toPanel);
        const state1_legacy = getBoardStateText(board2);

        board.record.records = [
            { fieldText: originalState, moveState: null },
            { fieldText: state1_legacy, moveState: null },
        ];
        board.record.turn = 1;

        // undoを実行（フォールバック処理が呼ばれるはず）
        board.record.undo();

        expect(getBoardStateText(board)).toBe(originalState);
    });
});
