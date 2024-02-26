import {canvasFont} from "./canvasFontLoader.js";
import {Piece} from "./piece.js";
import {Panel} from "./panel.js";
import {Stand} from "./stand.js";
import {uIControl} from "./uiControl.js";
import {EnPassant} from "./enPassant.js";
import boards from "../json/boards.json" assert {type: "json"};
import games from "../json/games.json" assert {type: "json"};

/** 盤の管理クラス */
export class Board{
	/** ゲームを実行する
	 * @param {HTMLCanvasElement}} canvas
	 * @param {Object<string, any>} options - オプション
	 * @returns Board
	 */
	static run(canvas, options){
		const {playBoard, playPieces, onDrawed} = options;
		const players = playPieces.some(({gameName}, i)=>1 < i && gameName)? 4: 2;
		// ボードを生成
		const board = new Board(canvas, playBoard, {
			...options,
			players,
			onDrawed
		});
		// 駒を配置
		playPieces.forEach(({gameName, pieceSet}, i)=>{
			if(!gameName || !pieceSet) return;
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
	 * @param {HTMLCanvasElement} canvas - キャンバス要素
	 * @param {string} playBoard - ボードタイプ
	 * @param {number} players - プレイヤー人数(2 or 4)
	 * @param {number} canvasWidth - キャンバス幅
	 * @param {number} canvasHeight - キャンバス高さ
	 * @param {number} boardLeft - 描写するX座標
	 * @param {number} boardTop - 描写するY座標
	 * @param {number} panelWidth - パネル幅
	 * @param {number} panelHeight - パネル高さ
	 * @param {boolean} useStand - 駒台の使用有無
	 * @param {string} backgroundColor - 背景色(デフォルト無職)
	 * @param {boolean} autoDrawing - 描写の自動更新有無
	 * @param {(Board)=>void} onDrawed - 描写イベント
	 * @param {boolean} freeMode - フリーモード有効化/無効化
	 */
	constructor(canvas, playBoard, {
		players=2,
		canvasWidth=undefined,
		canvasHeight=undefined,
		boardLeft=5,
		boardTop=5,
		panelWidth=50,
		panelHeight=0|panelWidth*1.1,
		pieceSize=0|panelWidth*0.9,
		useStand=false,
		backgroundColor="#00000000",
		autoDrawing=true,
		onDrawed,
		freeMode=false
	}={}){
		// 初期化
		const canvasFontAsync = canvasFont.importAsync();
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		this.ctx = ctx;
		this.pieces = Piece.getPieces(ctx, pieceSize);

		// ボード情報
		Object.assign(this, boards[playBoard]);
		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.players = players;
		this.left = boardLeft;
		this.top = boardTop;
		this.panelWidth = panelWidth;
		this.panelHeight = panelHeight;
		this.pieceSize = pieceSize;
		this.canvasBackgroundColor = backgroundColor;

		// マス目データを構築
		this.field = this.field.map((row, pY)=>
			[...row].map((char, pX)=>{
				const center = boardLeft+panelWidth*(pX+1);
				const middle = boardTop+panelHeight*(pY+1)
				return new Panel(ctx, char, center, middle, panelWidth, panelHeight, this.borderWidth, pX, pY);
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

		// 描写設定
		this.autoDrawing = autoDrawing;
		if(autoDrawing){
			canvasFontAsync.then(()=>this.draw());
			this.draw();
		}
		this.onDrawed ??= onDrawed;
		this.freeMode = freeMode;

		this.record = [];
		this.uiControl = uIControl(this);
		this.enPassant = new EnPassant();
	}

	/** ボードを閉じる */
	close(){
		this.uiControl.removeEvent();
	}

	/** 駒配置を回転
	 * @param {number} deg - 回転角 (90の倍数)
	 */
	rotateField(deg){
		const {xLen, yLen} = this;

		do{deg = (deg+360)%360} while(deg<0);
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
	 * {number} playerId - プレイヤー番号
	 * {string} gameName - 駒の配置セット
	 * {string} pieceSet - 駒の配置パターン変更
	 */
	putStartPieces(playerId, gameName, pieceSet="default"){
		const {pieces} = this;

		const deg = 0|playerId*360/this.players;
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
	 * @param {number} displayPtn - 表示文字列を変更(1〜)
	 */
	putNewPiece(piece, pX, pY, playeaIdOrDeg, displayPtn=0, setDeg=false){
		const {pieces} = this;

		const deg = !setDeg? playeaIdOrDeg*90: playeaIdOrDeg;
		if(typeof piece === "string"){
			piece = new Piece(this.ctx, pieces[piece], displayPtn, deg);
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
	inputPieces(text){
		const {field, pieces, xLen, yLen} = this;
		const noises = "┏━┯┓┗┷┛┃│┠─┼┨―";
		// 配列変換
		const texts = [text].concat(
				[...noises],
				Object.values(Piece.degChars).map(c=>"\n"+c+"持ち駒:")
			).reduce(
				(text,char)=>
					text.replace(new RegExp(char,"g"),"")
			).replace(/\n\n/g,"\n")
			.replace(/　/g,"・")
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

	/** 角度基準のパネルの行を取得する
	 * @param {Panel} panel - パネル
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getRow(pX, pY, deg, offsetDeg=0){
		const {xLen, yLen} = this;
		deg += offsetDeg;
		do{deg = (deg+360)%360} while(deg<0);
		return (
			deg === 0? yLen-1-pY:
			deg === 90? pX:
			deg === 180? pY:
			deg === 270? xLen-1-pX:
			-1
		);
	}

	/** 角度基準のパネルの列を取得する
	 * @param {Panel} panel - パネル
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getCol(pX, pY, deg, offsetDeg=0){
		const {xLen, yLen} = this;
		deg += offsetDeg;
		do{deg = (deg+360)%360} while(deg<0);
		return (
			deg === 0? pX:
			deg === 90? yLen-1-pY:
			deg === 180? xLen-1-pX:
			deg === 270? pY:
			-1
		);
	}

	/** プロモーションエリア内であるか判別
	 * @param {Panel} panel - パネル
	 */
	checkCanPromo(panel){
		const {yLen} = this;
		const {piece, pX, pY} = panel;
		const {deg} = piece;
		const [promoLine, forcePromoLine] = [
			piece.game.promoLine,
			piece.forcePromoLine
		].map(line=>yLen+line-(0|this.promoLineOffset));

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

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のパネル
	 * @param {Panel} toPanel - 選択中のパネル
	 */
	movePiece(fromPanel, toPanel){
		const {stand, freeMode, enPassant} = this;

		if(!fromPanel
			|| toPanel.hasAttr("keepOut")
			|| toPanel.piece === fromPanel.piece
			|| toPanel.piece?.deg === fromPanel.piece.deg
			|| !this.freeMode && !toPanel.isTarget
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
		if(!piece.promo || piece.hasAttr("promoted") || !canPromo){
			this.addRecord(toPanel, {fromPanel});
			return
		};
		do{
			for(const [char, {name}] of Object.entries(piece.promo)){
				if(confirm(`成りますか?
	${piece.char}:${piece.name}
	　↓
	${char}:${name}`)){
					this.addRecord(toPanel, {fromPanel, end:"成"});
					piece.promotion(char);
					return;
				}
			}
		} while(!freeMode && forcePromo);
		this.addRecord(toPanel, {fromPanel, end:"不成"});
	}

	/** 棋譜を追記
	 * @param {Panel} toPanel - 移動先のパネル
	 * @param {Panel} fromPanel - 移動元のパネル
	 * @param {string} end - オプション=成|不成|打
	 */
	addRecord(toPanel, {fromPanel, end=""}={}){
		const {piece} = toPanel;
		this.record.push({
			to: {
				pX: toPanel.pX,
				pY: toPanel.pY,
			},
			from: {
				pX: fromPanel?.pX,
				pY: fromPanel?.pY
			},
			deg: piece.deg,
			pieceChar: piece.char,
			end
		});
	}

	/** 棋譜をテキストで取得
	 * @returns {string}
	 */
	getTextRecord(){
		const getPX = ({pX})=> pX==null? "*": (this.xLen-pX).toString(36);
		const getPY = ({pY})=> pY==null? "*": (pY+1).toString(36);
		return this.record.map(
			({to, from, deg, pieceChar, end})=>`${
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
	 * {boolean} isMinimam - 縮小表示
	 */
	toString(isMinimam=false){
		const {xLen} = this;

		let header = "";
		let footer = "";
		let panelOuter = "";
		let panelSep = "";
		let rowSep = "\n";

		if(!isMinimam){
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
					""+(panel.piece || panel.toString(isMinimam))
				).join(panelSep)+
				panelOuter
			).join(rowSep)+
			footer+
			this.stand.toString(isMinimam)
		);
	}
}
