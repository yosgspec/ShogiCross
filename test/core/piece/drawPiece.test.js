import {Piece} from "@/core/piece.js";

describe("Piece.drawPiece", ()=>{
    test("should draw the piece", ()=>{
        // ctx mock: only the canvas API calls used by Piece.drawPiece/drawMask
        const ctx = {
            save: ()=>{}, restore: ()=>{}, translate: ()=>{}, rotate: ()=>{}, beginPath: ()=>{}, moveTo: ()=>{}, lineTo: ()=>{}, closePath: ()=>{}, fill: ()=>{}, stroke: ()=>{}, fillText: ()=>{}, measureText: ()=>({width:10}), font: "10px sans-serif"
        };

        // Explanation: Piece.drawPiece examines `game` for style/colors and `display` to render text.
        // Construct the piece with minimal `range` and `base` so initialization succeeds.
        const p = new Piece(ctx, {char: "歩", base: {char: "歩"}, range:{default:[]}, display:["歩"]}, {});

        // Provide minimal `game` object expected by drawPiece
        p.game = { fontColor: "#000000", backgroundColor: "#FFFFFF", borderColor: "#777777", promoteFontColor: "#000000", promoteBackgroundColor: "#FFFFFF", promoteBorderColor: "#FF3300" };

        // Act & Assert: drawPiece should not throw and should set/keep certain properties
        expect(()=>p.drawPiece()).not.toThrow();
        // After drawing, ensure core bounding properties remain numeric
        expect(typeof p.center).toBe("number");
        expect(typeof p.middle).toBe("number");
   });
    test("should construct Piece and have draw method", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
        expect(typeof p.draw === 'function').toBeTruthy();
    });
});
