import {Board, boards} from "../core/board.js";
import {boardTemplate} from "./boardTemplate.js"

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
			board.inputPieces(pieceMap);
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	shogi: {
		name: "将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "将棋",
				...boardTemplate(9, 9, true)
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	chess: {
		name: "チェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チェス",
				...boardTemplate(8, 8)
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "チェス", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	xiangq: {
		name: "シャンチー",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "シャンチー",
				...boardTemplate(9, 10)
			});
			board.putStartPieces(0, "シャンチー");
			board.putStartPieces(1, "シャンチー", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	janggi: {
		name: "チャンギ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チャンギ",
				...boardTemplate(9, 10)
			});
			board.putStartPieces(0, "チャンギ");
			board.putStartPieces(1, "チャンギ", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	makruk: {
		name: "マークルック",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "マークルック",
				...boardTemplate(8, 8)
			});
			board.putStartPieces(0, "マークルック");
			board.putStartPieces(1, "マークルック", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	chaturanga: {
		name: "チャトランガ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チェス",
				...boardTemplate(8, 8)
			});
			board.putStartPieces(0, "チャトランガ");
			board.putStartPieces(1, "チャトランガ");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	dobutsuShogi: {
		name: "どうぶつしょうぎ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "どうぶつしょうぎ",
				...boardTemplate(3, 4, true)
			});
			board.putStartPieces(0, "どうぶつしょうぎ");
			board.putStartPieces(1, "どうぶつしょうぎ");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	asakuraShogi: {
		name: "朝倉象棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "将棋",
				...boardTemplate(9, 9, true)
			});
			board.putStartPieces(0, "将棋", "asakura");
			board.putStartPieces(1, "将棋", "asakura2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	kyoShogi: {
		name: "京将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "将棋10x10",
				...boardTemplate(10, 10, true)
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	e5Shogi: {
		name: "5五将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "将棋5x5",
				...boardTemplate(5, 5, true)
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	capablancaChess: {
		name: "カパブランカチェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チェス10x8",
				...boardTemplate(10, 8)
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "チェス", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	grandChess: {
		name: "グランドチェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チェス10x10",
				...boardTemplate(10, 10)
			});
			board.putStartPieces(0, "チェス", "grand");
			board.putStartPieces(1, "チェス", "grand2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	losAlamosChess: {
		name: "ロスアラモスチェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チェス6x6",
				...boardTemplate(6, 6)
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "チェス", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	chuShogi: {
		name: "中将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "古将棋12x12",
				...boardTemplate(12, 12)
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	daiShogi: {
		name: "大将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "古将棋15x15",
				...boardTemplate(15, 15)
			});
			board.putStartPieces(0, "将棋", "dai");
			board.putStartPieces(1, "将棋", "dai2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	shishiShogi: {
		name: "獅子将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "古将棋9x9",
				...boardTemplate(9, 9)
			});
			board.putStartPieces(0, "将棋", "shishi");
			board.putStartPieces(1, "将棋", "shishi2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	p4Shogi: {
		name: "四人将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "将棋",
				...boardTemplate(9, 9, true)
			}, 4);
			board.putStartPieces(0, "将棋", "p4");
			board.putStartPieces(1, "将棋", "p4");
			board.putStartPieces(2, "将棋", "p4");
			board.putStartPieces(3, "将棋", "p4");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	p4Chess: {
		name: "4人チェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "4人チェス",
				...boardTemplate(14, 14)
			}, 4);
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "チェス");
			board.putStartPieces(2, "チェス");
			board.putStartPieces(3, "チェス");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	g4Shogi: {
		name: "四神将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "四神将棋",
				...boardTemplate(15, 15, true)
			}, 4);
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋");
			board.putStartPieces(2, "将棋");
			board.putStartPieces(3, "将棋");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	chaturaji: {
		name: "チャトラジ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チェス",
				...boardTemplate(8, 8)
			}, 4);
			board.putStartPieces(0, "チャトランガ", "p4");
			board.putStartPieces(1, "チャトランガ", "p4");
			board.putStartPieces(2, "チャトランガ", "p4");
			board.putStartPieces(3, "チャトランガ", "p4");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	cross: {
		name: "【クロス】",
		run(canvas, onDrawed, {playBoard, useStand, playPieces}){
			const players = playPieces.some(({game}, i)=>1 < i && game)? 4: 2;
			const boardField = boards[playBoard].field;
			const xLen = boardField[0].length;
			const yLen = boardField.length;
			const board = new Board(canvas, {
				playBoard,
				...boardTemplate(xLen, yLen, useStand),
			}, players);
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
	}
};
