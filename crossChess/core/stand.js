// import boards from "./json/boards.json" assert { type: "json" };
// import panels from "./json/panels.json" assert { type: "json" };
// import pieces from "./json/pieces.json" assert { type: "json" };
// import games from "./json/games.json" assert { type: "json" };

/** 盤の管理クラス */
class Stand{
	/**
	 * @param {any} canvas 
	 */
	constructor(board){
		this.stock = [];
		this.board = board;
		const {left, top, width, height, panelWidth, panelHeight, xLen, yLen} = board;

		this.left = left+width*1.02;
		this.top = top;
		this.width = width/2;
		this.height = height;
		this.pitchWidth = panelWidth/2;
		this.pitchHeight = panelHeight;
		this.xLen = xLen;
		this.yLen = yLen;
	}

	/** 駒台に追加する
	 * @param {Piece} piece - 追加する駒
	 */
	add(piece){
		piece.turnFront();
		this.stock.push(piece);
		this.stock.sort((a,b)=>Math.sign((a.deg+a.id)-(b.deg+b.id)));
	}

	/** 駒を持ち駒にする
	 * @param {Piece|null} winnerPiece - 移動する駒
	 * @param {Piece} loserPiece - 捕縛される駒
	 */
	capturePiece(winnerPiece, loserPiece){
		if(
			!loserPiece ||
			!winnerPiece.attr?.includes("capture") ||
			loserPiece.group === "王"
		) return;

		loserPiece.deg = winnerPiece.deg;
		this.add(loserPiece);
	}

	/** 盤を描写 */
	draw(){
		const {board, left, top, width, height} = this;
		const {ctx} = board;

		// 外枠を描写
		ctx.fillStyle = board.backgroundColor;
		ctx.strokeStyle = board.borderColor;
		ctx.lineWidth = board.borderWidth;

		ctx.save();
		ctx.translate(left, top);
		ctx.strokeRect(0, 0, width, height);
		ctx.fillRect(0, 0, width, height);
		ctx.restore();
	}

	/** 文字列形式で取得
	 * @param {string} - 簡易表示
	 */
	toString(isMinimam=false){
		const {xLen} = this.board;

		let head = 0 < this.stock.length? "\n"+"―".repeat(xLen*2)+"\n": "";
		let text = this.stock.map(o=>""+o).join("");
		if(!isMinimam){
			head = "";
			for(const char of Object.values(Piece.degChars)){
				text = text.replace(char, "\n"+`${char}持ち駒:${char}`);
			}
		}
		return head+text;
	}
}
