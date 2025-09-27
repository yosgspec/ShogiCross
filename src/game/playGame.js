import {Board, BoardOnline} from "../ShogiCross/lib.js";
import {toggleOnline} from "./selectControl.js";
const onlineMsg = document.getElementById("onlineMsg");

export function boardRun(canvas, option){
	if(!toggleOnline.checked){
		onlineMsg.style.display = "none";
		return Board.run(canvas, option);
	}

	if(option.playerOptions)
		for(const opt of option.playerOptions)
			delete opt.cpuEngine;

	return BoardOnline.run(canvas, {
		...option,
		// 接続完了
		onReadyOnline(event, board){
			onlineMsg.style.width = `${board.width}px`;
			onlineMsg.style.display = "";
			onlineMsg.value = `対局開始！ あなたはプレイヤー${event.playerId+1}です。`;
		},
		// 切断
		onCloseOnline(){
			toggleOnline.onClick(false);
			canvas.dispatchEvent(new CustomEvent("shogicross:reload", {bubbles: true}));
		},
	});
}
