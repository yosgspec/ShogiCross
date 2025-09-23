import {canvasFont} from "@/core/canvasFontLoader.js";

describe("canvasFont.loadFont", ()=>{
    test("loadLocalFont should attempt to add FontFace and succeed", async ()=>{
        // ensure unique is set so loadLocalFont uses unique
        canvasFont.unique = "";
        // Provide a minimal FontFace mock if not available in the environment
        const origFontFace = global.FontFace;
        if(typeof global.FontFace === "undefined"){
            global.FontFace = class {
                constructor(name, src, opts){ this.name = name; this.src = src; this.opts = opts; }
                load(){ return Promise.resolve(this); }
            };
            global.document = global.document ?? { fonts: { add: ()=>{} } };
            global.document.fonts = global.document.fonts ?? { add: ()=>{} };
        }
        try{
            await canvasFont.loadLocalFont();
            // after loading local fonts, nothing should throw and imported stays false until importAsync
            expect(canvasFont.imported).toBe(false);
        } finally{
            if(origFontFace) global.FontFace = origFontFace;
        }
    });

    test("loadCdnFont should not throw when fetch returns non-ok", async ()=>{
        // Temporarily stub fetch to return not-ok
        const origFetch = global.fetch;
        global.fetch = async ()=>({ ok: false, text: async ()=>"" });
        try{
            await canvasFont.loadCdnFont(false);
        } finally {
            global.fetch = origFetch;
        }
        // ensure no side-effect other than not imported
        expect(canvasFont.imported).toBe(false);
    });
});
