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
        const initialPieces = [];
        board.field.forEach((row, y) => row.forEach((panel, x) => {
            if(panel.piece) initialPieces.push({x, y, char: panel.piece.char, deg: panel.piece.deg});
        }));

        // #rotateField を直接呼び出す
        board[PROTECTED].rotateField(90);

        // 回転後の盤面を取得
        const afterPieces = [];
        board.field.forEach((row, y) => row.forEach((panel, x) => {
            if(panel.piece) afterPieces.push({x, y, char: panel.piece.char, deg: panel.piece.deg});
        }));

        // 回転によって駒の個数は変わらない
        expect(afterPieces.length).toBe(initialPieces.length);

        // 各駒について、角度が90度増える (mod 360) または減る挙動が見られること
        // 少なくとも1つの駒で角度変化が観測されることを期待する
        const hasDegChange = initialPieces.some(init => afterPieces.some(a=>a.char===init.char && a.deg !== init.deg));
        expect(hasDegChange).toBe(true);
    });

    test("should rotate the field 180 degrees", ()=>{
        const initialPieces = [];
        board.field.forEach((row, y) => row.forEach((panel, x) => {
            if(panel.piece) initialPieces.push({x, y, char: panel.piece.char, deg: panel.piece.deg});
        }));

        board[PROTECTED].rotateField(180);

        const afterPieces = [];
        board.field.forEach((row, y) => row.forEach((panel, x) => {
            if(panel.piece) afterPieces.push({x, y, char: panel.piece.char, deg: panel.piece.deg});
        }));

        expect(afterPieces.length).toBe(initialPieces.length);
        // 180度回転では向きが変わる駒が存在するはず
        const hasDegChange = initialPieces.some(init => afterPieces.some(a=>a.char===init.char && a.deg !== init.deg));
        expect(hasDegChange).toBe(true);
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
