/** 盤の管理クラス */
export class Board {
    /**
     * @typedef {Object} BoardInitOptions - ボードの初期化オプション
     * @property {number} canvasWidth - キャンバス幅
     * @property {number} canvasHeight - キャンバス高さ
     * @property {canvasFit} canvasFit - キャンバスサイズの自動調整
     * @property {number} boardLeft - 描写するX座標
     * @property {number} boardTop - 描写するY座標
     * @property {number} panelWidth - マス目幅
     * @property {number} panelHeight - マス目高さ
     * @property {number} pieceSize - 駒の大きさ
     * @property {boolean} useRankSize - 駒の大きさを格の違いで変更するか
     * @property {boolean} isDrawShadow - 駒の影の描写有無
     * @property {number} borderWidth - 枠線太さ
     * @property {boolean} useStand - 駒台の使用有無
     * @property {string} backgroundColor - 背景色(デフォルト無色)
     * @property {boolean} autoDrawing - 描写の自動更新有無
     * @property {(Board)=>void} onDrawed - 描写イベント
     * @property {boolean} freeMode - フリーモード有効化/無効化
    */
    /** ゲームを実行する
     * @param {HTMLCanvasElement}} canvas - Canvas要素
     * @param {BoardInitOptions} options - ボードの初期化オプション
     * @param {string} options.playBoard - ボードタイプ
     * @param {Object} options.playPieces - 駒セット
     * @param {string} options.playPieces.gameName - ゲーム名(基準となる駒の配置セット)
     * @param {string} options.playPieces.pieceSet - 駒の配置パターン
     * @returns Board
     */
    static run(canvas: any, options: {
        /**
         * - キャンバス幅
         */
        canvasWidth: number;
        /**
         * - キャンバス高さ
         */
        canvasHeight: number;
        /**
         * - キャンバスサイズの自動調整
         */
        canvasFit: "overflow" | "horizontal" | "vertical" | "parentOverflow" | "parentHorizontal" | "parentVertical";
        /**
         * - 描写するX座標
         */
        boardLeft: number;
        /**
         * - 描写するY座標
         */
        boardTop: number;
        /**
         * - マス目幅
         */
        panelWidth: number;
        /**
         * - マス目高さ
         */
        panelHeight: number;
        /**
         * - 駒の大きさ
         */
        pieceSize: number;
        /**
         * - 駒の大きさを格の違いで変更するか
         */
        useRankSize: boolean;
        /**
         * - 駒の影の描写有無
         */
        isDrawShadow: boolean;
        /**
         * - 枠線太さ
         */
        borderWidth: number;
        /**
         * - 駒台の使用有無
         */
        useStand: boolean;
        /**
         * - 背景色(デフォルト無色)
         */
        backgroundColor: string;
        /**
         * - 描写の自動更新有無
         */
        autoDrawing: boolean;
        /**
         * - 描写イベント
         */
        onDrawed: (Board: any) => void;
        /**
         * - フリーモード有効化/無効化
         */
        freeMode: boolean;
    }): Board;
    /**
     * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
     */
    /**
     * @param {HTMLCanvasElement} canvas - Canvas要素
     * @param {string} playBoard - ボードタイプ
     * @param {number} players - プレイヤー人数(2 or 4)
     * @param {BoardInitOptions} options - ボードの初期化オプション
     */
    constructor(canvas: HTMLCanvasElement, playBoard: string, options: {
        /**
         * - キャンバス幅
         */
        canvasWidth: number;
        /**
         * - キャンバス高さ
         */
        canvasHeight: number;
        /**
         * - キャンバスサイズの自動調整
         */
        canvasFit: "overflow" | "horizontal" | "vertical" | "parentOverflow" | "parentHorizontal" | "parentVertical";
        /**
         * - 描写するX座標
         */
        boardLeft: number;
        /**
         * - 描写するY座標
         */
        boardTop: number;
        /**
         * - マス目幅
         */
        panelWidth: number;
        /**
         * - マス目高さ
         */
        panelHeight: number;
        /**
         * - 駒の大きさ
         */
        pieceSize: number;
        /**
         * - 駒の大きさを格の違いで変更するか
         */
        useRankSize: boolean;
        /**
         * - 駒の影の描写有無
         */
        isDrawShadow: boolean;
        /**
         * - 枠線太さ
         */
        borderWidth: number;
        /**
         * - 駒台の使用有無
         */
        useStand: boolean;
        /**
         * - 背景色(デフォルト無色)
         */
        backgroundColor: string;
        /**
         * - 描写の自動更新有無
         */
        autoDrawing: boolean;
        /**
         * - 描写イベント
         */
        onDrawed: (Board: any) => void;
        /**
         * - フリーモード有効化/無効化
         */
        freeMode: boolean;
    });
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    pieces: {
        [k: string]: any;
    };
    players: any;
    left: number;
    top: number;
    panelWidth: number;
    panelHeight: number;
    borderWidth: number;
    pieceSize: number;
    canvasBackgroundColor: string;
    field: any;
    xLen: any;
    yLen: any;
    width: number;
    height: number;
    right: number;
    bottom: number;
    stand: Stand;
    autoDrawing: boolean;
    freeMode: boolean;
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
     * @param {number} playerId - プレイヤー番号
     * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
     * @param {string} pieceSet - 駒の配置パターン
     */
    putStartPieces(playerId: number, gameName: string, pieceSet?: string): void;
    /** 駒の配置
     * @param {string} piece - 駒の表現文字
     * @param {number} pX - X方向配置位置(マス目基準)
     * @param {number} pY - Y方向配置位置(マス目基準)
     * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
     * @param {Object} options - オプション
     * @param {number} options.displayPtn - 表示文字列を変更(1〜)
     * @param {boolean} options.isMoved - 初回移動済みか否か
     */
    putNewPiece(piece: string, pX: number, pY: number, playeaIdOrDeg: number, options?: {
        displayPtn: number;
        isMoved: boolean;
    }): void;
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
     * @param {Object} options - オプション
     * @param {Panel} options.fromPanel - 移動元のマス目
     * @param {string} options.end - オプション=成|不成|打
     */
    addRecord(toPanel: Panel, options?: {
        fromPanel: Panel;
        end: string;
    }): void;
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
