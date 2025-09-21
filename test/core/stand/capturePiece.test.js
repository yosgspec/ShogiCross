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

describe("Stand.capturePiece", ()=>{
    let stand;
    let mockWinnerPiece;
    let mockLoserPiece;
    let originalGetPieces;

    beforeEach(() => {
        // Piece.getPiecesをモック化
        originalGetPieces = Piece.getPieces;
        Piece.getPieces = vi.fn(() => ({}));

        const mockOption = {
            playBoard: "default",
            panelWidth: 10,
            panelHeight: 20,
            xLen: 9,
            yLen: 9,
        };
        const mockBoard = new BoardCore(null, mockOption);
        stand = new Stand(mockBoard);
        stand.add = vi.fn(); // addメソッドをモック化

        mockWinnerPiece = {
            deg: 0,
            hasAttr: vi.fn(attr => attr === "capture"),
        };
        mockLoserPiece = {
            deg: 180,
            isMoved: false,
            hasAttr: vi.fn(attr => false),
        };
    });

    afterEach(() => {
        // モックを元に戻す
        Piece.getPieces = originalGetPieces;
    });

    test("should not capture if forceCantCapture is true", ()=>{
        stand.capturePiece(mockWinnerPiece, mockLoserPiece, false, true);
        expect(mockLoserPiece.isMoved).toBe(false);
        expect(stand.add).not.toHaveBeenCalled();
    });

    test("should not capture if loserPiece is null", ()=>{
        stand.capturePiece(mockWinnerPiece, null);
        expect(mockLoserPiece.isMoved).toBe(false);
        expect(stand.add).not.toHaveBeenCalled();
    });

    test("should not capture if winnerPiece has no capture attr and forceCapture is false", ()=>{
        mockWinnerPiece.hasAttr.mockReturnValue(false);
        stand.capturePiece(mockWinnerPiece, mockLoserPiece, false, false);
        expect(mockLoserPiece.isMoved).toBe(false);
        expect(stand.add).not.toHaveBeenCalled();
    });

    test("should not capture if loserPiece is a king", ()=>{
        mockLoserPiece.hasAttr.mockImplementation(attr => attr === "king");
        stand.capturePiece(mockWinnerPiece, mockLoserPiece);
        expect(mockLoserPiece.isMoved).toBe(false);
        expect(stand.add).not.toHaveBeenCalled();
    });

    test("should not capture if loserPiece has cantCapture attr", ()=>{
        mockLoserPiece.hasAttr.mockImplementation(attr => attr === "cantCapture");
        stand.capturePiece(mockWinnerPiece, mockLoserPiece);
        expect(mockLoserPiece.isMoved).toBe(false);
        expect(stand.add).not.toHaveBeenCalled();
    });

    test("should capture piece under normal conditions", ()=>{
        stand.capturePiece(mockWinnerPiece, mockLoserPiece);
        expect(mockLoserPiece.deg).toBe(mockWinnerPiece.deg);
        expect(mockLoserPiece.isMoved).toBe(true);
        expect(stand.add).toHaveBeenCalledWith(mockLoserPiece);
    });

    test("should capture piece if forceCapture is true", ()=>{
        mockWinnerPiece.hasAttr.mockReturnValue(false);
        stand.capturePiece(mockWinnerPiece, mockLoserPiece, true);
        expect(mockLoserPiece.deg).toBe(mockWinnerPiece.deg);
        expect(mockLoserPiece.isMoved).toBe(true);
        expect(stand.add).toHaveBeenCalledWith(mockLoserPiece);
    });
});
