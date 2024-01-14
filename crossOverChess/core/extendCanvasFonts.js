Object.assign(canvasFont, {
	imported: false,
	names: "",
	async import(){
		if(this.imported) return;
		const id = new Date().getTime().toString();
		this.names = canvasFont.fonts.map(o=>`"${o[0]}${id}"`).join(",");

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
