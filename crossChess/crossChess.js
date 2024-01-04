(function(){
	const canvas = document.getElementById("crossChess");
	canvas.width = 800;
	canvas.height = 800;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#DDEEFF";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	function sample(){
		const pieceMap = [
			"歩・桂銀角香飛金玉",
			"と・圭全馬杏竜・・",
			"兵・騎聖・塔・后王",
			"妃騏・僧・城・・・",
			"卒・馮相・俥炮仕帥",
			"率・・・・・・・・",
			"卆・馭象・車包士楚",
			"・・・・・・・・・",
			"貝・瑪根・船・種君",
			"貴・・・・・・・・"
		];
		const size = 100;
		const x0 = 110;
		const y0 = 120;
		const dx = 110;
		const dy = 120;
		Piece.init(ctx, size);

		const board = new Board(ctx, "チェス象", x0, y0, dx, dy);
		board.draw();

		pieceMap.forEach((row, y)=>{
			[...row].forEach((pieceSymbol, x)=>{
				const piece = pieces[pieceSymbol];
				if(piece == null) return;
				piece.deg = piece.group === "成"? 180: 0;
				piece.draw(x0+dx*x, y0+dy*y);
				if(piece.group == "王"){
					piece.deg = 180;
					piece.draw(x0+dx*x, y0+dy*(y+1), 1);
				}
			});
		});
	}

	function main(){
		const size = 55;
		const x0 = 80;
		const y0 = 90;
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

		//sample();
		main();
	})();
})();
