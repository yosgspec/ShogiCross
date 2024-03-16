# ライブラリ【ShogiCross】
将棋クロスはライブラリとして使用することも想定されている。  
ライブラリとしての使用例は下記を参照。

[/src/dist/](/src/dist/)  
http://shogicross.yosgspec.com/dist/  

## 必要ファイル
[Webページ](http://shogicross.yosgspec.com/)のダウンロードリンクから入手(ZIP形式)。  
npmを使っての導入も可能。
```sh
npm install shogicross
```
基本ゲームデータについては次のコマンドで配置する。  
package.jsのmainに設定されるパスへ配置される。
```sh
shogicross-init
# または
npx shogicross-init
```

### ライブラリ本体(下記のいずれか必要)
* ShogiCross.js (標準)
* ShogiCross.min.js (最小化)
  * ES Moduleで読み込む
* ShogiCross.g.js (グローバル版(iife))
* ShogiCross.g.min.js (グローバル版(iife):最小化)
  * グローバルモジュール(ShogiCross)として読み込む
* ShogiCrossディレクトリ
  * エントリポイント: ShogiCross/lib.js

APIの仕様については[ドキュメント](http://shogicross.yosgspec.comdoc/api/)を参照(自動生成のため見にくいけど)。

### ゲームデータファイル
* json/ShogiCrossディレクトリ
* img/ShogiCrossディレクトリ

記述内容は[ゲームデータ定義仕様書](/doc/json/README.md)を参照。
