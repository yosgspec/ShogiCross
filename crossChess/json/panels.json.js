const panels = {
	"S": {
		"name": "将棋",
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"attr": []
	},
	"W": {
		"name": "チェス白",
		"backgroundColor": "#CCCCCC",
		"borderColor": "#33333377",
		"borderWidth": 5,
		"attr": []
	},
	"B":  {
		"name": "チェス黒",
		"backgroundColor": "#333333",
		"borderColor": "#CCCCCC77",
		"borderWidth": 5,
		"attr": []
	},
	"=": {
		"name": "河界",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"borderWidth": 5,
		"attr": ["river"]
	},
	"[": {
		"name": "河界左字",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"borderWidth": 5,
		"text": "河",
		"textRotate": -90,
		"attr": ["river"]
	},
	"]": {
		"name": "河界右字",
		"backgroundColor": "#EECC88",
		"borderColor": "#33221144",
		"borderWidth": 5,
		"text": "界",
		"textRotate": 90,
		"attr": ["river"]
	},
	"#": {
		"name": "九宮",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"attr": ["palace"]
	},
	"<": {
		"name": "九宮左",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"borderSlushLeft": true,
		"attr": ["palace", "palaceLeft"]
	},
	">": {
		"name": "九宮右",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"borderSlushRight": true,
		"attr": ["palace", "palaceRight"]
	},
	"*": {
		"name": "九宮中",
		"backgroundColor": "#CC9966",
		"borderColor": "#333333",
		"borderWidth": 5,
		"borderSlushLeft": true,
		"borderSlushRight": true,
		"attr": ["palace", "palaceRight", "palaceLeft"]
	},
	"M": {
		"name": "マークルック",
		"backgroundColor": "#BB7744",
		"borderColor": "#000000",
		"borderWidth": 5,
		"attr": []
	},
	".":{
		"name": "立入禁止",
		"backgroundColor": "#00000000",
		"borderColor": "#00000000",
		"borderWidth": 5,
		"attr": ["keepOut"]
	}
}
