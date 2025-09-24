import { checkTarget } from "@/core/checkTarget.js";

// Minimal Panel mock used by checkTarget
class MockPanel {
    constructor(pX, pY, piece = null) {
        this.pX = pX;
        this.pY = pY;
        this.piece = piece;
        this._targets = [];
        this.attr = [];
    }
    hasAttr(a){ return this.attr.includes(a); }
    addTarget(rangeName){ this._targets.push(rangeName); }
    hasTarget(rangeName){ return this._targets.includes(rangeName); }
}

// Minimal Piece mock that exposes getRange() and hasAttr()
class MockPiece {
    constructor(opts){
        this.deg = opts.deg ?? 0;
        this._attrs = opts.attrs ?? [];
        this.isMoved = Boolean(opts.isMoved);
        this.cost = opts.cost ?? 1;
        this._range = opts.range ?? {};
    }
    hasAttr(a){ return this._attrs.includes(a); }
    getRange(){ return this._range; }
}

// Helper to build a board object expected by checkTarget
function makeBoard(grid){
    const field = grid;
    return {
        field,
        yLen: field.length,
        // enPassant minimal mock
        enPassant: { setTarget: ()=>{}, isTarget: ()=>true },
        // used by some checks but not by our tests
        getRow: ()=>0,
    };
}

describe("checkTarget main behavior", ()=>{
    test("point move: sets target to empty square", ()=>{
        // range: center 'O' at (0,0), target 'o' at (0,1)
        const piece = new MockPiece({ range: { default: [["O"],["o"]] } });
        const p0 = new MockPanel(0,0,piece);
        const p1 = new MockPanel(0,1,null);
        const board = makeBoard([[p0],[p1]]);

        const targets = checkTarget(board, piece, 0, 0);
        expect(Array.isArray(targets)).toBe(true);
        expect(targets.length).toBe(1);
        expect(p1.hasTarget('default')).toBe(true);
    });

    test("attack move: only includes panel when enemy piece exists", ()=>{
        const piece = new MockPiece({ deg: 0, range: { attack: [["O"],["o"]] } });
        const enemy = new MockPiece({ deg: 1 });
        const p0 = new MockPanel(0,0,piece);
        const p1 = new MockPanel(0,1, enemy);
        const board = makeBoard([[p0],[p1]]);

        const targets = checkTarget(board, piece, 0, 0);
        // attack rangeName is 'attack' per our getRange; enqueued when enemy present
        expect(targets.some(p=>p.pX === 0 && p.pY === 1)).toBe(true);
        expect(p1.hasTarget('attack')).toBe(true);

        // same-deg piece should not be a target
        p1._targets = [];
        p1.piece = new MockPiece({ deg: 0 });
        const targets2 = checkTarget(board, piece, 0, 0);
        expect(targets2.length).toBe(0);
        expect(p1.hasTarget('attack')).toBe(false);
    });

    test("liner move: extends to empty squares and stops at first blocking piece", ()=>{
        // range with '*' to the right of origin: [['O','*']]
        const piece = new MockPiece({ range: { default: [["O","*"]] } });
        // create 3 columns on the same row
        const p0 = new MockPanel(0,0,piece);
        const p1 = new MockPanel(1,0,null);
        const p2 = new MockPanel(2,0,new MockPiece({ deg: 0 })); // blocking piece of same deg
        const board = makeBoard([[p0,p1,p2]]);

        const targets = checkTarget(board, piece, 0, 0);
        // should include (1,0) but not (2,0)
        expect(targets.some(p=>p.pX === 1 && p.pY === 0)).toBe(true);
        expect(targets.some(p=>p.pX === 2 && p.pY === 0)).toBe(false);
        expect(p1.hasTarget('default')).toBe(true);
    });
});
