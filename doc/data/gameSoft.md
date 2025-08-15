# gameSoft.json
ゲーム情報(ボード+駒)をプリセットとしてまとめたデータ。  
new Board()及びBoard.run()に与えるとそのまま実行が行える。  
ゲーム名をキーとして、辞書データの中の一項目として追加する。

## name {string}
ゲーム名。
```json
"name": "将棋"
```

## variant(省略可) {string}
ゲームの分類。
```json
"variant": "将棋"
```

## url(省略可) {string}
ゲームの詳細についてのURL。
```json
"url": "https://ja.wikipedia.org/wiki/%E3%83%81%E3%82%A7%E3%82%B9"
```

## desc(省略可) {string}
ゲームについての説明文。
```
"desc": "駒に画像を設定したチェス。"
```

## playBoard {string}
使用するボード名 = boards.jsonに列挙されるキー。
```json
"playBoard": "将棋"
```

## useStand(省略可) {boolean}
駒台の使用有無。
```json
"useStand": true
```

## playerOptions {{gameName: string, pieceSet: string, cpuEngine: string?}[]}
プレイヤー設定。配列形式でプレイヤー分記載。  
gameName: 配置する駒のゲーム名  
pieceSet: 駒の配置バリエーション  
cpuEngine: CPUエンジン。現行パラメータは下記。

|パラメータ|詳細
|:----|:----
|未指定|CPUを使用しない。手動操作。
|random|ランダム移動を行うCPU
|greedy|Greedy法で実装されたCPU
|minimax|Minimax法で実装されたCPU


### gameName {string}
分類上のゲーム名 = games.jsonに列挙されるキー。

### pieceSet(省略可) {string}
駒セットの名称 = positionの2層目のキー。
```json
[
	{"gameName": "将棋", "pieceSet": "default"},
	{"gameName": "将棋", "pieceSet": "2p"}
]
```
