import {BoardCore} from "@/core/boardCore.js";
import {Panel} from "@/core/panel.js";
import {Piece} from "@/core/piece.js";
import {vi} from "vitest";

describe("BoardCore.promoPiece", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // 依存メソッドをモック
        board.onSelectPromo = vi.fn();
        board.record.add = vi.fn();
    });

    test("should promote piece if canPromo is true and promoChar is selected", async ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
            // Provide a minimal base so Piece constructor can compute cost safely
            const piece = new Piece(null, {char: "歩", base: {char: "歩"}, promo: {"と": {}}}, {});
        // Ensure attr exists on piece to avoid undefined access
        if(!Array.isArray(piece.attr)) piece.attr = [];
        toPanel.piece = piece;

    board.onSelectPromo.mockResolvedValue("と"); // プロモーション先が選択された

    await board.promoPiece(fromPanel, toPanel, true, false, false, null);

    // promotion should have been applied on the piece
    expect(piece.hasAttr("promoted") || piece.char === "と").toBeTruthy();
    expect(board.record.add).toHaveBeenCalledWith({fromPanel, toPanel, end: "成"});
    });

    test("should not promote piece if canPromo is false", async ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
            const piece = new Piece(null, {char: "歩", base: {char: "歩"}, promo: {"と": {}}}, {});
        if(!Array.isArray(piece.attr)) piece.attr = [];
        toPanel.piece = piece;

        board.onSelectPromo.mockResolvedValue(null); // プロモーション先が選択されない

        await board.promoPiece(fromPanel, toPanel, false, false, false, null);

        expect(piece.hasAttr("promoted")).toBe(false); // 成っていないことを確認
        expect(board.record.add).toHaveBeenCalledWith({fromPanel, toPanel}); // 成らない場合は end なし
    });

    test("should not promote piece if already promoted", async ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
            const piece = new Piece(null, {char: "と", base: {char: "と"}, promo: {"と": {}}}, {});
        if(!Array.isArray(piece.attr)) piece.attr = [];
        piece.attr.push("promoted"); // 既に成っている
        toPanel.piece = piece;

        await board.promoPiece(fromPanel, toPanel, true, false, false, null);

        expect(board.onSelectPromo).not.toHaveBeenCalled(); // onSelectPromo は呼ばれない
        expect(board.record.add).toHaveBeenCalledWith({fromPanel, toPanel});
    });

    test("should not promote piece if cantPromotion attribute is present", async ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
            const piece = new Piece(null, {char: "歩", base: {char: "歩"}, promo: {"と": {}}}, {});
        piece.attr.push("cantPromotion"); // 成れない属性
        toPanel.piece = piece;

        await board.promoPiece(fromPanel, toPanel, true, false, false, null);

        expect(board.onSelectPromo).not.toHaveBeenCalled();
        expect(board.record.add).toHaveBeenCalledWith({fromPanel, toPanel});
    });

    test("should record '不成' if promotion is not selected", async ()=>{
        const fromPanel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const toPanel = new Panel(null, "", 0, 0, 0, 0, 1, 1, 0);
            const piece = new Piece(null, {char: "歩", base: {char: "歩"}, promo: {"と": {}}}, {});
        if(!Array.isArray(piece.attr)) piece.attr = [];
        toPanel.piece = piece;

        board.onSelectPromo.mockResolvedValue(null); // プロモーションしない

        await board.promoPiece(fromPanel, toPanel, true, false, false, null);

        expect(board.record.add).toHaveBeenCalledWith({fromPanel, toPanel, end: "不成"});
    });
});
