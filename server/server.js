// 必要なモジュールのインポート
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const { randomUUID } = require('crypto');

// --- 状態管理 ---
// ゲームルームを保持: { [gameName]: [ { id: roomId, sockets: Set(), numPlayers: number }, ... ] }
const games = {};
// WebSocketからルームIDへのマッピング: Map<ws, roomId>
const wsToRoomId = new Map();

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

		const {type, gameName, numPlayers, roomId} = data;

		if(type === "join"){
			if(!gameName) return;

			// gameNameに対応するゲームがなければ初期化
			if(!games[gameName]){
				games[gameName] = [];
			}

			// 切断済みのソケットを掃除
			games[gameName].forEach(room=>{
				room.sockets.forEach(player=>{
					if(player.readyState !== WebSocket.OPEN){
						room.sockets.delete(player);
					}
				});
			});
			// 空のルームも掃除
			games[gameName] = games[gameName].filter(room=>room.sockets.size > 0);

			// 参加可能なルームを探す
			let roomToJoin = games[gameName].find(room=>room.sockets.size < room.numPlayers);

			// 参加可能なルームがなければ新規作成
			if(!roomToJoin){
				roomToJoin = {
					id: randomUUID(),
					sockets: new Set(),
					numPlayers: numPlayers || 2,
				};
				games[gameName].push(roomToJoin);
				console.log(`New room created for game '${gameName}' with id ${roomToJoin.id}`);
			}

			// ルームにプレイヤーを追加
			roomToJoin.sockets.add(ws);
			wsToRoomId.set(ws, roomToJoin.id);

			console.log(`Client joined room ${roomToJoin.id} for game '${gameName}'. Players: ${roomToJoin.sockets.size}/${roomToJoin.numPlayers}`);

			// 必要なプレイヤー数が揃ったらゲーム開始
			if(roomToJoin.sockets.size === roomToJoin.numPlayers){
				console.log(`Game in room ${roomToJoin.id} ('${gameName}') starting with ${roomToJoin.numPlayers} players.`);
				const players = Array.from(roomToJoin.sockets);
				const degStep = 360 / roomToJoin.numPlayers;

				players.forEach((player, i)=>{
					const deg = i * degStep;
					// 角度情報をwsに紐づけておく（本来はもっと良い方法があるかも）
					player.deg = deg;
					const readyMsg = JSON.stringify({type: "readyOnline", playerId: i, deg: deg, roomId: roomToJoin.id});
					player.send(readyMsg);
				});
			}
		}
		else if(roomId){ // join以外のメッセージ (move, dropなど)
			// roomIdからルームを特定
			let targetRoom = null;
			for(const gameType in games){
				const room = games[gameType].find(r=>r.id === roomId);
				if(room){
					targetRoom = room;
					break;
				}
			}

			if(!targetRoom){
				console.error(`Room with id ${roomId} not found.`);
				return;
			}

			// 送信者の角度をメッセージに追加
			data.playerDeg = ws.deg;
			const messageWithDeg = JSON.stringify(data);

			// ルーム内の他のプレイヤーにメッセージを転送
			for(const player of targetRoom.sockets){
				if(player !== ws && player.readyState === WebSocket.OPEN){
					player.send(messageWithDeg);
				}
			}
		}
	});

	// クライアントの接続が閉じられたときのイベントハンドラ
	ws.on("close", ()=>{
		console.log("Client disconnected");
		const roomId = wsToRoomId.get(ws);
		if(!roomId) return;

		// クリーンアップ
		wsToRoomId.delete(ws);

		// プレイヤーが属していたルームを探して削除
		for(const gameName in games){
			const roomIndex = games[gameName].findIndex(r=>r.id === roomId);
			if(roomIndex !== -1){
				const room = games[gameName][roomIndex];
				room.sockets.delete(ws);

				// ルームに残っているプレイヤーに切断を通知
				const disconnectMsg = JSON.stringify({type: "disconnect"});
				for(const player of room.sockets){
					if(player.readyState === WebSocket.OPEN){
						player.send(disconnectMsg);
					}
				}

				// ルームが空になったら配列から削除
				if(room.sockets.size === 0){
					games[gameName].splice(roomIndex, 1);
					console.log(`Room ${roomId} is now empty and closed.`);
					// gameNameに紐づくルームがなくなったら、そのgameName自体も削除
					if(games[gameName].length === 0){
						delete games[gameName];
						console.log(`Game type '${gameName}' has no more rooms.`);
					}
				}
				break;
			}
		}
	});

	// WebSocketエラー
	ws.on("error", error=>{
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
