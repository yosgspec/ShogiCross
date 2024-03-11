import {Panel} from "./panel.js";
import {Piece} from "./piece.js";

const degs = Object.keys(Piece.degChars);
const getInit = ()=>({
	panel: null,
	piece: null
});

/** アンパッサン情報の管理 */
export class EnPassant{
	constructor(){
		this.degs = {};
		degs.forEach(deg=>this.degs[deg] = getInit());
	}

	/** アンパッサン情報をクリア
	 * @param {number} deg - アンパッサンされうる陣営の角度
	 */
	clear(deg){
		this.degs[deg] = getInit();
	}

	/** アンパッサン対象と成りうるマス情報を記録
	 * @param {Panel} panel - アンパッサン対象と成りうるマス目
	 * @param {Piece} piece - アンパッサン対象と成りうる駒
	 */
	setTarget(panel, piece){
		if(panel.hasTarget("start") && piece.hasAttr("enPassant"))
			this.degs[piece.deg].panel = panel;
	}

	/** アンパッサン対象と成りうる駒情報を記録
	 * @param {Panel} toPanel - アンパッサン対象か確認するマス目
	 */
	setMoved(toPanel){
		const {piece} = toPanel;
		const ep = this.degs[piece.deg];
		if(piece && toPanel === ep.panel) ep.piece = piece;
		else this.clear(piece.deg);
	}

	/** アンパッサン対象のマスか確認する
	 * @param {Panel} panel - アンパッサン対象と成りうるマス目
	 * @param {Piece} piece - アンパッサン対象と成りうる駒
	 * @returns {boolean}
	 */
	isTarget(panel, piece){
		if(!panel || !panel.piece) return true;
		if(!panel.piece.hasAttr("enPassant")) return false;
		return panel.piece === this.degs[panel.piece.deg].piece;
	}
}
