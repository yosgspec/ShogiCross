import {boards, games, CpuEngines} from "../ShogiCross.min.js";
import {PlayGames} from "./playGame.js";

const crossSelects = document.getElementById("crossSelects");
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

// ゲームセレクトを初期化
Object.entries(PlayGames).forEach(([key, {name, variant}])=>{
	if(name === variant || variant == null){
		const opt = document.createElement("option");
		opt.value = key;
		opt.textContent = name;
		select.game.appendChild(opt);
	}
});

// バリエーションセレクトを初期化
function updateSelectVariant(){
	select.variant.innerHTML = "";
	Object.entries(PlayGames).forEach(([key, {name, variant}])=>{
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
	});
}
updateSelectVariant();

/** クロスゲーム選択メニュー表示 */
function openCrossGame(){
	if(select.game.value !== "cross"){
		crossSelects.style.display = "none";
		return;
	}
	// ボード一覧を初期化
	crossSelects.style.display = "";
	select.board.innerHTML = "";
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

/** クロスゲーム配置パターン初期化 */
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

export class SelectControl{
	static get gameName(){
		return select.variant.value;
	}

	static get option(){
		return {
			playBoard: select.board.value,
			useStand: JSON.parse(select.stand.value),
			moveMode: select.moveMode.value,
			playerOptions: [...select.pieceGame].map((pieceGame, i)=>({
				gameName: pieceGame.value,
				pieceSet: select.pieceSet[i].value,
				cpuEngine: select.cpuEngine[i].value || null,
			})),
			useUIControl: false,
		};
	}
	static set onchange(value){
		select.game.addEventListener("change", updateSelectVariant);
		select.game.addEventListener("change", openCrossGame);
		select.game.addEventListener("change", value);
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
	}
}
