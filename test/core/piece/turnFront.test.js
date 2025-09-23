import {Piece} from "@/core/piece.js";

describe("Piece.turnFront", ()=>{
    let mockCtx;
    let mockPieceData;
    let mockBasePieceData;

    beforeEach(()=>{
        mockCtx = {}; // モックのCanvasRenderingContext2D
        mockBasePieceData = {
            char: "歩",
            gameName: "将棋",
            alias: [],
            display: [""],
            imgSrc: null,
            range: "歩",
            base: null, // base自体はnull
            cost: 1,
        };
        mockPieceData = {
            char: "と", // 成り駒
            gameName: "将棋",
            alias: [],
            display: [""],
            imgSrc: null,
            range: "と",
            base: mockBasePieceData, // 成る前の駒のデータ
            cost: 5,
        };
        global.pieceCounter = 0; // pieceCounterをリセット
    });

    test("should revert the piece to its base state", ()=>{
        const promotedPiece = new Piece(mockCtx, mockPieceData);
        expect(promotedPiece.char).toBe("と");
    // cost may be resolved from pieceCost mapping; ensure it is a number
    expect(typeof promotedPiece.cost).toBe("number");

    promotedPiece.turnFront();

    expect(promotedPiece.char).toBe(mockBasePieceData.char);
    // After turnFront, cost should equal base cost
    expect(promotedPiece.cost).toBe(mockBasePieceData.cost);
        // その他のプロパティもbaseからコピーされていることを確認
        expect(promotedPiece.gameName).toBe(mockBasePieceData.gameName);
    // range は配列や文字列など本体データに依存するため、深い等価性で比較
    expect(promotedPiece.range).toEqual(mockBasePieceData.range);
    });

    test("should not change if base is null", ()=>{
        const normalPiece = new Piece(mockCtx, mockBasePieceData);
        const originalChar = normalPiece.char;
        const originalCost = normalPiece.cost;

        normalPiece.turnFront(); // baseがnullなので何も変わらないはず

        expect(normalPiece.char).toBe(originalChar);
        expect(normalPiece.cost).toBe(originalCost);
    });
});
