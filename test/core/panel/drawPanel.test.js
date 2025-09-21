import {Panel} from "@/core/panel.js";
import {vi} from "vitest";
import {canvasFont} from "@/core/data.js";

describe("Panel.drawPanel", ()=>{
    let mockCtx;
    let mockChar;
    let mockCenter;
    let mockMiddle;
    let mockWidth;
    let mockHeight;
    let mockPX;
    let mockPY;
    let mockBorderWidth;
    let panel;

    beforeEach(()=>{
        mockCtx = {
            save: vi.fn(),
            restore: vi.fn(),
            translate: vi.fn(),
            fillRect: vi.fn(),
            strokeRect: vi.fn(),
            beginPath: vi.fn(),
            moveTo: vi.fn(),
            lineTo: vi.fn(),
            closePath: vi.fn(),
            stroke: vi.fn(),
            fill: vi.fn(),
            measureText: vi.fn(()=>({ width: 10 })),
            fillText: vi.fn(),
            rotate: vi.fn(), // 追加
            lineWidth: 0, // 追加
        };
        mockChar = "マス";
        mockCenter = 100;
        mockMiddle = 100;
        mockWidth = 50;
        mockHeight = 50;
        mockPX = 1;
        mockPY = 1;
        mockBorderWidth = 2;
        panel = new Panel(
            mockCtx, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
    });

    test("should return if ctx is null", ()=>{
        const panelWithoutCtx = new Panel(
            null, mockChar, mockCenter, mockMiddle, mockWidth, mockHeight,
            mockPX, mockPY, mockBorderWidth
        );
        expect(()=>panelWithoutCtx.drawPanel()).not.toThrow();
        expect(mockCtx.fillRect).not.toHaveBeenCalled();
        expect(mockCtx.strokeRect).not.toHaveBeenCalled();
    });

    test("should draw basic panel elements", ()=>{
        panel.drawPanel();

        expect(mockCtx.fillStyle).toBe(panel.backgroundColor);
        expect(mockCtx.strokeStyle).toBe(panel.borderColor);
        expect(mockCtx.save).toHaveBeenCalledTimes(1);
        expect(mockCtx.translate).toHaveBeenCalledWith(panel.left, panel.top);
        expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, panel.width, panel.height);
        expect(mockCtx.strokeRect).toHaveBeenCalledWith(0, 0, panel.width, panel.height);
        expect(mockCtx.restore).toHaveBeenCalledTimes(1);
    });

    test("should draw intersect lines if intersect is true", ()=>{
        panel.intersect = true;
        panel.drawPanel();

        expect(mockCtx.beginPath).toHaveBeenCalledTimes(2);
        expect(mockCtx.moveTo).toHaveBeenCalledWith(panel.width/2, 0);
        expect(mockCtx.lineTo).toHaveBeenCalledWith(panel.width/2, panel.height);
        expect(mockCtx.moveTo).toHaveBeenCalledWith(0, panel.height/2);
        expect(mockCtx.lineTo).toHaveBeenCalledWith(panel.width, panel.height/2);
        expect(mockCtx.closePath).toHaveBeenCalledTimes(2); // 修正
        expect(mockCtx.stroke).toHaveBeenCalledTimes(2);
    });

    test("should draw border slash lines", ()=>{
        panel.borderSlashLeft = true;
        panel.borderSlashRight = true;
        panel.drawPanel();

        expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
        expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0);
        expect(mockCtx.lineTo).toHaveBeenCalledWith(panel.width, panel.height);
        expect(mockCtx.moveTo).toHaveBeenCalledWith(panel.width, 0);
        expect(mockCtx.lineTo).toHaveBeenCalledWith(0, panel.height);
        expect(mockCtx.closePath).toHaveBeenCalledTimes(1);
        expect(mockCtx.stroke).toHaveBeenCalledTimes(1); // 修正
    });

    test("should draw text if displayText is provided", ()=>{
        panel.displayText = "A";
        panel.drawPanel();

        expect(mockCtx.save).toHaveBeenCalledTimes(2);
        expect(mockCtx.translate).toHaveBeenCalledWith(panel.center, panel.middle);
        expect(mockCtx.fillStyle).toBe(panel.borderColor);
        expect(mockCtx.font).toBe(`${Math.min(panel.width, panel.height)*0.6}px ${canvasFont.names}`);
        expect(mockCtx.fillText).toHaveBeenCalledWith("A", -5, Math.min(panel.width, panel.height)*0.6/2*0.8);
        expect(mockCtx.restore).toHaveBeenCalledTimes(2);
    });

    test("should rotate text if textRotate is provided", ()=>{
        panel.displayText = "A";
        panel.textRotate = 90;
        panel.drawPanel();

        expect(mockCtx.rotate).toHaveBeenCalledWith(Math.PI/2);
    });
});
