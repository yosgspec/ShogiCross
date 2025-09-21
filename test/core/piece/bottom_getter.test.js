import {Piece} from "@/core/piece.js";

describe("Piece.bottom (getter)", ()=>{
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
        };
    });

    test("should calculate bottom coordinate correctly with default middle and size", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.middle = 100;
        piece.size = 50;
        // 100 + 50 / 2 = 100 + 25 = 125
        expect(piece.bottom).toBe(125);
    });

    test("should update bottom coordinate when middle changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.middle = 100;
        piece.size = 50;
        expect(piece.bottom).toBe(125);

        piece.middle = 200;
        // 200 + 50 / 2 = 200 + 25 = 225
        expect(piece.bottom).toBe(225);
    });

    test("should update bottom coordinate when size changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.middle = 100;
        piece.size = 50;
        expect(piece.bottom).toBe(125);

        piece.size = 100;
        // 100 + 100 / 2 = 100 + 50 = 150
        expect(piece.bottom).toBe(150);
    });
});
