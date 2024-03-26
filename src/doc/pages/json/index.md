# ゲームデータ定義仕様書
ゲームのボードや駒はjsonファイルの編集を行うことで可能としている。  
ファイルの仕様については下記を参照のこと。

## ゲームデータ
### [gameSoft.json](./#json/gameSoft)
ゲーム情報(ボード+駒)をプリセットとしてまとめたデータ。

### [games.json](./#json/games)
ゲームの種類に共通する駒情報や駒配置情報。

### [canvasFont.json](./#json/canvasFont)
Canvas用のGoogleフォント情報。

## ボードデータ
### [boards.json](./#json/boards)
ボードの構成情報。

### [panels.json](./#json/panels)
ボード中のマス目情報。

## 駒データ
### [pieces.json](./#json/pieces)
駒情報をリスト化したデータ。

### [pieceRange.json](./#json/pieceRange)
駒の移動範囲をリスト化したデータ。

### [pieceCost.json](./#json/pieceCost)
駒の価値情報をリスト化したデータ。

