import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import pieceRangeData from "@/data/pieceRange.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("pieceRange.js data integrity", () => {
    let pieceRangeSpec;

    beforeAll(async () => {
        // doc/data/pieceRange.md の内容を読み込む
        const pieceRangeSpecPath = join(__dirname, "../../doc/data/pieceRange.md");
        pieceRangeSpec = readFileSync(pieceRangeSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(pieceRangeData).toBeDefined();
        expect(typeof pieceRangeData).toBe("object");
        expect(pieceRangeData).not.toBeNull();

        for (const rangeName in pieceRangeData) {
            const rangeArray = pieceRangeData[rangeName];
            expect(Array.isArray(rangeArray)).toBe(true);
            rangeArray.forEach(row => {
                expect(typeof row).toBe("string");
                expect(row.length).toBeGreaterThan(0); // 空文字列でないこと
            });
        }
    });
});
