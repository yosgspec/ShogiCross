import { vi } from "vitest";
import { UIControl } from "@/core/uiControl.js";

const mockBoard = {
    isHeadless: false,
    canvas: {
        after: vi.fn(),
        style: {},
    },
};

describe("UIControl add and remove", () => {
    let uiControl;

    beforeEach(() => {
        document.body.innerHTML = '<canvas></canvas>';
        const canvas = document.querySelector("canvas");
        mockBoard.canvas = canvas;
        mockBoard.canvas.after = vi.fn();
        uiControl = new UIControl(mockBoard, []);
        vi.clearAllMocks();
    });

    test("add should call canvas.after", () => {
        uiControl.add();
        expect(mockBoard.canvas.after).toHaveBeenCalledWith(uiControl.component);
    });

    test("remove should call component.remove", () => {
        const removeSpy = vi.spyOn(uiControl.component, 'remove');
        uiControl.remove();
        expect(removeSpy).toHaveBeenCalled();
    });

    test("should not do anything if isHeadless is true", () => {
        uiControl.board.isHeadless = true;
        const removeSpy = vi.spyOn(uiControl.component, 'remove');
        
        uiControl.add();
        expect(mockBoard.canvas.after).not.toHaveBeenCalled();

        uiControl.remove();
        expect(removeSpy).not.toHaveBeenCalled();
    });
});
