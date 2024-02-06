const template = {
	// backgroundColor: "#DDEEFF",
	boardLeft: 5,
	boardTop: 5,
}
const panelSizes = col=>
	col < 5? {
		panelWidth: 110,
		panelHeight: 110,
		pieceSize: 90
	}:
	col < 7? {
		panelWidth: 70,
		panelHeight: 80,
		pieceSize: 60
	}:
	col < 13? {
		panelWidth: 50,
		panelHeight: 55,
		pieceSize: 45
	} :
	{
		panelWidth: 40,
		panelHeight: 40,
		pieceSize: 35
	};

export function boardTemplate(col, row, isStand=false){
	const tmp = {
		...template,
		...panelSizes(col)
	};
	tmp.canvasWidth = tmp.panelWidth*(col+1)*(isStand? 1.02*1.5: 1)+10;
	tmp.canvasHeight = tmp.panelHeight*(row+1)+10;
	return tmp;
}
