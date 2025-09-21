import {Panel} from "@/core/panel.js";

describe("Panel.isSelected (setter)", ()=>{
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

    test("should set isSelected to value if no keepOut attribute", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.attr = []; // keepOut属性なし

        panel.isSelected = true;
        expect(panel.isSelected).toBe(true);

        panel.isSelected = false;
        expect(panel.isSelected).toBe(false);
    });

    test("should set isSelected to false if keepOut attribute exists", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.attr = ["keepOut"]; // keepOut属性あり

        panel.isSelected = true;
        expect(panel.isSelected).toBe(false); // trueを設定してもfalseになる

        panel.isSelected = false;
        expect(panel.isSelected).toBe(false);
    });
});
