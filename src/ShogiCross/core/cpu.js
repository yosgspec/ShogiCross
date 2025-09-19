/** @typedef {import("./player.js").Player} Player */
/** @typedef {import("./boardCore.js").BoardCore} Board */
import {checkTarget, isCheckmate, hasLegalMoves} from "./checkTarget.js";

/** 基底CPUエンジン(手動操作用) */
export class CpuEngineBase{
	/**
	 * @param {Board} board - 対象の盤面
	 * @param {Player} player - プレイヤー情報
	 */
	constructor(board, player){
		this.board = board;
		this.player = player;
	}

	/** 手番操作 */
	async playTurn(){
	}

	/** CPU操作の待機開始
	 * @returns {Promise<()=>Promise<void>>}
	 */
	delayStart(){
		// 思考中であることを示すため、画面を暗転
		this.board.overlay?.start();
		// オーバーレイの描写を待機
		return new Promise(res=>setTimeout(res, 50)).
			then(()=>()=>new Promise(res=>setTimeout(res, this.player.cpuDelay)));
	}

	/** CPU操作の待機終了
	 * @param {Promise<void>} timer
	 */
	async delayEnd(timer){
		await timer;
		// 画面の暗転を終了
		this.board.overlay?.stop();
	}

	/**
	 * 盤面を評価します。
	 * @param {Board} board - 評価対象の盤面
	 * @returns {number} 盤面の評価値
	 */
	evaluate(board=this.board){
		const {player} = this;
		const KING_VALUE = 10000; // 王の価値
		let my_score = 0;

		// 盤上の駒を評価
		board.field.flat().forEach(panel=>{
			if(panel.piece && panel.piece.deg === player.deg){
				const is_king = panel.piece.cost <= 0;
				my_score += is_king ? KING_VALUE : panel.piece.cost;
			}
		});

		// 持ち駒を評価
		board.stand.stocks.forEach((pieces, deg)=>{
			if(deg === player.deg){
				const hand_value = pieces.reduce((acc, piece)=>acc + piece.cost, 0);
				my_score += hand_value;
			}
		});

		return my_score;
	}

	/**
	 * 現在のプレイヤーが可能なすべての合法手を生成します。
	 * @param {number} playerDeg - 手を生成するプレイヤーの角度
	 * @returns {{from: Panel, to: Panel, promotion: string|null}[]} 合法手の配列
	 */
	_generateAllPossibleMoves(playerDeg) {
		const { board } = this;
		const allPossibleMoves = [];

		// 盤上の駒の移動
		board.field.flat().forEach(fromPanel => {
			if (!fromPanel.piece || fromPanel.piece.deg !== playerDeg) return;

			const toPanels = checkTarget(board, fromPanel.piece, fromPanel.pX, fromPanel.pY);
			toPanels.forEach(toPanel => {
				const { piece } = fromPanel;
				const { canPromo, forcePromo } = board.checkCanPromo(piece, toPanel);

				// プロモーション可能な場合
				if (piece.promo && !piece.hasAttr("promoted") && (canPromo || forcePromo)) {
					if (!forcePromo) {
						// 成らない手
						allPossibleMoves.push({ from: fromPanel, to: toPanel, promotion: null });
					}
					// 成る手
					for (const promoChar of Object.keys(piece.promo)) {
						allPossibleMoves.push({ from: fromPanel, to: toPanel, promotion: promoChar });
					}
				} else {
					// プロモーションできない、または関係ない手
					allPossibleMoves.push({ from: fromPanel, to: toPanel, promotion: null });
				}
			});
		});

		// TODO: 持ち駒を打つ手の生成

		return allPossibleMoves;
	}
}

/** CPUエンジン */
export const CpuEngines = {};

/** ランダムで手を打つエンジン */
CpuEngines.random = class Random extends CpuEngineBase{
	constructor(board, player){
		super(board, player);
	}

	async playTurn(){
		const {board, player} = this;
		const timer = (await this.delayStart())();

		const allPossibleMoves = this._generateAllPossibleMoves(player.deg);

		// 3. 指し手が存在する場合、ランダムに1つ選んで指す
		if(allPossibleMoves.length > 0){
			const randomMove = allPossibleMoves[Math.floor(Math.random() * allPossibleMoves.length)];
			await this.delayEnd(timer);
			await board.movePiece(randomMove.from, randomMove.to, true, randomMove.promotion);
			console.log(`CPU(Random): (${randomMove.from.pX}, ${randomMove.from.pY}) から (${randomMove.to.pX}, ${randomMove.to.pY}) へ移動`);
		}
		else{
			console.log("CPU(Random): 指し手がありません。");
			// ゲーム終了やパス処理
		}
	}
};

/** 貪欲法エンジン (1手読み) */
CpuEngines.greedy = class Greedy extends CpuEngineBase{
	constructor(board, player){
		super(board, player);
	}

	/**
	 * 手番を処理します。
	 */
	async playTurn(){
		const {board, player} = this;
		const timer = (await this.delayStart())();
		
		const allPossibleMoves = this._generateAllPossibleMoves(player.deg);

		if(allPossibleMoves.length === 0){
			console.log("CPU(Greedy): 指し手がありません。");
			return;
		}

		let bestMove = null;
		let bestScore = -Infinity;

		for(const move of allPossibleMoves){
			const { from, to, promotion } = move;
			const moveState = board._applyMove(from, to, promotion);
			const score = this.evaluate(board);
			board._unapplyMove(moveState);

			if(score > bestScore){
				bestScore = score;
				bestMove = move;
			}
		}

		if(bestMove){
			await this.delayEnd(timer);
			await board.movePiece(bestMove.from, bestMove.to, true, bestMove.promotion);
			console.log(`CPU(Greedy): (${bestMove.from.pX}, ${bestMove.from.pY}) から (${bestMove.to.pX}, ${bestMove.to.pY}) へ移動 (評価値: ${bestScore})`);
		}
		else{
			// 指し手がある場合はここには来ないはず
			console.log("CPU(Greedy): 最善手が見つかりませんでした。");
		}
	}
};

/** ミニマックスエンジン (アルファベータ枝刈り付き) */
CpuEngines.minimax = class Minimax extends CpuEngineBase{
	constructor(board, player){
		super(board, player);
		this.searchDepth = 2; // 探索の深さ
	}

	/**
	 * ミニマックス法（アルファベータ枝刈り付き）を実行します。
	 * @param {number} depth - 残りの探索深さ
	 * @param {number} alpha - アルファ値
	 * @param {number} beta - ベータ値
	 * @param {boolean} isMaximizingPlayer - 現在のプレイヤーが最大化プレイヤーかどうか
	 * @returns {number} 評価値
	 */
	minimax(depth, alpha, beta, isMaximizingPlayer){
		const { board } = this;
		const activePlayer = board.getActivePlayer();

		// 探索の終了条件
		if(depth === 0) return this.evaluate(board);

		// 詰み/ステールメイトの判定
		if(isCheckmate(board, activePlayer.deg))
			return isMaximizingPlayer ? -Infinity : Infinity; // 詰みは最大化プレイヤーにとって非常に悪い状態
		if(!hasLegalMoves(board, activePlayer.deg))
			return 0; // ステールメイト（合法手がないが王手ではない）

		const allPossibleMoves = this._generateAllPossibleMoves(activePlayer.deg);

		if(isMaximizingPlayer){
			let maxEval = -Infinity;
			for(const move of allPossibleMoves){
				const moveState = board._applyMove(move.from, move.to, move.promotion);
				const evalScore = this.minimax(depth - 1, alpha, beta, false);
				board._unapplyMove(moveState);
				maxEval = Math.max(maxEval, evalScore);
				alpha = Math.max(alpha, evalScore);
				if(beta <= alpha) break; // アルファベータ枝刈り
			}
			return maxEval;
		}
		else{ // 最小化プレイヤー
			let minEval = Infinity;
			for(const move of allPossibleMoves){
				const moveState = board._applyMove(move.from, move.to, move.promotion);
				const evalScore = this.minimax(depth - 1, alpha, beta, true);
				board._unapplyMove(moveState);
				minEval = Math.min(minEval, evalScore);
				beta = Math.min(beta, evalScore);
				if(beta <= alpha) break; // アルファベータ枝刈り
			}
			return minEval;
		}
	}

	/**
	 * 手番を処理します。
	 */
	async playTurn(){
		const {board, player} = this;
		const timer = (await this.delayStart())();
		let bestMove = null;
		let bestScore = -Infinity;

		const allPossibleMoves = this._generateAllPossibleMoves(player.deg);

		if(allPossibleMoves.length === 0){
			console.log("CPU(Minimax): 指し手がありません。");
			return;
		}

		// 各合法手を評価
		for(const move of allPossibleMoves){
			const moveState = board._applyMove(move.from, move.to, move.promotion);
			// ミニマックス探索を開始 (相手の番なのでisMaximizingPlayerはfalse)
			const score = this.minimax(this.searchDepth - 1, -Infinity, Infinity, false);
			board._unapplyMove(moveState);

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
			await this.delayEnd(timer);
			await board.movePiece(bestMove.from, bestMove.to, true, bestMove.promotion);
			console.log(`CPU(Minimax): (${bestMove.from.pX}, ${bestMove.from.pY}) から (${bestMove.to.pX}, ${bestMove.to.pY}) へ移動 (評価値: ${bestScore})`);
		}
		else{
			console.log("CPU(Minimax): 最善手が見つかりませんでした。");
		}
	}
};

/** CPUエンジンの管理クラス */
export class CpuEngine extends CpuEngineBase {
	/** @typedef {Object} CpuEngineBase */
	/** @type {CpuEngineBase} */
	engine;

	/**
	 * @param {Board} board - 対象の盤面
	 * @param {Player} player - プレイヤー情報
	 */
	constructor(board, player){
		super(board, player);
		const engineName = player.cpuEngine?.toLowerCase();
		this.engine = engineName == null?
			null:
			new CpuEngines[engineName](board, player);
	}
	/** 手番操作 */
	async playTurn(){
		// 対戦終了
		if(this.board.isGameEnd) return;
		// プレイヤーが敗北していたらパス扱い
		if(!this.player.alive){
			this.board.passTurn(this.player);
			return;
		}
		// エンジンが未指定の場合は何もしない
		if(!this.engine) return;
		// ターン操作
		await this.engine.playTurn();
	}
}
