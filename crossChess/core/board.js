// import boards from "./json/boards.json" assert { type: "json" };
// import panels from "./json/panels.json" assert { type: "json" };
// import pieces from "./json/pieces.json" assert { type: "json" };
// import games from "./json/games.json" assert { type: "json" };

/** 盤の管理クラス */
class Board{
	/**
	 * @param {any} canvas 
	 * @param {number} canvasWidth - キャンバス幅
	 * @param {number} canvasHeight - キャンバス高さ
	 * @param {string} playBoard - ボードタイプ
	 * @param {number} boardLeft - 描写するX座標
	 * @param {number} boardTop - 描写するY座標
	 * @param {number} panelWidth - パネル幅
	 * @param {number} panelHeight - パネル高さ
	 * @param {number} players - プレイヤー人数(2 or 4)
	 */
	constructor(canvas, {canvasWidth, canvasHeight, playBoard, boardLeft, boardTop, panelWidth, panelHeight, pieceSize}, players = 2){
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

		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.players = players;

		// マス目データを構築
		this.field = this.field.map((row, yCnt)=>
			[...row].map((char, xCnt)=>{
				const center = boardLeft+panelWidth*(xCnt+1);
				const middle = boardTop+panelHeight*(yCnt+1)
				return new Panel(ctx, panels[char], center, middle, panelWidth, panelHeight, this.borderWidth, xCnt, yCnt);
			})
		);
		this.stand = [];
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;
		this.width = this.panelWidth*(this.xLen+1);
		this.height = this.panelHeight*(this.yLen+1);
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
			const len = xLen;
			if(len !== yLen) throw Error(`cols=${xLen} != rows=${yLen}, Not rows = cols.`);
			this.field = transpose(this.field);
		}
		if([180, 270].includes(deg)){XPathEvaluator
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
		const {pieces} = this;

		const deg = 0|playerId*360/this.players;
		this.rotateField(deg);
		const pos = games[pieceSet].position[this.xLen][ptn];
		pos.forEach((row, i)=>{
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

	/** プロモーションエリア内であるか判別
	 * @param {Panel} panel - パネル 
	 */ 
	checkCanPromo(panel){
		const {xLen, yLen} = this;
		const {piece, xCnt, yCnt} = panel;
		const {deg} = piece;
		const promoLine = piece.game.promoLine-(0|this.promoLineOffset);

		if(deg === 0 || this.sidePromo && deg !== 180){
			const promoOver = (yLen-promoLine)%yLen-1;
			if(yCnt <= promoOver) return true;
		}
		if(deg === 90 || this.sidePromo && deg !== 270){
			const promoOver = (xLen+promoLine)%xLen;
			if(promoOver <= xCnt) return true;
		}
		if(deg === 180 || this.sidePromo && deg !== 0){
			const promoOver = (yLen+promoLine)%yLen;
			if(promoOver <= yCnt) return true;
		}
		if(deg === 270 || this.sidePromo && deg !== 90){
			const promoOver = (xLen-promoLine)%xLen-1;
			if(xCnt <= promoOver) return true;
		}
		return false;
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
		this.stand.push(loserPiece);
		this.stand.sort((a,b)=>Math.sign(a.deg+a.id-b.deg+b.id));
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

		this.capturePiece(fromPanel.piece, toPanel.piece);
		toPanel.piece = fromPanel.piece;
		fromPanel.piece = null;

		const {piece} = toPanel;
		piece.center = toPanel.center;
		piece.middle = toPanel.middle;
		piece.isMoved = true;
		canPromo ||= this.checkCanPromo(toPanel);

		// プロモーション処理
		if(!piece.promo || piece.group === "成" || !canPromo) return;
		for(const [char, {name}] of Object.entries(piece.promo)){
			console.log(piece)
			if(confirm(`成りますか?
${piece.char}:${piece.name}
　↓
${char}:${name}`)){
				piece.promotion(char);
				break;
			}
		}
	}

	/** 駒配置をテキストで取得
	 * {boolean} isMinimam - 縮小表示
	 */
	outputText(isMinimam=false){
		const {xLen} = this;

		let header = "";
		let footer = "";
		let panelOuter = "";
		let panelSep = "";
		let rowSep = "\n";
		let standText = 0 < this.stand.length? "―".repeat(xLen*2)+"\n": "";
		let standBody = this.stand.map(o=>""+o).join("");

		if(!isMinimam){
			header = `┏${Array(xLen).fill("━━").join("┯")}┓\n`;
			footer = `\n┗${Array(xLen).fill("━━").join("┷")}┛`;
			panelOuter = "┃";
			panelSep = "│";
			rowSep = `\n┠${Array(xLen).fill("──").join("┼")}┨\n`;
			standText = "";
			for(const char of Object.values(Piece.degChars)){
				standBody = standBody.replace(char, "\n"+`${char}持ち駒:${char}`);
			}
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
			standText+
			standBody
		);
	}

	/** 盤を描写 */
	draw(){
		const {ctx, canvasWidth, canvasHeight, left, top, right, bottom, width, height, panelWidth, panelHeight} = this;

		// 描写を初期化
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// 外枠を描写
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;

		ctx.save();
		ctx.translate(left, top);
		ctx.strokeRect(0, 0, width, height);
		ctx.fillRect(0, 0, width, height);
		ctx.translate(panelWidth/2, panelHeight/2);
		ctx.strokeRect(0, 0, width-panelWidth, height-panelHeight);
		ctx.restore();

		// マス目を描写
		this.field.forEach(row=>{
			row.forEach(panel=>{
				panel.draw();
				if(panel.isSelected) panel.drawMask("#FF000055");
				panel.piece?.draw();
				if(panel.piece?.isSelected) panel.piece.drawMask("#FF000055");
			});
		});
		if(this.onDrawed) this.onDrawed(this);
	}
}
