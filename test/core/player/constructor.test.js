import { describe, test, expect, vi } from "vitest";

describe("Player.constructor", ()=>{
    test("should import player module", async ()=>{
        const mod = await vi.importActual("../../../src/ShogiCross/core/player.js");
        expect(mod).toBeTruthy();
    });
});
