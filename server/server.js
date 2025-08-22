const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let waitingPlayer = null;
const games = {}; // Store game states

// Helper to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

wss.on('connection', (ws) => {
    console.log('Client connected');
    const clientId = generateId();
    ws.clientId = clientId;

    if (waitingPlayer) {
        // Start a new game
        const gameId = generateId();
        const game = {
            id: gameId,
            players: [waitingPlayer, ws],
        };
        games[gameId] = game;

        // Assign players and start the game
		game.players.forEach((playerWs, i) => {
			playerWs.gameId = gameId;
			const playerDeg = (i * 360 / game.players.length) % 360; // Assuming game.players.length is playerLen
			playerWs.playerDeg = playerDeg; // Store deg on the WebSocket object
			playerWs.send(JSON.stringify({
				type: 'playerAssignment',
				playerId: i, // Player 0 or 1
				playerDeg: playerDeg // Send deg to client as well
			}));
		});

        console.log(`Game ${gameId} started between ${game.players[0].clientId} and ${game.players[1].clientId}`);
        waitingPlayer = null;
    } else {
        // This player is waiting
        waitingPlayer = ws;
        console.log(`Client ${ws.clientId} is waiting for an opponent.`);
        ws.send(JSON.stringify({ type: 'waiting' }));
    }

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            const game = games[ws.gameId];
            if (!game) return;

            // Find the opponent
            const opponent = game.players.find(p => p.clientId !== ws.clientId);

            if (data.type === 'move' && opponent) {
					console.log(`Move from ${ws.clientId} in game ${ws.gameId}:`, data);
					// Add playerDeg to the message
					data.playerDeg = ws.playerDeg; // Get deg from the sender's WebSocket object
					// Broadcast the move to the opponent
					opponent.send(JSON.stringify(data));
				}
            // Handle other message types like 'join' if needed
            else if (data.type === 'join') {
                 console.log(`Join message from ${ws.clientId} for game: ${data.gameName}`);
            }

        } catch (error) {
            console.error('Failed to process message:', message, error);
        }
    });

    ws.on('close', () => {
        console.log(`Client ${ws.clientId} disconnected`);
        const game = games[ws.gameId];
        if (game) {
            // Notify the other player
            const opponent = game.players.find(p => p.clientId !== ws.clientId);
            if (opponent && opponent.readyState === WebSocket.OPEN) {
                opponent.send(JSON.stringify({ type: 'opponentDisconnected' }));
            }
            delete games[ws.gameId];
            console.log(`Game ${ws.gameId} closed.`);
        }
        if (ws === waitingPlayer) {
            waitingPlayer = null;
            console.log('Waiting player disconnected.');
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

// Serve the main project's root directory
app.use(express.static(path.join(__dirname, '..')));
