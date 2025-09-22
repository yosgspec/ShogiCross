import {BoardCore} from "@/core/boardCore.js";
import {Panel} from "@/core/panel.js";
import {Piece} from "@/core/piece.js";
import {vi} from "vitest";

describe("BoardCore.putNewPiece", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);
        board.draw = vi.fn(); // draw メソッドをモック
        board.autoDrawing = true;
    });

    test("should put a new piece on the board", ()=>{
        const pieceChar = "歩";
        const pX = 0;
        const pY = 0;
        const deg = 0;

        board.putNewPiece(pieceChar, pX, pY, deg);

        const panel = board.field[pY][pX];
        expect(panel.piece).toBeInstanceOf(Piece);
        expect(panel.piece.char).toBe(pieceChar);
        expect(panel.piece.deg).toBe(deg);
        expect(board.draw).toHaveBeenCalled();
    });

    test("should overwrite an existing piece", ()=>{
        const existingPiece = new Piece(null, {char: "金"}, {});
        board.field[0][0].piece = existingPiece;

        const newPieceChar = "歩";
        const pX = 0;
        const pY = 0;
        const deg = 0;

        board.putNewPiece(newPieceChar, pX, pY, deg);

        const panel = board.field[pY][pX];
        expect(panel.piece.char).toBe(newPieceChar);
        expect(panel.piece).not.toBe(existingPiece); // インスタンスが置き換わっていることを確認
    });

    test("should apply displayPtn and isMoved options", ()=>{
        const pieceChar = "歩";
        const pX = 0;
        const pY = 0;
        const deg = 0;
        const options = {displayPtn: 1, isMoved: true};

        board.putNewPiece(pieceChar, pX, pY, deg, options);

        const panel = board.field[pY][pX];
        expect(panel.piece.displayPtn).toBe(options.displayPtn);
        expect(panel.piece.isMoved).toBe(options.isMoved);
    });

    test("should not call draw if autoDrawing is false", ()=>{
        board.autoDrawing = false;
        board.draw.mockClear(); // draw の呼び出しをリセット

        board.putNewPiece("歩", 0, 0, 0);
        expect(board.draw).not.toHaveBeenCalled();
    });
});
