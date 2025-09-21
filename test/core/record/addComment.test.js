import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.addComment", ()=>{
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
        record = new Record(mockBoard);
   });

    test("should add a comment to the current record", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);
        expect(record.last.comment).toBeUndefined();

        const comment = "これはコメントです";
        record.addComment(comment);
        expect(record.last.comment).toBe(comment);
   });

    test("should add a comment to a shifted record", ()=>{
        record.add({inc: 1, end: "テスト1"}); // ターンを1に進める
        record.add({inc: 1, end: "テスト2"}); // ターンを2に進める
        expect(record.turn).toBe(2);

        const comment = "過去のコメント";
        record.addComment(comment, -1); // 1ターン前のレコードにコメントを追加
        expect(record.records[1].comment).toBe(comment);
        expect(record.last.comment).toBeUndefined(); // 現在のレコードにはコメントがない
   });
});