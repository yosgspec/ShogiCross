import canvasFont from "../json/canvasFont.json" assert {type: "json"};
import panels from "../json/panels.json" assert {type: "json"};
import pieces from "../json/pieces.json" assert {type: "json"};
export {canvasFont};

Object.assign(canvasFont, {
	imported: false,
	names: "",
	include: [...
		new Set([...
			Object.values(panels).map(({displayText})=>displayText).join("")+
			Object.values(pieces).map(({display})=>display.join("")).join("")
		])
	].sort().join(""),
	async importAsync(){
		if(this.imported) return;
		const id = new Date().getTime().toString();
		this.names = canvasFont.fonts.map(o=>`"${o[0]}${id}"`).join(",")+",serif";

		return Promise.all(
			canvasFont.fonts.map(async ([fontName, fontWeight])=>{
				const googleUrl = "https://fonts.googleapis.com/css2?family="
				const fontNamePlus = fontName.replace(/ /g, "+");
				const fontUrl = `${googleUrl}${fontNamePlus}:wght@${fontWeight}&text=${this.include}`;
				const res = await fetch(fontUrl);
				if(!res.ok) return;
				const css = await res.text();
				const matchUrls = css.match(/url\(.+?\)/g);
				if(!matchUrls) throw new Error("Not found font.");

				for (const url of matchUrls) {
					const fontFace = new FontFace(`${fontName}${id}`, url);
					await fontFace.load();
					document.fonts.add(fontFace);
				}
			})
		).then(_=>this.imported = true);
	}
});
