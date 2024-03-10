/** 盤の管理クラス */
export class Board {
    /** ゲームを実行する
     * @param {HTMLCanvasElement}} canvas
     * @param {Object<string, any>} options - オプション
     * @returns Board
     */
    static run(canvas: any, options: {
        [x: string]: any;
    }): Board;
    /**
     * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
     */
    /**
     * @param {HTMLCanvasElement} canvas - キャンバス要素
     * @param {string} playBoard - ボードタイプ
     * @param {number} players - プレイヤー人数(2 or 4)
     * @param {number} canvasWidth - キャンバス幅
     * @param {number} canvasHeight - キャンバス高さ
     * @param {canvasFit} canvasFit - キャンバスサイズの自動調整
     * @param {number} boardLeft - 描写するX座標
     * @param {number} boardTop - 描写するY座標
     * @param {number} panelWidth - マス目幅
     * @param {number} panelHeight - マス目高さ
     * @param {number} pieceSize - 駒の大きさ
     * @param {boolean} useRankSize - 駒の大きさを格の違いで変更するか
     * @param {boolean} isDrawShadow - 駒の影の描写有無
     * @panal {number} borderWidth - 枠線太さ
     * @param {boolean} useStand - 駒台の使用有無
     * @param {string} backgroundColor - 背景色(デフォルト無色)
     * @param {boolean} autoDrawing - 描写の自動更新有無
     * @param {(Board)=>void} onDrawed - 描写イベント
     * @param {boolean} freeMode - フリーモード有効化/無効化
     */
    constructor(canvas: HTMLCanvasElement, playBoard: string, { players, canvasWidth, canvasHeight, canvasFit, boardLeft, boardTop, panelWidth, panelHeight, pieceSize, useRankSize, isDrawShadow, borderWidth, useStand, backgroundColor, autoDrawing, onDrawed, freeMode }?: number);
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pieces: any;
    players: any;
    left: any;
    top: any;
    panelWidth: any;
    panelHeight: any;
    borderWidth: any;
    pieceSize: any;
    canvasBackgroundColor: any;
    field: any;
    xLen: any;
    yLen: any;
    width: number;
    height: number;
    right: any;
    bottom: any;
    stand: Stand;
    autoDrawing: any;
    freeMode: any;
    record: any[];
    uiControl: {
        removeEvent(): void;
    };
    enPassant: EnPassant;
    /** ボードを閉じる */
    close(): void;
    /** 駒配置を回転
     * @param {number} deg - 回転角 (90の倍数)
     */
    rotateField(deg: number): void;
    /** 駒の初期配置
     * {number} playerId - プレイヤー番号
     * {string} gameName - 駒の配置セット
     * {string} pieceSet - 駒の配置パターン変更
     */
    putStartPieces(playerId: any, gameName: any, pieceSet?: string): void;
    /** 駒の配置
     * @param {string} piece - 駒の表現文字
     * @param {number} pX - X方向配置位置(マス目基準)
     * @param {number} pY - Y方向配置位置(マス目基準)
     * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
     * @param {number} displayPtn - 表示文字列を変更(1〜)
     * @param {boolean} isMoved - 初回移動済みか否か
     */
    putNewPiece(piece: string, pX: number, pY: number, playeaIdOrDeg: number, { displayPtn, isMoved }?: number): void;
    /** 文字列から駒を配置
     * {string} text - 駒配置を表す文字列
     */
    inputPieces(text: any): void;
    /** 角度基準のマス目の行を取得する
     * @param {Panel} panel - マス目
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getRow(pX: any, pY: any, deg: number, offsetDeg?: number): number;
    /** 角度基準のマス目の列を取得する
     * @param {Panel} panel - マス目
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getCol(pX: any, pY: any, deg: number, offsetDeg?: number): number;
    /** プロモーションエリア内であるか判別
     * @param {Panel} panel - マス目
     */
    checkCanPromo(panel: Panel): {
        canPromo: boolean;
        forcePromo: boolean;
    };
    /** 駒を移動
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {Panel} toPanel - 選択中のマス目
     */
    movePiece(fromPanel: Panel, toPanel: Panel): void;
    /** 棋譜を追記
     * @param {Panel} toPanel - 移動先のマス目
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {string} end - オプション=成|不成|打
     */
    addRecord(toPanel: Panel, { fromPanel, end }?: Panel): void;
    /** 棋譜をテキストで取得
     * @returns {string}
     */
    getTextRecord(): string;
    /** 盤を描写 */
    draw(): void;
    /** BOD形式テキストを取得
     * @returns {string}
     */
    get bodText(): string;
    /** 駒配置をテキストで取得
     * {boolean} isMinimam - 縮小表示
     */
    toString(isMinimam?: boolean): string;
    /** 画像を取得
     * @param {string} fileName - ファイル名
     * @param {string} ext - 拡張子
     * @returns {Promise<void>}
     */
    downloadImage(fileName: string, ext: string): Promise<void>;
    #private;
}
import { Stand } from "./stand.js";
import { EnPassant } from "./enPassant.js";
import { Panel } from "./panel.js";
