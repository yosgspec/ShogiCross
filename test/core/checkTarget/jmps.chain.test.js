import { describe, test, expect } from "vitest";

// Use setup helper to import core module
const { checkTarget } = await import(global.resolveAt("@/core/checkTarget.js"));

class Panel { constructor(pX,pY,piece=null){ this.pX=pX; this.pY=pY; this.piece=piece; this.attr=[]; this._targets=[];} hasAttr(a){ return this.attr.includes(a);} addTarget(n){ this._targets.push(n);} hasTarget(n){ return this._targets.includes(n);} }
class PieceMock{ constructor({deg=0, attrs=[], range=null, isMoved=false, cost=1}={}){ this.deg=deg; this._attrs=attrs; this._range=range; this.isMoved=isMoved; this.cost=cost;} hasAttr(a){ return this._attrs.includes(a);} getRange(){ return this._range || {}; } }

function makeBoard(field){ return { field, yLen: field.length, enPassant: { setTarget: ()=>{}, isTarget: ()=>false }, getRow: ()=>0 }; }

describe("jmps: single vs double blockers", ()=>{
  test("single '+' allows jumping one blocker", ()=>{
    const piece = new PieceMock({ range: { default: [["O","+"]] } });
    const a = new Panel(0,0,piece);
    const blocker = new Panel(1,0,new PieceMock({deg:1}));
    const target = new Panel(2,0,null);
    const board = makeBoard([[a, blocker, target]]);

    const res = checkTarget(board, piece, 0, 0);
    expect(res.some(p=>p.pX===2 && p.pY===0)).toBeTruthy();
    expect(target.hasTarget('default')).toBeTruthy();
  });

  test("single '+' cannot jump two stacked blockers", ()=>{
    const piece = new PieceMock({ range: { default: [["O","+"]] } });
    const a = new Panel(0,0,piece);
    const b1 = new Panel(1,0,new PieceMock({deg:1}));
    const b2 = new Panel(2,0,new PieceMock({deg:1}));
    const target = new Panel(3,0,null);
    const board = makeBoard([[a,b1,b2,target]]);

    const res = checkTarget(board, piece, 0, 0);
    // With a single '+' jump available, two contiguous blockers should prevent reaching target
    expect(res.some(p=>p.pX===3 && p.pY===0)).toBeFalsy();
    expect(target.hasTarget('default')).toBeFalsy();
  });
});
