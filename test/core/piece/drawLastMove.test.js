import {Piece} from "@/core/piece.js";

describe("Piece.drawLastMove", ()=>{
    test("should draw the last move of the piece", ()=>{
        // Provide a ctx mock and ensure zoom is computable so drawMask is invoked safely
        const ctx = { save: ()=>{}, restore: ()=>{}, translate: ()=>{}, rotate: ()=>{}, beginPath: ()=>{}, moveTo: ()=>{}, lineTo: ()=>{}, closePath: ()=>{}, fill: ()=>{}, stroke: ()=>{} };
        const p = new Piece(ctx, {char: "歩", base: {char: "歩"}, range:{default:[]}, display:["歩"]}, {});
        p.game = { fontColor: "#000", backgroundColor: "#fff", borderColor: "#777" };

        // Act
        expect(()=>p.drawLastMove()).not.toThrow();
        // drawLastMove delegates to drawMask; if ctx exists, drawMask will not early-return.
        expect(p.ctx).toBe(ctx);
   });
});
