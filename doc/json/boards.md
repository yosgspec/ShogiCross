# boards.json
ボードの構成情報。  
ゲームボード名をキーとして、辞書データの中の一項目として追加する。

## backgroundColor {string}
ボード及び駒台の色。
```json
"backgroundColor": "#EECC88"
```

## borderColor {string}
ボード及び駒台の枠色。
```json
"borderColor": "#333333"
```

## borderWidth {number}
ボード及び駒台の線の太さ。
```json
"borderWidth": 2
```

## promoLineOffset(省略可) {number}
ボード自体のプロモーションライン(成りの段)のオフセットを設定。  
値が正の場合は手前、負の場合は奥方向へズレる。
```json
"promoLineOffset": 1
```

## sidePromo(省略可) {boolean}
ボードの横方向での成りを有効化する。  
主に4人用の配置で使用する。
```json
"sidePromo": true
```

## field {string[]}
ボードのマス目配置。辞書形式で記載。  
マス目の一文字表記を文字列の配列として配置する。  
(マス目の一文字表記 = panels.jsonに列挙されるキー)
```json
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
```
