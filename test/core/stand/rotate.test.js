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
                this.deg = 0;
            }
        },
        getPieces: vi.fn(() => ({})), // getPiecesは引き続きモック
    };
});

describe("Stand.rotate", ()=>{
    let stand;
    let mockBoard;

    beforeEach(() => {
        const mockOption = {
            playBoard: "default",
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        mockBoard = new BoardCore(null, mockOption);
        mockBoard.degNormal = vi.fn(deg => (deg % 360 + 360) % 360); // degNormalをモック化

        stand = new Stand(mockBoard);
    });

    test("should rotate pieces and update stocks keys", ()=>{
        const mockPiece1 = new Piece(null, {char: "歩", alias: []}, {});
        mockPiece1.deg = 0;
        const mockPiece2 = new Piece(null, {char: "金", alias: []}, {});
        mockPiece2.deg = 90;

        stand.stocks.get(0).push(mockPiece1);
        stand.stocks.get(90).push(mockPiece2);

        const rotateDeg = 90;
        stand.rotate(rotateDeg);

        expect(mockBoard.degNormal).toHaveBeenCalledWith(0 + rotateDeg);
        expect(mockBoard.degNormal).toHaveBeenCalledWith(90 + rotateDeg);

        expect(mockPiece1.deg).toBe(0 + rotateDeg);
        expect(mockPiece2.deg).toBe(90 + rotateDeg);

        // stocksのキーは変わらないことを確認
        expect(stand.stocks.has(0)).toBe(true);
        expect(stand.stocks.has(90)).toBe(true);
        expect(stand.stocks.has(180)).toBe(true);
        expect(stand.stocks.has(270)).toBe(true);

        // stocksの中身が正しく回転していることを確認
        expect(stand.stocks.get(90)).toEqual([mockPiece1]);
        expect(stand.stocks.get(180)).toEqual([mockPiece2]);
        expect(stand.stocks.get(0)).toEqual([]);
        expect(stand.stocks.get(270)).toEqual([]);
    });
});
