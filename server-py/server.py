import asyncio
import json
import os
import websockets
from websockets.connection import State

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
	"""
	新しいクライアント接続ごとに呼び出されるハンドラ
	"""
	print(f"Client connected: {websocket.remote_address}")
	try:
		async for message in websocket:
			print(f"Received: {message}")
			data = json.loads(message)
			msgType = data.get("type")

			if msgType == "join":
				gameName = data.get("gameName")
				player1, player2 = None, None

				async with STATE_LOCK:
					# ゲームルームを取得または作成
					if gameName not in GAMES:
						GAMES[gameName] = []
					game = GAMES[gameName]

					# 参加前に、切断済みのソケットを掃除する
					game[:] = [ws for ws in game if ws.state == State.OPEN]

					# 新しいプレイヤーを追加
					game.append(websocket)
					WS_TO_GAME[websocket] = gameName
					print(f"Client joined game: '{gameName}'. Players: {len(game)}")

					# 2人揃ったらゲーム開始の準備
					if len(game) == 2:
						print(f"Game '{gameName}' starting with 2 players.")
						player1, player2 = game[0], game[1]
						WS_TO_DEG[player1] = 0
						WS_TO_DEG[player2] = 180

				# ロックの外で非同期の送信処理を行う
				if player1 and player2:
					await asyncio.gather(
						player1.send(json.dumps({"type": "readyOnline", "playerId": 0})),
						player2.send(json.dumps({"type": "readyOnline", "playerId": 1}))
					)

			else: # join以外のメッセージ (move, dropなど)
				gameName = WS_TO_GAME.get(websocket)
				if not gameName or gameName not in GAMES:
					continue

				# 送信者の角度をメッセージに追加
				data["playerDeg"] = WS_TO_DEG.get(websocket, 0)
				messageWithDeg = json.dumps(data)

				# 対戦相手にメッセージを転送
				game = GAMES[gameName]
				opponent = next((ws for ws in game if ws != websocket), None)
				if opponent and opponent.state == State.OPEN:
					await opponent.send(messageWithDeg)

	except websockets.exceptions.ConnectionClosed:
		print(f"Client connection closed: {websocket.remote_address}")
	except Exception as e:
		print(f"Error during communication with {websocket.remote_address}: {e}")
	finally:
		# --- クリーンアップ処理 ---
		print(f"Client disconnected: {websocket.remote_address}")
		remainingPlayer = None
		async with STATE_LOCK:
			gameName = WS_TO_GAME.pop(websocket, None)
			WS_TO_DEG.pop(websocket, None)

			if gameName and gameName in GAMES:
				game = GAMES[gameName]
				if websocket in game:
					game.remove(websocket)

				# ルームに残っているプレイヤーを取得
				if len(game) > 0:
					remainingPlayer = game[0]
				else:
					# ルームが空になったら削除
					del GAMES[gameName]

		# ロックの外で切断メッセージを送信
		if remainingPlayer and not remainingPlayer.closed:
			await remainingPlayer.send(json.dumps({"type": "disconnect"}))

async def main():
	port = int(os.environ.get("PORT", 8080))
	print(f"Python WebSocket server starting on port {port}")
	async with websockets.serve(handler, "0.0.0.0", port):
		await asyncio.Future()  # 永続的に実行

if __name__ == "__main__":
	asyncio.run(main())
