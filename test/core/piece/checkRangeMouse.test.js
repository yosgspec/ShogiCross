import {Piece} from "@/core/piece.js";

describe("Piece.checkRangeMouse", ()=>{
    let mockCtx;
    let mockPieceData;

    beforeEach(()=>{
        mockCtx = {}; // モックのCanvasRenderingContext2D
        mockPieceData = {
            char: "歩",
            gameName: "将棋",
            alias: [],
            display: [""],
            imgSrc: null,
            range: "歩",
            base: null,
            cost: 1,
            attr: [],
        };
        global.pieceCounter = 0; // pieceCounterをリセット
    });

    test("should return true if coordinates are within the piece's range", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.middle = 100;
        piece.size = 50;
        // left: 80, top: 75, right: 120, bottom: 125

        expect(piece.checkRangeMouse(100, 100)).toBe(true); // 中心
        expect(piece.checkRangeMouse(80, 75)).toBe(true);   // 左上端
        expect(piece.checkRangeMouse(119, 124)).toBe(true); // 右下端の直前
    });

    test("should return false if coordinates are outside the piece's range", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.middle = 100;
        piece.size = 50;
        // left: 80, top: 75, right: 120, bottom: 125

        expect(piece.checkRangeMouse(79, 100)).toBe(false); // 左外
        expect(piece.checkRangeMouse(120, 100)).toBe(false); // 右外
        expect(piece.checkRangeMouse(100, 74)).toBe(false); // 上外
        expect(piece.checkRangeMouse(100, 125)).toBe(false); // 下外
    });

    test("should handle edge cases correctly", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.middle = 100;
        piece.size = 50;
        // left: 80, top: 75, right: 120, bottom: 125

        expect(piece.checkRangeMouse(80, 75)).toBe(true);   // 左上端
        expect(piece.checkRangeMouse(119, 75)).toBe(true);  // 右上端の直前
        expect(piece.checkRangeMouse(80, 124)).toBe(true);  // 左下端の直前
        expect(piece.checkRangeMouse(119, 124)).toBe(true); // 右下端の直前

        expect(piece.checkRangeMouse(79.99, 75)).toBe(false); // わずかに左外
        expect(piece.checkRangeMouse(120.00, 75)).toBe(false); // わずかに右外
        expect(piece.checkRangeMouse(80, 74.99)).toBe(false); // わずかに上外
        expect(piece.checkRangeMouse(80, 125.00)).toBe(false); // わずかに下外
    });
});
