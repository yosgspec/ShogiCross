const getMime = (ext)=>
	"image/"+ext.replace("jpg", "jpeg");

/** キャンバスの画像を取得する
 * @param {HTMLCanvasElement}} canvas - Canvas要素
 * @param {string} fileName - 取得するファイル名(拡張子を除く)
 * @param {string} ext - 拡張子
 * @param {"base64"|"blob"} urlType - 生成URLタイプ
 * @returns {Promise<void>}
 */
export async function downloadImage(canvas, fileName="image", ext="png", urlType="base64"){
	const mime = getMime(ext);
	const a = document.createElement("a");
	let url;
	if(urlType === "blob")
		url = URL.createObjectURL(
			await new Promise(res=>canvas.toBlob(res), mime));
	else
		url = canvas.toDataURL(mime);
	a.href = url;
	a.download = `${fileName}.${ext}`;
	a.click();
	if(urlType === "blob") URL.revokeObjectURL(a.href);
}
