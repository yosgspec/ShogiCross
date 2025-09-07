/** @typedef {import("./boardCore.js").BoardCore} Board */
/** @typedef {import("./panel.js").Panel} Panel */
import {Piece} from "./piece.js";
import {downloadText} from "./download.js";
/**
 * @typedef {Object} RecordInfo - 局面の記録
 * @prop {Object} from
 * @prop {number} from.pX - 移動元の列
 * @prop {number} from.pY - 移動元の行
 * @prop {Object} to
 * @prop {number} to.pX - 移動先の列
 * @prop {number} to.pY - 移動先の行
 * @prop {number} deg - 駒の角度
 * @prop {string} pieceChar - 駒の一文字表記
 * @prop {string} end - 棋譜表示の末尾に記載する文字
 * @prop {string} fieldText - 駒配置のテキスト
 * @prop {number[][]} fieldMoved - 駒の移動済み判定
 * @prop {string|null} comment - 棋譜コメント
 */

/** 棋譜クラス */
export class Record {
	#beforeTurn = 0;

	/**
	 * @param {Board} board
	 */
	constructor(board){
		this.board = board;
		this.turn = 0;
		this.records = [];
		this.add({inc: 0, end: "開始局面"});
	}


	/** 棋譜の最後を取得 */
	get last(){
		return this.records[this.turn];
	}

	/** 棋譜を追記
	 * @param {Object} option - オプション
	 * @param {Panel} option.fromPanel - 移動元のマス目
	 * @param {Panel} option.toPanel - 移動先のマス目
	 * @param {string} option.end - オプション=成|不成|打
	 * @param {number} option.inc - 手数の増分
	 */
	add(option={}){
		const {board, records} = this;
		const {fromPanel={}, toPanel={}, end="", inc=1} = option;
		const {piece={}} = toPanel;

		if(0 === (this.turn+=inc) && 0 < records.length) return;
		if(board.isHeadless) return;

		records[this.turn] = {
			moves: [{
				from: {
					pX: fromPanel.pX,
					pY: fromPanel.pY
				},
				to: {
					pX: toPanel.pX,
					pY: toPanel.pY,
				},
			}],
			deg: piece.deg,
			pieceChar: piece.char,
			end,
			fieldText: board.getTextPieces("compact", true),
			fieldMoved: board.field.map(row=>
				row.map(({piece})=>
					piece?.isMoved? 1: 0
				)
			),
		};
		if(0 < inc) records.splice(this.turn+1);
		// ターンが変わった
		if(this.#beforeTurn !== this.turn){
			this.#beforeTurn = this.turn;
			// ターンエンドイベント
			board.onTurnEnd?.(board, this.turn);
			// CPUのターンを進める
			setTimeout(()=>board.getActivePlayer().cpu.playTurn(), 0);
		}
	}

	/** 棋譜コメントを追記
	 * @param {string} comment - 棋譜コメント
	 * @param {number} shiftTurn - ずらす手数
	 */
	addComment(comment, shiftTurn=0){
		this.records[this.turn+shiftTurn].comment = comment;
	}

	/** 記録の参照手数を切り替える
	 * @param {number} inc - 切り替えたい手数の差分
	 */
	#shift(inc){
		const {board, records} = this;
		if(!records[this.turn+inc]) return;

		this.turn += inc;
		const {fieldText, fieldMoved} = records[this.turn];
		board.setTextPieces(fieldText);
		board.field.forEach((row, pY)=>
			row.forEach(({piece}, pX)=>{
				if(!piece) return;
				piece.isMoved = !!fieldMoved[pY][pX];
			})
		);
	}

	/** 記録の手を戻す */
	undo(){
		this.#shift(-1);
	}

	/** 記録の手を進める */
	redo(){
		this.#shift(1);
	}

	/** 記録の手を移動
	 * @param {number} turn - 手数
	 */
	jump(turn){
		this.turn = turn;
		this.#shift(0);
	}

	/** 局面の記録を文字列に変換
	 * @param {number} turn - 手数
	 * @param {boolean} isNumOnly - 座標を数字で表現
	 * @returns {string}
	 */
	getText(turn, isNumOnly=false){
		const {board} = this;
		const {moves, deg, pieceChar, end} = this.records[turn];
		if(moves[0].to.pX == null) return `${turn}: ${end}`;

		const getPX = ({pX})=>(board.xLen-pX).toString(isNumOnly? 10: 36);
		const getPY = ({pY})=>(pY+1).toString(isNumOnly? 10: 36);
		const numSep = isNumOnly? ",": "";
		return `${
			turn}: ${
			Piece.degChars[deg]}${
			moves.map(({from, to})=>`${
				getPX(to)}${
				numSep}${
				getPY(to)}${
				pieceChar}${
				end}${
				from.pX === undefined? "": ` (${
					getPX(from)}${
					numSep}${
					getPY(from)
				})`}`
			).join("")}`;
	}

	/** 表示用の棋譜を取得
	 * @param {boolean} isNumOnly - 座標を数字で表現
	 * @returns {string}
	 */
	getTextAll(isNumOnly=false){
		return [...Array(this.turn+1).keys()].map(i=>
			this.getText(i, isNumOnly)
		).join("\n");
	}

	/** 棋譜データを取得
	 * @param {boolean} isEncode - エンコード有無
	 * @returns {string}
	 */
	getJson(isEncode=true){
		const jsonRecord = JSON.stringify(this.records, null, "");
		return isEncode? encodeURI(jsonRecord): jsonRecord;
	}

	/** 棋譜データを入力
	 * @param {string} record - 棋譜データ
	 * @param {number} turn - 手数
	 */
	setJson(record, turn){
		this.records = JSON.parse(decodeURI(record));
		this.jump(turn ?? this.records.length-1);
	}

	/** 棋譜コメントを取得
	 * @param {number} shiftTurn - ずらす手数
	 * @returns {string}
	 */
	getComment(shiftTurn=0){
		return this.records[this.turn+shiftTurn] ?? "";
	}

	/** 棋譜をダウンロード
	 * @param {boolean} isNumOnly - 座標を数字で表現
	 */
	download(isNumOnly=false){
		downloadText(this.getTextAll(isNumOnly), "record");
	}
}
