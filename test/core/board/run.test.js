import {Board} from "@/core/board.js";

describe("Board.run", ()=>{
    test("should run the game", ()=>{
        const canvas = null;
        const board = Board.run(canvas, {playBoard: "将棋", isHeadless: true});
        expect(board).toBeInstanceOf(Board);
        expect(board.isHeadless).toBe(true);
   });
});
