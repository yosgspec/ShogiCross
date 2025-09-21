import {Panel} from "@/core/panel.js";

describe("Panel.hasAttr", ()=>{
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

    test("should return true if the attribute exists", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.attr = ["testAttr1", "testAttr2"];

        expect(panel.hasAttr("testAttr1")).toBe(true);
        expect(panel.hasAttr("testAttr2")).toBe(true);
    });

    test("should return false if the attribute does not exist", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.attr = ["testAttr1"];

        expect(panel.hasAttr("testAttr3")).toBe(false);
    });

    test("should return false if the attr array is empty", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.attr = [];

        expect(panel.hasAttr("testAttr1")).toBe(false);
    });
});
