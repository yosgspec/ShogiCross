import {Panel} from "@/core/panel.js";

describe("Panel.piece (setter)", ()=>{
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
        mockPiece = { name: "歩", center: 0, middle: 0 }; // モックの駒オブジェクト
    });

    test("should set the piece and update its center and middle", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.piece = mockPiece;

        expect(panel.piece).toBe(mockPiece);
        expect(mockPiece.center).toBe(panel.center);
        expect(mockPiece.middle).toBe(panel.middle);
    });

    test("should set piece to null without error", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.piece = null;

        expect(panel.piece).toBeNull();
    });
});
