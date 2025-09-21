import {Panel} from "@/core/panel.js";

describe("Panel.toString", ()=>{
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

    test("should return full text when isCompact is false", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.text = "二十四世名人";

        expect(panel.toString(false)).toBe("二十四世名人");
        expect(panel.toString()).toBe("二十四世名人"); // デフォルト引数
    });

    test("should return compact text when isCompact is true", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.text = "二十四世名人";

        expect(panel.toString(true)).toBe("｜人");
    });

    test("should replace full-width space with middle dot in compact text", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        panel.text = "二十四世　名人";

        expect(panel.toString(true)).toBe("｜人");
    });
});
