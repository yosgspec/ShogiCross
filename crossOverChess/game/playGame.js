import {Board} from "../core/board.js";
import games from "../json/games.json" assert { type: "json" };
import { boardTemplate} from "./boardTemplate.js"

export const PlayGame = {
	sample: {
		name: "サンプル",
		run(canvas, onDrawed){
			const pieceMap = [
				[
					"・貝・君種根瑪船",
					"包卆・楚士象馭車",
					"炮卒・帥仕相馮俥",
					"・兵・王后聖騎塔",
					"飛歩角玉金銀桂香"
				],
				[
					"貴に率妃と僧騏城",
					"・馬ぞラひき竜・",
					"公漢將帝皇全圭杏"
				]
			];
			games["sample"] = {};
			games["sample"].position ={};
			for(const i of [8, 9]){
				games["sample"].position[i] = {...pieceMap};
			}

			const board = new Board(canvas, {
				playBoard: "クロス8x8",
				...boardTemplate(8, 8)
			});
			board.putStartPieces(0, "sample", "0");
			board.putStartPieces(1, "sample", "1");
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
	crossOver8: {
		name: "クロス8x8",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "クロス8x8",
				...boardTemplate(8, 8, true)
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "マークルック");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	crossOver9: {
		name: "クロス9x9",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "クロス9x9",
				...boardTemplate(9, 9, true)
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "チャンギ", "left");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	p4CrossOver8: {
		name: "4人用クロス8列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "4人用クロス8列",
				...boardTemplate(14, 14, true)
			}, 4);
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "シャンチー");
			board.putStartPieces(2, "チェス");
			board.putStartPieces(3, "マークルック");
			board.putNewPiece("士", 6, 6, 0);
			board.putNewPiece("車", 6, 5, 0);
			board.putNewPiece("卆", 7, 5, 0);
			board.putNewPiece("象", 7, 6, 1);
			board.putNewPiece("包", 8, 6, 1);
			board.putNewPiece("卆", 8, 7, 1);
			board.putNewPiece("馭", 8, 8, 1);
			board.putNewPiece("楚", 7, 7, 2);
			board.putNewPiece("車", 7, 8, 2);
			board.putNewPiece("卆", 6, 8, 2);
			board.putNewPiece("象", 6, 7, 3);
			board.putNewPiece("包", 5, 7, 3);
			board.putNewPiece("卆", 5, 6, 3);
			board.putNewPiece("馭", 5, 5, 3);
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	p4CrossOver9: {
		name: "4人用クロス9列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "4人用クロス9列",
				...boardTemplate(15, 15, true)
			}, 4);
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "シャンチー");
			board.putStartPieces(2, "チェス");
			board.putStartPieces(3, "マークルック");
			board.putNewPiece("卆", 5, 7, 3);
			board.putNewPiece("包", 5, 8, 2);
			board.putNewPiece("象", 6, 6, 3);
			board.putNewPiece("馭", 6, 7, 3);
			board.putNewPiece("士", 6, 8, 2);
			board.putNewPiece("卆", 7, 5, 0);
			board.putNewPiece("車", 7, 6, 0);
			board.putNewPiece("楚", 7, 7, 0);
			board.putNewPiece("卆", 7, 9, 2);
			board.putNewPiece("車", 7, 8, 2);
			board.putNewPiece("士", 8, 6, 0);
			board.putNewPiece("馭", 8, 7, 1);
			board.putNewPiece("象", 8, 8, 1);
			board.putNewPiece("包", 9, 6, 0);
			board.putNewPiece("卆", 9, 7, 1);
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	shogiVsChess: {
		name: "将棋VSチェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "将棋",
				...boardTemplate(9, 9, true)
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "チェス");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
};
