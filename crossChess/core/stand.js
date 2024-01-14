// import boards from "./json/boards.json" assert { type: "json" };
// import panels from "./json/panels.json" assert { type: "json" };
// import pieces from "./json/pieces.json" assert { type: "json" };
// import games from "./json/games.json" assert { type: "json" };

/** 盤の管理クラス */
class Stand{
	static degId = {
		180: 0,
		90: 1,
		270: 2,
		0: 3 
	}

	/**
	 * @param {any} canvas 
	 */
	constructor(board){
		this.board = board;
		const {left, top, width, height, panelWidth, panelHeight, xLen, yLen} = board;

		this.stocks = [...Array(4)].map(_=>[]);
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
		const stock = this.stocks[Stand.degId[piece.deg]];
		stock.push(piece);
		stock.sort((a,b)=>Math.sign(a.id-b.id));
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
		const {board, left, top, width, height, pitchWidth, pitchHeight} = this;
		const {ctx, xLen, yLen} = board;

		// 外枠を描写
		ctx.fillStyle = board.backgroundColor;
		ctx.strokeStyle = board.borderColor;
		ctx.lineWidth = board.borderWidth;

		ctx.save();
		ctx.translate(left, top);
		ctx.strokeRect(0, 0, width, height);
		ctx.fillRect(0, 0, width, height);
		ctx.restore();

		this.stocks.forEach((stock, player)=>{
			let i = 0;
			// 溢れた場合は後方優先で表示する
			stock = stock.slice(-yLen/4*xLen);
			console.log(stock);
			for(let yCnt=0|yLen/4*player;yCnt<yLen/4*(player+1);yCnt++){
				for(let xCnt=0;xCnt<xLen;xCnt++){
					const center = left+pitchWidth*(xCnt+1);
					const middle = top+pitchHeight*(yCnt+1);
					const piece = stock[i++];
					if(piece == null) break;
					piece.center = center;
					piece.middle = middle; 
					piece.draw();
				}
			}
		});
	}

	/** 文字列形式で取得
	 * @param {string} - 簡易表示
	 */
	toString(isMinimam=false){
		const {xLen} = this.board;
		const stock = this.stocks.flat().filter(v=>v);

		let head = 0 < stock.length? "\n"+"―".repeat(xLen*2)+"\n": "";
		let text = stock.map(o=>""+o).join("");
		if(!isMinimam){
			head = "";
			for(const char of Object.values(Piece.degChars)){
				text = text.replace(char, "\n"+`${char}持ち駒:${char}`);
			}
		}
		return head+text;
	}
}
