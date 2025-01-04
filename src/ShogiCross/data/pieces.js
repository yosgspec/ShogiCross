export default {
	"歩": {
		"name": "歩兵",
		"display": ["歩兵"],
		"gameName": "将棋",
		"unit": "兵",
		"attr": ["capture"],
		"forcePromoLine": 1,
		"range": {
			"default": "歩"
		},
		"promo": "と"
	},
	"桂": {
		"name": "桂馬",
		"display": ["桂馬"],
		"gameName": "将棋",
		"unit": "馬",
		"attr": ["capture"],
		"forcePromoLine": 2,
		"range": {
			"default": "桂"
		},
		"promo": "圭"
	},
	"銀": {
		"name": "銀将",
		"display": ["銀将", "銀將"],
		"gameName": "将棋",
		"unit": "象",
		"attr": ["capture"],
		"range": {
			"default": "銀"
		},
		"promo": "全"
	},
	"角": {
		"name": "角行",
		"display": ["角行"],
		"gameName": "将棋",
		"unit": "象",
		"attr": ["capture"],
		"range": {
			"default": "聖"
		},
		"promo": "馬"
	},
	"香": {
		"name": "香車",
		"display": ["香車"],
		"gameName": "将棋",
		"unit": "車",
		"attr": ["capture"],
		"forcePromoLine": 1,
		"range": {
			"default": "香"
		},
		"promo": "杏"
	},
	"飛": {
		"name": "飛車",
		"display": ["飛車"],
		"gameName": "将棋",
		"unit": "車",
		"attr": ["capture"],
		"range": {
			"default": "車"
		},
		"promo": "龍"
	},
	"金": {
		"name": "金将",
		"display": ["金將", "金将"],
		"gameName": "将棋",
		"unit": "臣",
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"玉": {
		"name": "玉将",
		"display": ["玉將", "王將", "玉将", "王将"],
		"alias": "皇",
		"gameName": "将棋",
		"unit": "王",
		"attr": ["king", "capture"],
		"range": {
			"default": "王"
		}
	},
	"兵": {
		"name": "ポーン",
		"display": ["♟兵", "♙兵"],
		"gameName": "チェス",
		"unit": "兵",
		"attr": ["enPassant"],
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"start": "二",
			"attack": "兵",
			"enPassant": "通"
		},
		"promo": "妃騏城僧"
	},
	"騎": {
		"name": "ナイト",
		"display": ["♞騎", "♘騎"],
		"gameName": "チェス",
		"unit": "馬",
		"range": {
			"default": "騎"
		}
	},
	"聖": {
		"name": "ビショップ",
		"display": ["♝聖", "♗聖"],
		"gameName": "チェス",
		"unit": "象",
		"range": {
			"default": "聖"
		}
	},
	"塔": {
		"name": "ルーク",
		"display": ["♜塔", "♖塔"],
		"gameName": "チェス",
		"unit": "車",
		"attr": ["castlingRook"],
		"range": {
			"default": "車",
			"castling": "塔"
		}
	},
	"后": {
		"name": "クイーン",
		"display": ["♛后", "♕后"],
		"gameName": "チェス",
		"unit": "臣",
		"range": {
			"default": "后"
		}
	},
	"王": {
		"name": "キング",
		"display": ["♚王", "♔王"],
		"alias": "帝",
		"gameName": "チェス",
		"unit": "王",
		"attr": ["king", "castlingKing"],
		"range": {
			"default": "王",
			"castling": "城"
		}
	},
	"卒": {
		"name": "卒",
		"display": ["○卒", "○兵", "卒", "兵"],
		"gameName": "シャンチー",
		"unit": "兵",
		"forcePromoLine": 4,
		"range": {
			"default": "歩"
		},
		"promo": "率"
	},
	"炮": {
		"name": "炮",
		"display": ["○炮", "○砲", "炮", "砲"],
		"alias": "砲",
		"gameName": "シャンチー",
		"unit": "砲",
		"attr": ["pao"],
		"range": {
			"default": "車",
			"attack": "砲"
		}
	},
	"馮": {
		"name": "傌",
		"display": ["○傌", "○傌", "○馬", "傌", "馬"],
		"alias": "傌",
		"gameName": "シャンチー",
		"unit": "馬",
		"range": {
			"default": "馮"
		}
	},
	"相": {
		"name": "相",
		"display": ["○相", "○象", "相", "象"],
		"gameName": "シャンチー",
		"unit": "象",
		"attr": ["unCrossRiver"],
		"range": {
			"default": "相"
		}
	},
	"俥": {
		"name": "俥",
		"display": ["○俥", "○車", "俥", "車"],
		"gameName": "シャンチー",
		"unit": "車",
		"range": {
			"default": "車"
		}
	},
	"仕": {
		"name": "仕",
		"display": ["○仕", "○士", "仕", "士"],
		"gameName": "シャンチー",
		"unit": "臣",
		"attr": ["inPalace"],
		"range": {
			"palaceSlash": "ぞ"
		}
	},
	"帥": {
		"name": "帥",
		"display": ["⊕帥", "⊕將", "帥", "將"],
		"alias": "將",
		"gameName": "シャンチー",
		"unit": "王",
		"attr": ["king", "inPalace", "cantSeeKing"],
		"range": {
			"default": "き"
		}
	},
	"卆": {
		"name": "卒",
		"display": ["⬡卆", "⬡卒", "卆", "卒"],
		"gameName": "チャンギ",
		"unit": "兵",
		"range": {
			"default": "卒",
			"palaceSlash": "兵"
		}
	},
	"包": {
		"name": "包",
		"display": ["⬡包", "包"],
		"gameName": "チャンギ",
		"unit": "砲",
		"attr": ["po"],
		"range": {
			"default": "砲",
			"palaceSlash": "弓"
		}
	},
	"馭": {
		"name": "馬",
		"display": ["⬡马", "⬡马", "⬡馭", "⬡馬", "马", "馭", "馬"],
		"alias": "马",
		"gameName": "チャンギ",
		"unit": "馬",
		"range": {
			"default": "馮"
		}
	},
	"象": {
		"name": "象",
		"display": ["⬡象", "象"],
		"gameName": "チャンギ",
		"unit": "象",
		"range": {
			"default": "象"
		}
	},
	"車": {
		"name": "車",
		"display": ["⬡车", "⬡车", "⬡車", "车", "車"],
		"alias": "车",
		"gameName": "チャンギ",
		"unit": "車",
		"range": {
			"default": "車",
			"palaceSlash": "聖"
		}
	},
	"士": {
		"name": "士",
		"display": ["⬡士", "士"],
		"gameName": "チャンギ",
		"unit": "臣",
		"attr": ["inPalace"],
		"range": {
			"default": "き",
			"palaceSlash": "ぞ"
		}
	},
	"楚": {
		"name": "楚",
		"display": ["⏣楚", "⏣漢", "楚", "漢"],
		"alias": "漢",
		"gameName": "チャンギ",
		"unit": "王",
		"attr": ["king", "inPalace", "bikjang", "usePass", "swapHorseElephant"],
		"range": {
			"default": "き",
			"palaceSlash": "ぞ"
		}
	},
	"貝": {
		"name": "ビア",
		"display": ["⛂貝", "◎貝"],
		"gameName": "マークルック",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "貴"
	},
	"瑪": {
		"name": "マー",
		"display": ["🐴瑪", "🦄瑪", "🦓瑪"],
		"gameName": "マークルック",
		"unit": "馬",
		"range": {
			"default": "騎"
		}
	},
	"根": {
		"name": "コーン",
		"display": ["Δ根", "🧄根", "⏏根"],
		"gameName": "マークルック",
		"unit": "象",
		"range": {
			"default": "銀"
		}
	},
	"船": {
		"name": "ルアー",
		"display": ["⯊船"],
		"gameName": "マークルック",
		"unit": "車",
		"range": {
			"default": "車"
		}
	},
	"種": {
		"name": "メット",
		"display": ["▴種"],
		"gameName": "マークルック",
		"unit": "臣",
		"range": {
			"default": "ぞ",
			"start": "弐"
		}
	},
	"君": {
		"name": "クン",
		"gameName": "マークルック",
		"display": ["▲君", "△君", "▲公", "△公"],
		"alias": "公",
		"unit": "王",
		"attr": ["king", "countingRules"],
		"range": {
			"default": "ぞ"
		}
	},
	"火": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡火"],
		"gameName": "チャトランガ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "杵"
	},
	"天": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡天"],
		"gameName": "チャトランガ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "橡"
	},
	"木": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡木"],
		"gameName": "チャトランガ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "戰"
	},
	"大": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡大"],
		"gameName": "チャトランガ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "巨"
	},
	"央": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡人", "🗡央"],
		"alias": "人",
		"gameName": "チャトランガ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "往"
	},
	"午": {
		"name": "アシュワ",
		"display": ["🐎午"],
		"gameName": "チャトランガ",
		"unit": "馬",
		"range": {
			"default": "騎"
		}
	},
	"像": {
		"name": "ガジャ",
		"display": ["🐘像"],
		"gameName": "チャトランガ",
		"unit": "象",
		"range": {
			"default": "像"
		}
	},
	"戦": {
		"name": "ラタ",
		"display": ["🛞戦"],
		"gameName": "チャトランガ",
		"unit": "車",
		"range": {
			"default": "車"
		}
	},
	"臣": {
		"name": "マントリ",
		"display": ["⚔臣"],
		"gameName": "チャトランガ",
		"unit": "臣",
		"range": {
			"default": "ぞ"
		}
	},
	"主": {
		"name": "ラージャ",
		"gameName": "チャトランガ",
		"display": ["👑主", "🛡主", "🛡柱"],
		"alias": "柱",
		"unit": "王",
		"attr": ["king"],
		"range": {
			"default": "王"
		}
	},
	"ひ": {
		"name": "ひよこ",
		"display": ["🐤ひ"],
		"gameName": "どうぶつしょうぎ",
		"unit": "兵",
		"attr": ["capture"],
		"forcePromoLine": 1,
		"range": {
			"default": "歩"
		},
		"promo": "に"
	},
	"ぞ": {
		"name": "ぞう",
		"display": ["🐘ぞ"],
		"gameName": "どうぶつしょうぎ",
		"unit": "象",
		"attr": ["capture"],
		"range": {
			"default": "ぞ"
		}
	},
	"き": {
		"name": "きりん",
		"display": ["🦒き"],
		"gameName": "どうぶつしょうぎ",
		"unit": "車",
		"attr": ["capture"],
		"range": {
			"default": "き"
		}
	},
	"ラ": {
		"name": "ライオン",
		"display": ["🦁ラ"],
		"gameName": "どうぶつしょうぎ",
		"unit": "王",
		"attr": ["king", "capture", "ruleThrough"],
		"range": {
			"default": "王"
		}
	},
	"燕": {
		"name": "燕",
		"display": ["燕"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "兵",
		"attr": ["capture"],
		"forcePromoLine": 3,
		"range": {
			"default": "歩"
		},
		"promo": "鴈"
	},
	"雉": {
		"name": "雉",
		"display": ["雉"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "馬",
		"attr": ["capture"],
		"range": {
			"default": "雉"
		}
	},
	"鶴": {
		"name": "銀将",
		"display": ["鶴"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "象",
		"attr": ["capture"],
		"range": {
			"default": "猛"
		}
	},
	"鶉": {
		"name": "鶉(左)",
		"display": ["左鶉"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "車",
		"attr": ["capture", "cantPromotion"],
		"range": {
			"default": "鶉"
		},
		"promo": "左"
	},
	"享": {
		"name": "鶉(右)",
		"display": ["右鶉"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "車",
		"attr": ["capture", "cantPromotion"],
		"range": {
			"default": "享"
		},
		"promo": "右"
	},
	"鷹": {
		"name": "鷹",
		"display": ["鷹"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "臣",
		"attr": ["capture"],
		"forcePromoLine": 3,
		"range": {
			"default": "醉"
		},
		"promo": "雕"
	},
	"鵬": {
		"name": "鵬",
		"display": ["鵬"],
		"gameName": "将棋",
		"expansion": "禽将棋",
		"unit": "王",
		"attr": ["king", "capture", "twoSwallows"],
		"range": {
			"default": "王"
		}
	},
	"京": {
		"name": "京翔",
		"display": ["京翔"],
		"gameName": "将棋",
		"expansion": "京将棋",
		"unit": "馬",
		"attr": ["capture"],
		"forcePromoLine": 3,
		"range": {
			"default": "京"
		},
		"promo": "幾"
	},
	"銅": {
		"name": "銅将",
		"display": ["銅将"],
		"gameName": "将棋",
		"expansion": "京将棋",
		"unit": "象",
		"attr": ["capture"],
		"range": {
			"default": "銅"
		},
		"promo": "う"
	},
	"山": {
		"name": "山車",
		"display": ["山車"],
		"gameName": "将棋",
		"expansion": "京将棋",
		"unit": "車",
		"attr": ["capture"],
		"range": {
			"default": "山"
		},
		"promo": "さ"
	},
	"翅": {
		"name": "金翅",
		"display": ["金翅"],
		"gameName": "将棋",
		"expansion": "京将棋",
		"unit": "臣",
		"attr": ["capture"],
		"range": {
			"default": "翅"
		}
	},
	"斗": {
		"name": "金斗",
		"display": ["金斗"],
		"gameName": "将棋",
		"expansion": "京将棋",
		"unit": "臣",
		"attr": ["capture"],
		"range": {
			"default": "斗"
		}
	},
	"跳": {
		"name": "跳馬",
		"display": ["跳馬"],
		"gameName": "将棋",
		"expansion": "御妃将棋",
		"unit": "馬",
		"attr": ["capture"],
		"range": {
			"default": "騎"
		},
		"promo": "含"
	},
	"返": {
		"name": "反車",
		"display": ["反車"],
		"gameName": "将棋",
		"expansion": "御妃将棋",
		"unit": "車",
		"attr": ["capture"],
		"range": {
			"default": "反"
		},
		"promo": "余"
	},
	"女": {
		"name": "妃将",
		"display": ["妃將"],
		"gameName": "将棋",
		"expansion": "御妃将棋",
		"unit": "臣",
		"attr": ["capture"],
		"range": {
			"default": "后"
		}
	},
	"醉": {
		"name": "醉象",
		"display": ["醉象"],
		"expansion": "朝倉象棋",
		"gameName": "将棋",
		"unit": "臣",
		"attr": ["capture", "cantCapture"],
		"range": {
			"default": "醉"
		},
		"promo": "太"
	},
	"丘": {
		"name": "ポーン",
		"display": ["♟兵", "♙兵", "♟丘", "♙丘"],
		"gameName": "チェス",
		"expansion": "ロスアラモスチェス",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "妃騏城"
	},
	"浜": {
		"name": "ポーン",
		"display": ["♟兵", "♙兵", "♟浜", "♙浜"],
		"gameName": "チェス",
		"expansion": "カパブランカチェス",
		"unit": "兵",
		"attr": ["enPassant"],
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"start": "二",
			"attack": "兵"
		},
		"promo": "妃駈駁騏城僧"
	},
	"駮": {
		"name": "カーディナル",
		"display": ["🩓駮", "🩐駮"],
		"gameName": "チェス",
		"expansion": "カパブランカチェス",
		"unit": "臣",
		"range": {
			"default": "駮"
		}
	},
	"駆": {
		"name": "マーシャル",
		"display": ["🩒駆", "🩏駆"],
		"gameName": "チェス",
		"expansion": "カパブランカチェス",
		"unit": "臣",
		"range": {
			"default": "駆"
		}
	},
	"国": {
		"name": "キング",
		"display": ["♚王", "♔王"],
		"alias": "國",
		"gameName": "チェス",
		"expansion": "カパブランカチェス",
		"unit": "王",
		"attr": ["king", "castlingKing"],
		"range": {
			"default": "王",
			"castling": "国"
		}
	},
	"矢": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡矢"],
		"gameName": "チャトランガ",
		"expansion": "チャトラジ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "舶"
	},
	"本": {
		"name": "パダーティ",
		"display": ["🗡人", "🗡本"],
		"gameName": "チャトランガ",
		"expansion": "チャトラジ",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "豪"
	},
	"舟": {
		"name": "ローカ",
		"display": ["⛵舟"],
		"gameName": "チャトランガ",
		"expansion": "チャトラジ",
		"unit": "象",
		"range": {
			"default": "像"
		}
	},
	"豕": {
		"name": "ハスティー",
		"display": ["🐘豕"],
		"gameName": "チャトランガ",
		"expansion": "チャトラジ",
		"unit": "車",
		"range": {
			"default": "車"
		}
	},
	"ね": {
		"name": "ねこ",
		"display": ["🐱ね"],
		"gameName": "どうぶつしょうぎ",
		"expansion": "ごろごろどうぶつしょうぎ",
		"unit": "象",
		"attr": ["capture"],
		"range": {
			"default": "銀"
		},
		"promo": "ネ"
	},
	"い": {
		"name": "いぬ",
		"display": ["🐶い"],
		"gameName": "どうぶつしょうぎ",
		"expansion": "ごろごろどうぶつしょうぎ",
		"unit": "臣",
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"ら": {
		"name": "ライオン",
		"display": ["🦁ラ"],
		"gameName": "どうぶつしょうぎ",
		"expansion": "ごろごろどうぶつしょうぎ",
		"unit": "王",
		"attr": ["king", "capture"],
		"range": {
			"default": "王"
		}
	},
	"仲": {
		"name": "仲人",
		"display": ["仲人"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "兵",
		"range": {
			"default": "仲"
		},
		"promo": "酔"
	},
	"同": {
		"name": "銅将",
		"display": ["銅将"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "臣",
		"range": {
			"default": "歩"
		},
		"promo": "黄"
	},
	"艮": {
		"name": "銀将",
		"display": ["銀将"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "象",
		"range": {
			"default": "銀"
		},
		"promo": "堅"
	},
	"釡": {
		"name": "金将",
		"display": ["金將", "金将"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "臣",
		"range": {
			"default": "金"
		},
		"promo": "升"
	},
	"猛": {
		"name": "猛豹",
		"display": ["猛豹"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "象",
		"range": {
			"default": "猛"
		},
		"promo": "桷"
	},
	"馨": {
		"name": "香車",
		"display": ["香車"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "車",
		"forcePromoLine": 1,
		"range": {
			"default": "香"
		},
		"promo": "駒"
	},
	"反": {
		"name": "反車",
		"display": ["反車"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "車",
		"range": {
			"default": "反"
		},
		"promo": "鯨"
	},
	"虎": {
		"name": "盲虎",
		"display": ["盲虎"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "象",
		"range": {
			"default": "虎"
		},
		"promo": "鹿"
	},
	"麒": {
		"name": "麒麟",
		"display": ["麒麟"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "馬",
		"range": {
			"default": "麒"
		},
		"promo": "鰤"
	},
	"鳳": {
		"name": "鳳凰",
		"display": ["鳳凰"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "象",
		"range": {
			"default": "鳳"
		},
		"promo": "卉"
	},
	"横": {
		"name": "横行",
		"display": ["横行"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "車",
		"range": {
			"default": "横"
		},
		"promo": "猪"
	},
	"竪": {
		"name": "竪行",
		"display": ["竪行"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "車",
		"range": {
			"default": "竪"
		},
		"promo": "牛"
	},
	"碼": {
		"name": "竜馬",
		"display": ["竜馬"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "臣",
		"range": {
			"default": "馬"
		},
		"promo": "鷂"
	},
	"竜": {
		"name": "竜王",
		"display": ["竜王"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "臣",
		"range": {
			"default": "竜"
		},
		"promo": "鷲"
	},
	"奔": {
		"name": "奔走",
		"display": ["奔走"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "臣",
		"range": {
			"default": "后"
		}
	},
	"獅": {
		"name": "獅子",
		"display": ["獅子"],
		"gameName": "将棋",
		"expansion": "中将棋",
		"unit": "臣",
		"range": {
			"default": "獅"
		}
	},
	"石": {
		"name": "石将",
		"display": ["石将"],
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "兵"
		},
		"promo": "鉐"
	},
	"鉄": {
		"name": "鉄将",
		"display": ["鐵将", "鐵将", "鉄将"],
		"alias": "鐵",
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "鉄"
		},
		"promo": "鋼"
	},
	"猫": {
		"name": "猫刄",
		"display": ["猫刄"],
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "象",
		"range": {
			"default": "ぞ"
		},
		"promo": "錨"
	},
	"瀧": {
		"name": "飛龍",
		"display": ["飛龍"],
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "象",
		"range": {
			"default": "瀧"
		},
		"promo": "錆"
	},
	"嗔": {
		"name": "嗔猪",
		"display": ["嗔猪"],
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "車",
		"range": {
			"default": "き"
		},
		"promo": "鎭"
	},
	"丑": {
		"name": "猛牛",
		"display": ["猛牛"],
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "車",
		"range": {
			"default": "丑"
		},
		"promo": "鈕"
	},
	"狼": {
		"name": "悪狼",
		"display": ["悪狼"],
		"gameName": "将棋",
		"expansion": "大将棋",
		"unit": "臣",
		"range": {
			"default": "狼"
		},
		"promo": "狂"
	},
	"雀": {
		"name": "萑歩",
		"display": ["萑歩"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩"
		},
		"promo": "錐"
	},
	"烏": {
		"name": "烏行",
		"display": ["烏行"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "馬",
		"range": {
			"default": "烏"
		},
		"promo": "鳶"
	},
	"鴟": {
		"name": "鴟行",
		"display": ["鴟行"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "馬",
		"range": {
			"default": "烏"
		},
		"promo": "曇"
	},
	"鶏": {
		"name": "鶏飛",
		"display": ["鶏飛"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "象",
		"range": {
			"default": "鶏"
		},
		"promo": "延"
	},
	"犬": {
		"name": "盲犬",
		"display": ["盲犬"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "象",
		"range": {
			"default": "犬"
		},
		"promo": "狛"
	},
	"麁": {
		"name": "猛鹿",
		"display": ["猛鹿"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "象",
		"range": {
			"default": "銀"
		},
		"promo": "豬"
	},
	"鷙": {
		"name": "飛鷹",
		"display": ["飛鷹"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "象",
		"range": {
			"default": "鷙"
		},
		"promo": "鷄"
	},
	"犇": {
		"name": "牛車",
		"display": ["牛車"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "車",
		"forcePromoLine": 1,
		"range": {
			"default": "香"
		},
		"promo": "前"
	},
	"風": {
		"name": "風馬",
		"display": ["風馬"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "車",
		"range": {
			"default": "風"
		},
		"promo": "騰"
	},
	"羽": {
		"name": "燕羽",
		"display": ["燕羽"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "車",
		"range": {
			"default": "横"
		},
		"promo": "行"
	},
	"兎": {
		"name": "走兎",
		"display": ["走兎"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "車",
		"range": {
			"default": "兎"
		},
		"promo": "瓜"
	},
	"猿": {
		"name": "登猿",
		"display": ["登猿"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "臣",
		"range": {
			"default": "銅"
		},
		"promo": "麈"
	},
	"鳫": {
		"name": "鳫飛",
		"display": ["鳫飛"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "臣",
		"range": {
			"default": "銅"
		},
		"promo": "羽"
	},
	"狽": {
		"name": "猛狼",
		"display": ["猛狼"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "臣",
		"range": {
			"default": "金"
		},
		"promo": "熊"
	},
	"狐": {
		"name": "隠狐",
		"display": ["隠狐"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "臣",
		"range": {
			"default": "狐"
		}
	},
	"雲": {
		"name": "雲鷲",
		"display": ["雲鷲"],
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "臣",
		"range": {
			"default": "雲"
		}
	},
	"霍": {
		"name": "靏玉",
		"display": ["靏玉"],
		"alias": "皇",
		"gameName": "将棋",
		"expansion": "和将棋",
		"unit": "王",
		"attr": ["king"],
		"range": {
			"default": "王"
		}
	},
	"梹": {
		"name": "ポーン",
		"display": ["♟兵", "♙兵", "♟梹", "♙梹"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "篩遲麋齶塞鵺"
	},
	"師": {
		"name": "ライオン",
		"display": ["🦁師"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "馬",
		"range": {
			"default": "師"
		}
	},
	"犀": {
		"name": "ユニコーン",
		"display": ["🦏犀"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "馬",
		"range": {
			"default": "犀"
		}
	},
	"麟": {
		"name": "ジラフ",
		"display": ["🦒麟"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "象",
		"range": {
			"default": "麟"
		}
	},
	"鰐": {
		"name": "コカトリス",
		"display": ["🐊鰐"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "象",
		"range": {
			"default": "聖"
		}
	},
	"砦": {
		"name": "ルーク",
		"display": ["♜砦"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "車",
		"range": {
			"default": "車"
		}
	},
	"鴻": {
		"name": "アンカ",
		"display": ["🦅鴻"],
		"gameName": "チェス",
		"expansion": "GrantAcedrex",
		"unit": "臣",
		"range": {
			"default": "鴻"
		}
	},
	"呈": {
		"name": "キング",
		"display": ["♚王", "♔王"],
		"alias": "逞",
		"gameName": "チェス",
		"expansion":"GrantAcedrex",
		"unit": "王",
		"attr": ["king"],
		"range": {
			"default": "王",
			"start": "呈"
		}
	},
	"鋲": {
		"name": "ソルダート",
		"display": ["♟兵", "♙兵", "♟鋲", "♙鋲"],
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "兵",
		"forcePromoLine": 1,
		"range": {
			"default": "歩",
			"attack": "兵"
		},
		"promo": "童"
	},
	"射": {
		"name": "シュッツェ",
		"display": ["🏹射"],
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "象",
		"range": {
			"default": "像"
		}
	},
	"使": {
		"name": "クーリエ",
		"display": ["⨺使"],
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "象",
		"range": {
			"default": "聖"
		}
	},
	"佯": {
		"name": "シュライヒ",
		"display": ["🎭佯"],
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "車",
		"range": {
			"default": "き"
		}
	},
	"賢": {
		"name": "マン",
		"display": ["🎓賢"],
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "臣",
		"range": {
			"default": "王"
		}
	},
	"妾": {
		"name": "ケーニギン",
		"display": ["♛妾"],
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "臣",
		"range": {
			"default": "ぞ"
		}
	},
	"閏": {
		"name": "ケーニヒ",
		"display": ["♚王", "♔王"],
		"alias": "潤",
		"gameName": "チェス",
		"expansion": "クーリエチェス",
		"unit": "王",
		"attr": ["king"],
		"range": {
			"default": "王"
		}
	},
	"と": {
		"name": "と金",
		"display": ["と", "个"],
		"alias": "个",
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"杏": {
		"name": "成香",
		"display": ["仝", "仝", "杏"],
		"alias": "仝",
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"圭": {
		"name": "成桂",
		"display": ["今", "今", "圭"],
		"alias": "今",
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"全": {
		"name": "成銀",
		"display": ["全"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"馬": {
		"name": "龍馬",
		"display": ["龍馬", "竜馬"],
		"attr": ["capture"],
		"range": {
			"default": "馬"
		}
	},
	"龍": {
		"name": "龍王",
		"display": ["龍王", "龍王", "竜王"],
		"attr": ["capture"],
		"range": {
			"default": "竜"
		}
	},
	"妃": {
		"name": "Pクイーン",
		"display": ["♕妃", "♛妃"],
		"range": {
			"default": "后"
		}
	},
	"騏": {
		"name": "Pナイト",
		"display": ["♘騏", "♞騏"],
		"range": {
			"default": "騎"
		}
	},
	"城": {
		"name": "Pルーク",
		"display": ["♖城", "♜城"],
		"range": {
			"default": "車"
		}
	},
	"僧": {
		"name": "Pビショップ",
		"display": ["♗僧", "♝僧"],
		"range": {
			"default": "聖"
		}
	},
	"率": {
		"name": "成卒",
		"display": ["⊖率", "⊖卒", "⊖兵", "率", "卒", "兵"],
		"range": {
			"default": "卒"
		}
	},
	"貴": {
		"name": "ビアガーイ",
		"display": ["⛀貴", "⛀珠", "◉貴", "◉珠"],
		"alias": "珠",
		"range": {
			"default": "ぞ"
		}
	},
	"杵": {
		"name": "Pアシュワ",
		"display": ["🐎杵"],
		"range": {
			"default": "騎"
		}
	},
	"橡": {
		"name": "Pガジャ",
		"display": ["🐘橡"],
		"range": {
			"default": "像"
		}
	},
	"戰": {
		"name": "Pラタ",
		"display": ["🛞戰"],
		"range": {
			"default": "車"
		}
	},
	"巨": {
		"name": "Pマントリ",
		"display": ["⚔巨"],
		"range": {
			"default": "ぞ"
		}
	},
	"往": {
		"name": "Pラージャ",
		"display": ["🔱往"],
		"range": {
			"default": "王"
		}
	},
	"に": {
		"name": "にわとり",
		"display": ["🐔に"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"鴈": {
		"name": "鴈",
		"display": ["鴈"],
		"attr": ["capture"],
		"range": {
			"default": "鴈"
		}
	},
	"左": {
		"name": "左(鶉)",
		"display": ["左"],
		"gameName": "将棋",
		"unit": "車",
		"attr": ["promoted"],
		"range": {
			"default": "〇"
		}
	},
	"右": {
		"name": "右(鶉)",
		"display": ["右"],
		"gameName": "将棋",
		"unit": "車",
		"attr": ["promoted"],
		"range": {
			"default": "〇"
		}
	},
	"雕": {
		"name": "鵰",
		"display": ["鵰", "鵰"],
		"alias": "鵰",
		"attr": ["capture"],
		"range": {
			"default": "雕"
		}
	},
	"幾": {
		"name": "成京",
		"display": ["き"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"う": {
		"name": "成銅",
		"display": ["う"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"さ": {
		"name": "成山",
		"display": ["さ"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"太": {
		"name": "太子",
		"display": ["太子"],
		"attr": ["king", "capture", "cantCapture"],
		"range": {
			"default": "王"
		}
	},
	"余": {
		"name": "成反",
		"display": ["余"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"含": {
		"name": "成跳",
		"display": ["含"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"駁": {
		"name": "Pカーディナル",
		"display": ["🩐駁", "🩓駁"],
		"range": {
			"default": "駮"
		}
	},
	"駈": {
		"name": "Pマーシャル",
		"display": ["🩏駈", "🩒駈"],
		"range": {
			"default": "駆"
		}
	},
	"舶": {
		"name": "Pローカ",
		"display": ["⛵舶"],
		"range": {
			"default": "像"
		}
	},
	"豪": {
		"name": "Pハスティー",
		"display": ["🐘豪"],
		"range": {
			"default": "車"
		}
	},
	"ネ": {
		"name": "パワーアップねこ",
		"display": ["😺ネ"],
		"attr": ["capture"],
		"range": {
			"default": "金"
		}
	},
	"升": {
		"name": "金飛車",
		"display": ["金飛"],
		"range": {
			"default": "車"
		}
	},
	"堅": {
		"name": "銀竪行",
		"display": ["銀竪"],
		"range": {
			"default": "竪"
		}
	},
	"黄": {
		"name": "銅横行",
		"display": ["銅横"],
		"range": {
			"default": "横"
		}
	},
	"桷": {
		"name": "小角",
		"display": ["小角"],
		"range": {
			"default": "聖"
		}
	},
	"駒": {
		"name": "白駒",
		"display": ["白駒"],
		"range": {
			"default": "駒"
		}
	},
	"鯨": {
		"name": "鯨鯢",
		"display": ["鯨鯢"],
		"range": {
			"default": "鯨"
		}
	},
	"鹿": {
		"name": "飛鹿",
		"display": ["飛鹿"],
		"range": {
			"default": "鹿"
		}
	},
	"鰤": {
		"name": "麒獅子",
		"display": ["麒獅"],
		"range": {
			"default": "獅"
		}
	},
	"卉": {
		"name": "鳳奔走",
		"display": ["鳳奔"],
		"range": {
			"default": "后"
		}
	},
	"酔": {
		"name": "酔象",
		"display": ["酔象"],
		"range": {
			"default": "醉"
		}
	},
	"猪": {
		"name": "奔猪",
		"display": ["奔猪"],
		"range": {
			"default": "猪"
		}
	},
	"牛": {
		"name": "飛牛",
		"display": ["飛牛"],
		"range": {
			"default": "牛"
		}
	},
	"鷂": {
		"name": "角鷹",
		"display": ["角鷹"],
		"range": {
			"default": "鷂"
		}
	},
	"鷲": {
		"name": "飛鷲",
		"display": ["飛鷲"],
		"range": {
			"default": "鷲"
		}
	},
	"鉐": {
		"name": "石金将",
		"display": ["石金"],
		"range": {
			"default": "金"
		}
	},
	"鋼": {
		"name": "金将",
		"display": ["鉄金"],
		"range": {
			"default": "金"
		}
	},
	"錨": {
		"name": "猫金将",
		"display": ["猫金"],
		"range": {
			"default": "金"
		}
	},
	"錆": {
		"name": "龍金将",
		"display": ["龍金"],
		"range": {
			"default": "金"
		}
	},
	"鎭": {
		"name": "嗔金将",
		"display": ["嗔金"],
		"range": {
			"default": "金"
		}
	},
	"鈕": {
		"name": "牛金将",
		"display": ["牛金"],
		"range": {
			"default": "金"
		}
	},
	"狂": {
		"name": "狼金将",
		"display": ["狼金"],
		"range": {
			"default": "金"
		}
	},
	"錐": {
		"name": "金鳥",
		"display": ["金鳥"],
		"range": {
			"default": "金"
		}
	},
	"鳶": {
		"name": "烏飛鷹",
		"display": ["飛鳶"],
		"range": {
			"default": "鷙"
		}
	},
	"曇": {
		"name": "鴟雲鷲",
		"display": ["曇鷲"],
		"range": {
			"default": "雲"
		}
	},
	"延": {
		"name": "延鷹",
		"display": ["延鷹"],
		"range": {
			"default": "延"
		}
	},
	"狛": {
		"name": "犬猛狼",
		"display": ["猛狛"],
		"range": {
			"default": "金"
		}
	},
	"豬": {
		"name": "行猪",
		"display": ["行猪"],
		"range": {
			"default": "醉"
		}
	},
	"鷄": {
		"name": "鷄鷹",
		"display": ["鷄鷹"],
		"range": {
			"default": "鷄"
		}
	},
	"前": {
		"name": "歬牛",
		"display": ["歬牛"],
		"range": {
			"default": "王"
		}
	},
	"騰": {
		"name": "天馬",
		"display": ["天馬"],
		"range": {
			"default": "騰"
		}
	},
	"行": {
		"name": "燕行",
		"display": ["燕行"],
		"range": {
			"default": "車"
		}
	},
	"瓜": {
		"name": "兎隠狐",
		"display": ["隠瓜"],
		"range": {
			"default": "狐"
		}
	},
	"麈": {
		"name": "猿猛鹿",
		"display": ["猛麈"],
		"range": {
			"default": "銀"
		}
	},
	"羽": {
		"name": "鳫燕羽",
		"display": ["燕羽"],
		"range": {
			"default": "横"
		}
	},
	"熊": {
		"name": "熊眼",
		"display": ["熊眼"],
		"range": {
			"default": "王"
		}
	},
	"篩": {
		"name": "Pライオン",
		"display": ["🦁篩"],
		"range": {
			"default": "師"
		}
	},
	"遲": {
		"name": "Pユニコーン",
		"display": ["🦏遲"],
		"range": {
			"default": "犀"
		}
	},
	"麋": {
		"name": "Pジラフ",
		"display": ["🦒麋"],
		"range": {
			"default": "麟"
		}
	},
	"齶": {
		"name": "Pコカトリス",
		"display": ["🐊齶"],
		"range": {
			"default": "聖"
		}
	},
	"塞": {
		"name": "Pルーク",
		"display": ["♖塞"],
		"range": {
			"default": "車"
		}
	},
	"鵺": {
		"name": "Pアンカ",
		"display": ["🦅鵺"],
		"range": {
			"default": "鴻"
		}
	},
	"童": {
		"name": "Pケーニギン",
		"display": ["♕童"],
		"range": {
			"default": "ぞ"
		}
	}
}
