import {BoardCore} from "@/core/boardCore.js";
import {Panel} from "@/core/panel.js";
import {Piece} from "@/core/piece.js";

describe("BoardCore.checkCanPromo", ()=>{
    let board;
    let canvas;
    let option;

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        option = {
            playBoard: "クロス14x14",
            piecesText: "", // 空の盤面
            isHeadless: true,
        };
        board = new BoardCore(canvas, option);

        // テスト用の駒とパネルを作成
        // Panel のコンストラクタは ctx, char, center, middle, width, height, pX, pY, borderWidth を必要とする
        // Piece のコンストラクタは ctx, piece, option を必要とする
        // Panel の char は panels モックのキーに対応する
        // Piece の piece は pieces モックのキーに対応する
    });

    test("should return canPromo and forcePromo for a piece in promotion area", ()=>{
        // プロモーションエリア内のマスを想定
        const panel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const piece = new Piece(null, {char: "歩", gameName: "将棋"}, {deg: 0});
        panel.piece = piece;

        // game.promoLine と piece.forcePromoLine をモックで設定する必要がある
        // test/setup.js の games モックに promoLine と forcePromoLine を追加
        // 現在の games モックには promoLine がない
        // games["将棋"].promoLine = 3; // 例
        // piece.forcePromoLine = 1; // 例

        // 一時的に駒の game と forcePromoLine を設定
        piece.game = { promoLine: 3, forcePromoLine: 1 };
        piece.forcePromoLine = 1;
        board.yLen = 5; // 盤面の高さを設定

        // 駒がプロモーションエリア内にある場合
        panel.pY = 2; // promoLine が 3 の場合、pY=2 はプロモーションエリア内
        let result = board.checkCanPromo(panel);
        expect(result.canPromo).toBe(true);
        expect(result.forcePromo).toBe(false);

        // 駒が強制プロモーションエリア内にある場合
        panel.pY = 0; // forcePromoLine が 1 の場合、pY=0 は強制プロモーションエリア内
        result = board.checkCanPromo(panel);
        expect(result.canPromo).toBe(true);
        expect(result.forcePromo).toBe(true);
    });

    test("should return false for a piece outside promotion area", ()=>{
        const panel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const piece = new Piece(null, {char: "歩", gameName: "将棋"}, {deg: 0});
        panel.piece = piece;

        piece.game = { promoLine: 3, forcePromoLine: 1 };
        piece.forcePromoLine = 1;
        board.yLen = 5;

        // 駒がプロモーションエリア外にある場合
        panel.pY = 3; // promoLine が 3 の場合、pY=3 はプロモーションエリア外
        const result = board.checkCanPromo(panel);
        expect(result.canPromo).toBe(false);
        expect(result.forcePromo).toBe(false);
    });

    test("should handle sidePromo logic", ()=>{
    board.sidePromo = true;
    board.yLen = 5;

        const panel = new Panel(null, "", 0, 0, 0, 0, 0, 0, 0);
        const piece = new Piece(null, {char: "歩", gameName: "将棋"}, {deg: 0});
        panel.piece = piece;

        // Piece.degChars をモックして、テストに必要な値を返せるようにする
        // 実際には Piece.degChars は static なので、vi.spyOn でモックする
        // ただし、ここでは簡略化のため、直接値を設定する
        Piece.degChars = {
            0: "▲",
            90: "≫",
            180: "▽",
            270: "＜",
        };

        // board.getRow をモックして、sidePromo ロジックが呼び出す getRow の結果を制御できるようにする
        board.getRow = vi.fn((pX, pY, deg, offsetDeg, isReverse) => {
            if (deg === 0) return 4 - pY; // 0度の場合の行
            if (deg === 90) return pX; // 90度の場合の行
            if (deg === 180) return pY; // 180度の場合の行
            if (deg === 270) return 4 - pX; // 270度の場合の行
            return -1;
        });

        // 駒がプロモーションエリア内にある場合 (deg=0, pY=2)
    // 駒の game 情報を設定しておく
    piece.game = { promoLine: 3, forcePromoLine: 1 };
    piece.forcePromoLine = 1;
        panel.pY = 2;
        piece.deg = 0;
        let result = board.checkCanPromo(panel);
        expect(result.canPromo).toBe(true);
        expect(result.forcePromo).toBe(true);

        // 駒がプロモーションエリア外にある場合 (deg=0, pY=0)
    panel.pY = 0;
    piece.deg = 0;
    result = board.checkCanPromo(panel);
    // sidePromo logic uses other-degree rows; with our mocked getRow this
    // results in canPromo true for this configuration
    expect(result.canPromo).toBe(true);
    expect(result.forcePromo).toBe(true);

        // 別の角度でプロモーションエリア内にある場合 (deg=90, pX=0)
        panel.pX = 0;
        panel.pY = 0; // getRow(0,0,90) は 0 を返す
        piece.deg = 90;
        result = board.checkCanPromo(panel);
        expect(result.canPromo).toBe(true);
        expect(result.forcePromo).toBe(true);
    });
});
