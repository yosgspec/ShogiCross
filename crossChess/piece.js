/* 駒の管理クラス */
class Piece{
	/* 駒データを初期化 */
	static init(ctx, size){
		Piece.size = size;
		/* 成駒のデータを統合 */
		for(const base of Object.values(pieces)){
			base.base = base;
			if(!base.promo) continue;
			for(const [promoChar, promo] of Object.entries(base.promo)){
				pieces[promoChar] = {...base, ...promo};
				pieces[promoChar].group = "成";
			}
		}
		/* 駒をクラスオブジェクトに変換 */
		Object.entries(pieces).map(([key, piece], i)=>{
			piece.id = i;
			piece.char = key;
			pieces[key] = new Piece(ctx, piece);
		});
		/* エイリアスのデータを統合 */
		for(const [baseChar, base] of Object.entries(pieces)){
			if(!base.alias) continue;
			base.alias.forEach((aliasChar, i)=>{
				const alias = base.clone();
				const display = [...alias.display];
				[display[0], display[i+1]] = [display[i+1], display[0]];
				alias.display = display;
				alias.alias[i] = baseChar;
				pieces[aliasChar] = alias;
			});
		}
	}

	/* 駒の角度(deg/rad) */
	set deg(value){
		this.rad = value%360*Math.PI/180;
	}
	get deg(){
		return this.rad%360/(Math.PI/180);
	}

	constructor(ctx, piece, deg=0, size=Piece.size){
		Object.assign(this, piece);
		this.ctx = ctx;
		if(typeof this.game === "string") this.game = games[this.game];
		this.size = size;
		this.zoom = size/100;
		this.deg = deg;
	}

	/* 駒を表返す */
	turnOverFront(){
		Object.assign(this, this.base);
	}

	/* 駒を成らす */
	promotion(promo){
		if(!this.promo) throw Error(`promo=${promo}, Not plomote piece.`);
		if(!promo in this.promo) throw Error(`promo=${promo}, Plomote key is missing.`);
		if(this.group === "成") throw Error(`promo=${promo}, Promoted piece.`);
		Object.assign(this, this.promo[promo]);
		this.group = "成";
	}

	/* 駒をクローン */
	clone(){
		return new Piece(this.ctx, this, this.deg, this.size);
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
		const text = [...this.display[displayNo]];
		const fontSize = 40*zoom;
		ctx.font = `${fontSize}px ${canvasFont.fontStr}`;
		ctx.textAlign = "center";

		text.forEach((v,i)=>{
			const height = text.length === 1? fontSize/2: i*fontSize;
			ctx.fillText(v, 0, height);
		});

		ctx.restore();
	}
}
