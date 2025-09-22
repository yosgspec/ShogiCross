// Ensure stable board/panel data for this test (avoid interference from other tests' doMock)
import { vi } from "vitest";
vi.doMock("@/core/data.js", () => ({
    // minimal exports expected by modules that import data.js
    canvasFont: { names: "serif", importAsync: async ()=>{}, fonts: [["Noto", 400]] },
    gameSoft: {},
    games: {},
    boards: {
        "将棋": {
            field: [
                "SSS",
                "SSS",
                "SSS"
            ]
        }
    },
    panels: {
        "S": { name: "S", text: "　　", backgroundColor: "#fff", borderColor: "#000" }
    },
    pieces: {},
    pieceRange: {},
    pieceCost: {},
}));

// Mock other modules that Board imports when not headless
vi.doMock("@/core/canvasImageLoader.js", () => ({
    canvasImage: { importAsync: vi.fn().mockResolvedValue(undefined), images: {} },
}));
vi.doMock("@/core/canvasFontLoader.js", () => ({
    canvasFont: { importAsync: vi.fn().mockResolvedValue(undefined), names: "serif", fonts: [["Noto",400]] },
}));
vi.doMock("@/core/uiControl.js", () => ({ UIControl: vi.fn().mockImplementation(()=>({ add: ()=>{}, remove: ()=>{}, setButtonFont: ()=>{}, setRecordFont: ()=>{} })) }));
vi.doMock("@/core/dialog.js", () => ({ Dialog: vi.fn().mockImplementation(()=>({ show: ()=>{}, close: ()=>{}, setFont: ()=>{} })) }));
vi.doMock("@/core/mouseControl.js", () => ({ mouseControl: vi.fn().mockImplementation(()=>({ resetSelect: ()=>{}, removeEvent: ()=>{} })) }));
vi.doMock("@/core/overlay.js", () => ({ Overlay: vi.fn().mockImplementation(()=>({ start: ()=>{}, stop: ()=>{}, updatePosition: ()=>{} })) }));

const { Board } = await import("@/core/board.js");

describe("Board.draw", ()=>{
    test("should draw the board", ()=>{
        // setup a DOM canvas and mock ctx
        document.body.innerHTML = '<canvas id="c"></canvas>';
        const canvas = document.getElementById("c");
        const mockCtx = {
            restore: ()=>{},
            save: ()=>{},
            clearRect: ()=>{},
            fillRect: ()=>{},
            strokeRect: ()=>{},
            translate: ()=>{},
        };
        canvas.getContext = ()=> mockCtx;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: false, autoDrawing: false});
        // set simple field panels with draw stub
        board.field.forEach(row=> row.forEach(panel=> panel.draw = ()=>{}));
        expect(()=> board.draw()).not.toThrow();
   });
});
