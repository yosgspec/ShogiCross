const P = {
  fonts: [
    ["Noto Serif JP", 900],
    ["Noto Emoji", 400],
    ["Noto Sans Symbols 2", 400],
    ["Noto Sans Symbols", 400],
    ["Noto Serif", 900],
    ["Noto Serif TC", 900]
  ]
}, oe = {
  shogi: {
    name: "将棋",
    variant: "将棋",
    url: "https://ja.wikipedia.org/wiki/%E5%B0%86%E6%A3%8B",
    desc: "一般的な将棋。本将棋とも呼ばれる。",
    playBoard: "将棋",
    useStand: !0,
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
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
    playerOptions: [
      { gameName: "チャトランガ", pieceSet: "p4" },
      { gameName: "チャトランガ", pieceSet: "p4" },
      { gameName: "チャトランガ", pieceSet: "p4" },
      { gameName: "チャトランガ", pieceSet: "p4" }
    ]
  }
}, _ = {
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
}, V = {
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
}, J = {
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
}, K = {
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
}, ae = {
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
}, Z = {
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
}, le = "./json/ShogiCross/";
function L(p) {
  const e = new XMLHttpRequest();
  return e.open("GET", `${le}${p}.json`, !1), e.send(), e.status === 200 ? JSON.parse(e.responseText) : {};
}
const de = {
  canvasFont: L("canvasFont"),
  gameSoft: L("gameSoft"),
  games: L("games"),
  boards: L("boards"),
  panels: L("panels"),
  pieces: L("pieces"),
  pieceRange: L("pieceRange"),
  pieceCost: L("pieceCost")
};
function ce(p) {
  return new Promise((e) => {
    const t = new Image();
    t.src = p, t.onload = () => e(t);
  });
}
function pe() {
  return [...new Set(
    Object.values(J).flatMap(({ imgSrc: p }) => p ?? []).concat(Object.values(K).flatMap(({ imgSrc: p }) => p != null ? Object.values(p) : []).flat())
  )];
}
const H = {
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
        pe().map(async (p) => {
          this.images[p] = await ce(p);
        })
      ).then((p) => this.imported = !0);
  }
}, Se = (p) => "image/" + p.replace("jpg", "jpeg");
async function me(p, e = "image", t = "png", a = "base64") {
  const i = Se(t), s = document.createElement("a");
  let n;
  a === "blob" ? n = URL.createObjectURL(
    await new Promise((r) => p.toBlob(r), i)
  ) : n = p.toDataURL(i), s.href = n, s.download = `${e}.${t}`, s.click(), a === "blob" && URL.revokeObjectURL(s.href);
}
const ue = {
  dialog: {
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    padding: "20px",
    width: "300px",
    display: "none"
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "15px"
  },
  title: {
    display: "none"
  },
  message: {
    textAlign: "center"
  },
  button: {
    padding: "5px 12px",
    borderRadius: "6px",
    border: "1px solid #aaa",
    background: "#f5f5f5",
    cursor: "pointer"
  },
  btnHover: {
    background: "#ddd"
  }
};
class he {
  #t;
  #e;
  #a;
  #s;
  constructor(e = {}) {
    this.#s = { ...ue, ...e }, this.dialog = document.createElement("dialog"), document.body.appendChild(this.dialog), Object.assign(this.dialog.style, this.#s.dialog), this.#t = document.createElement("h3"), this.dialog.appendChild(this.#t), Object.assign(this.#t.style, this.#s.title), this.#e = document.createElement("p"), this.dialog.appendChild(this.#e), Object.assign(this.#e.style, this.#s.message), this.#a = document.createElement("div"), this.dialog.appendChild(this.#a), Object.assign(this.#a.style, this.#s.buttonContainer), this.isModal = !1;
  }
  #i(e) {
    return this.dialog.close(), this.dialog.style.display = "none", e.value;
  }
  async show(e, t, a) {
    return this.#t.textContent = e, this.#e.innerHTML = t.replace(/\r|\n|\r\n/g, "<br>"), this.#a.innerHTML = "", new Promise((i) => {
      for (const s of a) {
        const n = document.createElement("button");
        this.#a.appendChild(n), Object.assign(n.style, this.#s.button), n.textContent = s.label, n.addEventListener("mouseover", () => Object.assign(n.style, this.#s.btnHover)), n.addEventListener("mouseout", () => Object.assign(n.style, this.#s.button)), n.addEventListener("click", () => i(this.#i(s)));
      }
      this.dialog.style.display = "block", this.dialog.showModal();
    });
  }
  /**
   * ダイアログのフォントを設定します。
   * @param {string} fontFamily - 設定するフォントファミリー名
   */
  setFontFamily(e) {
    this.dialog && (this.dialog.style.fontFamily = e, this.#s.button.fontFamily = e);
  }
}
class C {
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
    Object.entries(C.degChars).map(([e, t]) => [t, e])
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
  static getPieces(e, t = {}) {
    const a = new Map(Object.entries(JSON.parse(JSON.stringify(K))));
    for (const [s, n] of a)
      n.attr ??= [], n.unit && n.unit !== "成" && (n.base = n);
    for (const [s, n] of a) {
      if (!n.promo || typeof n.promo != "string") continue;
      const r = [...n.promo];
      n.promo = {};
      for (const o of r) {
        const l = a.get(o);
        l.attr.push("promoted"), l.unit = "成", n.promo[o] = l, a.set(o, { ...n, ...l });
      }
    }
    [...a].forEach(([s, n], r) => {
      n.id = r, n.char = s, a.set(s, new C(e, n, t));
    });
    const i = Object.fromEntries(a);
    for (const [s, n] of a)
      n.alias.forEach((r, o) => {
        if (i[r]) return;
        const l = n.clone(), c = [...l.display];
        l.displayPtn = o + 1, l.display = c, i[r] = l;
      });
    return i;
  }
  /** 文字列から駒を取得
   * @param {Piece|PieceInitOption} piece - 駒
   * @param {string} text - 駒文字列
   * @returns {Piece}
   */
  static stringToPiece(e, t) {
    if (!t) return null;
    const [a, i] = [...t], s = C.charDegs[a];
    if (!s || !e[i]) return null;
    const n = e[i].clone();
    return n.deg = s, n;
  }
  /** 駒の一覧をリストで取得
   * @returns {Piece[]}
   */
  static piecesToList(e) {
    return Object.entries(e).sort(([t, { id: a }], [i, { id: s }]) => Math.sign(a - s));
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
    return this.useRankSize && (e *= C.rankRatio[this.rank]), e;
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
  constructor(e, t, a = {}) {
    const {
      displayPtn: i = 0,
      deg: s = 0,
      size: n = C.size,
      useRankSize: r = C.useRankSize,
      isDrawShadow: o = C.isDrawShadow,
      isMoved: l = !1
    } = a;
    Object.assign(this, t), this.ctx = e, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn ??= i, this.game = _[this.gameName], this.cost = Z[this.char] ?? Z[this.base.char] ?? 1, this.center = 0, this.middle = 0, this.deg ||= s, this.size ??= n, this.useRankSize ??= r, this.isDrawShadow ??= o, this.isRotateImg ??= !0, this.isMoved = l, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([c, d]) => {
        Array.isArray(d) || (this.range[c] = ae[d].map((S) => [...S]));
      });
    } catch (c) {
      throw console.error(c), t;
    }
  }
  /** 駒をクローン
   * @returns {Piece}
   */
  clone() {
    const { displayPtn: e, deg: t, size: a, isMoved: i } = this;
    return new C(this.ctx, { ...this }, { displayPtn: e, deg: t, size: a, isMoved: i });
  }
  /** 駒を表返す */
  turnFront() {
    Object.assign(this, this.base);
  }
  /** プロモーション
   * @param {string} char - 成り先の文字
   */
  promotion(e) {
    const { promo: t } = this;
    if (!t) throw Error(`promo=${e}, Not plomote piece.`);
    if (!t[e]) throw Error(`promo=${e}, Plomote key is missing.`);
    if (this.hasAttr("promoted")) throw Error(`promo=${e}, Promoted piece.`);
    Object.assign(this, t[e]), this.char = e;
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
  checkRangeMouse(e, t) {
    return this.left <= e && e < this.right && this.top <= t && t < this.bottom;
  }
  /** 移動範囲を回転して取得
   * @returns {string[][]}
   */
  getRange() {
    const e = 0 | this.deg, t = JSON.parse(JSON.stringify(this.range));
    return Object.keys(t).forEach((a) => {
      if (e !== 0) {
        if (![90, 180, 270].includes(e)) throw Error(`deg=${e}, deg need multiple of 90.`);
        if ([90, 270].includes(e)) {
          const i = (s) => s[0].map((n, r) => s.map((o) => o[r]));
          t[a] = i(t[a]);
        }
        [180, 270].includes(e) && t[a].reverse(), t[a].forEach((i) => {
          [90, 180].includes(e) && i.reverse();
        });
      }
    }), t;
  }
  /** 駒/マスクを描写 */
  async draw() {
    if (!this.ctx) return;
    const e = "#FF000055";
    this.imgSrc && H.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(e)) : (this.drawPiece(), this.isSelected && this.drawMask(e));
  }
  /** 駒画像を描写 */
  drawImage() {
    if (!this.ctx) return;
    const { ctx: e, size: t, deg: a } = this, i = this.imgSrc[a][this.displayPtn] ?? this.imgSrc[0][this.displayPtn], s = H.images[i];
    if (!s) return;
    e.save(), e.translate(this.center, this.middle), this.isRotateImg && e.rotate(this.rad);
    let n, r;
    s.width * 0.9 < s.height ? (n = s.width / s.height * t, r = t) : (n = t, r = s.height / s.width * t), e.drawImage(s, -n / 2, -r / 2, n, r), e.restore();
  }
  /** 駒画像にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMaskImage(e) {
    if (!this.ctx) return;
    const { ctx: t, size: a } = this;
    t.fillStyle = e, t.save();
    const i = a * 0.9, s = a;
    t.translate(this.center, this.middle), t.fillRect(-i / 2, -s / 2, i, s), t.restore();
  }
  /** 将棋駒の外形パスを作成
   * @param {number} zoom - 駒の拡大率
   */
  makePath(e) {
    const { ctx: t } = this;
    t.translate(this.center, this.middle), t.rotate(this.rad), t.beginPath(), t.moveTo(-30 * e, -40 * e), t.lineTo(0 * e, -50 * e), t.lineTo(30 * e, -40 * e), t.lineTo(45 * e, 50 * e), t.lineTo(-45 * e, 50 * e), t.closePath();
  }
  /** 駒の影を描写
  * @param {number} zoom - 駒の拡大率
  */
  drawPieceShadow(e) {
    if (!this.isDrawShadow) return;
    const { ctx: t } = this;
    t.save(), t.translate(0, 10 * e), this.drawMask("#00000066"), t.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    if (!this.ctx) return;
    const { ctx: e, game: t, zoom: a } = this;
    let i, s, n;
    this.hasAttr("promoted") ? (i = t.promoteFontColor ?? t.fontColor ?? "#000000", s = t.promoteBackgroundColor ?? t.backgroundColor ?? "#FFFFFF", n = t.promoteBorderColor ?? t.borderColor ?? "#FF3300") : (i = t.fontColor ?? "#000000", s = t.backgroundColor ?? "#FFFFFF", n = t.borderColor ?? "#777777"), e.strokeStyle = n, e.fillStyle = s, e.lineWidth = 8 * a, this.drawPieceShadow(a), e.save(), this.makePath(a), e.stroke(), e.fill(), e.fillStyle = i;
    const r = [..."" + this.display[this.displayPtn]], o = 40 * a;
    e.font = `${o}px ${P.names}`, e.textAlign = "center", r.forEach((l, c) => {
      const d = r.length === 1 ? o / 2 : c * o;
      e.fillText(l, 0, d);
    }), e.restore();
  }
  /** 駒にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(e) {
    if (!this.ctx) return;
    const { ctx: t, zoom: a } = this;
    t.fillStyle = e, t.save(), this.makePath(a), t.fill(), t.restore();
  }
  /** 文字列形式で取得
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1) {
    const { displayPtn: t } = this, a = !e || t === 0 ? this.char : this.alias[t - 1];
    return C.degChars[this.deg] + a;
  }
}
class ge {
  #t;
  #e;
  #a;
  /** 駒オブジェクト
   * @returns {Piece}
   */
  get piece() {
    return this.#t;
  }
  set piece(e) {
    this.#t = e, e && (e.center = this.center, e.middle = this.middle);
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
  constructor(e, t, a, i, s, n, r, o, l) {
    Object.assign(this, J[t]), this.ctx = e, this.center = a, this.middle = i, this.width = s, this.height = n, this.left = a - s / 2, this.top = i - n / 2, this.right = a + s / 2, this.bottom = i + n / 2, this.pX = r, this.pY = o, this.borderWidth = l, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.attr ??= [], this.piece = null, this.isSelected = !1, this.clearTarget();
  }
  /** マス目の選択状態
   * @param {boolean} value
   */
  set isSelected(e) {
    this.#e = this.hasAttr("keepOut") ? !1 : e;
  }
  get isSelected() {
    return this.#e;
  }
  /** マス目の移動可能判定
   * @param {boolean} value
   */
  get isTarget() {
    return 0 < this.#a.length;
  }
  /** マス目の移動先情報をクリア */
  clearTarget() {
    this.#a = [];
  }
  /** マス目の移動先情報を追加
   * @param {string} rangeName - 移動先情報
   */
  addTarget(e) {
    this.#a.push(e);
  }
  /** マス目が移動先情報を持っているか判定
   * @param {string} rangeName - 移動先情報
   * @returns {boolean}
   */
  hasTarget(e) {
    return this.#a.includes(e);
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
  checkRangeMouse(e, t) {
    return this.left <= e && e < this.right && this.top <= t && t < this.bottom;
  }
  /** マス目/マスク/駒を描写 */
  draw() {
    if (!this.ctx) return;
    const { selectColor: e, targetColor: t } = this;
    this.imgSrc && H.imported ? this.drawImage() : this.drawPanel(), this.isSelected && this.drawMask(e), this.isTarget && this.drawMask(t), this.piece?.draw();
  }
  /** マス目画像を描写 */
  drawImage() {
    if (!this.ctx) return;
    const { ctx: e } = this, t = this.imgSrc, a = H.images[t];
    a && (e.save(), e.translate(this.left, this.top), e.drawImage(a, 0, 0, this.width, this.height), e.restore());
  }
  /** マス目を描写 */
  drawPanel() {
    if (!this.ctx) return;
    const { ctx: e, left: t, top: a, center: i, middle: s, width: n, height: r, displayText: o, textRotate: l } = this;
    if (e.fillStyle = this.backgroundColor, e.strokeStyle = this.borderColor, e.lineWidth = this.borderWidth, e.save(), e.translate(t, a), e.fillRect(0, 0, n, r), this.intersect ? (e.lineWidth = this.borderWidth, e.beginPath(), e.moveTo(n / 2, 0), e.lineTo(n / 2, r), e.moveTo(0, r / 2), e.lineTo(n, r / 2), e.closePath(), e.stroke()) : e.strokeRect(0, 0, n, r), e.lineWidth = this.borderWidth / 2, e.beginPath(), this.borderSlashLeft && (e.moveTo(0, 0), e.lineTo(n, r)), this.borderSlashRight && (e.moveTo(n, 0), e.lineTo(0, r)), e.closePath(), e.stroke(), e.restore(), o) {
      e.save(), e.translate(i, s), e.fillStyle = this.borderColor;
      const c = l ? l * Math.PI / 180 : 0;
      e.rotate(c);
      const d = Math.min(this.width, this.height) * 0.6;
      e.font = `${d}px ${P.names}`;
      const S = e.measureText(o).width, u = d / 2 * 0.8;
      e.fillText(o, -S / 2, u), e.restore();
    }
  }
  /** マス目にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(e) {
    if (!this.ctx) return;
    const { ctx: t } = this;
    t.fillStyle = e, t.fillRect(this.left, this.top, this.width, this.height);
  }
  /** マス目をテキスト形式で取得
   * @param {boolean} isCompact - コンパクト表示
   */
  toString(e = !1) {
    return e ? `｜${this.text.slice(-1).replace(/　/g, "・")}` : this.text;
  }
}
const fe = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], Be = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], We = [
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
], se = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let p = 1; p <= 9; p++)
  se.push(["" + p, { moves: p }]);
function ye(p) {
  const e = [];
  let t, a;
  for (let i = 0; i < p.length; i++)
    for (let s = 0; s < p[i].length; s++) {
      const n = p[i][s];
      for (let [r, { isOwn: o }] of Be)
        n === r && (e.push({ isOwn: o, oX: s, oY: i }), o && ([t, a] = [s, i]));
    }
  return e.map((i) => (i.offsetX = i.oX - t, i.offsetY = i.oY - a, i));
}
function R(p, e, t, a) {
  const i = [], { field: s, yLen: n, enPassant: r } = p;
  function o(m, h) {
    return s[h] && s[h][m] && !s[h][m].hasAttr("keepOut");
  }
  function l(m) {
    return m.piece && e.hasAttr("po") && m.piece.hasAttr("po");
  }
  function c(m) {
    return m.piece && !e.isMoved && !m.piece.isMoved && e.hasAttr("pao") && e.cost < m.piece.cost;
  }
  function d(m, h, B, W = "", w = !0) {
    if (!s[B] || !s[B][h]) return !1;
    const x = s[B][h];
    return !x || l(x) || c(x) || W === "enPassant" && !r.isTarget(x, e) || e.hasAttr("inPalace") && !x.hasAttr("palace") || W.indexOf("palace") === 0 && !(x.hasAttr(W) && s[a][t].hasAttr(W)) || e.hasAttr("unCrossRiver") && n - (0 | n / 2) <= p.getRow(h, B, e.deg) ? !1 : m ? s[B][h].piece ? w ? e.deg !== s[B][h].piece.deg : !0 : !1 : !s[B][h].piece;
  }
  function S(m, h, B, W, w) {
    for (const x of h)
      for (let X = 0; X < m.length; X++)
        for (let b = 0; b < m[X].length; b++) {
          const [E, v] = [b + t - W, X + a - w];
          if (!(!o(E, v) || d(B, 0 | E, 0 | v, "", !1) || m[X][b] !== x))
            return !0;
        }
    return !1;
  }
  function u(m, h, B) {
    const W = s[B][h];
    W.addTarget(m), r.setTarget(W, e), i.push(W);
  }
  function f(m, [h, { isAttack: B }], { oX: W, oY: w, isOwn: x }) {
    if (x)
      for (const [X, { child: b = [] } = {}] of We)
        for (let E = 0; E < m.length; E++)
          for (let v = 0; v < m[E].length; v++) {
            const [O, j] = [v + t - W, E + a - w];
            !o(O, j) || !d(B, O, j, h) || m[E][v] !== X || S(m, b, !1, W, w) || u(h, O, j);
          }
  }
  function A(m, [h, { isAttack: B }], { oX: W, oY: w, isOwn: x, offsetX: X, offsetY: b }) {
    if (!(!x && !d(!1, t + X, a + b)))
      for (const [E, { jmps: v = 0, moves: O = 0 } = {}] of se) {
        const j = !O || O === 0;
        for (let F = w - 1; F <= w + 1; F++)
          for (let $ = W - 1; $ <= W + 1; $++) {
            if (m[F][$] !== E || $ === W && F === w) continue;
            let G = v || 0, T = O || 0;
            const [Y, z] = [$ - W, F - w];
            for (let g = t, k = a; ; ) {
              g += Y, k += z;
              const N = g + X, M = k + b;
              if (!o(N, M) || !j && T === 0) break;
              const D = G === 0;
              D && d(B, N, M, h, D) ? (T--, u(h, N, M)) : v < 1 && T--;
              const U = s[M][N];
              if (U.piece && (G--, D || l(U)))
                break;
            }
          }
      }
  }
  return (function() {
    const m = e.getRange();
    m.attack ??= m.default;
    for (const h of fe) {
      const B = h[0];
      if (e.isMoved && ["start", "castling"].includes(B)) continue;
      const W = m[B];
      if (W)
        for (const w of ye(W))
          f(W, h, w), A(W, h, w);
    }
  })(), i;
}
function ie(p, e) {
  let t = p.field.flat().filter(
    (i) => i.piece?.deg === e && i.piece.hasAttr("king")
  );
  if (t.length !== 1) return !1;
  const a = t[0];
  for (const i of p.field.flat()) {
    if (!i.piece || i.piece.deg === e) continue;
    if (R(p, i.piece, i.pX, i.pY).some(
      ({ pX: n, pY: r }) => n === a.pX && r === a.pY
    )) return !0;
  }
  return !1;
}
function ne(p, e) {
  for (const t of p.field.flat()) {
    if (!t.piece || t.piece.deg !== e) continue;
    const a = R(p, t.piece, t.pX, t.pY);
    for (const i of a) {
      const s = p.clone();
      if (s.isHeadless = !0, s.onGameOver = null, s.simpleMovePiece(
        s.field[t.pY][t.pX],
        s.field[i.pY][i.pX]
      ), !ie(s, e)) return !0;
    }
  }
  return !1;
}
function Ae(p, e) {
  return ie(p, e) && !ne(p, e);
}
function Ce(p) {
  let e = !1, t = [], a = null, i = null;
  const { canvas: s } = p, n = async (d, S, u = () => {
  }) => {
    const f = window.getComputedStyle(s), A = d.target.getBoundingClientRect();
    let m = s.width / parseFloat(f.width), h = s.height / parseFloat(f.height);
    if (d.clientX)
      m *= d.clientX - A.left, h *= d.clientY - A.top;
    else if (0 < d.touches.length) {
      if (1 < d.touches.length) return;
      m *= d.touches[0].clientX - A.left, h *= d.touches[0].clientY - A.top;
    } else
      d.preventDefault(), [m, h] = t;
    p.field.forEach((B, W) => B.forEach(async (w, x) => await S(w, m, h, x, W))), await u(m, h), p.draw(), t = [m, h];
  }, r = async (d) => {
    e = !0, await n(
      d,
      (S, u, f) => {
        const { piece: A, pX: m, pY: h } = S;
        A && S.checkRangeMouse(u, f) && (d.preventDefault(), A.isSelected = !0, a = S, R(p, A, m, h));
      },
      (S, u) => {
        for (const [f, A] of p.stand.stocks)
          for (let m = A.length - 1; 0 <= m; m--)
            if (A[m].checkRangeMouse(S, u)) {
              d.preventDefault(), A[m].isSelected = !0, i = { deg: f, i: m };
              return;
            }
      }
    );
  }, o = async (d) => {
    !e || !(a || i) || await n(
      d,
      (S, u, f) => {
        S.isSelected = S.checkRangeMouse(u, f);
      }
    );
  }, l = async (d) => {
    e = !1, await n(
      d,
      async (S, u, f) => {
        S.checkRangeMouse(u, f) && (a && await p.movePiece(a, S), i && !S.piece && p.stand.releasePiece(S, i));
      }
    ), await n(
      d,
      (S) => {
        S.piece && (S.piece.isSelected = !1), S.isSelected = !1, S.clearTarget();
      },
      () => {
        for (const [S, u] of p.stand.stocks)
          for (let f = u.length - 1; 0 <= f; f--)
            u[f].isSelected = !1;
        a = null, i = null;
      }
    );
  }, c = () => {
    for (const d of p.field.flat())
      d.piece && (d.piece.isSelected = !1), d.isSelected = !1, d.clearTarget();
    for (const [d, S] of p.stand.stocks)
      for (let u = S.length - 1; 0 <= u; u--)
        S[u].isSelected = !1;
    a = null, i = null, p.draw();
  };
  return s.addEventListener("mousedown", r), s.addEventListener("mousemove", o), s.addEventListener("mouseup", l), s.addEventListener("touchstart", r), s.addEventListener("touchmove", o), s.addEventListener("touchend", l), {
    resetSelect: c,
    /** イベントリスナーを破棄 */
    removeEvent() {
      s.removeEventListener("mousedown", r), s.removeEventListener("mousemove", o), s.removeEventListener("mouseup", l), s.removeEventListener("touchstart", r), s.removeEventListener("touchmove", o), s.removeEventListener("touchend", l);
    }
  };
}
class re {
  /** @typedef {Object} PlayerControl */
  static buttonTexts = "<>🔄🔁📷";
  /** 要素のサイズをCanvasに合わせて変更 */
  #t() {
    if (this.board.isHeadless) return;
    const { canvas: e } = this.board, t = window.getComputedStyle(e);
    this.component.style.maxWidth = parseFloat(t.width) + "px";
  }
  /**
   * @param {Board} board ボード
   * @param {string[]} compList 表示するコントロールの一覧
   */
  constructor(e, t) {
    this.board = e;
    const a = /* @__PURE__ */ new Map([
      ["undoRecord", { title: "一手戻る", text: "&lt;&lt;", onclick: () => e.undoRecord() }],
      ["redoRecord", { title: "一手進む", text: "&gt;&gt;", onclick: () => e.redoRecord() }],
      ["rotateLeft", { title: "盤面を左回転", text: "🔄", onclick: () => e.rotate(!1) }],
      ["rotateRight", { title: "盤面を右回転", text: "🔁", onclick: () => e.rotate() }],
      ["downloadImage", { title: "画像を保存", text: "📷", onclick: () => e.downloadImage() }]
    ]);
    t ??= [...a.keys(), "textRecord"];
    const i = Date.now().toString();
    this.component = document.createElement("div"), this.component.id = i, this.component.style.display = "flex", this.#t(), window.addEventListener("resize", () => this.#t()), this.component.innerHTML = `${[...a].filter(([n]) => t.includes(n)).map(
      ([n, { title: r, text: o }]) => `<button id="${n}${i}" title="${r}" style="font-family:${P.names};">${o}</button>`
    ).join("")}${t.includes("textRecord") ? `<select id="textRecord${i}" style="flex-grow:1; font-family:${P.names};"><option></option></select>` : ""}`;
    for (const [n, { onclick: r }] of a)
      t.includes(n) && (this.component.querySelector(`#${n}${i}`).onclick = r);
    if (!t.includes("textRecord")) return;
    const s = e.onDrawed;
    e.onDrawed = async (n) => {
      setTimeout(() => {
        const r = this.component.querySelector(`#textRecord${i}`), o = r.querySelector("option"), l = r.cloneNode(!1);
        n.record.forEach((c, d) => {
          const S = o.cloneNode(!1);
          S.textContent = e.record2String(c, d), d === n.turn && (S.selected = !0), l.appendChild(S);
        }), l.onchange = (c) => e.moveRecord(c.target.selectedIndex), r.replaceWith(l);
      }), s?.(n);
    };
  }
  /** 操作パネルを追加 */
  add() {
    if (this.board.isHeadless) return;
    const { canvas: e } = this.board;
    e.after(this.component);
  }
  /** 操作パネルを破棄 */
  remove() {
    this.board.isHeadless || (this.component.remove(), window.removeEventListener("resize", () => this.#t));
  }
}
class ee {
  /** 駒台への角度ごとの表示順
   * @type {number[]}
   */
  static #t = [180, 90, 270, 0];
  /**
   * @param {Board} ボード
   */
  constructor(e) {
    this.board = e;
    const { top: t, right: a, bottom: i, width: s, height: n, panelWidth: r, panelHeight: o, xLen: l, yLen: c } = e;
    this.clear(), this.left = a * 1.02, this.top = t, this.width = s / 2, this.height = n, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = r / 2, this.pitchHeight = o, this.xLen = l, this.yLen = c;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = new Map(ee.#t.map((e) => [e, []]));
  }
  /** 持ち駒からボード上に配置する
   * @param {Panal} toPanell - 配置先のパネル
   * @param {Object} option - オプション
   * @param {number} option.deg - 角度
   * @param {number} option.i - 配置する持ち駒のインデックス
   */
  releasePiece(e, t = {}) {
    const { board: a } = this;
    if (a.moveMode === "viewOnly" || e.hasAttr("keepOut")) return;
    const { deg: i, i: s } = t, n = this.stocks.get(i);
    e.piece = n[s], n[s].center = e.center, n[s].middle = e.middle, n.splice(s, 1), a.addRecord({ toPanel: e, end: "打" });
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(e) {
    const t = this.stocks.get(e.deg);
    e.turnFront(), t.push(e), t.sort((a, i) => Math.sign(a.id - i.id));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   * @param {boolean} forceCapture - 属性を無視して捕縛する
   * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
   */
  capturePiece(e, t, a = !1, i = !1) {
    i || !t || !(a || e.hasAttr("capture")) || t.hasAttr("king") || t.hasAttr("cantCapture") || (t.deg = e.deg, t.isMoved = !0, this.add(t));
  }
  /** 持ち駒の所有権を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  rotate(e) {
    [...this.stocks].forEach(([t, a]) => {
      const i = this.board.degNormal(t + e);
      a.forEach((s) => s.deg = i), this.stocks.set(i, a);
    });
  }
  /** 盤を描写 */
  draw() {
    const { board: e, left: t, top: a, width: i, height: s, pitchWidth: n, pitchHeight: r } = this, { ctx: o, xLen: l, yLen: c } = e;
    o.fillStyle = e.backgroundColor, o.strokeStyle = e.borderColor, o.lineWidth = e.borderWidth, o.save(), o.translate(t, a), o.fillRect(0, 0, i, s), o.strokeRect(0, 0, i, s), o.restore(), [...this.stocks.values()].forEach((d, S) => {
      let u = 0;
      d = d.slice(-c / 4 * l);
      for (let f = 0 | c / 4 * S; f < c / 4 * (S + 1); f++)
        for (let A = 0; A < l; A++) {
          const m = t + n * (A + 1), h = a + r * (f + 1), B = d[u++];
          if (B == null) break;
          B.center = m, B.middle = h, B.draw();
        }
    });
  }
  /** 駒台をテキスト形式で取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, t = !1) {
    const { xLen: a } = this.board, i = [...this.stocks.values()].flat().filter((r) => r);
    let s = 0 < i.length ? `
` + "―".repeat(a * 2) + `
` : "", n = i.map((r) => r.toString(t)).join("");
    if (!e) {
      s = "";
      for (const r of Object.values(C.degChars))
        n = n.replace(r, `
${r}持駒：${r}`);
    }
    return s + n;
  }
}
const we = Object.keys(C.degChars), te = () => ({
  panel: null,
  piece: null
});
class xe {
  constructor() {
    this.degs = {}, we.forEach((e) => this.degs[e] = te());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(e) {
    this.degs[e] = te();
  }
  /** アンパッサン対象と成りうるマス情報を記録
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   */
  setTarget(e, t) {
    e.hasTarget("start") && t.hasAttr("enPassant") && (this.degs[t.deg].panel = e);
  }
  /** アンパッサン対象と成りうる駒情報を記録
   * @param {Panel} toPanel - アンパッサン対象か確認するマス目
   */
  setMoved(e) {
    const { piece: t } = e, a = this.degs[t.deg];
    t && e === a.panel ? a.piece = t : this.clear(t.deg);
  }
  /** アンパッサン対象のマスか確認する
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   * @returns {boolean}
   */
  isTarget(e, t) {
    return !e || !e.piece ? !0 : e.piece.hasAttr("enPassant") ? e.piece === this.degs[e.piece.deg].piece : !1;
  }
}
class y {
  /** 角度から駒の文字表示
   * @type {Map<number, string>}
   */
  static #t = /* @__PURE__ */ new Map([
    [0, " "],
    [90, ">"],
    [180, "v"],
    [270, "<"]
  ]);
  /** 角度から駒の正規表現表示
   * @type {Map<number, string>}
   */
  static #e = new Map(
    [...y.#t].map(([e, t]) => [e, new RegExp(t, "g")])
  );
  /** 駒の文字から角度表示
   * @type {Map<string, number>}
   */
  static #a = new Map(
    [...y.#t].map(([e, t]) => [t, e])
  );
  /** 角度から持駒の表題表示
   * @type {Map<number, string>}
   */
  static #s = /* @__PURE__ */ new Map([
    [0, "先手の持駒"],
    [90, "次手の持駒"],
    [180, "後手の持駒"],
    [270, "四手の持駒"]
  ]);
  /** 持駒の表題から角度表示
   * @type {Map<string, number>}
   */
  static #i = new Map(
    [...y.#s].map(([e, t]) => [t, e])
  );
  static #n = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  static #r = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"];
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static #l(e, t = !0) {
    if (!t && e <= 1) return "";
    const a = e % 10, i = 0 | e / 10;
    return y.#r[i] + y.#n[a];
  }
  /** 行/持駒用の数字表示(漢数字)
   * @param {string} kan - 漢数字
   * @param {boolean} emptyOne - 空文字を1とする
   * @returns {string}
   */
  static #c(e, t = !0) {
    if (t && e === "") return 1;
    if (!isNaN(e)) return 0 | e;
    let a = y.#r.findIndex(
      (s) => s !== "" && new RegExp("^" + s).test(e)
    );
    a < 0 && (a = 0);
    let i = y.#n.findIndex(
      (s) => s !== "" && new RegExp(s + "$").test(e)
    );
    return i < 0 && (i = 0), a * 10 + i;
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static #o(e) {
    if (10 <= e) return e;
    const t = "０１２３４５６７８９", a = e % 10;
    return t[a];
  }
  /** マス目の表示
   * @type {string}
   */
  static #p = " ・";
  /** 駒のBOD表記
   * @param {Piece} piece - 駒
   * @returns {string}
   */
  static #S(e) {
    return e ? y.#t.get(e.deg) + e.char : y.#p;
  }
  /** 駒台のBOD表記
   * @param {Stand} stand - 駒台
   * @param {number} deg - 角度
   * @returns {string}
   */
  static #d(e, t = 0) {
    const a = /* @__PURE__ */ new Map();
    return e.stocks.get(t).forEach(({ char: i }) => {
      a.has(i) || a.set(i, 0), a.set(i, a.get(i) + 1);
    }), y.#s.get(t) + "：" + [...a].map(
      ([i, s]) => i + y.#l(s, !1)
    ).join(" ");
  }
  /** BOD形式のテキストをボードで扱えるよう変換
   * @param {string} text - BOD形式のテキスト
   * @returns {string}
   */
  static convTextPieces(e) {
    const t = [], a = [];
    e.split(/\r|\n|\r\n/).forEach((n) => {
      [...y.#i.keys()].some((r) => new RegExp(`^${r}`).test(n)) ? a.push(n) : t.push(n.slice(1));
    });
    let i = t.slice(2, -1).join(`
`);
    y.#e.forEach((n, r) => {
      i = i.replace(n, C.degChars[r]);
    });
    const s = a.flatMap((n) => {
      const [r, o] = n.split(/：/);
      if (o === "") return "";
      const l = y.#i.get(r), c = C.degChars[l];
      return o.split(/\s/).map((S) => {
        const u = S[0], f = S.slice(1);
        return (c + u).repeat(y.#c(f));
      });
    }).join("");
    return `${i}
${s}`;
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  static getTextPieces(e) {
    const { field: t, xLen: a, playerLen: i, stand: s } = e;
    let n = ` ${[...Array(a).keys()].map((u) => ` ${y.#o(a - u)}`).join("")}
+${Array(a).fill("---").join("")}+
`, r = `
+${Array(a).fill("---").join("")}+`, o = "|", l = "", c = `
`, d = `${y.#d(s, 180)}
`, S = `${y.#d(s, 0)}`;
    return i !== 2 && (d = `${y.#d(s, 270)}
` + d, S = `${y.#d(s, 90)}
` + S), d + n + t.map(
      (u, f) => o + u.map(
        (A) => y.#S(A.piece)
      ).join(l) + o + y.#l(f + 1)
    ).join(c) + r + `
` + S;
  }
}
class be {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {OverlayOptions} options - スピナーのオプション
   */
  #t = !1;
  #e = null;
  // 暗転用オーバーレイ要素
  #a = null;
  // HTMLスピナー要素
  #s;
  // Options
  #i;
  // Options
  constructor(e, t = {}) {
    this.canvas = e, this.#s = t.useDimOverlay ?? !0, this.#i = t.showSpinner ?? !0, this.#n(), this.#r();
  }
  /**
   * オーバーレイを開始します。
   */
  start() {
    this.#t = !0, this.#s && (this.#e.style.display = "block"), this.#i && (this.#a.style.display = "block");
  }
  /**
   * オーバーレイを停止します。
   */
  stop() {
    this.#t = !1, this.#s && (this.#e.style.display = "none"), this.#a.style.display = "none";
  }
  /**
   * HTMLスピナー要素を作成します。
   * @private
   */
  #n() {
    if (!this.#a && (this.#a = document.createElement("div"), this.#a.className = "html-spinner", this.#a.innerHTML = '<div class="html-spinner-inner"></div>', document.body.appendChild(this.#a), !document.getElementById("html-spinner-styles"))) {
      const e = document.createElement("style");
      e.id = "html-spinner-styles", e.textContent = `
                    .html-spinner {
                        position: fixed; /* Changed to fixed */
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 10000; /* Highest z-index */
                        display: none; /* Hidden by default */
                    }
                    .html-spinner-inner {
                        width: 50px; /* Adjust size as needed */
                        height: 50px;
                        border: 5px solid rgba(255, 255, 255, 0.3);
                        border-top-color: #FFFFFF;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `, document.head.appendChild(e);
    }
  }
  /**
   * 暗転用オーバーレイを作成し、表示します。
   * @private
   */
  #r() {
    if (!this.#e && (this.#e = document.createElement("div"), this.#e.className = "html-spinner-overlay", document.body.appendChild(this.#e), !document.getElementById("html-spinner-overlay-styles"))) {
      const e = document.createElement("style");
      e.id = "html-spinner-overlay-styles", e.textContent = `
                    .html-spinner-overlay {
                        position: fixed; /* Changed to fixed */
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.3); /* Changed opacity to 0.3 */
                        z-index: 9999; /* Above canvas */
                        display: none; /* Hidden by default */
                    }
                `, document.head.appendChild(e);
    }
  }
  /**
   * スピナーとオーバーレイの位置とサイズを更新します。
   */
  updatePosition() {
    const e = this.canvas.getBoundingClientRect();
    this.#e.style.top = `${e.top}px`, this.#e.style.left = `${e.left}px`, this.#e.style.width = `${e.width}px`, this.#e.style.height = `${e.height}px`, this.#a.style.top = `${e.top + e.height / 2}px`, this.#a.style.left = `${e.left + e.width / 2}px`;
  }
}
class Q {
  /** @typedef {Object} Board */
  #t;
  #e;
  #a;
  #s;
  #i;
  #n;
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
  static run(e, t) {
    return new Q(e, t);
  }
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    const {
      name: a,
      variant: i,
      url: s,
      desc: n,
      playBoard: r,
      playerOptions: o = [],
      players: l = o.some(({ gameName: g }, k) => 1 < k && g) ? 4 : 2,
      useStand: c = !1,
      canvasWidth: d = void 0,
      canvasHeight: S = void 0,
      canvasFit: u = "overflow",
      boardLeft: f = 5,
      boardTop: A = 5,
      panelWidth: m = 50,
      panelHeight: h = 0 | m * 1.1,
      pieceSize: B = 0 | m * 0.9,
      useRankSize: W = !0,
      isDrawShadow: w = !0,
      borderWidth: x = Math.min(m, h) / 30,
      backgroundColor: X = "#00000000",
      isHeadless: b = !1,
      autoDrawing: E = !b,
      OverlayOptions: v = { useDimOverlay: !0 },
      moveMode: O = "normal",
      usePlayerControl: j = !b,
      onDrawed: F = (g) => {
      },
      onTurnEnd: $ = (g, k) => {
      },
      onGameOver: G = (g, k) => alert(`プレイヤー${k + 1}の敗北です。`),
      onGameEnd: T = (g, k) => g.addRecord({ end: `対戦終了 勝者${[...g.players.values()][k].degChar}` })
    } = t;
    this.#a = t, this.isHeadless = b, this.name = a, this.variant = i, this.url = s, this.desc = n, this.ctx = null, this.canvas = null;
    let Y = null, z = null;
    if (b || (Y = P.importAsync(), z = H.importAsync(), this.canvas = e, this.ctx = e.getContext("2d"), this.ctx.clearRect(0, 0, e.width, e.height), this.#i = new he(), this.#n = new be(this.canvas, v)), this.pieces = C.getPieces(this.ctx, {
      size: B,
      useRankSize: W,
      isDrawShadow: w
    }), !V[r]) throw Error(`playBoard=${r}, Unknown board name.`);
    if (Object.assign(this, V[r]), ![2, 4].includes(l)) throw Error(`players=${l}, players need 2 or 4.`);
    this.playerLen = l, this.left = f, this.top = A, this.panelWidth = m, this.panelHeight = h, this.borderWidth = x, this.pieceSize = B, this.canvasBackgroundColor = X, this.field = this.field.map(
      (g, k) => [...g].map((N, M) => {
        const D = f + m * (M + 1), U = A + h * (k + 1);
        return new ge(this.ctx, N, D, U, m, h, M, k, x);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.players = /* @__PURE__ */ new Map();
    for (let g = 0; g < l; g++) {
      const k = this.degNormal(g), N = {
        ...o[g],
        id: g,
        deg: k,
        degChar: C.degChars[k],
        alive: !0,
        cpuDelay: o[g]?.cpuDelay ?? 500
        // CPUの遅延時間
      };
      if (N.cpu = new ke(this, N), this.players.set(k, N), !!N.gameName)
        try {
          this.putStartPieces(g, N.gameName, N.pieceSet);
        } catch (M) {
          console.error(M);
        }
    }
    if (this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = f + this.width, this.bottom = A + this.height, this.stand = new ee(this), !b) {
      e.width = d ?? (c ? this.stand.right : this.right) + 5, e.height = S ?? this.bottom + 5;
      const { style: g } = e;
      u === "overflow" ? (g.maxWidth === "" && (g.maxWidth = "97vw"), g.maxHeight === "" && (g.maxHeight = "92vh")) : u === "horizontal" ? g.width === "" && (g.width = "97vw") : u === "vertical" ? g.height === "" && (g.height = "92vh") : u === "parentOverflow" ? (g.maxWidth === "" && (g.maxWidth = "100%"), g.maxHeight === "" && (g.maxHeight = "100%")) : u === "parentHorizontal" ? g.width === "" && (g.width = "100%") : u === "parentVertical" && g.height === "" && (g.height = "100%");
    }
    this.autoDrawing = E, E && (Y.then(() => {
      this.draw(), this.#i.setFontFamily(P.names);
    }), z.then(() => this.draw()), this.draw()), this.isGameEnd = !1, this.onDrawed = F, this.onTurnEnd = $, this.onGameOver = G, this.onGameEnd = T, this.moveMode = O, this.record = [], this.turn = 0, b || (this.#t = Ce(this)), j && (this.#e = this.makePlayerControl(), this.#e.add()), this.enPassant = new xe();
  }
  /** 操作パネルを構築
   * @param {string[]} compList - 表示するコントロールの一覧
   * @returns {PlayerControl}
   */
  makePlayerControl(e) {
    return this.#e = new re(this, e), this.#e;
  }
  /** ボードを閉じる */
  close() {
    this.#t?.removeEvent(), this.#e?.remove();
  }
  /** 現在の手番のプレイヤー情報を取得
   * @returns {Object<string, any>|"PlayerInfo"} - 現在のプレイヤー情報
   */
  getActivePlayer() {
    return [...this.players.values()][this.turn % this.playerLen];
  }
  /** 角度を正規化
   * @param {number} playeaIdOrDeg - プレイヤー番号または角度
   * @returns {number}
   */
  degNormal(e) {
    let t = e;
    0 < t && t < 4 && (t = 0 | t * 360 / this.playerLen);
    do
      t = (t + 360) % 360;
    while (t < 0);
    return t;
  }
  /** 盤面を回転
   * @param {boolean} isRight - 回転方向
   */
  rotate(e = !0) {
    let t = this.degNormal(1);
    e || (t = -t), this.#r(t), this.stand.rotate(t), this.autoDrawing && this.draw();
  }
  /** 駒配置を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  #r(e) {
    const { field: t, xLen: a, yLen: i } = this;
    if (e = this.degNormal(e), e === 0) return;
    if (![90, 180, 270].includes(e)) throw Error(`deg=${e}, deg need multiple of 90.`);
    let s = t.map((n) => n.map(({ piece: r }) => r));
    if ([90, 270].includes(e)) {
      const n = (r) => r[0].map((o, l) => r.map((c) => c[l]));
      if (a !== i) throw Error(`cols=${a} != rows=${i}, Not rows = cols.`);
      s = n(s);
    }
    [180, 270].includes(e) && s.reverse(), s.forEach((n) => {
      n.forEach((r) => {
        r && (r.deg += e);
      }), [90, 180].includes(e) && n.reverse();
    }), t.forEach(
      (n, r) => n.forEach(
        (o, l) => o.piece = s[r][l]
      )
    );
  }
  /** 駒の初期配置
   * @param {number} playerId - プレイヤー番号
   * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} pieceSet - 駒の配置パターン
   */
  putStartPieces(e, t, a = "default") {
    const { pieces: i } = this, s = this.degNormal(e);
    this.#r(s);
    const n = _[t].position[this.xLen][a];
    if (!n) throw Error(`games["${t}"].position["${this.xLen}"]["${a}"]is null.`);
    n.forEach((r, o) => {
      if (r.length < this.xLen) throw Error(r.join(""));
      const l = o + this.yLen - n.length;
      [...r].forEach((c, d) => {
        i[c] && (this.field[l][d].piece = i[c].clone());
      });
    }), this.#r(-s), this.autoDrawing && this.draw();
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
  putNewPiece(e, t, a, i, s = {}) {
    const { displayPtn: n = 0, isMoved: r = !1 } = s, { pieces: o } = this, l = this.degNormal(i);
    typeof e == "string" && (e = new C(this.ctx, o[e], { displayPtn: n, deg: l, isMoved: r })), this.field[a][t].piece = e, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  setTextPieces(e) {
    const { field: t, pieces: a, xLen: i, yLen: s } = this, n = "持駒：";
    0 < e.indexOf(n) && (e = y.convTextPieces(e));
    const o = [e].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(C.degChars).map((c) => `
` + c + n)
    ).reduce(
      (c, d) => c.replace(new RegExp(d, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (c) => c.match(/.{2}/g)
    );
    for (let c = 0; c < s; c++)
      for (let d = 0; d < i; d++)
        try {
          const S = o[c][d];
          t[c][d].piece = C.stringToPiece(a, S);
        } catch {
          t[c][d].piece = null;
        }
    for (; !this.stand; )
      ;
    this.stand.clear();
    const l = o[s];
    l && l.forEach((c) => {
      const d = C.stringToPiece(a, c);
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
  getRow(e, t, a, i = 0) {
    const { xLen: s, yLen: n } = this;
    return a = this.degNormal(a + i), a === 0 ? n - 1 - t : a === 90 ? e : a === 180 ? t : a === 270 ? s - 1 - e : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(e, t, a, i = 0) {
    const { xLen: s, yLen: n } = this;
    return a = this.degNormal(a + i), a === 0 ? e : a === 90 ? n - 1 - t : a === 180 ? s - 1 - e : a === 270 ? t : -1;
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   * @returns {{ 
   * 		canPromo: boolean,
   * 		forcePromo: boolean
   * }}
   */
  checkCanPromo(e) {
    const { yLen: t } = this, { piece: a, pX: i, pY: s } = e, { deg: n } = a, [r, o] = [
      a.game.promoLine,
      a.forcePromoLine
    ].map((c) => t - c - (0 | this.promoLineOffset));
    let l;
    return this.sidePromo ? l = Math.max(
      ...Object.keys(C.degChars).map((c) => 0 | c).filter((c) => c !== n).map(
        (c) => this.getRow(i, s, c, 180)
      )
    ) : l = this.getRow(i, s, n), {
      canPromo: r <= l,
      forcePromo: o <= l
    };
  }
  /** 敗北したプレイヤーが存在するか確認し、イベントを発生させる */
  #l() {
    this.players.forEach((t, a) => {
      t.alive && (this.field.flat().some(
        ({ piece: i }) => i?.deg === a && i.hasAttr("king")
      ) || (t.alive = !1, this.onGameOver?.(this, t.id)));
    });
    const e = [...this.players.values()].filter((t) => t.alive);
    e.length <= 1 && (this.onGameEnd?.(this, e[0].id), this.isGameEnd = !0);
  }
  /** プロモーション処理
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   * @param {boolean} isCpuMove - CPUによる移動か
   */
  async #c(e, t, a, i, s = !1) {
    const { moveMode: n } = this, { piece: r } = t, o = (S) => {
      r.promotion(S), this.addRecord({ fromPanel: e, toPanel: t, end: "成" });
    }, l = () => {
      this.addRecord({ fromPanel: e, toPanel: t, end: "不成" });
    };
    if (!r.promo || r.hasAttr("promoted") || r.hasAttr("cantPromotion") || !a) {
      this.addRecord({ fromPanel: e, toPanel: t });
      return;
    }
    if (this.isHeadless || s) {
      a ? o(Object.keys(r.promo)[0]) : l();
      return;
    }
    let c = [];
    for (const [S, { name: u }] of Object.entries(r.promo))
      c.push({ label: `${S}:${u}`, value: S });
    (n === "free" || !i) && c.push({ label: "不成", value: null });
    const d = await this.#i.show(
      "",
      `成りますか?
${r.char}:${r.name}`,
      c
    );
    d ? o(d) : l();
  }
  simpleMovePiece(e, t) {
    t.piece = e.piece, t.piece.isMoved = !0, e.piece = null;
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} isCpuMove - CPUによる移動か
   */
  async movePiece(e, t, a = !1) {
    const { stand: i, moveMode: s, enPassant: n } = this;
    if (!e || s === "viewOnly" || t.hasAttr("keepOut") || t.piece === e.piece || t.piece?.deg === e.piece.deg || !a && s !== "free" && !t.isTarget || !a && this.getActivePlayer().cpuEngine) return;
    let { canPromo: r, forcePromo: o } = this.checkCanPromo(e);
    i.capturePiece(
      e.piece,
      t.piece,
      t.hasAttr("capture"),
      t.hasAttr("cantCapture")
    ), this.simpleMovePiece(e, t);
    const l = this.checkCanPromo(t);
    r ||= l.canPromo, o ||= l.forcePromo, n.setMoved(t), await this.#c(e, t, r, o, a), this.#t && this.#t.resetSelect(), this.#l();
  }
  /** パスして手番を進める
   * @param {PlayerInfo} player - プレイヤー情報
  */
  passTurn(e) {
    this.addRecord({ end: `${e.degChar}パス` });
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のマス目
   * @param {Object} option - オプション
   * @param {Panel} option.fromPanel - 移動元のマス目
   * @param {string} option.end - オプション=成|不成|打
   */
  addRecord(e = {}) {
    const { record: t } = this, { fromPanel: a = {}, toPanel: i = {}, end: s = "", inc: n = 1 } = e, { piece: r = {} } = i;
    this.turn += n, !this.isHeadless && (t[this.turn] = {
      from: {
        pX: a.pX,
        pY: a.pY
      },
      to: {
        pX: i.pX,
        pY: i.pY
      },
      deg: r.deg,
      pieceChar: r.char,
      end: s,
      fieldText: this.getTextPieces("compact", !0),
      fieldMoved: this.field.map(
        (o) => o.map(
          ({ piece: l }) => l?.isMoved ? 1 : 0
        )
      )
    }, 0 < n && t.splice(this.turn + 1), this.#s !== this.turn && (this.#s = this.turn, this.onTurnEnd?.(this, this.turn), setTimeout(() => this.getActivePlayer().cpu.playTurn(), 0)));
  }
  /** 棋譜コメントを追記
   * @param {string} comment - 棋譜コメント
   * @param {number} shiftTurn - ずらす手数
   */
  addRecordComment(e, t = 0) {
    this.record[this.turn + t].comment = e;
  }
  /** 記録の参照手数を切り替える
   * @param {number} inc - 切り替えたい手数の差分
   */
  #o(e) {
    const { record: t } = this;
    if (!t[this.turn + e]) return;
    this.turn += e;
    const { fieldText: a, fieldMoved: i } = t[this.turn];
    this.setTextPieces(a), this.field.forEach(
      (s, n) => s.forEach(({ piece: r }, o) => {
        r && (r.isMoved = !!i[n][o]);
      })
    );
  }
  /** 記録の手を戻す */
  undoRecord() {
    this.#o(-1);
  }
  /** 記録の手を進める */
  redoRecord() {
    this.#o(1);
  }
  /** 記録の手を移動
   * @param {number} turn - 手数
   */
  moveRecord(e) {
    this.turn = e, this.#o(0);
  }
  /** 局面の記録を文字列に変換
   * @param {Record} record - 局面の記録
   * @param {number} turn - 手数
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  record2String(e, t, a = !1) {
    const { to: i, from: s, deg: n, pieceChar: r, end: o } = e;
    if (i.pX == null) return `${t}: ${o}`;
    const l = ({ pX: S }) => (this.xLen - S).toString(a ? 10 : 36), c = ({ pY: S }) => (S + 1).toString(a ? 10 : 36), d = a ? "," : "";
    return `${t}: ${C.degChars[n]}${l(i)}${d}${c(i)}${r}${o}${s.pX === void 0 ? "" : ` (${l(s)}${d}${c(s)})`}`;
  }
  /** 表示用の棋譜を取得
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  getTextRecord(e = !1) {
    return this.record.slice(0, this.turn + 1).map(
      (t, a) => this.record2String(t, a, e)
    ).join(`
`);
  }
  /** 棋譜データを取得
   * @param {boolean} isEncode - エンコード有無
   * @returns {string}
   */
  getJsonRecord(e = !0) {
    const t = JSON.stringify(this.record, null, "");
    return e ? encodeURI(t) : t;
  }
  /** 棋譜データを入力
   * @param {string} record - 棋譜データ
   * @param {number} turn - 手数
   */
  setJsonRecord(e, t) {
    this.record = JSON.parse(decodeURI(e)), this.moveRecord(t ?? this.record.length - 1);
  }
  /** 盤を描写 */
  draw() {
    if (this.isHeadless) return;
    const { ctx: e, canvas: t, left: a, top: i, width: s, height: n, panelWidth: r, panelHeight: o } = this;
    this.turn === 0 && this.addRecord({ inc: 0, end: "開始局面" }), e.restore(), e.save(), e.clearRect(0, 0, t.width, t.height), e.fillStyle = this.canvasBackgroundColor, e.fillRect(0, 0, t.width, t.height), e.fillStyle = this.backgroundColor, e.lineWidth = this.borderWidth, e.strokeStyle = this.borderColor, e.save(), e.translate(a, i), e.fillRect(0, 0, s, n), e.strokeRect(0, 0, s, n), e.translate(r / 2, o / 2), e.strokeRect(0, 0, s - r, n - o), e.restore(), this.stand.draw(), this.field.forEach((l) => {
      l.forEach((c) => {
        c.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** 駒配置をテキストで取得
   * @param {"default"|"compact"|"bod"} mode - テキスト形式
   * @param {boolean} isAlias - エイリアス表示
   * @returns {string}
   */
  getTextPieces(e = "default", t = !1) {
    return e === "bod" ? y.getTextPieces(this) : this.toString(e === "compact", t);
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
  toString(e = !1, t = !1) {
    const { xLen: a } = this;
    let i = "", s = "", n = "", r = "", o = `
`;
    return e || (i = `┏${Array(a).fill("━━").join("┯")}┓
`, s = `
┗${Array(a).fill("━━").join("┷")}┛`, n = "┃", r = "│", o = `
┠${Array(a).fill("──").join("┼")}┨
`), i + this.field.map(
      (l) => n + l.map(
        (c) => c.piece?.toString(t) ?? c.toString(e)
      ).join(r) + n
    ).join(o) + s + this.stand.toString(e);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(e, t, a) {
    await me(this.canvas, e ?? this.name ?? "shogicross", t, a);
  }
  /** オーバーレイの表示を開始します。 */
  startOverlay() {
    this.#n && (this.#n.updatePosition(), this.#n.start());
  }
  /** オーバーレイの表示を停止します。 */
  stopOverlay() {
    this.#n && (this.#n.stop(), this.draw());
  }
  /** 盤面をクローン
   * @returns {Board}
   */
  clone() {
    const e = { ...this.#a, isHeadless: !0 }, t = new Q(null, e);
    return this.field.flat().forEach(({ piece: a, pX: i, pY: s }) => {
      if (!a) return;
      const n = t.field[s][i];
      n.piece = a.clone();
    }), t.stand.clear(), [...this.stand.stocks.values()].flat().forEach((a) => {
      t.stand.add(a.clone());
    }), t.turn = this.turn, t.record = JSON.parse(JSON.stringify(this.record)), t;
  }
}
class I {
  /**
   * @param {Board} board - 対象のボード
   * @param {PlayerInfo} player - プレイヤー情報
   */
  constructor(e, t) {
    this.board = e, this.player = t;
  }
  /** 手番操作 */
  async playTurn() {
  }
  /**
   * 盤面を評価します。
   * @param {Board} board - 評価対象の盤面
   * @returns {number} 盤面の評価値
   */
  evaluate(e = this.board) {
    const { player: t } = this, a = 1e4;
    let i = 0;
    return e.field.flat().forEach((s) => {
      if (s.piece && s.piece.deg === t.deg) {
        const n = s.piece.cost <= 0;
        i += n ? a : s.piece.cost;
      }
    }), e.stand.stocks.forEach((s, n) => {
      if (n === t.deg) {
        const r = s.reduce((o, l) => o + l.cost, 0);
        i += r;
      }
    }), i;
  }
}
const q = {};
q.random = class extends I {
  constructor(e, t) {
    super(e, t);
  }
  async playTurn() {
    const { board: e, player: t } = this, a = [];
    e.field.flat().forEach((s) => {
      if (s.piece && s.piece.deg === t.deg) {
        const n = s, r = R(e, n.piece, n.pX, n.pY);
        r.length > 0 && a.push({ from: n, tos: r });
      }
    });
    const i = [];
    if (a.forEach(({ from: s, tos: n }) => {
      n.forEach((r) => {
        i.push({ from: s, to: r });
      });
    }), i.length > 0) {
      const s = i[Math.floor(Math.random() * i.length)];
      await e.movePiece(s.from, s.to, !0), console.log(`CPU(Random): (${s.from.pX}, ${s.from.pY}) から (${s.to.pX}, ${s.to.pY}) へ移動`);
    } else
      console.log("CPU(Random): 指し手がありません。");
  }
};
q.greedy = class extends I {
  constructor(e, t) {
    super(e, t);
  }
  /**
   * 手番を処理します。
   */
  async playTurn() {
    const { board: e, player: t } = this, a = [];
    e.field.flat().forEach((r) => {
      if (r.piece && r.piece.deg === t.deg) {
        const o = r, l = R(e, o.piece, o.pX, o.pY);
        l.length > 0 && a.push({ from: o, tos: l });
      }
    });
    const i = [];
    if (a.forEach(({ from: r, tos: o }) => {
      o.forEach((l) => {
        i.push({ from: r, to: l });
      });
    }), i.length === 0) {
      console.log("CPU(Greedy): 指し手がありません。");
      return;
    }
    let s = null, n = -1 / 0;
    for (const r of i) {
      const o = e.clone();
      o.isHeadless = !0, o.onGameOver = null;
      const l = o.field[r.from.pY][r.from.pX], c = o.field[r.to.pY][r.to.pX];
      await o.movePiece(l, c);
      const d = this.evaluate(o);
      d > n && (n = d, s = r);
    }
    s ? (await e.movePiece(s.from, s.to, !0), console.log(`CPU(Greedy): (${s.from.pX}, ${s.from.pY}) から (${s.to.pX}, ${s.to.pY}) へ移動 (評価値: ${n})`)) : console.log("CPU(Greedy): 最善手が見つかりませんでした。");
  }
};
q.minimax = class extends I {
  constructor(e, t) {
    super(e, t), this.searchDepth = 3;
  }
  /**
   * ミニマックス法（アルファベータ枝刈り付き）を実行します。
   * @param {Board} board - 現在の盤面
   * @param {number} depth - 残りの探索深さ
   * @param {number} alpha - アルファ値
   * @param {number} beta - ベータ値
   * @param {boolean} isMaximizingPlayer - 現在のプレイヤーが最大化プレイヤーかどうか
   * @returns {number} 評価値
   */
  async minimax(e, t, a, i, s) {
    const n = e.getActivePlayer();
    if (t === 0) return this.evaluate(e);
    if (Ae(e, n.deg))
      return s ? -1 / 0 : 1 / 0;
    if (!ne(e, n.deg))
      return 0;
    const r = [];
    e.field.flat().forEach((l) => {
      if (l.piece && l.piece.deg === n.deg) {
        const c = l, d = R(e, c.piece, c.pX, c.pY);
        d.length > 0 && r.push({ from: c, tos: d });
      }
    });
    const o = [];
    if (r.forEach(({ from: l, tos: c }) => {
      c.forEach((d) => {
        o.push({ from: l, to: d });
      });
    }), s) {
      let l = -1 / 0;
      for (const c of o) {
        const d = e.clone();
        d.isHeadless = !0, d.onGameOver = null;
        const S = d.field[c.from.pY][c.from.pX], u = d.field[c.to.pY][c.to.pX];
        await d.movePiece(S, u, !0);
        const f = await this.minimax(d, t - 1, a, i, !s);
        if (l = Math.max(l, f), a = Math.max(a, f), i <= a) break;
      }
      return l;
    } else {
      let l = 1 / 0;
      for (const c of o) {
        const d = e.clone();
        d.isHeadless = !0, d.onGameOver = null;
        const S = d.field[c.from.pY][c.from.pX], u = d.field[c.to.pY][c.to.pX];
        await d.movePiece(S, u, !0);
        const f = await this.minimax(d, t - 1, a, i, !s);
        if (l = Math.min(l, f), i = Math.min(i, f), i <= a) break;
      }
      return l;
    }
  }
  /**
   * 手番を処理します。
   */
  async playTurn() {
    const { board: e, player: t } = this;
    let a = null, i = -1 / 0;
    const s = [];
    e.field.flat().forEach((r) => {
      if (r.piece && r.piece.deg === t.deg) {
        const o = r, l = R(e, o.piece, o.pX, o.pY);
        l.length > 0 && s.push({ from: o, tos: l });
      }
    });
    const n = [];
    if (s.forEach(({ from: r, tos: o }) => {
      o.forEach((l) => {
        n.push({ from: r, to: l });
      });
    }), n.length === 0) {
      console.log("CPU(Minimax): 指し手がありません。");
      return;
    }
    for (const r of n) {
      const o = e.clone();
      o.isHeadless = !0, o.onGameOver = null;
      const l = o.field[r.from.pY][r.from.pX], c = o.field[r.to.pY][r.to.pX];
      await o.movePiece(l, c, !0);
      const d = await this.minimax(o, this.searchDepth - 1, -1 / 0, 1 / 0, !1);
      d > i ? (i = d, a = r) : d === i && Math.random() < 0.5 && (a = r);
    }
    a ? (await e.movePiece(a.from, a.to, !0), console.log(`CPU(Minimax): (${a.from.pX}, ${a.from.pY}) から (${a.to.pX}, ${a.to.pY}) へ移動 (評価値: ${i})`)) : console.log("CPU(Minimax): 最善手が見つかりませんでした。");
  }
};
class ke extends I {
  /**
   * @param {Board} board - 対象のボード
   * @param {PlayerInfo} player - プレイヤー情報
   */
  constructor(e, t) {
    super(e, t);
    const a = t.cpuEngine?.toLowerCase();
    if (this.engine = a == null ? new I(e, t) : new q[a](e, t), !this.engine) throw new Error(`Engine "${a}" not found.`);
  }
  /** 手番操作 */
  async playTurn() {
    if (this.board.isGameEnd) return;
    if (!this.player.alive) {
      this.board.passTurn(this.player);
      return;
    }
    this.board.autoDrawing && this.board.draw();
    const e = this.player.cpuDelay ?? 0;
    0 < e && (this.board.startOverlay(), await new Promise((t) => setTimeout(t, e))), await this.engine.playTurn(), this.board.stopOverlay(), this.board.autoDrawing && this.board.draw();
  }
}
function Ee(p) {
  Object.assign(P, p.canvasFont), Object.assign(oe, p.gameSoft), Object.assign(_, p.games), Object.assign(V, p.boards), Object.assign(J, p.panels), Object.assign(K, p.pieces), Object.assign(ae, p.pieceRange), Object.assign(Z, p.pieceCost);
}
Ee(de);
const ve = () => [
  .../* @__PURE__ */ new Set([
    ...re.buttonTexts + Object.values(J).map(({ displayText: p }) => p).join("") + Object.values(K).map(({ display: p }) => p ? p.join("") : "").join("")
  ])
].sort().join("");
Object.assign(P, {
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
    if (this.imported) return;
    const p = "https://fonts.googleapis.com/css2?family=", e = ve(), t = Date.now().toString();
    return this.names = P.fonts.map((a) => `"${a[0]}${t}"`).join(",") + ",serif", Promise.all(
      P.fonts.map(async ([a, i]) => {
        const s = a.replace(/ /g, "+"), n = `${p}${s}:wght@${i}&text=${e}`, r = await fetch(n);
        if (!r.ok) return;
        const l = (await r.text()).match(/url\(.+?\)/g);
        if (!l) throw new Error("Not found font.");
        for (const c of l) {
          const d = new FontFace(`${a}${t}`, c);
          document.fonts.add(d), await d.load().catch(() => {
          });
        }
      })
    ).then((a) => this.imported = !0);
  }
});
export {
  Q as Board,
  ke as CpuEngine,
  I as CpuEngineBase,
  q as CpuEngines,
  C as Piece,
  V as boards,
  P as canvasFont,
  H as canvasImage,
  Ee as extendData,
  oe as gameSoft,
  _ as games,
  J as panels,
  Z as pieceCost,
  ae as pieceRange,
  K as pieces
};
//# sourceMappingURL=ShogiCross.js.map
