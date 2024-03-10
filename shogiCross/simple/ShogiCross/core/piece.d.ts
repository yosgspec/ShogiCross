/** 駒の管理クラス */
export class Piece {
    /** 描写サイズ
     * @type {number}
     */
    static size: number;
    /** 格の違いによって駒の大きさを変更するか
     * @type {boolean}
     */
    static useRankSize: boolean;
    /** 影の描写有無
     * @type {boolean}
     */
    static isDrawShadow: boolean;
    /** テキスト出力時のプレイヤー表示
     * @type {Object<string, string>}
     */
    static degChars: {
        [x: string]: string;
    };
    /** プレイヤー表示から角度を取得 */
    static charDegs: {};
    /** サイズ変更設定値
     * @type {Object<string, number>}
     */
    static rankRatio: {
        [x: string]: number;
    };
    /**
     * @typedef {Object} PieceInitOptions - 駒の初期化オプション
     * @property {string} name - 駒の名前
     * @property {string[]} display - 駒に表示する文字列(1、2文字)の配列
     * @property {string} imgSrc - 駒として表示する画像パスの配列
     * @property {boolean}isRotateImg - 過画像を設定する場合回転するか
     * @property {string} alias - キーの別名として定める文字の集合表
     * @property {string} gameName - 駒に対応するゲーム名
     * @property {string} expansion - ゲーム名の細分類
     * @property {"兵"|"馬"|"象"|"車"|"臣"|"王"|"成"} unit - 駒の兵種
     * @property {number}forcePromoLine - 行きどころのない駒となる段
     * @property {Object} range - 駒の移動範囲
     * @property {string[]} range.default - 通常時の移動範囲
     * @property {string[]} range.attack - 駒取得時の移動範囲
     * @property {string[]} range.start - 初回のみの移動範囲
     * @property {string[]} range.castling - キャスリング時の移動範囲
     * @property {string[]} range.enPassant - アンパッサン時の移動範囲
     * @property {string[]} range.palaceSlash - 九宮内での移動範囲
     * @property {string} promo - プロモーション先の駒の一文字表記
     * @property {string[]} attr - 駒の機能のリスト
     */
    /** 駒データを初期化
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {Piece|PieceInitOptions} options - 駒の初期化オプション
     */
    static getPieces(ctx: any, options?: Piece | {
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
    }): {
        [k: string]: any;
    };
    /** 文字列から駒を取得
     * @param {Piece|PieceInitOptions} piece - 駒
     * @param {string} text - 駒文字列
     */
    static stringToPiece(pieces: any, text: string): any;
    /** 駒の一覧をリストで取得 */
    static piecesToList(pieces: any): [string, any][];
    /**
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {Piece|PieceInitOptions} piece - 駒
     * @param {Object} options - オプション
     * @param {number} options.displayPtn - 表示文字列を変更(1〜)
     * @param {number} options.deg - 駒の角度
     * @param {number} options.size - 駒の大きさ
     * @param {boolean} options.useRankSize - 駒の大きさを格の違いで変更するか
     * @param {boolean} options.isDrawShadow - 駒の影の描写有無
     * @param {boolean} options.isMoved - 初回移動済みか否か
     */
    constructor(ctx: any, piece: Piece | {
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
    }, options?: {
        displayPtn: number;
        deg: number;
        size: number;
        useRankSize: boolean;
        isDrawShadow: boolean;
        isMoved: boolean;
    });
    /** 駒の段階別価値を取得 */
    get rank(): "KR" | "SR" | "R" | "UC" | "C";
    /** 駒の角度(deg/rad)
     * @param {number} value
     */
    set deg(value: number);
    get deg(): number;
    rad: number;
    /** 左側の座標 */
    get left(): number;
    /** 上側の座標 */
    get top(): number;
    /** 右側の座標 */
    get right(): number;
    /** 下側の座標 */
    get bottom(): number;
    /** 拡大率を取得
     * @returns {number}
     */
    get zoom(): number;
    ctx: any;
    alias: string[];
    displayPtn: number;
    game: any;
    cost: any;
    center: number;
    middle: number;
    size: number;
    useRankSize: boolean;
    isDrawShadow: boolean;
    isMoved: boolean;
    isSelected: boolean;
    /** 駒をクローン
     * @returns Piece
     */
    clone(): Piece;
    /** 駒を表返す */
    turnFront(): void;
    /** プロモーション
     * @param {string} char - 成り先の文字
     */
    promotion(char: string): void;
    char: string;
    /** 属性の存在を確認
     * @param {string} attrName - 属性名
     * @returns {boolean}
     */
    hasAttr(attrName: string): boolean;
    /** 座標が駒に含まれるか判定
     * @param {number} x - X座標
     * @param {number} y - Y座標
     */
    checkRangeMouse(x: number, y: number): boolean;
    /** 移動範囲を回転して取得 */
    getRange(): any;
    /** 駒/マスクを描写 */
    draw(): Promise<void>;
    /** 駒画像を描写 */
    drawImage(): void;
    /** 駒画像にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMaskImage(color: string): void;
    /** 将棋駒の外形パスを作成
     * @param {number} zoom - 駒の拡大率
     */
    makePath(zoom: number): void;
    /** 駒の影を描写
    * @param {number} zoom - 駒の拡大率
    */
    drawPieceShadow(zoom: number): void;
    /** 駒を描写 */
    drawPiece(): void;
    /** 駒にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMask(color: string): void;
    /** BOD形式テキストを取得
     * @returns {string}
     */
    getBodText(): string;
    /** 文字列形式で取得 */
    toString(): string;
}
