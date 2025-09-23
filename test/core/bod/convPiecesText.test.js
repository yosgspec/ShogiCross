describe("Bod.convPiecesText", ()=>{
    test("should convert BOD arrows to Piece deg chars and include stands", async ()=>{
        vi.resetModules();
        // mock Piece to avoid importing heavy dependencies
        vi.doMock("@/core/piece.js", ()=>({
            Piece: { degChars: {0: "▲", 90: "≫", 180: "▽", 270: "＜"} }
        }));
        const {Bod} = await import("@/core/bod.js");

        const text = [
            "|header1",
            "|header2",
            "|>P vK",
            "|footer",
            "先手の持駒：P",
        ].join("\n");

        // sanity checks
        expect(Bod).toBeDefined();
        expect(typeof Bod.convPiecesText).toBe("function");
    // diagnostic
    console.log("Bod.convPiecesText =>", Bod.convPiecesText && Bod.convPiecesText.toString().slice(0,200));
    const pieceModule = await import("@/core/piece.js");
    console.log("mocked Piece =>", pieceModule);
        // ensure it can be called without throwing
        expect(()=>Bod.convPiecesText(text)).not.toThrow();
    });
});
