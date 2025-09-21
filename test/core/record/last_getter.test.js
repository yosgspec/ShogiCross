import {Record} from "@/core/record.js";
import {vi} from "vitest"; // vi をインポート

describe("Record.last (getter)", ()=>{
    test("should return the last record", ()=>{
        const mockBoard = {
            isHeadless: false,
            onTurnEnd: vi.fn(),
            getActivePlayer: ()=> ({
                cpu: {
                    playTurn: vi.fn(),
                },
            }),
            getPiecesText: vi.fn(()=> "initial_field_text"),
            field: [],
        };

        // Record.prototype.add を完全にモックし、何も実行しないようにする
        const addSpy = vi.spyOn(Record.prototype, "add").mockImplementation(() => {});

        const record = new Record(mockBoard);

        // add メソッドのモックを解除
        addSpy.mockRestore();

        // テスト用のレコードを設定
        record.records = ["record0", "record1", "record2"];
        record.turn = 1; // turn を 1 に設定

        // last getter が正しく機能することを確認
        expect(record.last).toBe("record1");

        record.turn = 2; // turn を 2 に設定
        expect(record.last).toBe("record2");

        record.turn = 0; // turn を 0 に設定
        expect(record.last).toBe("record0");
   });
});