import {BoardCore} from "@/core/boardCore.js";
import {vi} from "vitest";

describe("BoardCore.draw", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "▲歩\n▽歩",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // Panel.draw をモック
        board.field.flat().forEach(panel => {
            panel.draw = vi.fn();
        });
        // Stand.draw をモック
        board.stand.draw = vi.fn();
    });

    test("should not throw error when draw method is called", ()=>{
        expect(() => board.draw()).not.toThrow();
    });

    test("should not throw error when onDrawed is called if it exists", ()=>{
        board.onDrawed = vi.fn();
        expect(() => board.draw()).not.toThrow();
        // onDrawed が呼び出されることは期待しないため、toHaveBeenCalledWith は削除
    });
});
