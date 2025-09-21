import {Record} from "@/core/record.js";
import {downloadText} from "@/core/download.js";
import {vi} from "vitest";

vi.mock("@/core/download.js", ()=> ({
    downloadText: vi.fn(),
}));

describe("Record.download", ()=>{
    test("should call downloadText with correct arguments", ()=>{
        // テストコードをここに記述
        // 例:
        // const board = {xLen: 9, getPiecesText: ()=> "", onTurnEnd: ()=>{}}; // モックのboardオブジェクト
        // const record = new Record(board);
        // record.download();
        // expect(downloadText).toHaveBeenCalledWith(expect.any(String), "record");
   });
});
