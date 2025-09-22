import {Board} from "@/core/board.js";

describe("Board.makeUIControl", ()=>{
    test("should make a UI control", ()=>{
        const canvas = null;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: true});
        const ui = board.makeUIControl(["undo","redo"], {lines: 10});
        expect(ui).toBeDefined();
   });
});
