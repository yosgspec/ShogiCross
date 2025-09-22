import {BoardCore} from "@/core/boardCore.js";
import {vi} from "vitest";

describe("BoardCore.passTurn", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // record.add と draw をモック
        board.record.add = vi.fn();
        board.draw = vi.fn();
    });

    test("should call record.add with correct arguments", ()=>{
        const player = {degChar: "▲"};
        board.passTurn(player);
        expect(board.record.add).toHaveBeenCalledWith({end: "▲パス"});
    });

    test("should call draw if autoDrawing is true", ()=>{
        board.autoDrawing = true;
        const player = {degChar: "▲"};
        board.passTurn(player);
        expect(board.draw).toHaveBeenCalled();
    });

    test("should not call draw if autoDrawing is false", ()=>{
        board.autoDrawing = false;
        const player = {degChar: "▲"};
        board.passTurn(player);
        expect(board.draw).not.toHaveBeenCalled();
    });
});
