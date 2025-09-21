import {Piece} from "@/core/piece.js";

describe("Piece.zoom (getter)", ()=>{
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

    test("should calculate zoom correctly when useRankSize is false", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, useRankSize: false});
        piece.size = 50;
        // 50 / 100 = 0.5
        expect(piece.zoom).toBe(0.5);

        piece.size = 100;
        // 100 / 100 = 1
        expect(piece.zoom).toBe(1);
    });

    test("should calculate zoom correctly when useRankSize is true", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, useRankSize: true});
        piece.size = 100;

        // cost = 1 (歩) -> rank = 'C' -> rankRatio['C'] = 0.865
        // 100 / 100 * 0.865 = 0.865
        expect(piece.zoom).toBe(0.865);

        // cost = 0 (王) -> rank = 'KR' -> rankRatio['KR'] = 1
        const king = new Piece(mockCtx, {...mockPieceData, char: "王", useRankSize: true});
        king.size = 100;
        expect(king.zoom).toBe(1);

        // cost = 20 (角) -> rank = 'SR' -> rankRatio['SR'] = 0.965
        const bishop = new Piece(mockCtx, {...mockPieceData, char: "角", useRankSize: true});
        bishop.size = 100;
        expect(bishop.zoom).toBe(0.965);
    });

    test("should update zoom when size changes", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, useRankSize: false});
        piece.size = 50;
        expect(piece.zoom).toBe(0.5);

        piece.size = 200;
        expect(piece.zoom).toBe(2);
    });

    test("should update zoom when rank changes (if useRankSize is true)", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, useRankSize: true});
        piece.size = 100;

        // 初期は歩 (cost=1) -> rank='C' -> zoom=0.865
        expect(piece.zoom).toBe(0.865);

        // costを王 (cost=0) に変更 -> rank='KR' -> zoom=1
        piece.cost = 0;
        expect(piece.zoom).toBe(1);

        // costを角 (cost=20) に変更 -> rank='SR' -> zoom=0.965
        piece.cost = 20;
        expect(piece.zoom).toBe(0.965);
    });
});
