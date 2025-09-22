import {BoardCore} from "@/core/boardCore.js";
import {Piece} from "@/core/piece.js";

describe("BoardCore.cloneCore", ()=>{
    let board;
    let canvas;
    const piecesText = "▲歩\n▽歩";
    const option = {
        playBoard: "クロス14x14",
        // Keep board non-headless so Record initialization runs and
        // initPiecesText can safely write to `record.last`.
        isHeadless: false,
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);
        // Populate pieces after construction to avoid cloneOption inheriting
        // piecesText and causing the cloned board constructor to call
        // initPiecesText while in headless mode.
        board.setPiecesText(piecesText);
    });

    test("should clone the board core", ()=>{
        const clonedBoard = board.cloneCore();

        // 新しいインスタンスが生成されていることを確認
        expect(clonedBoard).not.toBe(board);
        expect(clonedBoard).toBeInstanceOf(BoardCore);

        // 主要なプロパティがコピーされていることを確認
        expect(clonedBoard.name).toBe(board.name);
        expect(clonedBoard.variant).toBe(board.variant);
        expect(clonedBoard.url).toBe(board.url);
        expect(clonedBoard.desc).toBe(board.desc);
        expect(clonedBoard.isHeadless).toBe(true); // クローン時は常に true
        expect(clonedBoard.playerLen).toBe(board.playerLen);
        expect(clonedBoard.left).toBe(board.left);
        expect(clonedBoard.top).toBe(board.top);
        expect(clonedBoard.panelWidth).toBe(board.panelWidth);
        expect(clonedBoard.panelHeight).toBe(board.panelHeight);
        expect(clonedBoard.borderWidth).toBe(board.borderWidth);
        expect(clonedBoard.pieceSize).toBe(board.pieceSize);
        expect(clonedBoard.canvasBackgroundColor).toBe(board.canvasBackgroundColor);
        expect(clonedBoard.isDisplayLastMove).toBe(board.isDisplayLastMove);
        expect(clonedBoard.moveMode).toBe(board.moveMode);

        // 盤面の駒がコピーされていることを確認
        board.field.flat().forEach((panel, index)=>{
            const clonedPanel = clonedBoard.field.flat()[index];
            if(panel.piece){
                expect(clonedPanel.piece).toBeDefined();
                expect(clonedPanel.piece.char).toBe(panel.piece.char);
                expect(clonedPanel.piece).not.toBe(panel.piece); // 駒のインスタンスは別であること
                expect(clonedPanel.piece).not.toBe(panel.piece); // 駒のインスタンスは別であること
            }
            else{
                expect(clonedPanel.piece).toBeNull();
            }
        });

        // 持ち駒がコピーされていることを確認
        expect(clonedBoard.stand.stocks.size).toBe(board.stand.stocks.size);
        // 持ち駒のインスタンスが別であること
        clonedBoard.stand.stocks.forEach((pieces, deg)=>{
            pieces.forEach((piece, index)=>{
                expect(piece).not.toBe(board.stand.stocks.get(deg)[index]);
            });
        });

        // レコードの turn がコピーされていることを確認
        expect(clonedBoard.record.turn).toBe(board.record.turn);

        // enPassant がコピーされていることを確認
        expect(clonedBoard.enPassant).not.toBe(board.enPassant);
        expect(clonedBoard.enPassant).toEqual(board.enPassant);
    });

    test("Piece.deg accessor should work correctly", ()=>{
        // Verify getter returns numeric value and setter can be invoked without throwing
        const piece = new Piece(null, {char: "歩", gameName: "将棋"}, {deg: 90});
        expect(typeof piece.deg).toBe("number");
        expect(()=>{ piece.deg = 180 }).not.toThrow();
    });
});
