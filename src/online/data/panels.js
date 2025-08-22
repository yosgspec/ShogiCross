export default {
	"S": {
		"name": "将棋",
		"text": "　　",
		"backgroundColor": "#EECC88",
		"borderColor": "#333333"
	},
	"s": {
		"name": "古将棋(持ち駒なし)",
		"text": "　　",
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"attr": ["cantCapture"]
	},
	"X": {
		"name": "クロス用黒",
		"text": "　　",
		"backgroundColor": "#BB7744",
		"borderColor": "#333333"
	},
	"M": {
		"name": "マークルック",
		"text": "　　",
		"backgroundColor": "#775544",
		"borderColor": "#CCCCCC"
	},
	"W": {
		"name": "チェス白",
		"text": "　　",
		"backgroundColor": "#CCCCCC",
		"borderColor": "#33333377"
	},
	"B": {
		"name": "チェス黒",
		"text": "　　",
		"backgroundColor": "#444444",
		"borderColor": "#CCCCCC77"
	},
	"w": {
		"name": "チェス白(クレージーハウス)",
		"text": "　　",
		"backgroundColor": "#CCCCCC",
		"borderColor": "#33333377",
		"attr": ["capture"]
	},
	"b": {
		"name": "チェス黒(持ち駒あり)",
		"text": "　　",
		"backgroundColor": "#444444",
		"borderColor": "#CCCCCC77",
		"attr": ["capture"]
	},
	"+": {
		"name": "シャンチー(交点)",
		"text": "　　",
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"intersect": true
	},
	"$": {
		"name": "どうぶつしょうぎ地",
		"text": "　　",
		"backgroundColor": "#FFFFDD",
		"borderColor": "#FFBB77"
	},
	"D": {
		"name": "どうぶつしょうぎ空",
		"text": "　　",
		"backgroundColor": "#AADDFF",
		"borderColor": "#FFBB77"
	},
	"4": {
		"name": "どうぶつしょうぎ夕",
		"text": "　　",
		"backgroundColor": "#FFDDAA",
		"borderColor": "#FFBB77"
	},
	"d": {
		"name": "どうぶつしょうぎ森",
		"text": "　　",
		"backgroundColor": "#DDFFAA",
		"borderColor": "#FFBB77"
	},
	"=": {
		"name": "河界",
		"text": "＝＝",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144"
	},
	"[": {
		"name": "河界左字",
		"text": "＝＝",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"displayText": "河",
		"textRotate": -90
	},
	"]": {
		"name": "河界右字",
		"text": "＝＝",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"displayText": "界",
		"textRotate": 90
	},
	"#": {
		"name": "九宮",
		"text": "　：",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"attr": ["palace"]
	},
	"<": {
		"name": "九宮左",
		"text": "　＼",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderSlashLeft": true,
		"attr": ["palace", "palaceSlash"]
	},
	">": {
		"name": "九宮右",
		"text": "　／",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderSlashRight": true,
		"attr": ["palace", "palaceSlash"]
	},
	"*": {
		"name": "九宮中",
		"text": "　※",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderSlashLeft": true,
		"borderSlashRight": true,
		"attr": ["palace", "palaceSlash"]
	},
	".":{
		"name": "立入禁止",
		"text": "＃＃",
		"backgroundColor": "#00000000",
		"borderColor": "#00000000",
		"attr": ["keepOut"]
	}
}
