import {Board} from "./board.js"
import {Panel} from "./panel.js"
import {checkTarget} from "./checkTarget.js"

/** マウスコントロール
 * @param {Board} board - 盤
 */
export function uIControl(board){
	let isClick = false;
	let lastXY = [];
	let selectPanel = null;
	let selectStand = null;
	const {canvas} = board;

	/** マス目に対する処理
	 * @param {Event} e - イベント引数
	 * @param {(
	 *     panel: Panel,
	 *     x: number,
	 *     y: number,
	 * )=>void} fnPanel - マス目のコールバック関数
	 * @param {(
	 *     x: number,
	 *     y: number,
	 * )=>void} fnAfter - 後処理のコールバック関数
     */
	const fieldProc = (e, fnPanel, fnAfter=()=>{})=>{
		const rect = e.target.getBoundingClientRect();
		let x;
		let y;
		if(e.clientX){
			x = e.clientX-rect.left;
			y = e.clientY-rect.top;
		}
		else if(0 < e.touches.length){
			if(1 < e.touches.length) return;
			x = e.touches[0].clientX-rect.left;
			y = e.touches[0].clientY-rect.top;
		}
		else{
			e.preventDefault();
			[x, y] = lastXY;
		}
		board.field.forEach((row, pY) =>
			row.forEach((panel, pX) =>
				fnPanel(panel, x, y, pX, pY)));
		fnAfter(x, y);
		board.draw();
		lastXY = [x, y];
	};

	/** ドラッグ開始
	 * @param {Event} e - イベント引数
     */
	const dragStart = e=>{
		isClick = true;
		fieldProc(e,
			(panel, x, y)=>{
				const {piece, pX, pY} = panel;

				if(piece && panel.checkRangeMouse(x, y)){
					e.preventDefault();
					piece.isSelected = true;
					selectPanel = panel;
					checkTarget(board, piece, pX, pY);
				}
			},
			(x, y)=>{
				for(const [deg, stock] of Object.entries(board.stand.stocks)){
					for(let i=stock.length-1;0<=i;i--){
						if(!stock[i].checkRangeMouse(x, y)) continue;
						e.preventDefault();
						stock[i].isSelected = true;
						selectStand = {deg:deg, i:i};
						return;
					}
				}
			}
		);
	};

	/** ドラッグ中
	 * @param {any} e - イベント引数
	 */
	const dragMove = e=>{
		if(!isClick || !(selectPanel || selectStand)) return;
		fieldProc(e,
			(panel, x, y)=>{
				panel.isSelected = panel.checkRangeMouse(x, y);
			}
		);
	}

	/** ドラッグ終了
	 * @param {Event} e - イベント引数
	 */
	const dragEnd = e=>{
		isClick = false;
		fieldProc(e,
			(panel, x, y)=>{
				if(!panel.checkRangeMouse(x, y)) return;
				if(selectPanel){
					board.movePiece(selectPanel, panel);
				}
				if(selectStand && !panel.piece){
					board.stand.releasePiece(panel, selectStand);
				}
			}
		);
		fieldProc(e,
			panel=>{
				if(panel.piece) panel.piece.isSelected = false;
				panel.isSelected = false;
				panel.isTarget = false;
			},
			()=>{
				for(const [deg, stock] of Object.entries(board.stand.stocks)){
					for(let i=stock.length-1;0<=i;i--){
						stock[i].isSelected = false;
					}
				}
				selectPanel = null;
				selectStand = null;
			}
		);
	};

	// イベントリスナーを作成
	canvas.addEventListener("mousedown", dragStart);
	canvas.addEventListener("mousemove", dragMove);
	canvas.addEventListener("mouseup", dragEnd);
	canvas.addEventListener("touchstart", dragStart);
	canvas.addEventListener("touchmove", dragMove);
	canvas.addEventListener("touchend", dragEnd);

	/** イベントリスナーを破棄 */
	return {
		removeEvent(){
			canvas.removeEventListener("mousedown", dragStart);
			canvas.removeEventListener("mousemove", dragMove);
			canvas.removeEventListener("mouseup", dragEnd);
			canvas.removeEventListener("touchstart", dragStart);
			canvas.removeEventListener("touchmove", dragMove);
			canvas.removeEventListener("touchend", dragEnd);
		}
	};
}
