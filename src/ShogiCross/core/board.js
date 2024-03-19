/** @typedef {import('./json').BoardInitOption} BoardInitOption */
import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {downloadImage} from "./downloadImage.js";
import {uiControl} from "./uiControl.js";
import {Stand} from "./stand.js";
import {Panel} from "./panel.js";
import {Piece} from "./piece.js";
import {EnPassant} from "./enPassant.js";
import {Bod} from "./bod.js";
import {boards, games} from "./json.js";

/** 盤の管理クラス */
export class Board{
	/** 盤面の記録
	 * @typedef {Object} Record
	 * @prop {Object} from
	 * @prop {number} from.pX
	 * @prop {number} from.pY
	 * @prop {Object} to
	 * @prop {number} to.pX
	 * @prop {number} to.pY
	 * @prop {number} deg
	 * @prop {string} pieceChar
	 * @prop {string} end
	 * @prop {string} fieldText
	 * @prop {string[][]} fieldMoved
	 */

	/** ゲームを実行する
	 * @param {HTMLCanvasElement}} canvas - Canvas要素
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 * @param {string} option.playBoard - ボードタイプ
	 * @param {Object} option.playPieces - 駒セット
	 * @param {string} option.playPieces.gameName - ゲーム名(基準となる駒の配置セット)
	 * @param {string} option.playPieces.pieceSet - 駒の配置パターン
	 * @returns Board
	 */
	static run(canvas, option){
		const {playBoard, playPieces, onDrawed} = option;
		const players = playPieces.some(({gameName}, i)=>1 < i && gameName)? 4: 2;
		// ボードを生成
		const board = new Board(canvas, playBoard, {
			...option,
			players,
			onDrawed
		});
		// 駒を配置
		playPieces.forEach(({gameName, pieceSet}, i)=>{
			if(!gameName) return;
			pieceSet ??= "default";
			try{
				board.putStartPieces(i, gameName, pieceSet);
			}
			catch{}
		});
		// 描写イベントを設定
		board.onDrawed = onDrawed;
		return board;
	}

	/**
	 * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
	 */
	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {string} playBoard - ボードタイプ
	 * @param {number} players - プレイヤー人数(2 or 4)
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 */
	constructor(canvas, playBoard, option){
		const {
			players=2,
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
			useStand=false,
			backgroundColor="#00000000",
			autoDrawing=true,
			onDrawed,
			onGameOver=i=>alert(`プレイヤー${i+1}の敗北です。`),
			freeMode=false
		} = option;
		// 初期化
		const canvasFontAsync = canvasFont.importAsync();
		const canvasImageAsync = canvasImage.importAsync();
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx = ctx;

		this.pieces = Piece.getPieces(ctx, {
			size: pieceSize,
			useRankSize,
			isDrawShadow
		});

		// ボード情報
		Object.assign(this, boards[playBoard]);
		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.players = players;
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
				return new Panel(ctx, char, center, middle, panelWidth, panelHeight, borderWidth, pX, pY);
			})
		);
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;
		this.width = this.panelWidth*(this.xLen+1);
		this.height = this.panelHeight*(this.yLen+1);
		this.right = boardLeft+this.width;
		this.bottom = boardTop+this.height;
		this.stand = new Stand(this);
		canvas.width = canvasWidth ?? (useStand? this.stand.right: this.right)+5;
		canvas.height = canvasHeight ?? this.bottom+5;
		// キャンバスサイズ調整
		const {style} = canvas;
		if(canvasFit === "overflow"){
			if(style.maxWidth === "") style.maxWidth = "97vw";
			if(style.maxHeight === "") style.maxHeight = "97vh";
		}
		else if(canvasFit === "horizontal"){
			if(style.width === "") style.width = "97vw";
		}
		else if(canvasFit === "vertical"){
			if(style.height === "") style.height = "97vh";
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

		// 描写更新設定
		this.autoDrawing = autoDrawing;
		if(autoDrawing){
			canvasFontAsync.then(()=>this.draw());
			canvasImageAsync.then(()=>this.draw());
			this.draw();
		}
		this.onDrawed = onDrawed;
		this.onGameOver = onGameOver;
		this.gameAlives = new Map(
			[...Array(this.players).keys()]
			.map(i=>[this.#degNormal(i), true])
		);
		this.freeMode = freeMode;

		/** ゲームの記録
		 * @type {Record[]}
		 */
		this.record = [];
		/** ゲームのターン
		 * @type {number}
		 */
		this.turn = 0;
		this.uiControl = uiControl(this);
		this.enPassant = new EnPassant();
	}

	/** ボードを閉じる */
	close(){
		this.uiControl.removeEvent();
	}

	/** 角度を正規化
	 * @param {number} playeaIdOrDeg - プレイヤー番号または角度
	 * @returns {number}
	 */
	#degNormal(playeaIdOrDeg){
		let deg = playeaIdOrDeg;
		if(0 < deg && deg < 4) deg = 0|deg*360/this.players;
		do{deg = (deg+360)%360} while(deg<0);
		return deg;
	}

	/** 駒配置を回転
	 * @param {number} deg - 回転角 (90の倍数)
	 */
	rotateField(deg){
		const {xLen, yLen} = this;

		deg = this.#degNormal(deg);
		if(deg === 0) return;
		if(![90, 180, 270].includes(deg)) throw Error(`deg=${deg}, deg need multiple of 90.`);
		if([90, 270].includes(deg)){
			// 2次配列を転置
			const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
			if(xLen !== yLen) throw Error(`cols=${xLen} != rows=${yLen}, Not rows = cols.`);
			this.field = transpose(this.field);
		}
		if([180, 270].includes(deg)){
			this.field.reverse();
		}
		this.field.forEach(row=>{
			row.forEach(panel=>{
				if(!panel.piece) return;
				panel.piece.deg += deg;
			});
			if([90, 180].includes(deg)) row.reverse();
		});
	}

	/** 駒の初期配置
	 * @param {number} playerId - プレイヤー番号
	 * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
	 * @param {string} pieceSet - 駒の配置パターン
	 */
	putStartPieces(playerId, gameName, pieceSet="default"){
		const {pieces} = this;

		const deg = this.#degNormal(playerId);
		this.rotateField(deg);
		const pos = games[gameName].position[this.xLen][pieceSet];
		if(!pos) throw Error(`games["${gameName}"].position["${this.xLen}"]["${pieceSet}"]is null.`);
		pos.forEach((row, i)=>{
			if(row.length < this.xLen) throw Error(row.join(""));
			const pY = i+this.yLen - pos.length;
			[...row].forEach((char, pX)=>{
				if(!pieces[char]) return;
				const piece = pieces[char].clone();
				const panel = this.field[pY][pX];
				piece.center = panel.center;
				piece.middle = panel.middle;
				panel.piece = piece;
			});
		});
		this.rotateField(-deg);
		if(this.autoDrawing) this.draw();
	}

	/** 駒の配置
	 * @param {string} piece - 駒の表現文字
	 * @param {number} pX - X方向配置位置(マス目基準)
	 * @param {number} pY - Y方向配置位置(マス目基準)
	 * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
	 * @param {Object} option - オプション
	 * @param {number} option.displayPtn - 表示文字列を変更(1〜)
	 * @param {boolean} option.isMoved - 初回移動済みか否か
	 */
	putNewPiece(piece, pX, pY, playeaIdOrDeg, option={}){
		const {displayPtn=0, isMoved=false} = option;
		const {pieces} = this;

		const deg = this.#degNormal(playeaIdOrDeg);
		if(typeof piece === "string"){
			piece = new Piece(this.ctx, pieces[piece], {displayPtn, deg, isMoved});
		}
		const panel = this.field[pY][pX];
		piece.center = panel.center;
		piece.middle = panel.middle;
		panel.piece = piece;
		if(this.autoDrawing) this.draw();
	}

	/** 文字列から駒を配置
	 * {string} text - 駒配置を表す文字列
	 */
	setTextPieces(text){
		const {field, pieces, xLen, yLen} = this;

		const standTitle = "持駒：";
		// BOD形式
		if(0<text.indexOf(standTitle)) text = Bod.convSetText(text);

		// 排除する記号
		const noises = "┏━┯┓┗┷┛┃│┠─┼┨―";

		// 配列変換
		const texts = [text].concat(
				[...noises],
				Object.values(Piece.degChars).map(c=>"\n"+c+standTitle)
			).reduce(
				(text,char)=>
					text.replace(new RegExp(char,"g"), "")
			).replace(/\n\n/g, "\n")
			.replace(/　/g, "・")
			.trim()
			.split(/\n/)
			.map(
				row=>row.match(/.{2}/g));

		// ボードに駒を配置
		for(let pY=0;pY<yLen;pY++){
			for(let pX=0;pX<xLen;pX++){
				try{
					const text = texts[pY][pX];
					const piece = Piece.stringToPiece(pieces, text);
					piece.center = field[pY][pX].center;
					piece.middle = field[pY][pX].middle;
					field[pY][pX].piece = piece;
				}
				catch(ex){
					field[pY][pX].piece = null;
				}
			}
		}

		// 持ち駒を配置
		this.stand.clear();
		const standTexts = texts[yLen];
		if(standTexts){
			standTexts.forEach(text=>{
				const piece = Piece.stringToPiece(pieces, text);
				if(!piece) return;
				this.stand.add(piece);
			});
		}
		if(this.autoDrawing) this.draw();
	}

	/** 角度基準のマス目の行を取得する
	 * @param {Panel} panel - マス目
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getRow(pX, pY, deg, offsetDeg=0){
		const {xLen, yLen} = this;

		deg = this.#degNormal(deg+offsetDeg);
		return (
			deg === 0? yLen-1-pY:
			deg === 90? pX:
			deg === 180? pY:
			deg === 270? xLen-1-pX:
			-1
		);
	}

	/** 角度基準のマス目の列を取得する
	 * @param {Panel} panel - マス目
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getCol(pX, pY, deg, offsetDeg=0){
		const {xLen, yLen} = this;

		deg = this.#degNormal(deg+offsetDeg);
		return (
			deg === 0? pX:
			deg === 90? yLen-1-pY:
			deg === 180? xLen-1-pX:
			deg === 270? pY:
			-1
		);
	}

	/** プロモーションエリア内であるか判別
	 * @param {Panel} panel - マス目
	 */
	checkCanPromo(panel){
		const {yLen} = this;
		const {piece, pX, pY} = panel;
		const {deg} = piece;

		const [promoLine, forcePromoLine] = [
			piece.game.promoLine,
			piece.forcePromoLine
		].map(line=>yLen-line-(0|this.promoLineOffset));

		let row;
		if(!this.sidePromo){
			row = this.getRow(pX, pY, deg);
		}
		else{
			row = Math.max(
				...Object.keys(Piece.degChars)
				.map(d=>0|d)
				.filter(d=>d!==deg)
				.map(
					d=>this.getRow(pX, pY, d, 180)
				)
			);
		}
		return {
			canPromo: promoLine <= row,
			forcePromo: forcePromoLine <= row
		};
	}

	/** 敗北したプレイヤーが存在するか確認し、イベントを発生させる */
	#emitGameOver(){
		[...this.gameAlives].forEach(([deg, gameAlive], i)=>{
			if(!gameAlive) return;
			if(this.field.some(row=>
				row.some(({piece})=>
					piece
					&& piece.deg === deg
					&& piece.hasAttr("king")
				)
			)) return;
			this.gameAlives.set(deg, false);
			this.onGameOver(i);
		})
	}

	/** プロモーション処理
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 * @param {boolean} canPromo - 成ることができる
	 * @param {boolean} forcePromo - 成りを強制する
	 */
	#promoDialog(fromPanel, toPanel, canPromo, forcePromo){
		const {freeMode} = this;
		const {piece} = toPanel;

		// プロモーション処理
		if(!piece.promo || piece.hasAttr("promoted") || !canPromo){
			this.addRecord({fromPanel, toPanel});
			return;
		}
		do{
			for(const [char, {name}] of Object.entries(piece.promo)){
				if(confirm(`成りますか?
${piece.char}:${piece.name}
　↓
${char}:${name}`)){
					this.addRecord({fromPanel, toPanel, end:"成"});
					piece.promotion(char);
					return;
				}
			}
		} while(!freeMode && forcePromo);
		this.addRecord({fromPanel, toPanel, end:"不成"});
	}

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 */
	movePiece(fromPanel, toPanel){
		const {stand, freeMode, enPassant} = this;

		if(!fromPanel
			|| toPanel.hasAttr("keepOut")
			|| toPanel.piece === fromPanel.piece
			|| toPanel.piece?.deg === fromPanel.piece.deg
			|| !freeMode && !toPanel.isTarget
		) return;

		let {canPromo, forcePromo} = this.checkCanPromo(fromPanel);

		stand.capturePiece(
			fromPanel.piece,
			toPanel.piece,
			toPanel.hasAttr("capture"),
			toPanel.hasAttr("cantCapture")
		);

		toPanel.piece = fromPanel.piece;
		fromPanel.piece = null;

		const {piece} = toPanel;
		piece.center = toPanel.center;
		piece.middle = toPanel.middle;
		piece.isMoved = true;

		const afterPromo = this.checkCanPromo(toPanel);
		canPromo ||= afterPromo.canPromo;
		forcePromo ||= afterPromo.forcePromo;

		// アンパッサン
		enPassant.setMoved(toPanel);

		// プロモーション処理
		this.#promoDialog(fromPanel, toPanel, canPromo, forcePromo);

		// プレイヤーのゲームオーバー判定
		this.#emitGameOver();
	}

	/** 棋譜を追記
	 * @param {Panel} toPanel - 移動先のマス目
	 * @param {Object} option - オプション
	 * @param {Panel} option.fromPanel - 移動元のマス目
	 * @param {string} option.end - オプション=成|不成|打
	 */
	addRecord(option={}){
		const {record} = this;
		const {fromPanel={}, toPanel={}, end="", inc=1} = option;
		const {piece={}} = toPanel;

		this.turn += inc;
		record[this.turn] = {
			from: {
				pX: fromPanel.pX,
				pY: fromPanel.pY
			},
			to: {
				pX: toPanel.pX,
				pY: toPanel.pY,
			},
			deg: piece.deg,
			pieceChar: piece.char,
			end,
			fieldText: this.getText("compact", true),
			fieldMoved: this.field.map(row=>
				row.map(({piece})=>
					piece?.isMoved
				)
			)
		};
		if(0 < inc) record.splice(this.turn+1);
	}

	/** 記録の参照手数を切り替える
	 * @param {number} - 切り替えたい手数の差分
	 */
	#switchRecord(inc){
		const {record} = this;
		if(!record[this.turn+inc]) return;

		this.turn += inc;
		const {fieldText, fieldMoved} = record[this.turn];
		this.setTextPieces(fieldText);
		this.field.forEach((row, y)=>
			row.forEach(({piece}, x)=>{
				if(!piece) return;
				piece.isMoved = fieldMoved[y][x];
			})
		);
	}

	/** 記録の手を戻す */
	undoRecord(){
		this.#switchRecord(-1);
	}

	/** 記録の手を進める */
	redoRecord(){
		this.#switchRecord(1);
	}

	/** 棋譜をテキストで取得
	 * @returns {string}
	 */
	getTextRecord(){
		const getPX = ({pX})=> pX == null? "*": (this.xLen-pX).toString(36);
		const getPY = ({pY})=> pY == null? "*": (pY+1).toString(36);
		return this.record.slice(1, this.turn+1).map(
			({to, from, deg, pieceChar, end}, i)=>`${
				i}: ${
				Piece.degChars[deg]}${
				getPX(to)}${
				getPY(to)}${
				pieceChar}${
				end} (${
				getPX(from)}${
				getPY(from)})`
		).join("\n");
	}

	/** 盤を描写 */
	draw(){
		const {ctx, canvas, left, top, width, height, panelWidth, panelHeight} = this;

		//最初の記録
		if(this.turn === 0) this.addRecord({inc: 0});

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

	/** 駒配置をテキストで取得
	 * @param {"default"|"compact"|"bod"} isCompact - テキスト形式
	 * @param {boolean} isAlias - エイリアス表示
	 * @returns {string}
	 */
	getText(mode="default", isAlias=false){
		return mode === "bod"?
			Bod.getText(this):
			this.toString(mode === "compact", isAlias);
	}

	/** 駒配置をテキストで取得
	 * @param {boolean} isCompact - コンパクト表示
	 * @param {boolean} isAlias - エイリアス表示
	 */
	toString(isCompact=false, isAlias=false){
		const {xLen} = this;

		let header = "";
		let footer = "";
		let panelOuter = "";
		let panelSep = "";
		let rowSep = "\n";

		if(!isCompact){
			header = `┏${Array(xLen).fill("━━").join("┯")}┓\n`;
			footer = `\n┗${Array(xLen).fill("━━").join("┷")}┛`;
			panelOuter = "┃";
			panelSep = "│";
			rowSep = `\n┠${Array(xLen).fill("──").join("┼")}┨\n`;
		}

		return (
			header+
			this.field.map(row=>
				panelOuter+
				row.map(panel=>
					panel.piece?.toString(isAlias) ?? panel.toString(isCompact)
				).join(panelSep)+
				panelOuter
			).join(rowSep)+
			footer+
			this.stand.toString(isCompact)
		);
	}

	/** 画像を取得
	 * @param {string} fileName - ファイル名
	 * @param {string} ext - 拡張子
	 * @returns {Promise<void>}
	 */
	async downloadImage(fileName, ext){
		await downloadImage(this.canvas, fileName, ext);
	}
}
