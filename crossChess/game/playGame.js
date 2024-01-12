const PlayGame = {
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
					"貴・率妃と僧騏城",
					"・馬・・・・竜・",
					"公漢將帝皇全圭杏"
				]
			];
			games["sample"] = {};
			games["sample"].position ={};
			for(const i of [8, 9]){
				games["sample"].position[i] = {...pieceMap}
			}

			const board = new Board(canvas, {
				canvasWidth: 540,
				canvasHeight: 620,
				playBoard: "クロス8列",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "sample", "0");
			board.putStartPieces(1, "sample", "1");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	shogi: {
		name: "将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 600,
				canvasHeight: 700,
				playBoard: "将棋",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	chess: {
		name: "チェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 540,
				canvasHeight: 620,
				playBoard: "チェス",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "チェス", "black");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	xiangq: {
		name: "シャンチー",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 600,
				canvasHeight: 770,
				playBoard: "シャンチー",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "シャンチー");
			board.putStartPieces(1, "シャンチー");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	janggi: {
		name: "チャンギ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 600,
				canvasHeight: 770,
				playBoard: "チャンギ",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "チャンギ");
			board.putStartPieces(1, "チャンギ");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	makruk: {
		name: "マークルック",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 540,
				canvasHeight: 620,
				playBoard: "マークルック",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "マークルック");
			board.putStartPieces(1, "マークルック");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	dobutsuShogi: {
		name: "どうぶつしょうぎ",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 640,
				canvasHeight: 800,
				playBoard: "どうぶつしょうぎ",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 160,
				panelHeight: 160,
				pieceSize: 130
			});
			board.putStartPieces(0, "どうぶつしょうぎ");
			board.putStartPieces(1, "どうぶつしょうぎ");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	p4Shogi: {
		name: "四人将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 600,
				canvasHeight: 700,
				playBoard: "将棋",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			}, 4);
			board.putStartPieces(0, "将棋", p4);
			board.putStartPieces(1, "将棋", p4);
			board.putStartPieces(2, "将棋", p4);
			board.putStartPieces(3, "将棋", p4);
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	p4Chess: {
		name: "4人チェス",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 750,
				canvasHeight: 750,
				playBoard: "4人チェス",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 50,
				panelHeight: 50,
				pieceSize: 40
			}, 4);
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "チェス");
			board.putStartPieces(2, "チェス");
			board.putStartPieces(3, "チェス");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	g4Shpgi: {
		name: "四神将棋",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 800,
				canvasHeight: 800,
				playBoard: "四神将棋",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 50,
				panelHeight: 50,
				pieceSize: 40
			}, 4);
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "将棋");
			board.putStartPieces(2, "将棋");
			board.putStartPieces(3, "将棋");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	crossOver8: {
		name: "クロス8列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 540,
				canvasHeight: 620,
				playBoard: "クロス8列",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "チェス");
			board.putStartPieces(1, "マークルック");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	crossOver9: {
		name: "クロス9列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 600,
				canvasHeight: 700,
				playBoard: "クロス9列",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 60,
				panelHeight: 70,
				pieceSize: 55
			});
			board.putStartPieces(0, "将棋");
			board.putStartPieces(1, "チャンギ", "left");
			board.onDrawed = onDrawed;
			board.draw();
		}
	},
	p4CrossOver8: {
		name: "4人用クロス8列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 750,
				canvasHeight: 750,
				playBoard: "4人用クロス8列",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 50,
				panelHeight: 50,
				pieceSize: 40
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
		}
	},
	p4CrossOver9: {
		name: "4人用クロス9列",
		run(canvas, onDrawed){
			const board = new Board(canvas, {
				canvasWidth: 800,
				canvasHeight: 800,
				playBoard: "4人用クロス9列",
				boardLeft: 0,
				boardTop: 0,
				panelWidth: 50,
				panelHeight: 50,
				pieceSize: 40
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
		}
	}
};
