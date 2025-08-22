/** @typedef {import("./panel.js").Panel} Panel */
import {Piece} from "./piece.js";

const degs = Object.keys(Piece.degChars);
const getInit = ()=>({pX: null, pY: null, pieceId: null});

/** アンパッサン情報の管理 */
export class EnPassant{
	constructor(){
		/** @type {Object<string, {pX: number, pY: number, pieceId: number}>} */
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
		if(panel.hasTarget("start") && piece.hasAttr("enPassant")){
			const state = this.degs[piece.deg];
			state.pX = panel.pX;
			state.pY = panel.pY;
		}
	}

	/** アンパッサン対象と成りうる駒情報を記録
	 * @param {Panel} toPanel - アンパッサン対象か確認するマス目
	 */
	setMoved(toPanel){
		const {piece, pX, pY} = toPanel;
		const ep = this.degs[piece.deg];
		if(piece && pX === ep.pX && pY === ep.pY) ep.pieceId = piece.id;
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
		return panel.piece.id === this.degs[panel.piece.deg].pieceId;
	}

	/**
	 * アンパッサンの状態をクローンします。
	 * @returns {this}
	 */
	clone() {
		const newEnPassant = new EnPassant();
		newEnPassant.degs = JSON.parse(JSON.stringify(this.degs));
		return newEnPassant;
	}
}
