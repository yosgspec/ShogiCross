/** @typedef {import("./board.js").BoardInitOption} BoardInitOption */
/** @typedef {import("./panel.js").Panel} Panel */
import {Board, PROTECTED as $} from "./board.js";
import {Stand} from "./stand.js";
import {Piece} from "./piece.js";
import {Panel} from "./panel.js";

export class BoardOnline extends Board{
	/** @typedef {Object} BoardOnline */

	/** ゲームを実行する
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardOnlineInitOption} option - ボードの初期化オプション
	 * @returns {BoardOnline}
	 */
	static run(canvas, option){
		return new BoardOnline(canvas, option);
	}
	/**
	 * @typedef {Object} BoardOnlineInitOption - ボードの初期化オプション
	 * @extends BoardInitOption
	 * @prop {(e:string, board:BoardOnline)=>void} onReadyOnline - 接続完了イベント
	 * @prop {(board:BoardOnline)=>void} onCancelOnline - 接続キャンセルイベント
	 * @prop {string} serverURL - 接続するサーバーURL(http(s)://～)
	 * @prop {string} gameKey - オンライン用ゲーム接続キー
	 */
	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardOnlineInitOption} option - ボードの初期化オプション
	 */
	constructor(canvas, option){
		option.useUIControl ??= [
			"downloadImage",
			"downloadRecord",
			"textRecord",
		];
		option.uiControlRecordOption ??= {readonly: true};

		super(canvas, option);
		const {
			onReadyOnline = null,
			onCancelOnline = null,
			serverURL = "http://localhost:8080",
			gameKey = encodeURI(JSON.stringify(option)),
		} = option;
		const {playerLen} = this;
		this.onReadyOnline = onReadyOnline;
		this.onCancelOnline = onCancelOnline;
		this.isOnline = true;
		this.isReadyOnline = false;
		this.gameKey = gameKey;
		this.roomId = null;
		this.moveMode = "vs";

		// isLocalプロパティをプレイヤーに追加
		this.players.forEach(player=>{
			player.isLocal = false; // 初期状態ではローカルプレイヤーではない
			player.cpuEngine = null;
			player.cpu = null;
		});

		// WebSocketのセットアップ
		// HTTP/HTTPSのURLをWebSocketのws/wssプロトコルに変換して接続
		this.ws = new WebSocket(serverURL.replace(/^http/, "ws"));

		this.ws.onopen = async ()=>{
			console.log("WebSocket connection established.");
			// サーバーにゲーム参加メッセージを送信
			this.ws.send(JSON.stringify({type: "join", gameKey, playerLen}));
			this.overlay.start();
			if(await this[$].dialog.show("", "マッチング待機中...", [{label: "キャンセル", value: true}])){
				this.ws.send(JSON.stringify({type: "cancelJoin"}));
				this.overlay.stop();
				this.onCancelOnline?.(this);
			};
		};

		this.ws.onmessage = event=>{
			console.log("Received message from server:", event.data);
			try{
				const message = JSON.parse(event.data);
				switch(message.type){
					// プレイヤーとマッチングした場合
					case "readyOnline":
						this.isReadyOnline = true;
						this.roomId = message.roomId;
						// サーバーからプレイヤーの割り当て情報を受信
						const myPlayer = [...this.players.values()].find(p=>p.id === message.playerId);
						if(myPlayer){
							myPlayer.isLocal = true; // 自身をローカルプレイヤーとして設定
							// 盤面を自分の視点に回転
							this[$].rotateField(myPlayer.deg);
							this.stand.rotate(myPlayer.deg);
							this.displayDeg = myPlayer.deg; // 視点角度を更新
							if(this.autoDrawing) this.draw();
						}
						this.overlay.stop();
						this[$].dialog.close();
						this.onReadyOnline?.(message, this);
						return;

					// 駒が動いた場合
					case "move":
						this.moveRivalPiece(message);
						return;

					// 駒が駒台から打たれた場合
					case "drop":
						this.dropRivalPiece(message);
						return;

					// 対戦相手の接続が切れた場合
					case "disconnect":
						this[$].dialog?.show("接続エラー", "対戦相手が切断しました。");
						return;
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

		// オンライン用駒台クラス
		class StandOnline extends Stand{
			/** 持ち駒からボード上に配置する
			 * @param {Panel} toPanel - 配置先のパネル
			 * @param {Object} option - オプション
			 * @param {number} option.deg - 角度
			 * @param {number} option.i - 配置する持ち駒のインデックス
			 * @param {boolean} isCpuDrop - CPUによる打ち駒かどうか
			 * @returns {boolean}
			 */
			dropPiece(toPanel, option={}, isCpuDrop=false){
				const {board} = this;
				const {isReadyOnline, displayDeg} = board;
				const {deg, i} = option;
				const activePlayer = board.getActivePlayer();
				// ローカルプレイヤーでない場合
				if(isCpuDrop) return super.dropPiece(toPanel, option, isCpuDrop);
				if(
					!(toPanel instanceof Panel)
					|| !isReadyOnline  // 接続待機中
					|| activePlayer.deg !== displayDeg  // 手番の角度
					|| activePlayer.isLocal && deg !== 0  // 自分の駒
				) return false;
				// ローカルプレイヤーの場合
				const isDroped = super.dropPiece(toPanel, option);
				if(!isDroped) return false;

				const data = {
					type: "drop",
					roomId: board.roomId,
					to: {pX: toPanel.pX, pY: toPanel.pY},
					playerDeg: activePlayer.deg, // プレイヤーの視点角度を追加
					standIndex: i,
				};
				console.log("Sending drop message:", data);
				board.ws.send(JSON.stringify(data));
				if(board.autoDrawing) board.draw();
				return true;
			}
		}
		this.stand = new StandOnline(this);
	}

	/**
	 * 駒の移動処理（オンラインゲームの場合、サーバーに移動情報を送信）
	 * @param {Panel} fromPanel - 移動元のパネル
	 * @param {Panel} toPanel - 移動先のパネル
	 * @param {boolean} isCpuMove - CPUによる移動かどうか
	 * @returns {Promise<boolean>} - 移動が成功したかどうか
	 */
	async movePiece(fromPanel, toPanel, isCpuMove=false){
		const activePlayer = this.getActivePlayer();
		if(
			!this.isReadyOnline  // 接続完了まで操作禁止
			|| activePlayer.deg !== this.displayDeg  // 手番の角度
			|| activePlayer.isLocal && fromPanel.piece.deg !== 0  // 自分の駒
		) return false;
		// ローカルプレイヤーでない場合
		if(!activePlayer.isLocal) return await super.movePiece(fromPanel, toPanel, isCpuMove);
		// ローカルプレイヤーの場合
		if(!toPanel.isTarget || isCpuMove) return false;
		const baseChar = fromPanel.piece.char;
		const isMoved = await super.movePiece(fromPanel, toPanel, isCpuMove);
		if(!isMoved) return false;
		const promoChar = toPanel.piece?.char;
		const data = {
			type: "move",
			roomId: this.roomId,
			from: {pX: fromPanel.pX, pY: fromPanel.pY}, // 移動元の座標
			to: {pX: toPanel.pX, pY: toPanel.pY},     // 移動先の座標
			promoChar: baseChar !== promoChar? promoChar: null,
		};
		this.ws.send(JSON.stringify(data));
		return true;
	}

	/**
	 * リモートからの移動を盤面に適用する
	 * @param {Object} message
	 * @param {Object} message.from - 移動元の座標
	 * @param {number} message.from.pX - 移動元の座標X
	 * @param {number} message.from.pY - 移動元の座標Y
	 * @param {Object} message.to - 移動先の座標
	 * @param {number} message.to.pX - 移動先の座標X
	 * @param {number} message.to.pY - 移動先の座標Y
	 * @param {number} message.playerDeg - 移動を行ったプレイヤーの視点角度
	 * @param {string|null} message.promoChar - 成り先の駒名(成らない場合null)
	 */
	async moveRivalPiece({from, to, playerDeg, promoChar}){
		// 送信者の座標系をローカル基準に変換
		const localFrom = this.rotatePosition(from.pX, from.pY, -playerDeg);
		const localTo = this.rotatePosition(to.pX, to.pY, -playerDeg);
		const fromPanel = this.field[localFrom.pY][localFrom.pX];
		const toPanel   = this.field[localTo.pY][localTo.pX];

		this.stand.capturePiece(
			fromPanel.piece,
			toPanel.piece,
			toPanel.hasAttr("capture"),
			toPanel.hasAttr("cantCapture")
		);

		this.simpleMovePiece(fromPanel, toPanel);
		await this.promoPiece(fromPanel, toPanel, !!promoChar, false, true, promoChar);

		if(this.autoDrawing) this.draw();
		this[$].emitGameOver();
	}

	/**
	 * リモートからの打駒を盤面に適用する
	 * @param {Object} message
	 * @param {Object} message.to - 打つ先の座標
	 * @param {number} message.to.pX - 打つ先の座標X
	 * @param {number} message.to.pY - 打つ先の座標Y
	 * @param {number} message.playerDeg - 打駒を行ったプレイヤーの視点角度
	 * @param {number} message.standIndex - 駒台の駒のインデックス
	 */
	async dropRivalPiece({to, playerDeg, standIndex}){
		// 送信者の座標系をローカル基準に変換
		const localTo = this.rotatePosition(to.pX, to.pY, -playerDeg);
		const toPanel = this.field[localTo.pY][localTo.pX];
		const option = {
			deg: this.degNormal(this.displayDeg-playerDeg),
			i: standIndex,
		};
		this.stand.dropPiece(toPanel, option, true);
		if(this.autoDrawing) this.draw();
	}
}
