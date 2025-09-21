import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.getTextAll", ()=>{
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
            xLen: 9, // getText で使用
       };
        // Record.prototype.add を完全にモックし、何も実行しないようにする
        vi.spyOn(Record.prototype, "add").mockImplementation(() => {});
        record = new Record(mockBoard);
        // モックした add を元に戻す
        vi.spyOn(Record.prototype, "add").mockRestore();

        // テスト用のレコードを設定
        record.records = [
            { moves: [{ to: { pX: null } }], end: "開始局面" }, // ターン0
            { moves: [{ to: { pX: 7, pY: 1 } }], deg: 0, pieceChar: "歩", end: "" }, // ターン1
            { moves: [{ to: { pX: 6, pY: 2 } }], deg: 0, pieceChar: "歩", end: "" }, // ターン2
        ];
        record.turn = 2; // 現在のターンを2に設定
   });

    test("should return all record texts joined by newline", ()=>{
        // getText をモックして、特定の文字列を返すようにする
        const getTextSpy = vi.spyOn(record, "getText")
            .mockImplementation((turn, isNumOnly) => `Turn ${turn} text (numOnly: ${isNumOnly})`);

        const textAll = record.getTextAll();

        // getText が正しい回数呼ばれたことを確認
        expect(getTextSpy).toHaveBeenCalledTimes(3); // ターン0, 1, 2
        expect(getTextSpy).toHaveBeenCalledWith(0, false);
        expect(getTextSpy).toHaveBeenCalledWith(1, false);
        expect(getTextSpy).toHaveBeenCalledWith(2, false);

        // 返り値が正しく結合されていることを確認
        expect(textAll).toBe(
            "Turn 0 text (numOnly: false)\n" +
            "Turn 1 text (numOnly: false)\n" +
            "Turn 2 text (numOnly: false)"
       );

        getTextSpy.mockRestore();
   });

    test("should pass isNumOnly argument to getText", ()=>{
        const getTextSpy = vi.spyOn(record, "getText")
            .mockImplementation((turn, isNumOnly) => `Turn ${turn} text (numOnly: ${isNumOnly})`);

        const textAll = record.getTextAll(true);

        expect(getTextSpy).toHaveBeenCalledTimes(3);
        expect(getTextSpy).toHaveBeenCalledWith(0, true);
        expect(getTextSpy).toHaveBeenCalledWith(1, true);
        expect(getTextSpy).toHaveBeenCalledWith(2, true);

        expect(textAll).toBe(
            "Turn 0 text (numOnly: true)\n" +
            "Turn 1 text (numOnly: true)\n" +
            "Turn 2 text (numOnly: true)"
       );

        getTextSpy.mockRestore();
   });
});