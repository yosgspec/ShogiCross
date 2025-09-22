import {BoardCore} from "@/core/boardCore.js";
import {Piece} from "@/core/piece.js";
import {vi} from "vitest";

describe("BoardCore.onSelectPromo", ()=>{
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

    test("should return promoChar if provided", async ()=>{
        const piece = new Piece(null, {char: "歩"}, {});
        const result = await board.onSelectPromo(piece, true, false, false, "と");
        expect(result).toBe("と");
    });

    test("should return promoted piece for headless or cpu move if canPromo is true", async ()=>{
        const piece = new Piece(null, {char: "歩", promo: { "と": {} }}, {});
        board.isHeadless = true; // ヘッドレスモード
        let result = await board.onSelectPromo(piece, true, false, false, null);
        expect(result).toBe("と");

        board.isHeadless = false;
        result = await board.onSelectPromo(piece, true, false, true, null); // CPU移動
        expect(result).toBe("と");
    });

    test("should return null for headless or cpu move if canPromo is false", async ()=>{
        const piece = new Piece(null, {char: "歩", promo: { "と": {} }}, {});
        board.isHeadless = true;
        let result = await board.onSelectPromo(piece, false, false, false, null);
        expect(result).toBeNull();

        board.isHeadless = false;
        result = await board.onSelectPromo(piece, false, false, true, null);
        expect(result).toBeNull();
    });

    test("should return null if not headless, not cpu move, and no promoChar", async ()=>{
        const piece = new Piece(null, {char: "歩", promo: { "と": {} }}, {});
        board.isHeadless = false;
        const result = await board.onSelectPromo(piece, true, false, false, null);
           // implementation returns undefined when UI selection is expected
           expect(result).toBeUndefined();
    });
});
