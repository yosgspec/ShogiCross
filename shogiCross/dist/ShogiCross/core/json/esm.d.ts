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
export { canvasFont, gameSoft, games, boards, panels, pieces, pieceRange, pieceCost };
