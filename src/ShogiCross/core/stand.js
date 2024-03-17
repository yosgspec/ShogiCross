import {Piece} from "./piece.js";
import {Bod} from "./bod.js";

/** 盤の管理クラス */
export class Stand{
	/** 駒台への角度ごとの表示順
	 * @type {number[]}
	 */
	static #degOrder = [180, 90, 270, 0];

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
		this.stocks = new Map(Stand.#degOrder.map(i=>[i,[]]));
	}

	/** 持ち駒からボード上に配置する
	 * @param {Panal} toPanell - 配置先のパネル
	 * @param {Object} option - オプション
	 * @param {number} option.deg - 角度
	 * @param {number} option.i - 配置する持ち駒のインデックス
	 */
	releasePiece(toPanel, option={}){
		const {deg, i} = option
		const {board} = this;
		const stock = this.stocks.get(deg);
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
		const stock = this.stocks.get(piece.deg);
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
		[...this.stocks.values()].forEach((stock, player)=>{
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

	/** 駒台をテキスト形式で取得
	 * @param {boolean} isCompact - コンパクト表示
	 */
	toString(isCompact=false){
		const {xLen} = this.board;
		const stock = [...this.stocks.values()].flat().filter(v=>v);

		let head = 0 < stock.length? "\n"+"―".repeat(xLen*2)+"\n": "";
		let text = stock.map(o=>""+o).join("");
		if(!isCompact){
			head = "";
			for(const char of Object.values(Piece.degChars)){
				text = text.replace(char, "\n"+`${char}持駒：${char}`);
			}
		}
		return head+text;
	}
}
