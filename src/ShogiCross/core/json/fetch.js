const base = './json/ShogiCross/';
async function importJson(name){
	return await fetch(`${base}${name}.json`)
		.then(async res=>{
			return await res.json()
		})
		.catch(()=>({}))}

export const json = {
	canvasFont: await importJson("canvasFont"),
	gameSoft: await importJson("gameSoft"),
	games: await importJson("games"),
	boards: await importJson("boards"),
	panels: await importJson("panels"),
	pieces: await importJson("pieces"),
	pieceRange: await importJson("pieceRange"),
	pieceCost: await importJson("pieceCost")
};
