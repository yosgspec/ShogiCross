import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import boardsData from "@/data/boards.js";
import panelsData from "@/data/panels.js"; // panelsData をインポート

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("boards.js data integrity", () => {
    let boardsSpec;

    beforeAll(async () => {
        // doc/data/boards.md の内容を読み込む
        const boardsSpecPath = join(__dirname, "../../doc/data/boards.md");
        boardsSpec = readFileSync(boardsSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        // ここで boardsData と boardsSpec を比較して検証するロジックを記述
        // boardsSpec のパースは複雑なので、まずは簡単な検証から始める

        // 例: backgroundColor が存在し、文字列であること
        expect(boardsData).toBeDefined();
        expect(typeof boardsData).toBe("object");
        expect(boardsData).not.toBeNull();

        for (const gameName in boardsData) {
            const board = boardsData[gameName];
            expect(board).toHaveProperty("backgroundColor");
            expect(typeof board.backgroundColor).toBe("string");

            expect(board).toHaveProperty("borderColor");
            expect(typeof board.borderColor).toBe("string");

            expect(board).toHaveProperty("field");
            expect(Array.isArray(board.field)).toBe(true);
            board.field.forEach(row => {
                expect(typeof row).toBe("string");
                expect(row.length).toBeGreaterThan(0); // 空文字列でないこと
            });

            // オプションプロパティの型チェック
            if (board.promoLineOffset !== undefined) {
                expect(typeof board.promoLineOffset).toBe("number");
            }
            if (board.sidePromo !== undefined) {
                expect(typeof board.sidePromo).toBe("boolean");
            }
        }
    });

    test("field characters should reference existing panels.js keys", () => {
        // panelsData のすべてのキーをセットとして取得
        const validPanelChars = new Set(Object.keys(panelsData));

        for (const gameName in boardsData) {
            const board = boardsData[gameName];
            board.field.forEach(row => {
                for (const char of row) {
                    // panelsData のキーとして存在するかどうかをチェック
                    expect(validPanelChars.has(char)).toBe(true);
                }
            });
        }
    });

    // TODO: boards.md の内容をパースして、より厳密な検証を行うテストを追加
});
