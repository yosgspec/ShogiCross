# ゲームデータ定義仕様書
ゲームのボードや駒はjsonファイルの編集を行うことで可能としている。  
ファイルの仕様については下記を参照のこと。

## ゲームデータ
### [gameSoft.json](./gameSoft.md)
ゲーム情報(ボード+駒)をプリセットとしてまとめたデータ。

### [games.json](./games.md)
ゲームの種類に共通する駒情報や駒配置情報。

### [canvasFont.json](./canvasFont.md)
Canvas用のGoogleフォント情報。

## ボードデータ
### [boards.json](./boards.md)
ボードの構成情報。

### [panels.json](./panels.md)
ボード中のマス目情報。

## 駒データ
### [pieces.json](./pieces.md)
駒情報をリスト化したデータ。

### [pieceRange.json](./pieceRange.md)
駒の移動範囲をリスト化したデータ。

### [pieceCost.json](./pieceCost.md)
駒の価値情報駒の価値をリスト化したデータ。

