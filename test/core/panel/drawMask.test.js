import {Panel} from "@/core/panel.js";
import {vi} from "vitest";

describe("Panel.drawMask", ()=>{
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
            fillRect: vi.fn(),
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
        expect(()=>panelWithoutCtx.drawMask("red")).not.toThrow();
        expect(mockCtx.fillRect).not.toHaveBeenCalled();
    });

    test("should draw the mask correctly", ()=>{
        const color = "#FF0000";
        panel.drawMask(color);

        expect(mockCtx.fillStyle).toBe(color);
        expect(mockCtx.fillRect).toHaveBeenCalledWith(panel.left, panel.top, panel.width, panel.height);
    });
});
