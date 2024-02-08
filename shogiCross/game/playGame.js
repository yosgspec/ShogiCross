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
	const boardField = boards[playBoard].field;
	const xLen = boardField[0].length;
	const yLen = boardField.length;
	const board = new Board(canvas, {
		playBoard,
		...boardTemplate(xLen, yLen, useStand),
	}, players);
	canvasFont.import().then(()=>board.draw());
	playPieces.forEach(({game, other}, i)=>{
		if(!game || !other) return;
		try{
			board.putStartPieces(i, game, other);
		}
		catch{}
	});
	board.onDrawed = onDrawed;
	board.draw();
	return board;
}

export const PlayGame = {
	default: {
		name: "--ゲームを選択--",
		run(canvas, onDrawed){
			const pieceMap = [
				"▽う▽幾▽皇▽帝▽將▽漢▽公▽太▽狂▽鈕▽鎭",
				"▽竜▽馬▽柱▽巨▽豪▽戰▽舶▽橡▽杵▽全▽圭",
				"▽杏▽錆▽錨▽鋼▽鉐▽鰤▽卉▽鷲▽鷹▽牛▽猪",
				"▽酔▽に▽貴▽率▽鹿▽鯨▽駒▽升▽桷▽黄▽堅",
				"▲歩▲兵▲卒▲卆▽駈▽駁▽城▽僧▽騏▽妃▽と",
				"▲瀧▲嗔▲丑▲狼▲貝▲央▲ひ▲仲▲石▲鉄▲猫",
				"▲京▲銅▲醉▲駮▲駆▲舟▲豕▲麒▲猛▲鳳▲反",
				"▲炮▲角▲横▲竪▲虎▲碼▲龍▲奔▲獅▲飛▲包",
				"▲船▲瑪▲根▲種▲君▲き▲主▲臣▲像▲午▲戦",
				"▲俥▲馮▲相▲仕▲帥▲ぞ▲楚▲士▲象▲馭▲車",
				"▲香▲桂▲玉▲金▲銀▲ラ▲王▲后▲聖▲騎▲塔"
			].join("\n");

			const board = new Board(canvas, {
				playBoard: "クロス11x11",
				...boardTemplate(11, 11, true)
			});
			canvasFont.import().then(()=>board.draw());
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
					{game: "チャトランガ", other: "default"}
				]
			});
		}
	},
	dobutsuShogi: {
		name: "どうぶつしょうぎ",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "どうぶつしょうぎ",
				playPieces: [
					{game: "どうぶつしょうぎ", other: "default"},
					{game: "どうぶつしょうぎ", other: "default"}
				]
			});
		}
	},
	asakuraShogi: {
		name: "朝倉象棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋",
				playPieces: [
					{game: "将棋", other: "朝倉象棋"},
					{game: "将棋", other: "朝倉象棋2p"}
				]
			});
		}
	},
	kyoShogi: {
		name: "京将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋10x10",
				playPieces: [
					{game: "将棋", other: "京将棋"},
					{game: "将棋", other: "京将棋2p"}
				]
			});
		}
	},
	e5Shogi: {
		name: "5五将棋",
		run(canvas, onDrawed){
			return run(canvas, onDrawed,{
				playBoard: "将棋5x5",
				playPieces: [
					{game: "将棋", other: "default"},
					{game: "将棋", other: "2p"}
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
