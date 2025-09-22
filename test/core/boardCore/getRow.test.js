import {BoardCore} from "@/core/boardCore.js";

describe("BoardCore.getRow", ()=>{
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

    test("should return the correct row for 0 degrees", ()=>{
        expect(board.getRow(0, 0, 0)).toBe(4); // yLen - 1 - pY (isReverse=true の場合)
        expect(board.getRow(4, 4, 0)).toBe(0);
        expect(board.getRow(0, 0, 0, 0, false)).toBe(0); // isReverse=false の場合
        expect(board.getRow(4, 4, 0, 0, false)).toBe(4);
    });

    test("should return the correct row for 90 degrees", ()=>{
        expect(board.getRow(0, 0, 90)).toBe(0); // pX
        expect(board.getRow(4, 4, 90)).toBe(4);
    });

    test("should return the correct row for 180 degrees", ()=>{
        expect(board.getRow(0, 0, 180)).toBe(0); // pY (isReverse=true の場合)
        expect(board.getRow(4, 4, 180)).toBe(4);
        expect(board.getRow(0, 0, 180, 0, false)).toBe(4); // isReverse=false の場合
        expect(board.getRow(4, 4, 180, 0, false)).toBe(0);
    });

    test("should return the correct row for 270 degrees", ()=>{
        expect(board.getRow(0, 0, 270)).toBe(4); // xLen - 1 - pX
        expect(board.getRow(4, 4, 270)).toBe(0);
    });

    test("should apply offsetDeg correctly", ()=>{
        // 0度 + 90度オフセット = 90度として計算
        expect(board.getRow(0, 0, 0, 90)).toBe(0);
        // 90度 + 90度オフセット = 180度として計算
        expect(board.getRow(0, 0, 90, 90)).toBe(0);
    });

    test("should return -1 for invalid degrees", ()=>{
        expect(board.getRow(0, 0, 45)).toBe(-1);
    });
});
