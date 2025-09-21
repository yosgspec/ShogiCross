import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.add", ()=>{
    beforeEach(()=>{
        vi.useFakeTimers();
   });

    afterEach(()=>{
        vi.useRealTimers();
   });

    test("should add a new record and update turn", async ()=>{
        const mockPlayTurn = vi.fn(); // playTurn をモック
        const mockBoard = {
            isHeadless: false,
            onTurnEnd: vi.fn(),
            getActivePlayer: ()=> ({
                cpu: {
                    playTurn: mockPlayTurn, // モックした playTurn を使用
               },
           }),
            getPiecesText: vi.fn(()=> "initial_field_text"),
            field: [], // fieldMoved, fieldPieceIds のために必要
       };
        const record = new Record(mockBoard);
        vi.runAllTimers(); // コンストラクタ内の setTimeout を実行

        // 初期レコードが1つ存在することを確認
        expect(record.records.length).toBe(1);
        expect(record.turn).toBe(0);

        // 新しいレコードを追加
        record.add({
            inc: 1,
            end: "テスト",
            fromPanel: {pX: 0, pY: 0},
            toPanel: {pX: 1, pY: 1},
            piece: {deg: 0, char: "歩", id: 1, isMoved: false},
       });

        vi.runAllTimers(); // setTimeout を実行

        // レコードが追加され、turnが更新されたことを確認
        expect(record.records.length).toBe(2);
        expect(record.turn).toBe(1);
        expect(record.last.end).toBe("テスト");
        expect(mockBoard.onTurnEnd).toHaveBeenCalledWith(mockBoard, 1);
        expect(mockPlayTurn).toHaveBeenCalledTimes(2); // コンストラクタと最初のaddで呼ばれる
   });

    test("should not add record if board is headless", ()=>{
        const mockPlayTurn = vi.fn();
        const mockBoard = {
            isHeadless: true,
            onTurnEnd: vi.fn(),
            getActivePlayer: ()=> ({
                cpu: {
                    playTurn: mockPlayTurn, // モックした playTurn を使用
               },
           }),
            getPiecesText: vi.fn(()=> "initial_field_text"),
            field: [],
       };
        const record = new Record(mockBoard);
        vi.runAllTimers(); // コンストラクタ内の setTimeout を実行
        const initialRecordsLength = record.records.length;

        record.add({
            inc: 1,
            end: "テスト",
            fromPanel: {pX: 0, pY: 0},
            toPanel: {pX: 1, pY: 1},
            piece: {deg: 0, char: "歩", id: 1, isMoved: false},
       });

        // レコードが追加されていないことを確認
        expect(record.records.length).toBe(initialRecordsLength);
        expect(record.turn).toBe(1); // turn は更新される
        expect(mockBoard.onTurnEnd).not.toHaveBeenCalled();
        expect(mockPlayTurn).toHaveBeenCalledTimes(0); // コンストラクタで呼ばれない
   });

    test("should handle inc: 0 correctly", async ()=>{
        const mockPlayTurn = vi.fn();
        const mockBoard = {
            isHeadless: false,
            onTurnEnd: vi.fn(),
            getActivePlayer: ()=> ({
                cpu: {
                    playTurn: mockPlayTurn,
               },
           }),
            getPiecesText: vi.fn(()=> "initial_field_text"),
            field: [],
       };
        const record = new Record(mockBoard);
        vi.runAllTimers(); // コンストラクタ内の setTimeout を実行

        record.add({inc: 1, end: "テスト1"}); // ターンを1に進める
        vi.runAllTimers(); // 最初のaddのsetTimeoutを実行

        // inc: 0 でレコードを追加 (実際には追加されないが、既存のレコードが上書きされる)
        record.add({inc: 0, end: "テスト0"});
        vi.runAllTimers(); // 2回目のaddのsetTimeoutを実行 (呼ばれないはずだが念のため)

        // レコードの長さとターンが変わっていないことを確認
        expect(record.records.length).toBe(2);
        expect(record.turn).toBe(1);
        expect(record.last.end).toBe("テスト0"); // 最後のレコードは上書きされる
        expect(mockBoard.onTurnEnd).toHaveBeenCalledTimes(2); // 最初のaddとコンストラクタで呼ばれている
        expect(mockPlayTurn).toHaveBeenCalledTimes(2); // コンストラクタと最初のaddで呼ばれている
   });
});
