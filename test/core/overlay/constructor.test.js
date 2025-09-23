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

afterEach(()=>{
    // cleanup any appended children in tests
    const arr = bodyChildrenArray();
    if(arr && arr.length) arr.length = 0;
});

describe("Overlay.constructor", ()=>{
    test("should construct an Overlay object and create elements", ()=>{
        const canvas = document.createElement("canvas");
        canvas.getBoundingClientRect = ()=>({ top: 0, left: 0, width: 10, height: 10 });
        const before = bodyChildrenArray().length;
        const ov = new Overlay(canvas, { useDimOverlay: true, showSpinner: true });
        expect(ov).toBeTruthy();
        expect(typeof ov.start).toBe("function");
        expect(typeof ov.stop).toBe("function");
        expect(typeof ov.updatePosition).toBe("function");
        const after = bodyChildrenArray().length;
        expect(after).toBeGreaterThanOrEqual(before + 1);
    });
});
