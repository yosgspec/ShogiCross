import {BoardCore} from "@/core/boardCore.js";

describe("BoardCore.rotatePosition", ()=>{
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

    test("should rotate position for 0 degrees", ()=>{
        const result = board.rotatePosition(0, 0, 0);
        expect(result.pX).toBe(0);
        expect(result.pY).toBe(0);
    });

    test("should rotate position for 90 degrees", ()=>{
        const result = board.rotatePosition(0, 0, 90);
        expect(result.pX).toBe(4); // yLen - 1 - pY
        expect(result.pY).toBe(0); // pX
    });

    test("should rotate position for 180 degrees", ()=>{
        const result = board.rotatePosition(0, 0, 180);
        expect(result.pX).toBe(4); // xLen - 1 - pX
        expect(result.pY).toBe(4); // yLen - 1 - pY
    });

    test("should rotate position for 270 degrees", ()=>{
        const result = board.rotatePosition(0, 0, 270);
        expect(result.pX).toBe(0); // pY
        expect(result.pY).toBe(4); // xLen - 1 - pX
    });

    test("should handle different initial positions", ()=>{
        const result = board.rotatePosition(2, 3, 90);
        expect(result.pX).toBe(1); // yLen - 1 - pY (5-1-3=1)
        expect(result.pY).toBe(2); // pX
    });
});
