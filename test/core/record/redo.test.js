import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.redo", ()=>{
    let mockBoard;
    let record;
    let mockRestoreField;

    beforeEach(()=>{
        mockRestoreField = vi.fn();
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
        record = new Record(mockBoard);
        record.restoreField = mockRestoreField;
   });

    afterEach(()=>{
        vi.restoreAllMocks();
   });

    test("should redo the next move and restore the field", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // 2つのレコードを追加
        record.add({inc: 1, end: "テスト1"});
        record.add({inc: 1, end: "テスト2"});
        expect(record.turn).toBe(2); // 現在のターンは2

        // undo を実行してターンを戻す
        record.undo();
        expect(record.turn).toBe(1);

        // redo を実行
        record.redo();
        expect(record.turn).toBe(2); // ターンが2に進む
        expect(mockRestoreField).toHaveBeenCalledTimes(2); // undo と redo で2回呼ばれる
   });

    test("should not redo if already at the last turn", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // 1つのレコードを追加
        record.add({inc: 1, end: "テスト1"});
        expect(record.turn).toBe(1); // 現在のターンは1 (最後のターン)

        // redo を実行
        record.redo();
        expect(record.turn).toBe(1); // ターンは1のまま
        expect(mockRestoreField).not.toHaveBeenCalled(); // restoreField は呼ばれない
   });
});