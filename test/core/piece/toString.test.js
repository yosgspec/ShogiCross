import { describe, test, expect, vi } from "vitest";

describe("Piece.toString", ()=>{
    test("should import piece module", async ()=>{
        const mod = await vi.importActual("../../../src/ShogiCross/core/piece.js");
        expect(mod).toBeTruthy();
   });
});
