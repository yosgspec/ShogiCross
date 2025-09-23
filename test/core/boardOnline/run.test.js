describe("BoardOnline.run", ()=>{
    test("should run the online board", async ()=>{
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

        class MockWebSocket{ constructor(url){ this.readyState=1; } send(){} close(){} }
        global.WebSocket = MockWebSocket;

        const {BoardOnline} = await import("@/core/boardOnline.js");
        const canvas = document.createElement("canvas");
    const board = BoardOnline.run(canvas, {isHeadless: true, playBoard: "default"});

        expect(board).toBeTruthy();
        expect(board.isOnline).toBe(true);

        delete global.WebSocket;
    });
});
