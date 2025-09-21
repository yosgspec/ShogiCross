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

describe("Stand.clear", ()=>{
    test("should clear the stand", ()=>{
        // Piece.getPiecesをモック化
        const originalGetPieces = Piece.getPieces;
        Piece.getPieces = vi.fn(() => ({}));

        const mockOption = {
            playBoard: "default",
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        const mockBoard = new BoardCore(null, mockOption);
        const stand = new Stand(mockBoard);

        // stocksにダミーデータを追加
        stand.stocks.set(180, ["dummy1"]);
        stand.stocks.set(90, ["dummy2"]);

        stand.clear();

        expect(stand.stocks).toBeInstanceOf(Map);
        expect(stand.stocks.size).toBe(4);
        expect(stand.stocks.get(180)).toEqual([]);
        expect(stand.stocks.get(90)).toEqual([]);
        expect(stand.stocks.get(270)).toEqual([]);
        expect(stand.stocks.get(0)).toEqual([]);

        // モックを元に戻す
        Piece.getPieces = originalGetPieces;
    });
});
