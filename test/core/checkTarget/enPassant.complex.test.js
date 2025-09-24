import { describe, test, expect } from "vitest";

const { checkTarget } = await import(global.resolveAt("@/core/checkTarget.js"));

class Panel{ constructor(pX,pY,piece=null){ this.pX=pX; this.pY=pY; this.piece=piece; this.attr=[]; this._targets=[];} hasAttr(a){ return this.attr.includes(a);} addTarget(n){ this._targets.push(n);} hasTarget(n){ return this._targets.includes(n);} }
class PieceMock{ constructor({deg=0, attrs=[], range=null, isMoved=false, cost=1}={}){ this.deg=deg; this._attrs=attrs; this._range=range; this.isMoved=isMoved; this.cost=cost;} hasAttr(a){ return this._attrs.includes(a);} getRange(){ return this._range || {}; } }

// Simulate enPassant object with more complex logic: mark a panel as target only if set
function makeBoard(field, enPassant){ return { field, yLen: field.length, enPassant: enPassant || { setTarget: ()=>{}, isTarget: ()=>false }, getRow: ()=>0 }; }

describe("enPassant complex cases", ()=>{
  test("enPassant range only included when enPassant.isTarget returns true for target", ()=>{
    const piece = new PieceMock({ range: { enPassant: [["O"],["o"]] } });
  const a = new Panel(0,0,piece);
  // put an enemy piece on target to be captured by enPassant logic
  const b = new Panel(0,1,new PieceMock({deg:1}));
    // enPassant object that recognizes b as target
    const enPassant = { setTarget: ()=>{}, isTarget: (panel, p)=> panel === b };
    const board = makeBoard([[a],[b]], enPassant);

    const res = checkTarget(board, piece, 0, 0);
    expect(res.length).toBe(1);
    expect(b._targets.length).toBeGreaterThan(0);
  });

  test("enPassant false prevents target even if enPassant range present", ()=>{
    const piece = new PieceMock({ range: { enPassant: [["O"],["o"]] } });
    const a = new Panel(0,0,piece);
    const b = new Panel(0,1,null);
    const enPassant = { setTarget: ()=>{}, isTarget: ()=>false };
    const board = makeBoard([[a],[b]], enPassant);

    const res = checkTarget(board, piece, 0, 0);
    expect(res.length).toBe(0);
  });
});
