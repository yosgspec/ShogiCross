// import pieces from "./json/piece.json" assert { type: "json" };
// import games from "./json/games.json" assert { type: "json" };
// import canvasFont from "./json/canvasFont.json" assert { type: "json" };

/** 駒の管理クラス */
class Piece{
	/** 駒データを初期化
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {number} size - 描写サイズ
	 */
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
		// 駒をクラスオブジェクトに変換
		Object.entries(pieces).map(([key, piece], i)=>{
			piece.id = i;
			piece.char = key;
			pieces[key] = new Piece(ctx, piece);
		});
		// エイリアスのデータを統合
		for(const [baseChar, base] of Object.entries(pieces)){
			if(!base.alias) continue;
			base.alias.forEach((aliasChar, i)=>{
				const alias = base.clone();
				const display = [...alias.display];
				alias.displayPtn = i+1;
				alias.display = display;
				alias.alias[i] = baseChar;
				pieces[aliasChar] = alias;
			});
		}
	}

	/** 駒の一覧をリストで取得 */
	static piecesToList(){
		return Object.entries(pieces)
			.sort(([_,{id:a}], [__,{id:b}])=>
				Math.sign(a-b));
	}

	/** 駒の角度(deg/rad)
	 * @param {number} value
	 */
	set deg(value){
		this.rad = value%360*Math.PI/180;
	}
	get deg(){
		return this.rad%360/(Math.PI/180);
	}

	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {{[s:string]:any}} piece - 駒
	 * @param {number} displayPtn - 表示文字列を変更(1〜)
	 * @param {number} deg - パネル角度
	 * @param {number} size - パネルサイズ
	 */
	constructor(ctx, piece, displayPtn=0, deg=0, size=Piece.size){
		Object.assign(this, piece);
		this.ctx = ctx;
		this.game = games[this.gameName];
		this.displayPtn = displayPtn;
		this.center = 0;
		this.middle = 0;
		this.size = size;
		this.deg = deg;
	}

	/** 描写座標を設定
	 * @param {number} center - 描写するX座標(中心原点)
	 * @param {number} middle - 描写するY座標(中心原点)
	 */
	setCenterXY(center, middle){
		this.center = center;
		this.middle = middle;
	}

	/** 駒を表返す */
	turnOverFront(){
		Object.assign(this, this.base);
	}

	/** プロモーション
	 * @param {string} promo - 成り先の文字
	 */
	promotion(promo){
		if(!this.promo) throw Error(`promo=${promo}, Not plomote piece.`);
		if(!promo in this.promo) throw Error(`promo=${promo}, Plomote key is missing.`);
		if(this.group === "成") throw Error(`promo=${promo}, Promoted piece.`);
		Object.assign(this, this.promo[promo]);
		this.group = "成";
	}

	/** 駒をクローン */
	clone(){
		return new Piece(this.ctx, this, this.displayPtn, this.deg, this.size);
	}

	/** 駒を描写
	 * @param {number} size - 描写するサイズ
	 */
	draw(size=this.size){
		const ctx = this.ctx;
		const zoom = size/100;
		ctx.strokeStyle = "#777777";

		ctx.fillStyle   = this.game.backgroundColor;
		ctx.lineWidth = 8*zoom;
		ctx.save();
		ctx.translate(this.center, this.middle);
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
		const text = [...this.display[this.displayPtn]];
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
