import {Panel} from "./panel.js";
import {Piece} from "./piece.js";

/** 駒の移動判定
 * @param {Board} board - ボード
 * @param {Piece} piece - 駒
 * @param {number} pX - パネルの列
 * @param {number} pY - パネルの行
 * @returns
 */
export function checkTarget(board, piece, pX, pY){
	const {field, yLen} = board;

	// 移動範囲オプション
	const rangeKeys = [
		["default", {isAttack: false}],
		["start", {isAttack: false}],
		["attack", {isAttack: true}],
		["palaceRight", {isAttack: false}],
		["palaceRight", {isAttack: true}],
		["palaceLeft", {isAttack: false}],
		["palaceLeft", {isAttack: true}]
	];

	// 移動範囲文字の親子関係
	const targetChars = [
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

	// 直線移動範囲文字のジャンプ回数
	const linerChars = [
		["*", {jmps: 0}],
		["+", {jmps: 1}]
	];

	/** rangeの原点座標を取得
	 * @param {string[]} rng - 移動範囲情報
	 */
	function getRange0(rng){
		for(let rY=0;rY<rng.length;rY++){
			const rX = rng[rY].indexOf("0");
			if(-1 === rX) continue;
			return [rX, rY];
		}
	}

	/** パネル座標がボード範囲内か判定
	 * @param {number} x - 判定するパネルの列
	 * @param {number} y - 判定するパネルの行
	 * @returns {boolean}
	 */
	function inField(x, y){
		return field[y] && field[y][x] && !field[y][x].attr.includes("keepOut");
	}

	/** 移動可能か判定
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} x - 判定するパネルの列
	 * @param {number} y - 判定するパネルの行
	 * @param {boolean} checkRivalDeg - 敵の駒のみを移動先とするか?
	 * @returns boolean
	 */
	function canMove(isAttack, x, y, key="", checkRivalDeg=true){
		const {attr} = field[y][x];
		if(piece.attr?.includes("inPalace") && !attr.includes("palace")) return false;
		if(key.indexOf("palace") === 0 && !attr.includes(key)) return false;
		if(piece.attr?.includes("unCrossCenter") && yLen-(0|yLen/2) <= board.getRow(x, y, piece.deg)) return false;
		if(!isAttack) return !field[y][x].piece;
		if(!field[y][x].piece) return false;
		if(checkRivalDeg) return piece.deg !== field[y][x].piece.deg;
		return true;
	}

	/** 子となる移動範囲に駒が存在するか
	 * @param {string[]} rng - 移動範囲情報
	 * @param {string[]} child - 子となる文字の一覧
	 * @param {boolean} isAttack - 駒を取得対象に含むか?
	 * @param {number} oX - 移動範囲情報の原点位置(行)
	 * @param {number} oY - 移動範囲情報の原点位置(列)
	 * @returns boolean
	 */
	function existsChild(rng, child, isAttack, oX, oY){
		for(const char of child){
			for(let rY=0;rY<rng.length;rY++){
				for(let rX=0;rX<rng[rY].length;rX++){
					const [x, y] = [rX+pX-oX, rY+pY-oY];
					if(
						!inField(x, y) ||
						canMove(isAttack, x, y, "", false) ||
						rng[rY][rX] !== char
					) continue;
					return true
				}
			}
		}
		return false;
	}

	// メイン処理
	(function(){
		const range = piece.getRange();
		if(!range.attack) range.attack = range.default;
		for(const [key, {isAttack}] of rangeKeys){
			if(key === "start" && piece.isMoved) continue;

			const rng = range[key];
			if(!rng) continue;
			const [oX, oY] = getRange0(rng);

			// 通常移動
			for(const [parent, {child}] of targetChars){
				for(let rY=0;rY<rng.length;rY++){
					for(let rX=0;rX<rng[rY].length;rX++){
						const [x, y] = [rX+pX-oX, rY+pY-oY];
						if(
							!inField(x, y) ||
							!canMove(isAttack, x, y, key) ||
							rng[rY][rX] !== parent ||
							existsChild(rng, child, false, oX, oY)
						) continue;
						field[y][x].isTarget = true;
					}
				}
			}

			// 直線移動
			for(const [char, {jmps}] of linerChars){
				for(let rY=oY-1;rY<=oY+1;rY++){
					for(let rX=oX-1;rX<=oX+1;rX++){
						let jmpCnt = jmps;
						if(rX === oX && rY === oY || rng[rY][rX] !== char) continue;
						const [incX, incY] = [rX-oX, rY-oY];
						for(let x=pX,y=pY;;){
							x+=incX;
							y+=incY;
							if(!inField(x, y)) break;
							const isJumped = 0 === jmpCnt;
							if(isJumped && canMove(isAttack, x, y, key, isJumped)) field[y][x].isTarget = true;
							if(field[y][x].piece){
								jmpCnt--;
								if(isJumped) break;
							}
						}
					}
				}
			}
		}
	})();
}