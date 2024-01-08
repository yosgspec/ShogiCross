/** マウスコントロール
 * @param {Board} board - 盤 
 */ 
function mouseControl(board){
	let selectPanel;
	let isClick = false;
	let lastXY = [];

	// マス目に対する処理
	const fieldProc = (e, fn)=>{
		const rect = e.target.getBoundingClientRect();
		let x;
		let y;
		if(e.clientX){
			x = e.clientX-rect.left;
			y = e.clientY-rect.top;
		}
		else if(0 < e.touches.length){
			if(1 < e.touches.length) return;;
			e.preventDefault();
			x = e.touches[0].clientX-rect.left;
			y = e.touches[0].clientY-rect.top;
		}
		else{
			e.preventDefault();
			[x, y] = lastXY;
		}
		board.field.forEach(row=>
			row.forEach(panel=>
				fn(panel, x, y)));
				board.draw();
		lastXY = [x, y];
	};

	// ドラッグ開始
	const dragStart = e=>{
		isClick = true;
		fieldProc(e, (panel, toPanel, yCnt)=>{
			if(panel.piece && panel.checkRangeMouse(toPanel, yCnt)){
				panel.piece.isSelected = true;
				selectPanel = panel;
			}
		});
	};
	// ドラッグ中
	const dragMove = e=>{
		if(!isClick || !selectPanel) return;
		fieldProc(e, (panel, toPanel, yCnt)=>{
			panel.isSelected = panel.checkRangeMouse(toPanel, yCnt);
		});
	};

	// ドラッグ終了
	const dragEnd = e=>{
		isClick = false;
		fieldProc(e, (panel, xCnt, yCnt)=>{
			if(panel.checkRangeMouse(xCnt, yCnt)){
				board.movePiece(selectPanel, panel);
				selectPanel = null;
			}
		});
		fieldProc(e, panel=>{
			if(panel.piece) panel.piece.isSelected = false;
			panel.isSelected = false;
		});
	};

	board.canvas.addEventListener("mousedown", dragStart);
	board.canvas.addEventListener("mousemove", dragMove);
	board.canvas.addEventListener("mouseup", dragEnd);
	board.canvas.addEventListener("touchstart", dragStart);
	board.canvas.addEventListener("touchmove", dragMove);
	board.canvas.addEventListener("touchend", dragEnd);
}
