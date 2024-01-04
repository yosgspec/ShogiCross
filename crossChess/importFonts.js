
async function importFonts(){
	const googleUrl = "https://fonts.googleapis.com/css2?family=";
	const fonts = canvasFont.fonts.map(([fontName, fontWeight])=>
		`${fontName.replace(/ /g, "+")}:wght@${fontWeight}`
	).join("&");
	const fontFilter = encodeURIComponent(canvasFont.include);
	const fontUrl = `${googleUrl}${fonts}&text=${fontFilter}`;

	const res = await fetch(fontUrl);
	if(!res.ok) return;
	const css = await res.text();
	const matchUrls = css.match(/url\(.+?\)/g);
	if(!matchUrls) throw new Error("Not found font.");

	for (const url of matchUrls) {
		const fontFace = new FontFace(canvasFont.fontName, url);
		await fontFace.load();
		document.fonts.add(fontFace);
	}
}
