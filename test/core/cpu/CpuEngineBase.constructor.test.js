import {CpuEngineBase} from "@/core/cpu.js";

describe("CpuEngineBase.constructor and evaluate", ()=>{
    test("should construct and evaluate a simple board", ()=>{
        const board = {
            field: [
                [{}, {}],
                [{}, {}],
            ],
            stand: { stocks: new Map([[0, []], [90, []], [180, []], [270, []]]) },
        };
        const player = { deg: 0 };
        const engine = new CpuEngineBase(board, player);
        expect(engine.board).toBe(board);
        expect(engine.player).toBe(player);
        // evaluate should return a number
        const val = engine.evaluate();
        expect(typeof val).toBe("number");
    });
});
