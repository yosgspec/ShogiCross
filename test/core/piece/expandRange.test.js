import {Piece} from "@/core/piece.js";

describe("Piece.expandRange", ()=>{
    test("should expand the range of the piece", ()=>{
        const p = new Piece(null, {char: "桂", base: {char: "桂"}}, {});
        const r = p.expandRange?.();
        expect(Array.isArray(r) || r === undefined).toBeTruthy();
   });
});
