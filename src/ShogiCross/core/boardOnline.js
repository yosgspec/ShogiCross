/** @typedef {import("./board.js").BoardInitOption} BoardInitOption */
/** @typedef {import("./panel.js").Panel} Panel */
import {Board, PROTECTED as $} from "./board.js";

export class BoardOnline extends Board{
	/**
	 * @typedef {Object} BoardOnlineInitOption - ボードの初期化オプション
	 * @extends BoardInitOption
	 * @prop {(e:string, BoardOnline)=>void} onReadyOnline - 接続完了イベント
	 * @prop {string} serverURL - 接続するサーバーURL(http(s)://～)
	 */
	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardOnlineInitOption} option - ボードの初期化オプション
	 */
	constructor(canvas, option){
		super(canvas, option);
		const {
			onReadyOnline = null,
			serverURL = "http://localhost:3000",
		} = option;
		const playerOptions = this.option.playerOptions ?? [];
		this.onReadyOnline = onReadyOnline;
		this.isOnlineGame = playerOptions.some(p=>p.isOnline);

		if(!this.isOnlineGame) return;

		// isLocalプロパティをプレイヤーに追加
		this.players.forEach(player=>{
			const option = playerOptions[player.id] ?? {};
			player.isOnline = option.isOnline ?? false;
			player.isLocal = false; // 初期状態ではローカルプレイヤーではない
		});

		// viewingAngleプロパティを追加
		this.viewingAngle = 0; // 盤面の視点角度

		// WebSocketのセットアップ
		// HTTP/HTTPSのURLをWebSocketのws/wssプロトコルに変換して接続
		this.ws = new WebSocket(serverURL.replace(/^http/, "ws"));

		this.ws.onopen = ()=>{
			console.log("WebSocket connection established.");
			// サーバーにゲーム参加メッセージを送信
			this.ws.send(JSON.stringify({type: "join", gameName: this.name}));
		};

		this.ws.onmessage = event=>{
			console.log("Received message from server:", event.data);
			try{
				const message = JSON.parse(event.data);
				switch(message.type){
					case "move": {
						// サーバーから受信した移動情報に基づいて駒を移動
						const fromPanel = this.field[message.from.pY][message.from.pX];
						const toPanel = this.field[message.to.pY][message.to.pX];
						// リモートからの移動を盤面に適用
						this.applyRemoteMove(fromPanel, toPanel, message.playerDeg+this.viewingAngle); // message.playerDegを追加
						break;
					}
					case "readyOnline": {
						this.onReadyOnline?.(message, this);
						// サーバーからプレイヤーの割り当て情報を受信
						const myPlayer = [...this.players.values()].find(p=>p.id === message.playerId);
						if(myPlayer){
							myPlayer.isLocal = true; // 自身をローカルプレイヤーとして設定
							// 盤面を自分の視点に回転
							this[$].rotateField(myPlayer.deg);
							this.stand.rotate(myPlayer.deg);
							this.viewingAngle = myPlayer.deg; // 視点角度を更新
							if(this.autoDrawing) this.draw();
						}
						break;
					}
					// その他のメッセージタイプもここに追加可能
				}
			}
			catch(ex){
				console.error("Error parsing message from server:", ex);
			}
		};

		this.ws.onclose = ()=>{
			console.log("WebSocket connection closed.");
			// 接続が切れたことをユーザーに通知
			this[$].dialog?.show("接続エラー", "サーバーとの接続が切れました。");
		};

		this.ws.onerror = ex=>{
			console.error("WebSocket error:", ex);
			// WebSocketエラーをユーザーに通知
			this[$].dialog?.show("接続エラー", "サーバーとの接続でエラーが発生しました。");
		};
	}

	/**
	 * リモートからの移動を盤面に適用する
	 * @param {Panel} fromPanel - 移動元のパネル
	 * @param {Panel} toPanel - 移動先のパネル
	 * @param {number} deg - 移動を行ったプレイヤーの視点角度
	 */
	async applyRemoteMove(fromPanel, toPanel, deg){
		console.log(deg)
		// 盤面を一時的に元の視点に戻す
		this[$].rotateField(-deg);
		this.stand.rotate(-deg);

		this.stand.capturePiece(
			fromPanel.piece,
			toPanel.piece,
			toPanel.hasAttr("capture"),
			toPanel.hasAttr("cantCapture")
		);

		this.simpleMovePiece(fromPanel, toPanel);

		const {canPromo, forcePromo} = this.checkCanPromo(toPanel);
		const piece = toPanel.piece;
		// 駒の角度を調整
		piece.deg += this.degNormal(deg+this.viewingAngle);
		await this.promoPiece(fromPanel, toPanel, canPromo, forcePromo, true);
		piece.deg -= this.degNormal(deg+this.viewingAngle);

		// 盤面を元の視点に戻す
		this[$].rotateField(deg);
		this.stand.rotate(deg);

		if (this.autoDrawing) this.draw();
		this[$].emitGameOver();
	}

	/**
	 * 駒の移動処理（オンラインゲームの場合、サーバーに移動情報を送信）
	 * @param {Panel} fromPanel - 移動元のパネル
	 * @param {Panel} toPanel - 移動先のパネル
	 * @param {boolean} isCpuMove - CPUによる移動かどうか
	 * @returns {Promise<boolean>} - 移動が成功したかどうか
	 */
	async movePiece(fromPanel, toPanel, isCpuMove = false) {
		const activePlayer = this.getActivePlayer();

		// アクティブプレイヤーがオンラインかつローカルプレイヤーの場合
		if(activePlayer.isOnline && activePlayer.isLocal){
			if(toPanel.isTarget){
				const moveData = {
					type: "move", // メッセージタイプを"move"に設定
					from: {pX: fromPanel.pX, pY: fromPanel.pY}, // 移動元の座標
					to: {pX: toPanel.pX, pY: toPanel.pY},     // 移動先の座標
				};
				// 移動情報をサーバーに送信
				this.ws.send(JSON.stringify(moveData));
				// 親クラスのmovePieceメソッドを呼び出し、ローカルで移動を適用
				return await super.movePiece(fromPanel, toPanel, isCpuMove);
			}
			return false; // ターゲットでない場合は移動しない
		}

		return await super.movePiece(fromPanel, toPanel, isCpuMove);
	}
}
