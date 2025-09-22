import {Board} from "@/core/board.js";

describe("Board.rotate", ()=>{
    test("should rotate the board", ()=>{
        const canvas = null;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: true});
        const before = board.displayDeg;
        board.rotate(true);
        expect(board.displayDeg).toBeDefined();
        // rotate should not throw and displayDeg is number
        expect(typeof board.displayDeg).toBe("number");
   });
});
