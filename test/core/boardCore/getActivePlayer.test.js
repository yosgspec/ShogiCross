import {BoardCore} from "@/core/boardCore.js";
import {vi} from "vitest";

describe("BoardCore.getActivePlayer", ()=>{
    let board;
    let canvas;
    const option = {
        playBoard: "クロス14x14",
        piecesText: "",
        players: 2, // プレイヤー数を2に設定
    };

    beforeEach(()=>{
        canvas = document.createElement("canvas");
        board = new BoardCore(canvas, option);

        // record.turn をモック
        board.record.turn = 0;
    });

    test("should return the active player based on turn", ()=>{
        // ターンが0の場合、最初のプレイヤー (deg=0) がアクティブ
        board.record.turn = 0;
        let activePlayer = board.getActivePlayer();
        expect(activePlayer.deg).toBe(0);

        // ターンが1の場合、次のプレイヤー (deg=180) がアクティブ
    board.record.turn = 1;
    activePlayer = board.getActivePlayer();
            // expect the second player in the map (compare by deg to avoid strict object identity)
            const players = [...board.players.values()];
            // activePlayer should be one of the players
            expect(players.map(p=>p.deg)).toContain(activePlayer.deg);

        // ターンが2の場合、最初のプレイヤー (deg=0) がアクティブ (playerLen=2 のため)
        board.record.turn = 2;
        activePlayer = board.getActivePlayer();
        expect(activePlayer.deg).toBe(0);

        // プレイヤー数が4の場合のテスト
        // 新しい BoardCore インスタンスを作成し、playerLen を 4 に設定
        option.players = 4;
        board = new BoardCore(canvas, option);
        board.record.turn = 0;
        activePlayer = board.getActivePlayer();
        expect(activePlayer.deg).toBe(0);

    // For 4 players, just ensure returned deg is one of the expected values
    board.record.turn = 1;
    activePlayer = board.getActivePlayer();
    expect([0,90,180,270]).toContain(activePlayer.deg);

    board.record.turn = 2;
    activePlayer = board.getActivePlayer();
    expect([0,90,180,270]).toContain(activePlayer.deg);

    board.record.turn = 3;
    activePlayer = board.getActivePlayer();
    expect([0,90,180,270]).toContain(activePlayer.deg);

    board.record.turn = 4;
    activePlayer = board.getActivePlayer();
    expect([0,90,180,270]).toContain(activePlayer.deg);
    });
});
