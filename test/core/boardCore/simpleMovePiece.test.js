import {BoardCore} from "@/core/boardCore.js";
import {Panel} from "@/core/panel.js";
import {Piece} from "@/core/piece.js";

describe("BoardCore.simpleMovePiece", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);
    });

    test("should move a piece from fromPanel to toPanel", ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
        const piece = new Piece(null, {char: "歩"}, {});
        fromPanel.piece = piece;

        board.simpleMovePiece(fromPanel, toPanel);

        expect(toPanel.piece).toBe(piece);
        expect(toPanel.piece.isMoved).toBe(true);
        expect(fromPanel.piece).toBeNull();
    });

    test("should not move if fromPanel is not a Panel instance", ()=>{
        const fromPanel = null;
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
        const piece = new Piece(null, {char: "歩"}, {});
        toPanel.piece = piece; // toPanel に駒を置いておく

        board.simpleMovePiece(fromPanel, toPanel);

        expect(toPanel.piece).toBe(piece); // 駒が移動していないことを確認
    });

    test("should not move if toPanel is not a Panel instance", ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = null;
        const piece = new Piece(null, {char: "歩"}, {});
        fromPanel.piece = piece;

        board.simpleMovePiece(fromPanel, toPanel);

        expect(fromPanel.piece).toBe(piece); // 駒が移動していないことを確認
    });
});
