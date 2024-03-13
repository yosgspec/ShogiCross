/** BOD形式のための関数定義など */
export class Bod {
    /** 角度から駒の文字表示
     * @type {Map<number, string>}
     */
    static "__#6@#deg2PieceChars": Map<number, string>;
    /** 角度から駒の正規表現表示
     * @type {Map<number, string>}
     */
    static "__#6@#deg2PieceRegexes": Map<number, string>;
    /** 駒の文字から角度表示
     * @type {Map<string, number>}
     */
    static "__#6@#pieceChar2Degs": Map<string, number>;
    /** 角度から持駒の表題表示
     * @type {Map<number, string>}
     */
    static "__#6@#deg2StandTitles": Map<number, string>;
    /** 持駒の表題から角度表示
     * @type {Map<string, number>}
     */
    static "__#6@#standTitle2Degs": Map<string, number>;
    static "__#6@#kanI": string[];
    static "__#6@#kanX": string[];
    /** 行/持駒用の数字表示(漢数字)
     * @param {number} num - 数字
     * @param {boolean} viewOne - 一を表示
     * @returns {string}
     */
    static "__#6@#num2Kan"(num: number, viewOne?: boolean): string;
    /** 行/持駒用の数字表示(漢数字)
     * @param {number} num - 数字
     * @param {boolean} emptyOne - 空文字を1とする
     * @returns {string}
     */
    static "__#6@#kan2Num"(kan: any, emptyOne?: boolean): string;
    /** 列用の数字表示(全角/2桁)
     * @param {number} num - 数字
     * @returns {string}
     */
    static "__#6@#num2Zen"(num: number): string;
    /** マス目の表示
     * @type {string}
     */
    static "__#6@#panelText": string;
    /** 駒のBOD表記
     * @param {Piece} piece - 駒
     * @returns {string}
     */
    static "__#6@#getPieceText"(piece: Piece): string;
    /** 駒台のBOD表記
     * @param {Stand} stand - 駒台
     * @param {number} deg - 角度
     * @returns {string}
     */
    static "__#6@#getStandText"(stand: Stand, deg?: number): string;
    /** BOD形式のテキストをボードで扱えるよう変換
     * @param {string} text - BOD形式のテキスト
     * @returns {string}
     */
    static convSetText(text: string): string;
    /** BOD形式テキストを取得
     * @returns {string}
     */
    static getText(board: any): string;
}
import { Piece } from "./piece.js";
