import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.undo", ()=>{
    let mockBoard;
    let record;
    let mockRestoreField; // restoreField のモックを定義

    beforeEach(()=>{
        mockRestoreField = vi.fn(); // restoreField をモック
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
        record.restoreField = mockRestoreField; // モックした restoreField を割り当てる
   });

    afterEach(()=>{
        vi.restoreAllMocks();
   });

    test("should undo the last move and restore the field", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // 2つのレコードを追加
        record.add({inc: 1, end: "テスト1"});
        record.add({inc: 1, end: "テスト2"});
        expect(record.turn).toBe(2); // 現在のターンは2

        // undo を実行
        record.undo();
        expect(record.turn).toBe(1); // ターンが1に戻る
        expect(mockRestoreField).toHaveBeenCalledTimes(1); // restoreField が呼ばれる
   });

    test("should not undo if already at the first turn", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // undo を実行
        record.undo();
        expect(record.turn).toBe(0); // ターンは0のまま
        expect(mockRestoreField).not.toHaveBeenCalled(); // restoreField は呼ばれない
   });
});
