declare class V {
    /** ゲームを実行する
     * @param {HTMLCanvasElement}} canvas
     * @param {Object<string, any>} options - オプション
     * @returns Board
     */
    static run(t: any, e: any): V;
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
    constructor(t: any, e: any, { players: s, canvasWidth: i, canvasHeight: r, canvasFit: o, boardLeft: h, boardTop: a, panelWidth: n, panelHeight: c, pieceSize: l, useRankSize: p, isDrawShadow: w, borderWidth: v, useStand: d, backgroundColor: u, autoDrawing: k, onDrawed: g, freeMode: S }?: number);
    canvas: any;
    ctx: any;
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
    stand: D;
    autoDrawing: any;
    freeMode: any;
    record: any[];
    uiControl: {
        removeEvent(): void;
    };
    enPassant: gt;
    /** ボードを閉じる */
    close(): void;
    /** 駒配置を回転
     * @param {number} deg - 回転角 (90の倍数)
     */
    rotateField(t: any): void;
    /** 駒の初期配置
     * {number} playerId - プレイヤー番号
     * {string} gameName - 駒の配置セット
     * {string} pieceSet - 駒の配置パターン変更
     */
    putStartPieces(t: any, e: any, s?: string): void;
    /** 駒の配置
     * @param {string} piece - 駒の表現文字
     * @param {number} pX - X方向配置位置(マス目基準)
     * @param {number} pY - Y方向配置位置(マス目基準)
     * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
     * @param {number} displayPtn - 表示文字列を変更(1〜)
     * @param {boolean} isMoved - 初回移動済みか否か
     */
    putNewPiece(t: any, e: any, s: any, i: any, { displayPtn: r, setDeg: o, isMoved: h }?: number): void;
    /** 文字列から駒を配置
     * {string} text - 駒配置を表す文字列
     */
    inputPieces(t: any): void;
    /** 角度基準のマス目の行を取得する
     * @param {Panel} panel - マス目
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getRow(t: any, e: any, s: any, i?: number): number;
    /** 角度基準のマス目の列を取得する
     * @param {Panel} panel - マス目
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getCol(t: any, e: any, s: any, i?: number): number;
    /** プロモーションエリア内であるか判別
     * @param {Panel} panel - マス目
     */
    checkCanPromo(t: any): {
        canPromo: boolean;
        forcePromo: boolean;
    };
    /** 駒を移動
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {Panel} toPanel - 選択中のマス目
     */
    movePiece(t: any, e: any): void;
    /** 棋譜を追記
     * @param {Panel} toPanel - 移動先のマス目
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {string} end - オプション=成|不成|打
     */
    addRecord(t: any, { fromPanel: e, end: s }?: Panel): void;
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
    toString(t?: boolean): string;
    /** 画像を取得
     * @param {string} fileName - ファイル名
     * @param {string} ext - 拡張子
     * @returns {Promise<void>}
     */
    downloadImage(t: any, e: any): Promise<void>;
}
declare class y {
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
    /** 駒データを初期化
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {Object<string, any>} options - 駒の初期化オプション
     */
    static getPieces(t: any, e?: {}): any;
    /** 文字列から駒を取得
     * @param {Object<string, Piece>} piece - 駒
     * @param {string} text - 駒文字列
     */
    static stringToPiece(t: any, e: any): any;
    /** 駒の一覧をリストで取得 */
    static piecesToList(t: any): any;
    /**
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {Object<string, any>} piece - 駒
     * @param {number} displayPtn - 表示文字列を変更(1〜)
     * @param {number} deg - 駒の角度
     * @param {number} size - 駒の大きさ
     * @param {boolean} useRankSize - 駒の大きさを格の違いで変更するか
     * @param {boolean} isDrawShadow - 駒の影の描写有無
     * @param {boolean} isMoved - 初回移動済みか否か
     */
    constructor(t: any, e: any, { displayPtn: s, deg: i, size: r, useRankSize: o, isDrawShadow: h, isMoved: a }?: number);
    /** 駒の段階別価値を取得 */
    get rank(): "KR" | "SR" | "R" | "UC" | "C";
    /** 駒の角度(deg/rad)
     * @param {number} value
     */
    set deg(t: number);
    get deg(): number;
    rad: any;
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
    alias: any[];
    displayPtn: any;
    game: any;
    cost: any;
    center: number;
    middle: number;
    size: any;
    useRankSize: any;
    isDrawShadow: any;
    isMoved: any;
    isSelected: boolean;
    /** 駒をクローン
     * @returns Piece
     */
    clone(): y;
    /** 駒を表返す */
    turnFront(): void;
    /** プロモーション
     * @param {string} char - 成り先の文字
     */
    promotion(t: any): void;
    char: any;
    /** 属性の存在を確認
     * @param {string} attr - 属性
     * @returns boolean
     */
    hasAttr(t: any): any;
    /** 座標が駒に含まれるか判定
     * @param {number} x - X座標
     * @param {number} y - Y座標
     */
    checkRangeMouse(t: any, e: any): boolean;
    /** 移動範囲を回転して取得 */
    getRange(): any;
    /** 駒/マスクを描写 */
    draw(): Promise<void>;
    /** 駒画像を描写 */
    drawImage(): void;
    /** 駒画像にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMaskImage(t: any): void;
    /** 将棋駒の外形パスを作成 */
    makePath(t: any): void;
    /** 駒の影を描写 */
    drawPieceShadow(t: any): void;
    /** 駒を描写 */
    drawPiece(): void;
    /** 駒にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMask(t: any): void;
    /** BOD形式テキストを取得
     * @returns {string}
     */
    getBodText(): string;
    /** 文字列形式で取得 */
    toString(): string;
}
declare const Q: any;
declare const O: any;
declare namespace z {
    let imported: boolean;
    let images: {
        [x: string]: new (width?: number, height?: number) => HTMLImageElement;
    };
    /** 画像の読み込み
     * @returns {Promise<void>}
     */
    function importAsync(): Promise<void>;
}
declare const pt: any;
declare const K: any;
declare class D {
    static degId: {
        180: number;
        90: number;
        270: number;
        0: number;
    };
    /**
     * @param {Board} ボード
     */
    constructor(t: any);
    board: any;
    left: number;
    top: any;
    width: number;
    height: any;
    right: number;
    bottom: any;
    pitchWidth: number;
    pitchHeight: any;
    xLen: any;
    yLen: any;
    /** 駒台を初期化にする */
    clear(): void;
    stocks: any[][];
    /** 持ち駒からボード上に配置する
     * @param {Panal} toPanell - 配置先のパネル
     * @param {number} deg - 角度
     * @param {number} i - 配置する持ち駒のインデックス
     */
    releasePiece(t: any, { deg: e, i: s }: number): void;
    /** 駒台に追加する
     * @param {Piece} piece - 追加する駒
     */
    add(t: any): void;
    /** 駒を持ち駒にする
     * @param {Piece|null} winnerPiece - 移動する駒
     * @param {Piece} loserPiece - 捕縛される駒
     */
    capturePiece(t: any, e: any, s?: boolean, i?: boolean): void;
    /** 盤を描写 */
    draw(): void;
    /** BOD形式テキストを取得
     * @returns {string}
     */
    getBodText(t?: number): string;
    /** 文字列形式で取得
     * @param {boolean} isMinimam - 簡易表示
     */
    toString(t?: boolean): string;
}
declare class gt {
    degs: {};
    /** アンパッサン情報をクリア
     * @param {number} deg - アンパッサンされうる陣営の角度
     */
    clear(t: any): void;
    /** アンパッサン対象と成りうるマス情報を記録
     * @param {string} rangeName - 移動範囲の定義名
     * @param {Panel} panel - アンパッサン対象と成りうるマス目
     * @param {Piece} piece - アンパッサン対象と成りうる駒
     */
    setTarget(t: any, e: any, s: any): void;
    /** アンパッサン対象と成りうる駒情報を記録
     * @param {Panel} toPanel - アンパッサン対象か確認するマス目
     */
    setMoved(t: any): void;
    /** アンパッサン対象のマスか確認する
     * @param {string} rangeName - 移動範囲の定義名
     * @param {Panel} panel - アンパッサン対象と成りうるマス目
     * @returns {boolean}
     */
    isTarget(t: any, e: any, s: any): boolean;
}
export { V as Board, y as Piece, Q as boards, O as canvasFont, z as canvasImage, pt as gameSoft, K as games };
