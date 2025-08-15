/** 基底CPUエンジン(手動操作用) */
export class CpuEngineBase {
    /**
     * @param {Board} board - 対象のボード
     * @param {PlayerInfo} player - プレイヤー情報
     */
    constructor(board: Board, player: PlayerInfo);
    board: Board;
    player: import("./data").PlayerInfo;
    /** 手番操作 */
    playTurn(): void;
    /**
     * 盤面を評価します。
     * @returns {number} 盤面の評価値
     */
    evaluate(): number;
}
export namespace CpuEngines {
    export { Random as random };
    export { Greedy as greedy };
    export { Minimax as minimax };
}
/** CPUエンジンの管理クラス */
export class CpuEngine extends CpuEngineBase {
    engine: any;
}
export type PlayerInfo = import('./data').PlayerInfo;
import { Board } from "./board.js";
declare class Random extends CpuEngineBase {
    constructor(board: any, player: any);
}
declare class Greedy extends CpuEngineBase {
    constructor(board: any, player: any);
}
declare class Minimax extends CpuEngineBase {
    constructor(board: any, player: any);
    searchDepth: number;
    /**
     * ミニマックス法（アルファベータ枝刈り付き）を実行します。
     * @param {Board} board - 現在の盤面
     * @param {number} depth - 残りの探索深さ
     * @param {number} alpha - アルファ値
     * @param {number} beta - ベータ値
     * @param {boolean} isMaximizingPlayer - 現在のプレイヤーが最大化プレイヤーかどうか
     * @returns {number} 評価値
     */
    minimax(board: Board, depth: number, alpha: number, beta: number, isMaximizingPlayer: boolean): number;
}
export {};
