import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant.setMoved", ()=>{
    test("should set moved en passant piece", ()=>{
        const e = new EnPassant();
        // Explanation: setMoved reads `toPanel` and compares its coordinates to
        // the stored deg state. Prepare state such that piece coordinates match.
        const piece = { deg: 0, id: 5 };
        e.degs[0] = { pX: 0, pY: 1, pieceId: null };
        const toPanel = { piece, pX: 0, pY: 1 };

        // Act
        e.setMoved(toPanel);

        // Expectation: when coordinates match, EnPassant should record the piece id
        expect(e.degs[0].pieceId).toBe(5);

        // If coordinates differ, it should clear the state for that deg
        e.degs[0] = { pX: 0, pY: 1, pieceId: null };
        const movedToOther = { piece, pX: 9, pY: 9 };
        e.setMoved(movedToOther);
        // After mismatch, internal state should be reset (pieceId null and coords null)
        expect(e.degs[0].pieceId).toBe(null);
   });
});
