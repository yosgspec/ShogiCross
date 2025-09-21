import {vi} from "vitest";

vi.mock("../src/ShogiCross/core/json/xhr.js", ()=>({
  json: {}, // jsonは空のオブジェクトを返す
  importJson: ()=>({}), // importJson関数もモックして空のオブジェクトを返す
  hasCSP: ()=>false, // hasCSP関数もモックして常にfalseを返す
}));

// Piece クラスの degChars をモック
vi.mock("@/core/piece.js", async importOriginal=>{
  const actual = await importOriginal(); // 元のモジュールをインポート
  return {
    ...actual,
    Piece: {
      ...actual.Piece, // 元のPieceクラスをすべて展開
      get degChars(){ // degChars を getter で定義
        return {
          0: "▲",
          90: "≫",
          180: "▽",
          270: "＜",
        };
      },
    },
  };
});