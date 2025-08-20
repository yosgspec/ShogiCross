import {Dialog} from "./dialog.js";

class OnlineGameManager {
    #dialog
    constructor(board) { // Boardインスタンスを受け取る
        this.board = board;
        this.ws = null;
        this.eventListeners = {}; // Simple event emitter
        this.#dialog = new Dialog(); // Dialogのインスタンスを生成
        this.#dialog.setFontFamily("serif");
        this.isOnlineGame = false; // オンラインゲームかどうか
    }

    // Simple event emitter methods
    on(eventName, listener) {
        if (!this.eventListeners[eventName]) {
            this.eventListeners[eventName] = [];
        }
        this.eventListeners[eventName].push(listener);
    }

    emit(eventName, data) {
        if (this.eventListeners[eventName]) {
            this.eventListeners[eventName].forEach(listener => listener(data));
        }
    }

    connect(gameName) {
        this.isOnlineGame = true; // 接続時にオンラインゲームフラグを立てる
        this.ws = new WebSocket("ws://localhost:3000");

        this.ws.onopen = () => {
            console.log("WebSocket connection established.");
            this.ws.send(JSON.stringify({ type: 'join', gameName: gameName }));
            this.emit('connected');
        };

        this.ws.onmessage = (event) => {
            console.log("Received message from server:", event.data);
            try {
                const message = JSON.parse(event.data);
                switch (message.type) {
                    case 'move':
                        this.applyRemoteMove(message); // リモートからの移動を適用
                        break;
                    case 'playerAssignment':
                        this.handlePlayerAssignment(message); // プレイヤー割り当てを処理
                        break;
                    case 'opponentDisconnected': // Assuming server sends this
                        this.emit('opponentDisconnected');
                        this.#dialog?.show("接続エラー", "対戦相手との接続が切れました。", [{label: "OK"}]);
                        break;
                    // Add other message types as needed
                }
            } catch (error) {
                console.error("Error parsing message from server:", error);
                this.emit('error', error);
            }
        };

        this.ws.onclose = () => {
            console.log("WebSocket connection closed.");
            this.emit('disconnected');
            this.#dialog?.show("接続エラー", "サーバーとの接続が切れました。", [{label: "OK"}]);
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            this.emit('error', error);
            this.#dialog?.show("接続エラー", "サーバーとの接続でエラーが発生しました。", [{label: "OK"}]);
        };
    }

    sendMove(fromPanel, toPanel) { // BoardのmovePieceから呼ばれる
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const moveData = {
                type: 'move',
                from: { pX: fromPanel.pX, pY: fromPanel.pY },
                to: { pX: toPanel.pX, pY: toPanel.pY },
                playerDeg: this.board.getActivePlayer().deg, // 現在の手番のプレイヤーの角度
            };
            this.ws.send(JSON.stringify(moveData));
        } else {
            console.warn("WebSocket not open. Cannot send move.");
        }
    }

    applyRemoteMove(message) {
        console.log(message)
        const fromPanel = this.board.field[message.from.pY][message.from.pX];
        const toPanel = this.board.field[message.to.pY][message.to.pX];
        this.board.executeMove(fromPanel, toPanel, message.playerDeg);
    }

    handlePlayerAssignment(message) {
        const myPlayer = [...this.board.players.values()].find(p => p.id === message.playerId);
        if (myPlayer) {
            myPlayer.isLocal = true;
            // If I am player 1 (180 degrees), rotate the board to my view.
            this.board.rotateField(myPlayer.deg);
            this.board.stand.rotate(myPlayer.deg);
            this.board.viewingAngle = myPlayer.deg;
            if (this.board.autoDrawing) this.board.draw();
        }
    }

    // Add other methods like disconnect() if needed
}

export { OnlineGameManager };