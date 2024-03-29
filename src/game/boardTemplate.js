const template = {
	// backgroundColor: "#DDEEFF",
	moveMode: "free",
	usePlayerControl: false
}
const getPanelWidth = col=>({
	panelWidth:
		col < 5? 110:
		col < 7? 70:
		col < 13? 50:
		40
});

export function boardTemplate(col){
	return {
		...template,
		...getPanelWidth(col)
	};
}
