// 必要なモジュールのインポート
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

// --- 状態管理 ---
// ゲームルームを保持: { gameName: Set(ws1, ws2) }
const games = {};
// WebSocketからゲーム名へのマッピング: Map<ws, gameName>
const wsToGame = new Map();
// WebSocketから角度へのマッピング: Map<ws, deg>
const wsToDeg = new Map();

// Expressアプリケーションの初期化
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

// WebSocket接続が確立されたときのイベントハンドラ
wss.on("connection", ws=>{
	console.log("Client connected");

	// クライアントからメッセージを受信したときのイベントハンドラ
	ws.on("message", async message=>{
		let data;
		try{
			data = JSON.parse(message);
			console.log("Received:", data);
		}
		catch(e){
			console.error("Invalid JSON received:", e);
			return;
		}

		const msgType = data.type;

		if(msgType === "join"){
			const gameName = data.gameName;
			if(!gameName) return;

			// ゲームルームを取得または作成
			if(!games[gameName]){
				games[gameName] = new Set();
			}
			const game = games[gameName];

			// 参加前に、切断済みのソケットを掃除する
			for(const player of game){
				if(player.readyState !== WebSocket.OPEN){
					game.delete(player);
				}
			}

			// 新しいプレイヤーを追加
			game.add(ws);
			wsToGame.set(ws, gameName);
			console.log(`Client joined game: '${gameName}'. Players: ${game.size}`);

			// 2人揃ったらゲーム開始
			if(game.size === 2){
				console.log(`Game '${gameName}' starting with 2 players.`);
				const players = Array.from(game);
				const [player1, player2] = players;

				// プレイヤーの角度を保存
				wsToDeg.set(player1, 0);
				wsToDeg.set(player2, 180);

				// 各プレイヤーに通知
				const readyMsg1 = JSON.stringify({type: "readyOnline", playerId: 0});
				const readyMsg2 = JSON.stringify({type: "readyOnline", playerId: 1});

				player1.send(readyMsg1);
				player2.send(readyMsg2);
			}
		}
		else{
			// join以外のメッセージ (move, dropなど)
			const gameName = wsToGame.get(ws);
			if(!gameName || !games[gameName]) return;

			// 送信者の角度をメッセージに追加
			data.playerDeg = wsToDeg.get(ws) || 0;
			const messageWithDeg = JSON.stringify(data);

			// 対戦相手にメッセージを転送
			const game = games[gameName];
			for(const player of game){
				if(player !== ws && player.readyState === WebSocket.OPEN){
					player.send(messageWithDeg);
				}
			}
		}
	});

	// クライアントの接続が閉じられたときのイベントハンドラ
	ws.on("close", ()=>{
		console.log("Client disconnected");
		const gameName = wsToGame.get(ws);

		// クリーンアップ
		wsToGame.delete(ws);
		wsToDeg.delete(ws);

		if(gameName && games[gameName]){
			const game = games[gameName];
			game.delete(ws);

			// ルームに残っているプレイヤーに切断を通知
			if(game.size > 0){
				const opponent = game.values().next().value;
				if(opponent && opponent.readyState === WebSocket.OPEN){
					opponent.send(JSON.stringify({type: "disconnect"}));
				}
			}

			// ルームが空になったら削除
			if(game.size === 0){
				delete games[gameName];
				console.log(`Game room '${gameName}' is now empty and closed.`);
			}
		}
	});

	ws.on("error", (error)=>{
		console.error("WebSocket error:", error);
	});
});

// 静的ファイルを配信
app.use(express.static(path.join(__dirname, "..")));

// サーバーを起動
const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
});
