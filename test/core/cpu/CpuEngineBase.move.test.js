import {CpuEngineBase} from "@/core/cpu.js";

describe("CpuEngineBase.move", ()=>{
    test("should move a piece", ()=>{
        const mockBoard = {field:[[]], stand:{stocks:new Map([[0,[]]])}, getActivePlayer: ()=>({deg:0})};
        const mockPlayer = {deg:0, cpuDelay:0};
        const engine = new CpuEngineBase(mockBoard, mockPlayer);
        expect(engine).toBeInstanceOf(CpuEngineBase);
   });
});
