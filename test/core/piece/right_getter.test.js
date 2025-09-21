import {Piece} from "@/core/piece.js";

describe("Piece.right (getter)", ()=>{
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

    test("should calculate right coordinate correctly with default center and size", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.size = 50;
        // 100 + 50 * 0.8 / 2 = 100 + 20 = 120
        expect(piece.right).toBe(120);
    });

    test("should update right coordinate when center changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.size = 50;
        expect(piece.right).toBe(120);

        piece.center = 200;
        // 200 + 50 * 0.8 / 2 = 200 + 20 = 220
        expect(piece.right).toBe(220);
    });

    test("should update right coordinate when size changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.size = 50;
        expect(piece.right).toBe(120);

        piece.size = 100;
        // 100 + 100 * 0.8 / 2 = 100 + 40 = 140
        expect(piece.right).toBe(140);
    });
});
