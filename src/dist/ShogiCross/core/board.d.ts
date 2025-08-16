/** 盤の管理クラス */
export class Board {
    /**
     * @typedef {Object} Record - 局面の記録
     * @prop {Object} from
     * @prop {number} from.pX - 移動元の列
     * @prop {number} from.pY - 移動元の行
     * @prop {Object} to
     * @prop {number} to.pX - 移動先の列
     * @prop {number} to.pY - 移動先の行
     * @prop {number} deg - 駒の角度
     * @prop {string} pieceChar - 駒の一文字表記
     * @prop {string} end - 棋譜表示の末尾に記載する文字
     * @prop {string} fieldText - 駒配置のテキスト
     * @prop {number[][]} fieldMoved - 駒の移動済み判定
     * @prop {string|null} comment - 棋譜コメント
     */
    /** ゲームを実行する
     * @param {HTMLCanvasElement}} canvas - Canvas要素
     * @param {BoardInitOption} option - ボードの初期化オプション
     * @returns {Board}
     */
    static run(canvas: any, option: BoardInitOption): any;
    /**
     * @param {HTMLCanvasElement} canvas - Canvas要素
     * @param {BoardInitOption} option - ボードの初期化オプション
     */
    constructor(canvas: HTMLCanvasElement, option: BoardInitOption);
    isHeadless: boolean;
    name: any;
    variant: any;
    url: any;
    desc: any;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    pieces: {
        [k: string]: any;
    };
    playerLen: 2 | 4;
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
    players: Map<any, any>;
    width: number;
    height: number;
    right: number;
    bottom: number;
    stand: Stand;
    autoDrawing: boolean;
    onDrawed: (e: any) => void;
    onTurnEnd: any;
    onGameOver: (e: any, i: number) => void;
    moveMode: "normal" | "viewOnly" | "free";
    /** ゲームの記録
     * @type {Record[]}
     */
    record: {
        from: {
            pX: number;
            pY: number;
        };
        to: {
            pX: number;
            pY: number;
        };
        /**
         * - 駒の角度
         */
        deg: number;
        /**
         * - 駒の一文字表記
         */
        pieceChar: string;
        /**
         * - 棋譜表示の末尾に記載する文字
         */
        end: string;
        /**
         * - 駒配置のテキスト
         */
        fieldText: string;
        /**
         * - 駒の移動済み判定
         */
        fieldMoved: number[][];
        /**
         * - 棋譜コメント
         */
        comment: string | null;
    }[];
    /** ゲームのターン
     * @type {number}
     */
    turn: number;
    enPassant: EnPassant;
    /** 操作パネルを構築
     * @param {string[]} compList - 表示するコントロールの一覧
     * @returns {PlayerControl}
     */
    makePlayerControl(compList: string[]): PlayerControl;
    /** ボードを閉じる */
    close(): void;
    /** 現在の手番のプレイヤー情報を取得
     * @returns {Object<string, any>|"PlayerInfo"} - 現在のプレイヤー情報
     */
    getActivePlayer(): {
        [x: string]: any;
    } | "PlayerInfo";
    /** 角度を正規化
     * @param {number} playeaIdOrDeg - プレイヤー番号または角度
     * @returns {number}
     */
    degNormal(playeaIdOrDeg: number): number;
    /** 盤面を回転
     * @param {boolean} isRight - 回転方向
     */
    rotate(isRight?: boolean): void;
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
     * @param {number} pX - マス目の列
     * @param {number} pY - マス目の行
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getRow(pX: number, pY: number, deg: number, offsetDeg?: number): number;
    /** 角度基準のマス目の列を取得する
     * @param {number} pX - マス目の列
     * @param {number} pY - マス目の行
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getCol(pX: number, pY: number, deg: number, offsetDeg?: number): number;
    /** プロモーションエリア内であるか判別
     * @param {Panel} panel - マス目
     * @returns {{
     * 		canPromo: boolean,
     * 		forcePromo: boolean
     * }}
     */
    checkCanPromo(panel: Panel): {
        canPromo: boolean;
        forcePromo: boolean;
    };
    /** 駒を移動
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {Panel} toPanel - 選択中のマス目
     * @param {boolean} isCpuMove - CPUによる移動か
     */
    movePiece(fromPanel: Panel, toPanel: Panel, isCpuMove?: boolean): void;
    /** 棋譜を追記
     * @param {Panel} toPanel - 移動先のマス目
     * @param {Object} option - オプション
     * @param {Panel} option.fromPanel - 移動元のマス目
     * @param {string} option.end - オプション=成|不成|打
     */
    addRecord(option?: {
        fromPanel: Panel;
        end: string;
    }): void;
    /** 棋譜コメントを追記
     * @param {string} comment - 棋譜コメント
     * @param {number} shiftTurn - ずらす手数
     */
    addRecordComment(comment: string, shiftTurn?: number): void;
    /** 記録の手を戻す */
    undoRecord(): void;
    /** 記録の手を進める */
    redoRecord(): void;
    /** 記録の手を移動
     * @param {number} turn - 手数
     */
    moveRecord(turn: number): void;
    /** 局面の記録を文字列に変換
     * @param {Record} record - 局面の記録
     * @param {number} turn - 手数
     * @param {boolean} isNumOnly - 座標を数字で表現
     * @returns {string}
     */
    record2String(record: {
        from: {
            pX: number;
            pY: number;
        };
        to: {
            pX: number;
            pY: number;
        };
        /**
         * - 駒の角度
         */
        deg: number;
        /**
         * - 駒の一文字表記
         */
        pieceChar: string;
        /**
         * - 棋譜表示の末尾に記載する文字
         */
        end: string;
        /**
         * - 駒配置のテキスト
         */
        fieldText: string;
        /**
         * - 駒の移動済み判定
         */
        fieldMoved: number[][];
        /**
         * - 棋譜コメント
         */
        comment: string | null;
    }, turn: number, isNumOnly?: boolean): string;
    /** 表示用の棋譜を取得
     * @param {boolean} isNumOnly - 座標を数字で表現
     * @returns {string}
     */
    getTextRecord(isNumOnly?: boolean): string;
    /** 棋譜データを取得
     * @param {boolean} isEncode - エンコード有無
     * @returns {string}
     */
    getJsonRecord(isEncode?: boolean): string;
    /** 棋譜データを入力
     * @param {string} record - 棋譜データ
     * @param {number} turn - 手数
     */
    setJsonRecord(record: string, turn: number): void;
    /** 盤を描写 */
    draw(): void;
    /** 駒配置をテキストで取得
     * @param {"default"|"compact"|"bod"} mode - テキスト形式
     * @param {boolean} isAlias - エイリアス表示
     * @returns {string}
     */
    getTextPieces(mode?: "default" | "compact" | "bod", isAlias?: boolean): string;
    /** 棋譜コメントを取得
     * @param {number} shiftTurn - ずらす手数
     * @returns {string}
     */
    getRecordComment(shiftTurn?: number): string;
    /** 駒配置をテキストで取得
     * @param {boolean} isCompact - コンパクト表示
     * @param {boolean} isAlias - エイリアス表示
     */
    toString(isCompact?: boolean, isAlias?: boolean): string;
    /** 画像を取得
     * @param {string} fileName - ファイル名
     * @param {string} ext - 拡張子
     * @returns {Promise<void>}
     */
    downloadImage(fileName: string, ext: string, urlType: any): Promise<void>;
    /** 盤面をクローン
     * @returns {Board}
     */
    clone(): any;
    #private;
}
export type BoardInitOption = import('./data').BoardInitOption;
export type PlayerInfo = import('./data').PlayerInfo;
import { Stand } from "./stand.js";
import { EnPassant } from "./enPassant.js";
import { PlayerControl } from "./playerControl.js";
import { Panel } from "./panel.js";
