/** 駒の移動判定
 * @param {Board} board - ボード
 * @param {Piece} piece - 駒
 * @param {number} pX - マス目の列
 * @param {number} pY - マス目の行
 */
export function checkTarget(board: Board, piece: Piece, pX: number, pY: number): any[];
/**
 * 指定されたプレイヤーの王が王手されているかを確認します。
 * @param {Board} board - 盤面
 * @param {number} playerDeg - 確認するプレイヤーの角度
 * @returns {boolean} 王手されている場合はtrue、そうでない場合はfalse
 */
export function isKingInCheck(board: Board, playerDeg: number): boolean;
/**
 * 指定されたプレイヤーに合法手があるかを確認します。
 * @param {Board} board - 盤面
 * @param {number} playerDeg - 確認するプレイヤーの角度
 * @returns {boolean} 合法手がある場合はtrue、そうでない場合はfalse
 */
export function hasLegalMoves(board: Board, playerDeg: number): boolean;
/**
 * 指定されたプレイヤーが詰んでいるかを確認します。
 * @param {Board} board - 盤面
 * @param {number} playerDeg - 確認するプレイヤーの角度
 * @returns {boolean} 詰んでいる場合はtrue、そうでない場合はfalse
 */
export function isCheckmate(board: Board, playerDeg: number): boolean;
import { Board } from "./board.js";
import { Piece } from "./piece.js";
