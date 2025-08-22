import {Board} from "./board.js";
import {Panel} from "./panel.js";
import {checkTarget} from "./checkTarget.js";

/** マウスコントロール
 * @param {Board} board - 盤面
 * @returns {()=>void}
 */
export function mouseControl(board){
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
	const fieldProc = async (e, fnPanel, fnAfter=()=>{})=>{
		const viewStyle = window.getComputedStyle(canvas);
		const rect = e.target.getBoundingClientRect();
		let x = canvas.width/parseFloat(viewStyle.width);
		let y = canvas.height/parseFloat(viewStyle.height);
		if(e.clientX){
			x *= e.clientX-rect.left;
			y *= e.clientY-rect.top;
		}
		else if(0 < e.touches.length){
			if(1 < e.touches.length) return;
			x *= e.touches[0].clientX-rect.left;
			y *= e.touches[0].clientY-rect.top;
		}
		else{
			e.preventDefault();
			[x, y] = lastXY;
		}
		board.field.forEach((row, pY) =>
			row.forEach(async (panel, pX) =>
				await fnPanel(panel, x, y, pX, pY)));
		await fnAfter(x, y);
		board.draw();
		lastXY = [x, y];
	};

	/** ドラッグ開始
	 * @param {Event} e - イベント引数
	 */
	const dragStart = async e=>{
		isClick = true;
		await fieldProc(e,
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
				for(const [deg, stock] of board.stand.stocks){
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
	const dragMove = async e=>{
		if(!isClick || !(selectPanel || selectStand)) return;
		await fieldProc(e,
			(panel, x, y)=>{
				panel.isSelected = panel.checkRangeMouse(x, y);
			}
		);
	}


	/** ドラッグ終了
	 * @param {Event} e - イベント引数
	 */
	const dragEnd = async e=>{
		isClick = false;
		await fieldProc(e,
			async (panel, x, y)=>{
				if(!panel.checkRangeMouse(x, y)) return;
				if(selectPanel){
					await board.movePiece(selectPanel, panel);
				}
				if(selectStand && !panel.piece){
					board.stand.releasePiece(panel, selectStand);
				}
			}
		);
		await fieldProc(e,
			panel=>{
				if(panel.piece) panel.piece.isSelected = false;
				panel.isSelected = false;
				panel.clearTarget();
			},
			()=>{
				for(const [deg, stock] of board.stand.stocks){
					for(let i=stock.length-1;0<=i;i--){
						stock[i].isSelected = false;
					}
				}
				selectPanel = null;
				selectStand = null;
			}
		);
	};

	/** パネルの選択状態をリセット */
	const resetSelect =()=>{
		for(const panel of board.field.flat()){
			if(panel.piece) panel.piece.isSelected = false;
			panel.isSelected = false;
			panel.clearTarget();
		}
		for(const [deg, stock] of board.stand.stocks){
			for(let i=stock.length-1;0<=i;i--){
				stock[i].isSelected = false;
			}
		}
		selectPanel = null;
		selectStand = null;
		board.draw();
	}

	// イベントリスナーを作成
	canvas.addEventListener("mousedown", dragStart);
	canvas.addEventListener("mousemove", dragMove);
	canvas.addEventListener("mouseup", dragEnd);
	canvas.addEventListener("touchstart", dragStart);
	canvas.addEventListener("touchmove", dragMove);
	canvas.addEventListener("touchend", dragEnd);

	return {
		resetSelect,
		/** イベントリスナーを破棄 */
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
