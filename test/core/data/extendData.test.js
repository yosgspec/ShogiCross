import {extendData} from "@/core/data.js";

describe("extendData", ()=>{
    test("should extend data objects", ()=>{
        expect(()=>extendData({})).not.toThrow();
   });
});
