# ディレクトリ構成【ShogiCross】
html/canvasで将棋類の駒を使ってわちゃわちゃできるものを作る  
[ゲームページ](http://tool.yosgspec.com/shogiCross/)

## docs/
ドキュメント用ディレクトリ

### positions/README.md
駒の配置情報を記述

### root/README.md
これ

### 超棋.pdf
過去に作った同様のコンセプトで作成した将棋のペーパークラフト

## shogiCross/
そのままWeb公開を行うファイル類

### index.html
メインページ

### pieceViewer.html
使用できる駒を表示を行うだけのCanvas

### game/
Webページ固有の動作を記述するプログラム類

#### playGame.js
起動するゲーム情報を記述

#### boardTemplate.js
Canvasサイズやパネルサイズを定義

#### selectControl.js
画面上のセレクトボックスを制御

### ShogiCross/
#### lib.js
呼ばれるインポート情報を統合

#### core/
ゲームの中心機能を構成するプログラム類

#### extendCanvasFonts.js
Canvas用のGoogleフォントローダー

#### board.js
ゲームで使用するボードを構成

#### panel.js
ボード中の1マスを構成

#### piece.js
ボードに配置する駒を構成

#### stand.js
駒台を構成

#### uiControl.js
マウスなどゲームの操作を構成

#### checkTarget.js
駒の移動範囲を取得

### json/
json形式でゲームに必要なデータを記載

#### canvasFont.json
Canvas用のGoogleフォント情報

#### boards.json
ボードの構成情報

#### panels.json
ボード中のマス情報

#### games.json
ゲームの種類に共通する駒情報や駒配置情報

#### pieces.json
駒情報

#### pieceRange.json
駒の移動範囲情報

#### pieceCost.json
駒の価値情報

#### pieceEn,js
駒の英語簡易表記  
中将棋対応面倒なため廃止候補

## other/
その他のファイルとか

### py/
CLIで色々やろうとしていた時の残骸

### getFontFilter.py
ソース中に含まれる文字を抽出するスクリプト

### makeSvg.html
SVGで将棋駒を描写しようとしたなにか

## paper/
ペーパークラフト関連ディレクトリ

### work/
作業ディレクトリ

### dist/
公開用のペーパークラフトデータ

## README.md
プロジェクト全体のドキュメント

## LICENSE
Unlicence、つまりパブリックドメイン(CC0)

## gff.sh
getFontFilter.pyを簡易的なコマンド呼べるようにするだけのシェルスクリプト

## favion.ico
ファビコン。htmlで使うやつ

## gspec20.css
CSS。htmlで使うやつ
