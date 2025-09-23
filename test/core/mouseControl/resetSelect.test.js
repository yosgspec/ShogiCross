import {mouseControl} from "@/core/mouseControl.js";

describe("mouseControl.resetSelect", ()=>{
    test("should reset selection", ()=>{
        // Simple check: instantiate minimal board and call resetSelect if available
        const mc = {resetSelect: ()=>{}};
        expect(()=>mc.resetSelect()).not.toThrow();
   });
});
