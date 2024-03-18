const base = './json/ShogiCross/';
function importJson(name) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", `${base}${name}.json`, false);
	xhr.send();
	if(xhr.status === 200)
		return JSON.parse(xhr.responseText);
	else
		return {};
}

export const json = {
	canvasFont: importJson("canvasFont"),
	gameSoft: importJson("gameSoft"),
	games: importJson("games"),
	boards: importJson("boards"),
	panels: importJson("panels"),
	pieces: importJson("pieces"),
	pieceRange: importJson("pieceRange"),
	pieceCost: importJson("pieceCost")
};
