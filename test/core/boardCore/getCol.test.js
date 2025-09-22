import {BoardCore} from "@/core/boardCore.js";

describe("BoardCore.getCol", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);
        board.xLen = 5; // テスト用に盤面サイズを設定
        board.yLen = 5;
    });

    test("should return the correct column for 0 degrees", ()=>{
        expect(board.getCol(0, 0, 0)).toBe(0);
        expect(board.getCol(4, 4, 0)).toBe(4);
    });

    test("should return the correct column for 90 degrees", ()=>{
        expect(board.getCol(0, 0, 90)).toBe(4); // yLen - 1 - pY
        expect(board.getCol(4, 4, 90)).toBe(0);
    });

    test("should return the correct column for 180 degrees", ()=>{
        expect(board.getCol(0, 0, 180)).toBe(4); // xLen - 1 - pX
        expect(board.getCol(4, 4, 180)).toBe(0);
    });

    test("should return the correct column for 270 degrees", ()=>{
        expect(board.getCol(0, 0, 270)).toBe(0); // pY
        expect(board.getCol(4, 4, 270)).toBe(4);
    });

    test("should apply offsetDeg correctly", ()=>{
        // 0度 + 90度オフセット = 90度として計算
        expect(board.getCol(0, 0, 0, 90)).toBe(4);
        // 90度 + 90度オフセット = 180度として計算
        expect(board.getCol(0, 0, 90, 90)).toBe(4);
    });

    test("should return -1 for invalid degrees", ()=>{
        expect(board.getCol(0, 0, 45)).toBe(-1);
    });
});
