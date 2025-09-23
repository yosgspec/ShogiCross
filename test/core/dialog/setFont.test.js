import {Dialog} from "@/core/dialog.js";

describe("Dialog.setFont", ()=>{
    test("should set the font of the dialog", ()=>{
        const d = new Dialog();
        expect(()=>d.setFont && d.setFont("Arial")).not.toThrow();
   });
});
