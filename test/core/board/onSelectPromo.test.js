import {Board} from "@/core/board.js";

describe("Board.onSelectPromo", ()=>{
    test("should handle promotion selection", async ()=>{
        const canvas = null;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: true});
        const mockPiece = { promo: {"成":"promoted"}, name: "歩", char: "歩" };
        const res = await board.onSelectPromo(mockPiece, true, false, true, null);
        // headless and isCpuMove=true path should return a promo char (first key)
        expect(res).toBeDefined();
    });
});
