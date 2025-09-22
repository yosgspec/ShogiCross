import {BoardCore} from "@/core/boardCore.js";

describe("BoardCore.degNormal", ()=>{
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

    test("should normalize positive degrees within 0-359 range", ()=>{
        expect(board.degNormal(0)).toBe(0);
        expect(board.degNormal(90)).toBe(90);
        expect(board.degNormal(180)).toBe(180);
        expect(board.degNormal(270)).toBe(270);
        expect(board.degNormal(359)).toBe(359);
    });

    test("should normalize negative degrees to positive within 0-359 range", ()=>{
        expect(board.degNormal(-90)).toBe(270);
        expect(board.degNormal(-180)).toBe(180);
        expect(board.degNormal(-270)).toBe(90);
        expect(board.degNormal(-360)).toBe(0);
    });

    test("should normalize degrees greater than 359 to within 0-359 range", ()=>{
        expect(board.degNormal(360)).toBe(0);
        expect(board.degNormal(450)).toBe(90);
        expect(board.degNormal(720)).toBe(0);
    });

    test("should normalize degrees with player ID (1-3) to 0-359 range", ()=>{
        // playerLen が 2 の場合
        board.playerLen = 2;
        expect(board.degNormal(1)).toBe(180); // 1 * 360 / 2
        expect(board.degNormal(2)).toBe(0);   // 2 * 360 / 2 = 360 -> 0

        // playerLen が 4 の場合
        board.playerLen = 4;
        expect(board.degNormal(1)).toBe(90);  // 1 * 360 / 4
        expect(board.degNormal(2)).toBe(180); // 2 * 360 / 4
        expect(board.degNormal(3)).toBe(270); // 3 * 360 / 4
        expect(board.degNormal(4)).toBe(4);   // 4 * 360 / 4 = 360 -> 0
    });
});
