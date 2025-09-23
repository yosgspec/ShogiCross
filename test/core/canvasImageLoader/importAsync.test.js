import { vi } from "vitest";

describe("canvasImage.importAsync", ()=>{
    test("should import images asynchronously and set imported flag", async ()=>{
        // import the real module dynamically to avoid test/setup mock override
        const mod = await vi.importActual("../../../src/ShogiCross/core/canvasImageLoader.js");
        const canvasImage = mod.canvasImage;
        // reset
        canvasImage.imported = false;
        canvasImage.images = {};

        // Call importAsync and ensure imported becomes true
        await canvasImage.importAsync();
        expect(canvasImage.imported).toBe(true);
        // images object should be an object (may be empty in mocked data)
        expect(typeof canvasImage.images).toBe("object");
    });
});
