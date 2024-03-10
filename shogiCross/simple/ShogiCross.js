const _ = "./json/ShogiCross/";
async function $(f) {
  return await fetch(`${_}${f}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const O = await $("canvasFont"), pt = await $("gameSoft"), K = await $("games"), Q = await $("boards"), B = await $("panels"), H = await $("pieces"), Z = await $("pieceRange"), tt = await $("pieceCost"), et = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(B).map(({ displayText: f }) => f).join("") + Object.values(H).map(({ display: f }) => f ? f.join("") : "").join("")
  ])
].sort().join("");
Object.assign(O, {
  /** 読み込み済みであるか? */
  imported: !1,
  /** 読み込むフォントの一覧(","区切り)
   * @type {string}
   */
  names: "",
  /** フォントの読み込み
   * @returns {Promise<void>}
   */
  async importAsync() {
    if (this.imported)
      return;
    const f = "https://fonts.googleapis.com/css2?family=", t = et(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = O.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      O.fonts.map(async ([s, i]) => {
        const r = s.replace(/ /g, "+"), o = `${f}${r}:wght@${i}&text=${t}`, h = await fetch(o);
        if (!h.ok)
          return;
        const n = (await h.text()).match(/url\(.+?\)/g);
        if (!n)
          throw new Error("Not found font.");
        for (const c of n) {
          const l = new FontFace(`${s}${e}`, c);
          document.fonts.add(l), await l.load().catch(() => {
          });
        }
      })
    ).then((s) => this.imported = !0);
  }
});
function st(f) {
  return new Promise((t) => {
    const e = new Image();
    e.src = f, e.onload = () => t(e);
  });
}
const it = [...new Set(
  Object.values(B).flatMap(({ imgSrc: f }) => f ?? []).concat(Object.values(H).flatMap(({ imgSrc: f }) => f ?? []))
)], z = {
  /** 読み込み済みであるか? */
  imported: !1,
  /** 読み込んだ画像データ
   * @type {Object<string, Image>}
   */
  images: {},
  /** 画像の読み込み
   * @returns {Promise<void>}
   */
  async importAsync() {
    if (!this.imported)
      return Promise.all(
        it.map(async (f) => {
          this.images[f] = await st(f);
        })
      ).then((f) => this.imported = !0);
  }
}, rt = (f) => "image/" + f.replace("jpg", "jpeg");
function ot(f, t = "image", e = "png") {
  return new Promise((s) => {
    f.toBlob((i) => {
      const r = document.createElement("a");
      return r.href = URL.createObjectURL(i), r.download = `${t}.${e}`, r.click(), URL.revokeObjectURL(r.href), s();
    }, rt(e));
  });
}
class T {
  /** 駒の角度表示
   * @type {Object<string, string>}
   */
  static pieceDegChars = {
    0: " ",
    180: "v"
  };
  /** マス目の表示
   * @type {string}
   */
  static panelText = " ・";
  /** 持駒の角度表示
   * @type {Object<string, string>}
   */
  static standDegChars = {
    0: "先手の持駒：",
    180: "後手の持駒："
  };
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static num2Row(t, e = !0) {
    if (!e && t <= 1)
      return "";
    const s = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"], i = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"], r = t % 10, o = 0 | t / 10;
    return i[o] + s[r];
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static num2Col(t) {
    if (10 <= t)
      return t;
    const e = "０１２３４５６７８９", s = t % 10;
    return e[s];
  }
}
class nt {
  #t;
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {string} char - マス目を示す文字
   * @param {number} center - 描写するX座標(中心原点)
   * @param {number} middle - 描写するY座標(中心原点)
   * @param {number} width - マス目幅
   * @param {number} height - マス目高さ
   * @param {number} borderWidth - 枠線の太さ
   * @param {number} pX - ボード上のマス目の列
   * @param {number} pY - ボード上のマス目の行
   */
  constructor(t, e, s, i, r, o, h, a, n) {
    Object.assign(this, B[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = h, this.pX = a, this.pY = n, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
  }
  /** マス目の選択状態
   * @param {boolean} value
   */
  set isSelected(t) {
    this.#t = this.hasAttr("keepOut") ? !1 : t;
  }
  get isSelected() {
    return this.#t;
  }
  /** 属性の存在を確認
   * @param {string} attr - 属性
   * @returns boolean
   */
  hasAttr(t) {
    return this.attr.includes(t);
  }
  /** 座標がマス目に含まれるか判定
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  checkRangeMouse(t, e) {
    return this.left <= t && t < this.right && this.top <= e && e < this.bottom;
  }
  /** マス目/マスク/駒を描写 */
  draw() {
    const { selectColor: t, targetColor: e } = this;
    this.drawPanel(), this.isSelected && this.drawMask(t), this.isTarget && this.drawMask(e), this.piece?.draw();
  }
  /** マス目を描写 */
  drawPanel() {
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: h, displayText: a, textRotate: n } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, h), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, h), t.moveTo(0, h / 2), t.lineTo(o, h / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, h), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, h)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, h)), t.closePath(), t.stroke(), t.restore(), a) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const c = n ? n * Math.PI / 180 : 0;
      t.rotate(c);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${O.names}`;
      const p = t.measureText(a).width, w = l / 2 * 0.8;
      t.fillText(a, -p / 2, w), t.restore();
    }
  }
  /** マス目にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(t) {
    const { ctx: e } = this;
    e.fillStyle = t, e.fillRect(this.left, this.top, this.width, this.height);
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  getBodText() {
    return T.panelText;
  }
  /** 文字列形式で取得
   * @param {string} - 簡易表示
   */
  toString(t = !1) {
    return t ? `｜${this.text.slice(-1).replace(/　/g, "・")}` : this.text;
  }
}
class y {
  /** 描写サイズ
   * @type {number}
   */
  static size = 45;
  /** 格の違いによって駒の大きさを変更するか
   * @type {boolean}
   */
  static useRankSize = !0;
  /** 影の描写有無
   * @type {boolean}
   */
  static isDrawShadow = !0;
  /** テキスト出力時のプレイヤー表示
   * @type {Object<string, string>}
   */
  static degChars = {
    0: "▲",
    90: "≫",
    180: "▽",
    270: "＜"
  };
  /** プレイヤー表示から角度を取得 */
  static charDegs = {};
  /** サイズ変更設定値
   * @type {Object<string, number>}
   */
  static rankRatio = {
    KR: 1,
    SR: 0.965,
    R: 0.935,
    UC: 0.9,
    C: 0.865
  };
  /** 駒の段階別価値を取得 */
  get rank() {
    return this.cost <= 0 ? "KR" : 20 <= this.cost ? "SR" : 10 <= this.cost ? "R" : 5 <= this.cost ? "UC" : "C";
  }
  /** 駒データを初期化
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Object<string, any>} options - 駒の初期化オプション
   */
  static getPieces(t, e = {}) {
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(H))));
    for (const [r, o] of s)
      o.attr ??= [], o.unit && (o.base = o);
    for (const [r, o] of s) {
      if (!o.promo || typeof o.promo != "string")
        continue;
      const h = [...o.promo];
      o.promo = {};
      for (const a of h) {
        const n = s.get(a);
        n.attr.push("promoted"), n.unit = "成", o.promo[a] = n, s.set(a, { ...o, ...n });
      }
    }
    [...s].forEach(([r, o], h) => {
      o.id = h, o.char = r, s.set(r, new y(t, o, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, o] of s)
      o.alias.forEach((h, a) => {
        const n = o.clone(), c = [...n.display];
        n.displayPtn = a + 1, n.display = c, n.alias[a] = r, i[h] = n;
      });
    return i;
  }
  /** 文字列から駒を取得
   * @param {Object<string, Piece>} piece - 駒
   * @param {string} text - 駒文字列
   */
  static stringToPiece(t, e) {
    if (!e)
      return null;
    const [s, i] = [...e], r = y.charDegs[s];
    if (!r)
      return null;
    const o = t[i].clone();
    return o.deg = r, o;
  }
  /** 駒の一覧をリストで取得 */
  static piecesToList(t) {
    return Object.entries(t).sort(([e, { id: s }], [i, { id: r }]) => Math.sign(s - r));
  }
  /** 駒の角度(deg/rad)
   * @param {number} value
   */
  set deg(t) {
    this.rad = t % 360 * Math.PI / 180;
  }
  get deg() {
    return this.rad % 360 / (Math.PI / 180);
  }
  /** 左側の座標 */
  get left() {
    return this.center - this.size * 0.8 / 2;
  }
  /** 上側の座標 */
  get top() {
    return this.middle - this.size / 2;
  }
  /** 右側の座標 */
  get right() {
    return this.center + this.size * 0.8 / 2;
  }
  /** 下側の座標 */
  get bottom() {
    return this.middle + this.size / 2;
  }
  /** 拡大率を取得
   * @returns {number}
   */
  get zoom() {
    let t = this.size / 100;
    return this.useRankSize && (t *= y.rankRatio[this.rank]), t;
  }
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Object<string, any>} piece - 駒
   * @param {number} displayPtn - 表示文字列を変更(1〜)
   * @param {number} deg - 駒の角度
   * @param {number} size - 駒の大きさ
   * @param {boolean} useRankSize - 駒の大きさを格の違いで変更するか
   * @param {boolean} isDrawShadow - 駒の影の描写有無
   * @param {boolean} isMoved - 初回移動済みか否か
   */
  constructor(t, e, {
    displayPtn: s = 0,
    deg: i = 0,
    size: r = y.size,
    useRankSize: o = y.useRankSize,
    isDrawShadow: h = y.isDrawShadow,
    isMoved: a = !1
  } = {}) {
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = s, this.game = K[this.gameName], this.cost = tt[this.char] ?? 1, this.center = 0, this.middle = 0, this.deg = i, this.size = r, this.useRankSize = o, this.isDrawShadow = h, this.isRotateImg ??= !0, this.isMoved = a, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([n, c]) => {
        Array.isArray(c) || (this.range[n] = Z[c].map((l) => [...l]));
      });
    } catch (n) {
      throw console.error(n), e;
    }
  }
  /** 駒をクローン
   * @returns Piece
   */
  clone() {
    const { displayPtn: t, deg: e, size: s, isMoved: i } = this;
    return new y(this.ctx, { ...this }, { displayPtn: t, deg: e, size: s, isMoved: i });
  }
  /** 駒を表返す */
  turnFront() {
    Object.assign(this, this.base);
  }
  /** プロモーション
   * @param {string} char - 成り先の文字
   */
  promotion(t) {
    const { promo: e } = this;
    if (!e)
      throw Error(`promo=${t}, Not plomote piece.`);
    if (!e in e)
      throw Error(`promo=${t}, Plomote key is missing.`);
    if (this.hasAttr("promoted"))
      throw Error(`promo=${t}, Promoted piece.`);
    Object.assign(this, e[t]), this.char = t;
  }
  /** 属性の存在を確認
   * @param {string} attr - 属性
   * @returns boolean
   */
  hasAttr(t) {
    return this.attr.includes(t);
  }
  /** 座標が駒に含まれるか判定
   * @param {number} x - X座標
   * @param {number} y - Y座標
   */
  checkRangeMouse(t, e) {
    return this.left <= t && t < this.right && this.top <= e && e < this.bottom;
  }
  /** 移動範囲を回転して取得 */
  getRange() {
    const t = 0 | this.deg, e = JSON.parse(JSON.stringify(this.range));
    return Object.keys(e).forEach((s) => {
      if (t !== 0) {
        if (![90, 180, 270].includes(t))
          throw Error(`deg=${t}, deg need multiple of 90.`);
        if ([90, 270].includes(t)) {
          const i = (r) => r[0].map((o, h) => r.map((a) => a[h]));
          e[s] = i(e[s]);
        }
        [180, 270].includes(t) && e[s].reverse(), e[s].forEach((i) => {
          [90, 180].includes(t) && i.reverse();
        });
      }
    }), e;
  }
  /** 駒/マスクを描写 */
  async draw() {
    const t = "#FF000055";
    this.imgSrc && z.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = z.images[s];
    if (!i)
      return;
    t.save(), t.translate(this.center, this.middle), this.isRotateImg && t.rotate(this.rad);
    let r, o;
    i.width * 0.9 < i.height ? (r = i.width / i.height * e, o = e) : (r = e, o = i.height / i.width * e), t.drawImage(i, -r / 2, -o / 2, r, o), t.restore();
  }
  /** 駒画像にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMaskImage(t) {
    const { ctx: e, size: s } = this;
    e.fillStyle = t, e.save();
    const i = s * 0.9, r = s;
    e.translate(this.center, this.middle), e.fillRect(-i / 2, -r / 2, i, r), e.restore();
  }
  /** 将棋駒の外形パスを作成 */
  makePath(t) {
    const { ctx: e } = this;
    e.translate(this.center, this.middle), e.rotate(this.rad), e.beginPath(), e.moveTo(-30 * t, -40 * t), e.lineTo(0 * t, -50 * t), e.lineTo(30 * t, -40 * t), e.lineTo(45 * t, 50 * t), e.lineTo(-45 * t, 50 * t), e.closePath();
  }
  /** 駒の影を描写 */
  drawPieceShadow(t) {
    if (!this.isDrawShadow)
      return;
    const { ctx: e } = this;
    e.save(), e.translate(0, 10 * t), this.drawMask("#00000066"), e.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    const { ctx: t, game: e, zoom: s } = this;
    let i, r, o;
    this.hasAttr("promoted") ? (i = e.promoteFontColor ?? e.fontColor ?? "#000000", r = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", o = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (i = e.fontColor ?? "#000000", r = e.backgroundColor ?? "#FFFFFF", o = e.borderColor ?? "#777777"), t.strokeStyle = o, t.fillStyle = r, t.lineWidth = 8 * s, this.drawPieceShadow(s), t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = i;
    const h = [..."" + this.display[this.displayPtn]], a = 40 * s;
    t.font = `${a}px ${O.names}`, t.textAlign = "center", h.forEach((n, c) => {
      const l = h.length === 1 ? a / 2 : c * a;
      t.fillText(n, 0, l);
    }), t.restore();
  }
  /** 駒にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(t) {
    const { ctx: e, zoom: s } = this;
    e.fillStyle = t, e.save(), this.makePath(s), e.fill(), e.restore();
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  getBodText() {
    return T.pieceDegChars[this.deg] + this.char;
  }
  /** 文字列形式で取得 */
  toString() {
    return y.degChars[this.deg] + this.char;
  }
}
Object.entries(y.degChars).forEach(([f, t]) => {
  y.charDegs[t] = f;
});
const ct = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], at = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], ht = [
  ["o"],
  ["A", { child: ["a"] }],
  ["B", { child: ["b"] }],
  ["C", { child: ["c"] }],
  ["D", { child: ["d"] }],
  ["E", { child: ["a", "e"] }],
  ["F", { child: ["a", "f"] }],
  ["G", { child: ["b", "g"] }],
  ["H", { child: ["b", "h"] }],
  ["I", { child: ["c", "i"] }],
  ["J", { child: ["c", "j"] }],
  ["K", { child: ["d", "k"] }],
  ["L", { child: ["d", "l"] }]
], N = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let f = 1; f <= 9; f++)
  N.push(["" + f, { moves: f }]);
function lt(f) {
  const t = [];
  let e, s;
  for (let i = 0; i < f.length; i++)
    for (let r = 0; r < f[i].length; r++) {
      const o = f[i][r];
      for (let [h, { isOwn: a }] of at)
        o === h && (t.push({ isOwn: a, oX: r, oY: i }), a && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function dt(f, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = f;
  function h(d, u) {
    return i[u] && i[u][d] && !i[u][d].hasAttr("keepOut");
  }
  function a(d) {
    return d.piece && t.hasAttr("po") && d.piece.hasAttr("po");
  }
  function n(d) {
    return d.piece && !t.isMoved && !d.piece.isMoved && t.hasAttr("pao") && t.cost < d.piece.cost;
  }
  function c(d, u, k, g = "", S = !0) {
    if (!i[k] || !i[k][u])
      return !1;
    const x = i[k][u];
    return !x || a(x) || n(x) || !o.isTarget(g, x, t) || t.hasAttr("inPalace") && !x.hasAttr("palace") || g.indexOf("palace") === 0 && !(x.hasAttr(g) && i[s][e].hasAttr(g)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= f.getRow(u, k, t.deg) ? !1 : d ? i[k][u].piece ? S ? t.deg !== i[k][u].piece.deg : !0 : !1 : !i[k][u].piece;
  }
  function l(d, u, k, g, S) {
    for (const x of u)
      for (let R = 0; R < d.length; R++)
        for (let C = 0; C < d[R].length; C++) {
          const [m, b] = [C + e - g, R + s - S];
          if (!(!h(m, b) || c(k, 0 | m, 0 | b, "", !1) || d[R][C] !== x))
            return !0;
        }
    return !1;
  }
  function p(d, u, k) {
    const g = i[k][u];
    g.isTarget = !0, o.setTarget(d, g, t);
  }
  function w(d, [u, { isAttack: k }], { oX: g, oY: S, isOwn: x }) {
    if (x)
      for (const [R, { child: C = [] } = {}] of ht)
        for (let m = 0; m < d.length; m++)
          for (let b = 0; b < d[m].length; b++) {
            const [j, E] = [b + e - g, m + s - S];
            !h(j, E) || !c(k, j, E, u) || d[m][b] !== R || l(d, C, !1, g, S) || p(u, j, E);
          }
  }
  function v(d, [u, { isAttack: k }], { oX: g, oY: S, isOwn: x, offsetX: R, offsetY: C }) {
    if (!(!x && !c(!1, e + R, s + C)))
      for (const [m, { jmps: b = 0, moves: j = 0 } = {}] of N) {
        const E = !j || j === 0;
        for (let L = S - 1; L <= S + 1; L++)
          for (let A = g - 1; A <= g + 1; A++) {
            if (d[L][A] !== m || A === g && L === S)
              continue;
            let M = b || 0, I = j || 0;
            const [q, G] = [A - g, L - S];
            for (let X = e, Y = s; ; ) {
              X += q, Y += G;
              const P = X + R, F = Y + C;
              if (!h(P, F) || !E && I === 0)
                break;
              const W = M === 0;
              W && c(k, P, F, u, W) ? (I--, p(u, P, F)) : b < 1 && I--;
              const U = i[F][P];
              if (U.piece && (M--, W || a(U)))
                break;
            }
          }
      }
  }
  (function() {
    const d = t.getRange();
    d.attack ??= d.default;
    for (const u of ct) {
      const k = u[0];
      if (t.isMoved && ["start", "castling"].includes(k))
        continue;
      const g = d[k];
      if (g)
        for (const S of lt(g))
          w(g, u, S), v(g, u, S);
    }
  })();
}
function ft(f) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = f, o = (c, l, p = () => {
  }) => {
    const w = window.getComputedStyle(r), v = c.target.getBoundingClientRect();
    let d = r.width / parseFloat(w.width), u = r.height / parseFloat(w.height);
    if (c.clientX)
      d *= c.clientX - v.left, u *= c.clientY - v.top;
    else if (0 < c.touches.length) {
      if (1 < c.touches.length)
        return;
      d *= c.touches[0].clientX - v.left, u *= c.touches[0].clientY - v.top;
    } else
      c.preventDefault(), [d, u] = e;
    f.field.forEach((k, g) => k.forEach((S, x) => l(S, d, u, x, g))), p(d, u), f.draw(), e = [d, u];
  }, h = (c) => {
    t = !0, o(
      c,
      (l, p, w) => {
        const { piece: v, pX: d, pY: u } = l;
        v && l.checkRangeMouse(p, w) && (c.preventDefault(), v.isSelected = !0, s = l, dt(f, v, d, u));
      },
      (l, p) => {
        for (const [w, v] of Object.entries(f.stand.stocks))
          for (let d = v.length - 1; 0 <= d; d--)
            if (v[d].checkRangeMouse(l, p)) {
              c.preventDefault(), v[d].isSelected = !0, i = { deg: w, i: d };
              return;
            }
      }
    );
  }, a = (c) => {
    !t || !(s || i) || o(
      c,
      (l, p, w) => {
        l.isSelected = l.checkRangeMouse(p, w);
      }
    );
  }, n = (c) => {
    t = !1, o(
      c,
      (l, p, w) => {
        l.checkRangeMouse(p, w) && (s && f.movePiece(s, l), i && !l.piece && f.stand.releasePiece(l, i));
      }
    ), o(
      c,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.isTarget = !1;
      },
      () => {
        for (const [l, p] of Object.entries(f.stand.stocks))
          for (let w = p.length - 1; 0 <= w; w--)
            p[w].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", h), r.addEventListener("mousemove", a), r.addEventListener("mouseup", n), r.addEventListener("touchstart", h), r.addEventListener("touchmove", a), r.addEventListener("touchend", n), {
    removeEvent() {
      r.removeEventListener("mousedown", h), r.removeEventListener("mousemove", a), r.removeEventListener("mouseup", n), r.removeEventListener("touchstart", h), r.removeEventListener("touchmove", a), r.removeEventListener("touchend", n);
    }
  };
}
class D {
  static degId = {
    180: 0,
    90: 1,
    270: 2,
    0: 3
  };
  /**
   * @param {Board} ボード
   */
  constructor(t) {
    this.board = t;
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: h, panelHeight: a, xLen: n, yLen: c } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = h / 2, this.pitchHeight = a, this.xLen = n, this.yLen = c;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = [...Array(4)].map((t) => []);
  }
  /** 持ち駒からボード上に配置する
   * @param {Panal} toPanell - 配置先のパネル
   * @param {number} deg - 角度
   * @param {number} i - 配置する持ち駒のインデックス
   */
  releasePiece(t, { deg: e, i: s }) {
    const { board: i } = this, r = this.stocks[e];
    t.piece = r[s], r[s].center = t.center, r[s].middle = t.middle, i.addRecord(t, { end: "打" }), r.splice(s, 1);
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(t) {
    const e = this.stocks[D.degId[t.deg]];
    t.turnFront(), e.push(t), e.sort((s, i) => Math.sign(s.id - i.id));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   */
  capturePiece(t, e, s = !1, i = !1) {
    i || !e || !(s || t.hasAttr("capture")) || e.hasAttr("king") || e.hasAttr("cantCapture") || (e.deg = t.deg, e.isMoved = !0, this.add(e));
  }
  /** 盤を描写 */
  draw() {
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: h } = this, { ctx: a, xLen: n, yLen: c } = t;
    a.fillStyle = t.backgroundColor, a.strokeStyle = t.borderColor, a.lineWidth = t.borderWidth, a.save(), a.translate(e, s), a.fillRect(0, 0, i, r), a.strokeRect(0, 0, i, r), a.restore(), this.stocks.forEach((l, p) => {
      let w = 0;
      l = l.slice(-c / 4 * n);
      for (let v = 0 | c / 4 * p; v < c / 4 * (p + 1); v++)
        for (let d = 0; d < n; d++) {
          const u = e + o * (d + 1), k = s + h * (v + 1), g = l[w++];
          if (g == null)
            break;
          g.center = u, g.middle = k, g.draw();
        }
    });
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  getBodText(t = 0) {
    const e = /* @__PURE__ */ new Map();
    return this.stocks[D.degId[t]].forEach(({ char: s }) => {
      e.has(s) || e.set(s, 0), e.set(s, e.get(s) + 1);
    }), T.standDegChars[t] + [...e].map(
      ([s, i]) => s + T.num2Row(i)
    ).join(" ");
  }
  /** 文字列形式で取得
   * @param {boolean} isMinimam - 簡易表示
   */
  toString(t = !1) {
    const { xLen: e } = this.board, s = this.stocks.flat().filter((o) => o);
    let i = 0 < s.length ? `
` + "―".repeat(e * 2) + `
` : "", r = s.map((o) => "" + o).join("");
    if (!t) {
      i = "";
      for (const o of Object.values(y.degChars))
        r = r.replace(o, `
${o}持駒：${o}`);
    }
    return i + r;
  }
}
const ut = Object.keys(y.degChars), J = () => ({
  panel: null,
  piece: null
});
class gt {
  constructor() {
    this.degs = {}, ut.forEach((t) => this.degs[t] = J());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(t) {
    this.degs[t] = J();
  }
  /** アンパッサン対象と成りうるマス情報を記録
   * @param {string} rangeName - 移動範囲の定義名
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   */
  setTarget(t, e, s) {
    t === "start" && s.hasAttr("enPassant") && (this.degs[s.deg].panel = e);
  }
  /** アンパッサン対象と成りうる駒情報を記録
   * @param {Panel} toPanel - アンパッサン対象か確認するマス目
   */
  setMoved(t) {
    const { piece: e } = t, s = this.degs[e.deg];
    e && t === s.panel ? s.piece = e : this.clear(e.deg);
  }
  /** アンパッサン対象のマスか確認する
   * @param {string} rangeName - 移動範囲の定義名
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @returns {boolean}
   */
  isTarget(t, e, s) {
    return !e || !e.piece || t !== "enPassant" ? !0 : e.piece.hasAttr("enPassant") ? e.piece === this.degs[e.piece.deg].piece : !1;
  }
}
class V {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas
   * @param {Object<string, any>} options - オプション
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: a }, n) => 1 < n && a) ? 4 : 2, h = new V(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: a, pieceSet: n }, c) => {
      if (a) {
        n ??= "default";
        try {
          h.putStartPieces(c, a, n);
        } catch {
        }
      }
    }), h.onDrawed = r, h;
  }
  /**
   * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
   */
  /**
   * @param {HTMLCanvasElement} canvas - キャンバス要素
   * @param {string} playBoard - ボードタイプ
   * @param {number} players - プレイヤー人数(2 or 4)
   * @param {number} canvasWidth - キャンバス幅
   * @param {number} canvasHeight - キャンバス高さ
   * @param {canvasFit} canvasFit - キャンバスサイズの自動調整
   * @param {number} boardLeft - 描写するX座標
   * @param {number} boardTop - 描写するY座標
   * @param {number} panelWidth - マス目幅
   * @param {number} panelHeight - マス目高さ
   * @param {number} pieceSize - 駒の大きさ
   * @param {boolean} useRankSize - 駒の大きさを格の違いで変更するか
   * @param {boolean} isDrawShadow - 駒の影の描写有無
   * @panal {number} borderWidth - 枠線太さ
   * @param {boolean} useStand - 駒台の使用有無
   * @param {string} backgroundColor - 背景色(デフォルト無色)
   * @param {boolean} autoDrawing - 描写の自動更新有無
   * @param {(Board)=>void} onDrawed - 描写イベント
   * @param {boolean} freeMode - フリーモード有効化/無効化
   */
  constructor(t, e, {
    players: s = 2,
    canvasWidth: i = void 0,
    canvasHeight: r = void 0,
    canvasFit: o = "overflow",
    boardLeft: h = 5,
    boardTop: a = 5,
    panelWidth: n = 50,
    panelHeight: c = 0 | n * 1.1,
    pieceSize: l = 0 | n * 0.9,
    useRankSize: p = !0,
    isDrawShadow: w = !0,
    borderWidth: v = Math.min(n, c) / 30,
    useStand: d = !1,
    backgroundColor: u = "#00000000",
    autoDrawing: k = !0,
    onDrawed: g,
    freeMode: S = !1
  } = {}) {
    const x = O.importAsync(), R = z.importAsync();
    this.canvas = t;
    const C = t.getContext("2d");
    if (C.clearRect(0, 0, t.width, t.height), this.ctx = C, this.pieces = y.getPieces(C, {
      size: l,
      useRankSize: p,
      isDrawShadow: w
    }), Object.assign(this, Q[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = h, this.top = a, this.panelWidth = n, this.panelHeight = c, this.borderWidth = v, this.pieceSize = l, this.canvasBackgroundColor = u, this.field = this.field.map(
      (b, j) => [...b].map((E, L) => {
        const A = h + n * (L + 1), M = a + c * (j + 1);
        return new nt(C, E, A, M, n, c, v, L, j);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = h + this.width, this.bottom = a + this.height, this.stand = new D(this), t.width = i ?? (d ? this.stand.right : this.right) + 5, t.height = r ?? this.bottom + 5;
    const { style: m } = t;
    o === "overflow" ? (m.maxWidth === "" && (m.maxWidth = "97vw"), m.maxHeight === "" && (m.maxHeight = "97vh")) : o === "horizontal" ? m.width === "" && (m.width = "97vw") : o === "vertical" ? m.height === "" && (m.height = "97vh") : o === "parentOverflow" ? (m.maxWidth === "" && (m.maxWidth = "100%"), m.maxHeight === "" && (m.maxHeight = "100%")) : o === "parentHorizontal" ? m.width === "" && (m.width = "100%") : o === "parentVertical" && m.height === "" && (m.height = "100%"), this.autoDrawing = k, k && (x.then(() => this.draw()), R.then(() => this.draw()), this.draw()), this.onDrawed ??= g, this.freeMode = S, this.record = [], this.uiControl = ft(this), this.enPassant = new gt();
  }
  /** ボードを閉じる */
  close() {
    this.uiControl.removeEvent();
  }
  /** 駒配置を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  rotateField(t) {
    const { xLen: e, yLen: s } = this;
    do
      t = (t + 360) % 360;
    while (t < 0);
    if (t !== 0) {
      if (![90, 180, 270].includes(t))
        throw Error(`deg=${t}, deg need multiple of 90.`);
      if ([90, 270].includes(t)) {
        const i = (r) => r[0].map((o, h) => r.map((a) => a[h]));
        if (e !== s)
          throw Error(`cols=${e} != rows=${s}, Not rows = cols.`);
        this.field = i(this.field);
      }
      [180, 270].includes(t) && this.field.reverse(), this.field.forEach((i) => {
        i.forEach((r) => {
          r.piece && (r.piece.deg += t);
        }), [90, 180].includes(t) && i.reverse();
      });
    }
  }
  /** 駒の初期配置
   * {number} playerId - プレイヤー番号
   * {string} gameName - 駒の配置セット
   * {string} pieceSet - 駒の配置パターン変更
   */
  putStartPieces(t, e, s = "default") {
    const { pieces: i } = this, r = 0 | t * 360 / this.players;
    this.rotateField(r);
    const o = K[e].position[this.xLen][s];
    if (!o)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    o.forEach((h, a) => {
      if (h.length < this.xLen)
        throw Error(h.join(""));
      const n = a + this.yLen - o.length;
      [...h].forEach((c, l) => {
        if (!i[c])
          return;
        const p = i[c].clone(), w = this.field[n][l];
        p.center = w.center, p.middle = w.middle, w.piece = p;
      });
    }), this.rotateField(-r), this.autoDrawing && this.draw();
  }
  /** 駒の配置
   * @param {string} piece - 駒の表現文字
   * @param {number} pX - X方向配置位置(マス目基準)
   * @param {number} pY - Y方向配置位置(マス目基準)
   * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
   * @param {number} displayPtn - 表示文字列を変更(1〜)
   * @param {boolean} isMoved - 初回移動済みか否か
   */
  putNewPiece(t, e, s, i, { displayPtn: r = 0, setDeg: o = !1, isMoved: h = !1 } = {}) {
    const { pieces: a } = this, n = o ? i : i * 90;
    typeof t == "string" && (t = new y(this.ctx, a[t], { displayPtn: r, deg: n, isMoved: h }));
    const c = this.field[s][e];
    t.center = c.center, t.middle = c.middle, c.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, h = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(y.degChars).map((n) => `
` + n + "持ち駒:")
    ).reduce(
      (n, c) => n.replace(new RegExp(c, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (n) => n.match(/.{2}/g)
    );
    for (let n = 0; n < r; n++)
      for (let c = 0; c < i; c++)
        try {
          const l = h[n][c], p = y.stringToPiece(s, l);
          p.center = e[n][c].center, p.middle = e[n][c].middle, e[n][c].piece = p;
        } catch {
          e[n][c].piece = null;
        }
    this.stand.clear();
    const a = h[r];
    a && a.forEach((n) => {
      const c = y.stringToPiece(s, n);
      c && this.stand.add(c);
    }), this.autoDrawing && this.draw();
  }
  /** 角度基準のマス目の行を取得する
   * @param {Panel} panel - マス目
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getRow(t, e, s, i = 0) {
    const { xLen: r, yLen: o } = this;
    s += i;
    do
      s = (s + 360) % 360;
    while (s < 0);
    return s === 0 ? o - 1 - e : s === 90 ? t : s === 180 ? e : s === 270 ? r - 1 - t : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {Panel} panel - マス目
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(t, e, s, i = 0) {
    const { xLen: r, yLen: o } = this;
    s += i;
    do
      s = (s + 360) % 360;
    while (s < 0);
    return s === 0 ? t : s === 90 ? o - 1 - e : s === 180 ? r - 1 - t : s === 270 ? e : -1;
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   */
  checkCanPromo(t) {
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: o } = s, [h, a] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((c) => e - c - (0 | this.promoLineOffset));
    let n;
    return this.sidePromo ? n = Math.max(
      ...Object.keys(y.degChars).map((c) => 0 | c).filter((c) => c !== o).map(
        (c) => this.getRow(i, r, c, 180)
      )
    ) : n = this.getRow(i, r, o), {
      canPromo: h <= n,
      forcePromo: a <= n
    };
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   */
  movePiece(t, e) {
    const { stand: s, freeMode: i, enPassant: r } = this;
    if (!t || e.hasAttr("keepOut") || e.piece === t.piece || e.piece?.deg === t.piece.deg || !this.freeMode && !e.isTarget)
      return;
    let { canPromo: o, forcePromo: h } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: a } = e;
    a.center = e.center, a.middle = e.middle, a.isMoved = !0;
    const n = this.checkCanPromo(e);
    if (o ||= n.canPromo, h ||= n.forcePromo, r.setMoved(e), !a.promo || a.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [c, { name: l }] of Object.entries(a.promo))
        if (confirm(`成りますか?
	${a.char}:${a.name}
	　↓
	${c}:${l}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), a.promotion(c);
          return;
        }
    while (!i && h);
    this.addRecord(e, { fromPanel: t, end: "不成" });
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のマス目
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {string} end - オプション=成|不成|打
   */
  addRecord(t, { fromPanel: e, end: s = "" } = {}) {
    const { piece: i } = t;
    this.record.push({
      to: {
        pX: t.pX,
        pY: t.pY
      },
      from: {
        pX: e?.pX,
        pY: e?.pY
      },
      deg: i.deg,
      pieceChar: i.char,
      end: s
    });
  }
  /** 棋譜をテキストで取得
   * @returns {string}
   */
  getTextRecord() {
    const t = ({ pX: s }) => s == null ? "*" : (this.xLen - s).toString(36), e = ({ pY: s }) => s == null ? "*" : (s + 1).toString(36);
    return this.record.map(
      ({ to: s, from: i, deg: r, pieceChar: o, end: h }) => `${y.degChars[r]}${t(s)}${e(s)}${o}${h} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: o, panelWidth: h, panelHeight: a } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(h / 2, a / 2), t.strokeRect(0, 0, r - h, o - a), t.restore(), this.stand.draw(), this.field.forEach((n) => {
      n.forEach((c) => {
        c.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  get bodText() {
    const { xLen: t, players: e, stand: s } = this;
    if (e !== 2) {
      const n = `players=${e}, players need 2.`;
      return console.error(n), n;
    }
    let i = ` ${[...Array(t).keys()].map((n) => ` ${T.num2Col(t - n)}`).join("")}
+${Array(t).fill("---").join("")}+
`, r = `
+${Array(t).fill("---").join("")}+`, o = "|", h = "";
    return `${s.getBodText(180)}
` + i + this.field.map(
      (n, c) => o + n.map(
        (l) => l.piece?.getBodText() ?? l.getBodText()
      ).join(h) + o + T.num2Row(c + 1)
    ).join(`
`) + r + `
${s.getBodText(0)}`;
  }
  /** 駒配置をテキストで取得
   * {boolean} isMinimam - 縮小表示
   */
  toString(t = !1) {
    const { xLen: e } = this;
    let s = "", i = "", r = "", o = "", h = `
`;
    return t || (s = `┏${Array(e).fill("━━").join("┯")}┓
`, i = `
┗${Array(e).fill("━━").join("┷")}┛`, r = "┃", o = "│", h = `
┠${Array(e).fill("──").join("┼")}┨
`), s + this.field.map(
      (a) => r + a.map(
        (n) => "" + (n.piece ?? n.toString(t))
      ).join(o) + r
    ).join(h) + i + this.stand.toString(t);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(t, e) {
    await ot(this.canvas, t, e);
  }
}
export {
  V as Board,
  y as Piece,
  Q as boards,
  O as canvasFont,
  z as canvasImage,
  pt as gameSoft,
  K as games
};
