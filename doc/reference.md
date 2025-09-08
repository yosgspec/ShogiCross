# 参考実装・類似アプリの紹介
## このページは?
ShogiCrossの実装にあたって参考にした実装やアプリがあるため、それをここにまとめる。  
ShogiCrossのコンセプトに異種格闘も含まれるが、意外と他にも対応しているソフトが存在するためこれもまとめた。

## ShogiCross
### [ShogiCross](https://shogicross.yosgspec.com/#app)
* 分類: Webアプリ、UIライブラリ、将棋用ゲームエンジン、ペーパークラフト、アクリルカット用データ
* ライセンス: CC0(パブリックドメイン)
* 設計思想
    * 世界の将棋類・古将棋で駒遊びをできるようにする
    * 世界の将棋類・古将棋で異種格闘をできるようにする
    * 盤面をテキストベースで表現できるようにする
    * コア機能はコンパクトに保ち、画像なしで動くようにする
    * 外部ライブラリに依存しない
    * ビルド不要でブラウザで動くようにする(vanilla.js)
    * 4人対戦に対応する
    * 駒や将棋盤などのデータ拡張を容易にする
    * CPU対戦、オンライン対戦はおまけ
    * ShogiCross App及びツール類はその機能を利用した実装である
    * ペーパークラフトやアクリルカットで現実世界に召喚する

### [混合将棋 -超棋-](https://drive.google.com/file/d/0B75PndrlQqwbZnNONVN4NHpTcWc/view?resourcekey=0-i0UIfQRzmfqTaelhUcYSoA)
* 分類: ルール提案、ペーパークラフト
* ShogiCrossの原案
* ルール提案+遊びの実現手法としてのペーパークラフトの構成

## 外部サイト
### [将棋とチェスが同じ盤で戦うスレ](https://web.archive.org/web/20060225234451/http://www.geocities.co.jp:80/Playtown-Toys/8188/)
### [CSSG](https://web.archive.org/web/20181107161900/http://www.geocities.co.jp/SiliconValley-Sunnyvale/4739/shogi/)
* 分類: ルール提案、Windowsアプリ
* 将棋とチェスを対決させるという思想の発端  
  特にテキスト周りの大半を引き継いでいる
* CSSGはその対戦を行うためのソフト  
  オンライン対戦対応(今でも動くのかどうかは謎)

### [自作変則将棋　『連合将棋』](https://web.archive.org/web/20131103225945/http://blog.hangame.co.jp/P427369068/article/40534170/)
* 分類: ルール提案
* 世界の将棋で対戦を行うためのルール提案  
  超棋のルール制定時に参考にさせてもらった

### [んとか将棋](https://syouginojikan.web.fc2.com)
* 分類: Webアプリ
* 将棋、チェス、どうぶつしょうぎ、中将棋、チャトランガ、京都将棋で遊べる
* CPU対戦または一人指しに対応
* 棋譜の表現方法を参考にさせてもらった

### [Kifu for JS](https://kifu-for-js.81.la)
### [shogi-player](https://shogi-player.netlify.app)
### [Shogi Board](https://murosan.github.io/shogi-board/)
* 分類: UIライブラリ
* ライセンス: Kifu for JS(MIT)、shogi-player(AGPL)、Shogi Board(MIT)
* 将棋をWeb上で表現するためのUIライブラリ
* 表示UI、BOD表現を参考にさせてもらった

### [ちぇりしょい](https://www.freem.ne.jp/win/game/6444)
* 分類: Windowsアプリ
* 将棋、チェス、囲碁、リバーシでも異種格闘ゲーム
* オンライン対戦対応

### [二零将棋](https://sites.google.com/takasagosewoi.net/20shogi)
* 分類: Steamアプリ、スマホアプリ、Switch用ソフト
* 世界の将棋と古将棋の駒で自由に配置して対戦する
* 根本的な思想は割と近いと思う
* CPU、オンライン対戦対応

### [将棋RPG](https://hothukurou.com/game/Shogi/index.html)
* 分類: Webアプリ
* 入手した駒を自陣に自由に配置してステージ攻略をする
* 持ち駒無し
* トライルールあり
* CPU対戦対応

### [将棋ライク](https://unityroom.com/games/shougi-like)
* 分類: Webアプリ、スマホアプリ
* 将棋+ローグライク
* ランダムで入手できる駒を活用してステージ攻略をする
* オリジナル駒多数
* 持ち駒無し
* CPU対戦対応

### [超次元盤上遊戯カオスボード](https://store.steampowered.com/app/2905650)
* 分類: Steamアプリ
* 将棋、チェス、リバーシ、カードゲームでごちゃまぜに対戦するゲーム
* 2025年内にリリースされるとのこと

### [Zillions of Games](https://www.zillions-of-games.com)
### [Zillions of Games@ウィキ](https://w.atwiki.jp/zillionsofgames)
* 分類: Windowsアプリ(有料)、ボードゲームエンジン
* 元祖汎用ボードゲームツール
* 拡張性が高く、様々な将棋類の拡張が作成されている
* CPU対戦対応

### [Dagaz Project](https://dagazproject.github.io)
* 分類: Webアプリ、ボードゲームエンジン
* ライセンス: MIT
* Zillions of Gamesの後継を目指したボードゲームエンジン
* 様々な将棋類で対戦できる
* CPU対戦対応

### [将棋ったー](https://shogitter.com)
* 分類: Webアプリ
* 様々な将棋類(特殊ルール、古将棋メイン)で対戦できる
* CPU、オンライン対戦対応

### [Chess Variant Pages](https://www.chessvariants.org)
* 分類: Webアプリ
* 世界の将棋類を遊べるサイト
* 対応する将棋類はかなり多数  
  Grant Acedrexみたいなレアな奴も置いてある
* CPU、オンライン対戦対応

### [Chess Remix](https://chessremix.app)
* 分類: スマホアプリ(基本無料)、Steamアプリ(有料)
* 色々な将棋類を遊べるスマホ用アプリ
* 自分でルールを作成できる

### [jocly](https://jocly.jcfrog.com/joclymatch/gamespanel.php)
* 分類: Webアプリ、ボードゲームエンジン
* ライセンス: AGPL
* 3Dグラフィックが特徴的なボードゲームエンジン
* 将棋は入っていないけど、チェス類が豊富
* CPU、オンライン対戦対応
