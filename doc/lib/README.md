# ライブラリ【ShogiCross】
将棋クロスはライブラリとして使用することも想定されている。  
ライブラリとしての使用例は下記を参照。

[/src/dist/](/src/dist/)  
http://shogicross.yosgspec.comdist/  

## 必要ファイル
[/src/dist/](/src/dist/)より該当ファイルを取得して配置。  
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
* ShogiCross.js
* ShogiCross.min.js (最小化)
* ShogiCrossディレクトリ
  * エントリポイント: ShogiCross/lib.js

APIの仕様については[ドキュメント](http://shogicross.yosgspec.comdoc/api/)を参照(自動生成のため見にくいけど)。

### ゲームデータファイル
* jsonディレクトリ
* imgディレクトリ

記述内容は[ゲームデータ定義仕様書](/doc/json/README.md)を参照。
