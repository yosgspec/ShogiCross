import { describe, test, expect, vi, beforeEach } from 'vitest';
import boardsData from '../../src/ShogiCross/data/boards.js';
import canvasFontData from '../../src/ShogiCross/data/canvasFont.js';
import gameSoftData from '../../src/ShogiCross/data/gameSoft.js';
import gamesData from '../../src/ShogiCross/data/games.js';
import panelsData from '../../src/ShogiCross/data/panels.js';
import piecesData from '../../src/ShogiCross/data/pieces.js';
import pieceRangeData from '../../src/ShogiCross/data/pieceRange.js';
import pieceCostData from '../../src/ShogiCross/data/pieceCost.js';

vi.mock('../../src/ShogiCross/core/json/xhr.js', () => ({
    importJson: vi.fn((name) => {
        switch (name) {
            case 'boards': return boardsData;
            case 'canvasFont': return canvasFontData;
            case 'gameSoft': return gameSoftData;
            case 'games': return gamesData;
            case 'panels': return panelsData;
            case 'pieces': return piecesData;
            case 'pieceRange': return pieceRangeData;
            case 'pieceCost': return pieceCostData;
            default: return {};
        }
    }),
    json: {},
}));

import { Board } from "@/ShogiCross/lib.js";

describe("simMovePiece / undoSimMovePiece", () => {
    let board;

    beforeEach(async () => {
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
        board = new Board(canvas, option);
        await board.init();
    });
    let board;

    beforeEach(() => {
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
        board = new Board(canvas, option);
    });



    const getBoardStateText = (b) => b.getPiecesText("bod");

    test("should handle a capture move", async () => {
        const bod = `
後手の持駒：
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|・・・・・・・・・・・・・・|一
|・・・・v香・・・・・・・・|二
|・・・・ 歩・・・・・・・・|三
|・・・・・・・・・・・・・・|四
|・・・・・・・・・・・・・・|五
|・・・・・・・・・・・・・・|六
|・・・・・・・・・・・・・・|七
|・・・・・・・・・・・・・・|八
|・・・・・・・・・・・・・・|九
+---------------------------+
先手の持駒：
`;
        board.setPiecesText(bod);
        const fromPanel = board.field[2][2]; // 7三の歩
        const toPanel = board.field[1][2];   // 7二の香
        const originalState = getBoardStateText(board);

        const move = await board.simMovePiece(fromPanel, toPanel);

        expect(board.field[1][2].piece.char).toBe("歩");

        board.undoSimMovePiece(move);

        expect(getBoardStateText(board)).toBe(originalState);
    });

    test("should handle a simple move", async () => {
        const bod = `
後手の持駒：
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|・・・・・・・・・・・・・・|一
|・・・・・・・・・・・・・・|二
|・・・・ 歩・・・・・・・・|三
|・・・・・・・・・・・・・・|四
|・・・・・・・・・・・・・・|五
|・・・・・・・・・・・・・・|六
|・・・・・・・・・・・・・・|七
|・・・・・・・・・・・・・・|八
|・・・・・・・・・・・・・・|九
+---------------------------+
先手の持駒：
`;
        board.setPiecesText(bod);
        const fromPanel = board.field[2][2]; // 7三の歩
        const toPanel = board.field[1][2];   // 7二
        const originalState = getBoardStateText(board);

        const move = await board.simMovePiece(fromPanel, toPanel);

        expect(board.field[1][2].piece.char).toBe("と");

        board.undoSimMovePiece(move);

        expect(getBoardStateText(board)).toBe(originalState);
    });

    test("should handle capturing a promoted piece", async () => {
        const bod = `
後手の持駒：
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|・・・・・・・・・・・・・・|一
|・・・・v圭・・・・・・・・|二
|・・・・ 桂・・・・・・・・|三
|・・・・・・・・・・・・・・|四
|・・・・・・・・・・・・・・|五
|・・・・・・・・・・・・・・|六
|・・・・・・・・・・・・・・|七
|・・・・・・・・・・・・・・|八
|・・・・・・・・・・・・・・|九
+---------------------------+
先手の持駒：
`;
        board.setPiecesText(bod);
        const fromPanel = board.field[2][2]; // 7三の桂
        const toPanel = board.field[1][2];   // 7二の圭
        const originalState = getBoardStateText(board);

        const move = await board.simMovePiece(fromPanel, toPanel);

        board.undoSimMovePiece(move);

        expect(getBoardStateText(board)).toBe(originalState);
    });
});