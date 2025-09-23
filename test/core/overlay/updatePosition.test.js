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
beforeAll(async ()=>{ const mod = await import("../../../src/ShogiCross/core/overlay.js"); Overlay = mod.Overlay; });
afterEach(()=>{ if(document.body._children){ document.body._children.length = 0; } });

describe("Overlay.updatePosition", ()=>{
    test("should update the position of spinner and dim overlay based on canvas rect", ()=>{
        const canvas = document.createElement("canvas");
        canvas.getBoundingClientRect = ()=>({ top: 7, left: 13, width: 60, height: 30 });
        const ov = new Overlay(canvas, { useDimOverlay: true, showSpinner: true });
        const children = bodyChildrenArray();
        const spinner = children[children.length-2];
        const dim = children[children.length-1];
        ov.updatePosition();
        expect(dim.style.top).toBe("7px");
        expect(dim.style.left).toBe("13px");
        expect(dim.style.width).toBe("60px");
        expect(dim.style.height).toBe("30px");
        expect(spinner.style.top).toBe(`${7 + 30/2}px`);
        expect(spinner.style.left).toBe(`${13 + 60/2}px`);
    });
});
