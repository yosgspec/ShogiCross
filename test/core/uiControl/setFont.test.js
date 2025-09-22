import { vi } from "vitest";
import { UIControl } from "@/core/uiControl.js";

const mockBoard = {
    isHeadless: false,
    canvas: {
        after: vi.fn(),
        style: {},
    },
};

describe("UIControl setFont", () => {
    let uiControl;

    beforeEach(() => {
        uiControl = new UIControl(mockBoard, ["undo", "textRecord"]);
    });

    test("setButtonFont should set font-family on buttons", () => {
        const button = uiControl.component.querySelector("button");
        uiControl.setButtonFont("my-test-font");
        expect(button.style.fontFamily).toBe("my-test-font");
    });

    test("setRecordFont should set font-family on select", () => {
        const select = uiControl.component.querySelector("select");
        uiControl.setRecordFont("my-test-font");
        expect(select.style.fontFamily).toBe("my-test-font");
    });
});
