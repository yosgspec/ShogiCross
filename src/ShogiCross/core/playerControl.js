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
		this.component.style.maxWidth = board.canvas.width;
		this.component.innerHTML = `${
			[...buttons]
				.filter(([id])=>compList.includes(id))
				.map(([id, {title, text}])=>
					`<button id="${id}${unique}" title="${title}" style="font-family:${canvasFont.names};">${text}</button>`
			).join("")
		}${
			compList.includes("textRecord")?
				`<input id="textRecord${unique}" style="flex-grow:1; font-family:${canvasFont.names};">`: ""
		}`;

		for(const [id, {onclick}] of buttons){
			if(!compList.includes(id)) continue;
			console.log(onclick)
			this.component.querySelector(`#${id}${unique}`).onclick = onclick;
		}

		if(!compList.includes("textRecord")) return;
		const onDrawedBefore = board.onDrawed ?? (()=>{});
		board.onDrawed = e =>{
			onDrawedBefore(e);
			this.component.querySelector(`#textRecord${unique}`).value = e.getTextRecord().split(/\n/).pop();
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
