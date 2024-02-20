const template = {
	// backgroundColor: "#DDEEFF",
	freeMode: true
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
