import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.constructor", ()=>{
    test("should construct a Record object and initialize properties", ()=>{
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

        // プロパティの初期化を確認
        expect(record.board).toBe(mockBoard);
        expect(record.turn).toBe(0);
        // add メソッドが完全にモックされているため、records は空のまま
        expect(record.records).toEqual([]);

        // add メソッドが正しく呼ばれたことを確認
        expect(addSpy).toHaveBeenCalledTimes(1);
        expect(addSpy).toHaveBeenCalledWith({inc: 0, end: "開始局面"});

        // add メソッドのモックを解除
        addSpy.mockRestore();
   });
});