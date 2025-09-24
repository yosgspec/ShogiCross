import { describe, test, beforeAll, expect } from "vitest";

class MockPanel {
    constructor(pX, pY, piece=null){
        this.pX = pX; this.pY = pY; this.piece = piece; this.attr = []; this._targets = [];
    }
    hasAttr(a){ return this.attr.includes(a); }
    addTarget(rangeName){ this._targets.push(rangeName); }
    hasTarget(rangeName){ return this._targets.includes(rangeName); }
}

class MockPiece{
    constructor({deg=0, attrs=[], range=null, isMoved=false, cost=1} = {}){
        this.deg = deg; this._attrs = attrs; this._range = range; this.isMoved = isMoved; this.cost = cost;
    }
    hasAttr(a){ return this._attrs.includes(a); }
    getRange(){ return this._range; }
}

function makeBoard(field){
    return { field, yLen: field.length, enPassant: { setTarget: ()=>{}, isTarget: ()=>true }, getRow: ()=>0 };
}

let checkTarget;
describe("checkTarget - various range chars and options", ()=>{
    beforeAll(async ()=>{
        // provide minimal document so modules that query it don't fail
        global.document = global.document || { querySelector: ()=>null };
        const mod = await import("../../../src/ShogiCross/core/checkTarget.js");
        checkTarget = mod.checkTarget;
    });

    test("point move 'o' sets default target", async ()=>{
        const piece = new MockPiece({ range: { default: [["O"],["o"]] } });
        const a = new MockPanel(0,0,piece);
        const b = new MockPanel(0,1,null);
        const board = makeBoard([[a],[b]]);

        const res = checkTarget(board, piece, 0, 0);
        expect(res.length).toBe(1);
        expect(b.hasTarget('default')).toBe(true);
    });

    test("attack range only targets enemy pieces (deg mismatch)", async ()=>{
        const piece = new MockPiece({ deg: 0, range: { attack: [["O"],["o"]] } });
        const enemy = new MockPiece({ deg: 1 });
        const same = new MockPiece({ deg: 0 });
        const a = new MockPanel(0,0,piece);
        const pEnemy = new MockPanel(0,1, enemy);
        const pSame = new MockPanel(1,1, same);
        const board = makeBoard([[a, null],[pEnemy, pSame]]);

        const res = checkTarget(board, piece, 0, 0);
        expect(res.some(p=>p.pX===0 && p.pY===1)).toBeTruthy();
        expect(pEnemy.hasTarget('attack')).toBeTruthy();
        expect(pSame.hasTarget('attack')).toBeFalsy();
    });

    test("liner '*' extends to empty squares and stops at block", async ()=>{
        const piece = new MockPiece({ range: { default: [["O","*"]] } });
        const a = new MockPanel(0,0,piece);
        const b = new MockPanel(1,0,null);
        const c = new MockPanel(2,0,new MockPiece({deg:0}));
        const board = makeBoard([[a,b,c]]);

        const res = checkTarget(board, piece, 0, 0);
        expect(res.some(p=>p.pX===1 && p.pY===0)).toBeTruthy();
        expect(res.some(p=>p.pX===2 && p.pY===0)).toBeFalsy();
    });

    test("start option suppressed when piece.isMoved true", async ()=>{
        const piece = new MockPiece({ isMoved: true, range: { start: [["O"],["o"]] } });
        const a = new MockPanel(0,0,piece);
        const b = new MockPanel(0,1,null);
        const board = makeBoard([[a],[b]]);

        const res = checkTarget(board, piece, 0, 0);
        // start option should be ignored for moved piece
        expect(res.length).toBe(0);
        expect(b.hasTarget('start')).toBe(false);
    });

    test("enPassant requires enPassant.isTarget true to include target", async ()=>{
        const piece = new MockPiece({ range: { enPassant: [["O"],["o"]] } });
        const a = new MockPanel(0,0,piece);
        const b = new MockPanel(0,1,null);
        const board = makeBoard([[a],[b]]);
        // override enPassant mock to return false
        board.enPassant.isTarget = ()=>false;

        const res = checkTarget(board, piece, 0, 0);
        expect(res.length).toBe(0);
        expect(b.hasTarget('enPassant')).toBe(false);
    });

    test("point child suppression: child prevents parent target", async ()=>{
        // parent 'A' has child 'a'; when child exists at that position, parent should be suppressed
        const range = [["O","A"],[" ","a"]];
        const piece = new MockPiece({ range: { default: range } });
        const a = new MockPanel(0,0,piece);
        const pChild = new MockPanel(1,1,new MockPiece({deg:1}));
        const pParentTarget = new MockPanel(1,0,null);
        const board = makeBoard([[a,pParentTarget],[null,pChild]]);

        const res = checkTarget(board, piece, 0, 0);
        // since child 'a' exists at relative pos, parent 'A' should not add target
        expect(pParentTarget.hasTarget('default')).toBe(false);
    });

    test("palaceSlash requires both origin and target to have palace attr", async ()=>{
        const range = [["O"],["o"]];
        const piece = new MockPiece({ range: { palaceSlash: range } });
        const a = new MockPanel(0,0,piece);
        const b = new MockPanel(0,1,null);
        // mark both origin and target with the palace attribute
        a.attr.push('palaceSlash');
        b.attr.push('palaceSlash');
        const board = makeBoard([[a],[b]]);

        const res = checkTarget(board, piece, 0, 0);
        expect(res.length).toBe(1);
        expect(b.hasTarget('palaceSlash')).toBe(true);
    });

    test("liner '+' allows jumping one blocking piece", async ()=>{
        // layout: origin at x=0, blocker at x=1, target at x=2
        const piece = new MockPiece({ range: { default: [["O","+"]] } });
        const a = new MockPanel(0,0,piece);
        const blocker = new MockPanel(1,0,new MockPiece({deg:1}));
        const target = new MockPanel(2,0,null);
        const board = makeBoard([[a, blocker, target]]);

        const res = checkTarget(board, piece, 0, 0);
        // target beyond blocker should be reachable due to jmps=1
        expect(res.some(p=>p.pX===2 && p.pY===0)).toBeTruthy();
        expect(target.hasTarget('default')).toBeTruthy();
    });
});
