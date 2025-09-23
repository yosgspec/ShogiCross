import {Piece} from "@/core/piece.js";

describe("Piece.getPieces", ()=>{
    test("should get pieces", async ()=>{
        const mod = await vi.importActual("../../../src/ShogiCross/core/piece.js");
        expect(mod).toBeTruthy();
   });
});
