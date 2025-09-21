import {Record} from "@/core/record.js";
import {downloadText} from "@/core/download.js";
import {vi} from "vitest";

vi.mock("@/core/download.js", ()=> ({
    downloadText: vi.fn(),
}));

describe("Record.download", ()=>{
    let mockBoard;
    let record;

    beforeEach(()=>{
        // 各テストケースの前にモックの状態をクリア
        vi.clearAllMocks();

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

    test("should call downloadText with correct arguments", ()=>{
        // getTextAll をモックして、特定の文字列を返すようにする
        const getTextAllSpy = vi.spyOn(record, "getTextAll").mockReturnValue("mocked record text");

        record.download();

        // downloadText が正しい引数で呼ばれたことを確認
        expect(downloadText).toHaveBeenCalledTimes(1);
        expect(downloadText).toHaveBeenCalledWith("mocked record text", "record");

        // getTextAll が正しい引数で呼ばれたことを確認
        expect(getTextAllSpy).toHaveBeenCalledTimes(1);
        expect(getTextAllSpy).toHaveBeenCalledWith(false); // デフォルト引数

        getTextAllSpy.mockRestore();
   });

    test("should call downloadText with isNumOnly=true", ()=>{
        const getTextAllSpy = vi.spyOn(record, "getTextAll").mockReturnValue("mocked record text with numbers");

        record.download(true);

        expect(downloadText).toHaveBeenCalledTimes(1);
        expect(downloadText).toHaveBeenCalledWith("mocked record text with numbers", "record");
        expect(getTextAllSpy).toHaveBeenCalledTimes(1);
        expect(getTextAllSpy).toHaveBeenCalledWith(true);

        getTextAllSpy.mockRestore();
   });
});
