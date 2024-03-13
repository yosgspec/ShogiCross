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
