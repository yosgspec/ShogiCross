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
	constructor(ctx, panel, center, middle, width, height, borderWidth, xCnt, yCnt){
		Object.assign(this, panel);
		this.ctx = ctx;
		this.center = center;
		this.middle = middle;
		this.width = width;
		this.height = height;
		this.left = center-width/2;
		this.top = middle-height/2;
		this.right = center+width/2;
		this.bottom = middle+height/2;
		this.borderWidth = borderWidth;
		this.xCnt = xCnt;
		this.yCnt = yCnt;
		this.piece = null;
		this.isSelected = false;
	}

	/** マス目の選択状態
	 * @param {boolean} value
	 */
	set isSelected(value){
		this.#isSelected = this.attr?.includes("keepOut")? false: value;
	}
	get isSelected(){
		return this.#isSelected;
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

	/** マス目を描写 */
	draw(){
		const {ctx, left, top, center, middle, width, height, textDisplay, textRotate} = this;

		ctx.fillStyle = this.backgroundColor;
		ctx.strokeStyle = this.borderColor;
		ctx.lineWidth = this.borderWidth;

		// マス目を描写
		ctx.save();
		ctx.translate(left, top);
		ctx.strokeRect(0, 0, width, height);
		ctx.fillRect(0, 0, width, height);

		// 斜線を描写
		ctx.lineWidth = this.borderWidth/2;
		ctx.beginPath();
		if(this.borderSlushLeft){
			ctx.moveTo(0, 0);
			ctx.lineTo(width, height);
		}
		if(this.borderSlushRight){
			ctx.moveTo(width, 0);
			ctx.lineTo(0, height);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		// 文字を描写
		if(textDisplay){
			ctx.save();
			ctx.translate(center, middle);
			ctx.fillStyle = this.borderColor;

			const rad = textRotate? textRotate*Math.PI/180: 0;
			ctx.rotate(rad);

			const fontSize = Math.min(this.width, this.height)*0.6;
			ctx.font = `${fontSize}px ${canvasFont.fontStr}`;

			const width = ctx.measureText(textDisplay).width;
			const height = fontSize/2*0.8;
			ctx.fillText(textDisplay, -width/2, height);
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

	/** 文字列形式で取得 
	 * @param {string} - 簡易表示
	 */
	toString(isMinimam=false){
		return !isMinimam?
			this.text:
			`｜${this.text.slice(-1).replace(/　/g, "・")}`;
	}
}
