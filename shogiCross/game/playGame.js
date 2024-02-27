import {Board, boards, gameSoft} from "../ShogiCross/lib.js";
import {boardTemplate} from "./boardTemplate.js"

const PlayGamesCustom = {
	default: {
		name: "--ゲームを選択--",
		playBoard: "クロス12x12",
		useStand: true,
		run(canvas, {onDrawed}){
			const {playBoard, useStand} = this;
			const pieceMap = [
				"▽城▽騏▽僧▽妃▽駈▽帝▽皇▽竜▽馬▽全▽圭▽杏",
				"▽戰▽杵▽橡▽巨▽舶▽柱▽公▽駁▽豪▽狂▽鈕▽鎭",
				"▽錆▽錨▽鋼▽鉐▽鰤▽漢▽將▽卉▽鷲▽鷂▽牛▽猪",
				"▽酔▽鹿▽鯨▽駒▽升▽桷▽黄▽堅▽ネ▽太▽う▽幾",
				"▽と▽貴▽往▽率▽に▽鴈▽雕▽左▽右▽さ▽含▽余",
				"▲歩▲兵▲卒▲卆▲貝▲央▲ひ▲燕▲仲▲石▲鉄▲猫",
				"▲山▲翅▲斗▲跳▲女▲瀧▲嗔▲丑▲狼▲銅▲麒▲猛",
				"▲舟▲鳳▲反▲横▲竪▲虎▲碼▲龍▲奔▲醉▲獅▲豕",
				"▲香▲桂▲銀▲金▲飛▲玉▲王▲駆▲后▲聖▲騎▲塔",
				"▲俥▲馮▲相▲仕▲炮▲帥▲楚▲包▲士▲象▲馭▲車",
				"▲船▲瑪▲根▲種▲角▲君▲主▲駮▲臣▲像▲午▲戦",
				"▲き▲京▲ね▲い▲ぞ▲ラ▲鵬▲鶉▲鷹▲鶴▲雉▲享"
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
		run: Board.run
	}
};

Object.keys(gameSoft).forEach(key=>{
	gameSoft[key].run = function(canvas, options){
		const xLen = boards[this.playBoard].field[0].length;
		return Board.run(canvas, {...options, ...this, ...boardTemplate(xLen)});
	};
})

export const PlayGames = {
	...PlayGamesCustom,
	...gameSoft
}
