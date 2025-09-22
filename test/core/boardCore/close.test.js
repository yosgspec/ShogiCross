import {BoardCore} from "@/core/boardCore.js";

describe("BoardCore.close", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "▲歩\n▽歩",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);
    });

    test("should set isGameEnd to true", ()=>{
        expect(board.isGameEnd).toBe(false);
        board.close();
        expect(board.isGameEnd).toBe(true);
    });
});
