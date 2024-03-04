const base = './json/';
const importJson = async name=>await fetch(`${base}${name}.json`).then(res=>res.json())

export const canvasFont = await importJson("canvasFont");
export const gameSoft = await importJson("gameSoft");
export const games = await importJson("games");
export const boards = await importJson("boards");
export const panels = await importJson("panels");
export const pieces = await importJson("pieces");
export const pieceRange = await importJson("pieceRange");
export const pieceCost = await importJson("pieceCost");
