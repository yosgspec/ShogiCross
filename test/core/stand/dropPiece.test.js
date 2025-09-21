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
import {Panel} from "@/core/panel.js";

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
                this.center = 0;
                this.middle = 0;
            }
        },
        getPieces: vi.fn(() => ({})), // getPiecesは引き続きモック
    };
});

describe("Stand.dropPiece", ()=>{
    let stand;
    let mockBoard;
    let mockToPanel;
    let mockPiece;

    beforeEach(() => {
        const mockOption = {
            playBoard: "default",
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        // BoardCore をモック
        mockBoard = {
            moveMode: "normal",
            displayDeg: 0,
            getActivePlayer: vi.fn(() => ({
                deg: 0,
                cpu: {
                    playTurn: vi.fn(),
                },
            })),
            record: {add: vi.fn()},
            xLen: 9,
            yLen: 9,
            field: [[]],
            players: new Map(),
            stand: {
                stocks: new Map(),
                clear: vi.fn(),
                add: vi.fn(),
            },
        };

        stand = new Stand(mockBoard);
        stand.stocks.set(0, []); // 0度のストックを初期化

        mockToPanel = new Panel(null, "・", 0, 0, 10, 10, 0, 0, 1);
        mockToPanel.hasAttr = vi.fn(() => false);

        mockPiece = new Piece(null, {char: "歩", alias: []}, {});
    });

    test("should return false if toPanel is not a Panel instance", ()=>{
        const result = stand.dropPiece({}, {deg: 0, i: 0});
        expect(result).toBe(false);
    });

    test("should return false if piece is not a Piece instance", ()=>{
        stand.stocks.get(0).push({}); // ダミーオブジェクトをプッシュ
        const result = stand.dropPiece(mockToPanel, {deg: 0, i: 0});
        expect(result).toBe(false);
    });

    test("should return false if moveMode is viewOnly", ()=>{
        mockBoard.moveMode = "viewOnly";
        stand.stocks.get(0).push(mockPiece);
        const result = stand.dropPiece(mockToPanel, {deg: 0, i: 0});
        expect(result).toBe(false);
    });

    test("should return false if toPanel has keepOut attr", ()=>{
        mockToPanel.hasAttr.mockReturnValue(true);
        stand.stocks.get(0).push(mockPiece);
        const result = stand.dropPiece(mockToPanel, {deg: 0, i: 0});
        expect(result).toBe(false);
    });

    test("should return false if not cpu drop, moveMode is vs, and player deg mismatch", ()=>{
        mockBoard.moveMode = "vs";
        mockBoard.getActivePlayer.mockReturnValue({deg: 90}); // プレイヤーの角度が異なる
        stand.stocks.get(0).push(mockPiece);
        const result = stand.dropPiece(mockToPanel, {deg: 0, i: 0}, false);
        expect(result).toBe(false);
    });

    test("should successfully drop a piece", ()=>{
        stand.stocks.get(0).push(mockPiece);
        const result = stand.dropPiece(mockToPanel, {deg: 0, i: 0});

        expect(mockToPanel.piece).toBe(mockPiece);
        expect(mockPiece.center).toBe(mockToPanel.center);
        expect(mockPiece.middle).toBe(mockToPanel.middle);
        expect(stand.stocks.get(0)).not.toContain(mockPiece);
        expect(mockBoard.record.add).toHaveBeenCalledWith({toPanel: mockToPanel, end: "打"});
        expect(result).toBe(true);
    });

    test("should successfully drop a piece by CPU", ()=>{
        mockBoard.moveMode = "vs";
        stand.stocks.get(0).push(mockPiece);
        const result = stand.dropPiece(mockToPanel, {deg: 0, i: 0}, true);

        expect(mockToPanel.piece).toBe(mockPiece);
        expect(mockPiece.center).toBe(mockToPanel.center);
        expect(mockPiece.middle).toBe(mockToPanel.middle);
        expect(stand.stocks.get(0)).not.toContain(mockPiece);
        expect(mockBoard.record.add).toHaveBeenCalledWith({toPanel: mockToPanel, end: "打"});
        expect(result).toBe(true);
    });
});
