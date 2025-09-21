import {Piece} from "@/core/piece.js";

describe("Piece.left (getter)", ()=>{
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

    test("should calculate left coordinate correctly with default center and size", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.size = 50;
        // 100 - 50 * 0.8 / 2 = 100 - 20 = 80
        expect(piece.left).toBe(80);
    });

    test("should update left coordinate when center changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.size = 50;
        expect(piece.left).toBe(80);

        piece.center = 200;
        // 200 - 50 * 0.8 / 2 = 200 - 20 = 180
        expect(piece.left).toBe(180);
    });

    test("should update left coordinate when size changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.center = 100;
        piece.size = 50;
        expect(piece.left).toBe(80);

        piece.size = 100;
        // 100 - 100 * 0.8 / 2 = 100 - 40 = 60
        expect(piece.left).toBe(60);
    });
});
