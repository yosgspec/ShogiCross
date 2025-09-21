import {Piece} from "@/core/piece.js";

describe("Piece.hasAttr", ()=>{
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

    test("should return true if the attribute exists", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, attr: ["promoted", "captured"]});
        expect(piece.hasAttr("promoted")).toBe(true);
        expect(piece.hasAttr("captured")).toBe(true);
    });

    test("should return false if the attribute does not exist", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, attr: ["promoted"]});
        expect(piece.hasAttr("captured")).toBe(false);
    });

    test("should return false if the attr array is empty", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, attr: []});
        expect(piece.hasAttr("promoted")).toBe(false);
    });

    test("should return false if attr property is undefined", ()=>{
        const pieceDataWithoutAttr = {
            ...mockPieceData,
            attr: undefined,
        };
        const piece = new Piece(mockCtx, pieceDataWithoutAttr);
        // attrがundefinedの場合、constructorで[]に初期化されるため、hasAttrはfalseを返す
        expect(piece.hasAttr("promoted")).toBe(false);
    });
});
