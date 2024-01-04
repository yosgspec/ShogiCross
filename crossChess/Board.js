/** マス目の管理クラス */
class Panel{
	constructor(ctx, panel, x0, y0, dx, dy){
		Object.assign(this, panel)
		this.ctx = ctx;
		this.x0 = x0;
		this.y0 = y0;
		this.dx = dx;
		this.dy = dy;
		this.piece = null;
	}

	/* マス目を描写 */
	draw(x, y){
		const ctx = this.ctx;
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;
		const xCenter = x-this.dx/2;
		const yCenter = y-this.dy/2;
		ctx.save();
		ctx.translate(xCenter, yCenter);
		ctx.strokeRect(0, 0, this.dx, this.dy);
		ctx.fillRect(0, 0, this.dx, this.dy);
		ctx.restore();
	}
}

/** 盤の管理クラス */
class Board{
	constructor(ctx, boardName, x0, y0, dx, dy){
		Object.assign(this, boards[boardName]);
		this.ctx = ctx;
		this.x0 = x0;
		this.y0 = y0;
		this.dx = dx;
		this.dy = dy;
		this.field = this.field.map(row=>
			[...row].map(v=>new Panel(ctx, panels[v], x0, y0, dx, dy)));
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;
	}

	putPieces(pieceSet, ptn="default"){
		const pos = games[pieceSet].position[this.xLen][ptn];
		pos.forEach((row, i)=>{
			const y = i+this.yLen - pos.length;
			[...row].forEach((v, x)=>{
				if(pieces[v] == null) return;
				const piece = pieces[v].clone();
				this.field[y][x].piece = piece;
			});
		});
	}

	roteteField(){
		this.field.forEach(row=>{
			row.forEach(panel=>{
				if(panel.piece == null) return;
				panel.piece.deg += 180;
			});
			row.reverse()
		});
		this.field.reverse();
	}

	/* 盤を描写 */
	draw(){
		const ctx = this.ctx;

		/* 外枠を描写 */
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;

		const boardX0 = this.x0-this.dx;
		const boardY0 = this.y0-this.dy;
		const boardWidth = this.dx*(this.xLen+1);
		const boardHeight = this.dy*(this.yLen+1);
		ctx.save();
		ctx.translate(boardX0, boardY0);
		ctx.strokeRect(0, 0, boardWidth, boardHeight);
		ctx.fillRect(0, 0, boardWidth, boardHeight);
		ctx.restore();

		/* マス目を描写 */
		this.field.forEach((row, y)=>{
			row.forEach((panel, x)=>{
				const panelX0 = this.x0+this.dx*x;
				const panelY0 = this.y0+this.dy*y;
				panel.draw(panelX0, panelY0);
				if(panel.piece == null) return;
				panel.piece.draw(panelX0, panelY0);
			});
		});
	}
}

/* 駒の管理クラス */
class Piece{
	/* 成駒をデータに統合 */
	static init(ctx, size){
		for(const [baseChar, base] of Object.entries(pieces)){
			base.base = baseChar;
			if(base.promo == null) continue;
			for(const [promoChar, promo] of Object.entries(base.promo)){
				pieces[promoChar] = {...base, ...promo};
				pieces[promoChar].group = "成";
				delete pieces[promoChar].promo;
			}
		}
		for(const [key, piece] of Object.entries(pieces)){
			pieces[key] = new Piece(ctx, piece, size);
		}
	}

	constructor(ctx, piece, size=100, deg=0){
		Object.assign(this, piece);
		this.ctx = ctx;
		if(typeof this.game === "string") this.game = games[this.game];
		this.size = size;
		this.zoom = size/100;
		this.deg = deg;
	}

	set deg(value){
		this.rad = value%360*Math.PI/180;
	}
	get deg(){
		return this.rad%360/(Math.PI/180);
	}

	clone(){
		return new Piece(this.ctx, this, this.size, this.deg);
	}

	/* 駒を描写 */
	draw(x, y, displayNo=0){
		const ctx = this.ctx;

		const zoom = this.zoom;
		ctx.strokeStyle = "#777777";

		ctx.fillStyle   = this.game.backgroundColor;
		ctx.lineWidth = 5;
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(this.rad);

		/* 外枠を描写 */
		ctx.beginPath();
		ctx.moveTo(-30*zoom,-40*zoom);
		ctx.lineTo(  0*zoom,-50*zoom);
		ctx.lineTo( 30*zoom,-40*zoom);
		ctx.lineTo( 40*zoom, 50*zoom);
		ctx.lineTo(-40*zoom, 50*zoom);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		/* 文字を描写 */
		ctx.fillStyle = this.game.fontColor;
		const text = this.display[displayNo];
		const fontSize = 40*zoom;
		ctx.font = `${fontSize}px "Noto Serif CJK JP Black","Noto Sans Symbols","Noto Sans Symbols 2","Noto Emoji"`;

		[...text].forEach((v,i)=>{
			const width = ctx.measureText(v).width;
			const height = text.length === 1? fontSize/2: i*fontSize;
			ctx.fillText(v, -width/2, height);
		});

		ctx.restore();
	}
}
