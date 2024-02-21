import {Board, boards, gameSoft} from "../ShogiCross/lib.js";
import {boardTemplate} from "./boardTemplate.js"

/** ゲームを実行する
 * @param {HTMLCanvasElement}} canvas
 * @param {string} playBoard - 使用するボード
 * @param {boolean} useStand - 駒台の使用有無
 * @param {{gameName: string, pieceSet: string}[]} playPieces - プレイヤー毎の駒情報
 * @param {(Board)=>void} onDrawed - 描写イベント
 * @returns Board
 */
function run({canvas, playBoard, useStand, playPieces, onDrawed}){
	const players = playPieces.some(({gameName}, i)=>1 < i && gameName)? 4: 2;
	const xLen = boards[playBoard].field[0].length;
	// ボードを生成
	const board = new Board(canvas, playBoard, {
		players,
		useStand,
		onDrawed,
		...boardTemplate(xLen)
	});
	// 駒を配置
	playPieces.forEach(({gameName, pieceSet}, i)=>{
		if(!gameName || !pieceSet) return;
		try{
			board.putStartPieces(i, gameName, pieceSet);
		}
		catch{}
	});
	// 描写イベントを設定
	board.onDrawed = onDrawed;
	return board;
}

const PlayGamesCustom = {
	default: {
		name: "--ゲームを選択--",
		playBoard: "クロス12x12",
		useStand: true,
		run({canvas, onDrawed}){
			const {playBoard, useStand} = this;
			const pieceMap = [
				"▽城▽騏▽僧▽妃▽駈▽帝▽皇▽竜▽馬▽全▽圭▽杏",
				"▽戰▽杵▽橡▽巨▽舶▽柱▽公▽駁▽豪▽狂▽鈕▽鎭",
				"▽錆▽錨▽鋼▽鉐▽鰤▽漢▽將▽卉▽鷲▽鷹▽牛▽猪",
				"▽酔▽鹿▽鯨▽駒▽升▽桷▽黄▽堅▽ネ▽太▽う▽幾",
				"｜・｜・｜・▽と▽貴▽往▽率▽に▽鴈▽雕▽左▽右",
				"▲歩▲兵▲卒▲卆▲貝▲央▲ひ｜・｜・｜・｜・｜・",
				"▲瀧▲嗔▲丑▲狼▲銅▲麒▲猛▲燕▲仲▲石▲鉄▲猫",
				"▲舟▲鳳▲反▲横▲竪▲虎▲碼▲龍▲奔▲醉▲獅▲豕",
				"▲香▲桂▲銀▲金▲飛▲玉▲王▲駆▲后▲聖▲騎▲塔",
				"▲俥▲馮▲相▲仕▲炮▲帥▲楚▲包▲士▲象▲馭▲車",
				"▲船▲瑪▲根▲種▲角▲君▲主▲駮▲臣▲像▲午▲戦",
				"▲き▲京▲ね▲い▲ぞ▲ラ▲鵬▲鶉▲鷂▲鶴▲雉▲享"
			].join("\n");

			const board = new Board(canvas, playBoard, {
				useStand,
				...boardTemplate(12)
			});
			board.inputPieces(pieceMap);
			board.onDrawed = onDrawed;
			return board;
		}
	},
	cross: {
		name: "*クロスゲーム*",
		run
	}
};

Object.keys(gameSoft).forEach(key=>{
	gameSoft[key].run = function(options){
		return run({...options, ...this})
	};
})

export const PlayGames = {
	...PlayGamesCustom,
	...gameSoft
}
