import { vi } from "vitest";
import { UIControl } from "@/core/uiControl.js";

const mockBoard = {
    isHeadless: false,
    canvas: {
        after: vi.fn(),
        style: {},
    },
    record: {
        records: [{}, {}, {}], // ダミーの棋譜データ
        turn: 1, // 現在のターン
        getText: vi.fn((turn) => `Turn ${turn}`), // 棋譜テキストを返すモック
        jump: vi.fn(),
    },
    onDrawed: vi.fn(), // 元のonDrawedをモック
};

describe("UIControl onDrawed event listener", () => {
    let uiControl;

    beforeEach(() => {
        vi.useFakeTimers(); // setTimeoutをモック
        document.body.innerHTML = '<canvas></canvas>';
        const canvas = document.querySelector("canvas");
        mockBoard.canvas = canvas;
        uiControl = new UIControl(mockBoard, ["textRecord"]);
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.runOnlyPendingTimers();
        vi.useRealTimers(); // タイマーを元に戻す
    });

    test("should update select options when onDrawed is called", async () => {
        // onDrawedイベントリスナーを呼び出す
        await mockBoard.onDrawed(mockBoard);

        // setTimeoutが実行されるのを待つ
        vi.runAllTimers();

        const select = uiControl.component.querySelector("select");
        expect(select).not.toBeNull();

        const options = select.querySelectorAll("option");
        expect(options.length).toBe(mockBoard.record.records.length);

        // 各オプションのテキストと選択状態を確認
        options.forEach((option, index) => {
            expect(option.textContent).toBe(`Turn ${index}`);
            if (index === mockBoard.record.turn) {
                expect(option.selected).toBe(true);
            } else {
                expect(option.selected).toBe(false);
            }
        });

        // selectのonchangeイベントが設定されていることを確認
        expect(select.onchange).not.toBeNull();
    });

    test("should call board.record.jump when select value changes", async () => {
        await mockBoard.onDrawed(mockBoard);
        vi.runAllTimers();

        const select = uiControl.component.querySelector("select");
        select.selectedIndex = 2;
        select.dispatchEvent(new Event("change"));

        expect(mockBoard.record.jump).toHaveBeenCalledWith(2);
    });

    test("should not set onchange event if recordOption.readonly is true", async () => {
        uiControl = new UIControl(mockBoard, ["textRecord"], { readonly: true });
        await mockBoard.onDrawed(mockBoard);
        vi.runAllTimers();

        const select = uiControl.component.querySelector("select");
        expect(select.onchange).toBeNull();
    });
});
