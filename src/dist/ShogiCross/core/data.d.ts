/**
 * @typedef {Object} ShogiCrossData - ShogiCrossデータ
 * @prop {CanvasFont} canvasFont - Canvas用のGoogleフォント情報
 * @prop {Object<string, GameSoft>} gameSoft - ゲーム情報(ボード+駒)のプリセット
 * @prop {Object<string, Game>} games - ゲームの種類に共通する駒情報や駒配置情報
 * @prop {Object<string, BoardInitOption>} boards - ボードの構成情報
 * @prop {Object<string, PanelInitOption} panels - ボード中のマス目情報
 * @prop {Object<string, PieceInitOption>} pieces - 駒情報
 * @prop {Object<string, PieceRange>} pieceRange - 駒の移動範囲
 * @prop {Object<string, number>} pieceCost - 駒の価値
 */
/** ゲームデータを拡張する
 * @param {ShogiCrossData} data - 拡張データ
 */
export function extendData(data: ShogiCrossData): void;
/**
 * - ShogiCrossデータ
 */
export type ShogiCrossData = {
    /**
     * - Canvas用のGoogleフォント情報
     */
    canvasFont: CanvasFont;
    /**
     * - ゲーム情報(ボード+駒)のプリセット
     */
    gameSoft: {
        [x: string]: GameSoft;
    };
    /**
     * - ゲームの種類に共通する駒情報や駒配置情報
     */
    games: {
        [x: string]: Game;
    };
    /**
     * - ボードの構成情報
     */
    boards: {
        [x: string]: BoardInitOption;
    };
    /**
     * - ボード中のマス目情報
     */
    panels: {
        [x: string]: PanelInitOption;
    };
    /**
     * - 駒情報
     */
    pieces: {
        [x: string]: PieceInitOption;
    };
    /**
     * - 駒の移動範囲
     */
    pieceRange: {
        [x: string]: PieceRange;
    };
    /**
     * - 駒の価値
     */
    pieceCost: {
        [x: string]: number;
    };
};
export type CanvasFont = {
    /**
     * - {fontName: フォント名, fontWeight: フォントの太さ}
     */
    fonts: {
        fontName: string;
        fontWeight: number;
    }[];
};
export type GameSoft = {
    /**
     * - ゲーム名
     */
    name: string;
    /**
     * - 使用するボード名
     */
    playBoard: string;
    /**
     * - 駒台の使用有無
     */
    useStand: boolean;
    /**
     * - {gameName: ゲーム名, pieceSet: 駒セットの名称}
     */
    playersOption: {
        gameName: string;
        pieceSet: string;
    }[];
};
export type Game = {
    /**
     * - 英語名
     */
    english: string;
    /**
     * - 駒のフォント色
     */
    fontColor: string;
    /**
     * - 成駒のフォント色
     */
    promoteFontColor: string;
    /**
     * - 駒の色
     */
    backgroundColor: string;
    /**
     * - 成駒の色
     */
    promoteBackgroundColor: string;
    /**
     * - 駒の枠色
     */
    borderColor: string;
    /**
     * - プロモーションライン(成りの段)
     */
    promoLine: number;
    /**
     * - 駒の配置データ
     */
    position: {
        [x: string]: {
            [x: string]: string[];
        };
    };
};
/**
 * - ボードの初期化オプション
 */
export type BoardInitOption = {
    /**
     * - ボードタイプ
     */
    playBoard: string;
    /**
     * - プレイヤー設定
     */
    playersOption: {
        gameName: string;
        pieceSet: string;
        cpuEngine: string;
    };
    /**
     * - プレイヤー人数(2 or 4)
     */
    players: 2 | 4;
    /**
     * - 駒台の使用有無
     */
    useStand: boolean;
    /**
     * - Canvas幅
     */
    canvasWidth: number;
    /**
     * - Canvas高さ
     */
    canvasHeight: number;
    /**
     * - Canvasサイズの自動調整
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
     * - 枠線太さ
     */
    borderWidth: number;
    /**
     * - 駒の大きさ
     */
    pieceSize: number;
    /**
     * - 駒の大きさを格の違いで変更する
     */
    useRankSize: boolean;
    /**
     * - 駒の影の描写有無
     */
    isDrawShadow: boolean;
    /**
     * - 背景色(デフォルト無色)
     */
    backgroundColor: string;
    /**
     * - ヘッドレスモード（Canvas非描画・自動操作用）
     */
    isHeadless: boolean;
    /**
     * - 描写の自動更新有無
     */
    autoDrawing: boolean;
    /**
     * - 移動モード
     */
    moveMode: "normal" | "free" | "viewOnly";
    /**
     * - デフォルトのプレイヤーを使用する
     */
    useDefaultPlayer: boolean;
    /**
     * - 描写イベント
     */
    onDrawed: (Board) => void;
    /**
     * - ゲームオーバーイベント
     */
    onGameOver: (i) => void;
};
/**
 * - マス目の初期化オプション
 */
export type PanelInitOption = {
    /**
     * - マス目の名前
     */
    name: string;
    /**
     * - ボード表示文字列
     */
    text: string;
    /**
     * - マス目の色
     */
    backgroundColor: string;
    /**
     * - 枠色及びフォント色
     */
    borderColor: string;
    /**
     * - 選択した時の色
     */
    selectColor: string;
    /**
     * - 駒を選択した時の色
     */
    targetColor: string;
    /**
     * - 表示する文字(1文字)
     */
    displayText: string;
    /**
     * - 表示する文字の回転角(deg)
     */
    textRotate: number;
    /**
     * - 左斜線(＼)の有無
     */
    borderSlashLeft: boolean;
    /**
     * - 右斜線(／)の有無
     */
    borderSlashRight: boolean;
    /**
     * - 交点を中心とする
     */
    intersect: boolean;
    /**
     * - マス目の機能の属性
     */
    attr: string[];
};
/**
 * - 駒の初期化オプション
 */
export type PieceInitOption = {
    /**
     * - 駒の名前
     */
    name: string;
    /**
     * - 駒に表示する文字列(1、2文字)の配列
     */
    display: string[];
    /**
     * - 駒として表示する画像パスの配列
     */
    imgSrc: string;
    /**
     * - 過画像を設定する場合回転するか
     */
    isRotateImg: boolean;
    /**
     * - キーの別名として定める文字の集合表
     */
    alias: string;
    /**
     * - 駒に対応するゲーム名
     */
    gameName: string;
    /**
     * - ゲーム名の細分類
     */
    expansion: string;
    /**
     * - 駒の兵種
     */
    unit: "兵" | "馬" | "象" | "車" | "臣" | "王" | "成";
    /**
     * - 行きどころのない駒となる段
     */
    forcePromoLine: number;
    /**
     * - 駒の移動範囲
     */
    range: {
        default: string[];
        attack: string[];
        start: string[];
        castling: string[];
        enPassant: string[];
        palaceSlash: string[];
    };
    /**
     * - プロモーション先の駒の一文字表記
     */
    promo: string;
    /**
     * - 駒の機能のリスト
     */
    attr: string[];
};
/**
 * 駒の移動範囲
 */
export type PieceRange = string[];
import canvasFont from "../data/canvasFont.js";
import gameSoft from "../data/gameSoft.js";
import games from "../data/games.js";
import boards from "../data/boards.js";
import panels from "../data/panels.js";
import pieces from "../data/pieces.js";
import pieceRange from "../data/pieceRange.js";
import pieceCost from "../data/pieceCost.js";
export { canvasFont, gameSoft, games, boards, panels, pieces, pieceRange, pieceCost };
