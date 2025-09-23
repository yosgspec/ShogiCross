import {Piece} from "@/core/piece.js";

describe("Piece.deg (getter)", ()=>{
    test("should get the degree of the piece", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        expect(typeof p.deg === 'number').toBeTruthy();
   });
});
