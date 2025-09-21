import {Piece} from "@/core/piece.js";

describe("Piece.top (getter)", ()=>{
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

    test("should calculate top coordinate correctly with default middle and size", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.middle = 100;
        piece.size = 50;
        // 100 - 50 / 2 = 100 - 25 = 75
        expect(piece.top).toBe(75);
    });

    test("should update top coordinate when middle changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.middle = 100;
        piece.size = 50;
        expect(piece.top).toBe(75);

        piece.middle = 200;
        // 200 - 50 / 2 = 200 - 25 = 175
        expect(piece.top).toBe(175);
    });

    test("should update top coordinate when size changes", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.middle = 100;
        piece.size = 50;
        expect(piece.top).toBe(75);

        piece.size = 100;
        // 100 - 100 / 2 = 100 - 50 = 50
        expect(piece.top).toBe(50);
    });
});
