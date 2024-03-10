/** アンパッサン情報の管理 */
export class EnPassant {
    degs: {};
    /** アンパッサン情報をクリア
     * @param {number} deg - アンパッサンされうる陣営の角度
     */
    clear(deg: number): void;
    /** アンパッサン対象と成りうるマス情報を記録
     * @param {string} rangeName - 移動範囲の定義名
     * @param {Panel} panel - アンパッサン対象と成りうるマス目
     * @param {Piece} piece - アンパッサン対象と成りうる駒
     */
    setTarget(rangeName: string, panel: Panel, piece: Piece): void;
    /** アンパッサン対象と成りうる駒情報を記録
     * @param {Panel} toPanel - アンパッサン対象か確認するマス目
     */
    setMoved(toPanel: Panel): void;
    /** アンパッサン対象のマスか確認する
     * @param {string} rangeName - 移動範囲の定義名
     * @param {Panel} panel - アンパッサン対象と成りうるマス目
     * @returns {boolean}
     */
    isTarget(rangeName: string, panel: Panel, piece: any): boolean;
}
import { Panel } from "./panel.js";
import { Piece } from "./piece.js";
