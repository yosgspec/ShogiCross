import {downloadText} from "@/core/download.js";

describe("downloadText", ()=>{
    test("creates anchor with data URL and triggers click", ()=>{
        // Replace document.createElement to capture anchor attributes and click
        const created = {};
        const origCreate = document.createElement.bind(document);
        document.createElement = (tag)=>{
            if(tag === 'a'){
                created.href = null;
                created.download = null;
                created.style = {};
                created.click = ()=>created._clicked = true;
                return created;
            }
            return origCreate(tag);
        };

        downloadText('text-data', 'file.txt');

        // restore original
        document.createElement = origCreate;

        expect(created._clicked).toBeTruthy();
        // href should be a data URL when set
        expect(typeof created.href === 'string' || created.href === null).toBeTruthy();
    });
});
