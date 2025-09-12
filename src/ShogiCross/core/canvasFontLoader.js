import {canvasFont, panels, pieces} from "./data.js";
import {UIControl} from "./uiControl.js";
export {canvasFont};

/** 読み込む文字の一覧を取得
 * @returns {string}
 */
const getChars = ()=>[...
	new Set([...
		UIControl.buttonTexts+
		Object.values(panels).map(({displayText})=>displayText).join("")+
		Object.values(pieces).map(({display})=>display? display.join(""): "").join("")
	])
].sort().join("");

/** Canvas用フォント管理 */
Object.assign(canvasFont, {
	/** 読み込み済みであるか?
	 * @type {boolean}
	 */
	imported: false,

	/** 読み込むフォントの一覧(","区切り)
	 * @type {string}
	 */
	names: "",

	/** 識別値
	 * @type {string}
	 */
	unique: Date.now().toString(),

	async loadLocalFont(){
		const res = await fetch(new URL('./fonts.css', import.meta.url).href);
		if(!res.ok) return false;
		const cssText = await res.text();

		// <style> タグを動的に作成して追加
		const style = document.createElement("style");
		style.textContent = cssText;
		document.head.appendChild(style);

		// Canvas 用にフォント名だけセット
		this.names = "'ShogiCross',serif";
		this.imported = true;
		return true;
	},

	/** フォントの読み込み
	 * @param {boolean} isFull - 全テキスト読み込み
	 * @returns {Promise<void>}
	 */
	async importAsync(isFull=false){
		if(this.imported) return;
		if(await this.loadLocalFont()) return;
		return; /* 検証用にブロック、後で消す */
		const googleUrl = "https://fonts.googleapis.com/css2?family=";
		const chars = getChars();
		this.names = canvasFont.fonts.map(([name])=>`"${name}${this.unique}"`).join(",")+",serif";
		const fontText = isFull? "": `&text=${chars}`;
		return Promise.all(
			canvasFont.fonts.map(async ([fontName, fontWeight])=>{
				const fontNamePlus = fontName.replace(/ /g, "+");
				const fontUrl = `${googleUrl}${fontNamePlus}:wght@${fontWeight}${fontText}`;
				const res = await fetch(fontUrl);
				if(!res.ok) return;
				const css = await res.text();
				const matchUrls = css.match(/url\(.+?\)/g);
				if(!matchUrls) throw new Error("Not found font.");

				for(const url of matchUrls){
					const fontFace = new FontFace(`${fontName}${this.unique}`, url);
					document.fonts.add(fontFace);
					await fontFace.load().catch(()=>{});
				}
			})
		).then(_=>{
			this.importAsync(true);
			this.imported = true;
		});
	},
});
