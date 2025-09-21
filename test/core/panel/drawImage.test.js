import {Panel} from "@/core/panel.js";
import {vi} from "vitest";
import {canvasImage} from "@/core/canvasImageLoader.js";

describe("Panel.drawImage", ()=>{
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
            drawImage: vi.fn(),
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
        expect(()=>panelWithoutCtx.drawImage()).not.toThrow();
        expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });

    test("should return if imgSrc is null", ()=>{
        panel.imgSrc = null;
        panel.drawImage();

        expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });

    test("should return if image is not found in canvasImage.images", ()=>{
        panel.imgSrc = "nonexistent.png";
        canvasImage.images = {}; // モックを上書き
        panel.drawImage();

        expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });

    test("should draw the image correctly", ()=>{
        panel.imgSrc = "test.png";
        canvasImage.images = { "test.png": { width: 10, height: 10 } }; // モックを上書き
        panel.drawImage();

        expect(mockCtx.save).toHaveBeenCalledTimes(1);
        expect(mockCtx.translate).toHaveBeenCalledWith(panel.left, panel.top);
        expect(mockCtx.drawImage).toHaveBeenCalledWith(
            canvasImage.images["test.png"],
            0, 0, panel.width, panel.height
        );
        expect(mockCtx.restore).toHaveBeenCalledTimes(1);
    });
});
