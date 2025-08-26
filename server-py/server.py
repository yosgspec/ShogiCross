import asyncio
import json
import websockets

# --- Global State ---
# C#のConcurrentDictionaryの代わりに、ロックで保護された通常のdictを使用します

# ゲームルームを保持: {gameName: [ws1, ws2]}
GAMES = {}
# WebSocketからゲーム名へのマッピング: {ws: gameName}
WS_TO_GAME = {}
# WebSocketから角度へのマッピング: {ws: deg}
WS_TO_DEG = {}

# 共有リソースへのアクセスを制御するためのロック
STATE_LOCK = asyncio.Lock()

async def handler(websocket):
	""""""
	新しいクライアント接続ごとに呼び出されるハンドラ
	""""""
	print(f"Client connected: {websocket.remote_address}")
	try:
		async for message in websocket:
			print(f"Received: {message}")
			data = json.loads(message)
			msg_type = data.get("type")

			if msg_type == "join":
				game_name = data.get("gameName")
				player1, player2 = None, None

				async with STATE_LOCK:
					# ゲームルームを取得または作成
					if game_name not in GAMES:
						GAMES[game_name] = []
					game = GAMES[game_name]

					# 参加前に、切断済みのソケットを掃除する
					game[:] = [ws for ws in game if not ws.closed]

					# 新しいプレイヤーを追加
					game.append(websocket)
					WS_TO_GAME[websocket] = game_name
					print(f"Client joined game: '{game_name}'. Players: {len(game)}")

					# 2人揃ったらゲーム開始の準備
					if len(game) == 2:
						print(f"Game '{game_name}' starting with 2 players.")
						player1, player2 = game[0], game[1]
						WS_TO_DEG[player1] = 0
						WS_TO_DEG[player2] = 180

				# ロックの外で非同期の送信処理を行う
				if player1 and player2:
					ready_msg1 = json.dumps({"type": "readyOnline", "playerId": 0})
					ready_msg2 = json.dumps({"type": "readyOnline", "playerId": 1})
					await asyncio.gather(
						player1.send(ready_msg1),
						player2.send(ready_msg2)
					)

			else: # join以外のメッセージ (move, dropなど)
				game_name = WS_TO_GAME.get(websocket)
				if not game_name or game_name not in GAMES:
					continue

				# 送信者の角度をメッセージに追加
				data["playerDeg"] = WS_TO_DEG.get(websocket, 0)
				message_with_deg = json.dumps(data)

				# 対戦相手にメッセージを転送
				game = GAMES[game_name]
				opponent = next((ws for ws in game if ws != websocket), None)
				if opponent and not opponent.closed:
					await opponent.send(message_with_deg)

	except websockets.exceptions.ConnectionClosed:
		print(f"Client connection closed: {websocket.remote_address}")
	except Exception as e:
		print(f"Error during communication with {websocket.remote_address}: {e}")
	finally:
		# --- クリーンアップ処理 ---
		print(f"Client disconnected: {websocket.remote_address}")
		remaining_player = None
		async with STATE_LOCK:
			game_name = WS_TO_GAME.pop(websocket, None)
			WS_TO_DEG.pop(websocket, None)

			if game_name and game_name in GAMES:
				game = GAMES[game_name]
				if websocket in game:
					game.remove(websocket)

				# ルームに残っているプレイヤーを取得
				if len(game) > 0:
					remaining_player = game[0]
				else:
					# ルームが空になったら削除
					del GAMES[game_name]

		# ロックの外で切断メッセージを送信
		if remaining_player and not remaining_player.closed:
			disconnect_msg = json.dumps({"type": "disconnect"})
			await remaining_player.send(disconnect_msg)

async def main():
	port = 3000 # C#版とポートを合わせる
	print(f"Python WebSocket server starting on port {port}")
	async with websockets.serve(handler, "localhost", port):
		await asyncio.Future()  # サーバーを永続的に実行

if __name__ == "__main__":
	asyncio.run(main())
