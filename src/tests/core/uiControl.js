import {Board} from "./board.js";
import {canvasFont} from "./canvasFontLoader.js";

/** 操作パネル */
export class UIControl{
	/** @typedef {Object} UIControl */
	static buttonTexts = "<>🔄🔁📷";

	/** 要素のサイズをCanvasに合わせて変更 */
	#resize(){
		if(this.board.isHeadless) return;
		const {canvas} = this.board;
		const viewStyle = window.getComputedStyle(canvas);
		this.component.style.maxWidth = parseFloat(viewStyle.width)+"px";
	}

	/**
	 * @param {Board} board - 盤面
	 * @param {string[]} compList 表示するコントロールの一覧
	 */
	constructor(board, compList){
		this.board = board;
		const buttons = new Map([
			["undo", {title: "一手戻る", text: "&lt;&lt;", onclick: ()=>board.record.undo()}],
			["redo", {title: "一手進む", text: "&gt;&gt;", onclick: ()=>board.record.redo()}],
			["rotateLeft", {title: "盤面を左回転", text: "🔄", onclick: ()=>board.rotate(false)}],
			["rotateRight", {title: "盤面を右回転", text: "🔁", onclick: ()=>board.rotate()}],
			["downloadImage", {title: "画像を保存", text: "📷", onclick: ()=>board.downloadImage()}],
		]);
		compList ??= [...buttons.keys(), "textRecord"];
		const unique = Date.now().toString();

		/** 操作パネル要素
		 * @type {HTMLDivElement}
		 */
		this.component = document.createElement("div");
		this.component.id = unique;
		this.component.style.display = "flex";
		this.#resize();
		window.addEventListener("resize", ()=>this.#resize());
		this.component.innerHTML = `${
			[...buttons]
				.filter(([id])=>compList.includes(id))
				.map(([id, {title, text}])=>
					`<button id="${id}${unique}" title="${title}" style="font-family:${canvasFont.names};">${text}</button>`
				).join("")
		}${
			compList.includes("textRecord")?
				`<select id="textRecord${unique}" style="flex-grow:1; font-family:${canvasFont.names};"><option></option></select>`: ""
		}`;

		for(const [id, {onclick}] of buttons){
			if(!compList.includes(id)) continue;
			this.component.querySelector(`#${id}${unique}`).onclick = onclick;
		}

		if(!compList.includes("textRecord")) return;

		// 元の描写イベントを退避
		const onDrawedBase = board.onDrawed;
		board.onDrawed = async e=>{
			setTimeout(()=>{
				const select = this.component.querySelector(`#textRecord${unique}`);
				const option = select.querySelector("option");
				const vSelect = select.cloneNode(false);
				e.record.records.forEach((_, turn)=>{
					const vOption = option.cloneNode(false);
					vOption.textContent = board.record.getText(turn);
					if(turn === e.record.turn) vOption.selected = true;
					vSelect.appendChild(vOption);
				});
				// セレクトボックス変更時、履歴を移動
				vSelect.onchange = e=>board.record.jump(e.target.selectedIndex);
				select.replaceWith(vSelect);
			});
			onDrawedBase?.(e);
		};
	}

	/** 操作パネルを追加 */
	add(){
		if(this.board.isHeadless) return;
		const {canvas} = this.board;
		canvas.after(this.component);
	}

	/** 操作パネルを破棄 */
	remove(){
		if(this.board.isHeadless) return;
		this.component.remove();
		window.removeEventListener("resize", ()=>this.#resize);
	}
}
