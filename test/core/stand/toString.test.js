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

// Use a lightweight local MockPiece to avoid constructing real Piece
// which depends on global data. This keeps tests focused on Stand
// formatting behavior.
vi.mock("@/core/piece.js", ()=>{
    class MockPiece {
        constructor(ctx, piece, option={}){
            this.deg = option.deg ?? 0;
            this.char = piece?.char ?? "";
            this.alias = piece?.alias ?? [];
            this.displayPtn = option.displayPtn ?? 0;
        }
        toString(isAlias=false){
            const char = !isAlias || this.displayPtn === 0 ? this.char : this.alias[this.displayPtn-1];
            return MockPiece.degChars[this.deg] + char;
        }
    }
    // static helpers expected by BoardCore
    MockPiece.getPieces = vi.fn(()=>({}));
    MockPiece.degChars = {0:"▲",90:"≫",180:"▽",270:"＜"};
    MockPiece.degLastMoveChars = {0:"★",90:"◆",180:"☆",270:"◇"};

    return {
        Piece: MockPiece,
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
    // Implementation orders stocks by deg key ascending, so 0 then 90
    expect(result).toBe("\n\n▲歩≫金");
    });

    test("should return detailed string with pieces", ()=>{
        const mockPiece1 = new Piece(null, {char: "歩"}, {deg: 0});
        const mockPiece2 = new Piece(null, {char: "金"}, {deg: 90});
        stand.stocks.get(0).push(mockPiece1);
        stand.stocks.get(90).push(mockPiece2);

    const result = stand.toString(false);
    console.log("Detailed String:", JSON.stringify(result));
    expect(result).toBe("\n▲持駒：▲歩\n≫持駒：≫金");
    });

    test("should use alias if isAlias is true and displayPtn is not 0", ()=>{
        const mockPiece = new Piece(null, {char: "玉", alias: ["皇"]}, {deg: 0, displayPtn: 1});
        stand.stocks.get(0).push(mockPiece);

    const result = stand.toString(true, true);
    console.log("Alias String:", JSON.stringify(result));
    expect(result).toBe("\n\n▲皇");
    });
});
