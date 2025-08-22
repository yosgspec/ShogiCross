/** @typedef {import("./data").BoardInitOption} BoardInitOption */
/** @typedef {import("./data").PlayerInfo} PlayerInfo */
import {BoardHeadless, PROTECTED} from "./boardHeadless.js";
import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {downloadImage} from "./downloadImage.js";
import {Dialog} from "./dialog.js";
import {mouseControl} from "./mouseControl.js";
import {PlayerControl} from "./playerControl.js";
import {Stand} from "./stand.js";
import {Panel} from "./panel.js";
import {Piece} from "./piece.js";
import {EnPassant} from "./enPassant.js";
import {boards, games} from "./data.js";
import {CpuEngine} from "./cpu.js";
import {Overlay} from "./overlay.js";
import {Record} from "./record.js";
export {PROTECTED};

/** 盤の管理クラス */
export class Board extends BoardHeadless{
	/** @typedef {Object} Board */
	#mouseControl
	#playerControl
	#dialog

	/**
	 * @typedef {Object} Record - 局面の記録
	 * @prop {Object} from
	 * @prop {number} from.pX - 移動元の列
	 * @prop {number} from.pY - 移動元の行
	 * @prop {Object} to
	 * @prop {number} to.pX - 移動先の列
	 * @prop {number} to.pY - 移動先の行
	 * @prop {number} deg - 駒の角度
	 * @prop {string} pieceChar - 駒の一文字表記
	 * @prop {string} end - 棋譜表示の末尾に記載する文字
	 * @prop {string} fieldText - 駒配置のテキスト
	 * @prop {number[][]} fieldMoved - 駒の移動済み判定
	 * @prop {string|null} comment - 棋譜コメント
	 */

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
			dialog: (...$)=>this.#dialog(...$),
		});

		const {
			playBoard,
			playerOptions=[],
			players=playerOptions.some(({gameName}, i)=>1 < i && gameName)? 4: 2,
			useStand=false,
			canvasWidth=undefined,
			canvasHeight=undefined,
			canvasFit="overflow",
			boardLeft=5,
			boardTop=5,
			panelWidth=50,
			panelHeight=0|panelWidth*1.1,
			pieceSize=0|panelWidth*0.9,
			useRankSize = true,
			isDrawShadow = true,
			borderWidth=Math.min(panelWidth, panelHeight)/30,
			backgroundColor="#00000000",
			isHeadless=false,
			autoDrawing=!isHeadless,
			overlayOptions = {useDimOverlay: true},
			moveMode="normal",
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
		}

		this.pieces = Piece.getPieces(this.ctx, {
			size: pieceSize,
			useRankSize,
			isDrawShadow
		});

		// ボード情報
		if(!boards[playBoard]) throw Error(`playBoard=${playBoard}, Unknown board name.`);
		Object.assign(this, boards[playBoard]);
		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.playerLen = players;
		this.left = boardLeft;
		this.top = boardTop;
		this.panelWidth = panelWidth;
		this.panelHeight = panelHeight;
		this.borderWidth = borderWidth;
		this.pieceSize = pieceSize;
		this.canvasBackgroundColor = backgroundColor;

		// マス目データを構築
		this.field = this.field.map((row, pY)=>
			[...row].map((char, pX)=>{
				const center = boardLeft+panelWidth*(pX+1);
				const middle = boardTop+panelHeight*(pY+1)
				return new Panel(this.ctx, char, center, middle, panelWidth, panelHeight, pX, pY, borderWidth);
			})
		);
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;

		// プレイヤー設定
		this.players = new Map();
		for(let id=0;id<players;id++){
			const deg = this.degNormal(id)
			const status = {
				...playerOptions[id],
				id,
				deg,
				degChar: Piece.degChars[deg],
				alive: true,
				cpuDelay: playerOptions[id]?.cpuDelay ?? 500, // CPUの遅延時間
			};
			// CPUエンジンの初期化
			status.cpu = new CpuEngine(this, status),
			this.players.set(deg, status);
			// 駒の初期配置
			if(!status.gameName) continue;
			try{
				this.putStartPieces(id, status.gameName, status.pieceSet);
			}
			catch(ex){
				console.error(ex);
			}
		}

		// 描写寸法を設定
		this.width = this.panelWidth*(this.xLen+1);
		this.height = this.panelHeight*(this.yLen+1);
		this.right = boardLeft+this.width;
		this.bottom = boardTop+this.height;
		this.stand = new Stand(this);
		if(!isHeadless){
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
		this.moveMode = moveMode;

		/** ゲームの記録
		 * @type {Record[]}
		 */
		this.record = new Record(this);
		if(!isHeadless) this.#mouseControl = mouseControl(this);
		if(usePlayerControl){
			this.#playerControl = this.makePlayerControl();
			this.#playerControl.add();
		}
		this.enPassant = new EnPassant();
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

	_rotateField(deg){
		const {field, xLen, yLen} = this;

		deg = this.degNormal(deg);
		if(deg === 0) return;
		if(![90, 180, 270].includes(deg)) throw Error(`deg=${deg}, deg need multiple of 90.`);

		let fieldPieces = field.map(row=>row.map(({piece})=>piece));
		if([90, 270].includes(deg)){
			// 2次配列を転置
			const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
			if(xLen !== yLen) throw Error(`cols=${xLen} != rows=${yLen}, Not rows = cols.`);
			fieldPieces = transpose(fieldPieces);
		}
		if([180, 270].includes(deg)){
			fieldPieces.reverse();
		}
		fieldPieces.forEach(row=>{
			row.forEach(piece=>{
				if(!piece) return;
				piece.deg += deg;
			});
			if([90, 180].includes(deg)) row.reverse();
		});
		field.forEach((row, pY)=> 
			row.forEach((panel, pX)=> 
				panel.piece = fieldPieces[pY][pX]
			)
		);
    }

    _emitGameOver() {
        this.#emitGameOver();
    }

    get _dialog() {
        return this.#dialog;
    }
}
