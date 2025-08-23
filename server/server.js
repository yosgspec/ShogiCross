// 必要なモジュールのインポート
const express = require("express"); // Webサーバーフレームワーク
const http = require("http");       // HTTPサーバーの作成
const WebSocket = require("ws");    // WebSocketサーバー
const path = require("path");       // ファイルパスの解決
const {randomUUID} = require("crypto");

// Expressアプリケーションの初期化
const app = express();
// HTTPサーバーの作成（Expressアプリをリクエストハンドラとして使用）
const server = http.createServer(app);
// WebSocketサーバーの初期化（既存のHTTPサーバーにアタッチ）
const wss = new WebSocket.Server({ server });

// ゲーム開始を待っているプレイヤーを一時的に保持する変数
let waitingPlayer = null;
// 現在アクティブなゲームの状態を保存するオブジェクト
// gameIdをキーとして、ゲームに参加しているプレイヤーなどの情報を保持
const games = {};

// WebSocket接続が確立されたときのイベントハンドラ
wss.on("connection", (ws)=>{
    console.log("Client connected");
    // クライアントにユニークなIDを割り当て
    const clientId = randomUUID();
    ws.clientId = clientId;

    // 待機中のプレイヤーがいる場合、新しいゲームを開始
    if(waitingPlayer){
        const gameId = randomUUID(); // 新しいゲームIDを生成
        // ゲームオブジェクトを作成し、2人のプレイヤーを割り当て
        const game = {
            id: gameId,
            players: [waitingPlayer, ws],
        };
        games[gameId] = game; // gamesオブジェクトにゲーム状態を保存

        // 各プレイヤーにゲームIDとプレイヤーの視点角度を割り当てて通知
		game.players.forEach((playerWs, i)=>{
			playerWs.gameId = gameId; // WebSocketオブジェクトにゲームIDを保存
			// プレイヤーの視点角度を計算 (例: 0度と180度)
			const playerDeg = (i*360/game.players.length)%360;
			playerWs.playerDeg = playerDeg; // WebSocketオブジェクトに視点角度を保存
			// クライアントにプレイヤーの割り当て情報を送信
			playerWs.send(JSON.stringify({
				type: "readyOnline",
				playerId: i, // プレイヤーID (0または1)
				playerDeg: playerDeg // 視点角度
			}));
		});

        console.log(`Game ${gameId} started between ${game.players[0].clientId} and ${game.players[1].clientId}`);
        waitingPlayer = null; // 待機中のプレイヤーをクリア
    }
    else{
        // 待機中のプレイヤーがいない場合、現在のクライアントを待機状態にする
        waitingPlayer = ws;
        console.log(`Client ${ws.clientId} is waiting for an rival.`);
        // クライアントに待機中であることを通知
        ws.send(JSON.stringify({type: "waiting"}));
    }

    // クライアントからメッセージを受信したときのイベントハンドラ
    ws.on("message", (message)=>{
        try {
            const data = JSON.parse(message); // 受信したメッセージをJSONとしてパース
            const game = games[ws.gameId]; // クライアントが参加しているゲームを取得
            if(!game) return; // ゲームが存在しない場合は何もしない

            // 対戦相手を見つける
            const rival = game.players.find(p=>p.clientId !== ws.clientId);

            // メッセージタイプが"move"の場合の処理
            if(data.type === "move" && rival){
                console.log(`Move from ${ws.clientId} in game ${ws.gameId}:`, data);
                // 送信元のプレイヤーの視点角度をメッセージに追加
                data.playerDeg = ws.playerDeg;
                // 移動情報を対戦相手にブロードキャスト（転送）
                rival.send(JSON.stringify(data));
            }
            // メッセージタイプが"join"の場合の処理（現在はログ出力のみ）
            else if(data.type === "join"){
                 console.log(`Join message from ${ws.clientId} for game: ${data.gameName}`);
            }

        }
        catch(ex){
            console.error("Failed to process message:", message, ex);
        }
    });

    // クライアントの接続が閉じられたときのイベントハンドラ
    ws.on("close", ()=>{
        console.log(`Client ${ws.clientId} disconnected`);
        const game = games[ws.gameId]; // クライアントが参加していたゲームを取得
        if(game){
            // 対戦相手に切断を通知
            const rival = game.players.find(p => p.clientId !== ws.clientId);
            if(rival && rival.readyState === WebSocket.OPEN){
                rival.send(JSON.stringify({type: "rivalDisconnect"}));
            }
            delete games[ws.gameId]; // ゲームを削除
            console.log(`Game ${ws.gameId} closed.`);
        }
        // 切断されたクライアントが待機中のプレイヤーだった場合、待機状態をクリア
        if(ws === waitingPlayer){
            waitingPlayer = null;
            console.log("Waiting player disconnected.");
        }
    });
});

// サーバーがリッスンするポート番号
const PORT = process.env.PORT || 3000;
// 指定されたポートでHTTPサーバーを起動
server.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});

// 静的ファイルを配信するためのミドルウェア設定
// プロジェクトのルートディレクトリを静的ファイルの配信元として設定
app.use(express.static(path.join(__dirname, "..")));
