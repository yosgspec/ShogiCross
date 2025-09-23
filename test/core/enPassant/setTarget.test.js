import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant.setTarget", ()=>{
    test("should set en passant target", ()=>{
        const e = new EnPassant();
        // Explanation: setTarget checks both `panel.hasTarget("start")` and
        // `piece.hasAttr("enPassant")`. We create mocks satisfying both.
        const panel = { pX: 2, pY: 3, hasTarget: (t)=> t === "start" };
        const piece = { deg: 0, hasAttr: (name)=> name === "enPassant" };

        // Precondition: deg entry exists
        e.degs[0] = { pX: null, pY: null, pieceId: null };

        // Act
        e.setTarget(panel, piece);

        // Expectation: coordinates for the deg should be updated to panel coords
        expect(e.degs[0].pX).toBe(2);
        expect(e.degs[0].pY).toBe(3);

        // If panel.hasTarget returns false, nothing should change
        e.degs[0] = { pX: null, pY: null, pieceId: null };
        const badPanel = { pX: 9, pY: 9, hasTarget: ()=>false };
        e.setTarget(badPanel, piece);
        expect(e.degs[0].pX).toBe(null);
   });
});
