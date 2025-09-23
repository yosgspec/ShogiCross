import { beforeAll, describe, test, expect, afterEach } from "vitest";

if(typeof document === "undefined"){
    global.document = {
        head: { appendChild: ()=>{} },
        body: { _children: [], appendChild(el){ this._children.push(el); }, get children(){ return this._children; } },
        createElement(tag){ const el = { tagName: String(tag).toUpperCase(), style: {}, children: [], textContent: "", appendChild(child){ this.children.push(child); } }; return el; }
    };
}

function bodyChildrenArray(){
    if(Array.isArray(document.body._children)) return document.body._children;
    if(document.body && document.body.children && typeof document.body.children.length === "number") return Array.from(document.body.children);
    return [];
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
    const children = bodyChildrenArray();
    const spinner = children[children.length-2];
    const dim = children[children.length-1];
        expect(spinner.style.display).toBe("none");
        expect(dim.style.display).toBe("none");
        await ov.start();
        expect(spinner.style.display).toBe("block");
        expect(dim.style.display).toBe("block");
    });
});
