import {canvasFont} from "@/core/canvasFontLoader.js";

describe("canvasFont.importAsync", ()=>{
    test("should set imported to true and update names when called", async ()=>{
        // setup: ensure imported flag is false initially
        canvasFont.imported = false;
        canvasFont.names = "serif";

        // call importAsync (uses mocked data.js in test/setup)
        await canvasFont.importAsync();

        // assertions
        expect(canvasFont.imported).toBe(true);
        expect(typeof canvasFont.names).toBe("string");
        expect(canvasFont.names.length).toBeGreaterThan(0);
    });
});
