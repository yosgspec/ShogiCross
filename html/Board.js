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

	/* パネルを描写する */
	draw(x, y){
		const ctx = this.ctx;
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;

		const panelX0 = this.x0+this.dx*(x-1/2);
		const panelY0 = this.y0+this.dy*(y-1/2);

		ctx.translate(panelX0, panelY0);
		ctx.strokeRect(0, 0, this.dx, this.dy);
		ctx.fillRect(0, 0, this.dx, this.dy);
		ctx.translate(-panelX0, -panelY0);
	}
}

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

	/* 盤を描写する */
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
		ctx.translate(boardX0, boardY0);
		ctx.strokeRect(0, 0, boardWidth, boardHeight);
		ctx.fillRect(0, 0, boardWidth, boardHeight);
		ctx.translate(-boardX0, -boardY0);

		/* マス目を描写 */
		this.field.forEach((row, y)=>{
			row.forEach((panel, x)=>{
				panel.draw(x, y)
			});
		});
	}
}

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

	constructor(ctx, piece, size=100){
		Object.assign(this, piece);
		this.ctx = ctx;
		this.game = games[this.game];
		this.zoom = size/100;
	}

	/* 駒を描写する */
	draw(x, y, deg=0, displayNo=0){
		const ctx = this.ctx;
		const zoom = this.zoom;
		ctx.strokeStyle = "#777777";
		ctx.fillStyle   = this.game.backgroundColor;
		ctx.lineWidth = 5;
		ctx.translate(x,y);
		ctx.rotate(deg * Math.PI/180);

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
		ctx.font = `${fontSize}px "Noto Serif CJK JP Black","Noto Emoji"`;

		[...text].forEach((v,i)=>{
			const width = ctx.measureText(v).width;
			const height = text.length === 1 ? fontSize/2 : i*fontSize;
			ctx.fillText(v, -width/2, height);
		});

		/* 描写後処理 */
		ctx.translate(-x,-y);
		ctx.restore();
		ctx.save();
	}
}
