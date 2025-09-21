import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import pieceCostData from "@/data/pieceCost.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("pieceCost.js data integrity", () => {
    let pieceCostSpec;

    beforeAll(async () => {
        // doc/data/pieceCost.md の内容を読み込む
        const pieceCostSpecPath = join(__dirname, "../../doc/data/pieceCost.md");
        pieceCostSpec = readFileSync(pieceCostSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(pieceCostData).toBeDefined();
        expect(typeof pieceCostData).toBe("object");
        expect(pieceCostData).not.toBeNull();

        for (const pieceChar in pieceCostData) {
            const cost = pieceCostData[pieceChar];
            expect(typeof cost).toBe("number");
        }
    });
});
