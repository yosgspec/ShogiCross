import {CpuEngine} from "@/core/cpu.js";

describe("CpuEngine.drop", ()=>{
    test("should not throw when engine is null", async ()=>{
        const mockBoard = {isGameEnd:false, passTurn: ()=>{}, players: new Map(), getActivePlayer: ()=>({deg:0, alive:true}),};
        const mockPlayer = {deg:0, cpuEngine: null, alive:true};
        const wrapper = new CpuEngine(mockBoard, mockPlayer);
        // engine is null, so playTurn should simply return without throwing
        await expect(wrapper.playTurn()).resolves.toBeUndefined();
    });
});
