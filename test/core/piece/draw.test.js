import {Piece} from "@/core/piece.js";

describe("Piece.draw", ()=>{
    test("should draw the piece", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        expect(()=>p.draw()).not.toThrow();
   });
});
