import {Panel} from "@/core/panel.js";

describe("Panel.addTarget", ()=>{
    let mockCtx;
    let mockChar;
    let mockCenter;
    let mockMiddle;
    let mockWidth;
    let mockHeight;
    let mockPX;
    let mockPY;
    let mockBorderWidth;

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
    });

    test("should add a rangeName to #targetRanges", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.clearTarget(); // 初期化

        panel.addTarget("testRange1");
        expect(panel.isTarget).toBe(true);
    });

    test("should add multiple rangeNames to #targetRanges", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.clearTarget(); // 初期化

        panel.addTarget("testRange1");
        panel.addTarget("testRange2");

        expect(panel.isTarget).toBe(true);
    });
});
