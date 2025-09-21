import {Panel} from "@/core/panel.js";

describe("Panel.clearTarget", ()=>{
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

    test("should clear #targetRanges and set isTarget to false", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.addTarget("testRange1");
        panel.addTarget("testRange2");

        // clearTarget呼び出し前
        expect(panel.isTarget).toBe(true);

        panel.clearTarget();

        // clearTarget呼び出し後
        expect(panel.isTarget).toBe(false);
    });
});
