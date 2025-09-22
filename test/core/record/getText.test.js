import {Record} from "@/core/record.js";
import {vi} from "vitest";

// Piece クラスを直接モック
vi.mock("@/core/piece.js", ()=>{
    // Piece クラスのモック
    class MockPiece {
        constructor(ctx, piece, option){
            this.deg = piece.deg;
            this.char = piece.char;
            // 他の必要なプロパティもここで初期化
       }
        // 必要に応じて他のメソッドもモック
   }

    MockPiece.degChars = {
        0: "▲",
        90: "≫",
        180: "▽",
        270: "＜",
   };

    return {
        Piece: MockPiece,
   };
});

describe("Record.getText", ()=>{
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
        record = new Record(mockBoard);
   });

    test("should return the record text for the specified turn", ()=>{
        // ターン1のレコードを追加
        record.add({
            inc: 1,
            end: "",
            fromPanel: {pX: 8, pY: 0}, // 91
            toPanel: {pX: 7, pY: 1, piece: {deg: 0, char: "歩", id: 1}}, // 82
       });

        const text = record.getText(1);
        expect(text).toBe("1: ▲22歩(11)"); // 期待値を修正
   });

    test("should return the record text with numOnly option", ()=>{
        // ターン1のレコードを追加
        record.add({
            inc: 1,
            end: "",
            fromPanel: {pX: 8, pY: 0}, // 91
            toPanel: {pX: 7, pY: 1, piece: {deg: 0, char: "歩", id: 1}}, // 82
       });

        const text = record.getText(1, true);
        expect(text).toBe("1: ▲2,2歩(1,1)"); // 期待値を修正
   });

    test("should return only turn and end text if to.pX is null", ()=>{
        // to.pX が null のレコードを追加 (例: 開始局面)
    const initialRecord = record.records[0];
    initialRecord.end = "開始局面";
    // Ensure moves structure exists before mutating
    initialRecord.moves ||= [{from:{}, to:{pX:0, pY:0}}];
    initialRecord.moves[0].to.pX = null; // to.pX を null に設定

        const text = record.getText(0);
        expect(text).toBe("0: 開始局面");
   });

    test("should handle different piece degrees", ()=>{
        // ターン1のレコードを追加 (deg: 90)
        record.add({
            inc: 1,
            end: "",
            fromPanel: {pX: 8, pY: 0},
            toPanel: {pX: 7, pY: 1, piece: {deg: 90, char: "歩", id: 1}}, // 82
       });

        const text = record.getText(1);
        expect(text).toBe("1: ≫22歩(11)"); // 期待値を修正
   });

    test("should handle piece without fromPanel", ()=>{
        // ターン1のレコードを追加 (fromPanel なし)
        record.add({
            inc: 1,
            end: "打",
            fromPanel: {}, // fromPanel を空にする
            toPanel: {pX: 7, pY: 1, piece: {deg: 0, char: "歩", id: 1}}, // 82
       });

        const text = record.getText(1);
        expect(text).toBe("1: ▲22歩打"); // 期待値を修正
   });
});