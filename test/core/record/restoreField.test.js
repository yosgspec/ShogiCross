import {Record} from "@/core/record.js";
import {vi} from "vitest";

describe("Record.restoreField", ()=>{
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
            setPiecesText: vi.fn(),
            field: [ // fieldMoved, fieldPieceIds のために必要
                [{piece: {id: 1, isMoved: false}}, {piece: null}],
                [{piece: {id: 2, isMoved: true}}, {piece: {id: 3, isMoved: false}}],
            ],
            draw: vi.fn(),
            autoDrawing: true,
       };
        record = new Record(mockBoard);
   });

    test("should restore the board field to the current turn's state", ()=>{
        // 初期レコード (開始局面) がある状態
        expect(record.turn).toBe(0);

        // レコードを追加し、ターンを進める
        record.add({inc: 1, end: "テスト1"});
        record.add({inc: 1, end: "テスト2"});
        expect(record.turn).toBe(2);

        // ターン0に戻る
        record.jump(0);
        expect(record.turn).toBe(0);

        // restoreField を実行
        record.restoreField();

        // setPiecesText が呼ばれたことを確認
        expect(mockBoard.setPiecesText).toHaveBeenCalledWith(record.records[0].fieldText);

        // field の piece.id と piece.isMoved が復元されたことを確認
        expect(mockBoard.field[0][0].piece.id).toBe(record.records[0].fieldPieceIds[0][0]);
        expect(mockBoard.field[0][0].piece.isMoved).toBe(!!record.records[0].fieldMoved[0][0]);
        expect(mockBoard.field[1][0].piece.id).toBe(record.records[0].fieldPieceIds[1][0]);
        expect(mockBoard.field[1][0].piece.isMoved).toBe(!!record.records[0].fieldMoved[1][0]);

        // autoDrawing が true の場合、draw が呼ばれることを確認
        expect(mockBoard.draw).toHaveBeenCalledTimes(2); // コンストラクタとrestoreFieldで呼ばれる
   });

    test("should not call draw if autoDrawing is false", ()=>{
        mockBoard.autoDrawing = false; // autoDrawing を false に設定
        record.jump(0); // ターン0に戻る
        record.restoreField();
        expect(mockBoard.draw).not.toHaveBeenCalled();
   });

    test("should handle null fieldPieceIds", ()=>{
        record.records[0].fieldPieceIds = null; // fieldPieceIds を null に設定
        record.jump(0);
        record.restoreField();
        // エラーが発生しないことを確認
        expect(mockBoard.setPiecesText).toHaveBeenCalled();
        expect(mockBoard.draw).not.toHaveBeenCalled(); // draw は呼ばれない
   });
});
