import { beforeAll, describe, test, expect, afterEach } from "vitest";

if(typeof document === "undefined"){
    global.document = {
        head: { appendChild: ()=>{} },
        body: { _children: [], appendChild(el){ this._children.push(el); }, get children(){ return this._children; } },
        createElement(tag){ const el = { tagName: String(tag).toUpperCase(), style: {}, children: [], textContent: "", appendChild(child){ this.children.push(child); } }; return el; }
    };
}

let Overlay;
beforeAll(async ()=>{
    const mod = await import("../../../src/ShogiCross/core/overlay.js");
    Overlay = mod.Overlay;
});

afterEach(()=>{ if(document.body._children){ document.body._children.length = 0; } });

describe("Overlay.start", ()=>{
    test("should show spinner and dim overlay when started", async ()=>{
        const canvas = document.createElement("canvas");
        canvas.getBoundingClientRect = ()=>({ top: 0, left: 0, width: 20, height: 20 });
        const ov = new Overlay(canvas, { useDimOverlay: true, showSpinner: true });
        const spinner = document.body._children[document.body._children.length-2];
        const dim = document.body._children[document.body._children.length-1];
        expect(spinner.style.display).toBe("none");
        expect(dim.style.display).toBe("none");
        await ov.start();
        expect(spinner.style.display).toBe("block");
        expect(dim.style.display).toBe("block");
    });
});
