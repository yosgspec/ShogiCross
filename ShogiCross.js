const v = {
  fonts: [
    ["Noto Serif JP", 900],
    ["Noto Emoji", 400],
    ["Noto Sans Symbols 2", 400],
    ["Noto Sans Symbols", 400],
    ["Noto Serif", 900],
    ["Noto Serif TC", 900],
    ["Noto Color Emoji", 400]
  ]
}, he = {
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
}, D = {
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
        平安将棋: [
          "歩歩歩歩歩歩歩歩歩",
          "・・・・・・・・・",
          "香桂銀金玉金銀桂香"
        ],
        p4: [
          "・・・・歩・・・・",
          "・・・歩飛歩・・・",
          "・・銀金玉金銀・・"
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
        ],
        p4: [
          "・・・・兵・・・・",
          "・・・兵后兵・・・",
          "・・兵聖王塔兵・・"
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
        ],
        p4: [
          "・・・・卒・・・・",
          "・・・卒炮卒・・・",
          "・・相俥帥俥相・・"
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
        ],
        p4: [
          "・・・・卆・・・・",
          "・・・卆漢卆・・・",
          "・・象車包車象・・"
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
        ],
        p4: [
          "・・・・貝・・・・",
          "・・・貝種貝・・・",
          "・・根船公船根・・"
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
        ],
        p4: [
          "・・・・央・・・・",
          "・・・大戦火・・・",
          "・・像臣柱午像・・"
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
}, K = {
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
  "4人用9x9": {
    backgroundColor: "#EECC88",
    borderColor: "#333333",
    field: [
      "BWB<#>BWB",
      "WBW#*#WBW",
      "BWB>#<BWB",
      "<#>==]<#>",
      "#*#===#*#",
      ">#<[==>#<",
      "BWB<#>BWB",
      "WBW#*#WBW",
      "BWB>#<BWB"
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
}, I = {
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
}, Y = {
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
      steps: [
        [
          { enPassant: "通" },
          { default: "歩", attack: "〇" }
        ]
      ]
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
      steps: [
        [
          { start: "塔" },
          { piece: "王", start: "城" }
        ]
      ]
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
      castling: [
        { start: "城" },
        { piece: "塔", start: "塔" }
      ]
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
      default: "王"
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
      default: "獅",
      steps: [
        [
          { default: "王" },
          { default: "王" }
        ]
      ]
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
      default: "鷂",
      steps: [
        [
          { default: "歩" },
          { default: "仲" }
        ]
      ]
    }
  },
  鷲: {
    name: "飛鷲",
    display: ["飛鷲"],
    range: {
      default: "鷲",
      steps: [
        [
          { default: "右" },
          { default: "佑" }
        ],
        [
          { default: "左" },
          { default: "佐" }
        ]
      ]
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
}, re = {
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
    ".A...A.",
    ".A.O.A.",
    ".A...A.",
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
    "..*.*..",
    "..*O*..",
    "..***..",
    ".......",
    "......."
  ],
  鷲: [
    ".......",
    ".A...A.",
    "...*...",
    "..*O*..",
    "..***..",
    ".......",
    "......."
  ],
  右: [
    ".......",
    ".......",
    "....A..",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  佑: [
    ".......",
    ".......",
    "....A..",
    "...O...",
    "..A....",
    ".......",
    "......."
  ],
  左: [
    ".......",
    ".......",
    "..A....",
    "...O...",
    ".......",
    ".......",
    "......."
  ],
  佐: [
    ".......",
    ".......",
    "..A....",
    "...O...",
    "....A..",
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
}, V = {
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
}, ge = "./json/ShogiCross/";
function fe() {
  const p = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  return p && p.content.length > 0;
}
function P(p) {
  if (fe()) return {};
  try {
    const e = new XMLHttpRequest();
    return e.open("GET", `${ge}${p}.json`, !1), e.send(), e.status !== 200 ? {} : JSON.parse(e.responseText);
  } catch {
    return {};
  }
}
const Be = {
  canvasFont: P("canvasFont"),
  gameSoft: P("gameSoft"),
  games: P("games"),
  boards: P("boards"),
  panels: P("panels"),
  pieces: P("pieces"),
  pieceRange: P("pieceRange"),
  pieceCost: P("pieceCost")
};
function ye(p) {
  Object.assign(v, p.canvasFont), Object.assign(he, p.gameSoft), Object.assign(D, p.games), Object.assign(K, p.boards), Object.assign(I, p.panels), Object.assign(Y, p.pieces), Object.assign(re, p.pieceRange), Object.assign(V, p.pieceCost);
}
ye(Be);
function We(p) {
  return new Promise((e) => {
    const t = new Image();
    t.src = p, t.onload = () => e(t);
  });
}
function Ae() {
  return [...new Set(
    Object.values(I).flatMap(({ imgSrc: p }) => p ?? []).concat(Object.values(Y).flatMap(({ imgSrc: p }) => p != null ? Object.values(p) : []).flat())
  )];
}
const $ = {
  /** 読み込み済みであるか?
   * @type {boolean}
   */
  imported: !1,
  /** 読み込んだ画像データ
   * @type {Object<string, HTMLImageElement>}
   */
  images: {},
  /** 画像の読み込み
   * @returns {Promise<void>}
   */
  async importAsync() {
    if (!this.imported)
      return Promise.all(
        Ae().map(async (p) => {
          this.images[p] = await We(p);
        })
      ).then((p) => this.imported = !0);
  }
};
let we = 0, q;
class y {
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
  /** テキスト出力時の最終手番プレイヤー表示
   * @type {Object<string, string>}
   */
  static degLastMoveChars = {
    0: "★",
    90: "◆",
    180: "☆",
    270: "◇"
  };
  /** プレイヤー表示から角度を取得
  * @type {Object<string, number>}
   */
  static charDegs = Object.fromEntries([
    ...Object.entries(y.degChars),
    ...Object.entries(y.degLastMoveChars)
  ].map(([e, t]) => [t, e]));
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
  /** 駒の移動範囲を展開
   * @param {string|string[]|Object<string, any[]>} value
   * @returns {Object<string, any[]>}
   */
  static expandRange = (e) => (
    // 値が文字列で、pieceRangeにキーが存在すれば、実データに置き換える
    typeof e == "string" && y.ranges[e] ? y.ranges[e] : (
      // 値が配列なら、各要素を再帰的に展開
      Array.isArray(e) ? e.map((t) => y.expandRange(t)) : (
        // 値がオブジェクトなら、各プロパティの値を再帰的に展開
        typeof e == "object" && e !== null ? Object.fromEntries(
          Object.entries(e).map(([t, s]) => [t, y.expandRange(s)])
        ) : (
          // それ以外の値（"piece"キーの値など）はそのまま返す
          e
        )
      )
    )
  );
  /** 駒データを初期化
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Piece|PieceInitOption} option - 駒の初期化オプション
   * @returns {Object<string, Piece>}
   */
  static getPieces(e, t = {}) {
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(Y))));
    for (const [a, n] of s)
      n.range = y.expandRange(n.range);
    for (const [a, n] of s)
      n.attr ??= [], n.unit && n.unit !== "成" && (n.base = n);
    for (const [a, n] of s) {
      if (!n.promo || typeof n.promo != "string") continue;
      const r = [...n.promo];
      n.promo = {};
      for (const o of r) {
        const l = s.get(o);
        l.attr.push("promoted"), l.unit = "成", n.promo[o] = l, s.set(o, { ...n, ...l });
      }
    }
    [...s].forEach(([a, n], r) => {
      n.sortId = r, n.char = a, s.set(a, new y(e, n, t));
    });
    const i = Object.fromEntries(s);
    for (const [a, n] of s)
      n.alias.forEach((r, o) => {
        if (i[r]) return;
        const l = n.clone(), d = [...l.display];
        l.displayPtn = o + 1, l.display = d, i[r] = l;
      });
    return i;
  }
  /** 文字列から駒を取得
   * @param {Object<string, Piece|PieceInitOption>} pieces - 駒の一覧
   * @param {string} text - 駒文字列
   * @returns {Piece}
   */
  static stringToPiece(e, t) {
    if (!t) return null;
    const [s, i] = [...t], a = y.charDegs[s];
    if (!a || !e[i]) return null;
    const n = e[i].clone();
    return n.deg = a, n;
  }
  /** 駒の一覧をリストで取得
   * @param {Object<string,Piece>} pieces
   * @returns {Piece[]}
   */
  static piecesToList(e) {
    return Object.entries(e).sort(([t, { id: s }], [i, { id: a }]) => Math.sign(s - a));
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
    return this.useRankSize && (e *= y.rankRatio[this.rank]), e;
  }
  /** 移動範囲を二次元配列で取得
   * @returns {string[][]|Object<string,any>}
   */
  static get ranges() {
    return q || (q = Object.fromEntries(
      Object.entries(re).map(([e, t]) => [e, t.map((s) => [...s])])
    ));
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
  constructor(e, t, s = {}) {
    const {
      displayPtn: i = 0,
      deg: a = 0,
      size: n = y.size,
      useRankSize: r = y.useRankSize,
      isDrawShadow: o = y.isDrawShadow,
      isMoved: l = !1
    } = s;
    Object.assign(this, t), this.id = we++, this.ctx = e, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn ??= i, this.game = D[this.gameName], this.gameId = [...Object.keys(D)].indexOf(this.gameName), this.cost = V[this.char] ?? V[this.base.char] ?? 1, this.center = 0, this.middle = 0, this.deg ||= a, this.size ??= n, this.useRankSize ??= r, this.isDrawShadow ??= o, this.isRotateImg ??= !0, this.isMoved = l, this.isSelected = !1, this.attr ??= [];
    try {
      this.range = y.expandRange(this.range);
    } catch (d) {
      throw console.error(d), t;
    }
  }
  /** 駒をクローン
   * @returns {Piece}
   */
  clone() {
    const { displayPtn: e, deg: t, size: s, isMoved: i } = this;
    return new y(this.ctx, { ...this }, { displayPtn: e, deg: t, size: s, isMoved: i });
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
    if (e === 0) return t;
    if (![90, 180, 270].includes(e)) throw Error(`deg=${e}, deg need multiple of 90.`);
    const s = (i) => {
      if (Array.isArray(i) && typeof i[0][0] == "string") {
        let a = i;
        return [90, 270].includes(e) && (a = ((r) => r[0].map((o, l) => r.map((d) => d[l])))(a)), [180, 270].includes(e) && a.reverse(), a.forEach((n) => {
          [90, 180].includes(e) && n.reverse();
        }), a;
      }
      return Array.isArray(i) ? i.map((a) => s(a)) : typeof i == "object" && i !== null ? Object.fromEntries(
        Object.entries(i).map(([a, n]) => [a, s(n)])
      ) : i;
    };
    return s(t);
  }
  /** 駒/マスクを描写 */
  async draw() {
    if (!this.ctx) return;
    const e = "#FF000055";
    this.imgSrc && $.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(e)) : (this.drawPiece(), this.isSelected && this.drawMask(e));
  }
  /** 駒画像を描写 */
  drawImage() {
    if (!this.ctx) return;
    const { ctx: e, size: t, deg: s } = this, i = this.imgSrc[s][this.displayPtn] ?? this.imgSrc[0][this.displayPtn], a = $.images[i];
    if (!a) return;
    e.save(), e.translate(this.center, this.middle), this.isRotateImg && e.rotate(this.rad);
    let n, r;
    a.width * 0.9 < a.height ? (n = a.width / a.height * t, r = t) : (n = t, r = a.height / a.width * t), e.drawImage(a, -n / 2, -r / 2, n, r), e.restore();
  }
  /** 駒画像にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMaskImage(e) {
    if (!this.ctx) return;
    const { ctx: t, size: s } = this;
    t.fillStyle = e, t.save();
    const i = s * 0.9, a = s;
    t.translate(this.center, this.middle), t.fillRect(-i / 2, -a / 2, i, a), t.restore();
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
  /** 駒に最終手を描写 */
  drawLastMove() {
    const { ctx: e, zoom: t } = this;
    e.save(), this.drawMask("#FF660099", t * 1.3), e.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    if (!this.ctx) return;
    const { ctx: e, game: t, zoom: s } = this;
    let i, a, n;
    this.hasAttr("promoted") ? (i = t.promoteFontColor ?? t.fontColor ?? "#000000", a = t.promoteBackgroundColor ?? t.backgroundColor ?? "#FFFFFF", n = t.promoteBorderColor ?? t.borderColor ?? "#FF3300") : (i = t.fontColor ?? "#000000", a = t.backgroundColor ?? "#FFFFFF", n = t.borderColor ?? "#777777"), e.strokeStyle = n, e.fillStyle = a, e.lineWidth = 8 * s, this.drawPieceShadow(s), e.save(), this.makePath(s), e.stroke(), e.fill(), e.fillStyle = i;
    const r = [..."" + this.display[this.displayPtn]], o = 40 * s;
    e.font = `${o}px ${v.names}`, e.textAlign = "center", r.forEach((l, d) => {
      const c = r.length === 1 ? o / 2 : d * o;
      e.fillText(l, 0, c);
    }), e.restore();
  }
  /** 駒にマスクを描写
   * @param {string} color - カラーエフェクトの色
  * @param {number} zoom - マスクの拡大率
   */
  drawMask(e, t = this.zoom) {
    if (!this.ctx) return;
    const { ctx: s } = this;
    s.fillStyle = e, s.save(), this.makePath(t), s.fill(), s.restore();
  }
  /** 文字列形式で取得
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1) {
    const { displayPtn: t } = this, s = !e || t === 0 ? this.char : this.alias[t - 1];
    return y.degChars[this.deg] + s;
  }
}
class F {
  #e;
  #t;
  #s;
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
  constructor(e, t, s, i, a, n, r, o, l) {
    Object.assign(this, I[t]), this.ctx = e, this.center = s, this.middle = i, this.width = a, this.height = n, this.left = s - a / 2, this.top = i - n / 2, this.right = s + a / 2, this.bottom = i + n / 2, this.pX = r, this.pY = o, this.borderWidth = l, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.attr ??= [], this.piece = null, this.isSelected = !1, this.clearTarget();
  }
  /** マス目の選択状態
   * @param {boolean} value
   */
  set isSelected(e) {
    this.#t = this.hasAttr("keepOut") ? !1 : e;
  }
  get isSelected() {
    return this.#t;
  }
  /** マス目の移動可能判定
   * @returns {boolean}
   */
  get isTarget() {
    return 0 < this.#s.length;
  }
  /** マス目の移動先情報をクリア */
  clearTarget() {
    this.#s = [];
  }
  /** マス目の移動先情報を追加
   * @param {string} rangeName - 移動先情報
   */
  addTarget(e) {
    this.#s.push(e);
  }
  /** マス目が移動先情報を持っているか判定
   * @param {string} rangeName - 移動先情報
   * @returns {boolean}
   */
  hasTarget(e) {
    return this.#s.includes(e);
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
  draw(e = -1) {
    if (!this.ctx) return;
    const { selectColor: t, targetColor: s } = this;
    this.imgSrc && $.imported ? this.drawImage() : this.drawPanel(), this.isSelected && this.drawMask(t), this.isTarget && this.drawMask(s), this.piece?.id === e && this.piece?.drawLastMove(), this.piece?.draw();
  }
  /** マス目画像を描写 */
  drawImage() {
    if (!this.ctx) return;
    const { ctx: e } = this, t = this.imgSrc, s = $.images[t];
    s && (e.save(), e.translate(this.left, this.top), e.drawImage(s, 0, 0, this.width, this.height), e.restore());
  }
  /** マス目を描写 */
  drawPanel() {
    if (!this.ctx) return;
    const { ctx: e, left: t, top: s, center: i, middle: a, width: n, height: r, displayText: o, textRotate: l } = this;
    if (e.fillStyle = this.backgroundColor, e.strokeStyle = this.borderColor, e.lineWidth = this.borderWidth, e.save(), e.translate(t, s), e.fillRect(0, 0, n, r), this.intersect ? (e.lineWidth = this.borderWidth, e.beginPath(), e.moveTo(n / 2, 0), e.lineTo(n / 2, r), e.moveTo(0, r / 2), e.lineTo(n, r / 2), e.closePath(), e.stroke()) : e.strokeRect(0, 0, n, r), e.lineWidth = this.borderWidth / 2, e.beginPath(), this.borderSlashLeft && (e.moveTo(0, 0), e.lineTo(n, r)), this.borderSlashRight && (e.moveTo(n, 0), e.lineTo(0, r)), e.closePath(), e.stroke(), e.restore(), o) {
      e.save(), e.translate(i, a), e.fillStyle = this.borderColor;
      const d = l ? l * Math.PI / 180 : 0;
      e.rotate(d);
      const c = Math.min(this.width, this.height) * 0.6;
      e.font = `${c}px ${v.names}`;
      const S = e.measureText(o).width, h = c / 2 * 0.8;
      e.fillText(o, -S / 2, h), e.restore();
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
class G {
  /** 駒台への角度ごとの表示順
   * @type {number[]}
   */
  static #e = [180, 90, 270, 0];
  /**
   * @param {Board} board - 盤面
   */
  constructor(e) {
    this.board = e;
    const { top: t, right: s, bottom: i, width: a, height: n, panelWidth: r, panelHeight: o, xLen: l, yLen: d } = e;
    this.clear(), this.left = s * 1.02, this.top = t, this.width = a / 2, this.height = n, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = r / 2, this.pitchHeight = o, this.xLen = l, this.yLen = d;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = new Map(G.#e.map((e) => [e, []]));
  }
  /** 持ち駒からボード上に配置する
   * @param {Panel} toPanel - 配置先のパネル
   * @param {Object} option - オプション
   * @param {number} option.deg - 角度
   * @param {number} option.i - 配置する持ち駒のインデックス
   * @param {boolean} isCpuDrop - CPUによる駒配置であるか
   */
  dropPiece(e, t = {}, s = !1) {
    const { board: i } = this, { moveMode: a, displayDeg: n } = i, r = i.getActivePlayer(), { deg: o, i: l } = t, d = this.stocks.get(o), c = d[l];
    if (!(e instanceof F) || !(c instanceof y) || a === "viewOnly" || e.hasAttr("keepOut") || !s && a === "vs" && r.deg !== o + n) return !1;
    if (c instanceof y)
      return e.piece = c, c.center = e.center, c.middle = e.middle, d.splice(l, 1), i.record.add({ toPanel: e, end: "打" }), !0;
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(e) {
    const t = this.stocks.get(e.deg);
    e.turnFront(), t.push(e), t.sort((s, i) => Math.sign(s.sortId - i.sortId));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   * @param {boolean} forceCapture - 属性を無視して捕縛する
   * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
   */
  capturePiece(e, t, s = !1, i = !1) {
    i || !t || !(s || e.hasAttr("capture")) || t.hasAttr("king") || t.hasAttr("cantCapture") || (t.deg = e.deg, t.isMoved = !0, this.add(t));
  }
  /** 持ち駒の所有権を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  rotate(e) {
    [...this.stocks].forEach(([t, s]) => {
      const i = this.board.degNormal(t + e);
      s.forEach((a) => a.deg = i), this.stocks.set(i, s);
    });
  }
  /** 駒台を描写 */
  draw() {
    const { board: e, left: t, top: s, width: i, height: a, pitchWidth: n, pitchHeight: r } = this, { ctx: o, xLen: l, yLen: d, playerLen: c } = e;
    o.fillStyle = e.backgroundColor, o.strokeStyle = e.borderColor, o.lineWidth = e.borderWidth, o.save(), o.translate(t, s), o.fillRect(0, 0, i, a), o.strokeRect(0, 0, i, a), o.restore(), [...this.stocks.values()].forEach((S, h) => {
      let f = 0;
      S = S.slice(-d / 4 * l);
      let A = null;
      for (let u = 0 | d / 4 * h; u < d / 4 * (h + 1); u++)
        for (let g = 0; g < l; g++) {
          const m = t + n * (g + 1), B = s + r * (u + 1), w = S[f++];
          if (w == null) break;
          w.center = m, w.middle = B, w.draw(), w.isSelected && c === 4 && (A = w);
        }
      A?.draw();
    });
  }
  /** 駒台をテキスト形式で取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, t = !1) {
    const { xLen: s } = this.board, i = [...this.stocks.values()].flat().filter((r) => r);
    let a = 0 < i.length ? `
` + "―".repeat(s * 2) + `
` : "", n = i.map((r) => r.toString(t)).join("");
    if (!e) {
      a = "";
      for (const r of Object.values(y.degChars))
        n = n.replace(r, `
${r}持駒：${r}`);
    }
    return a + n;
  }
}
const Ce = (p) => "image/" + p.replace("jpg", "jpeg");
async function xe(p, e = "image", t = "png", s = "base64") {
  const i = Ce(t), a = document.createElement("a");
  let n;
  s === "blob" ? n = URL.createObjectURL(
    await new Promise((r) => p.toBlob(r), i)
  ) : n = p.toDataURL(i), a.href = n, a.download = `${e}.${t}`, a.click(), s === "blob" && URL.revokeObjectURL(a.href);
}
function be(p, e = "text", t = "txt", s = "base64") {
  const i = "text/plain", a = document.createElement("a");
  let n;
  s === "blob" ? n = URL.createObjectURL(new Blob([p], { type: i })) : n = `data:${i};charset=utf-8,${encodeURIComponent(p)}`, a.href = n, a.download = `${e}.${t}`, a.click(), s === "blob" && URL.revokeObjectURL(a.href);
}
class ke {
  #e = 0;
  /**
   * @param {Board} board
   */
  constructor(e) {
    this.board = e, this.turn = 0, this.records = [], this.add({ inc: 0, end: "開始局面" });
  }
  /** 棋譜の最後を取得 */
  get last() {
    return this.records[this.turn];
  }
  /** 棋譜を追記
   * @param {Object} option - オプション
   * @param {Panel} option.fromPanel - 移動元のマス目
   * @param {Panel} option.toPanel - 移動先のマス目
   * @param {string} option.end - オプション=成|不成|打
   * @param {number} option.inc - 手数の増分
   */
  add(e = {}) {
    const { board: t, records: s } = this, { fromPanel: i = {}, toPanel: a = {}, end: n = "", inc: r = 1 } = e, { piece: o = {} } = a;
    (this.turn += r) === 0 && 0 < s.length || t.isHeadless || (s[this.turn] = {
      moves: [{
        from: {
          pX: i.pX,
          pY: i.pY
        },
        to: {
          pX: a.pX,
          pY: a.pY
        }
      }],
      deg: o.deg,
      pieceChar: o.char,
      pieceId: o.id,
      end: n,
      fieldText: t.getTextPieces("compact", !0),
      fieldPieceIds: t.field.map(
        (l) => l.map(
          ({ piece: d }) => d?.id
        )
      ),
      fieldMoved: t.field.map(
        (l) => l.map(
          ({ piece: d }) => d?.isMoved ? 1 : 0
        )
      )
    }, 0 < r && s.splice(this.turn + 1), this.#e !== this.turn && (this.#e = this.turn, t.onTurnEnd?.(t, this.turn), setTimeout(() => t.getActivePlayer().cpu.playTurn(), 0)));
  }
  /** 棋譜コメントを追記
   * @param {string} comment - 棋譜コメント
   * @param {number} shiftTurn - ずらす手数
   */
  addComment(e, t = 0) {
    this.records[this.turn + t].comment = e;
  }
  /** 記録の参照手数を切り替える
   * @param {number} inc - 切り替えたい手数の差分
   */
  #t(e) {
    const { records: t } = this;
    t[this.turn + e] && (this.turn += e, this.restoreField());
  }
  /** 記録の手を戻す */
  undo() {
    this.#t(-1);
  }
  /** 記録の手を進める */
  redo() {
    this.#t(1);
  }
  /** 記録の手を移動
   * @param {number} turn - 手数
   */
  jump(e) {
    this.turn = e, this.#t(0);
  }
  /** 記録を復元する */
  restoreField() {
    const { board: e, records: t, turn: s } = this, { fieldText: i, fieldPieceIds: a, fieldMoved: n } = t[s];
    e.setTextPieces(i), e.field.forEach(
      (r, o) => r.forEach(({ piece: l }, d) => {
        l && (l.id = a[o][d], l.isMoved = !!n[o][d]);
      })
    ), e.autoDrawing && e.draw();
  }
  /** 局面の記録を文字列に変換
   * @param {number} turn - 手数
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  getText(e, t = !1) {
    const { board: s } = this, { moves: i, deg: a, pieceChar: n, end: r } = this.records[e];
    if (i[0].to.pX == null) return `${e}: ${r}`;
    const o = ({ pX: c }) => (s.xLen - c).toString(t ? 10 : 36), l = ({ pY: c }) => (c + 1).toString(t ? 10 : 36), d = t ? "," : "";
    return `${e}: ${y.degChars[a]}${i.map(
      ({ from: c, to: S }) => `${o(S)}${d}${l(S)}${n}${r}${c.pX === void 0 ? "" : ` (${o(c)}${d}${l(c)})`}`
    ).join("")}`;
  }
  /** 表示用の棋譜を取得
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  getTextAll(e = !1) {
    return [...Array(this.turn + 1).keys()].map(
      (t) => this.getText(t, e)
    ).join(`
`);
  }
  /** 棋譜データを取得
   * @param {boolean} isEncode - エンコード有無
   * @returns {string}
   */
  getJson(e = !0) {
    const t = JSON.stringify(this.records, null, "");
    return e ? encodeURI(t) : t;
  }
  /** 棋譜データを入力
   * @param {string} record - 棋譜データ
   * @param {number} turn - 手数
   */
  setJson(e, t) {
    this.records = JSON.parse(decodeURI(e)), this.jump(t ?? this.records.length - 1);
  }
  /** 棋譜コメントを取得
   * @param {number} shiftTurn - ずらす手数
   * @returns {string}
   */
  getComment(e = 0) {
    return this.records[this.turn + e] ?? "";
  }
  /** 棋譜をダウンロード
   * @param {boolean} isNumOnly - 座標を数字で表現
   */
  download(e = !1) {
    be(this.getTextAll(e), "record");
  }
}
const ie = {
  default: { isAttack: !1 },
  attack: { isAttack: !0 },
  start: { isAttack: !1 },
  enPassant: { isAttack: !0 },
  palaceSlash: { isAttack: !1 },
  palaceSlash$Attack: { isAttack: !0 }
}, Ee = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], ve = [
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
], oe = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let p = 1; p <= 9; p++)
  oe.push(["" + p, { moves: p }]);
function Ne(p) {
  const e = [];
  let t, s;
  for (let i = 0; i < p.length; i++)
    for (let a = 0; a < p[i].length; a++) {
      const n = p[i][a];
      for (let [r, { isOwn: o }] of Ee)
        n === r && (e.push({ isOwn: o, oX: a, oY: i }), o && ([t, s] = [a, i]));
    }
  return e.map((i) => (i.offsetX = i.oX - t, i.offsetY = i.oY - s, i));
}
function M(p, e, t, s) {
  const i = [], { field: a, yLen: n, enPassant: r } = p;
  function o(u, g) {
    return a[g] && a[g][u] && !a[g][u].hasAttr("keepOut");
  }
  function l(u) {
    return u.piece && e.hasAttr("po") && u.piece.hasAttr("po");
  }
  function d(u) {
    return u.piece && !e.isMoved && !u.piece.isMoved && e.hasAttr("pao") && e.cost < u.piece.cost;
  }
  function c(u, g, m, B = "", w = !0) {
    if (!a[m] || !a[m][g]) return !1;
    const E = a[m][g];
    return !E || l(E) || d(E) || B === "enPassant" && !r.isTarget(E, e) || e.hasAttr("inPalace") && !E.hasAttr("palace") || B.indexOf("palace") === 0 && !(E.hasAttr(B) && a[s][t].hasAttr(B)) || e.hasAttr("unCrossRiver") && n - (0 | n / 2) <= p.getRow(g, m, e.deg) ? !1 : u ? a[m][g].piece ? w ? e.deg !== a[m][g].piece.deg : !0 : !1 : !a[m][g].piece;
  }
  function S(u, g, m, B, w) {
    for (const E of g)
      for (let W = 0; W < u.length; W++)
        for (let b = 0; b < u[W].length; b++) {
          const [x, k] = [b + t - B, W + s - w];
          if (!(!o(x, k) || c(m, 0 | x, 0 | k, "", !1) || u[W][b] !== E))
            return !0;
        }
    return !1;
  }
  function h(u, g, m) {
    const B = a[m][g];
    B.addTarget(u), r.setTarget(B, e), i.push(B);
  }
  function f(u, [g, { isAttack: m }], { oX: B, oY: w, isOwn: E }) {
    if (E)
      for (const [W, { child: b = [] } = {}] of ve)
        for (let x = 0; x < u.length; x++)
          for (let k = 0; k < u[x].length; k++) {
            const [N, O] = [k + t - B, x + s - w];
            !o(N, O) || !c(m, N, O, g) || u[x][k] !== W || S(u, b, !1, B, w) || h(g, N, O);
          }
  }
  function A(u, [g, { isAttack: m }], { oX: B, oY: w, isOwn: E, offsetX: W, offsetY: b }) {
    if (!(!E && !c(!1, t + W, s + b)))
      for (const [x, { jmps: k = 0, moves: N = 0 } = {}] of oe) {
        const O = !N || N === 0;
        for (let L = w - 1; L <= w + 1; L++)
          for (let j = B - 1; j <= B + 1; j++) {
            if (u[L][j] !== x || j === B && L === w) continue;
            let ee = k || 0, z = N || 0;
            const [me, ue] = [j - B, L - w];
            for (let te = t, se = s; ; ) {
              te += me, se += ue;
              const R = te + W, T = se + b;
              if (!o(R, T) || !O && z === 0) break;
              const J = ee === 0;
              J && c(m, R, T, g, J) ? (z--, h(g, R, T)) : k < 1 && z--;
              const ae = a[T][R];
              if (ae.piece && (ee--, J || l(ae)))
                break;
            }
          }
      }
  }
  return (function() {
    const u = e.getRange();
    u.attack ??= u.default, u.palaceSlash && (u.palaceSlash$Attack = u.palaceSlash);
    for (const g in u) {
      const m = u[g];
      if (!Array.isArray(m)) continue;
      const B = Array.isArray(m[0]) && typeof m[0][0] == "string" ? [[{ [g]: m }]] : Array.isArray(m[0]) ? m : [m];
      for (const w of B) {
        const E = w[0];
        if (!E.piece)
          for (const W in E) {
            const b = W.indexOf("$"), x = b === -1 ? W : W.substring(0, b), k = E[W];
            if (!k || !ie[W] || e.isMoved && ["start", "castling"].includes(x)) continue;
            const N = [x, ie[W]];
            for (const O of Ne(k))
              f(k, N, O), A(k, N, O);
          }
      }
    }
  })(), i;
}
function le(p, e) {
  let t = p.field.flat().filter(
    (i) => i.piece?.deg === e && i.piece.hasAttr("king")
  );
  if (t.length !== 1) return !1;
  const s = t[0];
  for (const i of p.field.flat()) {
    if (!i.piece || i.piece.deg === e) continue;
    if (M(p, i.piece, i.pX, i.pY).some(
      ({ pX: n, pY: r }) => n === s.pX && r === s.pY
    )) return !0;
  }
  return !1;
}
function de(p, e) {
  for (const t of p.field.flat()) {
    if (!t.piece || t.piece.deg !== e) continue;
    const s = M(p, t.piece, t.pX, t.pY);
    for (const i of s) {
      const a = p.cloneCore();
      if (a.simpleMovePiece(
        a.field[t.pY][t.pX],
        a.field[i.pY][i.pX]
      ), !le(a, e)) return !0;
    }
  }
  return !1;
}
function Oe(p, e) {
  return le(p, e) && !de(p, e);
}
class H {
  /**
   * @param {Board} board - 対象の盤面
   * @param {PlayerInfo} player - プレイヤー情報
   */
  constructor(e, t) {
    this.board = e, this.player = t;
  }
  /** 手番操作 */
  async playTurn() {
  }
  /** CPU操作の待機開始
   * @returns {Promise<()=>Promise<void>>}
   */
  delayStart() {
    return this.board.overlay.start(), new Promise((e) => setTimeout(e, 50)).then(() => () => new Promise((e) => setTimeout(e, this.player.cpuDelay)));
  }
  /** CPU操作の待機終了
   * @param {Promise<void>} timer
   */
  async delayEnd(e) {
    await e, this.board.overlay.stop();
  }
  /**
   * 盤面を評価します。
   * @param {Board} board - 評価対象の盤面
   * @returns {number} 盤面の評価値
   */
  evaluate(e = this.board) {
    const { player: t } = this, s = 1e4;
    let i = 0;
    return e.field.flat().forEach((a) => {
      if (a.piece && a.piece.deg === t.deg) {
        const n = a.piece.cost <= 0;
        i += n ? s : a.piece.cost;
      }
    }), e.stand.stocks.forEach((a, n) => {
      if (n === t.deg) {
        const r = a.reduce((o, l) => o + l.cost, 0);
        i += r;
      }
    }), i;
  }
}
const U = {};
U.random = class extends H {
  constructor(e, t) {
    super(e, t);
  }
  async playTurn() {
    const { board: e, player: t } = this, s = (await this.delayStart())(), i = [];
    e.field.flat().forEach((n) => {
      if (n.piece && n.piece.deg === t.deg) {
        const r = n, o = M(e, r.piece, r.pX, r.pY);
        o.length > 0 && i.push({ from: r, tos: o });
      }
    });
    const a = [];
    if (i.forEach(({ from: n, tos: r }) => {
      r.forEach((o) => {
        a.push({ from: n, to: o });
      });
    }), a.length > 0) {
      const n = a[Math.floor(Math.random() * a.length)];
      await this.delayEnd(s), await e.movePiece(n.from, n.to, !0), console.log(`CPU(Random): (${n.from.pX}, ${n.from.pY}) から (${n.to.pX}, ${n.to.pY}) へ移動`);
    } else
      console.log("CPU(Random): 指し手がありません。");
  }
};
U.greedy = class extends H {
  constructor(e, t) {
    super(e, t);
  }
  /**
   * 手番を処理します。
   */
  async playTurn() {
    const { board: e, player: t } = this, s = (await this.delayStart())(), i = [];
    e.field.flat().forEach((o) => {
      if (o.piece && o.piece.deg === t.deg) {
        const l = o, d = M(e, l.piece, l.pX, l.pY);
        d.length > 0 && i.push({ from: l, tos: d });
      }
    });
    const a = [];
    if (i.forEach(({ from: o, tos: l }) => {
      l.forEach((d) => {
        a.push({ from: o, to: d });
      });
    }), a.length === 0) {
      console.log("CPU(Greedy): 指し手がありません。");
      return;
    }
    let n = null, r = -1 / 0;
    for (const o of a) {
      const l = e.cloneCore(), d = l.field[o.from.pY][o.from.pX], c = l.field[o.to.pY][o.to.pX];
      await l.movePiece(d, c);
      const S = this.evaluate(l);
      S > r && (r = S, n = o);
    }
    n ? (await this.delayEnd(s), await e.movePiece(n.from, n.to, !0), console.log(`CPU(Greedy): (${n.from.pX}, ${n.from.pY}) から (${n.to.pX}, ${n.to.pY}) へ移動 (評価値: ${r})`)) : console.log("CPU(Greedy): 最善手が見つかりませんでした。");
  }
};
U.minimax = class extends H {
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
   * @returns {Promise<number>} 評価値
   */
  async minimax(e, t, s, i, a) {
    const n = e.getActivePlayer();
    if (t === 0) return this.evaluate(e);
    if (Oe(e, n.deg))
      return a ? -1 / 0 : 1 / 0;
    if (!de(e, n.deg))
      return 0;
    const r = [];
    e.field.flat().forEach((l) => {
      if (l.piece && l.piece.deg === n.deg) {
        const d = l, c = M(e, d.piece, d.pX, d.pY);
        c.length > 0 && r.push({ from: d, tos: c });
      }
    });
    const o = [];
    if (r.forEach(({ from: l, tos: d }) => {
      d.forEach((c) => {
        o.push({ from: l, to: c });
      });
    }), a) {
      let l = -1 / 0;
      for (const d of o) {
        const c = e.cloneCore(), S = c.field[d.from.pY][d.from.pX], h = c.field[d.to.pY][d.to.pX];
        await c.movePiece(S, h, !0);
        const f = await this.minimax(c, t - 1, s, i, !a);
        if (l = Math.max(l, f), s = Math.max(s, f), i <= s) break;
      }
      return l;
    } else {
      let l = 1 / 0;
      for (const d of o) {
        const c = e.cloneCore(), S = c.field[d.from.pY][d.from.pX], h = c.field[d.to.pY][d.to.pX];
        await c.movePiece(S, h, !0);
        const f = await this.minimax(c, t - 1, s, i, !a);
        if (l = Math.min(l, f), i = Math.min(i, f), i <= s) break;
      }
      return l;
    }
  }
  /**
   * 手番を処理します。
   */
  async playTurn() {
    const { board: e, player: t } = this, s = (await this.delayStart())();
    let i = null, a = -1 / 0;
    const n = [];
    e.field.flat().forEach((o) => {
      if (o.piece && o.piece.deg === t.deg) {
        const l = o, d = M(e, l.piece, l.pX, l.pY);
        d.length > 0 && n.push({ from: l, tos: d });
      }
    });
    const r = [];
    if (n.forEach(({ from: o, tos: l }) => {
      l.forEach((d) => {
        r.push({ from: o, to: d });
      });
    }), r.length === 0) {
      console.log("CPU(Minimax): 指し手がありません。");
      return;
    }
    for (const o of r) {
      const l = e.cloneCore(), d = l.field[o.from.pY][o.from.pX], c = l.field[o.to.pY][o.to.pX];
      await l.movePiece(d, c, !0);
      const S = await this.minimax(l, this.searchDepth - 1, -1 / 0, 1 / 0, !1);
      S > a ? (a = S, i = o) : S === a && Math.random() < 0.5 && (i = o);
    }
    i ? (await this.delayEnd(s), await e.movePiece(i.from, i.to, !0), console.log(`CPU(Minimax): (${i.from.pX}, ${i.from.pY}) から (${i.to.pX}, ${i.to.pY}) へ移動 (評価値: ${a})`)) : console.log("CPU(Minimax): 最善手が見つかりませんでした。");
  }
};
class Xe extends H {
  /** @typedef {Object} CpuEngineBase */
  /** @type {CpuEngineBase} */
  engine;
  /**
   * @param {Board} board - 対象の盤面
   * @param {PlayerInfo} player - プレイヤー情報
   */
  constructor(e, t) {
    super(e, t);
    const s = t.cpuEngine?.toLowerCase();
    this.engine = s == null ? null : new U[s](e, t);
  }
  /** 手番操作 */
  async playTurn() {
    if (!this.board.isGameEnd) {
      if (!this.player.alive) {
        this.board.passTurn(this.player);
        return;
      }
      this.engine && await this.engine.playTurn();
    }
  }
}
const Pe = Object.keys(y.degChars), ne = () => ({ pX: null, pY: null, pieceId: null });
class Z {
  /** @typedef {Object} EnPassant */
  constructor() {
    this.degs = {}, Pe.forEach((e) => this.degs[e] = ne());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(e) {
    this.degs[e] = ne();
  }
  /** アンパッサン対象と成りうるマス情報を記録
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   */
  setTarget(e, t) {
    if (e.hasTarget("start") && t.hasAttr("enPassant")) {
      const s = this.degs[t.deg];
      s.pX = e.pX, s.pY = e.pY;
    }
  }
  /** アンパッサン対象と成りうる駒情報を記録
   * @param {Panel} toPanel - アンパッサン対象か確認するマス目
   */
  setMoved(e) {
    const { piece: t, pX: s, pY: i } = e, a = this.degs[t.deg];
    t && s === a.pX && i === a.pY ? a.pieceId = t.id : this.clear(t.deg);
  }
  /** アンパッサン対象のマスか確認する
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   * @returns {boolean}
   */
  isTarget(e, t) {
    return !e || !e.piece ? !0 : e.piece.hasAttr("enPassant") ? e.piece.id === this.degs[e.piece.deg].pieceId : !1;
  }
  /**
   * アンパッサンの状態をクローンします。
   * @returns {EnPassant}
   */
  clone() {
    const e = new Z();
    return e.degs = JSON.parse(JSON.stringify(this.degs)), e;
  }
}
class C {
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
   * @type {Map<number, RegExp>}
   */
  static #t = new Map(
    [...C.#e].map(([e, t]) => [e, new RegExp(t, "g")])
  );
  /** 駒の文字から角度表示
   * @type {Map<string, number>}
   */
  static #s = new Map(
    [...C.#e].map(([e, t]) => [t, e])
  );
  /** 角度から持駒の表題表示
   * @type {Map<number, string>}
   */
  static #a = /* @__PURE__ */ new Map([
    [0, "先手の持駒"],
    [90, "次手の持駒"],
    [180, "後手の持駒"],
    [270, "四手の持駒"]
  ]);
  /** 持駒の表題から角度表示
   * @type {Map<string, number>}
   */
  static #n = new Map(
    [...C.#a].map(([e, t]) => [t, e])
  );
  static #i = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  static #r = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"];
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static #o(e, t = !0) {
    if (!t && e <= 1) return "";
    const s = e % 10, i = 0 | e / 10;
    return C.#r[i] + C.#i[s];
  }
  /** 行/持駒用の数字表示(漢数字)
   * @param {string} kan - 漢数字
   * @param {boolean} emptyOne - 空文字を1とする
   * @returns {number}
   */
  static #d(e, t = !0) {
    if (t && e === "") return 1;
    if (!isNaN(e)) return 0 | e;
    let s = C.#r.findIndex(
      (a) => a !== "" && new RegExp("^" + a).test(e)
    );
    s < 0 && (s = 0);
    let i = C.#i.findIndex(
      (a) => a !== "" && new RegExp(a + "$").test(e)
    );
    return i < 0 && (i = 0), s * 10 + i;
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static #c(e) {
    if (10 <= e) return e;
    const t = "０１２３４５６７８９", s = e % 10;
    return t[s];
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
    return e ? C.#e.get(e.deg) + e.char : C.#p;
  }
  /** 駒台のBOD表記
   * @param {Stand} stand - 駒台
   * @param {number} deg - 角度
   * @returns {string}
   */
  static #l(e, t = 0) {
    const s = /* @__PURE__ */ new Map();
    return e.stocks.get(t).forEach(({ char: i }) => {
      s.has(i) || s.set(i, 0), s.set(i, s.get(i) + 1);
    }), C.#a.get(t) + "：" + [...s].map(
      ([i, a]) => i + C.#o(a, !1)
    ).join(" ");
  }
  /** BOD形式のテキストをボードで扱えるよう変換
   * @param {string} text - BOD形式のテキスト
   * @returns {string}
   */
  static convTextPieces(e) {
    const t = [], s = [];
    e.split(/\r|\n|\r\n/).forEach((n) => {
      [...C.#n.keys()].some((r) => new RegExp(`^${r}`).test(n)) ? s.push(n) : t.push(n.slice(1));
    });
    let i = t.slice(2, -1).join(`
`);
    C.#t.forEach((n, r) => {
      i = i.replace(n, y.degChars[r]);
    });
    const a = s.flatMap((n) => {
      const [r, o] = n.split(/：/);
      if (o === "") return "";
      const l = C.#n.get(r), d = y.degChars[l];
      return o.split(/\s/).map((S) => {
        const h = S[0], f = S.slice(1);
        return (d + h).repeat(C.#d(f));
      });
    }).join("");
    return `${i}
${a}`;
  }
  /** BOD形式テキストを取得
   * @param {Board} board
   * @returns {string}
   */
  static getTextPieces(e) {
    const { field: t, xLen: s, playerLen: i, stand: a } = e;
    let n = ` ${[...Array(s).keys()].map((h) => ` ${C.#c(s - h)}`).join("")}
+${Array(s).fill("---").join("")}+
`, r = `
+${Array(s).fill("---").join("")}+`, o = "|", l = "", d = `
`, c = `${C.#l(a, 180)}
`, S = `${C.#l(a, 0)}`;
    return i !== 2 && (c = `${C.#l(a, 270)}
` + c, S = `${C.#l(a, 90)}
` + S), c + n + t.map(
      (h, f) => o + h.map(
        (A) => C.#S(A.piece)
      ).join(l) + o + C.#o(f + 1)
    ).join(d) + r + `
` + S;
  }
}
const X = Symbol("Board");
class Q {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardCoreInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    this[X] = {
      rotateField: this.#e.bind(this)
    };
    const {
      name: s,
      variant: i,
      url: a,
      desc: n,
      playBoard: r,
      playerOptions: o = [],
      players: l = o.some(({ gameName: W }, b) => 1 < b && W) ? 4 : 2,
      boardLeft: d = 5,
      boardTop: c = 5,
      panelWidth: S = 50,
      panelHeight: h = 0 | S * 1.1,
      pieceSize: f = 0 | S * 0.9,
      useRankSize: A = !0,
      isDrawShadow: u = !0,
      isDisplayLastMove: g = !0,
      borderWidth: m = Math.min(S, h) / 30,
      backgroundColor: B = "#00000000",
      isHeadless: w = !1,
      moveMode: E = "normal"
    } = t;
    if (this.option = t, this.isHeadless = w, this.name = s, this.variant = i, this.url = a, this.desc = n, this.displayDeg = 0, this.ctx = null, this.canvas = null, this.pieces = y.getPieces(null, {
      size: f,
      useRankSize: A,
      isDrawShadow: u
    }), !K[r]) throw Error(`playBoard=${r}, Unknown board name.`);
    if (Object.assign(this, K[r]), ![2, 4].includes(l)) throw Error(`players=${l}, players need 2 or 4.`);
    this.playerLen = l, this.left = d, this.top = c, this.panelWidth = S, this.panelHeight = h, this.borderWidth = m, this.pieceSize = f, this.canvasBackgroundColor = B, this.isDisplayLastMove = g, this.field = this.field.map(
      (W, b) => [...W].map((x, k) => {
        const N = d + S * (k + 1), O = c + h * (b + 1);
        return new F(null, x, N, O, S, h, k, b, m);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.players = /* @__PURE__ */ new Map();
    for (let W = 0; W < l; W++) {
      const b = this.degNormal(W), x = {
        ...o[W],
        id: W,
        deg: b,
        degChar: y.degChars[b],
        alive: !0,
        cpuDelay: o[W]?.cpuDelay ?? 500
        // CPUの遅延時間
      };
      if (x.cpu = new Xe(this, x), this.players.set(b, x), !!x.gameName)
        try {
          this.putStartPieces(W, x.gameName, x.pieceSet);
        } catch (k) {
          console.error(k);
        }
    }
    this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = d + this.width, this.bottom = c + this.height, this.stand = new G(this), this.moveMode = E, this.record = new ke(this), this.enPassant = new Z();
  }
  /** ゲームを実行する
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   * @returns {this}
   */
  static run(e, t) {
  }
  /** ボードを閉じる */
  close() {
  }
  /** 現在の手番のプレイヤー情報を取得
   * @returns {Object<string, any>|"PlayerInfo"} - 現在のプレイヤー情報
   */
  getActivePlayer() {
    return [...this.players.values()][this.record.turn % this.playerLen];
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
    e || (t = -t), this.#e(t), this.stand.rotate(t), this.autoDrawing && this.draw();
  }
  /** 駒配置を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  #e(e) {
    const { field: t, xLen: s, yLen: i } = this;
    if (e = this.degNormal(e), e === 0) return;
    if (![90, 180, 270].includes(e)) throw Error(`deg=${e}, deg need multiple of 90.`);
    let a = t.map((n) => n.map(({ piece: r }) => r));
    if ([90, 270].includes(e)) {
      const n = (r) => r[0].map((o, l) => r.map((d) => d[l]));
      if (s !== i) throw Error(`cols=${s} != rows=${i}, Not rows = cols.`);
      a = n(a);
    }
    [180, 270].includes(e) && a.reverse(), a.forEach((n) => {
      n.forEach((r) => {
        r && (r.deg += e);
      }), [90, 180].includes(e) && n.reverse();
    }), t.forEach(
      (n, r) => n.forEach(
        (o, l) => o.piece = a[r][l]
      )
    );
  }
  /** 駒の初期配置
   * @param {number} playerId - プレイヤー番号
   * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} pieceSet - 駒の配置パターン
   */
  putStartPieces(e, t, s = "default") {
    const { pieces: i } = this, a = this.degNormal(e);
    this.#e(-a);
    const n = D[t].position[this.xLen][s];
    if (!n) throw Error(`games["${t}"].position["${this.xLen}"]["${s}"]is null.`);
    n.forEach((r, o) => {
      if (r.length < this.xLen) throw Error(r.join(""));
      const l = o + this.yLen - n.length;
      [...r].forEach((d, c) => {
        i[d] && (this.field[l][c].piece = i[d].clone());
      });
    }), this.#e(a), this.autoDrawing && this.draw();
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
  putNewPiece(e, t, s, i, a = {}) {
    const { displayPtn: n = 0, isMoved: r = !1 } = a, { pieces: o } = this, l = this.degNormal(i);
    typeof e == "string" && (e = new y(this.ctx, o[e], { displayPtn: n, deg: l, isMoved: r })), this.field[s][t].piece = e, this.autoDrawing && this.draw();
  }
  /** ボードの初期配置を行う
   * {string} text - 駒配置を表す文字列
   */
  initTextPieces(e) {
    this.setTextPieces(e), this.record.last.fieldText = e;
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  setTextPieces(e) {
    const { field: t, pieces: s, xLen: i, yLen: a } = this, n = "持駒：";
    0 < e.indexOf(n) && (e = C.convTextPieces(e));
    const o = [e].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(y.degChars).map((d) => `
` + d + n)
    ).reduce(
      (d, c) => d.replace(new RegExp(c, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (d) => d.match(/.{2}/g)
    );
    for (let d = 0; d < a; d++)
      for (let c = 0; c < i; c++)
        try {
          const S = o[d][c];
          t[d][c].piece = y.stringToPiece(s, S);
        } catch {
          t[d][c].piece = null;
        }
    for (; !this.stand; )
      ;
    this.stand.clear();
    const l = o[a];
    l && l.forEach((d) => {
      const c = y.stringToPiece(s, d);
      c && this.stand.add(c);
    }), this.autoDrawing && this.draw();
  }
  /** 角度基準のマス目の行を取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getRow(e, t, s = this.displayDeg, i = 0, a = !0) {
    const { xLen: n, yLen: r } = this;
    return s = this.degNormal(s + i), s === 0 ? a ? r - 1 - t : t : s === 90 ? e : s === 180 ? a ? t : r - 1 - t : s === 270 ? n - 1 - e : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(e, t, s = this.displayDeg, i = 0) {
    const { xLen: a, yLen: n } = this;
    return s = this.degNormal(s + i), s === 0 ? e : s === 90 ? n - 1 - t : s === 180 ? a - 1 - e : s === 270 ? t : -1;
  }
  /** 駒の座標を回転取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @returns {number}
   */
  rotatePosition(e, t, s) {
    return {
      pX: this.getCol(e, t, this.displayDeg, s),
      pY: this.getRow(e, t, this.displayDeg, s, !1)
    };
  }
  /** プロモーション選択
   * @param {Piece} piece - 駒
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   * @param {boolean} isCpuMove - CPUによる移動か
   * @param {string|null} promoChar - 成り先の駒名(成らない場合null)
   */
  async onSelectPromo(e, t, s, i, a) {
    if (a) return a;
    if (this.isHeadless || i)
      return t ? Object.keys(e.promo)[0] : null;
  }
  /** プロモーション処理
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   * @param {boolean} isCpuMove - CPUによる移動か
   * @param {string|null} promoChar - 成り先の駒名(成らない場合null)
   */
  async promoPiece(e, t, s, i, a = !1, n = null) {
    const { piece: r } = t;
    if (!r.promo || r.hasAttr("promoted") || r.hasAttr("cantPromotion") || !s) {
      this.record.add({ fromPanel: e, toPanel: t });
      return;
    }
    const o = await this.onSelectPromo(r, s, i, a, n);
    o ? (r.promotion(o), this.record.add({ fromPanel: e, toPanel: t, end: "成" })) : this.record.add({ fromPanel: e, toPanel: t, end: "不成" });
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   * @returns {{
   * 		canPromo: boolean,
   * 		forcePromo: boolean
   * }}
   */
  checkCanPromo(e) {
    const { yLen: t } = this, { piece: s, pX: i, pY: a } = e, { deg: n } = s, [r, o] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((d) => t - d - (0 | this.promoLineOffset));
    let l;
    return this.sidePromo ? l = Math.max(
      ...Object.keys(y.degChars).map((d) => 0 | d).filter((d) => d !== n).map(
        (d) => this.getRow(i, a, d, 180)
      )
    ) : l = this.getRow(i, a, n), {
      canPromo: r <= l,
      forcePromo: o <= l
    };
  }
  /** 駒を単純移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} isCpuMove - CPUによる移動か
   * @returns boolean
   */
  simpleMovePiece(e, t) {
    !(e instanceof F) || !(t instanceof F) || (t.piece = e.piece, t.piece.isMoved = !0, e.piece = null);
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} isCpuMove - CPUによる移動か
   * @returns boolean
   */
  async movePiece(e, t, s = !1) {
    const { stand: i, moveMode: a, enPassant: n, displayDeg: r } = this, o = this.getActivePlayer();
    if (!e || a === "viewOnly" || t.hasAttr("keepOut") || t.piece === e.piece || t.piece?.deg === e.piece.deg || !s && (a === "vs" && o.deg !== e.piece.deg + r || a !== "free" && !t.isTarget || o.cpuEngine)) return !1;
    let { canPromo: l, forcePromo: d } = this.checkCanPromo(e);
    i.capturePiece(
      e.piece,
      t.piece,
      t.hasAttr("capture"),
      t.hasAttr("cantCapture")
    ), this.simpleMovePiece(e, t);
    const c = this.checkCanPromo(t);
    return l ||= c.canPromo, d ||= c.forcePromo, n.setMoved(t), await this.promoPiece(e, t, l, d, s), !0;
  }
  /** パスして手番を進める
   * @param {PlayerInfo} player - プレイヤー情報
  */
  passTurn(e) {
    this.record.add({ end: `${e.degChar}パス` }), this.autoDrawing && this.draw();
  }
  /** 盤を描写 */
  draw() {
  }
  /** 駒配置をテキストで取得
   * @param {"default"|"compact"|"bod"} mode - テキスト形式
   * @param {boolean} isAlias - エイリアス表示
   * @returns {string}
   */
  getTextPieces(e = "default", t = !1) {
    return e === "bod" ? C.getTextPieces(this) : this.toString(e === "compact", t);
  }
  /** 駒配置をテキストで取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, t = !1) {
    const { xLen: s, record: i, isDisplayLastMove: a } = this, n = i?.last?.pieceId;
    let r = "", o = "", l = "", d = "", c = `
`;
    return e || (r = `┏${Array(s).fill("━━").join("┯")}┓
`, o = `
┗${Array(s).fill("━━").join("┷")}┛`, l = "┃", d = "│", c = `
┠${Array(s).fill("──").join("┼")}┨
`), r + this.field.map(
      (S) => l + S.map((h) => {
        const { piece: f } = h;
        if (!f) return h.toString(e);
        const A = f.toString(t);
        return a && f.id === n ? y.degLastMoveChars[f.deg] + A.slice(1) : A;
      }).join(d) + l
    ).join(c) + o + this.stand.toString(e);
  }
  /** 盤面をクローン
   * @returns {this}
   */
  cloneCore() {
    const e = {
      ...this.option,
      isHeadless: !0,
      autoDrawing: !1
    }, t = new Q(null, e);
    return this.field.flat().forEach(({ piece: s, pX: i, pY: a }) => {
      if (!s) return;
      const n = t.field[a][i];
      n.piece = s.clone();
    }), t.stand.clear(), [...this.stand.stocks.values()].flat().forEach((s) => {
      t.stand.add(s.clone());
    }), t.record.turn = this.record.turn, t.enPassant = this.enPassant.clone(), t;
  }
}
const Me = {
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
    textAlign: "center"
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
class Le {
  #e;
  #t;
  #s;
  #a;
  constructor(e = {}) {
    this.#a = { ...Me, ...e }, this.dialog = document.createElement("dialog"), document.body.appendChild(this.dialog), Object.assign(this.dialog.style, this.#a.dialog), this.#e = document.createElement("h3"), this.dialog.appendChild(this.#e), Object.assign(this.#e.style, this.#a.title), this.#t = document.createElement("p"), this.dialog.appendChild(this.#t), Object.assign(this.#t.style, this.#a.message), this.#s = document.createElement("div"), this.dialog.appendChild(this.#s), Object.assign(this.#s.style, this.#a.buttonContainer), this.isModal = !1;
  }
  get title() {
    return this.#e.textContent;
  }
  set title(e) {
    this.#e.textContent = e;
  }
  get message() {
    return this.#t.textContent;
  }
  set message(e) {
    this.#t.textContent = e;
  }
  close(e = null) {
    return this.dialog.close(), this.dialog.style.display = "none", e?.value;
  }
  async show(e, t, s = [{ label: "OK" }]) {
    return this.#e.textContent = e, this.#e.style.display = e ? "block" : "none", this.#t.innerHTML = t.replace(/\r|\n|\r\n/g, "<br>"), this.#s.innerHTML = "", new Promise((i) => {
      for (const a of s) {
        const n = document.createElement("button");
        this.#s.appendChild(n), Object.assign(n.style, this.#a.button), n.textContent = a.label, n.addEventListener("mouseover", () => Object.assign(n.style, this.#a.btnHover)), n.addEventListener("mouseout", () => Object.assign(n.style, this.#a.button)), n.addEventListener("click", () => i(this.close(a)));
      }
      this.dialog.style.display = "block", this.dialog.showModal();
    });
  }
  /**
   * ダイアログのフォントを設定します。
   * @param {string} fontFamily - 設定するフォントファミリー名
   */
  setFont(e) {
    this.dialog && (this.dialog.style.fontFamily = e, this.#a.button.fontFamily = e);
  }
}
function je(p) {
  let e = !1, t = [], s = null, i = null;
  const { canvas: a } = p, n = async (c, S, h = () => {
  }) => {
    const f = window.getComputedStyle(a), A = c.target.getBoundingClientRect();
    let u = a.width / parseFloat(f.width), g = a.height / parseFloat(f.height);
    if (c.clientX)
      u *= c.clientX - A.left, g *= c.clientY - A.top;
    else if (0 < c.touches.length) {
      if (1 < c.touches.length) return;
      u *= c.touches[0].clientX - A.left, g *= c.touches[0].clientY - A.top;
    } else
      c.preventDefault(), [u, g] = t;
    p.field.forEach((m, B) => m.forEach(async (w, E) => await S(w, u, g, E, B))), await h(u, g), p.draw(), t = [u, g];
  }, r = async (c) => {
    e = !0, await n(
      c,
      (S, h, f) => {
        const { piece: A, pX: u, pY: g } = S;
        A && S.checkRangeMouse(h, f) && (c.preventDefault(), A.isSelected = !0, s = S, M(p, A, u, g));
      },
      (S, h) => {
        for (const [f, A] of p.stand.stocks)
          for (let u = A.length - 1; 0 <= u; u--)
            if (A[u].checkRangeMouse(S, h)) {
              c.preventDefault(), A[u].isSelected = !0, i = { deg: f, i: u };
              return;
            }
      }
    );
  }, o = async (c) => {
    !e || !(s || i) || await n(
      c,
      (S, h, f) => {
        S.isSelected = S.checkRangeMouse(h, f);
      }
    );
  }, l = async (c) => {
    e = !1, await n(
      c,
      async (S, h, f) => {
        S.checkRangeMouse(h, f) && (s && await p.movePiece(s, S), i && !S.piece && p.stand.dropPiece(S, i));
      }
    ), await n(
      c,
      (S) => {
        S.piece && (S.piece.isSelected = !1), S.isSelected = !1, S.clearTarget();
      },
      () => {
        for (const [S, h] of p.stand.stocks)
          for (let f = h.length - 1; 0 <= f; f--)
            h[f].isSelected = !1;
        s = null, i = null;
      }
    );
  }, d = () => {
    for (const c of p.field.flat())
      c.piece && (c.piece.isSelected = !1), c.isSelected = !1, c.clearTarget();
    for (const [c, S] of p.stand.stocks)
      for (let h = S.length - 1; 0 <= h; h--)
        S[h].isSelected = !1;
    s = null, i = null, p.draw();
  };
  return a.addEventListener("mousedown", r), a.addEventListener("mousemove", o), a.addEventListener("mouseup", l), a.addEventListener("touchstart", r), a.addEventListener("touchmove", o), a.addEventListener("touchend", l), {
    resetSelect: d,
    /** イベントリスナーを破棄 */
    removeEvent() {
      a.removeEventListener("mousedown", r), a.removeEventListener("mousemove", o), a.removeEventListener("mouseup", l), a.removeEventListener("touchstart", r), a.removeEventListener("touchmove", o), a.removeEventListener("touchend", l);
    }
  };
}
const ce = document.createElement("style");
ce.textContent = `
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;
document.head.appendChild(ce);
const Fe = {
  spinner: {
    position: "fixed",
    /* Changed to fixed */
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1e4,
    /* Highest z-index */
    display: "none"
    /* Hidden by default */
  },
  spinnerInner: {
    width: "50px",
    /* Adjust size as needed */
    height: "50px",
    border: "5px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "#FFFFFF",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  dimOverlay: {
    position: "fixed",
    /* Changed to fixed */
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    /* Changed opacity to 0.3 */
    zIndex: 9999,
    /* Above canvas */
    display: "none"
    /* Hidden by default */
  }
};
class $e {
  #e = !1;
  #t = null;
  // 暗転用オーバーレイ要素
  #s = null;
  // HTMLスピナー要素
  #a;
  #n;
  #i;
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {OverlayOptions} options - スピナーのオプション
   */
  constructor(e, t = {}) {
    const {
      useDimOverlay: s = !0,
      showSpinner: i = !0,
      styles: a
    } = t;
    this.canvas = e, this.#a = s, this.#n = i, this.#i = {
      ...Fe,
      ...a
    }, this.#r(), this.#o();
  }
  /**
   * オーバーレイを開始します。
   */
  async start() {
    this.#e = !0, this.updatePosition(), this.#a && (this.#t.style.display = "block"), this.#n && (this.#s.style.display = "block");
  }
  /**
   * オーバーレイを停止します。
   */
  stop() {
    this.#e = !1, this.#t.style.display = "none", this.#s.style.display = "none";
  }
  /**
   * HTMLスピナー要素を作成します。
   * @private
   */
  #r() {
    if (this.#s) return;
    this.#s = document.createElement("div"), document.body.appendChild(this.#s), Object.assign(this.#s.style, this.#i.spinner);
    const e = document.createElement("div");
    this.#s.appendChild(e), Object.assign(e.style, this.#i.spinnerInner);
  }
  /**
   * 暗転用オーバーレイを作成し、表示します。
   * @private
   */
  #o() {
    this.#t || (this.#t = document.createElement("div"), document.body.appendChild(this.#t), Object.assign(this.#t.style, this.#i.dimOverlay));
  }
  /**
   * スピナーとオーバーレイの位置とサイズを更新します。
   */
  updatePosition() {
    const e = this.canvas.getBoundingClientRect();
    Object.assign(this.#t.style, {
      top: `${e.top}px`,
      left: `${e.left}px`,
      width: `${e.width}px`,
      height: `${e.height}px`
    }), Object.assign(this.#s.style, {
      top: `${e.top + e.height / 2}px`,
      left: `${e.left + e.width / 2}px`
    });
  }
}
class _ extends Q {
  /** @typedef {Object} Board */
  #e;
  #t;
  #s;
  /** ゲームを実行する
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   * @returns {Board}
   */
  static run(e, t) {
    return new _(e, t);
  }
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    super(e, t), Object.assign(this[X], {
      emitGameOver: this.#a.bind(this)
    }), Object.defineProperties(this[X], {
      dialog: { get: () => this.#s }
    });
    const {
      useStand: s = !1,
      canvasWidth: i = void 0,
      canvasHeight: a = void 0,
      canvasFit: n = "overflow",
      isHeadless: r = !1,
      autoDrawing: o = !r,
      overlayOptions: l,
      useUIControl: d = r ? null : [
        "undo",
        "redo",
        "rotateLeft",
        "rotateRight",
        "downloadImage",
        "downloadRecord",
        "textRecord"
      ],
      uiControlRecordOption: c = {},
      onDrawed: S = (m) => {
      },
      onTurnEnd: h = (m, B) => {
      },
      onGameOver: f = (m, B) => alert(`プレイヤー${B + 1}の敗北です。`),
      onGameEnd: A = (m, B) => m.record.add({ end: `対戦終了 勝者${[...m.players.values()][B].degChar}` })
    } = t;
    let u = null, g = null;
    if (!r) {
      u = v.importAsync(), g = $.importAsync(), this.canvas = e, this.ctx = e.getContext("2d"), this.ctx.clearRect(0, 0, e.width, e.height), this.overlay = new $e(this.canvas, l), this.#s = new Le();
      for (const B of Object.values(this.pieces))
        B.ctx = this.ctx;
      for (const B of this.field.flat())
        B.ctx = this.ctx, B.piece && (B.piece.ctx = this.ctx);
      e.width = i ?? (s ? this.stand.right : this.right) + 5, e.height = a ?? this.bottom + 5;
      const { style: m } = e;
      n === "overflow" ? (m.maxWidth === "" && (m.maxWidth = "97vw"), m.maxHeight === "" && (m.maxHeight = "92vh")) : n === "horizontal" ? m.width === "" && (m.width = "97vw") : n === "vertical" ? m.height === "" && (m.height = "92vh") : n === "parentOverflow" ? (m.maxWidth === "" && (m.maxWidth = "100%"), m.maxHeight === "" && (m.maxHeight = "100%")) : n === "parentHorizontal" ? m.width === "" && (m.width = "100%") : n === "parentVertical" && m.height === "" && (m.height = "100%");
    }
    this.isGameEnd = !1, this.onDrawed = S, this.onTurnEnd = h, this.onGameOver = f, this.onGameEnd = A, r || (this.#e = je(this)), d && (this.makeUIControl(d, c), this.#t.add()), this.autoDrawing = o, o && (u.then(() => {
      this.draw(), this.#s.setFont(v.names), this.#t.setRecordFont(v.names);
      const m = ["Noto Color Emoji", "Noto Serif"];
      this.#t.setButtonFont(
        m.map((B) => `"${B}${v.unique}"`).concat(["serif"]).join(",")
      );
    }), g.then(() => this.draw()), this.draw());
  }
  /** 操作パネルを構築
   * @param {("undo"|"redo"|"rotateLeft"|"rotateRight"|"passTurn"|"downloadImage"|"downloadRecord"|"textRecord")[]} - controls - 表示するコントロールの一覧
   * @param {Object} recordOption - 棋譜オプション
   * @param {number} recordOption.lines - 棋譜の表示行数
   * @param {boolean} recordOption.readonly - 棋譜の読込専用
   * @returns {UIControl}
   */
  makeUIControl(e, t) {
    return this.#t = new pe(this, e, t);
  }
  /** ボードを閉じる */
  close() {
    this.#e?.removeEvent(), this.#t?.remove();
  }
  /** 盤面を回転
   * @param {boolean} isRight - 回転方向
   */
  rotate(e = !0) {
    super.rotate(e), this.autoDrawing && this.draw();
  }
  /** 敗北したプレイヤーが存在するか確認し、イベントを発生させる */
  #a() {
    this.players.forEach((t, s) => {
      t.alive && (this.field.flat().some(
        ({ piece: i }) => i?.deg === s && i.hasAttr("king")
      ) || (t.alive = !1, this.onGameOver?.(this, t.id)));
    });
    const e = [...this.players.values()].filter((t) => t.alive);
    e.length <= 1 && (this.onGameEnd?.(this, e[0].id), this.isGameEnd = !0);
  }
  /** プロモーション選択
   * @param {Piece} piece - 駒
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   * @param {boolean} isCpuMove - CPUによる移動か
   * @param {string|null} promoChar - 成り先の駒名(成らない場合null)
   * @returns {Promise<string|null>}
   */
  async onSelectPromo(e, t, s, i, a) {
    const { moveMode: n } = this;
    if (i) return super.onSelectPromo(e, t, s, i, a);
    const r = [];
    for (const [o, { name: l }] of Object.entries(e.promo))
      r.push({ label: `${o}:${l}`, value: o });
    return (n === "free" || !s) && r.push({ label: "不成", value: null }), await this.#s.show(
      `${e.char}:${e.name}`,
      "成りますか?",
      r
    );
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} isCpuMove - CPUによる移動か
   * @returns {Promise<boolean>}
   */
  async movePiece(e, t, s = !1) {
    return await super.movePiece(e, t, s) ? (this.#e?.resetSelect(), this.#a(), !0) : !1;
  }
  /** 盤を描写 */
  draw() {
    if (this.isHeadless) return;
    const { ctx: e, canvas: t, left: s, top: i, width: a, height: n, panelWidth: r, panelHeight: o, record: l, isDisplayLastMove: d } = this;
    e.restore(), e.save(), e.clearRect(0, 0, t.width, t.height), e.fillStyle = this.canvasBackgroundColor, e.fillRect(0, 0, t.width, t.height), e.fillStyle = this.backgroundColor, e.lineWidth = this.borderWidth, e.strokeStyle = this.borderColor, e.save(), e.translate(s, i), e.fillRect(0, 0, a, n), e.strokeRect(0, 0, a, n), e.translate(r / 2, o / 2), e.strokeRect(0, 0, a - r, n - o), e.restore(), this.stand.draw(), this.field.forEach((c) => {
      c.forEach((S) => {
        S.draw(d ? l.last.pieceId : -1);
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @param {"base64"|"blob"} urlType - 生成URLタイプ
   * @returns {Promise<void>}
   */
  async downloadImage(e, t, s) {
    await xe(this.canvas, e ?? this.name ?? "shogicross", t, s);
  }
}
class pe {
  /** @typedef {Object} UIControl */
  static buttonTexts = "<>🔄🔁⏭📷📜";
  /** 要素のサイズをCanvasに合わせて変更 */
  #e() {
    if (this.board.isHeadless) return;
    const { canvas: e } = this.board, t = window.getComputedStyle(e);
    this.component.style.maxWidth = parseFloat(t.width) + "px";
  }
  /**
   * @param {Board} board - 盤面
   * @param {string[]} controls - 表示するコントロールの一覧
   * @param {Object} recordOption - 棋譜オプション
   * @param {number} recordOption.lines - 棋譜の表示行数
   * @param {boolean} recordOption.readonly - 棋譜の読込専用
   */
  constructor(e, t, s = {}) {
    s.lines ??= 0, s.readonly ??= !1, this.board = e;
    const i = /* @__PURE__ */ new Map([
      ["undo", { title: "一手戻る", text: "&lt;&lt;", onclick: () => e.record.undo() }],
      ["redo", { title: "一手進む", text: "&gt;&gt;", onclick: () => e.record.redo() }],
      ["rotateLeft", { title: "盤面を左回転", text: "🔄", onclick: () => e.rotate(!1) }],
      ["rotateRight", { title: "盤面を右回転", text: "🔁", onclick: () => e.rotate() }],
      ["passTurn", { title: "手番をパス", text: "⏭", onclick: () => e.passTurn(e.getActivePlayer()) }],
      ["downloadImage", { title: "画像を保存", text: "📷", onclick: () => e.downloadImage() }],
      ["downloadRecord", { title: "棋譜を保存", text: "📜", onclick: () => e.record.download() }]
    ]);
    t ??= [...i.keys(), "textRecord"];
    const a = Date.now().toString();
    this.component = document.createElement("div"), this.component.id = a, this.component.style.display = "flex", this.#e(), window.addEventListener("resize", () => this.#e()), this.component.innerHTML = `${[...i].filter(([r]) => t.includes(r)).map(
      ([r, { title: o, text: l }]) => `<button id="${r}${a}" title="${o}" style="font-family:${v.names};">${l}</button>`
    ).join("")}${t.includes("textRecord") ? `<select id="textRecord${a}" size=${s.lines} style="flex-grow:1; font-family:${v.names};"><option></option></select>` : ""}`;
    for (const [r, { onclick: o }] of i)
      t.includes(r) && (this.component.querySelector(`#${r}${a}`).onclick = o);
    if (!t.includes("textRecord")) return;
    const n = e.onDrawed;
    e.onDrawed = async (r) => {
      setTimeout(() => {
        const o = this.component.querySelector(`#textRecord${a}`), l = o.querySelector("option"), d = o.cloneNode(!1);
        r.record.records.forEach((c, S) => {
          const h = l.cloneNode(!1);
          d.appendChild(h), h.textContent = e.record.getText(S), S === r.record.turn && (h.selected = !0), s.readonly && (h.disabled = !0);
        }), s.readonly || (d.onchange = (c) => e.record.jump(c.target.selectedIndex)), o.replaceWith(d);
      }), n?.(r);
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
    this.board.isHeadless || (this.component.remove(), window.removeEventListener("resize", () => this.#e));
  }
  /**
   * 操作パネルのボタンフォントを設定します。
   * @param {string} fontFamily - 設定するフォントファミリー名
   */
  setButtonFont(e) {
    for (const t of this.component.querySelectorAll("button"))
      t.style.fontFamily = e;
  }
  /**
   * 操作パネルの棋譜フォントを設定します。
   * @param {string} fontFamily - 設定するフォントファミリー名
   */
  setRecordFont(e) {
    for (const t of this.component.querySelectorAll("select"))
      t.style.fontFamily = e;
  }
}
const Re = "https://fonts.googleapis.com/css2?family=", Te = "./fonts", De = () => [
  .../* @__PURE__ */ new Set([
    ...pe.buttonTexts + Object.values(I).map(({ displayText: p }) => p).join("") + Object.values(Y).map(({ display: p }) => p ? p.join("") : "").join("")
  ])
].sort().join("");
Object.assign(v, {
  /** 読み込み済みであるか?
   * @type {boolean}
   */
  imported: !1,
  /** 読み込むフォントの一覧(","区切り)
   * @type {string}
   */
  names: "serif",
  /** 識別値
   * @type {string}
   */
  unique: Date.now().toString(),
  /** フォント読み込み
   * @returns {Promise<void>}
   */
  loadFontFace(p, e, t) {
    const s = new FontFace(`${p}${this.unique}`, t, {
      weight: e
    });
    return document.fonts.add(s), s.load().catch((i) => {
    });
  },
  /** ローカルフォントの読み込み
   * @returns {Promise<void>}
   */
  async loadLocalFont() {
    const p = `${Te}/${v.fonts[0][0].replace(/ /g, "")}.woff2`;
    return (await fetch?.(p, { method: "HEAD" }))?.ok ? (this.unique = "", await Promise.all(
      v.fonts.map(async ([t, s]) => {
        const i = `url("./fonts/${t.replace(/ /g, "")}.woff2")`;
        return this.loadFontFace(t, s, i);
      })
    ), console.log("Loaded Local Fonts."), !0) : !1;
  },
  /** フォントの読み込み
   * @param {boolean} isFull - 全テキスト読み込み
   * @returns {Promise<void>}
   */
  async importAsync(p = !1) {
    if (!this.imported) {
      if (!await this.loadLocalFont()) {
        const e = p ? "" : `&text=${De()}`;
        await Promise.all(
          v.fonts.map(async ([t, s]) => {
            const i = t.replace(/ /g, "+"), a = `${Re}${i}:wght@${s}${e}`, n = await fetch(a);
            if (!n.ok) return;
            const o = (await n.text()).match(/url\(.+?\)/g);
            if (!o) throw new Error("Not found font.");
            await Promise.all(o.map(
              (l) => this.loadFontFace(t, s, l)
            ));
          })
        ), this.importAsync(!0);
      }
      this.names = v.fonts.map((e) => `"${e[0]}${this.unique}"`).join(",") + ",serif", this.imported = !0;
    }
  }
});
class Se extends _ {
  /** @typedef {Object} BoardOnline */
  /** ゲームを実行する
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardOnlineInitOption} option - ボードの初期化オプション
   * @returns {BoardOnline}
   */
  static run(e, t) {
    return new Se(e, t);
  }
  /**
   * @typedef {Object} BoardOnlineInitOption - ボードの初期化オプション
   * @extends BoardInitOption
   * @prop {(e:string, board:BoardOnline)=>void} onReadyOnline - 接続完了イベント
   * @prop {(board:BoardOnline)=>void} onCancelOnline - 接続キャンセルイベント
   * @prop {string} serverURL - 接続するサーバーURL(http(s)://～)
   * @prop {string} gameKey - オンライン用ゲーム接続キー
   */
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardOnlineInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    t.useUIControl ??= [
      "downloadImage",
      "downloadRecord",
      "textRecord"
    ], t.uiControlRecordOption ??= { readonly: !0 }, t.moveMode = "vs", super(e, t);
    const {
      onReadyOnline: s = null,
      onCancelOnline: i = null,
      serverURL: a = "http://localhost:8080",
      gameKey: n = encodeURI(JSON.stringify(t))
    } = t, { playerLen: r } = this;
    this.onReadyOnline = s, this.onCancelOnline = i, this.isOnline = !0, this.isReadyOnline = !1, this.gameKey = n, this.roomId = null, this.players.forEach((l) => {
      l.isLocal = !1, l.cpuEngine = null, l.cpu = null;
    }), this.ws = new WebSocket(a.replace(/^http/, "ws")), this.ws.onopen = async () => {
      console.log("WebSocket connection established."), this.ws.send(JSON.stringify({ type: "join", gameKey: n, playerLen: r })), this.overlay.start(), await this[X].dialog.show("", "マッチング待機中...", [{ label: "キャンセル", value: !0 }]) && (this.ws.send(JSON.stringify({ type: "cancelJoin" })), this.overlay.stop(), this.onCancelOnline?.(this));
    }, this.ws.onmessage = (l) => {
      console.log("Received message from server:", l.data);
      try {
        const d = JSON.parse(l.data);
        switch (d.type) {
          // プレイヤーとマッチングした場合
          case "readyOnline":
            this.isReadyOnline = !0, this.roomId = d.roomId;
            const c = [...this.players.values()].find((S) => S.id === d.playerId);
            c && (c.isLocal = !0, this[X].rotateField(c.deg), this.stand.rotate(c.deg), this.displayDeg = c.deg, this.autoDrawing && this.draw()), this.overlay.stop(), this[X].dialog.close(), this.onReadyOnline?.(d, this);
            return;
          // 駒が動いた場合
          case "move":
            this.moveRivalPiece(d);
            return;
          // 駒が駒台から打たれた場合
          case "drop":
            this.dropRivalPiece(d);
            return;
          // 対戦相手の接続が切れた場合
          case "disconnect":
            this[X].dialog?.show("接続エラー", "対戦相手が切断しました。");
            return;
        }
      } catch (d) {
        console.error("Error parsing message from server:", d);
      }
    }, this.ws.onclose = () => {
      console.log("WebSocket connection closed."), this[X].dialog?.show("接続エラー", "サーバーとの接続が切れました。");
    }, this.ws.onerror = (l) => {
      console.error("WebSocket error:", l), this[X].dialog?.show("接続エラー", "サーバーとの接続でエラーが発生しました。");
    };
    class o extends G {
      /** 持ち駒からボード上に配置する
       * @param {Panel} toPanel - 配置先のパネル
       * @param {Object} option - オプション
       * @param {number} option.deg - 角度
       * @param {number} option.i - 配置する持ち駒のインデックス
       * @param {boolean} isCpuDrop - CPUによる打ち駒かどうか
       * @returns {boolean}
       */
      dropPiece(d, c = {}, S = !1) {
        const { board: h } = this, { isReadyOnline: f, displayDeg: A } = h, { deg: u, i: g } = c, m = h.getActivePlayer();
        if (S) return super.dropPiece(d, c, S);
        if (!(d instanceof F) || !f || m.deg !== A || m.isLocal && u !== 0 || !super.dropPiece(d, c)) return !1;
        const w = {
          type: "drop",
          roomId: h.roomId,
          to: { pX: d.pX, pY: d.pY },
          playerDeg: m.deg,
          // プレイヤーの視点角度を追加
          standIndex: g
        };
        return console.log("Sending drop message:", w), h.ws.send(JSON.stringify(w)), h.autoDrawing && h.draw(), !0;
      }
    }
    this.stand = new o(this);
  }
  /**
   * 駒の移動処理（オンラインゲームの場合、サーバーに移動情報を送信）
   * @param {Panel} fromPanel - 移動元のパネル
   * @param {Panel} toPanel - 移動先のパネル
   * @param {boolean} isCpuMove - CPUによる移動かどうか
   * @returns {Promise<boolean>} - 移動が成功したかどうか
   */
  async movePiece(e, t, s = !1) {
    const i = this.getActivePlayer();
    if (!this.isReadyOnline || i.deg !== this.displayDeg || i.isLocal && e.piece.deg !== 0) return !1;
    if (!i.isLocal) return await super.movePiece(e, t, s);
    if (!t.isTarget || s) return !1;
    const a = e.piece.char;
    if (!await super.movePiece(e, t, s)) return !1;
    const r = t.piece?.char, o = {
      type: "move",
      roomId: this.roomId,
      from: { pX: e.pX, pY: e.pY },
      // 移動元の座標
      to: { pX: t.pX, pY: t.pY },
      // 移動先の座標
      promoChar: a !== r ? r : null
    };
    return this.ws.send(JSON.stringify(o)), !0;
  }
  /**
   * リモートからの移動を盤面に適用する
   * @param {Object} message
   * @param {Object} message.from - 移動元の座標
   * @param {number} message.from.pX - 移動元の座標X
   * @param {number} message.from.pY - 移動元の座標Y
   * @param {Object} message.to - 移動先の座標
   * @param {number} message.to.pX - 移動先の座標X
   * @param {number} message.to.pY - 移動先の座標Y
   * @param {number} message.playerDeg - 移動を行ったプレイヤーの視点角度
   * @param {string|null} message.promoChar - 成り先の駒名(成らない場合null)
   */
  async moveRivalPiece({ from: e, to: t, playerDeg: s, promoChar: i }) {
    const a = this.rotatePosition(e.pX, e.pY, -s), n = this.rotatePosition(t.pX, t.pY, -s), r = this.field[a.pY][a.pX], o = this.field[n.pY][n.pX];
    this.stand.capturePiece(
      r.piece,
      o.piece,
      o.hasAttr("capture"),
      o.hasAttr("cantCapture")
    ), this.simpleMovePiece(r, o), await this.promoPiece(r, o, !!i, !1, !0, i), this.autoDrawing && this.draw(), this[X].emitGameOver();
  }
  /**
   * リモートからの打駒を盤面に適用する
   * @param {Object} message
   * @param {Object} message.to - 打つ先の座標
   * @param {number} message.to.pX - 打つ先の座標X
   * @param {number} message.to.pY - 打つ先の座標Y
   * @param {number} message.playerDeg - 打駒を行ったプレイヤーの視点角度
   * @param {number} message.standIndex - 駒台の駒のインデックス
   */
  async dropRivalPiece({ to: e, playerDeg: t, standIndex: s }) {
    const i = this.rotatePosition(e.pX, e.pY, -t), a = this.field[i.pY][i.pX], n = {
      deg: this.degNormal(this.displayDeg - t),
      i: s
    };
    this.stand.dropPiece(a, n, !0), this.autoDrawing && this.draw();
  }
}
export {
  _ as Board,
  Se as BoardOnline,
  Xe as CpuEngine,
  H as CpuEngineBase,
  U as CpuEngines,
  y as Piece,
  K as boards,
  v as canvasFont,
  $ as canvasImage,
  ye as extendData,
  he as gameSoft,
  D as games,
  I as panels,
  V as pieceCost,
  re as pieceRange,
  Y as pieces
};
//# sourceMappingURL=ShogiCross.js.map
