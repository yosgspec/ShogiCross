const boards = {
	"将棋": {
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"field": [
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
	"チェス": {
		"backgroundColor": "#333333",
		"borderColor": "#000000",
		"borderWidth": 5,
		"field": [
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
	"シャンチー": {
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"field": [
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
	"チャンギ": {
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"field": [
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
	"マークルック": {
		"backgroundColor": "#BB7744",
		"borderColor": "#000000",
		"borderWidth": 5,
		"field": [
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
	"どうぶつしょうぎ": {
		"backgroundColor": "#FFFFDD",
		"borderColor": "#FFDD99",
		"borderWidth": 5,
		"field": [
			"DDD",
			"$$$",
			"$$$",
			"ddd"
		]
	},
	"4人チェス": {
		"backgroundColor": "#333333",
		"borderColor": "#000000",
		"borderWidth": 5,
		"promoLineOffset": 6,
		"field": [
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
	"四神将棋": {
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"sidePromo": true,
		"field": [
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
	"クロス8列": {
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"field": [
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
	"クロス9列": {
		"backgroundColor": "#EECC88",
		"borderColor": "#333333",
		"borderWidth": 5,
		"field": [
			"MSM<#>MSM",
			"SMS#*#SMS",
			"MSM>#<MSM",
			"SSSSSSSSS",
			"=[=====]=",
			"SSSSSSSSS",
			"MSM<#>MSM",
			"SMS#*#SMS",
			"MSM>#<MSM"
		]
	},
	"4人用クロス8列": {
			"backgroundColor": "#333333",
		"borderColor": "#000000",
		"borderWidth": 5,
		"promoLineOffset": 6,
		"field": [
			"...MSM<#>MS...",
			"...SMS#*#SM...",
			"...MSM>#<MS...",
			"MSMWBWBWBWBSMS",
			"SMSBWBWBWBWMSM",
			"<#>WB===]WBSMS",
			"#*#BW====BW<#>",
			">#<WB====WB#*#",
			"SMSBW[===BW>#<",
			"MSMWBWBWBWBSMS",
			"SMSBWBWBWBWMSM",
			"...SM<#>MSM...",
			"...MS#*#SMS...",
			"...SM>#<MSM..."
		]
	},
	"4人用クロス9列": {
		"backgroundColor": "#333333",
		"borderColor": "#000000",
		"borderWidth": 5,
		"promoLineOffset": 6,
		"field": [
			"...MSM<#>MSM...",
			"...SMS#*#SMS...",
			"...MSM>#<MSM...",
			"MSMBWBWBWBWBMSM",
			"SMSWBWBWBWBWSMS",
			"MSMBWB==]BWBMSM",
			"<#>WB=====BW<#>",
			"#*#BW=====WB#*#",
			">#<WB=====BW>#<",
			"MSMBWB[==BWBMSM",
			"SMSWBWBWBWBWSMS",
			"MSMBWBWBWBWBMSM",
			"...MSM<#>MSM...",
			"...SMS#*#SMS...",
			"...MSM>#<MSM..."
		]
	}
}
