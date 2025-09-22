import {Board} from "@/core/board.js";

describe("Board.close", ()=>{
    test("should close the board", ()=>{
        const canvas = null;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: true});
        expect(board.isGameEnd).toBe(false);
        board.close();
        expect(board.isGameEnd).toBe(true);
   });
});
