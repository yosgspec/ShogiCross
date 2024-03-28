import {Board} from "./board.js"

const defaultCompList = [
	"undoRecord",
	"redoRecord",
	"rotateLeft",
	"rotateRight",
	"downloadImage",
	"textRecord"
];

export class RecordPlayer{
	constructor(board, compList=defaultCompList){
		this.board = board;

		const buttons = new Map([
			["undoRecord", {title: "一手戻る", text: "&lt;&lt;", onclick: ()=>board.undoRecord()}],
			["redoRecord", {title: "一手進む", text: "&gt;&gt;", onclick: ()=>board.redoRecord()}],
			["rotateLeft", {title: "盤面を左回転", text: "🔄", onclick: ()=>board.rotate(false)}],
			["rotateRight", {title: "盤面を右回転", text: "🔁", onclick: ()=>board.rotate()}],
			["downloadImage", {title: "画像を保存", text: "📷", onclick: ()=>board.downloadImage()}]
		]);
		const uuid = crypto.randomUUID();

		this.component = document.createElement("div");
		this.component.style.display = "flex";
		this.component.innerHTML = `${
			[...buttons]
				.filter(([id])=>compList.includes(id))
				.map(([id, {title, text}])=>
					`<button id="${id}${uuid}" title="${title}">${text}</button>`
			).join("")
		}${
			compList.includes("textRecord")?
				`<input id="textRecord${uuid}" style="flex-grow:1;">}`: ""
		}`;

		for(const [id, {onclick}] of buttons){
			if(!compList.includes(id)) return;
			this.component.querySelector(`#${id}${uuid}`).onclick = onclick;
		}

		const onDrawedBefore = board.onDrawed ?? (()=>{});
		board.onDrawed = e =>{
			onDrawedBefore(e);
			this.component.querySelector(`#textRecord${uuid}`).value = e.getTextRecord().split(/\n/).pop();
		}
	}

	add(){
		const {canvas} = this.board;
		canvas.after(this.component);
	}

	remove(){
		this.player.remove();
	}
}
