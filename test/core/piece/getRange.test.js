import {Piece} from "@/core/piece.js";

describe("Piece.getRange", ()=>{
    test("should get the range of the piece", ()=>{
        // Explanation: getRange returns the base range rotated according to deg.
        // Provide a minimal ctx and a simple 2x2 pattern so we can assert rotation results.
        const simpleCtx = { save: ()=>{}, restore: ()=>{}, translate: ()=>{}, rotate: ()=>{}, beginPath: ()=>{}, moveTo: ()=>{}, lineTo: ()=>{}, closePath: ()=>{}, fill: ()=>{}, stroke: ()=>{} };
        const range = [["a","b"],["c","d"]];
        const p = new Piece(simpleCtx, {char: "飛", base: {char: "飛"}, range}, {});

        // Default (deg 0) should return identical structure
        p.deg = 0;
        const r0 = p.getRange();
        expect(Array.isArray(r0)).toBeTruthy();
        expect(r0[0][0]).toBe("a");

        // 90 deg rotation should transpose and/or reverse rows as implemented
        p.deg = 90;
        const r90 = p.getRange();
        expect(Array.isArray(r90)).toBeTruthy();
        // For our simple 2x2, rotating 90 should change [0][0]
        expect(r90[0][0]).not.toBe("a");
   });
});
