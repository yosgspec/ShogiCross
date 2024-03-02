import {Board} from "./board.js";
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
 * @param {number} moves- 進行可能なマス数
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
 * @param {string[]} range - 移動範囲情報
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
 * @param {number} pX - パネルの列
 * @param {number} pY - パネルの行
 * @returns
 */
export function checkTarget(board, piece, pX, pY){
	const {field, yLen, enPassant} = board;

	/** パネル座標がボード範囲内か判定
	 * @param {number} x - 判定するパネルの列
	 * @param {number} y - 判定するパネルの行
	 * @returns {boolean}
	 */
	function inField(x, y){
		return field[y] && field[y][x] && !field[y][x].hasAttr("keepOut");
	}

	/** 移動可能か判定
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} x - 判定するパネルの列
	 * @param {number} y - 判定するパネルの行
	 * @param {string} rangeName - 移動範囲の定義名
	 * @param {boolean} checkRivalDeg - 敵の駒のみを移動先とするか?
	 * @returns boolean
	 */
	function canMove(isAttack, x, y, rangeName="", checkRivalDeg=true){
		if(!field[y] || !field[y][x]) return false;
		const panel = field[y][x];
		if(!panel) return false;
		if(!enPassant.isTarget(rangeName, panel, piece)) return false;
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
	 * @returns boolean
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
	 * @param {number} x - 判定するパネルの列
	 * @param {number} y - 判定するパネルの行
	 */
	function setTarget(rangeName, x, y){
		const panel = field[y][x];
		panel.isTarget = true;
		enPassant.setTarget(rangeName, panel, piece);
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
					let jmpCnt = jmps? jmps: 0;
					let moveCnt = moves? moves: 0;
					const [incX, incY] = [rX-oX, rY-oY];
					for(let _x=pX,_y=pY;;){
						_x+=incX;
						_y+=incY;
						const x=_x+offsetX;
						const y=_y+offsetY;
						if(!inField(x, y) || !isMoveInf && moveCnt === 0) break;
						const isJumped = 0 === jmpCnt;
						if(isJumped && canMove(isAttack, x, y, rangeName, isJumped)){
							moveCnt--;
							setTarget(rangeName, x, y);
						}
						else if(jmps<1){
							moveCnt--;
						}
						if(field[y][x].piece){
							jmpCnt--;
							if(isJumped) break;
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
}