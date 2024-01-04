(function(){
	const canvas = document.getElementById("crossChess");
	canvas.width = 1100;
	canvas.height = 1300;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#DDEEFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	function sample(){
		boards["sample"] = {...boards["チェス"],...{
			"field": [
				"WBWBWBWBW",
				"BWBWBWBWB",
				"WBWBWBWBW",
				"BWBWBWBWB",
				"WBWBWBWBW",
				"BWBWBWBWB",
				"WBWBWBWBW",
				"BWBWBWBWB",
				"WBWBWBWBW",
				"BWBWBWBWB"
			]
		}};

		const pieceMap = [
			"歩・桂銀角香飛金玉",
			"と・圭全馬杏竜・皇",
			"兵・騎聖・塔・后王",
			"妃騏・僧・城・・帝",
			"卒・馮相・俥炮仕帥",
			"率・・・・・・・將",
			"卆・馭象・車包士楚",
			"・・・・・・・・漢",
			"貝・瑪根・船・種君",
			"貴・・・・・・・公"
		];
		games["sample"] = {};
		games["sample"].position ={}
		games["sample"].position[9] ={}
		for(let i=0;i<2;i++){
			games["sample"].position[9][i] = pieceMap.map(
				(row, i) => i%2 == 0? row: "・".repeat(row.length)
			);
		}
		const size = 100;
		const x0 = 0;
		const y0 = 0;
		const dx = 110;
		const dy = 120;
		Piece.init(ctx, size);

		const board = new Board(ctx, "sample", x0, y0, dx, dy);
		board.putPieces("sample", "0");
		board.roteteField();
		board.putPieces("sample", "1");
		board.roteteField();
		board.draw();
	}

	function main(){
		const size = 55;
		const x0 = 50;
		const y0 = 50;
		const dx = 60;
		const dy = 70;
		Piece.init(ctx, size);
		console.log(pieces);

		const board = new Board(ctx, "チェス", x0, y0, dx, dy);
		board.putPieces("将棋");
		board.roteteField();
		board.putPieces("チャンギ", "left");
		board.roteteField();
		board.draw();
	}

	/* メイン処理 */
	(function(){

		sample();
		//main();
	})();
})();
