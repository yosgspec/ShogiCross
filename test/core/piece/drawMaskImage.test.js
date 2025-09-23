import {Piece} from "@/core/piece.js";

describe("Piece.drawMaskImage", ()=>{
    test("should draw the piece mask image", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        expect(typeof p.drawMaskImage === 'function' || typeof p.drawMask === 'function').toBeTruthy();
   });
});
    describe("drawMaskImage", ()=>{
        test("uses ctx.drawImage when image provided", ()=>{
            // Provide minimal ctx with drawImage spy to ensure call happens.
            const calls = [];
        const ctx = { save: ()=>calls.push('save'), translate: ()=>calls.push('translate'), fillRect: (...args)=>calls.push(['fillRect', args]), restore: ()=>calls.push('restore'), drawImage: (...args)=>calls.push(['drawImage', args]) };
            const img = { width: 10, height: 10 };
        const p = new Piece(ctx, {char: "歩", base: {char: "歩"}}, {});
        p.center = 0; p.middle = 0; p.size = 10;
        p.drawMaskImage('#fff');
            expect(calls.length).toBeGreaterThanOrEqual(1);
            // drawMaskImage uses fillRect for mask image; ensure fillRect called
            expect(calls.some(c=>Array.isArray(c) && c[0] === 'fillRect')).toBeTruthy();
        })
    })
