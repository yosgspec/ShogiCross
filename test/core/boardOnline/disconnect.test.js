describe("BoardOnline.disconnect", ()=>{
    test("should send disconnect and close", async ()=>{
        vi.resetModules();
        vi.doMock("@/core/data.js", ()=>({
            boards: { default: { field: ["SSS","SSS","SSS"] } },
            panels: { S: { text: "　" } },
            pieces: {},
            canvasFont: { fonts: [["a"]], names: "a" },
            games: {}, gameSoft: {}, pieceRange: {}, pieceCost: {},
        }));

        class MockWebSocket{ constructor(url){ this.readyState=1; this.sent=[]; } send(m){ this.sent.push(m); } close(){ this.readyState=3; } }
        global.WebSocket = MockWebSocket;

        const {BoardOnline} = await import("@/core/boardOnline.js");
        const canvas = document.createElement("canvas");
        const board = new BoardOnline(canvas, {isHeadless: true, playBoard: "default"});

        // stub dialog.show to avoid UI
        if(board.dialog) vi.spyOn(board.dialog, "show").mockImplementation(()=>{});

        board.disconnect();

        const parsed = board.ws.sent.map(s=>{ try{ return JSON.parse(s); }catch(e){ return null; } });
        expect(parsed.some(o=>o && o.type === "disconnect")).toBeTruthy();

        delete global.WebSocket;
    });
});
