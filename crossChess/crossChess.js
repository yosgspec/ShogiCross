(async function(){
	await canvasFont.import();
	const canvas = document.getElementById("crossChess");
	const txt = document.getElementById("crossChessText");
	const txtMini = document.getElementById("crossChessTextMini");

	function onDrowed(e){
		txt.value = e.outputText();
		const txtSplit = txt.value.split(/\n/);
		const fontSize = parseFloat(window.getComputedStyle(txt, null).getPropertyValue('font-size'));
		txt.style.width = fontSize*txtSplit[0].length*1.15;
		txt.style.height = fontSize*txtSplit.length*1.1;
		txtMini.value = e.outputText(true);
		const txtMiniSplit = txtMini.value.split(/\n/);
		txtMini.style.width = fontSize*txtMiniSplit[0].length*1.15;
		txtMini.style.height = fontSize*txtMiniSplit.length*1.1;
	}

	function sample(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function shogi(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function chess(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function xiangqi(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function janggi(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function makruk(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function dobutsuShogi(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function cross(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function player4x8(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	function player4x9(onDrowed){
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
		board.onDrawed = onDrowed;
		board.draw();
	}

	/* メイン処理 */
	(function(){
		//sample(onDrowed);
		//shogi(onDrowed);
		//chess(onDrowed);
		//xiangqi(onDrowed);
		//janggi(onDrowed);
		//makruk(onDrowed);
		//dobutsuShogi(onDrowed);
		//cross(onDrowed);
		//player4x8(onDrowed);
		player4x9(onDrowed);
	})();
})();
