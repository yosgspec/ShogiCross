describe("BoardOnline.dropRivalPiece", ()=>{
    test("should call stand.dropPiece and draw", async ()=>{
            // reset modules and provide proper shaped data mock
            vi.resetModules();
            vi.doMock("@/core/data.js", ()=>({
                boards: { default: { field: ["SSS","SSS","SSS"] } },
                panels: { S: { text: "　" } },
                pieces: {},
                canvasFont: { fonts: [["a"]], names: "a" },
                games: {}, gameSoft: {}, pieceRange: {}, pieceCost: {},
            }));

        class MockWebSocket{ constructor(url){ this.readyState=1; } send(){} close(){} }
        global.WebSocket = MockWebSocket;

        const {BoardOnline} = await import("@/core/boardOnline.js");
        const canvas = document.createElement("canvas");

    const board = new BoardOnline(canvas, {isHeadless: true, playBoard: "default"});
    board.autoDrawing = true;

    const dropSpy = vi.spyOn(board.stand, "dropPiece").mockImplementation(()=>true);
    const drawSpy = vi.spyOn(board, "draw").mockImplementation(()=>{});

    const msg = {to: {pX:1,pY:1}, playerDeg: 0, standIndex: 1};
    await board.dropRivalPiece(msg);

        expect(dropSpy).toHaveBeenCalled();
        expect(drawSpy).toHaveBeenCalled();

        dropSpy.mockRestore(); drawSpy.mockRestore();
        delete global.WebSocket;
    });
});
