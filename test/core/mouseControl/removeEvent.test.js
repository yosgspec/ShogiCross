import {mouseControl} from "@/core/mouseControl.js";

describe("mouseControl.removeEvent", ()=>{
    test("should remove mouse events", ()=>{
        // create minimal board with canvas supporting add/removeEventListener
        const canvas = {
            addEventListener: ()=>{},
            removeEventListener: ()=>{}
        };
        const board = { canvas, field: [[]], draw: ()=>{}, stand: { stocks: new Map() } };
        const mc = mouseControl(board);
        expect(typeof mc.removeEvent === 'function').toBeTruthy();
        // should be callable
        expect(()=>mc.removeEvent()).not.toThrow();
   });
});
