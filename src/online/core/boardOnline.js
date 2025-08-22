
import { Board, PROTECTED as $ } from "./board.js";

export class BoardOnline extends Board {
	constructor(canvas, option) {
		super(canvas, option);
		const playerOptions = this.option.playerOptions || [];
		this.isOnlineGame = playerOptions.some(p => p.isOnline);

		if (!this.isOnlineGame) return;

		// isLocalプロパティをプレイヤーに追加
		this.players.forEach(player => {
			const option = playerOptions[player.id] || {};
			player.isOnline = option.isOnline ?? false;
			player.isLocal = false;
		});

		// viewingAngleプロパティを追加
		this.viewingAngle = 0;

		// WebSocketのセットアップ
	this.ws = new WebSocket("ws://localhost:3000");

		this.ws.onopen = () => {
			console.log("WebSocket connection established.");
			this.ws.send(JSON.stringify({ type: 'join', gameName: this.name }));
		};

		this.ws.onmessage = (event) => {
			this.onReadyOnline?.(event, this);
			console.log("Received message from server:", event.data);
			try {
				const message = JSON.parse(event.data);
				switch (message.type) {
					case 'move': {
						const fromPanel = this.field[message.from.pY][message.from.pX];
						const toPanel = this.field[message.to.pY][message.to.pX];
						this.applyRemoteMove(fromPanel, toPanel);
						break;
					}
					case 'playerAssignment': {
						const myPlayer = [...this.players.values()].find(p => p.id === message.playerId);
						if (myPlayer) {
							myPlayer.isLocal = true;
							// 盤面を自分の視点に回転
							const rotationAmount = this.degNormal(myPlayer.deg - this.viewingAngle);
							if (rotationAmount !== 0) {
								this[$].rotateField(rotationAmount);
								this.stand.rotate(rotationAmount);
								this.viewingAngle = myPlayer.deg;
								if (this.autoDrawing) this.draw();
							}
						}
						break;
					}
				}
			} catch (error) {
				console.error("Error parsing message from server:", error);
			}
		};

		this.ws.onclose = () => {
			console.log("WebSocket connection closed.");
			this[$].dialog?.show("接続エラー", "サーバーとの接続が切れました。", [{ label: "OK" }]);
		};

		this.ws.onerror = (error) => {
			console.error("WebSocket error:", error);
			this[$].dialog?.show("接続エラー", "サーバーとの接続でエラーが発生しました。", [{ label: "OK" }]);
		};
	}

	async applyRemoteMove(fromPanel, toPanel) {
		this[$].rotateField(180);
		this.stand.rotate(180);

		this.stand.capturePiece(
			fromPanel.piece,
			toPanel.piece,
			toPanel.hasAttr("capture"),
			toPanel.hasAttr("cantCapture")
		);

		this.simpleMovePiece(fromPanel, toPanel);

		const { canPromo, forcePromo } = this.checkCanPromo(toPanel);
		await this.promoPiece(fromPanel, toPanel, canPromo, forcePromo, true);

		this[$].rotateField(180);
		this.stand.rotate(180);

		if (this.autoDrawing) this.draw();
		this[$].emitGameOver();
	}

	async movePiece(fromPanel, toPanel, isCpuMove = false) {
		const activePlayer = this.getActivePlayer();

		if (activePlayer.isOnline && activePlayer.isLocal) {
			if (toPanel.isTarget) {
				const moveData = {
					type: 'move',
					from: { pX: fromPanel.pX, pY: fromPanel.pY },
					to: { pX: toPanel.pX, pY: toPanel.pY },
				};
				this.ws.send(JSON.stringify(moveData));
				return await super.movePiece(fromPanel, toPanel, isCpuMove);
			}
			return false;
		}

		return await super.movePiece(fromPanel, toPanel, isCpuMove);
	}
}
