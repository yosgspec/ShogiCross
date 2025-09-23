import {CpuEngine} from "@/core/cpu.js";

describe("CpuEngine.move", ()=>{
    test("should move a piece", ()=>{
        const mockBoard = {isGameEnd:false, passTurn: ()=>{}, players: new Map(), getActivePlayer: ()=>({deg:0, alive:true}),};
        const mockPlayer = {deg:0, cpuEngine: null, alive:true};
        const wrapper = new CpuEngine(mockBoard, mockPlayer);
        expect(wrapper).toBeInstanceOf(CpuEngine);
   });
});
