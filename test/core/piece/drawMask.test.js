import {Piece} from "@/core/piece.js";

describe("Piece.drawMask", ()=>{
    test("should have drawMask method", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        expect(typeof p.drawMask === 'function').toBeTruthy();
   });

    test("drawMask issues path and fill calls on ctx", ()=>{
        const calls = [];
        const ctx = {
            beginPath: ()=>calls.push('beginPath'),
            moveTo: (x,y)=>calls.push(['moveTo', x,y]),
            lineTo: (x,y)=>calls.push(['lineTo', x,y]),
            fill: ()=>calls.push('fill'),
            closePath: ()=>calls.push('closePath'),
            translate: ()=>{}, rotate: ()=>{}, save: ()=>{}, restore: ()=>{}
        };
        const p = new Piece(ctx, {char: "歩", base: {char: "歩"}, range: [["."]]}, {});
        p.center = 0; p.middle = 0; p.display = [""];
        p.drawMask('#000', 1);
        expect(calls).toContain('beginPath');
        expect(calls).toContain('fill');
    });
});
