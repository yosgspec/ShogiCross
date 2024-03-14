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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvZ2lDcm9zcy5qcyIsInNvdXJjZXMiOlsiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvanNvbkZldGNoLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvY2FudmFzRm9udExvYWRlci5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2NhbnZhc0ltYWdlTG9hZGVyLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvZG93bmxvYWRJbWFnZS5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL3BhbmVsLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvcGllY2UuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9jaGVja1RhcmdldC5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL3VpQ29udHJvbC5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2JvZC5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL3N0YW5kLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvZW5QYXNzYW50LmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvYm9hcmQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYmFzZSA9ICcuL2pzb24vU2hvZ2lDcm9zcy8nO1xuYXN5bmMgZnVuY3Rpb24gaW1wb3J0SnNvbihuYW1lKXtcblx0cmV0dXJuIGF3YWl0IGZldGNoKGAke2Jhc2V9JHtuYW1lfS5qc29uYClcblx0XHQudGhlbihhc3luYyByZXM9Pntcblx0XHRcdHJldHVybiBhd2FpdCByZXMuanNvbigpXG5cdFx0fSlcblx0XHQuY2F0Y2goKCk9Pnt9KVxufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhbnZhc0ZvbnRcbiAqIEBwcm9wIHt7Zm9udE5hbWU6IHN0cmluZywgZm9udFdlaWdodDogbnVtYmVyfVtdfSBmb250cyAtIHtmb250TmFtZTog44OV44Kp44Oz44OI5ZCNLCBmb250V2VpZ2h0OiDjg5Xjgqnjg7Pjg4jjga7lpKrjgZV9XG4gKi9cbi8qKiBDYW52YXPnlKjjga5Hb29nbGXjg5Xjgqnjg7Pjg4jmg4XloLFcbiAqIEB0eXBlIHtDYW52YXNGb250fVxuICovXG5leHBvcnQgY29uc3QgY2FudmFzRm9udCA9IGF3YWl0IGltcG9ydEpzb24oXCJjYW52YXNGb250XCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEdhbWVTb2Z0XG4gKiBAcHJvcCB7c3RyaW5nfSBuYW1lIC0g44Ky44O844Og5ZCNXG4gKiBAcHJvcCB7c3RyaW5nfSBwbGF5Qm9hcmQgLSDkvb/nlKjjgZnjgovjg5zjg7zjg4nlkI1cbiAqIEBwcm9wIHtib29sZWFufSB1c2VTdGFuZCAtIOmnkuWPsOOBruS9v+eUqOacieeEoVxuICogQHByb3Age3tnYW1lTmFtZTogc3RyaW5nLCBwaWVjZVNldDogc3RyaW5nfVtdfSBwbGF5UGllY2VzIC0ge2dhbWVOYW1lOiDjgrLjg7zjg6DlkI0sIHBpZWNlU2V0OiDpp5Ljgrvjg4Pjg4jjga7lkI3np7B9XG4gKi9cbi8qKiDjgrLjg7zjg6Dmg4XloLEo44Oc44O844OJK+mnkinjga7jg5fjg6rjgrvjg4Pjg4hcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBHYW1lU29mdD59XG4gKi9cbmV4cG9ydCBjb25zdCBnYW1lU29mdCA9IGF3YWl0IGltcG9ydEpzb24oXCJnYW1lU29mdFwiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiBHYW1lXG4gKiBAcHJvcCB7c3RyaW5nfSBlbmdsaXNoIC0g6Iux6Kqe5ZCNXG4gKiBAcHJvcCB7c3RyaW5nfSBmb250Q29sb3IgLSDpp5Ljga7jg5Xjgqnjg7Pjg4joibJcbiAqIEBwcm9wIHtzdHJpbmd9IHByb21vdGVGb250Q29sb3IgLSDmiJDpp5Ljga7jg5Xjgqnjg7Pjg4joibJcbiAqIEBwcm9wIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIOmnkuOBruiJslxuICogQHByb3Age3N0cmluZ30gcHJvbW90ZUJhY2tncm91bmRDb2xvciAtIOaIkOmnkuOBruiJslxuICogQHByb3Age3N0cmluZ30gYm9yZGVyQ29sb3IgLSDpp5Ljga7mnqDoibJcbiAqIEBwcm9wIHtzdHJpbmd9IHByb21vdGVCYWNrZ3JvdW5kQ29sb3IgLSDmiJDpp5Ljga7mnqDoibJcbiAqIEBwcm9wIHtudW1iZXJ9IHByb21vTGluZSAtIOODl+ODreODouODvOOCt+ODp+ODs+ODqeOCpOODsyjmiJDjgorjga7mrrUpXG4gKiBAcHJvcCB7T2JqZWN0PHN0cmluZywgT2JqZWN0PHN0cmluZywgc3RyaW5nW10+Pn0gcG9zaXRpb24gLSDpp5Ljga7phY3nva7jg4fjg7zjgr9cbiAqL1xuLyoqIOOCsuODvOODoOOBrueorumhnuOBq+WFsemAmuOBmeOCi+mnkuaDheWgseOChOmnkumFjee9ruaDheWgsVxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIEdhbWU+fVxuICovXG5leHBvcnQgY29uc3QgZ2FtZXMgPSBhd2FpdCBpbXBvcnRKc29uKFwiZ2FtZXNcIik7XG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIHtPYmplY3R9IEJvYXJkSW5pdE9wdGlvbiAtIOODnOODvOODieOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuXHQgKiBAcHJvcCB7bnVtYmVyfSBjYW52YXNXaWR0aCAtIENhbnZhc+W5hVxuXHQgKiBAcHJvcCB7bnVtYmVyfSBjYW52YXNIZWlnaHQgLSBDYW52YXPpq5jjgZVcblx0ICogQHByb3Age2NhbnZhc0ZpdH0gY2FudmFzRml0IC0gQ2FudmFz44K144Kk44K644Gu6Ieq5YuV6Kq/5pW0XG5cdCAqIEBwcm9wIHtudW1iZXJ9IGJvYXJkTGVmdCAtIOaPj+WGmeOBmeOCi1jluqfmqJlcblx0ICogQHByb3Age251bWJlcn0gYm9hcmRUb3AgLSDmj4/lhpnjgZnjgotZ5bqn5qiZXG5cdCAqIEBwcm9wIHtudW1iZXJ9IHBhbmVsV2lkdGggLSDjg57jgrnnm67luYVcblx0ICogQHByb3Age251bWJlcn0gcGFuZWxIZWlnaHQgLSDjg57jgrnnm67pq5jjgZVcblx0ICogQHByb3Age251bWJlcn0gcGllY2VTaXplIC0g6aeS44Gu5aSn44GN44GVXG5cdCAqIEBwcm9wIHtib29sZWFufSB1c2VSYW5rU2l6ZSAtIOmnkuOBruWkp+OBjeOBleOCkuagvOOBrumBleOBhOOBp+WkieabtOOBmeOCi1xuXHQgKiBAcHJvcCB7Ym9vbGVhbn0gaXNEcmF3U2hhZG93IC0g6aeS44Gu5b2x44Gu5o+P5YaZ5pyJ54ShXG5cdCAqIEBwcm9wIHtudW1iZXJ9IGJvcmRlcldpZHRoIC0g5p6g57ea5aSq44GVXG5cdCAqIEBwcm9wIHtib29sZWFufSB1c2VTdGFuZCAtIOmnkuWPsOOBruS9v+eUqOacieeEoVxuXHQgKiBAcHJvcCB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSDog4zmma/oibIo44OH44OV44Kp44Or44OI54Sh6ImyKVxuXHQgKiBAcHJvcCB7Ym9vbGVhbn0gYXV0b0RyYXdpbmcgLSDmj4/lhpnjga7oh6rli5Xmm7TmlrDmnInnhKFcblx0ICogQHByb3AgeyhCb2FyZCk9PnZvaWR9IG9uRHJhd2VkIC0g5o+P5YaZ44Kk44OZ44Oz44OIXG5cdCAqIEBwcm9wIHsoaSk9PnZvaWR9IG9uR2FtZU92ZXIgLSDjgrLjg7zjg6Djgqrjg7zjg5Djg7zjgqTjg5njg7Pjg4hcblx0ICogQHByb3Age2Jvb2xlYW59IGZyZWVNb2RlIC0g44OV44Oq44O844Oi44O844OJ5pyJ5Yq55YyWL+eEoeWKueWMllxuXHQgKi9cblx0LyoqXG5cdCAqIOODnOODvOODieOBruani+aIkOaDheWgsVxuXHQgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgQm9hcmRJbml0T3B0aW9uPn1cblx0ICovXG5leHBvcnQgY29uc3QgYm9hcmRzID0gYXdhaXQgaW1wb3J0SnNvbihcImJvYXJkc1wiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYW5lbEluaXRPcHRpb24gLSDjg57jgrnnm67jga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7NcbiAqIEBwcm9wIHtzdHJpbmd9IG5hbWUgLSDjg57jgrnnm67jga7lkI3liY1cbiAqIEBwcm9wIHtzdHJpbmd9IHRleHQgLSDjg5zjg7zjg4nooajnpLrmloflrZfliJdcbiAqIEBwcm9wIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIOODnuOCueebruOBruiJslxuICogQHByb3Age3N0cmluZ30gYm9yZGVyQ29sb3IgLSDmnqDoibLlj4rjgbPjg5Xjgqnjg7Pjg4joibJcbiAqIEBwcm9wIHtzdHJpbmd9IHNlbGVjdENvbG9yIC0g6YG45oqe44GX44Gf5pmC44Gu6ImyXG4gKiBAcHJvcCB7c3RyaW5nfSB0YXJnZXRDb2xvciAtIOmnkuOCkumBuOaKnuOBl+OBn+aZguOBruiJslxuICogQHByb3Age3N0cmluZ30gZGlzcGxheVRleHQgLSDooajnpLrjgZnjgovmloflrZcoMeaWh+WtlylcbiAqIEBwcm9wIHtudW1iZXJ9IHRleHRSb3RhdGUgLSDooajnpLrjgZnjgovmloflrZfjga7lm57ou6Lop5IoZGVnKVxuICogQHByb3Age2Jvb2xlYW59IGJvcmRlclNsYXNoTGVmdCAtIOW3puaWnOe3mijvvLwp44Gu5pyJ54ShXG4gKiBAcHJvcCB7Ym9vbGVhbn0gYm9yZGVyU2xhc2hSaWdodCAtIOWPs+aWnOe3mijvvI8p44Gu5pyJ54ShXG4gKiBAcHJvcCB7Ym9vbGVhbn0gaW50ZXJzZWN0IC0g5Lqk54K544KS5Lit5b+D44Go44GZ44KLXG4gKiBAcHJvcCB7c3RyaW5nW119IGF0dHIgLSDjg57jgrnnm67jga7mqZ/og73jga7lsZ7mgKdcbiAqL1xuLyoqXG4gKiDjg5zjg7zjg4nkuK3jga7jg57jgrnnm67mg4XloLFcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBQYW5lbEluaXRPcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBwYW5lbHMgPSBhd2FpdCBpbXBvcnRKc29uKFwicGFuZWxzXCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBpZWNlSW5pdE9wdGlvbiAtIOmnkuOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuICogQHByb3Age3N0cmluZ30gbmFtZSAtIOmnkuOBruWQjeWJjVxuICogQHByb3Age3N0cmluZ1tdfSBkaXNwbGF5IC0g6aeS44Gr6KGo56S644GZ44KL5paH5a2X5YiXKDHjgIEy5paH5a2XKeOBrumFjeWIl1xuICogQHByb3Age3N0cmluZ30gaW1nU3JjIC0g6aeS44Go44GX44Gm6KGo56S644GZ44KL55S75YOP44OR44K544Gu6YWN5YiXXG4gKiBAcHJvcCB7Ym9vbGVhbn1pc1JvdGF0ZUltZyAtIOmBjueUu+WDj+OCkuioreWumuOBmeOCi+WgtOWQiOWbnui7ouOBmeOCi+OBi1xuICogQHByb3Age3N0cmluZ30gYWxpYXMgLSDjgq3jg7zjga7liKXlkI3jgajjgZfjgablrprjgoHjgovmloflrZfjga7pm4blkIjooahcbiAqIEBwcm9wIHtzdHJpbmd9IGdhbWVOYW1lIC0g6aeS44Gr5a++5b+c44GZ44KL44Ky44O844Og5ZCNXG4gKiBAcHJvcCB7c3RyaW5nfSBleHBhbnNpb24gLSDjgrLjg7zjg6DlkI3jga7ntLDliIbpoZ5cbiAqIEBwcm9wIHtcIuWFtVwifFwi6aasXCJ8XCLosaFcInxcIui7ilwifFwi6IejXCJ8XCLnjotcInxcIuaIkFwifSB1bml0IC0g6aeS44Gu5YW156iuXG4gKiBAcHJvcCB7bnVtYmVyfWZvcmNlUHJvbW9MaW5lIC0g6KGM44GN44Gp44GT44KN44Gu44Gq44GE6aeS44Go44Gq44KL5q61XG4gKiBAcHJvcCB7T2JqZWN0fSByYW5nZSAtIOmnkuOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5kZWZhdWx0IC0g6YCa5bi45pmC44Gu56e75YuV56+E5ZuyXG4gKiBAcHJvcCB7c3RyaW5nW119IHJhbmdlLmF0dGFjayAtIOmnkuWPluW+l+aZguOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5zdGFydCAtIOWIneWbnuOBruOBv+OBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5jYXN0bGluZyAtIOOCreODo+OCueODquODs+OCsOaZguOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5lblBhc3NhbnQgLSDjgqLjg7Pjg5Hjg4PjgrXjg7PmmYLjga7np7vli5Xnr4Tlm7JcbiAqIEBwcm9wIHtzdHJpbmdbXX0gcmFuZ2UucGFsYWNlU2xhc2ggLSDkuZ3lrq7lhoXjgafjga7np7vli5Xnr4Tlm7JcbiAqIEBwcm9wIHtzdHJpbmd9IHByb21vIC0g44OX44Ot44Oi44O844K344On44Oz5YWI44Gu6aeS44Gu5LiA5paH5a2X6KGo6KiYXG4gKiBAcHJvcCB7c3RyaW5nW119IGF0dHIgLSDpp5Ljga7mqZ/og73jga7jg6rjgrnjg4hcbiAqL1xuLyoqXG4gKiDpp5Lmg4XloLFcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBQaWVjZUluaXRPcHRpb24+fVxuICovXG5leHBvcnQgY29uc3QgcGllY2VzID0gYXdhaXQgaW1wb3J0SnNvbihcInBpZWNlc1wiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7c3RyaW5nW119IFBpZWNlUmFuZ2Ug6aeS44Gu56e75YuV56+E5ZuyXG4gKi9cbi8qKlxuICog6aeS44Gu56e75YuV56+E5ZuyXG4gKiBAdHlwZXtPYmplY3Q8c3RyaW5nLCBQaWVjZVJhbmdlPn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlUmFuZ2UgPSBhd2FpdCBpbXBvcnRKc29uKFwicGllY2VSYW5nZVwiKTtcblxuLyoqXG4gKiDpp5Ljga7kvqHlgKRcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBudW1iZXI+fVxuICovXG5leHBvcnQgY29uc3QgcGllY2VDb3N0ID0gYXdhaXQgaW1wb3J0SnNvbihcInBpZWNlQ29zdFwiKTtcbiIsImltcG9ydCB7Y2FudmFzRm9udCwgcGFuZWxzLCBwaWVjZXN9IGZyb20gXCIuL2pzb24uanNcIjtcbmV4cG9ydCB7Y2FudmFzRm9udH07XG5cbi8qKiDoqq3jgb/ovrzjgoDmloflrZfjga7kuIDopqfjgpLlj5blvpdcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGdldENoYXJzID0gKCkgPT4gWy4uLlxuXHRuZXcgU2V0KFsuLi5cblx0XHRPYmplY3QudmFsdWVzKHBhbmVscykubWFwKCh7ZGlzcGxheVRleHR9KT0+ZGlzcGxheVRleHQpLmpvaW4oXCJcIikrXG5cdFx0T2JqZWN0LnZhbHVlcyhwaWVjZXMpLm1hcCgoe2Rpc3BsYXl9KT0+ZGlzcGxheT8gZGlzcGxheS5qb2luKFwiXCIpOiBcIlwiKS5qb2luKFwiXCIpXG5cdF0pXG5dLnNvcnQoKS5qb2luKFwiXCIpO1xuXG4vKiogQ2FudmFz55So44OV44Kp44Oz44OI566h55CGICovXG5PYmplY3QuYXNzaWduKGNhbnZhc0ZvbnQsIHtcblx0LyoqIOiqreOBv+i+vOOBv+a4iOOBv+OBp+OBguOCi+OBiz8gKi9cblx0aW1wb3J0ZWQ6IGZhbHNlLFxuXG5cdC8qKiDoqq3jgb/ovrzjgoDjg5Xjgqnjg7Pjg4jjga7kuIDopqcoXCIsXCLljLrliIfjgoopXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRuYW1lczogXCJcIixcblxuXHQvKiog44OV44Kp44Oz44OI44Gu6Kqt44G/6L6844G/XG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuXHQgKi9cblx0YXN5bmMgaW1wb3J0QXN5bmMoKXtcblx0XHRpZih0aGlzLmltcG9ydGVkKSByZXR1cm47XG5cdFx0Y29uc3QgZ29vZ2xlVXJsID0gXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVwiO1xuXHRcdGNvbnN0IGNoYXJzID0gZ2V0Q2hhcnMoKTtcblx0XHRjb25zdCB1bmlxdWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuXHRcdHRoaXMubmFtZXMgPSBjYW52YXNGb250LmZvbnRzLm1hcChvPT5gXCIke29bMF19JHt1bmlxdWV9XCJgKS5qb2luKFwiLFwiKStcIixzZXJpZlwiO1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdGNhbnZhc0ZvbnQuZm9udHMubWFwKGFzeW5jIChbZm9udE5hbWUsIGZvbnRXZWlnaHRdKT0+e1xuXHRcdFx0XHRjb25zdCBmb250TmFtZVBsdXMgPSBmb250TmFtZS5yZXBsYWNlKC8gL2csIFwiK1wiKTtcblx0XHRcdFx0Y29uc3QgZm9udFVybCA9IGAke2dvb2dsZVVybH0ke2ZvbnROYW1lUGx1c306d2dodEAke2ZvbnRXZWlnaHR9JnRleHQ9JHtjaGFyc31gO1xuXHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChmb250VXJsKTtcblx0XHRcdFx0aWYoIXJlcy5vaykgcmV0dXJuO1xuXHRcdFx0XHRjb25zdCBjc3MgPSBhd2FpdCByZXMudGV4dCgpO1xuXHRcdFx0XHRjb25zdCBtYXRjaFVybHMgPSBjc3MubWF0Y2goL3VybFxcKC4rP1xcKS9nKTtcblx0XHRcdFx0aWYoIW1hdGNoVXJscykgdGhyb3cgbmV3IEVycm9yKFwiTm90IGZvdW5kIGZvbnQuXCIpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgdXJsIG9mIG1hdGNoVXJscykge1xuXHRcdFx0XHRcdGNvbnN0IGZvbnRGYWNlID0gbmV3IEZvbnRGYWNlKGAke2ZvbnROYW1lfSR7dW5pcXVlfWAsIHVybCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuZm9udHMuYWRkKGZvbnRGYWNlKTtcblx0XHRcdFx0XHRhd2FpdCBmb250RmFjZS5sb2FkKCkuY2F0Y2goKCk9Pnt9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHQpLnRoZW4oXz0+dGhpcy5pbXBvcnRlZCA9IHRydWUpO1xuXHR9XG59KTtcbiIsImltcG9ydCB7cGFuZWxzLCBwaWVjZXN9IGZyb20gXCIuL2pzb24uanNcIjtcblxuLyoqIOeUu+WDj+iqreOBv+i+vOOBv+WHpueQhlxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIOeUu+WDj+ODkeOCuVxuICogQHJldHVybnMgUHJvbWlzZTxJbWFnZT5cbiAqL1xuZnVuY3Rpb24gbG9hZEltYWdlKHNyYyl7XG5cdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlPT57XG5cdFx0Y29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRpbWFnZS5zcmMgPSBzcmM7XG5cdFx0aW1hZ2Uub25sb2FkID0gKCk9PnJlc29sdmUoaW1hZ2UpO1xuXHR9KTtcbn1cblxuLyoqIOiqreOBv+i+vOOCgOeUu+WDj+ODkeOCueOBruS4gOimp1xuICogQHR5cGUge3N0cmluZ1tdfVxuICovXG5jb25zdCBpbWdTcmNzID0gWy4uLm5ldyBTZXQoXG5cdE9iamVjdC52YWx1ZXMocGFuZWxzKS5mbGF0TWFwKCh7aW1nU3JjfSk9PmltZ1NyYz8/W10pXG5cdC5jb25jYXQoT2JqZWN0LnZhbHVlcyhwaWVjZXMpLmZsYXRNYXAoKHtpbWdTcmN9KT0+aW1nU3JjPz9bXSkpXG4pXTtcblxuLyoqIENhbnZhc+eUqOeUu+WDj+OBrueuoeeQhiAqL1xuZXhwb3J0IGNvbnN0IGNhbnZhc0ltYWdlID0ge1xuXHQvKiog6Kqt44G/6L6844G/5riI44G/44Gn44GC44KL44GLPyAqL1xuXHRpbXBvcnRlZDogZmFsc2UsXG5cblx0LyoqIOiqreOBv+i+vOOCk+OBoOeUu+WDj+ODh+ODvOOCv1xuXHQgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgSW1hZ2U+fVxuXHQgKi9cblx0aW1hZ2VzOiB7fSxcblxuXHQvKiog55S75YOP44Gu6Kqt44G/6L6844G/XG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuXHQgKi9cblx0YXN5bmMgaW1wb3J0QXN5bmMoKXtcblx0XHRpZih0aGlzLmltcG9ydGVkKSByZXR1cm47XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0aW1nU3Jjcy5tYXAoYXN5bmMgc3JjPT57XG5cdFx0XHRcdHRoaXMuaW1hZ2VzW3NyY10gPSBhd2FpdCBsb2FkSW1hZ2Uoc3JjKTtcblx0XHRcdH0pXG5cdFx0KS50aGVuKF89PnRoaXMuaW1wb3J0ZWQgPSB0cnVlKVxuXHR9XG59O1xuXG4iLCJjb25zdCBnZXRNaW1lID0gKGV4dCk9PlxuXHRcImltYWdlL1wiK2V4dC5yZXBsYWNlKFwianBnXCIsIFwianBlZ1wiKTtcblxuLyoqIOOCreODo+ODs+ODkOOCueOBrueUu+WDj+OCkuWPluW+l+OBmeOCi1xuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH19IGNhbnZhcyAtIENhbnZhc+imgee0oFxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIC0g5Y+W5b6X44GZ44KL44OV44Kh44Kk44Or5ZCNKOaLoeW8teWtkOOCkumZpOOBjylcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHQgLSDmi6HlvLXlrZBcbiAqIEBwYXJhbSB7XCJiYXNlNjRcInxcImJsb2JcIn0gdXJsVHlwZSAtIOeUn+aIkFVSTOOCv+OCpOODl1xuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEltYWdlKGNhbnZhcywgZmlsZU5hbWU9XCJpbWFnZVwiLCBleHQ9XCJwbmdcIiwgdXJsVHlwZT1cImJhc2U2NFwiKXtcblx0Y29uc3QgbWltZSA9IGdldE1pbWUoZXh0KTtcblx0Y29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXHRsZXQgdXJsO1xuXHRpZih1cmxUeXBlID09PSBcImJsb2JcIilcblx0XHR1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKFxuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzPT5jYW52YXMudG9CbG9iKHJlcyksIG1pbWUpKTtcblx0ZWxzZVxuXHRcdHVybCA9IGNhbnZhcy50b0RhdGFVUkwobWltZSk7XG5cdGEuaHJlZiA9IHVybDtcblx0YS5kb3dubG9hZCA9IGAke2ZpbGVOYW1lfS4ke2V4dH1gO1xuXHRhLmNsaWNrKCk7XG5cdGlmKHVybFR5cGUgPT09IFwiYmxvYlwiKSBVUkwucmV2b2tlT2JqZWN0VVJMKGEuaHJlZik7XG59XG4iLCJpbXBvcnQge2NhbnZhc0ZvbnR9IGZyb20gXCIuL2NhbnZhc0ZvbnRMb2FkZXIuanNcIjtcbmltcG9ydCB7Y2FudmFzSW1hZ2V9IGZyb20gXCIuL2NhbnZhc0ltYWdlTG9hZGVyLmpzXCI7XG5pbXBvcnQge3BhbmVsc30gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog44Oe44K555uu44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgUGFuZWx7XG5cdCNpc1NlbGVjdGVkO1xuXHQjdGFyZ2V0UmFuZ2VzO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge2FueX0gY3R4IC0gQ2FudmFz5o+P55S744Kz44Oz44OG44Kt44K544OIXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyIC0g44Oe44K555uu44KS56S644GZ5paH5a2XXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjZW50ZXIgLSDmj4/lhpnjgZnjgotY5bqn5qiZKOS4reW/g+WOn+eCuSlcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1pZGRsZSAtIOaPj+WGmeOBmeOCi1nluqfmqJko5Lit5b+D5Y6f54K5KVxuXHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSDjg57jgrnnm67luYVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIOODnuOCueebrumrmOOBlVxuXHQgKiBAcGFyYW0ge251bWJlcn0gYm9yZGVyV2lkdGggLSDmnqDnt5rjga7lpKrjgZVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBYIC0g44Oc44O844OJ5LiK44Gu44Oe44K555uu44Gu5YiXXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwWSAtIOODnOODvOODieS4iuOBruODnuOCueebruOBruihjFxuXHQgKi9cblx0Y29uc3RydWN0b3IoY3R4LCBjaGFyLCBjZW50ZXIsIG1pZGRsZSwgd2lkdGgsIGhlaWdodCwgYm9yZGVyV2lkdGgsIHBYLCBwWSl7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBwYW5lbHNbY2hhcl0pO1xuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXHRcdHRoaXMuY2VudGVyID0gY2VudGVyO1xuXHRcdHRoaXMubWlkZGxlID0gbWlkZGxlO1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLmxlZnQgPSBjZW50ZXItd2lkdGgvMjtcblx0XHR0aGlzLnRvcCA9IG1pZGRsZS1oZWlnaHQvMjtcblx0XHR0aGlzLnJpZ2h0ID0gY2VudGVyK3dpZHRoLzI7XG5cdFx0dGhpcy5ib3R0b20gPSBtaWRkbGUraGVpZ2h0LzI7XG5cdFx0dGhpcy5ib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoO1xuXHRcdHRoaXMucFggPSBwWDtcblx0XHR0aGlzLnBZID0gcFk7XG5cdFx0dGhpcy5zZWxlY3RDb2xvciA/Pz0gXCIjRkYwMDAwNjZcIjtcblx0XHR0aGlzLnRhcmdldENvbG9yID8/PSBcIiMwMEZGMDA2NlwiO1xuXHRcdHRoaXMucGllY2UgPSBudWxsO1xuXHRcdHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdHRoaXMuY2xlYXJUYXJnZXQoKTtcblx0XHR0aGlzLmF0dHIgPz89IFtdO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBrumBuOaKnueKtuaFi1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG5cdCAqL1xuXHRzZXQgaXNTZWxlY3RlZCh2YWx1ZSl7XG5cdFx0dGhpcy4jaXNTZWxlY3RlZCA9IHRoaXMuaGFzQXR0cihcImtlZXBPdXRcIik/IGZhbHNlOiB2YWx1ZTtcblx0fVxuXHRnZXQgaXNTZWxlY3RlZCgpe1xuXHRcdHJldHVybiB0aGlzLiNpc1NlbGVjdGVkO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBruenu+WLleWPr+iDveWIpOWumlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG5cdCAqL1xuXHRnZXQgaXNUYXJnZXQoKXtcblx0XHRyZXR1cm4gMCA8IHRoaXMuI3RhcmdldFJhbmdlcy5sZW5ndGg7XG5cdH1cblxuXHQvKiog44Oe44K555uu44Gu56e75YuV5YWI5oOF5aCx44KS44Kv44Oq44KiICovXG5cdGNsZWFyVGFyZ2V0KCl7XG5cdFx0dGhpcy4jdGFyZ2V0UmFuZ2VzID0gW107XG5cdH1cblxuXHQvKiog44Oe44K555uu44Gu56e75YuV5YWI5oOF5aCx44KS6L+95YqgXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZU5hbWUgLSDnp7vli5XlhYjmg4XloLFcblx0ICovXG4gICBhZGRUYXJnZXQocmFuZ2VOYW1lKXtcblx0XHR0aGlzLiN0YXJnZXRSYW5nZXMucHVzaChyYW5nZU5hbWUpO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBjOenu+WLleWFiOaDheWgseOCkuaMgeOBo+OBpuOBhOOCi+OBi+WIpOWumlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2VOYW1lIC0g56e75YuV5YWI5oOF5aCxXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0aGFzVGFyZ2V0KHJhbmdlTmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMuI3RhcmdldFJhbmdlcy5pbmNsdWRlcyhyYW5nZU5hbWUpO1xuXHR9XG5cblx0LyoqIOWxnuaAp+OBruWtmOWcqOOCkueiuuiqjVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgLSDlsZ7mgKflkI1cblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRoYXNBdHRyKGF0dHJOYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyLmluY2x1ZGVzKGF0dHJOYW1lKTtcblx0fVxuXHQvKiog5bqn5qiZ44GM44Oe44K555uu44Gr5ZCr44G+44KM44KL44GL5Yik5a6aXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWOW6p+aomVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIFnluqfmqJlcblx0ICovXG5cdGNoZWNrUmFuZ2VNb3VzZSh4LCB5KXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5sZWZ0IDw9IHggJiYgeCA8IHRoaXMucmlnaHQgJiZcblx0XHRcdHRoaXMudG9wIDw9IHkgJiYgeSA8IHRoaXMuYm90dG9tXG5cdFx0KTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm64v44Oe44K544KvL+mnkuOCkuaPj+WGmSAqL1xuXHRkcmF3KCl7XG5cdFx0Y29uc3Qge3NlbGVjdENvbG9yLCB0YXJnZXRDb2xvcn0gPSB0aGlzO1xuXG5cdFx0aWYodGhpcy5pbWdTcmMgJiYgY2FudmFzSW1hZ2UuaW1wb3J0ZWQpXG5cdFx0XHR0aGlzLmRyYXdJbWFnZSgpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuZHJhd1BhbmVsKCk7XG5cdFx0aWYodGhpcy5pc1NlbGVjdGVkKSB0aGlzLmRyYXdNYXNrKHNlbGVjdENvbG9yKTtcblx0XHRpZih0aGlzLmlzVGFyZ2V0KSB0aGlzLmRyYXdNYXNrKHRhcmdldENvbG9yKTtcblx0XHR0aGlzLnBpZWNlPy5kcmF3KCk7XG5cdH1cblxuXHQvKiog44Oe44K555uu55S75YOP44KS5o+P5YaZICovXG5cdGRyYXdJbWFnZSgpe1xuXHRcdGNvbnN0IHtjdHh9ID0gdGhpcztcblxuXHRcdGNvbnN0IHNyYyA9IHRoaXMuaW1nU3JjO1xuXHRcdGNvbnN0IGltYWdlID0gY2FudmFzSW1hZ2UuaW1hZ2VzW3NyY107XG5cdFx0aWYoIWltYWdlKSByZXR1cm47XG5cblx0XHRjdHguc2F2ZSgpO1xuXHRcdGN0eC50cmFuc2xhdGUodGhpcy5sZWZ0LCB0aGlzLnRvcCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog44Oe44K555uu44KS5o+P5YaZICovXG5cdGRyYXdQYW5lbCgpe1xuXHRcdGNvbnN0IHtjdHgsIGxlZnQsIHRvcCwgY2VudGVyLCBtaWRkbGUsIHdpZHRoLCBoZWlnaHQsIGRpc3BsYXlUZXh0LCB0ZXh0Um90YXRlfSA9IHRoaXM7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gdGhpcy5ib3JkZXJDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZShsZWZ0LCB0b3ApO1xuXHRcdGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblx0XHQvLyDkuqTngrnjgpLmj4/lhplcblx0XHRpZih0aGlzLmludGVyc2VjdCl7XG5cdFx0XHRjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdGN0eC5tb3ZlVG8od2lkdGgvMiwgMCk7XG5cdFx0XHRjdHgubGluZVRvKHdpZHRoLzIsIGhlaWdodCk7XG5cdFx0XHRjdHgubW92ZVRvKDAsIGhlaWdodC8yKTtcblx0XHRcdGN0eC5saW5lVG8od2lkdGgsIGhlaWdodC8yKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHR9XG5cdFx0Ly8g44Oe44K555uu44KS5o+P5YaZXG5cdFx0ZWxzZXtcblx0XHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdH1cblxuXHRcdC8vIOaWnOe3muOCkuaPj+WGmVxuXHRcdGN0eC5saW5lV2lkdGggPSB0aGlzLmJvcmRlcldpZHRoLzI7XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGlmKHRoaXMuYm9yZGVyU2xhc2hMZWZ0KXtcblx0XHRcdGN0eC5tb3ZlVG8oMCwgMCk7XG5cdFx0XHRjdHgubGluZVRvKHdpZHRoLCBoZWlnaHQpO1xuXHRcdH1cblx0XHRpZih0aGlzLmJvcmRlclNsYXNoUmlnaHQpe1xuXHRcdFx0Y3R4Lm1vdmVUbyh3aWR0aCwgMCk7XG5cdFx0XHRjdHgubGluZVRvKDAsIGhlaWdodCk7XG5cdFx0fVxuXHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblxuXHRcdC8vIOaWh+Wtl+OCkuaPj+WGmVxuXHRcdGlmKGRpc3BsYXlUZXh0KXtcblx0XHRcdGN0eC5zYXZlKCk7XG5cdFx0XHRjdHgudHJhbnNsYXRlKGNlbnRlciwgbWlkZGxlKTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmJvcmRlckNvbG9yO1xuXG5cdFx0XHRjb25zdCByYWQgPSB0ZXh0Um90YXRlPyB0ZXh0Um90YXRlKk1hdGguUEkvMTgwOiAwO1xuXHRcdFx0Y3R4LnJvdGF0ZShyYWQpO1xuXG5cdFx0XHRjb25zdCBmb250U2l6ZSA9IE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSowLjY7XG5cdFx0XHRjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4ICR7Y2FudmFzRm9udC5uYW1lc31gO1xuXG5cdFx0XHRjb25zdCB3aWR0aCA9IGN0eC5tZWFzdXJlVGV4dChkaXNwbGF5VGV4dCkud2lkdGg7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSBmb250U2l6ZS8yKjAuODtcblx0XHRcdGN0eC5maWxsVGV4dChkaXNwbGF5VGV4dCwgLXdpZHRoLzIsIGhlaWdodCk7XG5cdFx0XHRjdHgucmVzdG9yZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiDjg57jgrnnm67jgavjg57jgrnjgq/jgpLmj4/lhplcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0g44Kr44Op44O844Ko44OV44Kn44Kv44OI44Gu6ImyXG5cdCAqL1xuXHRkcmF3TWFzayhjb2xvcil7XG5cdFx0Y29uc3Qge2N0eH0gPSB0aGlzO1xuXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXG5cdFx0Ly8g44Oe44K555uu44KS5o+P5YaZXG5cdFx0Y3R4LmZpbGxSZWN0KHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblx0fVxuXG5cdC8qKiDmloflrZfliJflvaLlvI/jgaflj5blvpdcblx0ICogQHBhcmFtIHtzdHJpbmd9IC0g57Ch5piT6KGo56S6XG5cdCAqL1xuXHR0b1N0cmluZyhpc01pbmltYW09ZmFsc2Upe1xuXHRcdHJldHVybiAhaXNNaW5pbWFtP1xuXHRcdFx0dGhpcy50ZXh0OlxuXHRcdFx0YO+9nCR7dGhpcy50ZXh0LnNsaWNlKC0xKS5yZXBsYWNlKC/jgIAvZywgXCLjg7tcIil9YDtcblx0fVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanNvbicpLlBpZWNlSW5pdE9wdGlvbn0gUGllY2VJbml0T3B0aW9uICovXG5pbXBvcnQge2NhbnZhc0ZvbnR9IGZyb20gXCIuL2NhbnZhc0ZvbnRMb2FkZXIuanNcIjtcbmltcG9ydCB7Y2FudmFzSW1hZ2V9IGZyb20gXCIuL2NhbnZhc0ltYWdlTG9hZGVyLmpzXCI7XG5pbXBvcnQge2dhbWVzLCBwaWVjZXMsIHBpZWNlUmFuZ2UsIHBpZWNlQ29zdH0gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog6aeS44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgUGllY2V7XG5cdC8qKiDmj4/lhpnjgrXjgqTjgrpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBzaXplID0gNDU7XG5cblx0LyoqIOagvOOBrumBleOBhOOBq+OCiOOBo+OBpumnkuOBruWkp+OBjeOBleOCkuWkieabtOOBmeOCi+OBi1xuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHN0YXRpYyB1c2VSYW5rU2l6ZSA9IHRydWU7XG5cblx0LyoqIOW9seOBruaPj+WGmeacieeEoVxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHN0YXRpYyBpc0RyYXdTaGFkb3cgPSB0cnVlO1xuXG5cdC8qKiDjg4bjgq3jgrnjg4jlh7rlipvmmYLjga7jg5fjg6zjgqTjg6Tjg7zooajnpLpcblx0ICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG5cdCAqL1xuXHRzdGF0aWMgZGVnQ2hhcnMgPSB7XG5cdFx0MDogXCLilrJcIixcblx0XHQ5MDogXCLiiatcIixcblx0XHQxODA6IFwi4pa9XCIsXG5cdFx0MjcwOiBcIu+8nFwiXG5cdH07XG5cblx0LyoqIOODl+ODrOOCpOODpOODvOihqOekuuOBi+OCieinkuW6puOCkuWPluW+lyAqL1xuXHRzdGF0aWMgY2hhckRlZ3MgPSB7fTtcblxuXHQvKiog44K144Kk44K65aSJ5pu06Kit5a6a5YCkXG5cdCAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBudW1iZXI+fVxuXHQgKi9cblx0c3RhdGljIHJhbmtSYXRpbyA9IHtcblx0XHRcIktSXCI6IDEsXG5cdFx0XCJTUlwiOiAwLjk2NSxcblx0XHRcIlJcIjogMC45MzUsXG5cdFx0XCJVQ1wiOiAwLjkwLFxuXHRcdFwiQ1wiOiAwLjg2NVxuXHR9XG5cblx0LyoqIOmnkuOBruautemajuWIpeS+oeWApOOCkuWPluW+lyAqL1xuXHRnZXQgcmFuaygpe1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmNvc3QgPD0gMD8gXCJLUlwiOlxuXHRcdFx0MjAgPD0gdGhpcy5jb3N0PyBcIlNSXCI6XG5cdFx0XHQxMCA8PSB0aGlzLmNvc3Q/IFwiUlwiOlxuXHRcdFx0NSA8PSB0aGlzLmNvc3Q/IFwiVUNcIjpcblx0XHRcdFwiQ1wiXG5cdFx0KTtcblx0fVxuXG5cblx0LyoqIOmnkuODh+ODvOOCv+OCkuWIneacn+WMllxuXHQgKiBAcGFyYW0ge2FueX0gY3R4IC0gQ2FudmFz5o+P55S744Kz44Oz44OG44Kt44K544OIXG5cdCAqIEBwYXJhbSB7UGllY2V8UGllY2VJbml0T3B0aW9ufSBvcHRpb24gLSDpp5Ljga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7Ncblx0ICovXG5cdHN0YXRpYyBnZXRQaWVjZXMoY3R4LCBvcHRpb249e30pe1xuXHRcdGNvbnN0IGV4UGllY2VzID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBpZWNlcykpKSk7XG5cblx0XHQvKiDjg4fjg7zjgr/jgpLoo5zlrowgKi9cblx0XHRmb3IoY29uc3QgW18sIHBpZWNlXSBvZiBleFBpZWNlcyl7XG5cdFx0XHRwaWVjZS5hdHRyID8/PSBbXTtcblx0XHRcdGlmKHBpZWNlLnVuaXQgJiYgcGllY2UudW5pdCA9PT0gXCLmiJBcIikgcGllY2UuYmFzZSA9IHBpZWNlO1xuXHRcdH1cblx0XHQvKiDmiJDpp5Ljga7jg4fjg7zjgr/jgpLlkIjmiJAgKi9cblx0XHRmb3IoY29uc3QgW18sIHBpZWNlXSBvZiBleFBpZWNlcyl7XG5cdFx0XHRpZighcGllY2UucHJvbW8gfHwgdHlwZW9mKHBpZWNlLnByb21vKSAhPT0gXCJzdHJpbmdcIikgY29udGludWU7XG5cdFx0XHRjb25zdCBwcm9tb0tleXMgPSBbLi4ucGllY2UucHJvbW9dO1xuXHRcdFx0cGllY2UucHJvbW8gPSB7fTtcblx0XHRcdGZvcihjb25zdCBrZXkgb2YgcHJvbW9LZXlzKXtcblx0XHRcdFx0Y29uc3QgcHJvbW8gPSBleFBpZWNlcy5nZXQoa2V5KTtcblx0XHRcdFx0cHJvbW8uYXR0ci5wdXNoKFwicHJvbW90ZWRcIik7XG5cdFx0XHRcdHByb21vLnVuaXQgPSBcIuaIkFwiO1xuXHRcdFx0XHRwaWVjZS5wcm9tb1trZXldID0gcHJvbW87XG5cdFx0XHRcdGV4UGllY2VzLnNldChrZXksey4uLnBpZWNlLCAuLi5wcm9tb30pO1xuXHRcdFx0fTtcblx0XHR9XG5cdFx0Ly8g6aeS44KS44Kv44Op44K544Kq44OW44K444Kn44Kv44OI44Gr5aSJ5o+bXG5cdFx0Wy4uLmV4UGllY2VzXS5mb3JFYWNoKChba2V5LCBwaWVjZV0sIGkpPT57XG5cdFx0XHRwaWVjZS5pZCA9IGk7XG5cdFx0XHRwaWVjZS5jaGFyID0ga2V5O1xuXHRcdFx0ZXhQaWVjZXMuc2V0KGtleSwgbmV3IFBpZWNlKGN0eCwgcGllY2UsIG9wdGlvbikpO1xuXHRcdH0pO1xuXHRcdGNvbnN0IGV4UGllY2VzT2JqID0gT2JqZWN0LmZyb21FbnRyaWVzKGV4UGllY2VzKTtcblx0XHQvLyDjgqjjgqTjg6rjgqLjgrnjga7jg4fjg7zjgr/jgpLntbHlkIhcblx0XHRmb3IoY29uc3QgW2tleSwgcGllY2VdIG9mIGV4UGllY2VzKXtcblx0XHRcdHBpZWNlLmFsaWFzLmZvckVhY2goKGFsaWFzS2V5LCBpKT0+e1xuXHRcdFx0XHRjb25zdCBhbGlhcyA9IHBpZWNlLmNsb25lKCk7XG5cdFx0XHRcdGNvbnN0IGRpc3BsYXkgPSBbLi4uYWxpYXMuZGlzcGxheV07XG5cdFx0XHRcdGFsaWFzLmRpc3BsYXlQdG4gPSBpKzE7XG5cdFx0XHRcdGFsaWFzLmRpc3BsYXkgPSBkaXNwbGF5O1xuXHRcdFx0XHRhbGlhcy5hbGlhc1tpXSA9IGtleTtcblx0XHRcdFx0ZXhQaWVjZXNPYmpbYWxpYXNLZXldID0gYWxpYXM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGV4UGllY2VzT2JqO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+OBi+OCiemnkuOCkuWPluW+l1xuXHQgKiBAcGFyYW0ge1BpZWNlfFBpZWNlSW5pdE9wdGlvbn0gcGllY2UgLSDpp5Jcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSDpp5LmloflrZfliJdcblx0ICovXG5cdHN0YXRpYyBzdHJpbmdUb1BpZWNlKHBpZWNlcywgdGV4dCl7XG5cdFx0aWYgKCF0ZXh0KSByZXR1cm4gbnVsbDtcblx0XHRjb25zdCBbZGVnQ2hhciwgcGllY2VDaGFyXSA9IFsuLi50ZXh0XTtcblx0XHRjb25zdCBkZWcgPSBQaWVjZS5jaGFyRGVnc1tkZWdDaGFyXTtcblx0XHRpZighZGVnIHx8ICFwaWVjZXNbcGllY2VDaGFyXSkgcmV0dXJuIG51bGw7XG5cdFx0Y29uc3QgcGllY2UgPSBwaWVjZXNbcGllY2VDaGFyXS5jbG9uZSgpO1xuXHRcdHBpZWNlLmRlZyA9IGRlZztcblx0XHRyZXR1cm4gcGllY2U7XG5cdH1cblxuXHQvKiog6aeS44Gu5LiA6Kan44KS44Oq44K544OI44Gn5Y+W5b6XICovXG5cdHN0YXRpYyBwaWVjZXNUb0xpc3QocGllY2VzKXtcblx0XHRyZXR1cm4gT2JqZWN0LmVudHJpZXMocGllY2VzKVxuXHRcdFx0LnNvcnQoKFtfLHtpZDphfV0sIFtfXyx7aWQ6Yn1dKT0+XG5cdFx0XHRcdE1hdGguc2lnbihhLWIpKTtcblx0fVxuXG5cdC8qKiDpp5Ljga7op5LluqYoZGVnL3JhZClcblx0ICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG5cdCAqL1xuXHRzZXQgZGVnKHZhbHVlKXtcblx0XHR0aGlzLnJhZCA9IHZhbHVlJTM2MCpNYXRoLlBJLzE4MDtcblx0fVxuXHRnZXQgZGVnKCl7XG5cdFx0cmV0dXJuIHRoaXMucmFkJTM2MC8oTWF0aC5QSS8xODApO1xuXHR9XG5cblx0LyoqIOW3puWBtOOBruW6p+aomSAqL1xuXHRnZXQgbGVmdCgpe1xuXHRcdHJldHVybiB0aGlzLmNlbnRlci10aGlzLnNpemUqMC44LzI7XG5cdH1cblx0LyoqIOS4iuWBtOOBruW6p+aomSAqL1xuXHRnZXQgdG9wKCl7XG5cdFx0cmV0dXJuIHRoaXMubWlkZGxlLXRoaXMuc2l6ZS8yO1xuXHR9XG5cdC8qKiDlj7PlgbTjga7luqfmqJkgKi9cblx0Z2V0IHJpZ2h0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY2VudGVyK3RoaXMuc2l6ZSowLjgvMjtcblx0fVxuXHQvKiog5LiL5YG044Gu5bqn5qiZICovXG5cdGdldCBib3R0b20oKXtcblx0XHRyZXR1cm4gdGhpcy5taWRkbGUrdGhpcy5zaXplLzI7XG5cdH1cblxuXHQvKiog5ouh5aSn546H44KS5Y+W5b6XXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRnZXQgem9vbSgpe1xuXHRcdGxldCB6b29tID10aGlzLnNpemUvMTAwO1xuXHRcdGlmKHRoaXMudXNlUmFua1NpemUpXG5cdFx0XHR6b29tICo9IFBpZWNlLnJhbmtSYXRpb1t0aGlzLnJhbmtdO1xuXHRcdHJldHVybiB6b29tO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7YW55fSBjdHggLSBDYW52YXPmj4/nlLvjgrPjg7Pjg4bjgq3jgrnjg4hcblx0ICogQHBhcmFtIHtQaWVjZXxQaWVjZUluaXRPcHRpb259IHBpZWNlIC0g6aeSXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24gLSDjgqrjg5fjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5kaXNwbGF5UHRuIC0g6KGo56S65paH5a2X5YiX44KS5aSJ5pu0KDHjgJwpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uZGVnIC0g6aeS44Gu6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uc2l6ZSAtIOmnkuOBruWkp+OBjeOBlVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi51c2VSYW5rU2l6ZSAtIOmnkuOBruWkp+OBjeOBleOCkuagvOOBrumBleOBhOOBp+WkieabtOOBmeOCi+OBi1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi5pc0RyYXdTaGFkb3cgLSDpp5Ljga7lvbHjga7mj4/lhpnmnInnhKFcblx0ICogQHBhcmFtIHtib29sZWFufSBvcHRpb24uaXNNb3ZlZCAtIOWIneWbnuenu+WLlea4iOOBv+OBi+WQpuOBi1xuXHQgKi9cblx0Y29uc3RydWN0b3IoY3R4LCBwaWVjZSwgb3B0aW9uPXt9KXtcblx0XHRjb25zdCB7XG5cdFx0XHRkaXNwbGF5UHRuPTAsXG5cdFx0XHRkZWc9MCxcblx0XHRcdHNpemU9UGllY2Uuc2l6ZSxcblx0XHRcdHVzZVJhbmtTaXplPVBpZWNlLnVzZVJhbmtTaXplLFxuXHRcdFx0aXNEcmF3U2hhZG93PVBpZWNlLmlzRHJhd1NoYWRvdyxcblx0XHRcdGlzTW92ZWQ9ZmFsc2Vcblx0XHR9ID0gb3B0aW9uO1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgcGllY2UpO1xuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXHRcdHRoaXMuZGlzcGxheSA/Pz0gW1wiXCJdO1xuXHRcdHRoaXMuaW1nU3JjID8/PSBudWxsO1xuXHRcdHRoaXMuYWxpYXMgPSBbLi4udGhpcy5hbGlhcyA/PyBcIlwiXTtcblx0XHR0aGlzLmRpc3BsYXlQdG4gPSBkaXNwbGF5UHRuO1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWVzW3RoaXMuZ2FtZU5hbWVdO1xuXHRcdHRoaXMuY29zdCA9IHBpZWNlQ29zdFt0aGlzLmNoYXJdID8/IDE7XG5cdFx0dGhpcy5jZW50ZXIgPSAwO1xuXHRcdHRoaXMubWlkZGxlID0gMDtcblx0XHR0aGlzLmRlZyA9IGRlZztcblx0XHR0aGlzLnNpemUgPSBzaXplO1xuXHRcdHRoaXMudXNlUmFua1NpemUgPSB1c2VSYW5rU2l6ZTtcblx0XHR0aGlzLmlzRHJhd1NoYWRvdyA9IGlzRHJhd1NoYWRvdztcblx0XHR0aGlzLmlzUm90YXRlSW1nID8/PSB0cnVlO1xuXHRcdHRoaXMuaXNNb3ZlZCA9IGlzTW92ZWQ7XG5cdFx0dGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5hdHRyID8/PSBbXTtcblx0XHR0cnl7XG5cdFx0XHRPYmplY3QuZW50cmllcyh0aGlzLnJhbmdlKS5mb3JFYWNoKChba2V5LCBybmddKT0+e1xuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KHJuZykpIHJldHVybjtcblx0XHRcdFx0dGhpcy5yYW5nZVtrZXldID0gcGllY2VSYW5nZVtybmddLm1hcChyb3c9PlsuLi5yb3ddKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdHRocm93IHBpZWNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKiDpp5LjgpLjgq/jg63jg7zjg7Ncblx0ICogQHJldHVybnMgUGllY2Vcblx0ICovXG5cdGNsb25lKCl7XG5cdFx0Y29uc3Qge2Rpc3BsYXlQdG4sIGRlZywgc2l6ZSwgaXNNb3ZlZH0gPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUGllY2UodGhpcy5jdHgsIHsuLi50aGlzfSwge2Rpc3BsYXlQdG4sIGRlZywgc2l6ZSwgaXNNb3ZlZH0pO1xuXHR9XG5cblx0LyoqIOmnkuOCkuihqOi/lOOBmSAqL1xuXHR0dXJuRnJvbnQoKXtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuYmFzZSk7XG5cdH1cblxuXHQvKiog44OX44Ot44Oi44O844K344On44OzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyIC0g5oiQ44KK5YWI44Gu5paH5a2XXG5cdCAqL1xuXHRwcm9tb3Rpb24oY2hhcil7XG5cdFx0Y29uc3Qge3Byb21vfSA9IHRoaXM7XG5cblx0XHRpZighcHJvbW8pIHRocm93IEVycm9yKGBwcm9tbz0ke2NoYXJ9LCBOb3QgcGxvbW90ZSBwaWVjZS5gKTtcblx0XHRpZighcHJvbW8gaW4gcHJvbW8pIHRocm93IEVycm9yKGBwcm9tbz0ke2NoYXJ9LCBQbG9tb3RlIGtleSBpcyBtaXNzaW5nLmApO1xuXHRcdGlmKHRoaXMuaGFzQXR0cihcInByb21vdGVkXCIpKSB0aHJvdyBFcnJvcihgcHJvbW89JHtjaGFyfSwgUHJvbW90ZWQgcGllY2UuYCk7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBwcm9tb1tjaGFyXSk7XG5cdFx0dGhpcy5jaGFyID0gY2hhcjtcblx0fVxuXG5cdC8qKiDlsZ7mgKfjga7lrZjlnKjjgpLnorroqo1cblx0ICogQHBhcmFtIHtzdHJpbmd9IGF0dHJOYW1lIC0g5bGe5oCn5ZCNXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0aGFzQXR0cihhdHRyTmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMuYXR0ci5pbmNsdWRlcyhhdHRyTmFtZSk7XG5cdH1cblxuXHQvKiog5bqn5qiZ44GM6aeS44Gr5ZCr44G+44KM44KL44GL5Yik5a6aXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWOW6p+aomVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIFnluqfmqJlcblx0ICovXG5cdGNoZWNrUmFuZ2VNb3VzZSh4LCB5KXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5sZWZ0IDw9IHggJiYgeCA8IHRoaXMucmlnaHQgJiZcblx0XHRcdHRoaXMudG9wIDw9IHkgJiYgeSA8IHRoaXMuYm90dG9tXG5cdFx0KTtcblx0fVxuXG5cdC8qKiDnp7vli5Xnr4Tlm7LjgpLlm57ou6LjgZfjgablj5blvpcgKi9cblx0Z2V0UmFuZ2UoKXtcblx0XHRjb25zdCBkZWcgPSAwfHRoaXMuZGVnO1xuXHRcdGNvbnN0IHJhbmdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnJhbmdlKSk7XG5cdFx0T2JqZWN0LmtleXMocmFuZ2UpLmZvckVhY2goa2V5PT57XG5cdFx0XHRpZihkZWcgPT09IDApIHJldHVybjtcblx0XHRcdGlmKCFbOTAsIDE4MCwgMjcwXS5pbmNsdWRlcyhkZWcpKSB0aHJvdyBFcnJvcihgZGVnPSR7ZGVnfSwgZGVnIG5lZWQgbXVsdGlwbGUgb2YgOTAuYCk7XG5cdFx0XHRpZihbOTAsIDI3MF0uaW5jbHVkZXMoZGVnKSl7XG5cdFx0XHRcdC8vIDLmrKHphY3liJfjgpLou6Lnva5cblx0XHRcdFx0Y29uc3QgdHJhbnNwb3NlID0gYSA9PiBhWzBdLm1hcCgoXywgYykgPT4gYS5tYXAociA9PiByW2NdKSk7XG5cdFx0XHRcdHJhbmdlW2tleV0gPSB0cmFuc3Bvc2UocmFuZ2Vba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRpZihbMTgwLCAyNzBdLmluY2x1ZGVzKGRlZykpe1xuXHRcdFx0XHRyYW5nZVtrZXldLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHRcdHJhbmdlW2tleV0uZm9yRWFjaChyb3c9Pntcblx0XHRcdFx0aWYoWzkwLCAxODBdLmluY2x1ZGVzKGRlZykpIHJvdy5yZXZlcnNlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmFuZ2U7XG5cdH1cblxuXHQvKiog6aeSL+ODnuOCueOCr+OCkuaPj+WGmSAqL1xuXHRhc3luYyBkcmF3KCl7XG5cdFx0Y29uc3Qgc2VsZWN0Q29sb3IgPSBcIiNGRjAwMDA1NVwiO1xuXHRcdGlmKHRoaXMuaW1nU3JjICYmIGNhbnZhc0ltYWdlLmltcG9ydGVkKXtcblx0XHRcdHRoaXMuZHJhd0ltYWdlKCk7XG5cdFx0XHRpZih0aGlzLmlzU2VsZWN0ZWQpIHRoaXMuZHJhd01hc2tJbWFnZShzZWxlY3RDb2xvcik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLmRyYXdQaWVjZSgpO1xuXHRcdFx0aWYodGhpcy5pc1NlbGVjdGVkKSB0aGlzLmRyYXdNYXNrKHNlbGVjdENvbG9yKTtcblx0XHR9XG5cdH1cblxuXHQvKiog6aeS55S75YOP44KS5o+P5YaZICovXG5cdGRyYXdJbWFnZSgpe1xuXHRcdGNvbnN0IHtjdHgsIHNpemV9ID0gdGhpcztcblxuXHRcdGNvbnN0IHNyYyA9IHRoaXMuaW1nU3JjW3RoaXMuZGlzcGxheVB0bl07XG5cdFx0Y29uc3QgaW1hZ2UgPSBjYW52YXNJbWFnZS5pbWFnZXNbc3JjXTtcblx0XHRpZighaW1hZ2UpIHJldHVybjtcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmNlbnRlciwgdGhpcy5taWRkbGUpO1xuXHRcdGlmKHRoaXMuaXNSb3RhdGVJbWcpIGN0eC5yb3RhdGUodGhpcy5yYWQpO1xuXG5cdFx0bGV0IGltZ1dpZHRoLCBpbWdIZWlnaHQ7XG5cdFx0aWYoaW1hZ2Uud2lkdGgqMC45IDwgaW1hZ2UuaGVpZ2h0KXtcblx0XHRcdGltZ1dpZHRoID0gaW1hZ2Uud2lkdGgvaW1hZ2UuaGVpZ2h0KnNpemVcblx0XHRcdGltZ0hlaWdodCA9IHNpemU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aW1nV2lkdGggPSBzaXplO1xuXHRcdFx0aW1nSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0L2ltYWdlLndpZHRoKnNpemU7XG5cdFx0fVxuXHRcdGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC1pbWdXaWR0aC8yLCAtaW1nSGVpZ2h0LzIsIGltZ1dpZHRoLCBpbWdIZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog6aeS55S75YOP44Gr44Oe44K544Kv44KS5o+P5YaZXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIOOCq+ODqeODvOOCqOODleOCp+OCr+ODiOOBruiJslxuXHQgKi9cblx0ZHJhd01hc2tJbWFnZShjb2xvcil7XG5cdFx0Y29uc3Qge2N0eCwgc2l6ZX0gPSB0aGlzO1xuXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y29uc3QgaW1nV2lkdGggPSBzaXplKjAuOTtcblx0XHRjb25zdCBpbWdIZWlnaHQgPSBzaXplO1xuXG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmNlbnRlciwgdGhpcy5taWRkbGUpO1xuXHRcdGN0eC5maWxsUmVjdCgtaW1nV2lkdGgvMiwgLWltZ0hlaWdodC8yLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KTtcblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cblx0LyoqIOWwhuaji+mnkuOBruWkluW9ouODkeOCueOCkuS9nOaIkFxuXHQgKiBAcGFyYW0ge251bWJlcn0gem9vbSAtIOmnkuOBruaLoeWkp+eOh1xuXHQgKi9cblx0bWFrZVBhdGgoem9vbSl7XG5cdFx0Y29uc3Qge2N0eH0gPSB0aGlzO1xuXG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmNlbnRlciwgdGhpcy5taWRkbGUpO1xuXHRcdGN0eC5yb3RhdGUodGhpcy5yYWQpO1xuXG5cdFx0Lyog5aSW5p6g44KS5o+P5YaZICovXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5tb3ZlVG8oLTMwKnpvb20sLTQwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oICAwKnpvb20sLTUwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oIDMwKnpvb20sLTQwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oIDQ1Knpvb20sIDUwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oLTQ1Knpvb20sIDUwKnpvb20pO1xuXHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0fVxuXG5cdC8qKiDpp5Ljga7lvbHjgpLmj4/lhplcblx0KiBAcGFyYW0ge251bWJlcn0gem9vbSAtIOmnkuOBruaLoeWkp+eOh1xuXHQqL1xuICAgZHJhd1BpZWNlU2hhZG93KHpvb20pe1xuXHRcdGlmKCF0aGlzLmlzRHJhd1NoYWRvdykgcmV0dXJuO1xuXHRcdGNvbnN0IHtjdHh9ID0gdGhpcztcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZSgwLCAxMCp6b29tKTtcblx0XHR0aGlzLmRyYXdNYXNrKFwiIzAwMDAwMDY2XCIpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog6aeS44KS5o+P5YaZICovXG5cdGRyYXdQaWVjZSgpe1xuXHRcdGNvbnN0IHtjdHgsIGdhbWUsIHpvb219ID0gdGhpcztcblxuXHRcdGxldCBmb250Q29sb3IsIGJhY2tncm91bmRDb2xvciwgYm9yZGVyQ29sb3I7XG5cdFx0aWYodGhpcy5oYXNBdHRyKFwicHJvbW90ZWRcIikpe1xuXHRcdFx0Zm9udENvbG9yID0gZ2FtZS5wcm9tb3RlRm9udENvbG9yID8/IGdhbWUuZm9udENvbG9yID8/IFwiIzAwMDAwMFwiO1xuXHRcdFx0YmFja2dyb3VuZENvbG9yID0gZ2FtZS5wcm9tb3RlQmFja2dyb3VuZENvbG9yID8/IGdhbWUuYmFja2dyb3VuZENvbG9yID8/IFwiI0ZGRkZGRlwiLFxuXHRcdFx0Ym9yZGVyQ29sb3IgPSBnYW1lLnByb21vdGVCb3JkZXJDb2xvciA/PyBnYW1lLmJvcmRlckNvbG9yID8/IFwiI0ZGMzMwMFwiO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvbnRDb2xvciA9IGdhbWUuZm9udENvbG9yID8/IFwiIzAwMDAwMFwiO1xuXHRcdFx0YmFja2dyb3VuZENvbG9yID0gZ2FtZS5iYWNrZ3JvdW5kQ29sb3IgPz8gXCIjRkZGRkZGXCIsXG5cdFx0XHRib3JkZXJDb2xvciA9IGdhbWUuYm9yZGVyQ29sb3IgPz8gXCIjNzc3Nzc3XCI7XG5cdFx0fVxuXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gYm9yZGVyQ29sb3I7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gOCp6b29tO1xuXHRcdHRoaXMuZHJhd1BpZWNlU2hhZG93KHpvb20pO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0dGhpcy5tYWtlUGF0aCh6b29tKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0Y3R4LmZpbGwoKTtcblxuXHRcdC8qIOaWh+Wtl+OCkuaPj+WGmSAqL1xuXHRcdGN0eC5maWxsU3R5bGUgPSBmb250Q29sb3I7XG5cdFx0Y29uc3QgdGV4dCA9IFsuLi5cIlwiK3RoaXMuZGlzcGxheVt0aGlzLmRpc3BsYXlQdG5dXTtcblx0XHRjb25zdCBmb250U2l6ZSA9IDQwKnpvb207XG5cdFx0Y3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCAke2NhbnZhc0ZvbnQubmFtZXN9YDtcblx0XHRjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuXHRcdHRleHQuZm9yRWFjaCgodixpKT0+e1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gdGV4dC5sZW5ndGggPT09IDE/IGZvbnRTaXplLzI6IGkqZm9udFNpemU7XG5cdFx0XHRjdHguZmlsbFRleHQodiwgMCwgaGVpZ2h0KTtcblx0XHR9KTtcblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cblx0LyoqIOmnkuOBq+ODnuOCueOCr+OCkuaPj+WGmVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgLSDjgqvjg6njg7zjgqjjg5Xjgqfjgq/jg4jjga7oibJcblx0ICovXG5cdGRyYXdNYXNrKGNvbG9yKXtcblx0XHRjb25zdCB7Y3R4LCB6b29tfSA9IHRoaXM7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHR0aGlzLm1ha2VQYXRoKHpvb20pO1xuXHRcdGN0eC5maWxsKCk7XG5cblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+W9ouW8j+OBp+WPluW+lyAqL1xuXHR0b1N0cmluZygpe1xuXHRcdHJldHVybiBQaWVjZS5kZWdDaGFyc1t0aGlzLmRlZ10gKyB0aGlzLmNoYXI7XG5cdH1cbn1cblxuLy8g44OX44Os44Kk44Ok44O86KGo56S644GL44KJ6KeS5bqm44KS5Y+W5b6XXG5PYmplY3QuZW50cmllcyhQaWVjZS5kZWdDaGFycylcblx0LmZvckVhY2goKFtrZXksIHZhbHVlXSk9Pntcblx0XHRQaWVjZS5jaGFyRGVnc1t2YWx1ZV0gPSBrZXk7XG5cdH0pO1xuIiwiaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4vYm9hcmQuanNcIjtcbmltcG9ydCB7UGllY2V9IGZyb20gXCIuL3BpZWNlLmpzXCI7XG5cbi8vIOenu+WLleevhOWbsuOCquODl+OCt+ODp+ODs1xuY29uc3QgcmFuZ2VPcHRpb25zID0gW1xuXHRbXCJkZWZhdWx0XCIsIHtpc0F0dGFjazogZmFsc2V9XSxcblx0W1wiYXR0YWNrXCIsIHtpc0F0dGFjazogdHJ1ZX1dLFxuXHRbXCJzdGFydFwiLCB7aXNBdHRhY2s6IGZhbHNlfV0sXG5cdFtcImNhc3RsaW5nXCIsIHtpc0F0dGFjazogZmFsc2V9XSxcblx0W1wiZW5QYXNzYW50XCIsIHtpc0F0dGFjazogdHJ1ZX1dLFxuXHRbXCJwYWxhY2VTbGFzaFwiLCB7aXNBdHRhY2s6IGZhbHNlfV0sXG5cdFtcInBhbGFjZVNsYXNoXCIsIHtpc0F0dGFjazogdHJ1ZX1dXG5dO1xuXG4vLyDotbfngrnmloflrZfjga7lrprnvqlcbmNvbnN0IGNlbnRlckNoYXJzID0gW1xuXHRbXCJPXCIsIHtpc093bjogdHJ1ZX1dLFxuXHRbXCJvXCIsIHt9XVxuXTtcblxuLy8g56e75YuV56+E5Zuy5paH5a2X44Gu6Kaq5a2Q6Zai5L+CXG4vKiog54K556e75YuV44Kq44OX44K344On44OzXG4gKiBAdHlwZSB7T2JqZWN0PGtleTogc3RyaW5nLCB7Y2hpbGQ6IHN0cmluZ1tdfT5bXX1cbiAqIEBwYXJhbSBrZXkgLSDnp7vli5Xnr4Tlm7LjgpLlrprnvqnjgZnjgovmloflrZdcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb3Zlcy0g6YCy6KGM5Y+v6IO944Gq44Oe44K55pWwXG4gKi9cbmNvbnN0IHBvaW50Q2hhcnMgPSBbXG5cdFtcIm9cIl0sXG5cdFtcIkFcIiwge2NoaWxkOiBbXCJhXCJdfV0sXG5cdFtcIkJcIiwge2NoaWxkOiBbXCJiXCJdfV0sXG5cdFtcIkNcIiwge2NoaWxkOiBbXCJjXCJdfV0sXG5cdFtcIkRcIiwge2NoaWxkOiBbXCJkXCJdfV0sXG5cdFtcIkVcIiwge2NoaWxkOiBbXCJhXCIsIFwiZVwiXX1dLFxuXHRbXCJGXCIsIHtjaGlsZDogW1wiYVwiLCBcImZcIl19XSxcblx0W1wiR1wiLCB7Y2hpbGQ6IFtcImJcIiwgXCJnXCJdfV0sXG5cdFtcIkhcIiwge2NoaWxkOiBbXCJiXCIsIFwiaFwiXX1dLFxuXHRbXCJJXCIsIHtjaGlsZDogW1wiY1wiLCBcImlcIl19XSxcblx0W1wiSlwiLCB7Y2hpbGQ6IFtcImNcIiwgXCJqXCJdfV0sXG5cdFtcIktcIiwge2NoaWxkOiBbXCJkXCIsIFwia1wiXX1dLFxuXHRbXCJMXCIsIHtjaGlsZDogW1wiZFwiLCBcImxcIl19XVxuXTtcblxuLyoqIOebtOe3muenu+WLleOCquODl+OCt+ODp+ODs1xuICogQHR5cGUge09iamVjdDxrZXk6IHN0cmluZywge2ptcHM6IG51bWJlciwgbW92ZXM6IG51bWJlcn0+W119XG4gKiBAcGFyYW0ga2V5IC0g56e75YuV56+E5Zuy44KS5a6a576p44GZ44KL5paH5a2XXG4gKiBAcGFyYW0gam1wcyAtIOW/heimgeOBquOCuOODo+ODs+ODl+WbnuaVsFxuICogQHBhcmFtIG1vdmVzLSDpgLLooYzlj6/og73jgarjg57jgrnmlbBcbiAqL1xuY29uc3QgbGluZXJDaGFycyA9IFtcblx0W1wiKlwiLCB7fV0sXG5cdFtcIitcIiwge2ptcHM6IDF9XSxcblx0W1wifFwiLCB7am1wczogMSwgbW92ZXM6IDF9XVxuXTtcbmZvcihsZXQgaT0xO2k8PTk7aSsrKVxuXHRsaW5lckNoYXJzLnB1c2goW1wiXCIraSwge21vdmVzOiBpfV0pO1xuXG4vKiogcmFuZ2Xjga7ljp/ngrnluqfmqJnjgpLlj5blvpdcbiAqIEBwYXJhbSB7c3RyaW5nW119IHJhbmdlIC0g56e75YuV56+E5Zuy5oOF5aCxXG4gKi9cbmZ1bmN0aW9uIGdldE9yaWdpbihyYW5nZSl7XG5cdGNvbnN0IG9MaXN0ID0gW107XG5cdGxldCBvd25YLCBvd25ZO1xuXHRmb3IobGV0IHJZPTA7clk8cmFuZ2UubGVuZ3RoO3JZKyspe1xuXHRcdGZvcihsZXQgclg9MDtyWDxyYW5nZVtyWV0ubGVuZ3RoO3JYKyspe1xuXHRcdFx0Y29uc3QgckNoYXIgPSByYW5nZVtyWV1bclhdO1xuXHRcdFx0Zm9yKGxldCBba2V5LCB7aXNPd259XSBvZiBjZW50ZXJDaGFycyl7XG5cdFx0XHRcdGlmKHJDaGFyICE9PSBrZXkpIGNvbnRpbnVlO1xuXHRcdFx0XHRvTGlzdC5wdXNoKHtpc093biwgb1g6IHJYLCBvWTogcll9KTtcblx0XHRcdFx0aWYoaXNPd24pIFtvd25YLCBvd25ZXSA9IFtyWCwgclldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gb0xpc3QubWFwKG89Pntcblx0XHRvLm9mZnNldFggPSBvLm9YLW93blg7XG5cdFx0by5vZmZzZXRZID0gby5vWS1vd25ZO1xuXHRcdHJldHVybiBvO1xuXHR9KTtcbn1cblxuLyoqIOmnkuOBruenu+WLleWIpOWumlxuICogQHBhcmFtIHtCb2FyZH0gYm9hcmQgLSDjg5zjg7zjg4lcbiAqIEBwYXJhbSB7UGllY2V9IHBpZWNlIC0g6aeSXG4gKiBAcGFyYW0ge251bWJlcn0gcFggLSDjg57jgrnnm67jga7liJdcbiAqIEBwYXJhbSB7bnVtYmVyfSBwWSAtIOODnuOCueebruOBruihjFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVGFyZ2V0KGJvYXJkLCBwaWVjZSwgcFgsIHBZKXtcblx0Y29uc3Qge2ZpZWxkLCB5TGVuLCBlblBhc3NhbnR9ID0gYm9hcmQ7XG5cblx0LyoqIOODnuOCueebruW6p+aomeOBjOODnOODvOODieevhOWbsuWGheOBi+WIpOWumlxuXHQgKiBAcGFyYW0ge251bWJlcn0geCAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruWIl1xuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruihjFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGZ1bmN0aW9uIGluRmllbGQoeCwgeSl7XG5cdFx0cmV0dXJuIGZpZWxkW3ldICYmIGZpZWxkW3ldW3hdICYmICFmaWVsZFt5XVt4XS5oYXNBdHRyKFwia2VlcE91dFwiKTtcblx0fVxuXG5cdC8qKiDljIXlkIzlo6vjgafjgYLjgovjgYtcblx0ICogQHBhcmFtIHtQYW5lbH0gcGFuZWwgLSDjg57jgrnnm65cblx0ICovXG5cdGZ1bmN0aW9uIGlzVnNQbyhwYW5lbCl7XG5cdFx0cmV0dXJuIHBhbmVsLnBpZWNlICYmIHBpZWNlLmhhc0F0dHIoXCJwb1wiKSAmJiBwYW5lbC5waWVjZS5oYXNBdHRyKFwicG9cIik7XG5cdH1cblxuXHQvKiog5a++6LGh6aeS44GM54Ku44Gn5Y+W44KM44KL44GLXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Oe44K555uuXG5cdCAqL1xuXHRmdW5jdGlvbiBpc0F0dGFja0Zyb21QYW8ocGFuZWwpe1xuXHRcdHJldHVybiBwYW5lbC5waWVjZVxuXHRcdFx0JiYgIXBpZWNlLmlzTW92ZWRcblx0XHRcdCYmICFwYW5lbC5waWVjZS5pc01vdmVkXG5cdFx0XHQmJiBwaWVjZS5oYXNBdHRyKFwicGFvXCIpXG5cdFx0XHQmJiBwaWVjZS5jb3N0IDwgcGFuZWwucGllY2UuY29zdDtcblx0fVxuXG5cdC8qKiDnp7vli5Xlj6/og73jgYvliKTlrppcblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IHggLSDliKTlrprjgZnjgovjg57jgrnnm67jga7liJdcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgLSDliKTlrprjgZnjgovjg57jgrnnm67jga7ooYxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlTmFtZSAtIOenu+WLleevhOWbsuOBruWumue+qeWQjVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrUml2YWxEZWcgLSDmlbXjga7pp5Ljga7jgb/jgpLnp7vli5XlhYjjgajjgZnjgovjgYs/XG5cdCAqIEByZXR1cm5zIGJvb2xlYW5cblx0ICovXG5cdGZ1bmN0aW9uIGNhbk1vdmUoaXNBdHRhY2ssIHgsIHksIHJhbmdlTmFtZT1cIlwiLCBjaGVja1JpdmFsRGVnPXRydWUpe1xuXHRcdGlmKCFmaWVsZFt5XSB8fCAhZmllbGRbeV1beF0pIHJldHVybiBmYWxzZTtcblx0XHRjb25zdCBwYW5lbCA9IGZpZWxkW3ldW3hdO1xuXHRcdGlmKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKGlzVnNQbyhwYW5lbCkpIHJldHVybiBmYWxzZTtcblx0XHRpZihpc0F0dGFja0Zyb21QYW8ocGFuZWwpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYocmFuZ2VOYW1lID09PSBcImVuUGFzc2FudFwiICYmICFlblBhc3NhbnQuaXNUYXJnZXQocGFuZWwsIHBpZWNlKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKHBpZWNlLmhhc0F0dHIoXCJpblBhbGFjZVwiKSAmJiAhcGFuZWwuaGFzQXR0cihcInBhbGFjZVwiKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKHJhbmdlTmFtZS5pbmRleE9mKFwicGFsYWNlXCIpID09PSAwICYmICEocGFuZWwuaGFzQXR0cihyYW5nZU5hbWUpICYmIGZpZWxkW3BZXVtwWF0uaGFzQXR0cihyYW5nZU5hbWUpKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKHBpZWNlLmhhc0F0dHIoXCJ1bkNyb3NzUml2ZXJcIikgJiYgeUxlbi0oMHx5TGVuLzIpIDw9IGJvYXJkLmdldFJvdyh4LCB5LCBwaWVjZS5kZWcpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYoIWlzQXR0YWNrKSByZXR1cm4gIWZpZWxkW3ldW3hdLnBpZWNlO1xuXHRcdGlmKCFmaWVsZFt5XVt4XS5waWVjZSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKGNoZWNrUml2YWxEZWcpIHJldHVybiBwaWVjZS5kZWcgIT09IGZpZWxkW3ldW3hdLnBpZWNlLmRlZztcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKiDlrZDjgajjgarjgovnp7vli5Xnr4Tlm7Ljgavpp5LjgYzlrZjlnKjjgZnjgovjgYtcblx0ICogQHBhcmFtIHtzdHJpbmdbXX0gcmFuZ2UgLSDnp7vli5Xnr4Tlm7Lmg4XloLFcblx0ICogQHBhcmFtIHtzdHJpbmdbXX0gY2hpbGQgLSDlrZDjgajjgarjgovmloflrZfjga7kuIDopqdcblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IG9YIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOihjClcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9ZIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOWIlylcblx0ICogQHJldHVybnMgYm9vbGVhblxuXHQgKi9cblx0ZnVuY3Rpb24gZXhpc3RzQ2hpbGQocmFuZ2UsIGNoaWxkLCBpc0F0dGFjaywgb1gsIG9ZKXtcblx0XHRmb3IoY29uc3QgY2hhciBvZiBjaGlsZCl7XG5cdFx0XHRmb3IobGV0IHJZPTA7clk8cmFuZ2UubGVuZ3RoO3JZKyspe1xuXHRcdFx0XHRmb3IobGV0IHJYPTA7clg8cmFuZ2VbclldLmxlbmd0aDtyWCsrKXtcblx0XHRcdFx0XHRjb25zdCBbeCwgeV0gPSBbclgrcFgtb1gsIHJZK3BZLW9ZXTtcblx0XHRcdFx0XHRpZihcblx0XHRcdFx0XHRcdCFpbkZpZWxkKHgsIHkpIHx8XG5cdFx0XHRcdFx0XHRjYW5Nb3ZlKGlzQXR0YWNrLCAwfHgsIDB8eSwgXCJcIiwgZmFsc2UpIHx8XG5cdFx0XHRcdFx0XHRyYW5nZVtyWV1bclhdICE9PSBjaGFyXG5cdFx0XHRcdFx0KSBjb250aW51ZTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKiDnp7vli5XlhYjooajnpLrjgpLoqK3lrppcblx0ICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlTmFtZSAtIOenu+WLleevhOWbsuOBruWumue+qeWQjVxuXHQgKiBAcGFyYW0ge251bWJlcn0geCAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruWIl1xuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruihjFxuXHQgKi9cblx0ZnVuY3Rpb24gc2V0VGFyZ2V0KHJhbmdlTmFtZSwgeCwgeSl7XG5cdFx0Y29uc3QgcGFuZWwgPSBmaWVsZFt5XVt4XTtcblx0XHRwYW5lbC5hZGRUYXJnZXQocmFuZ2VOYW1lKTtcblx0XHRlblBhc3NhbnQuc2V0VGFyZ2V0KHBhbmVsLCBwaWVjZSk7XG5cdH1cblxuXHQvKiog54K556e75YuVXG5cdCAqIEBwYXJhbSB7c3RyaW5nW119IHJhbmdlIC0g56e75YuV56+E5Zuy5oOF5aCxXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZU5hbWUgLSDnp7vli5Xnr4Tlm7Ljga7lrprnvqnlkI1cblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IG9YIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOihjClcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9ZIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOWIlylcblx0ICovXG5cdGZ1bmN0aW9uIG1vdmVQb2ludChyYW5nZSwgW3JhbmdlTmFtZSwge2lzQXR0YWNrfV0sIHtvWCwgb1ksIGlzT3dufSl7XG5cdFx0aWYoIWlzT3duKSByZXR1cm47XG5cdFx0Zm9yKGNvbnN0IFtwYXJlbnQsIHtjaGlsZD1bXX09e31dIG9mIHBvaW50Q2hhcnMpe1xuXHRcdFx0Zm9yKGxldCByWT0wO3JZPHJhbmdlLmxlbmd0aDtyWSsrKXtcblx0XHRcdFx0Zm9yKGxldCByWD0wO3JYPHJhbmdlW3JZXS5sZW5ndGg7clgrKyl7XG5cdFx0XHRcdFx0Y29uc3QgW3gsIHldID0gW3JYK3BYLW9YLCByWStwWS1vWV07XG5cdFx0XHRcdFx0aWYoIWluRmllbGQoeCwgeSlcblx0XHRcdFx0XHRcdHx8ICFjYW5Nb3ZlKGlzQXR0YWNrLCB4LCB5LCByYW5nZU5hbWUpXG5cdFx0XHRcdFx0XHR8fCByYW5nZVtyWV1bclhdICE9PSBwYXJlbnRcblx0XHRcdFx0XHRcdHx8IGV4aXN0c0NoaWxkKHJhbmdlLCBjaGlsZCwgZmFsc2UsIG9YLCBvWSkpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdHNldFRhcmdldChyYW5nZU5hbWUsIHgsIHkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqIOebtOe3muenu+WLlVxuXHQgKiBAcGFyYW0ge3N0cmluZ1tdfSByYW5nZSAtIOenu+WLleevhOWbsuaDheWgsVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2VOYW1lIC0g56e75YuV56+E5Zuy44Gu5a6a576p5ZCNXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBdHRhY2sgLSDpp5LjgpLlj5blvpflr77osaHjgavlkKvjgoDjgYs/XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvWCAtIOenu+WLleevhOWbsuaDheWgseOBruWOn+eCueS9jee9rijooYwpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvWSAtIOenu+WLleevhOWbsuaDheWgseOBruWOn+eCueS9jee9rijliJcpXG5cdCAqL1xuXHRmdW5jdGlvbiBtb3ZlTGluZXIocmFuZ2UsIFtyYW5nZU5hbWUsIHtpc0F0dGFja31dLCB7b1gsIG9ZLCBpc093biwgb2Zmc2V0WCwgb2Zmc2V0WX0pe1xuXHRcdGlmKCFpc093biAmJiAhY2FuTW92ZShmYWxzZSwgcFgrb2Zmc2V0WCwgcFkrb2Zmc2V0WSkpIHJldHVybjtcblx0XHRmb3IoY29uc3QgW2NoYXIsIHtqbXBzPTAsIG1vdmVzPTB9PXt9XSBvZiBsaW5lckNoYXJzKXtcblx0XHRcdGNvbnN0IGlzTW92ZUluZiA9ICFtb3ZlcyB8fCAwID09PSBtb3Zlcztcblx0XHRcdC8vIOWOn+eCueOBruWRqOWbsjjjg57jgrnjgpLmjqLntKJcblx0XHRcdGZvcihsZXQgclk9b1ktMTtyWTw9b1krMTtyWSsrKXtcblx0XHRcdFx0Zm9yKGxldCByWD1vWC0xO3JYPD1vWCsxO3JYKyspe1xuXHRcdFx0XHRcdGlmKHJhbmdlW3JZXVtyWF0gIT09IGNoYXIgfHwgclggPT09IG9YICYmIHJZID09PSBvWSkgY29udGludWU7XG5cdFx0XHRcdFx0bGV0IGptcENudCA9IGptcHM/IGptcHM6IDA7XG5cdFx0XHRcdFx0bGV0IG1vdmVDbnQgPSBtb3Zlcz8gbW92ZXM6IDA7XG5cdFx0XHRcdFx0Y29uc3QgW2luY1gsIGluY1ldID0gW3JYLW9YLCByWS1vWV07XG5cdFx0XHRcdFx0Zm9yKGxldCBfeD1wWCxfeT1wWTs7KXtcblx0XHRcdFx0XHRcdF94Kz1pbmNYO1xuXHRcdFx0XHRcdFx0X3krPWluY1k7XG5cdFx0XHRcdFx0XHRjb25zdCB4PV94K29mZnNldFg7XG5cdFx0XHRcdFx0XHRjb25zdCB5PV95K29mZnNldFk7XG5cdFx0XHRcdFx0XHRpZighaW5GaWVsZCh4LCB5KSB8fCAhaXNNb3ZlSW5mICYmIG1vdmVDbnQgPT09IDApIGJyZWFrO1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNKdW1wZWQgPSAwID09PSBqbXBDbnQ7XG5cdFx0XHRcdFx0XHRpZihpc0p1bXBlZCAmJiBjYW5Nb3ZlKGlzQXR0YWNrLCB4LCB5LCByYW5nZU5hbWUsIGlzSnVtcGVkKSl7XG5cdFx0XHRcdFx0XHRcdG1vdmVDbnQtLTtcblx0XHRcdFx0XHRcdFx0c2V0VGFyZ2V0KHJhbmdlTmFtZSwgeCwgeSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGptcHM8MSl7XG5cdFx0XHRcdFx0XHRcdG1vdmVDbnQtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IHBhbmVsID0gZmllbGRbeV1beF07XG5cdFx0XHRcdFx0XHRpZihwYW5lbC5waWVjZSl7XG5cdFx0XHRcdFx0XHRcdGptcENudC0tO1xuXHRcdFx0XHRcdFx0XHRpZihpc0p1bXBlZCB8fCBpc1ZzUG8ocGFuZWwpKSBicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyDjg6HjgqTjg7Plh6bnkIZcblx0KGZ1bmN0aW9uKCl7XG5cdFx0Y29uc3QgcmFuZ2VNYXAgPSBwaWVjZS5nZXRSYW5nZSgpO1xuXHRcdHJhbmdlTWFwLmF0dGFjayA/Pz0gcmFuZ2VNYXAuZGVmYXVsdDtcblx0XHRmb3IoY29uc3QgcmFuZ2VPcHRpb24gb2YgcmFuZ2VPcHRpb25zKXtcblx0XHRcdGNvbnN0IHJhbmdlTmFtZSA9IHJhbmdlT3B0aW9uWzBdO1xuXHRcdFx0Ly8g5Yid5Zue56e75YuV56K66KqNXG5cdFx0XHRpZihwaWVjZS5pc01vdmVkICYmIFtcInN0YXJ0XCIsIFwiY2FzdGxpbmdcIl0uaW5jbHVkZXMocmFuZ2VOYW1lKSkgY29udGludWU7XG5cblx0XHRcdGNvbnN0IHJhbmdlID0gcmFuZ2VNYXBbcmFuZ2VOYW1lXTtcblx0XHRcdGlmKCFyYW5nZSkgY29udGludWU7XG5cdFx0XHRmb3IoY29uc3Qgb3JpZ2luIG9mIGdldE9yaWdpbihyYW5nZSkpe1xuXHRcdFx0XHQvLyDngrnnp7vli5Vcblx0XHRcdFx0bW92ZVBvaW50KHJhbmdlLCByYW5nZU9wdGlvbiwgb3JpZ2luKTtcblx0XHRcdFx0Ly8g55u057ea56e75YuVXG5cdFx0XHRcdG1vdmVMaW5lcihyYW5nZSwgcmFuZ2VPcHRpb24sIG9yaWdpbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xufSIsImltcG9ydCB7Qm9hcmR9IGZyb20gXCIuL2JvYXJkLmpzXCI7XG5pbXBvcnQge1BhbmVsfSBmcm9tIFwiLi9wYW5lbC5qc1wiO1xuaW1wb3J0IHtjaGVja1RhcmdldH0gZnJvbSBcIi4vY2hlY2tUYXJnZXQuanNcIjtcblxuLyoqIOODnuOCpuOCueOCs+ODs+ODiOODreODvOODq1xuICogQHBhcmFtIHtCb2FyZH0gYm9hcmQgLSDnm6RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVJQ29udHJvbChib2FyZCl7XG5cdGxldCBpc0NsaWNrID0gZmFsc2U7XG5cdGxldCBsYXN0WFkgPSBbXTtcblx0bGV0IHNlbGVjdFBhbmVsID0gbnVsbDtcblx0bGV0IHNlbGVjdFN0YW5kID0gbnVsbDtcblx0Y29uc3Qge2NhbnZhc30gPSBib2FyZDtcblxuXHQvKiog44Oe44K555uu44Gr5a++44GZ44KL5Yem55CGXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGUgLSDjgqTjg5njg7Pjg4jlvJXmlbBcblx0ICogQHBhcmFtIHsoXG5cdCAqICAgICBwYW5lbDogUGFuZWwsXG5cdCAqICAgICB4OiBudW1iZXIsXG5cdCAqICAgICB5OiBudW1iZXIsXG5cdCAqICk9PnZvaWR9IGZuUGFuZWwgLSDjg57jgrnnm67jga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcblx0ICogQHBhcmFtIHsoXG5cdCAqICAgICB4OiBudW1iZXIsXG5cdCAqICAgICB5OiBudW1iZXIsXG5cdCAqICk9PnZvaWR9IGZuQWZ0ZXIgLSDlvozlh6bnkIbjga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgKi9cblx0Y29uc3QgZmllbGRQcm9jID0gKGUsIGZuUGFuZWwsIGZuQWZ0ZXI9KCk9Pnt9KT0+e1xuXHRcdGNvbnN0IHZpZXdTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcyk7XG5cdFx0Y29uc3QgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdGxldCB4ID0gY2FudmFzLndpZHRoL3BhcnNlRmxvYXQodmlld1N0eWxlLndpZHRoKTtcblx0XHRsZXQgeSA9IGNhbnZhcy5oZWlnaHQvcGFyc2VGbG9hdCh2aWV3U3R5bGUuaGVpZ2h0KTtcblx0XHRpZihlLmNsaWVudFgpe1xuXHRcdFx0eCAqPSBlLmNsaWVudFgtcmVjdC5sZWZ0O1xuXHRcdFx0eSAqPSBlLmNsaWVudFktcmVjdC50b3A7XG5cdFx0fVxuXHRcdGVsc2UgaWYoMCA8IGUudG91Y2hlcy5sZW5ndGgpe1xuXHRcdFx0aWYoMSA8IGUudG91Y2hlcy5sZW5ndGgpIHJldHVybjtcblx0XHRcdHggKj0gZS50b3VjaGVzWzBdLmNsaWVudFgtcmVjdC5sZWZ0O1xuXHRcdFx0eSAqPSBlLnRvdWNoZXNbMF0uY2xpZW50WS1yZWN0LnRvcDtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFt4LCB5XSA9IGxhc3RYWTtcblx0XHR9XG5cdFx0Ym9hcmQuZmllbGQuZm9yRWFjaCgocm93LCBwWSkgPT5cblx0XHRcdHJvdy5mb3JFYWNoKChwYW5lbCwgcFgpID0+XG5cdFx0XHRcdGZuUGFuZWwocGFuZWwsIHgsIHksIHBYLCBwWSkpKTtcblx0XHRmbkFmdGVyKHgsIHkpO1xuXHRcdGJvYXJkLmRyYXcoKTtcblx0XHRsYXN0WFkgPSBbeCwgeV07XG5cdH07XG5cblx0LyoqIOODieODqeODg+OCsOmWi+Wni1xuXHQgKiBAcGFyYW0ge0V2ZW50fSBlIC0g44Kk44OZ44Oz44OI5byV5pWwXG4gICAgICovXG5cdGNvbnN0IGRyYWdTdGFydCA9IGU9Pntcblx0XHRpc0NsaWNrID0gdHJ1ZTtcblx0XHRmaWVsZFByb2MoZSxcblx0XHRcdChwYW5lbCwgeCwgeSk9Pntcblx0XHRcdFx0Y29uc3Qge3BpZWNlLCBwWCwgcFl9ID0gcGFuZWw7XG5cblx0XHRcdFx0aWYocGllY2UgJiYgcGFuZWwuY2hlY2tSYW5nZU1vdXNlKHgsIHkpKXtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cGllY2UuaXNTZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0c2VsZWN0UGFuZWwgPSBwYW5lbDtcblx0XHRcdFx0XHRjaGVja1RhcmdldChib2FyZCwgcGllY2UsIHBYLCBwWSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoeCwgeSk9Pntcblx0XHRcdFx0Zm9yKGNvbnN0IFtkZWcsIHN0b2NrXSBvZiBib2FyZC5zdGFuZC5zdG9ja3Mpe1xuXHRcdFx0XHRcdGZvcihsZXQgaT1zdG9jay5sZW5ndGgtMTswPD1pO2ktLSl7XG5cdFx0XHRcdFx0XHRpZighc3RvY2tbaV0uY2hlY2tSYW5nZU1vdXNlKHgsIHkpKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHN0b2NrW2ldLmlzU2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0c2VsZWN0U3RhbmQgPSB7ZGVnOmRlZywgaTppfTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdC8qKiDjg4njg6njg4PjgrDkuK1cblx0ICogQHBhcmFtIHthbnl9IGUgLSDjgqTjg5njg7Pjg4jlvJXmlbBcblx0ICovXG5cdGNvbnN0IGRyYWdNb3ZlID0gZT0+e1xuXHRcdGlmKCFpc0NsaWNrIHx8ICEoc2VsZWN0UGFuZWwgfHwgc2VsZWN0U3RhbmQpKSByZXR1cm47XG5cdFx0ZmllbGRQcm9jKGUsXG5cdFx0XHQocGFuZWwsIHgsIHkpPT57XG5cdFx0XHRcdHBhbmVsLmlzU2VsZWN0ZWQgPSBwYW5lbC5jaGVja1JhbmdlTW91c2UoeCwgeSk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8qKiDjg4njg6njg4PjgrDntYLkuoZcblx0ICogQHBhcmFtIHtFdmVudH0gZSAtIOOCpOODmeODs+ODiOW8leaVsFxuXHQgKi9cblx0Y29uc3QgZHJhZ0VuZCA9IGU9Pntcblx0XHRpc0NsaWNrID0gZmFsc2U7XG5cdFx0ZmllbGRQcm9jKGUsXG5cdFx0XHQocGFuZWwsIHgsIHkpPT57XG5cdFx0XHRcdGlmKCFwYW5lbC5jaGVja1JhbmdlTW91c2UoeCwgeSkpIHJldHVybjtcblx0XHRcdFx0aWYoc2VsZWN0UGFuZWwpe1xuXHRcdFx0XHRcdGJvYXJkLm1vdmVQaWVjZShzZWxlY3RQYW5lbCwgcGFuZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHNlbGVjdFN0YW5kICYmICFwYW5lbC5waWVjZSl7XG5cdFx0XHRcdFx0Ym9hcmQuc3RhbmQucmVsZWFzZVBpZWNlKHBhbmVsLCBzZWxlY3RTdGFuZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHRcdGZpZWxkUHJvYyhlLFxuXHRcdFx0cGFuZWw9Pntcblx0XHRcdFx0aWYocGFuZWwucGllY2UpIHBhbmVsLnBpZWNlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0cGFuZWwuaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRwYW5lbC5jbGVhclRhcmdldCgpO1xuXHRcdFx0fSxcblx0XHRcdCgpPT57XG5cdFx0XHRcdGZvcihjb25zdCBbZGVnLCBzdG9ja10gb2YgYm9hcmQuc3RhbmQuc3RvY2tzKXtcblx0XHRcdFx0XHRmb3IobGV0IGk9c3RvY2subGVuZ3RoLTE7MDw9aTtpLS0pe1xuXHRcdFx0XHRcdFx0c3RvY2tbaV0uaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxlY3RQYW5lbCA9IG51bGw7XG5cdFx0XHRcdHNlbGVjdFN0YW5kID0gbnVsbDtcblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdC8vIOOCpOODmeODs+ODiOODquOCueODiuODvOOCkuS9nOaIkFxuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkcmFnU3RhcnQpO1xuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkcmFnTW92ZSk7XG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBkcmFnRW5kKTtcblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGRyYWdTdGFydCk7XG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGRyYWdNb3ZlKTtcblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBkcmFnRW5kKTtcblxuXHQvKiog44Kk44OZ44Oz44OI44Oq44K544OK44O844KS56C05qOEICovXG5cdHJldHVybiB7XG5cdFx0cmVtb3ZlRXZlbnQoKXtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRyYWdTdGFydCk7XG5cdFx0XHRjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkcmFnTW92ZSk7XG5cdFx0XHRjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZHJhZ0VuZCk7XG5cdFx0XHRjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgZHJhZ0VuZCk7XG5cdFx0fVxuXHR9O1xufVxuIiwiaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcblxuLyoqIEJPROW9ouW8j+OBruOBn+OCgeOBrumWouaVsOWumue+qeOBquOBqSAqL1xuZXhwb3J0IGNsYXNzIEJvZHtcblx0LyoqIOinkuW6puOBi+OCiemnkuOBruaWh+Wtl+ihqOekulxuXHQgKiBAdHlwZSB7TWFwPG51bWJlciwgc3RyaW5nPn1cblx0ICovXG5cdHN0YXRpYyAjZGVnMlBpZWNlQ2hhcnMgPSBuZXcgTWFwKFtcblx0XHRbMCwgXCIgXCJdLFxuXHRcdFs5MCwgXCI+XCJdLFxuXHRcdFsxODAsIFwidlwiXSxcblx0XHRbMjcwLCBcIjxcIl1cblx0XSk7XG5cblx0LyoqIOinkuW6puOBi+OCiemnkuOBruato+imj+ihqOePvuihqOekulxuXHQgKiBAdHlwZSB7TWFwPG51bWJlciwgc3RyaW5nPn1cblx0ICovXG5cdHN0YXRpYyAjZGVnMlBpZWNlUmVnZXhlcyA9IG5ldyBNYXAoXG5cdFx0Wy4uLkJvZC4jZGVnMlBpZWNlQ2hhcnNdXG5cdFx0Lm1hcCgoW2EsIGJdKT0+W2EsIG5ldyBSZWdFeHAoYiwgXCJnXCIpXSlcblx0KTtcblxuXHQvKiog6aeS44Gu5paH5a2X44GL44KJ6KeS5bqm6KGo56S6XG5cdCAqIEB0eXBlIHtNYXA8c3RyaW5nLCBudW1iZXI+fVxuXHQgKi9cblx0c3RhdGljICNwaWVjZUNoYXIyRGVncyA9IG5ldyBNYXAoXG5cdFx0Wy4uLkJvZC4jZGVnMlBpZWNlQ2hhcnNdXG5cdFx0Lm1hcCgoW2EsIGJdKT0+W2IsIGFdKVxuXHQpO1xuXG5cdC8qKiDop5LluqbjgYvjgonmjIHpp5Ljga7ooajpoYzooajnpLpcblx0ICogQHR5cGUge01hcDxudW1iZXIsIHN0cmluZz59XG5cdCAqL1xuXHRzdGF0aWMgI2RlZzJTdGFuZFRpdGxlcyA9IG5ldyBNYXAoW1xuXHRcdFswLCBcIuWFiOaJi+OBruaMgemnklwiXSxcblx0XHRbOTAsIFwi5qyh5omL44Gu5oyB6aeSXCJdLFxuXHRcdFsxODAsIFwi5b6M5omL44Gu5oyB6aeSXCJdLFxuXHRcdFsyNzAsIFwi5Zub5omL44Gu5oyB6aeSXCJdXG5cdF0pO1xuXG5cdC8qKiDmjIHpp5Ljga7ooajpoYzjgYvjgonop5LluqbooajnpLpcblx0ICogQHR5cGUge01hcDxzdHJpbmcsIG51bWJlcj59XG5cdCAqL1xuXHRzdGF0aWMgI3N0YW5kVGl0bGUyRGVncyA9IG5ldyBNYXAoXG5cdFx0Wy4uLkJvZC4jZGVnMlN0YW5kVGl0bGVzXVxuXHRcdC5tYXAoKFthLCBiXSk9PltiLCBhXSlcblx0KTtcblxuXHRzdGF0aWMgI2thbkkgPSBbXCJcIixcIuS4gFwiLFwi5LqMXCIsXCLkuIlcIixcIuWbm1wiLFwi5LqUXCIsXCLlha1cIixcIuS4g1wiLFwi5YWrXCIsXCLkuZ1cIl07XG5cdHN0YXRpYyAja2FuWCA9IFtcIlwiLFwi5Y2BXCIsXCLkuozljYFcIixcIuS4ieWNgVwiLFwi5Zub5Y2BXCIsXCLkupTljYFcIixcIuWFreWNgVwiLFwi5LiD5Y2BXCIsXCLlhavljYFcIixcIuS5neWNgVwiXTtcblxuXHQvKiog6KGML+aMgemnkueUqOOBruaVsOWtl+ihqOekuijmvKLmlbDlrZcpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSDmlbDlrZdcblx0ICogQHBhcmFtIHtib29sZWFufSB2aWV3T25lIC0g5LiA44KS6KGo56S6XG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgI251bTJLYW4obnVtLCB2aWV3T25lPXRydWUpe1xuXHRcdGlmKCF2aWV3T25lICYmIG51bTw9MSkgcmV0dXJuIFwiXCI7XG5cdFx0Y29uc3QgaSA9IG51bSUxMDtcblx0XHRjb25zdCB4ID0gMHxudW0vMTA7XG5cdFx0cmV0dXJuIEJvZC4ja2FuWFt4XStCb2QuI2thbklbaV07XG5cdH1cblxuXHQvKiog6KGML+aMgemnkueUqOOBruaVsOWtl+ihqOekuijmvKLmlbDlrZcpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSDmlbDlrZdcblx0ICogQHBhcmFtIHtib29sZWFufSBlbXB0eU9uZSAtIOepuuaWh+Wtl+OCkjHjgajjgZnjgotcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAja2FuMk51bShrYW4sIGVtcHR5T25lPXRydWUpe1xuXHRcdGlmKGVtcHR5T25lICYmIGthbiA9PT0gXCJcIikgcmV0dXJuIDE7XG5cdFx0aWYoIWlzTmFOKGthbikpIHJldHVybiAwfGthbjtcblx0XHRsZXQgeCA9IEJvZC4ja2FuWC5maW5kSW5kZXgoa2V5PT5cblx0XHRcdGtleSAhPT0gXCJcIiAmJiAobmV3IFJlZ0V4cChcIl5cIitrZXkpKS50ZXN0KGthbilcblx0XHQpO1xuXHRcdGlmKHggPCAwKSB4ID0gMDtcblx0XHRsZXQgaSA9IEJvZC4ja2FuSS5maW5kSW5kZXgoa2V5PT5cblx0XHRcdGtleSAhPT0gXCJcIiAmJiAobmV3IFJlZ0V4cChrZXkrXCIkXCIpKS50ZXN0KGthbilcblx0XHQpO1xuXHRcdGlmKGkgPCAwKSBpID0gMDtcblx0XHRyZXR1cm4geCoxMCtpO1xuXHR9XG5cblx0LyoqIOWIl+eUqOOBruaVsOWtl+ihqOekuijlhajop5IvMuahgSlcblx0ICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIOaVsOWtl1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNudW0yWmVuKG51bSl7XG5cdFx0aWYoMTA8PW51bSkgcmV0dXJuIG51bTtcblx0XHRjb25zdCB6ZW4gPSBcIu+8kO+8ke+8ku+8k++8lO+8le+8lu+8l++8mO+8mVwiO1xuXHRcdGNvbnN0IGkgPSBudW0lMTA7XG5cdFx0cmV0dXJuIHplbltpXTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm67jga7ooajnpLpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAjcGFuZWxUZXh0ID0gXCIg44O7XCI7XG5cblx0LyoqIOmnkuOBrkJPROihqOiomFxuXHQgKiBAcGFyYW0ge1BpZWNlfSBwaWVjZSAtIOmnklxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNnZXRQaWVjZVRleHQocGllY2Upe1xuXHRcdGlmKCFwaWVjZSkgcmV0dXJuIEJvZC4jcGFuZWxUZXh0O1xuXHRcdHJldHVybiBCb2QuI2RlZzJQaWVjZUNoYXJzLmdldChwaWVjZS5kZWcpK3BpZWNlLmNoYXI7XG5cdH1cblxuXHQvKiog6aeS5Y+w44GuQk9E6KGo6KiYXG5cdCAqIEBwYXJhbSB7U3RhbmR9IHN0YW5kIC0g6aeS5Y+wXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDop5LluqZcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAjZ2V0U3RhbmRUZXh0KHN0YW5kLCBkZWc9MCl7XG5cdFx0Ly8g6aeS5pWw44Kr44Km44Oz44OIXG5cdFx0Y29uc3QgY291bnRlciA9IG5ldyBNYXAoKTtcblx0XHRzdGFuZC5zdG9ja3MuZ2V0KGRlZykuZm9yRWFjaCgoe2NoYXJ9KT0+e1xuXHRcdFx0aWYoIWNvdW50ZXIuaGFzKGNoYXIpKSBjb3VudGVyLnNldChjaGFyLCAwKTtcblx0XHRcdGNvdW50ZXIuc2V0KGNoYXIsIGNvdW50ZXIuZ2V0KGNoYXIpKzEpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBCb2QuI2RlZzJTdGFuZFRpdGxlcy5nZXQoZGVnKStcIu+8mlwiK1xuXHRcdFx0Wy4uLmNvdW50ZXJdLm1hcCgoW2NoYXIsIGNudF0pPT5cblx0XHRcdFx0Y2hhcitCb2QuI251bTJLYW4oY250LCBmYWxzZSlcblx0XHRcdCkuam9pbihcIiBcIik7XG5cdH1cblxuXHQvKiogQk9E5b2i5byP44Gu44OG44Kt44K544OI44KS44Oc44O844OJ44Gn5omx44GI44KL44KI44GG5aSJ5o+bXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gQk9E5b2i5byP44Gu44OG44Kt44K544OIXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgY29udlNldFRleHQodGV4dCl7XG5cdFx0Y29uc3QgYm9hcmRMaW5lcyA9IFtdO1xuXHRcdGNvbnN0IHN0YW5kTGluZXMgPSBbXTtcblx0XHR0ZXh0LnNwbGl0KC9cXHJ8XFxufFxcclxcbi8pLmZvckVhY2gobGluZT0+e1xuXHRcdFx0aWYoWy4uLkJvZC4jc3RhbmRUaXRsZTJEZWdzLmtleXMoKV0uc29tZSh0aXRsZT0+XG5cdFx0XHRcdG5ldyBSZWdFeHAoYF4ke3RpdGxlfWApLnRlc3QobGluZSkpXG5cdFx0XHQpIHN0YW5kTGluZXMucHVzaChsaW5lKTtcblx0XHRcdGVsc2UgYm9hcmRMaW5lcy5wdXNoKGxpbmUuc2xpY2UoMSkpXG5cdFx0fSk7XG5cblx0XHRsZXQgYm9hcmRTdHIgPSBib2FyZExpbmVzLnNsaWNlKDIsIC0xKS5qb2luKFwiXFxuXCIpO1xuXHRcdEJvZC4jZGVnMlBpZWNlUmVnZXhlcy5mb3JFYWNoKChib2RDaGFyLCBkZWcpPT57XG5cdFx0XHRib2FyZFN0ciA9IGJvYXJkU3RyLnJlcGxhY2UoYm9kQ2hhciwgUGllY2UuZGVnQ2hhcnNbZGVnXSk7XG5cdFx0fSlcblxuXHRcdGNvbnN0IHN0YW5kU3RyID0gc3RhbmRMaW5lcy5mbGF0TWFwKGxpbmU9Pntcblx0XHRcdGNvbnN0IFt0aXRsZSwgcGFyYW1TdHJdID0gbGluZS5zcGxpdCgv77yaLyk7XG5cdFx0XHRpZihwYXJhbVN0ciA9PT0gXCJcIikgcmV0dXJuIFwiXCI7XG5cdFx0XHRjb25zdCBkZWcgPSBCb2QuI3N0YW5kVGl0bGUyRGVncy5nZXQodGl0bGUpO1xuXHRcdFx0Y29uc3QgZGVnQ2hhciA9IFBpZWNlLmRlZ0NoYXJzW2RlZ107XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBwYXJhbVN0clxuXHRcdFx0XHQuc3BsaXQoL1xccy8pXG5cdFx0XHRcdC5tYXAocGFyYW09Pntcblx0XHRcdFx0XHRjb25zdCBwaWVjZUNoYXIgPSBwYXJhbVswXTtcblx0XHRcdFx0XHRjb25zdCBrYW4gPSBwYXJhbS5zbGljZSgxKTtcblx0XHRcdFx0XHRyZXR1cm4gKGRlZ0NoYXIrcGllY2VDaGFyKS5yZXBlYXQoQm9kLiNrYW4yTnVtKGthbikpO1xuXHRcdFx0XHR9KTtcblx0XHRcdHJldHVybiBwYXJhbXM7XG5cdFx0fSkuam9pbihcIlwiKTtcblxuXHRcdHJldHVybiBgJHtib2FyZFN0cn1cXG4ke3N0YW5kU3RyfWA7XG5cdH1cblxuXHQvKiogQk9E5b2i5byP44OG44Kt44K544OI44KS5Y+W5b6XXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgZ2V0VGV4dChib2FyZCl7XG5cdFx0Y29uc3Qge2ZpZWxkLCB4TGVuLCBwbGF5ZXJzLCBzdGFuZH0gPSBib2FyZDtcblxuXHRcdGxldCBoZWFkZXIgPVxuXHRcdFx0YCAke1suLi5BcnJheSh4TGVuKS5rZXlzKCldLm1hcChpPT5gICR7Qm9kLiNudW0yWmVuKHhMZW4taSl9YCkuam9pbihcIlwiKX1cXG5gK1xuXHRcdFx0YCske0FycmF5KHhMZW4pLmZpbGwoXCItLS1cIikuam9pbihcIlwiKX0rXFxuYDtcblx0XHRsZXQgZm9vdGVyID0gYFxcbiske0FycmF5KHhMZW4pLmZpbGwoXCItLS1cIikuam9pbihcIlwiKX0rYDtcblx0XHRsZXQgcGFuZWxPdXRlciA9IFwifFwiO1xuXHRcdGxldCBwYW5lbFNlcCA9IFwiXCI7XG5cdFx0bGV0IHJvd1NlcCA9IFwiXFxuXCI7XG5cdFx0bGV0IHN0YW5kSGVhZGVyID0gYCR7Qm9kLiNnZXRTdGFuZFRleHQoc3RhbmQsIDE4MCl9XFxuYDtcblx0XHRsZXQgc3RhbmRGb290ZXIgPSBgJHtCb2QuI2dldFN0YW5kVGV4dChzdGFuZCwgMCl9YDtcblx0XHRpZihwbGF5ZXJzICE9PSAyKXtcblx0XHRcdHN0YW5kSGVhZGVyID0gYCR7Qm9kLiNnZXRTdGFuZFRleHQoc3RhbmQsIDI3MCl9XFxuYCtzdGFuZEhlYWRlcjtcblx0XHRcdHN0YW5kRm9vdGVyID0gYCR7Qm9kLiNnZXRTdGFuZFRleHQoc3RhbmQsIDkwKX1cXG5gK3N0YW5kRm9vdGVyO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHRzdGFuZEhlYWRlcitcblx0XHRcdGhlYWRlcitcblx0XHRcdGZpZWxkLm1hcCgocm93LCBpKT0+XG5cdFx0XHRcdHBhbmVsT3V0ZXIrXG5cdFx0XHRcdHJvdy5tYXAocGFuZWw9PlxuXHRcdFx0XHRcdEJvZC4jZ2V0UGllY2VUZXh0KHBhbmVsLnBpZWNlKVxuXHRcdFx0XHQpLmpvaW4ocGFuZWxTZXApK1xuXHRcdFx0XHRwYW5lbE91dGVyK1xuXHRcdFx0XHRCb2QuI251bTJLYW4oaSsxKVxuXHRcdFx0KS5qb2luKHJvd1NlcCkrXG5cdFx0XHRmb290ZXIrXCJcXG5cIitcblx0XHRcdHN0YW5kRm9vdGVyXG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcbmltcG9ydCB7Qm9kfSBmcm9tIFwiLi9ib2QuanNcIjtcblxuLyoqIOebpOOBrueuoeeQhuOCr+ODqeOCuSAqL1xuZXhwb3J0IGNsYXNzIFN0YW5ke1xuXHQvKiog6aeS5Y+w44G444Gu6KeS5bqm44GU44Go44Gu6KGo56S66aCGXG5cdCAqIEB0eXBlIHtudW1iZXJbXX1cblx0ICovXG5cdHN0YXRpYyAjZGVnT3JkZXIgPSBbMTgwLCA5MCwgMjcwLCAwXTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtCb2FyZH0g44Oc44O844OJXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihib2FyZCl7XG5cdFx0dGhpcy5ib2FyZCA9IGJvYXJkO1xuXHRcdGNvbnN0IHt0b3AsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQsIHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0LCB4TGVuLCB5TGVufSA9IGJvYXJkO1xuXG5cdFx0dGhpcy5jbGVhcigpO1xuXHRcdHRoaXMubGVmdCA9IHJpZ2h0KjEuMDI7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoLzI7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5yaWdodCA9IHRoaXMubGVmdCt0aGlzLndpZHRoO1xuXHRcdHRoaXMuYm90dG9tID0gYm90dG9tO1xuXHRcdHRoaXMucGl0Y2hXaWR0aCA9IHBhbmVsV2lkdGgvMjtcblx0XHR0aGlzLnBpdGNoSGVpZ2h0ID0gcGFuZWxIZWlnaHQ7XG5cdFx0dGhpcy54TGVuID0geExlbjtcblx0XHR0aGlzLnlMZW4gPSB5TGVuO1xuXHR9XG5cblx0LyoqIOmnkuWPsOOCkuWIneacn+WMluOBq+OBmeOCiyAqL1xuXHRjbGVhcigpe1xuXHRcdHRoaXMuc3RvY2tzID0gbmV3IE1hcChTdGFuZC4jZGVnT3JkZXIubWFwKGk9PltpLFtdXSkpO1xuXHR9XG5cblx0LyoqIOaMgeOBoemnkuOBi+OCieODnOODvOODieS4iuOBq+mFjee9ruOBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmFsfSB0b1BhbmVsbCAtIOmFjee9ruWFiOOBruODkeODjeODq1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uIC0g44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uZGVnIC0g6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uaSAtIOmFjee9ruOBmeOCi+aMgeOBoemnkuOBruOCpOODs+ODh+ODg+OCr+OCuVxuXHQgKi9cblx0cmVsZWFzZVBpZWNlKHRvUGFuZWwsIG9wdGlvbj17fSl7XG5cdFx0Y29uc3Qge2RlZywgaX0gPSBvcHRpb25cblx0XHRjb25zdCB7Ym9hcmR9ID0gdGhpcztcblx0XHRjb25zdCBzdG9jayA9IHRoaXMuc3RvY2tzLmdldChkZWcpO1xuXHRcdHRvUGFuZWwucGllY2UgPSBzdG9ja1tpXTtcblx0XHRzdG9ja1tpXS5jZW50ZXIgPSB0b1BhbmVsLmNlbnRlcjtcblx0XHRzdG9ja1tpXS5taWRkbGUgPSB0b1BhbmVsLm1pZGRsZTtcblx0XHRib2FyZC5hZGRSZWNvcmQodG9QYW5lbCwge2VuZDogXCLmiZNcIn0pO1xuXHRcdHN0b2NrLnNwbGljZShpLDEpO1xuXHR9XG5cblx0LyoqIOmnkuWPsOOBq+i/veWKoOOBmeOCi1xuXHQgKiBAcGFyYW0ge1BpZWNlfSBwaWVjZSAtIOi/veWKoOOBmeOCi+mnklxuXHQgKi9cblx0YWRkKHBpZWNlKXtcblx0XHRjb25zdCBzdG9jayA9IHRoaXMuc3RvY2tzLmdldChwaWVjZS5kZWcpO1xuXHRcdHBpZWNlLnR1cm5Gcm9udCgpO1xuXHRcdHN0b2NrLnB1c2gocGllY2UpO1xuXHRcdHN0b2NrLnNvcnQoKGEsYik9Pk1hdGguc2lnbihhLmlkLWIuaWQpKTtcblx0fVxuXG5cdC8qKiDpp5LjgpLmjIHjgaHpp5LjgavjgZnjgotcblx0ICogQHBhcmFtIHtQaWVjZXxudWxsfSB3aW5uZXJQaWVjZSAtIOenu+WLleOBmeOCi+mnklxuXHQgKiBAcGFyYW0ge1BpZWNlfSBsb3NlclBpZWNlIC0g5o2V57ib44GV44KM44KL6aeSXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2VDYXB0dXJlIC0g5bGe5oCn44KS54Sh6KaW44GX44Gm5o2V57ib44GZ44KLXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2VDYW50Q2FwdHVyZSAtIOWxnuaAp+OCkueEoeimluOBl+OBpuaNlee4m+OBl+OBquOBhFxuXHQgKi9cblx0Y2FwdHVyZVBpZWNlKHdpbm5lclBpZWNlLCBsb3NlclBpZWNlLCBmb3JjZUNhcHR1cmU9ZmFsc2UsIGZvcmNlQ2FudENhcHR1cmU9ZmFsc2Upe1xuXHRcdGlmKGZvcmNlQ2FudENhcHR1cmVcblx0XHRcdHx8ICFsb3NlclBpZWNlXG5cdFx0XHR8fCAhKGZvcmNlQ2FwdHVyZSB8fCB3aW5uZXJQaWVjZS5oYXNBdHRyKFwiY2FwdHVyZVwiKSlcblx0XHRcdHx8IGxvc2VyUGllY2UuaGFzQXR0cihcImtpbmdcIilcblx0XHRcdHx8IGxvc2VyUGllY2UuaGFzQXR0cihcImNhbnRDYXB0dXJlXCIpXG5cdFx0KSByZXR1cm47XG5cblx0XHRsb3NlclBpZWNlLmRlZyA9IHdpbm5lclBpZWNlLmRlZztcblx0XHRsb3NlclBpZWNlLmlzTW92ZWQgPSB0cnVlO1xuXHRcdHRoaXMuYWRkKGxvc2VyUGllY2UpO1xuXHR9XG5cblx0LyoqIOebpOOCkuaPj+WGmSAqL1xuXHRkcmF3KCl7XG5cdFx0Y29uc3Qge2JvYXJkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIHBpdGNoV2lkdGgsIHBpdGNoSGVpZ2h0fSA9IHRoaXM7XG5cdFx0Y29uc3Qge2N0eCwgeExlbiwgeUxlbn0gPSBib2FyZDtcblxuXHRcdC8vIOWkluaeoOOCkuaPj+WGmVxuXHRcdGN0eC5maWxsU3R5bGUgPSBib2FyZC5iYWNrZ3JvdW5kQ29sb3I7XG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gYm9hcmQuYm9yZGVyQ29sb3I7XG5cdFx0Y3R4LmxpbmVXaWR0aCA9IGJvYXJkLmJvcmRlcldpZHRoO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cblx0XHQvLyDjgZnjgbnjgabjga7pp5LjgpLooajnpLrnr4Tlm7LlpJbjgbjnp7vli5Vcblx0XHQvKnRoaXMuc3RvY2tzLmZsYXQoKS5mb3JFYWNoKHBpZWNlPT57XG5cdFx0XHRwaWVjZS5jZW50ZXIgPSAtMTAwMDtcblx0XHRcdHBpZWNlLm1pZGRsZSA9IC0xMDAwO1xuXHRcdH0pOyovXG5cdFx0Wy4uLnRoaXMuc3RvY2tzLnZhbHVlcygpXS5mb3JFYWNoKChzdG9jaywgcGxheWVyKT0+e1xuXHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0Ly8g5rqi44KM44Gf5aC05ZCI44Gv5b6M5pa55YSq5YWI44Gn6KGo56S6XG5cdFx0XHRzdG9jayA9IHN0b2NrLnNsaWNlKC15TGVuLzQqeExlbik7XG5cdFx0XHRmb3IobGV0IHBZPTB8eUxlbi80KnBsYXllcjtwWTx5TGVuLzQqKHBsYXllcisxKTtwWSsrKXtcblx0XHRcdFx0Zm9yKGxldCBwWD0wO3BYPHhMZW47cFgrKyl7XG5cdFx0XHRcdFx0Y29uc3QgY2VudGVyID0gbGVmdCtwaXRjaFdpZHRoKihwWCsxKTtcblx0XHRcdFx0XHRjb25zdCBtaWRkbGUgPSB0b3ArcGl0Y2hIZWlnaHQqKHBZKzEpO1xuXHRcdFx0XHRcdGNvbnN0IHBpZWNlID0gc3RvY2tbaSsrXTtcblx0XHRcdFx0XHRpZihwaWVjZSA9PSBudWxsKSBicmVhaztcblx0XHRcdFx0XHRwaWVjZS5jZW50ZXIgPSBjZW50ZXI7XG5cdFx0XHRcdFx0cGllY2UubWlkZGxlID0gbWlkZGxlO1xuXHRcdFx0XHRcdHBpZWNlLmRyYXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+W9ouW8j+OBp+WPluW+l1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTWluaW1hbSAtIOewoeaYk+ihqOekulxuXHQgKi9cblx0dG9TdHJpbmcoaXNNaW5pbWFtPWZhbHNlKXtcblx0XHRjb25zdCB7eExlbn0gPSB0aGlzLmJvYXJkO1xuXHRcdGNvbnN0IHN0b2NrID0gWy4uLnRoaXMuc3RvY2tzLnZhbHVlcygpXS5mbGF0KCkuZmlsdGVyKHY9PnYpO1xuXG5cdFx0bGV0IGhlYWQgPSAwIDwgc3RvY2subGVuZ3RoPyBcIlxcblwiK1wi4oCVXCIucmVwZWF0KHhMZW4qMikrXCJcXG5cIjogXCJcIjtcblx0XHRsZXQgdGV4dCA9IHN0b2NrLm1hcChvPT5cIlwiK28pLmpvaW4oXCJcIik7XG5cdFx0aWYoIWlzTWluaW1hbSl7XG5cdFx0XHRoZWFkID0gXCJcIjtcblx0XHRcdGZvcihjb25zdCBjaGFyIG9mIE9iamVjdC52YWx1ZXMoUGllY2UuZGVnQ2hhcnMpKXtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZShjaGFyLCBcIlxcblwiK2Ake2NoYXJ95oyB6aeS77yaJHtjaGFyfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaGVhZCt0ZXh0O1xuXHR9XG59XG4iLCJpbXBvcnQge1BhbmVsfSBmcm9tIFwiLi9wYW5lbC5qc1wiO1xuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcblxuY29uc3QgZGVncyA9IE9iamVjdC5rZXlzKFBpZWNlLmRlZ0NoYXJzKTtcbmNvbnN0IGdldEluaXQgPSAoKT0+KHtcblx0cGFuZWw6IG51bGwsXG5cdHBpZWNlOiBudWxsXG59KTtcblxuLyoqIOOCouODs+ODkeODg+OCteODs+aDheWgseOBrueuoeeQhiAqL1xuZXhwb3J0IGNsYXNzIEVuUGFzc2FudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLmRlZ3MgPSB7fTtcblx0XHRkZWdzLmZvckVhY2goZGVnPT50aGlzLmRlZ3NbZGVnXSA9IGdldEluaXQoKSk7XG5cdH1cblxuXHQvKiog44Ki44Oz44OR44OD44K144Oz5oOF5aCx44KS44Kv44Oq44KiXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDjgqLjg7Pjg5Hjg4PjgrXjg7PjgZXjgozjgYbjgovpmaPllrbjga7op5LluqZcblx0ICovXG5cdGNsZWFyKGRlZyl7XG5cdFx0dGhpcy5kZWdzW2RlZ10gPSBnZXRJbml0KCk7XG5cdH1cblxuXHQvKiog44Ki44Oz44OR44OD44K144Oz5a++6LGh44Go5oiQ44KK44GG44KL44Oe44K55oOF5aCx44KS6KiY6YyyXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Ki44Oz44OR44OD44K144Oz5a++6LGh44Go5oiQ44KK44GG44KL44Oe44K555uuXG5cdCAqIEBwYXJhbSB7UGllY2V9IHBpZWNlIC0g44Ki44Oz44OR44OD44K144Oz5a++6LGh44Go5oiQ44KK44GG44KL6aeSXG5cdCAqL1xuXHRzZXRUYXJnZXQocGFuZWwsIHBpZWNlKXtcblx0XHRpZihwYW5lbC5oYXNUYXJnZXQoXCJzdGFydFwiKSAmJiBwaWVjZS5oYXNBdHRyKFwiZW5QYXNzYW50XCIpKVxuXHRcdFx0dGhpcy5kZWdzW3BpZWNlLmRlZ10ucGFuZWwgPSBwYW5lbDtcblx0fVxuXG5cdC8qKiDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovpp5Lmg4XloLHjgpLoqJjpjLJcblx0ICogQHBhcmFtIHtQYW5lbH0gdG9QYW5lbCAtIOOCouODs+ODkeODg+OCteODs+WvvuixoeOBi+eiuuiqjeOBmeOCi+ODnuOCueebrlxuXHQgKi9cblx0c2V0TW92ZWQodG9QYW5lbCl7XG5cdFx0Y29uc3Qge3BpZWNlfSA9IHRvUGFuZWw7XG5cdFx0Y29uc3QgZXAgPSB0aGlzLmRlZ3NbcGllY2UuZGVnXTtcblx0XHRpZihwaWVjZSAmJiB0b1BhbmVsID09PSBlcC5wYW5lbCkgZXAucGllY2UgPSBwaWVjZTtcblx0XHRlbHNlIHRoaXMuY2xlYXIocGllY2UuZGVnKTtcblx0fVxuXG5cdC8qKiDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjga7jg57jgrnjgYvnorroqo3jgZnjgotcblx0ICogQHBhcmFtIHtQYW5lbH0gcGFuZWwgLSDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovjg57jgrnnm65cblx0ICogQHBhcmFtIHtQaWVjZX0gcGllY2UgLSDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovpp5Jcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRpc1RhcmdldChwYW5lbCwgcGllY2Upe1xuXHRcdGlmKCFwYW5lbCB8fCAhcGFuZWwucGllY2UpIHJldHVybiB0cnVlO1xuXHRcdGlmKCFwYW5lbC5waWVjZS5oYXNBdHRyKFwiZW5QYXNzYW50XCIpKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIHBhbmVsLnBpZWNlID09PSB0aGlzLmRlZ3NbcGFuZWwucGllY2UuZGVnXS5waWVjZTtcblx0fVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanNvbicpLkJvYXJkSW5pdE9wdGlvbn0gQm9hcmRJbml0T3B0aW9uICovXG5pbXBvcnQge2NhbnZhc0ZvbnR9IGZyb20gXCIuL2NhbnZhc0ZvbnRMb2FkZXIuanNcIjtcbmltcG9ydCB7Y2FudmFzSW1hZ2V9IGZyb20gXCIuL2NhbnZhc0ltYWdlTG9hZGVyLmpzXCI7XG5pbXBvcnQge2Rvd25sb2FkSW1hZ2V9IGZyb20gXCIuL2Rvd25sb2FkSW1hZ2UuanNcIjtcbmltcG9ydCB7dUlDb250cm9sfSBmcm9tIFwiLi91aUNvbnRyb2wuanNcIjtcbmltcG9ydCB7U3RhbmR9IGZyb20gXCIuL3N0YW5kLmpzXCI7XG5pbXBvcnQge1BhbmVsfSBmcm9tIFwiLi9wYW5lbC5qc1wiO1xuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcbmltcG9ydCB7RW5QYXNzYW50fSBmcm9tIFwiLi9lblBhc3NhbnQuanNcIjtcbmltcG9ydCB7Qm9kfSBmcm9tIFwiLi9ib2QuanNcIjtcbmltcG9ydCB7Ym9hcmRzLCBnYW1lc30gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog55uk44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgQm9hcmR7XG5cdC8qKiDjgrLjg7zjg6DjgpLlrp/ooYzjgZnjgotcblx0ICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH19IGNhbnZhcyAtIENhbnZhc+imgee0oFxuXHQgKiBAcGFyYW0ge0JvYXJkSW5pdE9wdGlvbn0gb3B0aW9uIC0g44Oc44O844OJ44Gu5Yid5pyf5YyW44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24ucGxheUJvYXJkIC0g44Oc44O844OJ44K/44Kk44OXXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24ucGxheVBpZWNlcyAtIOmnkuOCu+ODg+ODiFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uLnBsYXlQaWVjZXMuZ2FtZU5hbWUgLSDjgrLjg7zjg6DlkI0o5Z+65rqW44Go44Gq44KL6aeS44Gu6YWN572u44K744OD44OIKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uLnBsYXlQaWVjZXMucGllY2VTZXQgLSDpp5Ljga7phY3nva7jg5Hjgr/jg7zjg7Ncblx0ICogQHJldHVybnMgQm9hcmRcblx0ICovXG5cdHN0YXRpYyBydW4oY2FudmFzLCBvcHRpb24pe1xuXHRcdGNvbnN0IHtwbGF5Qm9hcmQsIHBsYXlQaWVjZXMsIG9uRHJhd2VkfSA9IG9wdGlvbjtcblx0XHRjb25zdCBwbGF5ZXJzID0gcGxheVBpZWNlcy5zb21lKCh7Z2FtZU5hbWV9LCBpKT0+MSA8IGkgJiYgZ2FtZU5hbWUpPyA0OiAyO1xuXHRcdC8vIOODnOODvOODieOCkueUn+aIkFxuXHRcdGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGNhbnZhcywgcGxheUJvYXJkLCB7XG5cdFx0XHQuLi5vcHRpb24sXG5cdFx0XHRwbGF5ZXJzLFxuXHRcdFx0b25EcmF3ZWRcblx0XHR9KTtcblx0XHQvLyDpp5LjgpLphY3nva5cblx0XHRwbGF5UGllY2VzLmZvckVhY2goKHtnYW1lTmFtZSwgcGllY2VTZXR9LCBpKT0+e1xuXHRcdFx0aWYoIWdhbWVOYW1lKSByZXR1cm47XG5cdFx0XHRwaWVjZVNldCA/Pz0gXCJkZWZhdWx0XCI7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGJvYXJkLnB1dFN0YXJ0UGllY2VzKGksIGdhbWVOYW1lLCBwaWVjZVNldCk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaHt9XG5cdFx0fSk7XG5cdFx0Ly8g5o+P5YaZ44Kk44OZ44Oz44OI44KS6Kit5a6aXG5cdFx0Ym9hcmQub25EcmF3ZWQgPSBvbkRyYXdlZDtcblx0XHRyZXR1cm4gYm9hcmQ7XG5cdH1cblxuXHQvKipcblx0ICogQHR5cGVkZWYge1wib3ZlcmZsb3dcInxcImhvcml6b250YWxcInxcInZlcnRpY2FsXCJ8XCJwYXJlbnRPdmVyZmxvd1wifFwicGFyZW50SG9yaXpvbnRhbFwifFwicGFyZW50VmVydGljYWxcInxudWxsfSBjYW52YXNGaXRcblx0ICovXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXMgLSBDYW52YXPopoHntKBcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsYXlCb2FyZCAtIOODnOODvOODieOCv+OCpOODl1xuXHQgKiBAcGFyYW0ge251bWJlcn0gcGxheWVycyAtIOODl+ODrOOCpOODpOODvOS6uuaVsCgyIG9yIDQpXG5cdCAqIEBwYXJhbSB7Qm9hcmRJbml0T3B0aW9ufSBvcHRpb24gLSDjg5zjg7zjg4njga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7Ncblx0ICovXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgcGxheUJvYXJkLCBvcHRpb24pe1xuXHRcdGNvbnN0IHtcblx0XHRcdHBsYXllcnM9Mixcblx0XHRcdGNhbnZhc1dpZHRoPXVuZGVmaW5lZCxcblx0XHRcdGNhbnZhc0hlaWdodD11bmRlZmluZWQsXG5cdFx0XHRjYW52YXNGaXQ9XCJvdmVyZmxvd1wiLFxuXHRcdFx0Ym9hcmRMZWZ0PTUsXG5cdFx0XHRib2FyZFRvcD01LFxuXHRcdFx0cGFuZWxXaWR0aD01MCxcblx0XHRcdHBhbmVsSGVpZ2h0PTB8cGFuZWxXaWR0aCoxLjEsXG5cdFx0XHRwaWVjZVNpemU9MHxwYW5lbFdpZHRoKjAuOSxcblx0XHRcdHVzZVJhbmtTaXplID0gdHJ1ZSxcblx0XHRcdGlzRHJhd1NoYWRvdyA9IHRydWUsXG5cdFx0XHRib3JkZXJXaWR0aD1NYXRoLm1pbihwYW5lbFdpZHRoLCBwYW5lbEhlaWdodCkvMzAsXG5cdFx0XHR1c2VTdGFuZD1mYWxzZSxcblx0XHRcdGJhY2tncm91bmRDb2xvcj1cIiMwMDAwMDAwMFwiLFxuXHRcdFx0YXV0b0RyYXdpbmc9dHJ1ZSxcblx0XHRcdG9uRHJhd2VkLFxuXHRcdFx0b25HYW1lT3Zlcj1pPT5hbGVydChg44OX44Os44Kk44Ok44O8JHtpKzF944Gu5pWX5YyX44Gn44GZ44CCYCksXG5cdFx0XHRmcmVlTW9kZT1mYWxzZVxuXHRcdH0gPSBvcHRpb247XG5cdFx0Ly8g5Yid5pyf5YyWXG5cdFx0Y29uc3QgY2FudmFzRm9udEFzeW5jID0gY2FudmFzRm9udC5pbXBvcnRBc3luYygpO1xuXHRcdGNvbnN0IGNhbnZhc0ltYWdlQXN5bmMgPSBjYW52YXNJbWFnZS5pbXBvcnRBc3luYygpO1xuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xuXHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXG5cdFx0dGhpcy5waWVjZXMgPSBQaWVjZS5nZXRQaWVjZXMoY3R4LCB7XG5cdFx0XHRzaXplOiBwaWVjZVNpemUsXG5cdFx0XHR1c2VSYW5rU2l6ZSxcblx0XHRcdGlzRHJhd1NoYWRvd1xuXHRcdH0pO1xuXG5cdFx0Ly8g44Oc44O844OJ5oOF5aCxXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBib2FyZHNbcGxheUJvYXJkXSk7XG5cdFx0aWYoIVsyLCA0XS5pbmNsdWRlcyhwbGF5ZXJzKSkgdGhyb3cgRXJyb3IoYHBsYXllcnM9JHtwbGF5ZXJzfSwgcGxheWVycyBuZWVkIDIgb3IgNC5gKTtcblx0XHR0aGlzLnBsYXllcnMgPSBwbGF5ZXJzO1xuXHRcdHRoaXMubGVmdCA9IGJvYXJkTGVmdDtcblx0XHR0aGlzLnRvcCA9IGJvYXJkVG9wO1xuXHRcdHRoaXMucGFuZWxXaWR0aCA9IHBhbmVsV2lkdGg7XG5cdFx0dGhpcy5wYW5lbEhlaWdodCA9IHBhbmVsSGVpZ2h0O1xuXHRcdHRoaXMuYm9yZGVyV2lkdGggPSBib3JkZXJXaWR0aDtcblx0XHR0aGlzLnBpZWNlU2l6ZSA9IHBpZWNlU2l6ZTtcblx0XHR0aGlzLmNhbnZhc0JhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcblxuXHRcdC8vIOODnuOCueebruODh+ODvOOCv+OCkuani+eviVxuXHRcdHRoaXMuZmllbGQgPSB0aGlzLmZpZWxkLm1hcCgocm93LCBwWSk9PlxuXHRcdFx0Wy4uLnJvd10ubWFwKChjaGFyLCBwWCk9Pntcblx0XHRcdFx0Y29uc3QgY2VudGVyID0gYm9hcmRMZWZ0K3BhbmVsV2lkdGgqKHBYKzEpO1xuXHRcdFx0XHRjb25zdCBtaWRkbGUgPSBib2FyZFRvcCtwYW5lbEhlaWdodCoocFkrMSlcblx0XHRcdFx0cmV0dXJuIG5ldyBQYW5lbChjdHgsIGNoYXIsIGNlbnRlciwgbWlkZGxlLCBwYW5lbFdpZHRoLCBwYW5lbEhlaWdodCwgYm9yZGVyV2lkdGgsIHBYLCBwWSk7XG5cdFx0XHR9KVxuXHRcdCk7XG5cdFx0dGhpcy54TGVuID0gdGhpcy5maWVsZFswXS5sZW5ndGg7XG5cdFx0dGhpcy55TGVuID0gdGhpcy5maWVsZC5sZW5ndGg7XG5cdFx0dGhpcy53aWR0aCA9IHRoaXMucGFuZWxXaWR0aCoodGhpcy54TGVuKzEpO1xuXHRcdHRoaXMuaGVpZ2h0ID0gdGhpcy5wYW5lbEhlaWdodCoodGhpcy55TGVuKzEpO1xuXHRcdHRoaXMucmlnaHQgPSBib2FyZExlZnQrdGhpcy53aWR0aDtcblx0XHR0aGlzLmJvdHRvbSA9IGJvYXJkVG9wK3RoaXMuaGVpZ2h0O1xuXHRcdHRoaXMuc3RhbmQgPSBuZXcgU3RhbmQodGhpcyk7XG5cdFx0Y2FudmFzLndpZHRoID0gY2FudmFzV2lkdGggPz8gKHVzZVN0YW5kPyB0aGlzLnN0YW5kLnJpZ2h0OiB0aGlzLnJpZ2h0KSs1O1xuXHRcdGNhbnZhcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQgPz8gdGhpcy5ib3R0b20rNTtcblx0XHQvLyDjgq3jg6Pjg7Pjg5DjgrnjgrXjgqTjgrroqr/mlbRcblx0XHRjb25zdCB7c3R5bGV9ID0gY2FudmFzO1xuXHRcdGlmKGNhbnZhc0ZpdCA9PT0gXCJvdmVyZmxvd1wiKXtcblx0XHRcdGlmKHN0eWxlLm1heFdpZHRoID09PSBcIlwiKSBzdHlsZS5tYXhXaWR0aCA9IFwiOTd2d1wiO1xuXHRcdFx0aWYoc3R5bGUubWF4SGVpZ2h0ID09PSBcIlwiKSBzdHlsZS5tYXhIZWlnaHQgPSBcIjk3dmhcIjtcblx0XHR9XG5cdFx0ZWxzZSBpZihjYW52YXNGaXQgPT09IFwiaG9yaXpvbnRhbFwiKXtcblx0XHRcdGlmKHN0eWxlLndpZHRoID09PSBcIlwiKSBzdHlsZS53aWR0aCA9IFwiOTd2d1wiO1xuXHRcdH1cblx0XHRlbHNlIGlmKGNhbnZhc0ZpdCA9PT0gXCJ2ZXJ0aWNhbFwiKXtcblx0XHRcdGlmKHN0eWxlLmhlaWdodCA9PT0gXCJcIikgc3R5bGUuaGVpZ2h0ID0gXCI5N3ZoXCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY2FudmFzRml0ID09PSBcInBhcmVudE92ZXJmbG93XCIpe1xuXHRcdFx0aWYoc3R5bGUubWF4V2lkdGggPT09IFwiXCIpIHN0eWxlLm1heFdpZHRoID0gXCIxMDAlXCI7XG5cdFx0XHRpZihzdHlsZS5tYXhIZWlnaHQgPT09IFwiXCIpIHN0eWxlLm1heEhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdH1cblx0XHRlbHNlIGlmKGNhbnZhc0ZpdCA9PT0gXCJwYXJlbnRIb3Jpem9udGFsXCIpe1xuXHRcdFx0aWYoc3R5bGUud2lkdGggPT09IFwiXCIpIHN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY2FudmFzRml0ID09PSBcInBhcmVudFZlcnRpY2FsXCIpe1xuXHRcdFx0aWYoc3R5bGUuaGVpZ2h0ID09PSBcIlwiKSBzdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHR9XG5cblx0XHQvLyDmj4/lhpnmm7TmlrDoqK3lrppcblx0XHR0aGlzLmF1dG9EcmF3aW5nID0gYXV0b0RyYXdpbmc7XG5cdFx0aWYoYXV0b0RyYXdpbmcpe1xuXHRcdFx0Y2FudmFzRm9udEFzeW5jLnRoZW4oKCk9PnRoaXMuZHJhdygpKTtcblx0XHRcdGNhbnZhc0ltYWdlQXN5bmMudGhlbigoKT0+dGhpcy5kcmF3KCkpO1xuXHRcdFx0dGhpcy5kcmF3KCk7XG5cdFx0fVxuXHRcdHRoaXMub25EcmF3ZWQgPSBvbkRyYXdlZDtcblx0XHR0aGlzLm9uR2FtZU92ZXIgPSBvbkdhbWVPdmVyO1xuXHRcdC8qKiAgKi9cblx0XHR0aGlzLmdhbWVBbGl2ZXMgPSBuZXcgTWFwKFxuXHRcdFx0Wy4uLkFycmF5KHRoaXMucGxheWVycykua2V5cygpXVxuXHRcdFx0Lm1hcChpPT5bdGhpcy4jZGVnTm9ybWFsKGkpLCB0cnVlXSlcblx0XHQpO1xuXHRcdHRoaXMuZnJlZU1vZGUgPSBmcmVlTW9kZTtcblxuXHRcdHRoaXMucmVjb3JkID0gW107XG5cdFx0dGhpcy51aUNvbnRyb2wgPSB1SUNvbnRyb2wodGhpcyk7XG5cdFx0dGhpcy5lblBhc3NhbnQgPSBuZXcgRW5QYXNzYW50KCk7XG5cdH1cblxuXHQvKiog44Oc44O844OJ44KS6ZaJ44GY44KLICovXG5cdGNsb3NlKCl7XG5cdFx0dGhpcy51aUNvbnRyb2wucmVtb3ZlRXZlbnQoKTtcblx0fVxuXG5cdC8qKiDop5LluqbjgpLmraPopo/ljJZcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBsYXllYUlkT3JEZWcgLSDjg5fjg6zjgqTjg6Tjg7znlarlj7fjgb7jgZ/jga/op5LluqZcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdCNkZWdOb3JtYWwocGxheWVhSWRPckRlZyl7XG5cdFx0bGV0IGRlZyA9IHBsYXllYUlkT3JEZWc7XG5cdFx0aWYoMCA8IGRlZyAmJiBkZWcgPCA0KSBkZWcgPSAwfGRlZyozNjAvdGhpcy5wbGF5ZXJzO1xuXHRcdGRve2RlZyA9IChkZWcrMzYwKSUzNjB9IHdoaWxlKGRlZzwwKTtcblx0XHRyZXR1cm4gZGVnO1xuXHR9XG5cblx0LyoqIOmnkumFjee9ruOCkuWbnui7olxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0g5Zue6Lui6KeSICg5MOOBruWAjeaVsClcblx0ICovXG5cdHJvdGF0ZUZpZWxkKGRlZyl7XG5cdFx0Y29uc3Qge3hMZW4sIHlMZW59ID0gdGhpcztcblxuXHRcdGRlZyA9IHRoaXMuI2RlZ05vcm1hbChkZWcpO1xuXHRcdGlmKGRlZyA9PT0gMCkgcmV0dXJuO1xuXHRcdGlmKCFbOTAsIDE4MCwgMjcwXS5pbmNsdWRlcyhkZWcpKSB0aHJvdyBFcnJvcihgZGVnPSR7ZGVnfSwgZGVnIG5lZWQgbXVsdGlwbGUgb2YgOTAuYCk7XG5cdFx0aWYoWzkwLCAyNzBdLmluY2x1ZGVzKGRlZykpe1xuXHRcdFx0Ly8gMuasoemFjeWIl+OCkui7oue9rlxuXHRcdFx0Y29uc3QgdHJhbnNwb3NlID0gYSA9PiBhWzBdLm1hcCgoXywgYykgPT4gYS5tYXAociA9PiByW2NdKSk7XG5cdFx0XHRpZih4TGVuICE9PSB5TGVuKSB0aHJvdyBFcnJvcihgY29scz0ke3hMZW59ICE9IHJvd3M9JHt5TGVufSwgTm90IHJvd3MgPSBjb2xzLmApO1xuXHRcdFx0dGhpcy5maWVsZCA9IHRyYW5zcG9zZSh0aGlzLmZpZWxkKTtcblx0XHR9XG5cdFx0aWYoWzE4MCwgMjcwXS5pbmNsdWRlcyhkZWcpKXtcblx0XHRcdHRoaXMuZmllbGQucmV2ZXJzZSgpO1xuXHRcdH1cblx0XHR0aGlzLmZpZWxkLmZvckVhY2gocm93PT57XG5cdFx0XHRyb3cuZm9yRWFjaChwYW5lbD0+e1xuXHRcdFx0XHRpZighcGFuZWwucGllY2UpIHJldHVybjtcblx0XHRcdFx0cGFuZWwucGllY2UuZGVnICs9IGRlZztcblx0XHRcdH0pO1xuXHRcdFx0aWYoWzkwLCAxODBdLmluY2x1ZGVzKGRlZykpIHJvdy5yZXZlcnNlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKiog6aeS44Gu5Yid5pyf6YWN572uXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5ZXJJZCAtIOODl+ODrOOCpOODpOODvOeVquWPt1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gZ2FtZU5hbWUgLSDjgrLjg7zjg6DlkI0o5Z+65rqW44Go44Gq44KL6aeS44Gu6YWN572u44K744OD44OIKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGllY2VTZXQgLSDpp5Ljga7phY3nva7jg5Hjgr/jg7zjg7Ncblx0ICovXG5cdHB1dFN0YXJ0UGllY2VzKHBsYXllcklkLCBnYW1lTmFtZSwgcGllY2VTZXQ9XCJkZWZhdWx0XCIpe1xuXHRcdGNvbnN0IHtwaWVjZXN9ID0gdGhpcztcblxuXHRcdGNvbnN0IGRlZyA9IHRoaXMuI2RlZ05vcm1hbChwbGF5ZXJJZCk7XG5cdFx0dGhpcy5yb3RhdGVGaWVsZChkZWcpO1xuXHRcdGNvbnN0IHBvcyA9IGdhbWVzW2dhbWVOYW1lXS5wb3NpdGlvblt0aGlzLnhMZW5dW3BpZWNlU2V0XTtcblx0XHRpZighcG9zKSB0aHJvdyBFcnJvcihgZ2FtZXNbXCIke2dhbWVOYW1lfVwiXS5wb3NpdGlvbltcIiR7dGhpcy54TGVufVwiXVtcIiR7cGllY2VTZXR9XCJdaXMgbnVsbC5gKTtcblx0XHRwb3MuZm9yRWFjaCgocm93LCBpKT0+e1xuXHRcdFx0aWYocm93Lmxlbmd0aCA8IHRoaXMueExlbikgdGhyb3cgRXJyb3Iocm93LmpvaW4oXCJcIikpO1xuXHRcdFx0Y29uc3QgcFkgPSBpK3RoaXMueUxlbiAtIHBvcy5sZW5ndGg7XG5cdFx0XHRbLi4ucm93XS5mb3JFYWNoKChjaGFyLCBwWCk9Pntcblx0XHRcdFx0aWYoIXBpZWNlc1tjaGFyXSkgcmV0dXJuO1xuXHRcdFx0XHRjb25zdCBwaWVjZSA9IHBpZWNlc1tjaGFyXS5jbG9uZSgpO1xuXHRcdFx0XHRjb25zdCBwYW5lbCA9IHRoaXMuZmllbGRbcFldW3BYXTtcblx0XHRcdFx0cGllY2UuY2VudGVyID0gcGFuZWwuY2VudGVyO1xuXHRcdFx0XHRwaWVjZS5taWRkbGUgPSBwYW5lbC5taWRkbGU7XG5cdFx0XHRcdHBhbmVsLnBpZWNlID0gcGllY2U7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHR0aGlzLnJvdGF0ZUZpZWxkKC1kZWcpO1xuXHRcdGlmKHRoaXMuYXV0b0RyYXdpbmcpIHRoaXMuZHJhdygpO1xuXHR9XG5cblx0LyoqIOmnkuOBrumFjee9rlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGllY2UgLSDpp5Ljga7ooajnj77mloflrZdcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBYIC0gWOaWueWQkemFjee9ruS9jee9rijjg57jgrnnm67ln7rmupYpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwWSAtIFnmlrnlkJHphY3nva7kvY3nva4o44Oe44K555uu5Z+65rqWKVxuXHQgKiBAcGFyYW0ge251bWJlcn0gcGxheWVhSWRPckRlZyAtIOODl+ODrOOCpOODpOODvOeVquWPt+OBvuOBn+OBr+mnkuOBrumFjee9ruinklxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uIC0g44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uZGlzcGxheVB0biAtIOihqOekuuaWh+Wtl+WIl+OCkuWkieabtCgx44CcKVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi5pc01vdmVkIC0g5Yid5Zue56e75YuV5riI44G/44GL5ZCm44GLXG5cdCAqL1xuXHRwdXROZXdQaWVjZShwaWVjZSwgcFgsIHBZLCBwbGF5ZWFJZE9yRGVnLCBvcHRpb249e30pe1xuXHRcdGNvbnN0IHtkaXNwbGF5UHRuPTAsIGlzTW92ZWQ9ZmFsc2V9ID0gb3B0aW9uO1xuXHRcdGNvbnN0IHtwaWVjZXN9ID0gdGhpcztcblxuXHRcdGNvbnN0IGRlZyA9IHRoaXMuI2RlZ05vcm1hbChwbGF5ZWFJZE9yRGVnKTtcblx0XHRpZih0eXBlb2YgcGllY2UgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0cGllY2UgPSBuZXcgUGllY2UodGhpcy5jdHgsIHBpZWNlc1twaWVjZV0sIHtkaXNwbGF5UHRuLCBkZWcsIGlzTW92ZWR9KTtcblx0XHR9XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLmZpZWxkW3BZXVtwWF07XG5cdFx0cGllY2UuY2VudGVyID0gcGFuZWwuY2VudGVyO1xuXHRcdHBpZWNlLm1pZGRsZSA9IHBhbmVsLm1pZGRsZTtcblx0XHRwYW5lbC5waWVjZSA9IHBpZWNlO1xuXHRcdGlmKHRoaXMuYXV0b0RyYXdpbmcpIHRoaXMuZHJhdygpO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+OBi+OCiemnkuOCkumFjee9rlxuXHQgKiB7c3RyaW5nfSB0ZXh0IC0g6aeS6YWN572u44KS6KGo44GZ5paH5a2X5YiXXG5cdCAqL1xuXHRzZXRUZXh0UGllY2VzKHRleHQpe1xuXHRcdGNvbnN0IHtmaWVsZCwgcGllY2VzLCB4TGVuLCB5TGVufSA9IHRoaXM7XG5cblx0XHRjb25zdCBzdGFuZFRpdGxlID0gXCLmjIHpp5LvvJpcIjtcblx0XHQvLyBCT0TlvaLlvI9cblx0XHRpZigwPHRleHQuaW5kZXhPZihzdGFuZFRpdGxlKSkgdGV4dCA9IEJvZC5jb252U2V0VGV4dCh0ZXh0KTtcblxuXHRcdC8vIOaOkumZpOOBmeOCi+iomOWPt1xuXHRcdGNvbnN0IG5vaXNlcyA9IFwi4pSP4pSB4pSv4pST4pSX4pS34pSb4pSD4pSC4pSg4pSA4pS84pSo4oCVXCI7XG5cblx0XHQvLyDphY3liJflpInmj5tcblx0XHRjb25zdCB0ZXh0cyA9IFt0ZXh0XS5jb25jYXQoXG5cdFx0XHRcdFsuLi5ub2lzZXNdLFxuXHRcdFx0XHRPYmplY3QudmFsdWVzKFBpZWNlLmRlZ0NoYXJzKS5tYXAoYz0+XCJcXG5cIitjK3N0YW5kVGl0bGUpXG5cdFx0XHQpLnJlZHVjZShcblx0XHRcdFx0KHRleHQsY2hhcik9PlxuXHRcdFx0XHRcdHRleHQucmVwbGFjZShuZXcgUmVnRXhwKGNoYXIsXCJnXCIpLCBcIlwiKVxuXHRcdFx0KS5yZXBsYWNlKC9cXG5cXG4vZywgXCJcXG5cIilcblx0XHRcdC5yZXBsYWNlKC/jgIAvZywgXCLjg7tcIilcblx0XHRcdC50cmltKClcblx0XHRcdC5zcGxpdCgvXFxuLylcblx0XHRcdC5tYXAoXG5cdFx0XHRcdHJvdz0+cm93Lm1hdGNoKC8uezJ9L2cpKTtcblxuXHRcdC8vIOODnOODvOODieOBq+mnkuOCkumFjee9rlxuXHRcdGZvcihsZXQgcFk9MDtwWTx5TGVuO3BZKyspe1xuXHRcdFx0Zm9yKGxldCBwWD0wO3BYPHhMZW47cFgrKyl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRjb25zdCB0ZXh0ID0gdGV4dHNbcFldW3BYXTtcblx0XHRcdFx0XHRjb25zdCBwaWVjZSA9IFBpZWNlLnN0cmluZ1RvUGllY2UocGllY2VzLCB0ZXh0KTtcblx0XHRcdFx0XHRwaWVjZS5jZW50ZXIgPSBmaWVsZFtwWV1bcFhdLmNlbnRlcjtcblx0XHRcdFx0XHRwaWVjZS5taWRkbGUgPSBmaWVsZFtwWV1bcFhdLm1pZGRsZTtcblx0XHRcdFx0XHRmaWVsZFtwWV1bcFhdLnBpZWNlID0gcGllY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXgpe1xuXHRcdFx0XHRcdGZpZWxkW3BZXVtwWF0ucGllY2UgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8g5oyB44Gh6aeS44KS6YWN572uXG5cdFx0dGhpcy5zdGFuZC5jbGVhcigpO1xuXHRcdGNvbnN0IHN0YW5kVGV4dHMgPSB0ZXh0c1t5TGVuXTtcblx0XHRpZihzdGFuZFRleHRzKXtcblx0XHRcdHN0YW5kVGV4dHMuZm9yRWFjaCh0ZXh0PT57XG5cdFx0XHRcdGNvbnN0IHBpZWNlID0gUGllY2Uuc3RyaW5nVG9QaWVjZShwaWVjZXMsIHRleHQpO1xuXHRcdFx0XHRpZighcGllY2UpIHJldHVybjtcblx0XHRcdFx0dGhpcy5zdGFuZC5hZGQocGllY2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKHRoaXMuYXV0b0RyYXdpbmcpIHRoaXMuZHJhdygpO1xuXHR9XG5cblx0LyoqIOinkuW6puWfuua6luOBruODnuOCueebruOBruihjOOCkuWPluW+l+OBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0g6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXREZWcgLSDoo5zmraPop5LluqZcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldFJvdyhwWCwgcFksIGRlZywgb2Zmc2V0RGVnPTApe1xuXHRcdGNvbnN0IHt4TGVuLCB5TGVufSA9IHRoaXM7XG5cblx0XHRkZWcgPSB0aGlzLiNkZWdOb3JtYWwoZGVnK29mZnNldERlZyk7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRlZyA9PT0gMD8geUxlbi0xLXBZOlxuXHRcdFx0ZGVnID09PSA5MD8gcFg6XG5cdFx0XHRkZWcgPT09IDE4MD8gcFk6XG5cdFx0XHRkZWcgPT09IDI3MD8geExlbi0xLXBYOlxuXHRcdFx0LTFcblx0XHQpO1xuXHR9XG5cblx0LyoqIOinkuW6puWfuua6luOBruODnuOCueebruOBruWIl+OCkuWPluW+l+OBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0g6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXREZWcgLSDoo5zmraPop5LluqZcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldENvbChwWCwgcFksIGRlZywgb2Zmc2V0RGVnPTApe1xuXHRcdGNvbnN0IHt4TGVuLCB5TGVufSA9IHRoaXM7XG5cblx0XHRkZWcgPSB0aGlzLiNkZWdOb3JtYWwoZGVnK29mZnNldERlZyk7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRlZyA9PT0gMD8gcFg6XG5cdFx0XHRkZWcgPT09IDkwPyB5TGVuLTEtcFk6XG5cdFx0XHRkZWcgPT09IDE4MD8geExlbi0xLXBYOlxuXHRcdFx0ZGVnID09PSAyNzA/IHBZOlxuXHRcdFx0LTFcblx0XHQpO1xuXHR9XG5cblx0LyoqIOODl+ODreODouODvOOCt+ODp+ODs+OCqOODquOCouWGheOBp+OBguOCi+OBi+WIpOWIpVxuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKi9cblx0Y2hlY2tDYW5Qcm9tbyhwYW5lbCl7XG5cdFx0Y29uc3Qge3lMZW59ID0gdGhpcztcblx0XHRjb25zdCB7cGllY2UsIHBYLCBwWX0gPSBwYW5lbDtcblx0XHRjb25zdCB7ZGVnfSA9IHBpZWNlO1xuXG5cdFx0Y29uc3QgW3Byb21vTGluZSwgZm9yY2VQcm9tb0xpbmVdID0gW1xuXHRcdFx0cGllY2UuZ2FtZS5wcm9tb0xpbmUsXG5cdFx0XHRwaWVjZS5mb3JjZVByb21vTGluZVxuXHRcdF0ubWFwKGxpbmU9PnlMZW4tbGluZS0oMHx0aGlzLnByb21vTGluZU9mZnNldCkpO1xuXG5cdFx0bGV0IHJvdztcblx0XHRpZighdGhpcy5zaWRlUHJvbW8pe1xuXHRcdFx0cm93ID0gdGhpcy5nZXRSb3cocFgsIHBZLCBkZWcpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cm93ID0gTWF0aC5tYXgoXG5cdFx0XHRcdC4uLk9iamVjdC5rZXlzKFBpZWNlLmRlZ0NoYXJzKVxuXHRcdFx0XHQubWFwKGQ9PjB8ZClcblx0XHRcdFx0LmZpbHRlcihkPT5kIT09ZGVnKVxuXHRcdFx0XHQubWFwKFxuXHRcdFx0XHRcdGQ9PnRoaXMuZ2V0Um93KHBYLCBwWSwgZCwgMTgwKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2FuUHJvbW86IHByb21vTGluZSA8PSByb3csXG5cdFx0XHRmb3JjZVByb21vOiBmb3JjZVByb21vTGluZSA8PSByb3dcblx0XHR9O1xuXHR9XG5cblx0LyoqIOaVl+WMl+OBl+OBn+ODl+ODrOOCpOODpOODvOOBjOWtmOWcqOOBmeOCi+OBi+eiuuiqjeOBl+OAgeOCpOODmeODs+ODiOOCkueZuueUn+OBleOBm+OCiyAqL1xuXHQjZW1pdEdhbWVPdmVyKCl7XG5cdFx0Wy4uLnRoaXMuZ2FtZUFsaXZlc10uZm9yRWFjaCgoW2RlZywgZ2FtZUFsaXZlXSwgaSk9Pntcblx0XHRcdGlmKCFnYW1lQWxpdmUpIHJldHVybjtcblx0XHRcdGlmKHRoaXMuZmllbGQuc29tZShyb3c9PlxuXHRcdFx0XHRyb3cuc29tZSgoe3BpZWNlfSk9PlxuXHRcdFx0XHRcdHBpZWNlXG5cdFx0XHRcdFx0JiYgcGllY2UuZGVnID09PSBkZWdcblx0XHRcdFx0XHQmJiBwaWVjZS5oYXNBdHRyKFwia2luZ1wiKVxuXHRcdFx0XHQpXG5cdFx0XHQpKSByZXR1cm47XG5cdFx0XHR0aGlzLmdhbWVBbGl2ZXMuc2V0KGRlZywgZmFsc2UpO1xuXHRcdFx0dGhpcy5vbkdhbWVPdmVyKGkpO1xuXHRcdH0pXG5cdH1cblxuXHQvKiog44OX44Ot44Oi44O844K344On44Oz5Yem55CGXG5cdCAqIEBwYXJhbSB7UGFuZWx9IGZyb21QYW5lbCAtIOenu+WLleWFg+OBruODnuOCueebrlxuXHQgKiBAcGFyYW0ge1BhbmVsfSB0b1BhbmVsIC0g6YG45oqe5Lit44Gu44Oe44K555uuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY2FuUHJvbW8gLSDmiJDjgovjgZPjgajjgYzjgafjgY3jgotcblx0ICogQHBhcmFtIHtib29sZWFufSBmb3JjZVByb21vIC0g5oiQ44KK44KS5by35Yi244GZ44KLXG5cdCAqL1xuXHQjcHJvbW9EaWFsb2coZnJvbVBhbmVsLCB0b1BhbmVsLCBjYW5Qcm9tbywgZm9yY2VQcm9tbyl7XG5cdFx0Y29uc3Qge2ZyZWVNb2RlfSA9IHRoaXM7XG5cdFx0Y29uc3Qge3BpZWNlfSA9IHRvUGFuZWw7XG5cblx0XHQvLyDjg5fjg63jg6Ljg7zjgrfjg6fjg7Plh6bnkIZcblx0XHRpZighcGllY2UucHJvbW8gfHwgcGllY2UuaGFzQXR0cihcInByb21vdGVkXCIpIHx8ICFjYW5Qcm9tbyl7XG5cdFx0XHR0aGlzLmFkZFJlY29yZCh0b1BhbmVsLCB7ZnJvbVBhbmVsfSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRve1xuXHRcdFx0Zm9yKGNvbnN0IFtjaGFyLCB7bmFtZX1dIG9mIE9iamVjdC5lbnRyaWVzKHBpZWNlLnByb21vKSl7XG5cdFx0XHRcdGlmKGNvbmZpcm0oYOaIkOOCiuOBvuOBmeOBiz9cblx0JHtwaWVjZS5jaGFyfToke3BpZWNlLm5hbWV9XG5cdOOAgOKGk1xuXHQke2NoYXJ9OiR7bmFtZX1gKSl7XG5cdFx0XHRcdFx0dGhpcy5hZGRSZWNvcmQodG9QYW5lbCwge2Zyb21QYW5lbCwgZW5kOlwi5oiQXCJ9KTtcblx0XHRcdFx0XHRwaWVjZS5wcm9tb3Rpb24oY2hhcik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSB3aGlsZSghZnJlZU1vZGUgJiYgZm9yY2VQcm9tbyk7XG5cdFx0dGhpcy5hZGRSZWNvcmQodG9QYW5lbCwge2Zyb21QYW5lbCwgZW5kOlwi5LiN5oiQXCJ9KTtcblx0fVxuXG5cdC8qKiDpp5LjgpLnp7vli5Vcblx0ICogQHBhcmFtIHtQYW5lbH0gZnJvbVBhbmVsIC0g56e75YuV5YWD44Gu44Oe44K555uuXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHRvUGFuZWwgLSDpgbjmip7kuK3jga7jg57jgrnnm65cblx0ICovXG5cdG1vdmVQaWVjZShmcm9tUGFuZWwsIHRvUGFuZWwpe1xuXHRcdGNvbnN0IHtzdGFuZCwgZnJlZU1vZGUsIGVuUGFzc2FudH0gPSB0aGlzO1xuXG5cdFx0aWYoIWZyb21QYW5lbFxuXHRcdFx0fHwgdG9QYW5lbC5oYXNBdHRyKFwia2VlcE91dFwiKVxuXHRcdFx0fHwgdG9QYW5lbC5waWVjZSA9PT0gZnJvbVBhbmVsLnBpZWNlXG5cdFx0XHR8fCB0b1BhbmVsLnBpZWNlPy5kZWcgPT09IGZyb21QYW5lbC5waWVjZS5kZWdcblx0XHRcdHx8ICF0aGlzLmZyZWVNb2RlICYmICF0b1BhbmVsLmlzVGFyZ2V0XG5cdFx0KSByZXR1cm47XG5cblx0XHRsZXQge2NhblByb21vLCBmb3JjZVByb21vfSA9IHRoaXMuY2hlY2tDYW5Qcm9tbyhmcm9tUGFuZWwpO1xuXG5cdFx0c3RhbmQuY2FwdHVyZVBpZWNlKFxuXHRcdFx0ZnJvbVBhbmVsLnBpZWNlLFxuXHRcdFx0dG9QYW5lbC5waWVjZSxcblx0XHRcdHRvUGFuZWwuaGFzQXR0cihcImNhcHR1cmVcIiksXG5cdFx0XHR0b1BhbmVsLmhhc0F0dHIoXCJjYW50Q2FwdHVyZVwiKVxuXHRcdCk7XG5cblx0XHR0b1BhbmVsLnBpZWNlID0gZnJvbVBhbmVsLnBpZWNlO1xuXHRcdGZyb21QYW5lbC5waWVjZSA9IG51bGw7XG5cblx0XHRjb25zdCB7cGllY2V9ID0gdG9QYW5lbDtcblx0XHRwaWVjZS5jZW50ZXIgPSB0b1BhbmVsLmNlbnRlcjtcblx0XHRwaWVjZS5taWRkbGUgPSB0b1BhbmVsLm1pZGRsZTtcblx0XHRwaWVjZS5pc01vdmVkID0gdHJ1ZTtcblxuXHRcdGNvbnN0IGFmdGVyUHJvbW8gPSB0aGlzLmNoZWNrQ2FuUHJvbW8odG9QYW5lbCk7XG5cdFx0Y2FuUHJvbW8gfHw9IGFmdGVyUHJvbW8uY2FuUHJvbW87XG5cdFx0Zm9yY2VQcm9tbyB8fD0gYWZ0ZXJQcm9tby5mb3JjZVByb21vO1xuXG5cdFx0Ly8g44Ki44Oz44OR44OD44K144OzXG5cdFx0ZW5QYXNzYW50LnNldE1vdmVkKHRvUGFuZWwpO1xuXG5cdFx0Ly8g44OX44Ot44Oi44O844K344On44Oz5Yem55CGXG5cdFx0dGhpcy4jcHJvbW9EaWFsb2coZnJvbVBhbmVsLCB0b1BhbmVsLCBjYW5Qcm9tbywgZm9yY2VQcm9tbyk7XG5cblx0XHQvLyDjg5fjg6zjgqTjg6Tjg7zjga7jgrLjg7zjg6Djgqrjg7zjg5Djg7zliKTlrppcblx0XHR0aGlzLiNlbWl0R2FtZU92ZXIoKTtcblx0fVxuXG5cdC8qKiDmo4vorZzjgpLov73oqJhcblx0ICogQHBhcmFtIHtQYW5lbH0gdG9QYW5lbCAtIOenu+WLleWFiOOBruODnuOCueebrlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uIC0g44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7UGFuZWx9IG9wdGlvbi5mcm9tUGFuZWwgLSDnp7vli5XlhYPjga7jg57jgrnnm65cblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi5lbmQgLSDjgqrjg5fjgrfjg6fjg7M95oiQfOS4jeaIkHzmiZNcblx0ICovXG5cdGFkZFJlY29yZCh0b1BhbmVsLCBvcHRpb249e30pe1xuXHRcdGNvbnN0IHtmcm9tUGFuZWwsIGVuZD1cIlwifSA9IG9wdGlvbjtcblx0XHRjb25zdCB7cGllY2V9ID0gdG9QYW5lbDtcblxuXHRcdHRoaXMucmVjb3JkLnB1c2goe1xuXHRcdFx0dG86IHtcblx0XHRcdFx0cFg6IHRvUGFuZWwucFgsXG5cdFx0XHRcdHBZOiB0b1BhbmVsLnBZLFxuXHRcdFx0fSxcblx0XHRcdGZyb206IHtcblx0XHRcdFx0cFg6IGZyb21QYW5lbD8ucFgsXG5cdFx0XHRcdHBZOiBmcm9tUGFuZWw/LnBZXG5cdFx0XHR9LFxuXHRcdFx0ZGVnOiBwaWVjZS5kZWcsXG5cdFx0XHRwaWVjZUNoYXI6IHBpZWNlLmNoYXIsXG5cdFx0XHRlbmRcblx0XHR9KTtcblx0fVxuXG5cdC8qKiDmo4vorZzjgpLjg4bjgq3jgrnjg4jjgaflj5blvpdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdGdldFRleHRSZWNvcmQoKXtcblx0XHRjb25zdCBnZXRQWCA9ICh7cFh9KT0+IHBYPT1udWxsPyBcIipcIjogKHRoaXMueExlbi1wWCkudG9TdHJpbmcoMzYpO1xuXHRcdGNvbnN0IGdldFBZID0gKHtwWX0pPT4gcFk9PW51bGw/IFwiKlwiOiAocFkrMSkudG9TdHJpbmcoMzYpO1xuXHRcdHJldHVybiB0aGlzLnJlY29yZC5tYXAoXG5cdFx0XHQoe3RvLCBmcm9tLCBkZWcsIHBpZWNlQ2hhciwgZW5kfSk9PmAke1xuXHRcdFx0XHRQaWVjZS5kZWdDaGFyc1tkZWddfSR7XG5cdFx0XHRcdGdldFBYKHRvKX0ke1xuXHRcdFx0XHRnZXRQWSh0byl9JHtcblx0XHRcdFx0cGllY2VDaGFyfSR7XG5cdFx0XHRcdGVuZH0gKCR7XG5cdFx0XHRcdGdldFBYKGZyb20pfSR7XG5cdFx0XHRcdGdldFBZKGZyb20pfSlgXG5cdFx0KS5qb2luKFwiXFxuXCIpO1xuXHR9XG5cblx0LyoqIOebpOOCkuaPj+WGmSAqL1xuXHRkcmF3KCl7XG5cdFx0Y29uc3Qge2N0eCwgY2FudmFzLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0fSA9IHRoaXM7XG5cblx0XHQvLyDmj4/lhpnjgpLliJ3mnJ/ljJZcblx0XHRjdHgucmVzdG9yZSgpO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmNhbnZhc0JhY2tncm91bmRDb2xvcjtcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuXHRcdC8vIOWkluaeoOOCkuaPj+WGmVxuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcblx0XHRjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmJvcmRlckNvbG9yO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC50cmFuc2xhdGUocGFuZWxXaWR0aC8yLCBwYW5lbEhlaWdodC8yKTtcblx0XHRjdHguc3Ryb2tlUmVjdCgwLCAwLCB3aWR0aC1wYW5lbFdpZHRoLCBoZWlnaHQtcGFuZWxIZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdFx0dGhpcy5zdGFuZC5kcmF3KCk7XG5cblx0XHQvLyDjg57jgrnnm67jgpLmj4/lhplcblx0XHR0aGlzLmZpZWxkLmZvckVhY2gocm93PT57XG5cdFx0XHRyb3cuZm9yRWFjaChwYW5lbD0+e1xuXHRcdFx0XHRwYW5lbC5kcmF3KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZih0aGlzLm9uRHJhd2VkKSB0aGlzLm9uRHJhd2VkKHRoaXMpO1xuXHR9XG5cblx0LyoqIEJPROW9ouW8j+ODhuOCreOCueODiOOCkuWPluW+l1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0Z2V0IGJvZFRleHQoKXtcblx0XHRyZXR1cm4gQm9kLmdldFRleHQodGhpcyk7XG5cdH1cblxuXHQvKiog6aeS6YWN572u44KS44OG44Kt44K544OI44Gn5Y+W5b6XXG5cdCAqIHtib29sZWFufSBpc01pbmltYW0gLSDnuK7lsI/ooajnpLpcblx0ICovXG5cdHRvU3RyaW5nKGlzTWluaW1hbT1mYWxzZSl7XG5cdFx0Y29uc3Qge3hMZW59ID0gdGhpcztcblxuXHRcdGxldCBoZWFkZXIgPSBcIlwiO1xuXHRcdGxldCBmb290ZXIgPSBcIlwiO1xuXHRcdGxldCBwYW5lbE91dGVyID0gXCJcIjtcblx0XHRsZXQgcGFuZWxTZXAgPSBcIlwiO1xuXHRcdGxldCByb3dTZXAgPSBcIlxcblwiO1xuXG5cdFx0aWYoIWlzTWluaW1hbSl7XG5cdFx0XHRoZWFkZXIgPSBg4pSPJHtBcnJheSh4TGVuKS5maWxsKFwi4pSB4pSBXCIpLmpvaW4oXCLilK9cIil94pSTXFxuYDtcblx0XHRcdGZvb3RlciA9IGBcXG7ilJcke0FycmF5KHhMZW4pLmZpbGwoXCLilIHilIFcIikuam9pbihcIuKUt1wiKX3ilJtgO1xuXHRcdFx0cGFuZWxPdXRlciA9IFwi4pSDXCI7XG5cdFx0XHRwYW5lbFNlcCA9IFwi4pSCXCI7XG5cdFx0XHRyb3dTZXAgPSBgXFxu4pSgJHtBcnJheSh4TGVuKS5maWxsKFwi4pSA4pSAXCIpLmpvaW4oXCLilLxcIil94pSoXFxuYDtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0aGVhZGVyK1xuXHRcdFx0dGhpcy5maWVsZC5tYXAocm93PT5cblx0XHRcdFx0cGFuZWxPdXRlcitcblx0XHRcdFx0cm93Lm1hcChwYW5lbD0+XG5cdFx0XHRcdFx0XCJcIisocGFuZWwucGllY2UgPz8gcGFuZWwudG9TdHJpbmcoaXNNaW5pbWFtKSlcblx0XHRcdFx0KS5qb2luKHBhbmVsU2VwKStcblx0XHRcdFx0cGFuZWxPdXRlclxuXHRcdFx0KS5qb2luKHJvd1NlcCkrXG5cdFx0XHRmb290ZXIrXG5cdFx0XHR0aGlzLnN0YW5kLnRvU3RyaW5nKGlzTWluaW1hbSlcblx0XHQpO1xuXHR9XG5cblx0LyoqIOeUu+WDj+OCkuWPluW+l1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWUgLSDjg5XjgqHjgqTjg6vlkI1cblx0ICogQHBhcmFtIHtzdHJpbmd9IGV4dCAtIOaLoeW8teWtkFxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cblx0ICovXG5cdGFzeW5jIGRvd25sb2FkSW1hZ2UoZmlsZU5hbWUsIGV4dCl7XG5cdFx0YXdhaXQgZG93bmxvYWRJbWFnZSh0aGlzLmNhbnZhcywgZmlsZU5hbWUsIGV4dCk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6WyJiYXNlIiwiaW1wb3J0SnNvbiIsIm5hbWUiLCJyZXMiLCJjYW52YXNGb250IiwiZ2FtZVNvZnQiLCJnYW1lcyIsImJvYXJkcyIsInBhbmVscyIsInBpZWNlcyIsInBpZWNlUmFuZ2UiLCJwaWVjZUNvc3QiLCJnZXRDaGFycyIsImRpc3BsYXlUZXh0IiwiZGlzcGxheSIsImdvb2dsZVVybCIsImNoYXJzIiwidW5pcXVlIiwibyIsImZvbnROYW1lIiwiZm9udFdlaWdodCIsImZvbnROYW1lUGx1cyIsImZvbnRVcmwiLCJtYXRjaFVybHMiLCJ1cmwiLCJmb250RmFjZSIsIl8iLCJsb2FkSW1hZ2UiLCJzcmMiLCJyZXNvbHZlIiwiaW1hZ2UiLCJpbWdTcmNzIiwiaW1nU3JjIiwiY2FudmFzSW1hZ2UiLCJnZXRNaW1lIiwiZXh0IiwiZG93bmxvYWRJbWFnZSIsImNhbnZhcyIsImZpbGVOYW1lIiwidXJsVHlwZSIsIm1pbWUiLCJhIiwiUGFuZWwiLCIjaXNTZWxlY3RlZCIsIiN0YXJnZXRSYW5nZXMiLCJjdHgiLCJjaGFyIiwiY2VudGVyIiwibWlkZGxlIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXJXaWR0aCIsInBYIiwicFkiLCJ2YWx1ZSIsInJhbmdlTmFtZSIsImF0dHJOYW1lIiwieCIsInkiLCJzZWxlY3RDb2xvciIsInRhcmdldENvbG9yIiwibGVmdCIsInRvcCIsInRleHRSb3RhdGUiLCJyYWQiLCJmb250U2l6ZSIsImNvbG9yIiwiaXNNaW5pbWFtIiwiUGllY2UiLCJvcHRpb24iLCJleFBpZWNlcyIsInBpZWNlIiwicHJvbW9LZXlzIiwia2V5IiwicHJvbW8iLCJpIiwiZXhQaWVjZXNPYmoiLCJhbGlhc0tleSIsImFsaWFzIiwidGV4dCIsImRlZ0NoYXIiLCJwaWVjZUNoYXIiLCJkZWciLCJfXyIsImIiLCJ6b29tIiwiZGlzcGxheVB0biIsInNpemUiLCJ1c2VSYW5rU2l6ZSIsImlzRHJhd1NoYWRvdyIsImlzTW92ZWQiLCJybmciLCJyb3ciLCJlIiwicmFuZ2UiLCJ0cmFuc3Bvc2UiLCJjIiwiciIsImltZ1dpZHRoIiwiaW1nSGVpZ2h0IiwiZ2FtZSIsImZvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwidiIsInJhbmdlT3B0aW9ucyIsImNlbnRlckNoYXJzIiwicG9pbnRDaGFycyIsImxpbmVyQ2hhcnMiLCJnZXRPcmlnaW4iLCJvTGlzdCIsIm93blgiLCJvd25ZIiwiclkiLCJyWCIsInJDaGFyIiwiaXNPd24iLCJjaGVja1RhcmdldCIsImJvYXJkIiwiZmllbGQiLCJ5TGVuIiwiZW5QYXNzYW50IiwiaW5GaWVsZCIsImlzVnNQbyIsInBhbmVsIiwiaXNBdHRhY2tGcm9tUGFvIiwiY2FuTW92ZSIsImlzQXR0YWNrIiwiY2hlY2tSaXZhbERlZyIsImV4aXN0c0NoaWxkIiwiY2hpbGQiLCJvWCIsIm9ZIiwic2V0VGFyZ2V0IiwibW92ZVBvaW50IiwicGFyZW50IiwibW92ZUxpbmVyIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJqbXBzIiwibW92ZXMiLCJpc01vdmVJbmYiLCJqbXBDbnQiLCJtb3ZlQ250IiwiaW5jWCIsImluY1kiLCJfeCIsIl95IiwiaXNKdW1wZWQiLCJyYW5nZU1hcCIsInJhbmdlT3B0aW9uIiwib3JpZ2luIiwidUlDb250cm9sIiwiaXNDbGljayIsImxhc3RYWSIsInNlbGVjdFBhbmVsIiwic2VsZWN0U3RhbmQiLCJmaWVsZFByb2MiLCJmblBhbmVsIiwiZm5BZnRlciIsInZpZXdTdHlsZSIsInJlY3QiLCJkcmFnU3RhcnQiLCJzdG9jayIsImRyYWdNb3ZlIiwiZHJhZ0VuZCIsIkJvZCIsIiNkZWcyUGllY2VDaGFycyIsIiNkZWcyUGllY2VSZWdleGVzIiwiI3BpZWNlQ2hhcjJEZWdzIiwiI2RlZzJTdGFuZFRpdGxlcyIsIiNzdGFuZFRpdGxlMkRlZ3MiLCIja2FuSSIsIiNrYW5YIiwiI251bTJLYW4iLCJudW0iLCJ2aWV3T25lIiwiI2thbjJOdW0iLCJrYW4iLCJlbXB0eU9uZSIsIiNudW0yWmVuIiwiemVuIiwiI3BhbmVsVGV4dCIsIiNnZXRQaWVjZVRleHQiLCIjZ2V0U3RhbmRUZXh0Iiwic3RhbmQiLCJjb3VudGVyIiwiY250IiwiYm9hcmRMaW5lcyIsInN0YW5kTGluZXMiLCJsaW5lIiwidGl0bGUiLCJib2FyZFN0ciIsImJvZENoYXIiLCJzdGFuZFN0ciIsInBhcmFtU3RyIiwicGFyYW0iLCJ4TGVuIiwicGxheWVycyIsImhlYWRlciIsImZvb3RlciIsInBhbmVsT3V0ZXIiLCJwYW5lbFNlcCIsInJvd1NlcCIsInN0YW5kSGVhZGVyIiwic3RhbmRGb290ZXIiLCJTdGFuZCIsIiNkZWdPcmRlciIsInJpZ2h0IiwiYm90dG9tIiwicGFuZWxXaWR0aCIsInBhbmVsSGVpZ2h0IiwidG9QYW5lbCIsIndpbm5lclBpZWNlIiwibG9zZXJQaWVjZSIsImZvcmNlQ2FwdHVyZSIsImZvcmNlQ2FudENhcHR1cmUiLCJwaXRjaFdpZHRoIiwicGl0Y2hIZWlnaHQiLCJwbGF5ZXIiLCJoZWFkIiwiZGVncyIsImdldEluaXQiLCJFblBhc3NhbnQiLCJlcCIsIkJvYXJkIiwicGxheUJvYXJkIiwicGxheVBpZWNlcyIsIm9uRHJhd2VkIiwiZ2FtZU5hbWUiLCJwaWVjZVNldCIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwiY2FudmFzRml0IiwiYm9hcmRMZWZ0IiwiYm9hcmRUb3AiLCJwaWVjZVNpemUiLCJ1c2VTdGFuZCIsImF1dG9EcmF3aW5nIiwib25HYW1lT3ZlciIsImZyZWVNb2RlIiwiY2FudmFzRm9udEFzeW5jIiwiY2FudmFzSW1hZ2VBc3luYyIsInN0eWxlIiwiI2RlZ05vcm1hbCIsInBsYXllYUlkT3JEZWciLCJwbGF5ZXJJZCIsInBvcyIsInN0YW5kVGl0bGUiLCJ0ZXh0cyIsInN0YW5kVGV4dHMiLCJvZmZzZXREZWciLCJwcm9tb0xpbmUiLCJmb3JjZVByb21vTGluZSIsImQiLCIjZW1pdEdhbWVPdmVyIiwiZ2FtZUFsaXZlIiwiI3Byb21vRGlhbG9nIiwiZnJvbVBhbmVsIiwiY2FuUHJvbW8iLCJmb3JjZVByb21vIiwiYWZ0ZXJQcm9tbyIsImVuZCIsImdldFBYIiwiZ2V0UFkiLCJ0byIsImZyb20iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLElBQU87QUFDYixlQUFlQyxFQUFXQyxHQUFLO0FBQzlCLFNBQU8sTUFBTSxNQUFNLEdBQUdGLENBQUksR0FBR0UsQ0FBSSxPQUFPLEVBQ3RDLEtBQUssT0FBTUMsTUFDSixNQUFNQSxFQUFJLEtBQU0sQ0FDdkIsRUFDQSxNQUFNLE1BQUk7QUFBQSxFQUFBLENBQUU7QUFDZjtBQVNZLE1BQUNDLElBQWEsTUFBTUgsRUFBVyxZQUFZLEdBWTFDSSxLQUFXLE1BQU1KLEVBQVcsVUFBVSxHQWlCdENLLElBQVEsTUFBTUwsRUFBVyxPQUFPLEdBMEJoQ00sSUFBUyxNQUFNTixFQUFXLFFBQVEsR0FxQmxDTyxJQUFTLE1BQU1QLEVBQVcsUUFBUSxHQTJCbENRLElBQVMsTUFBTVIsRUFBVyxRQUFRLEdBU2xDUyxJQUFhLE1BQU1ULEVBQVcsWUFBWSxH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
