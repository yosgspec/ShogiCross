describe("BoardOnline.moveRivalPiece", ()=>{
    test("should apply rival move and call draw/emitGameOver", async ()=>{
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
    const board = new BoardOnline(canvas, {isHeadless: true, playBoard: "default"});
    board.autoDrawing = true;
    // stub global alert used by onGameOver default
    global.alert = vi.fn();

        // spy on simpleMovePiece and promoPiece and stand.capturePiece
        const simpleSpy = vi.spyOn(board, "simpleMovePiece").mockImplementation(()=>{});
        const promoSpy = vi.spyOn(board, "promoPiece").mockResolvedValue(true);
        const captureSpy = vi.spyOn(board.stand, "capturePiece").mockImplementation(()=>{});
        const drawSpy = vi.spyOn(board, "draw").mockImplementation(()=>{});

        // prepare in-bounds panels and pieces for 3x3 board
        board.field[1][1].piece = {id: 10};
        board.field[1][2].piece = null;
        const msg = {from: {pX:1,pY:1}, to: {pX:2,pY:1}, playerDeg: 0, promoChar: null};
        await board.moveRivalPiece(msg);

        expect(captureSpy).toHaveBeenCalled();
        expect(simpleSpy).toHaveBeenCalled();
        expect(promoSpy).toHaveBeenCalled();
        expect(drawSpy).toHaveBeenCalled();

        simpleSpy.mockRestore(); promoSpy.mockRestore(); captureSpy.mockRestore(); drawSpy.mockRestore();
        delete global.WebSocket;
        delete global.alert;
    });
});
