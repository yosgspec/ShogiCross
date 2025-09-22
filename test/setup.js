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
    games: {
      "将棋": {
        fontColor: "#000000",
        backgroundColor: "#FFFFFF",
        borderColor: "#777777",
        promoLine: 3,
        forcePromoLine: 1,
        position: {
          "9": {
            "default": [
              "歩歩歩歩歩歩歩歩歩",
              "・角・・・・・飛・",
              "香桂銀金玉金銀桂香"
            ]
          }
        }
      }
    },
    boards: {
      "クロス14x14": {
        field: [
          ["", ""],
          ["", ""],
        ],
        autoDrawing: true,
      },
      "将棋": {
        field: [
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
          ["S", "S", "S", "S", "S", "S", "S", "S", "S"],
        ],
        autoDrawing: true,
      },
    },
    pieces: {
      "歩": {
        name: "歩",
        display: ["歩"],
        imgSrc: null,
        isRotateImg: true,
        alias: [],
        gameName: "将棋",
        expansion: "",
        unit: "兵",
        forcePromoLine: 0,
        range: {},
        promo: null,
        attr: [],
        char: "歩",
        base: { char: "歩" },
      },
    },
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
    panels: {
      "": {
        name: "",
        text: "",
        backgroundColor: "#00000000",
        borderColor: "#00000000",
        selectColor: "#00000000",
        targetColor: "#00000000",
        displayText: "",
        textRotate: 0,
        borderSlashLeft: false,
        borderSlashRight: false,
        intersect: false,
        attr: [],
      },
      "マス": {
        name: "マス",
        text: "マス目",
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        selectColor: "#FF000066",
        targetColor: "#00FF0066",
        displayText: "",
        textRotate: 0,
        borderSlashLeft: false,
        borderSlashRight: false,
        intersect: false,
        attr: [],
      },
    },
  };
});

vi.mock("../src/ShogiCross/core/piece.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Piece: class extends actual.Piece {
      constructor(ctx, piece, option) {
        super(ctx, piece, option);
      }
      static degChars = {
        0: "▲",
        90: "≫",
        180: "▽",
        270: "＜",
      };
      static getPieces = vi.fn(() => {
        // getPieces の実際のロジックに応じてモックを調整
        return {
          "歩": { char: "歩", gameName: "将棋", deg: 0, base: { char: "歩" }, clone: function() { return { ...this }; } },
          "と": { char: "と", gameName: "将棋", deg: 0, base: { char: "と" }, clone: function() { return { ...this }; } },
          "金": { char: "金", gameName: "将棋", deg: 0, base: { char: "金" }, clone: function() { return { ...this }; } },
        };
      });
      static stringToPiece = vi.fn((pieces, text) => {
        if (text === "▲歩") return new actual.Piece(null, pieces["歩"], { deg: 0 });
        if (text === "▽歩") return new actual.Piece(null, pieces["歩"], { deg: 180 });
        if (text === "▲と") return new actual.Piece(null, pieces["と"], { deg: 0 });
        return null;
      });
    },
  };
});

// Note: Do not mock Record here; tests need to use the real implementation

vi.mock("../src/ShogiCross/core/canvasImageLoader.js", ()=>{
  return {
    canvasImage: {
      imported: true,
      images: {
        "test.png": { width: 10, height: 10 }, // ダミーの画像オブジェクト
      },
    },
  };
});

vi.mock("../src/ShogiCross/core/bod.js", ()=>{
  return {
    Bod: {
      convPiecesText: vi.fn(),
      getPiecesText: vi.fn(),
    },
  };
});

vi.mock("../src/ShogiCross/core/stand.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Stand: class extends actual.Stand {
      constructor(board) {
        super(board);
        this.stocks = new Map([[0, []], [90, []], [180, []], [270, []]]);
        this.add = vi.fn(actual.Stand.prototype.add.bind(this)); // vi.fn() を追加
        this.clear = vi.fn(actual.Stand.prototype.clear.bind(this));
        this.toString = vi.fn(actual.Stand.prototype.toString.bind(this));
        this.rotate = vi.fn(actual.Stand.prototype.rotate.bind(this));
      }
    },
  };
});