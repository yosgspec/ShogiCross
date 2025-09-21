import {Panel} from "@/core/panel.js";

describe("Panel.constructor", ()=>{
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

    test("should construct a Panel object with correct properties", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );

        expect(panel.ctx).toBe(mockCtx);
        expect(panel.name).toBe("マス"); // panels[char]からコピーされる
        expect(panel.text).toBe("マス目"); // panels[char]からコピーされる
        expect(panel.center).toBe(mockCenter);
        expect(panel.middle).toBe(mockMiddle);
        expect(panel.width).toBe(mockWidth);
        expect(panel.height).toBe(mockHeight);
        expect(panel.left).toBe(mockCenter - mockWidth / 2);
        expect(panel.top).toBe(mockMiddle - mockHeight / 2);
        expect(panel.right).toBe(mockCenter + mockWidth / 2);
        expect(panel.bottom).toBe(mockMiddle + mockHeight / 2);
        expect(panel.pX).toBe(mockPX);
        expect(panel.pY).toBe(mockPY);
        expect(panel.borderWidth).toBe(mockBorderWidth);
        expect(panel.selectColor).toBe("#FF000066");
        expect(panel.targetColor).toBe("#00FF0066");
        expect(panel.attr).toEqual([]);
        expect(panel.piece).toBeNull();
        expect(panel.isSelected).toBe(false);
        // clearTarget()が呼ばれることを確認するために、isTargetがfalseであることを確認
        expect(panel.isTarget).toBe(false);
    });

    test("should copy properties from panels[char]", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );

        expect(panel.name).toBe("マス");
        expect(panel.text).toBe("マス目");
        expect(panel.backgroundColor).toBe("#FFFFFF");
        expect(panel.borderColor).toBe("#000000");
    });

    test("should use default values for optional properties if not provided by panels[char]", ()=>{
        // panels[char]にselectColorやtargetColorがない場合をシミュレート
        global.panels = {
            "マス": {
                name: "マス",
                text: "マス目",
                backgroundColor: "#FFFFFF",
                borderColor: "#000000",
                // selectColor, targetColor, attr はなし
            },
        };

        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );

        expect(panel.selectColor).toBe("#FF000066");
        expect(panel.targetColor).toBe("#00FF0066");
        expect(panel.attr).toEqual([]);
    });

    test("should initialize piece to null and isSelected to false", ()=>{
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );

        expect(panel.piece).toBeNull();
        expect(panel.isSelected).toBe(false);
    });

    test("should call clearTarget during construction", ()=>{
        // clearTargetが呼ばれると#targetRangesが空になることを利用
        const panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );

        expect(panel.isTarget).toBe(false);
    });
});
