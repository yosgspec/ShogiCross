/** マス目の管理クラス */
export class Panel {
    /**
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {string} char - マス目を示す文字
     * @param {number} center - 描写するX座標(中心原点)
     * @param {number} middle - 描写するY座標(中心原点)
     * @param {number} width - マス目幅
     * @param {number} height - マス目高さ
     * @param {number} borderWidth - 枠線の太さ
     * @param {number} pX - ボード上のマス目の列
     * @param {number} pY - ボード上のマス目の行
     */
    constructor(ctx: any, char: string, center: number, middle: number, width: number, height: number, borderWidth: number, pX: number, pY: number);
    ctx: any;
    center: number;
    middle: number;
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
    bottom: number;
    borderWidth: number;
    pX: number;
    pY: number;
    piece: any;
    /** マス目の選択状態
     * @param {boolean} value
     */
    set isSelected(value: boolean);
    get isSelected(): boolean;
    isTarget: boolean;
    /** 属性の存在を確認
     * @param {string} attr - 属性
     * @returns boolean
     */
    hasAttr(attr: string): any;
    /** 座標がマス目に含まれるか判定
     * @param {number} x - X座標
     * @param {number} y - Y座標
     */
    checkRangeMouse(x: number, y: number): boolean;
    /** マス目/マスク/駒を描写 */
    draw(): void;
    /** マス目を描写 */
    drawPanel(): void;
    /** マス目にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMask(color: string): void;
    /** BOD形式テキストを取得
     * @returns {string}
     */
    getBodText(): string;
    /** 文字列形式で取得
     * @param {string} - 簡易表示
     */
    toString(isMinimam?: boolean): any;
    #private;
}
