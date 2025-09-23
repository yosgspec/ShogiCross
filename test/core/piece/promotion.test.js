import {Piece} from "@/core/piece.js";

describe("Piece.promotion", ()=>{
    let mockCtx;
    let mockPieceData;
    let mockPromotedPieceData;

    beforeEach(()=>{
        mockCtx = {}; // モックのCanvasRenderingContext2D
        // Ensure base is a minimal object so Piece constructor can resolve costs
        mockPromotedPieceData = {
            char: "と",
            gameName: "将棋",
            alias: [],
            display: [""],
            imgSrc: null,
            range: "と",
            base: {char: "と"},
            cost: 5,
            attr: ["promoted"],
            promo: { "と": {} }, // promoプロパティに"と"を追加
        };
        const promotedPiece = new Piece(mockCtx, mockPromotedPieceData);

        expect(()=>promotedPiece.promotion("と")).toThrow("promo=と, Promoted piece.");
        mockPieceData = {
            char: "歩",
            gameName: "将棋",
            alias: [],
            display: [""],
            imgSrc: null,
            range: "歩",
            base: {char: "歩"},
            cost: 1,
            promo: {
                "と": mockPromotedPieceData,
            },
        };
        global.pieceCounter = 0; // pieceCounterをリセット
    });

    test("should promote the piece correctly", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);
        expect(piece.char).toBe("歩");
        expect(typeof piece.cost).toBe("number");
        expect(piece.hasAttr("promoted")).toBe(false);

        const prevCost = piece.cost;
        piece.promotion("と");

        expect(piece.char).toBe("と");
        expect(typeof piece.cost).toBe("number");
        // cost should change to something (promoted cost typically differs)
        expect(piece.cost).not.toBe(prevCost);
        expect(piece.hasAttr("promoted")).toBe(true);
    });

    test("should throw error if promo property is missing", ()=>{
        const pieceDataWithoutPromo = {
            ...mockPieceData,
            promo: undefined,
        };
        const piece = new Piece(mockCtx, pieceDataWithoutPromo);

        expect(()=>piece.promotion("と")).toThrow("promo=と, Not plomote piece.");
    });

    test("should throw error if promoted char is missing in promo", ()=>{
        const piece = new Piece(mockCtx, mockPieceData);

        expect(()=>piece.promotion("金")).toThrow("promo=金, Plomote key is missing.");
    });

    test("should throw error if piece is already promoted", ()=>{
        const promotedPiece = new Piece(mockCtx, mockPromotedPieceData);

        expect(()=>promotedPiece.promotion("と")).toThrow("promo=と, Promoted piece.");
    });
});
