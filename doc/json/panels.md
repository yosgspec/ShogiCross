# panels.json
ボード中のマス目情報。  
マス目の名称をキーとして、辞書データの中の一項目として追加する。

## name {string}
マス目の名前。
```json
"name": "将棋"
```

## text {string}
ボードを文字列で表示する時の文字列。全角2文字であること。
```json
"text": "　　"
```

## backgroundColor {string}
マス目の色。
```json
"backgroundColor": "#EECC88"
```

## borderColor {string}
マス目の枠色及びフォント色。
```json
"borderColor": "#333333"
```

## selectColor(省略可) {string}
マス目を選択した時の色。
```json
"selectColor": "#FF000066"
```

## targetColor(省略可) {string}
駒を選択した時の色。
```json
"targetColor": "#00FF0066"
```

## displayText(省略可) {string}
マス目に表示する文字(1文字のみ)。
```json
"displayText": "界",
```

## textRotate(省略可) {number}
マス目に表示する文字の回転角(deg)。  
値が正の場合は右回り、負の場合は左回りとなる。
```json
"textRotate": 90
```

## borderSlashLeft(省略可) {boolean}
左斜線(＼)の有無。
```json
"borderSlashLeft": true
```

## borderSlashRight(省略可) {boolean}
右斜線(／)の有無。
```json
"borderSlashRight": true
```

## intersect(省略可) {boolean}
交点を中心とする。
```json
"intersect": true
```

## attr(省略可) {string[]}
マス目の機能を属性として配列に記載。  
主な属性値は下記。

|属性値|詳細
|:----|:----
|palace|九宮
|palaceSlash|九宮の斜線
|keepOut|進入禁止

```json
"attr": ["palace", "palaceSlish"]
```
