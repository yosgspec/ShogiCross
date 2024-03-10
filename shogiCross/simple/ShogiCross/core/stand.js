import {Piece} from "./piece.js";
import {Bod} from "./bod.js";

/** 盤の管理クラス */
export class Stand{
	/** 角度からstockの添字を取得
	 * @type {Object<string, number>}
	 */
	static degId = {
		180: 0,
		90: 1,
		270: 2,
		0: 3
	}

	/**
	 * @param {Board} ボード
	 */
	constructor(board){
		this.board = board;
		const {top, right, bottom, width, height, panelWidth, panelHeight, xLen, yLen} = board;

		this.clear();
		this.left = right*1.02;
		this.top = top;
		this.width = width/2;
		this.height = height;
		this.right = this.left+this.width;
		this.bottom = bottom;
		this.pitchWidth = panelWidth/2;
		this.pitchHeight = panelHeight;
		this.xLen = xLen;
		this.yLen = yLen;
	}

	/** 駒台を初期化にする */
	clear(){
		this.stocks = [...Array(4)].map(_=>[]);
	}

	/** 持ち駒からボード上に配置する
	 * @param {Panal} toPanell - 配置先のパネル
	 * @param {Object} options - オプション
	 * @param {number} options.deg - 角度
	 * @param {number} options.i - 配置する持ち駒のインデックス
	 */
	releasePiece(toPanel, options={}){
		const {deg, i} = options
		const {board} = this;

		const stock = this.stocks[deg];
		toPanel.piece = stock[i];
		stock[i].center = toPanel.center;
		stock[i].middle = toPanel.middle;
		board.addRecord(toPanel, {end: "打"});
		stock.splice(i,1);
	}

	/** 駒台に追加する
	 * @param {Piece} piece - 追加する駒
	 */
	add(piece){
		const stock = this.stocks[Stand.degId[piece.deg]];
		piece.turnFront();
		stock.push(piece);
		stock.sort((a,b)=>Math.sign(a.id-b.id));
	}

	/** 駒を持ち駒にする
	 * @param {Piece|null} winnerPiece - 移動する駒
	 * @param {Piece} loserPiece - 捕縛される駒
	 * @param {boolean} forceCapture - 属性を無視して捕縛する
	 * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
	 */
	capturePiece(winnerPiece, loserPiece, forceCapture=false, forceCantCapture=false){
		if(forceCantCapture
			|| !loserPiece
			|| !(forceCapture || winnerPiece.hasAttr("capture"))
			|| loserPiece.hasAttr("king")
			|| loserPiece.hasAttr("cantCapture")
		) return;

		loserPiece.deg = winnerPiece.deg;
		loserPiece.isMoved = true;
		this.add(loserPiece);
	}

	/** 盤を描写 */
	draw(){
		const {board, left, top, width, height, pitchWidth, pitchHeight} = this;
		const {ctx, xLen, yLen} = board;

		// 外枠を描写
		ctx.fillStyle = board.backgroundColor;
		ctx.strokeStyle = board.borderColor;
		ctx.lineWidth = board.borderWidth;

		ctx.save();
		ctx.translate(left, top);
		ctx.fillRect(0, 0, width, height);
		ctx.strokeRect(0, 0, width, height);
		ctx.restore();

		// すべての駒を表示範囲外へ移動
		/*this.stocks.flat().forEach(piece=>{
			piece.center = -1000;
			piece.middle = -1000;
		});*/
		this.stocks.forEach((stock, player)=>{
			let i = 0;
			// 溢れた場合は後方優先で表示
			stock = stock.slice(-yLen/4*xLen);
			for(let pY=0|yLen/4*player;pY<yLen/4*(player+1);pY++){
				for(let pX=0;pX<xLen;pX++){
					const center = left+pitchWidth*(pX+1);
					const middle = top+pitchHeight*(pY+1);
					const piece = stock[i++];
					if(piece == null) break;
					piece.center = center;
					piece.middle = middle;
					piece.draw();
				}
			}
		});
	}

	/** BOD形式テキストを取得
	 * @param {number} deg - 角度
	 * @returns {string}
	 */
	getBodText(deg=0){
		// 駒数カウント
		const pieceMap = new Map();
		this.stocks[Stand.degId[deg]].forEach(({char})=>{
			if(!pieceMap.has(char)) pieceMap.set(char, 0);
			pieceMap.set(char, pieceMap.get(char)+1);
		});
		return Bod.standDegChars[deg]+
			[...pieceMap].map(([char, cnt])=>
				char+Bod.num2Row(cnt)
			).join(" ");
	}

	/** 文字列形式で取得
	 * @param {boolean} isMinimam - 簡易表示
	 */
	toString(isMinimam=false){
		const {xLen} = this.board;
		const stock = this.stocks.flat().filter(v=>v);

		let head = 0 < stock.length? "\n"+"―".repeat(xLen*2)+"\n": "";
		let text = stock.map(o=>""+o).join("");
		if(!isMinimam){
			head = "";
			for(const char of Object.values(Piece.degChars)){
				text = text.replace(char, "\n"+`${char}持駒：${char}`);
			}
		}
		return head+text;
	}
}
