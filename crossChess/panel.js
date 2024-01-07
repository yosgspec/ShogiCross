// import canvasFont from "./json/canvasFont.json" assert { type: "json" };

/** マス目の管理クラス */
class Panel{
	/**
	 * @param {any} ctx - Canvas描画コンテキスト
	 * @param {{[s:string]:any}} panel - マス目
	 * @param {number} xc - 描写するX座標(中心原点)
	 * @param {number} yc - 描写するY座標(中心原点)
	 * @param {number} dx - パネル幅
	 * @param {number} dy - パネル高さ
	 */
	constructor(ctx, panel, xc, yc, dx, dy){
		Object.assign(this, panel);
		this.ctx = ctx;
		this.xc = xc;
		this.yc = yc;
		this.dx = dx;
		this.dy = dy;
		this.piece = null;
		this.isEffect = true;
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
		ctx.translate(this.xc-this.dx/2, this.yc-this.dy/2);
		ctx.fillRect(0, 0, this.dx, this.dy);
		ctx.strokeRect(0, 0, this.dx, this.dy);

		// 斜線を描写
		ctx.beginPath();
		if(this.borderSlushLeft){
			ctx.moveTo(0, 0);
			ctx.lineTo(this.dx, this.dy);
		}
		if(this.borderSlushRight){
			ctx.moveTo(this.dx, 0);
			ctx.lineTo(0, this.dy);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		// 文字を描写
		if(this.textDisplay){
			ctx.save();
			ctx.translate(this.cx, this.cy);
			ctx.fillStyle = this.borderColor;

			const rad = this.textRotate? this.textRotate*Math.PI/180: 0;
			ctx.rotate(rad);

			const fontSize = Math.min(this.dx, this.dy)*0.6;
			ctx.font = `${fontSize}px ${canvasFont.fontStr}`;

			const width = ctx.measureText(this.textDisplay).width;
			const height = fontSize/2*0.8;
			ctx.fillText(this.textDisplay, -width/2, height);
			ctx.restore();
		}
	}
}
