import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.jump", ()=>{
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

    test("should jump to the specified turn and restore the field", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // 3つのレコードを追加
        record.add({inc: 1, end: "テスト1"});
        record.add({inc: 1, end: "テスト2"});
        record.add({inc: 1, end: "テスト3"});
        expect(record.turn).toBe(3); // 現在のターンは3

        // ターン1にジャンプ
        record.jump(1);
        expect(record.turn).toBe(1); // ターンが1になる
        expect(mockRestoreField).toHaveBeenCalledTimes(1); // restoreField が呼ばれる
   });

    test("should not jump if the target turn is out of bounds", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // 1つのレコードを追加
        record.add({inc: 1, end: "テスト1"});
        expect(record.turn).toBe(1); // 現在のターンは1

        // 存在しないターンにジャンプしようとする
        record.jump(5);
        expect(record.turn).toBe(5); // ターンは変わる
        expect(mockRestoreField).not.toHaveBeenCalled(); // restoreField は呼ばれない

        record.jump(-1);
        expect(record.turn).toBe(-1); // ターンは変わる
        expect(mockRestoreField).not.toHaveBeenCalled(); // restoreField は呼ばれない
   });
});
