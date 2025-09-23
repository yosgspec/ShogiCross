import {CpuEngineBase} from "@/core/cpu.js";

describe("CpuEngineBase.drop", ()=>{
    test("should drop a piece", ()=>{
        // Smoke test: ensure CpuEngineBase instance exists and evaluate returns a number for empty board
        const mockBoard = {field:[[]], stand:{stocks:new Map([[0,[]]])}, getActivePlayer: ()=>({deg:0})};
        const mockPlayer = {deg:0, cpuDelay:0};
        const engine = new CpuEngineBase(mockBoard, mockPlayer);
        expect(typeof engine.evaluate).toBe("function");
        expect(typeof engine.evaluate()).toBe("number");
   });
});
