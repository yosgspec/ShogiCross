import {canvasFont} from "./core/extendCanvasFont.js";
import {Board} from "./core/board.js"
import {Piece} from "./core/piece.js"
import boards from "./json/boards.json" assert {type: "json"};
import games from "./json/games.json" assert {type: "json"};
export {
	canvasFont,
	Board,
	Piece,
	boards,
	games
};
