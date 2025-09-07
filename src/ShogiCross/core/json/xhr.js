const base = "./json/ShogiCross/";
/** @typedef {import("../data.js").ShogiCrossData} ShogiCrossData */

/** JSONファイルを同期的にインポートします。
 * @param {string} name - JSONファイルの名前 (拡張子なし)
 * @returns {Object} インポートされたJSONデータ
 */
function importJson(name){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", `${base}${name}.json`, false);
	xhr.send();
	if(xhr.status === 200)
		return JSON.parse(xhr.responseText);
	else
		return {};
}

/** 読み込まれたJSONデータを含むオブジェクト
 * @type {ShogiCrossData}
 */
export const json = {
	canvasFont: importJson("canvasFont"),
	gameSoft: importJson("gameSoft"),
	games: importJson("games"),
	boards: importJson("boards"),
	panels: importJson("panels"),
	pieces: importJson("pieces"),
	pieceRange: importJson("pieceRange"),
	pieceCost: importJson("pieceCost"),
};
