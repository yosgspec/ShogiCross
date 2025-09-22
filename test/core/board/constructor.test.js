import {Board} from "@/core/board.js";

describe("Board.constructor", ()=>{
    test("should construct a board", ()=>{
        // headless で構築すれば DOM/CANVAS に依存せず安定
        const canvas = null;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: true});
        expect(board).toBeTruthy();
        expect(board.isHeadless).toBe(true);
        // boardCore properties
        expect(typeof board.getPiecesText).toBe("function");
   });
});
