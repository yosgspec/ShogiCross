import {panels, pieces} from "./data.js";

/** 画像読み込み処理
 * @param {string} src - 画像パス
 * @returns Promise<Image>
 */
function loadImage(src){
	return new Promise(resolve=>{
		const image = new Image();
		image.src = src;
		image.onload = ()=>resolve(image);
	});
}

/** 読み込む画像パスの一覧
 * @type {string[]}
 */
const imgSrcs = [...new Set(
	Object.values(panels).flatMap(({imgSrc})=>imgSrc??[])
	.concat(Object.values(pieces).flatMap(({imgSrc})=>imgSrc??[]))
)];

/** Canvas用画像の管理 */
export const canvasImage = {
	/** 読み込み済みであるか? */
	imported: false,

	/** 読み込んだ画像データ
	 * @type {Object<string, Image>}
	 */
	images: {},

	/** 画像の読み込み
	 * @returns {Promise<void>}
	 */
	async importAsync(){
		if(this.imported) return;
		return Promise.all(
			imgSrcs.map(async src=>{
				this.images[src] = await loadImage(src);
			})
		).then(_=>this.imported = true)
	}
};

