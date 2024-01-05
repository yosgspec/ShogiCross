
function importFonts(){
	return Promise.all(
		canvasFont.fonts.map(async ([fontName, fontWeight])=>{
			const googleUrl = "https://fonts.googleapis.com/css2?family="
			const fontNamePlus = fontName.replace(/ /g, "+");
			const fontFilter = encodeURIComponent(canvasFont.include);
			const fontUrl = `${googleUrl}${fontNamePlus}:wght@${fontWeight}&text=${fontFilter}`;
			const res = await fetch(fontUrl);
			if(!res.ok) return;
			const css = await res.text();
			const matchUrls = css.match(/url\(.+?\)/g);
			if(!matchUrls) throw new Error("フォントが見つかりませんでした");

			for (const url of matchUrls) {
				const fontFace = new FontFace(fontName, url);
				await fontFace.load();
				document.fonts.add(fontFace);
			}
		})
	);
}
