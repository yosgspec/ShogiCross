(function(){
	return;
	const canvas = document.getElementById("crossChess");
	canvas.width = 950;
	canvas.height = 950;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#EECC88";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	/* 将棋駒を描写する */
	function shogi(ctx, piece, no, x, y, zoom=1, deg=0){
		const game = games[piece.game];

		ctx.strokeStyle = "#777777";
		ctx.fillStyle   = game.backgroundColor;
		ctx.lineWidth = 5;
		ctx.translate(x,y);
		ctx.rotate(deg * Math.PI/180);

		/* 将棋駒を描写 */
		ctx.beginPath();
		ctx.moveTo(-30*zoom, -40*zoom);
		ctx.lineTo(  0*zoom, -50*zoom);
		ctx.lineTo( 30*zoom, -40*zoom);
		ctx.lineTo( 40*zoom,  50*zoom);
		ctx.lineTo(-40*zoom,  50*zoom);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		/* 文字を描写 */
		ctx.fillStyle = game.fontColor;
		const text = piece.display[no];
		const fontSize = 40*zoom;
		ctx.font = `${fontSize}px "Noto Serif CJK JP Black","Noto Emoji"`;

		Array.from(text).forEach((c,i)=>{
			const width = ctx.measureText(c).width;
			const height = text.length === 1 ? fontSize/2 : i*fontSize;
			ctx.fillText(c, -width/2, height);
		});

		/* 描写後処理 */
		ctx.translate(-x,-y);
		ctx.restore();
		ctx.save();
	}

	console.log(games);
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
	const zoom = 0.8;
	const x0 = 60;
	const y0 = 60;
	const dx = 75;
	const dy = 90;
 	for(let y=0;y<pieceMap.length;y+=2){
		for(let x=0;x<pieceMap[y].length;x++){
			const piece = pieces[pieceMap[y][x]];
			console.log(piece);
			if(piece == null) continue;
			shogi(ctx, piece, 0, x0+dx*x, y0+dy*y, zoom);
			if(piece.group == "王")
				shogi(ctx, piece, 1, x0+dx*(x+1), y0+dy*y, zoom);
			if(piece.promo == null) continue;
			const piecePromo = {...piece, ...piece.promo[pieceMap[y+1][x]]};
			if(piecePromo == null) continue;
			shogi(ctx, piecePromo, 0, x0+dx*x, y0+dy*(y+1), zoom, 180);
		}
	}
})();
