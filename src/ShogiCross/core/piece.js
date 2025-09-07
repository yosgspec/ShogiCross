/** @typedef {import("./data.js").PieceInitOption} PieceInitOption */
import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {games, pieces, pieceRange, pieceCost} from "./data.js";

/** @type {number} 駒生成カウンター */
let pieceCounter = 0;
let ranges;

/** 駒の管理クラス */
export class Piece{
	/** @typedef {Object} Piece */

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
		270: "＜",
	};

	/** プレイヤー表示から角度を取得
	* @type {Object<string, number>}
	 */
	static charDegs = Object.fromEntries(
		Object.entries(Piece.degChars)
			.map(([key, value])=>[value, key]));

	/** サイズ変更設定値
	 * @type {Object<string, number>}
	 */
	static rankRatio = {
		"KR": 1,
		"SR": 0.965,
		"R": 0.935,
		"UC": 0.90,
		"C": 0.865,
	};

	/** @type {number} */
	id;
	/** @type {any} */
	ctx;
	/** @type {string[]} */
	display;
	/** @type {string|null} */
	imgSrc;
	/** @type {string[]} */
	alias;
	/** @type {number} */
	displayPtn;
	/** @type {any} */
	game;
	/** @type {number} */
	cost;
	/** @type {number} */
	center;
	/** @type {number} */
	middle;
	/** @type {number} */
	rad;
	/** @type {number} */
	size;
	/** @type {boolean} */
	useRankSize;
	/** @type {boolean} */
	isDrawShadow;
	/** @type {boolean} */
	isRotateImg;
	/** @type {boolean} */
	isMoved;
	/** @type {boolean} */
	isSelected;
	/** @type {string[]} */
	attr;
	/** @type {any} */
	range;
	/** @type {any} */
	base;
	/** @type {string} */
	char;
	/** @type {Object<string, Piece>} */
	promo;
	/** @type {string} */
	unit;
	/** @type {string} */
	gameName;

	/** 駒の段階別価値を取得
	 * @returns {string}
	 */
	get rank(){
		return (
			this.cost <= 0? "KR":
			20 <= this.cost? "SR":
			10 <= this.cost? "R":
			5 <= this.cost? "UC":
			"C"
		);
	}

	/** 駒の移動範囲を展開
	 * @param {string|string[]|Object<string, any[]>} value
	 * @returns {Object<string, any[]>}
	 */
	static expandRange = value=>
		// 値が文字列で、pieceRangeにキーが存在すれば、実データに置き換える
		typeof value === "string" && Piece.ranges[value]?
			Piece.ranges[value]:
		// 値が配列なら、各要素を再帰的に展開
		Array.isArray(value)?
			value.map(item=>Piece.expandRange(item)):
		// 値がオブジェクトなら、各プロパティの値を再帰的に展開
		typeof value === "object" && value !== null?
			Object.fromEntries(
				Object.entries(value).map(([key, rng])=>
					[key, Piece.expandRange(rng)])):
		// それ以外の値（"piece"キーの値など）はそのまま返す
		value;

	/** 駒データを初期化
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {Piece|PieceInitOption} option - 駒の初期化オプション
	 * @returns {Object<string, Piece>}
	 */
	static getPieces(ctx, option={}){
		const exPieces = new Map(Object.entries(JSON.parse(JSON.stringify(pieces))));
		for(const [_, piece] of exPieces)
			piece.range = Piece.expandRange(piece.range);
		/* データを補完 */
		for(const [_, piece] of exPieces){
			piece.attr ??= [];
			if(piece.unit && piece.unit !== "成") piece.base = piece;
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
				exPieces.set(key, {...piece, ...promo});
			};
		}
		// 駒をクラスオブジェクトに変換
		[...exPieces].forEach(([key, piece], i)=>{
			piece.char = key;
			exPieces.set(key, new Piece(ctx, piece, option));
		});
		const exPiecesObj = Object.fromEntries(exPieces);
		// エイリアスのデータを統合
		for(const [key, piece] of exPieces){
			piece.alias.forEach((aliasKey, i)=>{
				if(exPiecesObj[aliasKey]) return;
				const alias = piece.clone();
				const display = [...alias.display];
				alias.displayPtn = i+1;
				alias.display = display;
				exPiecesObj[aliasKey] = alias;
			});
		}
		return exPiecesObj;
	}

	/** 文字列から駒を取得
	 * @param {Object<string, Piece|PieceInitOption>} pieces - 駒の一覧
	 * @param {string} text - 駒文字列
	 * @returns {Piece}
	 */
	static stringToPiece(pieces, text){
		if(!text) return null;
		const [degChar, pieceChar] = [...text];
		const deg = Piece.charDegs[degChar];
		if(!deg || !pieces[pieceChar]) return null;
		const piece = pieces[pieceChar].clone();
		piece.deg = deg;
		return piece;
	}

	/** 駒の一覧をリストで取得
	 * @param {Object<string,Piece>} pieces
	 * @returns {Piece[]}
	 */
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
		let zoom = this.size/100;
		if(this.useRankSize)
			zoom *= Piece.rankRatio[this.rank];
		return zoom;
	}

	/** 移動範囲を二次元配列で取得
	 * @returns {string[][]|Object<string,any>}
	 */
	static get ranges(){
		if(ranges) return ranges;
		return ranges = Object.fromEntries(
			Object.entries(pieceRange).map(([key, value])=>
				[key, value.map(row=>[...row])]));
	}

	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {Piece|PieceInitOption} piece - 駒
	 * @param {Object} option - オプション
	 * @param {number} option.displayPtn - 表示文字列を変更(1〜)
	 * @param {number} option.deg - 駒の角度
	 * @param {number} option.size - 駒の大きさ
	 * @param {boolean} option.useRankSize - 駒の大きさを格の違いで変更するか
	 * @param {boolean} option.isDrawShadow - 駒の影の描写有無
	 * @param {boolean} option.isMoved - 初回移動済みか否か
	 */
	constructor(ctx, piece, option={}){
		const {
			displayPtn=0,
			deg=0,
			size=Piece.size,
			useRankSize=Piece.useRankSize,
			isDrawShadow=Piece.isDrawShadow,
			isMoved=false
		} = option;
		Object.assign(this, piece);
		this.id = pieceCounter++;
		this.ctx = ctx;
		this.display ??= [""];
		this.imgSrc ??= null;
		this.alias = [...this.alias ?? ""];
		this.displayPtn ??= displayPtn;
		this.game = games[this.gameName];
		this.cost = pieceCost[this.char] ?? pieceCost[this.base.char] ?? 1;
		this.center = 0;
		this.middle = 0;
		this.deg ||= deg;
		this.size ??= size;
		this.useRankSize ??= useRankSize;
		this.isDrawShadow ??= isDrawShadow;
		this.isRotateImg ??= true;
		this.isMoved = isMoved;
		this.isSelected = false;
		this.attr ??= [];
		try{
			// this.range全体に再帰的な展開を適用
			this.range = Piece.expandRange(this.range);
		}
		catch(e){
			console.error(e);
			throw piece;
		}
	}

	/** 駒をクローン
	 * @returns {Piece}
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
		if(!promo[char]) throw Error(`promo=${char}, Plomote key is missing.`);
		if(this.hasAttr("promoted")) throw Error(`promo=${char}, Promoted piece.`);
		Object.assign(this, promo[char]);
		this.char = char;
	}

	/** 属性の存在を確認
	 * @param {string} attrName - 属性名
	 * @returns {boolean}
	 */
	hasAttr(attrName){
		return this.attr.includes(attrName);
	}

	/** 座標が駒に含まれるか判定
	 * @param {number} x - X座標
	 * @param {number} y - Y座標
	 * @returns {boolean}
	 */
	checkRangeMouse(x, y){
		return (
			this.left <= x && x < this.right &&
			this.top <= y && y < this.bottom
		);
	}

	/** 移動範囲を回転して取得
	 * @returns {string[][]}
	 */
	getRange(){
		const deg = 0|this.deg;
		const range = JSON.parse(JSON.stringify(this.range));

		if(deg === 0) return range;
		if(![90, 180, 270].includes(deg)) throw Error(`deg=${deg}, deg need multiple of 90.`);

		const rotate = target=>{
			if(Array.isArray(target) && typeof target[0][0] === "string"){
				// 2次元配列とみなして回転
				let rotated = target;
				if([90, 270].includes(deg)){
					// 2次配列を転置
					const transpose = a=>a[0].map((_, c)=>a.map(r=>r[c]));
					rotated = transpose(rotated);
				}
				if([180, 270].includes(deg)){
					rotated.reverse();
				}
				rotated.forEach(row=>{
					if([90, 180].includes(deg)) row.reverse();
				});
				return rotated;
			}
			if(Array.isArray(target))
				return target.map(item=>rotate(item));
			if(typeof target === "object" && target !== null)
				return Object.fromEntries(
					Object.entries(target).map(([key, value])=>
						[key, rotate(value)]));
			return target;
		}
		// 再帰して移動範囲をすべて回転
		return rotate(range);
	}

	/** 駒/マスクを描写 */
	async draw(){
		if(!this.ctx) return;
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
		if(!this.ctx) return;
		const {ctx, size, deg} = this;

		const src = this.imgSrc[deg][this.displayPtn] ?? this.imgSrc[0][this.displayPtn];
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
		if(!this.ctx) return;
		const {ctx, size} = this;

		ctx.fillStyle = color;
		ctx.save();
		const imgWidth = size*0.9;
		const imgHeight = size;

		ctx.translate(this.center, this.middle);
		ctx.fillRect(-imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
		ctx.restore();
	}

	/** 将棋駒の外形パスを作成
	 * @param {number} zoom - 駒の拡大率
	 */
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

	/** 駒の影を描写
	* @param {number} zoom - 駒の拡大率
	*/
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
		if(!this.ctx) return;
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
		if(!this.ctx) return;
		const {ctx, zoom} = this;

		ctx.fillStyle = color;
		ctx.save();
		this.makePath(zoom);
		ctx.fill();

		ctx.restore();
	}

	/** 駒に最終手を描写
	 * @param {string} color - カラーエフェクトの色
	 */
	drawLastMove(color){
		if(!this.ctx) return;
		const {ctx, zoom} = this;

		ctx.fillStyle = color;
		ctx.save();
		this.makePath(zoom);
		ctx.fill();

		ctx.restore();
	}

	/** 文字列形式で取得
	 * @param {boolean} isAlias - エイリアス表示
	 */
	toString(isAlias=false){
		const {displayPtn} = this;

		const char = !isAlias || displayPtn === 0?
			this.char:
			this.alias[displayPtn-1];
		return Piece.degChars[this.deg] + char;
	}
}
