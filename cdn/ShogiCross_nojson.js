const N = {
  fonts: [
    ["Noto Serif JP", 900],
    ["Noto Emoji", 400],
    ["Noto Sans Symbols 2", 400],
    ["Noto Sans Symbols", 400],
    ["Noto Serif", 900],
    ["Noto Serif TC", 900]
  ]
}, ce = {
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
}, U = {
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
}, H = {
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
}, R = {
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
}, T = {
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
}, z = {
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
}, pe = {};
function Se(p) {
  Object.assign(N, p.canvasFont), Object.assign(ce, p.gameSoft), Object.assign(U, p.games), Object.assign(H, p.boards), Object.assign(R, p.panels), Object.assign(T, p.pieces), Object.assign(ae, p.pieceRange), Object.assign(z, p.pieceCost);
}
Se(pe);
function me(p) {
  return new Promise((e) => {
    const t = new Image();
    t.src = p, t.onload = () => e(t);
  });
}
function ue() {
  return [...new Set(
    Object.values(R).flatMap(({ imgSrc: p }) => p ?? []).concat(Object.values(T).flatMap(({ imgSrc: p }) => p != null ? Object.values(p) : []).flat())
  )];
}
const j = {
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
        ue().map(async (p) => {
          this.images[p] = await me(p);
        })
      ).then((p) => this.imported = !0);
  }
};
let he = 0;
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
    const a = new Map(Object.entries(JSON.parse(JSON.stringify(T))));
    for (const [i, s] of a)
      s.attr ??= [], s.unit && s.unit !== "成" && (s.base = s);
    for (const [i, s] of a) {
      if (!s.promo || typeof s.promo != "string") continue;
      const r = [...s.promo];
      s.promo = {};
      for (const o of r) {
        const l = a.get(o);
        l.attr.push("promoted"), l.unit = "成", s.promo[o] = l, a.set(o, { ...s, ...l });
      }
    }
    [...a].forEach(([i, s], r) => {
      s.char = i, a.set(i, new C(e, s, t));
    });
    const n = Object.fromEntries(a);
    for (const [i, s] of a)
      s.alias.forEach((r, o) => {
        if (n[r]) return;
        const l = s.clone(), d = [...l.display];
        l.displayPtn = o + 1, l.display = d, n[r] = l;
      });
    return n;
  }
  /** 文字列から駒を取得
   * @param {Object<string, Piece|PieceInitOption>} pieces - 駒の一覧
   * @param {string} text - 駒文字列
   * @returns {Piece}
   */
  static stringToPiece(e, t) {
    if (!t) return null;
    const [a, n] = [...t], i = C.charDegs[a];
    if (!i || !e[n]) return null;
    const s = e[n].clone();
    return s.deg = i, s;
  }
  /** 駒の一覧をリストで取得
   * @returns {Piece[]}
   */
  static piecesToList(e) {
    return Object.entries(e).sort(([t, { id: a }], [n, { id: i }]) => Math.sign(a - i));
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
      displayPtn: n = 0,
      deg: i = 0,
      size: s = C.size,
      useRankSize: r = C.useRankSize,
      isDrawShadow: o = C.isDrawShadow,
      isMoved: l = !1
    } = a;
    Object.assign(this, t), this.id = he++, this.ctx = e, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn ??= n, this.game = U[this.gameName], this.cost = z[this.char] ?? z[this.base.char] ?? 1, this.center = 0, this.middle = 0, this.deg ||= i, this.size ??= s, this.useRankSize ??= r, this.isDrawShadow ??= o, this.isRotateImg ??= !0, this.isMoved = l, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([d, c]) => {
        Array.isArray(c) || (this.range[d] = ae[c].map((S) => [...S]));
      });
    } catch (d) {
      throw console.error(d), t;
    }
  }
  /** 駒をクローン
   * @returns {Piece}
   */
  clone() {
    const { displayPtn: e, deg: t, size: a, isMoved: n } = this;
    return new C(this.ctx, { ...this }, { displayPtn: e, deg: t, size: a, isMoved: n });
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
          const n = (i) => i[0].map((s, r) => i.map((o) => o[r]));
          t[a] = n(t[a]);
        }
        [180, 270].includes(e) && t[a].reverse(), t[a].forEach((n) => {
          [90, 180].includes(e) && n.reverse();
        });
      }
    }), t;
  }
  /** 駒/マスクを描写 */
  async draw() {
    if (!this.ctx) return;
    const e = "#FF000055";
    this.imgSrc && j.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(e)) : (this.drawPiece(), this.isSelected && this.drawMask(e));
  }
  /** 駒画像を描写 */
  drawImage() {
    if (!this.ctx) return;
    const { ctx: e, size: t, deg: a } = this, n = this.imgSrc[a][this.displayPtn] ?? this.imgSrc[0][this.displayPtn], i = j.images[n];
    if (!i) return;
    e.save(), e.translate(this.center, this.middle), this.isRotateImg && e.rotate(this.rad);
    let s, r;
    i.width * 0.9 < i.height ? (s = i.width / i.height * t, r = t) : (s = t, r = i.height / i.width * t), e.drawImage(i, -s / 2, -r / 2, s, r), e.restore();
  }
  /** 駒画像にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMaskImage(e) {
    if (!this.ctx) return;
    const { ctx: t, size: a } = this;
    t.fillStyle = e, t.save();
    const n = a * 0.9, i = a;
    t.translate(this.center, this.middle), t.fillRect(-n / 2, -i / 2, n, i), t.restore();
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
    let n, i, s;
    this.hasAttr("promoted") ? (n = t.promoteFontColor ?? t.fontColor ?? "#000000", i = t.promoteBackgroundColor ?? t.backgroundColor ?? "#FFFFFF", s = t.promoteBorderColor ?? t.borderColor ?? "#FF3300") : (n = t.fontColor ?? "#000000", i = t.backgroundColor ?? "#FFFFFF", s = t.borderColor ?? "#777777"), e.strokeStyle = s, e.fillStyle = i, e.lineWidth = 8 * a, this.drawPieceShadow(a), e.save(), this.makePath(a), e.stroke(), e.fill(), e.fillStyle = n;
    const r = [..."" + this.display[this.displayPtn]], o = 40 * a;
    e.font = `${o}px ${N.names}`, e.textAlign = "center", r.forEach((l, d) => {
      const c = r.length === 1 ? o / 2 : d * o;
      e.fillText(l, 0, c);
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
class J {
  /** 駒台への角度ごとの表示順
   * @type {number[]}
   */
  static #e = [180, 90, 270, 0];
  /**
   * @param {Board} board - 盤面
   */
  constructor(e) {
    this.board = e;
    const { top: t, right: a, bottom: n, width: i, height: s, panelWidth: r, panelHeight: o, xLen: l, yLen: d } = e;
    this.clear(), this.left = a * 1.02, this.top = t, this.width = i / 2, this.height = s, this.right = this.left + this.width, this.bottom = n, this.pitchWidth = r / 2, this.pitchHeight = o, this.xLen = l, this.yLen = d;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = new Map(J.#e.map((e) => [e, []]));
  }
  /** 持ち駒からボード上に配置する
   * @param {Panel} toPanel - 配置先のパネル
   * @param {Object} option - オプション
   * @param {number} option.deg - 角度
   * @param {number} option.i - 配置する持ち駒のインデックス
   */
  releasePiece(e, t = {}) {
    const { board: a } = this;
    if (a.moveMode === "viewOnly" || e.hasAttr("keepOut")) return;
    const { deg: n, i } = t, s = this.stocks.get(n);
    e.piece = s[i], s[i].center = e.center, s[i].middle = e.middle, s.splice(i, 1), a.record.add({ toPanel: e, end: "打" });
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(e) {
    const t = this.stocks.get(e.deg);
    e.turnFront(), t.push(e), t.sort((a, n) => Math.sign(a.id - n.id));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   * @param {boolean} forceCapture - 属性を無視して捕縛する
   * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
   */
  capturePiece(e, t, a = !1, n = !1) {
    n || !t || !(a || e.hasAttr("capture")) || t.hasAttr("king") || t.hasAttr("cantCapture") || (t.deg = e.deg, t.isMoved = !0, this.add(t));
  }
  /** 持ち駒の所有権を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  rotate(e) {
    [...this.stocks].forEach(([t, a]) => {
      const n = this.board.degNormal(t + e);
      a.forEach((i) => i.deg = n), this.stocks.set(n, a);
    });
  }
  /** 盤を描写 */
  draw() {
    const { board: e, left: t, top: a, width: n, height: i, pitchWidth: s, pitchHeight: r } = this, { ctx: o, xLen: l, yLen: d } = e;
    o.fillStyle = e.backgroundColor, o.strokeStyle = e.borderColor, o.lineWidth = e.borderWidth, o.save(), o.translate(t, a), o.fillRect(0, 0, n, i), o.strokeRect(0, 0, n, i), o.restore(), [...this.stocks.values()].forEach((c, S) => {
      let h = 0;
      c = c.slice(-d / 4 * l);
      for (let f = 0 | d / 4 * S; f < d / 4 * (S + 1); f++)
        for (let y = 0; y < l; y++) {
          const u = t + s * (y + 1), m = a + r * (f + 1), g = c[h++];
          if (g == null) break;
          g.center = u, g.middle = m, g.draw();
        }
    });
  }
  /** 駒台をテキスト形式で取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, t = !1) {
    const { xLen: a } = this.board, n = [...this.stocks.values()].flat().filter((r) => r);
    let i = 0 < n.length ? `
` + "―".repeat(a * 2) + `
` : "", s = n.map((r) => r.toString(t)).join("");
    if (!e) {
      i = "";
      for (const r of Object.values(C.degChars))
        s = s.replace(r, `
${r}持駒：${r}`);
    }
    return i + s;
  }
}
class ge {
  #e;
  #t;
  #a;
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
  constructor(e, t, a, n, i, s, r, o, l) {
    Object.assign(this, R[t]), this.ctx = e, this.center = a, this.middle = n, this.width = i, this.height = s, this.left = a - i / 2, this.top = n - s / 2, this.right = a + i / 2, this.bottom = n + s / 2, this.pX = r, this.pY = o, this.borderWidth = l, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.attr ??= [], this.piece = null, this.isSelected = !1, this.clearTarget();
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
    this.imgSrc && j.imported ? this.drawImage() : this.drawPanel(), this.isSelected && this.drawMask(e), this.isTarget && this.drawMask(t), this.piece?.draw();
  }
  /** マス目画像を描写 */
  drawImage() {
    if (!this.ctx) return;
    const { ctx: e } = this, t = this.imgSrc, a = j.images[t];
    a && (e.save(), e.translate(this.left, this.top), e.drawImage(a, 0, 0, this.width, this.height), e.restore());
  }
  /** マス目を描写 */
  drawPanel() {
    if (!this.ctx) return;
    const { ctx: e, left: t, top: a, center: n, middle: i, width: s, height: r, displayText: o, textRotate: l } = this;
    if (e.fillStyle = this.backgroundColor, e.strokeStyle = this.borderColor, e.lineWidth = this.borderWidth, e.save(), e.translate(t, a), e.fillRect(0, 0, s, r), this.intersect ? (e.lineWidth = this.borderWidth, e.beginPath(), e.moveTo(s / 2, 0), e.lineTo(s / 2, r), e.moveTo(0, r / 2), e.lineTo(s, r / 2), e.closePath(), e.stroke()) : e.strokeRect(0, 0, s, r), e.lineWidth = this.borderWidth / 2, e.beginPath(), this.borderSlashLeft && (e.moveTo(0, 0), e.lineTo(s, r)), this.borderSlashRight && (e.moveTo(s, 0), e.lineTo(0, r)), e.closePath(), e.stroke(), e.restore(), o) {
      e.save(), e.translate(n, i), e.fillStyle = this.borderColor;
      const d = l ? l * Math.PI / 180 : 0;
      e.rotate(d);
      const c = Math.min(this.width, this.height) * 0.6;
      e.font = `${c}px ${N.names}`;
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
class fe {
  #e = 0;
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
   * @param {string} option.end - オプション=成|不成|打
   */
  add(e = {}) {
    const { board: t, records: a } = this, { fromPanel: n = {}, toPanel: i = {}, end: s = "", inc: r = 1 } = e, { piece: o = {} } = i;
    (this.turn += r) === 0 && 0 < a.length || t.isHeadless || (a[this.turn] = {
      from: {
        pX: n.pX,
        pY: n.pY
      },
      to: {
        pX: i.pX,
        pY: i.pY
      },
      deg: o.deg,
      pieceChar: o.char,
      end: s,
      fieldText: t.getTextPieces("compact", !0),
      fieldMoved: t.field.map(
        (l) => l.map(
          ({ piece: d }) => d?.isMoved ? 1 : 0
        )
      )
    }, 0 < r && a.splice(this.turn + 1), this.#e !== this.turn && (this.#e = this.turn, t.onTurnEnd?.(t, this.turn), setTimeout(() => t.getActivePlayer().cpu.playTurn(), 0)));
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
    const { board: t, records: a } = this;
    if (!a[this.turn + e]) return;
    this.turn += e;
    const { fieldText: n, fieldMoved: i } = a[this.turn];
    t.setTextPieces(n), t.field.forEach(
      (s, r) => s.forEach(({ piece: o }, l) => {
        o && (o.isMoved = !!i[r][l]);
      })
    );
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
  move(e) {
    this.turn = e, this.#t(0);
  }
  /** 局面の記録を文字列に変換
   * @param {number} turn - 手数
   * @param {boolean} isNumOnly - 座標を数字で表現
   * @returns {string}
   */
  getText(e, t = !1) {
    const { board: a } = this, { to: n, from: i, deg: s, pieceChar: r, end: o } = this.records[e];
    if (n.pX == null) return `${e}: ${o}`;
    const l = ({ pX: S }) => (a.xLen - S).toString(t ? 10 : 36), d = ({ pY: S }) => (S + 1).toString(t ? 10 : 36), c = t ? "," : "";
    return `${e}: ${C.degChars[s]}${l(n)}${c}${d(n)}${r}${o}${i.pX === void 0 ? "" : ` (${l(i)}${c}${d(i)})`}`;
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
    this.records = JSON.parse(decodeURI(e)), this.move(t ?? this.records.length - 1);
  }
  /** 棋譜コメントを取得
   * @param {number} shiftTurn - ずらす手数
   * @returns {string}
   */
  getComment(e = 0) {
    return this.records[this.turn + e] ?? "";
  }
}
const Be = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], We = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], ye = [
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
function Ae(p) {
  const e = [];
  let t, a;
  for (let n = 0; n < p.length; n++)
    for (let i = 0; i < p[n].length; i++) {
      const s = p[n][i];
      for (let [r, { isOwn: o }] of We)
        s === r && (e.push({ isOwn: o, oX: i, oY: n }), o && ([t, a] = [i, n]));
    }
  return e.map((n) => (n.offsetX = n.oX - t, n.offsetY = n.oY - a, n));
}
function O(p, e, t, a) {
  const n = [], { field: i, yLen: s, enPassant: r } = p;
  function o(u, m) {
    return i[m] && i[m][u] && !i[m][u].hasAttr("keepOut");
  }
  function l(u) {
    return u.piece && e.hasAttr("po") && u.piece.hasAttr("po");
  }
  function d(u) {
    return u.piece && !e.isMoved && !u.piece.isMoved && e.hasAttr("pao") && e.cost < u.piece.cost;
  }
  function c(u, m, g, B = "", x = !0) {
    if (!i[g] || !i[g][m]) return !1;
    const W = i[g][m];
    return !W || l(W) || d(W) || B === "enPassant" && !r.isTarget(W, e) || e.hasAttr("inPalace") && !W.hasAttr("palace") || B.indexOf("palace") === 0 && !(W.hasAttr(B) && i[a][t].hasAttr(B)) || e.hasAttr("unCrossRiver") && s - (0 | s / 2) <= p.getRow(m, g, e.deg) ? !1 : u ? i[g][m].piece ? x ? e.deg !== i[g][m].piece.deg : !0 : !1 : !i[g][m].piece;
  }
  function S(u, m, g, B, x) {
    for (const W of m)
      for (let w = 0; w < u.length; w++)
        for (let b = 0; b < u[w].length; b++) {
          const [k, E] = [b + t - B, w + a - x];
          if (!(!o(k, E) || c(g, 0 | k, 0 | E, "", !1) || u[w][b] !== W))
            return !0;
        }
    return !1;
  }
  function h(u, m, g) {
    const B = i[g][m];
    B.addTarget(u), r.setTarget(B, e), n.push(B);
  }
  function f(u, [m, { isAttack: g }], { oX: B, oY: x, isOwn: W }) {
    if (W)
      for (const [w, { child: b = [] } = {}] of ye)
        for (let k = 0; k < u.length; k++)
          for (let E = 0; E < u[k].length; E++) {
            const [v, P] = [E + t - B, k + a - x];
            !o(v, P) || !c(g, v, P, m) || u[k][E] !== w || S(u, b, !1, B, x) || h(m, v, P);
          }
  }
  function y(u, [m, { isAttack: g }], { oX: B, oY: x, isOwn: W, offsetX: w, offsetY: b }) {
    if (!(!W && !c(!1, t + w, a + b)))
      for (const [k, { jmps: E = 0, moves: v = 0 } = {}] of se) {
        const P = !v || v === 0;
        for (let M = x - 1; M <= x + 1; M++)
          for (let L = B - 1; L <= B + 1; L++) {
            if (u[M][L] !== k || L === B && M === x) continue;
            let Z = E || 0, Y = v || 0;
            const [le, de] = [L - B, M - x];
            for (let Q = t, _ = a; ; ) {
              Q += le, _ += de;
              const F = Q + w, $ = _ + b;
              if (!o(F, $) || !P && Y === 0) break;
              const G = Z === 0;
              G && c(g, F, $, m, G) ? (Y--, h(m, F, $)) : E < 1 && Y--;
              const ee = i[$][F];
              if (ee.piece && (Z--, G || l(ee)))
                break;
            }
          }
      }
  }
  return (function() {
    const u = e.getRange();
    u.attack ??= u.default;
    for (const m of Be) {
      const g = m[0];
      if (e.isMoved && ["start", "castling"].includes(g)) continue;
      const B = u[g];
      if (B)
        for (const x of Ae(B))
          f(B, m, x), y(B, m, x);
    }
  })(), n;
}
function ie(p, e) {
  let t = p.field.flat().filter(
    (n) => n.piece?.deg === e && n.piece.hasAttr("king")
  );
  if (t.length !== 1) return !1;
  const a = t[0];
  for (const n of p.field.flat()) {
    if (!n.piece || n.piece.deg === e) continue;
    if (O(p, n.piece, n.pX, n.pY).some(
      ({ pX: s, pY: r }) => s === a.pX && r === a.pY
    )) return !0;
  }
  return !1;
}
function ne(p, e) {
  for (const t of p.field.flat()) {
    if (!t.piece || t.piece.deg !== e) continue;
    const a = O(p, t.piece, t.pX, t.pY);
    for (const n of a) {
      const i = p.cloneCore();
      if (i.simpleMovePiece(
        i.field[t.pY][t.pX],
        i.field[n.pY][n.pX]
      ), !ie(i, e)) return !0;
    }
  }
  return !1;
}
function Ce(p, e) {
  return ie(p, e) && !ne(p, e);
}
class D {
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
   * @return {()=>Promise<void>} timer
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
    const { player: t } = this, a = 1e4;
    let n = 0;
    return e.field.flat().forEach((i) => {
      if (i.piece && i.piece.deg === t.deg) {
        const s = i.piece.cost <= 0;
        n += s ? a : i.piece.cost;
      }
    }), e.stand.stocks.forEach((i, s) => {
      if (s === t.deg) {
        const r = i.reduce((o, l) => o + l.cost, 0);
        n += r;
      }
    }), n;
  }
}
const I = {};
I.random = class extends D {
  constructor(e, t) {
    super(e, t);
  }
  async playTurn() {
    const { board: e, player: t } = this, a = (await this.delayStart())(), n = [];
    e.field.flat().forEach((s) => {
      if (s.piece && s.piece.deg === t.deg) {
        const r = s, o = O(e, r.piece, r.pX, r.pY);
        o.length > 0 && n.push({ from: r, tos: o });
      }
    });
    const i = [];
    if (n.forEach(({ from: s, tos: r }) => {
      r.forEach((o) => {
        i.push({ from: s, to: o });
      });
    }), i.length > 0) {
      const s = i[Math.floor(Math.random() * i.length)];
      await this.delayEnd(a), await e.movePiece(s.from, s.to, !0), console.log(`CPU(Random): (${s.from.pX}, ${s.from.pY}) から (${s.to.pX}, ${s.to.pY}) へ移動`);
    } else
      console.log("CPU(Random): 指し手がありません。");
  }
};
I.greedy = class extends D {
  constructor(e, t) {
    super(e, t);
  }
  /**
   * 手番を処理します。
   */
  async playTurn() {
    const { board: e, player: t } = this, a = (await this.delayStart())(), n = [];
    e.field.flat().forEach((o) => {
      if (o.piece && o.piece.deg === t.deg) {
        const l = o, d = O(e, l.piece, l.pX, l.pY);
        d.length > 0 && n.push({ from: l, tos: d });
      }
    });
    const i = [];
    if (n.forEach(({ from: o, tos: l }) => {
      l.forEach((d) => {
        i.push({ from: o, to: d });
      });
    }), i.length === 0) {
      console.log("CPU(Greedy): 指し手がありません。");
      return;
    }
    let s = null, r = -1 / 0;
    for (const o of i) {
      const l = e.cloneCore(), d = l.field[o.from.pY][o.from.pX], c = l.field[o.to.pY][o.to.pX];
      await l.movePiece(d, c);
      const S = this.evaluate(l);
      S > r && (r = S, s = o);
    }
    s ? (await this.delayEnd(a), await e.movePiece(s.from, s.to, !0), console.log(`CPU(Greedy): (${s.from.pX}, ${s.from.pY}) から (${s.to.pX}, ${s.to.pY}) へ移動 (評価値: ${r})`)) : console.log("CPU(Greedy): 最善手が見つかりませんでした。");
  }
};
I.minimax = class extends D {
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
  async minimax(e, t, a, n, i) {
    const s = e.getActivePlayer();
    if (t === 0) return this.evaluate(e);
    if (Ce(e, s.deg))
      return i ? -1 / 0 : 1 / 0;
    if (!ne(e, s.deg))
      return 0;
    const r = [];
    e.field.flat().forEach((l) => {
      if (l.piece && l.piece.deg === s.deg) {
        const d = l, c = O(e, d.piece, d.pX, d.pY);
        c.length > 0 && r.push({ from: d, tos: c });
      }
    });
    const o = [];
    if (r.forEach(({ from: l, tos: d }) => {
      d.forEach((c) => {
        o.push({ from: l, to: c });
      });
    }), i) {
      let l = -1 / 0;
      for (const d of o) {
        const c = e.cloneCore(), S = c.field[d.from.pY][d.from.pX], h = c.field[d.to.pY][d.to.pX];
        await c.movePiece(S, h, !0);
        const f = await this.minimax(c, t - 1, a, n, !i);
        if (l = Math.max(l, f), a = Math.max(a, f), n <= a) break;
      }
      return l;
    } else {
      let l = 1 / 0;
      for (const d of o) {
        const c = e.cloneCore(), S = c.field[d.from.pY][d.from.pX], h = c.field[d.to.pY][d.to.pX];
        await c.movePiece(S, h, !0);
        const f = await this.minimax(c, t - 1, a, n, !i);
        if (l = Math.min(l, f), n = Math.min(n, f), n <= a) break;
      }
      return l;
    }
  }
  /**
   * 手番を処理します。
   */
  async playTurn() {
    const { board: e, player: t } = this, a = (await this.delayStart())();
    let n = null, i = -1 / 0;
    const s = [];
    e.field.flat().forEach((o) => {
      if (o.piece && o.piece.deg === t.deg) {
        const l = o, d = O(e, l.piece, l.pX, l.pY);
        d.length > 0 && s.push({ from: l, tos: d });
      }
    });
    const r = [];
    if (s.forEach(({ from: o, tos: l }) => {
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
      S > i ? (i = S, n = o) : S === i && Math.random() < 0.5 && (n = o);
    }
    n ? (await this.delayEnd(a), await e.movePiece(n.from, n.to, !0), console.log(`CPU(Minimax): (${n.from.pX}, ${n.from.pY}) から (${n.to.pX}, ${n.to.pY}) へ移動 (評価値: ${i})`)) : console.log("CPU(Minimax): 最善手が見つかりませんでした。");
  }
};
class we extends D {
  /**
   * @param {Board} board - 対象の盤面
   * @param {PlayerInfo} player - プレイヤー情報
   */
  constructor(e, t) {
    super(e, t);
    const a = t.cpuEngine?.toLowerCase();
    this.engine = a == null ? null : new I[a](e, t);
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
const xe = Object.keys(C.degChars), te = () => ({ pX: null, pY: null, pieceId: null });
class K {
  constructor() {
    this.degs = {}, xe.forEach((e) => this.degs[e] = te());
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
    if (e.hasTarget("start") && t.hasAttr("enPassant")) {
      const a = this.degs[t.deg];
      a.pX = e.pX, a.pY = e.pY;
    }
  }
  /** アンパッサン対象と成りうる駒情報を記録
   * @param {Panel} toPanel - アンパッサン対象か確認するマス目
   */
  setMoved(e) {
    const { piece: t, pX: a, pY: n } = e, i = this.degs[t.deg];
    t && a === i.pX && n === i.pY ? i.pieceId = t.id : this.clear(t.deg);
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
   * @returns {this}
   */
  clone() {
    const e = new K();
    return e.degs = JSON.parse(JSON.stringify(this.degs)), e;
  }
}
class A {
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
  static #t = new Map(
    [...A.#e].map(([e, t]) => [e, new RegExp(t, "g")])
  );
  /** 駒の文字から角度表示
   * @type {Map<string, number>}
   */
  static #a = new Map(
    [...A.#e].map(([e, t]) => [t, e])
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
    [...A.#s].map(([e, t]) => [t, e])
  );
  static #n = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  static #r = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"];
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static #o(e, t = !0) {
    if (!t && e <= 1) return "";
    const a = e % 10, n = 0 | e / 10;
    return A.#r[n] + A.#n[a];
  }
  /** 行/持駒用の数字表示(漢数字)
   * @param {string} kan - 漢数字
   * @param {boolean} emptyOne - 空文字を1とする
   * @returns {string}
   */
  static #d(e, t = !0) {
    if (t && e === "") return 1;
    if (!isNaN(e)) return 0 | e;
    let a = A.#r.findIndex(
      (i) => i !== "" && new RegExp("^" + i).test(e)
    );
    a < 0 && (a = 0);
    let n = A.#n.findIndex(
      (i) => i !== "" && new RegExp(i + "$").test(e)
    );
    return n < 0 && (n = 0), a * 10 + n;
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static #c(e) {
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
    return e ? A.#e.get(e.deg) + e.char : A.#p;
  }
  /** 駒台のBOD表記
   * @param {Stand} stand - 駒台
   * @param {number} deg - 角度
   * @returns {string}
   */
  static #l(e, t = 0) {
    const a = /* @__PURE__ */ new Map();
    return e.stocks.get(t).forEach(({ char: n }) => {
      a.has(n) || a.set(n, 0), a.set(n, a.get(n) + 1);
    }), A.#s.get(t) + "：" + [...a].map(
      ([n, i]) => n + A.#o(i, !1)
    ).join(" ");
  }
  /** BOD形式のテキストをボードで扱えるよう変換
   * @param {string} text - BOD形式のテキスト
   * @returns {string}
   */
  static convTextPieces(e) {
    const t = [], a = [];
    e.split(/\r|\n|\r\n/).forEach((s) => {
      [...A.#i.keys()].some((r) => new RegExp(`^${r}`).test(s)) ? a.push(s) : t.push(s.slice(1));
    });
    let n = t.slice(2, -1).join(`
`);
    A.#t.forEach((s, r) => {
      n = n.replace(s, C.degChars[r]);
    });
    const i = a.flatMap((s) => {
      const [r, o] = s.split(/：/);
      if (o === "") return "";
      const l = A.#i.get(r), d = C.degChars[l];
      return o.split(/\s/).map((S) => {
        const h = S[0], f = S.slice(1);
        return (d + h).repeat(A.#d(f));
      });
    }).join("");
    return `${n}
${i}`;
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  static getTextPieces(e) {
    const { field: t, xLen: a, playerLen: n, stand: i } = e;
    let s = ` ${[...Array(a).keys()].map((h) => ` ${A.#c(a - h)}`).join("")}
+${Array(a).fill("---").join("")}+
`, r = `
+${Array(a).fill("---").join("")}+`, o = "|", l = "", d = `
`, c = `${A.#l(i, 180)}
`, S = `${A.#l(i, 0)}`;
    return n !== 2 && (c = `${A.#l(i, 270)}
` + c, S = `${A.#l(i, 90)}
` + S), c + s + t.map(
      (h, f) => o + h.map(
        (y) => A.#S(y.piece)
      ).join(l) + o + A.#o(f + 1)
    ).join(d) + r + `
` + S;
  }
}
const X = Symbol("Board");
class q {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardCoreInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    this[X] = {
      rotateField: this.#e.bind(this)
    };
    const {
      name: a,
      variant: n,
      url: i,
      desc: s,
      playBoard: r,
      playerOptions: o = [],
      players: l = o.some(({ gameName: W }, w) => 1 < w && W) ? 4 : 2,
      boardLeft: d = 5,
      boardTop: c = 5,
      panelWidth: S = 50,
      panelHeight: h = 0 | S * 1.1,
      pieceSize: f = 0 | S * 0.9,
      useRankSize: y = !0,
      isDrawShadow: u = !0,
      borderWidth: m = Math.min(S, h) / 30,
      backgroundColor: g = "#00000000",
      isHeadless: B = !1,
      moveMode: x = "normal"
    } = t;
    if (this.option = t, this.isHeadless = B, this.name = a, this.variant = n, this.url = i, this.desc = s, this.displayDeg = 0, this.ctx = null, this.canvas = null, this.pieces = C.getPieces(null, {
      size: f,
      useRankSize: y,
      isDrawShadow: u
    }), !H[r]) throw Error(`playBoard=${r}, Unknown board name.`);
    if (Object.assign(this, H[r]), ![2, 4].includes(l)) throw Error(`players=${l}, players need 2 or 4.`);
    this.playerLen = l, this.left = d, this.top = c, this.panelWidth = S, this.panelHeight = h, this.borderWidth = m, this.pieceSize = f, this.canvasBackgroundColor = g, this.field = this.field.map(
      (W, w) => [...W].map((b, k) => {
        const E = d + S * (k + 1), v = c + h * (w + 1);
        return new ge(null, b, E, v, S, h, k, w, m);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.players = /* @__PURE__ */ new Map();
    for (let W = 0; W < l; W++) {
      const w = this.degNormal(W), b = {
        ...o[W],
        id: W,
        deg: w,
        degChar: C.degChars[w],
        alive: !0,
        cpuDelay: o[W]?.cpuDelay ?? 500
        // CPUの遅延時間
      };
      if (b.cpu = new we(this, b), this.players.set(w, b), !!b.gameName)
        try {
          this.putStartPieces(W, b.gameName, b.pieceSet);
        } catch (k) {
          console.error(k);
        }
    }
    this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = d + this.width, this.bottom = c + this.height, this.stand = new J(this), this.moveMode = x, this.record = new fe(this), this.enPassant = new K();
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
    const { field: t, xLen: a, yLen: n } = this;
    if (e = this.degNormal(e), e === 0) return;
    if (![90, 180, 270].includes(e)) throw Error(`deg=${e}, deg need multiple of 90.`);
    let i = t.map((s) => s.map(({ piece: r }) => r));
    if ([90, 270].includes(e)) {
      const s = (r) => r[0].map((o, l) => r.map((d) => d[l]));
      if (a !== n) throw Error(`cols=${a} != rows=${n}, Not rows = cols.`);
      i = s(i);
    }
    [180, 270].includes(e) && i.reverse(), i.forEach((s) => {
      s.forEach((r) => {
        r && (r.deg += e);
      }), [90, 180].includes(e) && s.reverse();
    }), t.forEach(
      (s, r) => s.forEach(
        (o, l) => o.piece = i[r][l]
      )
    );
  }
  /** 駒の初期配置
   * @param {number} playerId - プレイヤー番号
   * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} pieceSet - 駒の配置パターン
   */
  putStartPieces(e, t, a = "default") {
    const { pieces: n } = this, i = this.degNormal(e);
    this.#e(-i);
    const s = U[t].position[this.xLen][a];
    if (!s) throw Error(`games["${t}"].position["${this.xLen}"]["${a}"]is null.`);
    s.forEach((r, o) => {
      if (r.length < this.xLen) throw Error(r.join(""));
      const l = o + this.yLen - s.length;
      [...r].forEach((d, c) => {
        n[d] && (this.field[l][c].piece = n[d].clone());
      });
    }), this.#e(i), this.autoDrawing && this.draw();
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
  putNewPiece(e, t, a, n, i = {}) {
    const { displayPtn: s = 0, isMoved: r = !1 } = i, { pieces: o } = this, l = this.degNormal(n);
    typeof e == "string" && (e = new C(this.ctx, o[e], { displayPtn: s, deg: l, isMoved: r })), this.field[a][t].piece = e, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  setTextPieces(e) {
    const { field: t, pieces: a, xLen: n, yLen: i } = this, s = "持駒：";
    0 < e.indexOf(s) && (e = A.convTextPieces(e));
    const o = [e].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(C.degChars).map((d) => `
` + d + s)
    ).reduce(
      (d, c) => d.replace(new RegExp(c, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (d) => d.match(/.{2}/g)
    );
    for (let d = 0; d < i; d++)
      for (let c = 0; c < n; c++)
        try {
          const S = o[d][c];
          t[d][c].piece = C.stringToPiece(a, S);
        } catch {
          t[d][c].piece = null;
        }
    for (; !this.stand; )
      ;
    this.stand.clear();
    const l = o[i];
    l && l.forEach((d) => {
      const c = C.stringToPiece(a, d);
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
  getRow(e, t, a = this.displayDeg, n = 0, i = !0) {
    const { xLen: s, yLen: r } = this;
    return a = this.degNormal(a + n), a === 0 ? i ? r - 1 - t : t : a === 90 ? e : a === 180 ? i ? t : r - 1 - t : a === 270 ? s - 1 - e : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {number} pX - マス目の列
   * @param {number} pY - マス目の行
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(e, t, a = this.displayDeg, n = 0) {
    const { xLen: i, yLen: s } = this;
    return a = this.degNormal(a + n), a === 0 ? e : a === 90 ? s - 1 - t : a === 180 ? i - 1 - e : a === 270 ? t : -1;
  }
  /** プロモーション選択
   * @param {Piece} piece - 駒
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   * @param {boolean} isCpuMove - CPUによる移動か
   */
  async onSelectPromo(e, t, a, n) {
    if (this.isHeadless || n)
      return t ? Object.keys(e.promo)[0] : null;
  }
  /** プロモーション処理
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   * @param {boolean} isCpuMove - CPUによる移動か
   */
  async promoPiece(e, t, a, n, i = !1) {
    const { piece: s } = t;
    if (!s.promo || s.hasAttr("promoted") || s.hasAttr("cantPromotion") || !a) {
      this.record.add({ fromPanel: e, toPanel: t });
      return;
    }
    const r = await this.onSelectPromo(s, a, n, i);
    r ? (s.promotion(r), this.record.add({ fromPanel: e, toPanel: t, end: "成" })) : this.record.add({ fromPanel: e, toPanel: t, end: "不成" });
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   * @returns {{
   * 		canPromo: boolean,
   * 		forcePromo: boolean
   * }}
   */
  checkCanPromo(e) {
    const { yLen: t } = this, { piece: a, pX: n, pY: i } = e, { deg: s } = a, [r, o] = [
      a.game.promoLine,
      a.forcePromoLine
    ].map((d) => t - d - (0 | this.promoLineOffset));
    let l;
    return this.sidePromo ? l = Math.max(
      ...Object.keys(C.degChars).map((d) => 0 | d).filter((d) => d !== s).map(
        (d) => this.getRow(n, i, d, 180)
      )
    ) : l = this.getRow(n, i, s), {
      canPromo: r <= l,
      forcePromo: o <= l
    };
  }
  simpleMovePiece(e, t) {
    t.piece = e.piece, t.piece.isMoved = !0, e.piece = null;
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} isCpuMove - CPUによる移動か
   * @returns boolean
   */
  async movePiece(e, t, a = !1) {
    const { stand: n, moveMode: i, enPassant: s } = this;
    if (!e || i === "viewOnly" || t.hasAttr("keepOut") || t.piece === e.piece || t.piece?.deg === e.piece.deg || !a && i !== "free" && !t.isTarget || !a && this.getActivePlayer().cpuEngine) return !1;
    let { canPromo: r, forcePromo: o } = this.checkCanPromo(e);
    n.capturePiece(
      e.piece,
      t.piece,
      t.hasAttr("capture"),
      t.hasAttr("cantCapture")
    ), this.simpleMovePiece(e, t);
    const l = this.checkCanPromo(t);
    return r ||= l.canPromo, o ||= l.forcePromo, s.setMoved(t), await this.promoPiece(e, t, r, o, a), !0;
  }
  /** パスして手番を進める
   * @param {PlayerInfo} player - プレイヤー情報
  */
  passTurn(e) {
    this.record.add({ end: `${e.degChar}パス` });
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
    return e === "bod" ? A.getTextPieces(this) : this.toString(e === "compact", t);
  }
  /** 駒配置をテキストで取得
   * @param {boolean} isCompact - コンパクト表示
   * @param {boolean} isAlias - エイリアス表示
   */
  toString(e = !1, t = !1) {
    const { xLen: a } = this;
    let n = "", i = "", s = "", r = "", o = `
`;
    return e || (n = `┏${Array(a).fill("━━").join("┯")}┓
`, i = `
┗${Array(a).fill("━━").join("┷")}┛`, s = "┃", r = "│", o = `
┠${Array(a).fill("──").join("┼")}┨
`), n + this.field.map(
      (l) => s + l.map(
        (d) => d.piece?.toString(t) ?? d.toString(e)
      ).join(r) + s
    ).join(o) + i + this.stand.toString(e);
  }
  /** 盤面をクローン
   * @returns {this}
   */
  cloneCore() {
    const e = {
      ...this.option,
      isHeadless: !0,
      autoDrawing: !1
    }, t = new q(null, e);
    return this.field.flat().forEach(({ piece: a, pX: n, pY: i }) => {
      if (!a) return;
      const s = t.field[i][n];
      s.piece = a.clone();
    }), t.stand.clear(), [...this.stand.stocks.values()].flat().forEach((a) => {
      t.stand.add(a.clone());
    }), t.record.turn = this.record.turn, t.enPassant = this.enPassant.clone(), t;
  }
}
const be = (p) => "image/" + p.replace("jpg", "jpeg");
async function ke(p, e = "image", t = "png", a = "base64") {
  const n = be(t), i = document.createElement("a");
  let s;
  a === "blob" ? s = URL.createObjectURL(
    await new Promise((r) => p.toBlob(r), n)
  ) : s = p.toDataURL(n), i.href = s, i.download = `${e}.${t}`, i.click(), a === "blob" && URL.revokeObjectURL(i.href);
}
const Ee = {
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
class ve {
  #e;
  #t;
  #a;
  #s;
  constructor(e = {}) {
    this.#s = { ...Ee, ...e }, this.dialog = document.createElement("dialog"), document.body.appendChild(this.dialog), Object.assign(this.dialog.style, this.#s.dialog), this.#e = document.createElement("h3"), this.dialog.appendChild(this.#e), Object.assign(this.#e.style, this.#s.title), this.#t = document.createElement("p"), this.dialog.appendChild(this.#t), Object.assign(this.#t.style, this.#s.message), this.#a = document.createElement("div"), this.dialog.appendChild(this.#a), Object.assign(this.#a.style, this.#s.buttonContainer), this.isModal = !1;
  }
  #i(e) {
    return this.dialog.close(), this.dialog.style.display = "none", e?.value;
  }
  async show(e, t, a = [{ label: "OK" }]) {
    return this.#e.textContent = e, this.#t.innerHTML = t.replace(/\r|\n|\r\n/g, "<br>"), this.#a.innerHTML = "", new Promise((n) => {
      for (const i of a) {
        const s = document.createElement("button");
        this.#a.appendChild(s), Object.assign(s.style, this.#s.button), s.textContent = i.label, s.addEventListener("mouseover", () => Object.assign(s.style, this.#s.btnHover)), s.addEventListener("mouseout", () => Object.assign(s.style, this.#s.button)), s.addEventListener("click", () => n(this.#i(i)));
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
function Ne(p) {
  let e = !1, t = [], a = null, n = null;
  const { canvas: i } = p, s = async (c, S, h = () => {
  }) => {
    const f = window.getComputedStyle(i), y = c.target.getBoundingClientRect();
    let u = i.width / parseFloat(f.width), m = i.height / parseFloat(f.height);
    if (c.clientX)
      u *= c.clientX - y.left, m *= c.clientY - y.top;
    else if (0 < c.touches.length) {
      if (1 < c.touches.length) return;
      u *= c.touches[0].clientX - y.left, m *= c.touches[0].clientY - y.top;
    } else
      c.preventDefault(), [u, m] = t;
    p.field.forEach((g, B) => g.forEach(async (x, W) => await S(x, u, m, W, B))), await h(u, m), p.draw(), t = [u, m];
  }, r = async (c) => {
    e = !0, await s(
      c,
      (S, h, f) => {
        const { piece: y, pX: u, pY: m } = S;
        y && S.checkRangeMouse(h, f) && (c.preventDefault(), y.isSelected = !0, a = S, O(p, y, u, m));
      },
      (S, h) => {
        for (const [f, y] of p.stand.stocks)
          for (let u = y.length - 1; 0 <= u; u--)
            if (y[u].checkRangeMouse(S, h)) {
              c.preventDefault(), y[u].isSelected = !0, n = { deg: f, i: u };
              return;
            }
      }
    );
  }, o = async (c) => {
    !e || !(a || n) || await s(
      c,
      (S, h, f) => {
        S.isSelected = S.checkRangeMouse(h, f);
      }
    );
  }, l = async (c) => {
    e = !1, await s(
      c,
      async (S, h, f) => {
        S.checkRangeMouse(h, f) && (a && await p.movePiece(a, S), n && !S.piece && p.stand.releasePiece(S, n));
      }
    ), await s(
      c,
      (S) => {
        S.piece && (S.piece.isSelected = !1), S.isSelected = !1, S.clearTarget();
      },
      () => {
        for (const [S, h] of p.stand.stocks)
          for (let f = h.length - 1; 0 <= f; f--)
            h[f].isSelected = !1;
        a = null, n = null;
      }
    );
  }, d = () => {
    for (const c of p.field.flat())
      c.piece && (c.piece.isSelected = !1), c.isSelected = !1, c.clearTarget();
    for (const [c, S] of p.stand.stocks)
      for (let h = S.length - 1; 0 <= h; h--)
        S[h].isSelected = !1;
    a = null, n = null, p.draw();
  };
  return i.addEventListener("mousedown", r), i.addEventListener("mousemove", o), i.addEventListener("mouseup", l), i.addEventListener("touchstart", r), i.addEventListener("touchmove", o), i.addEventListener("touchend", l), {
    resetSelect: d,
    /** イベントリスナーを破棄 */
    removeEvent() {
      i.removeEventListener("mousedown", r), i.removeEventListener("mousemove", o), i.removeEventListener("mouseup", l), i.removeEventListener("touchstart", r), i.removeEventListener("touchmove", o), i.removeEventListener("touchend", l);
    }
  };
}
const re = document.createElement("style");
re.textContent = `
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
`;
document.head.appendChild(re);
const Xe = {
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
class Oe {
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {OverlayOptions} options - スピナーのオプション
   */
  #e = !1;
  #t = null;
  // 暗転用オーバーレイ要素
  #a = null;
  // HTMLスピナー要素
  #s;
  #i;
  #n;
  constructor(e, t = {}) {
    const {
      useDimOverlay: a = !0,
      showSpinner: n = !0,
      styles: i
    } = t;
    this.canvas = e, this.#s = a, this.#i = n, this.#n = {
      ...Xe,
      ...i
    }, this.#r(), this.#o();
  }
  /**
   * オーバーレイを開始します。
   */
  async start() {
    this.#e = !0, this.updatePosition(), this.#s && (this.#t.style.display = "block"), this.#i && (this.#a.style.display = "block");
  }
  /**
   * オーバーレイを停止します。
   */
  stop() {
    this.#e = !1, this.#t.style.display = "none", this.#a.style.display = "none";
  }
  /**
   * HTMLスピナー要素を作成します。
   * @private
   */
  #r() {
    if (this.#a) return;
    this.#a = document.createElement("div"), document.body.appendChild(this.#a), Object.assign(this.#a.style, this.#n.spinner);
    const e = document.createElement("div");
    this.#a.appendChild(e), Object.assign(e.style, this.#n.spinnerInner);
  }
  /**
   * 暗転用オーバーレイを作成し、表示します。
   * @private
   */
  #o() {
    this.#t || (this.#t = document.createElement("div"), document.body.appendChild(this.#t), Object.assign(this.#t.style, this.#n.dimOverlay));
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
    }), Object.assign(this.#a.style, {
      top: `${e.top + e.height / 2}px`,
      left: `${e.left + e.width / 2}px`
    });
  }
}
class V extends q {
  /** @typedef {Object} Board */
  #e;
  #t;
  #a;
  /** ゲームを実行する
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   * @returns {Board}
   */
  static run(e, t) {
    return new V(e, t);
  }
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    super(e, t), Object.assign(this[X], {
      emitGameOver: this.#s.bind(this)
    }), Object.defineProperties(this[X], {
      dialog: { get: () => this.#a }
    });
    const {
      useStand: a = !1,
      canvasWidth: n = void 0,
      canvasHeight: i = void 0,
      canvasFit: s = "overflow",
      isHeadless: r = !1,
      autoDrawing: o = !r,
      overlayOptions: l,
      usePlayerControl: d = !r,
      onDrawed: c = (m) => {
      },
      onTurnEnd: S = (m, g) => {
      },
      onGameOver: h = (m, g) => alert(`プレイヤー${g + 1}の敗北です。`),
      onGameEnd: f = (m, g) => m.record.add({ end: `対戦終了 勝者${[...m.players.values()][g].degChar}` })
    } = t;
    let y = null, u = null;
    if (!r) {
      y = N.importAsync(), u = j.importAsync(), this.canvas = e, this.ctx = e.getContext("2d"), this.ctx.clearRect(0, 0, e.width, e.height), this.overlay = new Oe(this.canvas, l), this.#a = new ve();
      for (const g of Object.values(this.pieces))
        g.ctx = this.ctx;
      for (const g of this.field.flat())
        g.ctx = this.ctx, g.piece && (g.piece.ctx = this.ctx);
      e.width = n ?? (a ? this.stand.right : this.right) + 5, e.height = i ?? this.bottom + 5;
      const { style: m } = e;
      s === "overflow" ? (m.maxWidth === "" && (m.maxWidth = "97vw"), m.maxHeight === "" && (m.maxHeight = "92vh")) : s === "horizontal" ? m.width === "" && (m.width = "97vw") : s === "vertical" ? m.height === "" && (m.height = "92vh") : s === "parentOverflow" ? (m.maxWidth === "" && (m.maxWidth = "100%"), m.maxHeight === "" && (m.maxHeight = "100%")) : s === "parentHorizontal" ? m.width === "" && (m.width = "100%") : s === "parentVertical" && m.height === "" && (m.height = "100%");
    }
    this.autoDrawing = o, o && (y.then(() => {
      this.draw(), this.#a.setFontFamily(N.names);
    }), u.then(() => this.draw()), this.draw()), this.isGameEnd = !1, this.onDrawed = c, this.onTurnEnd = S, this.onGameOver = h, this.onGameEnd = f, r || (this.#e = Ne(this)), d && (this.#t = this.makePlayerControl(), this.#t.add());
  }
  /** 操作パネルを構築
   * @param {string[]} compList - 表示するコントロールの一覧
   * @returns {PlayerControl}
   */
  makePlayerControl(e) {
    return this.#t = new oe(this, e), this.#t;
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
  #s() {
    this.players.forEach((t, a) => {
      t.alive && (this.field.flat().some(
        ({ piece: n }) => n?.deg === a && n.hasAttr("king")
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
   */
  async onSelectPromo(e, t, a, n) {
    const { moveMode: i } = this;
    if (n) return super.onSelectPromo(e, t, a, n);
    const s = [];
    for (const [o, { name: l }] of Object.entries(e.promo))
      s.push({ label: `${o}:${l}`, value: o });
    return (i === "free" || !a) && s.push({ label: "不成", value: null }), await this.#a.show(
      "",
      `成りますか?
${e.char}:${e.name}`,
      s
    );
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} isCpuMove - CPUによる移動か
   * @returns boolean
   */
  async movePiece(e, t, a = !1) {
    return await super.movePiece(e, t, a) ? (this.#e?.resetSelect(), this.#s(), !0) : !1;
  }
  /** 盤を描写 */
  draw() {
    if (this.isHeadless) return;
    const { ctx: e, canvas: t, left: a, top: n, width: i, height: s, panelWidth: r, panelHeight: o } = this;
    e.restore(), e.save(), e.clearRect(0, 0, t.width, t.height), e.fillStyle = this.canvasBackgroundColor, e.fillRect(0, 0, t.width, t.height), e.fillStyle = this.backgroundColor, e.lineWidth = this.borderWidth, e.strokeStyle = this.borderColor, e.save(), e.translate(a, n), e.fillRect(0, 0, i, s), e.strokeRect(0, 0, i, s), e.translate(r / 2, o / 2), e.strokeRect(0, 0, i - r, s - o), e.restore(), this.stand.draw(), this.field.forEach((l) => {
      l.forEach((d) => {
        d.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(e, t, a) {
    await ke(this.canvas, e ?? this.name ?? "shogicross", t, a);
  }
}
class oe {
  /** @typedef {Object} PlayerControl */
  static buttonTexts = "<>🔄🔁📷";
  /** 要素のサイズをCanvasに合わせて変更 */
  #e() {
    if (this.board.isHeadless) return;
    const { canvas: e } = this.board, t = window.getComputedStyle(e);
    this.component.style.maxWidth = parseFloat(t.width) + "px";
  }
  /**
   * @param {Board} board - 盤面
   * @param {string[]} compList 表示するコントロールの一覧
   */
  constructor(e, t) {
    this.board = e;
    const a = /* @__PURE__ */ new Map([
      ["undo", { title: "一手戻る", text: "&lt;&lt;", onclick: () => e.record.undo() }],
      ["redo", { title: "一手進む", text: "&gt;&gt;", onclick: () => e.record.redo() }],
      ["rotateLeft", { title: "盤面を左回転", text: "🔄", onclick: () => e.rotate(!1) }],
      ["rotateRight", { title: "盤面を右回転", text: "🔁", onclick: () => e.rotate() }],
      ["downloadImage", { title: "画像を保存", text: "📷", onclick: () => e.downloadImage() }]
    ]);
    t ??= [...a.keys(), "textRecord"];
    const n = Date.now().toString();
    this.component = document.createElement("div"), this.component.id = n, this.component.style.display = "flex", this.#e(), window.addEventListener("resize", () => this.#e()), this.component.innerHTML = `${[...a].filter(([s]) => t.includes(s)).map(
      ([s, { title: r, text: o }]) => `<button id="${s}${n}" title="${r}" style="font-family:${N.names};">${o}</button>`
    ).join("")}${t.includes("textRecord") ? `<select id="textRecord${n}" style="flex-grow:1; font-family:${N.names};"><option></option></select>` : ""}`;
    for (const [s, { onclick: r }] of a)
      t.includes(s) && (this.component.querySelector(`#${s}${n}`).onclick = r);
    if (!t.includes("textRecord")) return;
    const i = e.onDrawed;
    e.onDrawed = async (s) => {
      setTimeout(() => {
        const r = this.component.querySelector(`#textRecord${n}`), o = r.querySelector("option"), l = r.cloneNode(!1);
        s.record.records.forEach((d, c) => {
          const S = o.cloneNode(!1);
          S.textContent = e.record.getText(c), c === s.record.turn && (S.selected = !0), l.appendChild(S);
        }), l.onchange = (d) => e.record.move(d.target.selectedIndex), r.replaceWith(l);
      }), i?.(s);
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
}
const Pe = () => [
  .../* @__PURE__ */ new Set([
    ...oe.buttonTexts + Object.values(R).map(({ displayText: p }) => p).join("") + Object.values(T).map(({ display: p }) => p ? p.join("") : "").join("")
  ])
].sort().join("");
Object.assign(N, {
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
    const p = "https://fonts.googleapis.com/css2?family=", e = Pe(), t = Date.now().toString();
    return this.names = N.fonts.map((a) => `"${a[0]}${t}"`).join(",") + ",serif", Promise.all(
      N.fonts.map(async ([a, n]) => {
        const i = a.replace(/ /g, "+"), s = `${p}${i}:wght@${n}&text=${e}`, r = await fetch(s);
        if (!r.ok) return;
        const l = (await r.text()).match(/url\(.+?\)/g);
        if (!l) throw new Error("Not found font.");
        for (const d of l) {
          const c = new FontFace(`${a}${t}`, d);
          document.fonts.add(c), await c.load().catch(() => {
          });
        }
      })
    ).then((a) => this.imported = !0);
  }
});
class Fe extends V {
  /**
   * @typedef {Object} BoardOnlineInitOption - ボードの初期化オプション
   * @extends BoardInitOption
   * @prop {(e:string, BoardOnline)=>void} onReadyOnline - 接続完了イベント
   * @prop {string} serverURL - 接続するサーバーURL(http(s)://～)
   */
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {BoardOnlineInitOption} option - ボードの初期化オプション
   */
  constructor(e, t) {
    super(e, t);
    const {
      onReadyOnline: a = null,
      serverURL: n = "http://localhost:3000"
    } = t, i = this.option.playerOptions ?? [];
    this.onReadyOnline = a, this.isOnlineGame = i.some((s) => s.isOnline), this.isOnlineGame && (this.players.forEach((s) => {
      const r = i[s.id] ?? {};
      s.isOnline = r.isOnline ?? !1, s.isLocal = !1;
    }), this.ws = new WebSocket(n.replace(/^http/, "ws")), this.ws.onopen = () => {
      console.log("WebSocket connection established."), this.ws.send(JSON.stringify({ type: "join", gameName: this.name }));
    }, this.ws.onmessage = (s) => {
      console.log("Received message from server:", s.data);
      try {
        const r = JSON.parse(s.data);
        switch (r.type) {
          case "move": {
            this.applyRemoteMove(r);
            break;
          }
          case "readyOnline": {
            this.onReadyOnline?.(r, this);
            const o = [...this.players.values()].find((l) => l.id === r.playerId);
            o && (o.isLocal = !0, this[X].rotateField(o.deg), this.stand.rotate(o.deg), this.displayDeg = o.deg, this.autoDrawing && this.draw());
            break;
          }
          case "rivalDisconnect": {
            this[X].dialog?.show("対戦相手が切断しました", "ゲームは終了です。");
            break;
          }
        }
      } catch (r) {
        console.error("Error parsing message from server:", r);
      }
    }, this.ws.onclose = () => {
      console.log("WebSocket connection closed."), this[X].dialog?.show("接続エラー", "サーバーとの接続が切れました。");
    }, this.ws.onerror = (s) => {
      console.error("WebSocket error:", s), this[X].dialog?.show("接続エラー", "サーバーとの接続でエラーが発生しました。");
    });
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
   */
  async applyRemoteMove({ from: e, to: t, playerDeg: a }) {
    const n = [void 0, -a, !0], i = this.getCol(e.pX, e.pY, ...n), s = this.getRow(e.pX, e.pY, ...n), r = this.getCol(t.pX, t.pY, ...n), o = this.getRow(t.pX, t.pY, ...n), l = this.field[s][i], d = this.field[o][r];
    l.piece.deg = this.degNormal(this.displayDeg + a), this.stand.capturePiece(
      l.piece,
      d.piece,
      d.hasAttr("capture"),
      d.hasAttr("cantCapture")
    ), this.simpleMovePiece(l, d);
    const { canPromo: c, forcePromo: S } = this.checkCanPromo(d);
    await this.promoPiece(l, d, c, S, !0), this.autoDrawing && this.draw(), this[X].emitGameOver();
  }
  /**
   * 駒の移動処理（オンラインゲームの場合、サーバーに移動情報を送信）
   * @param {Panel} fromPanel - 移動元のパネル
   * @param {Panel} toPanel - 移動先のパネル
   * @param {boolean} isCpuMove - CPUによる移動かどうか
   * @returns {Promise<boolean>} - 移動が成功したかどうか
   */
  async movePiece(e, t, a = !1) {
    const n = this.getActivePlayer();
    if (n.isOnline && n.isLocal) {
      if (t.isTarget) {
        const i = {
          type: "move",
          // メッセージタイプを"move"に設定
          from: { pX: e.pX, pY: e.pY },
          // 移動元の座標
          to: { pX: t.pX, pY: t.pY }
          // 移動先の座標
        };
        return this.ws.send(JSON.stringify(i)), await super.movePiece(e, t, a);
      }
      return !1;
    }
    return await super.movePiece(e, t, a);
  }
}
export {
  V as Board,
  Fe as BoardOnline,
  we as CpuEngine,
  D as CpuEngineBase,
  I as CpuEngines,
  C as Piece,
  H as boards,
  N as canvasFont,
  j as canvasImage,
  Se as extendData,
  ce as gameSoft,
  U as games,
  R as panels,
  z as pieceCost,
  ae as pieceRange,
  T as pieces
};
//# sourceMappingURL=ShogiCross_nojson.js.map
