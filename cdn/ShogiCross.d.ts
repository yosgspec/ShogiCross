declare class Q {
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
    static run(e: any, t: any): any;
    /**
     * @param {HTMLCanvasElement} canvas - Canvas要素
     * @param {BoardInitOption} option - ボードの初期化オプション
     */
    constructor(e: any, t: any);
    isHeadless: any;
    name: any;
    variant: any;
    url: any;
    desc: any;
    ctx: any;
    canvas: any;
    pieces: {
        [k: string]: any;
    };
    playerLen: any;
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
    players: Map<any, any>;
    width: number;
    height: number;
    right: any;
    bottom: any;
    stand: ee;
    autoDrawing: any;
    isGameEnd: boolean;
    onDrawed: any;
    onTurnEnd: any;
    onGameOver: any;
    onGameEnd: any;
    moveMode: any;
    record: any[];
    turn: number;
    enPassant: xe;
    /** 操作パネルを構築
     * @param {string[]} compList - 表示するコントロールの一覧
     * @returns {PlayerControl}
     */
    makePlayerControl(e: any): any;
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
    degNormal(e: any): number;
    /** 盤面を回転
     * @param {boolean} isRight - 回転方向
     */
    rotate(e?: boolean): void;
    /** 駒の初期配置
     * @param {number} playerId - プレイヤー番号
     * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
     * @param {string} pieceSet - 駒の配置パターン
     */
    putStartPieces(e: any, t: any, a?: string): void;
    /** 駒の配置
     * @param {string} piece - 駒の表現文字
     * @param {number} pX - X方向配置位置(マス目基準)
     * @param {number} pY - Y方向配置位置(マス目基準)
     * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
     * @param {Object} option - オプション
     * @param {number} option.displayPtn - 表示文字列を変更(1〜)
     * @param {boolean} option.isMoved - 初回移動済みか否か
     */
    putNewPiece(e: any, t: any, a: any, i: any, s?: {}): void;
    /** 文字列から駒を配置
     * {string} text - 駒配置を表す文字列
     */
    setTextPieces(e: any): void;
    /** 角度基準のマス目の行を取得する
     * @param {number} pX - マス目の列
     * @param {number} pY - マス目の行
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getRow(e: any, t: any, a: any, i?: number): number;
    /** 角度基準のマス目の列を取得する
     * @param {number} pX - マス目の列
     * @param {number} pY - マス目の行
     * @param {number} deg - 角度
     * @param {number} offsetDeg - 補正角度
     * @returns {number}
     */
    getCol(e: any, t: any, a: any, i?: number): number;
    /** プロモーションエリア内であるか判別
     * @param {Panel} panel - マス目
     * @returns {{
     * 		canPromo: boolean,
     * 		forcePromo: boolean
     * }}
     */
    checkCanPromo(e: any): {
        canPromo: boolean;
        forcePromo: boolean;
    };
    simpleMovePiece(e: any, t: any): void;
    /** 駒を移動
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {Panel} toPanel - 選択中のマス目
     * @param {boolean} isCpuMove - CPUによる移動か
     */
    movePiece(e: any, t: any, a?: boolean): Promise<void>;
    /** パスして手番を進める
     * @param {PlayerInfo} player - プレイヤー情報
    */
    passTurn(e: any): void;
    /** 棋譜を追記
     * @param {Panel} toPanel - 移動先のマス目
     * @param {Object} option - オプション
     * @param {Panel} option.fromPanel - 移動元のマス目
     * @param {string} option.end - オプション=成|不成|打
     */
    addRecord(e?: {}): void;
    /** 棋譜コメントを追記
     * @param {string} comment - 棋譜コメント
     * @param {number} shiftTurn - ずらす手数
     */
    addRecordComment(e: any, t?: number): void;
    /** 記録の手を戻す */
    undoRecord(): void;
    /** 記録の手を進める */
    redoRecord(): void;
    /** 記録の手を移動
     * @param {number} turn - 手数
     */
    moveRecord(e: any): void;
    /** 局面の記録を文字列に変換
     * @param {Record} record - 局面の記録
     * @param {number} turn - 手数
     * @param {boolean} isNumOnly - 座標を数字で表現
     * @returns {string}
     */
    record2String(e: any, t: any, a?: boolean): string;
    /** 表示用の棋譜を取得
     * @param {boolean} isNumOnly - 座標を数字で表現
     * @returns {string}
     */
    getTextRecord(e?: boolean): string;
    /** 棋譜データを取得
     * @param {boolean} isEncode - エンコード有無
     * @returns {string}
     */
    getJsonRecord(e?: boolean): string;
    /** 棋譜データを入力
     * @param {string} record - 棋譜データ
     * @param {number} turn - 手数
     */
    setJsonRecord(e: any, t: any): void;
    /** 盤を描写 */
    draw(): void;
    /** 駒配置をテキストで取得
     * @param {"default"|"compact"|"bod"} mode - テキスト形式
     * @param {boolean} isAlias - エイリアス表示
     * @returns {string}
     */
    getTextPieces(e?: string, t?: boolean): string;
    /** 棋譜コメントを取得
     * @param {number} shiftTurn - ずらす手数
     * @returns {string}
     */
    getRecordComment(e?: number): string;
    /** 駒配置をテキストで取得
     * @param {boolean} isCompact - コンパクト表示
     * @param {boolean} isAlias - エイリアス表示
     */
    toString(e?: boolean, t?: boolean): string;
    /** 画像を取得
     * @param {string} fileName - ファイル名
     * @param {string} ext - 拡張子
     * @returns {Promise<void>}
     */
    downloadImage(e: any, t: any, a: any): Promise<void>;
    /** オーバーレイの表示を開始します。 */
    startOverlay(): void;
    /** オーバーレイの表示を停止します。 */
    stopOverlay(): void;
    /** 盤面をクローン
     * @returns {Board}
     */
    clone(): any;
    #private;
}
declare class ke extends I {
    engine: any;
}
declare class I {
    /**
     * @param {Board} board - 対象のボード
     * @param {PlayerInfo} player - プレイヤー情報
     */
    constructor(e: any, t: any);
    board: any;
    player: any;
    /** 手番操作 */
    playTurn(): Promise<void>;
    /**
     * 盤面を評価します。
     * @param {Board} board - 評価対象の盤面
     * @returns {number} 盤面の評価値
     */
    evaluate(e?: any): number;
}
declare namespace q {
    export { random };
    export { greedy };
    export { minimax };
}
declare class C {
    /** @typedef {Object} Piece */
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
    /** プレイヤー表示から角度を取得
    * @type {Object<string, number>}
     */
    static charDegs: {
        [x: string]: number;
    };
    /** サイズ変更設定値
     * @type {Object<string, number>}
     */
    static rankRatio: {
        [x: string]: number;
    };
    /** 駒データを初期化
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {Piece|PieceInitOption} option - 駒の初期化オプション
     * @retuens {Object<string, Piece>}
     */
    static getPieces(e: any, t?: {}): {
        [k: string]: any;
    };
    /** 文字列から駒を取得
     * @param {Piece|PieceInitOption} piece - 駒
     * @param {string} text - 駒文字列
     * @returns {Piece}
     */
    static stringToPiece(e: any, t: any): any;
    /** 駒の一覧をリストで取得
     * @returns {Piece[]}
     */
    static piecesToList(e: any): any[];
    /**
     * @param {any} ctx - Canvas描画コンテキスト
     * @param {Piece|PieceInitOption} piece - 駒
     * @param {Object} option - オプション
     * @param {number} option.displayPtn - 表示文字列を変更(1〜)
     * @param {number} option.deg - 駒の角度
     * @param {number} option.size - 駒の大きさ
     * @param {boolean} option.useRankSize - 駒の大きさを格の違いで変更するか
     * @param {boolean} option.isDrawShadow - 駒の影の描写有無
     * @param {boolean} option.isMoved - 初回移動済みか否か
     */
    constructor(e: any, t: any, a?: {});
    /** 駒の段階別価値を取得
     * @returns {string}
     */
    get rank(): string;
    /** 駒の角度(deg/rad)
     * @param {number} value
     */
    set deg(e: number);
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
    alias: string[];
    game: any;
    cost: any;
    center: number;
    middle: number;
    isMoved: any;
    isSelected: boolean;
    /** 駒をクローン
     * @returns {Piece}
     */
    clone(): any;
    /** 駒を表返す */
    turnFront(): void;
    /** プロモーション
     * @param {string} char - 成り先の文字
     */
    promotion(e: any): void;
    char: any;
    /** 属性の存在を確認
     * @param {string} attrName - 属性名
     * @returns {boolean}
     */
    hasAttr(e: any): boolean;
    /** 座標が駒に含まれるか判定
     * @param {number} x - X座標
     * @param {number} y - Y座標
     * @returns {boolean}
     */
    checkRangeMouse(e: any, t: any): boolean;
    /** 移動範囲を回転して取得
     * @returns {string[][]}
     */
    getRange(): string[][];
    /** 駒/マスクを描写 */
    draw(): Promise<void>;
    /** 駒画像を描写 */
    drawImage(): void;
    /** 駒画像にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMaskImage(e: any): void;
    /** 将棋駒の外形パスを作成
     * @param {number} zoom - 駒の拡大率
     */
    makePath(e: any): void;
    /** 駒の影を描写
    * @param {number} zoom - 駒の拡大率
    */
    drawPieceShadow(e: any): void;
    /** 駒を描写 */
    drawPiece(): void;
    /** 駒にマスクを描写
     * @param {string} color - カラーエフェクトの色
     */
    drawMask(e: any): void;
    /** 文字列形式で取得
     * @param {boolean} isAlias - エイリアス表示
     */
    toString(e?: boolean): string;
}
declare const V: {
    将棋: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    チェス: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    シャンチー: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    チャンギ: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    マークルック: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    どうぶつしょうぎ: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    将棋5x5: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    将棋7x7: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    将棋10x10: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    チェス6x6: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    チェス9x9: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    チェス10x8: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    チェス10x10: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    チェス12x8: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    チェス12x12: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    ごろごろどうぶつしょうぎ: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    古将棋8x8: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    古将棋9x8: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    古将棋9x9: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    古将棋10x10: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    古将棋11x11: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    古将棋12x12: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    古将棋15x15: {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    クレージーハウス: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    "4\u4EBA\u30C1\u30A7\u30B9": {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    四神将棋: {
        backgroundColor: string;
        borderColor: string;
        sidePromo: boolean;
        field: string[];
    };
    クロス8x8: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    クロス9x9: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    クロス11x11: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    クロス12x12: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    クロス13x13: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    クロス14x14: {
        backgroundColor: string;
        borderColor: string;
        field: string[];
    };
    "4\u4EBA\u7528\u30AF\u30ED\u30B98\u5217": {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    "4\u4EBA\u7528\u30AF\u30ED\u30B99\u5217": {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
    "4\u4EBA\u7528\u30AF\u30ED\u30B99\u52174\u884C": {
        backgroundColor: string;
        borderColor: string;
        promoLineOffset: number;
        field: string[];
    };
};
declare namespace P {
    let fonts: (string | number)[][];
}
declare namespace H {
    let imported: boolean;
    let images: {
        [x: string]: new (width?: number, height?: number) => HTMLImageElement;
    };
    /** 画像の読み込み
     * @returns {Promise<void>}
     */
    function importAsync(): Promise<void>;
}
declare function Ee(p: any): void;
declare namespace oe {
    namespace shogi {
        let name: string;
        let variant: string;
        let url: string;
        let desc: string;
        let playBoard: string;
        let useStand: boolean;
        let playerOptions: {
            gameName: string;
            pieceSet: string;
        }[];
    }
    namespace chess {
        let name_1: string;
        export { name_1 as name };
        let variant_1: string;
        export { variant_1 as variant };
        let url_1: string;
        export { url_1 as url };
        let desc_1: string;
        export { desc_1 as desc };
        let playBoard_1: string;
        export { playBoard_1 as playBoard };
        let useStand_1: boolean;
        export { useStand_1 as useStand };
        let playerOptions_1: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_1 as playerOptions };
    }
    namespace xiangq {
        let name_2: string;
        export { name_2 as name };
        let variant_2: string;
        export { variant_2 as variant };
        let url_2: string;
        export { url_2 as url };
        let desc_2: string;
        export { desc_2 as desc };
        let playBoard_2: string;
        export { playBoard_2 as playBoard };
        let useStand_2: boolean;
        export { useStand_2 as useStand };
        let playerOptions_2: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_2 as playerOptions };
    }
    namespace janggi {
        let name_3: string;
        export { name_3 as name };
        let variant_3: string;
        export { variant_3 as variant };
        let url_3: string;
        export { url_3 as url };
        let desc_3: string;
        export { desc_3 as desc };
        let playBoard_3: string;
        export { playBoard_3 as playBoard };
        let useStand_3: boolean;
        export { useStand_3 as useStand };
        let playerOptions_3: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_3 as playerOptions };
    }
    namespace makruk {
        let name_4: string;
        export { name_4 as name };
        let variant_4: string;
        export { variant_4 as variant };
        let url_4: string;
        export { url_4 as url };
        let desc_4: string;
        export { desc_4 as desc };
        let playBoard_4: string;
        export { playBoard_4 as playBoard };
        let useStand_4: boolean;
        export { useStand_4 as useStand };
        let playerOptions_4: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_4 as playerOptions };
    }
    namespace chaturanga {
        let name_5: string;
        export { name_5 as name };
        let variant_5: string;
        export { variant_5 as variant };
        let url_5: string;
        export { url_5 as url };
        let desc_5: string;
        export { desc_5 as desc };
        let playBoard_5: string;
        export { playBoard_5 as playBoard };
        let useStand_5: boolean;
        export { useStand_5 as useStand };
        let playerOptions_5: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_5 as playerOptions };
    }
    namespace dobutsuShogi {
        let name_6: string;
        export { name_6 as name };
        let variant_6: string;
        export { variant_6 as variant };
        let url_6: string;
        export { url_6 as url };
        let desc_6: string;
        export { desc_6 as desc };
        let playBoard_6: string;
        export { playBoard_6 as playBoard };
        let useStand_6: boolean;
        export { useStand_6 as useStand };
        let playerOptions_6: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_6 as playerOptions };
    }
    namespace toriShogi {
        let name_7: string;
        export { name_7 as name };
        let variant_7: string;
        export { variant_7 as variant };
        let url_7: string;
        export { url_7 as url };
        let desc_7: string;
        export { desc_7 as desc };
        let playBoard_7: string;
        export { playBoard_7 as playBoard };
        let useStand_7: boolean;
        export { useStand_7 as useStand };
        let playerOptions_7: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_7 as playerOptions };
    }
    namespace chuShogi {
        let name_8: string;
        export { name_8 as name };
        let variant_8: string;
        export { variant_8 as variant };
        let url_8: string;
        export { url_8 as url };
        let desc_8: string;
        export { desc_8 as desc };
        let playBoard_8: string;
        export { playBoard_8 as playBoard };
        let useStand_8: boolean;
        export { useStand_8 as useStand };
        let playerOptions_8: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_8 as playerOptions };
    }
    namespace waShogi {
        let name_9: string;
        export { name_9 as name };
        let variant_9: string;
        export { variant_9 as variant };
        let url_9: string;
        export { url_9 as url };
        let desc_9: string;
        export { desc_9 as desc };
        let playBoard_9: string;
        export { playBoard_9 as playBoard };
        let useStand_9: boolean;
        export { useStand_9 as useStand };
        let playerOptions_9: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_9 as playerOptions };
    }
    namespace grantAcedrex {
        let name_10: string;
        export { name_10 as name };
        let variant_10: string;
        export { variant_10 as variant };
        let url_10: string;
        export { url_10 as url };
        let desc_10: string;
        export { desc_10 as desc };
        let playBoard_10: string;
        export { playBoard_10 as playBoard };
        let useStand_10: boolean;
        export { useStand_10 as useStand };
        let playerOptions_10: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_10 as playerOptions };
    }
    namespace courierChessAdvanced {
        let name_11: string;
        export { name_11 as name };
        let variant_11: string;
        export { variant_11 as variant };
        let url_11: string;
        export { url_11 as url };
        let desc_11: string;
        export { desc_11 as desc };
        let playBoard_11: string;
        export { playBoard_11 as playBoard };
        let useStand_11: boolean;
        export { useStand_11 as useStand };
        let playerOptions_11: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_11 as playerOptions };
    }
    namespace gogoShogi {
        let name_12: string;
        export { name_12 as name };
        let variant_12: string;
        export { variant_12 as variant };
        let url_12: string;
        export { url_12 as url };
        let desc_12: string;
        export { desc_12 as desc };
        let playBoard_12: string;
        export { playBoard_12 as playBoard };
        let useStand_12: boolean;
        export { useStand_12 as useStand };
        let playerOptions_12: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_12 as playerOptions };
    }
    namespace asakuraShogi {
        let name_13: string;
        export { name_13 as name };
        let variant_13: string;
        export { variant_13 as variant };
        let url_13: string;
        export { url_13 as url };
        let desc_13: string;
        export { desc_13 as desc };
        let playBoard_13: string;
        export { playBoard_13 as playBoard };
        let useStand_13: boolean;
        export { useStand_13 as useStand };
        let playerOptions_13: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_13 as playerOptions };
    }
    namespace shoShogi {
        let name_14: string;
        export { name_14 as name };
        let variant_14: string;
        export { variant_14 as variant };
        let url_14: string;
        export { url_14 as url };
        let desc_14: string;
        export { desc_14 as desc };
        let playBoard_14: string;
        export { playBoard_14 as playBoard };
        let useStand_14: boolean;
        export { useStand_14 as useStand };
        let playerOptions_14: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_14 as playerOptions };
    }
    namespace heianShogi8x8 {
        let name_15: string;
        export { name_15 as name };
        let variant_15: string;
        export { variant_15 as variant };
        let url_15: string;
        export { url_15 as url };
        let desc_15: string;
        export { desc_15 as desc };
        let playBoard_15: string;
        export { playBoard_15 as playBoard };
        let useStand_15: boolean;
        export { useStand_15 as useStand };
        let playerOptions_15: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_15 as playerOptions };
    }
    namespace heianShogi9x8 {
        let name_16: string;
        export { name_16 as name };
        let variant_16: string;
        export { variant_16 as variant };
        let url_16: string;
        export { url_16 as url };
        let desc_16: string;
        export { desc_16 as desc };
        let playBoard_16: string;
        export { playBoard_16 as playBoard };
        let useStand_16: boolean;
        export { useStand_16 as useStand };
        let playerOptions_16: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_16 as playerOptions };
    }
    namespace heianShogi9x9 {
        let name_17: string;
        export { name_17 as name };
        let variant_17: string;
        export { variant_17 as variant };
        let url_17: string;
        export { url_17 as url };
        let desc_17: string;
        export { desc_17 as desc };
        let playBoard_17: string;
        export { playBoard_17 as playBoard };
        let useStand_17: boolean;
        export { useStand_17 as useStand };
        let playerOptions_17: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_17 as playerOptions };
    }
    namespace kyoShogiLeft {
        let name_18: string;
        export { name_18 as name };
        let variant_18: string;
        export { variant_18 as variant };
        let url_18: string;
        export { url_18 as url };
        let desc_18: string;
        export { desc_18 as desc };
        let playBoard_18: string;
        export { playBoard_18 as playBoard };
        let useStand_18: boolean;
        export { useStand_18 as useStand };
        let playerOptions_18: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_18 as playerOptions };
    }
    namespace kyoShogiRight {
        let name_19: string;
        export { name_19 as name };
        let variant_19: string;
        export { variant_19 as variant };
        let url_19: string;
        export { url_19 as url };
        let desc_19: string;
        export { desc_19 as desc };
        let playBoard_19: string;
        export { playBoard_19 as playBoard };
        let useStand_19: boolean;
        export { useStand_19 as useStand };
        let playerOptions_19: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_19 as playerOptions };
    }
    namespace shoKyoShogiLeft {
        let name_20: string;
        export { name_20 as name };
        let variant_20: string;
        export { variant_20 as variant };
        let url_20: string;
        export { url_20 as url };
        let desc_20: string;
        export { desc_20 as desc };
        let playBoard_20: string;
        export { playBoard_20 as playBoard };
        let useStand_20: boolean;
        export { useStand_20 as useStand };
        let playerOptions_20: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_20 as playerOptions };
    }
    namespace shoKyoShogiRight {
        let name_21: string;
        export { name_21 as name };
        let variant_21: string;
        export { variant_21 as variant };
        let url_21: string;
        export { url_21 as url };
        let desc_21: string;
        export { desc_21 as desc };
        let playBoard_21: string;
        export { playBoard_21 as playBoard };
        let useStand_21: boolean;
        export { useStand_21 as useStand };
        let playerOptions_21: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_21 as playerOptions };
    }
    namespace sanshaShogiLeft {
        let name_22: string;
        export { name_22 as name };
        let variant_22: string;
        export { variant_22 as variant };
        let url_22: string;
        export { url_22 as url };
        let desc_22: string;
        export { desc_22 as desc };
        let playBoard_22: string;
        export { playBoard_22 as playBoard };
        let useStand_22: boolean;
        export { useStand_22 as useStand };
        let playerOptions_22: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_22 as playerOptions };
    }
    namespace sanshaShogiRight {
        let name_23: string;
        export { name_23 as name };
        let variant_23: string;
        export { variant_23 as variant };
        let url_23: string;
        export { url_23 as url };
        let desc_23: string;
        export { desc_23 as desc };
        let playBoard_23: string;
        export { playBoard_23 as playBoard };
        let useStand_23: boolean;
        export { useStand_23 as useStand };
        let playerOptions_23: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_23 as playerOptions };
    }
    namespace doShogiLeft {
        let name_24: string;
        export { name_24 as name };
        let variant_24: string;
        export { variant_24 as variant };
        let url_24: string;
        export { url_24 as url };
        let desc_24: string;
        export { desc_24 as desc };
        let playBoard_24: string;
        export { playBoard_24 as playBoard };
        let useStand_24: boolean;
        export { useStand_24 as useStand };
        let playerOptions_24: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_24 as playerOptions };
    }
    namespace doShogiRight {
        let name_25: string;
        export { name_25 as name };
        let variant_25: string;
        export { variant_25 as variant };
        let url_25: string;
        export { url_25 as url };
        let desc_25: string;
        export { desc_25 as desc };
        let playBoard_25: string;
        export { playBoard_25 as playBoard };
        let useStand_25: boolean;
        export { useStand_25 as useStand };
        let playerOptions_25: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_25 as playerOptions };
    }
    namespace kinshiShogiLeft {
        let name_26: string;
        export { name_26 as name };
        let variant_26: string;
        export { variant_26 as variant };
        let url_26: string;
        export { url_26 as url };
        let desc_26: string;
        export { desc_26 as desc };
        let playBoard_26: string;
        export { playBoard_26 as playBoard };
        let useStand_26: boolean;
        export { useStand_26 as useStand };
        let playerOptions_26: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_26 as playerOptions };
    }
    namespace kinshiShogiRight {
        let name_27: string;
        export { name_27 as name };
        let variant_27: string;
        export { variant_27 as variant };
        let url_27: string;
        export { url_27 as url };
        let desc_27: string;
        export { desc_27 as desc };
        let playBoard_27: string;
        export { playBoard_27 as playBoard };
        let useStand_27: boolean;
        export { useStand_27 as useStand };
        let playerOptions_27: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_27 as playerOptions };
    }
    namespace kintoShogiLeft {
        let name_28: string;
        export { name_28 as name };
        let variant_28: string;
        export { variant_28 as variant };
        let url_28: string;
        export { url_28 as url };
        let desc_28: string;
        export { desc_28 as desc };
        let playBoard_28: string;
        export { playBoard_28 as playBoard };
        let useStand_28: boolean;
        export { useStand_28 as useStand };
        let playerOptions_28: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_28 as playerOptions };
    }
    namespace kintoShogiRight {
        let name_29: string;
        export { name_29 as name };
        let variant_29: string;
        export { variant_29 as variant };
        let url_29: string;
        export { url_29 as url };
        let desc_29: string;
        export { desc_29 as desc };
        let playBoard_29: string;
        export { playBoard_29 as playBoard };
        let useStand_29: boolean;
        export { useStand_29 as useStand };
        let playerOptions_29: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_29 as playerOptions };
    }
    namespace shogi30AllLeft {
        let name_30: string;
        export { name_30 as name };
        let variant_30: string;
        export { variant_30 as variant };
        let url_30: string;
        export { url_30 as url };
        let desc_30: string;
        export { desc_30 as desc };
        let playBoard_30: string;
        export { playBoard_30 as playBoard };
        let useStand_30: boolean;
        export { useStand_30 as useStand };
        let playerOptions_30: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_30 as playerOptions };
    }
    namespace shogi30AllRight {
        let name_31: string;
        export { name_31 as name };
        let variant_31: string;
        export { variant_31 as variant };
        let url_31: string;
        export { url_31 as url };
        let desc_31: string;
        export { desc_31 as desc };
        let playBoard_31: string;
        export { playBoard_31 as playBoard };
        let useStand_31: boolean;
        export { useStand_31 as useStand };
        let playerOptions_31: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_31 as playerOptions };
    }
    namespace okisakiShogi {
        let name_32: string;
        export { name_32 as name };
        let variant_32: string;
        export { variant_32 as variant };
        let url_32: string;
        export { url_32 as url };
        let desc_32: string;
        export { desc_32 as desc };
        let playBoard_32: string;
        export { playBoard_32 as playBoard };
        let useStand_32: boolean;
        export { useStand_32 as useStand };
        let playerOptions_32: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_32 as playerOptions };
    }
    namespace crazyHouse {
        let name_33: string;
        export { name_33 as name };
        let variant_33: string;
        export { variant_33 as variant };
        let url_33: string;
        export { url_33 as url };
        let desc_33: string;
        export { desc_33 as desc };
        let playBoard_33: string;
        export { playBoard_33 as playBoard };
        let useStand_33: boolean;
        export { useStand_33 as useStand };
        let playerOptions_33: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_33 as playerOptions };
    }
    namespace losAlamosChess {
        let name_34: string;
        export { name_34 as name };
        let variant_34: string;
        export { variant_34 as variant };
        let url_34: string;
        export { url_34 as url };
        let desc_34: string;
        export { desc_34 as desc };
        let playBoard_34: string;
        export { playBoard_34 as playBoard };
        let useStand_34: boolean;
        export { useStand_34 as useStand };
        let playerOptions_34: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_34 as playerOptions };
    }
    namespace capablancaChess {
        let name_35: string;
        export { name_35 as name };
        let variant_35: string;
        export { variant_35 as variant };
        let url_35: string;
        export { url_35 as url };
        let desc_35: string;
        export { desc_35 as desc };
        let playBoard_35: string;
        export { playBoard_35 as playBoard };
        let useStand_35: boolean;
        export { useStand_35 as useStand };
        let playerOptions_35: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_35 as playerOptions };
    }
    namespace grandChess {
        let name_36: string;
        export { name_36 as name };
        let variant_36: string;
        export { variant_36 as variant };
        let url_36: string;
        export { url_36 as url };
        let desc_36: string;
        export { desc_36 as desc };
        let playBoard_36: string;
        export { playBoard_36 as playBoard };
        let useStand_36: boolean;
        export { useStand_36 as useStand };
        let playerOptions_36: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_36 as playerOptions };
    }
    namespace gorogoroDobutsuShogi {
        let name_37: string;
        export { name_37 as name };
        let variant_37: string;
        export { variant_37 as variant };
        let url_37: string;
        export { url_37 as url };
        let desc_37: string;
        export { desc_37 as desc };
        let playBoard_37: string;
        export { playBoard_37 as playBoard };
        let useStand_37: boolean;
        export { useStand_37 as useStand };
        let playerOptions_37: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_37 as playerOptions };
    }
    namespace shishiShogi {
        let name_38: string;
        export { name_38 as name };
        let variant_38: string;
        export { variant_38 as variant };
        let url_38: string;
        export { url_38 as url };
        let desc_38: string;
        export { desc_38 as desc };
        let playBoard_38: string;
        export { playBoard_38 as playBoard };
        let useStand_38: boolean;
        export { useStand_38 as useStand };
        let playerOptions_38: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_38 as playerOptions };
    }
    namespace heiseiShogi {
        let name_39: string;
        export { name_39 as name };
        let variant_39: string;
        export { variant_39 as variant };
        let url_39: string;
        export { url_39 as url };
        let desc_39: string;
        export { desc_39 as desc };
        let playBoard_39: string;
        export { playBoard_39 as playBoard };
        let useStand_39: boolean;
        export { useStand_39 as useStand };
        let playerOptions_39: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_39 as playerOptions };
    }
    namespace daiShogi {
        let name_40: string;
        export { name_40 as name };
        let variant_40: string;
        export { variant_40 as variant };
        let url_40: string;
        export { url_40 as url };
        let desc_40: string;
        export { desc_40 as desc };
        let playBoard_40: string;
        export { playBoard_40 as playBoard };
        let useStand_40: boolean;
        export { useStand_40 as useStand };
        let playerOptions_40: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_40 as playerOptions };
    }
    namespace courierChess {
        let name_41: string;
        export { name_41 as name };
        let variant_41: string;
        export { variant_41 as variant };
        let url_41: string;
        export { url_41 as url };
        let desc_41: string;
        export { desc_41 as desc };
        let playBoard_41: string;
        export { playBoard_41 as playBoard };
        let useStand_41: boolean;
        export { useStand_41 as useStand };
        let playerOptions_41: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_41 as playerOptions };
    }
    namespace p4Shogi {
        let name_42: string;
        export { name_42 as name };
        let variant_42: string;
        export { variant_42 as variant };
        let url_42: string;
        export { url_42 as url };
        let desc_42: string;
        export { desc_42 as desc };
        let playBoard_42: string;
        export { playBoard_42 as playBoard };
        let useStand_42: boolean;
        export { useStand_42 as useStand };
        let playerOptions_42: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_42 as playerOptions };
    }
    namespace p4Chess {
        let name_43: string;
        export { name_43 as name };
        let variant_43: string;
        export { variant_43 as variant };
        let url_43: string;
        export { url_43 as url };
        let desc_43: string;
        export { desc_43 as desc };
        let playBoard_43: string;
        export { playBoard_43 as playBoard };
        let useStand_43: boolean;
        export { useStand_43 as useStand };
        let playerOptions_43: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_43 as playerOptions };
    }
    namespace g4Shogi {
        let name_44: string;
        export { name_44 as name };
        let variant_44: string;
        export { variant_44 as variant };
        let url_44: string;
        export { url_44 as url };
        let desc_44: string;
        export { desc_44 as desc };
        let playBoard_44: string;
        export { playBoard_44 as playBoard };
        let useStand_44: boolean;
        export { useStand_44 as useStand };
        let playerOptions_44: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_44 as playerOptions };
    }
    namespace chaturaji {
        let name_45: string;
        export { name_45 as name };
        let variant_45: string;
        export { variant_45 as variant };
        let url_45: string;
        export { url_45 as url };
        let desc_45: string;
        export { desc_45 as desc };
        let playBoard_45: string;
        export { playBoard_45 as playBoard };
        let useStand_45: boolean;
        export { useStand_45 as useStand };
        let playerOptions_45: {
            gameName: string;
            pieceSet: string;
        }[];
        export { playerOptions_45 as playerOptions };
    }
}
declare namespace _ {
    namespace 将棋 {
        let english: string;
        let fontColor: string;
        let backgroundColor: string;
        let promoLine: number;
        let position: {
            5: {
                default: string[];
                "2p": string[];
            };
            7: {
                禽将棋: string[];
            };
            8: {
                default: string[];
                "2p": string[];
                平安将棋: string[];
            };
            9: {
                default: string[];
                "2p": string[];
                "\u5C0F\u4EAC\u5C06\u68CB(\u5DE6\u7F6E\u63DB)": string[];
                "\u5C0F\u4EAC\u5C06\u68CB(\u5DE6\u7F6E\u63DB)2p": string[];
                "\u5C0F\u4EAC\u5C06\u68CB(\u53F3\u7F6E\u63DB)": string[];
                "\u5C0F\u4EAC\u5C06\u68CB(\u53F3\u7F6E\u63DB)2p": string[];
                "\u5C71\u8ECA\u5C06\u68CB(\u5DE6\u7F6E\u63DB)": string[];
                "\u5C71\u8ECA\u5C06\u68CB(\u5DE6\u7F6E\u63DB)2p": string[];
                "\u5C71\u8ECA\u5C06\u68CB(\u53F3\u7F6E\u63DB)": string[];
                "\u5C71\u8ECA\u5C06\u68CB(\u53F3\u7F6E\u63DB)2p": string[];
                "\u9285\u5C06\u68CB(\u5DE6\u7F6E\u63DB)": string[];
                "\u9285\u5C06\u68CB(\u5DE6\u7F6E\u63DB)2p": string[];
                "\u9285\u5C06\u68CB(\u53F3\u7F6E\u63DB)": string[];
                "\u9285\u5C06\u68CB(\u53F3\u7F6E\u63DB)2p": string[];
                "\u91D1\u7FC5\u5C06\u68CB(\u5DE6\u7F6E\u63DB)": string[];
                "\u91D1\u7FC5\u5C06\u68CB(\u5DE6\u7F6E\u63DB)2p": string[];
                "\u91D1\u7FC5\u5C06\u68CB(\u53F3\u7F6E\u63DB)": string[];
                "\u91D1\u7FC5\u5C06\u68CB(\u53F3\u7F6E\u63DB)2p": string[];
                "\u91D1\u6597\u5C06\u68CB(\u5DE6\u7F6E\u63DB)": string[];
                "\u91D1\u6597\u5C06\u68CB(\u5DE6\u7F6E\u63DB)2p": string[];
                "\u91D1\u6597\u5C06\u68CB(\u53F3\u7F6E\u63DB)": string[];
                "\u91D1\u6597\u5C06\u68CB(\u53F3\u7F6E\u63DB)2p": string[];
                "\u5C06\u68CB30++(\u5DE6\u7CFB\u30D5\u30EB\u7F6E\u63DB)": string[];
                "\u5C06\u68CB30++(\u5DE6\u7CFB\u30D5\u30EB\u7F6E\u63DB)2p": string[];
                "\u5C06\u68CB30++(\u53F3\u7CFB\u30D5\u30EB\u7F6E\u63DB)": string[];
                "\u5C06\u68CB30++(\u53F3\u7CFB\u30D5\u30EB\u7F6E\u63DB)2p": string[];
                小将棋: string[];
                小将棋2p: string[];
                獅子将棋: string[];
                獅子将棋2p: string[];
                禽将棋: string[];
                p4: string[];
                平安将棋: string[];
            };
            10: {
                "\u4EAC\u5C06\u68CB(\u5DE6\u4EAC\u914D\u7F6E)": string[];
                "\u4EAC\u5C06\u68CB(\u5DE6\u4EAC\u914D\u7F6E)2p": string[];
                "\u4EAC\u5C06\u68CB(\u53F3\u4EAC\u914D\u7F6E)": string[];
                "\u4EAC\u5C06\u68CB(\u53F3\u4EAC\u914D\u7F6E)2p": string[];
                平成将棋: string[];
                平成将棋2p: string[];
                御妃将棋: string[];
                御妃将棋2p: string[];
            };
            11: {
                和将棋: string[];
            };
            12: {
                中将棋: string[];
                中将棋2p: string[];
            };
            14: {
                p4: string[];
            };
            15: {
                p4: string[];
                大将棋: string[];
                大将棋2p: string[];
            };
            17: {
                p4: string[];
            };
        };
    }
    namespace チェス {
        let english_1: string;
        export { english_1 as english };
        let fontColor_1: string;
        export { fontColor_1 as fontColor };
        let backgroundColor_1: string;
        export { backgroundColor_1 as backgroundColor };
        let promoLine_1: number;
        export { promoLine_1 as promoLine };
        let position_1: {
            6: {
                default: string[];
                "2p": string[];
            };
            8: {
                default: string[];
                "2p": string[];
            };
            9: {
                default: string[];
                "2p": string[];
            };
            10: {
                カパブランカチェス: string[];
                カパブランカチェス2p: string[];
                グランドチェス: string[];
                グランドチェス2p: string[];
            };
            12: {
                GrantAcedrex: string[];
                GrantAcedrex2p: string[];
                "\u30AF\u30FC\u30EA\u30A8\u30C1\u30A7\u30B9(\u521D\u671F\u914D\u7F6E)": string[];
                "\u30AF\u30FC\u30EA\u30A8\u30C1\u30A7\u30B9(\u521D\u671F\u914D\u7F6E)2p": string[];
                "\u30AF\u30FC\u30EA\u30A8\u30C1\u30A7\u30B9(\u5B9A\u5F62\u914D\u7F6E)": string[];
                "\u30AF\u30FC\u30EA\u30A8\u30C1\u30A7\u30B9(\u5B9A\u5F62\u914D\u7F6E)2p": string[];
            };
            14: {
                p4: string[];
            };
            15: {
                p4: string[];
            };
            17: {
                p4: string[];
            };
        };
        export { position_1 as position };
    }
    namespace シャンチー {
        let english_2: string;
        export { english_2 as english };
        let fontColor_2: string;
        export { fontColor_2 as fontColor };
        let backgroundColor_2: string;
        export { backgroundColor_2 as backgroundColor };
        let promoLine_2: number;
        export { promoLine_2 as promoLine };
        let position_2: {
            8: {
                default: string[];
                "2p": string[];
            };
            9: {
                default: string[];
                "2p": string[];
            };
            14: {
                p4: string[];
            };
            15: {
                p4: string[];
            };
            17: {
                p4: string[];
            };
        };
        export { position_2 as position };
    }
    namespace チャンギ {
        let english_3: string;
        export { english_3 as english };
        let fontColor_3: string;
        export { fontColor_3 as fontColor };
        let backgroundColor_3: string;
        export { backgroundColor_3 as backgroundColor };
        let position_3: {
            8: {
                default: string[];
                "2p": string[];
                左象配置: string[];
                左象配置2p: string[];
                右象配置: string[];
                右象配置2p: string[];
                外象配置: string[];
                外象配置2p: string[];
            };
            9: {
                default: string[];
                "2p": string[];
                左象配置: string[];
                左象配置2p: string[];
                右象配置: string[];
                右象配置2p: string[];
                外象配置: string[];
                外象配置2p: string[];
            };
            14: {
                p4: string[];
            };
            15: {
                p4: string[];
            };
            17: {
                p4: string[];
            };
        };
        export { position_3 as position };
    }
    namespace マークルック {
        let english_4: string;
        export { english_4 as english };
        let fontColor_4: string;
        export { fontColor_4 as fontColor };
        let backgroundColor_4: string;
        export { backgroundColor_4 as backgroundColor };
        let promoLine_3: number;
        export { promoLine_3 as promoLine };
        let position_4: {
            8: {
                default: string[];
                "2p": string[];
            };
            9: {
                default: string[];
                "2p": string[];
            };
            14: {
                p4: string[];
            };
            15: {
                p4: string[];
            };
            17: {
                p4: string[];
            };
        };
        export { position_4 as position };
    }
    namespace チャトランガ {
        let english_5: string;
        export { english_5 as english };
        let fontColor_5: string;
        export { fontColor_5 as fontColor };
        let backgroundColor_5: string;
        export { backgroundColor_5 as backgroundColor };
        let promoLine_4: number;
        export { promoLine_4 as promoLine };
        let position_5: {
            8: {
                default: string[];
                "2p": string[];
                p4: string[];
            };
            9: {
                default: string[];
                "2p": string[];
            };
            14: {
                p4: string[];
            };
            15: {
                p4: string[];
            };
            17: {
                p4: string[];
            };
        };
        export { position_5 as position };
    }
    namespace どうぶつしょうぎ {
        let english_6: string;
        export { english_6 as english };
        let fontColor_6: string;
        export { fontColor_6 as fontColor };
        let backgroundColor_6: string;
        export { backgroundColor_6 as backgroundColor };
        let promoLine_5: number;
        export { promoLine_5 as promoLine };
        let position_6: {
            3: {
                default: string[];
            };
            5: {
                default: string[];
            };
        };
        export { position_6 as position };
    }
}
declare const J: {
    S: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    s: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        attr: string[];
    };
    X: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    M: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    W: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    B: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    w: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        attr: string[];
    };
    b: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        attr: string[];
    };
    "+": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        intersect: boolean;
    };
    $: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    D: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    4: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    d: {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    "=": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
    };
    "[": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        displayText: string;
        textRotate: number;
    };
    "]": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        displayText: string;
        textRotate: number;
    };
    "#": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        attr: string[];
    };
    "<": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        borderSlashLeft: boolean;
        attr: string[];
    };
    ">": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        borderSlashRight: boolean;
        attr: string[];
    };
    "*": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        borderSlashLeft: boolean;
        borderSlashRight: boolean;
        attr: string[];
    };
    ".": {
        name: string;
        text: string;
        backgroundColor: string;
        borderColor: string;
        attr: string[];
    };
};
declare namespace Z {
    let 女: number;
    let 獅: number;
    let 后: number;
    let 駆: number;
    let 奔: number;
    let 駮: number;
    let 鴻: number;
    let 飛: number;
    let 竜: number;
    let 碼: number;
    let 塔: number;
    let 車: number;
    let 雲: number;
    let 俥: number;
    let 船: number;
    let 戦: number;
    let 豕: number;
    let 角: number;
    let 跳: number;
    let 砦: number;
    let 狐: number;
    let 犀: number;
    let 醉: number;
    let 鷹: number;
    let 鷙: number;
    let 翅: number;
    let 斗: number;
    let 返: number;
    let 師: number;
    let 麟: number;
    let 鶉: number;
    let 享: number;
    let 兎: number;
    let 聖: number;
    let 騎: number;
    let 瑪: number;
    let 午: number;
    let 金: number;
    let い: number;
    let 横: number;
    let 竪: number;
    let 麒: number;
    let 鳳: number;
    let 鶴: number;
    let 鰐: number;
    let 使: number;
    let 賢: number;
    let 羽: number;
    let 銀: number;
    let 炮: number;
    let ね: number;
    let 反: number;
    let 虎: number;
    let 瀧: number;
    let 丑: number;
    let 包: number;
    let 像: number;
    let 舟: number;
    let 釡: number;
    let 雉: number;
    let 射: number;
    let 狽: number;
    let 風: number;
    let 根: number;
    let 狼: number;
    let 艮: number;
    let 麁: number;
    let 桂: number;
    let 京: number;
    let 銅: number;
    let 山: number;
    let 馮: number;
    let 馭: number;
    let 馨: number;
    let 猛: number;
    let 犇: number;
    let 犬: number;
    let 香: number;
    let 種: number;
    let き: number;
    let ぞ: number;
    let 臣: number;
    let 佯: number;
    let 妾: number;
    let 同: number;
    let 猫: number;
    let 嗔: number;
    let 鳫: number;
    let 猿: number;
    let 鶏: number;
    let 象: number;
    let 士: number;
    let 鴟: number;
    let 烏: number;
    let 仲: number;
    let 相: number;
    let 仕: number;
    let 卆: number;
    let 鉄: number;
    let 歩: number;
    let 兵: number;
    let 浜: number;
    let ひ: number;
    let 燕: number;
    let 石: number;
    let 雀: number;
    let 丘: number;
    let 梹: number;
    let 鋲: number;
    let 貝: number;
    let 卒: number;
    let 火: number;
    let 天: number;
    let 矢: number;
    let 木: number;
    let 本: number;
    let 大: number;
    let 央: number;
    let ラ: number;
    let 鵬: number;
    let 玉: number;
    let ら: number;
    let 王: number;
    let 国: number;
    let 呈: number;
    let 閏: number;
    let 君: number;
    let 主: number;
    let 霍: number;
    let 楚: number;
    let 帥: number;
}
declare namespace ae {
    export let 〇: string[];
    let 歩_1: string[];
    export { 歩_1 as 歩 };
    let 兵_1: string[];
    export { 兵_1 as 兵 };
    export let 二: string[];
    let 烏_1: string[];
    export { 烏_1 as 烏 };
    export let 通: string[];
    export let 弐: string[];
    let 卒_1: string[];
    export { 卒_1 as 卒 };
    export let 鴈: string[];
    let 仲_1: string[];
    export { 仲_1 as 仲 };
    let 鉄_1: string[];
    export { 鉄_1 as 鉄 };
    let 桂_1: string[];
    export { 桂_1 as 桂 };
    let 京_1: string[];
    export { 京_1 as 京 };
    let 騎_1: string[];
    export { 騎_1 as 騎 };
    export let 騰: string[];
    let 馮_1: string[];
    export { 馮_1 as 馮 };
    let 雉_1: string[];
    export { 雉_1 as 雉 };
    let 師_1: string[];
    export { 師_1 as 師 };
    let 犀_1: string[];
    export { 犀_1 as 犀 };
    let ぞ_1: string[];
    export { ぞ_1 as ぞ };
    let 銀_1: string[];
    export { 銀_1 as 銀 };
    let 像_1: string[];
    export { 像_1 as 像 };
    let 相_1: string[];
    export { 相_1 as 相 };
    let 象_1: string[];
    export { 象_1 as 象 };
    let 麒_1: string[];
    export { 麒_1 as 麒 };
    let 鳳_1: string[];
    export { 鳳_1 as 鳳 };
    let 聖_1: string[];
    export { 聖_1 as 聖 };
    let 鷙_1: string[];
    export { 鷙_1 as 鷙 };
    let 麟_1: string[];
    export { 麟_1 as 麟 };
    let 瀧_1: string[];
    export { 瀧_1 as 瀧 };
    let き_1: string[];
    export { き_1 as き };
    let 香_1: string[];
    export { 香_1 as 香 };
    let 車_1: string[];
    export { 車_1 as 車 };
    export let 砲: string[];
    export let 弓: string[];
    let 反_1: string[];
    export { 反_1 as 反 };
    let 風_1: string[];
    export { 風_1 as 風 };
    let 鶉_1: string[];
    export { 鶉_1 as 鶉 };
    let 享_1: string[];
    export { 享_1 as 享 };
    let 横_1: string[];
    export { 横_1 as 横 };
    let 竪_1: string[];
    export { 竪_1 as 竪 };
    export let 延: string[];
    let 丑_1: string[];
    export { 丑_1 as 丑 };
    let 山_1: string[];
    export { 山_1 as 山 };
    let 兎_1: string[];
    export { 兎_1 as 兎 };
    let 鴻_1: string[];
    export { 鴻_1 as 鴻 };
    let 金_1: string[];
    export { 金_1 as 金 };
    let 銅_1: string[];
    export { 銅_1 as 銅 };
    export let 馬: string[];
    let 竜_1: string[];
    export { 竜_1 as 竜 };
    let 醉_1: string[];
    export { 醉_1 as 醉 };
    let 后_1: string[];
    export { 后_1 as 后 };
    let 駆_1: string[];
    export { 駆_1 as 駆 };
    let 駮_1: string[];
    export { 駮_1 as 駮 };
    export let 雕: string[];
    let 鶏_1: string[];
    export { 鶏_1 as 鶏 };
    let 犬_1: string[];
    export { 犬_1 as 犬 };
    let 猛_1: string[];
    export { 猛_1 as 猛 };
    let 虎_1: string[];
    export { 虎_1 as 虎 };
    let 獅_1: string[];
    export { 獅_1 as 獅 };
    export let 駒: string[];
    export let 鯨: string[];
    export let 鹿: string[];
    export let 鷄: string[];
    export let 猪: string[];
    export let 牛: string[];
    export let 鷂: string[];
    export let 鷲: string[];
    let 狼_1: string[];
    export { 狼_1 as 狼 };
    let 翅_1: string[];
    export { 翅_1 as 翅 };
    let 斗_1: string[];
    export { 斗_1 as 斗 };
    let 王_1: string[];
    export { 王_1 as 王 };
    let 狐_1: string[];
    export { 狐_1 as 狐 };
    let 雲_1: string[];
    export { 雲_1 as 雲 };
    export let 城: string[];
    let 国_1: string[];
    export { 国_1 as 国 };
    let 塔_1: string[];
    export { 塔_1 as 塔 };
    let 呈_1: string[];
    export { 呈_1 as 呈 };
}
declare namespace K {
    export namespace 歩_2 {
        let name_46: string;
        export { name_46 as name };
        export let display: string[];
        export let gameName: string;
        export let unit: string;
        export let attr: string[];
        export let forcePromoLine: number;
        export namespace range {
            let _default: string;
            export { _default as default };
        }
        export let promo: string;
    }
    export { 歩_2 as 歩 };
    export namespace 桂_2 {
        let name_47: string;
        export { name_47 as name };
        let display_1: string[];
        export { display_1 as display };
        let gameName_1: string;
        export { gameName_1 as gameName };
        let unit_1: string;
        export { unit_1 as unit };
        let attr_1: string[];
        export { attr_1 as attr };
        let forcePromoLine_1: number;
        export { forcePromoLine_1 as forcePromoLine };
        export namespace range_1 {
            let _default_1: string;
            export { _default_1 as default };
        }
        export { range_1 as range };
        let promo_1: string;
        export { promo_1 as promo };
    }
    export { 桂_2 as 桂 };
    export namespace 銀_2 {
        let name_48: string;
        export { name_48 as name };
        let display_2: string[];
        export { display_2 as display };
        let gameName_2: string;
        export { gameName_2 as gameName };
        let unit_2: string;
        export { unit_2 as unit };
        let attr_2: string[];
        export { attr_2 as attr };
        export namespace range_2 {
            let _default_2: string;
            export { _default_2 as default };
        }
        export { range_2 as range };
        let promo_2: string;
        export { promo_2 as promo };
    }
    export { 銀_2 as 銀 };
    export namespace 角_1 {
        let name_49: string;
        export { name_49 as name };
        let display_3: string[];
        export { display_3 as display };
        let gameName_3: string;
        export { gameName_3 as gameName };
        let unit_3: string;
        export { unit_3 as unit };
        let attr_3: string[];
        export { attr_3 as attr };
        export namespace range_3 {
            let _default_3: string;
            export { _default_3 as default };
        }
        export { range_3 as range };
        let promo_3: string;
        export { promo_3 as promo };
    }
    export { 角_1 as 角 };
    export namespace 香_2 {
        let name_50: string;
        export { name_50 as name };
        let display_4: string[];
        export { display_4 as display };
        let gameName_4: string;
        export { gameName_4 as gameName };
        let unit_4: string;
        export { unit_4 as unit };
        let attr_4: string[];
        export { attr_4 as attr };
        let forcePromoLine_2: number;
        export { forcePromoLine_2 as forcePromoLine };
        export namespace range_4 {
            let _default_4: string;
            export { _default_4 as default };
        }
        export { range_4 as range };
        let promo_4: string;
        export { promo_4 as promo };
    }
    export { 香_2 as 香 };
    export namespace 飛_1 {
        let name_51: string;
        export { name_51 as name };
        let display_5: string[];
        export { display_5 as display };
        let gameName_5: string;
        export { gameName_5 as gameName };
        let unit_5: string;
        export { unit_5 as unit };
        let attr_5: string[];
        export { attr_5 as attr };
        export namespace range_5 {
            let _default_5: string;
            export { _default_5 as default };
        }
        export { range_5 as range };
        let promo_5: string;
        export { promo_5 as promo };
    }
    export { 飛_1 as 飛 };
    export namespace 金_2 {
        let name_52: string;
        export { name_52 as name };
        let display_6: string[];
        export { display_6 as display };
        let gameName_6: string;
        export { gameName_6 as gameName };
        let unit_6: string;
        export { unit_6 as unit };
        let attr_6: string[];
        export { attr_6 as attr };
        export namespace range_6 {
            let _default_6: string;
            export { _default_6 as default };
        }
        export { range_6 as range };
    }
    export { 金_2 as 金 };
    export namespace 玉_1 {
        let name_53: string;
        export { name_53 as name };
        let display_7: string[];
        export { display_7 as display };
        export let alias: string;
        let gameName_7: string;
        export { gameName_7 as gameName };
        let unit_7: string;
        export { unit_7 as unit };
        let attr_7: string[];
        export { attr_7 as attr };
        export namespace range_7 {
            let _default_7: string;
            export { _default_7 as default };
        }
        export { range_7 as range };
    }
    export { 玉_1 as 玉 };
    export namespace 兵_2 {
        let name_54: string;
        export { name_54 as name };
        let display_8: string[];
        export { display_8 as display };
        let gameName_8: string;
        export { gameName_8 as gameName };
        let unit_8: string;
        export { unit_8 as unit };
        let attr_8: string[];
        export { attr_8 as attr };
        let forcePromoLine_3: number;
        export { forcePromoLine_3 as forcePromoLine };
        export namespace range_8 {
            let _default_8: string;
            export { _default_8 as default };
            export let start: string;
            export let attack: string;
            export let enPassant: string;
        }
        export { range_8 as range };
        let promo_6: string;
        export { promo_6 as promo };
    }
    export { 兵_2 as 兵 };
    export namespace 騎_2 {
        let name_55: string;
        export { name_55 as name };
        let display_9: string[];
        export { display_9 as display };
        let gameName_9: string;
        export { gameName_9 as gameName };
        let unit_9: string;
        export { unit_9 as unit };
        export namespace range_9 {
            let _default_9: string;
            export { _default_9 as default };
        }
        export { range_9 as range };
    }
    export { 騎_2 as 騎 };
    export namespace 聖_2 {
        let name_56: string;
        export { name_56 as name };
        let display_10: string[];
        export { display_10 as display };
        let gameName_10: string;
        export { gameName_10 as gameName };
        let unit_10: string;
        export { unit_10 as unit };
        export namespace range_10 {
            let _default_10: string;
            export { _default_10 as default };
        }
        export { range_10 as range };
    }
    export { 聖_2 as 聖 };
    export namespace 塔_2 {
        let name_57: string;
        export { name_57 as name };
        let display_11: string[];
        export { display_11 as display };
        let gameName_11: string;
        export { gameName_11 as gameName };
        let unit_11: string;
        export { unit_11 as unit };
        let attr_9: string[];
        export { attr_9 as attr };
        export namespace range_11 {
            let _default_11: string;
            export { _default_11 as default };
            export let castling: string;
        }
        export { range_11 as range };
    }
    export { 塔_2 as 塔 };
    export namespace 后_2 {
        let name_58: string;
        export { name_58 as name };
        let display_12: string[];
        export { display_12 as display };
        let gameName_12: string;
        export { gameName_12 as gameName };
        let unit_12: string;
        export { unit_12 as unit };
        export namespace range_12 {
            let _default_12: string;
            export { _default_12 as default };
        }
        export { range_12 as range };
    }
    export { 后_2 as 后 };
    export namespace 王_2 {
        let name_59: string;
        export { name_59 as name };
        let display_13: string[];
        export { display_13 as display };
        let alias_1: string;
        export { alias_1 as alias };
        let gameName_13: string;
        export { gameName_13 as gameName };
        let unit_13: string;
        export { unit_13 as unit };
        let attr_10: string[];
        export { attr_10 as attr };
        export namespace range_13 {
            let _default_13: string;
            export { _default_13 as default };
            let castling_1: string;
            export { castling_1 as castling };
        }
        export { range_13 as range };
    }
    export { 王_2 as 王 };
    export namespace 卒_2 {
        let name_60: string;
        export { name_60 as name };
        let display_14: string[];
        export { display_14 as display };
        let gameName_14: string;
        export { gameName_14 as gameName };
        let unit_14: string;
        export { unit_14 as unit };
        let forcePromoLine_4: number;
        export { forcePromoLine_4 as forcePromoLine };
        export namespace range_14 {
            let _default_14: string;
            export { _default_14 as default };
        }
        export { range_14 as range };
        let promo_7: string;
        export { promo_7 as promo };
    }
    export { 卒_2 as 卒 };
    export namespace 炮_1 {
        let name_61: string;
        export { name_61 as name };
        let display_15: string[];
        export { display_15 as display };
        let alias_2: string;
        export { alias_2 as alias };
        let gameName_15: string;
        export { gameName_15 as gameName };
        let unit_15: string;
        export { unit_15 as unit };
        let attr_11: string[];
        export { attr_11 as attr };
        export namespace range_15 {
            let _default_15: string;
            export { _default_15 as default };
            let attack_1: string;
            export { attack_1 as attack };
        }
        export { range_15 as range };
    }
    export { 炮_1 as 炮 };
    export namespace 馮_2 {
        let name_62: string;
        export { name_62 as name };
        let display_16: string[];
        export { display_16 as display };
        let alias_3: string;
        export { alias_3 as alias };
        let gameName_16: string;
        export { gameName_16 as gameName };
        let unit_16: string;
        export { unit_16 as unit };
        export namespace range_16 {
            let _default_16: string;
            export { _default_16 as default };
        }
        export { range_16 as range };
    }
    export { 馮_2 as 馮 };
    export namespace 相_2 {
        let name_63: string;
        export { name_63 as name };
        let display_17: string[];
        export { display_17 as display };
        let gameName_17: string;
        export { gameName_17 as gameName };
        let unit_17: string;
        export { unit_17 as unit };
        let attr_12: string[];
        export { attr_12 as attr };
        export namespace range_17 {
            let _default_17: string;
            export { _default_17 as default };
        }
        export { range_17 as range };
    }
    export { 相_2 as 相 };
    export namespace 俥_1 {
        let name_64: string;
        export { name_64 as name };
        let display_18: string[];
        export { display_18 as display };
        let gameName_18: string;
        export { gameName_18 as gameName };
        let unit_18: string;
        export { unit_18 as unit };
        export namespace range_18 {
            let _default_18: string;
            export { _default_18 as default };
        }
        export { range_18 as range };
    }
    export { 俥_1 as 俥 };
    export namespace 仕_1 {
        let name_65: string;
        export { name_65 as name };
        let display_19: string[];
        export { display_19 as display };
        let gameName_19: string;
        export { gameName_19 as gameName };
        let unit_19: string;
        export { unit_19 as unit };
        let attr_13: string[];
        export { attr_13 as attr };
        export namespace range_19 {
            let palaceSlash: string;
        }
        export { range_19 as range };
    }
    export { 仕_1 as 仕 };
    export namespace 帥_1 {
        let name_66: string;
        export { name_66 as name };
        let display_20: string[];
        export { display_20 as display };
        let alias_4: string;
        export { alias_4 as alias };
        let gameName_20: string;
        export { gameName_20 as gameName };
        let unit_20: string;
        export { unit_20 as unit };
        let attr_14: string[];
        export { attr_14 as attr };
        export namespace range_20 {
            let _default_19: string;
            export { _default_19 as default };
        }
        export { range_20 as range };
    }
    export { 帥_1 as 帥 };
    export namespace 卆_1 {
        let name_67: string;
        export { name_67 as name };
        let display_21: string[];
        export { display_21 as display };
        let gameName_21: string;
        export { gameName_21 as gameName };
        let unit_21: string;
        export { unit_21 as unit };
        export namespace range_21 {
            let _default_20: string;
            export { _default_20 as default };
            let palaceSlash_1: string;
            export { palaceSlash_1 as palaceSlash };
        }
        export { range_21 as range };
    }
    export { 卆_1 as 卆 };
    export namespace 包_1 {
        let name_68: string;
        export { name_68 as name };
        let display_22: string[];
        export { display_22 as display };
        let gameName_22: string;
        export { gameName_22 as gameName };
        let unit_22: string;
        export { unit_22 as unit };
        let attr_15: string[];
        export { attr_15 as attr };
        export namespace range_22 {
            let _default_21: string;
            export { _default_21 as default };
            let palaceSlash_2: string;
            export { palaceSlash_2 as palaceSlash };
        }
        export { range_22 as range };
    }
    export { 包_1 as 包 };
    export namespace 馭_1 {
        let name_69: string;
        export { name_69 as name };
        let display_23: string[];
        export { display_23 as display };
        let alias_5: string;
        export { alias_5 as alias };
        let gameName_23: string;
        export { gameName_23 as gameName };
        let unit_23: string;
        export { unit_23 as unit };
        export namespace range_23 {
            let _default_22: string;
            export { _default_22 as default };
        }
        export { range_23 as range };
    }
    export { 馭_1 as 馭 };
    export namespace 象_2 {
        let name_70: string;
        export { name_70 as name };
        let display_24: string[];
        export { display_24 as display };
        let gameName_24: string;
        export { gameName_24 as gameName };
        let unit_24: string;
        export { unit_24 as unit };
        export namespace range_24 {
            let _default_23: string;
            export { _default_23 as default };
        }
        export { range_24 as range };
    }
    export { 象_2 as 象 };
    export namespace 車_2 {
        let name_71: string;
        export { name_71 as name };
        let display_25: string[];
        export { display_25 as display };
        let alias_6: string;
        export { alias_6 as alias };
        let gameName_25: string;
        export { gameName_25 as gameName };
        let unit_25: string;
        export { unit_25 as unit };
        export namespace range_25 {
            let _default_24: string;
            export { _default_24 as default };
            let palaceSlash_3: string;
            export { palaceSlash_3 as palaceSlash };
        }
        export { range_25 as range };
    }
    export { 車_2 as 車 };
    export namespace 士_1 {
        let name_72: string;
        export { name_72 as name };
        let display_26: string[];
        export { display_26 as display };
        let gameName_26: string;
        export { gameName_26 as gameName };
        let unit_26: string;
        export { unit_26 as unit };
        let attr_16: string[];
        export { attr_16 as attr };
        export namespace range_26 {
            let _default_25: string;
            export { _default_25 as default };
            let palaceSlash_4: string;
            export { palaceSlash_4 as palaceSlash };
        }
        export { range_26 as range };
    }
    export { 士_1 as 士 };
    export namespace 楚_1 {
        let name_73: string;
        export { name_73 as name };
        let display_27: string[];
        export { display_27 as display };
        let alias_7: string;
        export { alias_7 as alias };
        let gameName_27: string;
        export { gameName_27 as gameName };
        let unit_27: string;
        export { unit_27 as unit };
        let attr_17: string[];
        export { attr_17 as attr };
        export namespace range_27 {
            let _default_26: string;
            export { _default_26 as default };
            let palaceSlash_5: string;
            export { palaceSlash_5 as palaceSlash };
        }
        export { range_27 as range };
    }
    export { 楚_1 as 楚 };
    export namespace 貝_1 {
        let name_74: string;
        export { name_74 as name };
        let display_28: string[];
        export { display_28 as display };
        let gameName_28: string;
        export { gameName_28 as gameName };
        let unit_28: string;
        export { unit_28 as unit };
        let forcePromoLine_5: number;
        export { forcePromoLine_5 as forcePromoLine };
        export namespace range_28 {
            let _default_27: string;
            export { _default_27 as default };
            let attack_2: string;
            export { attack_2 as attack };
        }
        export { range_28 as range };
        let promo_8: string;
        export { promo_8 as promo };
    }
    export { 貝_1 as 貝 };
    export namespace 瑪_1 {
        let name_75: string;
        export { name_75 as name };
        let display_29: string[];
        export { display_29 as display };
        let gameName_29: string;
        export { gameName_29 as gameName };
        let unit_29: string;
        export { unit_29 as unit };
        export namespace range_29 {
            let _default_28: string;
            export { _default_28 as default };
        }
        export { range_29 as range };
    }
    export { 瑪_1 as 瑪 };
    export namespace 根_1 {
        let name_76: string;
        export { name_76 as name };
        let display_30: string[];
        export { display_30 as display };
        let gameName_30: string;
        export { gameName_30 as gameName };
        let unit_30: string;
        export { unit_30 as unit };
        export namespace range_30 {
            let _default_29: string;
            export { _default_29 as default };
        }
        export { range_30 as range };
    }
    export { 根_1 as 根 };
    export namespace 船_1 {
        let name_77: string;
        export { name_77 as name };
        let display_31: string[];
        export { display_31 as display };
        let gameName_31: string;
        export { gameName_31 as gameName };
        let unit_31: string;
        export { unit_31 as unit };
        export namespace range_31 {
            let _default_30: string;
            export { _default_30 as default };
        }
        export { range_31 as range };
    }
    export { 船_1 as 船 };
    export namespace 種_1 {
        let name_78: string;
        export { name_78 as name };
        let display_32: string[];
        export { display_32 as display };
        let gameName_32: string;
        export { gameName_32 as gameName };
        let unit_32: string;
        export { unit_32 as unit };
        export namespace range_32 {
            let _default_31: string;
            export { _default_31 as default };
            let start_1: string;
            export { start_1 as start };
        }
        export { range_32 as range };
    }
    export { 種_1 as 種 };
    export namespace 君_1 {
        let name_79: string;
        export { name_79 as name };
        let gameName_33: string;
        export { gameName_33 as gameName };
        let display_33: string[];
        export { display_33 as display };
        let alias_8: string;
        export { alias_8 as alias };
        let unit_33: string;
        export { unit_33 as unit };
        let attr_18: string[];
        export { attr_18 as attr };
        export namespace range_33 {
            let _default_32: string;
            export { _default_32 as default };
        }
        export { range_33 as range };
    }
    export { 君_1 as 君 };
    export namespace 火_1 {
        let name_80: string;
        export { name_80 as name };
        let display_34: string[];
        export { display_34 as display };
        let gameName_34: string;
        export { gameName_34 as gameName };
        let unit_34: string;
        export { unit_34 as unit };
        let forcePromoLine_6: number;
        export { forcePromoLine_6 as forcePromoLine };
        export namespace range_34 {
            let _default_33: string;
            export { _default_33 as default };
            let attack_3: string;
            export { attack_3 as attack };
        }
        export { range_34 as range };
        let promo_9: string;
        export { promo_9 as promo };
    }
    export { 火_1 as 火 };
    export namespace 天_1 {
        let name_81: string;
        export { name_81 as name };
        let display_35: string[];
        export { display_35 as display };
        let gameName_35: string;
        export { gameName_35 as gameName };
        let unit_35: string;
        export { unit_35 as unit };
        let forcePromoLine_7: number;
        export { forcePromoLine_7 as forcePromoLine };
        export namespace range_35 {
            let _default_34: string;
            export { _default_34 as default };
            let attack_4: string;
            export { attack_4 as attack };
        }
        export { range_35 as range };
        let promo_10: string;
        export { promo_10 as promo };
    }
    export { 天_1 as 天 };
    export namespace 木_1 {
        let name_82: string;
        export { name_82 as name };
        let display_36: string[];
        export { display_36 as display };
        let gameName_36: string;
        export { gameName_36 as gameName };
        let unit_36: string;
        export { unit_36 as unit };
        let forcePromoLine_8: number;
        export { forcePromoLine_8 as forcePromoLine };
        export namespace range_36 {
            let _default_35: string;
            export { _default_35 as default };
            let attack_5: string;
            export { attack_5 as attack };
        }
        export { range_36 as range };
        let promo_11: string;
        export { promo_11 as promo };
    }
    export { 木_1 as 木 };
    export namespace 大_1 {
        let name_83: string;
        export { name_83 as name };
        let display_37: string[];
        export { display_37 as display };
        let gameName_37: string;
        export { gameName_37 as gameName };
        let unit_37: string;
        export { unit_37 as unit };
        let forcePromoLine_9: number;
        export { forcePromoLine_9 as forcePromoLine };
        export namespace range_37 {
            let _default_36: string;
            export { _default_36 as default };
            let attack_6: string;
            export { attack_6 as attack };
        }
        export { range_37 as range };
        let promo_12: string;
        export { promo_12 as promo };
    }
    export { 大_1 as 大 };
    export namespace 央_1 {
        let name_84: string;
        export { name_84 as name };
        let display_38: string[];
        export { display_38 as display };
        let alias_9: string;
        export { alias_9 as alias };
        let gameName_38: string;
        export { gameName_38 as gameName };
        let unit_38: string;
        export { unit_38 as unit };
        let forcePromoLine_10: number;
        export { forcePromoLine_10 as forcePromoLine };
        export namespace range_38 {
            let _default_37: string;
            export { _default_37 as default };
            let attack_7: string;
            export { attack_7 as attack };
        }
        export { range_38 as range };
        let promo_13: string;
        export { promo_13 as promo };
    }
    export { 央_1 as 央 };
    export namespace 午_1 {
        let name_85: string;
        export { name_85 as name };
        let display_39: string[];
        export { display_39 as display };
        let gameName_39: string;
        export { gameName_39 as gameName };
        let unit_39: string;
        export { unit_39 as unit };
        export namespace range_39 {
            let _default_38: string;
            export { _default_38 as default };
        }
        export { range_39 as range };
    }
    export { 午_1 as 午 };
    export namespace 像_2 {
        let name_86: string;
        export { name_86 as name };
        let display_40: string[];
        export { display_40 as display };
        let gameName_40: string;
        export { gameName_40 as gameName };
        let unit_40: string;
        export { unit_40 as unit };
        export namespace range_40 {
            let _default_39: string;
            export { _default_39 as default };
        }
        export { range_40 as range };
    }
    export { 像_2 as 像 };
    export namespace 戦_1 {
        let name_87: string;
        export { name_87 as name };
        let display_41: string[];
        export { display_41 as display };
        let gameName_41: string;
        export { gameName_41 as gameName };
        let unit_41: string;
        export { unit_41 as unit };
        export namespace range_41 {
            let _default_40: string;
            export { _default_40 as default };
        }
        export { range_41 as range };
    }
    export { 戦_1 as 戦 };
    export namespace 臣_1 {
        let name_88: string;
        export { name_88 as name };
        let display_42: string[];
        export { display_42 as display };
        let gameName_42: string;
        export { gameName_42 as gameName };
        let unit_42: string;
        export { unit_42 as unit };
        export namespace range_42 {
            let _default_41: string;
            export { _default_41 as default };
        }
        export { range_42 as range };
    }
    export { 臣_1 as 臣 };
    export namespace 主_1 {
        let name_89: string;
        export { name_89 as name };
        let gameName_43: string;
        export { gameName_43 as gameName };
        let display_43: string[];
        export { display_43 as display };
        let alias_10: string;
        export { alias_10 as alias };
        let unit_43: string;
        export { unit_43 as unit };
        let attr_19: string[];
        export { attr_19 as attr };
        export namespace range_43 {
            let _default_42: string;
            export { _default_42 as default };
        }
        export { range_43 as range };
    }
    export { 主_1 as 主 };
    export namespace ひ_1 {
        let name_90: string;
        export { name_90 as name };
        let display_44: string[];
        export { display_44 as display };
        let gameName_44: string;
        export { gameName_44 as gameName };
        let unit_44: string;
        export { unit_44 as unit };
        let attr_20: string[];
        export { attr_20 as attr };
        let forcePromoLine_11: number;
        export { forcePromoLine_11 as forcePromoLine };
        export namespace range_44 {
            let _default_43: string;
            export { _default_43 as default };
        }
        export { range_44 as range };
        let promo_14: string;
        export { promo_14 as promo };
    }
    export { ひ_1 as ひ };
    export namespace ぞ_2 {
        let name_91: string;
        export { name_91 as name };
        let display_45: string[];
        export { display_45 as display };
        let gameName_45: string;
        export { gameName_45 as gameName };
        let unit_45: string;
        export { unit_45 as unit };
        let attr_21: string[];
        export { attr_21 as attr };
        export namespace range_45 {
            let _default_44: string;
            export { _default_44 as default };
        }
        export { range_45 as range };
    }
    export { ぞ_2 as ぞ };
    export namespace き_2 {
        let name_92: string;
        export { name_92 as name };
        let display_46: string[];
        export { display_46 as display };
        let gameName_46: string;
        export { gameName_46 as gameName };
        let unit_46: string;
        export { unit_46 as unit };
        let attr_22: string[];
        export { attr_22 as attr };
        export namespace range_46 {
            let _default_45: string;
            export { _default_45 as default };
        }
        export { range_46 as range };
    }
    export { き_2 as き };
    export namespace ラ_1 {
        let name_93: string;
        export { name_93 as name };
        let display_47: string[];
        export { display_47 as display };
        let gameName_47: string;
        export { gameName_47 as gameName };
        let unit_47: string;
        export { unit_47 as unit };
        let attr_23: string[];
        export { attr_23 as attr };
        export namespace range_47 {
            let _default_46: string;
            export { _default_46 as default };
        }
        export { range_47 as range };
    }
    export { ラ_1 as ラ };
    export namespace 燕_1 {
        let name_94: string;
        export { name_94 as name };
        let display_48: string[];
        export { display_48 as display };
        let gameName_48: string;
        export { gameName_48 as gameName };
        export let expansion: string;
        let unit_48: string;
        export { unit_48 as unit };
        let attr_24: string[];
        export { attr_24 as attr };
        let forcePromoLine_12: number;
        export { forcePromoLine_12 as forcePromoLine };
        export namespace range_48 {
            let _default_47: string;
            export { _default_47 as default };
        }
        export { range_48 as range };
        let promo_15: string;
        export { promo_15 as promo };
    }
    export { 燕_1 as 燕 };
    export namespace 雉_2 {
        let name_95: string;
        export { name_95 as name };
        let display_49: string[];
        export { display_49 as display };
        let gameName_49: string;
        export { gameName_49 as gameName };
        let expansion_1: string;
        export { expansion_1 as expansion };
        let unit_49: string;
        export { unit_49 as unit };
        let attr_25: string[];
        export { attr_25 as attr };
        export namespace range_49 {
            let _default_48: string;
            export { _default_48 as default };
        }
        export { range_49 as range };
    }
    export { 雉_2 as 雉 };
    export namespace 鶴_1 {
        let name_96: string;
        export { name_96 as name };
        let display_50: string[];
        export { display_50 as display };
        let gameName_50: string;
        export { gameName_50 as gameName };
        let expansion_2: string;
        export { expansion_2 as expansion };
        let unit_50: string;
        export { unit_50 as unit };
        let attr_26: string[];
        export { attr_26 as attr };
        export namespace range_50 {
            let _default_49: string;
            export { _default_49 as default };
        }
        export { range_50 as range };
    }
    export { 鶴_1 as 鶴 };
    export namespace 鶉_2 {
        let name_97: string;
        export { name_97 as name };
        let display_51: string[];
        export { display_51 as display };
        let gameName_51: string;
        export { gameName_51 as gameName };
        let expansion_3: string;
        export { expansion_3 as expansion };
        let unit_51: string;
        export { unit_51 as unit };
        let attr_27: string[];
        export { attr_27 as attr };
        export namespace range_51 {
            let _default_50: string;
            export { _default_50 as default };
        }
        export { range_51 as range };
        let promo_16: string;
        export { promo_16 as promo };
    }
    export { 鶉_2 as 鶉 };
    export namespace 享_2 {
        let name_98: string;
        export { name_98 as name };
        let display_52: string[];
        export { display_52 as display };
        let gameName_52: string;
        export { gameName_52 as gameName };
        let expansion_4: string;
        export { expansion_4 as expansion };
        let unit_52: string;
        export { unit_52 as unit };
        let attr_28: string[];
        export { attr_28 as attr };
        export namespace range_52 {
            let _default_51: string;
            export { _default_51 as default };
        }
        export { range_52 as range };
        let promo_17: string;
        export { promo_17 as promo };
    }
    export { 享_2 as 享 };
    export namespace 鷹_1 {
        let name_99: string;
        export { name_99 as name };
        let display_53: string[];
        export { display_53 as display };
        let gameName_53: string;
        export { gameName_53 as gameName };
        let expansion_5: string;
        export { expansion_5 as expansion };
        let unit_53: string;
        export { unit_53 as unit };
        let attr_29: string[];
        export { attr_29 as attr };
        let forcePromoLine_13: number;
        export { forcePromoLine_13 as forcePromoLine };
        export namespace range_53 {
            let _default_52: string;
            export { _default_52 as default };
        }
        export { range_53 as range };
        let promo_18: string;
        export { promo_18 as promo };
    }
    export { 鷹_1 as 鷹 };
    export namespace 鵬_1 {
        let name_100: string;
        export { name_100 as name };
        let display_54: string[];
        export { display_54 as display };
        let gameName_54: string;
        export { gameName_54 as gameName };
        let expansion_6: string;
        export { expansion_6 as expansion };
        let unit_54: string;
        export { unit_54 as unit };
        let attr_30: string[];
        export { attr_30 as attr };
        export namespace range_54 {
            let _default_53: string;
            export { _default_53 as default };
        }
        export { range_54 as range };
    }
    export { 鵬_1 as 鵬 };
    export namespace 京_2 {
        let name_101: string;
        export { name_101 as name };
        let display_55: string[];
        export { display_55 as display };
        let gameName_55: string;
        export { gameName_55 as gameName };
        let expansion_7: string;
        export { expansion_7 as expansion };
        let unit_55: string;
        export { unit_55 as unit };
        let attr_31: string[];
        export { attr_31 as attr };
        let forcePromoLine_14: number;
        export { forcePromoLine_14 as forcePromoLine };
        export namespace range_55 {
            let _default_54: string;
            export { _default_54 as default };
        }
        export { range_55 as range };
        let promo_19: string;
        export { promo_19 as promo };
    }
    export { 京_2 as 京 };
    export namespace 銅_2 {
        let name_102: string;
        export { name_102 as name };
        let display_56: string[];
        export { display_56 as display };
        let gameName_56: string;
        export { gameName_56 as gameName };
        let expansion_8: string;
        export { expansion_8 as expansion };
        let unit_56: string;
        export { unit_56 as unit };
        let attr_32: string[];
        export { attr_32 as attr };
        export namespace range_56 {
            let _default_55: string;
            export { _default_55 as default };
        }
        export { range_56 as range };
        let promo_20: string;
        export { promo_20 as promo };
    }
    export { 銅_2 as 銅 };
    export namespace 山_2 {
        let name_103: string;
        export { name_103 as name };
        let display_57: string[];
        export { display_57 as display };
        let gameName_57: string;
        export { gameName_57 as gameName };
        let expansion_9: string;
        export { expansion_9 as expansion };
        let unit_57: string;
        export { unit_57 as unit };
        let attr_33: string[];
        export { attr_33 as attr };
        export namespace range_57 {
            let _default_56: string;
            export { _default_56 as default };
        }
        export { range_57 as range };
        let promo_21: string;
        export { promo_21 as promo };
    }
    export { 山_2 as 山 };
    export namespace 翅_2 {
        let name_104: string;
        export { name_104 as name };
        let display_58: string[];
        export { display_58 as display };
        let gameName_58: string;
        export { gameName_58 as gameName };
        let expansion_10: string;
        export { expansion_10 as expansion };
        let unit_58: string;
        export { unit_58 as unit };
        let attr_34: string[];
        export { attr_34 as attr };
        export namespace range_58 {
            let _default_57: string;
            export { _default_57 as default };
        }
        export { range_58 as range };
    }
    export { 翅_2 as 翅 };
    export namespace 斗_2 {
        let name_105: string;
        export { name_105 as name };
        let display_59: string[];
        export { display_59 as display };
        let gameName_59: string;
        export { gameName_59 as gameName };
        let expansion_11: string;
        export { expansion_11 as expansion };
        let unit_59: string;
        export { unit_59 as unit };
        let attr_35: string[];
        export { attr_35 as attr };
        export namespace range_59 {
            let _default_58: string;
            export { _default_58 as default };
        }
        export { range_59 as range };
    }
    export { 斗_2 as 斗 };
    export namespace 跳_1 {
        let name_106: string;
        export { name_106 as name };
        let display_60: string[];
        export { display_60 as display };
        let gameName_60: string;
        export { gameName_60 as gameName };
        let expansion_12: string;
        export { expansion_12 as expansion };
        let unit_60: string;
        export { unit_60 as unit };
        let attr_36: string[];
        export { attr_36 as attr };
        export namespace range_60 {
            let _default_59: string;
            export { _default_59 as default };
        }
        export { range_60 as range };
        let promo_22: string;
        export { promo_22 as promo };
    }
    export { 跳_1 as 跳 };
    export namespace 返_1 {
        let name_107: string;
        export { name_107 as name };
        let display_61: string[];
        export { display_61 as display };
        let gameName_61: string;
        export { gameName_61 as gameName };
        let expansion_13: string;
        export { expansion_13 as expansion };
        let unit_61: string;
        export { unit_61 as unit };
        let attr_37: string[];
        export { attr_37 as attr };
        export namespace range_61 {
            let _default_60: string;
            export { _default_60 as default };
        }
        export { range_61 as range };
        let promo_23: string;
        export { promo_23 as promo };
    }
    export { 返_1 as 返 };
    export namespace 女_1 {
        let name_108: string;
        export { name_108 as name };
        let display_62: string[];
        export { display_62 as display };
        let gameName_62: string;
        export { gameName_62 as gameName };
        let expansion_14: string;
        export { expansion_14 as expansion };
        let unit_62: string;
        export { unit_62 as unit };
        let attr_38: string[];
        export { attr_38 as attr };
        export namespace range_62 {
            let _default_61: string;
            export { _default_61 as default };
        }
        export { range_62 as range };
    }
    export { 女_1 as 女 };
    export namespace 醉_2 {
        let name_109: string;
        export { name_109 as name };
        let display_63: string[];
        export { display_63 as display };
        let expansion_15: string;
        export { expansion_15 as expansion };
        let gameName_63: string;
        export { gameName_63 as gameName };
        let unit_63: string;
        export { unit_63 as unit };
        let attr_39: string[];
        export { attr_39 as attr };
        export namespace range_63 {
            let _default_62: string;
            export { _default_62 as default };
        }
        export { range_63 as range };
        let promo_24: string;
        export { promo_24 as promo };
    }
    export { 醉_2 as 醉 };
    export namespace 丘_1 {
        let name_110: string;
        export { name_110 as name };
        let display_64: string[];
        export { display_64 as display };
        let gameName_64: string;
        export { gameName_64 as gameName };
        let expansion_16: string;
        export { expansion_16 as expansion };
        let unit_64: string;
        export { unit_64 as unit };
        let forcePromoLine_15: number;
        export { forcePromoLine_15 as forcePromoLine };
        export namespace range_64 {
            let _default_63: string;
            export { _default_63 as default };
            let attack_8: string;
            export { attack_8 as attack };
        }
        export { range_64 as range };
        let promo_25: string;
        export { promo_25 as promo };
    }
    export { 丘_1 as 丘 };
    export namespace 浜_1 {
        let name_111: string;
        export { name_111 as name };
        let display_65: string[];
        export { display_65 as display };
        let gameName_65: string;
        export { gameName_65 as gameName };
        let expansion_17: string;
        export { expansion_17 as expansion };
        let unit_65: string;
        export { unit_65 as unit };
        let attr_40: string[];
        export { attr_40 as attr };
        let forcePromoLine_16: number;
        export { forcePromoLine_16 as forcePromoLine };
        export namespace range_65 {
            let _default_64: string;
            export { _default_64 as default };
            let start_2: string;
            export { start_2 as start };
            let attack_9: string;
            export { attack_9 as attack };
        }
        export { range_65 as range };
        let promo_26: string;
        export { promo_26 as promo };
    }
    export { 浜_1 as 浜 };
    export namespace 駮_2 {
        let name_112: string;
        export { name_112 as name };
        let display_66: string[];
        export { display_66 as display };
        let gameName_66: string;
        export { gameName_66 as gameName };
        let expansion_18: string;
        export { expansion_18 as expansion };
        let unit_66: string;
        export { unit_66 as unit };
        export namespace range_66 {
            let _default_65: string;
            export { _default_65 as default };
        }
        export { range_66 as range };
    }
    export { 駮_2 as 駮 };
    export namespace 駆_2 {
        let name_113: string;
        export { name_113 as name };
        let display_67: string[];
        export { display_67 as display };
        let gameName_67: string;
        export { gameName_67 as gameName };
        let expansion_19: string;
        export { expansion_19 as expansion };
        let unit_67: string;
        export { unit_67 as unit };
        export namespace range_67 {
            let _default_66: string;
            export { _default_66 as default };
        }
        export { range_67 as range };
    }
    export { 駆_2 as 駆 };
    export namespace 国_2 {
        let name_114: string;
        export { name_114 as name };
        let display_68: string[];
        export { display_68 as display };
        let alias_11: string;
        export { alias_11 as alias };
        let gameName_68: string;
        export { gameName_68 as gameName };
        let expansion_20: string;
        export { expansion_20 as expansion };
        let unit_68: string;
        export { unit_68 as unit };
        let attr_41: string[];
        export { attr_41 as attr };
        export namespace range_68 {
            let _default_67: string;
            export { _default_67 as default };
            let castling_2: string;
            export { castling_2 as castling };
        }
        export { range_68 as range };
    }
    export { 国_2 as 国 };
    export namespace 矢_1 {
        let name_115: string;
        export { name_115 as name };
        let display_69: string[];
        export { display_69 as display };
        let gameName_69: string;
        export { gameName_69 as gameName };
        let expansion_21: string;
        export { expansion_21 as expansion };
        let unit_69: string;
        export { unit_69 as unit };
        let forcePromoLine_17: number;
        export { forcePromoLine_17 as forcePromoLine };
        export namespace range_69 {
            let _default_68: string;
            export { _default_68 as default };
            let attack_10: string;
            export { attack_10 as attack };
        }
        export { range_69 as range };
        let promo_27: string;
        export { promo_27 as promo };
    }
    export { 矢_1 as 矢 };
    export namespace 本_1 {
        let name_116: string;
        export { name_116 as name };
        let display_70: string[];
        export { display_70 as display };
        let gameName_70: string;
        export { gameName_70 as gameName };
        let expansion_22: string;
        export { expansion_22 as expansion };
        let unit_70: string;
        export { unit_70 as unit };
        let forcePromoLine_18: number;
        export { forcePromoLine_18 as forcePromoLine };
        export namespace range_70 {
            let _default_69: string;
            export { _default_69 as default };
            let attack_11: string;
            export { attack_11 as attack };
        }
        export { range_70 as range };
        let promo_28: string;
        export { promo_28 as promo };
    }
    export { 本_1 as 本 };
    export namespace 舟_1 {
        let name_117: string;
        export { name_117 as name };
        let display_71: string[];
        export { display_71 as display };
        let gameName_71: string;
        export { gameName_71 as gameName };
        let expansion_23: string;
        export { expansion_23 as expansion };
        let unit_71: string;
        export { unit_71 as unit };
        export namespace range_71 {
            let _default_70: string;
            export { _default_70 as default };
        }
        export { range_71 as range };
    }
    export { 舟_1 as 舟 };
    export namespace 豕_1 {
        let name_118: string;
        export { name_118 as name };
        let display_72: string[];
        export { display_72 as display };
        let gameName_72: string;
        export { gameName_72 as gameName };
        let expansion_24: string;
        export { expansion_24 as expansion };
        let unit_72: string;
        export { unit_72 as unit };
        export namespace range_72 {
            let _default_71: string;
            export { _default_71 as default };
        }
        export { range_72 as range };
    }
    export { 豕_1 as 豕 };
    export namespace ね_1 {
        let name_119: string;
        export { name_119 as name };
        let display_73: string[];
        export { display_73 as display };
        let gameName_73: string;
        export { gameName_73 as gameName };
        let expansion_25: string;
        export { expansion_25 as expansion };
        let unit_73: string;
        export { unit_73 as unit };
        let attr_42: string[];
        export { attr_42 as attr };
        export namespace range_73 {
            let _default_72: string;
            export { _default_72 as default };
        }
        export { range_73 as range };
        let promo_29: string;
        export { promo_29 as promo };
    }
    export { ね_1 as ね };
    export namespace い_1 {
        let name_120: string;
        export { name_120 as name };
        let display_74: string[];
        export { display_74 as display };
        let gameName_74: string;
        export { gameName_74 as gameName };
        let expansion_26: string;
        export { expansion_26 as expansion };
        let unit_74: string;
        export { unit_74 as unit };
        let attr_43: string[];
        export { attr_43 as attr };
        export namespace range_74 {
            let _default_73: string;
            export { _default_73 as default };
        }
        export { range_74 as range };
    }
    export { い_1 as い };
    export namespace ら_1 {
        let name_121: string;
        export { name_121 as name };
        let display_75: string[];
        export { display_75 as display };
        let gameName_75: string;
        export { gameName_75 as gameName };
        let expansion_27: string;
        export { expansion_27 as expansion };
        let unit_75: string;
        export { unit_75 as unit };
        let attr_44: string[];
        export { attr_44 as attr };
        export namespace range_75 {
            let _default_74: string;
            export { _default_74 as default };
        }
        export { range_75 as range };
    }
    export { ら_1 as ら };
    export namespace 仲_2 {
        let name_122: string;
        export { name_122 as name };
        let display_76: string[];
        export { display_76 as display };
        let gameName_76: string;
        export { gameName_76 as gameName };
        let expansion_28: string;
        export { expansion_28 as expansion };
        let unit_76: string;
        export { unit_76 as unit };
        export namespace range_76 {
            let _default_75: string;
            export { _default_75 as default };
        }
        export { range_76 as range };
        let promo_30: string;
        export { promo_30 as promo };
    }
    export { 仲_2 as 仲 };
    export namespace 同_1 {
        let name_123: string;
        export { name_123 as name };
        let display_77: string[];
        export { display_77 as display };
        let gameName_77: string;
        export { gameName_77 as gameName };
        let expansion_29: string;
        export { expansion_29 as expansion };
        let unit_77: string;
        export { unit_77 as unit };
        export namespace range_77 {
            let _default_76: string;
            export { _default_76 as default };
        }
        export { range_77 as range };
        let promo_31: string;
        export { promo_31 as promo };
    }
    export { 同_1 as 同 };
    export namespace 艮_1 {
        let name_124: string;
        export { name_124 as name };
        let display_78: string[];
        export { display_78 as display };
        let gameName_78: string;
        export { gameName_78 as gameName };
        let expansion_30: string;
        export { expansion_30 as expansion };
        let unit_78: string;
        export { unit_78 as unit };
        export namespace range_78 {
            let _default_77: string;
            export { _default_77 as default };
        }
        export { range_78 as range };
        let promo_32: string;
        export { promo_32 as promo };
    }
    export { 艮_1 as 艮 };
    export namespace 釡_1 {
        let name_125: string;
        export { name_125 as name };
        let display_79: string[];
        export { display_79 as display };
        let gameName_79: string;
        export { gameName_79 as gameName };
        let expansion_31: string;
        export { expansion_31 as expansion };
        let unit_79: string;
        export { unit_79 as unit };
        export namespace range_79 {
            let _default_78: string;
            export { _default_78 as default };
        }
        export { range_79 as range };
        let promo_33: string;
        export { promo_33 as promo };
    }
    export { 釡_1 as 釡 };
    export namespace 猛_2 {
        let name_126: string;
        export { name_126 as name };
        let display_80: string[];
        export { display_80 as display };
        let gameName_80: string;
        export { gameName_80 as gameName };
        let expansion_32: string;
        export { expansion_32 as expansion };
        let unit_80: string;
        export { unit_80 as unit };
        export namespace range_80 {
            let _default_79: string;
            export { _default_79 as default };
        }
        export { range_80 as range };
        let promo_34: string;
        export { promo_34 as promo };
    }
    export { 猛_2 as 猛 };
    export namespace 馨_1 {
        let name_127: string;
        export { name_127 as name };
        let display_81: string[];
        export { display_81 as display };
        let gameName_81: string;
        export { gameName_81 as gameName };
        let expansion_33: string;
        export { expansion_33 as expansion };
        let unit_81: string;
        export { unit_81 as unit };
        let forcePromoLine_19: number;
        export { forcePromoLine_19 as forcePromoLine };
        export namespace range_81 {
            let _default_80: string;
            export { _default_80 as default };
        }
        export { range_81 as range };
        let promo_35: string;
        export { promo_35 as promo };
    }
    export { 馨_1 as 馨 };
    export namespace 反_2 {
        let name_128: string;
        export { name_128 as name };
        let display_82: string[];
        export { display_82 as display };
        let gameName_82: string;
        export { gameName_82 as gameName };
        let expansion_34: string;
        export { expansion_34 as expansion };
        let unit_82: string;
        export { unit_82 as unit };
        export namespace range_82 {
            let _default_81: string;
            export { _default_81 as default };
        }
        export { range_82 as range };
        let promo_36: string;
        export { promo_36 as promo };
    }
    export { 反_2 as 反 };
    export namespace 虎_2 {
        let name_129: string;
        export { name_129 as name };
        let display_83: string[];
        export { display_83 as display };
        let gameName_83: string;
        export { gameName_83 as gameName };
        let expansion_35: string;
        export { expansion_35 as expansion };
        let unit_83: string;
        export { unit_83 as unit };
        export namespace range_83 {
            let _default_82: string;
            export { _default_82 as default };
        }
        export { range_83 as range };
        let promo_37: string;
        export { promo_37 as promo };
    }
    export { 虎_2 as 虎 };
    export namespace 麒_2 {
        let name_130: string;
        export { name_130 as name };
        let display_84: string[];
        export { display_84 as display };
        let gameName_84: string;
        export { gameName_84 as gameName };
        let expansion_36: string;
        export { expansion_36 as expansion };
        let unit_84: string;
        export { unit_84 as unit };
        export namespace range_84 {
            let _default_83: string;
            export { _default_83 as default };
        }
        export { range_84 as range };
        let promo_38: string;
        export { promo_38 as promo };
    }
    export { 麒_2 as 麒 };
    export namespace 鳳_2 {
        let name_131: string;
        export { name_131 as name };
        let display_85: string[];
        export { display_85 as display };
        let gameName_85: string;
        export { gameName_85 as gameName };
        let expansion_37: string;
        export { expansion_37 as expansion };
        let unit_85: string;
        export { unit_85 as unit };
        export namespace range_85 {
            let _default_84: string;
            export { _default_84 as default };
        }
        export { range_85 as range };
        let promo_39: string;
        export { promo_39 as promo };
    }
    export { 鳳_2 as 鳳 };
    export namespace 横_2 {
        let name_132: string;
        export { name_132 as name };
        let display_86: string[];
        export { display_86 as display };
        let gameName_86: string;
        export { gameName_86 as gameName };
        let expansion_38: string;
        export { expansion_38 as expansion };
        let unit_86: string;
        export { unit_86 as unit };
        export namespace range_86 {
            let _default_85: string;
            export { _default_85 as default };
        }
        export { range_86 as range };
        let promo_40: string;
        export { promo_40 as promo };
    }
    export { 横_2 as 横 };
    export namespace 竪_2 {
        let name_133: string;
        export { name_133 as name };
        let display_87: string[];
        export { display_87 as display };
        let gameName_87: string;
        export { gameName_87 as gameName };
        let expansion_39: string;
        export { expansion_39 as expansion };
        let unit_87: string;
        export { unit_87 as unit };
        export namespace range_87 {
            let _default_86: string;
            export { _default_86 as default };
        }
        export { range_87 as range };
        let promo_41: string;
        export { promo_41 as promo };
    }
    export { 竪_2 as 竪 };
    export namespace 碼_1 {
        let name_134: string;
        export { name_134 as name };
        let display_88: string[];
        export { display_88 as display };
        let gameName_88: string;
        export { gameName_88 as gameName };
        let expansion_40: string;
        export { expansion_40 as expansion };
        let unit_88: string;
        export { unit_88 as unit };
        export namespace range_88 {
            let _default_87: string;
            export { _default_87 as default };
        }
        export { range_88 as range };
        let promo_42: string;
        export { promo_42 as promo };
    }
    export { 碼_1 as 碼 };
    export namespace 竜_2 {
        let name_135: string;
        export { name_135 as name };
        let display_89: string[];
        export { display_89 as display };
        let gameName_89: string;
        export { gameName_89 as gameName };
        let expansion_41: string;
        export { expansion_41 as expansion };
        let unit_89: string;
        export { unit_89 as unit };
        export namespace range_89 {
            let _default_88: string;
            export { _default_88 as default };
        }
        export { range_89 as range };
        let promo_43: string;
        export { promo_43 as promo };
    }
    export { 竜_2 as 竜 };
    export namespace 奔_1 {
        let name_136: string;
        export { name_136 as name };
        let display_90: string[];
        export { display_90 as display };
        let gameName_90: string;
        export { gameName_90 as gameName };
        let expansion_42: string;
        export { expansion_42 as expansion };
        let unit_90: string;
        export { unit_90 as unit };
        export namespace range_90 {
            let _default_89: string;
            export { _default_89 as default };
        }
        export { range_90 as range };
    }
    export { 奔_1 as 奔 };
    export namespace 獅_2 {
        let name_137: string;
        export { name_137 as name };
        let display_91: string[];
        export { display_91 as display };
        let gameName_91: string;
        export { gameName_91 as gameName };
        let expansion_43: string;
        export { expansion_43 as expansion };
        let unit_91: string;
        export { unit_91 as unit };
        export namespace range_91 {
            let _default_90: string;
            export { _default_90 as default };
        }
        export { range_91 as range };
    }
    export { 獅_2 as 獅 };
    export namespace 石_1 {
        let name_138: string;
        export { name_138 as name };
        let display_92: string[];
        export { display_92 as display };
        let gameName_92: string;
        export { gameName_92 as gameName };
        let expansion_44: string;
        export { expansion_44 as expansion };
        let unit_92: string;
        export { unit_92 as unit };
        let forcePromoLine_20: number;
        export { forcePromoLine_20 as forcePromoLine };
        export namespace range_92 {
            let _default_91: string;
            export { _default_91 as default };
        }
        export { range_92 as range };
        let promo_44: string;
        export { promo_44 as promo };
    }
    export { 石_1 as 石 };
    export namespace 鉄_2 {
        let name_139: string;
        export { name_139 as name };
        let display_93: string[];
        export { display_93 as display };
        let alias_12: string;
        export { alias_12 as alias };
        let gameName_93: string;
        export { gameName_93 as gameName };
        let expansion_45: string;
        export { expansion_45 as expansion };
        let unit_93: string;
        export { unit_93 as unit };
        let forcePromoLine_21: number;
        export { forcePromoLine_21 as forcePromoLine };
        export namespace range_93 {
            let _default_92: string;
            export { _default_92 as default };
        }
        export { range_93 as range };
        let promo_45: string;
        export { promo_45 as promo };
    }
    export { 鉄_2 as 鉄 };
    export namespace 猫_1 {
        let name_140: string;
        export { name_140 as name };
        let display_94: string[];
        export { display_94 as display };
        let gameName_94: string;
        export { gameName_94 as gameName };
        let expansion_46: string;
        export { expansion_46 as expansion };
        let unit_94: string;
        export { unit_94 as unit };
        export namespace range_94 {
            let _default_93: string;
            export { _default_93 as default };
        }
        export { range_94 as range };
        let promo_46: string;
        export { promo_46 as promo };
    }
    export { 猫_1 as 猫 };
    export namespace 瀧_2 {
        let name_141: string;
        export { name_141 as name };
        let display_95: string[];
        export { display_95 as display };
        let gameName_95: string;
        export { gameName_95 as gameName };
        let expansion_47: string;
        export { expansion_47 as expansion };
        let unit_95: string;
        export { unit_95 as unit };
        export namespace range_95 {
            let _default_94: string;
            export { _default_94 as default };
        }
        export { range_95 as range };
        let promo_47: string;
        export { promo_47 as promo };
    }
    export { 瀧_2 as 瀧 };
    export namespace 嗔_1 {
        let name_142: string;
        export { name_142 as name };
        let display_96: string[];
        export { display_96 as display };
        let gameName_96: string;
        export { gameName_96 as gameName };
        let expansion_48: string;
        export { expansion_48 as expansion };
        let unit_96: string;
        export { unit_96 as unit };
        export namespace range_96 {
            let _default_95: string;
            export { _default_95 as default };
        }
        export { range_96 as range };
        let promo_48: string;
        export { promo_48 as promo };
    }
    export { 嗔_1 as 嗔 };
    export namespace 丑_2 {
        let name_143: string;
        export { name_143 as name };
        let display_97: string[];
        export { display_97 as display };
        let gameName_97: string;
        export { gameName_97 as gameName };
        let expansion_49: string;
        export { expansion_49 as expansion };
        let unit_97: string;
        export { unit_97 as unit };
        export namespace range_97 {
            let _default_96: string;
            export { _default_96 as default };
        }
        export { range_97 as range };
        let promo_49: string;
        export { promo_49 as promo };
    }
    export { 丑_2 as 丑 };
    export namespace 狼_2 {
        let name_144: string;
        export { name_144 as name };
        let display_98: string[];
        export { display_98 as display };
        let gameName_98: string;
        export { gameName_98 as gameName };
        let expansion_50: string;
        export { expansion_50 as expansion };
        let unit_98: string;
        export { unit_98 as unit };
        export namespace range_98 {
            let _default_97: string;
            export { _default_97 as default };
        }
        export { range_98 as range };
        let promo_50: string;
        export { promo_50 as promo };
    }
    export { 狼_2 as 狼 };
    export namespace 雀_1 {
        let name_145: string;
        export { name_145 as name };
        let display_99: string[];
        export { display_99 as display };
        let gameName_99: string;
        export { gameName_99 as gameName };
        let expansion_51: string;
        export { expansion_51 as expansion };
        let unit_99: string;
        export { unit_99 as unit };
        let forcePromoLine_22: number;
        export { forcePromoLine_22 as forcePromoLine };
        export namespace range_99 {
            let _default_98: string;
            export { _default_98 as default };
        }
        export { range_99 as range };
        let promo_51: string;
        export { promo_51 as promo };
    }
    export { 雀_1 as 雀 };
    export namespace 烏_2 {
        let name_146: string;
        export { name_146 as name };
        let display_100: string[];
        export { display_100 as display };
        let gameName_100: string;
        export { gameName_100 as gameName };
        let expansion_52: string;
        export { expansion_52 as expansion };
        let unit_100: string;
        export { unit_100 as unit };
        export namespace range_100 {
            let _default_99: string;
            export { _default_99 as default };
        }
        export { range_100 as range };
        let promo_52: string;
        export { promo_52 as promo };
    }
    export { 烏_2 as 烏 };
    export namespace 鴟_1 {
        let name_147: string;
        export { name_147 as name };
        let display_101: string[];
        export { display_101 as display };
        let gameName_101: string;
        export { gameName_101 as gameName };
        let expansion_53: string;
        export { expansion_53 as expansion };
        let unit_101: string;
        export { unit_101 as unit };
        export namespace range_101 {
            let _default_100: string;
            export { _default_100 as default };
        }
        export { range_101 as range };
        let promo_53: string;
        export { promo_53 as promo };
    }
    export { 鴟_1 as 鴟 };
    export namespace 鶏_2 {
        let name_148: string;
        export { name_148 as name };
        let display_102: string[];
        export { display_102 as display };
        let gameName_102: string;
        export { gameName_102 as gameName };
        let expansion_54: string;
        export { expansion_54 as expansion };
        let unit_102: string;
        export { unit_102 as unit };
        export namespace range_102 {
            let _default_101: string;
            export { _default_101 as default };
        }
        export { range_102 as range };
        let promo_54: string;
        export { promo_54 as promo };
    }
    export { 鶏_2 as 鶏 };
    export namespace 犬_2 {
        let name_149: string;
        export { name_149 as name };
        let display_103: string[];
        export { display_103 as display };
        let gameName_103: string;
        export { gameName_103 as gameName };
        let expansion_55: string;
        export { expansion_55 as expansion };
        let unit_103: string;
        export { unit_103 as unit };
        export namespace range_103 {
            let _default_102: string;
            export { _default_102 as default };
        }
        export { range_103 as range };
        let promo_55: string;
        export { promo_55 as promo };
    }
    export { 犬_2 as 犬 };
    export namespace 麁_1 {
        let name_150: string;
        export { name_150 as name };
        let display_104: string[];
        export { display_104 as display };
        let gameName_104: string;
        export { gameName_104 as gameName };
        let expansion_56: string;
        export { expansion_56 as expansion };
        let unit_104: string;
        export { unit_104 as unit };
        export namespace range_104 {
            let _default_103: string;
            export { _default_103 as default };
        }
        export { range_104 as range };
        let promo_56: string;
        export { promo_56 as promo };
    }
    export { 麁_1 as 麁 };
    export namespace 鷙_2 {
        let name_151: string;
        export { name_151 as name };
        let display_105: string[];
        export { display_105 as display };
        let gameName_105: string;
        export { gameName_105 as gameName };
        let expansion_57: string;
        export { expansion_57 as expansion };
        let unit_105: string;
        export { unit_105 as unit };
        export namespace range_105 {
            let _default_104: string;
            export { _default_104 as default };
        }
        export { range_105 as range };
        let promo_57: string;
        export { promo_57 as promo };
    }
    export { 鷙_2 as 鷙 };
    export namespace 犇_1 {
        let name_152: string;
        export { name_152 as name };
        let display_106: string[];
        export { display_106 as display };
        let gameName_106: string;
        export { gameName_106 as gameName };
        let expansion_58: string;
        export { expansion_58 as expansion };
        let unit_106: string;
        export { unit_106 as unit };
        let forcePromoLine_23: number;
        export { forcePromoLine_23 as forcePromoLine };
        export namespace range_106 {
            let _default_105: string;
            export { _default_105 as default };
        }
        export { range_106 as range };
        let promo_58: string;
        export { promo_58 as promo };
    }
    export { 犇_1 as 犇 };
    export namespace 風_2 {
        let name_153: string;
        export { name_153 as name };
        let display_107: string[];
        export { display_107 as display };
        let gameName_107: string;
        export { gameName_107 as gameName };
        let expansion_59: string;
        export { expansion_59 as expansion };
        let unit_107: string;
        export { unit_107 as unit };
        export namespace range_107 {
            let _default_106: string;
            export { _default_106 as default };
        }
        export { range_107 as range };
        let promo_59: string;
        export { promo_59 as promo };
    }
    export { 風_2 as 風 };
    export namespace 羽_1 {
        let name_154: string;
        export { name_154 as name };
        let display_108: string[];
        export { display_108 as display };
        let gameName_108: string;
        export { gameName_108 as gameName };
        let expansion_60: string;
        export { expansion_60 as expansion };
        let unit_108: string;
        export { unit_108 as unit };
        export namespace range_108 {
            let _default_107: string;
            export { _default_107 as default };
        }
        export { range_108 as range };
        let promo_60: string;
        export { promo_60 as promo };
    }
    export { 羽_1 as 羽 };
    export namespace 兎_2 {
        let name_155: string;
        export { name_155 as name };
        let display_109: string[];
        export { display_109 as display };
        let gameName_109: string;
        export { gameName_109 as gameName };
        let expansion_61: string;
        export { expansion_61 as expansion };
        let unit_109: string;
        export { unit_109 as unit };
        export namespace range_109 {
            let _default_108: string;
            export { _default_108 as default };
        }
        export { range_109 as range };
        let promo_61: string;
        export { promo_61 as promo };
    }
    export { 兎_2 as 兎 };
    export namespace 猿_1 {
        let name_156: string;
        export { name_156 as name };
        let display_110: string[];
        export { display_110 as display };
        let gameName_110: string;
        export { gameName_110 as gameName };
        let expansion_62: string;
        export { expansion_62 as expansion };
        let unit_110: string;
        export { unit_110 as unit };
        export namespace range_110 {
            let _default_109: string;
            export { _default_109 as default };
        }
        export { range_110 as range };
        let promo_62: string;
        export { promo_62 as promo };
    }
    export { 猿_1 as 猿 };
    export namespace 鳫_1 {
        let name_157: string;
        export { name_157 as name };
        let display_111: string[];
        export { display_111 as display };
        let gameName_111: string;
        export { gameName_111 as gameName };
        let expansion_63: string;
        export { expansion_63 as expansion };
        let unit_111: string;
        export { unit_111 as unit };
        export namespace range_111 {
            let _default_110: string;
            export { _default_110 as default };
        }
        export { range_111 as range };
        let promo_63: string;
        export { promo_63 as promo };
    }
    export { 鳫_1 as 鳫 };
    export namespace 狽_1 {
        let name_158: string;
        export { name_158 as name };
        let display_112: string[];
        export { display_112 as display };
        let gameName_112: string;
        export { gameName_112 as gameName };
        let expansion_64: string;
        export { expansion_64 as expansion };
        let unit_112: string;
        export { unit_112 as unit };
        export namespace range_112 {
            let _default_111: string;
            export { _default_111 as default };
        }
        export { range_112 as range };
        let promo_64: string;
        export { promo_64 as promo };
    }
    export { 狽_1 as 狽 };
    export namespace 狐_2 {
        let name_159: string;
        export { name_159 as name };
        let display_113: string[];
        export { display_113 as display };
        let gameName_113: string;
        export { gameName_113 as gameName };
        let expansion_65: string;
        export { expansion_65 as expansion };
        let unit_113: string;
        export { unit_113 as unit };
        export namespace range_113 {
            let _default_112: string;
            export { _default_112 as default };
        }
        export { range_113 as range };
    }
    export { 狐_2 as 狐 };
    export namespace 雲_2 {
        let name_160: string;
        export { name_160 as name };
        let display_114: string[];
        export { display_114 as display };
        let gameName_114: string;
        export { gameName_114 as gameName };
        let expansion_66: string;
        export { expansion_66 as expansion };
        let unit_114: string;
        export { unit_114 as unit };
        export namespace range_114 {
            let _default_113: string;
            export { _default_113 as default };
        }
        export { range_114 as range };
    }
    export { 雲_2 as 雲 };
    export namespace 霍_1 {
        let name_161: string;
        export { name_161 as name };
        let display_115: string[];
        export { display_115 as display };
        let alias_13: string;
        export { alias_13 as alias };
        let gameName_115: string;
        export { gameName_115 as gameName };
        let expansion_67: string;
        export { expansion_67 as expansion };
        let unit_115: string;
        export { unit_115 as unit };
        let attr_45: string[];
        export { attr_45 as attr };
        export namespace range_115 {
            let _default_114: string;
            export { _default_114 as default };
        }
        export { range_115 as range };
    }
    export { 霍_1 as 霍 };
    export namespace 梹_1 {
        let name_162: string;
        export { name_162 as name };
        let display_116: string[];
        export { display_116 as display };
        let gameName_116: string;
        export { gameName_116 as gameName };
        let expansion_68: string;
        export { expansion_68 as expansion };
        let unit_116: string;
        export { unit_116 as unit };
        let forcePromoLine_24: number;
        export { forcePromoLine_24 as forcePromoLine };
        export namespace range_116 {
            let _default_115: string;
            export { _default_115 as default };
            let attack_12: string;
            export { attack_12 as attack };
        }
        export { range_116 as range };
        let promo_65: string;
        export { promo_65 as promo };
    }
    export { 梹_1 as 梹 };
    export namespace 師_2 {
        let name_163: string;
        export { name_163 as name };
        let display_117: string[];
        export { display_117 as display };
        let gameName_117: string;
        export { gameName_117 as gameName };
        let expansion_69: string;
        export { expansion_69 as expansion };
        let unit_117: string;
        export { unit_117 as unit };
        export namespace range_117 {
            let _default_116: string;
            export { _default_116 as default };
        }
        export { range_117 as range };
    }
    export { 師_2 as 師 };
    export namespace 犀_2 {
        let name_164: string;
        export { name_164 as name };
        let display_118: string[];
        export { display_118 as display };
        let gameName_118: string;
        export { gameName_118 as gameName };
        let expansion_70: string;
        export { expansion_70 as expansion };
        let unit_118: string;
        export { unit_118 as unit };
        export namespace range_118 {
            let _default_117: string;
            export { _default_117 as default };
        }
        export { range_118 as range };
    }
    export { 犀_2 as 犀 };
    export namespace 麟_2 {
        let name_165: string;
        export { name_165 as name };
        let display_119: string[];
        export { display_119 as display };
        let gameName_119: string;
        export { gameName_119 as gameName };
        let expansion_71: string;
        export { expansion_71 as expansion };
        let unit_119: string;
        export { unit_119 as unit };
        export namespace range_119 {
            let _default_118: string;
            export { _default_118 as default };
        }
        export { range_119 as range };
    }
    export { 麟_2 as 麟 };
    export namespace 鰐_1 {
        let name_166: string;
        export { name_166 as name };
        let display_120: string[];
        export { display_120 as display };
        let gameName_120: string;
        export { gameName_120 as gameName };
        let expansion_72: string;
        export { expansion_72 as expansion };
        let unit_120: string;
        export { unit_120 as unit };
        export namespace range_120 {
            let _default_119: string;
            export { _default_119 as default };
        }
        export { range_120 as range };
    }
    export { 鰐_1 as 鰐 };
    export namespace 砦_1 {
        let name_167: string;
        export { name_167 as name };
        let display_121: string[];
        export { display_121 as display };
        let gameName_121: string;
        export { gameName_121 as gameName };
        let expansion_73: string;
        export { expansion_73 as expansion };
        let unit_121: string;
        export { unit_121 as unit };
        export namespace range_121 {
            let _default_120: string;
            export { _default_120 as default };
        }
        export { range_121 as range };
    }
    export { 砦_1 as 砦 };
    export namespace 鴻_2 {
        let name_168: string;
        export { name_168 as name };
        let display_122: string[];
        export { display_122 as display };
        let gameName_122: string;
        export { gameName_122 as gameName };
        let expansion_74: string;
        export { expansion_74 as expansion };
        let unit_122: string;
        export { unit_122 as unit };
        export namespace range_122 {
            let _default_121: string;
            export { _default_121 as default };
        }
        export { range_122 as range };
    }
    export { 鴻_2 as 鴻 };
    export namespace 呈_2 {
        let name_169: string;
        export { name_169 as name };
        let display_123: string[];
        export { display_123 as display };
        let alias_14: string;
        export { alias_14 as alias };
        let gameName_123: string;
        export { gameName_123 as gameName };
        let expansion_75: string;
        export { expansion_75 as expansion };
        let unit_123: string;
        export { unit_123 as unit };
        let attr_46: string[];
        export { attr_46 as attr };
        export namespace range_123 {
            let _default_122: string;
            export { _default_122 as default };
            let start_3: string;
            export { start_3 as start };
        }
        export { range_123 as range };
    }
    export { 呈_2 as 呈 };
    export namespace 鋲_1 {
        let name_170: string;
        export { name_170 as name };
        let display_124: string[];
        export { display_124 as display };
        let gameName_124: string;
        export { gameName_124 as gameName };
        let expansion_76: string;
        export { expansion_76 as expansion };
        let unit_124: string;
        export { unit_124 as unit };
        let forcePromoLine_25: number;
        export { forcePromoLine_25 as forcePromoLine };
        export namespace range_124 {
            let _default_123: string;
            export { _default_123 as default };
            let attack_13: string;
            export { attack_13 as attack };
        }
        export { range_124 as range };
        let promo_66: string;
        export { promo_66 as promo };
    }
    export { 鋲_1 as 鋲 };
    export namespace 射_1 {
        let name_171: string;
        export { name_171 as name };
        let display_125: string[];
        export { display_125 as display };
        let gameName_125: string;
        export { gameName_125 as gameName };
        let expansion_77: string;
        export { expansion_77 as expansion };
        let unit_125: string;
        export { unit_125 as unit };
        export namespace range_125 {
            let _default_124: string;
            export { _default_124 as default };
        }
        export { range_125 as range };
    }
    export { 射_1 as 射 };
    export namespace 使_1 {
        let name_172: string;
        export { name_172 as name };
        let display_126: string[];
        export { display_126 as display };
        let gameName_126: string;
        export { gameName_126 as gameName };
        let expansion_78: string;
        export { expansion_78 as expansion };
        let unit_126: string;
        export { unit_126 as unit };
        export namespace range_126 {
            let _default_125: string;
            export { _default_125 as default };
        }
        export { range_126 as range };
    }
    export { 使_1 as 使 };
    export namespace 佯_1 {
        let name_173: string;
        export { name_173 as name };
        let display_127: string[];
        export { display_127 as display };
        let gameName_127: string;
        export { gameName_127 as gameName };
        let expansion_79: string;
        export { expansion_79 as expansion };
        let unit_127: string;
        export { unit_127 as unit };
        export namespace range_127 {
            let _default_126: string;
            export { _default_126 as default };
        }
        export { range_127 as range };
    }
    export { 佯_1 as 佯 };
    export namespace 賢_1 {
        let name_174: string;
        export { name_174 as name };
        let display_128: string[];
        export { display_128 as display };
        let gameName_128: string;
        export { gameName_128 as gameName };
        let expansion_80: string;
        export { expansion_80 as expansion };
        let unit_128: string;
        export { unit_128 as unit };
        export namespace range_128 {
            let _default_127: string;
            export { _default_127 as default };
        }
        export { range_128 as range };
    }
    export { 賢_1 as 賢 };
    export namespace 妾_1 {
        let name_175: string;
        export { name_175 as name };
        let display_129: string[];
        export { display_129 as display };
        let gameName_129: string;
        export { gameName_129 as gameName };
        let expansion_81: string;
        export { expansion_81 as expansion };
        let unit_129: string;
        export { unit_129 as unit };
        export namespace range_129 {
            let _default_128: string;
            export { _default_128 as default };
        }
        export { range_129 as range };
    }
    export { 妾_1 as 妾 };
    export namespace 閏_1 {
        let name_176: string;
        export { name_176 as name };
        let display_130: string[];
        export { display_130 as display };
        let alias_15: string;
        export { alias_15 as alias };
        let gameName_130: string;
        export { gameName_130 as gameName };
        let expansion_82: string;
        export { expansion_82 as expansion };
        let unit_130: string;
        export { unit_130 as unit };
        let attr_47: string[];
        export { attr_47 as attr };
        export namespace range_130 {
            let _default_129: string;
            export { _default_129 as default };
        }
        export { range_130 as range };
    }
    export { 閏_1 as 閏 };
    export namespace と {
        let name_177: string;
        export { name_177 as name };
        let display_131: string[];
        export { display_131 as display };
        let alias_16: string;
        export { alias_16 as alias };
        let attr_48: string[];
        export { attr_48 as attr };
        export namespace range_131 {
            let _default_130: string;
            export { _default_130 as default };
        }
        export { range_131 as range };
    }
    export namespace 杏 {
        let name_178: string;
        export { name_178 as name };
        let display_132: string[];
        export { display_132 as display };
        let alias_17: string;
        export { alias_17 as alias };
        let attr_49: string[];
        export { attr_49 as attr };
        export namespace range_132 {
            let _default_131: string;
            export { _default_131 as default };
        }
        export { range_132 as range };
    }
    export namespace 圭 {
        let name_179: string;
        export { name_179 as name };
        let display_133: string[];
        export { display_133 as display };
        let alias_18: string;
        export { alias_18 as alias };
        let attr_50: string[];
        export { attr_50 as attr };
        export namespace range_133 {
            let _default_132: string;
            export { _default_132 as default };
        }
        export { range_133 as range };
    }
    export namespace 全 {
        let name_180: string;
        export { name_180 as name };
        let display_134: string[];
        export { display_134 as display };
        let attr_51: string[];
        export { attr_51 as attr };
        export namespace range_134 {
            let _default_133: string;
            export { _default_133 as default };
        }
        export { range_134 as range };
    }
    export namespace 馬_1 {
        let name_181: string;
        export { name_181 as name };
        let display_135: string[];
        export { display_135 as display };
        let attr_52: string[];
        export { attr_52 as attr };
        export namespace range_135 {
            let _default_134: string;
            export { _default_134 as default };
        }
        export { range_135 as range };
    }
    export { 馬_1 as 馬 };
    export namespace 龍 {
        let name_182: string;
        export { name_182 as name };
        let display_136: string[];
        export { display_136 as display };
        let attr_53: string[];
        export { attr_53 as attr };
        export namespace range_136 {
            let _default_135: string;
            export { _default_135 as default };
        }
        export { range_136 as range };
    }
    export namespace 妃 {
        let name_183: string;
        export { name_183 as name };
        let display_137: string[];
        export { display_137 as display };
        export namespace range_137 {
            let _default_136: string;
            export { _default_136 as default };
        }
        export { range_137 as range };
    }
    export namespace 騏 {
        let name_184: string;
        export { name_184 as name };
        let display_138: string[];
        export { display_138 as display };
        export namespace range_138 {
            let _default_137: string;
            export { _default_137 as default };
        }
        export { range_138 as range };
    }
    export namespace 城_1 {
        let name_185: string;
        export { name_185 as name };
        let display_139: string[];
        export { display_139 as display };
        export namespace range_139 {
            let _default_138: string;
            export { _default_138 as default };
        }
        export { range_139 as range };
    }
    export { 城_1 as 城 };
    export namespace 僧 {
        let name_186: string;
        export { name_186 as name };
        let display_140: string[];
        export { display_140 as display };
        export namespace range_140 {
            let _default_139: string;
            export { _default_139 as default };
        }
        export { range_140 as range };
    }
    export namespace 率 {
        let name_187: string;
        export { name_187 as name };
        let display_141: string[];
        export { display_141 as display };
        export namespace range_141 {
            let _default_140: string;
            export { _default_140 as default };
        }
        export { range_141 as range };
    }
    export namespace 貴 {
        let name_188: string;
        export { name_188 as name };
        let display_142: string[];
        export { display_142 as display };
        let alias_19: string;
        export { alias_19 as alias };
        export namespace range_142 {
            let _default_141: string;
            export { _default_141 as default };
        }
        export { range_142 as range };
    }
    export namespace 杵 {
        let name_189: string;
        export { name_189 as name };
        let display_143: string[];
        export { display_143 as display };
        export namespace range_143 {
            let _default_142: string;
            export { _default_142 as default };
        }
        export { range_143 as range };
    }
    export namespace 橡 {
        let name_190: string;
        export { name_190 as name };
        let display_144: string[];
        export { display_144 as display };
        export namespace range_144 {
            let _default_143: string;
            export { _default_143 as default };
        }
        export { range_144 as range };
    }
    export namespace 戰 {
        let name_191: string;
        export { name_191 as name };
        let display_145: string[];
        export { display_145 as display };
        export namespace range_145 {
            let _default_144: string;
            export { _default_144 as default };
        }
        export { range_145 as range };
    }
    export namespace 巨 {
        let name_192: string;
        export { name_192 as name };
        let display_146: string[];
        export { display_146 as display };
        export namespace range_146 {
            let _default_145: string;
            export { _default_145 as default };
        }
        export { range_146 as range };
    }
    export namespace 往 {
        let name_193: string;
        export { name_193 as name };
        let display_147: string[];
        export { display_147 as display };
        export namespace range_147 {
            let _default_146: string;
            export { _default_146 as default };
        }
        export { range_147 as range };
    }
    export namespace に {
        let name_194: string;
        export { name_194 as name };
        let display_148: string[];
        export { display_148 as display };
        let attr_54: string[];
        export { attr_54 as attr };
        export namespace range_148 {
            let _default_147: string;
            export { _default_147 as default };
        }
        export { range_148 as range };
    }
    export namespace 鴈_1 {
        let name_195: string;
        export { name_195 as name };
        let display_149: string[];
        export { display_149 as display };
        let attr_55: string[];
        export { attr_55 as attr };
        export namespace range_149 {
            let _default_148: string;
            export { _default_148 as default };
        }
        export { range_149 as range };
    }
    export { 鴈_1 as 鴈 };
    export namespace 左 {
        let name_196: string;
        export { name_196 as name };
        let display_150: string[];
        export { display_150 as display };
        let gameName_131: string;
        export { gameName_131 as gameName };
        let unit_131: string;
        export { unit_131 as unit };
        let attr_56: string[];
        export { attr_56 as attr };
        export namespace range_150 {
            let _default_149: string;
            export { _default_149 as default };
        }
        export { range_150 as range };
    }
    export namespace 右 {
        let name_197: string;
        export { name_197 as name };
        let display_151: string[];
        export { display_151 as display };
        let gameName_132: string;
        export { gameName_132 as gameName };
        let unit_132: string;
        export { unit_132 as unit };
        let attr_57: string[];
        export { attr_57 as attr };
        export namespace range_151 {
            let _default_150: string;
            export { _default_150 as default };
        }
        export { range_151 as range };
    }
    export namespace 雕_1 {
        let name_198: string;
        export { name_198 as name };
        let display_152: string[];
        export { display_152 as display };
        let alias_20: string;
        export { alias_20 as alias };
        let attr_58: string[];
        export { attr_58 as attr };
        export namespace range_152 {
            let _default_151: string;
            export { _default_151 as default };
        }
        export { range_152 as range };
    }
    export { 雕_1 as 雕 };
    export namespace 幾 {
        let name_199: string;
        export { name_199 as name };
        let display_153: string[];
        export { display_153 as display };
        let attr_59: string[];
        export { attr_59 as attr };
        export namespace range_153 {
            let _default_152: string;
            export { _default_152 as default };
        }
        export { range_153 as range };
    }
    export namespace う {
        let name_200: string;
        export { name_200 as name };
        let display_154: string[];
        export { display_154 as display };
        let attr_60: string[];
        export { attr_60 as attr };
        export namespace range_154 {
            let _default_153: string;
            export { _default_153 as default };
        }
        export { range_154 as range };
    }
    export namespace さ {
        let name_201: string;
        export { name_201 as name };
        let display_155: string[];
        export { display_155 as display };
        let attr_61: string[];
        export { attr_61 as attr };
        export namespace range_155 {
            let _default_154: string;
            export { _default_154 as default };
        }
        export { range_155 as range };
    }
    export namespace 太 {
        let name_202: string;
        export { name_202 as name };
        let display_156: string[];
        export { display_156 as display };
        let attr_62: string[];
        export { attr_62 as attr };
        export namespace range_156 {
            let _default_155: string;
            export { _default_155 as default };
        }
        export { range_156 as range };
    }
    export namespace 余 {
        let name_203: string;
        export { name_203 as name };
        let display_157: string[];
        export { display_157 as display };
        let attr_63: string[];
        export { attr_63 as attr };
        export namespace range_157 {
            let _default_156: string;
            export { _default_156 as default };
        }
        export { range_157 as range };
    }
    export namespace 含 {
        let name_204: string;
        export { name_204 as name };
        let display_158: string[];
        export { display_158 as display };
        let attr_64: string[];
        export { attr_64 as attr };
        export namespace range_158 {
            let _default_157: string;
            export { _default_157 as default };
        }
        export { range_158 as range };
    }
    export namespace 駁 {
        let name_205: string;
        export { name_205 as name };
        let display_159: string[];
        export { display_159 as display };
        export namespace range_159 {
            let _default_158: string;
            export { _default_158 as default };
        }
        export { range_159 as range };
    }
    export namespace 駈 {
        let name_206: string;
        export { name_206 as name };
        let display_160: string[];
        export { display_160 as display };
        export namespace range_160 {
            let _default_159: string;
            export { _default_159 as default };
        }
        export { range_160 as range };
    }
    export namespace 舶 {
        let name_207: string;
        export { name_207 as name };
        let display_161: string[];
        export { display_161 as display };
        export namespace range_161 {
            let _default_160: string;
            export { _default_160 as default };
        }
        export { range_161 as range };
    }
    export namespace 豪 {
        let name_208: string;
        export { name_208 as name };
        let display_162: string[];
        export { display_162 as display };
        export namespace range_162 {
            let _default_161: string;
            export { _default_161 as default };
        }
        export { range_162 as range };
    }
    export namespace ネ {
        let name_209: string;
        export { name_209 as name };
        let display_163: string[];
        export { display_163 as display };
        let attr_65: string[];
        export { attr_65 as attr };
        export namespace range_163 {
            let _default_162: string;
            export { _default_162 as default };
        }
        export { range_163 as range };
    }
    export namespace 升 {
        let name_210: string;
        export { name_210 as name };
        let display_164: string[];
        export { display_164 as display };
        export namespace range_164 {
            let _default_163: string;
            export { _default_163 as default };
        }
        export { range_164 as range };
    }
    export namespace 堅 {
        let name_211: string;
        export { name_211 as name };
        let display_165: string[];
        export { display_165 as display };
        export namespace range_165 {
            let _default_164: string;
            export { _default_164 as default };
        }
        export { range_165 as range };
    }
    export namespace 黄 {
        let name_212: string;
        export { name_212 as name };
        let display_166: string[];
        export { display_166 as display };
        export namespace range_166 {
            let _default_165: string;
            export { _default_165 as default };
        }
        export { range_166 as range };
    }
    export namespace 桷 {
        let name_213: string;
        export { name_213 as name };
        let display_167: string[];
        export { display_167 as display };
        export namespace range_167 {
            let _default_166: string;
            export { _default_166 as default };
        }
        export { range_167 as range };
    }
    export namespace 駒_1 {
        let name_214: string;
        export { name_214 as name };
        let display_168: string[];
        export { display_168 as display };
        export namespace range_168 {
            let _default_167: string;
            export { _default_167 as default };
        }
        export { range_168 as range };
    }
    export { 駒_1 as 駒 };
    export namespace 鯨_1 {
        let name_215: string;
        export { name_215 as name };
        let display_169: string[];
        export { display_169 as display };
        export namespace range_169 {
            let _default_168: string;
            export { _default_168 as default };
        }
        export { range_169 as range };
    }
    export { 鯨_1 as 鯨 };
    export namespace 鹿_1 {
        let name_216: string;
        export { name_216 as name };
        let display_170: string[];
        export { display_170 as display };
        export namespace range_170 {
            let _default_169: string;
            export { _default_169 as default };
        }
        export { range_170 as range };
    }
    export { 鹿_1 as 鹿 };
    export namespace 鰤 {
        let name_217: string;
        export { name_217 as name };
        let display_171: string[];
        export { display_171 as display };
        export namespace range_171 {
            let _default_170: string;
            export { _default_170 as default };
        }
        export { range_171 as range };
    }
    export namespace 卉 {
        let name_218: string;
        export { name_218 as name };
        let display_172: string[];
        export { display_172 as display };
        export namespace range_172 {
            let _default_171: string;
            export { _default_171 as default };
        }
        export { range_172 as range };
    }
    export namespace 酔 {
        let name_219: string;
        export { name_219 as name };
        let display_173: string[];
        export { display_173 as display };
        export namespace range_173 {
            let _default_172: string;
            export { _default_172 as default };
        }
        export { range_173 as range };
    }
    export namespace 猪_1 {
        let name_220: string;
        export { name_220 as name };
        let display_174: string[];
        export { display_174 as display };
        export namespace range_174 {
            let _default_173: string;
            export { _default_173 as default };
        }
        export { range_174 as range };
    }
    export { 猪_1 as 猪 };
    export namespace 牛_1 {
        let name_221: string;
        export { name_221 as name };
        let display_175: string[];
        export { display_175 as display };
        export namespace range_175 {
            let _default_174: string;
            export { _default_174 as default };
        }
        export { range_175 as range };
    }
    export { 牛_1 as 牛 };
    export namespace 鷂_1 {
        let name_222: string;
        export { name_222 as name };
        let display_176: string[];
        export { display_176 as display };
        export namespace range_176 {
            let _default_175: string;
            export { _default_175 as default };
        }
        export { range_176 as range };
    }
    export { 鷂_1 as 鷂 };
    export namespace 鷲_1 {
        let name_223: string;
        export { name_223 as name };
        let display_177: string[];
        export { display_177 as display };
        export namespace range_177 {
            let _default_176: string;
            export { _default_176 as default };
        }
        export { range_177 as range };
    }
    export { 鷲_1 as 鷲 };
    export namespace 鉐 {
        let name_224: string;
        export { name_224 as name };
        let display_178: string[];
        export { display_178 as display };
        export namespace range_178 {
            let _default_177: string;
            export { _default_177 as default };
        }
        export { range_178 as range };
    }
    export namespace 鋼 {
        let name_225: string;
        export { name_225 as name };
        let display_179: string[];
        export { display_179 as display };
        export namespace range_179 {
            let _default_178: string;
            export { _default_178 as default };
        }
        export { range_179 as range };
    }
    export namespace 錨 {
        let name_226: string;
        export { name_226 as name };
        let display_180: string[];
        export { display_180 as display };
        export namespace range_180 {
            let _default_179: string;
            export { _default_179 as default };
        }
        export { range_180 as range };
    }
    export namespace 錆 {
        let name_227: string;
        export { name_227 as name };
        let display_181: string[];
        export { display_181 as display };
        export namespace range_181 {
            let _default_180: string;
            export { _default_180 as default };
        }
        export { range_181 as range };
    }
    export namespace 鎭 {
        let name_228: string;
        export { name_228 as name };
        let display_182: string[];
        export { display_182 as display };
        export namespace range_182 {
            let _default_181: string;
            export { _default_181 as default };
        }
        export { range_182 as range };
    }
    export namespace 鈕 {
        let name_229: string;
        export { name_229 as name };
        let display_183: string[];
        export { display_183 as display };
        export namespace range_183 {
            let _default_182: string;
            export { _default_182 as default };
        }
        export { range_183 as range };
    }
    export namespace 狂 {
        let name_230: string;
        export { name_230 as name };
        let display_184: string[];
        export { display_184 as display };
        export namespace range_184 {
            let _default_183: string;
            export { _default_183 as default };
        }
        export { range_184 as range };
    }
    export namespace 錐 {
        let name_231: string;
        export { name_231 as name };
        let display_185: string[];
        export { display_185 as display };
        export namespace range_185 {
            let _default_184: string;
            export { _default_184 as default };
        }
        export { range_185 as range };
    }
    export namespace 鳶 {
        let name_232: string;
        export { name_232 as name };
        let display_186: string[];
        export { display_186 as display };
        export namespace range_186 {
            let _default_185: string;
            export { _default_185 as default };
        }
        export { range_186 as range };
    }
    export namespace 曇 {
        let name_233: string;
        export { name_233 as name };
        let display_187: string[];
        export { display_187 as display };
        export namespace range_187 {
            let _default_186: string;
            export { _default_186 as default };
        }
        export { range_187 as range };
    }
    export namespace 延_1 {
        let name_234: string;
        export { name_234 as name };
        let display_188: string[];
        export { display_188 as display };
        export namespace range_188 {
            let _default_187: string;
            export { _default_187 as default };
        }
        export { range_188 as range };
    }
    export { 延_1 as 延 };
    export namespace 狛 {
        let name_235: string;
        export { name_235 as name };
        let display_189: string[];
        export { display_189 as display };
        export namespace range_189 {
            let _default_188: string;
            export { _default_188 as default };
        }
        export { range_189 as range };
    }
    export namespace 豬 {
        let name_236: string;
        export { name_236 as name };
        let display_190: string[];
        export { display_190 as display };
        export namespace range_190 {
            let _default_189: string;
            export { _default_189 as default };
        }
        export { range_190 as range };
    }
    export namespace 鷄_1 {
        let name_237: string;
        export { name_237 as name };
        let display_191: string[];
        export { display_191 as display };
        export namespace range_191 {
            let _default_190: string;
            export { _default_190 as default };
        }
        export { range_191 as range };
    }
    export { 鷄_1 as 鷄 };
    export namespace 前 {
        let name_238: string;
        export { name_238 as name };
        let display_192: string[];
        export { display_192 as display };
        export namespace range_192 {
            let _default_191: string;
            export { _default_191 as default };
        }
        export { range_192 as range };
    }
    export namespace 騰_1 {
        let name_239: string;
        export { name_239 as name };
        let display_193: string[];
        export { display_193 as display };
        export namespace range_193 {
            let _default_192: string;
            export { _default_192 as default };
        }
        export { range_193 as range };
    }
    export { 騰_1 as 騰 };
    export namespace 行 {
        let name_240: string;
        export { name_240 as name };
        let display_194: string[];
        export { display_194 as display };
        export namespace range_194 {
            let _default_193: string;
            export { _default_193 as default };
        }
        export { range_194 as range };
    }
    export namespace 瓜 {
        let name_241: string;
        export { name_241 as name };
        let display_195: string[];
        export { display_195 as display };
        export namespace range_195 {
            let _default_194: string;
            export { _default_194 as default };
        }
        export { range_195 as range };
    }
    export namespace 麈 {
        let name_242: string;
        export { name_242 as name };
        let display_196: string[];
        export { display_196 as display };
        export namespace range_196 {
            let _default_195: string;
            export { _default_195 as default };
        }
        export { range_196 as range };
    }
    export namespace 羽 {
        let name_243: string;
        export { name_243 as name };
        let display_197: string[];
        export { display_197 as display };
        export namespace range_197 {
            let _default_196: string;
            export { _default_196 as default };
        }
        export { range_197 as range };
    }
    export namespace 熊 {
        let name_244: string;
        export { name_244 as name };
        let display_198: string[];
        export { display_198 as display };
        export namespace range_198 {
            let _default_197: string;
            export { _default_197 as default };
        }
        export { range_198 as range };
    }
    export namespace 篩 {
        let name_245: string;
        export { name_245 as name };
        let display_199: string[];
        export { display_199 as display };
        export namespace range_199 {
            let _default_198: string;
            export { _default_198 as default };
        }
        export { range_199 as range };
    }
    export namespace 遲 {
        let name_246: string;
        export { name_246 as name };
        let display_200: string[];
        export { display_200 as display };
        export namespace range_200 {
            let _default_199: string;
            export { _default_199 as default };
        }
        export { range_200 as range };
    }
    export namespace 麋 {
        let name_247: string;
        export { name_247 as name };
        let display_201: string[];
        export { display_201 as display };
        export namespace range_201 {
            let _default_200: string;
            export { _default_200 as default };
        }
        export { range_201 as range };
    }
    export namespace 齶 {
        let name_248: string;
        export { name_248 as name };
        let display_202: string[];
        export { display_202 as display };
        export namespace range_202 {
            let _default_201: string;
            export { _default_201 as default };
        }
        export { range_202 as range };
    }
    export namespace 塞 {
        let name_249: string;
        export { name_249 as name };
        let display_203: string[];
        export { display_203 as display };
        export namespace range_203 {
            let _default_202: string;
            export { _default_202 as default };
        }
        export { range_203 as range };
    }
    export namespace 鵺 {
        let name_250: string;
        export { name_250 as name };
        let display_204: string[];
        export { display_204 as display };
        export namespace range_204 {
            let _default_203: string;
            export { _default_203 as default };
        }
        export { range_204 as range };
    }
    export namespace 童 {
        let name_251: string;
        export { name_251 as name };
        let display_205: string[];
        export { display_205 as display };
        export namespace range_205 {
            let _default_204: string;
            export { _default_204 as default };
        }
        export { range_205 as range };
    }
}
declare class ee {
    /** 駒台への角度ごとの表示順
     * @type {number[]}
     */
    static "__#11@#t": number[];
    /**
     * @param {Board} ボード
     */
    constructor(e: any);
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
    stocks: Map<number, any[]>;
    /** 持ち駒からボード上に配置する
     * @param {Panal} toPanell - 配置先のパネル
     * @param {Object} option - オプション
     * @param {number} option.deg - 角度
     * @param {number} option.i - 配置する持ち駒のインデックス
     */
    releasePiece(e: any, t?: {}): void;
    /** 駒台に追加する
     * @param {Piece} piece - 追加する駒
     */
    add(e: any): void;
    /** 駒を持ち駒にする
     * @param {Piece|null} winnerPiece - 移動する駒
     * @param {Piece} loserPiece - 捕縛される駒
     * @param {boolean} forceCapture - 属性を無視して捕縛する
     * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
     */
    capturePiece(e: any, t: any, a?: boolean, i?: boolean): void;
    /** 持ち駒の所有権を回転
     * @param {number} deg - 回転角 (90の倍数)
     */
    rotate(e: any): void;
    /** 盤を描写 */
    draw(): void;
    /** 駒台をテキスト形式で取得
     * @param {boolean} isCompact - コンパクト表示
     * @param {boolean} isAlias - エイリアス表示
     */
    toString(e?: boolean, t?: boolean): string;
}
declare class xe {
    degs: {};
    /** アンパッサン情報をクリア
     * @param {number} deg - アンパッサンされうる陣営の角度
     */
    clear(e: any): void;
    /** アンパッサン対象と成りうるマス情報を記録
     * @param {Panel} panel - アンパッサン対象と成りうるマス目
     * @param {Piece} piece - アンパッサン対象と成りうる駒
     */
    setTarget(e: any, t: any): void;
    /** アンパッサン対象と成りうる駒情報を記録
     * @param {Panel} toPanel - アンパッサン対象か確認するマス目
     */
    setMoved(e: any): void;
    /** アンパッサン対象のマスか確認する
     * @param {Panel} panel - アンパッサン対象と成りうるマス目
     * @param {Piece} piece - アンパッサン対象と成りうる駒
     * @returns {boolean}
     */
    isTarget(e: any, t: any): boolean;
}
declare class random extends I {
    constructor(e: any, t: any);
}
declare class greedy extends I {
    constructor(e: any, t: any);
}
declare class minimax extends I {
    constructor(e: any, t: any);
    searchDepth: number;
    /**
     * ミニマックス法（アルファベータ枝刈り付き）を実行します。
     * @param {Board} board - 現在の盤面
     * @param {number} depth - 残りの探索深さ
     * @param {number} alpha - アルファ値
     * @param {number} beta - ベータ値
     * @param {boolean} isMaximizingPlayer - 現在のプレイヤーが最大化プレイヤーかどうか
     * @returns {number} 評価値
     */
    minimax(e: any, t: any, a: any, i: any, s: any): number;
}
export { Q as Board, ke as CpuEngine, I as CpuEngineBase, q as CpuEngines, C as Piece, V as boards, P as canvasFont, H as canvasImage, Ee as extendData, oe as gameSoft, _ as games, J as panels, Z as pieceCost, ae as pieceRange, K as pieces };
