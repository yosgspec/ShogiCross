import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import canvasFontData from "@/data/canvasFont.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("canvasFont.js data integrity", () => {
    let canvasFontSpec;

    beforeAll(async () => {
        // doc/data/canvasFont.md の内容を読み込む
        const canvasFontSpecPath = join(__dirname, "../../doc/data/canvasFont.md");
        canvasFontSpec = readFileSync(canvasFontSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(canvasFontData).toBeDefined();
        expect(typeof canvasFontData).toBe("object");
        expect(canvasFontData).not.toBeNull();

        expect(canvasFontData).toHaveProperty("fonts");
        expect(Array.isArray(canvasFontData.fonts)).toBe(true);

        canvasFontData.fonts.forEach(font => {
            expect(Array.isArray(font)).toBe(true);
            expect(font.length).toBe(2);
            expect(typeof font[0]).toBe("string"); // fontName
            expect(typeof font[1]).toBe("number"); // fontWeight
        });
    });
});
