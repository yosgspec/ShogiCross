import {EnPassant} from "@/core/enPassant.js";

describe("EnPassant.isTarget", ()=>{
    test("should check if it is an en passant target", ()=>{
    // EnPassant.isTarget checks panel.piece and compares its id against stored pieceId
    const e = new EnPassant();
    // Set the stored pieceId for deg 0
    e.degs[0] = {pX:2, pY:3, pieceId: 99};
    // panel must include a piece object for isTarget to perform check
    const panel = { piece: { hasAttr: ()=>true, id: 99, deg: 0 } };
    expect(e.isTarget(panel, panel.piece)).toBeTruthy();
    // non-matching piece id should not be target
    const panel2 = { piece: { hasAttr: ()=>true, id: 1, deg: 0 } };
    expect(e.isTarget(panel2, panel2.piece)).toBeFalsy();
   });
});
