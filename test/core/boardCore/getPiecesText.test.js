import {BoardCore} from "@/core/boardCore.js";
import {vi} from "vitest";

vi.mock("@/core/bod.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Bod: {
      ...actual.Bod,
      getPiecesText: vi.fn(),
      convPiecesText: vi.fn(),
    },
  };
});

import {Bod} from "@/core/bod.js";

describe("BoardCore.getPiecesText", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "▲歩\n▽歩",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // Bod.getPiecesText をモック
        Bod.getPiecesText.mockReturnValue("BOD形式の盤面");

        // board.toString をモック
        board.toString = vi.fn().mockReturnValue("通常形式の盤面");
    });

    test("should return BOD format when mode is bod", ()=>{
        const result = board.getPiecesText("bod");
        expect(result).toBe("BOD形式の盤面");
        expect(Bod.getPiecesText).toHaveBeenCalledWith(board);
    });

    test("should return compact format when mode is compact", ()=>{
        const result = board.getPiecesText("compact");
        expect(result).toBe("通常形式の盤面");
        expect(board.toString).toHaveBeenCalledWith(true, false);
    });

    test("should return default format when mode is default", ()=>{
        const result = board.getPiecesText("default");
        expect(result).toBe("通常形式の盤面");
        expect(board.toString).toHaveBeenCalledWith(false, false);
    });

    test("should pass isAlias to toString method", ()=>{
        board.getPiecesText("default", true);
        expect(board.toString).toHaveBeenCalledWith(false, true);

        board.getPiecesText("compact", true);
        expect(board.toString).toHaveBeenCalledWith(true, true);
    });
});
