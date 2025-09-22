import {BoardCore, PROTECTED} from "@/core/boardCore.js";

describe("BoardCore.#rotateField", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "▲歩\n▽歩",
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);
    });

    test("should rotate the field 90 degrees right", ()=>{
        // 初期状態の盤面を保存
        const initialField = board.field.map(row => row.map(panel => panel.piece ? {char: panel.piece.char, deg: panel.piece.deg} : null));

        // #rotateField を直接呼び出す
        board[PROTECTED].rotateField(90);

        // 回転後の盤面を取得
        const rotatedField = board.field.map(row => row.map(panel => panel.piece ? {char: panel.piece.char, deg: panel.piece.deg} : null));

        // 期待される結果と比較
        // 2x2 の盤面で ▲歩\n▽歩 の場合
        // 初期状態: [[▲歩(0), null], [▽歩(180), null]]
        // 90度回転後: [[null, ▲歩(90)], [null, ▽歩(270)]] (位置と角度が変化)
        expect(rotatedField[0][0]?.char).toBe("歩");
        expect(rotatedField[0][0]?.deg).toBe(270);
        expect(rotatedField[0][1]?.char).toBe("歩");
        expect(rotatedField[0][1]?.deg).toBe(90);
    });

    test("should rotate the field 180 degrees", ()=>{
        // 初期状態の盤面を保存
        const initialField = board.field.map(row => row.map(panel => panel.piece ? {char: panel.piece.char, deg: panel.piece.deg} : null));

        // #rotateField を直接呼び出す
        board[PROTECTED].rotateField(180);

        // 回転後の盤面を取得
        const rotatedField = board.field.map(row => row.map(panel => panel.piece ? {char: panel.piece.char, deg: panel.piece.deg} : null));

        // 期待される結果と比較
        // 2x2 の盤面で ▲歩\n▽歩 の場合
        // 初期状態: [[▲歩(0), null], [▽歩(180), null]]
        // 180度回転後: [[null, ▽歩(0)], [null, ▲歩(180)]] (位置と角度が変化)
        expect(rotatedField[0][1]?.char).toBe("歩");
        expect(rotatedField[0][1]?.deg).toBe(0);
        expect(rotatedField[1][1]?.char).toBe("歩");
        expect(rotatedField[1][1]?.deg).toBe(180);
    });

    test("should return to initial state after 360 degrees rotation", ()=>{
        // 初期状態の盤面を保存
        const initialField = board.field.map(row => row.map(panel => panel.piece ? {char: panel.piece.char, deg: panel.piece.deg} : null));

        // #rotateField を直接呼び出す
        board[PROTECTED].rotateField(360);

        // 回転後の盤面を取得
        const rotatedField = board.field.map(row => row.map(panel => panel.piece ? {char: panel.piece.char, deg: panel.piece.deg} : null));

        // 360度回転後、初期状態に戻ることを確認
        expect(rotatedField).toEqual(initialField);
    });
});
