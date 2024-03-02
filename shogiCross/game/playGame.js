import {Board, boards, gameSoft} from "../ShogiCross/lib.js";
import {boardTemplate} from "./boardTemplate.js"

const PlayGamesCustom = {
	default: {
		name: "--ゲームを選択--",
		playBoard: "クロス13x13",
		useStand: true,
		run(canvas, {onDrawed}){
			const {playBoard, useStand} = this;
			const pieceMap = [
				"▽狂▽鈕▽鎭▽錆▽錨▽鋼▽鉐▽鰤▽卉▽鷲▽鷂▽牛▽猪",
				"▽酔▽鹿▽鯨▽駒▽升▽桷▽黄▽堅▽ネ▽豪▽舶▽鵺▽塞",
				"▽齶▽篩▽遲▽麋▽駈▽駁▽余▽含▽太▽さ▽う▽幾▽雕",
				"▽右▽左▽鴈▽に▽往▽巨▽戰▽橡▽杵▽貴▽率▽城▽僧",
				"▽騏▽妃▽竜▽馬▽全▽圭▽杏▽と▲歩▲桂▲銀▲角▲香",
				"▲飛▲金▲玉▲皇▲兵▲騎▲聖▲塔▲后▲王▲帝▲卒▲馮",
				"▲相▲炮▲俥▲仕▲帥▲將▲卆▲包▲馭▲象▲車▲士▲楚",
				"▲漢▲貝▲瑪▲根▲船▲種▲君▲公▲央▲午▲像▲戦▲臣",
				"▲主▲柱▲ひ▲ぞ▲き▲ラ▲燕▲雉▲鶴▲鶉▲享▲鷹▲鵬",
				"▲京▲銅▲山▲翅▲斗▲醉▲跳▲返▲女▲浜▲丘▲駮▲駆",
				"▲国▲國▲梹▲麟▲犀▲師▲鰐▲砦▲鴻▲呈▲逞▲舟▲豕",
				"▲ね▲い▲ら▲仲▲麒▲同▲艮▲猛▲鳳▲馨▲反▲横▲竪",
				"▲釡▲虎▲碼▲龍▲奔▲獅▲石▲鉄▲猫▲瀧▲嗔▲丑▲狼"
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
