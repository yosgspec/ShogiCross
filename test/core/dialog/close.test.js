import {Dialog} from "@/core/dialog.js";

describe("Dialog.close", ()=>{
    test("should close the dialog", ()=>{
        const d = new Dialog();
        expect(()=>d.close()).not.toThrow();
   });
});
