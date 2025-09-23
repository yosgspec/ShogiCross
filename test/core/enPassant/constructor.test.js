import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant.constructor", ()=>{
    test("should construct an EnPassant object", ()=>{
        const e = new EnPassant();
        expect(e).toBeInstanceOf(EnPassant);
   });
});
