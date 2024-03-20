import {canvasFont} from "./canvasFontLoader.js";
import {canvasImage} from "./canvasImageLoader.js";
import {panels} from "./json.js";

/** マス目の管理クラス */
export class Panel{
	#piece
	#isSelected;
	#targetRanges;

	/** 駒オブジェクト
	 * @returns {Piece}
	 */
	get piece(){
		return this.#piece
	}
	set piece(piece){
		this.#piece = piece;
		if(!piece) return;
		piece.center = this.center;
		piece.middle = this.middle;
	}

	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {string} char - マス目を示す文字
	 * @param {number} center - 描写するX座標(中心原点)
	 * @param {number} middle - 描写するY座標(中心原点)
	 * @param {number} width - マス目幅
	 * @param {number} height - マス目高さ
	 * @param {number} pX - ボード上のマス目の列
	 * @param {number} pY - ボード上のマス目の行
	 * @param {number} borderWidth - 枠線の太さ
	 */
	constructor(ctx, char, center, middle, width, height, pX, pY, borderWidth){
		Object.assign(this, panels[char]);
		this.ctx = ctx;
		this.center = center;
		this.middle = middle;
		this.width = width;
		this.height = height;
		this.left = center-width/2;
		this.top = middle-height/2;
		this.right = center+width/2;
		this.bottom = middle+height/2;
		this.pX = pX;
		this.pY = pY;
		this.borderWidth = borderWidth;
		this.selectColor ??= "#FF000066";
		this.targetColor ??= "#00FF0066";
		this.attr ??= [];
		this.piece = null;
		this.isSelected = false;
		this.clearTarget();
	}

	/** マス目の選択状態
	 * @param {boolean} value
	 */
	set isSelected(value){
		this.#isSelected = this.hasAttr("keepOut")? false: value;
	}
	get isSelected(){
		return this.#isSelected;
	}

	/** マス目の移動可能判定
	 * @param {boolean} value
	 */
	get isTarget(){
		return 0 < this.#targetRanges.length;
	}

	/** マス目の移動先情報をクリア */
	clearTarget(){
		this.#targetRanges = [];
	}

	/** マス目の移動先情報を追加
	 * @param {string} rangeName - 移動先情報
	 */
   addTarget(rangeName){
		this.#targetRanges.push(rangeName);
	}

	/** マス目が移動先情報を持っているか判定
	 * @param {string} rangeName - 移動先情報
	 * @returns {boolean}
	 */
	hasTarget(rangeName){
		return this.#targetRanges.includes(rangeName);
	}

	/** 属性の存在を確認
	 * @param {string} attrName - 属性名
	 * @returns {boolean}
	 */
	hasAttr(attrName){
		return this.attr.includes(attrName);
	}
	/** 座標がマス目に含まれるか判定
	 * @param {number} x - X座標
	 * @param {number} y - Y座標
	 */
	checkRangeMouse(x, y){
		return (
			this.left <= x && x < this.right &&
			this.top <= y && y < this.bottom
		);
	}

	/** マス目/マスク/駒を描写 */
	draw(){
		const {selectColor, targetColor} = this;

		if(this.imgSrc && canvasImage.imported)
			this.drawImage();
		else
			this.drawPanel();
		if(this.isSelected) this.drawMask(selectColor);
		if(this.isTarget) this.drawMask(targetColor);
		this.piece?.draw();
	}

	/** マス目画像を描写 */
	drawImage(){
		const {ctx} = this;

		const src = this.imgSrc;
		const image = canvasImage.images[src];
		if(!image) return;

		ctx.save();
		ctx.translate(this.left, this.top);
		ctx.drawImage(image, 0, 0, this.width, this.height);
		ctx.restore();
	}

	/** マス目を描写 */
	drawPanel(){
		const {ctx, left, top, center, middle, width, height, displayText, textRotate} = this;

		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;

		ctx.save();
		ctx.translate(left, top);
		ctx.fillRect(0, 0, width, height);
		// 交点を描写
		if(this.intersect){
			ctx.lineWidth = this.borderWidth;
			ctx.beginPath();
			ctx.moveTo(width/2, 0);
			ctx.lineTo(width/2, height);
			ctx.moveTo(0, height/2);
			ctx.lineTo(width, height/2);
			ctx.closePath();
			ctx.stroke();
		}
		// マス目を描写
		else{
			ctx.strokeRect(0, 0, width, height);
		}

		// 斜線を描写
		ctx.lineWidth = this.borderWidth/2;
		ctx.beginPath();
		if(this.borderSlashLeft){
			ctx.moveTo(0, 0);
			ctx.lineTo(width, height);
		}
		if(this.borderSlashRight){
			ctx.moveTo(width, 0);
			ctx.lineTo(0, height);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		// 文字を描写
		if(displayText){
			ctx.save();
			ctx.translate(center, middle);
			ctx.fillStyle = this.borderColor;

			const rad = textRotate? textRotate*Math.PI/180: 0;
			ctx.rotate(rad);

			const fontSize = Math.min(this.width, this.height)*0.6;
			ctx.font = `${fontSize}px ${canvasFont.names}`;

			const width = ctx.measureText(displayText).width;
			const height = fontSize/2*0.8;
			ctx.fillText(displayText, -width/2, height);
			ctx.restore();
		}
	}

	/** マス目にマスクを描写
	 * @param {string} color - カラーエフェクトの色
	 */
	drawMask(color){
		const {ctx} = this;

		ctx.fillStyle = color;

		// マス目を描写
		ctx.fillRect(this.left, this.top, this.width, this.height);
	}

	/** マス目をテキスト形式で取得
	 * @param {boolean} isCompact - コンパクト表示
	 */
	toString(isCompact=false){
		return !isCompact?
			this.text:
			`｜${this.text.slice(-1).replace(/　/g, "・")}`;
	}
}
