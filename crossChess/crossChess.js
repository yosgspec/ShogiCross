(async function(){
	await canvasFont.import();
	const canvas = document.getElementById("crossChess");
	canvas.width = 720;
	canvas.height = 800;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#DDEEFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

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
			]/*
			[
				"▽城▽圭▽全▽皇▽帝▽將▽漢▽公",
				"｜・▽竜｜・｜・｜・｜・｜・▽馬",
				"▽城▽騏▽僧▽と▽妃▽率｜・▽貴",
				"｜・▲貝｜・▲君▲種▲根▲瑪▲船",
				"▲包▲卆｜・▲楚▲士▲象▲馭▲車",
				"▲炮▲卒｜・▲帥▲仕▲相▲馮▲俥",
				"｜・▲兵｜・▲王▲后▲聖▲騎▲塔",
				"▲飛▲歩▲角▲玉▲金▲銀▲桂▲香"
			]*/
		];
		games["sample"] = {};
		games["sample"].position ={}
		for(const i of [8, 9]){
			games["sample"].position[i] = {...pieceMap}
		}

		const size = 70;
		const x0 = 0;
		const y0 = 0;
		const dx = 80;
		const dy = 90;
		Piece.init(ctx, size);

		const board = new Board(ctx, "sample", x0, y0, dx, dy);
		board.putPieces("sample", "0");
		board.roteteField();
		board.putPieces("sample", "1");
		board.roteteField();
		board.draw();

		console.log(board.getString());
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
