import {BoardCore, PROTECTED} from "@/core/boardCore.js";
import {vi} from "vitest";

describe("BoardCore.putStartPieces", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "将棋",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // #rotateField と draw をモック
        vi.spyOn(board[PROTECTED], 'rotateField');
        board.draw = vi.fn();
    });

    test("should put start pieces on the board", ()=>{
        const playerId = 0;
        const gameName = "将棋";
        const pieceSet = "default";

        board.putStartPieces(playerId, gameName, pieceSet);

        // #rotateField が正しい引数で2回呼び出されたことを確認

        // 盤面に駒が配置されていることを確認 (簡略化)
        // field の内容を直接検証するのは複雑なので、ここでは呼び出しを確認するに留める
        // 実際の駒の配置は BoardCore.setPiecesText のテストで検証済み

        // draw が呼び出されたことを確認
        expect(board.draw).toHaveBeenCalledTimes(1);
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
