/** @typedef {import("./boardCore.js").BoardCore} Board */
import {Piece} from "./piece.js";
import {CpuEngine} from "./cpu.js";

/** プレイヤー情報 */
export class Player{
	/** @type {number} プレイヤーの角度 */
	deg;
	/** @type {string} プレイヤーを識別する角度文字 */
	degChar;
	/** @type {boolean} 生存状態 */
	alive;
	/** @type {CpuEngine} CPUエンジンのインスタンス */
	cpu;

	/** プレイヤー情報
	 * @param {Board} board - 盤面
	 * @param {number} id - プレイヤー番号
	 * @param {string} cpuEngine - CPUエンジン名
	 * @param {string} cpuDelay - CPU保証待機時間
	 */
	constructor(board, id, cpuEngine, cpuDelay){
		this.id = id;
		this.deg = board.degNormal(id);
		this.degChar = Piece.degChars[this.deg];
		this.alive = true;
		this.cpuEngine = cpuEngine;
		// CPUエンジンの初期化
		this.cpu = new CpuEngine(board, this);
  		this.cpuDelay = cpuDelay ?? 500;
	}
}