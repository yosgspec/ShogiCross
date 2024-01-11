(async function(){
	await canvasFont.import();
	const canvas = document.getElementById("crossChess");
	const textareaMini = document.getElementById("crossChessTextMini");
	const textarea = document.getElementById("crossChessText");

	function sample(){
		boards["sample"] = {...boards["チェス"]}
		boards["sample"].field = [
			"WBW<#>SS",
			"BWB#*#SS",
			"WBW>#<SS",
			"MMMM==]=",
			"=[==MMMM",
			"SS<#>BWB",
			"SS#*#WBW",
			"SS>#<BWB"
		];
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
			canvasWidth: 720,
			canvasHeight: 800,
			playBoard: "sample",
			boardLeft: 0,
			boardTop: 0,
			panelWidth: 80,
			panelHeight: 90,
			pieceSize: 70
		});
		board.putStartPieces(0, "sample", "0");
		board.putStartPieces(1, "sample", "1");
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function shogi(){
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
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function chess(){
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
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function xiangqi(){
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
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function janggi(){
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
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function makruk(){
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
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function dobutsuShogi(){
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
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function cross(){
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
		board.putStartPieces(0, "将棋");
		board.putStartPieces(1, "チャンギ", "left");
		board.draw();

		textareaMini.value = board.outputText(true);
		textarea.value = board.outputText();
	}

	function player4x8(){
		const board = new Board(canvas, {
			canvasWidth: 750,
			canvasHeight: 750,
			playBoard: "4人用クロスx8",
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
		board.onDrawed = e=>{
			textareaMini.value = e.outputText(true);
			textarea.value = e.outputText();
		}
		board.draw();
	}

	function player4x9(){
		const board = new Board(canvas, {
			canvasWidth: 800,
			canvasHeight: 800,
			playBoard: "4人用クロスx9",
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
		board.onDrawed = e=>{
			textareaMini.value = e.outputText(true);
			textarea.value = e.outputText();
		}
		board.draw();
	}

	/* メイン処理 */
	(function(){
		//sample();
		//shogi();
		//chess();
		//xiangqi();
		//janggi();
		//makruk();
		//dobutsuShogi();
		cross();
		//player4x8();
		//player4x9();
	})();
})();
