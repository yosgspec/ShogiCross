import {Board} from "./board.js";
import {canvasFont} from "./canvasFontLoader.js";

/** 操作パネル */
export class UIControl{
	/** @typedef {Object} UIControl */
	static buttonTexts = "<>🔄🔁⏭📷📜";

	/** 要素のサイズをCanvasに合わせて変更 */
	#resize(){
		if(this.board.isHeadless) return;
		const {canvas} = this.board;
		const viewStyle = window.getComputedStyle(canvas);
		this.component.style.maxWidth = parseFloat(viewStyle.width)+"px";
	}

	/**
	 * @param {Board} board - 盤面
	 * @param {string[]} controls - 表示するコントロールの一覧
	 * @param {Object} recordOption - 棋譜オプション
	 * @param {number} recordOption.lines - 棋譜の表示行数
	 * @param {boolean} recordOption.readonly - 棋譜の読込専用
	 */
	constructor(board, controls, recordOption={}){
		recordOption.lines ??= 0;
		recordOption.readonly ??= false;
		this.board = board;
		const buttons = new Map([
			["undo", {title: "一手戻る", text: "&lt;&lt;", onclick: ()=>board.record.undo()}],
			["redo", {title: "一手進む", text: "&gt;&gt;", onclick: ()=>board.record.redo()}],
			["rotateLeft", {title: "盤面を左回転", text: "🔄", onclick: ()=>board.rotate(false)}],
			["rotateRight", {title: "盤面を右回転", text: "🔁", onclick: ()=>board.rotate()}],
			["passTurn", {title: "手番をパス", text: "⏭", onclick: ()=>board.passTurn(board.getActivePlayer())}],
			["downloadImage", {title: "画像を保存", text: "📷", onclick: ()=>board.downloadImage()}],
			["downloadRecord", {title: "棋譜を保存", text: "📜", onclick: ()=>board.record.download()}],
		]);
		controls ??= [...buttons.keys(), "textRecord"];
		const unique = Date.now().toString();

		this.component = document.createElement("div");
		this.component.id = unique;
		this.component.style.display = "flex";
		this.#resize();
		window.addEventListener("resize", ()=>this.#resize());
		this.component.innerHTML = `${
			[...buttons]
				.filter(([id])=>controls.includes(id))
				.map(([id, {title, text}])=>
					`<button id="${id}${unique}" title="${title}" style="font-family:${canvasFont.names};">${text}</button>`
				).join("")
		}${
			controls.includes("textRecord")?
				`<select id="textRecord${unique}" size=${recordOption.lines} style="flex-grow:1; font-family:${canvasFont.names};"><option></option></select>`: ""
		}`;

		for(const [id, {onclick}] of buttons){
			if(!controls.includes(id)) continue;
			this.component.querySelector(`#${id}${unique}`).onclick = onclick;
		}

		if(!controls.includes("textRecord")) return;

		// 元の描写イベントを退避
		const onDrawedBase = board.onDrawed;
		board.onDrawed = async e=>{
			setTimeout(()=>{
				const select = this.component.querySelector(`#textRecord${unique}`);
				const option = select.querySelector("option");
				const vSelect = select.cloneNode(false);
				e.record.records.forEach((_, turn)=>{
					const vOption = option.cloneNode(false);
					vSelect.appendChild(vOption);
					vOption.textContent = board.record.getText(turn);
					if(turn === e.record.turn) vOption.selected = true;
					if(recordOption.readonly) vOption.disabled = true;
				});
				// セレクトボックス変更時、履歴を移動
				if(!recordOption.readonly)
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
