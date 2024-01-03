(function(){
	const canvas = document.getElementById("crossChessBoard");
	canvas.width = 650;
	canvas.height = 750;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	console.log(panels);
	const xMax = 9;
	const yMax = 9;
	const board = new Board(ctx, "クロス", 50, 50, 60, 70);
	board.draw();
})();
