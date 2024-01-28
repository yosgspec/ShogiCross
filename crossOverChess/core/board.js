import {Piece} from "./piece.js";
import {Panel} from "./panel.js";
import {Stand} from "./stand.js";
import {uIControl} from "./uiControl.js";
import boards from "../json/boards.json" assert { type: "json" };
import games from "../json/games.json" assert { type: "json" };

/** 盤の管理クラス */
export class Board{
	/**
	 * @param {HTMLCanvasElement} canvas - キャンバス要素
	 * @param {number} canvasWidth - キャンバス幅
	 * @param {number} canvasHeight - キャンバス高さ
	 * @param {string} playBoard - ボードタイプ
	 * @param {number} boardLeft - 描写するX座標
	 * @param {number} boardTop - 描写するY座標
	 * @param {number} panelWidth - パネル幅
	 * @param {number} panelHeight - パネル高さ
	 * @param {number} players - プレイヤー人数(2 or 4)
	 */
	constructor(canvas, {canvasWidth, canvasHeight, playBoard, boardLeft, boardTop, panelWidth, panelHeight, pieceSize, backgroundColor="#00000000"}, players = 2){
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.panelWidth, canvas.panelHeight);
		this.pieces = Piece.getPieces(ctx, pieceSize);

		Object.assign(this, boards[playBoard]);
		this.canvas = canvas;
		this.ctx = ctx;
		this.left = boardLeft;
		this.top = boardTop;
		this.panelWidth = panelWidth;
		this.panelHeight = panelHeight;
		this.pieceSize = pieceSize;
		this.canvasBackgroundColor = backgroundColor;

		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.players = players;

		// マス目データを構築
		this.field = this.field.map((row, yCnt)=>
			[...row].map((char, xCnt)=>{
				const center = boardLeft+panelWidth*(xCnt+1);
				const middle = boardTop+panelHeight*(yCnt+1)
				return new Panel(ctx, char, center, middle, panelWidth, panelHeight, this.borderWidth, xCnt, yCnt);
			})
		);
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;
		this.width = this.panelWidth*(this.xLen+1);
		this.height = this.panelHeight*(this.yLen+1);
		this.right = boardLeft+this.width;
		this.bottom = boardTop+this.height;
		this.stand = new Stand(this);
		this.record = "";
		this.onDrawed = null;

		this.uiControl = uIControl(this);
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

		deg = (deg+360)%360;
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
	 * {string} pieceSet - 駒の配置セット
	 * {string} ptn - 駒の配置パターン変更
	 */
	putStartPieces(playerId, pieceSet, ptn="default"){
		const {pieces} = this;

		const deg = 0|playerId*360/this.players;
		this.rotateField(deg);
		const pos = games[pieceSet].position[this.xLen][ptn];
		if(!pos) throw Error(`games["${pieceSet}"].position["${this.xLen}"]["${ptn}"]is null.`);
		pos.forEach((row, i)=>{
			if(row.length < this.xLen) throw Error(row.join(""));
			const yCnt = i+this.yLen - pos.length;
			[...row].forEach((char, xCnt)=>{
				if(!pieces[char]) return;
				const piece = pieces[char].clone();
				const panel = this.field[yCnt][xCnt];
				piece.center = panel.center;
				piece.middle = panel.middle;
				panel.piece = piece;
			});
		});
		this.rotateField(-deg);
	}

	/** 駒の配置
	 * @param {string} piece - 駒の表現文字
	 * @param {number} xCnt - X方向配置位置(マス目基準)
	 * @param {number} yCnt - Y方向配置位置(マス目基準)
	 * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
	 * @param {number} displayPtn - 表示文字列を変更(1〜)
	 */
	putNewPiece(piece, xCnt, yCnt, playeaIdOrDeg, displayPtn=0, setDeg=false){
		const {pieces} = this;

		const deg = !setDeg? playeaIdOrDeg*90: playeaIdOrDeg;
		if(typeof piece === "string"){
			piece = new Piece(this.ctx, pieces[piece], displayPtn, deg);
		}
		const panel = this.field[yCnt][xCnt];
		piece.center = panel.center;
		piece.middle = panel.middle;
		panel.piece = piece;
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
		for(let yCnt=0;yCnt<yLen;yCnt++){
			for(let xCnt=0;xCnt<xLen;xCnt++){
				try{
					const text = texts[yCnt][xCnt];
					const piece = Piece.stringToPiece(pieces, text);
					piece.center = field[yCnt][xCnt].center;
					piece.middle = field[yCnt][xCnt].middle;
					field[yCnt][xCnt].piece = piece;
				}
				catch(ex){
					field[yCnt][xCnt].piece = null;
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
		this.draw();
	}

	/** 角度基準のパネルの行を取得する
	 * @param {Panel} panel - パネル
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getRow(panel, deg, offsetDeg=0){
		const {xLen, yLen} = this;
		const {xCnt, yCnt} = panel;
		deg += offsetDeg;
		do{deg=(deg+360)%360}while(deg<0);
		console.log(deg)
		return (
			deg === 0? yLen-1-yCnt:
			deg === 90? xCnt:
			deg === 180? yCnt:
			deg === 270? xLen-1-xCnt:
			-1
		);
	}

	/** プロモーションエリア内であるか判別
	 * @param {Panel} panel - パネル
	 */
	checkCanPromo(panel){
		const {yLen} = this;
		const {piece} = panel;
		const {deg} = piece;
		const promoLine = yLen+piece.game.promoLine-(0|this.promoLineOffset);

		let row;
		if(!this.sidePromo){
			row = this.getRow(panel, deg);
		}
		else{
			row = Math.max(
				...Object.keys(Piece.degChars)
				.map(d=>0|d)
				.filter(d=>d!==deg)
				.map(
					d=>this.getRow(panel, d, 180)
				)
			);
		}
		return promoLine <= row;
	}

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のパネル
	 * @param {Panel} toPanel - 選択中のパネル
	 */
	movePiece(fromPanel, toPanel){
		if(
			!fromPanel ||
			toPanel.attr?.includes("keepOut") ||
			toPanel.piece === fromPanel.piece ||
			toPanel.piece?.deg === fromPanel.piece.deg
		) return;

		let canPromo = this.checkCanPromo(fromPanel);

		this.stand.capturePiece(fromPanel.piece, toPanel.piece);
		toPanel.piece = fromPanel.piece;
		fromPanel.piece = null;

		const {piece} = toPanel;
		piece.center = toPanel.center;
		piece.middle = toPanel.middle;
		piece.isMoved = true;
		canPromo ||= this.checkCanPromo(toPanel);

		// プロモーション処理
		if(!piece.promo || piece.unit === "成" || !canPromo) return;
		for(const [char, {name}] of Object.entries(piece.promo)){
			if(confirm(`成りますか?
${piece.char}:${piece.name}
　↓
${char}:${name}`)){
				piece.promotion(char);
				break;
			}
		}
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
