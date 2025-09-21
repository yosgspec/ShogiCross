import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import panelsData from "@/data/panels.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("panels.js data integrity", () => {
    let panelsSpec;

    beforeAll(async () => {
        // doc/data/panels.md の内容を読み込む
        const panelsSpecPath = join(__dirname, "../../doc/data/panels.md");
        panelsSpec = readFileSync(panelsSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(panelsData).toBeDefined();
        expect(typeof panelsData).toBe("object");
        expect(panelsData).not.toBeNull();

        for (const panelName in panelsData) {
            const panel = panelsData[panelName];
            expect(panel).toHaveProperty("name");
            expect(typeof panel.name).toBe("string");

            expect(panel).toHaveProperty("text");
            expect(typeof panel.text).toBe("string");
            expect(panel.text.length).toBe(2); // 全角2文字であること

            expect(panel).toHaveProperty("backgroundColor");
            expect(typeof panel.backgroundColor).toBe("string");

            expect(panel).toHaveProperty("borderColor");
            expect(typeof panel.borderColor).toBe("string");

            // オプションプロパティの型チェック
            if (panel.imgSrc !== undefined) {
                expect(typeof panel.imgSrc).toBe("string");
            }
            if (panel.selectColor !== undefined) {
                expect(typeof panel.selectColor).toBe("string");
            }
            if (panel.targetColor !== undefined) {
                expect(typeof panel.targetColor).toBe("string");
            }
            if (panel.displayText !== undefined) {
                expect(typeof panel.displayText).toBe("string");
                expect(panel.displayText.length).toBe(1); // 1文字のみ
            }
            if (panel.textRotate !== undefined) {
                expect(typeof panel.textRotate).toBe("number");
            }
            if (panel.borderSlashLeft !== undefined) {
                expect(typeof panel.borderSlashLeft).toBe("boolean");
            }
            if (panel.borderSlashRight !== undefined) {
                expect(typeof panel.borderSlashRight).toBe("boolean");
            }
            if (panel.intersect !== undefined) {
                expect(typeof panel.intersect).toBe("boolean");
            }
            if (panel.attr !== undefined) {
                expect(Array.isArray(panel.attr)).toBe(true);
                panel.attr.forEach(attr => {
                    expect(typeof attr).toBe("string");
                });
            }
        }
    });
});
