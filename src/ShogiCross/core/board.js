/** @typedef {import("./boardCore.js").BoardCoreInitOption} BoardCoreInitOption */
/** @typedef {import("./panel.js").Panel} Panel */
/** @typedef {import("./piece.js").Piece} Piece */
/** @typedef {import("./overlay.js").OverlayOptions} OverlayOptions */
import {BoardCore, PROTECTED} from "./boardCore.js";
import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {downloadImage} from "./download.js";
import {Dialog} from "./dialog.js";
import {mouseControl} from "./mouseControl.js";
import {UIControl} from "./uiControl.js";
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
 * @prop {"normal"|"vs"|"free"|"viewOnly"} moveMode - 移動モード
 * @prop {boolean} autoDrawing - 描写の自動更新有無
 * @prop {OverlayOptions} overlayOptions - オーバーレイのオプション
 * @prop {boolean|("undo"|"redo"|"rotateLeft"|"rotateRight"|"passTurn"|"downloadImage"|"downloadRecord"|"textRecord")[]} useUIControl - 操作パネルを使用するか
 * @prop {Object} UIControlRecordOption - 操作パネルの棋譜オプション
 * @prop {number} UIControlRecordOption.lines - 棋譜の表示行数
 * @prop {boolean} UIControlRecordOption.readonly - 棋譜の読込専用
 * @prop {(board:Board)=>void} onDrawed - 描写イベント
 * @prop {(board:Board,turn:number)=>void} onTurnEnd - ターンエンドイベント
 * @prop {(board:Board,playerId:number)=>void} onGameOver - ゲームオーバーイベント
 * @prop {(board:Board,winnerId:number)=>void} onGameEnd - 投了イベント
 */

/** 盤の管理クラス */
export class Board extends BoardCore{
	/** @typedef {Object} Board */
	#mouseControl;
	#uiControl;
	#dialog;

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
		Object.assign(this[PROTECTED], {
			emitGameOver: this.#emitGameOver.bind(this),
		});
		Object.defineProperties(this[PROTECTED], {
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
			useUIControl=!isHeadless? [
				"undo",
				"redo",
				"rotateLeft",
				"rotateRight",
				"downloadImage",
				"downloadRecord",
				"textRecord",
			]: null,
			uiControlRecordOption={},
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

		this.isGameEnd = false;
		this.onDrawed = onDrawed;
		this.onTurnEnd = onTurnEnd;
		this.onGameOver = onGameOver;
		this.onGameEnd = onGameEnd;

		if(!isHeadless) this.#mouseControl = mouseControl(this);
		if(useUIControl){
			this.makeUIControl(useUIControl, uiControlRecordOption);
			this.#uiControl.add();
		}

		// 自動描写更新設定
		this.autoDrawing = autoDrawing;
		if(autoDrawing){
			canvasFontAsync.then(()=>{
				this.draw();
				this.#dialog.setFont(canvasFont.names);
				this.#uiControl.setRecordFont(canvasFont.names);
				const btnFont = ["Noto Color Emoji", "Noto Serif"];
				this.#uiControl.setButtonFont(btnFont
					.map(f=>`"${f}${canvasFont.unique}"`)
					.concat(["serif"])
					.join(",")
				);
			});
			canvasImageAsync.then(()=>this.draw());
			this.draw();
		}
	}

	/** 操作パネルを構築
	 * @param {("undo"|"redo"|"rotateLeft"|"rotateRight"|"passTurn"|"downloadImage"|"downloadRecord"|"textRecord")[]} - controls - 表示するコントロールの一覧
	 * @param {Object} recordOption - 棋譜オプション
	 * @param {number} recordOption.lines - 棋譜の表示行数
	 * @param {boolean} recordOption.readonly - 棋譜の読込専用
	 * @returns {UIControl}
	 */
	makeUIControl(controls, recordOption){
		return this.#uiControl = new UIControl(this, controls, recordOption);
	}

	/** ボードを閉じる */
	close(){
		this.#mouseControl?.removeEvent();
		this.#uiControl?.remove();
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
		const alivePlayers = [...this.players.values()].filter(p =>p.alive);
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
	 * @param {string|null} promoChar - 成り先の駒名(成らない場合null)
	 * @returns {Promise<string|null>}
	 */
	async onSelectPromo(piece, canPromo, forcePromo, isCpuMove, promoChar){
		const {moveMode} = this;

		if(isCpuMove) return super.onSelectPromo(piece, canPromo, forcePromo, isCpuMove, promoChar);
		const promoList = [];
		for(const [char, {name}] of Object.entries(piece.promo))
			promoList.push({label: `${char}:${name}`, value: char});
		if(moveMode === "free" || !forcePromo)
			promoList.push({label: "不成", value: null});

		return await this.#dialog.show(
			`${piece.char}:${piece.name}`,
			"成りますか?",
			promoList
		);
	}

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 * @param {boolean} isCpuMove - CPUによる移動か
	 * @returns {Promise<boolean>}
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
		const {ctx, canvas, left, top, width, height, panelWidth, panelHeight, record, isDisplayLastMove} = this;

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
				panel.draw(isDisplayLastMove? record.last.pieceId: -1);
			});
		});
		if(this.onDrawed) this.onDrawed(this);
	}

	/** 画像を取得
	 * @param {string} fileName - ファイル名
	 * @param {string} ext - 拡張子
	 * @param {"base64"|"blob"} urlType - 生成URLタイプ
	 * @returns {Promise<void>}
	 */
	async downloadImage(fileName, ext, urlType){
		await downloadImage(this.canvas, fileName ?? this.name ?? "shogicross", ext, urlType);
	}
}
