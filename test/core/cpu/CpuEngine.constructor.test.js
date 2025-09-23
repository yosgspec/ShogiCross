import {CpuEngine, CpuEngines} from "@/core/cpu.js";

describe("CpuEngine.constructor", ()=>{
    test("should construct a CpuEngine with no engine when player has none", ()=>{
        const board = { isGameEnd: false };
        const player = { cpuEngine: null };
        const cpu = new CpuEngine(board, player);
        expect(cpu).toBeInstanceOf(CpuEngine);
        expect(cpu.engine).toBeNull();
    });

    test("should construct a CpuEngine with a named engine when provided", ()=>{
        const board = { isGameEnd: false };
        const player = { cpuEngine: "Random", cpuDelay: 0, deg: 0, alive: true };
        const cpu = new CpuEngine(board, player);
        // engine should be instance of one of CpuEngines
        expect(cpu.engine).not.toBeNull();
        expect(typeof cpu.engine.playTurn).toBe("function");
    });
    
    test("playTurn should do nothing when engine is null", async ()=>{
        const board = {isGameEnd: false};
        const player = {cpuEngine: null, alive: true};
        const cpu = new CpuEngine(board, player);
        // should not throw
        await expect(cpu.playTurn()).resolves.not.toThrow();
    });
});
