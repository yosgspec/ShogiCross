(function(){
	const canvas = document.getElementById("crossChessBoard");
	canvas.width = 950;
	canvas.height = 950;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//ctx.fillStyle = "#EECC88";
	//ctx.fillRect(0, 0, canvas.width, canvas.height);

	/* 将棋駒を描写する */
	function board(xMax, yMax){
		const panel = panels["将棋"]
		ctx.lineWidth = 5;
		ctx.fillStyle = panel.backgroundColor;
		ctx.strokeStyle = panel.borderColor;
		const x0 = 60;
		const y0 = 60;
		const dx = 60;
		const dy = 70;
		ctx.translate(x0/2, y0/2);
		ctx.strokeRect(0, 0, x0+dx*xMax, y0+dy*yMax);
		ctx.fillRect(0, 0, x0+dx*xMax, y0+dy*yMax);
		ctx.translate(-x0/2, -y0/2);
		
		for(let x=0;x<xMax;x++){
			for(let y=0;y<yMax;y++){
				ctx.translate(x0+dx*x, y0+dy*y);
				ctx.strokeRect(0, 0, dx, dy);
				ctx.fillRect(0, 0, dx, dy);
				ctx.translate(-(x0+dx*x), -(y0+dy*y));
			}
		}

	}

	console.log(panels);
	const xMax = 9;
	const yMax = 9;
	board(xMax, yMax);
})();
