import { vi } from "vitest";
import { UIControl } from "@/core/uiControl.js";

// Boardクラスのモック
const mockBoard = {
    isHeadless: false,
    canvas: {
        after: vi.fn(),
		style: {},
    },
    record: {
        undo: vi.fn(),
        redo: vi.fn(),
        download: vi.fn(),
    },
    rotate: vi.fn(),
    passTurn: vi.fn(),
    getActivePlayer: vi.fn(),
    downloadImage: vi.fn(),
    onDrawed: vi.fn(),
};

describe("UIControl constructor", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        vi.clearAllMocks();
    });

    test("should create a UIControl instance with all buttons", () => {
        const uiControl = new UIControl(mockBoard, [
            "undo", "redo", "rotateLeft", "rotateRight", "passTurn", "downloadImage", "downloadRecord"
        ]);
        expect(uiControl).toBeInstanceOf(UIControl);
        expect(uiControl.component).toBeInstanceOf(HTMLDivElement);
        const buttons = uiControl.component.querySelectorAll("button");
        expect(buttons.length).toBe(7);
    });

    test("should create a UIControl instance with specific buttons", () => {
        const uiControl = new UIControl(mockBoard, ["undo", "redo"]);
        const buttons = uiControl.component.querySelectorAll("button");
        expect(buttons.length).toBe(2);
		const id = uiControl.component.id;
        expect(uiControl.component.querySelector(`#undo${id}`)).not.toBeNull();
        expect(uiControl.component.querySelector(`#redo${id}`)).not.toBeNull();
    });

    test("should create a UIControl instance with textRecord", () => {
        const uiControl = new UIControl(mockBoard, ["textRecord"]);
        const select = uiControl.component.querySelector("select");
        expect(select).not.toBeNull();
		const id = uiControl.component.id;
        expect(select.id).toBe(`textRecord${id}`);
    });

    test("should call board methods when buttons are clicked", () => {
        const uiControl = new UIControl(mockBoard, [
            "undo", "redo", "rotateLeft", "rotateRight", "passTurn", "downloadImage", "downloadRecord"
        ]);
        
		const id = uiControl.component.id;
        uiControl.component.querySelector(`#undo${id}`).click();
        expect(mockBoard.record.undo).toHaveBeenCalled();

        uiControl.component.querySelector(`#redo${id}`).click();
        expect(mockBoard.record.redo).toHaveBeenCalled();

        uiControl.component.querySelector(`#rotateLeft${id}`).click();
        expect(mockBoard.rotate).toHaveBeenCalledWith(false);

        uiControl.component.querySelector(`#rotateRight${id}`).click();
        expect(mockBoard.rotate).toHaveBeenCalledWith();

        uiControl.component.querySelector(`#passTurn${id}`).click();
        expect(mockBoard.passTurn).toHaveBeenCalled();

        uiControl.component.querySelector(`#downloadImage${id}`).click();
        expect(mockBoard.downloadImage).toHaveBeenCalled();

        uiControl.component.querySelector(`#downloadRecord${id}`).click();
        expect(mockBoard.record.download).toHaveBeenCalled();
    });
});
