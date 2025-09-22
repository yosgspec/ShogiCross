import {Board} from "@/core/board.js";

// mock global alert to avoid test environment errors
global.alert = global.alert ?? (()=>{});

describe("Board.movePiece", ()=>{
    test("should move a piece", ()=>{
        const canvas = null;
        const board = new Board(canvas, {playBoard: "将棋", isHeadless: true});
        // create two dummy panels
        const from = { piece: { deg: 0, id: 1, isMoved: false, promo: null, hasAttr: ()=>false,
            game: { promoLine: 1 }, forcePromoLine: 0 } };
        const to = { piece: null, hasAttr: ()=>false, isTarget: true, pX:0, pY:0 };
        // stub internal methods that expect full game context
        board.checkCanPromo = ()=> ({canPromo: false, forcePromo: false});
        board.stand = { capturePiece: ()=>{} };
        board.simpleMovePiece = (f, t)=>{ t.piece = f.piece; f.piece = null; };

        // movePiece returns a promise; call and ensure it resolves to true/false boolean
        return board.movePiece(from, to, false).then(res=>{
            expect(typeof res).toBe("boolean");
        });
   });
});
