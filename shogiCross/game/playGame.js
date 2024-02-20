import {Board, boards} from "../ShogiCross/lib.js";
import {boardTemplate} from "./boardTemplate.js"

/** ゲームを実行する
 * @param {HTMLCanvasElement}} canvas
 * @param {string} playBoard - 使用するボード
 * @param {boolean} useStand - 駒台の使用有無
 * @param {{game: string, other: string}[]} playPieces - プレイヤー毎の駒情報
 * @param {(Board)=>void} onDrawed - 描写イベント
 * @returns Board
 */
function run({canvas, playBoard, useStand, playPieces, onDrawed}){
	const players = playPieces.some(({game}, i)=>1 < i && game)? 4: 2;
	const xLen = boards[playBoard].field[0].length;
	// ボードを生成
	const board = new Board(canvas, playBoard, {
		players,
		useStand,
		onDrawed,
		...boardTemplate(xLen)
	});
	// 駒を配置
	playPieces.forEach(({game, other}, i)=>{
		if(!game || !other) return;
		try{
			board.putStartPieces(i, game, other);
		}
		catch{}
	});
	// 描写イベントを設定
	board.onDrawed = onDrawed;
	return board;
}

export const PlayGames = {
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
	},
	shogi: {
		name: "将棋",
		playBoard: "将棋",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "default"},
			{game: "将棋", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	chess: {
		name: "チェス",
		playBoard: "チェス",
		useStand: false,
		playPieces: [
			{game: "チェス", other: "default"},
			{game: "チェス", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	xiangq: {
		name: "シャンチー",
		playBoard: "シャンチー",
		useStand: false,
		playPieces: [
			{game: "シャンチー", other: "default"},
			{game: "シャンチー", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	janggi: {
		name: "チャンギ",
		playBoard: "チャンギ",
		useStand: false,
		playPieces: [
			{game: "チャンギ", other: "default"},
			{game: "チャンギ", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	makruk: {
		name: "マークルック",
		playBoard: "マークルック",
		useStand: false,
		playPieces: [
			{game: "マークルック", other: "default"},
			{game: "マークルック", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	chaturanga: {
		name: "チャトランガ",
		playBoard: "チェス",
		useStand: false,
		playPieces: [
			{game: "チャトランガ", other: "default"},
			{game: "チャトランガ", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	dobutsuShogi: {
		name: "どうぶつしょうぎ",
		playBoard: "どうぶつしょうぎ",
		useStand: true,
		playPieces: [
			{game: "どうぶつしょうぎ", other: "default"},
			{game: "どうぶつしょうぎ", other: "default"}
		],
		run(options){return run({...options, ...this})}
	},
	toriShogi: {
		name: "禽将棋",
		playBoard: "将棋7x7",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "禽将棋"},
			{game: "将棋", other: "禽将棋"}
		],
		run(options){return run({...options, ...this})}
	},
	chuShogi: {
		name: "中将棋",
		playBoard: "古将棋12x12",
		useStand: false,
		playPieces: [
			{game: "将棋", other: "中将棋"},
			{game: "将棋", other: "中将棋2p"}
		],
		run(options){return run({...options, ...this})}
	},
	asakuraShogi: {
		name: "朝倉象棋",
		playBoard: "将棋",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "朝倉象棋"},
			{game: "将棋", other: "朝倉象棋2p"}
		],
		run(options){return run({...options, ...this})}
	},
	kyoShogiLeft: {
		name: "京将棋(左京配置)",
		playBoard: "将棋10x10",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "京将棋(左京配置)"},
			{game: "将棋", other: "京将棋(左京配置)2p"}
		],
		run(options){return run({...options, ...this})}
	},
	kyoShogiRight: {
		name: "京将棋(右京配置)",
		playBoard: "将棋10x10",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "京将棋(右京配置)"},
			{game: "将棋", other: "京将棋(右京配置)2p"}
		],
		run(options){return run({...options, ...this})}
	},
	e5Shogi: {
		name: "5五将棋",
		playBoard: "将棋5x5",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "default"},
			{game: "将棋", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	crazyHouse: {
		name: "クレージーハウス",
		playBoard: "クレージーハウス",
		useStand: true,
		playPieces: [
			{game: "チェス", other: "default"},
			{game: "チェス", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	capablancaChess: {
		name: "カパブランカチェス",
		playBoard: "チェス10x8",
		useStand: false,
		playPieces: [
			{game: "チェス", other: "カパブランカチェス"},
			{game: "チェス", other: "カパブランカチェス2p"}
		],
		run(options){return run({...options, ...this})}
	},
	grandChess: {
		name: "グランドチェス",
		playBoard: "チェス10x10",
		useStand: false,
		playPieces: [
			{game: "チェス", other: "グランドチェス"},
			{game: "チェス", other: "グランドチェス2p"}
		],
		run(options){return run({...options, ...this})}
	},
	losAlamosChess: {
		name: "ロスアラモスチェス",
		playBoard: "チェス6x6",
		useStand: false,
		playPieces: [
			{game: "チェス", other: "default"},
			{game: "チェス", other: "2p"}
		],
		run(options){return run({...options, ...this})}
	},
	gorogoroDobutsuShogi: {
		name: "ごろごろどうぶつしょうぎ",
		playBoard: "ごろごろどうぶつしょうぎ",
		useStand: true,
		playPieces: [
			{game: "どうぶつしょうぎ", other: "default"},
			{game: "どうぶつしょうぎ", other: "default"}
		],
		run(options){return run({...options, ...this})}
	},
	daiShogi: {
		name: "大将棋",
		playBoard: "古将棋15x15",
		useStand: false,
		playPieces: [
			{game: "将棋", other: "大将棋"},
			{game: "将棋", other: "大将棋2p"}
		],
		run(options){return run({...options, ...this})}
	},
	shishiShogi: {
		name: "獅子将棋",
		playBoard: "古将棋9x9",
		useStand: false,
		playPieces: [
			{game: "将棋", other: "獅子将棋"},
			{game: "将棋", other: "獅子将棋2p"}
		],
		run(options){return run({...options, ...this})}
	},
	p4Shogi: {
		name: "四人将棋",
		playBoard: "将棋",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "p4"},
			{game: "将棋", other: "p4"},
			{game: "将棋", other: "p4"},
			{game: "将棋", other: "p4"}
		],
		run(options){return run({...options, ...this})}
	},
	p4Chess: {
		name: "4人チェス",
		playBoard: "4人チェス",
		useStand: false,
		playPieces: [
			{game: "チェス", other: "p4"},
			{game: "チェス", other: "p4"},
			{game: "チェス", other: "p4"},
			{game: "チェス", other: "p4"}
		],
		run(options){return run({...options, ...this})}
	},
	g4Shogi: {
		name: "四神将棋",
		playBoard: "四神将棋",
		useStand: true,
		playPieces: [
			{game: "将棋", other: "p4"},
			{game: "将棋", other: "p4"},
			{game: "将棋", other: "p4"},
			{game: "将棋", other: "p4"}
		],
		run(options){return run({...options, ...this})}
	},
	chaturaji: {
		name: "チャトラジ",
		playBoard: "チェス",
		useStand: false,
		playPieces: [
			{game: "チャトランガ", other: "p4"},
			{game: "チャトランガ", other: "p4"},
			{game: "チャトランガ", other: "p4"},
			{game: "チャトランガ", other: "p4"}
		],
		run(options){return run({...options, ...this})}
	}
};
