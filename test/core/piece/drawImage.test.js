import {Piece} from "@/core/piece.js";
import {canvasImage} from "@/core/canvasImageLoader.js";

describe("Piece.drawImage", ()=>{
    test("should construct Piece and have drawImage method stub", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        // drawImage may rely on canvas; ensure method exists or draw is callable
        expect(p).toBeDefined();
        expect(typeof p.drawImage === 'function' || typeof p.draw === 'function').toBeTruthy();
   });
});
    describe("drawImage", ()=>{
        test("calls ctx.drawImage when image is present in canvasImage.images", ()=>{
                // drawImage is a Piece instance method. We create a piece with
                // imgSrc mapping and populate canvasImage.images with a fake image
                const calls = [];
                const ctx = { save: ()=>{}, restore: ()=>{}, translate: ()=>{}, rotate: ()=>{}, drawImage: (...args)=>calls.push(['drawImage', args]) };
                const p = new Piece(ctx, {char: "歩", base: {char: "歩"}, imgSrc: {0: ["S"]}}, {});
                // Provide a fake image in the shared canvasImage registry
                canvasImage.images["S"] = { width:5, height:5 };
                p.center = 0; p.middle = 0; p.isRotateImg = false;
                p.drawImage();
                expect(calls.length).toBeGreaterThanOrEqual(1);
                expect(calls[0][0]).toBe('drawImage');
            })
    })
