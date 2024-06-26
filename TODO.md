# TODO
## やる予定のこと
* [x] 角度によって駒画像の差替えを検討する
* [ ] エイリアスが存在しない時よしなにする
* [ ] 駒画像設定時の成挙動がおかしい件を確認
* [ ] 棋譜関連機能強化
  * KIFU形式でそれとなく読めるようにする
  * [ ] JSONでない1行1手形式の文字列で棋譜を取り込めるようにする
    * 初期盤面の定義はどうする?
    * [ ] 下記形式の数字を認識できるようにする
      * [ ] 36進数(1文字形式)
      * [ ] 漢数字
      * [ ] コンマ区切り数字
      * [ ] 同手(前回移動先座標)
    * [ ] 回転角と駒の整合性も一応確認する
    * [ ] △☗☖を適切に変換する
    * [ ] 手番省略記法を検討する
      * キャスリング・アンパッサンなどの2手表現に注意する
    * [ ] プレイヤー名の指定を検討する
    * [ ] 棋譜コメントを実装する\*〜
  * [ ] 棋譜コメントの読み書きに対応
    * [ ] 操作パネルとの連携方法を検討する
  * [ ] 最終手を強調
* [ ] undo/redoに返り値を設定する(手数の変更可否)
* [ ] GitHub Actionsにデプロイを追加する
* [ ] テスト追加検討
  * [ ] ファイル/メソッドごとに確認事項を列挙
  * [ ] 駒の移動w仕様を列挙する
    * [ ] 移動範囲ごとに例となる駒を選定する
  * [ ] テストライブラリ追加
  * [ ] テスト実装

## 検討中のこと
* [ ] ゲームとして成立するようにする
* [ ] 2手で1手とみなせるようにする
  * [ ] アンパッサン、キャスリング、獅子、飛鷹、角鷲など
  * [ ] 他の駒の移動を全てブロッキングとか?
* [ ] エラートラップの充実
* [ ] ドキュメントを本物のSPAにする

## (現状)やる予定のないこと/できないこと
* CPU実装
* ネット対戦対応
* TypeScript化
  * vanillaで動く環境を維持したい
* jQuery導入
  * むやみに依存関係を増やすのはNG

## 対応済み
* [x] バグ修正
  * [x] 持ち駒から初回移動のある駒を打った時、その移動ができてしまう
  * [x] 盤面と持ち駒が同期していない
  * [x] 成駒のサイズが読み込んだ時おかしくなる
* [x] 2chの将棋対チェスの棋譜を取り込む
* [ ] ~~HistoryAPIを適用~~
  * フレームワーク導入しないと無理っぽいので諦める。
* [x] jsonファイルの配置以外の拡張データの設定方法を提供する
* [x] GitHub Workflowを設定する
  * [x] GitHub Workflowへビルド処理を追加する
  * [x] ステータスバッジを追加する
  * [ ] ~~actを導入する~~
* [ ] ~~ヘルプサンプルにコード実行機能を追加する。~~
* [x] ドキュメントを修正
  * [x] freeModeを書き換える
  * [x] PlayerControlについて追記
  * [x] makePlayerControlについて追記
  * [x] moveRecord
  * [x] record2String
  * [x] ドキュメントのライブラリをCDNへ再差し替え
  * [x] iframe内のCSSを調整
* [x] 駒を動かせないモードを用意する
* [x] 操作パネルを実装
  * [x] 操作パネルのフォント読み込み対応
  * [x] 操作パネルの棋譜表示をセレクトボックスにする
  * [x] 操作パネルを配置する機能を追加
* [x] メニューページを様々なページにつけられるようにしてレイアウトを統合する
  * [x] アプリをiframeで埋め込む
  * [x] 各種mdをhtmlに変換して配置する
    * [ ] ~~GitHub+Jekillでhtml化~~
    * [x] npmライブラリでhtml化
      * pandoc以外にまともなcliツールなさそう…
      * 面倒だけどmarkdown-itでスクリプト書いた
  * [x] 超棋pdfを埋め込む
  * [x] ペーパークラフトのzipを用意する
* [ ] ~~ドキュメントのレイアウトが怪しいのを何とかする~~
  * [ ] ~~iframeの使用をやめる。~~
  * [ ] ~~fetchでのデータ読込をimportにする。~~
* [x] 機能ごとにサンプルとヘルプを作成する(逆引き的に)。
  * [x] ボードを作成(run, new)
  * [x] ボードの初期化オプション
  * [x] ボードの初期配置
  * [x] ボードの任意配置
  * [x] ボードに駒の単体配置
  * [x] ボードのテキスト表示
  * [x] ボードの描写
  * [x] キャンバスの寸法変更について
  * [x] 描写寸法(ボード、パネル、駒、背景色、ボーダー太さ)
  * [x] 駒の影の描写
  * [x] 駒の格によるサイズ変更
  * [x] 駒台を設定
  * [x] ボードの自動描写
  * [x] ボードのフリーモード
  * [x] ゲームオーバー
  * [x] ボードを破棄
  * [x] ゲームの参加人数
  * [x] 駒の表示
  * [x] スクリーンショット
  * [x] ボードの回転
  * [x] 棋譜の取得
  * [x] 棋譜データの取得
  * [x] 棋譜データの反映
  * [x] 手を進める・戻す
  * [x] ゲームソフトについて
* [x] gameSoft.jsonの説明文を追記
* [x] Record型の説明文を追記
* [x] 駒台を含めた反転機能を実装する
  * パネルの座標情報が機能しなくなるため現状は保留
  * 回転するたびに座標の書き換えか、パネルに座標情報を持たさないようにする必要がある
  * 古の版では座標情報はボードに握らせていたため当時は問題とならなかった
* [x] ゲームデータファイルが無くても動作できるようにする
  * [x] デフォルトデータを設定する
    * [x] デフォルトデータをjsファイルへ変更
      * firefoxでassertに非対応のため
  * [x] 拡張データに対応する
    * [ ] データのディープマージを対応
      * 言語機能にないため保留。外部ライブラリは一旦検討しない
  * [x] 画像関連データを拡張データに移動
* [x] 「待った」「進める」を実装
* [x] 配置できない箇所に駒を置けなくする
* [x] package.jsonの整備
  * [x] 分裂しているpackage.jsonを統合する
  * [x] shogicross-cliを整備する
    * [x] init(json, imgコピー)以外をできるようにする
    * [x] サンプルファイルを取得する
    * [x] ヘルプを表示する
* [x] js直リン(CDN)を用意する
  * https://www.jsdelivr.com/
  * https://cdn.jsdelivr.net/gh/yosgspec/ShogiCross@main/src/dist/ShogiCross.iife.min.js
* [x] ボードのテキストボックスの表示を調整
  * [x] Textの取得処理を変更・整理
* [x] iife(Global Module)形式のライブラリ配布をできるようにする
  * [x] ビルド設定を行う
  * [x] コード最小化を行う
  * [x] Zipに同梱する
* [x] Zipダウンロードを追加する
  * [x] Zip化処理をアフタービルドへ追加
* [x] ライブラリとして配布する
  * [x] 文面として導入方法を記載
  * [x] jsdocのドキュメント化
  * [ ] 不要なメンバの非公開化
  * [ ] ディレクトリ構成の見直し
  * [x] npmにライブラリとして公開してみる
    * https://deku.posstree.com/share/deploy-npm-library/
* [x] jsonのインポート方法ごとにファイル分割それぞれ一長一短
  * fetch: トップレベルawaitが原因でiife、umdへのビルドが行えない
  * es module: Firefoxで機能しない、viteでソースに取り込まれる
  * XMLHttpRequest: 動作的には問題なさそうだけど非推奨
* [x] Github Pageへ移行
  * [x] 取得済みのドメインのサブドメインとして設定
    * [x] SSL有効化を確認する
  * [x] CSSとファビコン修正
    * [x] 参照を解決する
    * [x] 専用CSSの検討
    * [x] 専用faviconの検討
  * [x] リンク先を解決する
    * [x] ギガスペックファクトリーEX
    * [x] 移行後のShogiCross
    * [x] README
  * [x] 移行前のページをクッションリンクに置き換える
* [x] 泥版スレイプニルで画像を保存できない件を修正
* [x] 王駒の残数カウントを追加
* [x] アプリ・ライブラリの特徴(できること/できないこと)をまとめる
* [x] Standの駒の管理を配列からMapへ変更
* [x] BOD関連の処理をBodクラスに集約
* [x] BOD形式の盤面入力
* [x] マス目に画像を設定できるようにする
* [x] サーバー起動スクリプト追加(vite)
* [x] 将棋類紹介のリンクターゲットを"_blank"に変更
* [x] 表示サイズの自動調整について、親要素依存の値も設定もできるようにする(現在viewport依存のみ)
* [x] 既にstyleのサイズが設定されている場合は上書きしないようにする
* [x] コマのサイズ変更対応(大駒小駒)
  * 駒の価値でサイズ分ける処理は部分的にもう作ってある
* [x] 影をつける
* [x] 画像出力機能を付ける
* [x] 炮、包の駒取得制限追加
* [x] ドキュメントを更新する
  * [x] ファイル差し替え
  * [x] 駒配置画像の差し替え
* [x] index.htmlのゲームセレクトをメイン/バリエーションの2段階選択にする
* [x] BOD形式の盤面出力
* [x] npmで動作する画像最適化ライブラリを導入
* [x] クロスゲームの駒セットがうまく切り替わらない問題を確認
* [x] 型定義ファイル(.d.ts)を生成してみる
  * https://www.typescriptlang.org/ja/docs/handbook/declaration-files/dts-from-js.html
* [x] 将棋類紹介、ゲーム単品リストの処理の軽量化
  * [ ] ~~innerHTML代入に書き換える~~
  * [x] 仮想?DOMの使用・ゲーム起動の非同期化

