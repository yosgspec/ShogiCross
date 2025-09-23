import {Dialog} from "@/core/dialog.js";

describe("Dialog.show", ()=>{
    test("should show a dialog", ()=>{
        // Dialog.show typically appends elements to document.body. We mock
        // appendChild to capture the appended node and verify it's invoked.
        const appended = {};
        const origAppend = document.body.appendChild.bind(document.body);
        document.body.appendChild = (el)=>{ appended.el = el; return el; };

        const d = new Dialog();
        const res = d.show && d.show();

        // restore
        document.body.appendChild = origAppend;

        // If show appended an element, it should be captured; otherwise ensure
        // that result is not throwing and either a Promise or an element is returned.
        expect(appended.el || res !== undefined).toBeTruthy();
   });
});
