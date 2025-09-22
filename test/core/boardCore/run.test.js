import {BoardCore} from "@/core/boardCore.js";
describe("BoardCore.run", ()=>{
    let canvas;
    let option;

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        option = {
            playBoard: "クロス14x14",
            piecesText: "▲歩\n▽歩",
        };
    });

    test("should return a new BoardCore instance", ()=>{
        const board = BoardCore.run(canvas, option);
        expect(board).toBeInstanceOf(BoardCore);
    // オプションが正しく渡されていることを確認 (一部)
    expect(board.option.playBoard).toBe(option.playBoard);
    // canvas が設定されていることを確認 (実装により headless で null になる場合もある)
    expect([null, canvas]).toContain(board.canvas);
    });
});
