# ライブラリ【ShogiCross】
将棋クロスはライブラリとして使用することも想定されている。  
ライブラリとしての使用例は下記を参照。

[/src/dist/](/src/dist/)  
http://shogicross.yosgspec.com/dist/  

## 必要ファイル
下記のいずれかの方法でライブラリファイルを準備する。

### Webページ
[Webページ](http://shogicross.yosgspec.com/)のダウンロードリンクから入手(ZIP形式)。  

### npm
[npm](https://www.npmjs.com/package/shogicross)から入手。
```sh
npm install shogicross
```
ゲームデータのテンプレートファイルは次のコマンドで配置。  
配置パスはプロジェクトのルートディレクトリとなる。
```sh
shogicross template
# または
npx shogicross template
```

### CDN
iife(グローバルモジュール版)が下記のURL直リンクで使用可能。
```html
<script src="https://cdn.jsdelivr.net/gh/yosgspec/ShogiCross@0.2.1/src/dist/ShogiCross.g.min.js"></script>
```

#### ライブラリ本体(下記のいずれか必要)
* ShogiCross.js (標準)
* ShogiCross.min.js (最小化)
  * ES Moduleで読み込む
* ShogiCross.g.js (グローバル版(iife))
* ShogiCross.g.min.js (グローバル版(iife):最小化)
  * グローバルモジュール(ShogiCross)として読み込む
* ShogiCrossディレクトリ
  * エントリポイント: ShogiCross/lib.js

APIの仕様については[ドキュメント](http://shogicross.yosgspec.comdoc/api/)を参照(自動生成のため見にくいけど)。

#### ゲームデータ拡張ファイル
* [json/ShogiCrossディレクトリ](src/img)
* [img/ShogiCrossディレクトリ](src/json)

記述内容は[ゲームデータ定義仕様書](/doc/json/README.md)を参照。
