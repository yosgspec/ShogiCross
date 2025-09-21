import {vi} from "vitest";

vi.mock("../src/ShogiCross/core/json/xhr.js", ()=>({
  json: {}, // jsonは空のオブジェクトを返す
  importJson: ()=>({}), // importJson関数もモックして空のオブジェクトを返す
  hasCSP: ()=>false, // hasCSP関数もモックして常にfalseを返す
}));

vi.mock("../src/ShogiCross/core/data.js", ()=>{
  return {
    canvasFont: {
      fonts: [[ "testFont", 400 ]],
      names: "testFont",
    },
    canvasImage: {
      imported: true,
      images: {},
    },
    games: {
      "将棋": {
        fontColor: "#000000",
        backgroundColor: "#FFFFFF",
        borderColor: "#777777",
      }
    },
    pieces: {},
    pieceRange: {
      "歩": [["", "f", ""]],
      "と": [["", "f", ""]],
      "金": [["", "f", ""]],
      "銀": [["", "f", ""]],
      "角": [["", "f", ""]],
      "王": [["", "f", ""]],
    },
    pieceCost: {
      "歩": 1,
      "と": 5,
      "金": 5,
      "銀": 10,
      "角": 20,
      "王": 0,
    },
  };
});