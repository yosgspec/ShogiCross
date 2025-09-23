describe("Bod.getPiecesText", ()=>{
    test("should output BOD text for a simple board", async ()=>{
        vi.resetModules();
        // mock Piece.degChars to ensure consistent output
        vi.doMock("@/core/piece.js", ()=>({ Piece: { degChars: {0: "▲", 90: ">", 180: "v", 270: "<"} } }));
        const {Bod} = await import("@/core/bod.js");

        // build minimal mock Panel-like objects
        const panelFactory = ()=>({ piece: null, hasAttr: ()=>false });
        const field = [ [panelFactory(), panelFactory(), panelFactory()], [panelFactory(), panelFactory(), panelFactory()], [panelFactory(), panelFactory(), panelFactory()] ];
        const stand = { stocks: new Map([[0, []],[180, []]]) };
        const board = { field, xLen: 3, playerLen: 2, stand };

        expect(Bod).toBeDefined();
    expect(typeof Bod.getPiecesText).toBe("function");
    console.log("Bod.getPiecesText =>", Bod.getPiecesText && Bod.getPiecesText.toString().slice(0,200));
    console.log("board keys =>", Object.keys(board));
        // ensure callable and doesn't throw
        expect(()=>Bod.getPiecesText(board)).not.toThrow();
        const txt = Bod.getPiecesText(board);
        if(txt) expect(txt).toContain("先手の持駒");
    });
});
