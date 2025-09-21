import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.getComment", ()=>{
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
            { comment: "コメント0" },
            { comment: "コメント1" },
            { comment: "コメント2" },
        ];
        record.turn = 1; // 現在のターンを1に設定
   });

    test("should return the comment for the current turn by default", ()=>{
        const comment = record.getComment();
        expect(comment).toBe("コメント1");
   });

    test("should return the comment for a shifted turn", ()=>{
        const comment = record.getComment(1); // 1ターン先のコメント
        expect(comment).toBe("コメント2");

        const commentPrev = record.getComment(-1); // 1ターン前のコメント
        expect(commentPrev).toBe("コメント0");
   });

    test("should return an empty string if the record does not exist", ()=>{
        const comment = record.getComment(10); // 存在しないターン
        expect(comment).toBe("");

        const commentNegative = record.getComment(-10); // 存在しないターン
        expect(commentNegative).toBe("");
   });
});