import {BoardCore} from "@/core/boardCore.js";
import {vi} from "vitest";

describe("BoardCore.initPiecesText", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // setPiecesText をモック
        board.setPiecesText = vi.fn();
    });

    test("should call setPiecesText and set record.last.fieldText", ()=>{
        const testPiecesText = "▲歩\n▽歩";
        board.initPiecesText(testPiecesText);

        expect(board.setPiecesText).toHaveBeenCalledWith(testPiecesText);
        expect(board.record.last.fieldText).toBe(testPiecesText);
    });
});
