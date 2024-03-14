const Q = "./json/ShogiCross/";
async function M(f) {
  return await fetch(`${Q}${f}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const T = await M("canvasFont"), pt = await M("gameSoft"), K = await M("games"), B = await M("boards"), H = await M("panels"), X = await M("pieces"), _ = await M("pieceRange"), tt = await M("pieceCost"), et = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(H).map(({ displayText: f }) => f).join("") + Object.values(X).map(({ display: f }) => f ? f.join("") : "").join("")
  ])
].sort().join("");
Object.assign(T, {
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
    return this.names = T.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      T.fonts.map(async ([s, i]) => {
        const r = s.replace(/ /g, "+"), n = `${f}${r}:wght@${i}&text=${t}`, a = await fetch(n);
        if (!a.ok)
          return;
        const h = (await a.text()).match(/url\(.+?\)/g);
        if (!h)
          throw new Error("Not found font.");
        for (const o of h) {
          const l = new FontFace(`${s}${e}`, o);
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
  Object.values(H).flatMap(({ imgSrc: f }) => f ?? []).concat(Object.values(X).flatMap(({ imgSrc: f }) => f ?? []))
)], F = {
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
async function nt(f, t = "image", e = "png", s = "base64") {
  const i = rt(e), r = document.createElement("a");
  let n;
  s === "blob" ? n = URL.createObjectURL(
    await new Promise((a) => f.toBlob(a), i)
  ) : n = f.toDataURL(i), r.href = n, r.download = `${t}.${e}`, r.click(), s === "blob" && URL.revokeObjectURL(r.href);
}
class ot {
  #t;
  #e;
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
  constructor(t, e, s, i, r, n, a, c, h) {
    Object.assign(this, H[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = n, this.left = s - r / 2, this.top = i - n / 2, this.right = s + r / 2, this.bottom = i + n / 2, this.borderWidth = a, this.pX = c, this.pY = h, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.clearTarget(), this.attr ??= [];
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
  /** マス目の移動可能判定
   * @param {boolean} value
   */
  get isTarget() {
    return 0 < this.#e.length;
  }
  /** マス目の移動先情報をクリア */
  clearTarget() {
    this.#e = [];
  }
  /** マス目の移動先情報を追加
   * @param {string} rangeName - 移動先情報
   */
  addTarget(t) {
    this.#e.push(t);
  }
  /** マス目が移動先情報を持っているか判定
   * @param {string} rangeName - 移動先情報
   * @returns {boolean}
   */
  hasTarget(t) {
    return this.#e.includes(t);
  }
  /** 属性の存在を確認
   * @param {string} attrName - 属性名
   * @returns {boolean}
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
    this.imgSrc && F.imported ? this.drawImage() : this.drawPanel(), this.isSelected && this.drawMask(t), this.isTarget && this.drawMask(e), this.piece?.draw();
  }
  /** マス目画像を描写 */
  drawImage() {
    const { ctx: t } = this, e = this.imgSrc, s = F.images[e];
    s && (t.save(), t.translate(this.left, this.top), t.drawImage(s, 0, 0, this.width, this.height), t.restore());
  }
  /** マス目を描写 */
  drawPanel() {
    const { ctx: t, left: e, top: s, center: i, middle: r, width: n, height: a, displayText: c, textRotate: h } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, n, a), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(n / 2, 0), t.lineTo(n / 2, a), t.moveTo(0, a / 2), t.lineTo(n, a / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, n, a), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(n, a)), this.borderSlashRight && (t.moveTo(n, 0), t.lineTo(0, a)), t.closePath(), t.stroke(), t.restore(), c) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const o = h ? h * Math.PI / 180 : 0;
      t.rotate(o);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${T.names}`;
      const g = t.measureText(c).width, p = l / 2 * 0.8;
      t.fillText(c, -g / 2, p), t.restore();
    }
  }
  /** マス目にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(t) {
    const { ctx: e } = this;
    e.fillStyle = t, e.fillRect(this.left, this.top, this.width, this.height);
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
   * @param {Piece|PieceInitOption} option - 駒の初期化オプション
   */
  static getPieces(t, e = {}) {
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(X))));
    for (const [r, n] of s)
      n.attr ??= [], n.unit && n.unit === "成" && (n.base = n);
    for (const [r, n] of s) {
      if (!n.promo || typeof n.promo != "string")
        continue;
      const a = [...n.promo];
      n.promo = {};
      for (const c of a) {
        const h = s.get(c);
        h.attr.push("promoted"), h.unit = "成", n.promo[c] = h, s.set(c, { ...n, ...h });
      }
    }
    [...s].forEach(([r, n], a) => {
      n.id = a, n.char = r, s.set(r, new y(t, n, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, n] of s)
      n.alias.forEach((a, c) => {
        const h = n.clone(), o = [...h.display];
        h.displayPtn = c + 1, h.display = o, h.alias[c] = r, i[a] = h;
      });
    return i;
  }
  /** 文字列から駒を取得
   * @param {Piece|PieceInitOption} piece - 駒
   * @param {string} text - 駒文字列
   */
  static stringToPiece(t, e) {
    if (!e)
      return null;
    const [s, i] = [...e], r = y.charDegs[s];
    if (!r || !t[i])
      return null;
    const n = t[i].clone();
    return n.deg = r, n;
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
   * @param {Piece|PieceInitOption} piece - 駒
   * @param {Object} option - オプション
   * @param {number} option.displayPtn - 表示文字列を変更(1〜)
   * @param {number} option.deg - 駒の角度
   * @param {number} option.size - 駒の大きさ
   * @param {boolean} option.useRankSize - 駒の大きさを格の違いで変更するか
   * @param {boolean} option.isDrawShadow - 駒の影の描写有無
   * @param {boolean} option.isMoved - 初回移動済みか否か
   */
  constructor(t, e, s = {}) {
    const {
      displayPtn: i = 0,
      deg: r = 0,
      size: n = y.size,
      useRankSize: a = y.useRankSize,
      isDrawShadow: c = y.isDrawShadow,
      isMoved: h = !1
    } = s;
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = i, this.game = K[this.gameName], this.cost = tt[this.char] ?? 1, this.center = 0, this.middle = 0, this.deg = r, this.size = n, this.useRankSize = a, this.isDrawShadow = c, this.isRotateImg ??= !0, this.isMoved = h, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([o, l]) => {
        Array.isArray(l) || (this.range[o] = _[l].map((g) => [...g]));
      });
    } catch (o) {
      throw console.error(o), e;
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
   * @param {string} attrName - 属性名
   * @returns {boolean}
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
          const i = (r) => r[0].map((n, a) => r.map((c) => c[a]));
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
    this.imgSrc && F.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = F.images[s];
    if (!i)
      return;
    t.save(), t.translate(this.center, this.middle), this.isRotateImg && t.rotate(this.rad);
    let r, n;
    i.width * 0.9 < i.height ? (r = i.width / i.height * e, n = e) : (r = e, n = i.height / i.width * e), t.drawImage(i, -r / 2, -n / 2, r, n), t.restore();
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
  /** 将棋駒の外形パスを作成
   * @param {number} zoom - 駒の拡大率
   */
  makePath(t) {
    const { ctx: e } = this;
    e.translate(this.center, this.middle), e.rotate(this.rad), e.beginPath(), e.moveTo(-30 * t, -40 * t), e.lineTo(0 * t, -50 * t), e.lineTo(30 * t, -40 * t), e.lineTo(45 * t, 50 * t), e.lineTo(-45 * t, 50 * t), e.closePath();
  }
  /** 駒の影を描写
  * @param {number} zoom - 駒の拡大率
  */
  drawPieceShadow(t) {
    if (!this.isDrawShadow)
      return;
    const { ctx: e } = this;
    e.save(), e.translate(0, 10 * t), this.drawMask("#00000066"), e.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    const { ctx: t, game: e, zoom: s } = this;
    let i, r, n;
    this.hasAttr("promoted") ? (i = e.promoteFontColor ?? e.fontColor ?? "#000000", r = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", n = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (i = e.fontColor ?? "#000000", r = e.backgroundColor ?? "#FFFFFF", n = e.borderColor ?? "#777777"), t.strokeStyle = n, t.fillStyle = r, t.lineWidth = 8 * s, this.drawPieceShadow(s), t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = i;
    const a = [..."" + this.display[this.displayPtn]], c = 40 * s;
    t.font = `${c}px ${T.names}`, t.textAlign = "center", a.forEach((h, o) => {
      const l = a.length === 1 ? c / 2 : o * c;
      t.fillText(h, 0, l);
    }), t.restore();
  }
  /** 駒にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(t) {
    const { ctx: e, zoom: s } = this;
    e.fillStyle = t, e.save(), this.makePath(s), e.fill(), e.restore();
  }
  /** 文字列形式で取得 */
  toString() {
    return y.degChars[this.deg] + this.char;
  }
}
Object.entries(y.degChars).forEach(([f, t]) => {
  y.charDegs[t] = f;
});
const at = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], ct = [
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
], V = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let f = 1; f <= 9; f++)
  V.push(["" + f, { moves: f }]);
function lt(f) {
  const t = [];
  let e, s;
  for (let i = 0; i < f.length; i++)
    for (let r = 0; r < f[i].length; r++) {
      const n = f[i][r];
      for (let [a, { isOwn: c }] of ct)
        n === a && (t.push({ isOwn: c, oX: r, oY: i }), c && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function dt(f, t, e, s) {
  const { field: i, yLen: r, enPassant: n } = f;
  function a(d, u) {
    return i[u] && i[u][d] && !i[u][d].hasAttr("keepOut");
  }
  function c(d) {
    return d.piece && t.hasAttr("po") && d.piece.hasAttr("po");
  }
  function h(d) {
    return d.piece && !t.isMoved && !d.piece.isMoved && t.hasAttr("pao") && t.cost < d.piece.cost;
  }
  function o(d, u, k, m = "", x = !0) {
    if (!i[k] || !i[k][u])
      return !1;
    const b = i[k][u];
    return !b || c(b) || h(b) || m === "enPassant" && !n.isTarget(b, t) || t.hasAttr("inPalace") && !b.hasAttr("palace") || m.indexOf("palace") === 0 && !(b.hasAttr(m) && i[s][e].hasAttr(m)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= f.getRow(u, k, t.deg) ? !1 : d ? i[k][u].piece ? x ? t.deg !== i[k][u].piece.deg : !0 : !1 : !i[k][u].piece;
  }
  function l(d, u, k, m, x) {
    for (const b of u)
      for (let R = 0; R < d.length; R++)
        for (let E = 0; E < d[R].length; E++) {
          const [L, C] = [E + e - m, R + s - x];
          if (!(!a(L, C) || o(k, 0 | L, 0 | C, "", !1) || d[R][E] !== b))
            return !0;
        }
    return !1;
  }
  function g(d, u, k) {
    const m = i[k][u];
    m.addTarget(d), n.setTarget(m, t);
  }
  function p(d, [u, { isAttack: k }], { oX: m, oY: x, isOwn: b }) {
    if (b)
      for (const [R, { child: E = [] } = {}] of ht)
        for (let L = 0; L < d.length; L++)
          for (let C = 0; C < d[L].length; C++) {
            const [w, $] = [C + e - m, L + s - x];
            !a(w, $) || !o(k, w, $, u) || d[L][C] !== R || l(d, E, !1, m, x) || g(u, w, $);
          }
  }
  function S(d, [u, { isAttack: k }], { oX: m, oY: x, isOwn: b, offsetX: R, offsetY: E }) {
    if (!(!b && !o(!1, e + R, s + E)))
      for (const [L, { jmps: C = 0, moves: w = 0 } = {}] of V) {
        const $ = !w || w === 0;
        for (let j = x - 1; j <= x + 1; j++)
          for (let A = m - 1; A <= m + 1; A++) {
            if (d[j][A] !== L || A === m && j === x)
              continue;
            let O = C || 0, P = w || 0;
            const [I, Z] = [A - m, j - x];
            for (let Y = e, J = s; ; ) {
              Y += I, J += Z;
              const D = Y + R, W = J + E;
              if (!a(D, W) || !$ && P === 0)
                break;
              const z = O === 0;
              z && o(k, D, W, u, z) ? (P--, g(u, D, W)) : C < 1 && P--;
              const N = i[W][D];
              if (N.piece && (O--, z || c(N)))
                break;
            }
          }
      }
  }
  (function() {
    const d = t.getRange();
    d.attack ??= d.default;
    for (const u of at) {
      const k = u[0];
      if (t.isMoved && ["start", "castling"].includes(k))
        continue;
      const m = d[k];
      if (m)
        for (const x of lt(m))
          p(m, u, x), S(m, u, x);
    }
  })();
}
function ft(f) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = f, n = (o, l, g = () => {
  }) => {
    const p = window.getComputedStyle(r), S = o.target.getBoundingClientRect();
    let d = r.width / parseFloat(p.width), u = r.height / parseFloat(p.height);
    if (o.clientX)
      d *= o.clientX - S.left, u *= o.clientY - S.top;
    else if (0 < o.touches.length) {
      if (1 < o.touches.length)
        return;
      d *= o.touches[0].clientX - S.left, u *= o.touches[0].clientY - S.top;
    } else
      o.preventDefault(), [d, u] = e;
    f.field.forEach((k, m) => k.forEach((x, b) => l(x, d, u, b, m))), g(d, u), f.draw(), e = [d, u];
  }, a = (o) => {
    t = !0, n(
      o,
      (l, g, p) => {
        const { piece: S, pX: d, pY: u } = l;
        S && l.checkRangeMouse(g, p) && (o.preventDefault(), S.isSelected = !0, s = l, dt(f, S, d, u));
      },
      (l, g) => {
        for (const [p, S] of f.stand.stocks)
          for (let d = S.length - 1; 0 <= d; d--)
            if (S[d].checkRangeMouse(l, g)) {
              o.preventDefault(), S[d].isSelected = !0, i = { deg: p, i: d };
              return;
            }
      }
    );
  }, c = (o) => {
    !t || !(s || i) || n(
      o,
      (l, g, p) => {
        l.isSelected = l.checkRangeMouse(g, p);
      }
    );
  }, h = (o) => {
    t = !1, n(
      o,
      (l, g, p) => {
        l.checkRangeMouse(g, p) && (s && f.movePiece(s, l), i && !l.piece && f.stand.releasePiece(l, i));
      }
    ), n(
      o,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.clearTarget();
      },
      () => {
        for (const [l, g] of f.stand.stocks)
          for (let p = g.length - 1; 0 <= p; p--)
            g[p].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", a), r.addEventListener("mousemove", c), r.addEventListener("mouseup", h), r.addEventListener("touchstart", a), r.addEventListener("touchmove", c), r.addEventListener("touchend", h), {
    removeEvent() {
      r.removeEventListener("mousedown", a), r.removeEventListener("mousemove", c), r.removeEventListener("mouseup", h), r.removeEventListener("touchstart", a), r.removeEventListener("touchmove", c), r.removeEventListener("touchend", h);
    }
  };
}
class v {
  /** 角度から駒の文字表示
   * @type {Map<number, string>}
   */
  static #t = /* @__PURE__ */ new Map([
    [0, " "],
    [90, ">"],
    [180, "v"],
    [270, "<"]
  ]);
  /** 角度から駒の正規表現表示
   * @type {Map<number, string>}
   */
  static #e = new Map(
    [...v.#t].map(([t, e]) => [t, new RegExp(e, "g")])
  );
  /** 駒の文字から角度表示
   * @type {Map<string, number>}
   */
  static #i = new Map(
    [...v.#t].map(([t, e]) => [e, t])
  );
  /** 角度から持駒の表題表示
   * @type {Map<number, string>}
   */
  static #r = /* @__PURE__ */ new Map([
    [0, "先手の持駒"],
    [90, "次手の持駒"],
    [180, "後手の持駒"],
    [270, "四手の持駒"]
  ]);
  /** 持駒の表題から角度表示
   * @type {Map<string, number>}
   */
  static #n = new Map(
    [...v.#r].map(([t, e]) => [e, t])
  );
  static #o = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  static #a = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"];
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static #c(t, e = !0) {
    if (!e && t <= 1)
      return "";
    const s = t % 10, i = 0 | t / 10;
    return v.#a[i] + v.#o[s];
  }
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} emptyOne - 空文字を1とする
   * @returns {string}
   */
  static #h(t, e = !0) {
    if (e && t === "")
      return 1;
    if (!isNaN(t))
      return 0 | t;
    let s = v.#a.findIndex(
      (r) => r !== "" && new RegExp("^" + r).test(t)
    );
    s < 0 && (s = 0);
    let i = v.#o.findIndex(
      (r) => r !== "" && new RegExp(r + "$").test(t)
    );
    return i < 0 && (i = 0), s * 10 + i;
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static #l(t) {
    if (10 <= t)
      return t;
    const e = "０１２３４５６７８９", s = t % 10;
    return e[s];
  }
  /** マス目の表示
   * @type {string}
   */
  static #d = " ・";
  /** 駒のBOD表記
   * @param {Piece} piece - 駒
   * @returns {string}
   */
  static #f(t) {
    return t ? v.#t.get(t.deg) + t.char : v.#d;
  }
  /** 駒台のBOD表記
   * @param {Stand} stand - 駒台
   * @param {number} deg - 角度
   * @returns {string}
   */
  static #s(t, e = 0) {
    const s = /* @__PURE__ */ new Map();
    return t.stocks.get(e).forEach(({ char: i }) => {
      s.has(i) || s.set(i, 0), s.set(i, s.get(i) + 1);
    }), v.#r.get(e) + "：" + [...s].map(
      ([i, r]) => i + v.#c(r, !1)
    ).join(" ");
  }
  /** BOD形式のテキストをボードで扱えるよう変換
   * @param {string} text - BOD形式のテキスト
   * @returns {string}
   */
  static convSetText(t) {
    const e = [], s = [];
    t.split(/\r|\n|\r\n/).forEach((n) => {
      [...v.#n.keys()].some((a) => new RegExp(`^${a}`).test(n)) ? s.push(n) : e.push(n.slice(1));
    });
    let i = e.slice(2, -1).join(`
`);
    v.#e.forEach((n, a) => {
      i = i.replace(n, y.degChars[a]);
    });
    const r = s.flatMap((n) => {
      const [a, c] = n.split(/：/);
      if (c === "")
        return "";
      const h = v.#n.get(a), o = y.degChars[h];
      return c.split(/\s/).map((g) => {
        const p = g[0], S = g.slice(1);
        return (o + p).repeat(v.#h(S));
      });
    }).join("");
    return `${i}
${r}`;
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  static getText(t) {
    const { field: e, xLen: s, players: i, stand: r } = t;
    let n = ` ${[...Array(s).keys()].map((p) => ` ${v.#l(s - p)}`).join("")}
+${Array(s).fill("---").join("")}+
`, a = `
+${Array(s).fill("---").join("")}+`, c = "|", h = "", o = `
`, l = `${v.#s(r, 180)}
`, g = `${v.#s(r, 0)}`;
    return i !== 2 && (l = `${v.#s(r, 270)}
` + l, g = `${v.#s(r, 90)}
` + g), l + n + e.map(
      (p, S) => c + p.map(
        (d) => v.#f(d.piece)
      ).join(h) + c + v.#c(S + 1)
    ).join(o) + a + `
` + g;
  }
}
class U {
  /** 駒台への角度ごとの表示順
   * @type {number[]}
   */
  static #t = [180, 90, 270, 0];
  /**
   * @param {Board} ボード
   */
  constructor(t) {
    this.board = t;
    const { top: e, right: s, bottom: i, width: r, height: n, panelWidth: a, panelHeight: c, xLen: h, yLen: o } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = n, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = a / 2, this.pitchHeight = c, this.xLen = h, this.yLen = o;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = new Map(U.#t.map((t) => [t, []]));
  }
  /** 持ち駒からボード上に配置する
   * @param {Panal} toPanell - 配置先のパネル
   * @param {Object} option - オプション
   * @param {number} option.deg - 角度
   * @param {number} option.i - 配置する持ち駒のインデックス
   */
  releasePiece(t, e = {}) {
    const { deg: s, i } = e, { board: r } = this, n = this.stocks.get(s);
    t.piece = n[i], n[i].center = t.center, n[i].middle = t.middle, r.addRecord(t, { end: "打" }), n.splice(i, 1);
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(t) {
    const e = this.stocks.get(t.deg);
    t.turnFront(), e.push(t), e.sort((s, i) => Math.sign(s.id - i.id));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   * @param {boolean} forceCapture - 属性を無視して捕縛する
   * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
   */
  capturePiece(t, e, s = !1, i = !1) {
    i || !e || !(s || t.hasAttr("capture")) || e.hasAttr("king") || e.hasAttr("cantCapture") || (e.deg = t.deg, e.isMoved = !0, this.add(e));
  }
  /** 盤を描写 */
  draw() {
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: n, pitchHeight: a } = this, { ctx: c, xLen: h, yLen: o } = t;
    c.fillStyle = t.backgroundColor, c.strokeStyle = t.borderColor, c.lineWidth = t.borderWidth, c.save(), c.translate(e, s), c.fillRect(0, 0, i, r), c.strokeRect(0, 0, i, r), c.restore(), [...this.stocks.values()].forEach((l, g) => {
      let p = 0;
      l = l.slice(-o / 4 * h);
      for (let S = 0 | o / 4 * g; S < o / 4 * (g + 1); S++)
        for (let d = 0; d < h; d++) {
          const u = e + n * (d + 1), k = s + a * (S + 1), m = l[p++];
          if (m == null)
            break;
          m.center = u, m.middle = k, m.draw();
        }
    });
  }
  /** 文字列形式で取得
   * @param {boolean} isMinimam - 簡易表示
   */
  toString(t = !1) {
    const { xLen: e } = this.board, s = [...this.stocks.values()].flat().filter((n) => n);
    let i = 0 < s.length ? `
` + "―".repeat(e * 2) + `
` : "", r = s.map((n) => "" + n).join("");
    if (!t) {
      i = "";
      for (const n of Object.values(y.degChars))
        r = r.replace(n, `
${n}持駒：${n}`);
    }
    return i + r;
  }
}
const gt = Object.keys(y.degChars), G = () => ({
  panel: null,
  piece: null
});
class ut {
  constructor() {
    this.degs = {}, gt.forEach((t) => this.degs[t] = G());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(t) {
    this.degs[t] = G();
  }
  /** アンパッサン対象と成りうるマス情報を記録
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   */
  setTarget(t, e) {
    t.hasTarget("start") && e.hasAttr("enPassant") && (this.degs[e.deg].panel = t);
  }
  /** アンパッサン対象と成りうる駒情報を記録
   * @param {Panel} toPanel - アンパッサン対象か確認するマス目
   */
  setMoved(t) {
    const { piece: e } = t, s = this.degs[e.deg];
    e && t === s.panel ? s.piece = e : this.clear(e.deg);
  }
  /** アンパッサン対象のマスか確認する
   * @param {Panel} panel - アンパッサン対象と成りうるマス目
   * @param {Piece} piece - アンパッサン対象と成りうる駒
   * @returns {boolean}
   */
  isTarget(t, e) {
    return !t || !t.piece ? !0 : t.piece.hasAttr("enPassant") ? t.piece === this.degs[t.piece.deg].piece : !1;
  }
}
class q {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas - Canvas要素
   * @param {BoardInitOption} option - ボードの初期化オプション
   * @param {string} option.playBoard - ボードタイプ
   * @param {Object} option.playPieces - 駒セット
   * @param {string} option.playPieces.gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} option.playPieces.pieceSet - 駒の配置パターン
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: i, onDrawed: r } = e, n = i.some(({ gameName: c }, h) => 1 < h && c) ? 4 : 2, a = new q(t, s, {
      ...e,
      players: n,
      onDrawed: r
    });
    return i.forEach(({ gameName: c, pieceSet: h }, o) => {
      if (c) {
        h ??= "default";
        try {
          a.putStartPieces(o, c, h);
        } catch {
        }
      }
    }), a.onDrawed = r, a;
  }
  /**
   * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
   */
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {string} playBoard - ボードタイプ
   * @param {number} players - プレイヤー人数(2 or 4)
   * @param {BoardInitOption} option - ボードの初期化オプション
   */
  constructor(t, e, s) {
    const {
      players: i = 2,
      canvasWidth: r = void 0,
      canvasHeight: n = void 0,
      canvasFit: a = "overflow",
      boardLeft: c = 5,
      boardTop: h = 5,
      panelWidth: o = 50,
      panelHeight: l = 0 | o * 1.1,
      pieceSize: g = 0 | o * 0.9,
      useRankSize: p = !0,
      isDrawShadow: S = !0,
      borderWidth: d = Math.min(o, l) / 30,
      useStand: u = !1,
      backgroundColor: k = "#00000000",
      autoDrawing: m = !0,
      onDrawed: x,
      onGameOver: b = ($) => alert(`プレイヤー${$ + 1}の敗北です。`),
      freeMode: R = !1
    } = s, E = T.importAsync(), L = F.importAsync();
    this.canvas = t;
    const C = t.getContext("2d");
    if (C.clearRect(0, 0, t.width, t.height), this.ctx = C, this.pieces = y.getPieces(C, {
      size: g,
      useRankSize: p,
      isDrawShadow: S
    }), Object.assign(this, B[e]), ![2, 4].includes(i))
      throw Error(`players=${i}, players need 2 or 4.`);
    this.players = i, this.left = c, this.top = h, this.panelWidth = o, this.panelHeight = l, this.borderWidth = d, this.pieceSize = g, this.canvasBackgroundColor = k, this.field = this.field.map(
      ($, j) => [...$].map((A, O) => {
        const P = c + o * (O + 1), I = h + l * (j + 1);
        return new ot(C, A, P, I, o, l, d, O, j);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = c + this.width, this.bottom = h + this.height, this.stand = new U(this), t.width = r ?? (u ? this.stand.right : this.right) + 5, t.height = n ?? this.bottom + 5;
    const { style: w } = t;
    a === "overflow" ? (w.maxWidth === "" && (w.maxWidth = "97vw"), w.maxHeight === "" && (w.maxHeight = "97vh")) : a === "horizontal" ? w.width === "" && (w.width = "97vw") : a === "vertical" ? w.height === "" && (w.height = "97vh") : a === "parentOverflow" ? (w.maxWidth === "" && (w.maxWidth = "100%"), w.maxHeight === "" && (w.maxHeight = "100%")) : a === "parentHorizontal" ? w.width === "" && (w.width = "100%") : a === "parentVertical" && w.height === "" && (w.height = "100%"), this.autoDrawing = m, m && (E.then(() => this.draw()), L.then(() => this.draw()), this.draw()), this.onDrawed = x, this.onGameOver = b, this.gameAlives = new Map(
      [...Array(this.players).keys()].map(($) => [this.#t($), !0])
    ), this.freeMode = R, this.record = [], this.uiControl = ft(this), this.enPassant = new ut();
  }
  /** ボードを閉じる */
  close() {
    this.uiControl.removeEvent();
  }
  /** 角度を正規化
   * @param {number} playeaIdOrDeg - プレイヤー番号または角度
   * @returns {number}
   */
  #t(t) {
    let e = t;
    0 < e && e < 4 && (e = 0 | e * 360 / this.players);
    do
      e = (e + 360) % 360;
    while (e < 0);
    return e;
  }
  /** 駒配置を回転
   * @param {number} deg - 回転角 (90の倍数)
   */
  rotateField(t) {
    const { xLen: e, yLen: s } = this;
    if (t = this.#t(t), t !== 0) {
      if (![90, 180, 270].includes(t))
        throw Error(`deg=${t}, deg need multiple of 90.`);
      if ([90, 270].includes(t)) {
        const i = (r) => r[0].map((n, a) => r.map((c) => c[a]));
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
   * @param {number} playerId - プレイヤー番号
   * @param {string} gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} pieceSet - 駒の配置パターン
   */
  putStartPieces(t, e, s = "default") {
    const { pieces: i } = this, r = this.#t(t);
    this.rotateField(r);
    const n = K[e].position[this.xLen][s];
    if (!n)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    n.forEach((a, c) => {
      if (a.length < this.xLen)
        throw Error(a.join(""));
      const h = c + this.yLen - n.length;
      [...a].forEach((o, l) => {
        if (!i[o])
          return;
        const g = i[o].clone(), p = this.field[h][l];
        g.center = p.center, g.middle = p.middle, p.piece = g;
      });
    }), this.rotateField(-r), this.autoDrawing && this.draw();
  }
  /** 駒の配置
   * @param {string} piece - 駒の表現文字
   * @param {number} pX - X方向配置位置(マス目基準)
   * @param {number} pY - Y方向配置位置(マス目基準)
   * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
   * @param {Object} option - オプション
   * @param {number} option.displayPtn - 表示文字列を変更(1〜)
   * @param {boolean} option.isMoved - 初回移動済みか否か
   */
  putNewPiece(t, e, s, i, r = {}) {
    const { displayPtn: n = 0, isMoved: a = !1 } = r, { pieces: c } = this, h = this.#t(i);
    typeof t == "string" && (t = new y(this.ctx, c[t], { displayPtn: n, deg: h, isMoved: a }));
    const o = this.field[s][e];
    t.center = o.center, t.middle = o.middle, o.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  setTextPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, n = "持駒：";
    0 < t.indexOf(n) && (t = v.convSetText(t));
    const c = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(y.degChars).map((o) => `
` + o + n)
    ).reduce(
      (o, l) => o.replace(new RegExp(l, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (o) => o.match(/.{2}/g)
    );
    for (let o = 0; o < r; o++)
      for (let l = 0; l < i; l++)
        try {
          const g = c[o][l], p = y.stringToPiece(s, g);
          p.center = e[o][l].center, p.middle = e[o][l].middle, e[o][l].piece = p;
        } catch {
          e[o][l].piece = null;
        }
    this.stand.clear();
    const h = c[r];
    h && h.forEach((o) => {
      const l = y.stringToPiece(s, o);
      l && this.stand.add(l);
    }), this.autoDrawing && this.draw();
  }
  /** 角度基準のマス目の行を取得する
   * @param {Panel} panel - マス目
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getRow(t, e, s, i = 0) {
    const { xLen: r, yLen: n } = this;
    return s = this.#t(s + i), s === 0 ? n - 1 - e : s === 90 ? t : s === 180 ? e : s === 270 ? r - 1 - t : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {Panel} panel - マス目
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(t, e, s, i = 0) {
    const { xLen: r, yLen: n } = this;
    return s = this.#t(s + i), s === 0 ? t : s === 90 ? n - 1 - e : s === 180 ? r - 1 - t : s === 270 ? e : -1;
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   */
  checkCanPromo(t) {
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: n } = s, [a, c] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((o) => e - o - (0 | this.promoLineOffset));
    let h;
    return this.sidePromo ? h = Math.max(
      ...Object.keys(y.degChars).map((o) => 0 | o).filter((o) => o !== n).map(
        (o) => this.getRow(i, r, o, 180)
      )
    ) : h = this.getRow(i, r, n), {
      canPromo: a <= h,
      forcePromo: c <= h
    };
  }
  /** 敗北したプレイヤーが存在するか確認し、イベントを発生させる */
  #e() {
    [...this.gameAlives].forEach(([t, e], s) => {
      e && (this.field.some(
        (i) => i.some(
          ({ piece: r }) => r && r.deg === t && r.hasAttr("king")
        )
      ) || (this.gameAlives.set(t, !1), this.onGameOver(s)));
    });
  }
  /** プロモーション処理
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   * @param {boolean} canPromo - 成ることができる
   * @param {boolean} forcePromo - 成りを強制する
   */
  #i(t, e, s, i) {
    const { freeMode: r } = this, { piece: n } = e;
    if (!n.promo || n.hasAttr("promoted") || !s) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [a, { name: c }] of Object.entries(n.promo))
        if (confirm(`成りますか?
	${n.char}:${n.name}
	　↓
	${a}:${c}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), n.promotion(a);
          return;
        }
    while (!r && i);
    this.addRecord(e, { fromPanel: t, end: "不成" });
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のマス目
   * @param {Panel} toPanel - 選択中のマス目
   */
  movePiece(t, e) {
    const { stand: s, freeMode: i, enPassant: r } = this;
    if (!t || e.hasAttr("keepOut") || e.piece === t.piece || e.piece?.deg === t.piece.deg || !this.freeMode && !e.isTarget)
      return;
    let { canPromo: n, forcePromo: a } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: c } = e;
    c.center = e.center, c.middle = e.middle, c.isMoved = !0;
    const h = this.checkCanPromo(e);
    n ||= h.canPromo, a ||= h.forcePromo, r.setMoved(e), this.#i(t, e, n, a), this.#e();
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のマス目
   * @param {Object} option - オプション
   * @param {Panel} option.fromPanel - 移動元のマス目
   * @param {string} option.end - オプション=成|不成|打
   */
  addRecord(t, e = {}) {
    const { fromPanel: s, end: i = "" } = e, { piece: r } = t;
    this.record.push({
      to: {
        pX: t.pX,
        pY: t.pY
      },
      from: {
        pX: s?.pX,
        pY: s?.pY
      },
      deg: r.deg,
      pieceChar: r.char,
      end: i
    });
  }
  /** 棋譜をテキストで取得
   * @returns {string}
   */
  getTextRecord() {
    const t = ({ pX: s }) => s == null ? "*" : (this.xLen - s).toString(36), e = ({ pY: s }) => s == null ? "*" : (s + 1).toString(36);
    return this.record.map(
      ({ to: s, from: i, deg: r, pieceChar: n, end: a }) => `${y.degChars[r]}${t(s)}${e(s)}${n}${a} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: n, panelWidth: a, panelHeight: c } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, n), t.strokeRect(0, 0, r, n), t.translate(a / 2, c / 2), t.strokeRect(0, 0, r - a, n - c), t.restore(), this.stand.draw(), this.field.forEach((h) => {
      h.forEach((o) => {
        o.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  get bodText() {
    return v.getText(this);
  }
  /** 駒配置をテキストで取得
   * {boolean} isMinimam - 縮小表示
   */
  toString(t = !1) {
    const { xLen: e } = this;
    let s = "", i = "", r = "", n = "", a = `
`;
    return t || (s = `┏${Array(e).fill("━━").join("┯")}┓
`, i = `
┗${Array(e).fill("━━").join("┷")}┛`, r = "┃", n = "│", a = `
┠${Array(e).fill("──").join("┼")}┨
`), s + this.field.map(
      (c) => r + c.map(
        (h) => "" + (h.piece ?? h.toString(t))
      ).join(n) + r
    ).join(a) + i + this.stand.toString(t);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(t, e) {
    await nt(this.canvas, t, e);
  }
}
export {
  q as Board,
  y as Piece,
  B as boards,
  T as canvasFont,
  F as canvasImage,
  pt as gameSoft,
  K as games
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvZ2lDcm9zcy5qcyIsInNvdXJjZXMiOlsiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvanNvbi5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2NhbnZhc0ZvbnRMb2FkZXIuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9jYW52YXNJbWFnZUxvYWRlci5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2Rvd25sb2FkSW1hZ2UuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9wYW5lbC5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL3BpZWNlLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvY2hlY2tUYXJnZXQuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS91aUNvbnRyb2wuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9ib2QuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9zdGFuZC5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2VuUGFzc2FudC5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2JvYXJkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJhc2UgPSAnLi9qc29uL1Nob2dpQ3Jvc3MvJztcbmFzeW5jIGZ1bmN0aW9uIGltcG9ydEpzb24obmFtZSl7XG5cdHJldHVybiBhd2FpdCBmZXRjaChgJHtiYXNlfSR7bmFtZX0uanNvbmApXG5cdFx0LnRoZW4oYXN5bmMgcmVzPT57XG5cdFx0XHRyZXR1cm4gYXdhaXQgcmVzLmpzb24oKVxuXHRcdH0pXG5cdFx0LmNhdGNoKCgpPT57fSlcbn07XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2FudmFzRm9udFxuICogQHByb3Age3tmb250TmFtZTogc3RyaW5nLCBmb250V2VpZ2h0OiBudW1iZXJ9W119IGZvbnRzIC0ge2ZvbnROYW1lOiDjg5Xjgqnjg7Pjg4jlkI0sIGZvbnRXZWlnaHQ6IOODleOCqeODs+ODiOOBruWkquOBlX1cbiAqL1xuLyoqIENhbnZhc+eUqOOBrkdvb2dsZeODleOCqeODs+ODiOaDheWgsVxuICogQHR5cGUge0NhbnZhc0ZvbnR9XG4gKi9cbmV4cG9ydCBjb25zdCBjYW52YXNGb250ID0gYXdhaXQgaW1wb3J0SnNvbihcImNhbnZhc0ZvbnRcIik7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gR2FtZVNvZnRcbiAqIEBwcm9wIHtzdHJpbmd9IG5hbWUgLSDjgrLjg7zjg6DlkI1cbiAqIEBwcm9wIHtzdHJpbmd9IHBsYXlCb2FyZCAtIOS9v+eUqOOBmeOCi+ODnOODvOODieWQjVxuICogQHByb3Age2Jvb2xlYW59IHVzZVN0YW5kIC0g6aeS5Y+w44Gu5L2/55So5pyJ54ShXG4gKiBAcHJvcCB7e2dhbWVOYW1lOiBzdHJpbmcsIHBpZWNlU2V0OiBzdHJpbmd9W119IHBsYXlQaWVjZXMgLSB7Z2FtZU5hbWU6IOOCsuODvOODoOWQjSwgcGllY2VTZXQ6IOmnkuOCu+ODg+ODiOOBruWQjeensH1cbiAqL1xuLyoqIOOCsuODvOODoOaDheWgsSjjg5zjg7zjg4kr6aeSKeOBruODl+ODquOCu+ODg+ODiFxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIEdhbWVTb2Z0Pn1cbiAqL1xuZXhwb3J0IGNvbnN0IGdhbWVTb2Z0ID0gYXdhaXQgaW1wb3J0SnNvbihcImdhbWVTb2Z0XCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIEdhbWVcbiAqIEBwcm9wIHtzdHJpbmd9IGVuZ2xpc2ggLSDoi7Hoqp7lkI1cbiAqIEBwcm9wIHtzdHJpbmd9IGZvbnRDb2xvciAtIOmnkuOBruODleOCqeODs+ODiOiJslxuICogQHByb3Age3N0cmluZ30gcHJvbW90ZUZvbnRDb2xvciAtIOaIkOmnkuOBruODleOCqeODs+ODiOiJslxuICogQHByb3Age3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0g6aeS44Gu6ImyXG4gKiBAcHJvcCB7c3RyaW5nfSBwcm9tb3RlQmFja2dyb3VuZENvbG9yIC0g5oiQ6aeS44Gu6ImyXG4gKiBAcHJvcCB7c3RyaW5nfSBib3JkZXJDb2xvciAtIOmnkuOBruaeoOiJslxuICogQHByb3Age3N0cmluZ30gcHJvbW90ZUJhY2tncm91bmRDb2xvciAtIOaIkOmnkuOBruaeoOiJslxuICogQHByb3Age251bWJlcn0gcHJvbW9MaW5lIC0g44OX44Ot44Oi44O844K344On44Oz44Op44Kk44OzKOaIkOOCiuOBruautSlcbiAqIEBwcm9wIHtPYmplY3Q8c3RyaW5nLCBPYmplY3Q8c3RyaW5nLCBzdHJpbmdbXT4+fSBwb3NpdGlvbiAtIOmnkuOBrumFjee9ruODh+ODvOOCv1xuICovXG4vKiog44Ky44O844Og44Gu56iu6aGe44Gr5YWx6YCa44GZ44KL6aeS5oOF5aCx44KE6aeS6YWN572u5oOF5aCxXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgR2FtZT59XG4gKi9cbmV4cG9ydCBjb25zdCBnYW1lcyA9IGF3YWl0IGltcG9ydEpzb24oXCJnYW1lc1wiKTtcblxuXHQvKipcblx0ICogQHR5cGVkZWYge09iamVjdH0gQm9hcmRJbml0T3B0aW9uIC0g44Oc44O844OJ44Gu5Yid5pyf5YyW44Kq44OX44K344On44OzXG5cdCAqIEBwcm9wIHtudW1iZXJ9IGNhbnZhc1dpZHRoIC0gQ2FudmFz5bmFXG5cdCAqIEBwcm9wIHtudW1iZXJ9IGNhbnZhc0hlaWdodCAtIENhbnZhc+mrmOOBlVxuXHQgKiBAcHJvcCB7Y2FudmFzRml0fSBjYW52YXNGaXQgLSBDYW52YXPjgrXjgqTjgrrjga7oh6rli5Xoqr/mlbRcblx0ICogQHByb3Age251bWJlcn0gYm9hcmRMZWZ0IC0g5o+P5YaZ44GZ44KLWOW6p+aomVxuXHQgKiBAcHJvcCB7bnVtYmVyfSBib2FyZFRvcCAtIOaPj+WGmeOBmeOCi1nluqfmqJlcblx0ICogQHByb3Age251bWJlcn0gcGFuZWxXaWR0aCAtIOODnuOCueebruW5hVxuXHQgKiBAcHJvcCB7bnVtYmVyfSBwYW5lbEhlaWdodCAtIOODnuOCueebrumrmOOBlVxuXHQgKiBAcHJvcCB7bnVtYmVyfSBwaWVjZVNpemUgLSDpp5Ljga7lpKfjgY3jgZVcblx0ICogQHByb3Age2Jvb2xlYW59IHVzZVJhbmtTaXplIC0g6aeS44Gu5aSn44GN44GV44KS5qC844Gu6YGV44GE44Gn5aSJ5pu044GZ44KLXG5cdCAqIEBwcm9wIHtib29sZWFufSBpc0RyYXdTaGFkb3cgLSDpp5Ljga7lvbHjga7mj4/lhpnmnInnhKFcblx0ICogQHByb3Age251bWJlcn0gYm9yZGVyV2lkdGggLSDmnqDnt5rlpKrjgZVcblx0ICogQHByb3Age2Jvb2xlYW59IHVzZVN0YW5kIC0g6aeS5Y+w44Gu5L2/55So5pyJ54ShXG5cdCAqIEBwcm9wIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIOiDjOaZr+iJsijjg4fjg5Xjgqnjg6vjg4jnhKHoibIpXG5cdCAqIEBwcm9wIHtib29sZWFufSBhdXRvRHJhd2luZyAtIOaPj+WGmeOBruiHquWLleabtOaWsOacieeEoVxuXHQgKiBAcHJvcCB7KEJvYXJkKT0+dm9pZH0gb25EcmF3ZWQgLSDmj4/lhpnjgqTjg5njg7Pjg4hcblx0ICogQHByb3AgeyhpKT0+dm9pZH0gb25HYW1lT3ZlciAtIOOCsuODvOODoOOCquODvOODkOODvOOCpOODmeODs+ODiFxuXHQgKiBAcHJvcCB7Ym9vbGVhbn0gZnJlZU1vZGUgLSDjg5Xjg6rjg7zjg6Ljg7zjg4nmnInlirnljJYv54Sh5Yq55YyWXG5cdCAqL1xuXHQvKipcblx0ICog44Oc44O844OJ44Gu5qeL5oiQ5oOF5aCxXG5cdCAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBCb2FyZEluaXRPcHRpb24+fVxuXHQgKi9cbmV4cG9ydCBjb25zdCBib2FyZHMgPSBhd2FpdCBpbXBvcnRKc29uKFwiYm9hcmRzXCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhbmVsSW5pdE9wdGlvbiAtIOODnuOCueebruOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuICogQHByb3Age3N0cmluZ30gbmFtZSAtIOODnuOCueebruOBruWQjeWJjVxuICogQHByb3Age3N0cmluZ30gdGV4dCAtIOODnOODvOODieihqOekuuaWh+Wtl+WIl1xuICogQHByb3Age3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0g44Oe44K555uu44Gu6ImyXG4gKiBAcHJvcCB7c3RyaW5nfSBib3JkZXJDb2xvciAtIOaeoOiJsuWPiuOBs+ODleOCqeODs+ODiOiJslxuICogQHByb3Age3N0cmluZ30gc2VsZWN0Q29sb3IgLSDpgbjmip7jgZfjgZ/mmYLjga7oibJcbiAqIEBwcm9wIHtzdHJpbmd9IHRhcmdldENvbG9yIC0g6aeS44KS6YG45oqe44GX44Gf5pmC44Gu6ImyXG4gKiBAcHJvcCB7c3RyaW5nfSBkaXNwbGF5VGV4dCAtIOihqOekuuOBmeOCi+aWh+Wtlygx5paH5a2XKVxuICogQHByb3Age251bWJlcn0gdGV4dFJvdGF0ZSAtIOihqOekuuOBmeOCi+aWh+Wtl+OBruWbnui7ouinkihkZWcpXG4gKiBAcHJvcCB7Ym9vbGVhbn0gYm9yZGVyU2xhc2hMZWZ0IC0g5bem5pac57eaKO+8vCnjga7mnInnhKFcbiAqIEBwcm9wIHtib29sZWFufSBib3JkZXJTbGFzaFJpZ2h0IC0g5Y+z5pac57eaKO+8jynjga7mnInnhKFcbiAqIEBwcm9wIHtib29sZWFufSBpbnRlcnNlY3QgLSDkuqTngrnjgpLkuK3lv4PjgajjgZnjgotcbiAqIEBwcm9wIHtzdHJpbmdbXX0gYXR0ciAtIOODnuOCueebruOBruapn+iDveOBruWxnuaAp1xuICovXG4vKipcbiAqIOODnOODvOODieS4reOBruODnuOCueebruaDheWgsVxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFBhbmVsSW5pdE9wdGlvbn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBhbmVscyA9IGF3YWl0IGltcG9ydEpzb24oXCJwYW5lbHNcIik7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGllY2VJbml0T3B0aW9uIC0g6aeS44Gu5Yid5pyf5YyW44Kq44OX44K344On44OzXG4gKiBAcHJvcCB7c3RyaW5nfSBuYW1lIC0g6aeS44Gu5ZCN5YmNXG4gKiBAcHJvcCB7c3RyaW5nW119IGRpc3BsYXkgLSDpp5LjgavooajnpLrjgZnjgovmloflrZfliJcoMeOAgTLmloflrZcp44Gu6YWN5YiXXG4gKiBAcHJvcCB7c3RyaW5nfSBpbWdTcmMgLSDpp5LjgajjgZfjgabooajnpLrjgZnjgovnlLvlg4/jg5Hjgrnjga7phY3liJdcbiAqIEBwcm9wIHtib29sZWFufWlzUm90YXRlSW1nIC0g6YGO55S75YOP44KS6Kit5a6a44GZ44KL5aC05ZCI5Zue6Lui44GZ44KL44GLXG4gKiBAcHJvcCB7c3RyaW5nfSBhbGlhcyAtIOOCreODvOOBruWIpeWQjeOBqOOBl+OBpuWumuOCgeOCi+aWh+Wtl+OBrumbhuWQiOihqFxuICogQHByb3Age3N0cmluZ30gZ2FtZU5hbWUgLSDpp5Ljgavlr77lv5zjgZnjgovjgrLjg7zjg6DlkI1cbiAqIEBwcm9wIHtzdHJpbmd9IGV4cGFuc2lvbiAtIOOCsuODvOODoOWQjeOBrue0sOWIhumhnlxuICogQHByb3Age1wi5YW1XCJ8XCLppqxcInxcIuixoVwifFwi6LuKXCJ8XCLoh6NcInxcIueOi1wifFwi5oiQXCJ9IHVuaXQgLSDpp5Ljga7lhbXnqK5cbiAqIEBwcm9wIHtudW1iZXJ9Zm9yY2VQcm9tb0xpbmUgLSDooYzjgY3jganjgZPjgo3jga7jgarjgYTpp5LjgajjgarjgovmrrVcbiAqIEBwcm9wIHtPYmplY3R9IHJhbmdlIC0g6aeS44Gu56e75YuV56+E5ZuyXG4gKiBAcHJvcCB7c3RyaW5nW119IHJhbmdlLmRlZmF1bHQgLSDpgJrluLjmmYLjga7np7vli5Xnr4Tlm7JcbiAqIEBwcm9wIHtzdHJpbmdbXX0gcmFuZ2UuYXR0YWNrIC0g6aeS5Y+W5b6X5pmC44Gu56e75YuV56+E5ZuyXG4gKiBAcHJvcCB7c3RyaW5nW119IHJhbmdlLnN0YXJ0IC0g5Yid5Zue44Gu44G/44Gu56e75YuV56+E5ZuyXG4gKiBAcHJvcCB7c3RyaW5nW119IHJhbmdlLmNhc3RsaW5nIC0g44Kt44Oj44K544Oq44Oz44Kw5pmC44Gu56e75YuV56+E5ZuyXG4gKiBAcHJvcCB7c3RyaW5nW119IHJhbmdlLmVuUGFzc2FudCAtIOOCouODs+ODkeODg+OCteODs+aZguOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5wYWxhY2VTbGFzaCAtIOS5neWuruWGheOBp+OBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ30gcHJvbW8gLSDjg5fjg63jg6Ljg7zjgrfjg6fjg7PlhYjjga7pp5Ljga7kuIDmloflrZfooajoqJhcbiAqIEBwcm9wIHtzdHJpbmdbXX0gYXR0ciAtIOmnkuOBruapn+iDveOBruODquOCueODiFxuICovXG4vKipcbiAqIOmnkuaDheWgsVxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFBpZWNlSW5pdE9wdGlvbj59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZXMgPSBhd2FpdCBpbXBvcnRKc29uKFwicGllY2VzXCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtzdHJpbmdbXX0gUGllY2VSYW5nZSDpp5Ljga7np7vli5Xnr4Tlm7JcbiAqL1xuLyoqXG4gKiDpp5Ljga7np7vli5Xnr4Tlm7JcbiAqIEB0eXBle09iamVjdDxzdHJpbmcsIFBpZWNlUmFuZ2U+fVxuICovXG5leHBvcnQgY29uc3QgcGllY2VSYW5nZSA9IGF3YWl0IGltcG9ydEpzb24oXCJwaWVjZVJhbmdlXCIpO1xuXG4vKipcbiAqIOmnkuOBruS+oeWApFxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIG51bWJlcj59XG4gKi9cbmV4cG9ydCBjb25zdCBwaWVjZUNvc3QgPSBhd2FpdCBpbXBvcnRKc29uKFwicGllY2VDb3N0XCIpO1xuIiwiaW1wb3J0IHtjYW52YXNGb250LCBwYW5lbHMsIHBpZWNlc30gZnJvbSBcIi4vanNvbi5qc1wiO1xuZXhwb3J0IHtjYW52YXNGb250fTtcblxuLyoqIOiqreOBv+i+vOOCgOaWh+Wtl+OBruS4gOimp+OCkuWPluW+l1xuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuY29uc3QgZ2V0Q2hhcnMgPSAoKSA9PiBbLi4uXG5cdG5ldyBTZXQoWy4uLlxuXHRcdE9iamVjdC52YWx1ZXMocGFuZWxzKS5tYXAoKHtkaXNwbGF5VGV4dH0pPT5kaXNwbGF5VGV4dCkuam9pbihcIlwiKStcblx0XHRPYmplY3QudmFsdWVzKHBpZWNlcykubWFwKCh7ZGlzcGxheX0pPT5kaXNwbGF5PyBkaXNwbGF5LmpvaW4oXCJcIik6IFwiXCIpLmpvaW4oXCJcIilcblx0XSlcbl0uc29ydCgpLmpvaW4oXCJcIik7XG5cbi8qKiBDYW52YXPnlKjjg5Xjgqnjg7Pjg4jnrqHnkIYgKi9cbk9iamVjdC5hc3NpZ24oY2FudmFzRm9udCwge1xuXHQvKiog6Kqt44G/6L6844G/5riI44G/44Gn44GC44KL44GLPyAqL1xuXHRpbXBvcnRlZDogZmFsc2UsXG5cblx0LyoqIOiqreOBv+i+vOOCgOODleOCqeODs+ODiOOBruS4gOimpyhcIixcIuWMuuWIh+OCiilcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdG5hbWVzOiBcIlwiLFxuXG5cdC8qKiDjg5Xjgqnjg7Pjg4jjga7oqq3jgb/ovrzjgb9cblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG5cdCAqL1xuXHRhc3luYyBpbXBvcnRBc3luYygpe1xuXHRcdGlmKHRoaXMuaW1wb3J0ZWQpIHJldHVybjtcblx0XHRjb25zdCBnb29nbGVVcmwgPSBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9XCI7XG5cdFx0Y29uc3QgY2hhcnMgPSBnZXRDaGFycygpO1xuXHRcdGNvbnN0IHVuaXF1ZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpLnRvU3RyaW5nKCk7XG5cdFx0dGhpcy5uYW1lcyA9IGNhbnZhc0ZvbnQuZm9udHMubWFwKG89PmBcIiR7b1swXX0ke3VuaXF1ZX1cImApLmpvaW4oXCIsXCIpK1wiLHNlcmlmXCI7XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0Y2FudmFzRm9udC5mb250cy5tYXAoYXN5bmMgKFtmb250TmFtZSwgZm9udFdlaWdodF0pPT57XG5cdFx0XHRcdGNvbnN0IGZvbnROYW1lUGx1cyA9IGZvbnROYW1lLnJlcGxhY2UoLyAvZywgXCIrXCIpO1xuXHRcdFx0XHRjb25zdCBmb250VXJsID0gYCR7Z29vZ2xlVXJsfSR7Zm9udE5hbWVQbHVzfTp3Z2h0QCR7Zm9udFdlaWdodH0mdGV4dD0ke2NoYXJzfWA7XG5cdFx0XHRcdGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKGZvbnRVcmwpO1xuXHRcdFx0XHRpZighcmVzLm9rKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IGNzcyA9IGF3YWl0IHJlcy50ZXh0KCk7XG5cdFx0XHRcdGNvbnN0IG1hdGNoVXJscyA9IGNzcy5tYXRjaCgvdXJsXFwoLis/XFwpL2cpO1xuXHRcdFx0XHRpZighbWF0Y2hVcmxzKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgZm91bmQgZm9udC5cIik7XG5cblx0XHRcdFx0Zm9yIChjb25zdCB1cmwgb2YgbWF0Y2hVcmxzKSB7XG5cdFx0XHRcdFx0Y29uc3QgZm9udEZhY2UgPSBuZXcgRm9udEZhY2UoYCR7Zm9udE5hbWV9JHt1bmlxdWV9YCwgdXJsKTtcblx0XHRcdFx0XHRkb2N1bWVudC5mb250cy5hZGQoZm9udEZhY2UpO1xuXHRcdFx0XHRcdGF3YWl0IGZvbnRGYWNlLmxvYWQoKS5jYXRjaCgoKT0+e30pO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdCkudGhlbihfPT50aGlzLmltcG9ydGVkID0gdHJ1ZSk7XG5cdH1cbn0pO1xuIiwiaW1wb3J0IHtwYW5lbHMsIHBpZWNlc30gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog55S75YOP6Kqt44G/6L6844G/5Yem55CGXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjIC0g55S75YOP44OR44K5XG4gKiBAcmV0dXJucyBQcm9taXNlPEltYWdlPlxuICovXG5mdW5jdGlvbiBsb2FkSW1hZ2Uoc3JjKXtcblx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9Pntcblx0XHRjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdGltYWdlLnNyYyA9IHNyYztcblx0XHRpbWFnZS5vbmxvYWQgPSAoKT0+cmVzb2x2ZShpbWFnZSk7XG5cdH0pO1xufVxuXG4vKiog6Kqt44G/6L6844KA55S75YOP44OR44K544Gu5LiA6KanXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKi9cbmNvbnN0IGltZ1NyY3MgPSBbLi4ubmV3IFNldChcblx0T2JqZWN0LnZhbHVlcyhwYW5lbHMpLmZsYXRNYXAoKHtpbWdTcmN9KT0+aW1nU3JjPz9bXSlcblx0LmNvbmNhdChPYmplY3QudmFsdWVzKHBpZWNlcykuZmxhdE1hcCgoe2ltZ1NyY30pPT5pbWdTcmM/P1tdKSlcbildO1xuXG4vKiogQ2FudmFz55So55S75YOP44Gu566h55CGICovXG5leHBvcnQgY29uc3QgY2FudmFzSW1hZ2UgPSB7XG5cdC8qKiDoqq3jgb/ovrzjgb/muIjjgb/jgafjgYLjgovjgYs/ICovXG5cdGltcG9ydGVkOiBmYWxzZSxcblxuXHQvKiog6Kqt44G/6L6844KT44Gg55S75YOP44OH44O844K/XG5cdCAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBJbWFnZT59XG5cdCAqL1xuXHRpbWFnZXM6IHt9LFxuXG5cdC8qKiDnlLvlg4/jga7oqq3jgb/ovrzjgb9cblx0ICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG5cdCAqL1xuXHRhc3luYyBpbXBvcnRBc3luYygpe1xuXHRcdGlmKHRoaXMuaW1wb3J0ZWQpIHJldHVybjtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRpbWdTcmNzLm1hcChhc3luYyBzcmM9Pntcblx0XHRcdFx0dGhpcy5pbWFnZXNbc3JjXSA9IGF3YWl0IGxvYWRJbWFnZShzcmMpO1xuXHRcdFx0fSlcblx0XHQpLnRoZW4oXz0+dGhpcy5pbXBvcnRlZCA9IHRydWUpXG5cdH1cbn07XG5cbiIsImNvbnN0IGdldE1pbWUgPSAoZXh0KT0+XG5cdFwiaW1hZ2UvXCIrZXh0LnJlcGxhY2UoXCJqcGdcIiwgXCJqcGVnXCIpO1xuXG4vKiog44Kt44Oj44Oz44OQ44K544Gu55S75YOP44KS5Y+W5b6X44GZ44KLXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fX0gY2FudmFzIC0gQ2FudmFz6KaB57SgXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWUgLSDlj5blvpfjgZnjgovjg5XjgqHjgqTjg6vlkI0o5ouh5by15a2Q44KS6Zmk44GPKVxuICogQHBhcmFtIHtzdHJpbmd9IGV4dCAtIOaLoeW8teWtkFxuICogQHBhcmFtIHtcImJhc2U2NFwifFwiYmxvYlwifSB1cmxUeXBlIC0g55Sf5oiQVVJM44K/44Kk44OXXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRvd25sb2FkSW1hZ2UoY2FudmFzLCBmaWxlTmFtZT1cImltYWdlXCIsIGV4dD1cInBuZ1wiLCB1cmxUeXBlPVwiYmFzZTY0XCIpe1xuXHRjb25zdCBtaW1lID0gZ2V0TWltZShleHQpO1xuXHRjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdGxldCB1cmw7XG5cdGlmKHVybFR5cGUgPT09IFwiYmxvYlwiKVxuXHRcdHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoXG5cdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXM9PmNhbnZhcy50b0Jsb2IocmVzKSwgbWltZSkpO1xuXHRlbHNlXG5cdFx0dXJsID0gY2FudmFzLnRvRGF0YVVSTChtaW1lKTtcblx0YS5ocmVmID0gdXJsO1xuXHRhLmRvd25sb2FkID0gYCR7ZmlsZU5hbWV9LiR7ZXh0fWA7XG5cdGEuY2xpY2soKTtcblx0aWYodXJsVHlwZSA9PT0gXCJibG9iXCIpIFVSTC5yZXZva2VPYmplY3RVUkwoYS5ocmVmKTtcbn1cbiIsImltcG9ydCB7Y2FudmFzRm9udH0gZnJvbSBcIi4vY2FudmFzRm9udExvYWRlci5qc1wiO1xuaW1wb3J0IHtjYW52YXNJbWFnZX0gZnJvbSBcIi4vY2FudmFzSW1hZ2VMb2FkZXIuanNcIjtcbmltcG9ydCB7cGFuZWxzfSBmcm9tIFwiLi9qc29uLmpzXCI7XG5cbi8qKiDjg57jgrnnm67jga7nrqHnkIbjgq/jg6njgrkgKi9cbmV4cG9ydCBjbGFzcyBQYW5lbHtcblx0I2lzU2VsZWN0ZWQ7XG5cdCN0YXJnZXRSYW5nZXM7XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7YW55fSBjdHggLSBDYW52YXPmj4/nlLvjgrPjg7Pjg4bjgq3jgrnjg4hcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNoYXIgLSDjg57jgrnnm67jgpLnpLrjgZnmloflrZdcblx0ICogQHBhcmFtIHtudW1iZXJ9IGNlbnRlciAtIOaPj+WGmeOBmeOCi1jluqfmqJko5Lit5b+D5Y6f54K5KVxuXHQgKiBAcGFyYW0ge251bWJlcn0gbWlkZGxlIC0g5o+P5YaZ44GZ44KLWeW6p+aomSjkuK3lv4Pljp/ngrkpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCAtIOODnuOCueebruW5hVxuXHQgKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0IC0g44Oe44K555uu6auY44GVXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBib3JkZXJXaWR0aCAtIOaeoOe3muOBruWkquOBlVxuXHQgKiBAcGFyYW0ge251bWJlcn0gcFggLSDjg5zjg7zjg4nkuIrjga7jg57jgrnnm67jga7liJdcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBZIC0g44Oc44O844OJ5LiK44Gu44Oe44K555uu44Gu6KGMXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihjdHgsIGNoYXIsIGNlbnRlciwgbWlkZGxlLCB3aWR0aCwgaGVpZ2h0LCBib3JkZXJXaWR0aCwgcFgsIHBZKXtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHBhbmVsc1tjaGFyXSk7XG5cdFx0dGhpcy5jdHggPSBjdHg7XG5cdFx0dGhpcy5jZW50ZXIgPSBjZW50ZXI7XG5cdFx0dGhpcy5taWRkbGUgPSBtaWRkbGU7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuXHRcdHRoaXMubGVmdCA9IGNlbnRlci13aWR0aC8yO1xuXHRcdHRoaXMudG9wID0gbWlkZGxlLWhlaWdodC8yO1xuXHRcdHRoaXMucmlnaHQgPSBjZW50ZXIrd2lkdGgvMjtcblx0XHR0aGlzLmJvdHRvbSA9IG1pZGRsZStoZWlnaHQvMjtcblx0XHR0aGlzLmJvcmRlcldpZHRoID0gYm9yZGVyV2lkdGg7XG5cdFx0dGhpcy5wWCA9IHBYO1xuXHRcdHRoaXMucFkgPSBwWTtcblx0XHR0aGlzLnNlbGVjdENvbG9yID8/PSBcIiNGRjAwMDA2NlwiO1xuXHRcdHRoaXMudGFyZ2V0Q29sb3IgPz89IFwiIzAwRkYwMDY2XCI7XG5cdFx0dGhpcy5waWVjZSA9IG51bGw7XG5cdFx0dGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5jbGVhclRhcmdldCgpO1xuXHRcdHRoaXMuYXR0ciA/Pz0gW107XG5cdH1cblxuXHQvKiog44Oe44K555uu44Gu6YG45oqe54q25oWLXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcblx0ICovXG5cdHNldCBpc1NlbGVjdGVkKHZhbHVlKXtcblx0XHR0aGlzLiNpc1NlbGVjdGVkID0gdGhpcy5oYXNBdHRyKFwia2VlcE91dFwiKT8gZmFsc2U6IHZhbHVlO1xuXHR9XG5cdGdldCBpc1NlbGVjdGVkKCl7XG5cdFx0cmV0dXJuIHRoaXMuI2lzU2VsZWN0ZWQ7XG5cdH1cblxuXHQvKiog44Oe44K555uu44Gu56e75YuV5Y+v6IO95Yik5a6aXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWVcblx0ICovXG5cdGdldCBpc1RhcmdldCgpe1xuXHRcdHJldHVybiAwIDwgdGhpcy4jdGFyZ2V0UmFuZ2VzLmxlbmd0aDtcblx0fVxuXG5cdC8qKiDjg57jgrnnm67jga7np7vli5XlhYjmg4XloLHjgpLjgq/jg6rjgqIgKi9cblx0Y2xlYXJUYXJnZXQoKXtcblx0XHR0aGlzLiN0YXJnZXRSYW5nZXMgPSBbXTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm67jga7np7vli5XlhYjmg4XloLHjgpLov73liqBcblx0ICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlTmFtZSAtIOenu+WLleWFiOaDheWgsVxuXHQgKi9cbiAgIGFkZFRhcmdldChyYW5nZU5hbWUpe1xuXHRcdHRoaXMuI3RhcmdldFJhbmdlcy5wdXNoKHJhbmdlTmFtZSk7XG5cdH1cblxuXHQvKiog44Oe44K555uu44GM56e75YuV5YWI5oOF5aCx44KS5oyB44Gj44Gm44GE44KL44GL5Yik5a6aXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZU5hbWUgLSDnp7vli5XlhYjmg4XloLFcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRoYXNUYXJnZXQocmFuZ2VOYW1lKXtcblx0XHRyZXR1cm4gdGhpcy4jdGFyZ2V0UmFuZ2VzLmluY2x1ZGVzKHJhbmdlTmFtZSk7XG5cdH1cblxuXHQvKiog5bGe5oCn44Gu5a2Y5Zyo44KS56K66KqNXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBhdHRyTmFtZSAtIOWxnuaAp+WQjVxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGhhc0F0dHIoYXR0ck5hbWUpe1xuXHRcdHJldHVybiB0aGlzLmF0dHIuaW5jbHVkZXMoYXR0ck5hbWUpO1xuXHR9XG5cdC8qKiDluqfmqJnjgYzjg57jgrnnm67jgavlkKvjgb7jgozjgovjgYvliKTlrppcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggLSBY5bqn5qiZXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWeW6p+aomVxuXHQgKi9cblx0Y2hlY2tSYW5nZU1vdXNlKHgsIHkpe1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmxlZnQgPD0geCAmJiB4IDwgdGhpcy5yaWdodCAmJlxuXHRcdFx0dGhpcy50b3AgPD0geSAmJiB5IDwgdGhpcy5ib3R0b21cblx0XHQpO1xuXHR9XG5cblx0LyoqIOODnuOCueebri/jg57jgrnjgq8v6aeS44KS5o+P5YaZICovXG5cdGRyYXcoKXtcblx0XHRjb25zdCB7c2VsZWN0Q29sb3IsIHRhcmdldENvbG9yfSA9IHRoaXM7XG5cblx0XHRpZih0aGlzLmltZ1NyYyAmJiBjYW52YXNJbWFnZS5pbXBvcnRlZClcblx0XHRcdHRoaXMuZHJhd0ltYWdlKCk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5kcmF3UGFuZWwoKTtcblx0XHRpZih0aGlzLmlzU2VsZWN0ZWQpIHRoaXMuZHJhd01hc2soc2VsZWN0Q29sb3IpO1xuXHRcdGlmKHRoaXMuaXNUYXJnZXQpIHRoaXMuZHJhd01hc2sodGFyZ2V0Q29sb3IpO1xuXHRcdHRoaXMucGllY2U/LmRyYXcoKTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm67nlLvlg4/jgpLmj4/lhpkgKi9cblx0ZHJhd0ltYWdlKCl7XG5cdFx0Y29uc3Qge2N0eH0gPSB0aGlzO1xuXG5cdFx0Y29uc3Qgc3JjID0gdGhpcy5pbWdTcmM7XG5cdFx0Y29uc3QgaW1hZ2UgPSBjYW52YXNJbWFnZS5pbWFnZXNbc3JjXTtcblx0XHRpZighaW1hZ2UpIHJldHVybjtcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmxlZnQsIHRoaXMudG9wKTtcblx0XHRjdHguZHJhd0ltYWdlKGltYWdlLCAwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm67jgpLmj4/lhpkgKi9cblx0ZHJhd1BhbmVsKCl7XG5cdFx0Y29uc3Qge2N0eCwgbGVmdCwgdG9wLCBjZW50ZXIsIG1pZGRsZSwgd2lkdGgsIGhlaWdodCwgZGlzcGxheVRleHQsIHRleHRSb3RhdGV9ID0gdGhpcztcblxuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcblx0XHRjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmJvcmRlckNvbG9yO1xuXHRcdGN0eC5saW5lV2lkdGggPSB0aGlzLmJvcmRlcldpZHRoO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdC8vIOS6pOeCueOCkuaPj+WGmVxuXHRcdGlmKHRoaXMuaW50ZXJzZWN0KXtcblx0XHRcdGN0eC5saW5lV2lkdGggPSB0aGlzLmJvcmRlcldpZHRoO1xuXHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdFx0Y3R4Lm1vdmVUbyh3aWR0aC8yLCAwKTtcblx0XHRcdGN0eC5saW5lVG8od2lkdGgvMiwgaGVpZ2h0KTtcblx0XHRcdGN0eC5tb3ZlVG8oMCwgaGVpZ2h0LzIpO1xuXHRcdFx0Y3R4LmxpbmVUbyh3aWR0aCwgaGVpZ2h0LzIpO1xuXHRcdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdFx0Y3R4LnN0cm9rZSgpO1xuXHRcdH1cblx0XHQvLyDjg57jgrnnm67jgpLmj4/lhplcblx0XHRlbHNle1xuXHRcdFx0Y3R4LnN0cm9rZVJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0fVxuXG5cdFx0Ly8g5pac57ea44KS5o+P5YaZXG5cdFx0Y3R4LmxpbmVXaWR0aCA9IHRoaXMuYm9yZGVyV2lkdGgvMjtcblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0aWYodGhpcy5ib3JkZXJTbGFzaExlZnQpe1xuXHRcdFx0Y3R4Lm1vdmVUbygwLCAwKTtcblx0XHRcdGN0eC5saW5lVG8od2lkdGgsIGhlaWdodCk7XG5cdFx0fVxuXHRcdGlmKHRoaXMuYm9yZGVyU2xhc2hSaWdodCl7XG5cdFx0XHRjdHgubW92ZVRvKHdpZHRoLCAwKTtcblx0XHRcdGN0eC5saW5lVG8oMCwgaGVpZ2h0KTtcblx0XHR9XG5cdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHRcdGN0eC5zdHJva2UoKTtcblx0XHRjdHgucmVzdG9yZSgpO1xuXG5cdFx0Ly8g5paH5a2X44KS5o+P5YaZXG5cdFx0aWYoZGlzcGxheVRleHQpe1xuXHRcdFx0Y3R4LnNhdmUoKTtcblx0XHRcdGN0eC50cmFuc2xhdGUoY2VudGVyLCBtaWRkbGUpO1xuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IHRoaXMuYm9yZGVyQ29sb3I7XG5cblx0XHRcdGNvbnN0IHJhZCA9IHRleHRSb3RhdGU/IHRleHRSb3RhdGUqTWF0aC5QSS8xODA6IDA7XG5cdFx0XHRjdHgucm90YXRlKHJhZCk7XG5cblx0XHRcdGNvbnN0IGZvbnRTaXplID0gTWF0aC5taW4odGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpKjAuNjtcblx0XHRcdGN0eC5mb250ID0gYCR7Zm9udFNpemV9cHggJHtjYW52YXNGb250Lm5hbWVzfWA7XG5cblx0XHRcdGNvbnN0IHdpZHRoID0gY3R4Lm1lYXN1cmVUZXh0KGRpc3BsYXlUZXh0KS53aWR0aDtcblx0XHRcdGNvbnN0IGhlaWdodCA9IGZvbnRTaXplLzIqMC44O1xuXHRcdFx0Y3R4LmZpbGxUZXh0KGRpc3BsYXlUZXh0LCAtd2lkdGgvMiwgaGVpZ2h0KTtcblx0XHRcdGN0eC5yZXN0b3JlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqIOODnuOCueebruOBq+ODnuOCueOCr+OCkuaPj+WGmVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgLSDjgqvjg6njg7zjgqjjg5Xjgqfjgq/jg4jjga7oibJcblx0ICovXG5cdGRyYXdNYXNrKGNvbG9yKXtcblx0XHRjb25zdCB7Y3R4fSA9IHRoaXM7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XG5cblx0XHQvLyDjg57jgrnnm67jgpLmj4/lhplcblx0XHRjdHguZmlsbFJlY3QodGhpcy5sZWZ0LCB0aGlzLnRvcCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+W9ouW8j+OBp+WPluW+l1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gLSDnsKHmmJPooajnpLpcblx0ICovXG5cdHRvU3RyaW5nKGlzTWluaW1hbT1mYWxzZSl7XG5cdFx0cmV0dXJuICFpc01pbmltYW0/XG5cdFx0XHR0aGlzLnRleHQ6XG5cdFx0XHRg772cJHt0aGlzLnRleHQuc2xpY2UoLTEpLnJlcGxhY2UoL+OAgC9nLCBcIuODu1wiKX1gO1xuXHR9XG59XG4iLCIvKiogQHR5cGVkZWYge2ltcG9ydCgnLi9qc29uJykuUGllY2VJbml0T3B0aW9ufSBQaWVjZUluaXRPcHRpb24gKi9cbmltcG9ydCB7Y2FudmFzRm9udH0gZnJvbSBcIi4vY2FudmFzRm9udExvYWRlci5qc1wiO1xuaW1wb3J0IHtjYW52YXNJbWFnZX0gZnJvbSBcIi4vY2FudmFzSW1hZ2VMb2FkZXIuanNcIjtcbmltcG9ydCB7Z2FtZXMsIHBpZWNlcywgcGllY2VSYW5nZSwgcGllY2VDb3N0fSBmcm9tIFwiLi9qc29uLmpzXCI7XG5cbi8qKiDpp5Ljga7nrqHnkIbjgq/jg6njgrkgKi9cbmV4cG9ydCBjbGFzcyBQaWVjZXtcblx0LyoqIOaPj+WGmeOCteOCpOOCulxuXHQgKiBAdHlwZSB7bnVtYmVyfVxuXHQgKi9cblx0c3RhdGljIHNpemUgPSA0NTtcblxuXHQvKiog5qC844Gu6YGV44GE44Gr44KI44Gj44Gm6aeS44Gu5aSn44GN44GV44KS5aSJ5pu044GZ44KL44GLXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3RhdGljIHVzZVJhbmtTaXplID0gdHJ1ZTtcblxuXHQvKiog5b2x44Gu5o+P5YaZ5pyJ54ShXG5cdCAqIEB0eXBlIHtib29sZWFufVxuXHQgKi9cblx0c3RhdGljIGlzRHJhd1NoYWRvdyA9IHRydWU7XG5cblx0LyoqIOODhuOCreOCueODiOWHuuWKm+aZguOBruODl+ODrOOCpOODpOODvOihqOekulxuXHQgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgc3RyaW5nPn1cblx0ICovXG5cdHN0YXRpYyBkZWdDaGFycyA9IHtcblx0XHQwOiBcIuKWslwiLFxuXHRcdDkwOiBcIuKJq1wiLFxuXHRcdDE4MDogXCLilr1cIixcblx0XHQyNzA6IFwi77ycXCJcblx0fTtcblxuXHQvKiog44OX44Os44Kk44Ok44O86KGo56S644GL44KJ6KeS5bqm44KS5Y+W5b6XICovXG5cdHN0YXRpYyBjaGFyRGVncyA9IHt9O1xuXG5cdC8qKiDjgrXjgqTjgrrlpInmm7ToqK3lrprlgKRcblx0ICogQHR5cGUge09iamVjdDxzdHJpbmcsIG51bWJlcj59XG5cdCAqL1xuXHRzdGF0aWMgcmFua1JhdGlvID0ge1xuXHRcdFwiS1JcIjogMSxcblx0XHRcIlNSXCI6IDAuOTY1LFxuXHRcdFwiUlwiOiAwLjkzNSxcblx0XHRcIlVDXCI6IDAuOTAsXG5cdFx0XCJDXCI6IDAuODY1XG5cdH1cblxuXHQvKiog6aeS44Gu5q616ZqO5Yil5L6h5YCk44KS5Y+W5b6XICovXG5cdGdldCByYW5rKCl7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMuY29zdCA8PSAwPyBcIktSXCI6XG5cdFx0XHQyMCA8PSB0aGlzLmNvc3Q/IFwiU1JcIjpcblx0XHRcdDEwIDw9IHRoaXMuY29zdD8gXCJSXCI6XG5cdFx0XHQ1IDw9IHRoaXMuY29zdD8gXCJVQ1wiOlxuXHRcdFx0XCJDXCJcblx0XHQpO1xuXHR9XG5cblxuXHQvKiog6aeS44OH44O844K/44KS5Yid5pyf5YyWXG5cdCAqIEBwYXJhbSB7YW55fSBjdHggLSBDYW52YXPmj4/nlLvjgrPjg7Pjg4bjgq3jgrnjg4hcblx0ICogQHBhcmFtIHtQaWVjZXxQaWVjZUluaXRPcHRpb259IG9wdGlvbiAtIOmnkuOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuXHQgKi9cblx0c3RhdGljIGdldFBpZWNlcyhjdHgsIG9wdGlvbj17fSl7XG5cdFx0Y29uc3QgZXhQaWVjZXMgPSBuZXcgTWFwKE9iamVjdC5lbnRyaWVzKEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkocGllY2VzKSkpKTtcblxuXHRcdC8qIOODh+ODvOOCv+OCkuijnOWujCAqL1xuXHRcdGZvcihjb25zdCBbXywgcGllY2VdIG9mIGV4UGllY2VzKXtcblx0XHRcdHBpZWNlLmF0dHIgPz89IFtdO1xuXHRcdFx0aWYocGllY2UudW5pdCAmJiBwaWVjZS51bml0ID09PSBcIuaIkFwiKSBwaWVjZS5iYXNlID0gcGllY2U7XG5cdFx0fVxuXHRcdC8qIOaIkOmnkuOBruODh+ODvOOCv+OCkuWQiOaIkCAqL1xuXHRcdGZvcihjb25zdCBbXywgcGllY2VdIG9mIGV4UGllY2VzKXtcblx0XHRcdGlmKCFwaWVjZS5wcm9tbyB8fCB0eXBlb2YocGllY2UucHJvbW8pICE9PSBcInN0cmluZ1wiKSBjb250aW51ZTtcblx0XHRcdGNvbnN0IHByb21vS2V5cyA9IFsuLi5waWVjZS5wcm9tb107XG5cdFx0XHRwaWVjZS5wcm9tbyA9IHt9O1xuXHRcdFx0Zm9yKGNvbnN0IGtleSBvZiBwcm9tb0tleXMpe1xuXHRcdFx0XHRjb25zdCBwcm9tbyA9IGV4UGllY2VzLmdldChrZXkpO1xuXHRcdFx0XHRwcm9tby5hdHRyLnB1c2goXCJwcm9tb3RlZFwiKTtcblx0XHRcdFx0cHJvbW8udW5pdCA9IFwi5oiQXCI7XG5cdFx0XHRcdHBpZWNlLnByb21vW2tleV0gPSBwcm9tbztcblx0XHRcdFx0ZXhQaWVjZXMuc2V0KGtleSx7Li4ucGllY2UsIC4uLnByb21vfSk7XG5cdFx0XHR9O1xuXHRcdH1cblx0XHQvLyDpp5LjgpLjgq/jg6njgrnjgqrjg5bjgrjjgqfjgq/jg4jjgavlpInmj5tcblx0XHRbLi4uZXhQaWVjZXNdLmZvckVhY2goKFtrZXksIHBpZWNlXSwgaSk9Pntcblx0XHRcdHBpZWNlLmlkID0gaTtcblx0XHRcdHBpZWNlLmNoYXIgPSBrZXk7XG5cdFx0XHRleFBpZWNlcy5zZXQoa2V5LCBuZXcgUGllY2UoY3R4LCBwaWVjZSwgb3B0aW9uKSk7XG5cdFx0fSk7XG5cdFx0Y29uc3QgZXhQaWVjZXNPYmogPSBPYmplY3QuZnJvbUVudHJpZXMoZXhQaWVjZXMpO1xuXHRcdC8vIOOCqOOCpOODquOCouOCueOBruODh+ODvOOCv+OCkue1seWQiFxuXHRcdGZvcihjb25zdCBba2V5LCBwaWVjZV0gb2YgZXhQaWVjZXMpe1xuXHRcdFx0cGllY2UuYWxpYXMuZm9yRWFjaCgoYWxpYXNLZXksIGkpPT57XG5cdFx0XHRcdGNvbnN0IGFsaWFzID0gcGllY2UuY2xvbmUoKTtcblx0XHRcdFx0Y29uc3QgZGlzcGxheSA9IFsuLi5hbGlhcy5kaXNwbGF5XTtcblx0XHRcdFx0YWxpYXMuZGlzcGxheVB0biA9IGkrMTtcblx0XHRcdFx0YWxpYXMuZGlzcGxheSA9IGRpc3BsYXk7XG5cdFx0XHRcdGFsaWFzLmFsaWFzW2ldID0ga2V5O1xuXHRcdFx0XHRleFBpZWNlc09ialthbGlhc0tleV0gPSBhbGlhcztcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRyZXR1cm4gZXhQaWVjZXNPYmo7XG5cdH1cblxuXHQvKiog5paH5a2X5YiX44GL44KJ6aeS44KS5Y+W5b6XXG5cdCAqIEBwYXJhbSB7UGllY2V8UGllY2VJbml0T3B0aW9ufSBwaWVjZSAtIOmnklxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIOmnkuaWh+Wtl+WIl1xuXHQgKi9cblx0c3RhdGljIHN0cmluZ1RvUGllY2UocGllY2VzLCB0ZXh0KXtcblx0XHRpZiAoIXRleHQpIHJldHVybiBudWxsO1xuXHRcdGNvbnN0IFtkZWdDaGFyLCBwaWVjZUNoYXJdID0gWy4uLnRleHRdO1xuXHRcdGNvbnN0IGRlZyA9IFBpZWNlLmNoYXJEZWdzW2RlZ0NoYXJdO1xuXHRcdGlmKCFkZWcgfHwgIXBpZWNlc1twaWVjZUNoYXJdKSByZXR1cm4gbnVsbDtcblx0XHRjb25zdCBwaWVjZSA9IHBpZWNlc1twaWVjZUNoYXJdLmNsb25lKCk7XG5cdFx0cGllY2UuZGVnID0gZGVnO1xuXHRcdHJldHVybiBwaWVjZTtcblx0fVxuXG5cdC8qKiDpp5Ljga7kuIDopqfjgpLjg6rjgrnjg4jjgaflj5blvpcgKi9cblx0c3RhdGljIHBpZWNlc1RvTGlzdChwaWVjZXMpe1xuXHRcdHJldHVybiBPYmplY3QuZW50cmllcyhwaWVjZXMpXG5cdFx0XHQuc29ydCgoW18se2lkOmF9XSwgW19fLHtpZDpifV0pPT5cblx0XHRcdFx0TWF0aC5zaWduKGEtYikpO1xuXHR9XG5cblx0LyoqIOmnkuOBruinkuW6pihkZWcvcmFkKVxuXHQgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcblx0ICovXG5cdHNldCBkZWcodmFsdWUpe1xuXHRcdHRoaXMucmFkID0gdmFsdWUlMzYwKk1hdGguUEkvMTgwO1xuXHR9XG5cdGdldCBkZWcoKXtcblx0XHRyZXR1cm4gdGhpcy5yYWQlMzYwLyhNYXRoLlBJLzE4MCk7XG5cdH1cblxuXHQvKiog5bem5YG044Gu5bqn5qiZICovXG5cdGdldCBsZWZ0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY2VudGVyLXRoaXMuc2l6ZSowLjgvMjtcblx0fVxuXHQvKiog5LiK5YG044Gu5bqn5qiZICovXG5cdGdldCB0b3AoKXtcblx0XHRyZXR1cm4gdGhpcy5taWRkbGUtdGhpcy5zaXplLzI7XG5cdH1cblx0LyoqIOWPs+WBtOOBruW6p+aomSAqL1xuXHRnZXQgcmlnaHQoKXtcblx0XHRyZXR1cm4gdGhpcy5jZW50ZXIrdGhpcy5zaXplKjAuOC8yO1xuXHR9XG5cdC8qKiDkuIvlgbTjga7luqfmqJkgKi9cblx0Z2V0IGJvdHRvbSgpe1xuXHRcdHJldHVybiB0aGlzLm1pZGRsZSt0aGlzLnNpemUvMjtcblx0fVxuXG5cdC8qKiDmi6HlpKfnjofjgpLlj5blvpdcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldCB6b29tKCl7XG5cdFx0bGV0IHpvb20gPXRoaXMuc2l6ZS8xMDA7XG5cdFx0aWYodGhpcy51c2VSYW5rU2l6ZSlcblx0XHRcdHpvb20gKj0gUGllY2UucmFua1JhdGlvW3RoaXMucmFua107XG5cdFx0cmV0dXJuIHpvb207XG5cdH1cblxuXHQvKipcblx0ICogQHBhcmFtIHthbnl9IGN0eCAtIENhbnZhc+aPj+eUu+OCs+ODs+ODhuOCreOCueODiFxuXHQgKiBAcGFyYW0ge1BpZWNlfFBpZWNlSW5pdE9wdGlvbn0gcGllY2UgLSDpp5Jcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbiAtIOOCquODl+OCt+ODp+ODs1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9uLmRpc3BsYXlQdG4gLSDooajnpLrmloflrZfliJfjgpLlpInmm7QoMeOAnClcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5kZWcgLSDpp5Ljga7op5LluqZcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5zaXplIC0g6aeS44Gu5aSn44GN44GVXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9uLnVzZVJhbmtTaXplIC0g6aeS44Gu5aSn44GN44GV44KS5qC844Gu6YGV44GE44Gn5aSJ5pu044GZ44KL44GLXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9uLmlzRHJhd1NoYWRvdyAtIOmnkuOBruW9seOBruaPj+WGmeacieeEoVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi5pc01vdmVkIC0g5Yid5Zue56e75YuV5riI44G/44GL5ZCm44GLXG5cdCAqL1xuXHRjb25zdHJ1Y3RvcihjdHgsIHBpZWNlLCBvcHRpb249e30pe1xuXHRcdGNvbnN0IHtcblx0XHRcdGRpc3BsYXlQdG49MCxcblx0XHRcdGRlZz0wLFxuXHRcdFx0c2l6ZT1QaWVjZS5zaXplLFxuXHRcdFx0dXNlUmFua1NpemU9UGllY2UudXNlUmFua1NpemUsXG5cdFx0XHRpc0RyYXdTaGFkb3c9UGllY2UuaXNEcmF3U2hhZG93LFxuXHRcdFx0aXNNb3ZlZD1mYWxzZVxuXHRcdH0gPSBvcHRpb247XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBwaWVjZSk7XG5cdFx0dGhpcy5jdHggPSBjdHg7XG5cdFx0dGhpcy5kaXNwbGF5ID8/PSBbXCJcIl07XG5cdFx0dGhpcy5pbWdTcmMgPz89IG51bGw7XG5cdFx0dGhpcy5hbGlhcyA9IFsuLi50aGlzLmFsaWFzID8/IFwiXCJdO1xuXHRcdHRoaXMuZGlzcGxheVB0biA9IGRpc3BsYXlQdG47XG5cdFx0dGhpcy5nYW1lID0gZ2FtZXNbdGhpcy5nYW1lTmFtZV07XG5cdFx0dGhpcy5jb3N0ID0gcGllY2VDb3N0W3RoaXMuY2hhcl0gPz8gMTtcblx0XHR0aGlzLmNlbnRlciA9IDA7XG5cdFx0dGhpcy5taWRkbGUgPSAwO1xuXHRcdHRoaXMuZGVnID0gZGVnO1xuXHRcdHRoaXMuc2l6ZSA9IHNpemU7XG5cdFx0dGhpcy51c2VSYW5rU2l6ZSA9IHVzZVJhbmtTaXplO1xuXHRcdHRoaXMuaXNEcmF3U2hhZG93ID0gaXNEcmF3U2hhZG93O1xuXHRcdHRoaXMuaXNSb3RhdGVJbWcgPz89IHRydWU7XG5cdFx0dGhpcy5pc01vdmVkID0gaXNNb3ZlZDtcblx0XHR0aGlzLmlzU2VsZWN0ZWQgPSBmYWxzZTtcblx0XHR0aGlzLmF0dHIgPz89IFtdO1xuXHRcdHRyeXtcblx0XHRcdE9iamVjdC5lbnRyaWVzKHRoaXMucmFuZ2UpLmZvckVhY2goKFtrZXksIHJuZ10pPT57XG5cdFx0XHRcdGlmKEFycmF5LmlzQXJyYXkocm5nKSkgcmV0dXJuO1xuXHRcdFx0XHR0aGlzLnJhbmdlW2tleV0gPSBwaWVjZVJhbmdlW3JuZ10ubWFwKHJvdz0+Wy4uLnJvd10pXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLmVycm9yKGUpO1xuXHRcdFx0dGhyb3cgcGllY2U7XG5cdFx0fVxuXHR9XG5cblx0LyoqIOmnkuOCkuOCr+ODreODvOODs1xuXHQgKiBAcmV0dXJucyBQaWVjZVxuXHQgKi9cblx0Y2xvbmUoKXtcblx0XHRjb25zdCB7ZGlzcGxheVB0biwgZGVnLCBzaXplLCBpc01vdmVkfSA9IHRoaXM7XG5cdFx0cmV0dXJuIG5ldyBQaWVjZSh0aGlzLmN0eCwgey4uLnRoaXN9LCB7ZGlzcGxheVB0biwgZGVnLCBzaXplLCBpc01vdmVkfSk7XG5cdH1cblxuXHQvKiog6aeS44KS6KGo6L+U44GZICovXG5cdHR1cm5Gcm9udCgpe1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5iYXNlKTtcblx0fVxuXG5cdC8qKiDjg5fjg63jg6Ljg7zjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtzdHJpbmd9IGNoYXIgLSDmiJDjgorlhYjjga7mloflrZdcblx0ICovXG5cdHByb21vdGlvbihjaGFyKXtcblx0XHRjb25zdCB7cHJvbW99ID0gdGhpcztcblxuXHRcdGlmKCFwcm9tbykgdGhyb3cgRXJyb3IoYHByb21vPSR7Y2hhcn0sIE5vdCBwbG9tb3RlIHBpZWNlLmApO1xuXHRcdGlmKCFwcm9tbyBpbiBwcm9tbykgdGhyb3cgRXJyb3IoYHByb21vPSR7Y2hhcn0sIFBsb21vdGUga2V5IGlzIG1pc3NpbmcuYCk7XG5cdFx0aWYodGhpcy5oYXNBdHRyKFwicHJvbW90ZWRcIikpIHRocm93IEVycm9yKGBwcm9tbz0ke2NoYXJ9LCBQcm9tb3RlZCBwaWVjZS5gKTtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHByb21vW2NoYXJdKTtcblx0XHR0aGlzLmNoYXIgPSBjaGFyO1xuXHR9XG5cblx0LyoqIOWxnuaAp+OBruWtmOWcqOOCkueiuuiqjVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgLSDlsZ7mgKflkI1cblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRoYXNBdHRyKGF0dHJOYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyLmluY2x1ZGVzKGF0dHJOYW1lKTtcblx0fVxuXG5cdC8qKiDluqfmqJnjgYzpp5LjgavlkKvjgb7jgozjgovjgYvliKTlrppcblx0ICogQHBhcmFtIHtudW1iZXJ9IHggLSBY5bqn5qiZXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gWeW6p+aomVxuXHQgKi9cblx0Y2hlY2tSYW5nZU1vdXNlKHgsIHkpe1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmxlZnQgPD0geCAmJiB4IDwgdGhpcy5yaWdodCAmJlxuXHRcdFx0dGhpcy50b3AgPD0geSAmJiB5IDwgdGhpcy5ib3R0b21cblx0XHQpO1xuXHR9XG5cblx0LyoqIOenu+WLleevhOWbsuOCkuWbnui7ouOBl+OBpuWPluW+lyAqL1xuXHRnZXRSYW5nZSgpe1xuXHRcdGNvbnN0IGRlZyA9IDB8dGhpcy5kZWc7XG5cdFx0Y29uc3QgcmFuZ2UgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucmFuZ2UpKTtcblx0XHRPYmplY3Qua2V5cyhyYW5nZSkuZm9yRWFjaChrZXk9Pntcblx0XHRcdGlmKGRlZyA9PT0gMCkgcmV0dXJuO1xuXHRcdFx0aWYoIVs5MCwgMTgwLCAyNzBdLmluY2x1ZGVzKGRlZykpIHRocm93IEVycm9yKGBkZWc9JHtkZWd9LCBkZWcgbmVlZCBtdWx0aXBsZSBvZiA5MC5gKTtcblx0XHRcdGlmKFs5MCwgMjcwXS5pbmNsdWRlcyhkZWcpKXtcblx0XHRcdFx0Ly8gMuasoemFjeWIl+OCkui7oue9rlxuXHRcdFx0XHRjb25zdCB0cmFuc3Bvc2UgPSBhID0+IGFbMF0ubWFwKChfLCBjKSA9PiBhLm1hcChyID0+IHJbY10pKTtcblx0XHRcdFx0cmFuZ2Vba2V5XSA9IHRyYW5zcG9zZShyYW5nZVtrZXldKTtcblx0XHRcdH1cblx0XHRcdGlmKFsxODAsIDI3MF0uaW5jbHVkZXMoZGVnKSl7XG5cdFx0XHRcdHJhbmdlW2tleV0ucmV2ZXJzZSgpO1xuXHRcdFx0fVxuXHRcdFx0cmFuZ2Vba2V5XS5mb3JFYWNoKHJvdz0+e1xuXHRcdFx0XHRpZihbOTAsIDE4MF0uaW5jbHVkZXMoZGVnKSkgcm93LnJldmVyc2UoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHJldHVybiByYW5nZTtcblx0fVxuXG5cdC8qKiDpp5Iv44Oe44K544Kv44KS5o+P5YaZICovXG5cdGFzeW5jIGRyYXcoKXtcblx0XHRjb25zdCBzZWxlY3RDb2xvciA9IFwiI0ZGMDAwMDU1XCI7XG5cdFx0aWYodGhpcy5pbWdTcmMgJiYgY2FudmFzSW1hZ2UuaW1wb3J0ZWQpe1xuXHRcdFx0dGhpcy5kcmF3SW1hZ2UoKTtcblx0XHRcdGlmKHRoaXMuaXNTZWxlY3RlZCkgdGhpcy5kcmF3TWFza0ltYWdlKHNlbGVjdENvbG9yKTtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdHRoaXMuZHJhd1BpZWNlKCk7XG5cdFx0XHRpZih0aGlzLmlzU2VsZWN0ZWQpIHRoaXMuZHJhd01hc2soc2VsZWN0Q29sb3IpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiDpp5LnlLvlg4/jgpLmj4/lhpkgKi9cblx0ZHJhd0ltYWdlKCl7XG5cdFx0Y29uc3Qge2N0eCwgc2l6ZX0gPSB0aGlzO1xuXG5cdFx0Y29uc3Qgc3JjID0gdGhpcy5pbWdTcmNbdGhpcy5kaXNwbGF5UHRuXTtcblx0XHRjb25zdCBpbWFnZSA9IGNhbnZhc0ltYWdlLmltYWdlc1tzcmNdO1xuXHRcdGlmKCFpbWFnZSkgcmV0dXJuO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKHRoaXMuY2VudGVyLCB0aGlzLm1pZGRsZSk7XG5cdFx0aWYodGhpcy5pc1JvdGF0ZUltZykgY3R4LnJvdGF0ZSh0aGlzLnJhZCk7XG5cblx0XHRsZXQgaW1nV2lkdGgsIGltZ0hlaWdodDtcblx0XHRpZihpbWFnZS53aWR0aCowLjkgPCBpbWFnZS5oZWlnaHQpe1xuXHRcdFx0aW1nV2lkdGggPSBpbWFnZS53aWR0aC9pbWFnZS5oZWlnaHQqc2l6ZVxuXHRcdFx0aW1nSGVpZ2h0ID0gc2l6ZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpbWdXaWR0aCA9IHNpemU7XG5cdFx0XHRpbWdIZWlnaHQgPSBpbWFnZS5oZWlnaHQvaW1hZ2Uud2lkdGgqc2l6ZTtcblx0XHR9XG5cdFx0Y3R4LmRyYXdJbWFnZShpbWFnZSwgLWltZ1dpZHRoLzIsIC1pbWdIZWlnaHQvMiwgaW1nV2lkdGgsIGltZ0hlaWdodCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblx0fVxuXG5cdC8qKiDpp5LnlLvlg4/jgavjg57jgrnjgq/jgpLmj4/lhplcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0g44Kr44Op44O844Ko44OV44Kn44Kv44OI44Gu6ImyXG5cdCAqL1xuXHRkcmF3TWFza0ltYWdlKGNvbG9yKXtcblx0XHRjb25zdCB7Y3R4LCBzaXplfSA9IHRoaXM7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjb25zdCBpbWdXaWR0aCA9IHNpemUqMC45O1xuXHRcdGNvbnN0IGltZ0hlaWdodCA9IHNpemU7XG5cblx0XHRjdHgudHJhbnNsYXRlKHRoaXMuY2VudGVyLCB0aGlzLm1pZGRsZSk7XG5cdFx0Y3R4LmZpbGxSZWN0KC1pbWdXaWR0aC8yLCAtaW1nSGVpZ2h0LzIsIGltZ1dpZHRoLCBpbWdIZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog5bCG5qOL6aeS44Gu5aSW5b2i44OR44K544KS5L2c5oiQXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB6b29tIC0g6aeS44Gu5ouh5aSn546HXG5cdCAqL1xuXHRtYWtlUGF0aCh6b29tKXtcblx0XHRjb25zdCB7Y3R4fSA9IHRoaXM7XG5cblx0XHRjdHgudHJhbnNsYXRlKHRoaXMuY2VudGVyLCB0aGlzLm1pZGRsZSk7XG5cdFx0Y3R4LnJvdGF0ZSh0aGlzLnJhZCk7XG5cblx0XHQvKiDlpJbmnqDjgpLmj4/lhpkgKi9cblx0XHRjdHguYmVnaW5QYXRoKCk7XG5cdFx0Y3R4Lm1vdmVUbygtMzAqem9vbSwtNDAqem9vbSk7XG5cdFx0Y3R4LmxpbmVUbyggIDAqem9vbSwtNTAqem9vbSk7XG5cdFx0Y3R4LmxpbmVUbyggMzAqem9vbSwtNDAqem9vbSk7XG5cdFx0Y3R4LmxpbmVUbyggNDUqem9vbSwgNTAqem9vbSk7XG5cdFx0Y3R4LmxpbmVUbygtNDUqem9vbSwgNTAqem9vbSk7XG5cdFx0Y3R4LmNsb3NlUGF0aCgpO1xuXHR9XG5cblx0LyoqIOmnkuOBruW9seOCkuaPj+WGmVxuXHQqIEBwYXJhbSB7bnVtYmVyfSB6b29tIC0g6aeS44Gu5ouh5aSn546HXG5cdCovXG4gICBkcmF3UGllY2VTaGFkb3coem9vbSl7XG5cdFx0aWYoIXRoaXMuaXNEcmF3U2hhZG93KSByZXR1cm47XG5cdFx0Y29uc3Qge2N0eH0gPSB0aGlzO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKDAsIDEwKnpvb20pO1xuXHRcdHRoaXMuZHJhd01hc2soXCIjMDAwMDAwNjZcIik7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblx0fVxuXG5cdC8qKiDpp5LjgpLmj4/lhpkgKi9cblx0ZHJhd1BpZWNlKCl7XG5cdFx0Y29uc3Qge2N0eCwgZ2FtZSwgem9vbX0gPSB0aGlzO1xuXG5cdFx0bGV0IGZvbnRDb2xvciwgYmFja2dyb3VuZENvbG9yLCBib3JkZXJDb2xvcjtcblx0XHRpZih0aGlzLmhhc0F0dHIoXCJwcm9tb3RlZFwiKSl7XG5cdFx0XHRmb250Q29sb3IgPSBnYW1lLnByb21vdGVGb250Q29sb3IgPz8gZ2FtZS5mb250Q29sb3IgPz8gXCIjMDAwMDAwXCI7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBnYW1lLnByb21vdGVCYWNrZ3JvdW5kQ29sb3IgPz8gZ2FtZS5iYWNrZ3JvdW5kQ29sb3IgPz8gXCIjRkZGRkZGXCIsXG5cdFx0XHRib3JkZXJDb2xvciA9IGdhbWUucHJvbW90ZUJvcmRlckNvbG9yID8/IGdhbWUuYm9yZGVyQ29sb3IgPz8gXCIjRkYzMzAwXCI7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Zm9udENvbG9yID0gZ2FtZS5mb250Q29sb3IgPz8gXCIjMDAwMDAwXCI7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSBnYW1lLmJhY2tncm91bmRDb2xvciA/PyBcIiNGRkZGRkZcIixcblx0XHRcdGJvcmRlckNvbG9yID0gZ2FtZS5ib3JkZXJDb2xvciA/PyBcIiM3Nzc3NzdcIjtcblx0XHR9XG5cblx0XHRjdHguc3Ryb2tlU3R5bGUgPSBib3JkZXJDb2xvcjtcblx0XHRjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZENvbG9yO1xuXHRcdGN0eC5saW5lV2lkdGggPSA4Knpvb207XG5cdFx0dGhpcy5kcmF3UGllY2VTaGFkb3coem9vbSk7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHR0aGlzLm1ha2VQYXRoKHpvb20pO1xuXHRcdGN0eC5zdHJva2UoKTtcblx0XHRjdHguZmlsbCgpO1xuXG5cdFx0Lyog5paH5a2X44KS5o+P5YaZICovXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGZvbnRDb2xvcjtcblx0XHRjb25zdCB0ZXh0ID0gWy4uLlwiXCIrdGhpcy5kaXNwbGF5W3RoaXMuZGlzcGxheVB0bl1dO1xuXHRcdGNvbnN0IGZvbnRTaXplID0gNDAqem9vbTtcblx0XHRjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4ICR7Y2FudmFzRm9udC5uYW1lc31gO1xuXHRcdGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuXG5cdFx0dGV4dC5mb3JFYWNoKCh2LGkpPT57XG5cdFx0XHRjb25zdCBoZWlnaHQgPSB0ZXh0Lmxlbmd0aCA9PT0gMT8gZm9udFNpemUvMjogaSpmb250U2l6ZTtcblx0XHRcdGN0eC5maWxsVGV4dCh2LCAwLCBoZWlnaHQpO1xuXHRcdH0pO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog6aeS44Gr44Oe44K544Kv44KS5o+P5YaZXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIOOCq+ODqeODvOOCqOODleOCp+OCr+ODiOOBruiJslxuXHQgKi9cblx0ZHJhd01hc2soY29sb3Ipe1xuXHRcdGNvbnN0IHtjdHgsIHpvb219ID0gdGhpcztcblxuXHRcdGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcblx0XHRjdHguc2F2ZSgpO1xuXHRcdHRoaXMubWFrZVBhdGgoem9vbSk7XG5cdFx0Y3R4LmZpbGwoKTtcblxuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog5paH5a2X5YiX5b2i5byP44Gn5Y+W5b6XICovXG5cdHRvU3RyaW5nKCl7XG5cdFx0cmV0dXJuIFBpZWNlLmRlZ0NoYXJzW3RoaXMuZGVnXSArIHRoaXMuY2hhcjtcblx0fVxufVxuXG4vLyDjg5fjg6zjgqTjg6Tjg7zooajnpLrjgYvjgonop5LluqbjgpLlj5blvpdcbk9iamVjdC5lbnRyaWVzKFBpZWNlLmRlZ0NoYXJzKVxuXHQuZm9yRWFjaCgoW2tleSwgdmFsdWVdKT0+e1xuXHRcdFBpZWNlLmNoYXJEZWdzW3ZhbHVlXSA9IGtleTtcblx0fSk7XG4iLCJpbXBvcnQge0JvYXJkfSBmcm9tIFwiLi9ib2FyZC5qc1wiO1xuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcblxuLy8g56e75YuV56+E5Zuy44Kq44OX44K344On44OzXG5jb25zdCByYW5nZU9wdGlvbnMgPSBbXG5cdFtcImRlZmF1bHRcIiwge2lzQXR0YWNrOiBmYWxzZX1dLFxuXHRbXCJhdHRhY2tcIiwge2lzQXR0YWNrOiB0cnVlfV0sXG5cdFtcInN0YXJ0XCIsIHtpc0F0dGFjazogZmFsc2V9XSxcblx0W1wiY2FzdGxpbmdcIiwge2lzQXR0YWNrOiBmYWxzZX1dLFxuXHRbXCJlblBhc3NhbnRcIiwge2lzQXR0YWNrOiB0cnVlfV0sXG5cdFtcInBhbGFjZVNsYXNoXCIsIHtpc0F0dGFjazogZmFsc2V9XSxcblx0W1wicGFsYWNlU2xhc2hcIiwge2lzQXR0YWNrOiB0cnVlfV1cbl07XG5cbi8vIOi1t+eCueaWh+Wtl+OBruWumue+qVxuY29uc3QgY2VudGVyQ2hhcnMgPSBbXG5cdFtcIk9cIiwge2lzT3duOiB0cnVlfV0sXG5cdFtcIm9cIiwge31dXG5dO1xuXG4vLyDnp7vli5Xnr4Tlm7LmloflrZfjga7opqrlrZDplqLkv4Jcbi8qKiDngrnnp7vli5Xjgqrjg5fjgrfjg6fjg7NcbiAqIEB0eXBlIHtPYmplY3Q8a2V5OiBzdHJpbmcsIHtjaGlsZDogc3RyaW5nW119PltdfVxuICogQHBhcmFtIGtleSAtIOenu+WLleevhOWbsuOCkuWumue+qeOBmeOCi+aWh+Wtl1xuICogQHBhcmFtIHtudW1iZXJ9IG1vdmVzLSDpgLLooYzlj6/og73jgarjg57jgrnmlbBcbiAqL1xuY29uc3QgcG9pbnRDaGFycyA9IFtcblx0W1wib1wiXSxcblx0W1wiQVwiLCB7Y2hpbGQ6IFtcImFcIl19XSxcblx0W1wiQlwiLCB7Y2hpbGQ6IFtcImJcIl19XSxcblx0W1wiQ1wiLCB7Y2hpbGQ6IFtcImNcIl19XSxcblx0W1wiRFwiLCB7Y2hpbGQ6IFtcImRcIl19XSxcblx0W1wiRVwiLCB7Y2hpbGQ6IFtcImFcIiwgXCJlXCJdfV0sXG5cdFtcIkZcIiwge2NoaWxkOiBbXCJhXCIsIFwiZlwiXX1dLFxuXHRbXCJHXCIsIHtjaGlsZDogW1wiYlwiLCBcImdcIl19XSxcblx0W1wiSFwiLCB7Y2hpbGQ6IFtcImJcIiwgXCJoXCJdfV0sXG5cdFtcIklcIiwge2NoaWxkOiBbXCJjXCIsIFwiaVwiXX1dLFxuXHRbXCJKXCIsIHtjaGlsZDogW1wiY1wiLCBcImpcIl19XSxcblx0W1wiS1wiLCB7Y2hpbGQ6IFtcImRcIiwgXCJrXCJdfV0sXG5cdFtcIkxcIiwge2NoaWxkOiBbXCJkXCIsIFwibFwiXX1dXG5dO1xuXG4vKiog55u057ea56e75YuV44Kq44OX44K344On44OzXG4gKiBAdHlwZSB7T2JqZWN0PGtleTogc3RyaW5nLCB7am1wczogbnVtYmVyLCBtb3ZlczogbnVtYmVyfT5bXX1cbiAqIEBwYXJhbSBrZXkgLSDnp7vli5Xnr4Tlm7LjgpLlrprnvqnjgZnjgovmloflrZdcbiAqIEBwYXJhbSBqbXBzIC0g5b+F6KaB44Gq44K444Oj44Oz44OX5Zue5pWwXG4gKiBAcGFyYW0gbW92ZXMtIOmAsuihjOWPr+iDveOBquODnuOCueaVsFxuICovXG5jb25zdCBsaW5lckNoYXJzID0gW1xuXHRbXCIqXCIsIHt9XSxcblx0W1wiK1wiLCB7am1wczogMX1dLFxuXHRbXCJ8XCIsIHtqbXBzOiAxLCBtb3ZlczogMX1dXG5dO1xuZm9yKGxldCBpPTE7aTw9OTtpKyspXG5cdGxpbmVyQ2hhcnMucHVzaChbXCJcIitpLCB7bW92ZXM6IGl9XSk7XG5cbi8qKiByYW5nZeOBruWOn+eCueW6p+aomeOCkuWPluW+l1xuICogQHBhcmFtIHtzdHJpbmdbXX0gcmFuZ2UgLSDnp7vli5Xnr4Tlm7Lmg4XloLFcbiAqL1xuZnVuY3Rpb24gZ2V0T3JpZ2luKHJhbmdlKXtcblx0Y29uc3Qgb0xpc3QgPSBbXTtcblx0bGV0IG93blgsIG93blk7XG5cdGZvcihsZXQgclk9MDtyWTxyYW5nZS5sZW5ndGg7clkrKyl7XG5cdFx0Zm9yKGxldCByWD0wO3JYPHJhbmdlW3JZXS5sZW5ndGg7clgrKyl7XG5cdFx0XHRjb25zdCByQ2hhciA9IHJhbmdlW3JZXVtyWF07XG5cdFx0XHRmb3IobGV0IFtrZXksIHtpc093bn1dIG9mIGNlbnRlckNoYXJzKXtcblx0XHRcdFx0aWYockNoYXIgIT09IGtleSkgY29udGludWU7XG5cdFx0XHRcdG9MaXN0LnB1c2goe2lzT3duLCBvWDogclgsIG9ZOiByWX0pO1xuXHRcdFx0XHRpZihpc093bikgW293blgsIG93blldID0gW3JYLCByWV07XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvTGlzdC5tYXAobz0+e1xuXHRcdG8ub2Zmc2V0WCA9IG8ub1gtb3duWDtcblx0XHRvLm9mZnNldFkgPSBvLm9ZLW93blk7XG5cdFx0cmV0dXJuIG87XG5cdH0pO1xufVxuXG4vKiog6aeS44Gu56e75YuV5Yik5a6aXG4gKiBAcGFyYW0ge0JvYXJkfSBib2FyZCAtIOODnOODvOODiVxuICogQHBhcmFtIHtQaWVjZX0gcGllY2UgLSDpp5JcbiAqIEBwYXJhbSB7bnVtYmVyfSBwWCAtIOODnuOCueebruOBruWIl1xuICogQHBhcmFtIHtudW1iZXJ9IHBZIC0g44Oe44K555uu44Gu6KGMXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tUYXJnZXQoYm9hcmQsIHBpZWNlLCBwWCwgcFkpe1xuXHRjb25zdCB7ZmllbGQsIHlMZW4sIGVuUGFzc2FudH0gPSBib2FyZDtcblxuXHQvKiog44Oe44K555uu5bqn5qiZ44GM44Oc44O844OJ56+E5Zuy5YaF44GL5Yik5a6aXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IC0g5Yik5a6a44GZ44KL44Oe44K555uu44Gu5YiXXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g5Yik5a6a44GZ44KL44Oe44K555uu44Gu6KGMXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0ZnVuY3Rpb24gaW5GaWVsZCh4LCB5KXtcblx0XHRyZXR1cm4gZmllbGRbeV0gJiYgZmllbGRbeV1beF0gJiYgIWZpZWxkW3ldW3hdLmhhc0F0dHIoXCJrZWVwT3V0XCIpO1xuXHR9XG5cblx0LyoqIOWMheWQjOWjq+OBp+OBguOCi+OBi1xuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKi9cblx0ZnVuY3Rpb24gaXNWc1BvKHBhbmVsKXtcblx0XHRyZXR1cm4gcGFuZWwucGllY2UgJiYgcGllY2UuaGFzQXR0cihcInBvXCIpICYmIHBhbmVsLnBpZWNlLmhhc0F0dHIoXCJwb1wiKTtcblx0fVxuXG5cdC8qKiDlr77osaHpp5LjgYzngq7jgaflj5bjgozjgovjgYtcblx0ICogQHBhcmFtIHtQYW5lbH0gcGFuZWwgLSDjg57jgrnnm65cblx0ICovXG5cdGZ1bmN0aW9uIGlzQXR0YWNrRnJvbVBhbyhwYW5lbCl7XG5cdFx0cmV0dXJuIHBhbmVsLnBpZWNlXG5cdFx0XHQmJiAhcGllY2UuaXNNb3ZlZFxuXHRcdFx0JiYgIXBhbmVsLnBpZWNlLmlzTW92ZWRcblx0XHRcdCYmIHBpZWNlLmhhc0F0dHIoXCJwYW9cIilcblx0XHRcdCYmIHBpZWNlLmNvc3QgPCBwYW5lbC5waWVjZS5jb3N0O1xuXHR9XG5cblx0LyoqIOenu+WLleWPr+iDveOBi+WIpOWumlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXR0YWNrIC0g6aeS44KS5Y+W5b6X5a++6LGh44Gr5ZCr44KA44GLP1xuXHQgKiBAcGFyYW0ge251bWJlcn0geCAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruWIl1xuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruihjFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2VOYW1lIC0g56e75YuV56+E5Zuy44Gu5a6a576p5ZCNXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY2hlY2tSaXZhbERlZyAtIOaVteOBrumnkuOBruOBv+OCkuenu+WLleWFiOOBqOOBmeOCi+OBiz9cblx0ICogQHJldHVybnMgYm9vbGVhblxuXHQgKi9cblx0ZnVuY3Rpb24gY2FuTW92ZShpc0F0dGFjaywgeCwgeSwgcmFuZ2VOYW1lPVwiXCIsIGNoZWNrUml2YWxEZWc9dHJ1ZSl7XG5cdFx0aWYoIWZpZWxkW3ldIHx8ICFmaWVsZFt5XVt4XSkgcmV0dXJuIGZhbHNlO1xuXHRcdGNvbnN0IHBhbmVsID0gZmllbGRbeV1beF07XG5cdFx0aWYoIXBhbmVsKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYoaXNWc1BvKHBhbmVsKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKGlzQXR0YWNrRnJvbVBhbyhwYW5lbCkpIHJldHVybiBmYWxzZTtcblx0XHRpZihyYW5nZU5hbWUgPT09IFwiZW5QYXNzYW50XCIgJiYgIWVuUGFzc2FudC5pc1RhcmdldChwYW5lbCwgcGllY2UpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYocGllY2UuaGFzQXR0cihcImluUGFsYWNlXCIpICYmICFwYW5lbC5oYXNBdHRyKFwicGFsYWNlXCIpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYocmFuZ2VOYW1lLmluZGV4T2YoXCJwYWxhY2VcIikgPT09IDAgJiYgIShwYW5lbC5oYXNBdHRyKHJhbmdlTmFtZSkgJiYgZmllbGRbcFldW3BYXS5oYXNBdHRyKHJhbmdlTmFtZSkpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYocGllY2UuaGFzQXR0cihcInVuQ3Jvc3NSaXZlclwiKSAmJiB5TGVuLSgwfHlMZW4vMikgPD0gYm9hcmQuZ2V0Um93KHgsIHksIHBpZWNlLmRlZykpIHJldHVybiBmYWxzZTtcblx0XHRpZighaXNBdHRhY2spIHJldHVybiAhZmllbGRbeV1beF0ucGllY2U7XG5cdFx0aWYoIWZpZWxkW3ldW3hdLnBpZWNlKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYoY2hlY2tSaXZhbERlZykgcmV0dXJuIHBpZWNlLmRlZyAhPT0gZmllbGRbeV1beF0ucGllY2UuZGVnO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0LyoqIOWtkOOBqOOBquOCi+enu+WLleevhOWbsuOBq+mnkuOBjOWtmOWcqOOBmeOCi+OBi1xuXHQgKiBAcGFyYW0ge3N0cmluZ1tdfSByYW5nZSAtIOenu+WLleevhOWbsuaDheWgsVxuXHQgKiBAcGFyYW0ge3N0cmluZ1tdfSBjaGlsZCAtIOWtkOOBqOOBquOCi+aWh+Wtl+OBruS4gOimp1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXR0YWNrIC0g6aeS44KS5Y+W5b6X5a++6LGh44Gr5ZCr44KA44GLP1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb1ggLSDnp7vli5Xnr4Tlm7Lmg4XloLHjga7ljp/ngrnkvY3nva4o6KGMKVxuXHQgKiBAcGFyYW0ge251bWJlcn0gb1kgLSDnp7vli5Xnr4Tlm7Lmg4XloLHjga7ljp/ngrnkvY3nva4o5YiXKVxuXHQgKiBAcmV0dXJucyBib29sZWFuXG5cdCAqL1xuXHRmdW5jdGlvbiBleGlzdHNDaGlsZChyYW5nZSwgY2hpbGQsIGlzQXR0YWNrLCBvWCwgb1kpe1xuXHRcdGZvcihjb25zdCBjaGFyIG9mIGNoaWxkKXtcblx0XHRcdGZvcihsZXQgclk9MDtyWTxyYW5nZS5sZW5ndGg7clkrKyl7XG5cdFx0XHRcdGZvcihsZXQgclg9MDtyWDxyYW5nZVtyWV0ubGVuZ3RoO3JYKyspe1xuXHRcdFx0XHRcdGNvbnN0IFt4LCB5XSA9IFtyWCtwWC1vWCwgclkrcFktb1ldO1xuXHRcdFx0XHRcdGlmKFxuXHRcdFx0XHRcdFx0IWluRmllbGQoeCwgeSkgfHxcblx0XHRcdFx0XHRcdGNhbk1vdmUoaXNBdHRhY2ssIDB8eCwgMHx5LCBcIlwiLCBmYWxzZSkgfHxcblx0XHRcdFx0XHRcdHJhbmdlW3JZXVtyWF0gIT09IGNoYXJcblx0XHRcdFx0XHQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqIOenu+WLleWFiOihqOekuuOCkuioreWumlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2VOYW1lIC0g56e75YuV56+E5Zuy44Gu5a6a576p5ZCNXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IC0g5Yik5a6a44GZ44KL44Oe44K555uu44Gu5YiXXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB5IC0g5Yik5a6a44GZ44KL44Oe44K555uu44Gu6KGMXG5cdCAqL1xuXHRmdW5jdGlvbiBzZXRUYXJnZXQocmFuZ2VOYW1lLCB4LCB5KXtcblx0XHRjb25zdCBwYW5lbCA9IGZpZWxkW3ldW3hdO1xuXHRcdHBhbmVsLmFkZFRhcmdldChyYW5nZU5hbWUpO1xuXHRcdGVuUGFzc2FudC5zZXRUYXJnZXQocGFuZWwsIHBpZWNlKTtcblx0fVxuXG5cdC8qKiDngrnnp7vli5Vcblx0ICogQHBhcmFtIHtzdHJpbmdbXX0gcmFuZ2UgLSDnp7vli5Xnr4Tlm7Lmg4XloLFcblx0ICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlTmFtZSAtIOenu+WLleevhOWbsuOBruWumue+qeWQjVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzQXR0YWNrIC0g6aeS44KS5Y+W5b6X5a++6LGh44Gr5ZCr44KA44GLP1xuXHQgKiBAcGFyYW0ge251bWJlcn0gb1ggLSDnp7vli5Xnr4Tlm7Lmg4XloLHjga7ljp/ngrnkvY3nva4o6KGMKVxuXHQgKiBAcGFyYW0ge251bWJlcn0gb1kgLSDnp7vli5Xnr4Tlm7Lmg4XloLHjga7ljp/ngrnkvY3nva4o5YiXKVxuXHQgKi9cblx0ZnVuY3Rpb24gbW92ZVBvaW50KHJhbmdlLCBbcmFuZ2VOYW1lLCB7aXNBdHRhY2t9XSwge29YLCBvWSwgaXNPd259KXtcblx0XHRpZighaXNPd24pIHJldHVybjtcblx0XHRmb3IoY29uc3QgW3BhcmVudCwge2NoaWxkPVtdfT17fV0gb2YgcG9pbnRDaGFycyl7XG5cdFx0XHRmb3IobGV0IHJZPTA7clk8cmFuZ2UubGVuZ3RoO3JZKyspe1xuXHRcdFx0XHRmb3IobGV0IHJYPTA7clg8cmFuZ2VbclldLmxlbmd0aDtyWCsrKXtcblx0XHRcdFx0XHRjb25zdCBbeCwgeV0gPSBbclgrcFgtb1gsIHJZK3BZLW9ZXTtcblx0XHRcdFx0XHRpZighaW5GaWVsZCh4LCB5KVxuXHRcdFx0XHRcdFx0fHwgIWNhbk1vdmUoaXNBdHRhY2ssIHgsIHksIHJhbmdlTmFtZSlcblx0XHRcdFx0XHRcdHx8IHJhbmdlW3JZXVtyWF0gIT09IHBhcmVudFxuXHRcdFx0XHRcdFx0fHwgZXhpc3RzQ2hpbGQocmFuZ2UsIGNoaWxkLCBmYWxzZSwgb1gsIG9ZKSkgY29udGludWU7XG5cdFx0XHRcdFx0c2V0VGFyZ2V0KHJhbmdlTmFtZSwgeCwgeSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKiog55u057ea56e75YuVXG5cdCAqIEBwYXJhbSB7c3RyaW5nW119IHJhbmdlIC0g56e75YuV56+E5Zuy5oOF5aCxXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZU5hbWUgLSDnp7vli5Xnr4Tlm7Ljga7lrprnvqnlkI1cblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IG9YIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOihjClcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9ZIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOWIlylcblx0ICovXG5cdGZ1bmN0aW9uIG1vdmVMaW5lcihyYW5nZSwgW3JhbmdlTmFtZSwge2lzQXR0YWNrfV0sIHtvWCwgb1ksIGlzT3duLCBvZmZzZXRYLCBvZmZzZXRZfSl7XG5cdFx0aWYoIWlzT3duICYmICFjYW5Nb3ZlKGZhbHNlLCBwWCtvZmZzZXRYLCBwWStvZmZzZXRZKSkgcmV0dXJuO1xuXHRcdGZvcihjb25zdCBbY2hhciwge2ptcHM9MCwgbW92ZXM9MH09e31dIG9mIGxpbmVyQ2hhcnMpe1xuXHRcdFx0Y29uc3QgaXNNb3ZlSW5mID0gIW1vdmVzIHx8IDAgPT09IG1vdmVzO1xuXHRcdFx0Ly8g5Y6f54K544Gu5ZGo5ZuyOOODnuOCueOCkuaOoue0olxuXHRcdFx0Zm9yKGxldCByWT1vWS0xO3JZPD1vWSsxO3JZKyspe1xuXHRcdFx0XHRmb3IobGV0IHJYPW9YLTE7clg8PW9YKzE7clgrKyl7XG5cdFx0XHRcdFx0aWYocmFuZ2VbclldW3JYXSAhPT0gY2hhciB8fCByWCA9PT0gb1ggJiYgclkgPT09IG9ZKSBjb250aW51ZTtcblx0XHRcdFx0XHRsZXQgam1wQ250ID0gam1wcz8gam1wczogMDtcblx0XHRcdFx0XHRsZXQgbW92ZUNudCA9IG1vdmVzPyBtb3ZlczogMDtcblx0XHRcdFx0XHRjb25zdCBbaW5jWCwgaW5jWV0gPSBbclgtb1gsIHJZLW9ZXTtcblx0XHRcdFx0XHRmb3IobGV0IF94PXBYLF95PXBZOzspe1xuXHRcdFx0XHRcdFx0X3grPWluY1g7XG5cdFx0XHRcdFx0XHRfeSs9aW5jWTtcblx0XHRcdFx0XHRcdGNvbnN0IHg9X3grb2Zmc2V0WDtcblx0XHRcdFx0XHRcdGNvbnN0IHk9X3krb2Zmc2V0WTtcblx0XHRcdFx0XHRcdGlmKCFpbkZpZWxkKHgsIHkpIHx8ICFpc01vdmVJbmYgJiYgbW92ZUNudCA9PT0gMCkgYnJlYWs7XG5cdFx0XHRcdFx0XHRjb25zdCBpc0p1bXBlZCA9IDAgPT09IGptcENudDtcblx0XHRcdFx0XHRcdGlmKGlzSnVtcGVkICYmIGNhbk1vdmUoaXNBdHRhY2ssIHgsIHksIHJhbmdlTmFtZSwgaXNKdW1wZWQpKXtcblx0XHRcdFx0XHRcdFx0bW92ZUNudC0tO1xuXHRcdFx0XHRcdFx0XHRzZXRUYXJnZXQocmFuZ2VOYW1lLCB4LCB5KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGVsc2UgaWYoam1wczwxKXtcblx0XHRcdFx0XHRcdFx0bW92ZUNudC0tO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y29uc3QgcGFuZWwgPSBmaWVsZFt5XVt4XTtcblx0XHRcdFx0XHRcdGlmKHBhbmVsLnBpZWNlKXtcblx0XHRcdFx0XHRcdFx0am1wQ250LS07XG5cdFx0XHRcdFx0XHRcdGlmKGlzSnVtcGVkIHx8IGlzVnNQbyhwYW5lbCkpIGJyZWFrO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIOODoeOCpOODs+WHpueQhlxuXHQoZnVuY3Rpb24oKXtcblx0XHRjb25zdCByYW5nZU1hcCA9IHBpZWNlLmdldFJhbmdlKCk7XG5cdFx0cmFuZ2VNYXAuYXR0YWNrID8/PSByYW5nZU1hcC5kZWZhdWx0O1xuXHRcdGZvcihjb25zdCByYW5nZU9wdGlvbiBvZiByYW5nZU9wdGlvbnMpe1xuXHRcdFx0Y29uc3QgcmFuZ2VOYW1lID0gcmFuZ2VPcHRpb25bMF07XG5cdFx0XHQvLyDliJ3lm57np7vli5Xnorroqo1cblx0XHRcdGlmKHBpZWNlLmlzTW92ZWQgJiYgW1wic3RhcnRcIiwgXCJjYXN0bGluZ1wiXS5pbmNsdWRlcyhyYW5nZU5hbWUpKSBjb250aW51ZTtcblxuXHRcdFx0Y29uc3QgcmFuZ2UgPSByYW5nZU1hcFtyYW5nZU5hbWVdO1xuXHRcdFx0aWYoIXJhbmdlKSBjb250aW51ZTtcblx0XHRcdGZvcihjb25zdCBvcmlnaW4gb2YgZ2V0T3JpZ2luKHJhbmdlKSl7XG5cdFx0XHRcdC8vIOeCueenu+WLlVxuXHRcdFx0XHRtb3ZlUG9pbnQocmFuZ2UsIHJhbmdlT3B0aW9uLCBvcmlnaW4pO1xuXHRcdFx0XHQvLyDnm7Tnt5rnp7vli5Vcblx0XHRcdFx0bW92ZUxpbmVyKHJhbmdlLCByYW5nZU9wdGlvbiwgb3JpZ2luKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pKCk7XG59IiwiaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4vYm9hcmQuanNcIjtcbmltcG9ydCB7UGFuZWx9IGZyb20gXCIuL3BhbmVsLmpzXCI7XG5pbXBvcnQge2NoZWNrVGFyZ2V0fSBmcm9tIFwiLi9jaGVja1RhcmdldC5qc1wiO1xuXG4vKiog44Oe44Km44K544Kz44Oz44OI44Ot44O844OrXG4gKiBAcGFyYW0ge0JvYXJkfSBib2FyZCAtIOebpFxuICovXG5leHBvcnQgZnVuY3Rpb24gdUlDb250cm9sKGJvYXJkKXtcblx0bGV0IGlzQ2xpY2sgPSBmYWxzZTtcblx0bGV0IGxhc3RYWSA9IFtdO1xuXHRsZXQgc2VsZWN0UGFuZWwgPSBudWxsO1xuXHRsZXQgc2VsZWN0U3RhbmQgPSBudWxsO1xuXHRjb25zdCB7Y2FudmFzfSA9IGJvYXJkO1xuXG5cdC8qKiDjg57jgrnnm67jgavlr77jgZnjgovlh6bnkIZcblx0ICogQHBhcmFtIHtFdmVudH0gZSAtIOOCpOODmeODs+ODiOW8leaVsFxuXHQgKiBAcGFyYW0geyhcblx0ICogICAgIHBhbmVsOiBQYW5lbCxcblx0ICogICAgIHg6IG51bWJlcixcblx0ICogICAgIHk6IG51bWJlcixcblx0ICogKT0+dm9pZH0gZm5QYW5lbCAtIOODnuOCueebruOBruOCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuXHQgKiBAcGFyYW0geyhcblx0ICogICAgIHg6IG51bWJlcixcblx0ICogICAgIHk6IG51bWJlcixcblx0ICogKT0+dm9pZH0gZm5BZnRlciAtIOW+jOWHpueQhuOBruOCs+ODvOODq+ODkOODg+OCr+mWouaVsFxuICAgICAqL1xuXHRjb25zdCBmaWVsZFByb2MgPSAoZSwgZm5QYW5lbCwgZm5BZnRlcj0oKT0+e30pPT57XG5cdFx0Y29uc3Qgdmlld1N0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY2FudmFzKTtcblx0XHRjb25zdCByZWN0ID0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0bGV0IHggPSBjYW52YXMud2lkdGgvcGFyc2VGbG9hdCh2aWV3U3R5bGUud2lkdGgpO1xuXHRcdGxldCB5ID0gY2FudmFzLmhlaWdodC9wYXJzZUZsb2F0KHZpZXdTdHlsZS5oZWlnaHQpO1xuXHRcdGlmKGUuY2xpZW50WCl7XG5cdFx0XHR4ICo9IGUuY2xpZW50WC1yZWN0LmxlZnQ7XG5cdFx0XHR5ICo9IGUuY2xpZW50WS1yZWN0LnRvcDtcblx0XHR9XG5cdFx0ZWxzZSBpZigwIDwgZS50b3VjaGVzLmxlbmd0aCl7XG5cdFx0XHRpZigxIDwgZS50b3VjaGVzLmxlbmd0aCkgcmV0dXJuO1xuXHRcdFx0eCAqPSBlLnRvdWNoZXNbMF0uY2xpZW50WC1yZWN0LmxlZnQ7XG5cdFx0XHR5ICo9IGUudG91Y2hlc1swXS5jbGllbnRZLXJlY3QudG9wO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0W3gsIHldID0gbGFzdFhZO1xuXHRcdH1cblx0XHRib2FyZC5maWVsZC5mb3JFYWNoKChyb3csIHBZKSA9PlxuXHRcdFx0cm93LmZvckVhY2goKHBhbmVsLCBwWCkgPT5cblx0XHRcdFx0Zm5QYW5lbChwYW5lbCwgeCwgeSwgcFgsIHBZKSkpO1xuXHRcdGZuQWZ0ZXIoeCwgeSk7XG5cdFx0Ym9hcmQuZHJhdygpO1xuXHRcdGxhc3RYWSA9IFt4LCB5XTtcblx0fTtcblxuXHQvKiog44OJ44Op44OD44Kw6ZaL5aeLXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGUgLSDjgqTjg5njg7Pjg4jlvJXmlbBcbiAgICAgKi9cblx0Y29uc3QgZHJhZ1N0YXJ0ID0gZT0+e1xuXHRcdGlzQ2xpY2sgPSB0cnVlO1xuXHRcdGZpZWxkUHJvYyhlLFxuXHRcdFx0KHBhbmVsLCB4LCB5KT0+e1xuXHRcdFx0XHRjb25zdCB7cGllY2UsIHBYLCBwWX0gPSBwYW5lbDtcblxuXHRcdFx0XHRpZihwaWVjZSAmJiBwYW5lbC5jaGVja1JhbmdlTW91c2UoeCwgeSkpe1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRwaWVjZS5pc1NlbGVjdGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRzZWxlY3RQYW5lbCA9IHBhbmVsO1xuXHRcdFx0XHRcdGNoZWNrVGFyZ2V0KGJvYXJkLCBwaWVjZSwgcFgsIHBZKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdCh4LCB5KT0+e1xuXHRcdFx0XHRmb3IoY29uc3QgW2RlZywgc3RvY2tdIG9mIGJvYXJkLnN0YW5kLnN0b2Nrcyl7XG5cdFx0XHRcdFx0Zm9yKGxldCBpPXN0b2NrLmxlbmd0aC0xOzA8PWk7aS0tKXtcblx0XHRcdFx0XHRcdGlmKCFzdG9ja1tpXS5jaGVja1JhbmdlTW91c2UoeCwgeSkpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0c3RvY2tbaV0uaXNTZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRzZWxlY3RTdGFuZCA9IHtkZWc6ZGVnLCBpOml9O1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdH07XG5cblx0LyoqIOODieODqeODg+OCsOS4rVxuXHQgKiBAcGFyYW0ge2FueX0gZSAtIOOCpOODmeODs+ODiOW8leaVsFxuXHQgKi9cblx0Y29uc3QgZHJhZ01vdmUgPSBlPT57XG5cdFx0aWYoIWlzQ2xpY2sgfHwgIShzZWxlY3RQYW5lbCB8fCBzZWxlY3RTdGFuZCkpIHJldHVybjtcblx0XHRmaWVsZFByb2MoZSxcblx0XHRcdChwYW5lbCwgeCwgeSk9Pntcblx0XHRcdFx0cGFuZWwuaXNTZWxlY3RlZCA9IHBhbmVsLmNoZWNrUmFuZ2VNb3VzZSh4LCB5KTtcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqIOODieODqeODg+OCsOe1guS6hlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBlIC0g44Kk44OZ44Oz44OI5byV5pWwXG5cdCAqL1xuXHRjb25zdCBkcmFnRW5kID0gZT0+e1xuXHRcdGlzQ2xpY2sgPSBmYWxzZTtcblx0XHRmaWVsZFByb2MoZSxcblx0XHRcdChwYW5lbCwgeCwgeSk9Pntcblx0XHRcdFx0aWYoIXBhbmVsLmNoZWNrUmFuZ2VNb3VzZSh4LCB5KSkgcmV0dXJuO1xuXHRcdFx0XHRpZihzZWxlY3RQYW5lbCl7XG5cdFx0XHRcdFx0Ym9hcmQubW92ZVBpZWNlKHNlbGVjdFBhbmVsLCBwYW5lbCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYoc2VsZWN0U3RhbmQgJiYgIXBhbmVsLnBpZWNlKXtcblx0XHRcdFx0XHRib2FyZC5zdGFuZC5yZWxlYXNlUGllY2UocGFuZWwsIHNlbGVjdFN0YW5kKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdCk7XG5cdFx0ZmllbGRQcm9jKGUsXG5cdFx0XHRwYW5lbD0+e1xuXHRcdFx0XHRpZihwYW5lbC5waWVjZSkgcGFuZWwucGllY2UuaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRwYW5lbC5pc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdHBhbmVsLmNsZWFyVGFyZ2V0KCk7XG5cdFx0XHR9LFxuXHRcdFx0KCk9Pntcblx0XHRcdFx0Zm9yKGNvbnN0IFtkZWcsIHN0b2NrXSBvZiBib2FyZC5zdGFuZC5zdG9ja3Mpe1xuXHRcdFx0XHRcdGZvcihsZXQgaT1zdG9jay5sZW5ndGgtMTswPD1pO2ktLSl7XG5cdFx0XHRcdFx0XHRzdG9ja1tpXS5pc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGVjdFBhbmVsID0gbnVsbDtcblx0XHRcdFx0c2VsZWN0U3RhbmQgPSBudWxsO1xuXHRcdFx0fVxuXHRcdCk7XG5cdH07XG5cblx0Ly8g44Kk44OZ44Oz44OI44Oq44K544OK44O844KS5L2c5oiQXG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRyYWdTdGFydCk7XG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRyYWdNb3ZlKTtcblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGRyYWdFbmQpO1xuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZHJhZ01vdmUpO1xuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIGRyYWdFbmQpO1xuXG5cdC8qKiDjgqTjg5njg7Pjg4jjg6rjgrnjg4rjg7zjgpLnoLTmo4QgKi9cblx0cmV0dXJuIHtcblx0XHRyZW1vdmVFdmVudCgpe1xuXHRcdFx0Y2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZHJhZ1N0YXJ0KTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBkcmFnRW5kKTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBkcmFnU3RhcnQpO1xuXHRcdFx0Y2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgZHJhZ01vdmUpO1xuXHRcdFx0Y2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBkcmFnRW5kKTtcblx0XHR9XG5cdH07XG59XG4iLCJpbXBvcnQge1BpZWNlfSBmcm9tIFwiLi9waWVjZS5qc1wiO1xuXG4vKiogQk9E5b2i5byP44Gu44Gf44KB44Gu6Zai5pWw5a6a576p44Gq44GpICovXG5leHBvcnQgY2xhc3MgQm9ke1xuXHQvKiog6KeS5bqm44GL44KJ6aeS44Gu5paH5a2X6KGo56S6XG5cdCAqIEB0eXBlIHtNYXA8bnVtYmVyLCBzdHJpbmc+fVxuXHQgKi9cblx0c3RhdGljICNkZWcyUGllY2VDaGFycyA9IG5ldyBNYXAoW1xuXHRcdFswLCBcIiBcIl0sXG5cdFx0WzkwLCBcIj5cIl0sXG5cdFx0WzE4MCwgXCJ2XCJdLFxuXHRcdFsyNzAsIFwiPFwiXVxuXHRdKTtcblxuXHQvKiog6KeS5bqm44GL44KJ6aeS44Gu5q2j6KaP6KGo54++6KGo56S6XG5cdCAqIEB0eXBlIHtNYXA8bnVtYmVyLCBzdHJpbmc+fVxuXHQgKi9cblx0c3RhdGljICNkZWcyUGllY2VSZWdleGVzID0gbmV3IE1hcChcblx0XHRbLi4uQm9kLiNkZWcyUGllY2VDaGFyc11cblx0XHQubWFwKChbYSwgYl0pPT5bYSwgbmV3IFJlZ0V4cChiLCBcImdcIildKVxuXHQpO1xuXG5cdC8qKiDpp5Ljga7mloflrZfjgYvjgonop5LluqbooajnpLpcblx0ICogQHR5cGUge01hcDxzdHJpbmcsIG51bWJlcj59XG5cdCAqL1xuXHRzdGF0aWMgI3BpZWNlQ2hhcjJEZWdzID0gbmV3IE1hcChcblx0XHRbLi4uQm9kLiNkZWcyUGllY2VDaGFyc11cblx0XHQubWFwKChbYSwgYl0pPT5bYiwgYV0pXG5cdCk7XG5cblx0LyoqIOinkuW6puOBi+OCieaMgemnkuOBruihqOmhjOihqOekulxuXHQgKiBAdHlwZSB7TWFwPG51bWJlciwgc3RyaW5nPn1cblx0ICovXG5cdHN0YXRpYyAjZGVnMlN0YW5kVGl0bGVzID0gbmV3IE1hcChbXG5cdFx0WzAsIFwi5YWI5omL44Gu5oyB6aeSXCJdLFxuXHRcdFs5MCwgXCLmrKHmiYvjga7mjIHpp5JcIl0sXG5cdFx0WzE4MCwgXCLlvozmiYvjga7mjIHpp5JcIl0sXG5cdFx0WzI3MCwgXCLlm5vmiYvjga7mjIHpp5JcIl1cblx0XSk7XG5cblx0LyoqIOaMgemnkuOBruihqOmhjOOBi+OCieinkuW6puihqOekulxuXHQgKiBAdHlwZSB7TWFwPHN0cmluZywgbnVtYmVyPn1cblx0ICovXG5cdHN0YXRpYyAjc3RhbmRUaXRsZTJEZWdzID0gbmV3IE1hcChcblx0XHRbLi4uQm9kLiNkZWcyU3RhbmRUaXRsZXNdXG5cdFx0Lm1hcCgoW2EsIGJdKT0+W2IsIGFdKVxuXHQpO1xuXG5cdHN0YXRpYyAja2FuSSA9IFtcIlwiLFwi5LiAXCIsXCLkuoxcIixcIuS4iVwiLFwi5ZubXCIsXCLkupRcIixcIuWFrVwiLFwi5LiDXCIsXCLlhatcIixcIuS5nVwiXTtcblx0c3RhdGljICNrYW5YID0gW1wiXCIsXCLljYFcIixcIuS6jOWNgVwiLFwi5LiJ5Y2BXCIsXCLlm5vljYFcIixcIuS6lOWNgVwiLFwi5YWt5Y2BXCIsXCLkuIPljYFcIixcIuWFq+WNgVwiLFwi5Lmd5Y2BXCJdO1xuXG5cdC8qKiDooYwv5oyB6aeS55So44Gu5pWw5a2X6KGo56S6KOa8ouaVsOWtlylcblx0ICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIOaVsOWtl1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHZpZXdPbmUgLSDkuIDjgpLooajnpLpcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAjbnVtMkthbihudW0sIHZpZXdPbmU9dHJ1ZSl7XG5cdFx0aWYoIXZpZXdPbmUgJiYgbnVtPD0xKSByZXR1cm4gXCJcIjtcblx0XHRjb25zdCBpID0gbnVtJTEwO1xuXHRcdGNvbnN0IHggPSAwfG51bS8xMDtcblx0XHRyZXR1cm4gQm9kLiNrYW5YW3hdK0JvZC4ja2FuSVtpXTtcblx0fVxuXG5cdC8qKiDooYwv5oyB6aeS55So44Gu5pWw5a2X6KGo56S6KOa8ouaVsOWtlylcblx0ICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIOaVsOWtl1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGVtcHR5T25lIC0g56m65paH5a2X44KSMeOBqOOBmeOCi1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNrYW4yTnVtKGthbiwgZW1wdHlPbmU9dHJ1ZSl7XG5cdFx0aWYoZW1wdHlPbmUgJiYga2FuID09PSBcIlwiKSByZXR1cm4gMTtcblx0XHRpZighaXNOYU4oa2FuKSkgcmV0dXJuIDB8a2FuO1xuXHRcdGxldCB4ID0gQm9kLiNrYW5YLmZpbmRJbmRleChrZXk9PlxuXHRcdFx0a2V5ICE9PSBcIlwiICYmIChuZXcgUmVnRXhwKFwiXlwiK2tleSkpLnRlc3Qoa2FuKVxuXHRcdCk7XG5cdFx0aWYoeCA8IDApIHggPSAwO1xuXHRcdGxldCBpID0gQm9kLiNrYW5JLmZpbmRJbmRleChrZXk9PlxuXHRcdFx0a2V5ICE9PSBcIlwiICYmIChuZXcgUmVnRXhwKGtleStcIiRcIikpLnRlc3Qoa2FuKVxuXHRcdCk7XG5cdFx0aWYoaSA8IDApIGkgPSAwO1xuXHRcdHJldHVybiB4KjEwK2k7XG5cdH1cblxuXHQvKiog5YiX55So44Gu5pWw5a2X6KGo56S6KOWFqOinki8y5qGBKVxuXHQgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0g5pWw5a2XXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgI251bTJaZW4obnVtKXtcblx0XHRpZigxMDw9bnVtKSByZXR1cm4gbnVtO1xuXHRcdGNvbnN0IHplbiA9IFwi77yQ77yR77yS77yT77yU77yV77yW77yX77yY77yZXCI7XG5cdFx0Y29uc3QgaSA9IG51bSUxMDtcblx0XHRyZXR1cm4gemVuW2ldO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBruihqOekulxuXHQgKiBAdHlwZSB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNwYW5lbFRleHQgPSBcIiDjg7tcIjtcblxuXHQvKiog6aeS44GuQk9E6KGo6KiYXG5cdCAqIEBwYXJhbSB7UGllY2V9IHBpZWNlIC0g6aeSXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgI2dldFBpZWNlVGV4dChwaWVjZSl7XG5cdFx0aWYoIXBpZWNlKSByZXR1cm4gQm9kLiNwYW5lbFRleHQ7XG5cdFx0cmV0dXJuIEJvZC4jZGVnMlBpZWNlQ2hhcnMuZ2V0KHBpZWNlLmRlZykrcGllY2UuY2hhcjtcblx0fVxuXG5cdC8qKiDpp5Llj7Djga5CT0TooajoqJhcblx0ICogQHBhcmFtIHtTdGFuZH0gc3RhbmQgLSDpp5Llj7Bcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIOinkuW6plxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNnZXRTdGFuZFRleHQoc3RhbmQsIGRlZz0wKXtcblx0XHQvLyDpp5LmlbDjgqvjgqbjg7Pjg4hcblx0XHRjb25zdCBjb3VudGVyID0gbmV3IE1hcCgpO1xuXHRcdHN0YW5kLnN0b2Nrcy5nZXQoZGVnKS5mb3JFYWNoKCh7Y2hhcn0pPT57XG5cdFx0XHRpZighY291bnRlci5oYXMoY2hhcikpIGNvdW50ZXIuc2V0KGNoYXIsIDApO1xuXHRcdFx0Y291bnRlci5zZXQoY2hhciwgY291bnRlci5nZXQoY2hhcikrMSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIEJvZC4jZGVnMlN0YW5kVGl0bGVzLmdldChkZWcpK1wi77yaXCIrXG5cdFx0XHRbLi4uY291bnRlcl0ubWFwKChbY2hhciwgY250XSk9PlxuXHRcdFx0XHRjaGFyK0JvZC4jbnVtMkthbihjbnQsIGZhbHNlKVxuXHRcdFx0KS5qb2luKFwiIFwiKTtcblx0fVxuXG5cdC8qKiBCT0TlvaLlvI/jga7jg4bjgq3jgrnjg4jjgpLjg5zjg7zjg4njgafmibHjgYjjgovjgojjgYblpInmj5tcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSBCT0TlvaLlvI/jga7jg4bjgq3jgrnjg4hcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyBjb252U2V0VGV4dCh0ZXh0KXtcblx0XHRjb25zdCBib2FyZExpbmVzID0gW107XG5cdFx0Y29uc3Qgc3RhbmRMaW5lcyA9IFtdO1xuXHRcdHRleHQuc3BsaXQoL1xccnxcXG58XFxyXFxuLykuZm9yRWFjaChsaW5lPT57XG5cdFx0XHRpZihbLi4uQm9kLiNzdGFuZFRpdGxlMkRlZ3Mua2V5cygpXS5zb21lKHRpdGxlPT5cblx0XHRcdFx0bmV3IFJlZ0V4cChgXiR7dGl0bGV9YCkudGVzdChsaW5lKSlcblx0XHRcdCkgc3RhbmRMaW5lcy5wdXNoKGxpbmUpO1xuXHRcdFx0ZWxzZSBib2FyZExpbmVzLnB1c2gobGluZS5zbGljZSgxKSlcblx0XHR9KTtcblxuXHRcdGxldCBib2FyZFN0ciA9IGJvYXJkTGluZXMuc2xpY2UoMiwgLTEpLmpvaW4oXCJcXG5cIik7XG5cdFx0Qm9kLiNkZWcyUGllY2VSZWdleGVzLmZvckVhY2goKGJvZENoYXIsIGRlZyk9Pntcblx0XHRcdGJvYXJkU3RyID0gYm9hcmRTdHIucmVwbGFjZShib2RDaGFyLCBQaWVjZS5kZWdDaGFyc1tkZWddKTtcblx0XHR9KVxuXG5cdFx0Y29uc3Qgc3RhbmRTdHIgPSBzdGFuZExpbmVzLmZsYXRNYXAobGluZT0+e1xuXHRcdFx0Y29uc3QgW3RpdGxlLCBwYXJhbVN0cl0gPSBsaW5lLnNwbGl0KC/vvJovKTtcblx0XHRcdGlmKHBhcmFtU3RyID09PSBcIlwiKSByZXR1cm4gXCJcIjtcblx0XHRcdGNvbnN0IGRlZyA9IEJvZC4jc3RhbmRUaXRsZTJEZWdzLmdldCh0aXRsZSk7XG5cdFx0XHRjb25zdCBkZWdDaGFyID0gUGllY2UuZGVnQ2hhcnNbZGVnXTtcblx0XHRcdGNvbnN0IHBhcmFtcyA9IHBhcmFtU3RyXG5cdFx0XHRcdC5zcGxpdCgvXFxzLylcblx0XHRcdFx0Lm1hcChwYXJhbT0+e1xuXHRcdFx0XHRcdGNvbnN0IHBpZWNlQ2hhciA9IHBhcmFtWzBdO1xuXHRcdFx0XHRcdGNvbnN0IGthbiA9IHBhcmFtLnNsaWNlKDEpO1xuXHRcdFx0XHRcdHJldHVybiAoZGVnQ2hhcitwaWVjZUNoYXIpLnJlcGVhdChCb2QuI2thbjJOdW0oa2FuKSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHBhcmFtcztcblx0XHR9KS5qb2luKFwiXCIpO1xuXG5cdFx0cmV0dXJuIGAke2JvYXJkU3RyfVxcbiR7c3RhbmRTdHJ9YDtcblx0fVxuXG5cdC8qKiBCT0TlvaLlvI/jg4bjgq3jgrnjg4jjgpLlj5blvpdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyBnZXRUZXh0KGJvYXJkKXtcblx0XHRjb25zdCB7ZmllbGQsIHhMZW4sIHBsYXllcnMsIHN0YW5kfSA9IGJvYXJkO1xuXG5cdFx0bGV0IGhlYWRlciA9XG5cdFx0XHRgICR7Wy4uLkFycmF5KHhMZW4pLmtleXMoKV0ubWFwKGk9PmAgJHtCb2QuI251bTJaZW4oeExlbi1pKX1gKS5qb2luKFwiXCIpfVxcbmArXG5cdFx0XHRgKyR7QXJyYXkoeExlbikuZmlsbChcIi0tLVwiKS5qb2luKFwiXCIpfStcXG5gO1xuXHRcdGxldCBmb290ZXIgPSBgXFxuKyR7QXJyYXkoeExlbikuZmlsbChcIi0tLVwiKS5qb2luKFwiXCIpfStgO1xuXHRcdGxldCBwYW5lbE91dGVyID0gXCJ8XCI7XG5cdFx0bGV0IHBhbmVsU2VwID0gXCJcIjtcblx0XHRsZXQgcm93U2VwID0gXCJcXG5cIjtcblx0XHRsZXQgc3RhbmRIZWFkZXIgPSBgJHtCb2QuI2dldFN0YW5kVGV4dChzdGFuZCwgMTgwKX1cXG5gO1xuXHRcdGxldCBzdGFuZEZvb3RlciA9IGAke0JvZC4jZ2V0U3RhbmRUZXh0KHN0YW5kLCAwKX1gO1xuXHRcdGlmKHBsYXllcnMgIT09IDIpe1xuXHRcdFx0c3RhbmRIZWFkZXIgPSBgJHtCb2QuI2dldFN0YW5kVGV4dChzdGFuZCwgMjcwKX1cXG5gK3N0YW5kSGVhZGVyO1xuXHRcdFx0c3RhbmRGb290ZXIgPSBgJHtCb2QuI2dldFN0YW5kVGV4dChzdGFuZCwgOTApfVxcbmArc3RhbmRGb290ZXI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIChcblx0XHRcdHN0YW5kSGVhZGVyK1xuXHRcdFx0aGVhZGVyK1xuXHRcdFx0ZmllbGQubWFwKChyb3csIGkpPT5cblx0XHRcdFx0cGFuZWxPdXRlcitcblx0XHRcdFx0cm93Lm1hcChwYW5lbD0+XG5cdFx0XHRcdFx0Qm9kLiNnZXRQaWVjZVRleHQocGFuZWwucGllY2UpXG5cdFx0XHRcdCkuam9pbihwYW5lbFNlcCkrXG5cdFx0XHRcdHBhbmVsT3V0ZXIrXG5cdFx0XHRcdEJvZC4jbnVtMkthbihpKzEpXG5cdFx0XHQpLmpvaW4ocm93U2VwKStcblx0XHRcdGZvb3RlcitcIlxcblwiK1xuXHRcdFx0c3RhbmRGb290ZXJcblx0XHQpO1xuXHR9XG59XG4iLCJpbXBvcnQge1BpZWNlfSBmcm9tIFwiLi9waWVjZS5qc1wiO1xuaW1wb3J0IHtCb2R9IGZyb20gXCIuL2JvZC5qc1wiO1xuXG4vKiog55uk44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgU3RhbmR7XG5cdC8qKiDpp5Llj7Djgbjjga7op5LluqbjgZTjgajjga7ooajnpLrpoIZcblx0ICogQHR5cGUge251bWJlcltdfVxuXHQgKi9cblx0c3RhdGljICNkZWdPcmRlciA9IFsxODAsIDkwLCAyNzAsIDBdO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0JvYXJkfSDjg5zjg7zjg4lcblx0ICovXG5cdGNvbnN0cnVjdG9yKGJvYXJkKXtcblx0XHR0aGlzLmJvYXJkID0gYm9hcmQ7XG5cdFx0Y29uc3Qge3RvcCwgcmlnaHQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCwgcGFuZWxXaWR0aCwgcGFuZWxIZWlnaHQsIHhMZW4sIHlMZW59ID0gYm9hcmQ7XG5cblx0XHR0aGlzLmNsZWFyKCk7XG5cdFx0dGhpcy5sZWZ0ID0gcmlnaHQqMS4wMjtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLndpZHRoID0gd2lkdGgvMjtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLnJpZ2h0ID0gdGhpcy5sZWZ0K3RoaXMud2lkdGg7XG5cdFx0dGhpcy5ib3R0b20gPSBib3R0b207XG5cdFx0dGhpcy5waXRjaFdpZHRoID0gcGFuZWxXaWR0aC8yO1xuXHRcdHRoaXMucGl0Y2hIZWlnaHQgPSBwYW5lbEhlaWdodDtcblx0XHR0aGlzLnhMZW4gPSB4TGVuO1xuXHRcdHRoaXMueUxlbiA9IHlMZW47XG5cdH1cblxuXHQvKiog6aeS5Y+w44KS5Yid5pyf5YyW44Gr44GZ44KLICovXG5cdGNsZWFyKCl7XG5cdFx0dGhpcy5zdG9ja3MgPSBuZXcgTWFwKFN0YW5kLiNkZWdPcmRlci5tYXAoaT0+W2ksW11dKSk7XG5cdH1cblxuXHQvKiog5oyB44Gh6aeS44GL44KJ44Oc44O844OJ5LiK44Gr6YWN572u44GZ44KLXG5cdCAqIEBwYXJhbSB7UGFuYWx9IHRvUGFuZWxsIC0g6YWN572u5YWI44Gu44OR44ON44OrXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24gLSDjgqrjg5fjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5kZWcgLSDop5LluqZcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5pIC0g6YWN572u44GZ44KL5oyB44Gh6aeS44Gu44Kk44Oz44OH44OD44Kv44K5XG5cdCAqL1xuXHRyZWxlYXNlUGllY2UodG9QYW5lbCwgb3B0aW9uPXt9KXtcblx0XHRjb25zdCB7ZGVnLCBpfSA9IG9wdGlvblxuXHRcdGNvbnN0IHtib2FyZH0gPSB0aGlzO1xuXHRcdGNvbnN0IHN0b2NrID0gdGhpcy5zdG9ja3MuZ2V0KGRlZyk7XG5cdFx0dG9QYW5lbC5waWVjZSA9IHN0b2NrW2ldO1xuXHRcdHN0b2NrW2ldLmNlbnRlciA9IHRvUGFuZWwuY2VudGVyO1xuXHRcdHN0b2NrW2ldLm1pZGRsZSA9IHRvUGFuZWwubWlkZGxlO1xuXHRcdGJvYXJkLmFkZFJlY29yZCh0b1BhbmVsLCB7ZW5kOiBcIuaJk1wifSk7XG5cdFx0c3RvY2suc3BsaWNlKGksMSk7XG5cdH1cblxuXHQvKiog6aeS5Y+w44Gr6L+95Yqg44GZ44KLXG5cdCAqIEBwYXJhbSB7UGllY2V9IHBpZWNlIC0g6L+95Yqg44GZ44KL6aeSXG5cdCAqL1xuXHRhZGQocGllY2Upe1xuXHRcdGNvbnN0IHN0b2NrID0gdGhpcy5zdG9ja3MuZ2V0KHBpZWNlLmRlZyk7XG5cdFx0cGllY2UudHVybkZyb250KCk7XG5cdFx0c3RvY2sucHVzaChwaWVjZSk7XG5cdFx0c3RvY2suc29ydCgoYSxiKT0+TWF0aC5zaWduKGEuaWQtYi5pZCkpO1xuXHR9XG5cblx0LyoqIOmnkuOCkuaMgeOBoemnkuOBq+OBmeOCi1xuXHQgKiBAcGFyYW0ge1BpZWNlfG51bGx9IHdpbm5lclBpZWNlIC0g56e75YuV44GZ44KL6aeSXG5cdCAqIEBwYXJhbSB7UGllY2V9IGxvc2VyUGllY2UgLSDmjZXnuJvjgZXjgozjgovpp5Jcblx0ICogQHBhcmFtIHtib29sZWFufSBmb3JjZUNhcHR1cmUgLSDlsZ7mgKfjgpLnhKHoppbjgZfjgabmjZXnuJvjgZnjgotcblx0ICogQHBhcmFtIHtib29sZWFufSBmb3JjZUNhbnRDYXB0dXJlIC0g5bGe5oCn44KS54Sh6KaW44GX44Gm5o2V57ib44GX44Gq44GEXG5cdCAqL1xuXHRjYXB0dXJlUGllY2Uod2lubmVyUGllY2UsIGxvc2VyUGllY2UsIGZvcmNlQ2FwdHVyZT1mYWxzZSwgZm9yY2VDYW50Q2FwdHVyZT1mYWxzZSl7XG5cdFx0aWYoZm9yY2VDYW50Q2FwdHVyZVxuXHRcdFx0fHwgIWxvc2VyUGllY2Vcblx0XHRcdHx8ICEoZm9yY2VDYXB0dXJlIHx8IHdpbm5lclBpZWNlLmhhc0F0dHIoXCJjYXB0dXJlXCIpKVxuXHRcdFx0fHwgbG9zZXJQaWVjZS5oYXNBdHRyKFwia2luZ1wiKVxuXHRcdFx0fHwgbG9zZXJQaWVjZS5oYXNBdHRyKFwiY2FudENhcHR1cmVcIilcblx0XHQpIHJldHVybjtcblxuXHRcdGxvc2VyUGllY2UuZGVnID0gd2lubmVyUGllY2UuZGVnO1xuXHRcdGxvc2VyUGllY2UuaXNNb3ZlZCA9IHRydWU7XG5cdFx0dGhpcy5hZGQobG9zZXJQaWVjZSk7XG5cdH1cblxuXHQvKiog55uk44KS5o+P5YaZICovXG5cdGRyYXcoKXtcblx0XHRjb25zdCB7Ym9hcmQsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgcGl0Y2hXaWR0aCwgcGl0Y2hIZWlnaHR9ID0gdGhpcztcblx0XHRjb25zdCB7Y3R4LCB4TGVuLCB5TGVufSA9IGJvYXJkO1xuXG5cdFx0Ly8g5aSW5p6g44KS5o+P5YaZXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGJvYXJkLmJhY2tncm91bmRDb2xvcjtcblx0XHRjdHguc3Ryb2tlU3R5bGUgPSBib2FyZC5ib3JkZXJDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gYm9hcmQuYm9yZGVyV2lkdGg7XG5cblx0XHRjdHguc2F2ZSgpO1xuXHRcdGN0eC50cmFuc2xhdGUobGVmdCwgdG9wKTtcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0Y3R4LnN0cm9rZVJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblxuXHRcdC8vIOOBmeOBueOBpuOBrumnkuOCkuihqOekuuevhOWbsuWkluOBuOenu+WLlVxuXHRcdC8qdGhpcy5zdG9ja3MuZmxhdCgpLmZvckVhY2gocGllY2U9Pntcblx0XHRcdHBpZWNlLmNlbnRlciA9IC0xMDAwO1xuXHRcdFx0cGllY2UubWlkZGxlID0gLTEwMDA7XG5cdFx0fSk7Ki9cblx0XHRbLi4udGhpcy5zdG9ja3MudmFsdWVzKCldLmZvckVhY2goKHN0b2NrLCBwbGF5ZXIpPT57XG5cdFx0XHRsZXQgaSA9IDA7XG5cdFx0XHQvLyDmuqLjgozjgZ/loLTlkIjjga/lvozmlrnlhKrlhYjjgafooajnpLpcblx0XHRcdHN0b2NrID0gc3RvY2suc2xpY2UoLXlMZW4vNCp4TGVuKTtcblx0XHRcdGZvcihsZXQgcFk9MHx5TGVuLzQqcGxheWVyO3BZPHlMZW4vNCoocGxheWVyKzEpO3BZKyspe1xuXHRcdFx0XHRmb3IobGV0IHBYPTA7cFg8eExlbjtwWCsrKXtcblx0XHRcdFx0XHRjb25zdCBjZW50ZXIgPSBsZWZ0K3BpdGNoV2lkdGgqKHBYKzEpO1xuXHRcdFx0XHRcdGNvbnN0IG1pZGRsZSA9IHRvcCtwaXRjaEhlaWdodCoocFkrMSk7XG5cdFx0XHRcdFx0Y29uc3QgcGllY2UgPSBzdG9ja1tpKytdO1xuXHRcdFx0XHRcdGlmKHBpZWNlID09IG51bGwpIGJyZWFrO1xuXHRcdFx0XHRcdHBpZWNlLmNlbnRlciA9IGNlbnRlcjtcblx0XHRcdFx0XHRwaWVjZS5taWRkbGUgPSBtaWRkbGU7XG5cdFx0XHRcdFx0cGllY2UuZHJhdygpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvKiog5paH5a2X5YiX5b2i5byP44Gn5Y+W5b6XXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNNaW5pbWFtIC0g57Ch5piT6KGo56S6XG5cdCAqL1xuXHR0b1N0cmluZyhpc01pbmltYW09ZmFsc2Upe1xuXHRcdGNvbnN0IHt4TGVufSA9IHRoaXMuYm9hcmQ7XG5cdFx0Y29uc3Qgc3RvY2sgPSBbLi4udGhpcy5zdG9ja3MudmFsdWVzKCldLmZsYXQoKS5maWx0ZXIodj0+dik7XG5cblx0XHRsZXQgaGVhZCA9IDAgPCBzdG9jay5sZW5ndGg/IFwiXFxuXCIrXCLigJVcIi5yZXBlYXQoeExlbioyKStcIlxcblwiOiBcIlwiO1xuXHRcdGxldCB0ZXh0ID0gc3RvY2subWFwKG89PlwiXCIrbykuam9pbihcIlwiKTtcblx0XHRpZighaXNNaW5pbWFtKXtcblx0XHRcdGhlYWQgPSBcIlwiO1xuXHRcdFx0Zm9yKGNvbnN0IGNoYXIgb2YgT2JqZWN0LnZhbHVlcyhQaWVjZS5kZWdDaGFycykpe1xuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKGNoYXIsIFwiXFxuXCIrYCR7Y2hhcn3mjIHpp5LvvJoke2NoYXJ9YCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBoZWFkK3RleHQ7XG5cdH1cbn1cbiIsImltcG9ydCB7UGFuZWx9IGZyb20gXCIuL3BhbmVsLmpzXCI7XG5pbXBvcnQge1BpZWNlfSBmcm9tIFwiLi9waWVjZS5qc1wiO1xuXG5jb25zdCBkZWdzID0gT2JqZWN0LmtleXMoUGllY2UuZGVnQ2hhcnMpO1xuY29uc3QgZ2V0SW5pdCA9ICgpPT4oe1xuXHRwYW5lbDogbnVsbCxcblx0cGllY2U6IG51bGxcbn0pO1xuXG4vKiog44Ki44Oz44OR44OD44K144Oz5oOF5aCx44Gu566h55CGICovXG5leHBvcnQgY2xhc3MgRW5QYXNzYW50e1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuZGVncyA9IHt9O1xuXHRcdGRlZ3MuZm9yRWFjaChkZWc9PnRoaXMuZGVnc1tkZWddID0gZ2V0SW5pdCgpKTtcblx0fVxuXG5cdC8qKiDjgqLjg7Pjg5Hjg4PjgrXjg7Pmg4XloLHjgpLjgq/jg6rjgqJcblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIOOCouODs+ODkeODg+OCteODs+OBleOCjOOBhuOCi+mZo+WWtuOBruinkuW6plxuXHQgKi9cblx0Y2xlYXIoZGVnKXtcblx0XHR0aGlzLmRlZ3NbZGVnXSA9IGdldEluaXQoKTtcblx0fVxuXG5cdC8qKiDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovjg57jgrnmg4XloLHjgpLoqJjpjLJcblx0ICogQHBhcmFtIHtQYW5lbH0gcGFuZWwgLSDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovjg57jgrnnm65cblx0ICogQHBhcmFtIHtQaWVjZX0gcGllY2UgLSDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovpp5Jcblx0ICovXG5cdHNldFRhcmdldChwYW5lbCwgcGllY2Upe1xuXHRcdGlmKHBhbmVsLmhhc1RhcmdldChcInN0YXJ0XCIpICYmIHBpZWNlLmhhc0F0dHIoXCJlblBhc3NhbnRcIikpXG5cdFx0XHR0aGlzLmRlZ3NbcGllY2UuZGVnXS5wYW5lbCA9IHBhbmVsO1xuXHR9XG5cblx0LyoqIOOCouODs+ODkeODg+OCteODs+WvvuixoeOBqOaIkOOCiuOBhuOCi+mnkuaDheWgseOCkuiomOmMslxuXHQgKiBAcGFyYW0ge1BhbmVsfSB0b1BhbmVsIC0g44Ki44Oz44OR44OD44K144Oz5a++6LGh44GL56K66KqN44GZ44KL44Oe44K555uuXG5cdCAqL1xuXHRzZXRNb3ZlZCh0b1BhbmVsKXtcblx0XHRjb25zdCB7cGllY2V9ID0gdG9QYW5lbDtcblx0XHRjb25zdCBlcCA9IHRoaXMuZGVnc1twaWVjZS5kZWddO1xuXHRcdGlmKHBpZWNlICYmIHRvUGFuZWwgPT09IGVwLnBhbmVsKSBlcC5waWVjZSA9IHBpZWNlO1xuXHRcdGVsc2UgdGhpcy5jbGVhcihwaWVjZS5kZWcpO1xuXHR9XG5cblx0LyoqIOOCouODs+ODkeODg+OCteODs+WvvuixoeOBruODnuOCueOBi+eiuuiqjeOBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOOCouODs+ODkeODg+OCteODs+WvvuixoeOBqOaIkOOCiuOBhuOCi+ODnuOCueebrlxuXHQgKiBAcGFyYW0ge1BpZWNlfSBwaWVjZSAtIOOCouODs+ODkeODg+OCteODs+WvvuixoeOBqOaIkOOCiuOBhuOCi+mnklxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGlzVGFyZ2V0KHBhbmVsLCBwaWVjZSl7XG5cdFx0aWYoIXBhbmVsIHx8ICFwYW5lbC5waWVjZSkgcmV0dXJuIHRydWU7XG5cdFx0aWYoIXBhbmVsLnBpZWNlLmhhc0F0dHIoXCJlblBhc3NhbnRcIikpIHJldHVybiBmYWxzZTtcblx0XHRyZXR1cm4gcGFuZWwucGllY2UgPT09IHRoaXMuZGVnc1twYW5lbC5waWVjZS5kZWddLnBpZWNlO1xuXHR9XG59XG4iLCIvKiogQHR5cGVkZWYge2ltcG9ydCgnLi9qc29uJykuQm9hcmRJbml0T3B0aW9ufSBCb2FyZEluaXRPcHRpb24gKi9cbmltcG9ydCB7Y2FudmFzRm9udH0gZnJvbSBcIi4vY2FudmFzRm9udExvYWRlci5qc1wiO1xuaW1wb3J0IHtjYW52YXNJbWFnZX0gZnJvbSBcIi4vY2FudmFzSW1hZ2VMb2FkZXIuanNcIjtcbmltcG9ydCB7ZG93bmxvYWRJbWFnZX0gZnJvbSBcIi4vZG93bmxvYWRJbWFnZS5qc1wiO1xuaW1wb3J0IHt1SUNvbnRyb2x9IGZyb20gXCIuL3VpQ29udHJvbC5qc1wiO1xuaW1wb3J0IHtTdGFuZH0gZnJvbSBcIi4vc3RhbmQuanNcIjtcbmltcG9ydCB7UGFuZWx9IGZyb20gXCIuL3BhbmVsLmpzXCI7XG5pbXBvcnQge1BpZWNlfSBmcm9tIFwiLi9waWVjZS5qc1wiO1xuaW1wb3J0IHtFblBhc3NhbnR9IGZyb20gXCIuL2VuUGFzc2FudC5qc1wiO1xuaW1wb3J0IHtCb2R9IGZyb20gXCIuL2JvZC5qc1wiO1xuaW1wb3J0IHtib2FyZHMsIGdhbWVzfSBmcm9tIFwiLi9qc29uLmpzXCI7XG5cbi8qKiDnm6Tjga7nrqHnkIbjgq/jg6njgrkgKi9cbmV4cG9ydCBjbGFzcyBCb2FyZHtcblx0LyoqIOOCsuODvOODoOOCkuWun+ihjOOBmeOCi1xuXHQgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fX0gY2FudmFzIC0gQ2FudmFz6KaB57SgXG5cdCAqIEBwYXJhbSB7Qm9hcmRJbml0T3B0aW9ufSBvcHRpb24gLSDjg5zjg7zjg4njga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi5wbGF5Qm9hcmQgLSDjg5zjg7zjg4njgr/jgqTjg5dcblx0ICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbi5wbGF5UGllY2VzIC0g6aeS44K744OD44OIXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24ucGxheVBpZWNlcy5nYW1lTmFtZSAtIOOCsuODvOODoOWQjSjln7rmupbjgajjgarjgovpp5Ljga7phY3nva7jgrvjg4Pjg4gpXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24ucGxheVBpZWNlcy5waWVjZVNldCAtIOmnkuOBrumFjee9ruODkeOCv+ODvOODs1xuXHQgKiBAcmV0dXJucyBCb2FyZFxuXHQgKi9cblx0c3RhdGljIHJ1bihjYW52YXMsIG9wdGlvbil7XG5cdFx0Y29uc3Qge3BsYXlCb2FyZCwgcGxheVBpZWNlcywgb25EcmF3ZWR9ID0gb3B0aW9uO1xuXHRcdGNvbnN0IHBsYXllcnMgPSBwbGF5UGllY2VzLnNvbWUoKHtnYW1lTmFtZX0sIGkpPT4xIDwgaSAmJiBnYW1lTmFtZSk/IDQ6IDI7XG5cdFx0Ly8g44Oc44O844OJ44KS55Sf5oiQXG5cdFx0Y29uc3QgYm9hcmQgPSBuZXcgQm9hcmQoY2FudmFzLCBwbGF5Qm9hcmQsIHtcblx0XHRcdC4uLm9wdGlvbixcblx0XHRcdHBsYXllcnMsXG5cdFx0XHRvbkRyYXdlZFxuXHRcdH0pO1xuXHRcdC8vIOmnkuOCkumFjee9rlxuXHRcdHBsYXlQaWVjZXMuZm9yRWFjaCgoe2dhbWVOYW1lLCBwaWVjZVNldH0sIGkpPT57XG5cdFx0XHRpZighZ2FtZU5hbWUpIHJldHVybjtcblx0XHRcdHBpZWNlU2V0ID8/PSBcImRlZmF1bHRcIjtcblx0XHRcdHRyeXtcblx0XHRcdFx0Ym9hcmQucHV0U3RhcnRQaWVjZXMoaSwgZ2FtZU5hbWUsIHBpZWNlU2V0KTtcblx0XHRcdH1cblx0XHRcdGNhdGNoe31cblx0XHR9KTtcblx0XHQvLyDmj4/lhpnjgqTjg5njg7Pjg4jjgpLoqK3lrppcblx0XHRib2FyZC5vbkRyYXdlZCA9IG9uRHJhd2VkO1xuXHRcdHJldHVybiBib2FyZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBAdHlwZWRlZiB7XCJvdmVyZmxvd1wifFwiaG9yaXpvbnRhbFwifFwidmVydGljYWxcInxcInBhcmVudE92ZXJmbG93XCJ8XCJwYXJlbnRIb3Jpem9udGFsXCJ8XCJwYXJlbnRWZXJ0aWNhbFwifG51bGx9IGNhbnZhc0ZpdFxuXHQgKi9cblx0LyoqXG5cdCAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhcyAtIENhbnZhc+imgee0oFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGxheUJvYXJkIC0g44Oc44O844OJ44K/44Kk44OXXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5ZXJzIC0g44OX44Os44Kk44Ok44O85Lq65pWwKDIgb3IgNClcblx0ICogQHBhcmFtIHtCb2FyZEluaXRPcHRpb259IG9wdGlvbiAtIOODnOODvOODieOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuXHQgKi9cblx0Y29uc3RydWN0b3IoY2FudmFzLCBwbGF5Qm9hcmQsIG9wdGlvbil7XG5cdFx0Y29uc3Qge1xuXHRcdFx0cGxheWVycz0yLFxuXHRcdFx0Y2FudmFzV2lkdGg9dW5kZWZpbmVkLFxuXHRcdFx0Y2FudmFzSGVpZ2h0PXVuZGVmaW5lZCxcblx0XHRcdGNhbnZhc0ZpdD1cIm92ZXJmbG93XCIsXG5cdFx0XHRib2FyZExlZnQ9NSxcblx0XHRcdGJvYXJkVG9wPTUsXG5cdFx0XHRwYW5lbFdpZHRoPTUwLFxuXHRcdFx0cGFuZWxIZWlnaHQ9MHxwYW5lbFdpZHRoKjEuMSxcblx0XHRcdHBpZWNlU2l6ZT0wfHBhbmVsV2lkdGgqMC45LFxuXHRcdFx0dXNlUmFua1NpemUgPSB0cnVlLFxuXHRcdFx0aXNEcmF3U2hhZG93ID0gdHJ1ZSxcblx0XHRcdGJvcmRlcldpZHRoPU1hdGgubWluKHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0KS8zMCxcblx0XHRcdHVzZVN0YW5kPWZhbHNlLFxuXHRcdFx0YmFja2dyb3VuZENvbG9yPVwiIzAwMDAwMDAwXCIsXG5cdFx0XHRhdXRvRHJhd2luZz10cnVlLFxuXHRcdFx0b25EcmF3ZWQsXG5cdFx0XHRvbkdhbWVPdmVyPWk9PmFsZXJ0KGDjg5fjg6zjgqTjg6Tjg7wke2krMX3jga7mlZfljJfjgafjgZnjgIJgKSxcblx0XHRcdGZyZWVNb2RlPWZhbHNlXG5cdFx0fSA9IG9wdGlvbjtcblx0XHQvLyDliJ3mnJ/ljJZcblx0XHRjb25zdCBjYW52YXNGb250QXN5bmMgPSBjYW52YXNGb250LmltcG9ydEFzeW5jKCk7XG5cdFx0Y29uc3QgY2FudmFzSW1hZ2VBc3luYyA9IGNhbnZhc0ltYWdlLmltcG9ydEFzeW5jKCk7XG5cdFx0dGhpcy5jYW52YXMgPSBjYW52YXM7XG5cdFx0Y29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdFx0dGhpcy5jdHggPSBjdHg7XG5cblx0XHR0aGlzLnBpZWNlcyA9IFBpZWNlLmdldFBpZWNlcyhjdHgsIHtcblx0XHRcdHNpemU6IHBpZWNlU2l6ZSxcblx0XHRcdHVzZVJhbmtTaXplLFxuXHRcdFx0aXNEcmF3U2hhZG93XG5cdFx0fSk7XG5cblx0XHQvLyDjg5zjg7zjg4nmg4XloLFcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIGJvYXJkc1twbGF5Qm9hcmRdKTtcblx0XHRpZighWzIsIDRdLmluY2x1ZGVzKHBsYXllcnMpKSB0aHJvdyBFcnJvcihgcGxheWVycz0ke3BsYXllcnN9LCBwbGF5ZXJzIG5lZWQgMiBvciA0LmApO1xuXHRcdHRoaXMucGxheWVycyA9IHBsYXllcnM7XG5cdFx0dGhpcy5sZWZ0ID0gYm9hcmRMZWZ0O1xuXHRcdHRoaXMudG9wID0gYm9hcmRUb3A7XG5cdFx0dGhpcy5wYW5lbFdpZHRoID0gcGFuZWxXaWR0aDtcblx0XHR0aGlzLnBhbmVsSGVpZ2h0ID0gcGFuZWxIZWlnaHQ7XG5cdFx0dGhpcy5ib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoO1xuXHRcdHRoaXMucGllY2VTaXplID0gcGllY2VTaXplO1xuXHRcdHRoaXMuY2FudmFzQmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xuXG5cdFx0Ly8g44Oe44K555uu44OH44O844K/44KS5qeL56+JXG5cdFx0dGhpcy5maWVsZCA9IHRoaXMuZmllbGQubWFwKChyb3csIHBZKT0+XG5cdFx0XHRbLi4ucm93XS5tYXAoKGNoYXIsIHBYKT0+e1xuXHRcdFx0XHRjb25zdCBjZW50ZXIgPSBib2FyZExlZnQrcGFuZWxXaWR0aCoocFgrMSk7XG5cdFx0XHRcdGNvbnN0IG1pZGRsZSA9IGJvYXJkVG9wK3BhbmVsSGVpZ2h0KihwWSsxKVxuXHRcdFx0XHRyZXR1cm4gbmV3IFBhbmVsKGN0eCwgY2hhciwgY2VudGVyLCBtaWRkbGUsIHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0LCBib3JkZXJXaWR0aCwgcFgsIHBZKTtcblx0XHRcdH0pXG5cdFx0KTtcblx0XHR0aGlzLnhMZW4gPSB0aGlzLmZpZWxkWzBdLmxlbmd0aDtcblx0XHR0aGlzLnlMZW4gPSB0aGlzLmZpZWxkLmxlbmd0aDtcblx0XHR0aGlzLndpZHRoID0gdGhpcy5wYW5lbFdpZHRoKih0aGlzLnhMZW4rMSk7XG5cdFx0dGhpcy5oZWlnaHQgPSB0aGlzLnBhbmVsSGVpZ2h0Kih0aGlzLnlMZW4rMSk7XG5cdFx0dGhpcy5yaWdodCA9IGJvYXJkTGVmdCt0aGlzLndpZHRoO1xuXHRcdHRoaXMuYm90dG9tID0gYm9hcmRUb3ArdGhpcy5oZWlnaHQ7XG5cdFx0dGhpcy5zdGFuZCA9IG5ldyBTdGFuZCh0aGlzKTtcblx0XHRjYW52YXMud2lkdGggPSBjYW52YXNXaWR0aCA/PyAodXNlU3RhbmQ/IHRoaXMuc3RhbmQucmlnaHQ6IHRoaXMucmlnaHQpKzU7XG5cdFx0Y2FudmFzLmhlaWdodCA9IGNhbnZhc0hlaWdodCA/PyB0aGlzLmJvdHRvbSs1O1xuXHRcdC8vIOOCreODo+ODs+ODkOOCueOCteOCpOOCuuiqv+aVtFxuXHRcdGNvbnN0IHtzdHlsZX0gPSBjYW52YXM7XG5cdFx0aWYoY2FudmFzRml0ID09PSBcIm92ZXJmbG93XCIpe1xuXHRcdFx0aWYoc3R5bGUubWF4V2lkdGggPT09IFwiXCIpIHN0eWxlLm1heFdpZHRoID0gXCI5N3Z3XCI7XG5cdFx0XHRpZihzdHlsZS5tYXhIZWlnaHQgPT09IFwiXCIpIHN0eWxlLm1heEhlaWdodCA9IFwiOTd2aFwiO1xuXHRcdH1cblx0XHRlbHNlIGlmKGNhbnZhc0ZpdCA9PT0gXCJob3Jpem9udGFsXCIpe1xuXHRcdFx0aWYoc3R5bGUud2lkdGggPT09IFwiXCIpIHN0eWxlLndpZHRoID0gXCI5N3Z3XCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY2FudmFzRml0ID09PSBcInZlcnRpY2FsXCIpe1xuXHRcdFx0aWYoc3R5bGUuaGVpZ2h0ID09PSBcIlwiKSBzdHlsZS5oZWlnaHQgPSBcIjk3dmhcIjtcblx0XHR9XG5cdFx0ZWxzZSBpZihjYW52YXNGaXQgPT09IFwicGFyZW50T3ZlcmZsb3dcIil7XG5cdFx0XHRpZihzdHlsZS5tYXhXaWR0aCA9PT0gXCJcIikgc3R5bGUubWF4V2lkdGggPSBcIjEwMCVcIjtcblx0XHRcdGlmKHN0eWxlLm1heEhlaWdodCA9PT0gXCJcIikgc3R5bGUubWF4SGVpZ2h0ID0gXCIxMDAlXCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY2FudmFzRml0ID09PSBcInBhcmVudEhvcml6b250YWxcIil7XG5cdFx0XHRpZihzdHlsZS53aWR0aCA9PT0gXCJcIikgc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcblx0XHR9XG5cdFx0ZWxzZSBpZihjYW52YXNGaXQgPT09IFwicGFyZW50VmVydGljYWxcIil7XG5cdFx0XHRpZihzdHlsZS5oZWlnaHQgPT09IFwiXCIpIHN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdH1cblxuXHRcdC8vIOaPj+WGmeabtOaWsOioreWumlxuXHRcdHRoaXMuYXV0b0RyYXdpbmcgPSBhdXRvRHJhd2luZztcblx0XHRpZihhdXRvRHJhd2luZyl7XG5cdFx0XHRjYW52YXNGb250QXN5bmMudGhlbigoKT0+dGhpcy5kcmF3KCkpO1xuXHRcdFx0Y2FudmFzSW1hZ2VBc3luYy50aGVuKCgpPT50aGlzLmRyYXcoKSk7XG5cdFx0XHR0aGlzLmRyYXcoKTtcblx0XHR9XG5cdFx0dGhpcy5vbkRyYXdlZCA9IG9uRHJhd2VkO1xuXHRcdHRoaXMub25HYW1lT3ZlciA9IG9uR2FtZU92ZXI7XG5cdFx0LyoqICAqL1xuXHRcdHRoaXMuZ2FtZUFsaXZlcyA9IG5ldyBNYXAoXG5cdFx0XHRbLi4uQXJyYXkodGhpcy5wbGF5ZXJzKS5rZXlzKCldXG5cdFx0XHQubWFwKGk9Plt0aGlzLiNkZWdOb3JtYWwoaSksIHRydWVdKVxuXHRcdCk7XG5cdFx0dGhpcy5mcmVlTW9kZSA9IGZyZWVNb2RlO1xuXG5cdFx0dGhpcy5yZWNvcmQgPSBbXTtcblx0XHR0aGlzLnVpQ29udHJvbCA9IHVJQ29udHJvbCh0aGlzKTtcblx0XHR0aGlzLmVuUGFzc2FudCA9IG5ldyBFblBhc3NhbnQoKTtcblx0fVxuXG5cdC8qKiDjg5zjg7zjg4njgpLplonjgZjjgosgKi9cblx0Y2xvc2UoKXtcblx0XHR0aGlzLnVpQ29udHJvbC5yZW1vdmVFdmVudCgpO1xuXHR9XG5cblx0LyoqIOinkuW6puOCkuato+imj+WMllxuXHQgKiBAcGFyYW0ge251bWJlcn0gcGxheWVhSWRPckRlZyAtIOODl+ODrOOCpOODpOODvOeVquWPt+OBvuOBn+OBr+inkuW6plxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0I2RlZ05vcm1hbChwbGF5ZWFJZE9yRGVnKXtcblx0XHRsZXQgZGVnID0gcGxheWVhSWRPckRlZztcblx0XHRpZigwIDwgZGVnICYmIGRlZyA8IDQpIGRlZyA9IDB8ZGVnKjM2MC90aGlzLnBsYXllcnM7XG5cdFx0ZG97ZGVnID0gKGRlZyszNjApJTM2MH0gd2hpbGUoZGVnPDApO1xuXHRcdHJldHVybiBkZWc7XG5cdH1cblxuXHQvKiog6aeS6YWN572u44KS5Zue6LuiXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDlm57ou6Lop5IgKDkw44Gu5YCN5pWwKVxuXHQgKi9cblx0cm90YXRlRmllbGQoZGVnKXtcblx0XHRjb25zdCB7eExlbiwgeUxlbn0gPSB0aGlzO1xuXG5cdFx0ZGVnID0gdGhpcy4jZGVnTm9ybWFsKGRlZyk7XG5cdFx0aWYoZGVnID09PSAwKSByZXR1cm47XG5cdFx0aWYoIVs5MCwgMTgwLCAyNzBdLmluY2x1ZGVzKGRlZykpIHRocm93IEVycm9yKGBkZWc9JHtkZWd9LCBkZWcgbmVlZCBtdWx0aXBsZSBvZiA5MC5gKTtcblx0XHRpZihbOTAsIDI3MF0uaW5jbHVkZXMoZGVnKSl7XG5cdFx0XHQvLyAy5qyh6YWN5YiX44KS6Lui572uXG5cdFx0XHRjb25zdCB0cmFuc3Bvc2UgPSBhID0+IGFbMF0ubWFwKChfLCBjKSA9PiBhLm1hcChyID0+IHJbY10pKTtcblx0XHRcdGlmKHhMZW4gIT09IHlMZW4pIHRocm93IEVycm9yKGBjb2xzPSR7eExlbn0gIT0gcm93cz0ke3lMZW59LCBOb3Qgcm93cyA9IGNvbHMuYCk7XG5cdFx0XHR0aGlzLmZpZWxkID0gdHJhbnNwb3NlKHRoaXMuZmllbGQpO1xuXHRcdH1cblx0XHRpZihbMTgwLCAyNzBdLmluY2x1ZGVzKGRlZykpe1xuXHRcdFx0dGhpcy5maWVsZC5yZXZlcnNlKCk7XG5cdFx0fVxuXHRcdHRoaXMuZmllbGQuZm9yRWFjaChyb3c9Pntcblx0XHRcdHJvdy5mb3JFYWNoKHBhbmVsPT57XG5cdFx0XHRcdGlmKCFwYW5lbC5waWVjZSkgcmV0dXJuO1xuXHRcdFx0XHRwYW5lbC5waWVjZS5kZWcgKz0gZGVnO1xuXHRcdFx0fSk7XG5cdFx0XHRpZihbOTAsIDE4MF0uaW5jbHVkZXMoZGVnKSkgcm93LnJldmVyc2UoKTtcblx0XHR9KTtcblx0fVxuXG5cdC8qKiDpp5Ljga7liJ3mnJ/phY3nva5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHBsYXllcklkIC0g44OX44Os44Kk44Ok44O855Wq5Y+3XG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBnYW1lTmFtZSAtIOOCsuODvOODoOWQjSjln7rmupbjgajjgarjgovpp5Ljga7phY3nva7jgrvjg4Pjg4gpXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZVNldCAtIOmnkuOBrumFjee9ruODkeOCv+ODvOODs1xuXHQgKi9cblx0cHV0U3RhcnRQaWVjZXMocGxheWVySWQsIGdhbWVOYW1lLCBwaWVjZVNldD1cImRlZmF1bHRcIil7XG5cdFx0Y29uc3Qge3BpZWNlc30gPSB0aGlzO1xuXG5cdFx0Y29uc3QgZGVnID0gdGhpcy4jZGVnTm9ybWFsKHBsYXllcklkKTtcblx0XHR0aGlzLnJvdGF0ZUZpZWxkKGRlZyk7XG5cdFx0Y29uc3QgcG9zID0gZ2FtZXNbZ2FtZU5hbWVdLnBvc2l0aW9uW3RoaXMueExlbl1bcGllY2VTZXRdO1xuXHRcdGlmKCFwb3MpIHRocm93IEVycm9yKGBnYW1lc1tcIiR7Z2FtZU5hbWV9XCJdLnBvc2l0aW9uW1wiJHt0aGlzLnhMZW59XCJdW1wiJHtwaWVjZVNldH1cIl1pcyBudWxsLmApO1xuXHRcdHBvcy5mb3JFYWNoKChyb3csIGkpPT57XG5cdFx0XHRpZihyb3cubGVuZ3RoIDwgdGhpcy54TGVuKSB0aHJvdyBFcnJvcihyb3cuam9pbihcIlwiKSk7XG5cdFx0XHRjb25zdCBwWSA9IGkrdGhpcy55TGVuIC0gcG9zLmxlbmd0aDtcblx0XHRcdFsuLi5yb3ddLmZvckVhY2goKGNoYXIsIHBYKT0+e1xuXHRcdFx0XHRpZighcGllY2VzW2NoYXJdKSByZXR1cm47XG5cdFx0XHRcdGNvbnN0IHBpZWNlID0gcGllY2VzW2NoYXJdLmNsb25lKCk7XG5cdFx0XHRcdGNvbnN0IHBhbmVsID0gdGhpcy5maWVsZFtwWV1bcFhdO1xuXHRcdFx0XHRwaWVjZS5jZW50ZXIgPSBwYW5lbC5jZW50ZXI7XG5cdFx0XHRcdHBpZWNlLm1pZGRsZSA9IHBhbmVsLm1pZGRsZTtcblx0XHRcdFx0cGFuZWwucGllY2UgPSBwaWVjZTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdHRoaXMucm90YXRlRmllbGQoLWRlZyk7XG5cdFx0aWYodGhpcy5hdXRvRHJhd2luZykgdGhpcy5kcmF3KCk7XG5cdH1cblxuXHQvKiog6aeS44Gu6YWN572uXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZSAtIOmnkuOBruihqOePvuaWh+Wtl1xuXHQgKiBAcGFyYW0ge251bWJlcn0gcFggLSBY5pa55ZCR6YWN572u5L2N572uKOODnuOCueebruWfuua6lilcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBZIC0gWeaWueWQkemFjee9ruS9jee9rijjg57jgrnnm67ln7rmupYpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5ZWFJZE9yRGVnIC0g44OX44Os44Kk44Ok44O855Wq5Y+344G+44Gf44Gv6aeS44Gu6YWN572u6KeSXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24gLSDjgqrjg5fjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5kaXNwbGF5UHRuIC0g6KGo56S65paH5a2X5YiX44KS5aSJ5pu0KDHjgJwpXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9uLmlzTW92ZWQgLSDliJ3lm57np7vli5XmuIjjgb/jgYvlkKbjgYtcblx0ICovXG5cdHB1dE5ld1BpZWNlKHBpZWNlLCBwWCwgcFksIHBsYXllYUlkT3JEZWcsIG9wdGlvbj17fSl7XG5cdFx0Y29uc3Qge2Rpc3BsYXlQdG49MCwgaXNNb3ZlZD1mYWxzZX0gPSBvcHRpb247XG5cdFx0Y29uc3Qge3BpZWNlc30gPSB0aGlzO1xuXG5cdFx0Y29uc3QgZGVnID0gdGhpcy4jZGVnTm9ybWFsKHBsYXllYUlkT3JEZWcpO1xuXHRcdGlmKHR5cGVvZiBwaWVjZSA9PT0gXCJzdHJpbmdcIil7XG5cdFx0XHRwaWVjZSA9IG5ldyBQaWVjZSh0aGlzLmN0eCwgcGllY2VzW3BpZWNlXSwge2Rpc3BsYXlQdG4sIGRlZywgaXNNb3ZlZH0pO1xuXHRcdH1cblx0XHRjb25zdCBwYW5lbCA9IHRoaXMuZmllbGRbcFldW3BYXTtcblx0XHRwaWVjZS5jZW50ZXIgPSBwYW5lbC5jZW50ZXI7XG5cdFx0cGllY2UubWlkZGxlID0gcGFuZWwubWlkZGxlO1xuXHRcdHBhbmVsLnBpZWNlID0gcGllY2U7XG5cdFx0aWYodGhpcy5hdXRvRHJhd2luZykgdGhpcy5kcmF3KCk7XG5cdH1cblxuXHQvKiog5paH5a2X5YiX44GL44KJ6aeS44KS6YWN572uXG5cdCAqIHtzdHJpbmd9IHRleHQgLSDpp5LphY3nva7jgpLooajjgZnmloflrZfliJdcblx0ICovXG5cdHNldFRleHRQaWVjZXModGV4dCl7XG5cdFx0Y29uc3Qge2ZpZWxkLCBwaWVjZXMsIHhMZW4sIHlMZW59ID0gdGhpcztcblxuXHRcdGNvbnN0IHN0YW5kVGl0bGUgPSBcIuaMgemnku+8mlwiO1xuXHRcdC8vIEJPROW9ouW8j1xuXHRcdGlmKDA8dGV4dC5pbmRleE9mKHN0YW5kVGl0bGUpKSB0ZXh0ID0gQm9kLmNvbnZTZXRUZXh0KHRleHQpO1xuXG5cdFx0Ly8g5o6S6Zmk44GZ44KL6KiY5Y+3XG5cdFx0Y29uc3Qgbm9pc2VzID0gXCLilI/ilIHilK/ilJPilJfilLfilJvilIPilILilKDilIDilLzilKjigJVcIjtcblxuXHRcdC8vIOmFjeWIl+WkieaPm1xuXHRcdGNvbnN0IHRleHRzID0gW3RleHRdLmNvbmNhdChcblx0XHRcdFx0Wy4uLm5vaXNlc10sXG5cdFx0XHRcdE9iamVjdC52YWx1ZXMoUGllY2UuZGVnQ2hhcnMpLm1hcChjPT5cIlxcblwiK2Mrc3RhbmRUaXRsZSlcblx0XHRcdCkucmVkdWNlKFxuXHRcdFx0XHQodGV4dCxjaGFyKT0+XG5cdFx0XHRcdFx0dGV4dC5yZXBsYWNlKG5ldyBSZWdFeHAoY2hhcixcImdcIiksIFwiXCIpXG5cdFx0XHQpLnJlcGxhY2UoL1xcblxcbi9nLCBcIlxcblwiKVxuXHRcdFx0LnJlcGxhY2UoL+OAgC9nLCBcIuODu1wiKVxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnNwbGl0KC9cXG4vKVxuXHRcdFx0Lm1hcChcblx0XHRcdFx0cm93PT5yb3cubWF0Y2goLy57Mn0vZykpO1xuXG5cdFx0Ly8g44Oc44O844OJ44Gr6aeS44KS6YWN572uXG5cdFx0Zm9yKGxldCBwWT0wO3BZPHlMZW47cFkrKyl7XG5cdFx0XHRmb3IobGV0IHBYPTA7cFg8eExlbjtwWCsrKXtcblx0XHRcdFx0dHJ5e1xuXHRcdFx0XHRcdGNvbnN0IHRleHQgPSB0ZXh0c1twWV1bcFhdO1xuXHRcdFx0XHRcdGNvbnN0IHBpZWNlID0gUGllY2Uuc3RyaW5nVG9QaWVjZShwaWVjZXMsIHRleHQpO1xuXHRcdFx0XHRcdHBpZWNlLmNlbnRlciA9IGZpZWxkW3BZXVtwWF0uY2VudGVyO1xuXHRcdFx0XHRcdHBpZWNlLm1pZGRsZSA9IGZpZWxkW3BZXVtwWF0ubWlkZGxlO1xuXHRcdFx0XHRcdGZpZWxkW3BZXVtwWF0ucGllY2UgPSBwaWVjZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXRjaChleCl7XG5cdFx0XHRcdFx0ZmllbGRbcFldW3BYXS5waWVjZSA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyDmjIHjgaHpp5LjgpLphY3nva5cblx0XHR0aGlzLnN0YW5kLmNsZWFyKCk7XG5cdFx0Y29uc3Qgc3RhbmRUZXh0cyA9IHRleHRzW3lMZW5dO1xuXHRcdGlmKHN0YW5kVGV4dHMpe1xuXHRcdFx0c3RhbmRUZXh0cy5mb3JFYWNoKHRleHQ9Pntcblx0XHRcdFx0Y29uc3QgcGllY2UgPSBQaWVjZS5zdHJpbmdUb1BpZWNlKHBpZWNlcywgdGV4dCk7XG5cdFx0XHRcdGlmKCFwaWVjZSkgcmV0dXJuO1xuXHRcdFx0XHR0aGlzLnN0YW5kLmFkZChwaWVjZSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0aWYodGhpcy5hdXRvRHJhd2luZykgdGhpcy5kcmF3KCk7XG5cdH1cblxuXHQvKiog6KeS5bqm5Z+65rqW44Gu44Oe44K555uu44Gu6KGM44KS5Y+W5b6X44GZ44KLXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Oe44K555uuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDop5LluqZcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldERlZyAtIOijnOato+inkuW6plxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0Z2V0Um93KHBYLCBwWSwgZGVnLCBvZmZzZXREZWc9MCl7XG5cdFx0Y29uc3Qge3hMZW4sIHlMZW59ID0gdGhpcztcblxuXHRcdGRlZyA9IHRoaXMuI2RlZ05vcm1hbChkZWcrb2Zmc2V0RGVnKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0ZGVnID09PSAwPyB5TGVuLTEtcFk6XG5cdFx0XHRkZWcgPT09IDkwPyBwWDpcblx0XHRcdGRlZyA9PT0gMTgwPyBwWTpcblx0XHRcdGRlZyA9PT0gMjcwPyB4TGVuLTEtcFg6XG5cdFx0XHQtMVxuXHRcdCk7XG5cdH1cblxuXHQvKiog6KeS5bqm5Z+65rqW44Gu44Oe44K555uu44Gu5YiX44KS5Y+W5b6X44GZ44KLXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Oe44K555uuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDop5LluqZcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldERlZyAtIOijnOato+inkuW6plxuXHQgKiBAcmV0dXJucyB7bnVtYmVyfVxuXHQgKi9cblx0Z2V0Q29sKHBYLCBwWSwgZGVnLCBvZmZzZXREZWc9MCl7XG5cdFx0Y29uc3Qge3hMZW4sIHlMZW59ID0gdGhpcztcblxuXHRcdGRlZyA9IHRoaXMuI2RlZ05vcm1hbChkZWcrb2Zmc2V0RGVnKTtcblx0XHRyZXR1cm4gKFxuXHRcdFx0ZGVnID09PSAwPyBwWDpcblx0XHRcdGRlZyA9PT0gOTA/IHlMZW4tMS1wWTpcblx0XHRcdGRlZyA9PT0gMTgwPyB4TGVuLTEtcFg6XG5cdFx0XHRkZWcgPT09IDI3MD8gcFk6XG5cdFx0XHQtMVxuXHRcdCk7XG5cdH1cblxuXHQvKiog44OX44Ot44Oi44O844K344On44Oz44Ko44Oq44Ki5YaF44Gn44GC44KL44GL5Yik5YilXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Oe44K555uuXG5cdCAqL1xuXHRjaGVja0NhblByb21vKHBhbmVsKXtcblx0XHRjb25zdCB7eUxlbn0gPSB0aGlzO1xuXHRcdGNvbnN0IHtwaWVjZSwgcFgsIHBZfSA9IHBhbmVsO1xuXHRcdGNvbnN0IHtkZWd9ID0gcGllY2U7XG5cblx0XHRjb25zdCBbcHJvbW9MaW5lLCBmb3JjZVByb21vTGluZV0gPSBbXG5cdFx0XHRwaWVjZS5nYW1lLnByb21vTGluZSxcblx0XHRcdHBpZWNlLmZvcmNlUHJvbW9MaW5lXG5cdFx0XS5tYXAobGluZT0+eUxlbi1saW5lLSgwfHRoaXMucHJvbW9MaW5lT2Zmc2V0KSk7XG5cblx0XHRsZXQgcm93O1xuXHRcdGlmKCF0aGlzLnNpZGVQcm9tbyl7XG5cdFx0XHRyb3cgPSB0aGlzLmdldFJvdyhwWCwgcFksIGRlZyk7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRyb3cgPSBNYXRoLm1heChcblx0XHRcdFx0Li4uT2JqZWN0LmtleXMoUGllY2UuZGVnQ2hhcnMpXG5cdFx0XHRcdC5tYXAoZD0+MHxkKVxuXHRcdFx0XHQuZmlsdGVyKGQ9PmQhPT1kZWcpXG5cdFx0XHRcdC5tYXAoXG5cdFx0XHRcdFx0ZD0+dGhpcy5nZXRSb3cocFgsIHBZLCBkLCAxODApXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB7XG5cdFx0XHRjYW5Qcm9tbzogcHJvbW9MaW5lIDw9IHJvdyxcblx0XHRcdGZvcmNlUHJvbW86IGZvcmNlUHJvbW9MaW5lIDw9IHJvd1xuXHRcdH07XG5cdH1cblxuXHQvKiog5pWX5YyX44GX44Gf44OX44Os44Kk44Ok44O844GM5a2Y5Zyo44GZ44KL44GL56K66KqN44GX44CB44Kk44OZ44Oz44OI44KS55m655Sf44GV44Gb44KLICovXG5cdCNlbWl0R2FtZU92ZXIoKXtcblx0XHRbLi4udGhpcy5nYW1lQWxpdmVzXS5mb3JFYWNoKChbZGVnLCBnYW1lQWxpdmVdLCBpKT0+e1xuXHRcdFx0aWYoIWdhbWVBbGl2ZSkgcmV0dXJuO1xuXHRcdFx0aWYodGhpcy5maWVsZC5zb21lKHJvdz0+XG5cdFx0XHRcdHJvdy5zb21lKCh7cGllY2V9KT0+XG5cdFx0XHRcdFx0cGllY2Vcblx0XHRcdFx0XHQmJiBwaWVjZS5kZWcgPT09IGRlZ1xuXHRcdFx0XHRcdCYmIHBpZWNlLmhhc0F0dHIoXCJraW5nXCIpXG5cdFx0XHRcdClcblx0XHRcdCkpIHJldHVybjtcblx0XHRcdHRoaXMuZ2FtZUFsaXZlcy5zZXQoZGVnLCBmYWxzZSk7XG5cdFx0XHR0aGlzLm9uR2FtZU92ZXIoaSk7XG5cdFx0fSlcblx0fVxuXG5cdC8qKiDjg5fjg63jg6Ljg7zjgrfjg6fjg7Plh6bnkIZcblx0ICogQHBhcmFtIHtQYW5lbH0gZnJvbVBhbmVsIC0g56e75YuV5YWD44Gu44Oe44K555uuXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHRvUGFuZWwgLSDpgbjmip7kuK3jga7jg57jgrnnm65cblx0ICogQHBhcmFtIHtib29sZWFufSBjYW5Qcm9tbyAtIOaIkOOCi+OBk+OBqOOBjOOBp+OBjeOCi1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlUHJvbW8gLSDmiJDjgorjgpLlvLfliLbjgZnjgotcblx0ICovXG5cdCNwcm9tb0RpYWxvZyhmcm9tUGFuZWwsIHRvUGFuZWwsIGNhblByb21vLCBmb3JjZVByb21vKXtcblx0XHRjb25zdCB7ZnJlZU1vZGV9ID0gdGhpcztcblx0XHRjb25zdCB7cGllY2V9ID0gdG9QYW5lbDtcblxuXHRcdC8vIOODl+ODreODouODvOOCt+ODp+ODs+WHpueQhlxuXHRcdGlmKCFwaWVjZS5wcm9tbyB8fCBwaWVjZS5oYXNBdHRyKFwicHJvbW90ZWRcIikgfHwgIWNhblByb21vKXtcblx0XHRcdHRoaXMuYWRkUmVjb3JkKHRvUGFuZWwsIHtmcm9tUGFuZWx9KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZG97XG5cdFx0XHRmb3IoY29uc3QgW2NoYXIsIHtuYW1lfV0gb2YgT2JqZWN0LmVudHJpZXMocGllY2UucHJvbW8pKXtcblx0XHRcdFx0aWYoY29uZmlybShg5oiQ44KK44G+44GZ44GLP1xuXHQke3BpZWNlLmNoYXJ9OiR7cGllY2UubmFtZX1cblx044CA4oaTXG5cdCR7Y2hhcn06JHtuYW1lfWApKXtcblx0XHRcdFx0XHR0aGlzLmFkZFJlY29yZCh0b1BhbmVsLCB7ZnJvbVBhbmVsLCBlbmQ6XCLmiJBcIn0pO1xuXHRcdFx0XHRcdHBpZWNlLnByb21vdGlvbihjaGFyKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IHdoaWxlKCFmcmVlTW9kZSAmJiBmb3JjZVByb21vKTtcblx0XHR0aGlzLmFkZFJlY29yZCh0b1BhbmVsLCB7ZnJvbVBhbmVsLCBlbmQ6XCLkuI3miJBcIn0pO1xuXHR9XG5cblx0LyoqIOmnkuOCkuenu+WLlVxuXHQgKiBAcGFyYW0ge1BhbmVsfSBmcm9tUGFuZWwgLSDnp7vli5XlhYPjga7jg57jgrnnm65cblx0ICogQHBhcmFtIHtQYW5lbH0gdG9QYW5lbCAtIOmBuOaKnuS4reOBruODnuOCueebrlxuXHQgKi9cblx0bW92ZVBpZWNlKGZyb21QYW5lbCwgdG9QYW5lbCl7XG5cdFx0Y29uc3Qge3N0YW5kLCBmcmVlTW9kZSwgZW5QYXNzYW50fSA9IHRoaXM7XG5cblx0XHRpZighZnJvbVBhbmVsXG5cdFx0XHR8fCB0b1BhbmVsLmhhc0F0dHIoXCJrZWVwT3V0XCIpXG5cdFx0XHR8fCB0b1BhbmVsLnBpZWNlID09PSBmcm9tUGFuZWwucGllY2Vcblx0XHRcdHx8IHRvUGFuZWwucGllY2U/LmRlZyA9PT0gZnJvbVBhbmVsLnBpZWNlLmRlZ1xuXHRcdFx0fHwgIXRoaXMuZnJlZU1vZGUgJiYgIXRvUGFuZWwuaXNUYXJnZXRcblx0XHQpIHJldHVybjtcblxuXHRcdGxldCB7Y2FuUHJvbW8sIGZvcmNlUHJvbW99ID0gdGhpcy5jaGVja0NhblByb21vKGZyb21QYW5lbCk7XG5cblx0XHRzdGFuZC5jYXB0dXJlUGllY2UoXG5cdFx0XHRmcm9tUGFuZWwucGllY2UsXG5cdFx0XHR0b1BhbmVsLnBpZWNlLFxuXHRcdFx0dG9QYW5lbC5oYXNBdHRyKFwiY2FwdHVyZVwiKSxcblx0XHRcdHRvUGFuZWwuaGFzQXR0cihcImNhbnRDYXB0dXJlXCIpXG5cdFx0KTtcblxuXHRcdHRvUGFuZWwucGllY2UgPSBmcm9tUGFuZWwucGllY2U7XG5cdFx0ZnJvbVBhbmVsLnBpZWNlID0gbnVsbDtcblxuXHRcdGNvbnN0IHtwaWVjZX0gPSB0b1BhbmVsO1xuXHRcdHBpZWNlLmNlbnRlciA9IHRvUGFuZWwuY2VudGVyO1xuXHRcdHBpZWNlLm1pZGRsZSA9IHRvUGFuZWwubWlkZGxlO1xuXHRcdHBpZWNlLmlzTW92ZWQgPSB0cnVlO1xuXG5cdFx0Y29uc3QgYWZ0ZXJQcm9tbyA9IHRoaXMuY2hlY2tDYW5Qcm9tbyh0b1BhbmVsKTtcblx0XHRjYW5Qcm9tbyB8fD0gYWZ0ZXJQcm9tby5jYW5Qcm9tbztcblx0XHRmb3JjZVByb21vIHx8PSBhZnRlclByb21vLmZvcmNlUHJvbW87XG5cblx0XHQvLyDjgqLjg7Pjg5Hjg4PjgrXjg7Ncblx0XHRlblBhc3NhbnQuc2V0TW92ZWQodG9QYW5lbCk7XG5cblx0XHQvLyDjg5fjg63jg6Ljg7zjgrfjg6fjg7Plh6bnkIZcblx0XHR0aGlzLiNwcm9tb0RpYWxvZyhmcm9tUGFuZWwsIHRvUGFuZWwsIGNhblByb21vLCBmb3JjZVByb21vKTtcblxuXHRcdC8vIOODl+ODrOOCpOODpOODvOOBruOCsuODvOODoOOCquODvOODkOODvOWIpOWumlxuXHRcdHRoaXMuI2VtaXRHYW1lT3ZlcigpO1xuXHR9XG5cblx0LyoqIOaji+itnOOCkui/veiomFxuXHQgKiBAcGFyYW0ge1BhbmVsfSB0b1BhbmVsIC0g56e75YuV5YWI44Gu44Oe44K555uuXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24gLSDjgqrjg5fjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtQYW5lbH0gb3B0aW9uLmZyb21QYW5lbCAtIOenu+WLleWFg+OBruODnuOCueebrlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uLmVuZCAtIOOCquODl+OCt+ODp+ODsz3miJB85LiN5oiQfOaJk1xuXHQgKi9cblx0YWRkUmVjb3JkKHRvUGFuZWwsIG9wdGlvbj17fSl7XG5cdFx0Y29uc3Qge2Zyb21QYW5lbCwgZW5kPVwiXCJ9ID0gb3B0aW9uO1xuXHRcdGNvbnN0IHtwaWVjZX0gPSB0b1BhbmVsO1xuXG5cdFx0dGhpcy5yZWNvcmQucHVzaCh7XG5cdFx0XHR0bzoge1xuXHRcdFx0XHRwWDogdG9QYW5lbC5wWCxcblx0XHRcdFx0cFk6IHRvUGFuZWwucFksXG5cdFx0XHR9LFxuXHRcdFx0ZnJvbToge1xuXHRcdFx0XHRwWDogZnJvbVBhbmVsPy5wWCxcblx0XHRcdFx0cFk6IGZyb21QYW5lbD8ucFlcblx0XHRcdH0sXG5cdFx0XHRkZWc6IHBpZWNlLmRlZyxcblx0XHRcdHBpZWNlQ2hhcjogcGllY2UuY2hhcixcblx0XHRcdGVuZFxuXHRcdH0pO1xuXHR9XG5cblx0LyoqIOaji+itnOOCkuODhuOCreOCueODiOOBp+WPluW+l1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0Z2V0VGV4dFJlY29yZCgpe1xuXHRcdGNvbnN0IGdldFBYID0gKHtwWH0pPT4gcFg9PW51bGw/IFwiKlwiOiAodGhpcy54TGVuLXBYKS50b1N0cmluZygzNik7XG5cdFx0Y29uc3QgZ2V0UFkgPSAoe3BZfSk9PiBwWT09bnVsbD8gXCIqXCI6IChwWSsxKS50b1N0cmluZygzNik7XG5cdFx0cmV0dXJuIHRoaXMucmVjb3JkLm1hcChcblx0XHRcdCh7dG8sIGZyb20sIGRlZywgcGllY2VDaGFyLCBlbmR9KT0+YCR7XG5cdFx0XHRcdFBpZWNlLmRlZ0NoYXJzW2RlZ119JHtcblx0XHRcdFx0Z2V0UFgodG8pfSR7XG5cdFx0XHRcdGdldFBZKHRvKX0ke1xuXHRcdFx0XHRwaWVjZUNoYXJ9JHtcblx0XHRcdFx0ZW5kfSAoJHtcblx0XHRcdFx0Z2V0UFgoZnJvbSl9JHtcblx0XHRcdFx0Z2V0UFkoZnJvbSl9KWBcblx0XHQpLmpvaW4oXCJcXG5cIik7XG5cdH1cblxuXHQvKiog55uk44KS5o+P5YaZICovXG5cdGRyYXcoKXtcblx0XHRjb25zdCB7Y3R4LCBjYW52YXMsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgcGFuZWxXaWR0aCwgcGFuZWxIZWlnaHR9ID0gdGhpcztcblxuXHRcdC8vIOaPj+WGmeOCkuWIneacn+WMllxuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IHRoaXMuY2FudmFzQmFja2dyb3VuZENvbG9yO1xuXHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG5cdFx0Ly8g5aSW5p6g44KS5o+P5YaZXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuXHRcdGN0eC5saW5lV2lkdGggPSB0aGlzLmJvcmRlcldpZHRoO1xuXHRcdGN0eC5zdHJva2VTdHlsZSA9IHRoaXMuYm9yZGVyQ29sb3I7XG5cblx0XHRjdHguc2F2ZSgpO1xuXHRcdGN0eC50cmFuc2xhdGUobGVmdCwgdG9wKTtcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0Y3R4LnN0cm9rZVJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZShwYW5lbFdpZHRoLzIsIHBhbmVsSGVpZ2h0LzIpO1xuXHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLXBhbmVsV2lkdGgsIGhlaWdodC1wYW5lbEhlaWdodCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblx0XHR0aGlzLnN0YW5kLmRyYXcoKTtcblxuXHRcdC8vIOODnuOCueebruOCkuaPj+WGmVxuXHRcdHRoaXMuZmllbGQuZm9yRWFjaChyb3c9Pntcblx0XHRcdHJvdy5mb3JFYWNoKHBhbmVsPT57XG5cdFx0XHRcdHBhbmVsLmRyYXcoKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHRcdGlmKHRoaXMub25EcmF3ZWQpIHRoaXMub25EcmF3ZWQodGhpcyk7XG5cdH1cblxuXHQvKiogQk9E5b2i5byP44OG44Kt44K544OI44KS5Y+W5b6XXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRnZXQgYm9kVGV4dCgpe1xuXHRcdHJldHVybiBCb2QuZ2V0VGV4dCh0aGlzKTtcblx0fVxuXG5cdC8qKiDpp5LphY3nva7jgpLjg4bjgq3jgrnjg4jjgaflj5blvpdcblx0ICoge2Jvb2xlYW59IGlzTWluaW1hbSAtIOe4ruWwj+ihqOekulxuXHQgKi9cblx0dG9TdHJpbmcoaXNNaW5pbWFtPWZhbHNlKXtcblx0XHRjb25zdCB7eExlbn0gPSB0aGlzO1xuXG5cdFx0bGV0IGhlYWRlciA9IFwiXCI7XG5cdFx0bGV0IGZvb3RlciA9IFwiXCI7XG5cdFx0bGV0IHBhbmVsT3V0ZXIgPSBcIlwiO1xuXHRcdGxldCBwYW5lbFNlcCA9IFwiXCI7XG5cdFx0bGV0IHJvd1NlcCA9IFwiXFxuXCI7XG5cblx0XHRpZighaXNNaW5pbWFtKXtcblx0XHRcdGhlYWRlciA9IGDilI8ke0FycmF5KHhMZW4pLmZpbGwoXCLilIHilIFcIikuam9pbihcIuKUr1wiKX3ilJNcXG5gO1xuXHRcdFx0Zm9vdGVyID0gYFxcbuKUlyR7QXJyYXkoeExlbikuZmlsbChcIuKUgeKUgVwiKS5qb2luKFwi4pS3XCIpfeKUm2A7XG5cdFx0XHRwYW5lbE91dGVyID0gXCLilINcIjtcblx0XHRcdHBhbmVsU2VwID0gXCLilIJcIjtcblx0XHRcdHJvd1NlcCA9IGBcXG7ilKAke0FycmF5KHhMZW4pLmZpbGwoXCLilIDilIBcIikuam9pbihcIuKUvFwiKX3ilKhcXG5gO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHRoZWFkZXIrXG5cdFx0XHR0aGlzLmZpZWxkLm1hcChyb3c9PlxuXHRcdFx0XHRwYW5lbE91dGVyK1xuXHRcdFx0XHRyb3cubWFwKHBhbmVsPT5cblx0XHRcdFx0XHRcIlwiKyhwYW5lbC5waWVjZSA/PyBwYW5lbC50b1N0cmluZyhpc01pbmltYW0pKVxuXHRcdFx0XHQpLmpvaW4ocGFuZWxTZXApK1xuXHRcdFx0XHRwYW5lbE91dGVyXG5cdFx0XHQpLmpvaW4ocm93U2VwKStcblx0XHRcdGZvb3Rlcitcblx0XHRcdHRoaXMuc3RhbmQudG9TdHJpbmcoaXNNaW5pbWFtKVxuXHRcdCk7XG5cdH1cblxuXHQvKiog55S75YOP44KS5Y+W5b6XXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlTmFtZSAtIOODleOCoeOCpOODq+WQjVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZXh0IC0g5ouh5by15a2QXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuXHQgKi9cblx0YXN5bmMgZG93bmxvYWRJbWFnZShmaWxlTmFtZSwgZXh0KXtcblx0XHRhd2FpdCBkb3dubG9hZEltYWdlKHRoaXMuY2FudmFzLCBmaWxlTmFtZSwgZXh0KTtcblx0fVxufVxuIl0sIm5hbWVzIjpbImJhc2UiLCJpbXBvcnRKc29uIiwibmFtZSIsInJlcyIsImNhbnZhc0ZvbnQiLCJnYW1lU29mdCIsImdhbWVzIiwiYm9hcmRzIiwicGFuZWxzIiwicGllY2VzIiwicGllY2VSYW5nZSIsInBpZWNlQ29zdCIsImdldENoYXJzIiwiZGlzcGxheVRleHQiLCJkaXNwbGF5IiwiZ29vZ2xlVXJsIiwiY2hhcnMiLCJ1bmlxdWUiLCJvIiwiZm9udE5hbWUiLCJmb250V2VpZ2h0IiwiZm9udE5hbWVQbHVzIiwiZm9udFVybCIsIm1hdGNoVXJscyIsInVybCIsImZvbnRGYWNlIiwiXyIsImxvYWRJbWFnZSIsInNyYyIsInJlc29sdmUiLCJpbWFnZSIsImltZ1NyY3MiLCJpbWdTcmMiLCJjYW52YXNJbWFnZSIsImdldE1pbWUiLCJleHQiLCJkb3dubG9hZEltYWdlIiwiY2FudmFzIiwiZmlsZU5hbWUiLCJ1cmxUeXBlIiwibWltZSIsImEiLCJQYW5lbCIsIiNpc1NlbGVjdGVkIiwiI3RhcmdldFJhbmdlcyIsImN0eCIsImNoYXIiLCJjZW50ZXIiLCJtaWRkbGUiLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlcldpZHRoIiwicFgiLCJwWSIsInZhbHVlIiwicmFuZ2VOYW1lIiwiYXR0ck5hbWUiLCJ4IiwieSIsInNlbGVjdENvbG9yIiwidGFyZ2V0Q29sb3IiLCJsZWZ0IiwidG9wIiwidGV4dFJvdGF0ZSIsInJhZCIsImZvbnRTaXplIiwiY29sb3IiLCJpc01pbmltYW0iLCJQaWVjZSIsIm9wdGlvbiIsImV4UGllY2VzIiwicGllY2UiLCJwcm9tb0tleXMiLCJrZXkiLCJwcm9tbyIsImkiLCJleFBpZWNlc09iaiIsImFsaWFzS2V5IiwiYWxpYXMiLCJ0ZXh0IiwiZGVnQ2hhciIsInBpZWNlQ2hhciIsImRlZyIsIl9fIiwiYiIsInpvb20iLCJkaXNwbGF5UHRuIiwic2l6ZSIsInVzZVJhbmtTaXplIiwiaXNEcmF3U2hhZG93IiwiaXNNb3ZlZCIsInJuZyIsInJvdyIsImUiLCJyYW5nZSIsInRyYW5zcG9zZSIsImMiLCJyIiwiaW1nV2lkdGgiLCJpbWdIZWlnaHQiLCJnYW1lIiwiZm9udENvbG9yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJ2IiwicmFuZ2VPcHRpb25zIiwiY2VudGVyQ2hhcnMiLCJwb2ludENoYXJzIiwibGluZXJDaGFycyIsImdldE9yaWdpbiIsIm9MaXN0Iiwib3duWCIsIm93blkiLCJyWSIsInJYIiwickNoYXIiLCJpc093biIsImNoZWNrVGFyZ2V0IiwiYm9hcmQiLCJmaWVsZCIsInlMZW4iLCJlblBhc3NhbnQiLCJpbkZpZWxkIiwiaXNWc1BvIiwicGFuZWwiLCJpc0F0dGFja0Zyb21QYW8iLCJjYW5Nb3ZlIiwiaXNBdHRhY2siLCJjaGVja1JpdmFsRGVnIiwiZXhpc3RzQ2hpbGQiLCJjaGlsZCIsIm9YIiwib1kiLCJzZXRUYXJnZXQiLCJtb3ZlUG9pbnQiLCJwYXJlbnQiLCJtb3ZlTGluZXIiLCJvZmZzZXRYIiwib2Zmc2V0WSIsImptcHMiLCJtb3ZlcyIsImlzTW92ZUluZiIsImptcENudCIsIm1vdmVDbnQiLCJpbmNYIiwiaW5jWSIsIl94IiwiX3kiLCJpc0p1bXBlZCIsInJhbmdlTWFwIiwicmFuZ2VPcHRpb24iLCJvcmlnaW4iLCJ1SUNvbnRyb2wiLCJpc0NsaWNrIiwibGFzdFhZIiwic2VsZWN0UGFuZWwiLCJzZWxlY3RTdGFuZCIsImZpZWxkUHJvYyIsImZuUGFuZWwiLCJmbkFmdGVyIiwidmlld1N0eWxlIiwicmVjdCIsImRyYWdTdGFydCIsInN0b2NrIiwiZHJhZ01vdmUiLCJkcmFnRW5kIiwiQm9kIiwiI2RlZzJQaWVjZUNoYXJzIiwiI2RlZzJQaWVjZVJlZ2V4ZXMiLCIjcGllY2VDaGFyMkRlZ3MiLCIjZGVnMlN0YW5kVGl0bGVzIiwiI3N0YW5kVGl0bGUyRGVncyIsIiNrYW5JIiwiI2thblgiLCIjbnVtMkthbiIsIm51bSIsInZpZXdPbmUiLCIja2FuMk51bSIsImthbiIsImVtcHR5T25lIiwiI251bTJaZW4iLCJ6ZW4iLCIjcGFuZWxUZXh0IiwiI2dldFBpZWNlVGV4dCIsIiNnZXRTdGFuZFRleHQiLCJzdGFuZCIsImNvdW50ZXIiLCJjbnQiLCJib2FyZExpbmVzIiwic3RhbmRMaW5lcyIsImxpbmUiLCJ0aXRsZSIsImJvYXJkU3RyIiwiYm9kQ2hhciIsInN0YW5kU3RyIiwicGFyYW1TdHIiLCJwYXJhbSIsInhMZW4iLCJwbGF5ZXJzIiwiaGVhZGVyIiwiZm9vdGVyIiwicGFuZWxPdXRlciIsInBhbmVsU2VwIiwicm93U2VwIiwic3RhbmRIZWFkZXIiLCJzdGFuZEZvb3RlciIsIlN0YW5kIiwiI2RlZ09yZGVyIiwicmlnaHQiLCJib3R0b20iLCJwYW5lbFdpZHRoIiwicGFuZWxIZWlnaHQiLCJ0b1BhbmVsIiwid2lubmVyUGllY2UiLCJsb3NlclBpZWNlIiwiZm9yY2VDYXB0dXJlIiwiZm9yY2VDYW50Q2FwdHVyZSIsInBpdGNoV2lkdGgiLCJwaXRjaEhlaWdodCIsInBsYXllciIsImhlYWQiLCJkZWdzIiwiZ2V0SW5pdCIsIkVuUGFzc2FudCIsImVwIiwiQm9hcmQiLCJwbGF5Qm9hcmQiLCJwbGF5UGllY2VzIiwib25EcmF3ZWQiLCJnYW1lTmFtZSIsInBpZWNlU2V0IiwiY2FudmFzV2lkdGgiLCJjYW52YXNIZWlnaHQiLCJjYW52YXNGaXQiLCJib2FyZExlZnQiLCJib2FyZFRvcCIsInBpZWNlU2l6ZSIsInVzZVN0YW5kIiwiYXV0b0RyYXdpbmciLCJvbkdhbWVPdmVyIiwiZnJlZU1vZGUiLCJjYW52YXNGb250QXN5bmMiLCJjYW52YXNJbWFnZUFzeW5jIiwic3R5bGUiLCIjZGVnTm9ybWFsIiwicGxheWVhSWRPckRlZyIsInBsYXllcklkIiwicG9zIiwic3RhbmRUaXRsZSIsInRleHRzIiwic3RhbmRUZXh0cyIsIm9mZnNldERlZyIsInByb21vTGluZSIsImZvcmNlUHJvbW9MaW5lIiwiZCIsIiNlbWl0R2FtZU92ZXIiLCJnYW1lQWxpdmUiLCIjcHJvbW9EaWFsb2ciLCJmcm9tUGFuZWwiLCJjYW5Qcm9tbyIsImZvcmNlUHJvbW8iLCJhZnRlclByb21vIiwiZW5kIiwiZ2V0UFgiLCJnZXRQWSIsInRvIiwiZnJvbSJdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTUEsSUFBTztBQUNiLGVBQWVDLEVBQVdDLEdBQUs7QUFDOUIsU0FBTyxNQUFNLE1BQU0sR0FBR0YsQ0FBSSxHQUFHRSxDQUFJLE9BQU8sRUFDdEMsS0FBSyxPQUFNQyxNQUNKLE1BQU1BLEVBQUksS0FBTSxDQUN2QixFQUNBLE1BQU0sTUFBSTtBQUFBLEVBQUEsQ0FBRTtBQUNmO0FBU1ksTUFBQ0MsSUFBYSxNQUFNSCxFQUFXLFlBQVksR0FZMUNJLEtBQVcsTUFBTUosRUFBVyxVQUFVLEdBaUJ0Q0ssSUFBUSxNQUFNTCxFQUFXLE9BQU8sR0EwQmhDTSxJQUFTLE1BQU1OLEVBQVcsUUFBUSxHQXFCbENPLElBQVMsTUFBTVAsRUFBVyxRQUFRLEdBMkJsQ1EsSUFBUyxNQUFNUixFQUFXLFFBQVEsR0FTbENTLElBQWEsTUFBTVQsRUFBVyxZQUFZLEdBTTFD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
