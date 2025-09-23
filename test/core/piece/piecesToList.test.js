import {Piece} from "@/core/piece.js";

describe("Piece.piecesToList", ()=>{
    test("should convert pieces to list", ()=>{
        const p = new Piece(null, {char: "歩", base: {char: "歩"}}, {});
            // Explanation: piecesToList expects an object of pieces with numeric ids;
            // we construct two pieces with different ids and assert sorting by id.
            const p1 = new Piece(null, {char: "歩", base: {char: "歩"}, id: 2}, {});
            const p2 = new Piece(null, {char: "金", base: {char: "金"}, id: 1}, {});
            const pieces = {"歩": p1, "金": p2};
            const list = Piece.piecesToList(pieces);
            // list should be array-like entries sorted by id
            expect(Array.isArray(list)).toBeTruthy();
            expect(list[0][1].id).toBeLessThanOrEqual(list[1][1].id);
   });
});
