import { vi } from "vitest";
import { UIControl } from "@/core/uiControl.js";

const mockBoard = {
    isHeadless: false,
    canvas: {
        after: vi.fn(),
        style: {},
    },
};

// window.getComputedStyleのモック
const mockGetComputedStyle = vi.fn(() => ({
    width: "500px",
}));
vi.stubGlobal('getComputedStyle', mockGetComputedStyle);


describe("UIControl resize", () => {
    let uiControl;

    beforeEach(() => {
        document.body.innerHTML = '<canvas></canvas>';
        const canvas = document.querySelector("canvas");
        mockBoard.canvas = canvas;
        // UIControlのコンストラクタでthis.#resize()が呼ばれるので、
        // isHeadlessがfalseの状態でインスタンス化する
        mockBoard.isHeadless = false;
        uiControl = new UIControl(mockBoard, []);
        vi.clearAllMocks();
    });

    test("should resize component on window resize", () => {
        // UIControlのコンストラクタで既にリサイズ処理が走っているので、初期状態は"500px"
        expect(uiControl.component.style.maxWidth).toBe("500px");

        // resizeイベントを発火
        window.dispatchEvent(new Event("resize"));

        expect(mockGetComputedStyle).toHaveBeenCalledWith(mockBoard.canvas);
        expect(uiControl.component.style.maxWidth).toBe("500px");
    });

    test("should not resize if isHeadless is true", () => {
        // isHeadlessがtrueの状態でUIControlをインスタンス化し直す
        mockBoard.isHeadless = true;
        uiControl = new UIControl(mockBoard, []);
        vi.clearAllMocks(); // UIControlのコンストラクタで呼ばれるgetComputedStyleをクリア

        // 初期状態ではmaxWidthは設定されていない
        expect(uiControl.component.style.maxWidth).toBe(""); // ここを修正

        window.dispatchEvent(new Event("resize"));
        // isHeadlessがtrueなので、リサイズ処理は走らない
        expect(mockGetComputedStyle).not.toHaveBeenCalled(); // getComputedStyleが呼ばれないことを確認
        expect(uiControl.component.style.maxWidth).toBe(""); // ここを修正
    });
});
