import {BoardCore, PROTECTED} from "@/core/boardCore.js";
import {vi} from "vitest";

describe("BoardCore.putStartPieces", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "将棋",
        piecesText: "",
        // Construct headless to avoid Record.add calling getPiecesText
        // during BoardCore construction which may access panel.text
        // that is not initialized in some test environments.
        isHeadless: true,
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // #rotateField と draw をモック
        // Ensure we can observe calls to the protected rotateField
        if (board[PROTECTED] && typeof board[PROTECTED].rotateField === 'function') {
            const origRotate = board[PROTECTED].rotateField;
            board[PROTECTED].rotateField = vi.fn(function(...args){
                return origRotate.apply(this, args);
            });
        }
        // Use spyOn for draw so it will wrap any existing method rather than replacing
        if (!board.draw || !board.draw._isMockFunction) {
            board.draw = vi.fn();
        } else {
            vi.spyOn(board, 'draw');
        }
    });

    test("should put start pieces on the board", ()=>{
        const playerId = 0;
        const gameName = "将棋";
        const pieceSet = "default";

        board.putStartPieces(playerId, gameName, pieceSet);

        // 簡易検証: putStartPieces 後に少なくとも1つのパネルに駒が配置されていること
        board.putStartPieces(playerId, gameName, pieceSet);
        const anyPiece = board.field.some(row=>row.some(panel=>panel.piece));
        expect(anyPiece).toBe(true);
    });

    test("should throw error for unknown gameName", ()=>{
        const playerId = 0;
        const gameName = "unknownGame";
        const pieceSet = "default";

        expect(()=>board.putStartPieces(playerId, gameName, pieceSet)).toThrow(`Cannot read properties of undefined (reading 'position')`);
    });

    test("should throw error for unknown pieceSet", ()=>{
        const playerId = 0;
        const gameName = "将棋";
        const pieceSet = "unknownPieceSet";

        expect(()=>board.putStartPieces(playerId, gameName, pieceSet)).toThrow(`games["将棋"].position["9"]["unknownPieceSet"]is null.`);
    });

    test("should not call draw if autoDrawing is false", ()=>{
        board.autoDrawing = false;
        board.draw.mockClear();

        board.putStartPieces(0, "将棋", "default");
        expect(board.draw).not.toHaveBeenCalled();
    });
});
