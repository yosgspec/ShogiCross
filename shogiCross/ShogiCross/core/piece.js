import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {games, pieces, pieceRange, pieceCost} from "./json.js";

/** 駒の管理クラス */
export class Piece{
	/** 描写サイズ
	 * @type {number}
	 */
	static size = 45;

	/** 格の違いによって駒の大きさを変更するか
	 * @type {boolean}
	 */
	static useRankSize = true;

	/** 影の描写有無
	 * @type {boolean}
	 */
	static isDrawShadow = true;

	/** テキスト出力時のプレイヤー表示
	 * @type {Object<string, string>}
	 */
	static degChars = {
		0: "▲",
		90: "≫",
		180: "▽",
		270: "＜"
	};

	/** プレイヤー表示から角度を取得 */
	static charDegs = {};

	/** サイズ変更設定値
	 * @type {Object<string, number>}
	 */
	static rankRatio = {
		"KR": 1,
		"SR": 0.965,
		"R": 0.935,
		"UC": 0.90,
		"C": 0.865
	}

	/** 駒の段階別価値を取得 */
	get rank(){
		return (
			this.cost <= 0? "KR":
			20 <= this.cost? "SR":
			10 <= this.cost? "R":
			5 <= this.cost? "UC":
			"C"
		);
	}

	/** 駒データを初期化
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {Object<string, any>} options - 駒の初期化オプション
	 */
	static getPieces(ctx, options={}){
		const exPieces = new Map(Object.entries(JSON.parse(JSON.stringify(pieces))));

		/* データを補完 */
		for(const [_, piece] of exPieces){
			piece.attr ??= [];
			if(piece.unit) piece.base = piece;
		}
		/* 成駒のデータを合成 */
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
			exPieces.set(key, new Piece(ctx, piece, options));
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
	 * @param {Object<string, Piece>} piece - 駒
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

	/** 拡大率を取得
	 * @returns {number}
	 */
	get zoom(){
		let zoom =this.size/100;
		if(this.useRankSize)
			zoom *= Piece.rankRatio[this.rank];
		return zoom;
	}

	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {Object<string, any>} piece - 駒
	 * @param {number} displayPtn - 表示文字列を変更(1〜)
	 * @param {number} deg - 駒の角度
	 * @param {number} size - 駒の大きさ
	 * @param {boolean} useRankSize - 駒の大きさを格の違いで変更するか
	 * @param {boolean} isDrawShadow - 駒の影の描写有無
	 * @param {boolean} isMoved - 初回移動済みか否か
	 */
	constructor(ctx, piece, {
		displayPtn=0,
		deg=0,
		size=Piece.size,
		useRankSize=Piece.useRankSize,
		isDrawShadow=Piece.isDrawShadow,
		isMoved=false
	}={}){
		Object.assign(this, piece);
		this.ctx = ctx;
		this.display ??= [""];
		this.imgSrc ??= null;
		this.alias = [...this.alias ?? ""];
		this.displayPtn = displayPtn;
		this.game = games[this.gameName];
		this.cost = pieceCost[this.char] ?? 1;
		this.center = 0;
		this.middle = 0;
		this.deg = deg;
		this.size = size;
		this.useRankSize = useRankSize;
		this.isDrawShadow = isDrawShadow;
		this.isRotateImg ??= true;
		this.isMoved = isMoved;
		this.isSelected = false;
		this.attr ??= [];
		try{
			Object.entries(this.range).forEach(([key, rng])=>{
				if(Array.isArray(rng)) return;
				this.range[key] = pieceRange[rng].map(row=>[...row])
			});
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
		const {displayPtn, deg, size, isMoved} = this;
		return new Piece(this.ctx, {...this}, {displayPtn, deg, size, isMoved});
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

	/** 駒/マスクを描写 */
	async draw(){
		const selectColor = "#FF000055";
		if(this.imgSrc && canvasImage.imported){
			this.drawImage();
			if(this.isSelected) this.drawMaskImage(selectColor);
		}
		else{
			this.drawPiece();
			if(this.isSelected) this.drawMask(selectColor);
		}
	}

	/** 駒画像を描写 */
	drawImage(){
		const {ctx, size} = this;
		const src = this.imgSrc[this.displayPtn];
		const image = canvasImage.images[src];
		if(!image) return;

		ctx.save();
		ctx.translate(this.center, this.middle);
		if(this.isRotateImg) ctx.rotate(this.rad);

		let imgWidth, imgHeight;
		if(image.width*0.9 < image.height){
			imgWidth = image.width/image.height*size
			imgHeight = size;
		}
		else {
			imgWidth = size;
			imgHeight = image.height/image.width*size;
		}
		ctx.drawImage(image, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
		ctx.restore();
	}

	/** 駒画像にマスクを描写
	 * @param {string} color - カラーエフェクトの色
	 */
	drawMaskImage(color){
		const {ctx, size} = this;

		ctx.fillStyle = color;
		ctx.save();
		const imgWidth = size*0.9;
		const imgHeight = size;

		ctx.translate(this.center, this.middle);
		ctx.fillRect(-imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
		ctx.restore();
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

	/** 駒の影を描写 */
	drawPieceShadow(zoom){
		if(!this.isDrawShadow) return;
		const {ctx} = this;

		ctx.save();
		ctx.translate(0, 10*zoom);
		this.drawMask("#00000066");
		ctx.restore();
	}

	/** 駒を描写 */
	drawPiece(){
		const {ctx, game, zoom} = this;
		let fontColor, backgroundColor, borderColor;
		if(this.hasAttr("promoted")){
			fontColor = game.promoteFontColor ?? game.fontColor ?? "#000000";
			backgroundColor = game.promoteBackgroundColor ?? game.backgroundColor ?? "#FFFFFF",
			borderColor = game.promoteBorderColor ?? game.borderColor ?? "#FF3300";
		}
		else {
			fontColor = game.fontColor ?? "#000000";
			backgroundColor = game.backgroundColor ?? "#FFFFFF",
			borderColor = game.borderColor ?? "#777777";
		}

		ctx.strokeStyle = borderColor;
		ctx.fillStyle = backgroundColor;
		ctx.lineWidth = 8*zoom;
		this.drawPieceShadow(zoom);
		ctx.save();
		this.makePath(zoom);
		ctx.stroke();
		ctx.fill();

		/* 文字を描写 */
		ctx.fillStyle = fontColor;
		const text = [...""+this.display[this.displayPtn]];
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
		const {ctx, zoom} = this;

		ctx.fillStyle = color;
		ctx.save();
		this.makePath(zoom);
		ctx.fill();

		ctx.restore();
	}

	/** BOD形式テキストを取得
	 * @returns {string}
	 */
	getBod(){
		const degBodChars = {
			0: " ",
			180: "v"
		};
		return degBodChars[this.deg] + this.char;
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
