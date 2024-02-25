import {canvasFont} from "./canvasFontLoader.js";
import pieces from "../json/pieces.json" assert {type: "json"};
import pieceRange from "../json/pieceRange.json" assert {type: "json"};
import pieceCost from "../json/pieceCost.json" assert {type: "json"};
import pieceEn from "../json/pieceEn.json" assert {type: "json"};
import games from "../json/games.json" assert {type: "json"};

/** 駒の管理クラス */
export class Piece{
	/** テキスト出力時のプレイヤー表示 */
	static degChars = {
		0: "▲",
		90: "≫",
		180: "▽",
		270: "＜"
	};

	/** プレイヤー表示から角度を取得 */
	static charDegs = {};

	/** 駒データを初期化
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {number} size - 描写サイズ
	 */
	static getPieces(ctx, size){
		Piece.size = size;
		const exPieces = new Map(Object.entries(JSON.parse(JSON.stringify(pieces))));

		/* 移動範囲データを補完 */
		for(const [key, piece] of exPieces){
			if(!piece.alias) piece.alias = "";
			piece.alias = [...piece.alias];
			if(!piece.attr) piece.attr = [];
			if(piece.unit) piece.base = piece;
			if(pieceCost[key]) piece.cost = pieceCost[key];
			piece.en = pieceEn[key];
			Object.entries(piece.range).forEach(([rangeKey, rangeValue])=>{
				piece.range[rangeKey] = pieceRange[rangeValue];
			})
		}
		/* 成駒のデータを統合 */
		for(const [_, piece] of exPieces){
			if(!piece.promo || typeof(piece.promo) !== "string") continue;
			const promoKeys = [...piece.promo];
			piece.promo = {};
			for(const key of promoKeys){
				const promo = exPieces.get(key);
				promo.attr.push("promoted");
				promo.unit = "成";
				piece.promo[key] = promo;
				exPieces.set(key,{...piece, ...promo});
			};
		}
		// 駒をクラスオブジェクトに変換
		[...exPieces].forEach(([key, piece], i)=>{
			piece.id = i;
			piece.char = key;
			exPieces.set(key, new Piece(ctx, piece));
		});
		const exPiecesObj = Object.fromEntries(exPieces);
		// エイリアスのデータを統合
		for(const [key, piece] of exPieces){
			piece.alias.forEach((aliasKey, i)=>{
				const alias = piece.clone();
				const display = [...alias.display];
				alias.displayPtn = i+1;
				alias.display = display;
				alias.alias[i] = key;
				exPiecesObj[aliasKey] = alias;
			});
		}
		return exPiecesObj;
	}

	/** 文字列から駒を取得
	 * @param {{[s:string]:Piece}} piece - 駒
	 * @param {string} text - 駒文字列
	 */
	static stringToPiece(pieces, text){
		if (!text) return null;
		const [degChar, pieceChar] = [...text];
		const deg = Piece.charDegs[degChar];
		if(!deg) return null;
		const piece = pieces[pieceChar].clone();
		piece.deg = deg;
		return piece;
	}

	/** 駒の一覧をリストで取得 */
	static piecesToList(pieces){
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

	/** 左側の座標 */
	get left(){
		return this.center-this.size*0.8/2;
	}
	/** 上側の座標 */
	get top(){
		return this.middle-this.size/2;
	}
	/** 右側の座標 */
	get right(){
		return this.center+this.size*0.8/2;
	}
	/** 下側の座標 */
	get bottom(){
		return this.middle+this.size/2;
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
		this.isSelected = false;
		this.isMoved = false;
		if(!this.attr) this.attr = [];
		try{
			Object.entries(this.range).forEach(([key, rng])=>
				this.range[key] = rng.map(row=>[...row])
			);
		}
		catch(e){
			console.error(e);
			throw piece;
		}
	}

	/** 駒をクローン
	 * @returns Piece
	 */
	clone(){
		return new Piece(this.ctx, {...this}, this.displayPtn, this.deg, this.size);
	}

	/** 駒を表返す */
	turnFront(){
		Object.assign(this, this.base);
	}

	/** プロモーション
	 * @param {string} char - 成り先の文字
	 */
	promotion(char){
		const {promo} = this;

		if(!promo) throw Error(`promo=${char}, Not plomote piece.`);
		if(!promo in promo) throw Error(`promo=${char}, Plomote key is missing.`);
		if(this.hasAttr("promoted")) throw Error(`promo=${char}, Promoted piece.`);
		Object.assign(this, promo[char]);
		this.char = char;
	}

	/** 属性の存在を確認
	 * @param {string} attr - 属性
	 * @returns boolean
	 */
	hasAttr(attr){
		return this.attr.includes(attr);
	}


	/** 座標が駒に含まれるか判定
	 * @param {number} x - X座標
	 * @param {number} y - Y座標
	 */
	checkRangeMouse(x, y){
		return (
			this.left <= x && x < this.right &&
			this.top <= y && y < this.bottom
		);
	}

	/** 移動範囲を回転して取得 */
	getRange(){
		const deg = 0|this.deg;
		const range = JSON.parse(JSON.stringify(this.range));
		Object.keys(range).forEach(key=>{
			if(deg === 0) return;
			if(![90, 180, 270].includes(deg)) throw Error(`deg=${deg}, deg need multiple of 90.`);
			if([90, 270].includes(deg)){
				// 2次配列を転置
				const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
				range[key] = transpose(range[key]);
			}
			if([180, 270].includes(deg)){
				range[key].reverse();
			}
			range[key].forEach(row=>{
				if([90, 180].includes(deg)) row.reverse();
			});
		});
		return range;
	}

	// サイズ変更設定値
	sizes = {
		"KR": 1,
		"SR": 0.975,
		"R": 0.95,
		"UC": 0.925,
		"C": 0.9
	}
	get rare(){
		return (
			this.cost <= 0? "KR":
			24 <= this.cost? "SR":
			12 <= this.cost? "R":
			5 <= this.cost? "UC":
			"C"
		);
	}

	/** 駒/マスクを描写 */
	draw(){
		this.drawPiece();
		const selectColor = "#FF000055";
		if(this.isSelected) this.drawMask(selectColor);
	}

	/** 将棋駒の外形パスを作成 */
	makePath(zoom){
		const {ctx} = this;

		ctx.translate(this.center, this.middle);
		ctx.rotate(this.rad);

		/* 外枠を描写 */
		ctx.beginPath();
		ctx.moveTo(-30*zoom,-40*zoom);
		ctx.lineTo(  0*zoom,-50*zoom);
		ctx.lineTo( 30*zoom,-40*zoom);
		ctx.lineTo( 45*zoom, 50*zoom);
		ctx.lineTo(-45*zoom, 50*zoom);
		ctx.closePath();
	}

	/** 駒を描写 */
	drawPiece(){
		const {ctx, game} = this;

		const zoom = this.size/100;
		// const zoom = this.size/100*this.sizes[this.rare];
		ctx.strokeStyle = this.hasAttr("promoted")? "#FF3300": "#777777";
		ctx.fillStyle = game.backgroundColor;
		ctx.lineWidth = 8*zoom;
		ctx.save();
		this.makePath(zoom);
		ctx.stroke();
		ctx.fill();

		/* 文字を描写 */
		ctx.fillStyle = game.fontColor;
		const text = [...this.display[this.displayPtn]];
		const fontSize = 40*zoom;
		ctx.font = `${fontSize}px ${canvasFont.names}`;
		ctx.textAlign = "center";

		text.forEach((v,i)=>{
			const height = text.length === 1? fontSize/2: i*fontSize;
			ctx.fillText(v, 0, height);
		});

		ctx.restore();
	}

	/** 駒にマスクを描写
	 * @param {string} color - カラーエフェクトの色
	 */
	drawMask(color){
		const {ctx} = this;

		const zoom = this.size/100;

		ctx.fillStyle = color;
		ctx.save();
		this.makePath(zoom);
		ctx.fill();

		ctx.restore();
	}

	/** 文字列形式で取得 */
	toString(){
		return Piece.degChars[this.deg] + this.char;
	}
}

// プレイヤー表示から角度を取得
Object.entries(Piece.degChars)
	.forEach(([key, value])=>{
		Piece.charDegs[value] = key;
	});