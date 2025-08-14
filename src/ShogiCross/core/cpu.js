import {Board} from "./board.js";
import {checkTarget, isCheckmate, hasLegalMoves} from "./checkTarget.js";

/** 手動操作のエンジン */
class Manual{
	/**
	 * @param {Board} board - 対象のボード
	 * @param {string} playerId - プレイヤーID
	 */
	constructor(board, playerId){
		this.board = board;
		this.playerId = playerId;
	}
	/** 手番操作 */
	playTurn(){
		// 手動操作なので何もしない
	}

	/**
	 * 盤面を評価します。
	 * @param {Board} board - 評価対象の盤面
	 * @param {number} playerDeg - 評価するプレイヤーの角度
	 * @returns {number} 盤面の評価値
	 */
	evaluate(board, playerDeg){
		const KING_VALUE = 10000; // 王の価値
		let my_score = 0;
		let opponent_score = 0;

		// 盤上の駒を評価
		board.field.forEach(row => {
			row.forEach(panel => {
				if(panel.piece){
					const is_king = panel.piece.cost <= 0;
					const value = is_king ? KING_VALUE : panel.piece.cost;
					if(panel.piece.deg === playerDeg){
						my_score += value;
					} else {
						opponent_score += value;
					}
				}
			});
		});

		// 持ち駒を評価
		board.stand.stocks.forEach((pieces, deg) => {
			const hand_value = pieces.reduce((acc, piece) => acc + piece.cost, 0); // 王は持ち駒にならない
			if(deg === playerDeg){
				my_score += hand_value;
			} else {
				opponent_score += hand_value;
			}
		});

		return my_score - opponent_score;
	}
}

/** CPUエンジン */
const engines = {};

/** ランダムで手を打つエンジン */
engines["random"] = class Random extends Manual{
	playTurn(){
		const {board, playerId} = this;
		const playerDeg = board.degNormal(playerId);

		// 1. 現在のプレイヤーが動かせる駒をすべて取得
		const movablePieces = [];
		board.field.forEach(row=>{
			row.forEach(panel=>{
				if(panel.piece && panel.piece.deg === playerDeg){
					const fromPanel = panel;
					const toPanels = checkTarget(board, fromPanel.piece, fromPanel.pX, fromPanel.pY);
					if(toPanels.length > 0){
						movablePieces.push({from: fromPanel, tos: toPanels});
					}
				}
			});
		});

		// 2. すべての可能な手のリストを作成
		const allPossibleMoves = [];
		movablePieces.forEach(({from, tos})=>{
			tos.forEach(to=>{
				allPossibleMoves.push({from, to});
			});
		});

		// 3. 指し手が存在する場合、ランダムに1つ選んで指す
		if(allPossibleMoves.length > 0){
			const randomMove = allPossibleMoves[Math.floor(Math.random() * allPossibleMoves.length)];
			board.movePiece(randomMove.from, randomMove.to, true);
			console.log(`CPU(Random): (${randomMove.from.pX}, ${randomMove.from.pY}) から (${randomMove.to.pX}, ${randomMove.to.pY}) へ移動`);
		}
		else{
			console.log("CPU(Random): 指し手がありません。");
			// ゲーム終了やパス処理
		}
	}
}

/** 貪欲法エンジン (1手読み) */
engines["greedy"] = class Greedy extends Manual {
	/**
	 * 手番を処理します。
	 */
	playTurn(){
		const {board, playerId} = this;
		const playerDeg = board.degNormal(playerId);

		const movablePieces = [];
		board.field.forEach(row=>{
			row.forEach(panel=>{
				if(panel.piece && panel.piece.deg === playerDeg){
					const fromPanel = panel;
					const toPanels = checkTarget(board, fromPanel.piece, fromPanel.pX, fromPanel.pY);
					if(toPanels.length > 0){
						movablePieces.push({from: fromPanel, tos: toPanels});
					}
				}
			});
		});

		const allPossibleMoves = [];
		movablePieces.forEach(({from, tos})=>{
			tos.forEach(to=>{
				allPossibleMoves.push({from, to});
			});
		});

		if(allPossibleMoves.length === 0){
			console.log("CPU(Greedy): 指し手がありません。");
			return;
		}

		let bestMove = null;
		let bestScore = -Infinity;

		allPossibleMoves.forEach(move=>{
			const boardClone = board.clone();
			boardClone.isHeadless = true;
			// クローン盤上のパネルを取得
			const fromPanelClone = boardClone.field[move.from.pY][move.from.pX];
			const toPanelClone = boardClone.field[move.to.pY][move.to.pX];
			boardClone.movePiece(fromPanelClone, toPanelClone);
			const score = this.evaluate(boardClone, playerDeg);
			if(score > bestScore){
				bestScore = score;
				bestMove = move;
			}
		});

		if(bestMove){
			board.movePiece(bestMove.from, bestMove.to,true);
			console.log(`CPU(Greedy): (${bestMove.from.pX}, ${bestMove.from.pY}) から (${bestMove.to.pX}, ${bestMove.to.pY}) へ移動 (評価値: ${bestScore})`);
		}
		else{
			// 指し手がある場合はここには来ないはず
			console.log("CPU(Greedy): 最善手が見つかりませんでした。");
		}
	}
}

/** ミニマックスエンジン (アルファベータ枝刈り付き) */
engines["minimax"] = class Minimax extends Manual {
	constructor(board, playerId){
		super(board, playerId);
		this.searchDepth = 3; // 探索の深さ
	}

	/**
	 * ミニマックス法（アルファベータ枝刈り付き）を実行します。
	 * @param {Board} board - 現在の盤面
	 * @param {number} depth - 残りの探索深さ
	 * @param {number} alpha - アルファ値
	 * @param {number} beta - ベータ値
	 * @param {boolean} isMaximizingPlayer - 現在のプレイヤーが最大化プレイヤーかどうか
	 * @returns {number} 評価値
	 */
	minimax(board, depth, alpha, beta, isMaximizingPlayer){
		// 現在のプレイヤーの角度を決定
		const currentPlayerDeg = isMaximizingPlayer ? board.degNormal(this.playerId) : board.degNormal(this.playerId + 180);

		// 探索の終了条件
		if(depth === 0){
			return this.evaluate(board, currentPlayerDeg);
		}

		// 詰み/ステールメイトの判定
		if(isCheckmate(board, currentPlayerDeg)){
			return isMaximizingPlayer ? -Infinity : Infinity; // 詰みは最大化プレイヤーにとって非常に悪い状態
		}
		if(!hasLegalMoves(board, currentPlayerDeg)){
			return 0; // ステールメイト（合法手がないが王手ではない）
		}

		// 合法手の生成
		const movablePieces = [];
		board.field.forEach(row => {
			row.forEach(panel => {
				if(panel.piece && panel.piece.deg === currentPlayerDeg){
					const fromPanel = panel;
					const toPanels = checkTarget(board, fromPanel.piece, fromPanel.pX, fromPanel.pY);
					if(toPanels.length > 0){
						movablePieces.push({ from: fromPanel, tos: toPanels });
					}
				}
			});
		});

		const allPossibleMoves = [];
		movablePieces.forEach(({ from, tos }) => {
			tos.forEach(to => {
				allPossibleMoves.push({ from, to });
			});
		});

		if(isMaximizingPlayer){
			let maxEval = -Infinity;
			for(const move of allPossibleMoves){
				const boardClone = board.clone();
				boardClone.isHeadless = true;
				const fromPanelClone = boardClone.field[move.from.pY][move.from.pX];
				const toPanelClone = boardClone.field[move.to.pY][move.to.pX];
				boardClone.movePiece(fromPanelClone, toPanelClone);

				const minimaxEval = this.minimax(boardClone, depth - 1, alpha, beta, false);
				maxEval = Math.max(maxEval, minimaxEval);
				alpha = Math.max(alpha, minimaxEval);
				if(beta <= alpha){
					break; // アルファベータ枝刈り
				}
			}
			return maxEval;
		} else { // 最小化プレイヤー
			let minEval = Infinity;
			for(const move of allPossibleMoves){
				const boardClone = board.clone();
				boardClone.isHeadless = true;
				const fromPanelClone = boardClone.field[move.from.pY][move.from.pX];
				const toPanelClone = boardClone.field[move.to.pY][move.to.pX];
				boardClone.movePiece(fromPanelClone, toPanelClone);

				const minimaxEval = this.minimax(boardClone, depth - 1, alpha, beta, true);
				minEval = Math.min(minEval, minimaxEval);
				beta = Math.min(beta, minimaxEval);
				if(beta <= alpha){
					break; // アルファベータ枝刈り
				}
			}
			return minEval;
		}
	}

	/**
	 * 手番を処理します。
	 */
	playTurn(){
		const { board, playerId } = this;
		const playerDeg = board.degNormal(playerId);

		let bestMove = null;
		let bestScore = -Infinity;

		// 合法手の生成
		const movablePieces = [];
		board.field.forEach(row => {
			row.forEach(panel => {
				if(panel.piece && panel.piece.deg === playerDeg){
					const fromPanel = panel;
					const toPanels = checkTarget(board, fromPanel.piece, fromPanel.pX, fromPanel.pY);
					if(toPanels.length > 0){
						movablePieces.push({ from: fromPanel, tos: toPanels });
					}
				}
			});
		});

		const allPossibleMoves = [];
		movablePieces.forEach(({ from, tos }) => {
			tos.forEach(to => {
				allPossibleMoves.push({ from, to });
			});
		});

		if(allPossibleMoves.length === 0){
			console.log("CPU(Minimax): 指し手がありません。");
			return;
		}

		// 各合法手を評価
		for(const move of allPossibleMoves){
			const boardClone = board.clone();
			boardClone.isHeadless = true;
			const fromPanelClone = boardClone.field[move.from.pY][move.from.pX];
			const toPanelClone = boardClone.field[move.to.pY][move.to.pX];
			boardClone.movePiece(fromPanelClone, toPanelClone);

			// ミニマックス探索を開始 (相手の番なのでisMaximizingPlayerはfalse)
			const score = this.minimax(boardClone, this.searchDepth - 1, -Infinity, Infinity, false);

			if(score > bestScore){
				bestScore = score;
				bestMove = move;
			} else if(score === bestScore){
				// 評価値が同じ場合、ランダムに選択して繰り返しを避ける
				if(Math.random() < 0.5){ // 50%の確率で新しい手を選ぶ
					bestMove = move;
				}
			}
		}

		if(bestMove){
			board.movePiece(bestMove.from, bestMove.to, true);
			console.log(`CPU(Minimax): (${bestMove.from.pX}, ${bestMove.from.pY}) から (${bestMove.to.pX}, ${bestMove.to.pY}) へ移動 (評価値: ${bestScore})`);
		} else {
			console.log("CPU(Minimax): 最善手が見つかりませんでした。");
		}
	}
}

/** CPUエンジンの管理クラス */
export class CpuEngine{
	/**
	 * @param {Board} board - 対象のボード
	 * @param {string} playerId - プレイヤーID
	 * @param {string} engineName - エンジン名
	 */
	constructor(board, playerId, engineName){
		this.engine = engineName==null?
			new Manual(board, playerId):
			new engines[engineName](board, playerId);
		if(!this.engine) throw new Error(`Engine "${engineName}" not found.`);
	}
	/** 手番操作 */
	playTurn(){
		this.engine.playTurn();
	}
}
