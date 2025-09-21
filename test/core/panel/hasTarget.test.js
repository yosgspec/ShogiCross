import {Panel} from "@/core/panel.js";

describe("Panel.hasTarget", ()=>{
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

    test("should return true if the target exists", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.addTarget("testRange1");
        panel.addTarget("testRange2");

        expect(panel.hasTarget("testRange1")).toBe(true);
        expect(panel.hasTarget("testRange2")).toBe(true);
    });

    test("should return false if the target does not exist", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.addTarget("testRange1");

        expect(panel.hasTarget("testRange3")).toBe(false);
    });

    test("should return false if #targetRanges is empty", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.clearTarget(); // #targetRangesを空にする

        expect(panel.hasTarget("testRange1")).toBe(false);
    });
});
