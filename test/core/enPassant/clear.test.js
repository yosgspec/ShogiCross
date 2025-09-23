import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant.clear", ()=>{
    test("should clear en passant info", ()=>{
        const e = new EnPassant();
        // Explanation: EnPassant internally keeps state per deg. We prepare a state
        // and then call clear to verify it resets that state's coordinates and id.
        e.degs[0] = { pX: 4, pY: 5, pieceId: 99 };
        // Sanity check: before clear, isTarget should be false for unrelated panels,
        // but we can assert internal state exists
        expect(e.degs[0].pX).toBe(4);

        // Act: clear the stored state for deg=0
        e.clear(0);

        // Create a minimal panel/piece mock representing a potential en-passant target.
        const panel = { piece: { deg: 0, id: 1, hasAttr: ()=>true } };
        // After clearing, the panel should NOT be considered a target
        expect(e.isTarget(panel)).toBe(false);
   });
});
