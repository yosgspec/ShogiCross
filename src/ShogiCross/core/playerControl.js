import {Board} from "./board.js";
import {canvasFont}from "./canvasFontLoader.js";

/** 操作パネル */
export class PlayerControl{
	static buttonTexts = "<>🔄🔁📷";

	/**
	 * @param {Board} board ボード
	 * @param {string[]} compList 表示するコントロールの一覧
	 */
	constructor(board, compList){
		this.board = board;

		const buttons = new Map([
			["undoRecord", {title: "一手戻る", text: "&lt;&lt;", onclick: ()=>board.undoRecord()}],
			["redoRecord", {title: "一手進む", text: "&gt;&gt;", onclick: ()=>board.redoRecord()}],
			["rotateLeft", {title: "盤面を左回転", text: "🔄", onclick: ()=>board.rotate(false)}],
			["rotateRight", {title: "盤面を右回転", text: "🔁", onclick: ()=>board.rotate()}],
			["downloadImage", {title: "画像を保存", text: "📷", onclick: ()=>board.downloadImage()}]
		]);
		compList ??= [...buttons.keys(), "textRecord"];
		const unique = Date.now().toString();

		/** 操作パネル要素
		 * @type {HTMLDivElement}
		 */
		this.component = document.createElement("div");
		this.component.id = unique;
		this.component.style.display = "flex";
		this.component.style.maxWidth = board.canvas.width+"px";
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
			if(!compList.includes(id)) continue
			this.component.querySelector(`#${id}${unique}`).onclick = onclick;
		}

		if(!compList.includes("textRecord")) return;

		// 元の描写イベントを退避
		const onDrawedBase = board.onDrawed ?? (()=>{});
		board.onDrawed = async e =>{
			setTimeout(()=>{
				const select = this.component.querySelector(`#textRecord${unique}`);
				const option = select.querySelector("option");
				const vSelect = select.cloneNode(false);
				e.record.forEach((record, turn)=>{
					const vOption = option.cloneNode(false);
					vOption.textContent = board.record2String(record, turn);
					if(turn === e.turn) vOption.selected = true;
					vSelect.appendChild(vOption);
				});
				// セレクトボックス変更時、履歴を移動
				vSelect.onchange = e=>board.moveRecord(e.target.selectedIndex);
				select.replaceWith(vSelect);
			});
			onDrawedBase;
		}
	}

	/** 操作パネルを追加 */
	add(){
		const {canvas} = this.board;
		canvas.after(this.component);
	}

	/** 操作パネルを破棄 */
	remove(){
		this.component.remove();
	}
}
