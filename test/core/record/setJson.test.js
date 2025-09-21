import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.setJson", ()=>{
    let mockBoard;
    let record;
    let jumpSpy;

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
            setPiecesText: vi.fn(),
            field: [],
            draw: vi.fn(),
       };
        // Record.prototype.add を完全にモックし、何も実行しないようにする
        vi.spyOn(Record.prototype, "add").mockImplementation(() => {});
        record = new Record(mockBoard);
        // モックした add を元に戻す
        vi.spyOn(Record.prototype, "add").mockRestore();

        // jump メソッドをモック
        jumpSpy = vi.spyOn(record, "jump").mockImplementation(() => {});
   });

    afterEach(()=>{
        vi.restoreAllMocks();
    });

    test("should set the record data from JSON string and call jump", ()=>{
        const jsonRecords = [
            { turn: 0, comment: "開始局面" },
            { turn: 1, comment: "コメント1" },
        ];
        const encodedJson = encodeURI(JSON.stringify(jsonRecords));

        record.setJson(encodedJson, 1);

        // records が正しく設定されたことを確認
        expect(record.records).toEqual(jsonRecords);
        // jump が正しい引数で呼ばれたことを確認
        expect(jumpSpy).toHaveBeenCalledTimes(1);
        expect(jumpSpy).toHaveBeenCalledWith(1);
   });

    test("should call jump with records.length - 1 when turn is not provided", ()=>{
        const jsonRecords = [
            { turn: 0, comment: "開始局面" },
            { turn: 1, comment: "コメント1" },
            { turn: 2, comment: "コメント2" },
        ];
        const encodedJson = encodeURI(JSON.stringify(jsonRecords));

        record.setJson(encodedJson);

        // records が正しく設定されたことを確認
        expect(record.records).toEqual(jsonRecords);
        // jump が records.length - 1 で呼ばれたことを確認
        expect(jumpSpy).toHaveBeenCalledTimes(1);
        expect(jumpSpy).toHaveBeenCalledWith(jsonRecords.length - 1);
   });
});