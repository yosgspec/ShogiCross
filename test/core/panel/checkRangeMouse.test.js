import {Panel} from "@/core/panel.js";

describe("Panel.checkRangeMouse", ()=>{
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

    test("should return true if coordinates are within the panel's range", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        // left: 75, top: 75, right: 125, bottom: 125

        expect(panel.checkRangeMouse(100, 100)).toBe(true); // 中心
        expect(panel.checkRangeMouse(75, 75)).toBe(true);   // 左上端
        expect(panel.checkRangeMouse(124, 124)).toBe(true); // 右下端の直前
    });

    test("should return false if coordinates are outside the panel's range", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        // left: 75, top: 75, right: 125, bottom: 125

        expect(panel.checkRangeMouse(74, 100)).toBe(false); // 左外
        expect(panel.checkRangeMouse(125, 100)).toBe(false); // 右外
        expect(panel.checkRangeMouse(100, 74)).toBe(false); // 上外
        expect(panel.checkRangeMouse(100, 125)).toBe(false); // 下外
    });

    test("should handle edge cases correctly", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        // left: 75, top: 75, right: 125, bottom: 125

        expect(panel.checkRangeMouse(75, 75)).toBe(true);   // 左上端
        expect(panel.checkRangeMouse(124, 75)).toBe(true);  // 右上端の直前
        expect(panel.checkRangeMouse(75, 124)).toBe(true);  // 左下端の直前
        expect(panel.checkRangeMouse(124, 124)).toBe(true); // 右下端の直前

        expect(panel.checkRangeMouse(74.99, 75)).toBe(false); // わずかに左外
        expect(panel.checkRangeMouse(125.00, 75)).toBe(false); // わずかに右外
        expect(panel.checkRangeMouse(75, 74.99)).toBe(false); // わずかに上外
        expect(panel.checkRangeMouse(75, 125.00)).toBe(false); // わずかに下外
    });
});
