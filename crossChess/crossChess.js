(async function(){
	await canvasFont.import();

	function sample(){
		const canvas = document.getElementById("crossChess");
		canvas.width = 910;
		canvas.height = 910;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#DDEEFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	
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
		board.putStartPieces("sample", "0");
		board.rotateField90();
		//board.putStartPieces("sample", "1");
		board.draw();

		console.log(board.getString());
	}

	function main(){
		const canvas = document.getElementById("crossChess");
		canvas.width = 910;
		canvas.height = 910;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#DDEEFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	
		const size = 55;
		const x0 = 50;
		const y0 = 50;
		const dx = 60;
		const dy = 70;
		Piece.init(ctx, size);
		console.log(pieces);

		const board = new Board(ctx, "チェス", x0, y0, dx, dy);
		board.putStartPieces("将棋");
		board.rotateField();
		board.putStartPieces("チャンギ", "left");
		board.rotateField();
		board.draw();

		console.log(board.getString());
	}

	function player4(){
		const canvas = document.getElementById("crossChess");
		canvas.width = 910;
		canvas.height = 910;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = "#DDEEFF";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	
		const size = 55;
		const x0 = 0;
		const y0 = 0;
		const dx = 70;
		const dy = 70;
		Piece.init(ctx, size);
		console.log(Object.values(pieces).sort(v=>v.id));

		const board = new Board(ctx, "4人用", x0, y0, dx, dy);
		board.putStartPieces("将棋");
		board.rotateField(90);
		board.putStartPieces("シャンチー");
		board.rotateField(90);
		board.putStartPieces("チェス");
		board.rotateField(90);
		board.putStartPieces("マークルック");
		board.rotateField(90);
		board.draw();

		console.log(board.getString());
	}

	/* メイン処理 */
	(function(){
		//sample();
		//main();
		player4();

	})();
})();
