import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import piecesData from "@/data/pieces.js";
import gamesData from "@/data/games.js"; // gamesData をインポート
import pieceRangeData from "@/data/pieceRange.js"; // pieceRangeData をインポート

// __dirname の代替
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

describe("pieces.js data integrity", () => {
    let piecesSpec;

    beforeAll(async () => {
        // doc/data/pieces.md の内容を読み込む
        const piecesSpecPath = join(__dirname, "../../doc/data/pieces.md");
        piecesSpec = readFileSync(piecesSpecPath, "utf-8");
    });

    test("should have correct structure and types", () => {
        expect(piecesData).toBeDefined();
        expect(typeof piecesData).toBe("object");
        expect(piecesData).not.toBeNull();

        const allowedUnits = new Set(["兵", "馬", "象", "砲", "車", "臣", "王"]); // "砲" を追加
        const allowedAttr = new Set([
            "king", "promoted", "cantPromotion", "capture", "castlingKing",
            "castlingRook", "enPassant", "unCrossRiver", "inPalace",
            "cantSeeKing", "pao", "po", "swapHorseElephant", "usePass",
            "bikjang", "countingRules", "ruleThrough", "cantCapture", "twoSwallows"
        ]);
        const allowedRangeNames = new Set([
            "default", "attack", "start", "castling", "enPassant", "palaceSlash"
        ]);

        for (const pieceChar in piecesData) {
            const piece = piecesData[pieceChar];
            expect(piece).toHaveProperty("name");
            expect(typeof piece.name).toBe("string");

            expect(piece).toHaveProperty("display");
            expect(Array.isArray(piece.display)).toBe(true);
            piece.display.forEach(displayStr => {
                expect(typeof displayStr).toBe("string");
                expect(displayStr.length).toBeGreaterThan(0); // 空文字列でないこと
                // expect(displayStr.length).toBeLessThanOrEqual(2); // 1または2文字 (削除)
            });

            // gameName のチェック
            if (piece.gameName !== undefined) {
                expect(typeof piece.gameName).toBe("string");
                expect(gamesData).toHaveProperty(piece.gameName); // gamesData に存在すること
            }

            // imgSrc のチェック
            if (piece.imgSrc !== undefined) {
                expect(typeof piece.imgSrc).toBe("object"); // オブジェクトであること
                expect(piece.imgSrc).not.toBeNull();
                for (const deg in piece.imgSrc) {
                    expect(typeof deg).toBe("string"); // キーが文字列（角度）
                    expect(Array.isArray(piece.imgSrc[deg])).toBe(true);
                    piece.imgSrc[deg].forEach(imgPath => {
                        expect(typeof imgPath).toBe("string"); // 画像パスが文字列
                    });
                }
            }

            // isRotateImg のチェック
            if (piece.isRotateImg !== undefined) {
                expect(typeof piece.isRotateImg).toBe("boolean");
            }

            // alias のチェック
            if (piece.alias !== undefined) {
                expect(typeof piece.alias).toBe("string");
            }

            // expansion のチェック
            if (piece.expansion !== undefined) {
                expect(typeof piece.expansion).toBe("string");
            }

            // unit のチェック
            if (piece.unit !== undefined) { // unit が存在する場合のみチェック
                expect(typeof piece.unit).toBe("string");
                expect(allowedUnits.has(piece.unit)).toBe(true); // 許容される値のいずれか
            }

            // forcePromoLine のチェック
            if (piece.forcePromoLine !== undefined) {
                expect(typeof piece.forcePromoLine).toBe("number");
            }

            // range のチェック
            expect(piece).toHaveProperty("range");
            expect(typeof piece.range).toBe("object");
            expect(piece.range).not.toBeNull();
            for (const rangeName in piece.range) {
                // rangeName が allowedRangeNames に含まれるか、または "steps" または "castling" であるか
                expect(allowedRangeNames.has(rangeName) || rangeName === "steps" || rangeName === "castling").toBe(true);
                const rangeValue = piece.range[rangeName];

                if (typeof rangeValue === "string") {
                    // rangeValue が pieceRangeData のキーとして存在するか
                    expect(pieceRangeData).toHaveProperty(rangeValue);
                } else if (Array.isArray(rangeValue)) {
                    // 配列の場合、その要素を再帰的にチェック
                    rangeValue.forEach(item => {
                        expect(typeof item).toBe("object");
                        expect(item).not.toBeNull();
                        for (const key in item) {
                            const char = item[key];
                            // char が文字列であることを確認
                            // ここで char がオブジェクトになるケースがあるため、typeof char === "object" の場合も考慮
                            if (typeof char === "object" && char !== null) {
                                // さらにネストされたオブジェクトの場合、その中身をチェック (簡易的)
                                for (const nestedKey in char) {
                                    const nestedChar = char[nestedKey];
                                    expect(typeof nestedChar).toBe("string");
                                    if (!pieceRangeData.hasOwnProperty(nestedChar) && !piecesData.hasOwnProperty(nestedChar)) {
                                        throw new Error(`Invalid character in range (nested object value): ${nestedChar} for piece ${pieceChar}, range ${rangeName}, item key ${key}, nested key ${nestedKey}`);
                                    }
                                }
                            } else {
                                expect(typeof char).toBe("string");
                                // char が pieceRangeData のキーとして存在するか、または piecesData のキーとして存在するか
                                if (!pieceRangeData.hasOwnProperty(char) && !piecesData.hasOwnProperty(char)) {
                                    throw new Error(`Invalid character in range (array item): ${char} for piece ${pieceChar}, range ${rangeName}, key ${key}`);
                                }
                            }
                        }
                    });
                } else {
                    // その他のオブジェクト形式の場合 (例: {"enPassant": "通"})
                    expect(typeof rangeValue).toBe("object");
                    expect(rangeValue).not.toBeNull();
                    for (const key in rangeValue) {
                        const char = rangeValue[key];
                        expect(typeof char).toBe("string");
                        // char が pieceRangeData のキーとして存在するか、または piecesData のキーとして存在するか
                        if (!pieceRangeData.hasOwnProperty(char) && !piecesData.hasOwnProperty(char)) {
                            throw new Error(`Invalid character in range (object value): ${char} for piece ${pieceChar}, range ${rangeName}, key ${key}`);
                        }
                    }
                }
            }

            // promo のチェック
            if (piece.promo !== undefined) {
                expect(typeof piece.promo).toBe("string");
                // 各文字が piecesData のキーとして存在するかは referenceIntegrity.test.js でチェック済み
            }

            // attr のチェック
            if (piece.attr !== undefined) {
                expect(Array.isArray(piece.attr)).toBe(true);
                piece.attr.forEach(attr => {
                    expect(typeof attr).toBe("string");
                    expect(allowedAttr.has(attr)).toBe(true); // 許容される属性値のいずれか
                });
            }
        }
    });
});