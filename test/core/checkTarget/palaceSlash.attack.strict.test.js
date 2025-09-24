import { describe, test, expect } from "vitest";

// test the strict behavior of palaceSlash$attack: when target lacks palace attr,
// ensure that $attack variant triggers only when appropriate (attack path exists)
const { checkTarget } = await import(global.resolveAt("@/core/checkTarget.js"));

class Panel{ constructor(pX,pY,piece=null){ this.pX=pX; this.pY=pY; this.piece=piece; this.attr=[]; this._targets=[];} hasAttr(a){ return this.attr.includes(a);} addTarget(n){ this._targets.push(n);} hasTarget(n){ return this._targets.includes(n);} }
class PieceMock{ constructor({deg=0, attrs=[], range=null, isMoved=false, cost=1}={}){ this.deg=deg; this._attrs=attrs; this._range=range; this.isMoved=isMoved; this.cost=cost;} hasAttr(a){ return this._attrs.includes(a);} getRange(){ return this._range || {}; } }

function makeBoard(field){ return { field, yLen: field.length, enPassant: { setTarget: ()=>{}, isTarget: ()=>false }, getRow: ()=>0 }; }

describe("palaceSlash$attack strict behaviour", ()=>{
  test("$attack only adds attack targets when target piece exists and origin has palaceSlash", ()=>{
    const range = [["O"],["A$attack"]];
    const piece = new PieceMock({ range: { palaceSlash$attack: range } });
    const a = new Panel(0,0,piece);
    const b = new Panel(0,1,new PieceMock({deg:1}));
    a.attr.push('palaceSlash');
    // target does NOT have palaceSlash
    const board = makeBoard([[a],[b]]);

    const res = checkTarget(board, piece, 0, 0);
    // Core requires both origin and target to have 'palaceSlash' attribute
    // since target lacks it, no targets are added
    expect(b._targets.length).toBe(0);
  });

  test("$attack does not add target when no enemy present even if origin has palaceSlash", ()=>{
    const range = [["O"],["A$attack"]];
    const piece = new PieceMock({ range: { palaceSlash$attack: range } });
    const a = new Panel(0,0,piece);
    const b = new Panel(0,1,null);
    a.attr.push('palaceSlash');
    const board = makeBoard([[a],[b]]);

    const res = checkTarget(board, piece, 0, 0);
    expect(b._targets.length).toBe(0);
  });
});
