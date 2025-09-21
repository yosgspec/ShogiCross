import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import gamesData from "@/data/games.js";
import piecesData from "@/data/pieces.js";
import panelsData from "@/data/panels.js";

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("Identify missing characters in games.position", () => {
    test("should identify characters not found in panelsData or piecesData", () => {
        const validPanelChars = new Set(Object.keys(panelsData));
        const validPieceChars = new Set(Object.keys(piecesData));
        for (const pieceKey in piecesData) {
            if (piecesData[pieceKey].alias) {
                if (Array.isArray(piecesData[pieceKey].alias)) {
                    piecesData[pieceKey].alias.forEach(aliasChar => validPieceChars.add(aliasChar));
                } else {
                    validPieceChars.add(piecesData[pieceKey].alias);
                }
            }
        }
        const missingChars = new Set();

        for (const gameName in gamesData) {
            const game = gamesData[gameName];
            for (const boardSize in game.position) {
                const boardPositions = game.position[boardSize];
                for (const pieceSet in boardPositions) {
                    const positionArray = boardPositions[pieceSet];
                    positionArray.forEach(row => {
                        for (const char of row) {
                            if (char === "・") {
                                continue;
                            }
                            if (!validPanelChars.has(char) && !validPieceChars.has(char)) {
                                missingChars.add(char);
                            }
                        }
                    });
                }
            }
        }
        // 期待されるのは missingChars が空であること
        // もし空でなければ、どの文字が不足しているかを出力
        if (missingChars.size > 0) {
            console.error("以下の文字がpanelsDataまたはpiecesDataに存在しません:", Array.from(missingChars));
        }
        expect(missingChars.size).toBe(0);
    });
});
