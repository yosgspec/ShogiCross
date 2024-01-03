(function(){
	const canvas = document.getElementById("crossChess");
	canvas.width = 800;
	canvas.height = 800;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#EECC88";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	/* メイン処理 */
	(function(){
		const pieceMap = [
			"歩・・・桂銀角香飛金玉",
			"と・・・圭全馬杏竜・・",
			"兵兵兵兵騎聖・塔・后王",
			"妃騏僧城・・・・・・・",
			"卒・・・馮相・俥炮仕帥",
			"率・・・・・・・・・・",
			"卆・・・馭象・車包士楚",
			"・・・・・・・・・・・",
			"貝・・・瑪根・船・種君",
			"貴・・・・・・・・・・"
		];
		const size = 55;
		const x0 = 80;
		const y0 = 90;
		const dx = 60;
		const dy = 70;

		const board = new Board(ctx, "クロス", x0, y0, dx, dy);
		board.draw();

		Piece.init(ctx, size);
		pieceMap.forEach((row, y)=>{
			[...row].forEach((pieceSymbol, x)=>{
				const piece = pieces[pieceSymbol];
				if(piece == null) return;
				const deg = piece.group === "成"? 180: 0;
				piece.draw(x0+dx*x, y0+dy*y, deg);
				if(piece.group == "王")
					piece.draw(x0+dx*(x+1), y0+dy*y, deg, 1);
			});
		});
	})();
})();
