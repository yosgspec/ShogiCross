import {Panel} from "@/core/panel.js";

describe("Panel.piece (getter)", ()=>{
    let mockCtx;
    let mockChar;
    let mockCenter;
    let mockMiddle;
    let mockWidth;
    let mockHeight;
    let mockPX;
    let mockPY;
    let mockBorderWidth;
    let mockPiece;

    beforeEach(()=>{
        mockCtx = {}; // モックのCanvasRenderingContext2D
        mockChar = "マス";
        mockCenter = 100;
        mockMiddle = 100;
        mockWidth = 50;
        mockHeight = 50;
        mockPX = 1;
        mockPY = 1;
        mockBorderWidth = 2;
        mockPiece = { name: "歩" }; // モックの駒オブジェクト
    });

    test("should return the piece if it is set", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.piece = mockPiece;

        expect(panel.piece).toBe(mockPiece);
    });

    test("should return null if no piece is set", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.piece = null; // 明示的にnullを設定

        expect(panel.piece).toBeNull();
    });
});
