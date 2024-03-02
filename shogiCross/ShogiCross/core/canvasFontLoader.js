import {canvasFont, panels, pieces} from "./json.js";
export {canvasFont};

/** 読み込み済みであるか? */
let imported = false;

/** 読み込む文字の一覧を取得
 * @returns {string}
 */
const getChars = () => [...
	new Set([...
		Object.values(panels).map(({displayText})=>displayText).join("")+
		Object.values(pieces).map(({display})=>display? display.join(""): "").join("")
	])
].sort().join("");

Object.assign(canvasFont, {
	/** 読み込むフォントの一覧(","区切り)
	 * @type {string}
	 */
	names: "",

	/** フォントの読み込み
	 * @returns {Promise<void>}
	 */
	async importAsync(){
		if(imported) return;
		const googleUrl = "https://fonts.googleapis.com/css2?family=";
		const chars = getChars();
		const unique = new Date().getTime().toString();
		this.names = canvasFont.fonts.map(o=>`"${o[0]}${unique}"`).join(",")+",serif";
		return Promise.all(
			canvasFont.fonts.map(async ([fontName, fontWeight])=>{
				const fontNamePlus = fontName.replace(/ /g, "+");
				const fontUrl = `${googleUrl}${fontNamePlus}:wght@${fontWeight}&text=${chars}`;
				const res = await fetch(fontUrl);
				if(!res.ok) return;
				const css = await res.text();
				const matchUrls = css.match(/url\(.+?\)/g);
				if(!matchUrls) throw new Error("Not found font.");

				for (const url of matchUrls) {
					const fontFace = new FontFace(`${fontName}${unique}`, url);
					await fontFace.load();
					document.fonts.add(fontFace);
				}
			})
		).then(_=>imported = true);
	}
});
