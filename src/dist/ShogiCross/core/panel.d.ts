/** マス目の管理クラス */
export class Panel {
    /**
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {string} char - マス目を示す文字
     * @param {number} center - 描写するX座標(中心原点)
     * @param {number} middle - 描写するY座標(中心原点)
     * @param {number} width - マス目幅
     * @param {number} height - マス目高さ
     * @param {number} pX - ボード上のマス目の列
     * @param {number} pY - ボード上のマス目の行
     * @param {number} borderWidth - 枠線の太さ
     */
    constructor(ctx: any, char: string, center: number, middle: number, width: number, height: number, pX: number, pY: number, borderWidth: number);
    set piece(piece: Piece);
    /** 駒オブジェクト
     * @returns {Piece}
     */
    get piece(): Piece;
    ctx: any;
    center: number;
    middle: number;
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
    pX: number;
    pY: number;
    borderWidth: number;
    /** マス目の選択状態
     * @param {boolean} value
     */
    set isSelected(value: boolean);
    get isSelected(): boolean;
    /** マス目の移動可能判定
     * @param {boolean} value
     */
    get isTarget(): boolean;
    /** マス目の移動先情報をクリア */
    clearTarget(): void;
    /** マス目の移動先情報を追加
     * @param {string} rangeName - 移動先情報
     */
    addTarget(rangeName: string): void;
    /** マス目が移動先情報を持っているか判定
     * @param {string} rangeName - 移動先情報
     * @returns {boolean}
     */
    hasTarget(rangeName: string): boolean;
    /** 属性の存在を確認
     * @param {string} attrName - 属性名
     * @returns {boolean}
     */
    hasAttr(attrName: string): boolean;
    /** 座標がマス目に含まれるか判定
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @returns {boolean}
     */
    checkRangeMouse(x: number, y: number): boolean;
    /** マス目/マスク/駒を描写 */
    draw(): void;
    /** マス目画像を描写 */
    drawImage(): void;
    /** マス目を描写 */
    drawPanel(): void;
    /** マス目にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMask(color: string): void;
    /** マス目をテキスト形式で取得
     * @param {boolean} isCompact - コンパクト表示
     */
    toString(isCompact?: boolean): any;
    #private;
}
import { Piece } from "./piece.js";
