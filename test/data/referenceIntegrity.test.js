import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import boardsData from "@/data/boards.js";
import gamesData from "@/data/games.js";
import piecesData from "@/data/pieces.js";
import gameSoftData from "@/data/gameSoft.js";
import panelsData from "@/data/panels.js"; // panelsData をインポート
import pieceCostData from "@/data/pieceCost.js"; // pieceCostData をインポート

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("Data Reference Integrity", () => {
    test("gameSoft.playBoard should reference existing boards.js keys", () => {
        for (const gameSoftKey in gameSoftData) {
            const gameSoft = gameSoftData[gameSoftKey];
            expect(boardsData).toHaveProperty(gameSoft.playBoard);
        }
    });

    test("gameSoft.playerOptions.gameName should reference existing games.js keys", () => {
        for (const gameSoftKey in gameSoftData) {
            const gameSoft = gameSoftData[gameSoftKey];
            gameSoft.playerOptions.forEach(playerOption => {
                expect(gamesData).toHaveProperty(playerOption.gameName);
            });
        }
    });

    test("pieces.promo should reference existing pieces.js keys", () => {
        for (const pieceChar in piecesData) {
            const piece = piecesData[pieceChar];
            if (piece.promo !== undefined) {
                // promo が複数の駒の文字を連結した文字列であると仮定
                const promoChars = piece.promo.split(""); // 文字列を1文字ずつに分割
                promoChars.forEach(promoChar => {
                    expect(piecesData).toHaveProperty(promoChar); // 各文字が piecesData のキーとして存在するか確認
                });
            }
        }
    });

    test("games.position piece characters should reference existing pieces.js keys", () => {
        // panelsData のすべてのキーをセットとして取得
        const validPanelChars = new Set(Object.keys(panelsData));
        // piecesData のすべてのキーをセットとして取得
        const validPieceChars = new Set(Object.keys(piecesData));

        // piecesData のすべての alias をセットとして取得
        const validAliasChars = new Set();
        for (const pieceChar in piecesData) {
            const piece = piecesData[pieceChar];
            if (piece.alias !== undefined) {
                // alias が文字列の場合、1文字ずつ分割して追加
                for (const aliasChar of piece.alias) {
                    validAliasChars.add(aliasChar);
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
                            // 特殊文字はスキップ
                            if (char === "・") { // ここで '・' を明示的にスキップ
                                continue;
                            }
                            // panelsData のキーとして存在するか、
                            // piecesData のキーとして存在するか、
                            // または piecesData のいずれかの駒の alias として存在するか
                            if (!validPanelChars.has(char) && !validPieceChars.has(char) && !validAliasChars.has(char)) {
                                missingChars.add(char);
                            }
                        }
                    });
                }
            }
        }
        if (missingChars.size > 0) {
            console.error("以下の文字がpanelsData、piecesData、またはpiecesDataのaliasに存在しません:", Array.from(missingChars));
        }
        expect(missingChars.size).toBe(0);
    });

    test("pieceCost keys should reference existing pieces.js keys", () => {
        const validPieceChars = new Set(Object.keys(piecesData));
        const missingCostKeys = new Set();

        for (const costKey in pieceCostData) {
            if (!validPieceChars.has(costKey)) {
                missingCostKeys.add(costKey);
            }
        }

        if (missingCostKeys.size > 0) {
            console.error("以下のpieceCostのキーがpiecesDataに存在しません:", Array.from(missingCostKeys));
        }
        expect(missingCostKeys.size).toBe(0);
    });
});
