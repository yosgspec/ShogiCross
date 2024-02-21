import {boards, games} from "../ShogiCross/lib.js"
import {PlayGames} from "./playGame.js";

const crossSelects = document.getElementById("crossSelects");
const select = {
	game: document.getElementById("selectGame"),
	board: document.getElementById("selectBoard"),
	stand: document.getElementById("selectStand"),
	pieces: document.querySelectorAll(".selectPieces"),
	pieceSet: document.querySelectorAll(".selectPieceSet")
}

// セレクトボックスに追加
Object.entries(PlayGames).forEach(([key, {name}])=>{
	const opt = document.createElement("option");
	opt.value = key;
	opt.textContent = name;
	select.game.appendChild(opt);
	//if(key === "p4CrossOver9") opt.selected = true;
});

/** クロスセレクトメニュー */
function changeCrossGame(){
	if(select.game.value !== "cross"){
		crossSelects.style.display = "none";
		return;
	}
	// ボード一覧を初期化
	crossSelects.style.display = "";
	select.board.innerHTML = "";
	Object.keys(boards).forEach(boardName=>{
		const opt = document.createElement("option");
		opt.value = boardName;
		opt.textContent = `${boardName}盤`;
		select.board.appendChild(opt);
	});
	select.pieces.forEach((ele, i)=>{
		ele.innerHTML = "";
		const opt = document.createElement("option");
		opt.value = "";
		opt.textContent = `--駒${i+1}--`;
		ele.appendChild(opt);
		Object.entries(games).forEach(([key, game])=>{
			const opt = document.createElement("option");
			opt.value = opt.textContent = key;
			ele.appendChild(opt);
		});
	});
}

/** クロスゲーム用 駒配置パターン */
function changeCrossPiece(piecesName, i){
	const game = select.pieces[i];
	const pieceSet = select.pieceSet[i];
	return function(){
		const gameName = game.value;
		pieceSet.innerHTML = "";
		if(!games[gameName]) return;
		const xLen = boards[select.board.value].field[0].length;
		if(!games[gameName].position[xLen]) return;
		Object.keys(games[gameName].position[xLen]).forEach(key=>{
			const opt = document.createElement("option");
			opt.value = opt.textContent = key;
			pieceSet.appendChild(opt);
		});
	}
}

export class SelectControl{
	static get gameName(){
		return select.game.value;
	}

	static get options(){
		return {
			playBoard: select.board.value,
			useStand: JSON.parse(select.stand.value),
			playPieces: [...select.pieces].map((pieces, i)=>({
				gameName: pieces.value,
				pieceSet: select.pieceSet[i].value
			}))
		}
	}
	static set onchange(value){
		select.game.addEventListener("change", changeCrossGame);
		select.game.addEventListener("change", value);
		select.board.addEventListener("change", value);
		select.stand.addEventListener("change", value);
		select.pieces.forEach((p, i)=>{
			select.pieces[i].addEventListener("change", changeCrossPiece(p.value, i));
			select.pieces[i].addEventListener("change", value);
			select.pieceSet[i].addEventListener("change", value);
		})
	}
}
