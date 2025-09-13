import {canvasFont, panels, pieces} from "./data.js";
import {UIControl} from "./uiControl.js";
export {canvasFont};

const GOOGLE_FONT_URL = "https://fonts.googleapis.com/css2?family=";
const FONT_DIR = "./fonts";

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
	names: "serif",

	/** 識別値
	 * @type {string}
	 */
	unique: Date.now().toString(),

	/** フォント読み込み
	 * @returns {Promise<void>}
	 */
	loadFontFace(fontName, fontWeight, url){
		const fontFace = new FontFace(`${fontName}${this.unique}`, url, {
			weight: fontWeight,
		});
		document.fonts.add(fontFace);
		return fontFace.load().catch(_=>{});
	},

	/** ローカルフォントの読み込み
	 * @returns {Promise<void>}
	 */
	async loadLocalFont(){
		const localFontUrl = `${FONT_DIR}/${canvasFont.fonts[0][0].replace(/ /g, "")}.woff2`;
		const res = await fetch?.(localFontUrl, {method: "HEAD"});
		if(!res?.ok) return false;
		this.unique = "";
		await Promise.all(
			canvasFont.fonts.map(async ([fontName, fontWeight])=>{
				const url = `url("./fonts/${fontName.replace(/ /g, "")}.woff2")`;
				return this.loadFontFace(fontName, fontWeight, url);
			})
		);
		console.log("Loaded Local Fonts.");
		return true;
	},
	/** フォントの読み込み
	 * @param {boolean} isFull - 全テキスト読み込み
	 * @returns {Promise<void>}
	 */
	async importAsync(isFull=false){
		if(this.imported) return;
		if(!await this.loadLocalFont()){
			const fontText = isFull? "": `&text=${getChars()}`;
			await Promise.all(
				canvasFont.fonts.map(async ([fontName, fontWeight])=>{
					const fontNamePlus = fontName.replace(/ /g, "+");
					const fontUrl = `${GOOGLE_FONT_URL}${fontNamePlus}:wght@${fontWeight}${fontText}`;
					const res = await fetch(fontUrl);
					if(!res.ok) return;
					const css = await res.text();
					const matchUrls = css.match(/url\(.+?\)/g);
					if(!matchUrls) throw new Error("Not found font.");

					await Promise.all(matchUrls.map(url=>
						this.loadFontFace(fontName, fontWeight, url)
					));
				})
			)
			this.importAsync(true);

		}
		this.names = canvasFont.fonts.map(o=>`"${o[0]}${this.unique}"`).join(",")+",serif";
		this.imported = true;
	},
});
