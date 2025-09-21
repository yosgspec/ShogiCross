import {Piece} from "@/core/piece.js";

describe("Piece.deg (setter)", ()=>{
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

    test("should set deg and calculate rad correctly for positive angles", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.deg = 90;
        expect(piece.deg).toBe(90);
        expect(piece.rad).toBe(Math.PI / 2);

        piece.deg = 45;
        expect(piece.deg).toBe(45);
        expect(piece.rad).toBe(Math.PI / 4);
    });

    test("should set deg and calculate rad correctly for negative angles", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.deg = -90;
        expect(piece.deg).toBe(-90); // -90 % 360 は -90
        expect(piece.rad).toBe(-Math.PI / 2);

        piece.deg = -45;
        expect(piece.deg).toBe(-45); // -45 % 360 は -45
        expect(piece.rad).toBe(-Math.PI / 4);
    });

    test("should set deg and calculate rad correctly for angles over 360", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.deg = 450; // 450 % 360 = 90
        expect(piece.deg).toBe(90);
        expect(piece.rad).toBe(Math.PI / 2);

        piece.deg = 720; // 720 % 360 = 0
        expect(piece.deg).toBe(0);
        expect(piece.rad).toBe(0);
    });

    test("should set deg and calculate rad correctly for 0 degrees", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        piece.deg = 0;
        expect(piece.deg).toBe(0);
        expect(piece.rad).toBe(0);
    });
});
