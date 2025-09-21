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
                this.center = 0;
                this.middle = 0;
                this.draw = vi.fn();
            }
        },
        getPieces: vi.fn(() => ({})), // getPiecesは引き続きモック
    };
});

describe("Stand.draw", ()=>{
    let stand;
    let mockBoard;
    let mockCtx;

    beforeEach(() => {
        mockCtx = {
            fillStyle: "",
            strokeStyle: "",
            lineWidth: 0,
            save: vi.fn(),
            restore: vi.fn(),
            translate: vi.fn(),
            fillRect: vi.fn(),
            strokeRect: vi.fn(),
        };

        const mockOption = {
            playBoard: "default",
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        mockBoard = new BoardCore(null, mockOption);
        mockBoard.ctx = mockCtx;
        mockBoard.backgroundColor = "#FFFFFF";
        mockBoard.borderColor = "#000000";
        mockBoard.borderWidth = 1;
        mockBoard.xLen = 9;
        mockBoard.yLen = 9;
        mockBoard.playerLen = 2; // プレイヤー数を設定

        stand = new Stand(mockBoard);
        stand.left = 0;
        stand.top = 0;
        stand.width = 100;
        stand.height = 200;
        stand.pitchWidth = 5;
        stand.pitchHeight = 10;
    });

    test("should draw the stand background and border", ()=>{
        stand.draw();

        expect(mockCtx.fillStyle).toBe(mockBoard.backgroundColor);
        expect(mockCtx.strokeStyle).toBe(mockBoard.borderColor);
        expect(mockCtx.lineWidth).toBe(mockBoard.borderWidth);
        expect(mockCtx.save).toHaveBeenCalled();
        expect(mockCtx.translate).toHaveBeenCalledWith(stand.left, stand.top);
        expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, stand.width, stand.height);
        expect(mockCtx.strokeRect).toHaveBeenCalledWith(0, 0, stand.width, stand.height);
        expect(mockCtx.restore).toHaveBeenCalled();
    });

    test("should draw pieces on the stand", ()=>{
        const mockPiece1 = new Piece(null, {char: "歩", alias: []}, {});
        const mockPiece2 = new Piece(null, {char: "金", alias: []}, {});
        stand.stocks.get(0).push(mockPiece1);
        stand.stocks.get(0).push(mockPiece2);

        stand.draw();

        expect(mockPiece1.draw).toHaveBeenCalled();
        expect(mockPiece2.draw).toHaveBeenCalled();
        expect(mockPiece1.center).toBeDefined();
        expect(mockPiece1.middle).toBeDefined();
    });

    test("should draw selected piece again if playerLen is 4", ()=>{
        mockBoard.playerLen = 4;
        const mockPiece1 = new Piece(null, {char: "歩", alias: []}, {});
        mockPiece1.isSelected = true;
        stand.stocks.get(0).push(mockPiece1);

        stand.draw();

        expect(mockPiece1.draw).toHaveBeenCalledTimes(2); // 最初の描画とselectedPieceとしての再描画
    });
});
