const panels = {
	"S": {
		"name": "将棋",
		"text": "　　",
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"attr": []
	},
	"M": {
		"name": "マークルック",
		"text": "　　",
		"backgroundColor": "#BB7744",
		"borderColor": "#000000",
		"borderWidth": 5,
		"attr": []
	},
	"W": {
		"name": "チェス白",
		"text": "　　",
		"backgroundColor": "#CCCCCC",
		"borderColor": "#33333377",
		"borderWidth": 5,
		"attr": []
	},
	"B":  {
		"name": "チェス黒",
		"text": "　　",
		"backgroundColor": "#333333",
		"borderColor": "#CCCCCC77",
		"borderWidth": 5,
		"attr": []
	},
	"=": {
		"name": "河界",
		"text": "＝＝",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"borderWidth": 5,
		"attr": ["river"]
	},
	"[": {
		"name": "河界左字",
		"text": "＝＝",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"borderWidth": 5,
		"textDisplay": "河",
		"textRotate": -90,
		"attr": ["river"]
	},
	"]": {
		"name": "河界右字",
		"text": "＝＝",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"borderWidth": 5,
		"textDisplay": "界",
		"textRotate": 90,
		"attr": ["river"]
	},
	"#": {
		"name": "九宮",
		"text": "　：",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"attr": ["palace"]
	},
	"<": {
		"name": "九宮左",
		"text": "　＼",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"borderSlushLeft": true,
		"attr": ["palace", "palaceLeft"]
	},
	">": {
		"name": "九宮右",
		"text": "　／",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"borderSlushRight": true,
		"attr": ["palace", "palaceRight"]
	},
	"*": {
		"name": "九宮中",
		"text": "　※",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"borderSlushLeft": true,
		"borderSlushRight": true,
		"attr": ["palace", "palaceRight", "palaceLeft"]
	},
	".":{
		"name": "立入禁止",
		"text": "＃＃",
		"backgroundColor": "#00000000",
		"borderColor": "#00000000",
		"borderWidth": 5,
		"attr": ["keepOut"]
	}
}
