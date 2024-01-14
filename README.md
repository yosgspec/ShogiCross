# CrossOverChess
html/canvasで将棋類の駒を使ってわちゃわちゃできるものを作る

## crossOverChess/
そのままWeb公開を行うファイル類

### index.html
メインページ

### pieceViewer.html
使用できる駒を表示を行うだけのCanvas

### game/playGame.js
Webページ固有の動作を記述するプログラム

### core/
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

### json/
json形式でゲームに必要なデータを記載  
ローカルでの読み込みが面倒なためjsonとは名ばかりでjsとして読み込ませている

#### canvasFont.json.js
Canvas用のGoogleフォント情報

#### boards.json.js
ボードの構成情報

#### panels.json.js
ボード中のマス情報

#### games.json.js
ゲームの種類に共通する駒情報や駒配置情報

#### pieces.json.js
駒情報

#### pieceCost.json.js
駒の価値情報

## py/
CLIで色々やろうとしていた時の残骸

## other/
その他のファイルとか
