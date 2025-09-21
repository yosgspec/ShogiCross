import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.getJson", ()=>{
    let mockBoard;
    let record;

    beforeEach(()=>{
        mockBoard = {
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
        vi.spyOn(Record.prototype, "add").mockImplementation(() => {});
        record = new Record(mockBoard);
        // モックした add を元に戻す
        vi.spyOn(Record.prototype, "add").mockRestore();

        // テスト用のレコードを設定
        record.records = [
            { turn: 0, comment: "開始局面" },
            { turn: 1, comment: "コメント1" },
        ];
        record.turn = 1;
   });

    test("should return the record data as URI encoded JSON string by default", ()=>{
        const json = record.getJson();
        expect(typeof json).toBe("string");
        // URI エンコードされていることを確認 (decodeURI で元に戻せるか)
        expect(JSON.parse(decodeURI(json))).toEqual(record.records);
   });

    test("should return the record data as plain JSON string when isEncode is false", ()=>{
        const json = record.getJson(false);
        expect(typeof json).toBe("string");
        // URI エンコードされていないことを確認
        expect(json).not.toContain("%");
        expect(JSON.parse(json)).toEqual(record.records);
   });
});