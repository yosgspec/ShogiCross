import {downloadImage} from "@/core/download.js";

describe("downloadImage", ()=>{
    test("uses canvas.toDataURL and triggers anchor click", ()=>{
        // Mock a canvas with toDataURL method
        const canvas = { toDataURL: ()=>'data:image/png;base64,AAA' };
        const created = {};
        const origCreate = document.createElement.bind(document);
        document.createElement = (tag)=>{
            if(tag === 'a'){
                created.href = null;
                created.download = null;
                created.click = ()=>created._clicked = true;
                return created;
            }
            return origCreate(tag);
        };

        downloadImage(canvas, 'png');

        document.createElement = origCreate;
        expect(created._clicked).toBeTruthy();
        expect(created.href && created.href.startsWith('data:image')).toBeTruthy();
    })
})
