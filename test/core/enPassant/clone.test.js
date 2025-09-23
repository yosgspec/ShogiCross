import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant.clone", ()=>{
    test("should clone the EnPassant object", ()=>{
        const e = new EnPassant();
        const c = e.clone?.();
        expect(c).toBeDefined();
   });
});
