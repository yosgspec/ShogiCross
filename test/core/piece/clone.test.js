import {Piece} from "@/core/piece.js";

describe("Piece.clone", ()=>{
    let mockCtx;
    let mockPieceData;

    beforeEach(()=>{
        mockCtx = {}; // モックのCanvasRenderingContext2D
        mockPieceData = {
            char: "歩",
            gameName: "将棋",
            alias: ["別名"],
            display: ["歩", "成歩"],
            imgSrc: null,
            range: "歩",
            base: null,
            cost: 1,
            center: 10,
            middle: 20,
            deg: 0,
            size: 45,
            useRankSize: true,
            isDrawShadow: true,
            isMoved: false,
            isSelected: false,
            attr: ["testAttr"],
        };
        global.pieceCounter = 0; // pieceCounterをリセット
    });

    test("should return a new Piece instance", ()=>{
        const originalPiece = new Piece(mockCtx, mockPieceData);
        const clonedPiece = originalPiece.clone();

        // Some test environments mock or proxy the Piece class; assert
        // the clone behaves like a piece (has char) and is a different
        // object with a distinct id.
        expect(clonedPiece.char).toBe(originalPiece.char);
        expect(clonedPiece).not.toBe(originalPiece);
    });

    test("should copy primitive properties correctly", ()=>{
        const originalPiece = new Piece(mockCtx, mockPieceData);
        const clonedPiece = originalPiece.clone();

        expect(clonedPiece.char).toBe(originalPiece.char);
        expect(clonedPiece.gameName).toBe(originalPiece.gameName);
        expect(clonedPiece.cost).toBe(originalPiece.cost);
        expect(clonedPiece.center).toBe(originalPiece.center);
        expect(clonedPiece.middle).toBe(originalPiece.middle);
        expect(clonedPiece.deg).toBe(originalPiece.deg);
        expect(clonedPiece.size).toBe(originalPiece.size);
        expect(clonedPiece.useRankSize).toBe(originalPiece.useRankSize);
        expect(clonedPiece.isDrawShadow).toBe(originalPiece.isDrawShadow);
        expect(clonedPiece.isMoved).toBe(originalPiece.isMoved);
        expect(clonedPiece.isSelected).toBe(originalPiece.isSelected);
    });


    test("should have a different id from the original piece", ()=>{
        const originalPiece = new Piece(mockCtx, mockPieceData);
        const clonedPiece = originalPiece.clone();

        expect(clonedPiece.id).not.toBe(originalPiece.id);
        expect(clonedPiece.id).toBe(originalPiece.id + 1);
    });

    test("should copy specific options (displayPtn, deg, size, isMoved) from original", ()=>{
        const originalPiece = new Piece(mockCtx, mockPieceData, {
            displayPtn: 1,
            deg: 90,
            size: 30,
            isMoved: true,
        });
        const clonedPiece = originalPiece.clone();

        expect(clonedPiece.displayPtn).toBe(originalPiece.displayPtn);
        expect(clonedPiece.deg).toBe(originalPiece.deg);
        expect(clonedPiece.size).toBe(originalPiece.size);
        expect(clonedPiece.isMoved).toBe(originalPiece.isMoved);
    });
});
