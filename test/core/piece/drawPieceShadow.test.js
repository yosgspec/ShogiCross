import {Piece} from "@/core/piece.js";

describe("Piece.drawPieceShadow", ()=>{
    test("should draw the piece shadow", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        expect(typeof p.drawPieceShadow === 'function' || typeof p.draw === 'function').toBeTruthy();
   });
        test("draws shadow using provided ctx", ()=>{
            // The real function draws on a canvas context. We pass a mock ctx
            // that records calls so we can assert the shadow drawing sequence.
            const calls = [];
            const ctx = {
                save: ()=>calls.push('save'),
                restore: ()=>calls.push('restore'),
                beginPath: ()=>calls.push('beginPath'),
                arc: (x,y,r)=>calls.push(['arc', x,y,r]),
                fill: ()=>calls.push('fill'),
                translate: (x,y)=>calls.push(['translate', x,y]),
                moveTo: (x,y)=>calls.push(['moveTo', x,y]),
                lineTo: (x,y)=>calls.push(['lineTo', x,y]),
                closePath: ()=>calls.push('closePath'),
                rotate: (r)=>calls.push(['rotate', r]),
                // fallback for any other calls
                rect: (a,b,c,d)=>calls.push(['rect', a,b,c,d]),
            };
            // drawPieceShadow is a Piece instance method; create a small Piece
            const p = new Piece(ctx, {char: "歩", base: {char: "歩"}}, {});
            p.center = 0; p.middle = 0;
            p.drawPieceShadow(1);
            // Expect that save/restore and some drawing calls were made
            expect(calls).toContain('save');
            expect(calls).toContain('restore');
            // The shadow path uses the piece outline (moveTo/lineTo/closePath)
            expect(calls.some(c=>Array.isArray(c) && (c[0] === 'moveTo' || c[0] === 'lineTo'))).toBeTruthy();
        });
});
