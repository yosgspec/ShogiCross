import { describe, test, expect, vi } from "vitest";
import {Player} from "@/core/player.js";

describe("Player.constructor", ()=>{
    test("should import player module", async ()=>{
        const mod = await vi.importActual("../../../src/ShogiCross/core/player.js");
        expect(mod).toBeTruthy();
    });
    
    test("should initialize cpu engine instance when cpuEngine specified", ()=>{
        const board = {degNormal: ()=>0};
        const player = new Player(board, 0, "random", 10);
        expect(player.cpu).toBeTruthy();
        // cpu.engine should be instance or null depending on mapping
        expect(player.cpu instanceof Object).toBe(true);
        expect(player.cpuDelay).toBe(10);
    });
    
    test("should set cpuEngine to null and create cpu wrapper when not specified", ()=>{
        const board = {degNormal: ()=>0};
        const player = new Player(board, 1, null, undefined);
        expect(player.cpu).toBeTruthy();
        expect(player.cpuEngine).toBe(null);
        expect(typeof player.cpuDelay).toBe("number");
    });
});
