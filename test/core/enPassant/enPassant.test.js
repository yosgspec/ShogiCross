import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant basic behavior", ()=>{
    test("setTarget and setMoved and isTarget workflow", ()=>{
        // setup fake panel and piece
        const piece = {deg: 0, hasAttr: ()=>true, id: 42};
        const panel = {pX: 3, pY: 3, piece, hasTarget: ()=>true, hasAttr: ()=>false};
        const ep = new EnPassant();
        // initially no pieceId
        expect(ep.degs[piece.deg].pieceId).toBeNull();
        ep.setTarget(panel, piece);
        // record moved should set pieceId if matching
        ep.setMoved(panel);
        expect(ep.degs[piece.deg].pieceId).toBe(42);
        // isTarget should return true for same id
        expect(ep.isTarget(panel, piece)).toBe(true);
        // clear should reset
        ep.clear(piece.deg);
        expect(ep.degs[piece.deg].pieceId).toBeNull();
    });

    test("clone returns independent copy", ()=>{
        const ep = new EnPassant();
        ep.degs['0'].pX = 1;
        const copy = ep.clone();
        expect(copy.degs['0'].pX).toBe(1);
        copy.degs['0'].pX = 9;
        expect(ep.degs['0'].pX).toBe(1);
    });
});
