import {Stand} from "@/core/stand.js";
import {Stand} from "@/core/stand.js";
import {Piece} from "@/core/piece.js";

// BoardCoreモック
vi.mock("@/core/boardCore.js", async importOriginal => {
    const actual = await importOriginal();
    return {
        ...actual,
        BoardCore: class extends actual.BoardCore {
            constructor(...args) {
                super(...args);
                this.record = { add: vi.fn() }; // record.add をモック
                this.getActivePlayer = vi.fn(() => ({
                    deg: 0,
                    cpu: { playTurn: vi.fn() },
                }));
            }
        },
    };
});
import {BoardCore} from "@/core/boardCore.js";

// boardsモック
vi.mock("@/core/data.js", async importOriginal => {
    const actual = await importOriginal();
    return {
        ...actual,
        boards: {
            default: {
                field: [[]],
                xLen: 9,
                yLen: 9,
            },
        },
    };
});

// Pieceモック
vi.mock("@/core/piece.js", async importOriginal => {
    const actual = await importOriginal();
    return {
        ...actual,
        Piece: class extends actual.Piece {
            constructor(...args) {
                super(...args);
                this.deg = args[2]?.deg ?? 0;
                this.char = args[1]?.char ?? "";
                this.alias = args[1]?.alias ?? [];
                this.displayPtn = args[2]?.displayPtn ?? 0;
            }
            toString(isAlias = false) {
                const char = !isAlias || this.displayPtn === 0 ? this.char : this.alias[this.displayPtn - 1];
                return Piece.degChars[this.deg] + char;
            }
        },
        getPieces: vi.fn(() => ({})), // getPiecesは引き続きモック
        degChars: {
            0: "▲",
            90: "≫",
            180: "▽",
            270: "＜",
        },
    };
});

describe("Stand.toString", ()=>{
    let stand;
    let mockBoard;

    beforeEach(() => {
        vi.useFakeTimers(); // フェイクタイマーを使用
        const mockOption = {
            playBoard: "default",
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        mockBoard = new BoardCore(null, mockOption);
        mockBoard.players = new Map();
        mockBoard.players.set(0, { // 0度はアクティブプレイヤーのdeg
            cpu: {
                playTurn: vi.fn(),
            },
        });
        mockBoard.record = { // recordもモック化
            turn: 0,
        };
        mockBoard.playerLen = 2; // playerLenも設定
        stand = new Stand(mockBoard);
    });

    afterEach(() => {
        vi.runAllTimers(); // 保留中のタイマーをすべて実行
        vi.useRealTimers(); // リアルタイマーに戻す
    });

    test("should return empty string if no pieces on stand", ()=>{
        const result = stand.toString();
        console.log("Empty Stand:", JSON.stringify(result));
        expect(result).toBe("");
    });

    test("should return compact string with pieces", ()=>{
        const mockPiece1 = new Piece(null, {char: "歩"}, {deg: 0});
        const mockPiece2 = new Piece(null, {char: "金"}, {deg: 90});
        stand.stocks.get(0).push(mockPiece1);
        stand.stocks.get(90).push(mockPiece2);

        const result = stand.toString(true);
        console.log("Compact String:", JSON.stringify(result));
        expect(result).toBe("\n\n≫金▲歩");
    });

    test("should return detailed string with pieces", ()=>{
        const mockPiece1 = new Piece(null, {char: "歩"}, {deg: 0});
        const mockPiece2 = new Piece(null, {char: "金"}, {deg: 90});
        stand.stocks.get(0).push(mockPiece1);
        stand.stocks.get(90).push(mockPiece2);

        const result = stand.toString(false);
        console.log("Detailed String:", JSON.stringify(result));
        expect(result).toBe("\n≫持駒：≫金\n▲持駒：▲歩");
    });

    test("should use alias if isAlias is true and displayPtn is not 0", ()=>{
        const mockPiece = new Piece(null, {char: "玉", alias: ["皇"]}, {deg: 0, displayPtn: 1});
        stand.stocks.get(0).push(mockPiece);

        const result = stand.toString(true, true);
        console.log("Alias String:", JSON.stringify(result));
        expect(result).toBe("\n\n▲皇");
    });
});
