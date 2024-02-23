import {Piece} from "./piece.js";
const degs = Object.keys(Piece.degChars);
const getInit = ()=>({
	panel: null,
	piece: null
});

export class EnPassant{
	constructor(){
		this.degs = {};
		degs.forEach(deg=>this.degs[deg] = getInit());
	}

	clear(piece){
		this.degs[piece.deg] = getInit();
	}

	setPanel(rangeKey, panel, piece){
		this.clear(piece);
		if(rangeKey === "start" && piece.hasAttr("enPassant")){
			this.degs[piece.deg].panel = panel;
		}
	}

	setPiece(toPanel){
		const {piece} = toPanel;
		const ep = this.degs[piece.deg];
		if(!piece || toPanel !== ep.panel) return;
		ep.piece = piece;
	}

	checkPanel(panel){
		const {piece} = panel;
		return !piece
			|| !piece.hasAttr("enPassant")
			|| piece === this.degs[piece.deg].piece;
	}
}
