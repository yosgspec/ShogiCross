/** CPUエンジンの管理クラス */
export class CpuEngine {
    /**
     * @param {Board} board - 対象のボード
     * @param {string} playerId - プレイヤーID
     * @param {string} engineName - エンジン名
     */
    constructor(board: Board, playerId: string, engineName: string);
    engine: any;
    /** 手番操作 */
    playTurn(): void;
}
import { Board } from "./board.js";
