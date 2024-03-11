/**
 * @typedef {Object} CanvasFont
 * @prop {{fontName: string, fontWeight: number}[]} fonts - {fontName: フォント名, fontWeight: フォントの太さ}
 */
/** Canvas用のGoogleフォント情報
 * @type {CanvasFont}
 */
export const canvasFont: CanvasFont;
/**
 * @typedef {Object} GameSoft
 * @prop {string} name - ゲーム名
 * @prop {string} playBoard - 使用するボード名
 * @prop {boolean} useStand - 駒台の使用有無
 * @prop {{gameName: string, pieceSet: string}[]} playPieces - {gameName: ゲーム名, pieceSet: 駒セットの名称}
 */
/** ゲーム情報(ボード+駒)のプリセット
 * @type {Object<string, GameSoft>}
 */
export const gameSoft: {
    [x: string]: GameSoft;
};
/**
 * @typedef Game
 * @prop {string} english - 英語名
 * @prop {string} fontColor - 駒のフォント色
 * @prop {string} promoteFontColor - 成駒のフォント色
 * @prop {string} backgroundColor - 駒の色
 * @prop {string} promoteBackgroundColor - 成駒の色
 * @prop {string} borderColor - 駒の枠色
 * @prop {string} promoteBackgroundColor - 成駒の枠色
 * @prop {number} promoLine - プロモーションライン(成りの段)
 * @prop {Object<string, Object<string, string[]>>} position - 駒の配置データ
 */
/** ゲームの種類に共通する駒情報や駒配置情報
 * @type {Object<string, Game>}
 */
export const games: {
    [x: string]: Game;
};
/**
 * @typedef {Object} BoardInitOption - ボードの初期化オプション
 * @prop {number} canvasWidth - キャンバス幅
 * @prop {number} canvasHeight - キャンバス高さ
 * @prop {canvasFit} canvasFit - キャンバスサイズの自動調整
 * @prop {number} boardLeft - 描写するX座標
 * @prop {number} boardTop - 描写するY座標
 * @prop {number} panelWidth - マス目幅
 * @prop {number} panelHeight - マス目高さ
 * @prop {number} pieceSize - 駒の大きさ
 * @prop {boolean} useRankSize - 駒の大きさを格の違いで変更する
 * @prop {boolean} isDrawShadow - 駒の影の描写有無
 * @prop {number} borderWidth - 枠線太さ
 * @prop {boolean} useStand - 駒台の使用有無
 * @prop {string} backgroundColor - 背景色(デフォルト無色)
 * @prop {boolean} autoDrawing - 描写の自動更新有無
 * @prop {(Board)=>void} onDrawed - 描写イベント
 * @prop {(i)=>void} onGameOver - ゲームオーバーイベント
 * @prop {boolean} freeMode - フリーモード有効化/無効化
 */
/**
 * ボードの構成情報
 * @type {Object<string, BoardInitOption>}
 */
export const boards: {
    [x: string]: BoardInitOption;
};
/**
 * @typedef {Object} PanelInitOption - マス目の初期化オプション
 * @prop {string} name - マス目の名前
 * @prop {string} text - ボード表示文字列
 * @prop {string} backgroundColor - マス目の色
 * @prop {string} borderColor - 枠色及びフォント色
 * @prop {string} selectColor - 選択した時の色
 * @prop {string} targetColor - 駒を選択した時の色
 * @prop {string} displayText - 表示する文字(1文字)
 * @prop {number} textRotate - 表示する文字の回転角(deg)
 * @prop {boolean} borderSlashLeft - 左斜線(＼)の有無
 * @prop {boolean} borderSlashRight - 右斜線(／)の有無
 * @prop {boolean} intersect - 交点を中心とする
 * @prop {string[]} attr - マス目の機能の属性
 */
/**
 * ボード中のマス目情報
 * @type {Object<string, PanelInitOption}
 */
export const panels: {
    [x: string]: PanelInitOption;
};
/**
 * @typedef {Object} PieceInitOption - 駒の初期化オプション
 * @prop {string} name - 駒の名前
 * @prop {string[]} display - 駒に表示する文字列(1、2文字)の配列
 * @prop {string} imgSrc - 駒として表示する画像パスの配列
 * @prop {boolean}isRotateImg - 過画像を設定する場合回転するか
 * @prop {string} alias - キーの別名として定める文字の集合表
 * @prop {string} gameName - 駒に対応するゲーム名
 * @prop {string} expansion - ゲーム名の細分類
 * @prop {"兵"|"馬"|"象"|"車"|"臣"|"王"|"成"} unit - 駒の兵種
 * @prop {number}forcePromoLine - 行きどころのない駒となる段
 * @prop {Object} range - 駒の移動範囲
 * @prop {string[]} range.default - 通常時の移動範囲
 * @prop {string[]} range.attack - 駒取得時の移動範囲
 * @prop {string[]} range.start - 初回のみの移動範囲
 * @prop {string[]} range.castling - キャスリング時の移動範囲
 * @prop {string[]} range.enPassant - アンパッサン時の移動範囲
 * @prop {string[]} range.palaceSlash - 九宮内での移動範囲
 * @prop {string} promo - プロモーション先の駒の一文字表記
 * @prop {string[]} attr - 駒の機能のリスト
 */
/**
 * 駒情報
 * @type {Object<string, PieceInitOption>}
 */
export const pieces: {
    [x: string]: PieceInitOption;
};
/**
 * @typedef {string[]} PieceRange 駒の移動範囲
 */
/**
 * 駒の移動範囲
 * @type{Object<string, PieceRange>}
 */
export const pieceRange: {
    [x: string]: PieceRange;
};
/**
 * 駒の価値
 * @type {Object<string, number>}
 */
export const pieceCost: {
    [x: string]: number;
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
    playPieces: {
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
    canvasFit: canvasFit;
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
     * - 駒の大きさを格の違いで変更する
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
     * - ゲームオーバーイベント
     */
    onGameOver: (i: any) => void;
    /**
     * - フリーモード有効化/無効化
     */
    freeMode: boolean;
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
