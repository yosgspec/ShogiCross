import {boards, games, CpuEngines} from "../ShogiCross/lib.js";
import {boardOptions} from "./boardOptions.js";

// オンラインボタン
export const toggleOnline = {
	ele: document.getElementById("toggleOnline"),
	checked: false,
	values: ["オンライン対戦", "オンライン切断"],
	onClick(value){
		this.checked = value ?? !this.checked;
		this.ele.innerText = this.values[0|this.checked];
	},
};
toggleOnline.ele.innerText = toggleOnline.values[0];
toggleOnline.ele.addEventListener("click", ()=>toggleOnline.onClick());

// セレクト要素
const select = {
	game: document.getElementById("selectGame"),
	variant: document.getElementById("selectVariant"),
	board: document.getElementById("selectBoard"),
	stand: document.getElementById("selectStand"),
	moveMode: document.getElementById("selectMoveMode"),
	pieceGame: document.querySelectorAll(".selectPieceGame"),
	pieceSet: document.querySelectorAll(".selectPieceSet"),
	cpuEngine: document.querySelectorAll(".selectCpuEngine"),
};

/** ゲームセレクトを初期化 */
function initSelectGame(){
	for(const [key, {name, variant}] of boardOptions.entries()){
		if(name === variant || variant == null){
			const opt = document.createElement("option");
			opt.value = key;
			opt.textContent = name;
			select.game.appendChild(opt);
		}
	}
}

/** バリアントセレクト初期化 */
function updateSelectVariant(){
	select.variant.innerHTML = "";
	for(const [key, {name, variant}] of boardOptions.entries()){
		const selectedName = select.game[select.game.selectedIndex].textContent;
		if(selectedName === variant || variant == null && selectedName === name){
			const opt = document.createElement("option");
			opt.value = key;
			if(selectedName === name){
				opt.selected = true;
				opt.textContent = "--ルールを選択--";
			}
			else{
				opt.textContent = name;
			}
			select.variant.appendChild(opt);
		}
	}
}

/** ゲーム選択メニュー初期化 */
function initCrossGame(){
	// ボード一覧を初期化
	Object.keys(boards).forEach(boardName=>{
		const opt = document.createElement("option");
		select.board.appendChild(opt);
		opt.value = boardName;
		opt.textContent = `${boardName}盤`;
	});
	select.pieceGame.forEach((ele, i)=>{
		ele.innerHTML = "";
		const opt = document.createElement("option");
		ele.appendChild(opt);
		opt.value = "";
		opt.textContent = `--駒${i+1}--`;
		Object.entries(games).forEach(([key, game])=>{
			const opt = document.createElement("option");
			ele.appendChild(opt);
			opt.value = opt.textContent = key;
		});
	});
	select.cpuEngine.forEach((ele, i)=>{
		ele.innerHTML = "";
		const opt = document.createElement("option");
		ele.appendChild(opt);
		opt.value = "";
		opt.textContent = `CPUなし`;
		Object.keys(CpuEngines).forEach(key=>{
			const opt = document.createElement("option");
			opt.value = opt.textContent = key;
			ele.appendChild(opt);
		});
	});
}

/** ゲーム配置パターン初期化 */
function updateCrossPiece(i){
	const pieceGame = select.pieceGame[i];
	const pieceSet = select.pieceSet[i];
	return function(){
		const gameName = pieceGame.value;
		pieceSet.innerHTML = "";
		if(!games[gameName]) return;
		const xLen = boards[select.board.value].field[0].length;
		if(!games[gameName].position[xLen]) return;
		Object.keys(games[gameName].position[xLen]).forEach(key=>{
			const opt = document.createElement("option");
			pieceSet.appendChild(opt);
			opt.value = opt.textContent = key;
		});
	};
}

/** テンプレートのオプションをUIに反映 */
function setCrossGameOption(){
	const option = boardOptions.get(select.variant.value);
	if(!option) return;
	select.board.value = option.playBoard;
	if(select.board.selectedIndex === -1)
		select.board.selectedIndex = 0;
	select.stand.value = option.useStand;
	if(select.stand.selectedIndex === -1)
		select.stand.selectedIndex = 0;
	if(option.moveMode){
		select.moveMode.value = option.moveMode;
		if(select.moveMode.selectedIndex === -1)
			select.moveMode.selectedIndex = 0;
	}
	if(option.playerOptions){
		option.playerOptions.forEach((playerOption, i)=>{
			select.pieceGame[i].value = playerOption.gameName;
			if(select.pieceGame[i].selectedIndex === -1)
				select.pieceGame[i].selectedIndex = 0;
			updateCrossPiece(i)();
			select.pieceSet[i].value = playerOption.pieceSet;
			if(select.pieceSet[i].selectedIndex === -1)
				select.pieceSet[i].selectedIndex = 0;
			select.cpuEngine[i].value = playerOption.cpuEngine;
			if(select.cpuEngine[i].selectedIndex === -1)
				select.cpuEngine[i].selectedIndex = 0;
		});
	}
}

export class SelectControl{
	static get gameName(){
		return select.variant.value;
	}

	static get option(){
		return {
			...boardOptions.get(this.gameName),
			playBoard: select.board.value,
			useStand: JSON.parse(select.stand.value),
			moveMode: select.moveMode.value,
			playerOptions: [...select.pieceGame].map((pieceGame, i)=>({
				gameName: pieceGame.value,
				pieceSet: select.pieceSet[i].value,
				cpuEngine: select.cpuEngine[i].value || null,
			})),
		};
	}
	static set onChange(value){
		select.game.addEventListener("change", ()=>{
			updateSelectVariant();
			setCrossGameOption();
		});
		select.game.addEventListener("change", value);
		select.variant.addEventListener("change", setCrossGameOption);
		select.variant.addEventListener("change", value);
		select.board.addEventListener("change", value);
		select.stand.addEventListener("change", value);
		select.moveMode.addEventListener("change", value);
		select.pieceGame.forEach((pieceGame, i)=>{
			pieceGame.addEventListener("change", updateCrossPiece(i));
			pieceGame.addEventListener("change", value);
			select.board.addEventListener("change", updateCrossPiece(i));
			select.pieceSet[i].addEventListener("change", value);
			select.cpuEngine[i].addEventListener("change", value);
		});
		toggleOnline.ele.addEventListener("click", value);
	}
}

initSelectGame();
updateSelectVariant();
initCrossGame();
setCrossGameOption();
