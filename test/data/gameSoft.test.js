import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import gameSoftData from "@/data/gameSoft.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("gameSoft.js data integrity", () => {
    let gameSoftSpec;

    beforeAll(async () => {
        // doc/data/gameSoft.md の内容を読み込む
        const gameSoftSpecPath = join(__dirname, "../../doc/data/gameSoft.md");
        gameSoftSpec = readFileSync(gameSoftSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(gameSoftData).toBeDefined();
        expect(typeof gameSoftData).toBe("object");
        expect(gameSoftData).not.toBeNull();

        for (const gameSoftName in gameSoftData) {
            const gameSoft = gameSoftData[gameSoftName];
            expect(gameSoft).toHaveProperty("name");
            expect(typeof gameSoft.name).toBe("string");

            expect(gameSoft).toHaveProperty("playBoard");
            expect(typeof gameSoft.playBoard).toBe("string");

            expect(gameSoft).toHaveProperty("useStand");
            expect(typeof gameSoft.useStand).toBe("boolean");

            expect(gameSoft).toHaveProperty("playerOptions");
            expect(Array.isArray(gameSoft.playerOptions)).toBe(true);
            gameSoft.playerOptions.forEach(option => {
                expect(typeof option).toBe("object");
                expect(option).toHaveProperty("gameName");
                expect(typeof option.gameName).toBe("string");
                if (option.pieceSet !== undefined) {
                    expect(typeof option.pieceSet).toBe("string");
                }
                if (option.cpuEngine !== undefined) {
                    expect(typeof option.cpuEngine).toBe("string");
                }
            });

            // オプションプロパティの型チェック
            if (gameSoft.variant !== undefined) {
                expect(typeof gameSoft.variant).toBe("string");
            }
            if (gameSoft.url !== undefined) {
                expect(typeof gameSoft.url).toBe("string");
            }
            if (gameSoft.desc !== undefined) {
                expect(typeof gameSoft.desc).toBe("string");
            }
        }
    });
});
