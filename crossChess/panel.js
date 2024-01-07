// import canvasFont from "./json/canvasFont.json" assert { type: "json" };

/** マス目の管理クラス */
class Panel{
	#isSelected;

	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {{[s:string]:any}} panel - マス目
	 * @param {number} center - 描写するX座標(中心原点)
	 * @param {number} middle - 描写するY座標(中心原点)
	 * @param {number} width - パネル幅
	 * @param {number} height - パネル高さ
	 */
	constructor(ctx, panel, center, middle, width, height){
		Object.assign(this, panel);
		this.ctx = ctx;
		this.center = center;
		this.middle = middle;
		this.width = width;
		this.height = height;
		this.left = this.center-this.width/2;
		this.top = this.middle-this.height/2;
		this.right = this.center+this.width/2;
		this.bottom = this.middle+this.height/2;
		this.piece = null;
		this.isSelected = false;
	}

	/** マス目の選択状態
	 * @param {boolean} value
	 */
	set isSelected(value){
		this.#isSelected = this.attr.includes("keepOut")? false: value;
	}
	get isSelected(){
		return this.#isSelected;
	}

	/** マス目を描写
	 * @param {number} x - 描写するX座標(中心原点)
	 * @param {number} y - 描写するY座標(中心原点)
	 */
	draw(){
		const ctx = this.ctx;
		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;

		// マス目を描写
		ctx.save();
		ctx.translate(this.left, this.top);
		ctx.strokeRect(0, 0, this.width, this.height);
		ctx.fillRect(0, 0, this.width, this.height);

		// 斜線を描写
		ctx.beginPath();
		if(this.borderSlushLeft){
			ctx.moveTo(0, 0);
			ctx.lineTo(this.width, this.height);
		}
		if(this.borderSlushRight){
			ctx.moveTo(this.width, 0);
			ctx.lineTo(0, this.height);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		// 文字を描写
		if(this.textDisplay){
			ctx.save();
			ctx.translate(this.center, this.middle);
			ctx.fillStyle = this.borderColor;

			const rad = this.textRotate? this.textRotate*Math.PI/180: 0;
			ctx.rotate(rad);

			const fontSize = Math.min(this.width, this.height)*0.6;
			ctx.font = `${fontSize}px ${canvasFont.fontStr}`;

			const width = ctx.measureText(this.textDisplay).width;
			const height = fontSize/2*0.8;
			ctx.fillText(this.textDisplay, -width/2, height);
			ctx.restore();
		}
	}

	/** マス目にマスクを描写
	 * @param {string} color - カラーエフェクトの色
	 */
	drawMask(color){
		const ctx = this.ctx;
		ctx.fillStyle = color;

		// マス目を描写
		ctx.fillRect(this.left, this.top, this.width, this.height);
	}
}
