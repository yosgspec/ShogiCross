/** 盤の管理クラス */
export class Board {
    /** ゲームを実行する
     * @param {HTMLCanvasElement}} canvas - Canvas要素
     * @param {BoardInitOption} option - ボードの初期化オプション
     * @param {string} option.playBoard - ボードタイプ
     * @param {Object} option.playPieces - 駒セット
     * @param {string} option.playPieces.gameName - ゲーム名(基準となる駒の配置セット)
     * @param {string} option.playPieces.pieceSet - 駒の配置パターン
     * @returns Board
     */
    static run(canvas: any, option: BoardInitOption): Board;
    /**
     * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
     */
    /**
     * @param {HTMLCanvasElement} canvas - Canvas要素
     * @param {string} playBoard - ボードタイプ
     * @param {number} players - プレイヤー人数(2 or 4)
     * @param {BoardInitOption} option - ボードの初期化オプション
     */
    constructor(canvas: HTMLCanvasElement, playBoard: string, option: BoardInitOption);
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
    onDrawed: (Board: any) => void;
    onGameOver: (i: any) => void;
    /**  */
    gameAlives: Map<number, boolean>;
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
     * @param {Object} option - オプション
     * @param {number} option.displayPtn - 表示文字列を変更(1〜)
     * @param {boolean} option.isMoved - 初回移動済みか否か
     */
    putNewPiece(piece: string, pX: number, pY: number, playeaIdOrDeg: number, option?: {
        displayPtn: number;
        isMoved: boolean;
    }): void;
    /** 文字列から駒を配置
     * {string} text - 駒配置を表す文字列
     */
    setTextPieces(text: any): void;
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
     * @param {Object} option - オプション
     * @param {Panel} option.fromPanel - 移動元のマス目
     * @param {string} option.end - オプション=成|不成|打
     */
    addRecord(toPanel: Panel, option?: {
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
export type BoardInitOption = import('./json').BoardInitOption;
import { Stand } from "./stand.js";
import { EnPassant } from "./enPassant.js";
import { Panel } from "./panel.js";
