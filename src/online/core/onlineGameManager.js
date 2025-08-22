/** @typedef {import("./data").BoardInitOption} BoardInitOption */
/** @typedef {import("./data").PlayerInfo} PlayerInfo */

export class OnlineGameManager {
    /**
     * @param {Board} board - Boardインスタンス
     */
    constructor(board) {
        this.board = board;
        this.ws = null; // WebSocketインスタンス

        // Boardが発行する'move'イベントを購読
        this.board.addEventListener('move', (e) => {
            this.onBoardMove(e.detail);
        });

        // WebSocket接続のセットアップ (board.jsから移動)
        this.setupWebSocket();
    }

    setupWebSocket() {
        this.ws = new WebSocket("ws://localhost:3000");

        this.ws.onopen = () => {
            console.log("WebSocket connection established.");
            this.ws.send(JSON.stringify({ type: 'join', gameName: this.board.name }));
        };

        this.ws.onmessage = (event) => {
            // onReadyOnline?.(event, this.board); // BoardのonReadyOnlineを呼び出す
            console.log("Received message from server:", event.data);
            try {
                const message = JSON.parse(event.data);
                switch (message.type) {
                    case 'move':
                        // リモートからの移動を適用
                        const fromPanel = this.board.field[message.from.pY][message.from.pX];
                        const toPanel = this.board.field[message.to.pY][message.to.pX];
                        this.applyRemoteMove(fromPanel, toPanel, message.playerDeg);
                        break;
                    case 'playerAssignment':
                        const myPlayer = [...this.board.players.values()].find(p=>p.id === message.playerId);
                        if(myPlayer) {
                            myPlayer.isLocal = true;
                            // Boardのプライベートメソッドは直接呼び出せないため、Boardのパブリックメソッド経由で処理
                            // this.board.#rotateField(myPlayer.deg); // privateメソッドなので直接呼び出せない
                            this.board.stand.rotate(myPlayer.deg); // standはpublic
                            this.board.viewingAngle = myPlayer.deg;
                            if (this.board.autoDrawing) this.board.draw();
                        }
                        break;
                }
            } catch (error) {
                console.error("Error parsing message from server:", error);
            }
        };

        this.ws.onclose = () => {
            console.log("WebSocket connection closed.");
            // this.board.#dialog?.show("接続エラー", "サーバーとの接続が切れました。", [{label: "OK"}]); // Boardのdialogを呼び出す
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            // this.board.#dialog?.show("接続エラー", "サーバーとの接続でエラーが発生しました。", [{label: "OK"}]); // Boardのdialogを呼び出す
        };
    }

    /**
     * Boardからの駒の移動イベントハンドラ
     * @param {object} moveData - 移動データ (fromPanel, toPanel, isCpuMoveなど)
     */
    onBoardMove(moveData) {
        console.log("OnlineGameManager received move event:", moveData);
        // WebSocketが有効なら、サーバーに送信
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const moveToSend = {
                type: 'move',
                from: { pX: moveData.fromPanel.pX, pY: moveData.fromPanel.pY },
                to: { pX: moveData.toPanel.pX, pY: moveData.toPanel.pY },
                // isCpuMove: moveData.isCpuMove, // 必要なら
            };
            this.ws.send(JSON.stringify(moveToSend));
        }
    }

    /**
     * リモートからの移動を適用するメソッド (board.jsから移動)
     * @param {Panel} fromPanel - 移動元のマス目
     * @param {Panel} toPanel - 選択中のマス目
     * @param {number} playerDeg - 移動したプレイヤーの角度
     */
    applyRemoteMove(fromPanel, toPanel, playerDeg) {
        // BoardのapplyRemoteMoveを呼び出す
        this.board.applyRemoteMove(fromPanel, toPanel, playerDeg);
    }
}
