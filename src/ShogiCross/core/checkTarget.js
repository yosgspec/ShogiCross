import {Board} from "./board.js";
import {Panel} from "./panel.js";
import {Piece} from "./piece.js";

// 移動範囲オプション
const rangeOptions = [
	["default", {isAttack: false}],
	["attack", {isAttack: true}],
	["start", {isAttack: false}],
	["castling", {isAttack: false}],
	["enPassant", {isAttack: true}],
	["palaceSlash", {isAttack: false}],
	["palaceSlash", {isAttack: true}]
];

// 起点文字の定義
const centerChars = [
	["O", {isOwn: true}],
	["o", {}]
];

// 移動範囲文字の親子関係
/** 点移動オプション
 * @type {Object<key: string, {child: string[]}>[]}
 * @param key - 移動範囲を定義する文字
 * @param {number} moves 進行可能なマス数
 */
const pointChars = [
	["o"],
	["A", {child: ["a"]}],
	["B", {child: ["b"]}],
	["C", {child: ["c"]}],
	["D", {child: ["d"]}],
	["E", {child: ["a", "e"]}],
	["F", {child: ["a", "f"]}],
	["G", {child: ["b", "g"]}],
	["H", {child: ["b", "h"]}],
	["I", {child: ["c", "i"]}],
	["J", {child: ["c", "j"]}],
	["K", {child: ["d", "k"]}],
	["L", {child: ["d", "l"]}]
];

/** 直線移動オプション
 * @type {Object<key: string, {jmps: number, moves: number}>[]}
 * @param key - 移動範囲を定義する文字
 * @param jmps - 必要なジャンプ回数
 * @param moves- 進行可能なマス数
 */
const linerChars = [
	["*", {}],
	["+", {jmps: 1}],
	["|", {jmps: 1, moves: 1}]
];
for(let i=1;i<=9;i++)
	linerChars.push([""+i, {moves: i}]);

/** rangeの原点座標を取得
 * @param {string[]} range 移動範囲情報
 */
function getOrigin(range){
	const oList = [];
	let ownX, ownY;
	for(let rY=0;rY<range.length;rY++){
		for(let rX=0;rX<range[rY].length;rX++){
			const rChar = range[rY][rX];
			for(let [key, {isOwn}] of centerChars){
				if(rChar !== key) continue;
				oList.push({isOwn, oX: rX, oY: rY});
				if(isOwn) [ownX, ownY] = [rX, rY];
			}
		}
	}
	return oList.map(o=>{
		o.offsetX = o.oX-ownX;
		o.offsetY = o.oY-ownY;
		return o;
	});
}

/** 駒の移動判定
 * @param {Board} board - ボード
 * @param {Piece} piece - 駒
 * @param {number} pX - マス目の列
 * @param {number} pY - マス目の行
 * @returns {Panel[]} 移動可能なマス目の配列
 */
export function checkTarget(board, piece, pX, pY){
	const canMovePanels = [];
	const {field, yLen, enPassant} = board;

	/** マス目座標がボード範囲内か判定
	 * @param {number} x - 判定するマス目の列
	 * @param {number} y - 判定するマス目の行
	 * @returns {boolean}
	 */
	function inField(x, y){
		return field[y] && field[y][x] && !field[y][x].hasAttr("keepOut");
	}

	/** 包同士であるか
	 * @param {Panel} panel - マス目
	 * @returns {boolean}
	 */
	function isVsPo(panel){
		return panel.piece && piece.hasAttr("po") && panel.piece.hasAttr("po");
	}

	/** 対象駒が炮で取れるか
	 * @param {Panel} panel - マス目
	 * @returns {boolean}
	 */
	function isAttackFromPao(panel){
		return panel.piece
			&& !piece.isMoved
			&& !panel.piece.isMoved
			&& piece.hasAttr("pao")
			&& piece.cost < panel.piece.cost;
	}

	/** 王不見王となるか?
	 * @param {Panel} panel - マス目
	 * @returns {boolean}
	 */
	function isSeeKing(panel){
		/*
		// 王不見王の駒が存在しない場合は判定不要
		if(!board.field.flat().some(p=>
			p.piece?.hasAttr("cantSeeKing")
		)) return false;
		// 王が向き合っているかシミュレーション
		const boardClone = board.clone();
		boardClone.isHeadless = true;
		boardClone.onGameOver = null;
		// 今の駒が動いたとして、
		boardClone.simpleMovePiece(
			boardClone.field[pY][pX],
			boardClone.field[panel.pY][panel.pX]
		);
		let kingPanels = boardClone.field.flat().filter(({piece})=>piece?.hasAttr("king"));
		nextKing:
		for(const a of kingPanels){
			for(const b of kingPanels){
				if(
					a.pX === b.pX && a.pY === b.pY // 同じマス目
					|| a.piece.deg === b.piece.deg // 同じ陣営
					// 王不見王の駒が存在しない
					|| !a.piece.hasAttr("cantSeeKing") && !b.piece.hasAttr("cantSeeKing")
				) continue;
				// 間に駒が存在するか?
				if(a.pX === b.pX){ // 同じ列
					const rng = [a.pY, b.pY];
					for(let y=Math.min(...rng)+1;y<Math.max(...rng);y++)
						if(boardClone.field[y][a.pX].piece) continue nextKing;
					return true;
				}
				else if(a.pY === b.pY){ // 同じ行
					const rng = [a.pY, b.pY];
					for(let x=Math.min(...rng)+1;x<Math.max(...rng);x++)
						if(boardClone.field[a.pY][x].piece) continue nextKing;
					return true;
				}
			}
		}*/
		return false;
	}

	/** 移動可能か判定
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} x - 判定するマス目の列
	 * @param {number} y - 判定するマス目の行
	 * @param {string} rangeName - 移動範囲の定義名
	 * @param {boolean} checkRivalDeg - 敵の駒のみを移動先とするか?
	 * @returns {boolean}
	 */
	function canMove(isAttack, x, y, rangeName="", checkRivalDeg=true){
		if(!field[y] || !field[y][x]) return false;
		const panel = field[y][x];
		if(!panel) return false;
		if(isVsPo(panel)) return false;
		if(isAttackFromPao(panel)) return false;
		if(isSeeKing(panel)) return false;
		if(rangeName === "enPassant" && !enPassant.isTarget(panel, piece)) return false;
		if(piece.hasAttr("inPalace") && !panel.hasAttr("palace")) return false;
		if(rangeName.indexOf("palace") === 0 && !(panel.hasAttr(rangeName) && field[pY][pX].hasAttr(rangeName))) return false;
		if(piece.hasAttr("unCrossRiver") && yLen-(0|yLen/2) <= board.getRow(x, y, piece.deg)) return false;
		if(!isAttack) return !field[y][x].piece;
		if(!field[y][x].piece) return false;
		if(checkRivalDeg) return piece.deg !== field[y][x].piece.deg;
		return true;
	}

	/** 子となる移動範囲に駒が存在するか
	 * @param {string[]} range - 移動範囲情報
	 * @param {string[]} child - 子となる文字の一覧
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} oX - 移動範囲情報の原点位置(行)
	 * @param {number} oY - 移動範囲情報の原点位置(列)
	 * @returns {boolean}
	 */
	function existsChild(range, child, isAttack, oX, oY){
		for(const char of child){
			for(let rY=0;rY<range.length;rY++){
				for(let rX=0;rX<range[rY].length;rX++){
					const [x, y] = [rX+pX-oX, rY+pY-oY];
					if(
						!inField(x, y) ||
						canMove(isAttack, 0|x, 0|y, "", false) ||
						range[rY][rX] !== char
					) continue;
					return true
				}
			}
		}
		return false;
	}

	/** 移動先表示を設定
	 * @param {string} rangeName - 移動範囲の定義名
	 * @param {number} x - 判定するマス目の列
	 * @param {number} y - 判定するマス目の行
	 */
	function setTarget(rangeName, x, y){
		const panel = field[y][x];
		panel.addTarget(rangeName);
		enPassant.setTarget(panel, piece);
		canMovePanels.push(panel);
	}

	/** 点移動
	 * @param {string[]} range - 移動範囲情報
	 * @param {string} rangeName - 移動範囲の定義名
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} oX - 移動範囲情報の原点位置(行)
	 * @param {number} oY - 移動範囲情報の原点位置(列)
	 */
	function movePoint(range, [rangeName, {isAttack}], {oX, oY, isOwn}){
		if(!isOwn) return;
		for(const [parent, {child=[]}={}] of pointChars){
			for(let rY=0;rY<range.length;rY++){
				for(let rX=0;rX<range[rY].length;rX++){
					const [x, y] = [rX+pX-oX, rY+pY-oY];
					if(!inField(x, y)
						|| !canMove(isAttack, x, y, rangeName)
						|| range[rY][rX] !== parent
						|| existsChild(range, child, false, oX, oY)) continue;
					setTarget(rangeName, x, y);
				}
			}
		}
	}

	/** 直線移動
	 * @param {string[]} range - 移動範囲情報
	 * @param {string} rangeName - 移動範囲の定義名
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} oX - 移動範囲情報の原点位置(行)
	 * @param {number} oY - 移動範囲情報の原点位置(列)
	 */
	function moveLiner(range, [rangeName, {isAttack}], {oX, oY, isOwn, offsetX, offsetY}){
		if(!isOwn && !canMove(false, pX+offsetX, pY+offsetY)) return;
		for(const [char, {jmps=0, moves=0}={}] of linerChars){
			const isMoveInf = !moves || 0 === moves;
			// 原点の周囲8マスを探索
			for(let rY=oY-1;rY<=oY+1;rY++){
				for(let rX=oX-1;rX<=oX+1;rX++){
					if(range[rY][rX] !== char || rX === oX && rY === oY) continue;
					let jmpLen = jmps? jmps: 0;
					let moveLen = moves? moves: 0;
					const [incX, incY] = [rX-oX, rY-oY];
					for(let _x=pX,_y=pY;;){
						_x+=incX;
						_y+=incY;
						const x=_x+offsetX;
						const y=_y+offsetY;
						if(!inField(x, y) || !isMoveInf && moveLen === 0) break;
						const isJumped = 0 === jmpLen;
						if(isJumped && canMove(isAttack, x, y, rangeName, isJumped)){
							moveLen--;
							setTarget(rangeName, x, y);
						}
						else if(jmps<1){
							moveLen--;
						}
						const panel = field[y][x];
						if(panel.piece){
							jmpLen--;
							if(isJumped || isVsPo(panel)) break;
						}
					}
				}
			}
		}
	}

	// メイン処理
	(function(){
		const rangeMap = piece.getRange();
		rangeMap.attack ??= rangeMap.default;
		for(const rangeOption of rangeOptions){
			const rangeName = rangeOption[0];
			// 初回移動確認
			if(piece.isMoved && ["start", "castling"].includes(rangeName)) continue;

			const range = rangeMap[rangeName];
			if(!range) continue;
			for(const origin of getOrigin(range)){
				// 点移動
				movePoint(range, rangeOption, origin);
				// 直線移動
				moveLiner(range, rangeOption, origin);
			}
		}
	})();
	return canMovePanels;
}

/**
 * 指定されたプレイヤーの王が王手されているかを確認します。
 * @param {Board} board - 盤面
 * @param {number} playerDeg - 確認するプレイヤーの角度
 * @returns {boolean} 王手されている場合はtrue、そうでない場合はfalse
 */
export function isKingInCheck(board, playerDeg){
	// 王の位置を取得
	let kingPanels = board.field.flat().filter(panel=>
		panel.piece?.deg === playerDeg
		&& panel.piece.hasAttr("king")
	);
	if(kingPanels.length !== 1) return false;
	const kingPanel = kingPanels[0];

	// 相手の駒の攻撃範囲に王が存在するか?
	for(const panel of board.field.flat()){
		// 駒のないマス、または自プレイヤーの駒はスキップ
		if(!panel.piece || panel.piece.deg === playerDeg) continue;
		// 相手の駒の移動可能マスを取得
		const enemyMovePanels = checkTarget(board, panel.piece, panel.pX, panel.pY);
		if(enemyMovePanels.some(({pX, pY})=>
			pX === kingPanel.pX && pY === kingPanel.pY
		)) return true; // 王手されている
	}
	return false; // 王手されていない
}

/**
 * 指定されたプレイヤーに合法手があるかを確認します。
 * @param {Board} board - 盤面
 * @param {number} playerDeg - 確認するプレイヤーの角度
 * @returns {boolean} 合法手がある場合はtrue、そうでない場合はfalse
 */
export function hasLegalMoves(board, playerDeg){
	// ボードを複製して、合法手の確認を行うためにヘッドレスモードに設定
	for(const fromPanel of board.field.flat()){
		// 駒のないマス、または自プレイヤーの駒はスキップ
		if(!fromPanel.piece || fromPanel.piece.deg !== playerDeg) continue;
		const canMovePanels = checkTarget(board, fromPanel.piece, fromPanel.pX, fromPanel.pY);
		for(const toPanel of canMovePanels){
			const boardClone = board.clone();
			boardClone.isHeadless = true;
			boardClone.onGameOver = null;
			console.log(boardClone.onGameOver)
			// 駒を移動
			boardClone.simpleMovePiece(
				boardClone.field[fromPanel.pY][fromPanel.pX],
				boardClone.field[toPanel.pY][toPanel.pX]
			);
			// 移動後に王が王手されていないか確認
			if(!isKingInCheck(boardClone, playerDeg)) return true;
		}
	}
	return false; // 合法手が見つからなかった
}

/**
 * 指定されたプレイヤーが詰んでいるかを確認します。
 * @param {Board} board - 盤面
 * @param {number} playerDeg - 確認するプレイヤーの角度
 * @returns {boolean} 詰んでいる場合はtrue、そうでない場合はfalse
 */
export function isCheckmate(board, playerDeg){
	return isKingInCheck(board, playerDeg)
		&& !hasLegalMoves(board, playerDeg);
}