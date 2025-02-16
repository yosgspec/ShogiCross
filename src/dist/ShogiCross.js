const O = {
  fonts: [
    ["Noto Serif JP", 900],
    ["Noto Emoji", 400],
    ["Noto Sans Symbols 2", 400],
    ["Noto Sans Symbols", 400],
    ["Noto Serif", 900],
    ["Noto Serif TC", 900]
  ]
}, ae = {
  shogi: {
    name: "将棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B0%86%E6%A3%8B",
    desc: "一般的な将棋。本将棋とも呼ばれる。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "default" },
      { gameName: "将棋", pieceSet: "2p" }
    ]
  },
  chess: {
    name: "チェス",
    variant: "チェス",
    url: "https://ja.wikipedia.org/wiki/%E3%83%81%E3%82%A7%E3%82%B9",
    desc: "西洋の将棋類。西洋将棋とも呼ばれる。",
    playBoard: "チェス",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "default" },
      { gameName: "チェス", pieceSet: "2p" }
    ]
  },
  xiangq: {
    name: "シャンチー",
    variant: "シャンチー",
    url: "https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%A3%E3%83%B3%E3%83%81%E3%83%BC",
    desc: "中国の将棋類。象棋、中国将棋とも呼ばれる。",
    playBoard: "シャンチー",
    useStand: !1,
    playPieces: [
      { gameName: "シャンチー", pieceSet: "default" },
      { gameName: "シャンチー", pieceSet: "2p" }
    ]
  },
  janggi: {
    name: "チャンギ",
    variant: "チャンギ",
    url: "https://ja.wikipedia.org/wiki/%E3%83%81%E3%83%A3%E3%83%B3%E3%82%AE",
    desc: "朝鮮半島の将棋類。朝鮮将棋とも呼ばれる。",
    playBoard: "チャンギ",
    useStand: !1,
    playPieces: [
      { gameName: "チャンギ", pieceSet: "default" },
      { gameName: "チャンギ", pieceSet: "2p" }
    ]
  },
  makruk: {
    name: "マークルック",
    variant: "マークルック",
    url: "https://ja.wikipedia.org/wiki/%E3%83%9E%E3%83%BC%E3%82%AF%E3%83%AB%E3%83%83%E3%82%AF",
    desc: "タイの将棋類。タイ将棋とも呼ばれる。",
    playBoard: "マークルック",
    useStand: !1,
    playPieces: [
      { gameName: "マークルック", pieceSet: "default" },
      { gameName: "マークルック", pieceSet: "2p" }
    ]
  },
  chaturanga: {
    name: "チャトランガ",
    variant: "チャトランガ",
    url: "https://ja.wikipedia.org/wiki/%E3%83%81%E3%83%A3%E3%83%88%E3%83%A9%E3%83%B3%E3%82%AC",
    desc: "原初の将棋類。詳細なルールは失われている。",
    playBoard: "チェス",
    useStand: !1,
    playPieces: [
      { gameName: "チャトランガ", pieceSet: "default" },
      { gameName: "チャトランガ", pieceSet: "2p" }
    ]
  },
  dobutsuShogi: {
    name: "どうぶつしょうぎ",
    variant: "どうぶつしょうぎ",
    url: "https://www.silverstar.co.jp/02products/dobutsushogi/switch/animal.html",
    desc: "入門用として考案された将棋。",
    playBoard: "どうぶつしょうぎ",
    useStand: !0,
    playPieces: [
      { gameName: "どうぶつしょうぎ", pieceSet: "default" },
      { gameName: "どうぶつしょうぎ", pieceSet: "default" }
    ]
  },
  toriShogi: {
    name: "禽将棋",
    variant: "禽将棋",
    url: "https://ja.wikipedia.org/wiki/%E7%A6%BD%E5%B0%86%E6%A3%8B",
    desc: "鳥の名の駒を使用する古将棋。特殊な動きをする駒が多い。",
    playBoard: "将棋7x7",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "禽将棋" },
      { gameName: "将棋", pieceSet: "禽将棋" }
    ]
  },
  chuShogi: {
    name: "中将棋",
    variant: "中将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%B8%AD%E5%B0%86%E6%A3%8B",
    desc: "現在でもプレイされることのある古将棋の一種。",
    playBoard: "古将棋12x12",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "中将棋" },
      { gameName: "将棋", pieceSet: "中将棋2p" }
    ]
  },
  waShogi: {
    name: "和将棋",
    variant: "和将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%92%8C%E5%B0%86%E6%A3%8B",
    desc: "全ての駒に動物の名前を使用した古将棋の一種。",
    playBoard: "古将棋11x11",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "和将棋" },
      { gameName: "将棋", pieceSet: "和将棋" }
    ]
  },
  grantAcedrex: {
    name: "Grant Acedrex",
    variant: "Grant Acedrex",
    url: "https://www.chessvariants.org/rules/grantacedrex",
    desc: "古チェスの一種。特殊な動きをする駒が多い。プロモーション先は本来は敵陣の到着列の駒となる(未実装)。",
    playBoard: "チェス12x12",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "GrantAcedrex" },
      { gameName: "チェス", pieceSet: "GrantAcedrex2p" }
    ]
  },
  courierChessAdvanced: {
    name: "クーリエチェス(定形配置)",
    variant: "クーリエチェス(定形配置)",
    url: "https://en.wikipedia.org/wiki/Courier_chess",
    desc: "古チェスの一種。ビショップに等しい走り駒(クーリエ)が初めて使用された。",
    playBoard: "チェス12x8",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "クーリエチェス(定形配置)" },
      { gameName: "チェス", pieceSet: "クーリエチェス(定形配置)2p" }
    ]
  },
  gogoShogi: {
    name: "5五将棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/5%E4%BA%94%E5%B0%86%E6%A3%8B",
    desc: "簡略化された将棋。",
    playBoard: "将棋5x5",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "default" },
      { gameName: "将棋", pieceSet: "2p" }
    ]
  },
  asakuraShogi: {
    name: "朝倉象棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B0%8F%E5%B0%86%E6%A3%8B#%E6%9C%9D%E5%80%89%E8%B1%A1%E6%A3%8B",
    desc: "持ち駒が使用できる小将棋。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "小将棋" },
      { gameName: "将棋", pieceSet: "小将棋2p" }
    ]
  },
  shoShogi: {
    name: "小将棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B0%8F%E5%B0%86%E6%A3%8B",
    desc: "中将棋から駒を取り入れて原点回帰した平安将棋。",
    playBoard: "将棋",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "小将棋" },
      { gameName: "将棋", pieceSet: "小将棋2p" }
    ]
  },
  heianShogi8x8: {
    name: "平安将棋(8x8)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B9%B3%E5%AE%89%E5%B0%86%E6%A3%8B",
    desc: "記録が残る最古の日本の将棋。盤の大きさに緒説ある。",
    playBoard: "古将棋8x8",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "平安将棋" },
      { gameName: "将棋", pieceSet: "平安将棋" }
    ]
  },
  heianShogi9x8: {
    name: "平安将棋(9x8)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B9%B3%E5%AE%89%E5%B0%86%E6%A3%8B",
    desc: "9x8マスと想定した時の平安将棋。",
    playBoard: "古将棋9x8",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "平安将棋" },
      { gameName: "将棋", pieceSet: "平安将棋" }
    ]
  },
  heianShogi9x9: {
    name: "平安将棋(9x9)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B9%B3%E5%AE%89%E5%B0%86%E6%A3%8B",
    desc: "9x9マスと想定した時の平安将棋。",
    playBoard: "古将棋9x9",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "平安将棋" },
      { gameName: "将棋", pieceSet: "平安将棋" }
    ]
  },
  kyoShogiLeft: {
    name: "京将棋(左京配置)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "京翔と銅将を追加した将棋。左右の配置が存在。",
    playBoard: "将棋10x10",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "京将棋(左京配置)" },
      { gameName: "将棋", pieceSet: "京将棋(左京配置)2p" }
    ]
  },
  kyoShogiRight: {
    name: "京将棋(右京配置)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "京将棋の右側に京を置くパターン。",
    playBoard: "将棋10x10",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "京将棋(右京配置)" },
      { gameName: "将棋", pieceSet: "京将棋(右京配置)2p" }
    ]
  },
  shoKyoShogiLeft: {
    name: "小京将棋(左置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "桂馬を京翔へ置き換えた本将棋。左右の配置が存在。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "小京将棋(左置換)" },
      { gameName: "将棋", pieceSet: "小京将棋(左置換)2p" }
    ]
  },
  shoKyoShogiRight: {
    name: "小京将棋(右置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "小京将棋の右置換パターン。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "小京将棋(右置換)" },
      { gameName: "将棋", pieceSet: "小京将棋(右置換)2p" }
    ]
  },
  sanshaShogiLeft: {
    name: "山車将棋(左置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "香車を山車へ置き換えた本将棋。左右の配置が存在。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "山車将棋(左置換)" },
      { gameName: "将棋", pieceSet: "山車将棋(左置換)2p" }
    ]
  },
  sanshaShogiRight: {
    name: "山車将棋(右置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "山車将棋の右置換パターン。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "山車将棋(右置換)" },
      { gameName: "将棋", pieceSet: "山車将棋(右置換)2p" }
    ]
  },
  doShogiLeft: {
    name: "銅将棋(左置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "銀将を銅将へ置き換えた本将棋。左右の配置が存在。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "銅将棋(左置換)" },
      { gameName: "将棋", pieceSet: "銅将棋(左置換)2p" }
    ]
  },
  doShogiRight: {
    name: "銅将棋(右置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "銅将棋の右置換パターン。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "銅将棋(右置換)" },
      { gameName: "将棋", pieceSet: "銅将棋(右置換)2p" }
    ]
  },
  kinshiShogiLeft: {
    name: "金翅将棋(左置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "金将を金翅へ置き換えた本将棋。左右の配置が存在。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "金翅将棋(左置換)" },
      { gameName: "将棋", pieceSet: "金翅将棋(左置換)2p" }
    ]
  },
  kinshiShogiRight: {
    name: "金翅将棋(右置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "金翅将棋の右置換パターン。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "金翅将棋(右置換)" },
      { gameName: "将棋", pieceSet: "金翅将棋(右置換)2p" }
    ]
  },
  kintoShogiLeft: {
    name: "金斗将棋(左置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "金将を金翅へ置き換えた本将棋。左右の配置が存在。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "金斗将棋(左置換)" },
      { gameName: "将棋", pieceSet: "金斗将棋(左置換)2p" }
    ]
  },
  kintoShogiRight: {
    name: "金斗将棋(右置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "金斗将棋の右置換パターン。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "金斗将棋(右置換)" },
      { gameName: "将棋", pieceSet: "金斗将棋(右置換)2p" }
    ]
  },
  shogi30AllLeft: {
    name: "将棋30++(左系フル置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "京将棋系の駒で複数置換した本将棋。左右の配置が存在。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "将棋30++(左系フル置換)" },
      { gameName: "将棋", pieceSet: "将棋30++(左系フル置換)2p" }
    ]
  },
  shogi30AllRight: {
    name: "将棋30++(右系フル置換)",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E4%BA%AC%E5%B0%86%E6%A3%8B",
    desc: "将棋30++の右置換パターン。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "将棋30++(右系フル置換)" },
      { gameName: "将棋", pieceSet: "将棋30++(右系フル置換)2p" }
    ]
  },
  okisakiShogi: {
    name: "御妃将棋",
    variant: "将棋",
    url: "https://en.wikipedia.org/wiki/Okisaki_shogi",
    desc: "チェスの要素を取り入れた本将棋。香車は意図して反車として表示した。",
    playBoard: "将棋10x10",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "御妃将棋" },
      { gameName: "将棋", pieceSet: "御妃将棋2p" }
    ]
  },
  crazyHouse: {
    name: "クレージーハウス",
    variant: "チェス",
    url: "https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%AC%E3%83%BC%E3%82%B8%E3%83%BC%E3%83%8F%E3%82%A6%E3%82%B9",
    desc: "持ち駒が使用できるチェス。",
    playBoard: "クレージーハウス",
    useStand: !0,
    playPieces: [
      { gameName: "チェス", pieceSet: "default" },
      { gameName: "チェス", pieceSet: "2p" }
    ]
  },
  losAlamosChess: {
    name: "ロスアラモスチェス",
    variant: "チェス",
    url: "https://en.wikipedia.org/wiki/Los_Alamos_chess",
    desc: "簡略化されたチェス。",
    playBoard: "チェス6x6",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "default" },
      { gameName: "チェス", pieceSet: "2p" }
    ]
  },
  capablancaChess: {
    name: "カパブランカチェス",
    variant: "チェス",
    url: "https://en.wikipedia.org/wiki/Capablanca_chess",
    desc: "マーシャル(エンプレス)、カーディナル(プリンセス)を追加したチェス。",
    playBoard: "チェス10x8",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "カパブランカチェス" },
      { gameName: "チェス", pieceSet: "カパブランカチェス2p" }
    ]
  },
  grandChess: {
    name: "グランドチェス",
    variant: "チェス",
    url: "https://en.wikipedia.org/wiki/Grand_Chess",
    desc: "カパブランカチェスと同様の駒を使用するが配置が異なる。",
    playBoard: "チェス10x10",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "グランドチェス" },
      { gameName: "チェス", pieceSet: "グランドチェス2p" }
    ]
  },
  gorogoroDobutsuShogi: {
    name: "ごろごろどうぶつしょうぎ",
    variant: "どうぶつしょうぎ",
    url: "https://www.silverstar.co.jp/02products/dobutsushogi/switch/gorogoro.html",
    desc: "「きりん」と「ぞう」の代わりに「いぬ」(金将)と「ねこ」(銀将)を追加したどうぶつしょうぎ。5656将棋のどうぶつしょうぎ版。",
    playBoard: "ごろごろどうぶつしょうぎ",
    useStand: !0,
    playPieces: [
      { gameName: "どうぶつしょうぎ", pieceSet: "default" },
      { gameName: "どうぶつしょうぎ", pieceSet: "default" }
    ]
  },
  shishiShogi: {
    name: "獅子将棋",
    variant: "中将棋",
    url: "https://drive.google.com/file/d/1emrOmE1Xh-sR8wApTOikEgXDGVaAYrrO/view",
    desc: "中将棋を遊びやすくするよう考案された将棋の一種。",
    playBoard: "古将棋9x9",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "獅子将棋" },
      { gameName: "将棋", pieceSet: "獅子将棋2p" }
    ]
  },
  heiseiShogi: {
    name: "平成将棋",
    variant: "中将棋",
    url: "http://akasaka0x16.blog.fc2.com/blog-entry-130.html",
    desc: "中将棋を遊びやすくするよう考案された将棋の一種。",
    playBoard: "古将棋10x10",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "平成将棋" },
      { gameName: "将棋", pieceSet: "平成将棋2p" }
    ]
  },
  daiShogi: {
    name: "大将棋",
    variant: "中将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%A4%A7%E5%B0%86%E6%A3%8B",
    desc: "中将棋の祖先とされる古将棋。",
    playBoard: "古将棋15x15",
    useStand: !1,
    playPieces: [
      { gameName: "将棋", pieceSet: "大将棋" },
      { gameName: "将棋", pieceSet: "大将棋2p" }
    ]
  },
  courierChess: {
    name: "クーリエチェス(初期配置)",
    variant: "クーリエチェス(定形配置)",
    url: "https://en.wikipedia.org/wiki/Courier_chess",
    desc: "クーリエチェスの定形移動を行わない配置。",
    playBoard: "チェス12x8",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "クーリエチェス(初期配置)" },
      { gameName: "チェス", pieceSet: "クーリエチェス(初期配置)2p" }
    ]
  },
  p4Shogi: {
    name: "四人将棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%9B%9B%E4%BA%BA%E5%B0%86%E6%A3%8B",
    desc: "4人用の将棋。",
    playBoard: "将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "p4" },
      { gameName: "将棋", pieceSet: "p4" },
      { gameName: "将棋", pieceSet: "p4" },
      { gameName: "将棋", pieceSet: "p4" }
    ]
  },
  p4Chess: {
    name: "4人チェス",
    variant: "チェス",
    url: "https://en.wikipedia.org/wiki/Four-player_chess",
    desc: "4人用のチェス。",
    playBoard: "4人チェス",
    useStand: !1,
    playPieces: [
      { gameName: "チェス", pieceSet: "p4" },
      { gameName: "チェス", pieceSet: "p4" },
      { gameName: "チェス", pieceSet: "p4" },
      { gameName: "チェス", pieceSet: "p4" }
    ]
  },
  g4Shogi: {
    name: "四神将棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%9B%9B%E7%A5%9E%E5%B0%86%E6%A3%8B",
    desc: "テレビ用の企画として考案された4人用の将棋。",
    playBoard: "四神将棋",
    useStand: !0,
    playPieces: [
      { gameName: "将棋", pieceSet: "p4" },
      { gameName: "将棋", pieceSet: "p4" },
      { gameName: "将棋", pieceSet: "p4" },
      { gameName: "将棋", pieceSet: "p4" }
    ]
  },
  chaturaji: {
    name: "チャトラジ",
    variant: "チャトランガ",
    url: "https://ja.wikipedia.org/wiki/%E3%83%81%E3%83%A3%E3%83%88%E3%83%A9%E3%82%B8",
    desc: "チャトランガの4人用のバリエーション。ダイスで動かす駒を決めていた。",
    playBoard: "チェス",
    useStand: !1,
    playPieces: [
      { gameName: "チャトランガ", pieceSet: "p4" },
      { gameName: "チャトランガ", pieceSet: "p4" },
      { gameName: "チャトランガ", pieceSet: "p4" },
      { gameName: "チャトランガ", pieceSet: "p4" }
    ]
  }
}, Y = {
  将棋: {
    english: "Shogi",
    fontColor: "#000000",
    backgroundColor: "#FFDDAA",
    promoLine: 3,
    position: {
      5: {
        default: [
          "歩・・・・",
          "玉金銀角飛"
        ],
        "2p": [
          "歩・・・・",
          "皇金銀角飛"
        ]
      },
      7: {
        禽将棋: [
          "・・・・燕・・",
          "燕燕燕燕燕燕燕",
          "・・・鷹・・・",
          "鶉雉鶴鵬鶴雉享"
        ]
      },
      8: {
        default: [
          "歩歩歩歩歩歩歩歩",
          "・角・・・・飛・",
          "香桂銀玉金銀桂香"
        ],
        "2p": [
          "歩歩歩歩歩歩歩歩",
          "・角・・・・飛・",
          "香桂銀皇金銀桂香"
        ],
        平安将棋: [
          "歩歩歩歩歩歩歩歩",
          "・・・・・・・・",
          "香桂銀玉金銀桂香"
        ]
      },
      9: {
        default: [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉金銀桂香"
        ],
        "2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇金銀桂香"
        ],
        "小京将棋(左置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香京銀金玉金銀桂香"
        ],
        "小京将棋(左置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香京銀金皇金銀桂香"
        ],
        "小京将棋(右置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉金銀京香"
        ],
        "小京将棋(右置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇金銀京香"
        ],
        "山車将棋(左置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "山桂銀金玉金銀桂香"
        ],
        "山車将棋(左置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "山桂銀金皇金銀桂香"
        ],
        "山車将棋(右置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉金銀桂山"
        ],
        "山車将棋(右置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇金銀桂山"
        ],
        "銅将棋(左置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銅金玉金銀桂香"
        ],
        "銅将棋(左置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銅金皇金銀桂香"
        ],
        "銅将棋(右置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉金銅桂香"
        ],
        "銅将棋(右置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇金銅桂香"
        ],
        "金翅将棋(左置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀翅玉金銀桂香"
        ],
        "金翅将棋(左置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀翅皇金銀桂香"
        ],
        "金翅将棋(右置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉翅銀桂香"
        ],
        "金翅将棋(右置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇翅銀桂香"
        ],
        "金斗将棋(左置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀斗玉金銀桂香"
        ],
        "金斗将棋(左置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀斗皇金銀桂香"
        ],
        "金斗将棋(右置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉斗銀桂香"
        ],
        "金斗将棋(右置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇斗銀桂香"
        ],
        "将棋30++(左系フル置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "山京銅翅玉金銀桂香"
        ],
        "将棋30++(左系フル置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "山京銅翅皇金銀桂香"
        ],
        "将棋30++(右系フル置換)": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金玉翅銅京山"
        ],
        "将棋30++(右系フル置換)2p": [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・・・・飛・",
          "香桂銀金皇翅銅京山"
        ],
        小将棋: [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・醉・・飛・",
          "香桂銀金玉金銀桂香"
        ],
        小将棋2p: [
          "歩歩歩歩歩歩歩歩歩",
          "・角・・醉・・飛・",
          "香桂銀金皇金銀桂香"
        ],
        獅子将棋: [
          "歩歩歩歩歩歩歩歩歩",
          "・碼・獅醉奔・竜・",
          "馨麒艮釡玉釡艮鳳馨"
        ],
        獅子将棋2p: [
          "歩歩歩歩歩歩歩歩歩",
          "・碼・獅醉奔・竜・",
          "馨麒艮釡皇釡艮鳳馨"
        ],
        禽将棋: [
          "・・・・・・燕・・",
          "燕燕燕燕燕燕燕燕燕",
          "・・・鷹・鷹・・・",
          "鶉雉鶴・鵬・鶴雉享"
        ],
        p4: [
          "・・・・歩・・・・",
          "・・・歩飛歩・・・",
          "・・銀金玉金銀・・"
        ],
        平安将棋: [
          "歩歩歩歩歩歩歩歩歩",
          "・・・・・・・・・",
          "香桂銀金玉金銀桂香"
        ]
      },
      10: {
        "京将棋(左京配置)": [
          "歩歩歩歩歩歩歩歩歩歩",
          "・角・・・銅・・飛・",
          "香桂京銀金玉金銀桂香"
        ],
        "京将棋(左京配置)2p": [
          "歩歩歩歩歩歩歩歩歩歩",
          "・角・・・銅・・飛・",
          "香桂京銀金皇金銀桂香"
        ],
        "京将棋(右京配置)": [
          "歩歩歩歩歩歩歩歩歩歩",
          "・角・・銅・・・飛・",
          "香桂銀金玉金銀京桂香"
        ],
        "京将棋(右京配置)2p": [
          "歩歩歩歩歩歩歩歩歩歩",
          "・角・・銅・・・飛・",
          "香桂銀金皇金銀京桂香"
        ],
        平成将棋: [
          "・・仲・・・・仲・・",
          "歩歩歩歩歩歩歩歩歩歩",
          "横飛角・獅奔・角飛横",
          "竪麒艮釡玉醉釡艮鳳竪"
        ],
        平成将棋2p: [
          "・・仲・・・・仲・・",
          "歩歩歩歩歩歩歩歩歩歩",
          "横飛角・獅奔・角飛横",
          "竪麒艮釡皇醉釡艮鳳竪"
        ],
        御妃将棋: [
          "歩歩歩歩歩歩歩歩歩歩",
          "・角・・・・・・飛・",
          "返跳銀金女玉金銀跳返"
        ],
        御妃将棋2p: [
          "歩歩歩歩歩歩歩歩歩歩",
          "・角・・・・・・飛・",
          "返跳銀金女皇金銀跳返"
        ]
      },
      11: {
        和将棋: [
          "・・・雀・・・雀・・・",
          "雀雀雀狐雀雀雀兎雀雀雀",
          "・鷙・・・羽・・・雲・",
          "犇犬烏鳫狽霍麁鶏鴟猿風"
        ]
      },
      12: {
        中将棋: [
          "・・・仲・・・・仲・・・",
          "歩歩歩歩歩歩歩歩歩歩歩歩",
          "横竪飛碼竜獅奔竜碼飛竪横",
          "反・角・虎麒鳳虎・角・反",
          "馨猛同艮釡玉醉釡艮同猛馨"
        ],
        中将棋2p: [
          "・・・仲・・・・仲・・・",
          "歩歩歩歩歩歩歩歩歩歩歩歩",
          "横竪飛碼竜獅奔竜碼飛竪横",
          "反・角・虎麒鳳虎・角・反",
          "馨猛同艮釡皇醉釡艮同猛馨"
        ]
      },
      14: {
        p4: [
          "・・・歩歩歩歩歩歩歩歩・・・",
          "・・・・角・・・・飛・・・・",
          "・・・香桂銀玉金銀桂香・・・"
        ]
      },
      15: {
        p4: [
          "・・・歩歩歩歩歩歩歩歩歩・・・",
          "・・・・角・・・・・飛・・・・",
          "・・・香桂銀金玉金銀桂香・・・"
        ],
        大将棋: [
          "・・・・仲・・・・・仲・・・・",
          "歩歩歩歩歩歩歩歩歩歩歩歩歩歩歩",
          "飛瀧横竪角碼竜奔竜碼角竪横瀧飛",
          "・丑・嗔・狼麒獅鳳狼・嗔・丑・",
          "反・猫・猛・虎醉虎・猛・猫・反",
          "馨桂石鉄同艮釡玉釡艮同鉄石桂馨"
        ],
        大将棋2p: [
          "・・・・仲・・・・・仲・・・・",
          "歩歩歩歩歩歩歩歩歩歩歩歩歩歩歩",
          "飛瀧横竪角碼竜奔竜碼角竪横瀧飛",
          "・丑・嗔・狼麒獅鳳狼・嗔・丑・",
          "反・猫・猛・虎醉虎・猛・猫・反",
          "馨桂石鉄同艮釡皇釡艮同鉄石桂馨"
        ]
      },
      17: {
        p4: [
          "・・・・歩歩歩歩歩歩歩歩歩・・・・",
          "・・・・・角・・・・・飛・・・・・",
          "・・・・香桂銀金玉金銀桂香・・・・"
        ]
      }
    }
  },
  チェス: {
    english: "Chess",
    fontColor: "#FFFFFF",
    backgroundColor: "#000000",
    promoLine: 1,
    position: {
      6: {
        default: [
          "丘丘丘丘丘丘",
          "塔騎后王騎塔"
        ],
        "2p": [
          "丘丘丘丘丘丘",
          "塔騎帝后騎塔"
        ]
      },
      8: {
        default: [
          "兵兵兵兵兵兵兵兵",
          "塔騎聖后王聖騎塔"
        ],
        "2p": [
          "兵兵兵兵兵兵兵兵",
          "塔騎聖帝后聖騎塔"
        ]
      },
      9: {
        default: [
          "兵兵兵兵兵兵兵兵兵",
          "塔騎聖后・王聖騎塔"
        ],
        "2p": [
          "兵兵兵兵兵兵兵兵兵",
          "塔騎聖帝・后聖騎塔"
        ]
      },
      10: {
        カパブランカチェス: [
          "浜浜浜浜浜浜浜浜浜浜",
          "塔騎駮聖后国聖駆騎塔"
        ],
        カパブランカチェス2p: [
          "浜浜浜浜浜浜浜浜浜浜",
          "塔騎駆聖國后聖駮騎塔"
        ],
        グランドチェス: [
          "浜浜浜浜浜浜浜浜浜浜",
          "・騎聖后王駆駮聖騎・",
          "塔・・・・・・・・塔"
        ],
        グランドチェス2p: [
          "浜浜浜浜浜浜浜浜浜浜",
          "・騎聖駮駆帝后聖騎・",
          "塔・・・・・・・・塔"
        ]
      },
      12: {
        GrantAcedrex: [
          "梹梹梹梹梹梹梹梹梹梹梹梹",
          "・・・・・・・・・・・・",
          "・・・・・・・・・・・・",
          "砦師犀麟鰐鴻呈鰐麟犀師砦"
        ],
        GrantAcedrex2p: [
          "梹梹梹梹梹梹梹梹梹梹梹梹",
          "・・・・・・・・・・・・",
          "・・・・・・・・・・・・",
          "砦師犀麟鰐逞鴻鰐麟犀師砦"
        ],
        "クーリエチェス(初期配置)": [
          "鋲鋲鋲鋲鋲鋲鋲鋲鋲鋲鋲鋲",
          "砦騎射使賢閏妾佯使射騎砦"
        ],
        "クーリエチェス(初期配置)2p": [
          "鋲鋲鋲鋲鋲鋲鋲鋲鋲鋲鋲鋲",
          "砦騎射使佯妾潤賢使射騎砦"
        ],
        "クーリエチェス(定形配置)": [
          "鋲・・・・・鋲・・・・鋲",
          "・・・・・・妾・・・・・",
          "・鋲鋲鋲鋲鋲・鋲鋲鋲鋲・",
          "砦騎射使賢閏・佯使射騎砦"
        ],
        "クーリエチェス(定形配置)2p": [
          "鋲・・・・鋲・・・・・鋲",
          "・・・・・妾・・・・・・",
          "・鋲鋲鋲鋲・鋲鋲鋲鋲鋲・",
          "砦騎射使佯・潤賢使射騎砦"
        ]
      },
      14: {
        p4: [
          "・・・兵兵兵兵兵兵兵兵・・・",
          "・・・塔騎聖后王聖騎塔・・・"
        ]
      },
      15: {
        p4: [
          "・・・兵兵兵兵兵兵兵兵兵・・・",
          "・・・塔騎聖后・王聖騎塔・・・"
        ]
      },
      17: {
        p4: [
          "・・・・兵兵兵兵兵兵兵兵兵・・・・",
          "・・・・塔騎聖后・王聖騎塔・・・・"
        ]
      }
    }
  },
  シャンチー: {
    english: "Xiangqi",
    fontColor: "#BB1100",
    backgroundColor: "#FFDD77",
    promoLine: 4,
    position: {
      8: {
        default: [
          "卒・卒卒・卒・卒",
          "・炮・・・・炮・",
          "・・・・・・・・",
          "俥馮相帥仕相馮俥"
        ],
        "2p": [
          "卒・卒・卒卒・卒",
          "・炮・・・・炮・",
          "・・・・・・・・",
          "俥馮相仕將相馮俥"
        ]
      },
      9: {
        default: [
          "卒・卒・卒・卒・卒",
          "・炮・・・・・炮・",
          "・・・・・・・・・",
          "俥馮相仕帥仕相馮俥"
        ],
        "2p": [
          "卒・卒・卒・卒・卒",
          "・炮・・・・・炮・",
          "・・・・・・・・・",
          "俥馮相仕將仕相馮俥"
        ]
      },
      14: {
        p4: [
          "・・・卒・卒卒・卒・卒・・・",
          "・・・・炮・・・・炮・・・・",
          "・・・俥相馮帥仕馮相俥・・・"
        ]
      },
      15: {
        p4: [
          "・・・卒・卒・卒・卒・卒・・・",
          "・・・・炮・・・・・炮・・・・",
          "・・・俥相馮仕帥仕馮相俥・・・"
        ]
      },
      17: {
        p4: [
          "・・・・卒・卒・卒・卒・卒・・・・",
          "・・・・・炮・・・・・炮・・・・・",
          "・・・・・・・・・・・・・・・・・",
          "・・・・俥馮相仕帥仕相馮俥・・・・"
        ]
      }
    }
  },
  チャンギ: {
    english: "Janggi",
    fontColor: "#008800",
    backgroundColor: "#FFFFFF",
    position: {
      8: {
        default: [
          "卆・卆卆・卆・卆",
          "・包・・・・包・",
          "・・・楚・・・・",
          "車馭象・士象馭車"
        ],
        "2p": [
          "卆・卆・卆卆・卆",
          "・包・・・・包・",
          "・・・・漢・・・",
          "車馭象士・象馭車"
        ],
        左象配置: [
          "卆・卆卆・卆・卆",
          "・包・・・・包・",
          "・・・楚・・・・",
          "車象馭・士象馭車"
        ],
        左象配置2p: [
          "卆・卆・卆卆・卆",
          "・包・・・・包・",
          "・・・・漢・・・",
          "車象馭士・象馭車"
        ],
        右象配置: [
          "卆・卆卆・卆・卆",
          "・包・・・・包・",
          "・・・楚・・・・",
          "車馭象・士馭象車"
        ],
        右象配置2p: [
          "卆・卆・卆卆・卆",
          "・包・・・・包・",
          "・・・・漢・・・",
          "車馭象士・馭象車"
        ],
        外象配置: [
          "卆・卆卆・卆・卆",
          "・包・・・・包・",
          "・・・楚・・・・",
          "車象馭・士馭象車"
        ],
        外象配置2p: [
          "卆・卆・卆卆・卆",
          "・包・・・・包・",
          "・・・・漢・・・",
          "車象馭士・馭象車"
        ]
      },
      9: {
        default: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・楚・・・・",
          "車馭象士・士象馭車"
        ],
        "2p": [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・漢・・・・",
          "車馭象士・士象馭車"
        ],
        左象配置: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・楚・・・・",
          "車象馭士・士象馭車"
        ],
        左象配置2p: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・漢・・・・",
          "車象馭士・士象馭車"
        ],
        右象配置: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・楚・・・・",
          "車馭象士・士馭象車"
        ],
        右象配置2p: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・漢・・・・",
          "車馭象士・士馭象車"
        ],
        外象配置: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・楚・・・・",
          "車象馭士・士馭象車"
        ],
        外象配置2p: [
          "卆・卆・卆・卆・卆",
          "・包・・・・・包・",
          "・・・・漢・・・・",
          "車象馭士・士馭象車"
        ]
      },
      14: {
        p4: [
          "・・・卆・卆卆・卆・卆・・・",
          "・・・・包・楚・・包・・・・",
          "・・・車象馭・士馭象車・・・"
        ]
      },
      15: {
        p4: [
          "・・・卆・卆・卆・卆・卆・・・",
          "・・・・包・・楚・・包・・・・",
          "・・・車象馭士・士馭象車・・・"
        ]
      },
      17: {
        p4: [
          "・・・・卆・卆・卆・卆・卆・・・・",
          "・・・・・包・・・・・包・・・・・",
          "・・・・・・・・楚・・・・・・・・",
          "・・・・車馭象士・士象馭車・・・・"
        ]
      }
    }
  },
  マークルック: {
    english: "Makruk",
    fontColor: "#FFFFFF",
    backgroundColor: "#CC2222",
    promoLine: 3,
    position: {
      8: {
        default: [
          "貝貝貝貝貝貝貝貝",
          "・・・・・・・・",
          "船瑪根君種根瑪船"
        ],
        "2p": [
          "貝貝貝貝貝貝貝貝",
          "・・・・・・・・",
          "船瑪根公種根瑪船"
        ]
      },
      9: {
        default: [
          "貝貝貝貝貝貝貝貝貝",
          "・・・・・・・・・",
          "船瑪根種君種根瑪船"
        ],
        "2p": [
          "貝貝貝貝貝貝貝貝貝",
          "・・・・・・・・・",
          "船瑪根種公種根瑪船"
        ]
      },
      14: {
        p4: [
          "・・・貝貝貝貝貝貝貝貝・・・",
          "・・・・・・・・・・・・・・",
          "・・・船瑪根君種根瑪船・・・"
        ]
      },
      15: {
        p4: [
          "・・・貝貝貝貝貝貝貝貝貝・・・",
          "・・・・・・・・・・・・・・・",
          "・・・船瑪根種君種根瑪船・・・"
        ]
      },
      17: {
        p4: [
          "・・・・貝貝貝貝貝貝貝貝貝・・・・",
          "・・・・・・・・・・・・・・・・・",
          "・・・・船瑪根種君種根瑪船・・・・"
        ]
      }
    }
  },
  チャトランガ: {
    english: "Chaturanga",
    fontColor: "#666666",
    backgroundColor: "#FFFFEE",
    promoLine: 1,
    position: {
      8: {
        default: [
          "木火天央大天火木",
          "戦午像主臣像午戦"
        ],
        "2p": [
          "木火天央大天火木",
          "戦午像柱臣像午戦"
        ],
        p4: [
          "矢火本央・・・・",
          "舟午豕主・・・・"
        ]
      },
      9: {
        default: [
          "木火天大央大天火木",
          "戦午像臣主臣像午戦"
        ],
        "2p": [
          "木火天大央大天火木",
          "戦午像臣柱臣像午戦"
        ]
      },
      14: {
        p4: [
          "・・・木火天央大天火木・・・",
          "・・・戦午像主臣像午戦・・・"
        ]
      },
      15: {
        p4: [
          "・・・木火天大央大天火木・・・",
          "・・・戦午像臣主臣像午戦・・・"
        ]
      },
      17: {
        p4: [
          "・・・・木火天大央大天火木・・・・",
          "・・・・戦午像臣主臣像午戦・・・・"
        ]
      }
    }
  },
  どうぶつしょうぎ: {
    english: "DobutsuShogi",
    fontColor: "#666666",
    backgroundColor: "#DDCCFF",
    promoLine: 3,
    position: {
      3: {
        default: [
          "・ひ・",
          "きラぞ"
        ]
      },
      5: {
        default: [
          "・ひひひ・",
          "・・・・・",
          "ねいらいね"
        ]
      }
    }
  }
}, J = {
  将棋: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS"
    ]
  },
  チェス: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    field: [
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW",
      "WBWBWBWB",
      "BWBWBWBW"
    ]
  },
  シャンチー: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: 1,
    field: [
      "SSS<#>SSS",
      "SSS#*#SSS",
      "SSS>#<SSS",
      "SSSSSSSSS",
      "=======]=",
      "=[=======",
      "SSSSSSSSS",
      "SSS<#>SSS",
      "SSS#*#SSS",
      "SSS>#<SSS"
    ]
  },
  チャンギ: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: 1,
    field: [
      "SSS<#>SSS",
      "SSS#*#SSS",
      "SSS>#<SSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSSSSSSSS",
      "SSS<#>SSS",
      "SSS#*#SSS",
      "SSS>#<SSS"
    ]
  },
  マークルック: {
    backgroundColor: "#775544",
    borderColor: "#000000",
    field: [
      "MMMMMMMM",
      "MMMMMMMM",
      "MMMMMMMM",
      "MMMMMMMM",
      "MMMMMMMM",
      "MMMMMMMM",
      "MMMMMMMM",
      "MMMMMMMM"
    ]
  },
  どうぶつしょうぎ: {
    backgroundColor: "#FFFFDD",
    borderColor: "#FFDD99",
    promoLineOffset: -2,
    field: [
      "DDD",
      "$$$",
      "$$$",
      "ddd"
    ]
  },
  将棋5x5: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: -2,
    field: [
      "SSSSS",
      "SSSSS",
      "SSSSS",
      "SSSSS",
      "SSSSS"
    ]
  },
  将棋7x7: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: -1,
    field: [
      "SSSSSSS",
      "SSSSSSS",
      "SSSSSSS",
      "SSSSSSS",
      "SSSSSSS",
      "SSSSSSS",
      "SSSSSSS"
    ]
  },
  将棋10x10: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS",
      "SSSSSSSSSS"
    ]
  },
  チェス6x6: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    field: [
      "WBWBWB",
      "BWBWBW",
      "WBWBWB",
      "BWBWBW",
      "WBWBWB",
      "BWBWBW"
    ]
  },
  チェス9x9: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    promoLineOffset: 2,
    field: [
      "BWBWBWBWB",
      "WBWBWBWBW",
      "BWBWBWBWB",
      "WBWBWBWBW",
      "BWBWBWBWB",
      "WBWBWBWBW",
      "BWBWBWBWB",
      "WBWBWBWBW",
      "BWBWBWBWB"
    ]
  },
  チェス10x8: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    field: [
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW"
    ]
  },
  チェス10x10: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    promoLineOffset: 2,
    field: [
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW",
      "WBWBWBWBWB",
      "BWBWBWBWBW"
    ]
  },
  チェス12x8: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    field: [
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW"
    ]
  },
  チェス12x12: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    field: [
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW",
      "WBWBWBWBWBWB",
      "BWBWBWBWBWBW"
    ]
  },
  ごろごろどうぶつしょうぎ: {
    backgroundColor: "#FFFFDD",
    borderColor: "#FFDD99",
    promoLineOffset: -1,
    field: [
      "44444",
      "44444",
      "$$$$$",
      "$$$$$",
      "ddddd",
      "ddddd"
    ]
  },
  古将棋8x8: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "ssssssss",
      "ssssssss",
      "ssssssss",
      "ssssssss",
      "ssssssss",
      "ssssssss",
      "ssssssss",
      "ssssssss"
    ]
  },
  古将棋9x8: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss"
    ]
  },
  古将棋9x9: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss",
      "sssssssss"
    ]
  },
  古将棋10x10: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss",
      "ssssssssss"
    ]
  },
  古将棋11x11: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss",
      "sssssssssss"
    ]
  },
  古将棋12x12: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: 1,
    field: [
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss",
      "ssssssssssss"
    ]
  },
  古将棋15x15: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: 2,
    field: [
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss",
      "sssssssssssssss"
    ]
  },
  クレージーハウス: {
    backgroundColor: "#444444",
    borderColor: "#000000",
    field: [
      "wbwbwbwb",
      "bwbwbwbw",
      "wbwbwbwb",
      "bwbwbwbw",
      "wbwbwbwb",
      "bwbwbwbw",
      "wbwbwbwb",
      "bwbwbwbw"
    ]
  },
  "4人チェス": {
    backgroundColor: "#444444",
    borderColor: "#000000",
    promoLineOffset: 6,
    field: [
      "...BWBWBWBW...",
      "...WBWBWBWB...",
      "...BWBWBWBW...",
      "BWBWBWBWBWBWBW",
      "WBWBWBWBWBWBWB",
      "BWBWBWBWBWBWBW",
      "WBWBWBWBWBWBWB",
      "BWBWBWBWBWBWBW",
      "WBWBWBWBWBWBWB",
      "BWBWBWBWBWBWBW",
      "WBWBWBWBWBWBWB",
      "...WBWBWBWB...",
      "...BWBWBWBW...",
      "...WBWBWBWB..."
    ]
  },
  四神将棋: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    sidePromo: !0,
    field: [
      "...SSSSSSSSS...",
      "...SSSSSSSSS...",
      "...SSSSSSSSS...",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSSS",
      "...SSSSSSSSS...",
      "...SSSSSSSSS...",
      "...SSSSSSSSS..."
    ]
  },
  クロス8x8: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "WBW<#>SS",
      "BWB#*#SS",
      "WBW>#<SS",
      "======]=",
      "=[======",
      "SS<#>BWB",
      "SS#*#WBW",
      "SS>#<BWB"
    ]
  },
  クロス9x9: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "XSX<#>XSX",
      "SXS#*#SXS",
      "XSX>#<XSX",
      "SSSSSSSSS",
      "=[=====]=",
      "SSSSSSSSS",
      "XSX<#>XSX",
      "SXS#*#SXS",
      "XSX>#<XSX"
    ]
  },
  クロス11x11: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "BWBW<#>SXSX",
      "WBWB#*#XSXS",
      "BWBW>#<SXSX",
      "SSSSSSSSSSS",
      "SSSSSSSSSSS",
      "=[=======]=",
      "SSSSSSSSSSS",
      "SSSSSSSSSSS",
      "XSXS<#>WBWB",
      "SXSX#*#BWBW",
      "XSXS>#<WBWB"
    ]
  },
  クロス12x12: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "BWBW<#>XSXSX",
      "WBWB#*#SXSXS",
      "BWBW>#<XSXSX",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "==========]=",
      "=[==========",
      "SSSSSSSSSSSS",
      "SSSSSSSSSSSS",
      "XSXSX<#>WBWB",
      "SXSXS#*#BWBW",
      "XSXSX>#<WBWB"
    ]
  },
  クロス13x13: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "BWBWB<#>XSXSX",
      "WBWBW#*#SXSXS",
      "BWBWB>#<XSXSX",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "=[=========]=",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "SSSSSSSSSSSSS",
      "XSXSX<#>BWBWB",
      "SXSXS#*#WBWBW",
      "XSXSX>#<BWBWB"
    ]
  },
  クロス14x14: {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "WBWBWB<#>XSXSX",
      "BWBWBW#*#SXSXS",
      "WBWBWB>#<XSXSX",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "=[==========]=",
      "=[==========]=",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "SSSSSSSSSSSSSS",
      "XSXSX<#>BWBWBW",
      "SXSXS#*#WBWBWB",
      "XSXSX>#<BWBWBW"
    ]
  },
  "4人用クロス8列": {
    backgroundColor: "#444444",
    borderColor: "#000000",
    promoLineOffset: 6,
    field: [
      "...XSX<#>XS...",
      "...SXS#*#SX...",
      "...XSX>#<XS...",
      "XSXWBWBWBWBSXS",
      "SXSBWBWBWBWXSX",
      "<#>WB===]WBSXS",
      "#*#BW====BW<#>",
      ">#<WB====WB#*#",
      "SXSBW[===BW>#<",
      "XSXWBWBWBWBSXS",
      "SXSBWBWBWBWXSX",
      "...SX<#>XSX...",
      "...XS#*#SXS...",
      "...SX>#<XSX..."
    ]
  },
  "4人用クロス9列": {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: 6,
    field: [
      "...XSX<#>XSX...",
      "...SXS#*#SXS...",
      "...XSX>#<XSX...",
      "XSXBWBWBWBWBXSX",
      "SXSWBWBWBWBWSXS",
      "XSXBWB==]BWBXSX",
      "<#>WB=====BW<#>",
      "#*#BW=====WB#*#",
      ">#<WB=====BW>#<",
      "XSXBWB[==BWBXSX",
      "SXSWBWBWBWBWSXS",
      "XSXBWBWBWBWBXSX",
      "...XSX<#>XSX...",
      "...SXS#*#SXS...",
      "...XSX>#<XSX..."
    ]
  },
  "4人用クロス9列4行": {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    promoLineOffset: 6,
    field: [
      "....XSX<#>XSX....",
      "....SXS#*#SXS....",
      "....XSX>#<XSX....",
      "....SXSXSXSXS....",
      "XSXSBWBWBWBWBSXSX",
      "SXSXWBWBWBWBWXSXS",
      "XSXSBWB==]BWBSXSX",
      "<#>XWB=====BWX<#>",
      "#*#SBW=====WBS#*#",
      ">#<XWB=====BWX>#<",
      "XSXSBWB[==BWBSXSX",
      "SXSXWBWBWBWBWXSXS",
      "XSXSBWBWBWBWBSXSX",
      "....SXSXSXSXS....",
      "....XSX<#>XSX....",
      "....SXS#*#SXS....",
      "....XSX>#<XSX...."
    ]
  }
}, G = {
  S: {
    name: "将棋",
    text: "　　",
    backgroundColor: "#EECC88",
    borderColor: "#333333"
  },
  s: {
    name: "古将棋(持ち駒なし)",
    text: "　　",
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    attr: ["cantCapture"]
  },
  X: {
    name: "クロス用黒",
    text: "　　",
    backgroundColor: "#BB7744",
    borderColor: "#333333"
  },
  M: {
    name: "マークルック",
    text: "　　",
    backgroundColor: "#775544",
    borderColor: "#CCCCCC"
  },
  W: {
    name: "チェス白",
    text: "　　",
    backgroundColor: "#CCCCCC",
    borderColor: "#33333377"
  },
  B: {
    name: "チェス黒",
    text: "　　",
    backgroundColor: "#444444",
    borderColor: "#CCCCCC77"
  },
  w: {
    name: "チェス白(クレージーハウス)",
    text: "　　",
    backgroundColor: "#CCCCCC",
    borderColor: "#33333377",
    attr: ["capture"]
  },
  b: {
    name: "チェス黒(持ち駒あり)",
    text: "　　",
    backgroundColor: "#444444",
    borderColor: "#CCCCCC77",
    attr: ["capture"]
  },
  "+": {
    name: "シャンチー(交点)",
    text: "　　",
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    intersect: !0
  },
  $: {
    name: "どうぶつしょうぎ地",
    text: "　　",
    backgroundColor: "#FFFFDD",
    borderColor: "#FFBB77"
  },
  D: {
    name: "どうぶつしょうぎ空",
    text: "　　",
    backgroundColor: "#AADDFF",
    borderColor: "#FFBB77"
  },
  4: {
    name: "どうぶつしょうぎ夕",
    text: "　　",
    backgroundColor: "#FFDDAA",
    borderColor: "#FFBB77"
  },
  d: {
    name: "どうぶつしょうぎ森",
    text: "　　",
    backgroundColor: "#DDFFAA",
    borderColor: "#FFBB77"
  },
  "=": {
    name: "河界",
    text: "＝＝",
    backgroundColor: "#EECC88",
    borderColor: "#33221144"
  },
  "[": {
    name: "河界左字",
    text: "＝＝",
    backgroundColor: "#EECC88",
    borderColor: "#33221144",
    displayText: "河",
    textRotate: -90
  },
  "]": {
    name: "河界右字",
    text: "＝＝",
    backgroundColor: "#EECC88",
    borderColor: "#33221144",
    displayText: "界",
    textRotate: 90
  },
  "#": {
    name: "九宮",
    text: "　：",
    backgroundColor: "#CC9966",
    borderColor: "#333333",
    attr: ["palace"]
  },
  "<": {
    name: "九宮左",
    text: "　＼",
    backgroundColor: "#CC9966",
    borderColor: "#333333",
    borderSlashLeft: !0,
    attr: ["palace", "palaceSlash"]
  },
  ">": {
    name: "九宮右",
    text: "　／",
    backgroundColor: "#CC9966",
    borderColor: "#333333",
    borderSlashRight: !0,
    attr: ["palace", "palaceSlash"]
  },
  "*": {
    name: "九宮中",
    text: "　※",
    backgroundColor: "#CC9966",
    borderColor: "#333333",
    borderSlashLeft: !0,
    borderSlashRight: !0,
    attr: ["palace", "palaceSlash"]
  },
  ".": {
    name: "立入禁止",
    text: "＃＃",
    backgroundColor: "#00000000",
    borderColor: "#00000000",
    attr: ["keepOut"]
  }
}, H = {
  歩: {
    name: "歩兵",
    display: ["歩兵"],
    gameName: "将棋",
    unit: "兵",
    attr: ["capture"],
    forcePromoLine: 1,
    range: {
      default: "歩"
    },
    promo: "と"
  },
  桂: {
    name: "桂馬",
    display: ["桂馬"],
    gameName: "将棋",
    unit: "馬",
    attr: ["capture"],
    forcePromoLine: 2,
    range: {
      default: "桂"
    },
    promo: "圭"
  },
  銀: {
    name: "銀将",
    display: ["銀将", "銀將"],
    gameName: "将棋",
    unit: "象",
    attr: ["capture"],
    range: {
      default: "銀"
    },
    promo: "全"
  },
  角: {
    name: "角行",
    display: ["角行"],
    gameName: "将棋",
    unit: "象",
    attr: ["capture"],
    range: {
      default: "聖"
    },
    promo: "馬"
  },
  香: {
    name: "香車",
    display: ["香車"],
    gameName: "将棋",
    unit: "車",
    attr: ["capture"],
    forcePromoLine: 1,
    range: {
      default: "香"
    },
    promo: "杏"
  },
  飛: {
    name: "飛車",
    display: ["飛車"],
    gameName: "将棋",
    unit: "車",
    attr: ["capture"],
    range: {
      default: "車"
    },
    promo: "龍"
  },
  金: {
    name: "金将",
    display: ["金將", "金将"],
    gameName: "将棋",
    unit: "臣",
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  玉: {
    name: "玉将",
    display: ["玉將", "王將", "玉将", "王将"],
    alias: "皇",
    gameName: "将棋",
    unit: "王",
    attr: ["king", "capture"],
    range: {
      default: "王"
    }
  },
  兵: {
    name: "ポーン",
    display: ["♟兵", "♙兵"],
    gameName: "チェス",
    unit: "兵",
    attr: ["enPassant"],
    forcePromoLine: 1,
    range: {
      default: "歩",
      start: "二",
      attack: "兵",
      enPassant: "通"
    },
    promo: "妃騏城僧"
  },
  騎: {
    name: "ナイト",
    display: ["♞騎", "♘騎"],
    gameName: "チェス",
    unit: "馬",
    range: {
      default: "騎"
    }
  },
  聖: {
    name: "ビショップ",
    display: ["♝聖", "♗聖"],
    gameName: "チェス",
    unit: "象",
    range: {
      default: "聖"
    }
  },
  塔: {
    name: "ルーク",
    display: ["♜塔", "♖塔"],
    gameName: "チェス",
    unit: "車",
    attr: ["castlingRook"],
    range: {
      default: "車",
      castling: "塔"
    }
  },
  后: {
    name: "クイーン",
    display: ["♛后", "♕后"],
    gameName: "チェス",
    unit: "臣",
    range: {
      default: "后"
    }
  },
  王: {
    name: "キング",
    display: ["♚王", "♔王"],
    alias: "帝",
    gameName: "チェス",
    unit: "王",
    attr: ["king", "castlingKing"],
    range: {
      default: "王",
      castling: "城"
    }
  },
  卒: {
    name: "卒",
    display: ["○卒", "○兵", "卒", "兵"],
    gameName: "シャンチー",
    unit: "兵",
    forcePromoLine: 4,
    range: {
      default: "歩"
    },
    promo: "率"
  },
  炮: {
    name: "炮",
    display: ["○炮", "○砲", "炮", "砲"],
    alias: "砲",
    gameName: "シャンチー",
    unit: "砲",
    attr: ["pao"],
    range: {
      default: "車",
      attack: "砲"
    }
  },
  馮: {
    name: "傌",
    display: ["○傌", "○傌", "○馬", "傌", "馬"],
    alias: "傌",
    gameName: "シャンチー",
    unit: "馬",
    range: {
      default: "馮"
    }
  },
  相: {
    name: "相",
    display: ["○相", "○象", "相", "象"],
    gameName: "シャンチー",
    unit: "象",
    attr: ["unCrossRiver"],
    range: {
      default: "相"
    }
  },
  俥: {
    name: "俥",
    display: ["○俥", "○車", "俥", "車"],
    gameName: "シャンチー",
    unit: "車",
    range: {
      default: "車"
    }
  },
  仕: {
    name: "仕",
    display: ["○仕", "○士", "仕", "士"],
    gameName: "シャンチー",
    unit: "臣",
    attr: ["inPalace"],
    range: {
      palaceSlash: "ぞ"
    }
  },
  帥: {
    name: "帥",
    display: ["⊕帥", "⊕將", "帥", "將"],
    alias: "將",
    gameName: "シャンチー",
    unit: "王",
    attr: ["king", "inPalace", "cantSeeKing"],
    range: {
      default: "き"
    }
  },
  卆: {
    name: "卒",
    display: ["⬡卆", "⬡卒", "卆", "卒"],
    gameName: "チャンギ",
    unit: "兵",
    range: {
      default: "卒",
      palaceSlash: "兵"
    }
  },
  包: {
    name: "包",
    display: ["⬡包", "包"],
    gameName: "チャンギ",
    unit: "砲",
    attr: ["po"],
    range: {
      default: "砲",
      palaceSlash: "弓"
    }
  },
  馭: {
    name: "馬",
    display: ["⬡马", "⬡马", "⬡馭", "⬡馬", "马", "馭", "馬"],
    alias: "马",
    gameName: "チャンギ",
    unit: "馬",
    range: {
      default: "馮"
    }
  },
  象: {
    name: "象",
    display: ["⬡象", "象"],
    gameName: "チャンギ",
    unit: "象",
    range: {
      default: "象"
    }
  },
  車: {
    name: "車",
    display: ["⬡车", "⬡车", "⬡車", "车", "車"],
    alias: "车",
    gameName: "チャンギ",
    unit: "車",
    range: {
      default: "車",
      palaceSlash: "聖"
    }
  },
  士: {
    name: "士",
    display: ["⬡士", "士"],
    gameName: "チャンギ",
    unit: "臣",
    attr: ["inPalace"],
    range: {
      default: "き",
      palaceSlash: "ぞ"
    }
  },
  楚: {
    name: "楚",
    display: ["⏣楚", "⏣漢", "楚", "漢"],
    alias: "漢",
    gameName: "チャンギ",
    unit: "王",
    attr: ["king", "inPalace", "bikjang", "usePass", "swapHorseElephant"],
    range: {
      default: "き",
      palaceSlash: "ぞ"
    }
  },
  貝: {
    name: "ビア",
    display: ["⛂貝", "◎貝"],
    gameName: "マークルック",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "貴"
  },
  瑪: {
    name: "マー",
    display: ["🐴瑪", "🦄瑪", "🦓瑪"],
    gameName: "マークルック",
    unit: "馬",
    range: {
      default: "騎"
    }
  },
  根: {
    name: "コーン",
    display: ["Δ根", "🧄根", "⏏根"],
    gameName: "マークルック",
    unit: "象",
    range: {
      default: "銀"
    }
  },
  船: {
    name: "ルアー",
    display: ["⯊船"],
    gameName: "マークルック",
    unit: "車",
    range: {
      default: "車"
    }
  },
  種: {
    name: "メット",
    display: ["▴種"],
    gameName: "マークルック",
    unit: "臣",
    range: {
      default: "ぞ",
      start: "弐"
    }
  },
  君: {
    name: "クン",
    gameName: "マークルック",
    display: ["▲君", "△君", "▲公", "△公"],
    alias: "公",
    unit: "王",
    attr: ["king", "countingRules"],
    range: {
      default: "ぞ"
    }
  },
  火: {
    name: "パダーティ",
    display: ["🗡人", "🗡火"],
    gameName: "チャトランガ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "杵"
  },
  天: {
    name: "パダーティ",
    display: ["🗡人", "🗡天"],
    gameName: "チャトランガ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "橡"
  },
  木: {
    name: "パダーティ",
    display: ["🗡人", "🗡木"],
    gameName: "チャトランガ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "戰"
  },
  大: {
    name: "パダーティ",
    display: ["🗡人", "🗡大"],
    gameName: "チャトランガ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "巨"
  },
  央: {
    name: "パダーティ",
    display: ["🗡人", "🗡人", "🗡央"],
    alias: "人",
    gameName: "チャトランガ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "往"
  },
  午: {
    name: "アシュワ",
    display: ["🐎午"],
    gameName: "チャトランガ",
    unit: "馬",
    range: {
      default: "騎"
    }
  },
  像: {
    name: "ガジャ",
    display: ["🐘像"],
    gameName: "チャトランガ",
    unit: "象",
    range: {
      default: "像"
    }
  },
  戦: {
    name: "ラタ",
    display: ["🛞戦"],
    gameName: "チャトランガ",
    unit: "車",
    range: {
      default: "車"
    }
  },
  臣: {
    name: "マントリ",
    display: ["⚔臣"],
    gameName: "チャトランガ",
    unit: "臣",
    range: {
      default: "ぞ"
    }
  },
  主: {
    name: "ラージャ",
    gameName: "チャトランガ",
    display: ["👑主", "🛡主", "🛡柱"],
    alias: "柱",
    unit: "王",
    attr: ["king"],
    range: {
      default: "王"
    }
  },
  ひ: {
    name: "ひよこ",
    display: ["🐤ひ"],
    gameName: "どうぶつしょうぎ",
    unit: "兵",
    attr: ["capture"],
    forcePromoLine: 1,
    range: {
      default: "歩"
    },
    promo: "に"
  },
  ぞ: {
    name: "ぞう",
    display: ["🐘ぞ"],
    gameName: "どうぶつしょうぎ",
    unit: "象",
    attr: ["capture"],
    range: {
      default: "ぞ"
    }
  },
  き: {
    name: "きりん",
    display: ["🦒き"],
    gameName: "どうぶつしょうぎ",
    unit: "車",
    attr: ["capture"],
    range: {
      default: "き"
    }
  },
  ラ: {
    name: "ライオン",
    display: ["🦁ラ"],
    gameName: "どうぶつしょうぎ",
    unit: "王",
    attr: ["king", "capture", "ruleThrough"],
    range: {
      default: "王"
    }
  },
  燕: {
    name: "燕",
    display: ["燕"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "兵",
    attr: ["capture"],
    forcePromoLine: 3,
    range: {
      default: "歩"
    },
    promo: "鴈"
  },
  雉: {
    name: "雉",
    display: ["雉"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "馬",
    attr: ["capture"],
    range: {
      default: "雉"
    }
  },
  鶴: {
    name: "銀将",
    display: ["鶴"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "象",
    attr: ["capture"],
    range: {
      default: "猛"
    }
  },
  鶉: {
    name: "鶉(左)",
    display: ["左鶉"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "車",
    attr: ["capture", "cantPromotion"],
    range: {
      default: "鶉"
    },
    promo: "左"
  },
  享: {
    name: "鶉(右)",
    display: ["右鶉"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "車",
    attr: ["capture", "cantPromotion"],
    range: {
      default: "享"
    },
    promo: "右"
  },
  鷹: {
    name: "鷹",
    display: ["鷹"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "臣",
    attr: ["capture"],
    forcePromoLine: 3,
    range: {
      default: "醉"
    },
    promo: "雕"
  },
  鵬: {
    name: "鵬",
    display: ["鵬"],
    gameName: "将棋",
    expansion: "禽将棋",
    unit: "王",
    attr: ["king", "capture", "twoSwallows"],
    range: {
      default: "王"
    }
  },
  京: {
    name: "京翔",
    display: ["京翔"],
    gameName: "将棋",
    expansion: "京将棋",
    unit: "馬",
    attr: ["capture"],
    forcePromoLine: 3,
    range: {
      default: "京"
    },
    promo: "幾"
  },
  銅: {
    name: "銅将",
    display: ["銅将"],
    gameName: "将棋",
    expansion: "京将棋",
    unit: "象",
    attr: ["capture"],
    range: {
      default: "銅"
    },
    promo: "う"
  },
  山: {
    name: "山車",
    display: ["山車"],
    gameName: "将棋",
    expansion: "京将棋",
    unit: "車",
    attr: ["capture"],
    range: {
      default: "山"
    },
    promo: "さ"
  },
  翅: {
    name: "金翅",
    display: ["金翅"],
    gameName: "将棋",
    expansion: "京将棋",
    unit: "臣",
    attr: ["capture"],
    range: {
      default: "翅"
    }
  },
  斗: {
    name: "金斗",
    display: ["金斗"],
    gameName: "将棋",
    expansion: "京将棋",
    unit: "臣",
    attr: ["capture"],
    range: {
      default: "斗"
    }
  },
  跳: {
    name: "跳馬",
    display: ["跳馬"],
    gameName: "将棋",
    expansion: "御妃将棋",
    unit: "馬",
    attr: ["capture"],
    range: {
      default: "騎"
    },
    promo: "含"
  },
  返: {
    name: "反車",
    display: ["反車"],
    gameName: "将棋",
    expansion: "御妃将棋",
    unit: "車",
    attr: ["capture"],
    range: {
      default: "反"
    },
    promo: "余"
  },
  女: {
    name: "妃将",
    display: ["妃將"],
    gameName: "将棋",
    expansion: "御妃将棋",
    unit: "臣",
    attr: ["capture"],
    range: {
      default: "后"
    }
  },
  醉: {
    name: "醉象",
    display: ["醉象"],
    expansion: "朝倉象棋",
    gameName: "将棋",
    unit: "臣",
    attr: ["capture", "cantCapture"],
    range: {
      default: "醉"
    },
    promo: "太"
  },
  丘: {
    name: "ポーン",
    display: ["♟兵", "♙兵", "♟丘", "♙丘"],
    gameName: "チェス",
    expansion: "ロスアラモスチェス",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "妃騏城"
  },
  浜: {
    name: "ポーン",
    display: ["♟兵", "♙兵", "♟浜", "♙浜"],
    gameName: "チェス",
    expansion: "カパブランカチェス",
    unit: "兵",
    attr: ["enPassant"],
    forcePromoLine: 1,
    range: {
      default: "歩",
      start: "二",
      attack: "兵"
    },
    promo: "妃駈駁騏城僧"
  },
  駮: {
    name: "カーディナル",
    display: ["🩓駮", "🩐駮"],
    gameName: "チェス",
    expansion: "カパブランカチェス",
    unit: "臣",
    range: {
      default: "駮"
    }
  },
  駆: {
    name: "マーシャル",
    display: ["🩒駆", "🩏駆"],
    gameName: "チェス",
    expansion: "カパブランカチェス",
    unit: "臣",
    range: {
      default: "駆"
    }
  },
  国: {
    name: "キング",
    display: ["♚王", "♔王"],
    alias: "國",
    gameName: "チェス",
    expansion: "カパブランカチェス",
    unit: "王",
    attr: ["king", "castlingKing"],
    range: {
      default: "王",
      castling: "国"
    }
  },
  矢: {
    name: "パダーティ",
    display: ["🗡人", "🗡矢"],
    gameName: "チャトランガ",
    expansion: "チャトラジ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "舶"
  },
  本: {
    name: "パダーティ",
    display: ["🗡人", "🗡本"],
    gameName: "チャトランガ",
    expansion: "チャトラジ",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "豪"
  },
  舟: {
    name: "ローカ",
    display: ["⛵舟"],
    gameName: "チャトランガ",
    expansion: "チャトラジ",
    unit: "象",
    range: {
      default: "像"
    }
  },
  豕: {
    name: "ハスティー",
    display: ["🐘豕"],
    gameName: "チャトランガ",
    expansion: "チャトラジ",
    unit: "車",
    range: {
      default: "車"
    }
  },
  ね: {
    name: "ねこ",
    display: ["🐱ね"],
    gameName: "どうぶつしょうぎ",
    expansion: "ごろごろどうぶつしょうぎ",
    unit: "象",
    attr: ["capture"],
    range: {
      default: "銀"
    },
    promo: "ネ"
  },
  い: {
    name: "いぬ",
    display: ["🐶い"],
    gameName: "どうぶつしょうぎ",
    expansion: "ごろごろどうぶつしょうぎ",
    unit: "臣",
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  ら: {
    name: "ライオン",
    display: ["🦁ラ"],
    gameName: "どうぶつしょうぎ",
    expansion: "ごろごろどうぶつしょうぎ",
    unit: "王",
    attr: ["king", "capture"],
    range: {
      default: "王"
    }
  },
  仲: {
    name: "仲人",
    display: ["仲人"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "兵",
    range: {
      default: "仲"
    },
    promo: "酔"
  },
  同: {
    name: "銅将",
    display: ["銅将"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "臣",
    range: {
      default: "歩"
    },
    promo: "黄"
  },
  艮: {
    name: "銀将",
    display: ["銀将"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "象",
    range: {
      default: "銀"
    },
    promo: "堅"
  },
  釡: {
    name: "金将",
    display: ["金將", "金将"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "臣",
    range: {
      default: "金"
    },
    promo: "升"
  },
  猛: {
    name: "猛豹",
    display: ["猛豹"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "象",
    range: {
      default: "猛"
    },
    promo: "桷"
  },
  馨: {
    name: "香車",
    display: ["香車"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "車",
    forcePromoLine: 1,
    range: {
      default: "香"
    },
    promo: "駒"
  },
  反: {
    name: "反車",
    display: ["反車"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "車",
    range: {
      default: "反"
    },
    promo: "鯨"
  },
  虎: {
    name: "盲虎",
    display: ["盲虎"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "象",
    range: {
      default: "虎"
    },
    promo: "鹿"
  },
  麒: {
    name: "麒麟",
    display: ["麒麟"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "馬",
    range: {
      default: "麒"
    },
    promo: "鰤"
  },
  鳳: {
    name: "鳳凰",
    display: ["鳳凰"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "象",
    range: {
      default: "鳳"
    },
    promo: "卉"
  },
  横: {
    name: "横行",
    display: ["横行"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "車",
    range: {
      default: "横"
    },
    promo: "猪"
  },
  竪: {
    name: "竪行",
    display: ["竪行"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "車",
    range: {
      default: "竪"
    },
    promo: "牛"
  },
  碼: {
    name: "竜馬",
    display: ["竜馬"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "臣",
    range: {
      default: "馬"
    },
    promo: "鷂"
  },
  竜: {
    name: "竜王",
    display: ["竜王"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "臣",
    range: {
      default: "竜"
    },
    promo: "鷲"
  },
  奔: {
    name: "奔走",
    display: ["奔走"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "臣",
    range: {
      default: "后"
    }
  },
  獅: {
    name: "獅子",
    display: ["獅子"],
    gameName: "将棋",
    expansion: "中将棋",
    unit: "臣",
    range: {
      default: "獅"
    }
  },
  石: {
    name: "石将",
    display: ["石将"],
    gameName: "将棋",
    expansion: "大将棋",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "兵"
    },
    promo: "鉐"
  },
  鉄: {
    name: "鉄将",
    display: ["鐵将", "鐵将", "鉄将"],
    alias: "鐵",
    gameName: "将棋",
    expansion: "大将棋",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "鉄"
    },
    promo: "鋼"
  },
  猫: {
    name: "猫刄",
    display: ["猫刄"],
    gameName: "将棋",
    expansion: "大将棋",
    unit: "象",
    range: {
      default: "ぞ"
    },
    promo: "錨"
  },
  瀧: {
    name: "飛龍",
    display: ["飛龍"],
    gameName: "将棋",
    expansion: "大将棋",
    unit: "象",
    range: {
      default: "瀧"
    },
    promo: "錆"
  },
  嗔: {
    name: "嗔猪",
    display: ["嗔猪"],
    gameName: "将棋",
    expansion: "大将棋",
    unit: "車",
    range: {
      default: "き"
    },
    promo: "鎭"
  },
  丑: {
    name: "猛牛",
    display: ["猛牛"],
    gameName: "将棋",
    expansion: "大将棋",
    unit: "車",
    range: {
      default: "丑"
    },
    promo: "鈕"
  },
  狼: {
    name: "悪狼",
    display: ["悪狼"],
    gameName: "将棋",
    expansion: "大将棋",
    unit: "臣",
    range: {
      default: "狼"
    },
    promo: "狂"
  },
  雀: {
    name: "萑歩",
    display: ["萑歩"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩"
    },
    promo: "錐"
  },
  烏: {
    name: "烏行",
    display: ["烏行"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "馬",
    range: {
      default: "烏"
    },
    promo: "鳶"
  },
  鴟: {
    name: "鴟行",
    display: ["鴟行"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "馬",
    range: {
      default: "烏"
    },
    promo: "曇"
  },
  鶏: {
    name: "鶏飛",
    display: ["鶏飛"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "象",
    range: {
      default: "鶏"
    },
    promo: "延"
  },
  犬: {
    name: "盲犬",
    display: ["盲犬"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "象",
    range: {
      default: "犬"
    },
    promo: "狛"
  },
  麁: {
    name: "猛鹿",
    display: ["猛鹿"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "象",
    range: {
      default: "銀"
    },
    promo: "豬"
  },
  鷙: {
    name: "飛鷹",
    display: ["飛鷹"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "象",
    range: {
      default: "鷙"
    },
    promo: "鷄"
  },
  犇: {
    name: "牛車",
    display: ["牛車"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "車",
    forcePromoLine: 1,
    range: {
      default: "香"
    },
    promo: "前"
  },
  風: {
    name: "風馬",
    display: ["風馬"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "車",
    range: {
      default: "風"
    },
    promo: "騰"
  },
  羽: {
    name: "燕羽",
    display: ["燕羽"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "車",
    range: {
      default: "横"
    },
    promo: "行"
  },
  兎: {
    name: "走兎",
    display: ["走兎"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "車",
    range: {
      default: "兎"
    },
    promo: "瓜"
  },
  猿: {
    name: "登猿",
    display: ["登猿"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "臣",
    range: {
      default: "銅"
    },
    promo: "麈"
  },
  鳫: {
    name: "鳫飛",
    display: ["鳫飛"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "臣",
    range: {
      default: "銅"
    },
    promo: "羽"
  },
  狽: {
    name: "猛狼",
    display: ["猛狼"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "臣",
    range: {
      default: "金"
    },
    promo: "熊"
  },
  狐: {
    name: "隠狐",
    display: ["隠狐"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "臣",
    range: {
      default: "狐"
    }
  },
  雲: {
    name: "雲鷲",
    display: ["雲鷲"],
    gameName: "将棋",
    expansion: "和将棋",
    unit: "臣",
    range: {
      default: "雲"
    }
  },
  霍: {
    name: "靏玉",
    display: ["靏玉"],
    alias: "皇",
    gameName: "将棋",
    expansion: "和将棋",
    unit: "王",
    attr: ["king"],
    range: {
      default: "王"
    }
  },
  梹: {
    name: "ポーン",
    display: ["♟兵", "♙兵", "♟梹", "♙梹"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "篩遲麋齶塞鵺"
  },
  師: {
    name: "ライオン",
    display: ["🦁師"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "馬",
    range: {
      default: "師"
    }
  },
  犀: {
    name: "ユニコーン",
    display: ["🦏犀"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "馬",
    range: {
      default: "犀"
    }
  },
  麟: {
    name: "ジラフ",
    display: ["🦒麟"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "象",
    range: {
      default: "麟"
    }
  },
  鰐: {
    name: "コカトリス",
    display: ["🐊鰐"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "象",
    range: {
      default: "聖"
    }
  },
  砦: {
    name: "ルーク",
    display: ["♜砦"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "車",
    range: {
      default: "車"
    }
  },
  鴻: {
    name: "アンカ",
    display: ["🦅鴻"],
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "臣",
    range: {
      default: "鴻"
    }
  },
  呈: {
    name: "キング",
    display: ["♚王", "♔王"],
    alias: "逞",
    gameName: "チェス",
    expansion: "GrantAcedrex",
    unit: "王",
    attr: ["king"],
    range: {
      default: "王",
      start: "呈"
    }
  },
  鋲: {
    name: "ソルダート",
    display: ["♟兵", "♙兵", "♟鋲", "♙鋲"],
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "兵",
    forcePromoLine: 1,
    range: {
      default: "歩",
      attack: "兵"
    },
    promo: "童"
  },
  射: {
    name: "シュッツェ",
    display: ["🏹射"],
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "象",
    range: {
      default: "像"
    }
  },
  使: {
    name: "クーリエ",
    display: ["⨺使"],
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "象",
    range: {
      default: "聖"
    }
  },
  佯: {
    name: "シュライヒ",
    display: ["🎭佯"],
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "車",
    range: {
      default: "き"
    }
  },
  賢: {
    name: "マン",
    display: ["🎓賢"],
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "臣",
    range: {
      default: "王"
    }
  },
  妾: {
    name: "ケーニギン",
    display: ["♛妾"],
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "臣",
    range: {
      default: "ぞ"
    }
  },
  閏: {
    name: "ケーニヒ",
    display: ["♚王", "♔王"],
    alias: "潤",
    gameName: "チェス",
    expansion: "クーリエチェス",
    unit: "王",
    attr: ["king"],
    range: {
      default: "王"
    }
  },
  と: {
    name: "と金",
    display: ["と", "个"],
    alias: "个",
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  杏: {
    name: "成香",
    display: ["仝", "仝", "杏"],
    alias: "仝",
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  圭: {
    name: "成桂",
    display: ["今", "今", "圭"],
    alias: "今",
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  全: {
    name: "成銀",
    display: ["全"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  馬: {
    name: "龍馬",
    display: ["龍馬", "竜馬"],
    attr: ["capture"],
    range: {
      default: "馬"
    }
  },
  龍: {
    name: "龍王",
    display: ["龍王", "龍王", "竜王"],
    attr: ["capture"],
    range: {
      default: "竜"
    }
  },
  妃: {
    name: "Pクイーン",
    display: ["♕妃", "♛妃"],
    range: {
      default: "后"
    }
  },
  騏: {
    name: "Pナイト",
    display: ["♘騏", "♞騏"],
    range: {
      default: "騎"
    }
  },
  城: {
    name: "Pルーク",
    display: ["♖城", "♜城"],
    range: {
      default: "車"
    }
  },
  僧: {
    name: "Pビショップ",
    display: ["♗僧", "♝僧"],
    range: {
      default: "聖"
    }
  },
  率: {
    name: "成卒",
    display: ["⊖率", "⊖卒", "⊖兵", "率", "卒", "兵"],
    range: {
      default: "卒"
    }
  },
  貴: {
    name: "ビアガーイ",
    display: ["⛀貴", "⛀珠", "◉貴", "◉珠"],
    alias: "珠",
    range: {
      default: "ぞ"
    }
  },
  杵: {
    name: "Pアシュワ",
    display: ["🐎杵"],
    range: {
      default: "騎"
    }
  },
  橡: {
    name: "Pガジャ",
    display: ["🐘橡"],
    range: {
      default: "像"
    }
  },
  戰: {
    name: "Pラタ",
    display: ["🛞戰"],
    range: {
      default: "車"
    }
  },
  巨: {
    name: "Pマントリ",
    display: ["⚔巨"],
    range: {
      default: "ぞ"
    }
  },
  往: {
    name: "Pラージャ",
    display: ["🔱往"],
    range: {
      default: "王"
    }
  },
  に: {
    name: "にわとり",
    display: ["🐔に"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  鴈: {
    name: "鴈",
    display: ["鴈"],
    attr: ["capture"],
    range: {
      default: "鴈"
    }
  },
  左: {
    name: "左(鶉)",
    display: ["左"],
    gameName: "将棋",
    unit: "車",
    attr: ["promoted"],
    range: {
      default: "〇"
    }
  },
  右: {
    name: "右(鶉)",
    display: ["右"],
    gameName: "将棋",
    unit: "車",
    attr: ["promoted"],
    range: {
      default: "〇"
    }
  },
  雕: {
    name: "鵰",
    display: ["鵰", "鵰"],
    alias: "鵰",
    attr: ["capture"],
    range: {
      default: "雕"
    }
  },
  幾: {
    name: "成京",
    display: ["き"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  う: {
    name: "成銅",
    display: ["う"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  さ: {
    name: "成山",
    display: ["さ"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  太: {
    name: "太子",
    display: ["太子"],
    attr: ["king", "capture", "cantCapture"],
    range: {
      default: "王"
    }
  },
  余: {
    name: "成反",
    display: ["余"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  含: {
    name: "成跳",
    display: ["含"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  駁: {
    name: "Pカーディナル",
    display: ["🩐駁", "🩓駁"],
    range: {
      default: "駮"
    }
  },
  駈: {
    name: "Pマーシャル",
    display: ["🩏駈", "🩒駈"],
    range: {
      default: "駆"
    }
  },
  舶: {
    name: "Pローカ",
    display: ["⛵舶"],
    range: {
      default: "像"
    }
  },
  豪: {
    name: "Pハスティー",
    display: ["🐘豪"],
    range: {
      default: "車"
    }
  },
  ネ: {
    name: "パワーアップねこ",
    display: ["😺ネ"],
    attr: ["capture"],
    range: {
      default: "金"
    }
  },
  升: {
    name: "金飛車",
    display: ["金飛"],
    range: {
      default: "車"
    }
  },
  堅: {
    name: "銀竪行",
    display: ["銀竪"],
    range: {
      default: "竪"
    }
  },
  黄: {
    name: "銅横行",
    display: ["銅横"],
    range: {
      default: "横"
    }
  },
  桷: {
    name: "小角",
    display: ["小角"],
    range: {
      default: "聖"
    }
  },
  駒: {
    name: "白駒",
    display: ["白駒"],
    range: {
      default: "駒"
    }
  },
  鯨: {
    name: "鯨鯢",
    display: ["鯨鯢"],
    range: {
      default: "鯨"
    }
  },
  鹿: {
    name: "飛鹿",
    display: ["飛鹿"],
    range: {
      default: "鹿"
    }
  },
  鰤: {
    name: "麒獅子",
    display: ["麒獅"],
    range: {
      default: "獅"
    }
  },
  卉: {
    name: "鳳奔走",
    display: ["鳳奔"],
    range: {
      default: "后"
    }
  },
  酔: {
    name: "酔象",
    display: ["酔象"],
    range: {
      default: "醉"
    }
  },
  猪: {
    name: "奔猪",
    display: ["奔猪"],
    range: {
      default: "猪"
    }
  },
  牛: {
    name: "飛牛",
    display: ["飛牛"],
    range: {
      default: "牛"
    }
  },
  鷂: {
    name: "角鷹",
    display: ["角鷹"],
    range: {
      default: "鷂"
    }
  },
  鷲: {
    name: "飛鷲",
    display: ["飛鷲"],
    range: {
      default: "鷲"
    }
  },
  鉐: {
    name: "石金将",
    display: ["石金"],
    range: {
      default: "金"
    }
  },
  鋼: {
    name: "金将",
    display: ["鉄金"],
    range: {
      default: "金"
    }
  },
  錨: {
    name: "猫金将",
    display: ["猫金"],
    range: {
      default: "金"
    }
  },
  錆: {
    name: "龍金将",
    display: ["龍金"],
    range: {
      default: "金"
    }
  },
  鎭: {
    name: "嗔金将",
    display: ["嗔金"],
    range: {
      default: "金"
    }
  },
  鈕: {
    name: "牛金将",
    display: ["牛金"],
    range: {
      default: "金"
    }
  },
  狂: {
    name: "狼金将",
    display: ["狼金"],
    range: {
      default: "金"
    }
  },
  錐: {
    name: "金鳥",
    display: ["金鳥"],
    range: {
      default: "金"
    }
  },
  鳶: {
    name: "烏飛鷹",
    display: ["烏鷹"],
    range: {
      default: "鷙"
    }
  },
  曇: {
    name: "鴟雲鷲",
    display: ["鴟鷲"],
    range: {
      default: "雲"
    }
  },
  延: {
    name: "延鷹",
    display: ["延鷹"],
    range: {
      default: "延"
    }
  },
  狛: {
    name: "犬猛狼",
    display: ["犬狼"],
    range: {
      default: "金"
    }
  },
  豬: {
    name: "行猪",
    display: ["行猪"],
    range: {
      default: "醉"
    }
  },
  鷄: {
    name: "鷄鷹",
    display: ["鷄鷹"],
    range: {
      default: "鷄"
    }
  },
  前: {
    name: "歬牛",
    display: ["歬牛"],
    range: {
      default: "王"
    }
  },
  騰: {
    name: "天馬",
    display: ["天馬"],
    range: {
      default: "騰"
    }
  },
  行: {
    name: "燕行",
    display: ["燕行"],
    range: {
      default: "車"
    }
  },
  瓜: {
    name: "兎隠狐",
    display: ["兎狐"],
    range: {
      default: "狐"
    }
  },
  麈: {
    name: "猿猛鹿",
    display: ["猿鹿"],
    range: {
      default: "銀"
    }
  },
  羽: {
    name: "鳫燕羽",
    display: ["鳫燕"],
    range: {
      default: "横"
    }
  },
  熊: {
    name: "熊眼",
    display: ["熊眼"],
    range: {
      default: "王"
    }
  },
  篩: {
    name: "Pライオン",
    display: ["🦁篩"],
    range: {
      default: "師"
    }
  },
  遲: {
    name: "Pユニコーン",
    display: ["🦏遲"],
    range: {
      default: "犀"
    }
  },
  麋: {
    name: "Pジラフ",
    display: ["🦒麋"],
    range: {
      default: "麟"
    }
  },
  齶: {
    name: "Pコカトリス",
    display: ["🐊齶"],
    range: {
      default: "聖"
    }
  },
  塞: {
    name: "Pルーク",
    display: ["♖塞"],
    range: {
      default: "車"
    }
  },
  鵺: {
    name: "Pアンカ",
    display: ["🦅鵺"],
    range: {
      default: "鴻"
    }
  },
  童: {
    name: "Pケーニギン",
    display: ["♕童"],
    range: {
      default: "ぞ"
    }
  }
}, Z = {
  "〇": [
    ".......",
    ".......",
    ".......",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  歩: [
    ".......",
    ".......",
    "...A...",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  兵: [
    ".......",
    ".......",
    "..A.A..",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  二: [
    ".......",
    "...A...",
    "...a...",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  烏: [
    ".......",
    ".......",
    "...A...",
    "...O...",
    "..A.A..",
    ".......",
    "......."
  ],
  通: [
    ".......",
    ".......",
    ".......",
    "..AOA..",
    ".......",
    ".......",
    "......."
  ],
  弐: [
    ".......",
    "...A...",
    ".......",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  卒: [
    ".......",
    ".......",
    "...A...",
    "..AOA..",
    ".......",
    ".......",
    "......."
  ],
  鴈: [
    ".......",
    ".A...A.",
    ".......",
    "...O...",
    ".......",
    "...A...",
    "......."
  ],
  仲: [
    ".......",
    ".......",
    "...A...",
    "...O...",
    "...A...",
    ".......",
    "......."
  ],
  鉄: [
    ".......",
    ".......",
    "..AAA..",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  桂: [
    ".......",
    "..A.A..",
    ".......",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  京: [
    "..A.A..",
    ".......",
    ".......",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  騎: [
    ".......",
    "..A.A..",
    ".A...A.",
    "...O...",
    ".A...A.",
    "..A.A..",
    "......."
  ],
  騰: [
    ".......",
    "..A.A..",
    ".......",
    "...O...",
    ".......",
    "..A.A..",
    "......."
  ],
  馮: [
    ".......",
    "..A.A..",
    ".D.a.B.",
    "..dOb..",
    ".D.c.B.",
    "..C.C..",
    "......."
  ],
  雉: [
    ".......",
    "...A...",
    ".......",
    "...O...",
    "..A.A..",
    ".......",
    "......."
  ],
  師: [
    ".......",
    "..AAA..",
    ".A...A.",
    ".A.O.A.",
    ".A...A.",
    "..AAA..",
    "......."
  ],
  犀: [
    ".*...*.",
    "*.o.o.*",
    ".o...o.",
    "...O...",
    ".o...o.",
    "*.o.o.*",
    ".*...*."
  ],
  ぞ: [
    ".......",
    ".......",
    "..A.A..",
    "...O...",
    "..A.A..",
    ".......",
    "......."
  ],
  銀: [
    ".......",
    ".......",
    "..AAA..",
    "...O...",
    "..A.A..",
    ".......",
    "......."
  ],
  像: [
    ".......",
    ".A...A.",
    ".......",
    "...O...",
    ".......",
    ".A...A.",
    "......."
  ],
  相: [
    ".......",
    ".A...B.",
    "..a.b..",
    "...O...",
    "..d.c..",
    ".D...C.",
    "......."
  ],
  象: [
    ".E...F.",
    "L.e.f.G",
    ".l.a.g.",
    "..dOb..",
    ".k.c.h.",
    "K.j.i.H",
    ".J...I."
  ],
  麒: [
    ".......",
    "...A...",
    "..A.A..",
    ".A.O.A.",
    "..A.A..",
    "...A...",
    "......."
  ],
  鳳: [
    ".......",
    ".A...A.",
    "...A...",
    "..AOA..",
    "...A...",
    ".A...A.",
    "......."
  ],
  聖: [
    ".......",
    ".......",
    "..*.*..",
    "...O...",
    "..*.*..",
    ".......",
    "......."
  ],
  鷙: [
    ".......",
    ".......",
    "..*A*..",
    "...O...",
    "..*.*..",
    ".......",
    "......."
  ],
  麟: [
    ".A...A.",
    "A.....A",
    ".......",
    "...O...",
    ".......",
    "A.....A",
    ".A...A."
  ],
  瀧: [
    ".......",
    ".......",
    "..2.2..",
    "...O...",
    "..2.2..",
    ".......",
    "......."
  ],
  き: [
    ".......",
    ".......",
    "...A...",
    "..AOA..",
    "...A...",
    ".......",
    "......."
  ],
  香: [
    ".......",
    ".......",
    "...*...",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  車: [
    ".......",
    ".......",
    "...*...",
    "..*O*..",
    "...*...",
    ".......",
    "......."
  ],
  砲: [
    ".......",
    ".......",
    "...+...",
    "..+O+..",
    "...+...",
    "......",
    "......."
  ],
  弓: [
    ".......",
    ".......",
    "..+.+..",
    "...O...",
    "..+.+..",
    "......",
    "......."
  ],
  反: [
    ".......",
    ".......",
    "...*...",
    "...O...",
    "...*...",
    ".......",
    "......."
  ],
  風: [
    ".......",
    ".......",
    "...*...",
    "...O...",
    "...2...",
    ".......",
    "......."
  ],
  鶉: [
    ".......",
    ".......",
    "...*...",
    "...O...",
    "..A.*..",
    ".......",
    "......."
  ],
  享: [
    ".......",
    ".......",
    "...*...",
    "...O...",
    "..*.A..",
    ".......",
    "......."
  ],
  横: [
    ".......",
    ".......",
    "...A...",
    "..*O*..",
    "...A...",
    ".......",
    "......."
  ],
  竪: [
    ".......",
    ".......",
    "...*...",
    "..AOA..",
    "...*...",
    ".......",
    "......."
  ],
  延: [
    ".......",
    ".......",
    "..A*A..",
    "..AOA..",
    "...*...",
    ".......",
    "......."
  ],
  丑: [
    ".......",
    ".......",
    "...2...",
    "..2O2..",
    "...2...",
    ".......",
    "......."
  ],
  山: [
    ".......",
    "...A...",
    "...*...",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  兎: [
    ".......",
    ".......",
    "..A*A..",
    "...O...",
    "..AAA..",
    ".......",
    "......."
  ],
  鴻: [
    ".......",
    "..*.*..",
    ".*o.o*.",
    "...O...",
    ".*o.o*.",
    "..*.*..",
    "......."
  ],
  金: [
    ".......",
    ".......",
    "..AAA..",
    "..AOA..",
    "...A...",
    ".......",
    "......."
  ],
  銅: [
    ".......",
    ".......",
    "..AAA..",
    "...O...",
    "...A...",
    ".......",
    "......."
  ],
  馬: [
    ".......",
    ".......",
    "..*A*..",
    "..AOA..",
    "..*A*..",
    ".......",
    "......."
  ],
  竜: [
    ".......",
    ".......",
    "..A*A..",
    "..*O*..",
    "..A*A..",
    ".......",
    "......."
  ],
  醉: [
    ".......",
    ".......",
    "..AAA..",
    "..AOA..",
    "..A.A..",
    ".......",
    "......."
  ],
  后: [
    ".......",
    ".......",
    "..***..",
    "..*O*..",
    "..***..",
    ".......",
    "......."
  ],
  駆: [
    ".......",
    "..A.A..",
    ".A.*.A.",
    "..*O*..",
    ".A.*.A.",
    "..A.A..",
    "......."
  ],
  駮: [
    ".......",
    "..A.A..",
    ".A*.*A.",
    "...O...",
    ".A*.*A.",
    "..A.A..",
    "......."
  ],
  雕: [
    ".......",
    ".......",
    "..*A*..",
    "..AOA..",
    "..2*2..",
    ".......",
    "......."
  ],
  鶏: [
    ".......",
    ".......",
    "..A.A..",
    "..AOA..",
    ".......",
    ".......",
    "......."
  ],
  犬: [
    ".......",
    ".......",
    "..A.A..",
    "..AOA..",
    "...A...",
    ".......",
    "......."
  ],
  猛: [
    ".......",
    ".......",
    "..AAA..",
    "...O...",
    "..AAA..",
    ".......",
    "......."
  ],
  虎: [
    ".......",
    ".......",
    "..A.A..",
    "..AOA..",
    "..AAA..",
    ".......",
    "......."
  ],
  獅: [
    ".......",
    ".AAAAA.",
    ".AAAAA.",
    ".AAOAA.",
    ".AAAAA.",
    ".AAAAA.",
    "......."
  ],
  駒: [
    ".......",
    ".......",
    "..***..",
    "...O...",
    "...*...",
    ".......",
    "......."
  ],
  鯨: [
    ".......",
    ".......",
    "...*...",
    "...O...",
    "..***..",
    ".......",
    "......."
  ],
  鹿: [
    ".......",
    ".......",
    "..A*A..",
    "..AOA..",
    "..A*A..",
    ".......",
    "......."
  ],
  鷄: [
    ".......",
    ".......",
    "..***..",
    "..AOA..",
    "..***..",
    ".......",
    "......."
  ],
  猪: [
    ".......",
    ".......",
    "..*.*..",
    "..*O*..",
    "..*.*..",
    ".......",
    "......."
  ],
  牛: [
    ".......",
    ".......",
    "..***..",
    "...O...",
    "..***..",
    ".......",
    "......."
  ],
  鷂: [
    ".......",
    "...A...",
    "..*A*..",
    "..*O*..",
    "..***..",
    ".......",
    "......."
  ],
  鷲: [
    ".......",
    ".A...A.",
    "..A*A..",
    "..*O*..",
    "..***..",
    ".......",
    "......."
  ],
  狼: [
    ".......",
    ".......",
    "..AAA..",
    "..AOA..",
    ".......",
    ".......",
    "......."
  ],
  翅: [
    ".......",
    ".......",
    "..AAA..",
    "..AOA..",
    "..AA...",
    ".......",
    "......."
  ],
  斗: [
    ".......",
    ".......",
    "..AAA..",
    "..AOA..",
    "...AA..",
    ".......",
    "......."
  ],
  王: [
    ".......",
    ".......",
    "..AAA..",
    "..AOA..",
    "..AAA..",
    ".......",
    "......."
  ],
  狐: [
    ".......",
    ".A.A.A.",
    "..AAA..",
    "...O...",
    "..AAA..",
    ".A.A.A.",
    "......."
  ],
  雲: [
    ".......",
    ".......",
    "..3*3..",
    "..AOA..",
    "..A*A..",
    ".......",
    "......."
  ],
  城: [
    ".......",
    ".......",
    ".......",
    ".BbOaA.",
    ".......",
    ".......",
    "......."
  ],
  国: [
    ".......",
    ".......",
    ".......",
    "BbbOaaA",
    ".......",
    ".......",
    "......."
  ],
  塔: [
    ".......",
    ".......",
    ".......",
    "..|O|..",
    ".......",
    ".......",
    "......."
  ],
  呈: [
    ".......",
    ".A.A.A.",
    ".......",
    ".A.O.A.",
    ".......",
    ".A.A.A.",
    "......."
  ]
}, U = {
  女: 54,
  獅: 44,
  后: 36,
  駆: 36,
  奔: 36,
  駮: 34,
  鴻: 28,
  飛: 28,
  竜: 28,
  碼: 24,
  塔: 22,
  車: 22,
  雲: 22,
  俥: 20,
  船: 20,
  戦: 20,
  豕: 20,
  角: 20,
  跳: 20,
  砦: 20,
  狐: 20,
  犀: 20,
  醉: 18,
  鷹: 18,
  鷙: 18,
  翅: 16,
  斗: 16,
  返: 16,
  師: 16,
  麟: 16,
  鶉: 16,
  享: 16,
  兎: 16,
  聖: 14,
  騎: 14,
  瑪: 14,
  午: 14,
  金: 14,
  い: 14,
  横: 14,
  竪: 14,
  麒: 14,
  鳳: 14,
  鶴: 14,
  鰐: 14,
  使: 14,
  賢: 14,
  羽: 14,
  銀: 12,
  炮: 12,
  ね: 12,
  反: 12,
  虎: 12,
  瀧: 12,
  丑: 12,
  包: 10,
  像: 10,
  舟: 10,
  釡: 10,
  雉: 10,
  射: 10,
  狽: 10,
  風: 10,
  根: 9,
  狼: 9,
  艮: 9,
  麁: 9,
  桂: 8,
  京: 8,
  銅: 8,
  山: 8,
  馮: 8,
  馭: 8,
  馨: 8,
  猛: 8,
  犇: 8,
  犬: 8,
  香: 7,
  種: 7,
  き: 7,
  ぞ: 7,
  臣: 7,
  佯: 7,
  妾: 7,
  同: 7,
  猫: 7,
  嗔: 7,
  鳫: 7,
  猿: 7,
  鶏: 6,
  象: 5,
  士: 5,
  鴟: 5,
  烏: 5,
  仲: 4,
  相: 4,
  仕: 4,
  卆: 4,
  鉄: 4,
  歩: 3,
  兵: 3,
  浜: 3,
  ひ: 2,
  燕: 2,
  石: 3,
  雀: 3,
  丘: 2,
  梹: 2,
  鋲: 2,
  貝: 2,
  卒: 2,
  火: 2,
  天: 2,
  矢: 2,
  木: 2,
  本: 2,
  大: 2,
  央: 2,
  ラ: 0,
  鵬: -4,
  玉: -8,
  ら: -8,
  王: -12,
  国: -12,
  呈: -12,
  閏: -12,
  君: -16,
  主: -18,
  霍: -18,
  楚: -24,
  帥: -28
}, te = "./json/ShogiCross/";
function L(c) {
  const e = new XMLHttpRequest();
  return e.open("GET", `${te}${c}.json`, !1), e.send(), e.status === 200 ? JSON.parse(e.responseText) : {};
}
const se = {
  canvasFont: L("canvasFont"),
  gameSoft: L("gameSoft"),
  games: L("games"),
  boards: L("boards"),
  panels: L("panels"),
  pieces: L("pieces"),
  pieceRange: L("pieceRange"),
  pieceCost: L("pieceCost")
};
function ie(c) {
  Object.assign(O, c.canvasFont), Object.assign(ae, c.gameSoft), Object.assign(Y, c.games), Object.assign(J, c.boards), Object.assign(G, c.panels), Object.assign(H, c.pieces), Object.assign(Z, c.pieceRange), Object.assign(U, c.pieceCost);
}
ie(se);
function re(c) {
  return new Promise((e) => {
    const a = new Image();
    a.src = c, a.onload = () => e(a);
  });
}
const ne = [...new Set(
  Object.values(G).flatMap(({ imgSrc: c }) => c ?? []).concat(Object.values(H).flatMap(({ imgSrc: c }) => c != null ? Object.values(c) : []).flat())
)], I = {
  /** 読み込み済みであるか? */
  imported: !1,
  /** 読み込んだ画像データ
   * @type {Object<string, Image>}
   */
  images: {},
  /** 画像の読み込み
   * @returns {Promise<void>}
   */
  async importAsync() {
    if (!this.imported)
      return Promise.all(
        ne.map(async (c) => {
          this.images[c] = await re(c);
        })
      ).then((c) => this.imported = !0);
  }
}, oe = (c) => "image/" + c.replace("jpg", "jpeg");
async function le(c, e = "image", a = "png", t = "base64") {
  const s = oe(a), r = document.createElement("a");
  let i;
  t === "blob" ? i = URL.createObjectURL(
    await new Promise((n) => c.toBlob(n), s)
  ) : i = c.toDataURL(s), r.href = i, r.download = `${e}.${a}`, r.click(), t === "blob" && URL.revokeObjectURL(r.href);
}
class A {
  /** @typedef {Object} Piece */
  /** 描写サイズ
   * @type {number}
   */
  static size = 45;
  /** 格の違いによって駒の大きさを変更するか
   * @type {boolean}
   */
  static useRankSize = !0;
  /** 影の描写有無
   * @type {boolean}
   */
  static isDrawShadow = !0;
  /** テキスト出力時のプレイヤー表示
   * @type {Object<string, string>}
   */
  static degChars = {
    0: "▲",
    90: "≫",
    180: "▽",
    270: "＜"
  };
  /** プレイヤー表示から角度を取得
  * @type {Object<string, number>}
   */
  static charDegs = Object.fromEntries(
    Object.entries(A.degChars).map(([e, a]) => [a, e])
  );
  /** サイズ変更設定値
   * @type {Object<string, number>}
   */
  static rankRatio = {
    KR: 1,
    SR: 0.965,
    R: 0.935,
    UC: 0.9,
    C: 0.865
  };
  /** 駒の段階別価値を取得
   * @returns {string}
   */
  get rank() {
    return this.cost <= 0 ? "KR" : 20 <= this.cost ? "SR" : 10 <= this.cost ? "R" : 5 <= this.cost ? "UC" : "C";
  }
  /** 駒データを初期化
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Piece|PieceInitOption} option - 駒の初期化オプション
   * @retuens {Object<string, Piece>}
   */
  static getPieces(e, a = {}) {
    const t = new Map(Object.entries(JSON.parse(JSON.stringify(H))));
    for (const [r, i] of t)
      i.attr ??= [], i.unit && i.unit !== "成" && (i.base = i);
    for (const [r, i] of t) {
      if (!i.promo || typeof i.promo != "string")
        continue;
      const n = [...i.promo];
      i.promo = {};
      for (const l of n) {
        const S = t.get(l);
        S.attr.push("promoted"), S.unit = "成", i.promo[l] = S, t.set(l, { ...i, ...S });
      }
    }
    [...t].forEach(([r, i], n) => {
      i.id = n, i.char = r, t.set(r, new A(e, i, a));
    });
    const s = Object.fromEntries(t);
    for (const [r, i] of t)
      i.alias.forEach((n, l) => {
        if (s[n])
          return;
        const S = i.clone(), o = [...S.display];
        S.displayPtn = l + 1, S.display = o, s[n] = S;
      });
    return s;
  }
  /** 文字列から駒を取得
   * @param {Piece|PieceInitOption} piece - 駒
   * @param {string} text - 駒文字列
   * @returns {Piece}
   */
  static stringToPiece(e, a) {
    if (!a)
      return null;
    const [t, s] = [...a], r = A.charDegs[t];
    if (!r || !e[s])
      return null;
    const i = e[s].clone();
    return i.deg = r, i;
  }
  /** 駒の一覧をリストで取得
   * @returns {Piece[]}
   */
  static piecesToList(e) {
    return Object.entries(e).sort(([a, { id: t }], [s, { id: r }]) => Math.sign(t - r));
  }
  /** 駒の角度(deg/rad)
   * @param {number} value
   */
  set deg(e) {
    this.rad = e % 360 * Math.PI / 180;
  }
  get deg() {
    return this.rad % 360 / (Math.PI / 180);
  }
  /** 左側の座標 */
  get left() {
    return this.center - this.size * 0.8 / 2;
  }
  /** 上側の座標 */
  get top() {
    return this.middle - this.size / 2;
  }
  /** 右側の座標 */
  get right() {
    return this.center + this.size * 0.8 / 2;
  }
  /** 下側の座標 */
  get bottom() {
    return this.middle + this.size / 2;
  }
  /** 拡大率を取得
   * @returns {number}
   */
  get zoom() {
    let e = this.size / 100;
    return this.useRankSize && (e *= A.rankRatio[this.rank]), e;
  }
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Piece|PieceInitOption} piece - 駒
   * @param {Object} option - オプション
   * @param {number} option.displayPtn - 表示文字列を変更(1〜)
   * @param {number} option.deg - 駒の角度
   * @param {number} option.size - 駒の大きさ
   * @param {boolean} option.useRankSize - 駒の大きさを格の違いで変更するか
   * @param {boolean} option.isDrawShadow - 駒の影の描写有無
   * @param {boolean} option.isMoved - 初回移動済みか否か
   */
  constructor(e, a, t = {}) {
    const {
      displayPtn: s = 0,
      deg: r = 0,
      size: i = A.size,
      useRankSize: n = A.useRankSize,
      isDrawShadow: l = A.isDrawShadow,
      isMoved: S = !1
    } = t;
    Object.assign(this, a), this.ctx = e, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn ??= s, this.game = Y[this.gameName], this.cost = U[this.char] ?? U[this.base.char] ?? 1, this.center = 0, this.middle = 0, this.deg ||= r, this.size ??= i, this.useRankSize ??= n, this.isDrawShadow ??= l, this.isRotateImg ??= !0, this.isMoved = S, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([o, d]) => {
        Array.isArray(d) || (this.range[o] = Z[d].map((m) => [...m]));
      });
    } catch (o) {
      throw console.error(o), a;
    }
  }
  /** 駒をクローン
   * @returns {Piece}
   */
  clone() {
    const { displayPtn: e, deg: a, size: t, isMoved: s } = this;
    return new A(this.ctx, { ...this }, { displayPtn: e, deg: a, size: t, isMoved: s });
  }
  /** 駒を表返す */
  turnFront() {
    Object.assign(this, this.base);
  }
  /** プロモーション
   * @param {string} char - 成り先の文字
   */
  promotion(e) {
    const { promo: a } = this;
    if (!a)
      throw Error(`promo=${e}, Not plomote piece.`);
    if (!a[e])
      throw Error(`promo=${e}, Plomote key is missing.`);
    if (this.hasAttr("promoted"))
      throw Error(`promo=${e}, Promoted piece.`);
    Object.assign(this, a[e]), this.char = e;
  }
  /** 属性の存在を確認
   * @param {string} attrName - 属性名
   * @returns {boolean}
   */
  hasAttr(e) {
    return this.attr.includes(e);
  }
  /** 座標が駒に含まれるか判定
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @returns {boolean}
   */
  checkRangeMouse(e, a) {
    return this.left <= e && e < this.right && this.top <= a && a < this.bottom;
  }
  /** 移動範囲を回転して取得
   * @returns {string[][]}
   */
  getRange() {
    const e = 0 | this.deg, a = JSON.parse(JSON.stringify(this.range));
    return Object.keys(a).forEach((t) => {
      if (e !== 0) {
        if (![90, 180, 270].includes(e))
          throw Error(`deg=${e}, deg need multiple of 90.`);
        if ([90, 270].includes(e)) {
          const s = (r) => r[0].map((i, n) => r.map((l) => l[n]));
          a[t] = s(a[t]);
        }
        [180, 270].includes(e) && a[t].reverse(), a[t].forEach((s) => {
          [90, 180].includes(e) && s.reverse();
        });
      }
    }), a;
  }
  /** 駒/マスクを描写 */
  async draw() {
    const e = "#FF000055";
    this.imgSrc && I.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(e)) : (this.drawPiece(), this.isSelected && this.drawMask(e));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: e, size: a, deg: t } = this, s = this.imgSrc[t][this.displayPtn] ?? this.imgSrc[0][this.displayPtn], r = I.images[s];
    if (!r)
      return;
    e.save(), e.translate(this.center, this.middle), this.isRotateImg && e.rotate(this.rad);
    let i, n;
    r.width * 0.9 < r.height ? (i = r.width / r.height * a, n = a) : (i = a, n = r.height / r.width * a), e.drawImage(r, -i / 2, -n / 2, i, n), e.restore();
  }
  /** 駒画像にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMaskImage(e) {
    const { ctx: a, size: t } = this;
    a.fillStyle = e, a.save();
    const s = t * 0.9, r = t;
    a.translate(this.center, this.middle), a.fillRect(-s / 2, -r / 2, s, r), a.restore();
  }
  /** 将棋駒の外形パスを作成
   * @param {number} zoom - 駒の拡大率
   */
  makePath(e) {
    const { ctx: a } = this;
    a.translate(this.center, this.middle), a.rotate(this.rad), a.beginPath(), a.moveTo(-30 * e, -40 * e), a.lineTo(0 * e, -50 * e), a.lineTo(30 * e, -40 * e), a.lineTo(45 * e, 50 * e), a.lineTo(-45 * e, 50 * e), a.closePath();
  }
  /** 駒の影を描写
  * @param {number} zoom - 駒の拡大率
  */
  drawPieceShadow(e) {
    if (!this.isDrawShadow)
      return;
    const { ctx: a } = this;
    a.save(), a.translate(0, 10 * e), this.drawMask("#00000066"), a.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    const { ctx: e, game: a, zoom: t } = this;
    let s, r, i;
    this.hasAttr("promoted") ? (s = a.promoteFontColor ?? a.fontColor ?? "#000000", r = a.promoteBackgroundColor ?? a.backgroundColor ?? "#FFFFFF", i = a.promoteBorderColor ?? a.borderColor ?? "#FF3300") : (s = a.fontColor ?? "#000000", r = a.backgroundColor ?? "#FFFFFF", i = a.borderColor ?? "#777777"), e.strokeStyle = i, e.fillStyle = r, e.lineWidth = 8 * t, this.drawPieceShadow(t), e.save(), this.makePath(t), e.stroke(), e.fill(), e.fillStyle = s;
    const n = [..."" + this.display[this.displayPtn]], l = 40 * t;
    e.font = `${l}px ${O.names}`, e.textAlign = "center", n.forEach((S, o) => {
      const d = n.length === 1 ? l / 2 : o * l;
      e.fillText(S, 0, d);
    }), e.restore();
  }
  /** 駒にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(e) {
    const { ctx: a, zoom: t } = this;
    a.fillStyle = e, a.save(), this.makePath(t), a.fill(), a.restore();
  }
  /** 文字列形式で取得
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1) {
    const { displayPtn: a } = this, t = !e || a === 0 ? this.char : this.alias[a - 1];
    return A.degChars[this.deg] + t;
  }
}
class Se {
  #e;
  #a;
  #t;
  /** 駒オブジェクト
   * @returns {Piece}
   */
  get piece() {
    return this.#e;
  }
  set piece(e) {
    this.#e = e, e && (e.center = this.center, e.middle = this.middle);
  }
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {string} char - マス目を示す文字
   * @param {number} center - 描写するX座標(中心原点)
   * @param {number} middle - 描写するY座標(中心原点)
   * @param {number} width - マス目幅
   * @param {number} height - マス目高さ
   * @param {number} pX - ボード上のマス目の列
   * @param {number} pY - ボード上のマス目の行
   * @param {number} borderWidth - 枠線の太さ
   */
  constructor(e, a, t, s, r, i, n, l, S) {
    Object.assign(this, G[a]), this.ctx = e, this.center = t, this.middle = s, this.width = r, this.height = i, this.left = t - r / 2, this.top = s - i / 2, this.right = t + r / 2, this.bottom = s + i / 2, this.pX = n, this.pY = l, this.borderWidth = S, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.attr ??= [], this.piece = null, this.isSelected = !1, this.clearTarget();
  }
  /** マス目の選択状態
   * @param {boolean} value
   */
  set isSelected(e) {
    this.#a = this.hasAttr("keepOut") ? !1 : e;
  }
  get isSelected() {
    return this.#a;
  }
  /** マス目の移動可能判定
   * @param {boolean} value
   */
  get isTarget() {
    return 0 < this.#t.length;
  }
  /** マス目の移動先情報をクリア */
  clearTarget() {
    this.#t = [];
  }
  /** マス目の移動先情報を追加
   * @param {string} rangeName - 移動先情報
   */
  addTarget(e) {
    this.#t.push(e);
  }
  /** マス目が移動先情報を持っているか判定
   * @param {string} rangeName - 移動先情報
   * @returns {boolean}
   */
  hasTarget(e) {
    return this.#t.includes(e);
  }
  /** 属性の存在を確認
   * @param {string} attrName - 属性名
   * @returns {boolean}
   */
  hasAttr(e) {
    return this.attr.includes(e);
  }
  /** 座標がマス目に含まれるか判定
   * @param {number} x - X座標
   * @param {number} y - Y座標
   * @returns {boolean}
   */
  checkRangeMouse(e, a) {
    return this.left <= e && e < this.right && this.top <= a && a < this.bottom;
  }
  /** マス目/マスク/駒を描写 */
  draw() {
    const { selectColor: e, targetColor: a } = this;
    this.imgSrc && I.imported ? this.drawImage() : this.drawPanel(), this.isSelected && this.drawMask(e), this.isTarget && this.drawMask(a), this.piece?.draw();
  }
  /** マス目画像を描写 */
  drawImage() {
    const { ctx: e } = this, a = this.imgSrc, t = I.images[a];
    t && (e.save(), e.translate(this.left, this.top), e.drawImage(t, 0, 0, this.width, this.height), e.restore());
  }
  /** マス目を描写 */
  drawPanel() {
    const { ctx: e, left: a, top: t, center: s, middle: r, width: i, height: n, displayText: l, textRotate: S } = this;
    if (e.fillStyle = this.backgroundColor, e.strokeStyle = this.borderColor, e.lineWidth = this.borderWidth, e.save(), e.translate(a, t), e.fillRect(0, 0, i, n), this.intersect ? (e.lineWidth = this.borderWidth, e.beginPath(), e.moveTo(i / 2, 0), e.lineTo(i / 2, n), e.moveTo(0, n / 2), e.lineTo(i, n / 2), e.closePath(), e.stroke()) : e.strokeRect(0, 0, i, n), e.lineWidth = this.borderWidth / 2, e.beginPath(), this.borderSlashLeft && (e.moveTo(0, 0), e.lineTo(i, n)), this.borderSlashRight && (e.moveTo(i, 0), e.lineTo(0, n)), e.closePath(), e.stroke(), e.restore(), l) {
      e.save(), e.translate(s, r), e.fillStyle = this.borderColor;
      const o = S ? S * Math.PI / 180 : 0;
      e.rotate(o);
      const d = Math.min(this.width, this.height) * 0.6;
      e.font = `${d}px ${O.names}`;
      const m = e.measureText(l).width, u = d / 2 * 0.8;
      e.fillText(l, -m / 2, u), e.restore();
    }
  }
  /** マス目にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(e) {
    const { ctx: a } = this;
    a.fillStyle = e, a.fillRect(this.left, this.top, this.width, this.height);
  }
  /** マス目をテキスト形式で取得
   * @param {boolean} isCompact - コンパクト表示
   */
  toString(e = !1) {
    return e ? `｜${this.text.slice(-1).replace(/　/g, "・")}` : this.text;
  }
}
const de = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], ce = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], pe = [
  ["o"],
  ["A", { child: ["a"] }],
  ["B", { child: ["b"] }],
  ["C", { child: ["c"] }],
  ["D", { child: ["d"] }],
  ["E", { child: ["a", "e"] }],
  ["F", { child: ["a", "f"] }],
  ["G", { child: ["b", "g"] }],
  ["H", { child: ["b", "h"] }],
  ["I", { child: ["c", "i"] }],
  ["J", { child: ["c", "j"] }],
  ["K", { child: ["d", "k"] }],
  ["L", { child: ["d", "l"] }]
], Q = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let c = 1; c <= 9; c++)
  Q.push(["" + c, { moves: c }]);
function me(c) {
  const e = [];
  let a, t;
  for (let s = 0; s < c.length; s++)
    for (let r = 0; r < c[s].length; r++) {
      const i = c[s][r];
      for (let [n, { isOwn: l }] of ce)
        i === n && (e.push({ isOwn: l, oX: r, oY: s }), l && ([a, t] = [r, s]));
    }
  return e.map((s) => (s.offsetX = s.oX - a, s.offsetY = s.oY - t, s));
}
function ge(c, e, a, t) {
  const { field: s, yLen: r, enPassant: i } = c;
  function n(p, g) {
    return s[g] && s[g][p] && !s[g][p].hasAttr("keepOut");
  }
  function l(p) {
    return p.piece && e.hasAttr("po") && p.piece.hasAttr("po");
  }
  function S(p) {
    return p.piece && !e.isMoved && !p.piece.isMoved && e.hasAttr("pao") && e.cost < p.piece.cost;
  }
  function o(p, g, f, h = "", y = !0) {
    if (!s[f] || !s[f][g])
      return !1;
    const w = s[f][g];
    return !w || l(w) || S(w) || h === "enPassant" && !i.isTarget(w, e) || e.hasAttr("inPalace") && !w.hasAttr("palace") || h.indexOf("palace") === 0 && !(w.hasAttr(h) && s[t][a].hasAttr(h)) || e.hasAttr("unCrossRiver") && r - (0 | r / 2) <= c.getRow(g, f, e.deg) ? !1 : p ? s[f][g].piece ? y ? e.deg !== s[f][g].piece.deg : !0 : !1 : !s[f][g].piece;
  }
  function d(p, g, f, h, y) {
    for (const w of g)
      for (let k = 0; k < p.length; k++)
        for (let E = 0; E < p[k].length; E++) {
          const [x, b] = [E + a - h, k + t - y];
          if (!(!n(x, b) || o(f, 0 | x, 0 | b, "", !1) || p[k][E] !== w))
            return !0;
        }
    return !1;
  }
  function m(p, g, f) {
    const h = s[f][g];
    h.addTarget(p), i.setTarget(h, e);
  }
  function u(p, [g, { isAttack: f }], { oX: h, oY: y, isOwn: w }) {
    if (w)
      for (const [k, { child: E = [] } = {}] of pe)
        for (let x = 0; x < p.length; x++)
          for (let b = 0; b < p[x].length; b++) {
            const [v, j] = [b + a - h, x + t - y];
            !n(v, j) || !o(f, v, j, g) || p[x][b] !== k || d(p, E, !1, h, y) || m(g, v, j);
          }
  }
  function B(p, [g, { isAttack: f }], { oX: h, oY: y, isOwn: w, offsetX: k, offsetY: E }) {
    if (!(!w && !o(!1, a + k, t + E)))
      for (const [x, { jmps: b = 0, moves: v = 0 } = {}] of Q) {
        const j = !v || v === 0;
        for (let F = y - 1; F <= y + 1; F++)
          for (let R = h - 1; R <= h + 1; R++) {
            if (p[F][R] !== x || R === h && F === y)
              continue;
            let z = b || 0, M = v || 0;
            const [C, N] = [R - h, F - y];
            for (let X = a, $ = t; ; ) {
              X += C, $ += N;
              const P = X + k, D = $ + E;
              if (!n(P, D) || !j && M === 0)
                break;
              const T = z === 0;
              T && o(f, P, D, g, T) ? (M--, m(g, P, D)) : b < 1 && M--;
              const q = s[D][P];
              if (q.piece && (z--, T || l(q)))
                break;
            }
          }
      }
  }
  (function() {
    const p = e.getRange();
    p.attack ??= p.default;
    for (const g of de) {
      const f = g[0];
      if (e.isMoved && ["start", "castling"].includes(f))
        continue;
      const h = p[f];
      if (h)
        for (const y of me(h))
          u(h, g, y), B(h, g, y);
    }
  })();
}
function ue(c) {
  let e = !1, a = [], t = null, s = null;
  const { canvas: r } = c, i = (o, d, m = () => {
  }) => {
    const u = window.getComputedStyle(r), B = o.target.getBoundingClientRect();
    let p = r.width / parseFloat(u.width), g = r.height / parseFloat(u.height);
    if (o.clientX)
      p *= o.clientX - B.left, g *= o.clientY - B.top;
    else if (0 < o.touches.length) {
      if (1 < o.touches.length)
        return;
      p *= o.touches[0].clientX - B.left, g *= o.touches[0].clientY - B.top;
    } else
      o.preventDefault(), [p, g] = a;
    c.field.forEach((f, h) => f.forEach((y, w) => d(y, p, g, w, h))), m(p, g), c.draw(), a = [p, g];
  }, n = (o) => {
    e = !0, i(
      o,
      (d, m, u) => {
        const { piece: B, pX: p, pY: g } = d;
        B && d.checkRangeMouse(m, u) && (o.preventDefault(), B.isSelected = !0, t = d, ge(c, B, p, g));
      },
      (d, m) => {
        for (const [u, B] of c.stand.stocks)
          for (let p = B.length - 1; 0 <= p; p--)
            if (B[p].checkRangeMouse(d, m)) {
              o.preventDefault(), B[p].isSelected = !0, s = { deg: u, i: p };
              return;
            }
      }
    );
  }, l = (o) => {
    !e || !(t || s) || i(
      o,
      (d, m, u) => {
        d.isSelected = d.checkRangeMouse(m, u);
      }
    );
  }, S = (o) => {
    e = !1, i(
      o,
      (d, m, u) => {
        d.checkRangeMouse(m, u) && (t && c.movePiece(t, d), s && !d.piece && c.stand.releasePiece(d, s));
      }
    ), i(
      o,
      (d) => {
        d.piece && (d.piece.isSelected = !1), d.isSelected = !1, d.clearTarget();
      },
      () => {
        for (const [d, m] of c.stand.stocks)
          for (let u = m.length - 1; 0 <= u; u--)
            m[u].isSelected = !1;
        t = null, s = null;
      }
    );
  };
  return r.addEventListener("mousedown", n), r.addEventListener("mousemove", l), r.addEventListener("mouseup", S), r.addEventListener("touchstart", n), r.addEventListener("touchmove", l), r.addEventListener("touchend", S), {
    /** イベントリスナーを破棄 */
    removeEvent() {
      r.removeEventListener("mousedown", n), r.removeEventListener("mousemove", l), r.removeEventListener("mouseup", S), r.removeEventListener("touchstart", n), r.removeEventListener("touchmove", l), r.removeEventListener("touchend", S);
    }
  };
}
class K {
  /** 駒台への角度ごとの表示順
   * @type {number[]}
   */
  static #e = [180, 90, 270, 0];
  /**
   * @param {Board} ボード
   */
  constructor(e) {
    this.board = e;
    const { top: a, right: t, bottom: s, width: r, height: i, panelWidth: n, panelHeight: l, xLen: S, yLen: o } = e;
    this.clear(), this.left = t * 1.02, this.top = a, this.width = r / 2, this.height = i, this.right = this.left + this.width, this.bottom = s, this.pitchWidth = n / 2, this.pitchHeight = l, this.xLen = S, this.yLen = o;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = new Map(K.#e.map((e) => [e, []]));
  }
  /** 持ち駒からボード上に配置する
   * @param {Panal} toPanell - 配置先のパネル
   * @param {Object} option - オプション
   * @param {number} option.deg - 角度
   * @param {number} option.i - 配置する持ち駒のインデックス
   */
  releasePiece(e, a = {}) {
    const { board: t } = this;
    if (t.moveMode === "viewOnly" || e.hasAttr("keepOut"))
      return;
    const { deg: s, i: r } = a, i = this.stocks.get(s);
    e.piece = i[r], i[r].center = e.center, i[r].middle = e.middle, i.splice(r, 1), t.addRecord({ toPanel: e, end: "打" });
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(e) {
    const a = this.stocks.get(e.deg);
    e.turnFront(), a.push(e), a.sort((t, s) => Math.sign(t.id - s.id));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   * @param {boolean} forceCapture - 属性を無視して捕縛する
   * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
   */
  capturePiece(e, a, t = !1, s = !1) {
    s || !a || !(t || e.hasAttr("capture")) || a.hasAttr("king") || a.hasAttr("cantCapture") || (a.deg = e.deg, a.isMoved = !0, this.add(a));
  }
  /** 持ち駒の所有権を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  rotate(e) {
    [...this.stocks].forEach(([a, t]) => {
      const s = this.board.degNormal(a + e);
      t.forEach((r) => r.deg = s), this.stocks.set(s, t);
    });
  }
  /** 盤を描写 */
  draw() {
    const { board: e, left: a, top: t, width: s, height: r, pitchWidth: i, pitchHeight: n } = this, { ctx: l, xLen: S, yLen: o } = e;
    l.fillStyle = e.backgroundColor, l.strokeStyle = e.borderColor, l.lineWidth = e.borderWidth, l.save(), l.translate(a, t), l.fillRect(0, 0, s, r), l.strokeRect(0, 0, s, r), l.restore(), [...this.stocks.values()].forEach((d, m) => {
      let u = 0;
      d = d.slice(-o / 4 * S);
      for (let B = 0 | o / 4 * m; B < o / 4 * (m + 1); B++)
        for (let p = 0; p < S; p++) {
          const g = a + i * (p + 1), f = t + n * (B + 1), h = d[u++];
          if (h == null)
            break;
          h.center = g, h.middle = f, h.draw();
        }
    });
  }
  /** 駒台をテキスト形式で取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, a = !1) {
    const { xLen: t } = this.board, s = [...this.stocks.values()].flat().filter((n) => n);
    let r = 0 < s.length ? `
` + "―".repeat(t * 2) + `
` : "", i = s.map((n) => n.toString(a)).join("");
    if (!e) {
      r = "";
      for (const n of Object.values(A.degChars))
        i = i.replace(n, `
${n}持駒：${n}`);
    }
    return r + i;
  }
}
const he = Object.keys(A.degChars), V = () => ({
  panel: null,
  piece: null
});
class fe {
  constructor() {
    this.degs = {}, he.forEach((e) => this.degs[e] = V());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(e) {
    this.degs[e] = V();
  }
  /** アンパッサン対象と成りうるマス情報を記録
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   */
  setTarget(e, a) {
    e.hasTarget("start") && a.hasAttr("enPassant") && (this.degs[a.deg].panel = e);
  }
  /** アンパッサン対象と成りうる駒情報を記録
   * @param {Panel} toPanel - アンパッサン対象か確認するマス目
   */
  setMoved(e) {
    const { piece: a } = e, t = this.degs[a.deg];
    a && e === t.panel ? t.piece = a : this.clear(a.deg);
  }
  /** アンパッサン対象のマスか確認する
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   * @returns {boolean}
   */
  isTarget(e, a) {
    return !e || !e.piece ? !0 : e.piece.hasAttr("enPassant") ? e.piece === this.degs[e.piece.deg].piece : !1;
  }
}
class W {
  /** 角度から駒の文字表示
   * @type {Map<number, string>}
   */
  static #e = /* @__PURE__ */ new Map([
    [0, " "],
    [90, ">"],
    [180, "v"],
    [270, "<"]
  ]);
  /** 角度から駒の正規表現表示
   * @type {Map<number, string>}
   */
  static #a = new Map(
    [...W.#e].map(([e, a]) => [e, new RegExp(a, "g")])
  );
  /** 駒の文字から角度表示
   * @type {Map<string, number>}
   */
  static #t = new Map(
    [...W.#e].map(([e, a]) => [a, e])
  );
  /** 角度から持駒の表題表示
   * @type {Map<number, string>}
   */
  static #i = /* @__PURE__ */ new Map([
    [0, "先手の持駒"],
    [90, "次手の持駒"],
    [180, "後手の持駒"],
    [270, "四手の持駒"]
  ]);
  /** 持駒の表題から角度表示
   * @type {Map<string, number>}
   */
  static #r = new Map(
    [...W.#i].map(([e, a]) => [a, e])
  );
  static #s = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  static #o = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"];
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static #l(e, a = !0) {
    if (!a && e <= 1)
      return "";
    const t = e % 10, s = 0 | e / 10;
    return W.#o[s] + W.#s[t];
  }
  /** 行/持駒用の数字表示(漢数字)
   * @param {string} kan - 漢数字
   * @param {boolean} emptyOne - 空文字を1とする
   * @returns {string}
   */
  static #S(e, a = !0) {
    if (a && e === "")
      return 1;
    if (!isNaN(e))
      return 0 | e;
    let t = W.#o.findIndex(
      (r) => r !== "" && new RegExp("^" + r).test(e)
    );
    t < 0 && (t = 0);
    let s = W.#s.findIndex(
      (r) => r !== "" && new RegExp(r + "$").test(e)
    );
    return s < 0 && (s = 0), t * 10 + s;
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static #d(e) {
    if (10 <= e)
      return e;
    const a = "０１２３４５６７８９", t = e % 10;
    return a[t];
  }
  /** マス目の表示
   * @type {string}
   */
  static #c = " ・";
  /** 駒のBOD表記
   * @param {Piece} piece - 駒
   * @returns {string}
   */
  static #p(e) {
    return e ? W.#e.get(e.deg) + e.char : W.#c;
  }
  /** 駒台のBOD表記
   * @param {Stand} stand - 駒台
   * @param {number} deg - 角度
   * @returns {string}
   */
  static #n(e, a = 0) {
    const t = /* @__PURE__ */ new Map();
    return e.stocks.get(a).forEach(({ char: s }) => {
      t.has(s) || t.set(s, 0), t.set(s, t.get(s) + 1);
    }), W.#i.get(a) + "：" + [...t].map(
      ([s, r]) => s + W.#l(r, !1)
    ).join(" ");
  }
  /** BOD形式のテキストをボードで扱えるよう変換
   * @param {string} text - BOD形式のテキスト
   * @returns {string}
   */
  static convTextPieces(e) {
    const a = [], t = [];
    e.split(/\r|\n|\r\n/).forEach((i) => {
      [...W.#r.keys()].some((n) => new RegExp(`^${n}`).test(i)) ? t.push(i) : a.push(i.slice(1));
    });
    let s = a.slice(2, -1).join(`
`);
    W.#a.forEach((i, n) => {
      s = s.replace(i, A.degChars[n]);
    });
    const r = t.flatMap((i) => {
      const [n, l] = i.split(/：/);
      if (l === "")
        return "";
      const S = W.#r.get(n), o = A.degChars[S];
      return l.split(/\s/).map((m) => {
        const u = m[0], B = m.slice(1);
        return (o + u).repeat(W.#S(B));
      });
    }).join("");
    return `${s}
${r}`;
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  static getTextPieces(e) {
    const { field: a, xLen: t, players: s, stand: r } = e;
    let i = ` ${[...Array(t).keys()].map((u) => ` ${W.#d(t - u)}`).join("")}
+${Array(t).fill("---").join("")}+
`, n = `
+${Array(t).fill("---").join("")}+`, l = "|", S = "", o = `
`, d = `${W.#n(r, 180)}
`, m = `${W.#n(r, 0)}`;
    return s !== 2 && (d = `${W.#n(r, 270)}
` + d, m = `${W.#n(r, 90)}
` + m), d + i + a.map(
      (u, B) => l + u.map(
        (p) => W.#p(p.piece)
      ).join(S) + l + W.#l(B + 1)
    ).join(o) + n + `
` + m;
  }
}
class _ {
  /** @typedef {Object} Board */
  #e;
  #a;
  /**
   * @typedef {Object} Record - 局面の記録
   * @prop {Object} from
   * @prop {number} from.pX - 移動元の列
   * @prop {number} from.pY - 移動元の行
   * @prop {Object} to
   * @prop {number} to.pX - 移動先の列
   * @prop {number} to.pY - 移動先の行
   * @prop {number} deg - 駒の角度
   * @prop {string} pieceChar - 駒の一文字表記
   * @prop {string} end - 棋譜表示の末尾に記載する文字
   * @prop {string} fieldText - 駒配置のテキスト
   * @prop {number[][]} fieldMoved - 駒の移動済み判定
   * @prop {string|null} comment - 棋譜コメント
   */
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   * @returns {Board}
   */
  static run(e, a) {
    return new _(e, a);
  }
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   */
  constructor(e, a) {
    const {
      name: t,
      variant: s,
      url: r,
      desc: i,
      playBoard: n,
      playPieces: l = [],
      players: S = l.some(({ gameName: N }, X) => 1 < X && N) ? 4 : 2,
      useStand: o = !1,
      canvasWidth: d = void 0,
      canvasHeight: m = void 0,
      canvasFit: u = "overflow",
      boardLeft: B = 5,
      boardTop: p = 5,
      panelWidth: g = 50,
      panelHeight: f = 0 | g * 1.1,
      pieceSize: h = 0 | g * 0.9,
      useRankSize: y = !0,
      isDrawShadow: w = !0,
      borderWidth: k = Math.min(g, f) / 30,
      backgroundColor: E = "#00000000",
      autoDrawing: x = !0,
      moveMode: b = "normal",
      usePlayerControl: v = !0,
      onDrawed: j,
      onGameOver: F = (N, X) => alert(`プレイヤー${X + 1}の敗北です。`)
    } = a;
    this.name = t, this.variant = s, this.url = r, this.desc = i;
    const R = O.importAsync(), z = I.importAsync();
    this.canvas = e;
    const M = e.getContext("2d");
    if (M.clearRect(0, 0, e.width, e.height), this.ctx = M, this.pieces = A.getPieces(M, {
      size: h,
      useRankSize: y,
      isDrawShadow: w
    }), !J[n])
      throw Error(`playBoard=${n}, Unknown board name.`);
    if (Object.assign(this, J[n]), ![2, 4].includes(S))
      throw Error(`players=${S}, players need 2 or 4.`);
    this.players = S, this.left = B, this.top = p, this.panelWidth = g, this.panelHeight = f, this.borderWidth = k, this.pieceSize = h, this.canvasBackgroundColor = E, this.field = this.field.map(
      (N, X) => [...N].map(($, P) => {
        const D = B + g * (P + 1), T = p + f * (X + 1);
        return new Se(M, $, D, T, g, f, P, X, k);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, l.forEach(({ gameName: N, pieceSet: X }, $) => {
      if (N)
        try {
          this.putStartPieces($, N, X);
        } catch (P) {
          console.error(P);
        }
    }), this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = B + this.width, this.bottom = p + this.height, this.stand = new K(this), e.width = d ?? (o ? this.stand.right : this.right) + 5, e.height = m ?? this.bottom + 5;
    const { style: C } = e;
    u === "overflow" ? (C.maxWidth === "" && (C.maxWidth = "97vw"), C.maxHeight === "" && (C.maxHeight = "92vh")) : u === "horizontal" ? C.width === "" && (C.width = "97vw") : u === "vertical" ? C.height === "" && (C.height = "92vh") : u === "parentOverflow" ? (C.maxWidth === "" && (C.maxWidth = "100%"), C.maxHeight === "" && (C.maxHeight = "100%")) : u === "parentHorizontal" ? C.width === "" && (C.width = "100%") : u === "parentVertical" && C.height === "" && (C.height = "100%"), this.autoDrawing = x, x && (R.then(() => this.draw()), z.then(() => this.draw()), this.draw()), this.onDrawed = j, this.onGameOver = F, this.gameAlives = new Map(
      [...Array(this.players).keys()].map((N) => [this.degNormal(N), !0])
    ), this.moveMode = b, this.record = [], this.turn = 0, this.#e = ue(this), v && (this.#a = this.makePlayerControl(), this.#a.add()), this.enPassant = new fe();
  }
  /** 操作パネルを構築
   * @param {string[]} compList - 表示するコントロールの一覧
   * @returns {PlayerControl}
   */
  makePlayerControl(e) {
    return this.#a = new ee(this, e), this.#a;
  }
  /** ボードを閉じる */
  close() {
    this.#e?.removeEvent(), this.#a?.remove();
  }
  /** 角度を正規化
   * @param {number} playeaIdOrDeg - プレイヤー番号または角度
   * @returns {number}
   */
  degNormal(e) {
    let a = e;
    0 < a && a < 4 && (a = 0 | a * 360 / this.players);
    do
      a = (a + 360) % 360;
    while (a < 0);
    return a;
  }
  /** 盤面を回転
   * @param {boolean} isRight - 回転方向
   */
  rotate(e = !0) {
    let a = this.degNormal(1);
    e || (a = -a), this.#t(a), this.stand.rotate(a), this.autoDrawing && this.draw();
  }
  /** 駒配置を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  #t(e) {
    const { field: a, xLen: t, yLen: s } = this;
    if (e = this.degNormal(e), e === 0)
      return;
    if (![90, 180, 270].includes(e))
      throw Error(`deg=${e}, deg need multiple of 90.`);
    let r = a.map((i) => i.map(({ piece: n }) => n));
    if ([90, 270].includes(e)) {
      const i = (n) => n[0].map((l, S) => n.map((o) => o[S]));
      if (t !== s)
        throw Error(`cols=${t} != rows=${s}, Not rows = cols.`);
      r = i(r);
    }
    [180, 270].includes(e) && r.reverse(), r.forEach((i) => {
      i.forEach((n) => {
        n && (n.deg += e);
      }), [90, 180].includes(e) && i.reverse();
    }), a.forEach(
      (i, n) => i.forEach(
        (l, S) => l.piece = r[n][S]
      )
    );
  }
  /** 駒の初期配置
   * @param {number} playerId - プレイヤー番号
   * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} pieceSet - 駒の配置パターン
   */
  putStartPieces(e, a, t = "default") {
    const { pieces: s } = this, r = this.degNormal(e);
    this.#t(r);
    const i = Y[a].position[this.xLen][t];
    if (!i)
      throw Error(`games["${a}"].position["${this.xLen}"]["${t}"]is null.`);
    i.forEach((n, l) => {
      if (n.length < this.xLen)
        throw Error(n.join(""));
      const S = l + this.yLen - i.length;
      [...n].forEach((o, d) => {
        s[o] && (this.field[S][d].piece = s[o].clone());
      });
    }), this.#t(-r), this.autoDrawing && this.draw();
  }
  /** 駒の配置
   * @param {string} piece - 駒の表現文字
   * @param {number} pX - X方向配置位置(マス目基準)
   * @param {number} pY - Y方向配置位置(マス目基準)
   * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
   * @param {Object} option - オプション
   * @param {number} option.displayPtn - 表示文字列を変更(1〜)
   * @param {boolean} option.isMoved - 初回移動済みか否か
   */
  putNewPiece(e, a, t, s, r = {}) {
    const { displayPtn: i = 0, isMoved: n = !1 } = r, { pieces: l } = this, S = this.degNormal(s);
    typeof e == "string" && (e = new A(this.ctx, l[e], { displayPtn: i, deg: S, isMoved: n })), this.field[t][a].piece = e, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  setTextPieces(e) {
    const { field: a, pieces: t, xLen: s, yLen: r } = this, i = "持駒：";
    0 < e.indexOf(i) && (e = W.convTextPieces(e));
    const l = [e].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(A.degChars).map((o) => `
` + o + i)
    ).reduce(
      (o, d) => o.replace(new RegExp(d, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (o) => o.match(/.{2}/g)
    );
    for (let o = 0; o < r; o++)
      for (let d = 0; d < s; d++)
        try {
          const m = l[o][d];
          a[o][d].piece = A.stringToPiece(t, m);
        } catch {
          a[o][d].piece = null;
        }
    this.stand.clear();
    const S = l[r];
    S && S.forEach((o) => {
      const d = A.stringToPiece(t, o);
      d && this.stand.add(d);
    }), this.autoDrawing && this.draw();
  }
  /** 角度基準のマス目の行を取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getRow(e, a, t, s = 0) {
    const { xLen: r, yLen: i } = this;
    return t = this.degNormal(t + s), t === 0 ? i - 1 - a : t === 90 ? e : t === 180 ? a : t === 270 ? r - 1 - e : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(e, a, t, s = 0) {
    const { xLen: r, yLen: i } = this;
    return t = this.degNormal(t + s), t === 0 ? e : t === 90 ? i - 1 - a : t === 180 ? r - 1 - e : t === 270 ? a : -1;
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   * @returns {{
   * 		canPromo: boolean,
   * 		forcePromo: boolean
   * }}
   */
  checkCanPromo(e) {
    const { yLen: a } = this, { piece: t, pX: s, pY: r } = e, { deg: i } = t, [n, l] = [
      t.game.promoLine,
      t.forcePromoLine
    ].map((o) => a - o - (0 | this.promoLineOffset));
    let S;
    return this.sidePromo ? S = Math.max(
      ...Object.keys(A.degChars).map((o) => 0 | o).filter((o) => o !== i).map(
        (o) => this.getRow(s, r, o, 180)
      )
    ) : S = this.getRow(s, r, i), {
      canPromo: n <= S,
      forcePromo: l <= S
    };
  }
  /** 敗北したプレイヤーが存在するか確認し、イベントを発生させる */
  #i() {
    [...this.gameAlives].forEach(([e, a], t) => {
      a && (this.field.some(
        (s) => s.some(
          ({ piece: r }) => r && r.deg === e && r.hasAttr("king")
        )
      ) || (this.gameAlives.set(e, !1), this.onGameOver && this.onGameOver(this, t)));
    });
  }
  /** プロモーション処理
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   */
  #r(e, a, t, s) {
    const { moveMode: r } = this, { piece: i } = a;
    if (!i.promo || i.hasAttr("promoted") || i.hasAttr("cantPromotion") || !t) {
      this.addRecord({ fromPanel: e, toPanel: a });
      return;
    }
    do
      for (const [n, { name: l }] of Object.entries(i.promo))
        if (confirm(`成りますか?
${i.char}:${i.name}
　↓
${n}:${l}`)) {
          i.promotion(n), this.addRecord({ fromPanel: e, toPanel: a, end: "成" });
          return;
        }
    while (r !== "free" && s);
    this.addRecord({ fromPanel: e, toPanel: a, end: "不成" });
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   */
  movePiece(e, a) {
    const { stand: t, moveMode: s, enPassant: r } = this;
    if (!e || s === "viewOnly" || a.hasAttr("keepOut") || a.piece === e.piece || a.piece?.deg === e.piece.deg || s !== "free" && !a.isTarget)
      return;
    let { canPromo: i, forcePromo: n } = this.checkCanPromo(e);
    t.capturePiece(
      e.piece,
      a.piece,
      a.hasAttr("capture"),
      a.hasAttr("cantCapture")
    ), a.piece = e.piece, a.piece.isMoved = !0, e.piece = null;
    const l = this.checkCanPromo(a);
    i ||= l.canPromo, n ||= l.forcePromo, r.setMoved(a), this.#r(e, a, i, n), this.#i();
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のマス目
   * @param {Object} option - オプション
   * @param {Panel} option.fromPanel - 移動元のマス目
   * @param {string} option.end - オプション=成|不成|打
   */
  addRecord(e = {}) {
    const { record: a } = this, { fromPanel: t = {}, toPanel: s = {}, end: r = "", inc: i = 1 } = e, { piece: n = {} } = s;
    this.turn += i, a[this.turn] = {
      from: {
        pX: t.pX,
        pY: t.pY
      },
      to: {
        pX: s.pX,
        pY: s.pY
      },
      deg: n.deg,
      pieceChar: n.char,
      end: r,
      fieldText: this.getTextPieces("compact", !0),
      fieldMoved: this.field.map(
        (l) => l.map(
          ({ piece: S }) => S?.isMoved ? 1 : 0
        )
      )
    }, 0 < i && a.splice(this.turn + 1);
  }
  /** 棋譜コメントを追記
   * @param {string} comment - 棋譜コメント
   * @param {number} shiftTurn - ずらす手数
   */
  addRecordComment(e, a = 0) {
    this.record[this.turn + a].comment = e;
  }
  /** 記録の参照手数を切り替える
   * @param {number} inc - 切り替えたい手数の差分
   */
  #s(e) {
    const { record: a } = this;
    if (!a[this.turn + e])
      return;
    this.turn += e;
    const { fieldText: t, fieldMoved: s } = a[this.turn];
    this.setTextPieces(t), this.field.forEach(
      (r, i) => r.forEach(({ piece: n }, l) => {
        n && (n.isMoved = !!s[i][l]);
      })
    );
  }
  /** 記録の手を戻す */
  undoRecord() {
    this.#s(-1);
  }
  /** 記録の手を進める */
  redoRecord() {
    this.#s(1);
  }
  /** 記録の手を移動
   * @param {number} turn - 手数
   */
  moveRecord(e) {
    this.turn = e, this.#s(0);
  }
  /** 局面の記録を文字列に変換
   * @param {Record} record - 局面の記録
   * @param {number} turn - 手数
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  record2String(e, a, t = !1) {
    const { to: s, from: r, deg: i, pieceChar: n, end: l } = e;
    if (a === 0)
      return "0: 開始局面";
    const S = ({ pX: m }) => (this.xLen - m).toString(t ? 10 : 36), o = ({ pY: m }) => (m + 1).toString(t ? 10 : 36), d = t ? "," : "";
    return `${a}: ${A.degChars[i]}${S(s)}${d}${o(s)}${n}${l}${r.pX === void 0 ? "" : ` (${S(r)}${d}${o(r)})`}`;
  }
  /** 表示用の棋譜を取得
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  getTextRecord(e = !1) {
    return this.record.slice(0, this.turn + 1).map(
      (a, t) => this.record2String(a, t, e)
    ).join(`
`);
  }
  /** 棋譜データを取得
   * @param {boolean} isEncode - エンコード有無
   * @returns {string}
   */
  getJsonRecord(e = !0) {
    const a = JSON.stringify(this.record, null, "");
    return e ? encodeURI(a) : a;
  }
  /** 棋譜データを入力
   * @param {string} record - 棋譜データ
   * @param {number} turn - 手数
   */
  setJsonRecord(e, a) {
    this.record = JSON.parse(decodeURI(e)), this.moveRecord(a ?? this.record.length - 1);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: e, canvas: a, left: t, top: s, width: r, height: i, panelWidth: n, panelHeight: l } = this;
    this.turn === 0 && this.addRecord({ inc: 0 }), e.restore(), e.save(), e.clearRect(0, 0, a.width, a.height), e.fillStyle = this.canvasBackgroundColor, e.fillRect(0, 0, a.width, a.height), e.fillStyle = this.backgroundColor, e.lineWidth = this.borderWidth, e.strokeStyle = this.borderColor, e.save(), e.translate(t, s), e.fillRect(0, 0, r, i), e.strokeRect(0, 0, r, i), e.translate(n / 2, l / 2), e.strokeRect(0, 0, r - n, i - l), e.restore(), this.stand.draw(), this.field.forEach((S) => {
      S.forEach((o) => {
        o.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** 駒配置をテキストで取得
   * @param {"default"|"compact"|"bod"} mode - テキスト形式
   * @param {boolean} isAlias - エイリアス表示
   * @returns {string}
   */
  getTextPieces(e = "default", a = !1) {
    return e === "bod" ? W.getTextPieces(this) : this.toString(e === "compact", a);
  }
  /** 棋譜コメントを取得
   * @param {number} shiftTurn - ずらす手数
   * @returns {string}
   */
  getRecordComment(e = 0) {
    return this.record[this.turn + e] ?? "";
  }
  /** 駒配置をテキストで取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, a = !1) {
    const { xLen: t } = this;
    let s = "", r = "", i = "", n = "", l = `
`;
    return e || (s = `┏${Array(t).fill("━━").join("┯")}┓
`, r = `
┗${Array(t).fill("━━").join("┷")}┛`, i = "┃", n = "│", l = `
┠${Array(t).fill("──").join("┼")}┨
`), s + this.field.map(
      (S) => i + S.map(
        (o) => o.piece?.toString(a) ?? o.toString(e)
      ).join(n) + i
    ).join(l) + r + this.stand.toString(e);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(e, a, t) {
    await le(this.canvas, e ?? this.name ?? "shogicross", a, t);
  }
}
class ee {
  /** @typedef {Object} PlayerControl */
  static buttonTexts = "<>🔄🔁📷";
  /** 要素のサイズをCanvasに合わせて変更 */
  #e() {
    const { canvas: e } = this.board, a = window.getComputedStyle(e);
    this.component.style.maxWidth = parseFloat(a.width) + "px";
  }
  /**
   * @param {Board} board ボード
   * @param {string[]} compList 表示するコントロールの一覧
   */
  constructor(e, a) {
    this.board = e;
    const t = /* @__PURE__ */ new Map([
      ["undoRecord", { title: "一手戻る", text: "&lt;&lt;", onclick: () => e.undoRecord() }],
      ["redoRecord", { title: "一手進む", text: "&gt;&gt;", onclick: () => e.redoRecord() }],
      ["rotateLeft", { title: "盤面を左回転", text: "🔄", onclick: () => e.rotate(!1) }],
      ["rotateRight", { title: "盤面を右回転", text: "🔁", onclick: () => e.rotate() }],
      ["downloadImage", { title: "画像を保存", text: "📷", onclick: () => e.downloadImage() }]
    ]);
    a ??= [...t.keys(), "textRecord"];
    const s = Date.now().toString();
    this.component = document.createElement("div"), this.component.id = s, this.component.style.display = "flex", this.#e(), window.addEventListener("resize", () => this.#e()), this.component.innerHTML = `${[...t].filter(([i]) => a.includes(i)).map(
      ([i, { title: n, text: l }]) => `<button id="${i}${s}" title="${n}" style="font-family:${O.names};">${l}</button>`
    ).join("")}${a.includes("textRecord") ? `<select id="textRecord${s}" style="flex-grow:1; font-family:${O.names};"><option></option></select>` : ""}`;
    for (const [i, { onclick: n }] of t)
      a.includes(i) && (this.component.querySelector(`#${i}${s}`).onclick = n);
    if (!a.includes("textRecord"))
      return;
    const r = e.onDrawed ?? (() => {
    });
    e.onDrawed = async (i) => {
      setTimeout(() => {
        const n = this.component.querySelector(`#textRecord${s}`), l = n.querySelector("option"), S = n.cloneNode(!1);
        i.record.forEach((o, d) => {
          const m = l.cloneNode(!1);
          m.textContent = e.record2String(o, d), d === i.turn && (m.selected = !0), S.appendChild(m);
        }), S.onchange = (o) => e.moveRecord(o.target.selectedIndex), n.replaceWith(S);
      }), r(i);
    };
  }
  /** 操作パネルを追加 */
  add() {
    const { canvas: e } = this.board;
    e.after(this.component);
  }
  /** 操作パネルを破棄 */
  remove() {
    this.component.remove(), window.removeEventListener("resize", () => this.#e);
  }
}
const Be = () => [
  .../* @__PURE__ */ new Set([
    ...ee.buttonTexts + Object.values(G).map(({ displayText: c }) => c).join("") + Object.values(H).map(({ display: c }) => c ? c.join("") : "").join("")
  ])
].sort().join("");
Object.assign(O, {
  /** 読み込み済みであるか? */
  imported: !1,
  /** 読み込むフォントの一覧(","区切り)
   * @type {string}
   */
  names: "",
  /** フォントの読み込み
   * @returns {Promise<void>}
   */
  async importAsync() {
    if (this.imported)
      return;
    const c = "https://fonts.googleapis.com/css2?family=", e = Be(), a = Date.now().toString();
    return this.names = O.fonts.map((t) => `"${t[0]}${a}"`).join(",") + ",serif", Promise.all(
      O.fonts.map(async ([t, s]) => {
        const r = t.replace(/ /g, "+"), i = `${c}${r}:wght@${s}&text=${e}`, n = await fetch(i);
        if (!n.ok)
          return;
        const S = (await n.text()).match(/url\(.+?\)/g);
        if (!S)
          throw new Error("Not found font.");
        for (const o of S) {
          const d = new FontFace(`${t}${a}`, o);
          document.fonts.add(d), await d.load().catch(() => {
          });
        }
      })
    ).then((t) => this.imported = !0);
  }
});
export {
  _ as Board,
  A as Piece,
  J as boards,
  O as canvasFont,
  I as canvasImage,
  ie as extendData,
  ae as gameSoft,
  Y as games,
  G as panels,
  U as pieceCost,
  Z as pieceRange,
  H as pieces
};
//# sourceMappingURL=ShogiCross.js.map
