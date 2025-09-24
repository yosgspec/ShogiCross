import { describe, test, expect } from "vitest";

const { checkTarget } = await import(global.resolveAt("@/core/checkTarget.js"));

class Panel { constructor(pX,pY,piece=null){ this.pX=pX; this.pY=pY; this.piece=piece; this.attr=[]; this._targets=[];} hasAttr(a){ return this.attr.includes(a);} addTarget(n){ this._targets.push(n);} hasTarget(n){ return this._targets.includes(n);} }
class PieceMock{ constructor({deg=0, attrs=[], range=null, isMoved=false, cost=1}={}){ this.deg=deg; this._attrs=attrs; this._range=range; this.isMoved=isMoved; this.cost=cost;} hasAttr(a){ return this._attrs.includes(a);} getRange(){ return this._range || {}; } }

function makeBoard(field){ return { field, yLen: field.length, enPassant: { setTarget: ()=>{}, isTarget: ()=>false }, getRow: ()=>0 }; }

// Tests for inPalace/palaceSlash variants and origin/target attribute requirements

describe("palace attribute orientation", ()=>{
  test("inPalace blocks when target lacks palace attr and allows when present", ()=>{
    const piece = new PieceMock({ attrs: ['inPalace'], range: { default: [["O"],["o"]] } });
    const a = new Panel(0,0,piece);
    const b = new Panel(0,1,null);
    const board = makeBoard([[a],[b]]);

    let res = checkTarget(board, piece, 0, 0);
    expect(res.length).toBe(0);

    // mark palace on target
    b.attr.push('palace');
    res = checkTarget(board, piece, 0, 0);
    expect(res.length).toBe(1);
  });

  test("palaceSlash requires both origin and target to have palaceSlash attr", ()=>{
    const piece = new PieceMock({ range: { palaceSlash: [["O"],["o"]] } });
    const a = new Panel(0,0,piece);
    const b = new Panel(0,1,null);
    // origin has palaceSlash only -> should block
    a.attr.push('palaceSlash');
    let board = makeBoard([[a],[b]]);
    let res = checkTarget(board, piece, 0, 0);
    expect(res.length).toBe(0);

    // both origin and target marked -> allow
    b.attr.push('palaceSlash');
    board = makeBoard([[a],[b]]);
    res = checkTarget(board, piece, 0, 0);
    expect(res.length).toBe(1);
  });
});
