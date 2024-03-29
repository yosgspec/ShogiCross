/** @typedef {import('./json').BoardInitOption} BoardInitOption */
import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {downloadImage} from "./downloadImage.js";
import {mouseControl} from "./mouseControl.js";
import {PlayerControl} from "./playerControl.js";
import {Stand} from "./stand.js";
import {Panel} from "./panel.js";
import {Piece} from "./piece.js";
import {EnPassant} from "./enPassant.js";
import {Bod} from "./bod.js";
import {boards, games} from "./json.js";

/** 盤の管理クラス */
export class Board{
	/**
	 * @typedef {Object} Record - 盤面の記録
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
	 */

	/** ゲームを実行する
	 * @param {HTMLCanvasElement}} canvas - Canvas要素
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 * @returns Board
	 */
	static run(canvas, option){
		return new Board(canvas, option);
	}

	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 */
	constructor(canvas, option){
		const {
			name,
			variant,
			url,
			desc,
			playBoard,
			playPieces=[],
			players=playPieces.some(({gameName}, i)=>1 < i && gameName)? 4: 2,
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
			autoDrawing=true,
			moveMode="normal",
			usePlayerControl=true,
			onDrawed,
			onGameOver=(e,i)=>alert(`プレイヤー${i+1}の敗北です。`)
		} = option;

		this.name = name;
		this.variant = variant;
		this.url = url;
		this.desc = desc;

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
		if(!boards[playBoard]) throw Error(`playBoard=${playBoard}, Unknown board name.`);
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
				return new Panel(ctx, char, center, middle, panelWidth, panelHeight, pX, pY, borderWidth);
			})
		);
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;

		// 駒の初期配置
		playPieces.forEach(({gameName, pieceSet}, i)=>{
			if(!gameName) return;
			try{
				this.putStartPieces(i, gameName, pieceSet);
			}
			catch(ex){
				console.error(ex);
			}
		});

		// 描写寸法を設定
		this.width = this.panelWidth*(this.xLen+1);
		this.height = this.panelHeight*(this.yLen+1);
		this.right = boardLeft+this.width;
		this.bottom = boardTop+this.height;
		this.stand = new Stand(this);
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

		// 自動描写更新設定
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
			.map(i=>[this.degNormal(i), true])
		);
		this.moveMode = moveMode;

		/** ゲームの記録
		 * @type {Record[]}
		 */
		this.record = [];
		/** ゲームのターン
		 * @type {number}
		 */
		this.turn = 0;
		this.mouseControl = mouseControl(this);
		if(usePlayerControl){
			this.playerControl = this.makePlayerControl();
			this.playerControl.add();
		}
		this.enPassant = new EnPassant();
	}

	/** 操作パネルを構築
	 * @param {string[]} compList - 表示するコントロールの一覧
	 * @return {PlayerControl}
	 */
	makePlayerControl(compList){
		this.playerControl = new PlayerControl(this, compList);
		return this.playerControl;
	}

	/** ボードを閉じる */
	close(){
		this.mouseControl?.removeEvent();
		this.playerControl?.remove();
	}

	/** 角度を正規化
	 * @param {number} playeaIdOrDeg - プレイヤー番号または角度
	 * @returns {number}
	 */
	degNormal(playeaIdOrDeg){
		let deg = playeaIdOrDeg;
		if(0 < deg && deg < 4) deg = 0|deg*360/this.players;
		do{deg = (deg+360)%360} while(deg<0);
		return deg;
	}

	/** 盤面を回転
	 * @param {boolean} isRight - 回転方向
	 */
	rotate(isRight=true){
		let deg = this.degNormal(1);
		if(!isRight) deg = -deg;
		this.#rotateField(deg);
		this.stand.rotate(deg);
		if(this.autoDrawing) this.draw();
	}

	/** 駒配置を回転
	 * @param {number} deg - 回転角 (90の倍数)
	 */
	#rotateField(deg){
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

	/** 駒の初期配置
	 * @param {number} playerId - プレイヤー番号
	 * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
	 * @param {string} pieceSet - 駒の配置パターン
	 */
	putStartPieces(playerId, gameName, pieceSet="default"){
		const {pieces} = this;

		const deg = this.degNormal(playerId);
		this.#rotateField(deg);
		const pos = games[gameName].position[this.xLen][pieceSet];
		if(!pos) throw Error(`games["${gameName}"].position["${this.xLen}"]["${pieceSet}"]is null.`);
		pos.forEach((row, i)=>{
			if(row.length < this.xLen) throw Error(row.join(""));
			const pY = i+this.yLen - pos.length;
			[...row].forEach((char, pX)=>{
				if(!pieces[char]) return;
				this.field[pY][pX].piece = pieces[char].clone();
			});
		});
		this.#rotateField(-deg);
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

		const deg = this.degNormal(playeaIdOrDeg);
		if(typeof piece === "string"){
			piece = new Piece(this.ctx, pieces[piece], {displayPtn, deg, isMoved});
		}
		this.field[pY][pX].piece = piece;
		if(this.autoDrawing) this.draw();
	}

	/** 文字列から駒を配置
	 * {string} text - 駒配置を表す文字列
	 */
	setTextPieces(text){
		const {field, pieces, xLen, yLen} = this;

		const standTitle = "持駒：";
		// BOD形式
		if(0<text.indexOf(standTitle)) text = Bod.convTextPieces(text);

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
					field[pY][pX].piece = Piece.stringToPiece(pieces, text);
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

		deg = this.degNormal(deg+offsetDeg);
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

		deg = this.degNormal(deg+offsetDeg);
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
			if(this.onGameOver) this.onGameOver(this, i);
		})
	}

	/** プロモーション処理
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 * @param {boolean} canPromo - 成ることができる
	 * @param {boolean} forcePromo - 成りを強制する
	 */
	#promoDialog(fromPanel, toPanel, canPromo, forcePromo){
		const {moveMode} = this;
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
		} while(moveMode !== "free" && forcePromo);
		this.addRecord({fromPanel, toPanel, end:"不成"});
	}

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 */
	movePiece(fromPanel, toPanel){
		const {stand, moveMode, enPassant} = this;

		if(!fromPanel
			|| moveMode === "viewOnly"
			|| toPanel.hasAttr("keepOut")
			|| toPanel.piece === fromPanel.piece
			|| toPanel.piece?.deg === fromPanel.piece.deg
			|| moveMode !== "free" && !toPanel.isTarget
		) return;

		let {canPromo, forcePromo} = this.checkCanPromo(fromPanel);

		stand.capturePiece(
			fromPanel.piece,
			toPanel.piece,
			toPanel.hasAttr("capture"),
			toPanel.hasAttr("cantCapture")
		);

		toPanel.piece = fromPanel.piece;
		toPanel.piece.isMoved = true;
		fromPanel.piece = null;

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
			fieldText: this.getTextPieces("compact", true),
			fieldMoved: this.field.map(row=>
				row.map(({piece})=>
					piece?.isMoved? 1: 0
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
		this.field.forEach((row, pY)=>
			row.forEach(({piece}, pX)=>{
				if(!piece) return;
				piece.isMoved = !!fieldMoved[pY][pX];
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
	 * @param {boolean} isNumOnly - 座標を数字で表現
	 * @returns {string}
	 */
	getTextRecord(isNumOnly=false){
		const getPX = ({pX})=> pX == null? "*": (this.xLen-pX).toString(isNumOnly? 10: 36);
		const getPY = ({pY})=> pY == null? "*": (pY+1).toString(isNumOnly? 10: 36);
		return this.record.slice(1, this.turn+1).map(
			({to, from, deg, pieceChar, end}, i)=>`${
				i+1}: ${
				Piece.degChars[deg]}${
				getPX(to)}${
				isNumOnly? ",": ""}${
				getPY(to)}${
				pieceChar}${
				end} (${
				getPX(from)}${
				isNumOnly? ",": ""}${
				getPY(from)})`
		).join("\n");
	}

	/** 棋譜データを取得
	 * @param {boolean} isEncode - エンコード有無
	 * @returns {string}
	 */
	getJsonRecord(isEncode=true){
		const jsonRecord = JSON.stringify(this.record, null, "");
		return isEncode? encodeURI(jsonRecord): jsonRecord;
	}

	/** 棋譜データを入力
	 * @param {string} record - 棋譜データ
	 * @param {number} turn - 手数
	 */
	setJsonRecord(record, turn){
		this.record = JSON.parse(decodeURI(record));
		this.turn = turn ?? this.record.length-1;
		this.#switchRecord(0);
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
	 * @param {"default"|"compact"|"bod"} mode - テキスト形式
	 * @param {boolean} isAlias - エイリアス表示
	 * @returns {string}
	 */
	getTextPieces(mode="default", isAlias=false){
		return mode === "bod"?
			Bod.getTextPieces(this):
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
	async downloadImage(fileName, ext, urlType){
		await downloadImage(this.canvas, fileName ?? this.name ?? "shogicross", ext, urlType);
	}
}
