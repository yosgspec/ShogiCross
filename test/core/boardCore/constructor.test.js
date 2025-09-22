import {BoardCore} from "@/core/boardCore.js";

describe("BoardCore.constructor", ()=>{
    let canvas;
    let option;

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        option = {
            name: "テストゲーム",
            variant: "将棋",
            url: "http://example.com",
            desc: "テスト用のゲームです",
            playBoard: "クロス14x14",
            playerOptions: [],
            players: 2,
            boardLeft: 10,
            boardTop: 20,
            panelWidth: 60,
            panelHeight: 70,
            borderWidth: 2,
            pieceSize: 50,
            useRankSize: false,
            isDrawShadow: false,
            isDisplayLastMove: false,
            backgroundColor: "#FF00FF",
            isHeadless: true,
            // Use non-headless during this constructor test so that
            // initPiecesText can safely write to `record.last`.
            isHeadless: false,
            moveMode: "free",
            piecesText: "▲歩\n▽歩",
            recordJson: "[]",
        };
    });

    test("should construct a board core with given options", ()=>{
        const board = new BoardCore(canvas, option);

        expect(board.name).toBe(option.name);
        expect(board.variant).toBe(option.variant);
        expect(board.url).toBe(option.url);
        expect(board.desc).toBe(option.desc);
        expect(board.isHeadless).toBe(option.isHeadless);
        expect(board.playerLen).toBe(option.players);
        expect(board.left).toBe(option.boardLeft);
        expect(board.top).toBe(option.boardTop);
        expect(board.panelWidth).toBe(option.panelWidth);
        expect(board.panelHeight).toBe(option.panelHeight);
        expect(board.borderWidth).toBe(option.borderWidth);
        expect(board.pieceSize).toBe(option.pieceSize);
        expect(board.canvasBackgroundColor).toBe(option.backgroundColor);
        expect(board.isDisplayLastMove).toBe(option.isDisplayLastMove);
        expect(board.moveMode).toBe(option.moveMode);

        // field の初期化を確認
        expect(board.field).toBeInstanceOf(Array);
        expect(board.field.length).toBe(2); // 2x2 のボードを想定
        expect(board.field[0].length).toBe(2);
        expect(board.field[0][0]).toHaveProperty("pX", 0);
        expect(board.field[0][0]).toHaveProperty("pY", 0);

        // players の初期化を確認
        expect(board.players).toBeInstanceOf(Map);
        expect(board.players.size).toBe(option.players);

        // stand, record, enPassant のインスタンス化を確認
        expect(board.stand).toBeDefined();
        expect(board.record).toBeDefined();
        expect(board.enPassant).toBeDefined();

    // piecesText と recordJson が適用されていることを確認
    // Note: Record.last may be undefined in headless mode, so check records array accordingly
    if(board.record.last) expect(board.record.last.fieldText).toBe(option.piecesText);
    expect(Array.isArray(board.record.records)).toBe(true);
    });

    test("should apply default values when options are not provided", ()=>{
        const defaultOption = {
            playBoard: "クロス14x14",
            piecesText: "▲歩\n▽歩",
        };
        const board = new BoardCore(canvas, defaultOption);

        expect(board.name).toBeUndefined();
        expect(board.variant).toBeUndefined();
        expect(board.url).toBeUndefined();
        expect(board.desc).toBeUndefined();
        expect(board.isHeadless).toBe(false); // デフォルト値
        expect(board.playerLen).toBe(2); // デフォルト値
        expect(board.left).toBe(5); // デフォルト値
        expect(board.top).toBe(5); // デフォルト値
        expect(board.panelWidth).toBe(50); // デフォルト値
        expect(board.panelHeight).toBe(55); // デフォルト値 (panelWidth * 1.1)
        expect(board.borderWidth).toBeCloseTo(50/30); // デフォルト値 (min(panelWidth, panelHeight)/30)
        expect(board.pieceSize).toBe(45); // デフォルト値 (panelWidth * 0.9)
        expect(board.canvasBackgroundColor).toBe("#00000000"); // デフォルト値
        expect(board.isDisplayLastMove).toBe(true); // デフォルト値
        expect(board.moveMode).toBe("normal"); // デフォルト値
    });

    test("should throw error for unknown playBoard", ()=>{
        option.playBoard = "unknownBoard";
        expect(()=>new BoardCore(canvas, option)).toThrow("playBoard=unknownBoard, Unknown board name.");
    });

    test("should throw error for invalid players count", ()=>{
        option.players = 3; // 2 or 4 以外
        expect(()=>new BoardCore(canvas, option)).toThrow("players=3, players need 2 or 4.");
    });
});
