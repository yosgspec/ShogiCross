import {canvasFont, panels, pieces} from "./data.js";
import {PlayerControl} from "./playerControl.js";
export {canvasFont};

/** 読み込む文字の一覧を取得
 * @returns {string}
 */
const getChars = () => [...
	new Set([...
		PlayerControl.buttonTexts+
		Object.values(panels).map(({displayText})=>displayText).join("")+
		Object.values(pieces).map(({display})=>display? display.join(""): "").join("")
	])
].sort().join("");

/** Canvas用フォント管理 */
Object.assign(canvasFont, {
	/** 読み込み済みであるか? */
	imported: false,

	/** 読み込むフォントの一覧(","区切り)
	 * @type {string}
	 */
	names: "",

	/** フォントの読み込み
	 * @returns {Promise<void>}
	 */
	async importAsync(){
		if(this.imported) return;
		const googleUrl = "https://fonts.googleapis.com/css2?family=";
		const chars = getChars();
		const unique = Date.now().toString();
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
					document.fonts.add(fontFace);
					await fontFace.load().catch(()=>{});
				}
			})
		).then(_=>this.imported = true);
	}
});
