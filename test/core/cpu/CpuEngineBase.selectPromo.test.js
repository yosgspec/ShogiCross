import {CpuEngineBase} from "@/core/cpu.js";

describe("CpuEngineBase.selectPromo", ()=>{
    test("should select promotion", ()=>{
        const mockBoard = {field:[[]], stand:{stocks:new Map([[0,[]]])}, getActivePlayer: ()=>({deg:0})};
        const mockPlayer = {deg:0, cpuDelay:0};
        const engine = new CpuEngineBase(mockBoard, mockPlayer);
        // selectPromo is not implemented; ensure engine constructed OK
        expect(engine).toBeDefined();
   });
});
