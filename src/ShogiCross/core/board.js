/** @typedef {import("./boardCore.js").BoardCoreInitOption} BoardCoreInitOption */
/** @typedef {import("./panel.js").Panel} Panel */
/** @typedef {import("./piece.js").Piece} Piece */
import {BoardCore, PROTECTED} from "./boardCore.js";
import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {downloadImage} from "./downloadImage.js";
import {Dialog} from "./dialog.js";
import {mouseControl} from "./mouseControl.js";
import {PlayerControl} from "./playerControl.js";
import {Overlay} from "./overlay.js";
export {PROTECTED};

/**
 * @typedef {Object} BoardInitOption - ボードの初期化オプション
 * @extends BoardCoreInitOption
 * @prop {boolean} useStand - 駒台の使用有無
 * @prop {number} canvasWidth - Canvas幅
 * @prop {number} canvasHeight - Canvas高さ
 * @prop {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"} canvasFit - Canvasサイズの自動調整
 * @prop {boolean} isHeadless - ヘッドレスモード（Canvas非描画・自動操作用）
 * @prop {"normal"|"free"|"viewOnly"} moveMode - 移動モード
 * @prop {boolean} autoDrawing - 描写の自動更新有無
 * @prop {OverlayOptions} overlayOptions - オーバーレイのオプション
 * @prop {boolean} usePlayerControl - プレイヤーを使用するか
 * @prop {(e:Board)=>void} onDrawed - 描写イベント
 * @prop {(e:Board,turn:number)=>void} onDrawed - 描写イベント
 * @prop {(e:Board,playerId:number)=>void} onGameOver - ゲームオーバーイベント
 * @prop {(e:Board)=>void} onGameEnd - 投了イベント
 */

/** 盤の管理クラス */
export class Board extends BoardCore{
	/** @typedef {Object} Board */
	#mouseControl
	#playerControl
	#dialog

	/** ゲームを実行する
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 * @returns {Board}
	 */
	static run(canvas, option){
		return new Board(canvas, option);
	}

	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 */
	constructor(canvas, option){
		super(canvas, option);
		Object.defineProperties(this[PROTECTED], {
			emitGameOver: this.#emitGameOver.bind(this),
			dialog: {get: ()=>this.#dialog},
		});

		const {
			useStand=false,
			canvasWidth=undefined,
			canvasHeight=undefined,
			canvasFit="overflow",
			isHeadless=false,
			autoDrawing=!isHeadless,
			overlayOptions,
			usePlayerControl=!isHeadless,
			onDrawed=e=>{},
			onTurnEnd=(e,turn)=>{},
			onGameOver=(e,i)=>alert(`プレイヤー${i+1}の敗北です。`),
			onGameEnd=(e,i)=>e.record.add({end: `対戦終了 勝者${[...e.players.values()][i].degChar}`}),
		} = option;

		// 初期化
		let canvasFontAsync = null;
		let canvasImageAsync = null;
		if(!isHeadless){
			canvasFontAsync = canvasFont.importAsync();
			canvasImageAsync = canvasImage.importAsync();
			this.canvas = canvas;
			this.ctx = canvas.getContext("2d");
			this.ctx.clearRect(0, 0, canvas.width, canvas.height);
			this.overlay = new Overlay(this.canvas, overlayOptions);
			this.#dialog = new Dialog();

			// 描写コンテキストを適用
			for(const piece of Object.values(this.pieces))
				piece.ctx = this.ctx;
			for(const panel of this.field.flat()){
				panel.ctx = this.ctx;
				if(panel.piece) panel.piece.ctx = this.ctx;
			}

			canvas.width = canvasWidth ?? (useStand? this.stand.right: this.right)+5;
			canvas.height = canvasHeight ?? this.bottom+5;

			// キャンバスサイズ自動調整
			const {style} = canvas;
			if(canvasFit === "overflow"){
				if(style.maxWidth === "") style.maxWidth = "97vw";
				if(style.maxHeight === "") style.maxHeight = "92vh";
			}
			else if(canvasFit === "horizontal"){
				if(style.width === "") style.width = "97vw";
			}
			else if(canvasFit === "vertical"){
				if(style.height === "") style.height = "92vh";
			}
			else if(canvasFit === "parentOverflow"){
				if(style.maxWidth === "") style.maxWidth = "100%";
				if(style.maxHeight === "") style.maxHeight = "100%";
			}
			else if(canvasFit === "parentHorizontal"){
				if(style.width === "") style.width = "100%";
			}
			else if(canvasFit === "parentVertical"){
				if(style.height === "") style.height = "100%";
			}
		}

		// 自動描写更新設定
		this.autoDrawing = autoDrawing;
		if(autoDrawing){
			canvasFontAsync.then(()=>{
				this.draw();
				this.#dialog.setFontFamily(canvasFont.names);
			});
			canvasImageAsync.then(()=>this.draw());
			this.draw();
		}

		this.isGameEnd = false;
		this.onDrawed = onDrawed;
		this.onTurnEnd = onTurnEnd;
		this.onGameOver = onGameOver;
		this.onGameEnd = onGameEnd;

		if(!isHeadless) this.#mouseControl = mouseControl(this);
		if(usePlayerControl){
			this.#playerControl = this.makePlayerControl();
			this.#playerControl.add();
		}
	}

	/** 操作パネルを構築
	 * @param {string[]} compList - 表示するコントロールの一覧
	 * @returns {PlayerControl}
	 */
	makePlayerControl(compList){
		this.#playerControl = new PlayerControl(this, compList);
		return this.#playerControl;
	}

	/** ボードを閉じる */
	close(){
		this.#mouseControl?.removeEvent();
		this.#playerControl?.remove();
	}
	/** 盤面を回転
	 * @param {boolean} isRight - 回転方向
	 */
	rotate(isRight=true){
		super.rotate(isRight);
		if(this.autoDrawing) this.draw();
	}

	/** 敗北したプレイヤーが存在するか確認し、イベントを発生させる */
	#emitGameOver(){
		this.players.forEach((player, deg)=>{
			if(!player.alive) return;
			if(this.field.flat().some(
				({piece})=>
					piece?.deg === deg
					&& piece.hasAttr("king")
				)
			) return;
			player.alive = false;
			this.onGameOver?.(this, player.id);
		});

		// 生存プレイヤーが1人になったら対戦終了
		const alivePlayers = [...this.players.values()].filter(p => p.alive);
		if(alivePlayers.length <= 1){
			this.onGameEnd?.(this, alivePlayers[0].id);
			this.isGameEnd = true;
		}
	}

	/** プロモーション選択
	 * @param {Piece} piece - 駒
	 * @param {boolean} canPromo - 成ることができる
	 * @param {boolean} forcePromo - 成りを強制する
	 * @param {boolean} isCpuMove - CPUによる移動か
	 */
	async onSelectPromo(piece, canPromo, forcePromo, isCpuMove){
		const {moveMode} = this;

		if(isCpuMove) return super.onSelectPromo(piece, canPromo, forcePromo, isCpuMove);
		const promoList = [];
		for(const [char, {name}] of Object.entries(piece.promo))
			promoList.push({label: `${char}:${name}`, value: char});
		if(moveMode === "free" || !forcePromo)
			promoList.push({label: "不成", value: null});

		const promoChar = await this.#dialog.show("",
			"成りますか?\n"+
			`${piece.char}:${piece.name}`,
			promoList
		);
		return promoChar;
	}

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 * @param {boolean} isCpuMove - CPUによる移動か
	 * @returns boolean
	 */
	async movePiece(fromPanel, toPanel, isCpuMove=false){
		if(!await super.movePiece(fromPanel, toPanel, isCpuMove)) return false;

		// プロモーション処理
		this.#mouseControl?.resetSelect();

		// プレイヤーのゲームオーバー判定
		this.#emitGameOver();
		return true;
	}


	/** 盤を描写 */
	draw(){
		if(this.isHeadless) return;
		const {ctx, canvas, left, top, width, height, panelWidth, panelHeight} = this;

		// 描写を初期化
		ctx.restore();
		ctx.save();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = this.canvasBackgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		// 外枠を描写
		ctx.fillStyle = this.backgroundColor;
		ctx.lineWidth = this.borderWidth;
		ctx.strokeStyle = this.borderColor;

		ctx.save();
		ctx.translate(left, top);
		ctx.fillRect(0, 0, width, height);
		ctx.strokeRect(0, 0, width, height);
		ctx.translate(panelWidth/2, panelHeight/2);
		ctx.strokeRect(0, 0, width-panelWidth, height-panelHeight);
		ctx.restore();
		this.stand.draw();

		// マス目を描写
		this.field.forEach(row=>{
			row.forEach(panel=>{
				panel.draw();
			});
		});
		if(this.onDrawed) this.onDrawed(this);
	}

	/** 画像を取得
	 * @param {string} fileName - ファイル名
	 * @param {string} ext - 拡張子
	 * @returns {Promise<void>}
	 */
	async downloadImage(fileName, ext, urlType){
		await downloadImage(this.canvas, fileName ?? this.name ?? "shogicross", ext, urlType);
	}
}
