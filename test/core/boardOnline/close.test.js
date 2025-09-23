describe("BoardOnline.close", ()=>{
    test("should close the online board", async ()=>{
        vi.resetModules();
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

        class MockWebSocket{ constructor(url){ this.readyState=1; this.closed=false; } send(){} close(){ this.readyState=3; this.closed=true; if(this.onclose) this.onclose(); } }
        global.WebSocket = MockWebSocket;

        const {BoardOnline} = await import("@/core/boardOnline.js");
        const canvas = document.createElement("canvas");
        const board = new BoardOnline(canvas, {isHeadless: true, playBoard: "default"});

        expect(board.ws.readyState).toBe(1);
        board.close();
        expect(board.ws.readyState).toBe(3);

        delete global.WebSocket;
    });
});
