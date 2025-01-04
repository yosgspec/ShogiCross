import {Board, boards, gameSoft} from "../ShogiCross/lib.js";
import {boardTemplate} from "./boardTemplate.js"

const PlayGamesTop = {
	default: {
		name: "--ゲームを選択--",
		playBoard: "クロス14x14",
		useStand: true,
		run(canvas, {onDrawed}){
			const {playBoard, useStand} = this;
			const pieceMap = [
				"▽ネ▽い▽ね▽ラ▽き▽ぞ▽ひ▽豪▽舶▽往▽巨▽戰▽橡▽杵",
				"▽豕▽舟▽柱▽主▽臣▽戦▽像▽午▽央▽貴▽君▽種▽船▽根",
				"▽瑪▽貝▽漢▽楚▽士▽車▽象▽馭▽包▽卆▽率▽將▽帥▽仕",
				"▽俥▽炮▽相▽馮▽卒▽童▽妾▽砦▽賢▽佯▽使▽射▽鋲▽鵺",
				"▽塞▽齶▽麋▽遲▽篩▽鴻▽鰐▽師▽犀▽麟▽梹▽駈▽駁▽駆",
				"▽駮▽城▽僧▽騏▽妃▽帝▽王▽后▽塔▽聖▽騎▽兵▲歩▲香",
				"▲桂▲銀▲金▲角▲飛▲玉▲皇▲と▲杏▲圭▲全▲馬▲龍▲京",
				"▲銅▲山▲翅▲斗▲跳▲女▲幾▲う▲さ▲含▲余▲仲▲反▲横",
				"▲竪▲艮▲釡▲猛▲馨▲虎▲碼▲竜▲醉▲麒▲鳳▲奔▲獅▲酔",
				"▲鯨▲猪▲牛▲黄▲堅▲升▲桷▲駒▲鹿▲鷂▲鷲▲太▲鰤▲卉",
				"▲石▲鉄▲猫▲瀧▲嗔▲丑▲狼▲鉐▲鋼▲錨▲錆▲鎭▲鈕▲狂",
				"▲燕▲雉▲鶴▲鶉▲享▲鷹▲鵬▲鴈▲左▲右▲雕▲雀▲烏▲鴟",
				"▲鶏▲犬▲麁▲鷙▲犇▲風▲羽▲兎▲猿▲鳫▲狽▲狐▲雲▲霍",
				"▲錐▲鳶▲曇▲延▲狛▲豬▲鷄▲前▲騰▲行▲瓜▲麈▲羽▲熊"
			].join("\n");

			const board = Board.run(canvas, {
				playBoard,
				useStand,
				...boardTemplate(14)
			});
			board.setTextPieces(pieceMap);
			board.onDrawed = onDrawed;
			return board;
		}
	},
	cross: {
		name: "*クロスゲーム*",
		run: Board.run
	}
};
const PlayGamesBottom = {};

Object.keys(gameSoft).forEach(key=>{
	gameSoft[key].run = function(canvas, option){
		const xLen = boards[this.playBoard].field[0].length;
		return Board.run(canvas, {...option, ...this, ...boardTemplate(xLen)});
	};
})

export const PlayGames = {
	...PlayGamesTop,
	...gameSoft,
	...PlayGamesBottom
}
