// 必要なモジュールのインポート
import express from "express";
import http from "http";
import {WebSocket, WebSocketServer} from "ws";
import path, {dirname} from "path";
import {fileURLToPath} from "url";
import {randomUUID} from 'crypto';

// --- 状態管理 ---
// ゲームルームを保持: { [gameKey]: [ { id: roomId, sockets: Set(), playerLen: number }, ... ] }
const games = {};
// WebSocketからルームIDへのマッピング: Map<ws, roomId>
const wsToRoomId = new Map();

// Expressアプリケーションの初期化
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});

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

		const {type, gameKey, playerLen, roomId} = data;

		if(type === "join"){
			if(!gameKey) return;

			// gameKeyに対応するゲームがなければ初期化
			if(!games[gameKey]){
				games[gameKey] = [];
			}

			// 切断済みのソケットを掃除
			games[gameKey].forEach(room=>{
				room.sockets.forEach(player=>{
					if(player.readyState !== WebSocket.OPEN){
						room.sockets.delete(player);
					}
				});
			});
			// 空のルームも掃除
			games[gameKey] = games[gameKey].filter(room=>0 < room.sockets.size);

			// 参加可能なルームを探す
			let roomToJoin = games[gameKey].find(room=>room.sockets.size < room.playerLen);

			// 参加可能なルームがなければ新規作成
			if(!roomToJoin){
				roomToJoin = {
					id: randomUUID(),
					sockets: new Set(),
					playerLen: playerLen || 2,
				};
				games[gameKey].push(roomToJoin);
				console.log(`New room created for game '${gameKey}' with id ${roomToJoin.id}`);
			}

			// ルームにプレイヤーを追加
			roomToJoin.sockets.add(ws);
			wsToRoomId.set(ws, roomToJoin.id);

			console.log(`Client joined room ${roomToJoin.id} for game '${gameKey}'. Players: ${roomToJoin.sockets.size}/${roomToJoin.playerLen}`);

			// 必要なプレイヤー数が揃ったらゲーム開始
			if(roomToJoin.sockets.size === roomToJoin.playerLen){
				console.log(`Game in room ${roomToJoin.id} ('${gameKey}') starting with ${roomToJoin.playerLen} players.`);
				const players = Array.from(roomToJoin.sockets);
				const degStep = 360 / roomToJoin.playerLen;

				players.forEach((player, i)=>{
					const deg = i * degStep;
					// 角度情報をwsに紐づけておく（本来はもっと良い方法があるかも）
					player.deg = deg;
					const readyMsg = JSON.stringify({type: "readyOnline", playerId: i, deg: deg, roomId: roomToJoin.id});
					player.send(readyMsg);
				});
			}
		}
		else if(type === "cancelJoin"){
			const roomId = wsToRoomId.get(ws);
			if(!roomId) return;

			// プレイヤーが属していたルームを探して削除
			for(const gameKey in games){
				const roomIndex = games[gameKey].findIndex(r=>r.id === roomId);
				if(roomIndex !== -1){
					const room = games[gameKey][roomIndex];

					// マッチングが成立していないルームでのみキャンセル処理を行う
					if(room.sockets.size < room.playerLen){
						room.sockets.delete(ws);
						wsToRoomId.delete(ws);

						console.log(`Client cancelled matching and left room ${roomId}. Players: ${room.sockets.size}/${room.playerLen}`);

						// クライアントにキャンセル成功を通知
						try{
							ws.send(JSON.stringify({type: "cancelled"}));
						}
						catch(e){
							console.error("Failed to send cancellation confirmation:", e);
						}

						// ルームが空になったら配列から削除
						if(room.sockets.size === 0){
							games[gameKey].splice(roomIndex, 1);
							console.log(`Room ${roomId} is now empty and closed.`);
							if(games[gameKey].length === 0){
								delete games[gameKey];
								console.log(`Game type '${gameKey}' has no more rooms.`);
							}
						}
					}
					break;
				}
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
		for(const gameKey in games){
			const roomIndex = games[gameKey].findIndex(r=>r.id === roomId);
			if(roomIndex !== -1){
				const room = games[gameKey][roomIndex];
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
					games[gameKey].splice(roomIndex, 1);
					console.log(`Room ${roomId} is now empty and closed.`);
					// gameKeyに紐づくルームがなくなったら、そのgameKey自体も削除
					if(games[gameKey].length === 0){
						delete games[gameKey];
						console.log(`Game type '${gameKey}' has no more rooms.`);
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

// サーバーを起動
const PORT = process.env.PORT || 8080;
server.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
});
