const defaultTemplate = {
	boardLeft: 5,
	boardTop: 5,
	panelWidth: 50,
	panelHeight: 55,
	pieceSize: 45
	//backgroundColor: "#DDEEFF"
}
const laugeTemplate = {
	...defaultTemplate,
	panelWidth: 40,
	panelHeight: 40,
	pieceSize: 35
}
const boardTemplate = {
	"8x8": {
		...defaultTemplate,
		canvasWidth: 460,
		canvasHeight: 505
	},
	"8x8s": {
		...defaultTemplate,
		canvasWidth: 695,
		canvasHeight: 505
	},
	"9x9": {
		...defaultTemplate,
		canvasWidth: 510,
		canvasHeight: 560
	},
	"9x9s": {
		...defaultTemplate,
		canvasWidth: 770,
		canvasHeight: 560
	},
	"9x10": {
		...defaultTemplate,
		canvasWidth: 510,
		canvasHeight: 615
	},
	"3x4s": {
		...defaultTemplate,
		canvasWidth: 680,
		canvasHeight: 560,
		panelWidth: 110,
		panelHeight: 110,
		pieceSize: 90
	},
	"14x14": {
		...laugeTemplate,
		canvasWidth: 610,
		canvasHeight: 610
	},
	"14x14s": {
		...laugeTemplate,
		canvasWidth: 920,
		canvasHeight: 610
	},
	"15x15": {
		...laugeTemplate,
		canvasWidth: 650,
		canvasHeight: 650
	},
	"15x15s": {
		...laugeTemplate,
		canvasWidth: 980,
		canvasHeight: 650
	}
};

const PlayGame = {
	janggi: {
		name: "チャンギ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "チャンギ",
				...boardTemplate["9x10"]
			});
			board.putStartPieces(0, "チャンギ");
			board.putStartPieces(1, "チャンギ", "2p");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
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
				playBoard: "クロス8列",
				...boardTemplate["8x8s"]
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
				...boardTemplate["9x9s"]
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
				...boardTemplate["8x8"]
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
				...boardTemplate["9x10"]
			});
			board.putStartPieces(0, "シャンチー");
			board.putStartPieces(1, "シャンチー", "2p");
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
				...boardTemplate["8x8"]
			});
			board.putStartPieces(0, "マークルック");
			board.putStartPieces(1, "マークルック", "2p");
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
				...boardTemplate["3x4s"]
			});
			board.putStartPieces(0, "どうぶつしょうぎ");
			board.putStartPieces(1, "どうぶつしょうぎ");
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
				...boardTemplate["9x9s"]
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
				...boardTemplate["14x14"]
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
	g4Shpgi: {
		name: "四神将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "四神将棋",
				...boardTemplate["15x15s"]
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
	crossOver8: {
		name: "クロス8列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "クロス8列",
				...boardTemplate["8x8s"]
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "マークルック");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},
	crossOver9: {
		name: "クロス9列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				playBoard: "クロス9列",
				...boardTemplate["9x9s"]
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
				...boardTemplate["14x14s"]
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
				...boardTemplate["15x15s"]
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
				...boardTemplate["9x9s"]
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "チェス");
			board.onDrawed = onDrawed;
			board.draw();
			return board;
		}
	},

};
