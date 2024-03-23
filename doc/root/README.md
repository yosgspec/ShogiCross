# ディレクトリ構成 - ShogiCross
html/canvasで将棋類の駒を使ってわちゃわちゃできるものを作る  
[ゲームページ](http://shogicross.yosgspec.com)

## doc/
ドキュメント類

### lib/README.md
ライブラリとしての使用方法を記述

### json/README.md
ゲームデータの定義仕様を記述

### pieces/README.md
駒の情報を記述

### positions/README.md
駒の配置情報を記述

### root/README.md
これ

### 超棋.pdf
過去に作った同様のコンセプトで作成した将棋のペーパークラフト

## src/
そのままWeb公開を行うファイル類

### index.html
メインページ

### pieceViewer.html
使用できる駒を表示を行うだけのCanvas

### playGround.html
動かしながらゲームごとの動かし方を試すことができる将棋類紹介ページ

### game/
Webページ固有の動作を記述するプログラム類

#### playGame.js
起動するゲーム情報を記述

#### boardTemplate.js
Canvasサイズやパネルサイズを定義

#### selectControl.js
画面上のセレクトボックスを制御

### dist/
本アプリの呼び出し例を各ゲームごとに用意したもの、配布用フォルダとしても想定

### doc/api/
本アプリをライブラリと使用する場合のAPIドキュメント(自動生成)

### ShogiCross/
#### lib.js
呼ばれるインポート情報を統合

#### core/
ゲームの中心機能を構成するプログラム類

##### canvasFontLoader.js
Canvas用のGoogleフォントローダー

##### canvasImageLoader.js
Canvas用の画像ローダー

##### board.js
ゲームで使用するボードを構成

##### stand.js
駒台を構成

##### panel.js
ボード中の1マスを構成

##### piece.js
ボードに配置する駒を構成

##### uiControl.js
マウスなどゲームの操作を構成

##### checkTarget.js
駒の移動範囲を取得

##### enPassant.js
アンパッサンに冠する情報を管理

##### downloadImage.js
画像のダウンロード機能を実装

##### bod.js
BOD形式の入出力に必要な汎用処理を実装

#### json/
json形式でゲームに必要なデータを記載

##### canvasFont.json
Canvas用のGoogleフォント情報

##### gameSoft.json
ゲームの起動情報

##### games.json
ゲームの種類に共通する駒情報や駒配置情報

##### boards.json
ボードの構成情報

##### panels.json
ボード中のマス情報

##### pieces.json
駒情報

##### pieceRange.json
駒の移動範囲情報

##### pieceCost.json
駒の価値情報

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

### dist/
公開用のペーパークラフトデータ

### README.md
ペーパークラフトデータの使用方法等を記述

## work/
作業ディレクトリ

### shogiCross.ods
ゲーム情報の取りまとめや駒のペーパークラフトデータを作成

### board.ods
ゲームボードのペーパークラフトデータを作成

### boardMini.ods
ゲームボードのペーパークラフトデータを作成(小)

## README.md
プロジェクト全体のドキュメント

## TODO.md
開発方針をぼんやり定義したもの

## package.json
ライブラリのビルド設定、テスト環境の起動設定

## buildAfter.js
ビルド後のコードの最小化、ファイル移動・コピーを実行

## img/
汎用画像を配置

## LICENSE
CC0、いわゆるパブリックドメイン

## favion.ico
ファビコン。htmlで使うやつ

## gspec24.css
CSS。htmlで使うやつ
