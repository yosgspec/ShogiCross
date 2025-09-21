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

describe("Stand.add", ()=>{
    test("should add a piece to the stand", ()=>{
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

        const mockPiece1 = {
            deg: 180,
            sortId: 2,
            turnFront: vi.fn(),
        };
        const mockPiece2 = {
            deg: 180,
            sortId: 1,
            turnFront: vi.fn(),
        };

        stand.add(mockPiece1);
        expect(mockPiece1.turnFront).toHaveBeenCalled();
        expect(stand.stocks.get(180)).toEqual([mockPiece1]);

        stand.add(mockPiece2);
        expect(mockPiece2.turnFront).toHaveBeenCalled();
        expect(stand.stocks.get(180)).toEqual([mockPiece2, mockPiece1]); // sortIdでソートされることを確認

        // モックを元に戻す
        Piece.getPieces = originalGetPieces;
    });
});
