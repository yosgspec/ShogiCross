const getMime = (ext)=>
	"image/"+ext.replace("jpg", "jpeg");

/** キャンバスの画像を取得する
 * @param {HTMLCanvasElement}} canvas - キャンバス
 * @param {string} fileName - 拡張子を除くファイル名
 * @param {string} ext - 拡張子
 * @returns {Promise<void>}
 */
export function downloadImage(canvas, fileName="image", ext="png"){
	return new Promise(resolve=>{
		canvas.toBlob(blob=>{
			const a = document.createElement("a");
			a.href = URL.createObjectURL(blob);
			a.download = `${fileName}.${ext}`;
			a.click();
	        URL.revokeObjectURL(a.href);
			return resolve();
    	}, getMime(ext))
	});
}