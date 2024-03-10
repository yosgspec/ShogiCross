/** BOD形式のための関数定義など */
export class Bod {
    /** 駒の角度表示
     * @type {Object<string, string>}
     */
    static pieceDegChars: {
        [x: string]: string;
    };
    /** マス目の表示
     * @type {string}
     */
    static panelText: string;
    /** 持駒の角度表示
     * @type {Object<string, string>}
     */
    static standDegChars: {
        [x: string]: string;
    };
    /** 行/持駒用の数字表示(漢数字)
     * @param {number} num - 数字
     * @param {boolean} viewOne - 一を表示
     * @returns {string}
     */
    static num2Row(num: number, viewOne?: boolean): string;
    /** 列用の数字表示(全角/2桁)
     * @param {number} num - 数字
     * @returns {string}
     */
    static num2Col(num: number): string;
}
