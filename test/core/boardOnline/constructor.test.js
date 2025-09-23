describe("BoardOnline.constructor", ()=>{
    test("should construct an online board", async ()=>{
        // reset module registry so mocks apply cleanly
        vi.resetModules();
        // minimal data mock
        vi.doMock("@/core/data.js", ()=>({
            boards: { default: { field: ["SSS","SSS","SSS"] } },
            panels: { S: { text: "　" } },
            pieces: {},
            canvasFont: { fonts: [["a"]], names: "a" },
            games: {},
            gameSoft: {},
            pieceRange: {},
            pieceCost: {},
        }));

        // Mock WebSocket class (do not auto-trigger onopen)
        class MockWebSocket{
            constructor(url){
                this.url = url;
                this.sent = [];
                this.readyState = 1; // OPEN
                this.closed = false;
            }
            send(msg){ this.sent.push(msg); }
            close(){ this.readyState = 3; this.closed = true; if(this.onclose) this.onclose(); }
        }
        // stub global WebSocket
        global.WebSocket = MockWebSocket;

        const {BoardOnline} = await import("@/core/boardOnline.js");
        const canvas = document.createElement("canvas");
    const board = new BoardOnline(canvas, {isHeadless: true, playBoard: "default"});

        expect(board).toBeTruthy();
        expect(board.isOnline).toBe(true);
        expect(board.isReadyOnline).toBe(false);
        expect(board.roomId).toBeNull();
        expect(board.ws).toBeInstanceOf(MockWebSocket);
    // players should have isLocal property set to false
    for(const p of board.players.values()) expect(p.isLocal).toBe(false);

        // cleanup
        delete global.WebSocket;
    });
});
