# 将棋クロス【ShogiCross】
![](img/logo.min.svg)　<img src="img/all.png" height="200px">  
様々な将棋類を将棋駒として実体化するプロジェクト。

## [収録ゲーム](http://tool.yosgspec.com/shogiCross/playBoard.html)
* 将棋
* チェス
* シャンチー
* チャンギ
* マークルック
* チャトランガ
* どうぶつしょうぎ
* 禽将棋
* 中将棋
* Grand Acedrex
* クーリエチェス
* その他バリエーション等

### [駒情報](doc/pieces/README.md)
実装済の駒の定義一覧。

## [Webアプリ](http://tool.yosgspec.com/shogiCross/)
様々な将棋類の駒を並べるだけの将棋盤のようなツール。

### 特徴
* 様々な将棋類の表示に対応
* オリジナルの駒配置を設定 (チェス対将棋も容易)
* 画像を用意せずに追加駒を設定
* 視覚的にわかりやすい駒データ定義
* Webページに簡単設置
  * <details>
	<summary>サンプルコード</summary>

	```html
	<canvas id="shogiCross"></canvas>
	<script type="module">
	import {Board, gameSoft} from "./ShogiCross.js";
	const board = Board.run(
		document.getElementById("shogiCross"),
		gameSoft.shogi
	);
	</script>
	```
	</details>
* 4人用ルールの定義
* BOD形式での局面入出力機能
* 画像出力機能
* レスポンシブ対応

### 未対応
* 盤面回転機能
* 差し戻し機能
* ゲームごとのルール
* CPU

### [ライブラリ定義](doc/lib/README.md)
将棋クロスを任意のページへ配置できる。  
駒やボードの追加を行うことも可能。  

## [ペーパークラフト](paper/README.md)
様々な将棋類を紙の力で実体化。

## [ディレクトリ構成](doc/root/README.md)
プロジェクトのディレクトリ構成。

## 使用フォント
下記のフォントを採用(優先度順)。
* [Noto Serif JP Black](https://fonts.google.com/noto/specimen/Noto+Serif+JP)
* [Noto Emoji](https://fonts.google.com/noto/specimen/Noto+Emoji?noto.query=emoji)
* [Noto Sans Symbols 2](https://fonts.google.com/noto/specimen/Noto+Sans+Symbols+2?noto.query=Symbols)
* [Noto Sans Symbols](https://fonts.google.com/noto/specimen/Noto+Sans+Symbols?noto.query=Symbols)
* [Noto Serif Black](https://fonts.google.com/noto/specimen/Noto+Serif?noto.query=serif)
* [Noto Serif TC Black](https://fonts.google.com/noto/specimen/Noto+Serif+TC?noto.query=serif+tc)

本来は楷書体が適切だと考えるが文字の網羅性と扱いやすさからNotoフォントで統一。

## 使用ライブラリ
Webアプリの本体についてはVanilla.jsで実装。

ビルドツールとして下記を採用。いずれも最適化のためのもので必須ではない。

|ライブラリ|用途
|:---------|:----
|[Vite](https://ja.vitejs.dev)|コードの1ファイル化
|[Toptal Minifier Tool](https://www.toptal.com/developers/javascript-minifier)|コード最小化
|[TypeScript](https://www.typescriptlang.org/ja/)|型定義ファイル(.d.ts)生成
|[sharp-cli](https://github.com/vseventer/sharp-cli)|画像ファイル最適化
|[documentation.js](https://github.com/documentationjs/documentation)|JSDocドキュメント生成

## [ライセンス](LICENSE)
CC0またはパブリックドメイン。

## その他
その他不足情報があれば、下記を参照。  
(過去類似作成物)
* [超棋.pdf](doc/超棋.pdf)
