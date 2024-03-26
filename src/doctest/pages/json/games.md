# games.json
ゲームの種類に共通する駒情報や駒配置情報。  
ゲーム名をキーとして、辞書データの中の一項目として追加する。  
ここでのゲーム名は分類上のものとし、バリエーションは記載しない。

## english {string}
英語名。現在未使用。
```json
"english": "Shogi"
```

## fontColor(省略可) {string}
駒のフォント色。
```json
"fontColor": "#000000"
```

## promoteFontColor(省略可) {string}
成駒のフォント色。
```json
"promoteFontColor": "#000000"
```

## backgroundColor(省略可) {string}
駒の色。
```json
"backgroundColor": "#FFDDAA"
```

## promoteBackgroundColor(省略可) {string}
成駒の色。
```json
"promoteBackgroundColor": "#FFDDAA"
```

## borderColor(省略可) {string}
駒の枠色。
```json
"borderColor": "#777777"
```

## promoteBackgroundColor(省略可) {string}
成駒の枠色。
```json
"promoteBorderColor": "#FF3300"
```

## promoLine(省略可) {number}
プロモーションライン(成りの段)を設定。  
ボードの奥からの段数を指定。
```json
"promoLine": 3
```

## position {Object<string, Object<string, string[]>>}
駒の配置データ。辞書形式で記載。

### 1階層目(辞書)
キーに整数で対応するボードの横幅(筋数)を指定。

### 2階層目(辞書)
キーに配置形式の名前を指定。標準的な配置は"default"とする。

### 3階層目(配列)
段ごとに一つの文字列として区切り必要な段数分記述する。  
主観的に見た配置で駒の一文字表記を並べる。  
(駒の一文字表記 = pieces.jsonに列挙されるキー)  
空とするマスは駒でない任意の文字を入力することとする(通例的には"・")。
```json
"position": {
	"5": {
		"default": [
			"歩・・・・",
			"玉金銀角飛"
		]
	},
	"9": {
		"default": [
			"歩歩歩歩歩歩歩歩歩",
			"・角・・・・・飛・",
			"香桂銀金玉金銀桂香"
		]
	}
}
```
