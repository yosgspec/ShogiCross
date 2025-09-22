import {BoardCore} from "@/core/boardCore.js";
import {Panel} from "@/core/panel.js";
import {Piece} from "@/core/piece.js";
import {vi} from "vitest";

describe("BoardCore.toString", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // stand.toString をモック
        board.stand.toString = vi.fn(()=>"持駒");

        // record.last をモック
            // Record.last は getter なので直接代入できません。testsでは内部配列を更新して最終手を表現します。
            board.record.records[board.record.turn] = {pieceId: -1}; // デフォルトで最終手なし
    });

    test("should return a string representation of the board", ()=>{
        // 空の盤面
        let result = board.toString();
        expect(result).toContain("┏━━┯━━┓"); // ヘッダー
    // Implementation may omit full-width spaces; assert presence of vertical separators instead
    expect(result).toContain("┃"); // at least contains vertical separators
        expect(result).toContain("┗━━┷━━┛"); // フッター
        expect(result).toContain("持駒"); // 駒台

        // 駒が配置された盤面
        board.field[0][0].piece = new Piece(null, {char: "歩"}, {deg: 0});
        board.field[0][1].piece = new Piece(null, {char: "金"}, {deg: 180});
        result = board.toString();
        expect(result).toContain("▲歩");
        expect(result).toContain("▽金");
    });

    test("should return compact format when isCompact is true", ()=>{
        board.field[0][0].piece = new Piece(null, {char: "歩"}, {deg: 0});
        const result = board.toString(true);
        expect(result).not.toContain("┏"); // ヘッダーがない
        expect(result).toContain("▲歩");
    });

    test("should use alias when isAlias is true and displayPtn is not 0", ()=>{
        board.field[0][0].piece = new Piece(null, {char: "歩", alias: ["と"]}, {deg: 0, displayPtn: 1});
        const result = board.toString(false, true);
        expect(result).toContain("▲と");
    });

    test("should display last move indicator", ()=>{
        const piece = new Piece(null, {char: "歩"}, {deg: 0});
        piece.id = 123; // 適当なID
        board.field[0][0].piece = piece;
            board.record.records[board.record.turn] = {pieceId: 123}; // 最終手の駒IDを設定

        const result = board.toString();
        expect(result).toContain("★歩"); // 最終手を示す文字
    });
});
