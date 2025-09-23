describe("BoardOnline.movePiece", ()=>{
    test("should send move message when local player moves", async ()=>{
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

        class MockWebSocket{ constructor(url){ this.readyState=1; this.sent=[]; } send(m){ this.sent.push(m); } close(){} }
        global.WebSocket = MockWebSocket;

        const {BoardOnline} = await import("@/core/boardOnline.js");
        const canvas = document.createElement("canvas");
    const board = new BoardOnline(canvas, {isHeadless: true, playBoard: "default"});

        // make first player local and set displayDeg accordingly
    const p = board.players.values().next().value;
    p.isLocal = true;
        board.displayDeg = p.deg;
        board.isReadyOnline = true;

        // prepare simple panels with pieces
    const from = board.field[1][1];
    const to = board.field[1][2] || board.field[1][1];
    // ensure toPanel is target
    to.addTarget("dummy");
    from.piece = {char: "P", deg: 0};
    to.piece = null;

    // stub parent movePiece to simulate a successful move (avoid recursion)
    const parentMove = vi.spyOn(Object.getPrototypeOf(BoardOnline.prototype), "movePiece").mockResolvedValue(true);
    const res = await BoardOnline.prototype.movePiece.call(board, from, to, false);
    expect(parentMove).toHaveBeenCalled();
    // Should have sent a message
    expect(board.ws.sent.length).toBeGreaterThanOrEqual(1);

    parentMove.mockRestore();

        delete global.WebSocket;
    });
});
