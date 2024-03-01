# gameSoft.json
ゲーム情報(ボード+駒)をプリセットとしてまとめたデータ。  
Board.run()に与えるとそのまま実行が行える。  
ゲーム名をキーとして、辞書データの中の一項目として追加する。

## name {string}
ゲーム名。
```json
"name": "将棋"
```

## playBoard {string}
使用するボード名 = boards.jsonに列挙されるキー。
```json
"playBoard": "将棋"
```

## useStand {boolean}
駒台の使用有無。
```json
"useStand": true
```

## playPieces {{gameName: string, pieceSet: string}[]}
駒の配置データ。配列形式でプレイヤー分記載。

### gameName
分類上のゲーム名 = games.jsonに列挙されるキー。

### pieceSet
駒セットの名称 = positionの2層目のキー。
```json
[
	{"gameName": "将棋", "pieceSet": "default"},
	{"gameName": "将棋", "pieceSet": "2p"}
]
```
