import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import gamesData from "@/data/games.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("games.js data integrity", () => {
    let gamesSpec;

    beforeAll(async () => {
        // doc/data/games.md の内容を読み込む
        const gamesSpecPath = join(__dirname, "../../doc/data/games.md");
        gamesSpec = readFileSync(gamesSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(gamesData).toBeDefined();
        expect(typeof gamesData).toBe("object");
        expect(gamesData).not.toBeNull();

        for (const gameName in gamesData) {
            const game = gamesData[gameName];
            expect(game).toHaveProperty("english");
            expect(typeof game.english).toBe("string");

            // オプションプロパティの型チェック
            if (game.fontColor !== undefined) {
                expect(typeof game.fontColor).toBe("string");
            }
            if (game.promoteFontColor !== undefined) {
                expect(typeof game.promoteFontColor).toBe("string");
            }
            if (game.backgroundColor !== undefined) {
                expect(typeof game.backgroundColor).toBe("string");
            }
            if (game.promoteBackgroundColor !== undefined) {
                expect(typeof game.promoteBackgroundColor).toBe("string");
            }
            if (game.borderColor !== undefined) {
                expect(typeof game.borderColor).toBe("string");
            }
            if (game.promoteBorderColor !== undefined) {
                expect(typeof game.promoteBorderColor).toBe("string");
            }
            if (game.promoLine !== undefined) {
                expect(typeof game.promoLine).toBe("number");
            }

            expect(game).toHaveProperty("position");
            expect(typeof game.position).toBe("object");
            expect(game.position).not.toBeNull();

            for (const boardSize in game.position) {
                const boardPositions = game.position[boardSize];
                expect(typeof boardPositions).toBe("object");
                expect(boardPositions).not.toBeNull();

                for (const pieceSet in boardPositions) {
                    const positionArray = boardPositions[pieceSet];
                    expect(Array.isArray(positionArray)).toBe(true);
                    positionArray.forEach(row => {
                        expect(typeof row).toBe("string");
                        expect(row.length).toBeGreaterThan(0); // 空文字列でないこと
                    });
                }
            }
        }
    });
});
