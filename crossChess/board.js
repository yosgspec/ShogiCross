// import boards from "./json/boards.json" assert { type: "json" };
// import panels from "./json/panels.json" assert { type: "json" };
// import pieces from "./json/pieces.json" assert { type: "json" };
// import games from "./json/games.json" assert { type: "json" };

/** 盤の管理クラス */
class Board{
	/** テキスト出力時のプレイヤー表示 */
	degChars = {
		0: "▲",
		90: "≫",
		180: "▽",
		270: "＜"
	};

	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {string} boardName - ボードタイプ
	 * @param {number} x0 - 描写するX座標
	 * @param {number} y0 - 描写するY座標
	 * @param {number} dx - パネル幅
	 * @param {number} dy - パネル高さ
	 * @param {number} players - プレイヤー人数(2 or 4)
	 */
	constructor(ctx, boardName, x0, y0, dx, dy, players = 2){
		Object.assign(this, boards[boardName]);
		this.ctx = ctx;
		this.x0 = x0;
		this.y0 = y0;
		this.dx = dx;
		this.dy = dy;
		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.players = players;
		this.field = this.field.map(row=>
			[...row].map(v=>new Panel(ctx, panels[v], dx, dy)));
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;
	}

	/** 駒配置を回転
	 * @param {number} deg - 回転角 (90の倍数)
	 */
	rotateField(deg){
		deg = (deg+360)%360;
		if(deg === 0) return;
		if(![90, 180, 270].includes(deg)) throw Error(`deg=${deg}, deg need multiple of 90.`);
		if([90, 270].includes(deg)){
			// 2次配列を転置
			const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
			const len = this.xLen;
			if(len !== this.yLen) throw Error(`cols=${this.xLen} != rows=${this.yLen}, Not rows = cols.`);
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
			if([90, 180].includes(deg)) row.reverse()
		});
	}

	/** 駒の初期配置
	 * {number} playerId - プレイヤー番号
	 * {string} pieceSet - 駒の配置セット
	 * {string} ptn - 駒の配置パターン変更
	 */
	putStartPieces(playerId, pieceSet, ptn="default"){
		const deg = 0|playerId*360/this.players;
		this.rotateField(deg);
		const pos = games[pieceSet].position[this.xLen][ptn];
		pos.forEach((row, i)=>{
			const y = i+this.yLen - pos.length;
			[...row].forEach((v, x)=>{
				if(!pieces[v]) return;
				const piece = pieces[v].clone();
				this.field[y][x].piece = piece;
			});
		});
		this.rotateField(-deg);
	}

	/** 駒の配置
	 * @param {string} piece - 駒の表現文字
	 * @param {number} x - X方向配置位置(マス目基準)
	 * @param {number} y - Y方向配置位置(マス目基準)
	 * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
	 * @param {number} displayPtn - 表示文字列を変更(1〜)
	 */
	putNewPiece(piece, x, y, playeaIdOrDeg, displayPtn=0, setDeg=false){
		const deg = !setDeg? playeaIdOrDeg*90: playeaIdOrDeg;
		if(typeof piece === "string") piece = new Piece(this.ctx, pieces[piece], displayPtn, deg)
		this.field[y][x].piece = piece;
	}

	/** 駒配置をテキストで取得
	 * {boolean} isMinimam - 縮小表示
	 */
	outputText(isMinimam=false){
		let header = "";
		let footer = "";
		let panelOuter = "";
		let panelSep = "";
		let rowSep = "\n";
		let panelText = panel => panel.attr.includes("keepOut")? "｜＃": "｜・";

		if(!isMinimam){
			header = `┏${Array(this.xLen).fill("━━").join("┯")}┓\n`;
			footer = `\n┗${Array(this.xLen).fill("━━").join("┷")}┛`;
			panelOuter = "┃";
			panelSep = "│";
			rowSep = `\n┃${Array(this.xLen).fill("──").join("┼")}┨\n`;
			panelText = panel => panel.text;
		}

		return (
			header+
			this.field.map(row=>
				panelOuter+
				row.map(panel=>{
					const piece = panel.piece;
					if(!piece) return panelText(panel);
					return this.degChars[piece.deg] + piece.char;
				}).join(panelSep)+
				panelOuter
			).join(rowSep)+
			footer
		);
	}

	/** 盤を描写 */
	draw(){
		const ctx = this.ctx;

		/* 外枠を描写 */
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;

		const boardWidth = this.dx*(this.xLen+1);
		const boardHeight = this.dy*(this.yLen+1);
		ctx.save();
		ctx.translate(this.x0, this.y0);
		ctx.strokeRect(0, 0, boardWidth, boardHeight);
		ctx.fillRect(0, 0, boardWidth, boardHeight);
		ctx.translate(this.dx/2, this.dy/2);
		ctx.strokeRect(0, 0, boardWidth-this.dx, boardHeight-this.dy);
		ctx.restore();

		/* マス目を描写 */
		this.field.forEach((row, y)=>{
			row.forEach((panel, x)=>{
				const xCenter = this.x0+this.dx*(x+1);
				const yCenter = this.y0+this.dy*(y+1)
				panel.draw(xCenter, yCenter);
				if(!panel.piece) return;
				panel.piece.draw(xCenter, yCenter);
			});
		});
	}
}
