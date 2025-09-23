import {Piece} from "@/core/piece.js";

describe("Piece.rank (getter)", ()=>{
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

    test("should return 'KR' when cost is 0 or less", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, char: "王"}); // costが0の駒
        expect(piece.rank).toBe("KR");

        const piece2 = new Piece(mockCtx, {...mockPieceData, char: "王"});
        piece2.cost = -1; // costを負の値に設定
        expect(piece2.rank).toBe("KR");
    });

    test("should return 'SR' when cost is 20 or more", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, char: "角"});
        piece.cost = 20;
        expect(piece.rank).toBe("SR");

        const piece2 = new Piece(mockCtx, {...mockPieceData, char: "角"});
        piece2.cost = 25; // costを25に設定
        expect(piece2.rank).toBe("SR");
    });

    test("should return 'R' when cost is 10 or more and less than 20", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, char: "銀"});
        piece.cost = 10;
        expect(piece.rank).toBe("R");

        const piece2 = new Piece(mockCtx, {...mockPieceData, char: "銀"});
        piece2.cost = 15; // costを15に設定
        expect(piece2.rank).toBe("R");
    });

    test("should return 'UC' when cost is 5 or more and less than 10", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, char: "金"});
        piece.cost = 5;
        expect(piece.rank).toBe("UC");

        const piece2 = new Piece(mockCtx, {...mockPieceData, char: "金"});
        piece2.cost = 7; // costを7に設定
        expect(piece2.rank).toBe("UC");
    });

    test("should return 'C' when cost is less than 5", ()=>{
        const piece = new Piece(mockCtx, {...mockPieceData, char: "歩"});
        piece.cost = 1;
        expect(piece.rank).toBe("C");

        const piece2 = new Piece(mockCtx, {...mockPieceData, char: "歩"});
        piece2.cost = 3; // costを3に設定
        expect(piece2.rank).toBe("C");
    });
});
