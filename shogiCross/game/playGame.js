import {canvasFont, Board, boards} from "../ShogiCross/lib.js";
import {boardTemplate} from "./boardTemplate.js"

/** ゲームを実行する
 * @param {HTMLCanvasElement}} canvas
 * @param {(HTMLCanvasElement)=>void} onDrawed - 描写イベント
 * @param {string} playBoard - 使用するボード
 * @param {boolean} useStand - 駒台の使用有無
 * @param {{game: string, other: string}[]} playPieces - プレイヤー毎の駒情報
 * @returns Board
 */
function run(canvas, onDrawed, {playBoard, useStand, playPieces}){
	const players = playPieces.some(({game}, i)=>1 < i && game)? 4: 2;
	const xLen = boards[playBoard].field[0].length;
	// ボードを生成
	const board = new Board(canvas, {
		playBoard,
		players,
		useStand,
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
	// Canvasを描写
	board.draw();
	return board;
}

export const PlayGames = {
	default: {
		name: "--ゲームを選択--",
		run(canvas, onDrawed){
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

			const board = new Board(canvas, {
				playBoard: "クロス12x12",
				useStand: true,
				...boardTemplate(12)
			});
			board.inputPieces(pieceMap);
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	shogi: {
		name: "将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "default"},
					{game: "将棋", other: "2p"}
				]
			});
		}
	},
	chess: {
		name: "チェス",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チェス",
				playPieces: [
					{game: "チェス", other: "default"},
					{game: "チェス", other: "2p"}
				]
			});
		}
	},
	xiangq: {
		name: "シャンチー",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "シャンチー",
				playPieces: [
					{game: "シャンチー", other: "default"},
					{game: "シャンチー", other: "2p"}
				]
			});
		}
	},
	janggi: {
		name: "チャンギ",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チャンギ",
				playPieces: [
					{game: "チャンギ", other: "default"},
					{game: "チャンギ", other: "2p"}
				]
			});
		}
	},
	makruk: {
		name: "マークルック",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "マークルック",
				playPieces: [
					{game: "マークルック", other: "default"},
					{game: "マークルック", other: "2p"}
				]
			});
		}
	},
	chaturanga: {
		name: "チャトランガ",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チェス",
				playPieces: [
					{game: "チャトランガ", other: "default"},
					{game: "チャトランガ", other: "2p"}
				]
			});
		}
	},
	dobutsuShogi: {
		name: "どうぶつしょうぎ",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "どうぶつしょうぎ",
				useStand: true,
				playPieces: [
					{game: "どうぶつしょうぎ", other: "default"},
					{game: "どうぶつしょうぎ", other: "default"}
				]
			});
		}
	},
	toriShogi: {
		name: "禽将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋7x7",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "禽将棋"},
					{game: "将棋", other: "禽将棋"}
				]
			});
		}
	},
	asakuraShogi: {
		name: "朝倉象棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "朝倉象棋"},
					{game: "将棋", other: "朝倉象棋2p"}
				]
			});
		}
	},
	kyoShogiLeft: {
		name: "京将棋(左京配置)",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋10x10",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "京将棋左京配置"},
					{game: "将棋", other: "京将棋左京配置2p"}
				]
			});
		}
	},
	kyoShogiRight: {
		name: "京将棋(右京配置)",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋10x10",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "京将棋右京配置"},
					{game: "将棋", other: "京将棋右京配置2p"}
				]
			});
		}
	},
	e5Shogi: {
		name: "5五将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋5x5",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "default"},
					{game: "将棋", other: "2p"}
				]
			});
		}
	},
	crazyHouse: {
		name: "クレージーハウス",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "クレージーハウス",
				useStand: true,
				playPieces: [
					{game: "チェス", other: "default"},
					{game: "チェス", other: "2p"}
				]
			});
		}
	},
	capablancaChess: {
		name: "カパブランカチェス",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チェス10x8",
				playPieces: [
					{game: "チェス", other: "カパブランカチェス"},
					{game: "チェス", other: "カパブランカチェス2p"}
				]
			});
		}
	},
	grandChess: {
		name: "グランドチェス",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チェス10x10",
				playPieces: [
					{game: "チェス", other: "グランドチェス"},
					{game: "チェス", other: "グランドチェス2p"}
				]
			});
		}
	},
	losAlamosChess: {
		name: "ロスアラモスチェス",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チェス6x6",
				playPieces: [
					{game: "チェス", other: "default"},
					{game: "チェス", other: "2p"}
				]
			});
		}
	},
	gorogoroDobutsuShogi: {
		name: "ごろごろどうぶつしょうぎ",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "ごろごろどうぶつしょうぎ",
				useStand: true,
				playPieces: [
					{game: "どうぶつしょうぎ", other: "default"},
					{game: "どうぶつしょうぎ", other: "default"}
				]
			});
		}
	},

	chuShogi: {
		name: "中将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "古将棋12x12",
				playPieces: [
					{game: "将棋", other: "中将棋"},
					{game: "将棋", other: "中将棋2p"}
				]
			});
		}
	},
	daiShogi: {
		name: "大将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "古将棋15x15",
				playPieces: [
					{game: "将棋", other: "大将棋"},
					{game: "将棋", other: "大将棋2p"}
				]
			});
		}
	},
	shishiShogi: {
		name: "獅子将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "古将棋9x9",
				playPieces: [
					{game: "将棋", other: "獅子将棋"},
					{game: "将棋", other: "獅子将棋2p"}
				]
			});
		}
	},
	p4Shogi: {
		name: "四人将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "p4"},
					{game: "将棋", other: "p4"},
					{game: "将棋", other: "p4"},
					{game: "将棋", other: "p4"}
				]
			});
		}
	},
	p4Chess: {
		name: "4人チェス",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "4人チェス",
				playPieces: [
					{game: "チェス", other: "p4"},
					{game: "チェス", other: "p4"},
					{game: "チェス", other: "p4"},
					{game: "チェス", other: "p4"}
				]
			});
		}
	},
	g4Shogi: {
		name: "四神将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "四神将棋",
				useStand: true,
				playPieces: [
					{game: "将棋", other: "p4"},
					{game: "将棋", other: "p4"},
					{game: "将棋", other: "p4"},
					{game: "将棋", other: "p4"}
				]
			});
		}
	},
	chaturaji: {
		name: "チャトラジ",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "チェス",
				playPieces: [
					{game: "チャトランガ", other: "p4"},
					{game: "チャトランガ", other: "p4"},
					{game: "チャトランガ", other: "p4"},
					{game: "チャトランガ", other: "p4"}
				]
			});
		}
	},
	cross: {
		name: "【クロス】",
		run
	}
};
