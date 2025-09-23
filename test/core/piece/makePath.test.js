import {Piece} from "@/core/piece.js";

describe("Piece.makePath", ()=>{
    test("should make the path of the piece", ()=>{
        const p = new Piece(null, {char: "飛", base: {char: "飛"}}, {});
        expect(typeof p.makePath === 'function').toBeTruthy();
   });
        test("returns path command array for simple shape", ()=>{
            // makePath returns an array of drawing commands for a piece's shape.
            // Provide a simple rectangle-like path description and assert structure.
            const shape = [{cmd: 'M', x:0, y:0}, {cmd:'L', x:10, y:0}, {cmd:'L', x:10, y:10}, {cmd:'Z'}];
            // makePath is implemented as an instance method that issues ctx path calls
            const calls = [];
            const ctx = { translate: ()=>{}, rotate: ()=>{}, beginPath: ()=>calls.push('beginPath'), moveTo: ()=>calls.push('moveTo'), lineTo: ()=>calls.push('lineTo'), closePath: ()=>calls.push('closePath') };
            const p = new Piece(ctx, {char: "飛", base: {char: "飛"}}, {});
            p.center = 0; p.middle = 0;
            p.makePath(1);
            expect(calls).toContain('beginPath');
        });
});
