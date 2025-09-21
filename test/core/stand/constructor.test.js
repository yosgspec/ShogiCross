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

describe("Stand.constructor", ()=>{
    test("should construct a Stand object", ()=>{
        // Piece.getPiecesをモック化
        const originalGetPieces = Piece.getPieces;
        Piece.getPieces = vi.fn(() => ({}));

        const mockOption = {
            playBoard: "default", // 必須プロパティ
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        const mockBoard = new BoardCore(null, mockOption);
        mockBoard.top = 10;
        mockBoard.right = 20;
        mockBoard.bottom = 30;
        mockBoard.width = 100;
        mockBoard.height = 200;
        mockBoard.panelWidth = 10;
        mockBoard.panelHeight = 20;
        mockBoard.xLen = 9;
        mockBoard.yLen = 9;

        const stand = new Stand(mockBoard);

        expect(stand.board).toBe(mockBoard);
        expect(stand.stocks).toBeInstanceOf(Map);
        expect(stand.stocks.size).toBe(4);
        expect(stand.left).toBe(mockBoard.right * 1.02);
        expect(stand.top).toBe(mockBoard.top);
        expect(stand.width).toBe(mockBoard.width / 2);
        expect(stand.height).toBe(mockBoard.height);
        expect(stand.right).toBe(stand.left + stand.width);
        expect(stand.bottom).toBe(mockBoard.bottom);
        expect(stand.pitchWidth).toBe(mockBoard.panelWidth / 2);
        expect(stand.pitchHeight).toBe(mockBoard.panelHeight);
        expect(stand.xLen).toBe(mockBoard.xLen);
        expect(stand.yLen).toBe(mockBoard.yLen);

        // モックを元に戻す
        Piece.getPieces = originalGetPieces;
    });
});
