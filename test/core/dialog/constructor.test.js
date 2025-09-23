import {Dialog} from "@/core/dialog.js";

describe("Dialog.constructor", ()=>{
    test("should construct a dialog", ()=>{
        const d = new Dialog();
        expect(d).toBeInstanceOf(Dialog);
   });
});
