/** @typedef {import("./board.js").BoardInitOption} BoardInitOption */
/** @typedef {import("./data.js").PlayerInitOption} PlayerInitOption */
/** @typedef {import("./data.js").PlayerInfo} PlayerInfo */
import {Stand} from "./stand.js";
import {Panel} from "./panel.js";
import {Piece} from "./piece.js";
import {Record} from "./record.js";
import {CpuEngine} from "./cpu.js";
import {EnPassant} from "./enPassant.js";
import {Bod} from "./bod.js";
import {boards, games} from "./data.js";

export const PROTECTED = Symbol("Board");

/**
 * @typedef {Object} BoardCoreInitOption - ボードの初期化オプション
 * @prop {string|undefined} name - ゲーム名(本将棋、5五将棋、...等)
 * @prop {string|undefined} variant - ゲーム系統(将棋、チェス、...等)
 * @prop {string|undefined} url - ゲームに関連するURL
 * @prop {string|undefined} desc - ゲームの説明
 * @prop {string} playBoard - ボードタイプ
 * @prop {PlayerInitOption[]} playerOptions - プレイヤーの初期化設定
 * @prop {2|4} players - プレイヤー人数(2 or 4)
 * @prop {number} boardLeft - 描写するX座標
 * @prop {number} boardTop - 描写するY座標
 * @prop {number} panelWidth - マス目幅
 * @prop {number} panelHeight - マス目高さ
 * @prop {number} borderWidth - 枠線太さ
 * @prop {number} pieceSize - 駒の大きさ
 * @prop {boolean} useRankSize - 駒の大きさを格の違いで変更する
 * @prop {boolean} isDrawShadow - 駒の影の描写有無
 * @prop {string} backgroundColor - 背景色(デフォルト無色)
 * @prop {boolean} isHeadless - ヘッドレスモード（Canvas非描画・自動操作用）
 * @prop {"normal"|"free"|"viewOnly"} moveMode - 移動モード
 */

export class BoardCore{
	/**
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardCoreInitOption} option - ボードの初期化オプション
	 */
	constructor(canvas, option){
		this[PROTECTED] = {
			rotateField: this.#rotateField.bind(this),
		};

		const {
			name,
			variant,
			url,
			desc,
			playBoard,
			playerOptions=[],
			players=playerOptions.some(({gameName}, i)=>1 < i && gameName)? 4: 2,
			boardLeft=5,
			boardTop=5,
			panelWidth=50,
			panelHeight=0|panelWidth*1.1,
			pieceSize=0|panelWidth*0.9,
			useRankSize = true,
			isDrawShadow = true,
			borderWidth=Math.min(panelWidth, panelHeight)/30,
			backgroundColor="#00000000",
			isHeadless=false,
			moveMode="normal",
		} = option;
		this.option = option;
		this.isHeadless = isHeadless;
		this.name = name;
		this.variant = variant;
		this.url = url;
		this.desc = desc;

		// 初期化
		this.ctx = null;
		this.canvas = null;

		this.pieces = Piece.getPieces(null, {
			size: pieceSize,
			useRankSize,
			isDrawShadow,
		});

		// ボード情報
		if(!boards[playBoard]) throw Error(`playBoard=${playBoard}, Unknown board name.`);
		Object.assign(this, boards[playBoard]);
		if(![2, 4].includes(players)) throw Error(`players=${players}, players need 2 or 4.`);
		this.playerLen = players;
		this.left = boardLeft;
		this.top = boardTop;
		this.panelWidth = panelWidth;
		this.panelHeight = panelHeight;
		this.borderWidth = borderWidth;
		this.pieceSize = pieceSize;
		this.canvasBackgroundColor = backgroundColor;

		// マス目データを構築
		this.field = this.field.map((row, pY)=>
			[...row].map((char, pX)=>{
				const center = boardLeft+panelWidth*(pX+1);
				const middle = boardTop+panelHeight*(pY+1)
				return new Panel(null, char, center, middle, panelWidth, panelHeight, pX, pY, borderWidth);
			})
		);
		this.xLen = this.field[0].length;
		this.yLen = this.field.length;

		// プレイヤー設定
		this.players = new Map();
		for(let id=0;id<players;id++){
			const deg = this.degNormal(id)
			const status = {
				...playerOptions[id],
				id,
				deg,
				degChar: Piece.degChars[deg],
				alive: true,
				cpuDelay: playerOptions[id]?.cpuDelay ?? 500, // CPUの遅延時間
			};
			// CPUエンジンの初期化
			status.cpu = new CpuEngine(this, status),
			this.players.set(deg, status);
			// 駒の初期配置
			if(!status.gameName) continue;
			try{
				this.putStartPieces(id, status.gameName, status.pieceSet);
			}
			catch(ex){
				console.error(ex);
			}
		}

		// 描写寸法を設定
		this.width = this.panelWidth*(this.xLen+1);
		this.height = this.panelHeight*(this.yLen+1);
		this.right = boardLeft+this.width;
		this.bottom = boardTop+this.height;
		this.stand = new Stand(this);

		this.moveMode = moveMode;
		this.record = new Record(this);
		this.enPassant = new EnPassant();
	}

	/** ゲームを実行する
	 * @param {HTMLCanvasElement} canvas - Canvas要素
	 * @param {BoardInitOption} option - ボードの初期化オプション
	 * @returns {this}
	 */
	static run(canvas, option){}

	/** ボードを閉じる */
	close(){}

	/** 現在の手番のプレイヤー情報を取得
	 * @returns {Object<string, any>|"PlayerInfo"} - 現在のプレイヤー情報
	 */
	getActivePlayer(){
		return [...this.players.values()][this.record.turn%this.playerLen];
	}


	/** 角度を正規化
	 * @param {number} playeaIdOrDeg - プレイヤー番号または角度
	 * @returns {number}
	 */
	degNormal(playeaIdOrDeg){
		let deg = playeaIdOrDeg;
		if(0 < deg && deg < 4) deg = 0|deg*360/this.playerLen;
		do{deg = (deg+360)%360} while(deg<0);
		return deg;
	}

	/** 盤面を回転
	 * @param {boolean} isRight - 回転方向
	 */
	rotate(isRight=true){
		let deg = this.degNormal(1);
		if(!isRight) deg = -deg;
		this.#rotateField(deg);
		this.stand.rotate(deg);
		if(this.autoDrawing) this.draw();
	}

	/** 駒配置を回転
	 * @param {number} deg - 回転角 (90の倍数)
	 */
	#rotateField(deg){
		const {field, xLen, yLen} = this;

		deg = this.degNormal(deg);
		if(deg === 0) return;
		if(![90, 180, 270].includes(deg)) throw Error(`deg=${deg}, deg need multiple of 90.`);

		let fieldPieces = field.map(row=>row.map(({piece})=>piece));
		if([90, 270].includes(deg)){
			// 2次配列を転置
			const transpose = a => a[0].map((_, c) => a.map(r => r[c]));
			if(xLen !== yLen) throw Error(`cols=${xLen} != rows=${yLen}, Not rows = cols.`);
			fieldPieces = transpose(fieldPieces);
		}
		if([180, 270].includes(deg)){
			fieldPieces.reverse();
		}
		fieldPieces.forEach(row=>{
			row.forEach(piece=>{
				if(!piece) return;
				piece.deg += deg;
			});
			if([90, 180].includes(deg)) row.reverse();
		});
		field.forEach((row, pY)=>
			row.forEach((panel, pX)=>
				panel.piece = fieldPieces[pY][pX]
			)
		);
	}

	/** 駒の初期配置
	 * @param {number} playerId - プレイヤー番号
	 * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
	 * @param {string} pieceSet - 駒の配置パターン
	 */
	putStartPieces(playerId, gameName, pieceSet="default"){
		const {pieces} = this;

		const deg = this.degNormal(playerId);
		this.#rotateField(-deg);
		const pos = games[gameName].position[this.xLen][pieceSet];
		if(!pos) throw Error(`games["${gameName}"].position["${this.xLen}"]["${pieceSet}"]is null.`);
		pos.forEach((row, i)=>{
			if(row.length < this.xLen) throw Error(row.join(""));
			const pY = i+this.yLen - pos.length;
			[...row].forEach((char, pX)=>{
				if(!pieces[char]) return;
				this.field[pY][pX].piece = pieces[char].clone();
			});
		});
		this.#rotateField(deg);
		if(this.autoDrawing) this.draw();
	}

	/** 駒の配置
	 * @param {string} piece - 駒の表現文字
	 * @param {number} pX - X方向配置位置(マス目基準)
	 * @param {number} pY - Y方向配置位置(マス目基準)
	 * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
	 * @param {Object} option - オプション
	 * @param {number} option.displayPtn - 表示文字列を変更(1〜)
	 * @param {boolean} option.isMoved - 初回移動済みか否か
	 */
	putNewPiece(piece, pX, pY, playeaIdOrDeg, option={}){
		const {displayPtn=0, isMoved=false} = option;
		const {pieces} = this;

		const deg = this.degNormal(playeaIdOrDeg);
		if(typeof piece === "string"){
			piece = new Piece(this.ctx, pieces[piece], {displayPtn, deg, isMoved});
		}
		this.field[pY][pX].piece = piece;
		if(this.autoDrawing) this.draw();
	}

	/** 文字列から駒を配置
	 * {string} text - 駒配置を表す文字列
	 */
	setTextPieces(text){
		const {field, pieces, xLen, yLen} = this;

		const standTitle = "持駒：";
		// BOD形式
		if(0<text.indexOf(standTitle)) text = Bod.convTextPieces(text);

		// 排除する記号
		const noises = "┏━┯┓┗┷┛┃│┠─┼┨―";

		// 配列変換
		const texts = [text].concat(
				[...noises],
				Object.values(Piece.degChars).map(c=>"\n"+c+standTitle)
			).reduce(
				(text,char)=>
					text.replace(new RegExp(char,"g"), "")
			).replace(/\n\n/g, "\n")
			.replace(/　/g, "・")
			.trim()
			.split(/\n/)
			.map(
				row=>row.match(/.{2}/g));

		// ボードに駒を配置
		for(let pY=0;pY<yLen;pY++){
			for(let pX=0;pX<xLen;pX++){
				try{
					const text = texts[pY][pX];
					field[pY][pX].piece = Piece.stringToPiece(pieces, text);
				}
				catch(ex){
					field[pY][pX].piece = null;
				}
			}
		}

		// 駒台の読み込みを待機
		while(!this.stand){}
		// 持ち駒を配置
		this.stand.clear();
		const standTexts = texts[yLen];
		if(standTexts){
			standTexts.forEach(text=>{
				const piece = Piece.stringToPiece(pieces, text);
				if(!piece) return;
				this.stand.add(piece);
			});
		}
		if(this.autoDrawing) this.draw();
	}

	/** 角度基準のマス目の行を取得する
	 * @param {number} pX - マス目の列
	 * @param {number} pY - マス目の行
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getRow(pX, pY, deg, offsetDeg=0){
		const {xLen, yLen} = this;

		deg = this.degNormal(deg+offsetDeg);
		return (
			deg === 0? yLen-1-pY:
			deg === 90? pX:
			deg === 180? pY:
			deg === 270? xLen-1-pX:
			-1
		);
	}

	/** 角度基準のマス目の列を取得する
	 * @param {number} pX - マス目の列
	 * @param {number} pY - マス目の行
	 * @param {number} deg - 角度
	 * @param {number} offsetDeg - 補正角度
	 * @returns {number}
	 */
	getCol(pX, pY, deg, offsetDeg=0){
		const {xLen, yLen} = this;

		deg = this.degNormal(deg+offsetDeg);
		return (
			deg === 0? pX:
			deg === 90? yLen-1-pY:
			deg === 180? xLen-1-pX:
			deg === 270? pY:
			-1
		);
	}

	/** プロモーション選択
	 * @param {Piece} piece - 駒
	 * @param {boolean} canPromo - 成ることができる
	 * @param {boolean} forcePromo - 成りを強制する
	 * @param {boolean} isCpuMove - CPUによる移動か
	 */
	async onSelectPromo(piece, canPromo, forcePromo, isCpuMove){
		if(this.isHeadless || isCpuMove){
			return canPromo? Object.keys(piece.promo)[0]: null;
		}
	}

	/** プロモーション処理
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 * @param {boolean} canPromo - 成ることができる
	 * @param {boolean} forcePromo - 成りを強制する
	 * @param {boolean} isCpuMove - CPUによる移動か
	 */
	async promoPiece(fromPanel, toPanel, canPromo, forcePromo, isCpuMove=false){
		const {piece} = toPanel;

		// プロモーション判定
		if(!piece.promo || piece.hasAttr("promoted") || piece.hasAttr("cantPromotion") || !canPromo){
			this.record.add({fromPanel, toPanel});
			return;
		}

		const promoChar = await this.onSelectPromo(piece, canPromo, forcePromo, isCpuMove);
		if(promoChar){
			piece.promotion(promoChar);
			this.record.add({fromPanel, toPanel, end:"成"});
		}
		else{
			this.record.add({fromPanel, toPanel, end:"不成"});
		}
	}

	/** プロモーションエリア内であるか判別
	 * @param {Panel} panel - マス目
	 * @returns {{
	 * 		canPromo: boolean,
	 * 		forcePromo: boolean
	 * }}
	 */
	checkCanPromo(panel){
		const {yLen} = this;
		const {piece, pX, pY} = panel;
		const {deg} = piece;

		const [promoLine, forcePromoLine] = [
			piece.game.promoLine,
			piece.forcePromoLine
		].map(line=>yLen-line-(0|this.promoLineOffset));

		let row;
		if(!this.sidePromo){
			row = this.getRow(pX, pY, deg);
		}
		else{
			row = Math.max(
				...Object.keys(Piece.degChars)
				.map(d=>0|d)
				.filter(d=>d!==deg)
				.map(
					d=>this.getRow(pX, pY, d, 180)
				)
			);
		}
		return {
			canPromo: promoLine <= row,
			forcePromo: forcePromoLine <= row
		};
	}

	simpleMovePiece(fromPanel, toPanel){
		toPanel.piece = fromPanel.piece;
		toPanel.piece.isMoved = true;
		fromPanel.piece = null;
	}

	/** 駒を移動
	 * @param {Panel} fromPanel - 移動元のマス目
	 * @param {Panel} toPanel - 選択中のマス目
	 * @param {boolean} isCpuMove - CPUによる移動か
	 * @returns boolean
	 */
	async movePiece(fromPanel, toPanel, isCpuMove=false){
		const {stand, moveMode, enPassant} = this;

		if(!fromPanel
			|| moveMode === "viewOnly"
			|| toPanel.hasAttr("keepOut")
			|| toPanel.piece === fromPanel.piece
			|| toPanel.piece?.deg === fromPanel.piece.deg
			|| !isCpuMove && moveMode !== "free" && !toPanel.isTarget
			|| !isCpuMove && this.getActivePlayer().cpuEngine
		) return false;

		let {canPromo, forcePromo} = this.checkCanPromo(fromPanel);

		stand.capturePiece(
			fromPanel.piece,
			toPanel.piece,
			toPanel.hasAttr("capture"),
			toPanel.hasAttr("cantCapture")
		);

		this.simpleMovePiece(fromPanel, toPanel);

		const afterPromo = this.checkCanPromo(toPanel);
		canPromo ||= afterPromo.canPromo;
		forcePromo ||= afterPromo.forcePromo;

		// アンパッサン
		enPassant.setMoved(toPanel);
		// プロモーション処理
		await this.promoPiece(fromPanel, toPanel, canPromo, forcePromo, isCpuMove);
		return true;
	}

	/** パスして手番を進める
	 * @param {PlayerInfo} player - プレイヤー情報
	*/
	passTurn(player){
		this.record.add({end: `${player.degChar}パス`});
	}

	/** 盤を描写 */
	draw(){}

	/** 駒配置をテキストで取得
	 * @param {"default"|"compact"|"bod"} mode - テキスト形式
	 * @param {boolean} isAlias - エイリアス表示
	 * @returns {string}
	 */
	getTextPieces(mode="default", isAlias=false){
		return mode === "bod"?
			Bod.getTextPieces(this):
			this.toString(mode === "compact", isAlias);
	}

	/** 駒配置をテキストで取得
	 * @param {boolean} isCompact - コンパクト表示
	 * @param {boolean} isAlias - エイリアス表示
	 */
	toString(isCompact=false, isAlias=false){
		const {xLen} = this;

		let header = "";
		let footer = "";
		let panelOuter = "";
		let panelSep = "";
		let rowSep = "\n";

		if(!isCompact){
			header = `┏${Array(xLen).fill("━━").join("┯")}┓\n`;
			footer = `\n┗${Array(xLen).fill("━━").join("┷")}┛`;
			panelOuter = "┃";
			panelSep = "│";
			rowSep = `\n┠${Array(xLen).fill("──").join("┼")}┨\n`;
		}

		return (
			header+
			this.field.map(row=>
				panelOuter+
				row.map(panel=>
					panel.piece?.toString(isAlias) ?? panel.toString(isCompact)
				).join(panelSep)+
				panelOuter
			).join(rowSep)+
			footer+
			this.stand.toString(isCompact)
		);
	}

	/** 盤面をクローン
	 * @returns {this}
	 */
	cloneCore(){
		// クローン用の新しいオプションオブジェクトを作成
		// new BoardCoreのコンストラクタは、optionがなくてもデフォルト値で動作するため、
		// クローンに不要なプロパティをわざわざ引き継ぐ必要はない。
		// playBoardなど、盤面の構造を決定する最低限のoptionのみを渡す。
		const cloneOption = {
			...this.option,
			isHeadless: true,
			autoDrawing: false,
		};
		const newBoard = new BoardCore(null, cloneOption);

		// 盤面の駒をコピー
		this.field.flat().forEach(({piece, pX, pY})=>{
			if(!piece) return;
			const newPanel = newBoard.field[pY][pX];
			newPanel.piece = piece.clone();
		});

		// 持ち駒をコピー
		newBoard.stand.clear(); // まずクリア
		[...this.stand.stocks.values()].flat().forEach(piece=>{
			newBoard.stand.add(piece.clone());
		});

		// その他の状態をコピー
		// CPUの思考中は棋譜の完全なコピーは不要なため、
		// recordのコピー処理を大幅に軽量化する。
		newBoard.record.turn = this.record.turn;

		// enPassantの状態をクローン
		newBoard.enPassant = this.enPassant.clone();

		return newBoard;
	}
}
