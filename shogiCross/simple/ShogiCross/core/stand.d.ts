/** 盤の管理クラス */
export class Stand {
    /** 角度からstockの添字を取得
     * @type {Object<string, number>}
     */
    static degId: {
        [x: string]: number;
    };
    /**
     * @param {Board} ボード
     */
    constructor(board: any);
    board: any;
    left: number;
    top: any;
    width: number;
    height: any;
    right: number;
    bottom: any;
    pitchWidth: number;
    pitchHeight: any;
    xLen: any;
    yLen: any;
    /** 駒台を初期化にする */
    clear(): void;
    stocks: any[][];
    /** 持ち駒からボード上に配置する
     * @param {Panal} toPanell - 配置先のパネル
     * @param {Object} options - オプション
     * @param {number} options.deg - 角度
     * @param {number} options.i - 配置する持ち駒のインデックス
     */
    releasePiece(toPanel: any, options?: {
        deg: number;
        i: number;
    }): void;
    /** 駒台に追加する
     * @param {Piece} piece - 追加する駒
     */
    add(piece: Piece): void;
    /** 駒を持ち駒にする
     * @param {Piece|null} winnerPiece - 移動する駒
     * @param {Piece} loserPiece - 捕縛される駒
     * @param {boolean} forceCapture - 属性を無視して捕縛する
     * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
     */
    capturePiece(winnerPiece: Piece | null, loserPiece: Piece, forceCapture?: boolean, forceCantCapture?: boolean): void;
    /** 盤を描写 */
    draw(): void;
    /** BOD形式テキストを取得
     * @param {number} deg - 角度
     * @returns {string}
     */
    getBodText(deg?: number): string;
    /** 文字列形式で取得
     * @param {boolean} isMinimam - 簡易表示
     */
    toString(isMinimam?: boolean): string;
}
import { Piece } from "./piece.js";
