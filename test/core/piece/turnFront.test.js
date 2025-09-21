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
        expect(promotedPiece.cost).toBe(5);

        promotedPiece.turnFront();

        expect(promotedPiece.char).toBe(mockBasePieceData.char);
        expect(promotedPiece.cost).toBe(mockBasePieceData.cost);
        // その他のプロパティもbaseからコピーされていることを確認
        expect(promotedPiece.gameName).toBe(mockBasePieceData.gameName);
        expect(promotedPiece.range).toBe(mockBasePieceData.range);
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
