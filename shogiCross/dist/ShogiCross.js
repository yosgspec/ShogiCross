const Q = "./json/ShogiCross/";
function M(f) {
  const t = new XMLHttpRequest();
  if (t.open("GET", `${Q}${f}.json`, !1), t.send(), t.status === 200)
    return JSON.parse(t.responseText);
  throw new Error("Failed to load JSON");
}
const A = M("canvasFont"), pt = M("gameSoft"), K = M("games"), B = M("boards"), H = M("panels"), X = M("pieces"), _ = M("pieceRange"), tt = M("pieceCost"), et = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(H).map(({ displayText: f }) => f).join("") + Object.values(X).map(({ display: f }) => f ? f.join("") : "").join("")
  ])
].sort().join("");
Object.assign(A, {
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
    return this.names = A.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      A.fonts.map(async ([s, i]) => {
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
)], P = {
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
    this.imgSrc && P.imported ? this.drawImage() : this.drawPanel(), this.isSelected && this.drawMask(t), this.isTarget && this.drawMask(e), this.piece?.draw();
  }
  /** マス目画像を描写 */
  drawImage() {
    const { ctx: t } = this, e = this.imgSrc, s = P.images[e];
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
      t.font = `${l}px ${A.names}`;
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
class x {
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
      n.id = a, n.char = r, s.set(r, new x(t, n, e));
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
    const [s, i] = [...e], r = x.charDegs[s];
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
    return this.useRankSize && (t *= x.rankRatio[this.rank]), t;
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
      size: n = x.size,
      useRankSize: a = x.useRankSize,
      isDrawShadow: c = x.isDrawShadow,
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
    return new x(this.ctx, { ...this }, { displayPtn: t, deg: e, size: s, isMoved: i });
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
    this.imgSrc && P.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = P.images[s];
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
    t.font = `${c}px ${A.names}`, t.textAlign = "center", a.forEach((h, o) => {
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
    return x.degChars[this.deg] + this.char;
  }
}
Object.entries(x.degChars).forEach(([f, t]) => {
  x.charDegs[t] = f;
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
], q = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let f = 1; f <= 9; f++)
  q.push(["" + f, { moves: f }]);
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
  function o(d, u, k, m = "", y = !0) {
    if (!i[k] || !i[k][u])
      return !1;
    const b = i[k][u];
    return !b || c(b) || h(b) || m === "enPassant" && !n.isTarget(b, t) || t.hasAttr("inPalace") && !b.hasAttr("palace") || m.indexOf("palace") === 0 && !(b.hasAttr(m) && i[s][e].hasAttr(m)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= f.getRow(u, k, t.deg) ? !1 : d ? i[k][u].piece ? y ? t.deg !== i[k][u].piece.deg : !0 : !1 : !i[k][u].piece;
  }
  function l(d, u, k, m, y) {
    for (const b of u)
      for (let R = 0; R < d.length; R++)
        for (let L = 0; L < d[R].length; L++) {
          const [E, C] = [L + e - m, R + s - y];
          if (!(!a(E, C) || o(k, 0 | E, 0 | C, "", !1) || d[R][L] !== b))
            return !0;
        }
    return !1;
  }
  function g(d, u, k) {
    const m = i[k][u];
    m.addTarget(d), n.setTarget(m, t);
  }
  function p(d, [u, { isAttack: k }], { oX: m, oY: y, isOwn: b }) {
    if (b)
      for (const [R, { child: L = [] } = {}] of ht)
        for (let E = 0; E < d.length; E++)
          for (let C = 0; C < d[E].length; C++) {
            const [w, $] = [C + e - m, E + s - y];
            !a(w, $) || !o(k, w, $, u) || d[E][C] !== R || l(d, L, !1, m, y) || g(u, w, $);
          }
  }
  function S(d, [u, { isAttack: k }], { oX: m, oY: y, isOwn: b, offsetX: R, offsetY: L }) {
    if (!(!b && !o(!1, e + R, s + L)))
      for (const [E, { jmps: C = 0, moves: w = 0 } = {}] of q) {
        const $ = !w || w === 0;
        for (let j = y - 1; j <= y + 1; j++)
          for (let T = m - 1; T <= m + 1; T++) {
            if (d[j][T] !== E || T === m && j === y)
              continue;
            let O = C || 0, F = w || 0;
            const [I, Z] = [T - m, j - y];
            for (let Y = e, J = s; ; ) {
              Y += I, J += Z;
              const D = Y + R, W = J + L;
              if (!a(D, W) || !$ && F === 0)
                break;
              const z = O === 0;
              z && o(k, D, W, u, z) ? (F--, g(u, D, W)) : C < 1 && F--;
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
        for (const y of lt(m))
          p(m, u, y), S(m, u, y);
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
    f.field.forEach((k, m) => k.forEach((y, b) => l(y, d, u, b, m))), g(d, u), f.draw(), e = [d, u];
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
      i = i.replace(n, x.degChars[a]);
    });
    const r = s.flatMap((n) => {
      const [a, c] = n.split(/：/);
      if (c === "")
        return "";
      const h = v.#n.get(a), o = x.degChars[h];
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
      for (const n of Object.values(x.degChars))
        r = r.replace(n, `
${n}持駒：${n}`);
    }
    return i + r;
  }
}
const gt = Object.keys(x.degChars), G = () => ({
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
class V {
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
    const { playBoard: s, playPieces: i, onDrawed: r } = e, n = i.some(({ gameName: c }, h) => 1 < h && c) ? 4 : 2, a = new V(t, s, {
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
      onDrawed: y,
      onGameOver: b = ($) => alert(`プレイヤー${$ + 1}の敗北です。`),
      freeMode: R = !1
    } = s, L = A.importAsync(), E = P.importAsync();
    this.canvas = t;
    const C = t.getContext("2d");
    if (C.clearRect(0, 0, t.width, t.height), this.ctx = C, this.pieces = x.getPieces(C, {
      size: g,
      useRankSize: p,
      isDrawShadow: S
    }), Object.assign(this, B[e]), ![2, 4].includes(i))
      throw Error(`players=${i}, players need 2 or 4.`);
    this.players = i, this.left = c, this.top = h, this.panelWidth = o, this.panelHeight = l, this.borderWidth = d, this.pieceSize = g, this.canvasBackgroundColor = k, this.field = this.field.map(
      ($, j) => [...$].map((T, O) => {
        const F = c + o * (O + 1), I = h + l * (j + 1);
        return new ot(C, T, F, I, o, l, d, O, j);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = c + this.width, this.bottom = h + this.height, this.stand = new U(this), t.width = r ?? (u ? this.stand.right : this.right) + 5, t.height = n ?? this.bottom + 5;
    const { style: w } = t;
    a === "overflow" ? (w.maxWidth === "" && (w.maxWidth = "97vw"), w.maxHeight === "" && (w.maxHeight = "97vh")) : a === "horizontal" ? w.width === "" && (w.width = "97vw") : a === "vertical" ? w.height === "" && (w.height = "97vh") : a === "parentOverflow" ? (w.maxWidth === "" && (w.maxWidth = "100%"), w.maxHeight === "" && (w.maxHeight = "100%")) : a === "parentHorizontal" ? w.width === "" && (w.width = "100%") : a === "parentVertical" && w.height === "" && (w.height = "100%"), this.autoDrawing = m, m && (L.then(() => this.draw()), E.then(() => this.draw()), this.draw()), this.onDrawed = y, this.onGameOver = b, this.gameAlives = new Map(
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
    typeof t == "string" && (t = new x(this.ctx, c[t], { displayPtn: n, deg: h, isMoved: a }));
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
      Object.values(x.degChars).map((o) => `
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
          const g = c[o][l], p = x.stringToPiece(s, g);
          p.center = e[o][l].center, p.middle = e[o][l].middle, e[o][l].piece = p;
        } catch {
          e[o][l].piece = null;
        }
    this.stand.clear();
    const h = c[r];
    h && h.forEach((o) => {
      const l = x.stringToPiece(s, o);
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
      ...Object.keys(x.degChars).map((o) => 0 | o).filter((o) => o !== n).map(
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
      ({ to: s, from: i, deg: r, pieceChar: n, end: a }) => `${x.degChars[r]}${t(s)}${e(s)}${n}${a} (${t(i)}${e(i)})`
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
  V as Board,
  x as Piece,
  B as boards,
  A as canvasFont,
  P as canvasImage,
  pt as gameSoft,
  K as games
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hvZ2lDcm9zcy5qcyIsInNvdXJjZXMiOlsiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvanNvbi94aHIuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9jYW52YXNGb250TG9hZGVyLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvY2FudmFzSW1hZ2VMb2FkZXIuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9kb3dubG9hZEltYWdlLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvcGFuZWwuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9waWVjZS5qcyIsIi4uL3Nob2dpQ3Jvc3MvU2hvZ2lDcm9zcy9jb3JlL2NoZWNrVGFyZ2V0LmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvdWlDb250cm9sLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvYm9kLmpzIiwiLi4vc2hvZ2lDcm9zcy9TaG9naUNyb3NzL2NvcmUvc3RhbmQuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9lblBhc3NhbnQuanMiLCIuLi9zaG9naUNyb3NzL1Nob2dpQ3Jvc3MvY29yZS9ib2FyZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBiYXNlID0gJy4vanNvbi9TaG9naUNyb3NzLyc7XG5mdW5jdGlvbiBpbXBvcnRKc29uKG5hbWUpIHtcblx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdHhoci5vcGVuKFwiR0VUXCIsIGAke2Jhc2V9JHtuYW1lfS5qc29uYCwgZmFsc2UpO1xuXHR4aHIuc2VuZCgpO1xuXHRpZih4aHIuc3RhdHVzID09PSAyMDApXG5cdFx0cmV0dXJuIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG5cdGVsc2Vcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gbG9hZCBKU09OXCIpO1xufVxuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IENhbnZhc0ZvbnRcbiAqIEBwcm9wIHt7Zm9udE5hbWU6IHN0cmluZywgZm9udFdlaWdodDogbnVtYmVyfVtdfSBmb250cyAtIHtmb250TmFtZTog44OV44Kp44Oz44OI5ZCNLCBmb250V2VpZ2h0OiDjg5Xjgqnjg7Pjg4jjga7lpKrjgZV9XG4gKi9cbi8qKiBDYW52YXPnlKjjga5Hb29nbGXjg5Xjgqnjg7Pjg4jmg4XloLFcbiAqIEB0eXBlIHtDYW52YXNGb250fVxuICovXG5leHBvcnQgY29uc3QgY2FudmFzRm9udCA9IGltcG9ydEpzb24oXCJjYW52YXNGb250XCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEdhbWVTb2Z0XG4gKiBAcHJvcCB7c3RyaW5nfSBuYW1lIC0g44Ky44O844Og5ZCNXG4gKiBAcHJvcCB7c3RyaW5nfSBwbGF5Qm9hcmQgLSDkvb/nlKjjgZnjgovjg5zjg7zjg4nlkI1cbiAqIEBwcm9wIHtib29sZWFufSB1c2VTdGFuZCAtIOmnkuWPsOOBruS9v+eUqOacieeEoVxuICogQHByb3Age3tnYW1lTmFtZTogc3RyaW5nLCBwaWVjZVNldDogc3RyaW5nfVtdfSBwbGF5UGllY2VzIC0ge2dhbWVOYW1lOiDjgrLjg7zjg6DlkI0sIHBpZWNlU2V0OiDpp5Ljgrvjg4Pjg4jjga7lkI3np7B9XG4gKi9cbi8qKiDjgrLjg7zjg6Dmg4XloLEo44Oc44O844OJK+mnkinjga7jg5fjg6rjgrvjg4Pjg4hcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBHYW1lU29mdD59XG4gKi9cbmV4cG9ydCBjb25zdCBnYW1lU29mdCA9IGltcG9ydEpzb24oXCJnYW1lU29mdFwiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiBHYW1lXG4gKiBAcHJvcCB7c3RyaW5nfSBlbmdsaXNoIC0g6Iux6Kqe5ZCNXG4gKiBAcHJvcCB7c3RyaW5nfSBmb250Q29sb3IgLSDpp5Ljga7jg5Xjgqnjg7Pjg4joibJcbiAqIEBwcm9wIHtzdHJpbmd9IHByb21vdGVGb250Q29sb3IgLSDmiJDpp5Ljga7jg5Xjgqnjg7Pjg4joibJcbiAqIEBwcm9wIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIOmnkuOBruiJslxuICogQHByb3Age3N0cmluZ30gcHJvbW90ZUJhY2tncm91bmRDb2xvciAtIOaIkOmnkuOBruiJslxuICogQHByb3Age3N0cmluZ30gYm9yZGVyQ29sb3IgLSDpp5Ljga7mnqDoibJcbiAqIEBwcm9wIHtzdHJpbmd9IHByb21vdGVCYWNrZ3JvdW5kQ29sb3IgLSDmiJDpp5Ljga7mnqDoibJcbiAqIEBwcm9wIHtudW1iZXJ9IHByb21vTGluZSAtIOODl+ODreODouODvOOCt+ODp+ODs+ODqeOCpOODsyjmiJDjgorjga7mrrUpXG4gKiBAcHJvcCB7T2JqZWN0PHN0cmluZywgT2JqZWN0PHN0cmluZywgc3RyaW5nW10+Pn0gcG9zaXRpb24gLSDpp5Ljga7phY3nva7jg4fjg7zjgr9cbiAqL1xuLyoqIOOCsuODvOODoOOBrueorumhnuOBq+WFsemAmuOBmeOCi+mnkuaDheWgseOChOmnkumFjee9ruaDheWgsVxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIEdhbWU+fVxuICovXG5leHBvcnQgY29uc3QgZ2FtZXMgPSBpbXBvcnRKc29uKFwiZ2FtZXNcIik7XG5cblx0LyoqXG5cdCAqIEB0eXBlZGVmIHtPYmplY3R9IEJvYXJkSW5pdE9wdGlvbiAtIOODnOODvOODieOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuXHQgKiBAcHJvcCB7bnVtYmVyfSBjYW52YXNXaWR0aCAtIENhbnZhc+W5hVxuXHQgKiBAcHJvcCB7bnVtYmVyfSBjYW52YXNIZWlnaHQgLSBDYW52YXPpq5jjgZVcblx0ICogQHByb3Age2NhbnZhc0ZpdH0gY2FudmFzRml0IC0gQ2FudmFz44K144Kk44K644Gu6Ieq5YuV6Kq/5pW0XG5cdCAqIEBwcm9wIHtudW1iZXJ9IGJvYXJkTGVmdCAtIOaPj+WGmeOBmeOCi1jluqfmqJlcblx0ICogQHByb3Age251bWJlcn0gYm9hcmRUb3AgLSDmj4/lhpnjgZnjgotZ5bqn5qiZXG5cdCAqIEBwcm9wIHtudW1iZXJ9IHBhbmVsV2lkdGggLSDjg57jgrnnm67luYVcblx0ICogQHByb3Age251bWJlcn0gcGFuZWxIZWlnaHQgLSDjg57jgrnnm67pq5jjgZVcblx0ICogQHByb3Age251bWJlcn0gcGllY2VTaXplIC0g6aeS44Gu5aSn44GN44GVXG5cdCAqIEBwcm9wIHtib29sZWFufSB1c2VSYW5rU2l6ZSAtIOmnkuOBruWkp+OBjeOBleOCkuagvOOBrumBleOBhOOBp+WkieabtOOBmeOCi1xuXHQgKiBAcHJvcCB7Ym9vbGVhbn0gaXNEcmF3U2hhZG93IC0g6aeS44Gu5b2x44Gu5o+P5YaZ5pyJ54ShXG5cdCAqIEBwcm9wIHtudW1iZXJ9IGJvcmRlcldpZHRoIC0g5p6g57ea5aSq44GVXG5cdCAqIEBwcm9wIHtib29sZWFufSB1c2VTdGFuZCAtIOmnkuWPsOOBruS9v+eUqOacieeEoVxuXHQgKiBAcHJvcCB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSDog4zmma/oibIo44OH44OV44Kp44Or44OI54Sh6ImyKVxuXHQgKiBAcHJvcCB7Ym9vbGVhbn0gYXV0b0RyYXdpbmcgLSDmj4/lhpnjga7oh6rli5Xmm7TmlrDmnInnhKFcblx0ICogQHByb3AgeyhCb2FyZCk9PnZvaWR9IG9uRHJhd2VkIC0g5o+P5YaZ44Kk44OZ44Oz44OIXG5cdCAqIEBwcm9wIHsoaSk9PnZvaWR9IG9uR2FtZU92ZXIgLSDjgrLjg7zjg6Djgqrjg7zjg5Djg7zjgqTjg5njg7Pjg4hcblx0ICogQHByb3Age2Jvb2xlYW59IGZyZWVNb2RlIC0g44OV44Oq44O844Oi44O844OJ5pyJ5Yq55YyWL+eEoeWKueWMllxuXHQgKi9cblx0LyoqXG5cdCAqIOODnOODvOODieOBruani+aIkOaDheWgsVxuXHQgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgQm9hcmRJbml0T3B0aW9uPn1cblx0ICovXG5leHBvcnQgY29uc3QgYm9hcmRzID0gaW1wb3J0SnNvbihcImJvYXJkc1wiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBQYW5lbEluaXRPcHRpb24gLSDjg57jgrnnm67jga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7NcbiAqIEBwcm9wIHtzdHJpbmd9IG5hbWUgLSDjg57jgrnnm67jga7lkI3liY1cbiAqIEBwcm9wIHtzdHJpbmd9IHRleHQgLSDjg5zjg7zjg4nooajnpLrmloflrZfliJdcbiAqIEBwcm9wIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIOODnuOCueebruOBruiJslxuICogQHByb3Age3N0cmluZ30gYm9yZGVyQ29sb3IgLSDmnqDoibLlj4rjgbPjg5Xjgqnjg7Pjg4joibJcbiAqIEBwcm9wIHtzdHJpbmd9IHNlbGVjdENvbG9yIC0g6YG45oqe44GX44Gf5pmC44Gu6ImyXG4gKiBAcHJvcCB7c3RyaW5nfSB0YXJnZXRDb2xvciAtIOmnkuOCkumBuOaKnuOBl+OBn+aZguOBruiJslxuICogQHByb3Age3N0cmluZ30gZGlzcGxheVRleHQgLSDooajnpLrjgZnjgovmloflrZcoMeaWh+WtlylcbiAqIEBwcm9wIHtudW1iZXJ9IHRleHRSb3RhdGUgLSDooajnpLrjgZnjgovmloflrZfjga7lm57ou6Lop5IoZGVnKVxuICogQHByb3Age2Jvb2xlYW59IGJvcmRlclNsYXNoTGVmdCAtIOW3puaWnOe3mijvvLwp44Gu5pyJ54ShXG4gKiBAcHJvcCB7Ym9vbGVhbn0gYm9yZGVyU2xhc2hSaWdodCAtIOWPs+aWnOe3mijvvI8p44Gu5pyJ54ShXG4gKiBAcHJvcCB7Ym9vbGVhbn0gaW50ZXJzZWN0IC0g5Lqk54K544KS5Lit5b+D44Go44GZ44KLXG4gKiBAcHJvcCB7c3RyaW5nW119IGF0dHIgLSDjg57jgrnnm67jga7mqZ/og73jga7lsZ7mgKdcbiAqL1xuLyoqXG4gKiDjg5zjg7zjg4nkuK3jga7jg57jgrnnm67mg4XloLFcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBQYW5lbEluaXRPcHRpb259XG4gKi9cbmV4cG9ydCBjb25zdCBwYW5lbHMgPSBpbXBvcnRKc29uKFwicGFuZWxzXCIpO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBpZWNlSW5pdE9wdGlvbiAtIOmnkuOBruWIneacn+WMluOCquODl+OCt+ODp+ODs1xuICogQHByb3Age3N0cmluZ30gbmFtZSAtIOmnkuOBruWQjeWJjVxuICogQHByb3Age3N0cmluZ1tdfSBkaXNwbGF5IC0g6aeS44Gr6KGo56S644GZ44KL5paH5a2X5YiXKDHjgIEy5paH5a2XKeOBrumFjeWIl1xuICogQHByb3Age3N0cmluZ30gaW1nU3JjIC0g6aeS44Go44GX44Gm6KGo56S644GZ44KL55S75YOP44OR44K544Gu6YWN5YiXXG4gKiBAcHJvcCB7Ym9vbGVhbn1pc1JvdGF0ZUltZyAtIOmBjueUu+WDj+OCkuioreWumuOBmeOCi+WgtOWQiOWbnui7ouOBmeOCi+OBi1xuICogQHByb3Age3N0cmluZ30gYWxpYXMgLSDjgq3jg7zjga7liKXlkI3jgajjgZfjgablrprjgoHjgovmloflrZfjga7pm4blkIjooahcbiAqIEBwcm9wIHtzdHJpbmd9IGdhbWVOYW1lIC0g6aeS44Gr5a++5b+c44GZ44KL44Ky44O844Og5ZCNXG4gKiBAcHJvcCB7c3RyaW5nfSBleHBhbnNpb24gLSDjgrLjg7zjg6DlkI3jga7ntLDliIbpoZ5cbiAqIEBwcm9wIHtcIuWFtVwifFwi6aasXCJ8XCLosaFcInxcIui7ilwifFwi6IejXCJ8XCLnjotcInxcIuaIkFwifSB1bml0IC0g6aeS44Gu5YW156iuXG4gKiBAcHJvcCB7bnVtYmVyfWZvcmNlUHJvbW9MaW5lIC0g6KGM44GN44Gp44GT44KN44Gu44Gq44GE6aeS44Go44Gq44KL5q61XG4gKiBAcHJvcCB7T2JqZWN0fSByYW5nZSAtIOmnkuOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5kZWZhdWx0IC0g6YCa5bi45pmC44Gu56e75YuV56+E5ZuyXG4gKiBAcHJvcCB7c3RyaW5nW119IHJhbmdlLmF0dGFjayAtIOmnkuWPluW+l+aZguOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5zdGFydCAtIOWIneWbnuOBruOBv+OBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5jYXN0bGluZyAtIOOCreODo+OCueODquODs+OCsOaZguOBruenu+WLleevhOWbslxuICogQHByb3Age3N0cmluZ1tdfSByYW5nZS5lblBhc3NhbnQgLSDjgqLjg7Pjg5Hjg4PjgrXjg7PmmYLjga7np7vli5Xnr4Tlm7JcbiAqIEBwcm9wIHtzdHJpbmdbXX0gcmFuZ2UucGFsYWNlU2xhc2ggLSDkuZ3lrq7lhoXjgafjga7np7vli5Xnr4Tlm7JcbiAqIEBwcm9wIHtzdHJpbmd9IHByb21vIC0g44OX44Ot44Oi44O844K344On44Oz5YWI44Gu6aeS44Gu5LiA5paH5a2X6KGo6KiYXG4gKiBAcHJvcCB7c3RyaW5nW119IGF0dHIgLSDpp5Ljga7mqZ/og73jga7jg6rjgrnjg4hcbiAqL1xuLyoqXG4gKiDpp5Lmg4XloLFcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBQaWVjZUluaXRPcHRpb24+fVxuICovXG5leHBvcnQgY29uc3QgcGllY2VzID0gaW1wb3J0SnNvbihcInBpZWNlc1wiKTtcblxuLyoqXG4gKiBAdHlwZWRlZiB7c3RyaW5nW119IFBpZWNlUmFuZ2Ug6aeS44Gu56e75YuV56+E5ZuyXG4gKi9cbi8qKlxuICog6aeS44Gu56e75YuV56+E5ZuyXG4gKiBAdHlwZXtPYmplY3Q8c3RyaW5nLCBQaWVjZVJhbmdlPn1cbiAqL1xuZXhwb3J0IGNvbnN0IHBpZWNlUmFuZ2UgPSBpbXBvcnRKc29uKFwicGllY2VSYW5nZVwiKTtcblxuLyoqXG4gKiDpp5Ljga7kvqHlgKRcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBudW1iZXI+fVxuICovXG5leHBvcnQgY29uc3QgcGllY2VDb3N0ID0gaW1wb3J0SnNvbihcInBpZWNlQ29zdFwiKTtcbiIsImltcG9ydCB7Y2FudmFzRm9udCwgcGFuZWxzLCBwaWVjZXN9IGZyb20gXCIuL2pzb24uanNcIjtcbmV4cG9ydCB7Y2FudmFzRm9udH07XG5cbi8qKiDoqq3jgb/ovrzjgoDmloflrZfjga7kuIDopqfjgpLlj5blvpdcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmNvbnN0IGdldENoYXJzID0gKCkgPT4gWy4uLlxuXHRuZXcgU2V0KFsuLi5cblx0XHRPYmplY3QudmFsdWVzKHBhbmVscykubWFwKCh7ZGlzcGxheVRleHR9KT0+ZGlzcGxheVRleHQpLmpvaW4oXCJcIikrXG5cdFx0T2JqZWN0LnZhbHVlcyhwaWVjZXMpLm1hcCgoe2Rpc3BsYXl9KT0+ZGlzcGxheT8gZGlzcGxheS5qb2luKFwiXCIpOiBcIlwiKS5qb2luKFwiXCIpXG5cdF0pXG5dLnNvcnQoKS5qb2luKFwiXCIpO1xuXG4vKiogQ2FudmFz55So44OV44Kp44Oz44OI566h55CGICovXG5PYmplY3QuYXNzaWduKGNhbnZhc0ZvbnQsIHtcblx0LyoqIOiqreOBv+i+vOOBv+a4iOOBv+OBp+OBguOCi+OBiz8gKi9cblx0aW1wb3J0ZWQ6IGZhbHNlLFxuXG5cdC8qKiDoqq3jgb/ovrzjgoDjg5Xjgqnjg7Pjg4jjga7kuIDopqcoXCIsXCLljLrliIfjgoopXG5cdCAqIEB0eXBlIHtzdHJpbmd9XG5cdCAqL1xuXHRuYW1lczogXCJcIixcblxuXHQvKiog44OV44Kp44Oz44OI44Gu6Kqt44G/6L6844G/XG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuXHQgKi9cblx0YXN5bmMgaW1wb3J0QXN5bmMoKXtcblx0XHRpZih0aGlzLmltcG9ydGVkKSByZXR1cm47XG5cdFx0Y29uc3QgZ29vZ2xlVXJsID0gXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVwiO1xuXHRcdGNvbnN0IGNoYXJzID0gZ2V0Q2hhcnMoKTtcblx0XHRjb25zdCB1bmlxdWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpO1xuXHRcdHRoaXMubmFtZXMgPSBjYW52YXNGb250LmZvbnRzLm1hcChvPT5gXCIke29bMF19JHt1bmlxdWV9XCJgKS5qb2luKFwiLFwiKStcIixzZXJpZlwiO1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChcblx0XHRcdGNhbnZhc0ZvbnQuZm9udHMubWFwKGFzeW5jIChbZm9udE5hbWUsIGZvbnRXZWlnaHRdKT0+e1xuXHRcdFx0XHRjb25zdCBmb250TmFtZVBsdXMgPSBmb250TmFtZS5yZXBsYWNlKC8gL2csIFwiK1wiKTtcblx0XHRcdFx0Y29uc3QgZm9udFVybCA9IGAke2dvb2dsZVVybH0ke2ZvbnROYW1lUGx1c306d2dodEAke2ZvbnRXZWlnaHR9JnRleHQ9JHtjaGFyc31gO1xuXHRcdFx0XHRjb25zdCByZXMgPSBhd2FpdCBmZXRjaChmb250VXJsKTtcblx0XHRcdFx0aWYoIXJlcy5vaykgcmV0dXJuO1xuXHRcdFx0XHRjb25zdCBjc3MgPSBhd2FpdCByZXMudGV4dCgpO1xuXHRcdFx0XHRjb25zdCBtYXRjaFVybHMgPSBjc3MubWF0Y2goL3VybFxcKC4rP1xcKS9nKTtcblx0XHRcdFx0aWYoIW1hdGNoVXJscykgdGhyb3cgbmV3IEVycm9yKFwiTm90IGZvdW5kIGZvbnQuXCIpO1xuXG5cdFx0XHRcdGZvciAoY29uc3QgdXJsIG9mIG1hdGNoVXJscykge1xuXHRcdFx0XHRcdGNvbnN0IGZvbnRGYWNlID0gbmV3IEZvbnRGYWNlKGAke2ZvbnROYW1lfSR7dW5pcXVlfWAsIHVybCk7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuZm9udHMuYWRkKGZvbnRGYWNlKTtcblx0XHRcdFx0XHRhd2FpdCBmb250RmFjZS5sb2FkKCkuY2F0Y2goKCk9Pnt9KTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHQpLnRoZW4oXz0+dGhpcy5pbXBvcnRlZCA9IHRydWUpO1xuXHR9XG59KTtcbiIsImltcG9ydCB7cGFuZWxzLCBwaWVjZXN9IGZyb20gXCIuL2pzb24uanNcIjtcblxuLyoqIOeUu+WDj+iqreOBv+i+vOOBv+WHpueQhlxuICogQHBhcmFtIHtzdHJpbmd9IHNyYyAtIOeUu+WDj+ODkeOCuVxuICogQHJldHVybnMgUHJvbWlzZTxJbWFnZT5cbiAqL1xuZnVuY3Rpb24gbG9hZEltYWdlKHNyYyl7XG5cdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlPT57XG5cdFx0Y29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcblx0XHRpbWFnZS5zcmMgPSBzcmM7XG5cdFx0aW1hZ2Uub25sb2FkID0gKCk9PnJlc29sdmUoaW1hZ2UpO1xuXHR9KTtcbn1cblxuLyoqIOiqreOBv+i+vOOCgOeUu+WDj+ODkeOCueOBruS4gOimp1xuICogQHR5cGUge3N0cmluZ1tdfVxuICovXG5jb25zdCBpbWdTcmNzID0gWy4uLm5ldyBTZXQoXG5cdE9iamVjdC52YWx1ZXMocGFuZWxzKS5mbGF0TWFwKCh7aW1nU3JjfSk9PmltZ1NyYz8/W10pXG5cdC5jb25jYXQoT2JqZWN0LnZhbHVlcyhwaWVjZXMpLmZsYXRNYXAoKHtpbWdTcmN9KT0+aW1nU3JjPz9bXSkpXG4pXTtcblxuLyoqIENhbnZhc+eUqOeUu+WDj+OBrueuoeeQhiAqL1xuZXhwb3J0IGNvbnN0IGNhbnZhc0ltYWdlID0ge1xuXHQvKiog6Kqt44G/6L6844G/5riI44G/44Gn44GC44KL44GLPyAqL1xuXHRpbXBvcnRlZDogZmFsc2UsXG5cblx0LyoqIOiqreOBv+i+vOOCk+OBoOeUu+WDj+ODh+ODvOOCv1xuXHQgKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgSW1hZ2U+fVxuXHQgKi9cblx0aW1hZ2VzOiB7fSxcblxuXHQvKiog55S75YOP44Gu6Kqt44G/6L6844G/XG5cdCAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuXHQgKi9cblx0YXN5bmMgaW1wb3J0QXN5bmMoKXtcblx0XHRpZih0aGlzLmltcG9ydGVkKSByZXR1cm47XG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0aW1nU3Jjcy5tYXAoYXN5bmMgc3JjPT57XG5cdFx0XHRcdHRoaXMuaW1hZ2VzW3NyY10gPSBhd2FpdCBsb2FkSW1hZ2Uoc3JjKTtcblx0XHRcdH0pXG5cdFx0KS50aGVuKF89PnRoaXMuaW1wb3J0ZWQgPSB0cnVlKVxuXHR9XG59O1xuXG4iLCJjb25zdCBnZXRNaW1lID0gKGV4dCk9PlxuXHRcImltYWdlL1wiK2V4dC5yZXBsYWNlKFwianBnXCIsIFwianBlZ1wiKTtcblxuLyoqIOOCreODo+ODs+ODkOOCueOBrueUu+WDj+OCkuWPluW+l+OBmeOCi1xuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH19IGNhbnZhcyAtIENhbnZhc+imgee0oFxuICogQHBhcmFtIHtzdHJpbmd9IGZpbGVOYW1lIC0g5Y+W5b6X44GZ44KL44OV44Kh44Kk44Or5ZCNKOaLoeW8teWtkOOCkumZpOOBjylcbiAqIEBwYXJhbSB7c3RyaW5nfSBleHQgLSDmi6HlvLXlrZBcbiAqIEBwYXJhbSB7XCJiYXNlNjRcInxcImJsb2JcIn0gdXJsVHlwZSAtIOeUn+aIkFVSTOOCv+OCpOODl1xuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEltYWdlKGNhbnZhcywgZmlsZU5hbWU9XCJpbWFnZVwiLCBleHQ9XCJwbmdcIiwgdXJsVHlwZT1cImJhc2U2NFwiKXtcblx0Y29uc3QgbWltZSA9IGdldE1pbWUoZXh0KTtcblx0Y29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXHRsZXQgdXJsO1xuXHRpZih1cmxUeXBlID09PSBcImJsb2JcIilcblx0XHR1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKFxuXHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzPT5jYW52YXMudG9CbG9iKHJlcyksIG1pbWUpKTtcblx0ZWxzZVxuXHRcdHVybCA9IGNhbnZhcy50b0RhdGFVUkwobWltZSk7XG5cdGEuaHJlZiA9IHVybDtcblx0YS5kb3dubG9hZCA9IGAke2ZpbGVOYW1lfS4ke2V4dH1gO1xuXHRhLmNsaWNrKCk7XG5cdGlmKHVybFR5cGUgPT09IFwiYmxvYlwiKSBVUkwucmV2b2tlT2JqZWN0VVJMKGEuaHJlZik7XG59XG4iLCJpbXBvcnQge2NhbnZhc0ZvbnR9IGZyb20gXCIuL2NhbnZhc0ZvbnRMb2FkZXIuanNcIjtcbmltcG9ydCB7Y2FudmFzSW1hZ2V9IGZyb20gXCIuL2NhbnZhc0ltYWdlTG9hZGVyLmpzXCI7XG5pbXBvcnQge3BhbmVsc30gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog44Oe44K555uu44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgUGFuZWx7XG5cdCNpc1NlbGVjdGVkO1xuXHQjdGFyZ2V0UmFuZ2VzO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge2FueX0gY3R4IC0gQ2FudmFz5o+P55S744Kz44Oz44OG44Kt44K544OIXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyIC0g44Oe44K555uu44KS56S644GZ5paH5a2XXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBjZW50ZXIgLSDmj4/lhpnjgZnjgotY5bqn5qiZKOS4reW/g+WOn+eCuSlcblx0ICogQHBhcmFtIHtudW1iZXJ9IG1pZGRsZSAtIOaPj+WGmeOBmeOCi1nluqfmqJko5Lit5b+D5Y6f54K5KVxuXHQgKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSDjg57jgrnnm67luYVcblx0ICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIOODnuOCueebrumrmOOBlVxuXHQgKiBAcGFyYW0ge251bWJlcn0gYm9yZGVyV2lkdGggLSDmnqDnt5rjga7lpKrjgZVcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBYIC0g44Oc44O844OJ5LiK44Gu44Oe44K555uu44Gu5YiXXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwWSAtIOODnOODvOODieS4iuOBruODnuOCueebruOBruihjFxuXHQgKi9cblx0Y29uc3RydWN0b3IoY3R4LCBjaGFyLCBjZW50ZXIsIG1pZGRsZSwgd2lkdGgsIGhlaWdodCwgYm9yZGVyV2lkdGgsIHBYLCBwWSl7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBwYW5lbHNbY2hhcl0pO1xuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXHRcdHRoaXMuY2VudGVyID0gY2VudGVyO1xuXHRcdHRoaXMubWlkZGxlID0gbWlkZGxlO1xuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcblx0XHR0aGlzLmxlZnQgPSBjZW50ZXItd2lkdGgvMjtcblx0XHR0aGlzLnRvcCA9IG1pZGRsZS1oZWlnaHQvMjtcblx0XHR0aGlzLnJpZ2h0ID0gY2VudGVyK3dpZHRoLzI7XG5cdFx0dGhpcy5ib3R0b20gPSBtaWRkbGUraGVpZ2h0LzI7XG5cdFx0dGhpcy5ib3JkZXJXaWR0aCA9IGJvcmRlcldpZHRoO1xuXHRcdHRoaXMucFggPSBwWDtcblx0XHR0aGlzLnBZID0gcFk7XG5cdFx0dGhpcy5zZWxlY3RDb2xvciA/Pz0gXCIjRkYwMDAwNjZcIjtcblx0XHR0aGlzLnRhcmdldENvbG9yID8/PSBcIiMwMEZGMDA2NlwiO1xuXHRcdHRoaXMucGllY2UgPSBudWxsO1xuXHRcdHRoaXMuaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdHRoaXMuY2xlYXJUYXJnZXQoKTtcblx0XHR0aGlzLmF0dHIgPz89IFtdO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBrumBuOaKnueKtuaFi1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG5cdCAqL1xuXHRzZXQgaXNTZWxlY3RlZCh2YWx1ZSl7XG5cdFx0dGhpcy4jaXNTZWxlY3RlZCA9IHRoaXMuaGFzQXR0cihcImtlZXBPdXRcIik/IGZhbHNlOiB2YWx1ZTtcblx0fVxuXHRnZXQgaXNTZWxlY3RlZCgpe1xuXHRcdHJldHVybiB0aGlzLiNpc1NlbGVjdGVkO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBruenu+WLleWPr+iDveWIpOWumlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG5cdCAqL1xuXHRnZXQgaXNUYXJnZXQoKXtcblx0XHRyZXR1cm4gMCA8IHRoaXMuI3RhcmdldFJhbmdlcy5sZW5ndGg7XG5cdH1cblxuXHQvKiog44Oe44K555uu44Gu56e75YuV5YWI5oOF5aCx44KS44Kv44Oq44KiICovXG5cdGNsZWFyVGFyZ2V0KCl7XG5cdFx0dGhpcy4jdGFyZ2V0UmFuZ2VzID0gW107XG5cdH1cblxuXHQvKiog44Oe44K555uu44Gu56e75YuV5YWI5oOF5aCx44KS6L+95YqgXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZU5hbWUgLSDnp7vli5XlhYjmg4XloLFcblx0ICovXG4gICBhZGRUYXJnZXQocmFuZ2VOYW1lKXtcblx0XHR0aGlzLiN0YXJnZXRSYW5nZXMucHVzaChyYW5nZU5hbWUpO1xuXHR9XG5cblx0LyoqIOODnuOCueebruOBjOenu+WLleWFiOaDheWgseOCkuaMgeOBo+OBpuOBhOOCi+OBi+WIpOWumlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2VOYW1lIC0g56e75YuV5YWI5oOF5aCxXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0aGFzVGFyZ2V0KHJhbmdlTmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMuI3RhcmdldFJhbmdlcy5pbmNsdWRlcyhyYW5nZU5hbWUpO1xuXHR9XG5cblx0LyoqIOWxnuaAp+OBruWtmOWcqOOCkueiuuiqjVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gYXR0ck5hbWUgLSDlsZ7mgKflkI1cblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRoYXNBdHRyKGF0dHJOYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5hdHRyLmluY2x1ZGVzKGF0dHJOYW1lKTtcblx0fVxuXHQvKiog5bqn5qiZ44GM44Oe44K555uu44Gr5ZCr44G+44KM44KL44GL5Yik5a6aXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWOW6p+aomVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIFnluqfmqJlcblx0ICovXG5cdGNoZWNrUmFuZ2VNb3VzZSh4LCB5KXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5sZWZ0IDw9IHggJiYgeCA8IHRoaXMucmlnaHQgJiZcblx0XHRcdHRoaXMudG9wIDw9IHkgJiYgeSA8IHRoaXMuYm90dG9tXG5cdFx0KTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm64v44Oe44K544KvL+mnkuOCkuaPj+WGmSAqL1xuXHRkcmF3KCl7XG5cdFx0Y29uc3Qge3NlbGVjdENvbG9yLCB0YXJnZXRDb2xvcn0gPSB0aGlzO1xuXG5cdFx0aWYodGhpcy5pbWdTcmMgJiYgY2FudmFzSW1hZ2UuaW1wb3J0ZWQpXG5cdFx0XHR0aGlzLmRyYXdJbWFnZSgpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuZHJhd1BhbmVsKCk7XG5cdFx0aWYodGhpcy5pc1NlbGVjdGVkKSB0aGlzLmRyYXdNYXNrKHNlbGVjdENvbG9yKTtcblx0XHRpZih0aGlzLmlzVGFyZ2V0KSB0aGlzLmRyYXdNYXNrKHRhcmdldENvbG9yKTtcblx0XHR0aGlzLnBpZWNlPy5kcmF3KCk7XG5cdH1cblxuXHQvKiog44Oe44K555uu55S75YOP44KS5o+P5YaZICovXG5cdGRyYXdJbWFnZSgpe1xuXHRcdGNvbnN0IHtjdHh9ID0gdGhpcztcblxuXHRcdGNvbnN0IHNyYyA9IHRoaXMuaW1nU3JjO1xuXHRcdGNvbnN0IGltYWdlID0gY2FudmFzSW1hZ2UuaW1hZ2VzW3NyY107XG5cdFx0aWYoIWltYWdlKSByZXR1cm47XG5cblx0XHRjdHguc2F2ZSgpO1xuXHRcdGN0eC50cmFuc2xhdGUodGhpcy5sZWZ0LCB0aGlzLnRvcCk7XG5cdFx0Y3R4LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog44Oe44K555uu44KS5o+P5YaZICovXG5cdGRyYXdQYW5lbCgpe1xuXHRcdGNvbnN0IHtjdHgsIGxlZnQsIHRvcCwgY2VudGVyLCBtaWRkbGUsIHdpZHRoLCBoZWlnaHQsIGRpc3BsYXlUZXh0LCB0ZXh0Um90YXRlfSA9IHRoaXM7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gdGhpcy5ib3JkZXJDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZShsZWZ0LCB0b3ApO1xuXHRcdGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblx0XHQvLyDkuqTngrnjgpLmj4/lhplcblx0XHRpZih0aGlzLmludGVyc2VjdCl7XG5cdFx0XHRjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcblx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdGN0eC5tb3ZlVG8od2lkdGgvMiwgMCk7XG5cdFx0XHRjdHgubGluZVRvKHdpZHRoLzIsIGhlaWdodCk7XG5cdFx0XHRjdHgubW92ZVRvKDAsIGhlaWdodC8yKTtcblx0XHRcdGN0eC5saW5lVG8od2lkdGgsIGhlaWdodC8yKTtcblx0XHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRcdGN0eC5zdHJva2UoKTtcblx0XHR9XG5cdFx0Ly8g44Oe44K555uu44KS5o+P5YaZXG5cdFx0ZWxzZXtcblx0XHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdH1cblxuXHRcdC8vIOaWnOe3muOCkuaPj+WGmVxuXHRcdGN0eC5saW5lV2lkdGggPSB0aGlzLmJvcmRlcldpZHRoLzI7XG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGlmKHRoaXMuYm9yZGVyU2xhc2hMZWZ0KXtcblx0XHRcdGN0eC5tb3ZlVG8oMCwgMCk7XG5cdFx0XHRjdHgubGluZVRvKHdpZHRoLCBoZWlnaHQpO1xuXHRcdH1cblx0XHRpZih0aGlzLmJvcmRlclNsYXNoUmlnaHQpe1xuXHRcdFx0Y3R4Lm1vdmVUbyh3aWR0aCwgMCk7XG5cdFx0XHRjdHgubGluZVRvKDAsIGhlaWdodCk7XG5cdFx0fVxuXHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0Y3R4LnJlc3RvcmUoKTtcblxuXHRcdC8vIOaWh+Wtl+OCkuaPj+WGmVxuXHRcdGlmKGRpc3BsYXlUZXh0KXtcblx0XHRcdGN0eC5zYXZlKCk7XG5cdFx0XHRjdHgudHJhbnNsYXRlKGNlbnRlciwgbWlkZGxlKTtcblx0XHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmJvcmRlckNvbG9yO1xuXG5cdFx0XHRjb25zdCByYWQgPSB0ZXh0Um90YXRlPyB0ZXh0Um90YXRlKk1hdGguUEkvMTgwOiAwO1xuXHRcdFx0Y3R4LnJvdGF0ZShyYWQpO1xuXG5cdFx0XHRjb25zdCBmb250U2l6ZSA9IE1hdGgubWluKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSowLjY7XG5cdFx0XHRjdHguZm9udCA9IGAke2ZvbnRTaXplfXB4ICR7Y2FudmFzRm9udC5uYW1lc31gO1xuXG5cdFx0XHRjb25zdCB3aWR0aCA9IGN0eC5tZWFzdXJlVGV4dChkaXNwbGF5VGV4dCkud2lkdGg7XG5cdFx0XHRjb25zdCBoZWlnaHQgPSBmb250U2l6ZS8yKjAuODtcblx0XHRcdGN0eC5maWxsVGV4dChkaXNwbGF5VGV4dCwgLXdpZHRoLzIsIGhlaWdodCk7XG5cdFx0XHRjdHgucmVzdG9yZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKiDjg57jgrnnm67jgavjg57jgrnjgq/jgpLmj4/lhplcblx0ICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yIC0g44Kr44Op44O844Ko44OV44Kn44Kv44OI44Gu6ImyXG5cdCAqL1xuXHRkcmF3TWFzayhjb2xvcil7XG5cdFx0Y29uc3Qge2N0eH0gPSB0aGlzO1xuXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXG5cdFx0Ly8g44Oe44K555uu44KS5o+P5YaZXG5cdFx0Y3R4LmZpbGxSZWN0KHRoaXMubGVmdCwgdGhpcy50b3AsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcblx0fVxuXG5cdC8qKiDmloflrZfliJflvaLlvI/jgaflj5blvpdcblx0ICogQHBhcmFtIHtzdHJpbmd9IC0g57Ch5piT6KGo56S6XG5cdCAqL1xuXHR0b1N0cmluZyhpc01pbmltYW09ZmFsc2Upe1xuXHRcdHJldHVybiAhaXNNaW5pbWFtP1xuXHRcdFx0dGhpcy50ZXh0OlxuXHRcdFx0YO+9nCR7dGhpcy50ZXh0LnNsaWNlKC0xKS5yZXBsYWNlKC/jgIAvZywgXCLjg7tcIil9YDtcblx0fVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanNvbicpLlBpZWNlSW5pdE9wdGlvbn0gUGllY2VJbml0T3B0aW9uICovXG5pbXBvcnQge2NhbnZhc0ZvbnR9IGZyb20gXCIuL2NhbnZhc0ZvbnRMb2FkZXIuanNcIjtcbmltcG9ydCB7Y2FudmFzSW1hZ2V9IGZyb20gXCIuL2NhbnZhc0ltYWdlTG9hZGVyLmpzXCI7XG5pbXBvcnQge2dhbWVzLCBwaWVjZXMsIHBpZWNlUmFuZ2UsIHBpZWNlQ29zdH0gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog6aeS44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgUGllY2V7XG5cdC8qKiDmj4/lhpnjgrXjgqTjgrpcblx0ICogQHR5cGUge251bWJlcn1cblx0ICovXG5cdHN0YXRpYyBzaXplID0gNDU7XG5cblx0LyoqIOagvOOBrumBleOBhOOBq+OCiOOBo+OBpumnkuOBruWkp+OBjeOBleOCkuWkieabtOOBmeOCi+OBi1xuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHN0YXRpYyB1c2VSYW5rU2l6ZSA9IHRydWU7XG5cblx0LyoqIOW9seOBruaPj+WGmeacieeEoVxuXHQgKiBAdHlwZSB7Ym9vbGVhbn1cblx0ICovXG5cdHN0YXRpYyBpc0RyYXdTaGFkb3cgPSB0cnVlO1xuXG5cdC8qKiDjg4bjgq3jgrnjg4jlh7rlipvmmYLjga7jg5fjg6zjgqTjg6Tjg7zooajnpLpcblx0ICogQHR5cGUge09iamVjdDxzdHJpbmcsIHN0cmluZz59XG5cdCAqL1xuXHRzdGF0aWMgZGVnQ2hhcnMgPSB7XG5cdFx0MDogXCLilrJcIixcblx0XHQ5MDogXCLiiatcIixcblx0XHQxODA6IFwi4pa9XCIsXG5cdFx0MjcwOiBcIu+8nFwiXG5cdH07XG5cblx0LyoqIOODl+ODrOOCpOODpOODvOihqOekuuOBi+OCieinkuW6puOCkuWPluW+lyAqL1xuXHRzdGF0aWMgY2hhckRlZ3MgPSB7fTtcblxuXHQvKiog44K144Kk44K65aSJ5pu06Kit5a6a5YCkXG5cdCAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBudW1iZXI+fVxuXHQgKi9cblx0c3RhdGljIHJhbmtSYXRpbyA9IHtcblx0XHRcIktSXCI6IDEsXG5cdFx0XCJTUlwiOiAwLjk2NSxcblx0XHRcIlJcIjogMC45MzUsXG5cdFx0XCJVQ1wiOiAwLjkwLFxuXHRcdFwiQ1wiOiAwLjg2NVxuXHR9XG5cblx0LyoqIOmnkuOBruautemajuWIpeS+oeWApOOCkuWPluW+lyAqL1xuXHRnZXQgcmFuaygpe1xuXHRcdHJldHVybiAoXG5cdFx0XHR0aGlzLmNvc3QgPD0gMD8gXCJLUlwiOlxuXHRcdFx0MjAgPD0gdGhpcy5jb3N0PyBcIlNSXCI6XG5cdFx0XHQxMCA8PSB0aGlzLmNvc3Q/IFwiUlwiOlxuXHRcdFx0NSA8PSB0aGlzLmNvc3Q/IFwiVUNcIjpcblx0XHRcdFwiQ1wiXG5cdFx0KTtcblx0fVxuXG5cblx0LyoqIOmnkuODh+ODvOOCv+OCkuWIneacn+WMllxuXHQgKiBAcGFyYW0ge2FueX0gY3R4IC0gQ2FudmFz5o+P55S744Kz44Oz44OG44Kt44K544OIXG5cdCAqIEBwYXJhbSB7UGllY2V8UGllY2VJbml0T3B0aW9ufSBvcHRpb24gLSDpp5Ljga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7Ncblx0ICovXG5cdHN0YXRpYyBnZXRQaWVjZXMoY3R4LCBvcHRpb249e30pe1xuXHRcdGNvbnN0IGV4UGllY2VzID0gbmV3IE1hcChPYmplY3QuZW50cmllcyhKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBpZWNlcykpKSk7XG5cblx0XHQvKiDjg4fjg7zjgr/jgpLoo5zlrowgKi9cblx0XHRmb3IoY29uc3QgW18sIHBpZWNlXSBvZiBleFBpZWNlcyl7XG5cdFx0XHRwaWVjZS5hdHRyID8/PSBbXTtcblx0XHRcdGlmKHBpZWNlLnVuaXQgJiYgcGllY2UudW5pdCA9PT0gXCLmiJBcIikgcGllY2UuYmFzZSA9IHBpZWNlO1xuXHRcdH1cblx0XHQvKiDmiJDpp5Ljga7jg4fjg7zjgr/jgpLlkIjmiJAgKi9cblx0XHRmb3IoY29uc3QgW18sIHBpZWNlXSBvZiBleFBpZWNlcyl7XG5cdFx0XHRpZighcGllY2UucHJvbW8gfHwgdHlwZW9mKHBpZWNlLnByb21vKSAhPT0gXCJzdHJpbmdcIikgY29udGludWU7XG5cdFx0XHRjb25zdCBwcm9tb0tleXMgPSBbLi4ucGllY2UucHJvbW9dO1xuXHRcdFx0cGllY2UucHJvbW8gPSB7fTtcblx0XHRcdGZvcihjb25zdCBrZXkgb2YgcHJvbW9LZXlzKXtcblx0XHRcdFx0Y29uc3QgcHJvbW8gPSBleFBpZWNlcy5nZXQoa2V5KTtcblx0XHRcdFx0cHJvbW8uYXR0ci5wdXNoKFwicHJvbW90ZWRcIik7XG5cdFx0XHRcdHByb21vLnVuaXQgPSBcIuaIkFwiO1xuXHRcdFx0XHRwaWVjZS5wcm9tb1trZXldID0gcHJvbW87XG5cdFx0XHRcdGV4UGllY2VzLnNldChrZXksey4uLnBpZWNlLCAuLi5wcm9tb30pO1xuXHRcdFx0fTtcblx0XHR9XG5cdFx0Ly8g6aeS44KS44Kv44Op44K544Kq44OW44K444Kn44Kv44OI44Gr5aSJ5o+bXG5cdFx0Wy4uLmV4UGllY2VzXS5mb3JFYWNoKChba2V5LCBwaWVjZV0sIGkpPT57XG5cdFx0XHRwaWVjZS5pZCA9IGk7XG5cdFx0XHRwaWVjZS5jaGFyID0ga2V5O1xuXHRcdFx0ZXhQaWVjZXMuc2V0KGtleSwgbmV3IFBpZWNlKGN0eCwgcGllY2UsIG9wdGlvbikpO1xuXHRcdH0pO1xuXHRcdGNvbnN0IGV4UGllY2VzT2JqID0gT2JqZWN0LmZyb21FbnRyaWVzKGV4UGllY2VzKTtcblx0XHQvLyDjgqjjgqTjg6rjgqLjgrnjga7jg4fjg7zjgr/jgpLntbHlkIhcblx0XHRmb3IoY29uc3QgW2tleSwgcGllY2VdIG9mIGV4UGllY2VzKXtcblx0XHRcdHBpZWNlLmFsaWFzLmZvckVhY2goKGFsaWFzS2V5LCBpKT0+e1xuXHRcdFx0XHRjb25zdCBhbGlhcyA9IHBpZWNlLmNsb25lKCk7XG5cdFx0XHRcdGNvbnN0IGRpc3BsYXkgPSBbLi4uYWxpYXMuZGlzcGxheV07XG5cdFx0XHRcdGFsaWFzLmRpc3BsYXlQdG4gPSBpKzE7XG5cdFx0XHRcdGFsaWFzLmRpc3BsYXkgPSBkaXNwbGF5O1xuXHRcdFx0XHRhbGlhcy5hbGlhc1tpXSA9IGtleTtcblx0XHRcdFx0ZXhQaWVjZXNPYmpbYWxpYXNLZXldID0gYWxpYXM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0cmV0dXJuIGV4UGllY2VzT2JqO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+OBi+OCiemnkuOCkuWPluW+l1xuXHQgKiBAcGFyYW0ge1BpZWNlfFBpZWNlSW5pdE9wdGlvbn0gcGllY2UgLSDpp5Jcblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSDpp5LmloflrZfliJdcblx0ICovXG5cdHN0YXRpYyBzdHJpbmdUb1BpZWNlKHBpZWNlcywgdGV4dCl7XG5cdFx0aWYgKCF0ZXh0KSByZXR1cm4gbnVsbDtcblx0XHRjb25zdCBbZGVnQ2hhciwgcGllY2VDaGFyXSA9IFsuLi50ZXh0XTtcblx0XHRjb25zdCBkZWcgPSBQaWVjZS5jaGFyRGVnc1tkZWdDaGFyXTtcblx0XHRpZighZGVnIHx8ICFwaWVjZXNbcGllY2VDaGFyXSkgcmV0dXJuIG51bGw7XG5cdFx0Y29uc3QgcGllY2UgPSBwaWVjZXNbcGllY2VDaGFyXS5jbG9uZSgpO1xuXHRcdHBpZWNlLmRlZyA9IGRlZztcblx0XHRyZXR1cm4gcGllY2U7XG5cdH1cblxuXHQvKiog6aeS44Gu5LiA6Kan44KS44Oq44K544OI44Gn5Y+W5b6XICovXG5cdHN0YXRpYyBwaWVjZXNUb0xpc3QocGllY2VzKXtcblx0XHRyZXR1cm4gT2JqZWN0LmVudHJpZXMocGllY2VzKVxuXHRcdFx0LnNvcnQoKFtfLHtpZDphfV0sIFtfXyx7aWQ6Yn1dKT0+XG5cdFx0XHRcdE1hdGguc2lnbihhLWIpKTtcblx0fVxuXG5cdC8qKiDpp5Ljga7op5LluqYoZGVnL3JhZClcblx0ICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG5cdCAqL1xuXHRzZXQgZGVnKHZhbHVlKXtcblx0XHR0aGlzLnJhZCA9IHZhbHVlJTM2MCpNYXRoLlBJLzE4MDtcblx0fVxuXHRnZXQgZGVnKCl7XG5cdFx0cmV0dXJuIHRoaXMucmFkJTM2MC8oTWF0aC5QSS8xODApO1xuXHR9XG5cblx0LyoqIOW3puWBtOOBruW6p+aomSAqL1xuXHRnZXQgbGVmdCgpe1xuXHRcdHJldHVybiB0aGlzLmNlbnRlci10aGlzLnNpemUqMC44LzI7XG5cdH1cblx0LyoqIOS4iuWBtOOBruW6p+aomSAqL1xuXHRnZXQgdG9wKCl7XG5cdFx0cmV0dXJuIHRoaXMubWlkZGxlLXRoaXMuc2l6ZS8yO1xuXHR9XG5cdC8qKiDlj7PlgbTjga7luqfmqJkgKi9cblx0Z2V0IHJpZ2h0KCl7XG5cdFx0cmV0dXJuIHRoaXMuY2VudGVyK3RoaXMuc2l6ZSowLjgvMjtcblx0fVxuXHQvKiog5LiL5YG044Gu5bqn5qiZICovXG5cdGdldCBib3R0b20oKXtcblx0XHRyZXR1cm4gdGhpcy5taWRkbGUrdGhpcy5zaXplLzI7XG5cdH1cblxuXHQvKiog5ouh5aSn546H44KS5Y+W5b6XXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9XG5cdCAqL1xuXHRnZXQgem9vbSgpe1xuXHRcdGxldCB6b29tID10aGlzLnNpemUvMTAwO1xuXHRcdGlmKHRoaXMudXNlUmFua1NpemUpXG5cdFx0XHR6b29tICo9IFBpZWNlLnJhbmtSYXRpb1t0aGlzLnJhbmtdO1xuXHRcdHJldHVybiB6b29tO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7YW55fSBjdHggLSBDYW52YXPmj4/nlLvjgrPjg7Pjg4bjgq3jgrnjg4hcblx0ICogQHBhcmFtIHtQaWVjZXxQaWVjZUluaXRPcHRpb259IHBpZWNlIC0g6aeSXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24gLSDjgqrjg5fjgrfjg6fjg7Ncblx0ICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbi5kaXNwbGF5UHRuIC0g6KGo56S65paH5a2X5YiX44KS5aSJ5pu0KDHjgJwpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uZGVnIC0g6aeS44Gu6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uc2l6ZSAtIOmnkuOBruWkp+OBjeOBlVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi51c2VSYW5rU2l6ZSAtIOmnkuOBruWkp+OBjeOBleOCkuagvOOBrumBleOBhOOBp+WkieabtOOBmeOCi+OBi1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi5pc0RyYXdTaGFkb3cgLSDpp5Ljga7lvbHjga7mj4/lhpnmnInnhKFcblx0ICogQHBhcmFtIHtib29sZWFufSBvcHRpb24uaXNNb3ZlZCAtIOWIneWbnuenu+WLlea4iOOBv+OBi+WQpuOBi1xuXHQgKi9cblx0Y29uc3RydWN0b3IoY3R4LCBwaWVjZSwgb3B0aW9uPXt9KXtcblx0XHRjb25zdCB7XG5cdFx0XHRkaXNwbGF5UHRuPTAsXG5cdFx0XHRkZWc9MCxcblx0XHRcdHNpemU9UGllY2Uuc2l6ZSxcblx0XHRcdHVzZVJhbmtTaXplPVBpZWNlLnVzZVJhbmtTaXplLFxuXHRcdFx0aXNEcmF3U2hhZG93PVBpZWNlLmlzRHJhd1NoYWRvdyxcblx0XHRcdGlzTW92ZWQ9ZmFsc2Vcblx0XHR9ID0gb3B0aW9uO1xuXHRcdE9iamVjdC5hc3NpZ24odGhpcywgcGllY2UpO1xuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXHRcdHRoaXMuZGlzcGxheSA/Pz0gW1wiXCJdO1xuXHRcdHRoaXMuaW1nU3JjID8/PSBudWxsO1xuXHRcdHRoaXMuYWxpYXMgPSBbLi4udGhpcy5hbGlhcyA/PyBcIlwiXTtcblx0XHR0aGlzLmRpc3BsYXlQdG4gPSBkaXNwbGF5UHRuO1xuXHRcdHRoaXMuZ2FtZSA9IGdhbWVzW3RoaXMuZ2FtZU5hbWVdO1xuXHRcdHRoaXMuY29zdCA9IHBpZWNlQ29zdFt0aGlzLmNoYXJdID8/IDE7XG5cdFx0dGhpcy5jZW50ZXIgPSAwO1xuXHRcdHRoaXMubWlkZGxlID0gMDtcblx0XHR0aGlzLmRlZyA9IGRlZztcblx0XHR0aGlzLnNpemUgPSBzaXplO1xuXHRcdHRoaXMudXNlUmFua1NpemUgPSB1c2VSYW5rU2l6ZTtcblx0XHR0aGlzLmlzRHJhd1NoYWRvdyA9IGlzRHJhd1NoYWRvdztcblx0XHR0aGlzLmlzUm90YXRlSW1nID8/PSB0cnVlO1xuXHRcdHRoaXMuaXNNb3ZlZCA9IGlzTW92ZWQ7XG5cdFx0dGhpcy5pc1NlbGVjdGVkID0gZmFsc2U7XG5cdFx0dGhpcy5hdHRyID8/PSBbXTtcblx0XHR0cnl7XG5cdFx0XHRPYmplY3QuZW50cmllcyh0aGlzLnJhbmdlKS5mb3JFYWNoKChba2V5LCBybmddKT0+e1xuXHRcdFx0XHRpZihBcnJheS5pc0FycmF5KHJuZykpIHJldHVybjtcblx0XHRcdFx0dGhpcy5yYW5nZVtrZXldID0gcGllY2VSYW5nZVtybmddLm1hcChyb3c9PlsuLi5yb3ddKVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGNhdGNoKGUpe1xuXHRcdFx0Y29uc29sZS5lcnJvcihlKTtcblx0XHRcdHRocm93IHBpZWNlO1xuXHRcdH1cblx0fVxuXG5cdC8qKiDpp5LjgpLjgq/jg63jg7zjg7Ncblx0ICogQHJldHVybnMgUGllY2Vcblx0ICovXG5cdGNsb25lKCl7XG5cdFx0Y29uc3Qge2Rpc3BsYXlQdG4sIGRlZywgc2l6ZSwgaXNNb3ZlZH0gPSB0aGlzO1xuXHRcdHJldHVybiBuZXcgUGllY2UodGhpcy5jdHgsIHsuLi50aGlzfSwge2Rpc3BsYXlQdG4sIGRlZywgc2l6ZSwgaXNNb3ZlZH0pO1xuXHR9XG5cblx0LyoqIOmnkuOCkuihqOi/lOOBmSAqL1xuXHR0dXJuRnJvbnQoKXtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMsIHRoaXMuYmFzZSk7XG5cdH1cblxuXHQvKiog44OX44Ot44Oi44O844K344On44OzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjaGFyIC0g5oiQ44KK5YWI44Gu5paH5a2XXG5cdCAqL1xuXHRwcm9tb3Rpb24oY2hhcil7XG5cdFx0Y29uc3Qge3Byb21vfSA9IHRoaXM7XG5cblx0XHRpZighcHJvbW8pIHRocm93IEVycm9yKGBwcm9tbz0ke2NoYXJ9LCBOb3QgcGxvbW90ZSBwaWVjZS5gKTtcblx0XHRpZighcHJvbW8gaW4gcHJvbW8pIHRocm93IEVycm9yKGBwcm9tbz0ke2NoYXJ9LCBQbG9tb3RlIGtleSBpcyBtaXNzaW5nLmApO1xuXHRcdGlmKHRoaXMuaGFzQXR0cihcInByb21vdGVkXCIpKSB0aHJvdyBFcnJvcihgcHJvbW89JHtjaGFyfSwgUHJvbW90ZWQgcGllY2UuYCk7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBwcm9tb1tjaGFyXSk7XG5cdFx0dGhpcy5jaGFyID0gY2hhcjtcblx0fVxuXG5cdC8qKiDlsZ7mgKfjga7lrZjlnKjjgpLnorroqo1cblx0ICogQHBhcmFtIHtzdHJpbmd9IGF0dHJOYW1lIC0g5bGe5oCn5ZCNXG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0aGFzQXR0cihhdHRyTmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMuYXR0ci5pbmNsdWRlcyhhdHRyTmFtZSk7XG5cdH1cblxuXHQvKiog5bqn5qiZ44GM6aeS44Gr5ZCr44G+44KM44KL44GL5Yik5a6aXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gWOW6p+aomVxuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIFnluqfmqJlcblx0ICovXG5cdGNoZWNrUmFuZ2VNb3VzZSh4LCB5KXtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5sZWZ0IDw9IHggJiYgeCA8IHRoaXMucmlnaHQgJiZcblx0XHRcdHRoaXMudG9wIDw9IHkgJiYgeSA8IHRoaXMuYm90dG9tXG5cdFx0KTtcblx0fVxuXG5cdC8qKiDnp7vli5Xnr4Tlm7LjgpLlm57ou6LjgZfjgablj5blvpcgKi9cblx0Z2V0UmFuZ2UoKXtcblx0XHRjb25zdCBkZWcgPSAwfHRoaXMuZGVnO1xuXHRcdGNvbnN0IHJhbmdlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnJhbmdlKSk7XG5cdFx0T2JqZWN0LmtleXMocmFuZ2UpLmZvckVhY2goa2V5PT57XG5cdFx0XHRpZihkZWcgPT09IDApIHJldHVybjtcblx0XHRcdGlmKCFbOTAsIDE4MCwgMjcwXS5pbmNsdWRlcyhkZWcpKSB0aHJvdyBFcnJvcihgZGVnPSR7ZGVnfSwgZGVnIG5lZWQgbXVsdGlwbGUgb2YgOTAuYCk7XG5cdFx0XHRpZihbOTAsIDI3MF0uaW5jbHVkZXMoZGVnKSl7XG5cdFx0XHRcdC8vIDLmrKHphY3liJfjgpLou6Lnva5cblx0XHRcdFx0Y29uc3QgdHJhbnNwb3NlID0gYSA9PiBhWzBdLm1hcCgoXywgYykgPT4gYS5tYXAociA9PiByW2NdKSk7XG5cdFx0XHRcdHJhbmdlW2tleV0gPSB0cmFuc3Bvc2UocmFuZ2Vba2V5XSk7XG5cdFx0XHR9XG5cdFx0XHRpZihbMTgwLCAyNzBdLmluY2x1ZGVzKGRlZykpe1xuXHRcdFx0XHRyYW5nZVtrZXldLnJldmVyc2UoKTtcblx0XHRcdH1cblx0XHRcdHJhbmdlW2tleV0uZm9yRWFjaChyb3c9Pntcblx0XHRcdFx0aWYoWzkwLCAxODBdLmluY2x1ZGVzKGRlZykpIHJvdy5yZXZlcnNlKCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcmFuZ2U7XG5cdH1cblxuXHQvKiog6aeSL+ODnuOCueOCr+OCkuaPj+WGmSAqL1xuXHRhc3luYyBkcmF3KCl7XG5cdFx0Y29uc3Qgc2VsZWN0Q29sb3IgPSBcIiNGRjAwMDA1NVwiO1xuXHRcdGlmKHRoaXMuaW1nU3JjICYmIGNhbnZhc0ltYWdlLmltcG9ydGVkKXtcblx0XHRcdHRoaXMuZHJhd0ltYWdlKCk7XG5cdFx0XHRpZih0aGlzLmlzU2VsZWN0ZWQpIHRoaXMuZHJhd01hc2tJbWFnZShzZWxlY3RDb2xvcik7XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHR0aGlzLmRyYXdQaWVjZSgpO1xuXHRcdFx0aWYodGhpcy5pc1NlbGVjdGVkKSB0aGlzLmRyYXdNYXNrKHNlbGVjdENvbG9yKTtcblx0XHR9XG5cdH1cblxuXHQvKiog6aeS55S75YOP44KS5o+P5YaZICovXG5cdGRyYXdJbWFnZSgpe1xuXHRcdGNvbnN0IHtjdHgsIHNpemV9ID0gdGhpcztcblxuXHRcdGNvbnN0IHNyYyA9IHRoaXMuaW1nU3JjW3RoaXMuZGlzcGxheVB0bl07XG5cdFx0Y29uc3QgaW1hZ2UgPSBjYW52YXNJbWFnZS5pbWFnZXNbc3JjXTtcblx0XHRpZighaW1hZ2UpIHJldHVybjtcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmNlbnRlciwgdGhpcy5taWRkbGUpO1xuXHRcdGlmKHRoaXMuaXNSb3RhdGVJbWcpIGN0eC5yb3RhdGUodGhpcy5yYWQpO1xuXG5cdFx0bGV0IGltZ1dpZHRoLCBpbWdIZWlnaHQ7XG5cdFx0aWYoaW1hZ2Uud2lkdGgqMC45IDwgaW1hZ2UuaGVpZ2h0KXtcblx0XHRcdGltZ1dpZHRoID0gaW1hZ2Uud2lkdGgvaW1hZ2UuaGVpZ2h0KnNpemVcblx0XHRcdGltZ0hlaWdodCA9IHNpemU7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aW1nV2lkdGggPSBzaXplO1xuXHRcdFx0aW1nSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0L2ltYWdlLndpZHRoKnNpemU7XG5cdFx0fVxuXHRcdGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIC1pbWdXaWR0aC8yLCAtaW1nSGVpZ2h0LzIsIGltZ1dpZHRoLCBpbWdIZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog6aeS55S75YOP44Gr44Oe44K544Kv44KS5o+P5YaZXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvciAtIOOCq+ODqeODvOOCqOODleOCp+OCr+ODiOOBruiJslxuXHQgKi9cblx0ZHJhd01hc2tJbWFnZShjb2xvcil7XG5cdFx0Y29uc3Qge2N0eCwgc2l6ZX0gPSB0aGlzO1xuXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y29uc3QgaW1nV2lkdGggPSBzaXplKjAuOTtcblx0XHRjb25zdCBpbWdIZWlnaHQgPSBzaXplO1xuXG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmNlbnRlciwgdGhpcy5taWRkbGUpO1xuXHRcdGN0eC5maWxsUmVjdCgtaW1nV2lkdGgvMiwgLWltZ0hlaWdodC8yLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KTtcblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cblx0LyoqIOWwhuaji+mnkuOBruWkluW9ouODkeOCueOCkuS9nOaIkFxuXHQgKiBAcGFyYW0ge251bWJlcn0gem9vbSAtIOmnkuOBruaLoeWkp+eOh1xuXHQgKi9cblx0bWFrZVBhdGgoem9vbSl7XG5cdFx0Y29uc3Qge2N0eH0gPSB0aGlzO1xuXG5cdFx0Y3R4LnRyYW5zbGF0ZSh0aGlzLmNlbnRlciwgdGhpcy5taWRkbGUpO1xuXHRcdGN0eC5yb3RhdGUodGhpcy5yYWQpO1xuXG5cdFx0Lyog5aSW5p6g44KS5o+P5YaZICovXG5cdFx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRcdGN0eC5tb3ZlVG8oLTMwKnpvb20sLTQwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oICAwKnpvb20sLTUwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oIDMwKnpvb20sLTQwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oIDQ1Knpvb20sIDUwKnpvb20pO1xuXHRcdGN0eC5saW5lVG8oLTQ1Knpvb20sIDUwKnpvb20pO1xuXHRcdGN0eC5jbG9zZVBhdGgoKTtcblx0fVxuXG5cdC8qKiDpp5Ljga7lvbHjgpLmj4/lhplcblx0KiBAcGFyYW0ge251bWJlcn0gem9vbSAtIOmnkuOBruaLoeWkp+eOh1xuXHQqL1xuICAgZHJhd1BpZWNlU2hhZG93KHpvb20pe1xuXHRcdGlmKCF0aGlzLmlzRHJhd1NoYWRvdykgcmV0dXJuO1xuXHRcdGNvbnN0IHtjdHh9ID0gdGhpcztcblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LnRyYW5zbGF0ZSgwLCAxMCp6b29tKTtcblx0XHR0aGlzLmRyYXdNYXNrKFwiIzAwMDAwMDY2XCIpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdH1cblxuXHQvKiog6aeS44KS5o+P5YaZICovXG5cdGRyYXdQaWVjZSgpe1xuXHRcdGNvbnN0IHtjdHgsIGdhbWUsIHpvb219ID0gdGhpcztcblxuXHRcdGxldCBmb250Q29sb3IsIGJhY2tncm91bmRDb2xvciwgYm9yZGVyQ29sb3I7XG5cdFx0aWYodGhpcy5oYXNBdHRyKFwicHJvbW90ZWRcIikpe1xuXHRcdFx0Zm9udENvbG9yID0gZ2FtZS5wcm9tb3RlRm9udENvbG9yID8/IGdhbWUuZm9udENvbG9yID8/IFwiIzAwMDAwMFwiO1xuXHRcdFx0YmFja2dyb3VuZENvbG9yID0gZ2FtZS5wcm9tb3RlQmFja2dyb3VuZENvbG9yID8/IGdhbWUuYmFja2dyb3VuZENvbG9yID8/IFwiI0ZGRkZGRlwiLFxuXHRcdFx0Ym9yZGVyQ29sb3IgPSBnYW1lLnByb21vdGVCb3JkZXJDb2xvciA/PyBnYW1lLmJvcmRlckNvbG9yID8/IFwiI0ZGMzMwMFwiO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGZvbnRDb2xvciA9IGdhbWUuZm9udENvbG9yID8/IFwiIzAwMDAwMFwiO1xuXHRcdFx0YmFja2dyb3VuZENvbG9yID0gZ2FtZS5iYWNrZ3JvdW5kQ29sb3IgPz8gXCIjRkZGRkZGXCIsXG5cdFx0XHRib3JkZXJDb2xvciA9IGdhbWUuYm9yZGVyQ29sb3IgPz8gXCIjNzc3Nzc3XCI7XG5cdFx0fVxuXG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gYm9yZGVyQ29sb3I7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmRDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gOCp6b29tO1xuXHRcdHRoaXMuZHJhd1BpZWNlU2hhZG93KHpvb20pO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0dGhpcy5tYWtlUGF0aCh6b29tKTtcblx0XHRjdHguc3Ryb2tlKCk7XG5cdFx0Y3R4LmZpbGwoKTtcblxuXHRcdC8qIOaWh+Wtl+OCkuaPj+WGmSAqL1xuXHRcdGN0eC5maWxsU3R5bGUgPSBmb250Q29sb3I7XG5cdFx0Y29uc3QgdGV4dCA9IFsuLi5cIlwiK3RoaXMuZGlzcGxheVt0aGlzLmRpc3BsYXlQdG5dXTtcblx0XHRjb25zdCBmb250U2l6ZSA9IDQwKnpvb207XG5cdFx0Y3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCAke2NhbnZhc0ZvbnQubmFtZXN9YDtcblx0XHRjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuXHRcdHRleHQuZm9yRWFjaCgodixpKT0+e1xuXHRcdFx0Y29uc3QgaGVpZ2h0ID0gdGV4dC5sZW5ndGggPT09IDE/IGZvbnRTaXplLzI6IGkqZm9udFNpemU7XG5cdFx0XHRjdHguZmlsbFRleHQodiwgMCwgaGVpZ2h0KTtcblx0XHR9KTtcblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cblx0LyoqIOmnkuOBq+ODnuOCueOCr+OCkuaPj+WGmVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gY29sb3IgLSDjgqvjg6njg7zjgqjjg5Xjgqfjgq/jg4jjga7oibJcblx0ICovXG5cdGRyYXdNYXNrKGNvbG9yKXtcblx0XHRjb25zdCB7Y3R4LCB6b29tfSA9IHRoaXM7XG5cblx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XG5cdFx0Y3R4LnNhdmUoKTtcblx0XHR0aGlzLm1ha2VQYXRoKHpvb20pO1xuXHRcdGN0eC5maWxsKCk7XG5cblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+W9ouW8j+OBp+WPluW+lyAqL1xuXHR0b1N0cmluZygpe1xuXHRcdHJldHVybiBQaWVjZS5kZWdDaGFyc1t0aGlzLmRlZ10gKyB0aGlzLmNoYXI7XG5cdH1cbn1cblxuLy8g44OX44Os44Kk44Ok44O86KGo56S644GL44KJ6KeS5bqm44KS5Y+W5b6XXG5PYmplY3QuZW50cmllcyhQaWVjZS5kZWdDaGFycylcblx0LmZvckVhY2goKFtrZXksIHZhbHVlXSk9Pntcblx0XHRQaWVjZS5jaGFyRGVnc1t2YWx1ZV0gPSBrZXk7XG5cdH0pO1xuIiwiaW1wb3J0IHtCb2FyZH0gZnJvbSBcIi4vYm9hcmQuanNcIjtcbmltcG9ydCB7UGllY2V9IGZyb20gXCIuL3BpZWNlLmpzXCI7XG5cbi8vIOenu+WLleevhOWbsuOCquODl+OCt+ODp+ODs1xuY29uc3QgcmFuZ2VPcHRpb25zID0gW1xuXHRbXCJkZWZhdWx0XCIsIHtpc0F0dGFjazogZmFsc2V9XSxcblx0W1wiYXR0YWNrXCIsIHtpc0F0dGFjazogdHJ1ZX1dLFxuXHRbXCJzdGFydFwiLCB7aXNBdHRhY2s6IGZhbHNlfV0sXG5cdFtcImNhc3RsaW5nXCIsIHtpc0F0dGFjazogZmFsc2V9XSxcblx0W1wiZW5QYXNzYW50XCIsIHtpc0F0dGFjazogdHJ1ZX1dLFxuXHRbXCJwYWxhY2VTbGFzaFwiLCB7aXNBdHRhY2s6IGZhbHNlfV0sXG5cdFtcInBhbGFjZVNsYXNoXCIsIHtpc0F0dGFjazogdHJ1ZX1dXG5dO1xuXG4vLyDotbfngrnmloflrZfjga7lrprnvqlcbmNvbnN0IGNlbnRlckNoYXJzID0gW1xuXHRbXCJPXCIsIHtpc093bjogdHJ1ZX1dLFxuXHRbXCJvXCIsIHt9XVxuXTtcblxuLy8g56e75YuV56+E5Zuy5paH5a2X44Gu6Kaq5a2Q6Zai5L+CXG4vKiog54K556e75YuV44Kq44OX44K344On44OzXG4gKiBAdHlwZSB7T2JqZWN0PGtleTogc3RyaW5nLCB7Y2hpbGQ6IHN0cmluZ1tdfT5bXX1cbiAqIEBwYXJhbSBrZXkgLSDnp7vli5Xnr4Tlm7LjgpLlrprnvqnjgZnjgovmloflrZdcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb3Zlcy0g6YCy6KGM5Y+v6IO944Gq44Oe44K55pWwXG4gKi9cbmNvbnN0IHBvaW50Q2hhcnMgPSBbXG5cdFtcIm9cIl0sXG5cdFtcIkFcIiwge2NoaWxkOiBbXCJhXCJdfV0sXG5cdFtcIkJcIiwge2NoaWxkOiBbXCJiXCJdfV0sXG5cdFtcIkNcIiwge2NoaWxkOiBbXCJjXCJdfV0sXG5cdFtcIkRcIiwge2NoaWxkOiBbXCJkXCJdfV0sXG5cdFtcIkVcIiwge2NoaWxkOiBbXCJhXCIsIFwiZVwiXX1dLFxuXHRbXCJGXCIsIHtjaGlsZDogW1wiYVwiLCBcImZcIl19XSxcblx0W1wiR1wiLCB7Y2hpbGQ6IFtcImJcIiwgXCJnXCJdfV0sXG5cdFtcIkhcIiwge2NoaWxkOiBbXCJiXCIsIFwiaFwiXX1dLFxuXHRbXCJJXCIsIHtjaGlsZDogW1wiY1wiLCBcImlcIl19XSxcblx0W1wiSlwiLCB7Y2hpbGQ6IFtcImNcIiwgXCJqXCJdfV0sXG5cdFtcIktcIiwge2NoaWxkOiBbXCJkXCIsIFwia1wiXX1dLFxuXHRbXCJMXCIsIHtjaGlsZDogW1wiZFwiLCBcImxcIl19XVxuXTtcblxuLyoqIOebtOe3muenu+WLleOCquODl+OCt+ODp+ODs1xuICogQHR5cGUge09iamVjdDxrZXk6IHN0cmluZywge2ptcHM6IG51bWJlciwgbW92ZXM6IG51bWJlcn0+W119XG4gKiBAcGFyYW0ga2V5IC0g56e75YuV56+E5Zuy44KS5a6a576p44GZ44KL5paH5a2XXG4gKiBAcGFyYW0gam1wcyAtIOW/heimgeOBquOCuOODo+ODs+ODl+WbnuaVsFxuICogQHBhcmFtIG1vdmVzLSDpgLLooYzlj6/og73jgarjg57jgrnmlbBcbiAqL1xuY29uc3QgbGluZXJDaGFycyA9IFtcblx0W1wiKlwiLCB7fV0sXG5cdFtcIitcIiwge2ptcHM6IDF9XSxcblx0W1wifFwiLCB7am1wczogMSwgbW92ZXM6IDF9XVxuXTtcbmZvcihsZXQgaT0xO2k8PTk7aSsrKVxuXHRsaW5lckNoYXJzLnB1c2goW1wiXCIraSwge21vdmVzOiBpfV0pO1xuXG4vKiogcmFuZ2Xjga7ljp/ngrnluqfmqJnjgpLlj5blvpdcbiAqIEBwYXJhbSB7c3RyaW5nW119IHJhbmdlIC0g56e75YuV56+E5Zuy5oOF5aCxXG4gKi9cbmZ1bmN0aW9uIGdldE9yaWdpbihyYW5nZSl7XG5cdGNvbnN0IG9MaXN0ID0gW107XG5cdGxldCBvd25YLCBvd25ZO1xuXHRmb3IobGV0IHJZPTA7clk8cmFuZ2UubGVuZ3RoO3JZKyspe1xuXHRcdGZvcihsZXQgclg9MDtyWDxyYW5nZVtyWV0ubGVuZ3RoO3JYKyspe1xuXHRcdFx0Y29uc3QgckNoYXIgPSByYW5nZVtyWV1bclhdO1xuXHRcdFx0Zm9yKGxldCBba2V5LCB7aXNPd259XSBvZiBjZW50ZXJDaGFycyl7XG5cdFx0XHRcdGlmKHJDaGFyICE9PSBrZXkpIGNvbnRpbnVlO1xuXHRcdFx0XHRvTGlzdC5wdXNoKHtpc093biwgb1g6IHJYLCBvWTogcll9KTtcblx0XHRcdFx0aWYoaXNPd24pIFtvd25YLCBvd25ZXSA9IFtyWCwgclldO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gb0xpc3QubWFwKG89Pntcblx0XHRvLm9mZnNldFggPSBvLm9YLW93blg7XG5cdFx0by5vZmZzZXRZID0gby5vWS1vd25ZO1xuXHRcdHJldHVybiBvO1xuXHR9KTtcbn1cblxuLyoqIOmnkuOBruenu+WLleWIpOWumlxuICogQHBhcmFtIHtCb2FyZH0gYm9hcmQgLSDjg5zjg7zjg4lcbiAqIEBwYXJhbSB7UGllY2V9IHBpZWNlIC0g6aeSXG4gKiBAcGFyYW0ge251bWJlcn0gcFggLSDjg57jgrnnm67jga7liJdcbiAqIEBwYXJhbSB7bnVtYmVyfSBwWSAtIOODnuOCueebruOBruihjFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVGFyZ2V0KGJvYXJkLCBwaWVjZSwgcFgsIHBZKXtcblx0Y29uc3Qge2ZpZWxkLCB5TGVuLCBlblBhc3NhbnR9ID0gYm9hcmQ7XG5cblx0LyoqIOODnuOCueebruW6p+aomeOBjOODnOODvOODieevhOWbsuWGheOBi+WIpOWumlxuXHQgKiBAcGFyYW0ge251bWJlcn0geCAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruWIl1xuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruihjFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdGZ1bmN0aW9uIGluRmllbGQoeCwgeSl7XG5cdFx0cmV0dXJuIGZpZWxkW3ldICYmIGZpZWxkW3ldW3hdICYmICFmaWVsZFt5XVt4XS5oYXNBdHRyKFwia2VlcE91dFwiKTtcblx0fVxuXG5cdC8qKiDljIXlkIzlo6vjgafjgYLjgovjgYtcblx0ICogQHBhcmFtIHtQYW5lbH0gcGFuZWwgLSDjg57jgrnnm65cblx0ICovXG5cdGZ1bmN0aW9uIGlzVnNQbyhwYW5lbCl7XG5cdFx0cmV0dXJuIHBhbmVsLnBpZWNlICYmIHBpZWNlLmhhc0F0dHIoXCJwb1wiKSAmJiBwYW5lbC5waWVjZS5oYXNBdHRyKFwicG9cIik7XG5cdH1cblxuXHQvKiog5a++6LGh6aeS44GM54Ku44Gn5Y+W44KM44KL44GLXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Oe44K555uuXG5cdCAqL1xuXHRmdW5jdGlvbiBpc0F0dGFja0Zyb21QYW8ocGFuZWwpe1xuXHRcdHJldHVybiBwYW5lbC5waWVjZVxuXHRcdFx0JiYgIXBpZWNlLmlzTW92ZWRcblx0XHRcdCYmICFwYW5lbC5waWVjZS5pc01vdmVkXG5cdFx0XHQmJiBwaWVjZS5oYXNBdHRyKFwicGFvXCIpXG5cdFx0XHQmJiBwaWVjZS5jb3N0IDwgcGFuZWwucGllY2UuY29zdDtcblx0fVxuXG5cdC8qKiDnp7vli5Xlj6/og73jgYvliKTlrppcblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IHggLSDliKTlrprjgZnjgovjg57jgrnnm67jga7liJdcblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgLSDliKTlrprjgZnjgovjg57jgrnnm67jga7ooYxcblx0ICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlTmFtZSAtIOenu+WLleevhOWbsuOBruWumue+qeWQjVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrUml2YWxEZWcgLSDmlbXjga7pp5Ljga7jgb/jgpLnp7vli5XlhYjjgajjgZnjgovjgYs/XG5cdCAqIEByZXR1cm5zIGJvb2xlYW5cblx0ICovXG5cdGZ1bmN0aW9uIGNhbk1vdmUoaXNBdHRhY2ssIHgsIHksIHJhbmdlTmFtZT1cIlwiLCBjaGVja1JpdmFsRGVnPXRydWUpe1xuXHRcdGlmKCFmaWVsZFt5XSB8fCAhZmllbGRbeV1beF0pIHJldHVybiBmYWxzZTtcblx0XHRjb25zdCBwYW5lbCA9IGZpZWxkW3ldW3hdO1xuXHRcdGlmKCFwYW5lbCkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKGlzVnNQbyhwYW5lbCkpIHJldHVybiBmYWxzZTtcblx0XHRpZihpc0F0dGFja0Zyb21QYW8ocGFuZWwpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYocmFuZ2VOYW1lID09PSBcImVuUGFzc2FudFwiICYmICFlblBhc3NhbnQuaXNUYXJnZXQocGFuZWwsIHBpZWNlKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKHBpZWNlLmhhc0F0dHIoXCJpblBhbGFjZVwiKSAmJiAhcGFuZWwuaGFzQXR0cihcInBhbGFjZVwiKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKHJhbmdlTmFtZS5pbmRleE9mKFwicGFsYWNlXCIpID09PSAwICYmICEocGFuZWwuaGFzQXR0cihyYW5nZU5hbWUpICYmIGZpZWxkW3BZXVtwWF0uaGFzQXR0cihyYW5nZU5hbWUpKSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKHBpZWNlLmhhc0F0dHIoXCJ1bkNyb3NzUml2ZXJcIikgJiYgeUxlbi0oMHx5TGVuLzIpIDw9IGJvYXJkLmdldFJvdyh4LCB5LCBwaWVjZS5kZWcpKSByZXR1cm4gZmFsc2U7XG5cdFx0aWYoIWlzQXR0YWNrKSByZXR1cm4gIWZpZWxkW3ldW3hdLnBpZWNlO1xuXHRcdGlmKCFmaWVsZFt5XVt4XS5waWVjZSkgcmV0dXJuIGZhbHNlO1xuXHRcdGlmKGNoZWNrUml2YWxEZWcpIHJldHVybiBwaWVjZS5kZWcgIT09IGZpZWxkW3ldW3hdLnBpZWNlLmRlZztcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKiDlrZDjgajjgarjgovnp7vli5Xnr4Tlm7Ljgavpp5LjgYzlrZjlnKjjgZnjgovjgYtcblx0ICogQHBhcmFtIHtzdHJpbmdbXX0gcmFuZ2UgLSDnp7vli5Xnr4Tlm7Lmg4XloLFcblx0ICogQHBhcmFtIHtzdHJpbmdbXX0gY2hpbGQgLSDlrZDjgajjgarjgovmloflrZfjga7kuIDopqdcblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IG9YIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOihjClcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9ZIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOWIlylcblx0ICogQHJldHVybnMgYm9vbGVhblxuXHQgKi9cblx0ZnVuY3Rpb24gZXhpc3RzQ2hpbGQocmFuZ2UsIGNoaWxkLCBpc0F0dGFjaywgb1gsIG9ZKXtcblx0XHRmb3IoY29uc3QgY2hhciBvZiBjaGlsZCl7XG5cdFx0XHRmb3IobGV0IHJZPTA7clk8cmFuZ2UubGVuZ3RoO3JZKyspe1xuXHRcdFx0XHRmb3IobGV0IHJYPTA7clg8cmFuZ2VbclldLmxlbmd0aDtyWCsrKXtcblx0XHRcdFx0XHRjb25zdCBbeCwgeV0gPSBbclgrcFgtb1gsIHJZK3BZLW9ZXTtcblx0XHRcdFx0XHRpZihcblx0XHRcdFx0XHRcdCFpbkZpZWxkKHgsIHkpIHx8XG5cdFx0XHRcdFx0XHRjYW5Nb3ZlKGlzQXR0YWNrLCAwfHgsIDB8eSwgXCJcIiwgZmFsc2UpIHx8XG5cdFx0XHRcdFx0XHRyYW5nZVtyWV1bclhdICE9PSBjaGFyXG5cdFx0XHRcdFx0KSBjb250aW51ZTtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8qKiDnp7vli5XlhYjooajnpLrjgpLoqK3lrppcblx0ICogQHBhcmFtIHtzdHJpbmd9IHJhbmdlTmFtZSAtIOenu+WLleevhOWbsuOBruWumue+qeWQjVxuXHQgKiBAcGFyYW0ge251bWJlcn0geCAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruWIl1xuXHQgKiBAcGFyYW0ge251bWJlcn0geSAtIOWIpOWumuOBmeOCi+ODnuOCueebruOBruihjFxuXHQgKi9cblx0ZnVuY3Rpb24gc2V0VGFyZ2V0KHJhbmdlTmFtZSwgeCwgeSl7XG5cdFx0Y29uc3QgcGFuZWwgPSBmaWVsZFt5XVt4XTtcblx0XHRwYW5lbC5hZGRUYXJnZXQocmFuZ2VOYW1lKTtcblx0XHRlblBhc3NhbnQuc2V0VGFyZ2V0KHBhbmVsLCBwaWVjZSk7XG5cdH1cblxuXHQvKiog54K556e75YuVXG5cdCAqIEBwYXJhbSB7c3RyaW5nW119IHJhbmdlIC0g56e75YuV56+E5Zuy5oOF5aCxXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSByYW5nZU5hbWUgLSDnp7vli5Xnr4Tlm7Ljga7lrprnvqnlkI1cblx0ICogQHBhcmFtIHtib29sZWFufSBpc0F0dGFjayAtIOmnkuOCkuWPluW+l+WvvuixoeOBq+WQq+OCgOOBiz9cblx0ICogQHBhcmFtIHtudW1iZXJ9IG9YIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOihjClcblx0ICogQHBhcmFtIHtudW1iZXJ9IG9ZIC0g56e75YuV56+E5Zuy5oOF5aCx44Gu5Y6f54K55L2N572uKOWIlylcblx0ICovXG5cdGZ1bmN0aW9uIG1vdmVQb2ludChyYW5nZSwgW3JhbmdlTmFtZSwge2lzQXR0YWNrfV0sIHtvWCwgb1ksIGlzT3dufSl7XG5cdFx0aWYoIWlzT3duKSByZXR1cm47XG5cdFx0Zm9yKGNvbnN0IFtwYXJlbnQsIHtjaGlsZD1bXX09e31dIG9mIHBvaW50Q2hhcnMpe1xuXHRcdFx0Zm9yKGxldCByWT0wO3JZPHJhbmdlLmxlbmd0aDtyWSsrKXtcblx0XHRcdFx0Zm9yKGxldCByWD0wO3JYPHJhbmdlW3JZXS5sZW5ndGg7clgrKyl7XG5cdFx0XHRcdFx0Y29uc3QgW3gsIHldID0gW3JYK3BYLW9YLCByWStwWS1vWV07XG5cdFx0XHRcdFx0aWYoIWluRmllbGQoeCwgeSlcblx0XHRcdFx0XHRcdHx8ICFjYW5Nb3ZlKGlzQXR0YWNrLCB4LCB5LCByYW5nZU5hbWUpXG5cdFx0XHRcdFx0XHR8fCByYW5nZVtyWV1bclhdICE9PSBwYXJlbnRcblx0XHRcdFx0XHRcdHx8IGV4aXN0c0NoaWxkKHJhbmdlLCBjaGlsZCwgZmFsc2UsIG9YLCBvWSkpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdHNldFRhcmdldChyYW5nZU5hbWUsIHgsIHkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqIOebtOe3muenu+WLlVxuXHQgKiBAcGFyYW0ge3N0cmluZ1tdfSByYW5nZSAtIOenu+WLleevhOWbsuaDheWgsVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcmFuZ2VOYW1lIC0g56e75YuV56+E5Zuy44Gu5a6a576p5ZCNXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNBdHRhY2sgLSDpp5LjgpLlj5blvpflr77osaHjgavlkKvjgoDjgYs/XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvWCAtIOenu+WLleevhOWbsuaDheWgseOBruWOn+eCueS9jee9rijooYwpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvWSAtIOenu+WLleevhOWbsuaDheWgseOBruWOn+eCueS9jee9rijliJcpXG5cdCAqL1xuXHRmdW5jdGlvbiBtb3ZlTGluZXIocmFuZ2UsIFtyYW5nZU5hbWUsIHtpc0F0dGFja31dLCB7b1gsIG9ZLCBpc093biwgb2Zmc2V0WCwgb2Zmc2V0WX0pe1xuXHRcdGlmKCFpc093biAmJiAhY2FuTW92ZShmYWxzZSwgcFgrb2Zmc2V0WCwgcFkrb2Zmc2V0WSkpIHJldHVybjtcblx0XHRmb3IoY29uc3QgW2NoYXIsIHtqbXBzPTAsIG1vdmVzPTB9PXt9XSBvZiBsaW5lckNoYXJzKXtcblx0XHRcdGNvbnN0IGlzTW92ZUluZiA9ICFtb3ZlcyB8fCAwID09PSBtb3Zlcztcblx0XHRcdC8vIOWOn+eCueOBruWRqOWbsjjjg57jgrnjgpLmjqLntKJcblx0XHRcdGZvcihsZXQgclk9b1ktMTtyWTw9b1krMTtyWSsrKXtcblx0XHRcdFx0Zm9yKGxldCByWD1vWC0xO3JYPD1vWCsxO3JYKyspe1xuXHRcdFx0XHRcdGlmKHJhbmdlW3JZXVtyWF0gIT09IGNoYXIgfHwgclggPT09IG9YICYmIHJZID09PSBvWSkgY29udGludWU7XG5cdFx0XHRcdFx0bGV0IGptcENudCA9IGptcHM/IGptcHM6IDA7XG5cdFx0XHRcdFx0bGV0IG1vdmVDbnQgPSBtb3Zlcz8gbW92ZXM6IDA7XG5cdFx0XHRcdFx0Y29uc3QgW2luY1gsIGluY1ldID0gW3JYLW9YLCByWS1vWV07XG5cdFx0XHRcdFx0Zm9yKGxldCBfeD1wWCxfeT1wWTs7KXtcblx0XHRcdFx0XHRcdF94Kz1pbmNYO1xuXHRcdFx0XHRcdFx0X3krPWluY1k7XG5cdFx0XHRcdFx0XHRjb25zdCB4PV94K29mZnNldFg7XG5cdFx0XHRcdFx0XHRjb25zdCB5PV95K29mZnNldFk7XG5cdFx0XHRcdFx0XHRpZighaW5GaWVsZCh4LCB5KSB8fCAhaXNNb3ZlSW5mICYmIG1vdmVDbnQgPT09IDApIGJyZWFrO1xuXHRcdFx0XHRcdFx0Y29uc3QgaXNKdW1wZWQgPSAwID09PSBqbXBDbnQ7XG5cdFx0XHRcdFx0XHRpZihpc0p1bXBlZCAmJiBjYW5Nb3ZlKGlzQXR0YWNrLCB4LCB5LCByYW5nZU5hbWUsIGlzSnVtcGVkKSl7XG5cdFx0XHRcdFx0XHRcdG1vdmVDbnQtLTtcblx0XHRcdFx0XHRcdFx0c2V0VGFyZ2V0KHJhbmdlTmFtZSwgeCwgeSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGptcHM8MSl7XG5cdFx0XHRcdFx0XHRcdG1vdmVDbnQtLTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbnN0IHBhbmVsID0gZmllbGRbeV1beF07XG5cdFx0XHRcdFx0XHRpZihwYW5lbC5waWVjZSl7XG5cdFx0XHRcdFx0XHRcdGptcENudC0tO1xuXHRcdFx0XHRcdFx0XHRpZihpc0p1bXBlZCB8fCBpc1ZzUG8ocGFuZWwpKSBicmVhaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyDjg6HjgqTjg7Plh6bnkIZcblx0KGZ1bmN0aW9uKCl7XG5cdFx0Y29uc3QgcmFuZ2VNYXAgPSBwaWVjZS5nZXRSYW5nZSgpO1xuXHRcdHJhbmdlTWFwLmF0dGFjayA/Pz0gcmFuZ2VNYXAuZGVmYXVsdDtcblx0XHRmb3IoY29uc3QgcmFuZ2VPcHRpb24gb2YgcmFuZ2VPcHRpb25zKXtcblx0XHRcdGNvbnN0IHJhbmdlTmFtZSA9IHJhbmdlT3B0aW9uWzBdO1xuXHRcdFx0Ly8g5Yid5Zue56e75YuV56K66KqNXG5cdFx0XHRpZihwaWVjZS5pc01vdmVkICYmIFtcInN0YXJ0XCIsIFwiY2FzdGxpbmdcIl0uaW5jbHVkZXMocmFuZ2VOYW1lKSkgY29udGludWU7XG5cblx0XHRcdGNvbnN0IHJhbmdlID0gcmFuZ2VNYXBbcmFuZ2VOYW1lXTtcblx0XHRcdGlmKCFyYW5nZSkgY29udGludWU7XG5cdFx0XHRmb3IoY29uc3Qgb3JpZ2luIG9mIGdldE9yaWdpbihyYW5nZSkpe1xuXHRcdFx0XHQvLyDngrnnp7vli5Vcblx0XHRcdFx0bW92ZVBvaW50KHJhbmdlLCByYW5nZU9wdGlvbiwgb3JpZ2luKTtcblx0XHRcdFx0Ly8g55u057ea56e75YuVXG5cdFx0XHRcdG1vdmVMaW5lcihyYW5nZSwgcmFuZ2VPcHRpb24sIG9yaWdpbik7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KSgpO1xufSIsImltcG9ydCB7Qm9hcmR9IGZyb20gXCIuL2JvYXJkLmpzXCI7XG5pbXBvcnQge1BhbmVsfSBmcm9tIFwiLi9wYW5lbC5qc1wiO1xuaW1wb3J0IHtjaGVja1RhcmdldH0gZnJvbSBcIi4vY2hlY2tUYXJnZXQuanNcIjtcblxuLyoqIOODnuOCpuOCueOCs+ODs+ODiOODreODvOODq1xuICogQHBhcmFtIHtCb2FyZH0gYm9hcmQgLSDnm6RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVJQ29udHJvbChib2FyZCl7XG5cdGxldCBpc0NsaWNrID0gZmFsc2U7XG5cdGxldCBsYXN0WFkgPSBbXTtcblx0bGV0IHNlbGVjdFBhbmVsID0gbnVsbDtcblx0bGV0IHNlbGVjdFN0YW5kID0gbnVsbDtcblx0Y29uc3Qge2NhbnZhc30gPSBib2FyZDtcblxuXHQvKiog44Oe44K555uu44Gr5a++44GZ44KL5Yem55CGXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGUgLSDjgqTjg5njg7Pjg4jlvJXmlbBcblx0ICogQHBhcmFtIHsoXG5cdCAqICAgICBwYW5lbDogUGFuZWwsXG5cdCAqICAgICB4OiBudW1iZXIsXG5cdCAqICAgICB5OiBudW1iZXIsXG5cdCAqICk9PnZvaWR9IGZuUGFuZWwgLSDjg57jgrnnm67jga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcblx0ICogQHBhcmFtIHsoXG5cdCAqICAgICB4OiBudW1iZXIsXG5cdCAqICAgICB5OiBudW1iZXIsXG5cdCAqICk9PnZvaWR9IGZuQWZ0ZXIgLSDlvozlh6bnkIbjga7jgrPjg7zjg6vjg5Djg4Pjgq/plqLmlbBcbiAgICAgKi9cblx0Y29uc3QgZmllbGRQcm9jID0gKGUsIGZuUGFuZWwsIGZuQWZ0ZXI9KCk9Pnt9KT0+e1xuXHRcdGNvbnN0IHZpZXdTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGNhbnZhcyk7XG5cdFx0Y29uc3QgcmVjdCA9IGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdGxldCB4ID0gY2FudmFzLndpZHRoL3BhcnNlRmxvYXQodmlld1N0eWxlLndpZHRoKTtcblx0XHRsZXQgeSA9IGNhbnZhcy5oZWlnaHQvcGFyc2VGbG9hdCh2aWV3U3R5bGUuaGVpZ2h0KTtcblx0XHRpZihlLmNsaWVudFgpe1xuXHRcdFx0eCAqPSBlLmNsaWVudFgtcmVjdC5sZWZ0O1xuXHRcdFx0eSAqPSBlLmNsaWVudFktcmVjdC50b3A7XG5cdFx0fVxuXHRcdGVsc2UgaWYoMCA8IGUudG91Y2hlcy5sZW5ndGgpe1xuXHRcdFx0aWYoMSA8IGUudG91Y2hlcy5sZW5ndGgpIHJldHVybjtcblx0XHRcdHggKj0gZS50b3VjaGVzWzBdLmNsaWVudFgtcmVjdC5sZWZ0O1xuXHRcdFx0eSAqPSBlLnRvdWNoZXNbMF0uY2xpZW50WS1yZWN0LnRvcDtcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFt4LCB5XSA9IGxhc3RYWTtcblx0XHR9XG5cdFx0Ym9hcmQuZmllbGQuZm9yRWFjaCgocm93LCBwWSkgPT5cblx0XHRcdHJvdy5mb3JFYWNoKChwYW5lbCwgcFgpID0+XG5cdFx0XHRcdGZuUGFuZWwocGFuZWwsIHgsIHksIHBYLCBwWSkpKTtcblx0XHRmbkFmdGVyKHgsIHkpO1xuXHRcdGJvYXJkLmRyYXcoKTtcblx0XHRsYXN0WFkgPSBbeCwgeV07XG5cdH07XG5cblx0LyoqIOODieODqeODg+OCsOmWi+Wni1xuXHQgKiBAcGFyYW0ge0V2ZW50fSBlIC0g44Kk44OZ44Oz44OI5byV5pWwXG4gICAgICovXG5cdGNvbnN0IGRyYWdTdGFydCA9IGU9Pntcblx0XHRpc0NsaWNrID0gdHJ1ZTtcblx0XHRmaWVsZFByb2MoZSxcblx0XHRcdChwYW5lbCwgeCwgeSk9Pntcblx0XHRcdFx0Y29uc3Qge3BpZWNlLCBwWCwgcFl9ID0gcGFuZWw7XG5cblx0XHRcdFx0aWYocGllY2UgJiYgcGFuZWwuY2hlY2tSYW5nZU1vdXNlKHgsIHkpKXtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cGllY2UuaXNTZWxlY3RlZCA9IHRydWU7XG5cdFx0XHRcdFx0c2VsZWN0UGFuZWwgPSBwYW5lbDtcblx0XHRcdFx0XHRjaGVja1RhcmdldChib2FyZCwgcGllY2UsIHBYLCBwWSk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cdFx0XHQoeCwgeSk9Pntcblx0XHRcdFx0Zm9yKGNvbnN0IFtkZWcsIHN0b2NrXSBvZiBib2FyZC5zdGFuZC5zdG9ja3Mpe1xuXHRcdFx0XHRcdGZvcihsZXQgaT1zdG9jay5sZW5ndGgtMTswPD1pO2ktLSl7XG5cdFx0XHRcdFx0XHRpZighc3RvY2tbaV0uY2hlY2tSYW5nZU1vdXNlKHgsIHkpKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdHN0b2NrW2ldLmlzU2VsZWN0ZWQgPSB0cnVlO1xuXHRcdFx0XHRcdFx0c2VsZWN0U3RhbmQgPSB7ZGVnOmRlZywgaTppfTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdC8qKiDjg4njg6njg4PjgrDkuK1cblx0ICogQHBhcmFtIHthbnl9IGUgLSDjgqTjg5njg7Pjg4jlvJXmlbBcblx0ICovXG5cdGNvbnN0IGRyYWdNb3ZlID0gZT0+e1xuXHRcdGlmKCFpc0NsaWNrIHx8ICEoc2VsZWN0UGFuZWwgfHwgc2VsZWN0U3RhbmQpKSByZXR1cm47XG5cdFx0ZmllbGRQcm9jKGUsXG5cdFx0XHQocGFuZWwsIHgsIHkpPT57XG5cdFx0XHRcdHBhbmVsLmlzU2VsZWN0ZWQgPSBwYW5lbC5jaGVja1JhbmdlTW91c2UoeCwgeSk7XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXG5cdC8qKiDjg4njg6njg4PjgrDntYLkuoZcblx0ICogQHBhcmFtIHtFdmVudH0gZSAtIOOCpOODmeODs+ODiOW8leaVsFxuXHQgKi9cblx0Y29uc3QgZHJhZ0VuZCA9IGU9Pntcblx0XHRpc0NsaWNrID0gZmFsc2U7XG5cdFx0ZmllbGRQcm9jKGUsXG5cdFx0XHQocGFuZWwsIHgsIHkpPT57XG5cdFx0XHRcdGlmKCFwYW5lbC5jaGVja1JhbmdlTW91c2UoeCwgeSkpIHJldHVybjtcblx0XHRcdFx0aWYoc2VsZWN0UGFuZWwpe1xuXHRcdFx0XHRcdGJvYXJkLm1vdmVQaWVjZShzZWxlY3RQYW5lbCwgcGFuZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmKHNlbGVjdFN0YW5kICYmICFwYW5lbC5waWVjZSl7XG5cdFx0XHRcdFx0Ym9hcmQuc3RhbmQucmVsZWFzZVBpZWNlKHBhbmVsLCBzZWxlY3RTdGFuZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHQpO1xuXHRcdGZpZWxkUHJvYyhlLFxuXHRcdFx0cGFuZWw9Pntcblx0XHRcdFx0aWYocGFuZWwucGllY2UpIHBhbmVsLnBpZWNlLmlzU2VsZWN0ZWQgPSBmYWxzZTtcblx0XHRcdFx0cGFuZWwuaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRwYW5lbC5jbGVhclRhcmdldCgpO1xuXHRcdFx0fSxcblx0XHRcdCgpPT57XG5cdFx0XHRcdGZvcihjb25zdCBbZGVnLCBzdG9ja10gb2YgYm9hcmQuc3RhbmQuc3RvY2tzKXtcblx0XHRcdFx0XHRmb3IobGV0IGk9c3RvY2subGVuZ3RoLTE7MDw9aTtpLS0pe1xuXHRcdFx0XHRcdFx0c3RvY2tbaV0uaXNTZWxlY3RlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxlY3RQYW5lbCA9IG51bGw7XG5cdFx0XHRcdHNlbGVjdFN0YW5kID0gbnVsbDtcblx0XHRcdH1cblx0XHQpO1xuXHR9O1xuXG5cdC8vIOOCpOODmeODs+ODiOODquOCueODiuODvOOCkuS9nOaIkFxuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkcmFnU3RhcnQpO1xuXHRjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkcmFnTW92ZSk7XG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBkcmFnRW5kKTtcblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGRyYWdTdGFydCk7XG5cdGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGRyYWdNb3ZlKTtcblx0Y2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBkcmFnRW5kKTtcblxuXHQvKiog44Kk44OZ44Oz44OI44Oq44K544OK44O844KS56C05qOEICovXG5cdHJldHVybiB7XG5cdFx0cmVtb3ZlRXZlbnQoKXtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRyYWdTdGFydCk7XG5cdFx0XHRjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBkcmFnTW92ZSk7XG5cdFx0XHRjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgZHJhZ0VuZCk7XG5cdFx0XHRjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgZHJhZ1N0YXJ0KTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGRyYWdNb3ZlKTtcblx0XHRcdGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgZHJhZ0VuZCk7XG5cdFx0fVxuXHR9O1xufVxuIiwiaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcblxuLyoqIEJPROW9ouW8j+OBruOBn+OCgeOBrumWouaVsOWumue+qeOBquOBqSAqL1xuZXhwb3J0IGNsYXNzIEJvZHtcblx0LyoqIOinkuW6puOBi+OCiemnkuOBruaWh+Wtl+ihqOekulxuXHQgKiBAdHlwZSB7TWFwPG51bWJlciwgc3RyaW5nPn1cblx0ICovXG5cdHN0YXRpYyAjZGVnMlBpZWNlQ2hhcnMgPSBuZXcgTWFwKFtcblx0XHRbMCwgXCIgXCJdLFxuXHRcdFs5MCwgXCI+XCJdLFxuXHRcdFsxODAsIFwidlwiXSxcblx0XHRbMjcwLCBcIjxcIl1cblx0XSk7XG5cblx0LyoqIOinkuW6puOBi+OCiemnkuOBruato+imj+ihqOePvuihqOekulxuXHQgKiBAdHlwZSB7TWFwPG51bWJlciwgc3RyaW5nPn1cblx0ICovXG5cdHN0YXRpYyAjZGVnMlBpZWNlUmVnZXhlcyA9IG5ldyBNYXAoXG5cdFx0Wy4uLkJvZC4jZGVnMlBpZWNlQ2hhcnNdXG5cdFx0Lm1hcCgoW2EsIGJdKT0+W2EsIG5ldyBSZWdFeHAoYiwgXCJnXCIpXSlcblx0KTtcblxuXHQvKiog6aeS44Gu5paH5a2X44GL44KJ6KeS5bqm6KGo56S6XG5cdCAqIEB0eXBlIHtNYXA8c3RyaW5nLCBudW1iZXI+fVxuXHQgKi9cblx0c3RhdGljICNwaWVjZUNoYXIyRGVncyA9IG5ldyBNYXAoXG5cdFx0Wy4uLkJvZC4jZGVnMlBpZWNlQ2hhcnNdXG5cdFx0Lm1hcCgoW2EsIGJdKT0+W2IsIGFdKVxuXHQpO1xuXG5cdC8qKiDop5LluqbjgYvjgonmjIHpp5Ljga7ooajpoYzooajnpLpcblx0ICogQHR5cGUge01hcDxudW1iZXIsIHN0cmluZz59XG5cdCAqL1xuXHRzdGF0aWMgI2RlZzJTdGFuZFRpdGxlcyA9IG5ldyBNYXAoW1xuXHRcdFswLCBcIuWFiOaJi+OBruaMgemnklwiXSxcblx0XHRbOTAsIFwi5qyh5omL44Gu5oyB6aeSXCJdLFxuXHRcdFsxODAsIFwi5b6M5omL44Gu5oyB6aeSXCJdLFxuXHRcdFsyNzAsIFwi5Zub5omL44Gu5oyB6aeSXCJdXG5cdF0pO1xuXG5cdC8qKiDmjIHpp5Ljga7ooajpoYzjgYvjgonop5LluqbooajnpLpcblx0ICogQHR5cGUge01hcDxzdHJpbmcsIG51bWJlcj59XG5cdCAqL1xuXHRzdGF0aWMgI3N0YW5kVGl0bGUyRGVncyA9IG5ldyBNYXAoXG5cdFx0Wy4uLkJvZC4jZGVnMlN0YW5kVGl0bGVzXVxuXHRcdC5tYXAoKFthLCBiXSk9PltiLCBhXSlcblx0KTtcblxuXHRzdGF0aWMgI2thbkkgPSBbXCJcIixcIuS4gFwiLFwi5LqMXCIsXCLkuIlcIixcIuWbm1wiLFwi5LqUXCIsXCLlha1cIixcIuS4g1wiLFwi5YWrXCIsXCLkuZ1cIl07XG5cdHN0YXRpYyAja2FuWCA9IFtcIlwiLFwi5Y2BXCIsXCLkuozljYFcIixcIuS4ieWNgVwiLFwi5Zub5Y2BXCIsXCLkupTljYFcIixcIuWFreWNgVwiLFwi5LiD5Y2BXCIsXCLlhavljYFcIixcIuS5neWNgVwiXTtcblxuXHQvKiog6KGML+aMgemnkueUqOOBruaVsOWtl+ihqOekuijmvKLmlbDlrZcpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSDmlbDlrZdcblx0ICogQHBhcmFtIHtib29sZWFufSB2aWV3T25lIC0g5LiA44KS6KGo56S6XG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgI251bTJLYW4obnVtLCB2aWV3T25lPXRydWUpe1xuXHRcdGlmKCF2aWV3T25lICYmIG51bTw9MSkgcmV0dXJuIFwiXCI7XG5cdFx0Y29uc3QgaSA9IG51bSUxMDtcblx0XHRjb25zdCB4ID0gMHxudW0vMTA7XG5cdFx0cmV0dXJuIEJvZC4ja2FuWFt4XStCb2QuI2thbklbaV07XG5cdH1cblxuXHQvKiog6KGML+aMgemnkueUqOOBruaVsOWtl+ihqOekuijmvKLmlbDlrZcpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSDmlbDlrZdcblx0ICogQHBhcmFtIHtib29sZWFufSBlbXB0eU9uZSAtIOepuuaWh+Wtl+OCkjHjgajjgZnjgotcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAja2FuMk51bShrYW4sIGVtcHR5T25lPXRydWUpe1xuXHRcdGlmKGVtcHR5T25lICYmIGthbiA9PT0gXCJcIikgcmV0dXJuIDE7XG5cdFx0aWYoIWlzTmFOKGthbikpIHJldHVybiAwfGthbjtcblx0XHRsZXQgeCA9IEJvZC4ja2FuWC5maW5kSW5kZXgoa2V5PT5cblx0XHRcdGtleSAhPT0gXCJcIiAmJiAobmV3IFJlZ0V4cChcIl5cIitrZXkpKS50ZXN0KGthbilcblx0XHQpO1xuXHRcdGlmKHggPCAwKSB4ID0gMDtcblx0XHRsZXQgaSA9IEJvZC4ja2FuSS5maW5kSW5kZXgoa2V5PT5cblx0XHRcdGtleSAhPT0gXCJcIiAmJiAobmV3IFJlZ0V4cChrZXkrXCIkXCIpKS50ZXN0KGthbilcblx0XHQpO1xuXHRcdGlmKGkgPCAwKSBpID0gMDtcblx0XHRyZXR1cm4geCoxMCtpO1xuXHR9XG5cblx0LyoqIOWIl+eUqOOBruaVsOWtl+ihqOekuijlhajop5IvMuahgSlcblx0ICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIOaVsOWtl1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNudW0yWmVuKG51bSl7XG5cdFx0aWYoMTA8PW51bSkgcmV0dXJuIG51bTtcblx0XHRjb25zdCB6ZW4gPSBcIu+8kO+8ke+8ku+8k++8lO+8le+8lu+8l++8mO+8mVwiO1xuXHRcdGNvbnN0IGkgPSBudW0lMTA7XG5cdFx0cmV0dXJuIHplbltpXTtcblx0fVxuXG5cdC8qKiDjg57jgrnnm67jga7ooajnpLpcblx0ICogQHR5cGUge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAjcGFuZWxUZXh0ID0gXCIg44O7XCI7XG5cblx0LyoqIOmnkuOBrkJPROihqOiomFxuXHQgKiBAcGFyYW0ge1BpZWNlfSBwaWVjZSAtIOmnklxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0c3RhdGljICNnZXRQaWVjZVRleHQocGllY2Upe1xuXHRcdGlmKCFwaWVjZSkgcmV0dXJuIEJvZC4jcGFuZWxUZXh0O1xuXHRcdHJldHVybiBCb2QuI2RlZzJQaWVjZUNoYXJzLmdldChwaWVjZS5kZWcpK3BpZWNlLmNoYXI7XG5cdH1cblxuXHQvKiog6aeS5Y+w44GuQk9E6KGo6KiYXG5cdCAqIEBwYXJhbSB7U3RhbmR9IHN0YW5kIC0g6aeS5Y+wXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDop5LluqZcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdHN0YXRpYyAjZ2V0U3RhbmRUZXh0KHN0YW5kLCBkZWc9MCl7XG5cdFx0Ly8g6aeS5pWw44Kr44Km44Oz44OIXG5cdFx0Y29uc3QgY291bnRlciA9IG5ldyBNYXAoKTtcblx0XHRzdGFuZC5zdG9ja3MuZ2V0KGRlZykuZm9yRWFjaCgoe2NoYXJ9KT0+e1xuXHRcdFx0aWYoIWNvdW50ZXIuaGFzKGNoYXIpKSBjb3VudGVyLnNldChjaGFyLCAwKTtcblx0XHRcdGNvdW50ZXIuc2V0KGNoYXIsIGNvdW50ZXIuZ2V0KGNoYXIpKzEpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBCb2QuI2RlZzJTdGFuZFRpdGxlcy5nZXQoZGVnKStcIu+8mlwiK1xuXHRcdFx0Wy4uLmNvdW50ZXJdLm1hcCgoW2NoYXIsIGNudF0pPT5cblx0XHRcdFx0Y2hhcitCb2QuI251bTJLYW4oY250LCBmYWxzZSlcblx0XHRcdCkuam9pbihcIiBcIik7XG5cdH1cblxuXHQvKiogQk9E5b2i5byP44Gu44OG44Kt44K544OI44KS44Oc44O844OJ44Gn5omx44GI44KL44KI44GG5aSJ5o+bXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gQk9E5b2i5byP44Gu44OG44Kt44K544OIXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgY29udlNldFRleHQodGV4dCl7XG5cdFx0Y29uc3QgYm9hcmRMaW5lcyA9IFtdO1xuXHRcdGNvbnN0IHN0YW5kTGluZXMgPSBbXTtcblx0XHR0ZXh0LnNwbGl0KC9cXHJ8XFxufFxcclxcbi8pLmZvckVhY2gobGluZT0+e1xuXHRcdFx0aWYoWy4uLkJvZC4jc3RhbmRUaXRsZTJEZWdzLmtleXMoKV0uc29tZSh0aXRsZT0+XG5cdFx0XHRcdG5ldyBSZWdFeHAoYF4ke3RpdGxlfWApLnRlc3QobGluZSkpXG5cdFx0XHQpIHN0YW5kTGluZXMucHVzaChsaW5lKTtcblx0XHRcdGVsc2UgYm9hcmRMaW5lcy5wdXNoKGxpbmUuc2xpY2UoMSkpXG5cdFx0fSk7XG5cblx0XHRsZXQgYm9hcmRTdHIgPSBib2FyZExpbmVzLnNsaWNlKDIsIC0xKS5qb2luKFwiXFxuXCIpO1xuXHRcdEJvZC4jZGVnMlBpZWNlUmVnZXhlcy5mb3JFYWNoKChib2RDaGFyLCBkZWcpPT57XG5cdFx0XHRib2FyZFN0ciA9IGJvYXJkU3RyLnJlcGxhY2UoYm9kQ2hhciwgUGllY2UuZGVnQ2hhcnNbZGVnXSk7XG5cdFx0fSlcblxuXHRcdGNvbnN0IHN0YW5kU3RyID0gc3RhbmRMaW5lcy5mbGF0TWFwKGxpbmU9Pntcblx0XHRcdGNvbnN0IFt0aXRsZSwgcGFyYW1TdHJdID0gbGluZS5zcGxpdCgv77yaLyk7XG5cdFx0XHRpZihwYXJhbVN0ciA9PT0gXCJcIikgcmV0dXJuIFwiXCI7XG5cdFx0XHRjb25zdCBkZWcgPSBCb2QuI3N0YW5kVGl0bGUyRGVncy5nZXQodGl0bGUpO1xuXHRcdFx0Y29uc3QgZGVnQ2hhciA9IFBpZWNlLmRlZ0NoYXJzW2RlZ107XG5cdFx0XHRjb25zdCBwYXJhbXMgPSBwYXJhbVN0clxuXHRcdFx0XHQuc3BsaXQoL1xccy8pXG5cdFx0XHRcdC5tYXAocGFyYW09Pntcblx0XHRcdFx0XHRjb25zdCBwaWVjZUNoYXIgPSBwYXJhbVswXTtcblx0XHRcdFx0XHRjb25zdCBrYW4gPSBwYXJhbS5zbGljZSgxKTtcblx0XHRcdFx0XHRyZXR1cm4gKGRlZ0NoYXIrcGllY2VDaGFyKS5yZXBlYXQoQm9kLiNrYW4yTnVtKGthbikpO1xuXHRcdFx0XHR9KTtcblx0XHRcdHJldHVybiBwYXJhbXM7XG5cdFx0fSkuam9pbihcIlwiKTtcblxuXHRcdHJldHVybiBgJHtib2FyZFN0cn1cXG4ke3N0YW5kU3RyfWA7XG5cdH1cblxuXHQvKiogQk9E5b2i5byP44OG44Kt44K544OI44KS5Y+W5b6XXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9XG5cdCAqL1xuXHRzdGF0aWMgZ2V0VGV4dChib2FyZCl7XG5cdFx0Y29uc3Qge2ZpZWxkLCB4TGVuLCBwbGF5ZXJzLCBzdGFuZH0gPSBib2FyZDtcblxuXHRcdGxldCBoZWFkZXIgPVxuXHRcdFx0YCAke1suLi5BcnJheSh4TGVuKS5rZXlzKCldLm1hcChpPT5gICR7Qm9kLiNudW0yWmVuKHhMZW4taSl9YCkuam9pbihcIlwiKX1cXG5gK1xuXHRcdFx0YCske0FycmF5KHhMZW4pLmZpbGwoXCItLS1cIikuam9pbihcIlwiKX0rXFxuYDtcblx0XHRsZXQgZm9vdGVyID0gYFxcbiske0FycmF5KHhMZW4pLmZpbGwoXCItLS1cIikuam9pbihcIlwiKX0rYDtcblx0XHRsZXQgcGFuZWxPdXRlciA9IFwifFwiO1xuXHRcdGxldCBwYW5lbFNlcCA9IFwiXCI7XG5cdFx0bGV0IHJvd1NlcCA9IFwiXFxuXCI7XG5cdFx0bGV0IHN0YW5kSGVhZGVyID0gYCR7Qm9kLiNnZXRTdGFuZFRleHQoc3RhbmQsIDE4MCl9XFxuYDtcblx0XHRsZXQgc3RhbmRGb290ZXIgPSBgJHtCb2QuI2dldFN0YW5kVGV4dChzdGFuZCwgMCl9YDtcblx0XHRpZihwbGF5ZXJzICE9PSAyKXtcblx0XHRcdHN0YW5kSGVhZGVyID0gYCR7Qm9kLiNnZXRTdGFuZFRleHQoc3RhbmQsIDI3MCl9XFxuYCtzdGFuZEhlYWRlcjtcblx0XHRcdHN0YW5kRm9vdGVyID0gYCR7Qm9kLiNnZXRTdGFuZFRleHQoc3RhbmQsIDkwKX1cXG5gK3N0YW5kRm9vdGVyO1xuXHRcdH1cblxuXHRcdHJldHVybiAoXG5cdFx0XHRzdGFuZEhlYWRlcitcblx0XHRcdGhlYWRlcitcblx0XHRcdGZpZWxkLm1hcCgocm93LCBpKT0+XG5cdFx0XHRcdHBhbmVsT3V0ZXIrXG5cdFx0XHRcdHJvdy5tYXAocGFuZWw9PlxuXHRcdFx0XHRcdEJvZC4jZ2V0UGllY2VUZXh0KHBhbmVsLnBpZWNlKVxuXHRcdFx0XHQpLmpvaW4ocGFuZWxTZXApK1xuXHRcdFx0XHRwYW5lbE91dGVyK1xuXHRcdFx0XHRCb2QuI251bTJLYW4oaSsxKVxuXHRcdFx0KS5qb2luKHJvd1NlcCkrXG5cdFx0XHRmb290ZXIrXCJcXG5cIitcblx0XHRcdHN0YW5kRm9vdGVyXG5cdFx0KTtcblx0fVxufVxuIiwiaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcbmltcG9ydCB7Qm9kfSBmcm9tIFwiLi9ib2QuanNcIjtcblxuLyoqIOebpOOBrueuoeeQhuOCr+ODqeOCuSAqL1xuZXhwb3J0IGNsYXNzIFN0YW5ke1xuXHQvKiog6aeS5Y+w44G444Gu6KeS5bqm44GU44Go44Gu6KGo56S66aCGXG5cdCAqIEB0eXBlIHtudW1iZXJbXX1cblx0ICovXG5cdHN0YXRpYyAjZGVnT3JkZXIgPSBbMTgwLCA5MCwgMjcwLCAwXTtcblxuXHQvKipcblx0ICogQHBhcmFtIHtCb2FyZH0g44Oc44O844OJXG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihib2FyZCl7XG5cdFx0dGhpcy5ib2FyZCA9IGJvYXJkO1xuXHRcdGNvbnN0IHt0b3AsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQsIHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0LCB4TGVuLCB5TGVufSA9IGJvYXJkO1xuXG5cdFx0dGhpcy5jbGVhcigpO1xuXHRcdHRoaXMubGVmdCA9IHJpZ2h0KjEuMDI7XG5cdFx0dGhpcy50b3AgPSB0b3A7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoLzI7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy5yaWdodCA9IHRoaXMubGVmdCt0aGlzLndpZHRoO1xuXHRcdHRoaXMuYm90dG9tID0gYm90dG9tO1xuXHRcdHRoaXMucGl0Y2hXaWR0aCA9IHBhbmVsV2lkdGgvMjtcblx0XHR0aGlzLnBpdGNoSGVpZ2h0ID0gcGFuZWxIZWlnaHQ7XG5cdFx0dGhpcy54TGVuID0geExlbjtcblx0XHR0aGlzLnlMZW4gPSB5TGVuO1xuXHR9XG5cblx0LyoqIOmnkuWPsOOCkuWIneacn+WMluOBq+OBmeOCiyAqL1xuXHRjbGVhcigpe1xuXHRcdHRoaXMuc3RvY2tzID0gbmV3IE1hcChTdGFuZC4jZGVnT3JkZXIubWFwKGk9PltpLFtdXSkpO1xuXHR9XG5cblx0LyoqIOaMgeOBoemnkuOBi+OCieODnOODvOODieS4iuOBq+mFjee9ruOBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmFsfSB0b1BhbmVsbCAtIOmFjee9ruWFiOOBruODkeODjeODq1xuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uIC0g44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uZGVnIC0g6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uaSAtIOmFjee9ruOBmeOCi+aMgeOBoemnkuOBruOCpOODs+ODh+ODg+OCr+OCuVxuXHQgKi9cblx0cmVsZWFzZVBpZWNlKHRvUGFuZWwsIG9wdGlvbj17fSl7XG5cdFx0Y29uc3Qge2RlZywgaX0gPSBvcHRpb25cblx0XHRjb25zdCB7Ym9hcmR9ID0gdGhpcztcblx0XHRjb25zdCBzdG9jayA9IHRoaXMuc3RvY2tzLmdldChkZWcpO1xuXHRcdHRvUGFuZWwucGllY2UgPSBzdG9ja1tpXTtcblx0XHRzdG9ja1tpXS5jZW50ZXIgPSB0b1BhbmVsLmNlbnRlcjtcblx0XHRzdG9ja1tpXS5taWRkbGUgPSB0b1BhbmVsLm1pZGRsZTtcblx0XHRib2FyZC5hZGRSZWNvcmQodG9QYW5lbCwge2VuZDogXCLmiZNcIn0pO1xuXHRcdHN0b2NrLnNwbGljZShpLDEpO1xuXHR9XG5cblx0LyoqIOmnkuWPsOOBq+i/veWKoOOBmeOCi1xuXHQgKiBAcGFyYW0ge1BpZWNlfSBwaWVjZSAtIOi/veWKoOOBmeOCi+mnklxuXHQgKi9cblx0YWRkKHBpZWNlKXtcblx0XHRjb25zdCBzdG9jayA9IHRoaXMuc3RvY2tzLmdldChwaWVjZS5kZWcpO1xuXHRcdHBpZWNlLnR1cm5Gcm9udCgpO1xuXHRcdHN0b2NrLnB1c2gocGllY2UpO1xuXHRcdHN0b2NrLnNvcnQoKGEsYik9Pk1hdGguc2lnbihhLmlkLWIuaWQpKTtcblx0fVxuXG5cdC8qKiDpp5LjgpLmjIHjgaHpp5LjgavjgZnjgotcblx0ICogQHBhcmFtIHtQaWVjZXxudWxsfSB3aW5uZXJQaWVjZSAtIOenu+WLleOBmeOCi+mnklxuXHQgKiBAcGFyYW0ge1BpZWNlfSBsb3NlclBpZWNlIC0g5o2V57ib44GV44KM44KL6aeSXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2VDYXB0dXJlIC0g5bGe5oCn44KS54Sh6KaW44GX44Gm5o2V57ib44GZ44KLXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yY2VDYW50Q2FwdHVyZSAtIOWxnuaAp+OCkueEoeimluOBl+OBpuaNlee4m+OBl+OBquOBhFxuXHQgKi9cblx0Y2FwdHVyZVBpZWNlKHdpbm5lclBpZWNlLCBsb3NlclBpZWNlLCBmb3JjZUNhcHR1cmU9ZmFsc2UsIGZvcmNlQ2FudENhcHR1cmU9ZmFsc2Upe1xuXHRcdGlmKGZvcmNlQ2FudENhcHR1cmVcblx0XHRcdHx8ICFsb3NlclBpZWNlXG5cdFx0XHR8fCAhKGZvcmNlQ2FwdHVyZSB8fCB3aW5uZXJQaWVjZS5oYXNBdHRyKFwiY2FwdHVyZVwiKSlcblx0XHRcdHx8IGxvc2VyUGllY2UuaGFzQXR0cihcImtpbmdcIilcblx0XHRcdHx8IGxvc2VyUGllY2UuaGFzQXR0cihcImNhbnRDYXB0dXJlXCIpXG5cdFx0KSByZXR1cm47XG5cblx0XHRsb3NlclBpZWNlLmRlZyA9IHdpbm5lclBpZWNlLmRlZztcblx0XHRsb3NlclBpZWNlLmlzTW92ZWQgPSB0cnVlO1xuXHRcdHRoaXMuYWRkKGxvc2VyUGllY2UpO1xuXHR9XG5cblx0LyoqIOebpOOCkuaPj+WGmSAqL1xuXHRkcmF3KCl7XG5cdFx0Y29uc3Qge2JvYXJkLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIHBpdGNoV2lkdGgsIHBpdGNoSGVpZ2h0fSA9IHRoaXM7XG5cdFx0Y29uc3Qge2N0eCwgeExlbiwgeUxlbn0gPSBib2FyZDtcblxuXHRcdC8vIOWkluaeoOOCkuaPj+WGmVxuXHRcdGN0eC5maWxsU3R5bGUgPSBib2FyZC5iYWNrZ3JvdW5kQ29sb3I7XG5cdFx0Y3R4LnN0cm9rZVN0eWxlID0gYm9hcmQuYm9yZGVyQ29sb3I7XG5cdFx0Y3R4LmxpbmVXaWR0aCA9IGJvYXJkLmJvcmRlcldpZHRoO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cblx0XHQvLyDjgZnjgbnjgabjga7pp5LjgpLooajnpLrnr4Tlm7LlpJbjgbjnp7vli5Vcblx0XHQvKnRoaXMuc3RvY2tzLmZsYXQoKS5mb3JFYWNoKHBpZWNlPT57XG5cdFx0XHRwaWVjZS5jZW50ZXIgPSAtMTAwMDtcblx0XHRcdHBpZWNlLm1pZGRsZSA9IC0xMDAwO1xuXHRcdH0pOyovXG5cdFx0Wy4uLnRoaXMuc3RvY2tzLnZhbHVlcygpXS5mb3JFYWNoKChzdG9jaywgcGxheWVyKT0+e1xuXHRcdFx0bGV0IGkgPSAwO1xuXHRcdFx0Ly8g5rqi44KM44Gf5aC05ZCI44Gv5b6M5pa55YSq5YWI44Gn6KGo56S6XG5cdFx0XHRzdG9jayA9IHN0b2NrLnNsaWNlKC15TGVuLzQqeExlbik7XG5cdFx0XHRmb3IobGV0IHBZPTB8eUxlbi80KnBsYXllcjtwWTx5TGVuLzQqKHBsYXllcisxKTtwWSsrKXtcblx0XHRcdFx0Zm9yKGxldCBwWD0wO3BYPHhMZW47cFgrKyl7XG5cdFx0XHRcdFx0Y29uc3QgY2VudGVyID0gbGVmdCtwaXRjaFdpZHRoKihwWCsxKTtcblx0XHRcdFx0XHRjb25zdCBtaWRkbGUgPSB0b3ArcGl0Y2hIZWlnaHQqKHBZKzEpO1xuXHRcdFx0XHRcdGNvbnN0IHBpZWNlID0gc3RvY2tbaSsrXTtcblx0XHRcdFx0XHRpZihwaWVjZSA9PSBudWxsKSBicmVhaztcblx0XHRcdFx0XHRwaWVjZS5jZW50ZXIgPSBjZW50ZXI7XG5cdFx0XHRcdFx0cGllY2UubWlkZGxlID0gbWlkZGxlO1xuXHRcdFx0XHRcdHBpZWNlLmRyYXcoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+W9ouW8j+OBp+WPluW+l1xuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGlzTWluaW1hbSAtIOewoeaYk+ihqOekulxuXHQgKi9cblx0dG9TdHJpbmcoaXNNaW5pbWFtPWZhbHNlKXtcblx0XHRjb25zdCB7eExlbn0gPSB0aGlzLmJvYXJkO1xuXHRcdGNvbnN0IHN0b2NrID0gWy4uLnRoaXMuc3RvY2tzLnZhbHVlcygpXS5mbGF0KCkuZmlsdGVyKHY9PnYpO1xuXG5cdFx0bGV0IGhlYWQgPSAwIDwgc3RvY2subGVuZ3RoPyBcIlxcblwiK1wi4oCVXCIucmVwZWF0KHhMZW4qMikrXCJcXG5cIjogXCJcIjtcblx0XHRsZXQgdGV4dCA9IHN0b2NrLm1hcChvPT5cIlwiK28pLmpvaW4oXCJcIik7XG5cdFx0aWYoIWlzTWluaW1hbSl7XG5cdFx0XHRoZWFkID0gXCJcIjtcblx0XHRcdGZvcihjb25zdCBjaGFyIG9mIE9iamVjdC52YWx1ZXMoUGllY2UuZGVnQ2hhcnMpKXtcblx0XHRcdFx0dGV4dCA9IHRleHQucmVwbGFjZShjaGFyLCBcIlxcblwiK2Ake2NoYXJ95oyB6aeS77yaJHtjaGFyfWApO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaGVhZCt0ZXh0O1xuXHR9XG59XG4iLCJpbXBvcnQge1BhbmVsfSBmcm9tIFwiLi9wYW5lbC5qc1wiO1xuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcblxuY29uc3QgZGVncyA9IE9iamVjdC5rZXlzKFBpZWNlLmRlZ0NoYXJzKTtcbmNvbnN0IGdldEluaXQgPSAoKT0+KHtcblx0cGFuZWw6IG51bGwsXG5cdHBpZWNlOiBudWxsXG59KTtcblxuLyoqIOOCouODs+ODkeODg+OCteODs+aDheWgseOBrueuoeeQhiAqL1xuZXhwb3J0IGNsYXNzIEVuUGFzc2FudHtcblx0Y29uc3RydWN0b3IoKXtcblx0XHR0aGlzLmRlZ3MgPSB7fTtcblx0XHRkZWdzLmZvckVhY2goZGVnPT50aGlzLmRlZ3NbZGVnXSA9IGdldEluaXQoKSk7XG5cdH1cblxuXHQvKiog44Ki44Oz44OR44OD44K144Oz5oOF5aCx44KS44Kv44Oq44KiXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSDjgqLjg7Pjg5Hjg4PjgrXjg7PjgZXjgozjgYbjgovpmaPllrbjga7op5LluqZcblx0ICovXG5cdGNsZWFyKGRlZyl7XG5cdFx0dGhpcy5kZWdzW2RlZ10gPSBnZXRJbml0KCk7XG5cdH1cblxuXHQvKiog44Ki44Oz44OR44OD44K144Oz5a++6LGh44Go5oiQ44KK44GG44KL44Oe44K55oOF5aCx44KS6KiY6YyyXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHBhbmVsIC0g44Ki44Oz44OR44OD44K144Oz5a++6LGh44Go5oiQ44KK44GG44KL44Oe44K555uuXG5cdCAqIEBwYXJhbSB7UGllY2V9IHBpZWNlIC0g44Ki44Oz44OR44OD44K144Oz5a++6LGh44Go5oiQ44KK44GG44KL6aeSXG5cdCAqL1xuXHRzZXRUYXJnZXQocGFuZWwsIHBpZWNlKXtcblx0XHRpZihwYW5lbC5oYXNUYXJnZXQoXCJzdGFydFwiKSAmJiBwaWVjZS5oYXNBdHRyKFwiZW5QYXNzYW50XCIpKVxuXHRcdFx0dGhpcy5kZWdzW3BpZWNlLmRlZ10ucGFuZWwgPSBwYW5lbDtcblx0fVxuXG5cdC8qKiDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovpp5Lmg4XloLHjgpLoqJjpjLJcblx0ICogQHBhcmFtIHtQYW5lbH0gdG9QYW5lbCAtIOOCouODs+ODkeODg+OCteODs+WvvuixoeOBi+eiuuiqjeOBmeOCi+ODnuOCueebrlxuXHQgKi9cblx0c2V0TW92ZWQodG9QYW5lbCl7XG5cdFx0Y29uc3Qge3BpZWNlfSA9IHRvUGFuZWw7XG5cdFx0Y29uc3QgZXAgPSB0aGlzLmRlZ3NbcGllY2UuZGVnXTtcblx0XHRpZihwaWVjZSAmJiB0b1BhbmVsID09PSBlcC5wYW5lbCkgZXAucGllY2UgPSBwaWVjZTtcblx0XHRlbHNlIHRoaXMuY2xlYXIocGllY2UuZGVnKTtcblx0fVxuXG5cdC8qKiDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjga7jg57jgrnjgYvnorroqo3jgZnjgotcblx0ICogQHBhcmFtIHtQYW5lbH0gcGFuZWwgLSDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovjg57jgrnnm65cblx0ICogQHBhcmFtIHtQaWVjZX0gcGllY2UgLSDjgqLjg7Pjg5Hjg4PjgrXjg7Plr77osaHjgajmiJDjgorjgYbjgovpp5Jcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRpc1RhcmdldChwYW5lbCwgcGllY2Upe1xuXHRcdGlmKCFwYW5lbCB8fCAhcGFuZWwucGllY2UpIHJldHVybiB0cnVlO1xuXHRcdGlmKCFwYW5lbC5waWVjZS5oYXNBdHRyKFwiZW5QYXNzYW50XCIpKSByZXR1cm4gZmFsc2U7XG5cdFx0cmV0dXJuIHBhbmVsLnBpZWNlID09PSB0aGlzLmRlZ3NbcGFuZWwucGllY2UuZGVnXS5waWVjZTtcblx0fVxufVxuIiwiLyoqIEB0eXBlZGVmIHtpbXBvcnQoJy4vanNvbicpLkJvYXJkSW5pdE9wdGlvbn0gQm9hcmRJbml0T3B0aW9uICovXG5pbXBvcnQge2NhbnZhc0ZvbnR9IGZyb20gXCIuL2NhbnZhc0ZvbnRMb2FkZXIuanNcIjtcbmltcG9ydCB7Y2FudmFzSW1hZ2V9IGZyb20gXCIuL2NhbnZhc0ltYWdlTG9hZGVyLmpzXCI7XG5pbXBvcnQge2Rvd25sb2FkSW1hZ2V9IGZyb20gXCIuL2Rvd25sb2FkSW1hZ2UuanNcIjtcbmltcG9ydCB7dUlDb250cm9sfSBmcm9tIFwiLi91aUNvbnRyb2wuanNcIjtcbmltcG9ydCB7U3RhbmR9IGZyb20gXCIuL3N0YW5kLmpzXCI7XG5pbXBvcnQge1BhbmVsfSBmcm9tIFwiLi9wYW5lbC5qc1wiO1xuaW1wb3J0IHtQaWVjZX0gZnJvbSBcIi4vcGllY2UuanNcIjtcbmltcG9ydCB7RW5QYXNzYW50fSBmcm9tIFwiLi9lblBhc3NhbnQuanNcIjtcbmltcG9ydCB7Qm9kfSBmcm9tIFwiLi9ib2QuanNcIjtcbmltcG9ydCB7Ym9hcmRzLCBnYW1lc30gZnJvbSBcIi4vanNvbi5qc1wiO1xuXG4vKiog55uk44Gu566h55CG44Kv44Op44K5ICovXG5leHBvcnQgY2xhc3MgQm9hcmR7XG5cdC8qKiDjgrLjg7zjg6DjgpLlrp/ooYzjgZnjgotcblx0ICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH19IGNhbnZhcyAtIENhbnZhc+imgee0oFxuXHQgKiBAcGFyYW0ge0JvYXJkSW5pdE9wdGlvbn0gb3B0aW9uIC0g44Oc44O844OJ44Gu5Yid5pyf5YyW44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb24ucGxheUJvYXJkIC0g44Oc44O844OJ44K/44Kk44OXXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb24ucGxheVBpZWNlcyAtIOmnkuOCu+ODg+ODiFxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uLnBsYXlQaWVjZXMuZ2FtZU5hbWUgLSDjgrLjg7zjg6DlkI0o5Z+65rqW44Go44Gq44KL6aeS44Gu6YWN572u44K744OD44OIKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9uLnBsYXlQaWVjZXMucGllY2VTZXQgLSDpp5Ljga7phY3nva7jg5Hjgr/jg7zjg7Ncblx0ICogQHJldHVybnMgQm9hcmRcblx0ICovXG5cdHN0YXRpYyBydW4oY2FudmFzLCBvcHRpb24pe1xuXHRcdGNvbnN0IHtwbGF5Qm9hcmQsIHBsYXlQaWVjZXMsIG9uRHJhd2VkfSA9IG9wdGlvbjtcblx0XHRjb25zdCBwbGF5ZXJzID0gcGxheVBpZWNlcy5zb21lKCh7Z2FtZU5hbWV9LCBpKT0+MSA8IGkgJiYgZ2FtZU5hbWUpPyA0OiAyO1xuXHRcdC8vIOODnOODvOODieOCkueUn+aIkFxuXHRcdGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKGNhbnZhcywgcGxheUJvYXJkLCB7XG5cdFx0XHQuLi5vcHRpb24sXG5cdFx0XHRwbGF5ZXJzLFxuXHRcdFx0b25EcmF3ZWRcblx0XHR9KTtcblx0XHQvLyDpp5LjgpLphY3nva5cblx0XHRwbGF5UGllY2VzLmZvckVhY2goKHtnYW1lTmFtZSwgcGllY2VTZXR9LCBpKT0+e1xuXHRcdFx0aWYoIWdhbWVOYW1lKSByZXR1cm47XG5cdFx0XHRwaWVjZVNldCA/Pz0gXCJkZWZhdWx0XCI7XG5cdFx0XHR0cnl7XG5cdFx0XHRcdGJvYXJkLnB1dFN0YXJ0UGllY2VzKGksIGdhbWVOYW1lLCBwaWVjZVNldCk7XG5cdFx0XHR9XG5cdFx0XHRjYXRjaHt9XG5cdFx0fSk7XG5cdFx0Ly8g5o+P5YaZ44Kk44OZ44Oz44OI44KS6Kit5a6aXG5cdFx0Ym9hcmQub25EcmF3ZWQgPSBvbkRyYXdlZDtcblx0XHRyZXR1cm4gYm9hcmQ7XG5cdH1cblxuXHQvKipcblx0ICogQHR5cGVkZWYge1wib3ZlcmZsb3dcInxcImhvcml6b250YWxcInxcInZlcnRpY2FsXCJ8XCJwYXJlbnRPdmVyZmxvd1wifFwicGFyZW50SG9yaXpvbnRhbFwifFwicGFyZW50VmVydGljYWxcInxudWxsfSBjYW52YXNGaXRcblx0ICovXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXMgLSBDYW52YXPopoHntKBcblx0ICogQHBhcmFtIHtzdHJpbmd9IHBsYXlCb2FyZCAtIOODnOODvOODieOCv+OCpOODl1xuXHQgKiBAcGFyYW0ge251bWJlcn0gcGxheWVycyAtIOODl+ODrOOCpOODpOODvOS6uuaVsCgyIG9yIDQpXG5cdCAqIEBwYXJhbSB7Qm9hcmRJbml0T3B0aW9ufSBvcHRpb24gLSDjg5zjg7zjg4njga7liJ3mnJ/ljJbjgqrjg5fjgrfjg6fjg7Ncblx0ICovXG5cdGNvbnN0cnVjdG9yKGNhbnZhcywgcGxheUJvYXJkLCBvcHRpb24pe1xuXHRcdGNvbnN0IHtcblx0XHRcdHBsYXllcnM9Mixcblx0XHRcdGNhbnZhc1dpZHRoPXVuZGVmaW5lZCxcblx0XHRcdGNhbnZhc0hlaWdodD11bmRlZmluZWQsXG5cdFx0XHRjYW52YXNGaXQ9XCJvdmVyZmxvd1wiLFxuXHRcdFx0Ym9hcmRMZWZ0PTUsXG5cdFx0XHRib2FyZFRvcD01LFxuXHRcdFx0cGFuZWxXaWR0aD01MCxcblx0XHRcdHBhbmVsSGVpZ2h0PTB8cGFuZWxXaWR0aCoxLjEsXG5cdFx0XHRwaWVjZVNpemU9MHxwYW5lbFdpZHRoKjAuOSxcblx0XHRcdHVzZVJhbmtTaXplID0gdHJ1ZSxcblx0XHRcdGlzRHJhd1NoYWRvdyA9IHRydWUsXG5cdFx0XHRib3JkZXJXaWR0aD1NYXRoLm1pbihwYW5lbFdpZHRoLCBwYW5lbEhlaWdodCkvMzAsXG5cdFx0XHR1c2VTdGFuZD1mYWxzZSxcblx0XHRcdGJhY2tncm91bmRDb2xvcj1cIiMwMDAwMDAwMFwiLFxuXHRcdFx0YXV0b0RyYXdpbmc9dHJ1ZSxcblx0XHRcdG9uRHJhd2VkLFxuXHRcdFx0b25HYW1lT3Zlcj1pPT5hbGVydChg44OX44Os44Kk44Ok44O8JHtpKzF944Gu5pWX5YyX44Gn44GZ44CCYCksXG5cdFx0XHRmcmVlTW9kZT1mYWxzZVxuXHRcdH0gPSBvcHRpb247XG5cdFx0Ly8g5Yid5pyf5YyWXG5cdFx0Y29uc3QgY2FudmFzRm9udEFzeW5jID0gY2FudmFzRm9udC5pbXBvcnRBc3luYygpO1xuXHRcdGNvbnN0IGNhbnZhc0ltYWdlQXN5bmMgPSBjYW52YXNJbWFnZS5pbXBvcnRBc3luYygpO1xuXHRcdHRoaXMuY2FudmFzID0gY2FudmFzO1xuXHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdHRoaXMuY3R4ID0gY3R4O1xuXG5cdFx0dGhpcy5waWVjZXMgPSBQaWVjZS5nZXRQaWVjZXMoY3R4LCB7XG5cdFx0XHRzaXplOiBwaWVjZVNpemUsXG5cdFx0XHR1c2VSYW5rU2l6ZSxcblx0XHRcdGlzRHJhd1NoYWRvd1xuXHRcdH0pO1xuXG5cdFx0Ly8g44Oc44O844OJ5oOF5aCxXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLCBib2FyZHNbcGxheUJvYXJkXSk7XG5cdFx0aWYoIVsyLCA0XS5pbmNsdWRlcyhwbGF5ZXJzKSkgdGhyb3cgRXJyb3IoYHBsYXllcnM9JHtwbGF5ZXJzfSwgcGxheWVycyBuZWVkIDIgb3IgNC5gKTtcblx0XHR0aGlzLnBsYXllcnMgPSBwbGF5ZXJzO1xuXHRcdHRoaXMubGVmdCA9IGJvYXJkTGVmdDtcblx0XHR0aGlzLnRvcCA9IGJvYXJkVG9wO1xuXHRcdHRoaXMucGFuZWxXaWR0aCA9IHBhbmVsV2lkdGg7XG5cdFx0dGhpcy5wYW5lbEhlaWdodCA9IHBhbmVsSGVpZ2h0O1xuXHRcdHRoaXMuYm9yZGVyV2lkdGggPSBib3JkZXJXaWR0aDtcblx0XHR0aGlzLnBpZWNlU2l6ZSA9IHBpZWNlU2l6ZTtcblx0XHR0aGlzLmNhbnZhc0JhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcblxuXHRcdC8vIOODnuOCueebruODh+ODvOOCv+OCkuani+eviVxuXHRcdHRoaXMuZmllbGQgPSB0aGlzLmZpZWxkLm1hcCgocm93LCBwWSk9PlxuXHRcdFx0Wy4uLnJvd10ubWFwKChjaGFyLCBwWCk9Pntcblx0XHRcdFx0Y29uc3QgY2VudGVyID0gYm9hcmRMZWZ0K3BhbmVsV2lkdGgqKHBYKzEpO1xuXHRcdFx0XHRjb25zdCBtaWRkbGUgPSBib2FyZFRvcCtwYW5lbEhlaWdodCoocFkrMSlcblx0XHRcdFx0cmV0dXJuIG5ldyBQYW5lbChjdHgsIGNoYXIsIGNlbnRlciwgbWlkZGxlLCBwYW5lbFdpZHRoLCBwYW5lbEhlaWdodCwgYm9yZGVyV2lkdGgsIHBYLCBwWSk7XG5cdFx0XHR9KVxuXHRcdCk7XG5cdFx0dGhpcy54TGVuID0gdGhpcy5maWVsZFswXS5sZW5ndGg7XG5cdFx0dGhpcy55TGVuID0gdGhpcy5maWVsZC5sZW5ndGg7XG5cdFx0dGhpcy53aWR0aCA9IHRoaXMucGFuZWxXaWR0aCoodGhpcy54TGVuKzEpO1xuXHRcdHRoaXMuaGVpZ2h0ID0gdGhpcy5wYW5lbEhlaWdodCoodGhpcy55TGVuKzEpO1xuXHRcdHRoaXMucmlnaHQgPSBib2FyZExlZnQrdGhpcy53aWR0aDtcblx0XHR0aGlzLmJvdHRvbSA9IGJvYXJkVG9wK3RoaXMuaGVpZ2h0O1xuXHRcdHRoaXMuc3RhbmQgPSBuZXcgU3RhbmQodGhpcyk7XG5cdFx0Y2FudmFzLndpZHRoID0gY2FudmFzV2lkdGggPz8gKHVzZVN0YW5kPyB0aGlzLnN0YW5kLnJpZ2h0OiB0aGlzLnJpZ2h0KSs1O1xuXHRcdGNhbnZhcy5oZWlnaHQgPSBjYW52YXNIZWlnaHQgPz8gdGhpcy5ib3R0b20rNTtcblx0XHQvLyDjgq3jg6Pjg7Pjg5DjgrnjgrXjgqTjgrroqr/mlbRcblx0XHRjb25zdCB7c3R5bGV9ID0gY2FudmFzO1xuXHRcdGlmKGNhbnZhc0ZpdCA9PT0gXCJvdmVyZmxvd1wiKXtcblx0XHRcdGlmKHN0eWxlLm1heFdpZHRoID09PSBcIlwiKSBzdHlsZS5tYXhXaWR0aCA9IFwiOTd2d1wiO1xuXHRcdFx0aWYoc3R5bGUubWF4SGVpZ2h0ID09PSBcIlwiKSBzdHlsZS5tYXhIZWlnaHQgPSBcIjk3dmhcIjtcblx0XHR9XG5cdFx0ZWxzZSBpZihjYW52YXNGaXQgPT09IFwiaG9yaXpvbnRhbFwiKXtcblx0XHRcdGlmKHN0eWxlLndpZHRoID09PSBcIlwiKSBzdHlsZS53aWR0aCA9IFwiOTd2d1wiO1xuXHRcdH1cblx0XHRlbHNlIGlmKGNhbnZhc0ZpdCA9PT0gXCJ2ZXJ0aWNhbFwiKXtcblx0XHRcdGlmKHN0eWxlLmhlaWdodCA9PT0gXCJcIikgc3R5bGUuaGVpZ2h0ID0gXCI5N3ZoXCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY2FudmFzRml0ID09PSBcInBhcmVudE92ZXJmbG93XCIpe1xuXHRcdFx0aWYoc3R5bGUubWF4V2lkdGggPT09IFwiXCIpIHN0eWxlLm1heFdpZHRoID0gXCIxMDAlXCI7XG5cdFx0XHRpZihzdHlsZS5tYXhIZWlnaHQgPT09IFwiXCIpIHN0eWxlLm1heEhlaWdodCA9IFwiMTAwJVwiO1xuXHRcdH1cblx0XHRlbHNlIGlmKGNhbnZhc0ZpdCA9PT0gXCJwYXJlbnRIb3Jpem9udGFsXCIpe1xuXHRcdFx0aWYoc3R5bGUud2lkdGggPT09IFwiXCIpIHN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY2FudmFzRml0ID09PSBcInBhcmVudFZlcnRpY2FsXCIpe1xuXHRcdFx0aWYoc3R5bGUuaGVpZ2h0ID09PSBcIlwiKSBzdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcblx0XHR9XG5cblx0XHQvLyDmj4/lhpnmm7TmlrDoqK3lrppcblx0XHR0aGlzLmF1dG9EcmF3aW5nID0gYXV0b0RyYXdpbmc7XG5cdFx0aWYoYXV0b0RyYXdpbmcpe1xuXHRcdFx0Y2FudmFzRm9udEFzeW5jLnRoZW4oKCk9PnRoaXMuZHJhdygpKTtcblx0XHRcdGNhbnZhc0ltYWdlQXN5bmMudGhlbigoKT0+dGhpcy5kcmF3KCkpO1xuXHRcdFx0dGhpcy5kcmF3KCk7XG5cdFx0fVxuXHRcdHRoaXMub25EcmF3ZWQgPSBvbkRyYXdlZDtcblx0XHR0aGlzLm9uR2FtZU92ZXIgPSBvbkdhbWVPdmVyO1xuXHRcdC8qKiAgKi9cblx0XHR0aGlzLmdhbWVBbGl2ZXMgPSBuZXcgTWFwKFxuXHRcdFx0Wy4uLkFycmF5KHRoaXMucGxheWVycykua2V5cygpXVxuXHRcdFx0Lm1hcChpPT5bdGhpcy4jZGVnTm9ybWFsKGkpLCB0cnVlXSlcblx0XHQpO1xuXHRcdHRoaXMuZnJlZU1vZGUgPSBmcmVlTW9kZTtcblxuXHRcdHRoaXMucmVjb3JkID0gW107XG5cdFx0dGhpcy51aUNvbnRyb2wgPSB1SUNvbnRyb2wodGhpcyk7XG5cdFx0dGhpcy5lblBhc3NhbnQgPSBuZXcgRW5QYXNzYW50KCk7XG5cdH1cblxuXHQvKiog44Oc44O844OJ44KS6ZaJ44GY44KLICovXG5cdGNsb3NlKCl7XG5cdFx0dGhpcy51aUNvbnRyb2wucmVtb3ZlRXZlbnQoKTtcblx0fVxuXG5cdC8qKiDop5LluqbjgpLmraPopo/ljJZcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBsYXllYUlkT3JEZWcgLSDjg5fjg6zjgqTjg6Tjg7znlarlj7fjgb7jgZ/jga/op5LluqZcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdCNkZWdOb3JtYWwocGxheWVhSWRPckRlZyl7XG5cdFx0bGV0IGRlZyA9IHBsYXllYUlkT3JEZWc7XG5cdFx0aWYoMCA8IGRlZyAmJiBkZWcgPCA0KSBkZWcgPSAwfGRlZyozNjAvdGhpcy5wbGF5ZXJzO1xuXHRcdGRve2RlZyA9IChkZWcrMzYwKSUzNjB9IHdoaWxlKGRlZzwwKTtcblx0XHRyZXR1cm4gZGVnO1xuXHR9XG5cblx0LyoqIOmnkumFjee9ruOCkuWbnui7olxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0g5Zue6Lui6KeSICg5MOOBruWAjeaVsClcblx0ICovXG5cdHJvdGF0ZUZpZWxkKGRlZyl7XG5cdFx0Y29uc3Qge3hMZW4sIHlMZW59ID0gdGhpcztcblxuXHRcdGRlZyA9IHRoaXMuI2RlZ05vcm1hbChkZWcpO1xuXHRcdGlmKGRlZyA9PT0gMCkgcmV0dXJuO1xuXHRcdGlmKCFbOTAsIDE4MCwgMjcwXS5pbmNsdWRlcyhkZWcpKSB0aHJvdyBFcnJvcihgZGVnPSR7ZGVnfSwgZGVnIG5lZWQgbXVsdGlwbGUgb2YgOTAuYCk7XG5cdFx0aWYoWzkwLCAyNzBdLmluY2x1ZGVzKGRlZykpe1xuXHRcdFx0Ly8gMuasoemFjeWIl+OCkui7oue9rlxuXHRcdFx0Y29uc3QgdHJhbnNwb3NlID0gYSA9PiBhWzBdLm1hcCgoXywgYykgPT4gYS5tYXAociA9PiByW2NdKSk7XG5cdFx0XHRpZih4TGVuICE9PSB5TGVuKSB0aHJvdyBFcnJvcihgY29scz0ke3hMZW59ICE9IHJvd3M9JHt5TGVufSwgTm90IHJvd3MgPSBjb2xzLmApO1xuXHRcdFx0dGhpcy5maWVsZCA9IHRyYW5zcG9zZSh0aGlzLmZpZWxkKTtcblx0XHR9XG5cdFx0aWYoWzE4MCwgMjcwXS5pbmNsdWRlcyhkZWcpKXtcblx0XHRcdHRoaXMuZmllbGQucmV2ZXJzZSgpO1xuXHRcdH1cblx0XHR0aGlzLmZpZWxkLmZvckVhY2gocm93PT57XG5cdFx0XHRyb3cuZm9yRWFjaChwYW5lbD0+e1xuXHRcdFx0XHRpZighcGFuZWwucGllY2UpIHJldHVybjtcblx0XHRcdFx0cGFuZWwucGllY2UuZGVnICs9IGRlZztcblx0XHRcdH0pO1xuXHRcdFx0aWYoWzkwLCAxODBdLmluY2x1ZGVzKGRlZykpIHJvdy5yZXZlcnNlKCk7XG5cdFx0fSk7XG5cdH1cblxuXHQvKiog6aeS44Gu5Yid5pyf6YWN572uXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwbGF5ZXJJZCAtIOODl+ODrOOCpOODpOODvOeVquWPt1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gZ2FtZU5hbWUgLSDjgrLjg7zjg6DlkI0o5Z+65rqW44Go44Gq44KL6aeS44Gu6YWN572u44K744OD44OIKVxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGllY2VTZXQgLSDpp5Ljga7phY3nva7jg5Hjgr/jg7zjg7Ncblx0ICovXG5cdHB1dFN0YXJ0UGllY2VzKHBsYXllcklkLCBnYW1lTmFtZSwgcGllY2VTZXQ9XCJkZWZhdWx0XCIpe1xuXHRcdGNvbnN0IHtwaWVjZXN9ID0gdGhpcztcblxuXHRcdGNvbnN0IGRlZyA9IHRoaXMuI2RlZ05vcm1hbChwbGF5ZXJJZCk7XG5cdFx0dGhpcy5yb3RhdGVGaWVsZChkZWcpO1xuXHRcdGNvbnN0IHBvcyA9IGdhbWVzW2dhbWVOYW1lXS5wb3NpdGlvblt0aGlzLnhMZW5dW3BpZWNlU2V0XTtcblx0XHRpZighcG9zKSB0aHJvdyBFcnJvcihgZ2FtZXNbXCIke2dhbWVOYW1lfVwiXS5wb3NpdGlvbltcIiR7dGhpcy54TGVufVwiXVtcIiR7cGllY2VTZXR9XCJdaXMgbnVsbC5gKTtcblx0XHRwb3MuZm9yRWFjaCgocm93LCBpKT0+e1xuXHRcdFx0aWYocm93Lmxlbmd0aCA8IHRoaXMueExlbikgdGhyb3cgRXJyb3Iocm93LmpvaW4oXCJcIikpO1xuXHRcdFx0Y29uc3QgcFkgPSBpK3RoaXMueUxlbiAtIHBvcy5sZW5ndGg7XG5cdFx0XHRbLi4ucm93XS5mb3JFYWNoKChjaGFyLCBwWCk9Pntcblx0XHRcdFx0aWYoIXBpZWNlc1tjaGFyXSkgcmV0dXJuO1xuXHRcdFx0XHRjb25zdCBwaWVjZSA9IHBpZWNlc1tjaGFyXS5jbG9uZSgpO1xuXHRcdFx0XHRjb25zdCBwYW5lbCA9IHRoaXMuZmllbGRbcFldW3BYXTtcblx0XHRcdFx0cGllY2UuY2VudGVyID0gcGFuZWwuY2VudGVyO1xuXHRcdFx0XHRwaWVjZS5taWRkbGUgPSBwYW5lbC5taWRkbGU7XG5cdFx0XHRcdHBhbmVsLnBpZWNlID0gcGllY2U7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHR0aGlzLnJvdGF0ZUZpZWxkKC1kZWcpO1xuXHRcdGlmKHRoaXMuYXV0b0RyYXdpbmcpIHRoaXMuZHJhdygpO1xuXHR9XG5cblx0LyoqIOmnkuOBrumFjee9rlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gcGllY2UgLSDpp5Ljga7ooajnj77mloflrZdcblx0ICogQHBhcmFtIHtudW1iZXJ9IHBYIC0gWOaWueWQkemFjee9ruS9jee9rijjg57jgrnnm67ln7rmupYpXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBwWSAtIFnmlrnlkJHphY3nva7kvY3nva4o44Oe44K555uu5Z+65rqWKVxuXHQgKiBAcGFyYW0ge251bWJlcn0gcGxheWVhSWRPckRlZyAtIOODl+ODrOOCpOODpOODvOeVquWPt+OBvuOBn+OBr+mnkuOBrumFjee9ruinklxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uIC0g44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb24uZGlzcGxheVB0biAtIOihqOekuuaWh+Wtl+WIl+OCkuWkieabtCgx44CcKVxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbi5pc01vdmVkIC0g5Yid5Zue56e75YuV5riI44G/44GL5ZCm44GLXG5cdCAqL1xuXHRwdXROZXdQaWVjZShwaWVjZSwgcFgsIHBZLCBwbGF5ZWFJZE9yRGVnLCBvcHRpb249e30pe1xuXHRcdGNvbnN0IHtkaXNwbGF5UHRuPTAsIGlzTW92ZWQ9ZmFsc2V9ID0gb3B0aW9uO1xuXHRcdGNvbnN0IHtwaWVjZXN9ID0gdGhpcztcblxuXHRcdGNvbnN0IGRlZyA9IHRoaXMuI2RlZ05vcm1hbChwbGF5ZWFJZE9yRGVnKTtcblx0XHRpZih0eXBlb2YgcGllY2UgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0cGllY2UgPSBuZXcgUGllY2UodGhpcy5jdHgsIHBpZWNlc1twaWVjZV0sIHtkaXNwbGF5UHRuLCBkZWcsIGlzTW92ZWR9KTtcblx0XHR9XG5cdFx0Y29uc3QgcGFuZWwgPSB0aGlzLmZpZWxkW3BZXVtwWF07XG5cdFx0cGllY2UuY2VudGVyID0gcGFuZWwuY2VudGVyO1xuXHRcdHBpZWNlLm1pZGRsZSA9IHBhbmVsLm1pZGRsZTtcblx0XHRwYW5lbC5waWVjZSA9IHBpZWNlO1xuXHRcdGlmKHRoaXMuYXV0b0RyYXdpbmcpIHRoaXMuZHJhdygpO1xuXHR9XG5cblx0LyoqIOaWh+Wtl+WIl+OBi+OCiemnkuOCkumFjee9rlxuXHQgKiB7c3RyaW5nfSB0ZXh0IC0g6aeS6YWN572u44KS6KGo44GZ5paH5a2X5YiXXG5cdCAqL1xuXHRzZXRUZXh0UGllY2VzKHRleHQpe1xuXHRcdGNvbnN0IHtmaWVsZCwgcGllY2VzLCB4TGVuLCB5TGVufSA9IHRoaXM7XG5cblx0XHRjb25zdCBzdGFuZFRpdGxlID0gXCLmjIHpp5LvvJpcIjtcblx0XHQvLyBCT0TlvaLlvI9cblx0XHRpZigwPHRleHQuaW5kZXhPZihzdGFuZFRpdGxlKSkgdGV4dCA9IEJvZC5jb252U2V0VGV4dCh0ZXh0KTtcblxuXHRcdC8vIOaOkumZpOOBmeOCi+iomOWPt1xuXHRcdGNvbnN0IG5vaXNlcyA9IFwi4pSP4pSB4pSv4pST4pSX4pS34pSb4pSD4pSC4pSg4pSA4pS84pSo4oCVXCI7XG5cblx0XHQvLyDphY3liJflpInmj5tcblx0XHRjb25zdCB0ZXh0cyA9IFt0ZXh0XS5jb25jYXQoXG5cdFx0XHRcdFsuLi5ub2lzZXNdLFxuXHRcdFx0XHRPYmplY3QudmFsdWVzKFBpZWNlLmRlZ0NoYXJzKS5tYXAoYz0+XCJcXG5cIitjK3N0YW5kVGl0bGUpXG5cdFx0XHQpLnJlZHVjZShcblx0XHRcdFx0KHRleHQsY2hhcik9PlxuXHRcdFx0XHRcdHRleHQucmVwbGFjZShuZXcgUmVnRXhwKGNoYXIsXCJnXCIpLCBcIlwiKVxuXHRcdFx0KS5yZXBsYWNlKC9cXG5cXG4vZywgXCJcXG5cIilcblx0XHRcdC5yZXBsYWNlKC/jgIAvZywgXCLjg7tcIilcblx0XHRcdC50cmltKClcblx0XHRcdC5zcGxpdCgvXFxuLylcblx0XHRcdC5tYXAoXG5cdFx0XHRcdHJvdz0+cm93Lm1hdGNoKC8uezJ9L2cpKTtcblxuXHRcdC8vIOODnOODvOODieOBq+mnkuOCkumFjee9rlxuXHRcdGZvcihsZXQgcFk9MDtwWTx5TGVuO3BZKyspe1xuXHRcdFx0Zm9yKGxldCBwWD0wO3BYPHhMZW47cFgrKyl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRjb25zdCB0ZXh0ID0gdGV4dHNbcFldW3BYXTtcblx0XHRcdFx0XHRjb25zdCBwaWVjZSA9IFBpZWNlLnN0cmluZ1RvUGllY2UocGllY2VzLCB0ZXh0KTtcblx0XHRcdFx0XHRwaWVjZS5jZW50ZXIgPSBmaWVsZFtwWV1bcFhdLmNlbnRlcjtcblx0XHRcdFx0XHRwaWVjZS5taWRkbGUgPSBmaWVsZFtwWV1bcFhdLm1pZGRsZTtcblx0XHRcdFx0XHRmaWVsZFtwWV1bcFhdLnBpZWNlID0gcGllY2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2F0Y2goZXgpe1xuXHRcdFx0XHRcdGZpZWxkW3BZXVtwWF0ucGllY2UgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8g5oyB44Gh6aeS44KS6YWN572uXG5cdFx0dGhpcy5zdGFuZC5jbGVhcigpO1xuXHRcdGNvbnN0IHN0YW5kVGV4dHMgPSB0ZXh0c1t5TGVuXTtcblx0XHRpZihzdGFuZFRleHRzKXtcblx0XHRcdHN0YW5kVGV4dHMuZm9yRWFjaCh0ZXh0PT57XG5cdFx0XHRcdGNvbnN0IHBpZWNlID0gUGllY2Uuc3RyaW5nVG9QaWVjZShwaWVjZXMsIHRleHQpO1xuXHRcdFx0XHRpZighcGllY2UpIHJldHVybjtcblx0XHRcdFx0dGhpcy5zdGFuZC5hZGQocGllY2UpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGlmKHRoaXMuYXV0b0RyYXdpbmcpIHRoaXMuZHJhdygpO1xuXHR9XG5cblx0LyoqIOinkuW6puWfuua6luOBruODnuOCueebruOBruihjOOCkuWPluW+l+OBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0g6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXREZWcgLSDoo5zmraPop5LluqZcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldFJvdyhwWCwgcFksIGRlZywgb2Zmc2V0RGVnPTApe1xuXHRcdGNvbnN0IHt4TGVuLCB5TGVufSA9IHRoaXM7XG5cblx0XHRkZWcgPSB0aGlzLiNkZWdOb3JtYWwoZGVnK29mZnNldERlZyk7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRlZyA9PT0gMD8geUxlbi0xLXBZOlxuXHRcdFx0ZGVnID09PSA5MD8gcFg6XG5cdFx0XHRkZWcgPT09IDE4MD8gcFk6XG5cdFx0XHRkZWcgPT09IDI3MD8geExlbi0xLXBYOlxuXHRcdFx0LTFcblx0XHQpO1xuXHR9XG5cblx0LyoqIOinkuW6puWfuua6luOBruODnuOCueebruOBruWIl+OCkuWPluW+l+OBmeOCi1xuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0g6KeS5bqmXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXREZWcgLSDoo5zmraPop5LluqZcblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdGdldENvbChwWCwgcFksIGRlZywgb2Zmc2V0RGVnPTApe1xuXHRcdGNvbnN0IHt4TGVuLCB5TGVufSA9IHRoaXM7XG5cblx0XHRkZWcgPSB0aGlzLiNkZWdOb3JtYWwoZGVnK29mZnNldERlZyk7XG5cdFx0cmV0dXJuIChcblx0XHRcdGRlZyA9PT0gMD8gcFg6XG5cdFx0XHRkZWcgPT09IDkwPyB5TGVuLTEtcFk6XG5cdFx0XHRkZWcgPT09IDE4MD8geExlbi0xLXBYOlxuXHRcdFx0ZGVnID09PSAyNzA/IHBZOlxuXHRcdFx0LTFcblx0XHQpO1xuXHR9XG5cblx0LyoqIOODl+ODreODouODvOOCt+ODp+ODs+OCqOODquOCouWGheOBp+OBguOCi+OBi+WIpOWIpVxuXHQgKiBAcGFyYW0ge1BhbmVsfSBwYW5lbCAtIOODnuOCueebrlxuXHQgKi9cblx0Y2hlY2tDYW5Qcm9tbyhwYW5lbCl7XG5cdFx0Y29uc3Qge3lMZW59ID0gdGhpcztcblx0XHRjb25zdCB7cGllY2UsIHBYLCBwWX0gPSBwYW5lbDtcblx0XHRjb25zdCB7ZGVnfSA9IHBpZWNlO1xuXG5cdFx0Y29uc3QgW3Byb21vTGluZSwgZm9yY2VQcm9tb0xpbmVdID0gW1xuXHRcdFx0cGllY2UuZ2FtZS5wcm9tb0xpbmUsXG5cdFx0XHRwaWVjZS5mb3JjZVByb21vTGluZVxuXHRcdF0ubWFwKGxpbmU9PnlMZW4tbGluZS0oMHx0aGlzLnByb21vTGluZU9mZnNldCkpO1xuXG5cdFx0bGV0IHJvdztcblx0XHRpZighdGhpcy5zaWRlUHJvbW8pe1xuXHRcdFx0cm93ID0gdGhpcy5nZXRSb3cocFgsIHBZLCBkZWcpO1xuXHRcdH1cblx0XHRlbHNle1xuXHRcdFx0cm93ID0gTWF0aC5tYXgoXG5cdFx0XHRcdC4uLk9iamVjdC5rZXlzKFBpZWNlLmRlZ0NoYXJzKVxuXHRcdFx0XHQubWFwKGQ9PjB8ZClcblx0XHRcdFx0LmZpbHRlcihkPT5kIT09ZGVnKVxuXHRcdFx0XHQubWFwKFxuXHRcdFx0XHRcdGQ9PnRoaXMuZ2V0Um93KHBYLCBwWSwgZCwgMTgwKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4ge1xuXHRcdFx0Y2FuUHJvbW86IHByb21vTGluZSA8PSByb3csXG5cdFx0XHRmb3JjZVByb21vOiBmb3JjZVByb21vTGluZSA8PSByb3dcblx0XHR9O1xuXHR9XG5cblx0LyoqIOaVl+WMl+OBl+OBn+ODl+ODrOOCpOODpOODvOOBjOWtmOWcqOOBmeOCi+OBi+eiuuiqjeOBl+OAgeOCpOODmeODs+ODiOOCkueZuueUn+OBleOBm+OCiyAqL1xuXHQjZW1pdEdhbWVPdmVyKCl7XG5cdFx0Wy4uLnRoaXMuZ2FtZUFsaXZlc10uZm9yRWFjaCgoW2RlZywgZ2FtZUFsaXZlXSwgaSk9Pntcblx0XHRcdGlmKCFnYW1lQWxpdmUpIHJldHVybjtcblx0XHRcdGlmKHRoaXMuZmllbGQuc29tZShyb3c9PlxuXHRcdFx0XHRyb3cuc29tZSgoe3BpZWNlfSk9PlxuXHRcdFx0XHRcdHBpZWNlXG5cdFx0XHRcdFx0JiYgcGllY2UuZGVnID09PSBkZWdcblx0XHRcdFx0XHQmJiBwaWVjZS5oYXNBdHRyKFwia2luZ1wiKVxuXHRcdFx0XHQpXG5cdFx0XHQpKSByZXR1cm47XG5cdFx0XHR0aGlzLmdhbWVBbGl2ZXMuc2V0KGRlZywgZmFsc2UpO1xuXHRcdFx0dGhpcy5vbkdhbWVPdmVyKGkpO1xuXHRcdH0pXG5cdH1cblxuXHQvKiog44OX44Ot44Oi44O844K344On44Oz5Yem55CGXG5cdCAqIEBwYXJhbSB7UGFuZWx9IGZyb21QYW5lbCAtIOenu+WLleWFg+OBruODnuOCueebrlxuXHQgKiBAcGFyYW0ge1BhbmVsfSB0b1BhbmVsIC0g6YG45oqe5Lit44Gu44Oe44K555uuXG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gY2FuUHJvbW8gLSDmiJDjgovjgZPjgajjgYzjgafjgY3jgotcblx0ICogQHBhcmFtIHtib29sZWFufSBmb3JjZVByb21vIC0g5oiQ44KK44KS5by35Yi244GZ44KLXG5cdCAqL1xuXHQjcHJvbW9EaWFsb2coZnJvbVBhbmVsLCB0b1BhbmVsLCBjYW5Qcm9tbywgZm9yY2VQcm9tbyl7XG5cdFx0Y29uc3Qge2ZyZWVNb2RlfSA9IHRoaXM7XG5cdFx0Y29uc3Qge3BpZWNlfSA9IHRvUGFuZWw7XG5cblx0XHQvLyDjg5fjg63jg6Ljg7zjgrfjg6fjg7Plh6bnkIZcblx0XHRpZighcGllY2UucHJvbW8gfHwgcGllY2UuaGFzQXR0cihcInByb21vdGVkXCIpIHx8ICFjYW5Qcm9tbyl7XG5cdFx0XHR0aGlzLmFkZFJlY29yZCh0b1BhbmVsLCB7ZnJvbVBhbmVsfSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRve1xuXHRcdFx0Zm9yKGNvbnN0IFtjaGFyLCB7bmFtZX1dIG9mIE9iamVjdC5lbnRyaWVzKHBpZWNlLnByb21vKSl7XG5cdFx0XHRcdGlmKGNvbmZpcm0oYOaIkOOCiuOBvuOBmeOBiz9cblx0JHtwaWVjZS5jaGFyfToke3BpZWNlLm5hbWV9XG5cdOOAgOKGk1xuXHQke2NoYXJ9OiR7bmFtZX1gKSl7XG5cdFx0XHRcdFx0dGhpcy5hZGRSZWNvcmQodG9QYW5lbCwge2Zyb21QYW5lbCwgZW5kOlwi5oiQXCJ9KTtcblx0XHRcdFx0XHRwaWVjZS5wcm9tb3Rpb24oY2hhcik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSB3aGlsZSghZnJlZU1vZGUgJiYgZm9yY2VQcm9tbyk7XG5cdFx0dGhpcy5hZGRSZWNvcmQodG9QYW5lbCwge2Zyb21QYW5lbCwgZW5kOlwi5LiN5oiQXCJ9KTtcblx0fVxuXG5cdC8qKiDpp5LjgpLnp7vli5Vcblx0ICogQHBhcmFtIHtQYW5lbH0gZnJvbVBhbmVsIC0g56e75YuV5YWD44Gu44Oe44K555uuXG5cdCAqIEBwYXJhbSB7UGFuZWx9IHRvUGFuZWwgLSDpgbjmip7kuK3jga7jg57jgrnnm65cblx0ICovXG5cdG1vdmVQaWVjZShmcm9tUGFuZWwsIHRvUGFuZWwpe1xuXHRcdGNvbnN0IHtzdGFuZCwgZnJlZU1vZGUsIGVuUGFzc2FudH0gPSB0aGlzO1xuXG5cdFx0aWYoIWZyb21QYW5lbFxuXHRcdFx0fHwgdG9QYW5lbC5oYXNBdHRyKFwia2VlcE91dFwiKVxuXHRcdFx0fHwgdG9QYW5lbC5waWVjZSA9PT0gZnJvbVBhbmVsLnBpZWNlXG5cdFx0XHR8fCB0b1BhbmVsLnBpZWNlPy5kZWcgPT09IGZyb21QYW5lbC5waWVjZS5kZWdcblx0XHRcdHx8ICF0aGlzLmZyZWVNb2RlICYmICF0b1BhbmVsLmlzVGFyZ2V0XG5cdFx0KSByZXR1cm47XG5cblx0XHRsZXQge2NhblByb21vLCBmb3JjZVByb21vfSA9IHRoaXMuY2hlY2tDYW5Qcm9tbyhmcm9tUGFuZWwpO1xuXG5cdFx0c3RhbmQuY2FwdHVyZVBpZWNlKFxuXHRcdFx0ZnJvbVBhbmVsLnBpZWNlLFxuXHRcdFx0dG9QYW5lbC5waWVjZSxcblx0XHRcdHRvUGFuZWwuaGFzQXR0cihcImNhcHR1cmVcIiksXG5cdFx0XHR0b1BhbmVsLmhhc0F0dHIoXCJjYW50Q2FwdHVyZVwiKVxuXHRcdCk7XG5cblx0XHR0b1BhbmVsLnBpZWNlID0gZnJvbVBhbmVsLnBpZWNlO1xuXHRcdGZyb21QYW5lbC5waWVjZSA9IG51bGw7XG5cblx0XHRjb25zdCB7cGllY2V9ID0gdG9QYW5lbDtcblx0XHRwaWVjZS5jZW50ZXIgPSB0b1BhbmVsLmNlbnRlcjtcblx0XHRwaWVjZS5taWRkbGUgPSB0b1BhbmVsLm1pZGRsZTtcblx0XHRwaWVjZS5pc01vdmVkID0gdHJ1ZTtcblxuXHRcdGNvbnN0IGFmdGVyUHJvbW8gPSB0aGlzLmNoZWNrQ2FuUHJvbW8odG9QYW5lbCk7XG5cdFx0Y2FuUHJvbW8gfHw9IGFmdGVyUHJvbW8uY2FuUHJvbW87XG5cdFx0Zm9yY2VQcm9tbyB8fD0gYWZ0ZXJQcm9tby5mb3JjZVByb21vO1xuXG5cdFx0Ly8g44Ki44Oz44OR44OD44K144OzXG5cdFx0ZW5QYXNzYW50LnNldE1vdmVkKHRvUGFuZWwpO1xuXG5cdFx0Ly8g44OX44Ot44Oi44O844K344On44Oz5Yem55CGXG5cdFx0dGhpcy4jcHJvbW9EaWFsb2coZnJvbVBhbmVsLCB0b1BhbmVsLCBjYW5Qcm9tbywgZm9yY2VQcm9tbyk7XG5cblx0XHQvLyDjg5fjg6zjgqTjg6Tjg7zjga7jgrLjg7zjg6Djgqrjg7zjg5Djg7zliKTlrppcblx0XHR0aGlzLiNlbWl0R2FtZU92ZXIoKTtcblx0fVxuXG5cdC8qKiDmo4vorZzjgpLov73oqJhcblx0ICogQHBhcmFtIHtQYW5lbH0gdG9QYW5lbCAtIOenu+WLleWFiOOBruODnuOCueebrlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uIC0g44Kq44OX44K344On44OzXG5cdCAqIEBwYXJhbSB7UGFuZWx9IG9wdGlvbi5mcm9tUGFuZWwgLSDnp7vli5XlhYPjga7jg57jgrnnm65cblx0ICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbi5lbmQgLSDjgqrjg5fjgrfjg6fjg7M95oiQfOS4jeaIkHzmiZNcblx0ICovXG5cdGFkZFJlY29yZCh0b1BhbmVsLCBvcHRpb249e30pe1xuXHRcdGNvbnN0IHtmcm9tUGFuZWwsIGVuZD1cIlwifSA9IG9wdGlvbjtcblx0XHRjb25zdCB7cGllY2V9ID0gdG9QYW5lbDtcblxuXHRcdHRoaXMucmVjb3JkLnB1c2goe1xuXHRcdFx0dG86IHtcblx0XHRcdFx0cFg6IHRvUGFuZWwucFgsXG5cdFx0XHRcdHBZOiB0b1BhbmVsLnBZLFxuXHRcdFx0fSxcblx0XHRcdGZyb206IHtcblx0XHRcdFx0cFg6IGZyb21QYW5lbD8ucFgsXG5cdFx0XHRcdHBZOiBmcm9tUGFuZWw/LnBZXG5cdFx0XHR9LFxuXHRcdFx0ZGVnOiBwaWVjZS5kZWcsXG5cdFx0XHRwaWVjZUNoYXI6IHBpZWNlLmNoYXIsXG5cdFx0XHRlbmRcblx0XHR9KTtcblx0fVxuXG5cdC8qKiDmo4vorZzjgpLjg4bjgq3jgrnjg4jjgaflj5blvpdcblx0ICogQHJldHVybnMge3N0cmluZ31cblx0ICovXG5cdGdldFRleHRSZWNvcmQoKXtcblx0XHRjb25zdCBnZXRQWCA9ICh7cFh9KT0+IHBYPT1udWxsPyBcIipcIjogKHRoaXMueExlbi1wWCkudG9TdHJpbmcoMzYpO1xuXHRcdGNvbnN0IGdldFBZID0gKHtwWX0pPT4gcFk9PW51bGw/IFwiKlwiOiAocFkrMSkudG9TdHJpbmcoMzYpO1xuXHRcdHJldHVybiB0aGlzLnJlY29yZC5tYXAoXG5cdFx0XHQoe3RvLCBmcm9tLCBkZWcsIHBpZWNlQ2hhciwgZW5kfSk9PmAke1xuXHRcdFx0XHRQaWVjZS5kZWdDaGFyc1tkZWddfSR7XG5cdFx0XHRcdGdldFBYKHRvKX0ke1xuXHRcdFx0XHRnZXRQWSh0byl9JHtcblx0XHRcdFx0cGllY2VDaGFyfSR7XG5cdFx0XHRcdGVuZH0gKCR7XG5cdFx0XHRcdGdldFBYKGZyb20pfSR7XG5cdFx0XHRcdGdldFBZKGZyb20pfSlgXG5cdFx0KS5qb2luKFwiXFxuXCIpO1xuXHR9XG5cblx0LyoqIOebpOOCkuaPj+WGmSAqL1xuXHRkcmF3KCl7XG5cdFx0Y29uc3Qge2N0eCwgY2FudmFzLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQsIHBhbmVsV2lkdGgsIHBhbmVsSGVpZ2h0fSA9IHRoaXM7XG5cblx0XHQvLyDmj4/lhpnjgpLliJ3mnJ/ljJZcblx0XHRjdHgucmVzdG9yZSgpO1xuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmNhbnZhc0JhY2tncm91bmRDb2xvcjtcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuXHRcdC8vIOWkluaeoOOCkuaPj+WGmVxuXHRcdGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcblx0XHRjdHgubGluZVdpZHRoID0gdGhpcy5ib3JkZXJXaWR0aDtcblx0XHRjdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmJvcmRlckNvbG9yO1xuXG5cdFx0Y3R4LnNhdmUoKTtcblx0XHRjdHgudHJhbnNsYXRlKGxlZnQsIHRvcCk7XG5cdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC5zdHJva2VSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXHRcdGN0eC50cmFuc2xhdGUocGFuZWxXaWR0aC8yLCBwYW5lbEhlaWdodC8yKTtcblx0XHRjdHguc3Ryb2tlUmVjdCgwLCAwLCB3aWR0aC1wYW5lbFdpZHRoLCBoZWlnaHQtcGFuZWxIZWlnaHQpO1xuXHRcdGN0eC5yZXN0b3JlKCk7XG5cdFx0dGhpcy5zdGFuZC5kcmF3KCk7XG5cblx0XHQvLyDjg57jgrnnm67jgpLmj4/lhplcblx0XHR0aGlzLmZpZWxkLmZvckVhY2gocm93PT57XG5cdFx0XHRyb3cuZm9yRWFjaChwYW5lbD0+e1xuXHRcdFx0XHRwYW5lbC5kcmF3KCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRpZih0aGlzLm9uRHJhd2VkKSB0aGlzLm9uRHJhd2VkKHRoaXMpO1xuXHR9XG5cblx0LyoqIEJPROW9ouW8j+ODhuOCreOCueODiOOCkuWPluW+l1xuXHQgKiBAcmV0dXJucyB7c3RyaW5nfVxuXHQgKi9cblx0Z2V0IGJvZFRleHQoKXtcblx0XHRyZXR1cm4gQm9kLmdldFRleHQodGhpcyk7XG5cdH1cblxuXHQvKiog6aeS6YWN572u44KS44OG44Kt44K544OI44Gn5Y+W5b6XXG5cdCAqIHtib29sZWFufSBpc01pbmltYW0gLSDnuK7lsI/ooajnpLpcblx0ICovXG5cdHRvU3RyaW5nKGlzTWluaW1hbT1mYWxzZSl7XG5cdFx0Y29uc3Qge3hMZW59ID0gdGhpcztcblxuXHRcdGxldCBoZWFkZXIgPSBcIlwiO1xuXHRcdGxldCBmb290ZXIgPSBcIlwiO1xuXHRcdGxldCBwYW5lbE91dGVyID0gXCJcIjtcblx0XHRsZXQgcGFuZWxTZXAgPSBcIlwiO1xuXHRcdGxldCByb3dTZXAgPSBcIlxcblwiO1xuXG5cdFx0aWYoIWlzTWluaW1hbSl7XG5cdFx0XHRoZWFkZXIgPSBg4pSPJHtBcnJheSh4TGVuKS5maWxsKFwi4pSB4pSBXCIpLmpvaW4oXCLilK9cIil94pSTXFxuYDtcblx0XHRcdGZvb3RlciA9IGBcXG7ilJcke0FycmF5KHhMZW4pLmZpbGwoXCLilIHilIFcIikuam9pbihcIuKUt1wiKX3ilJtgO1xuXHRcdFx0cGFuZWxPdXRlciA9IFwi4pSDXCI7XG5cdFx0XHRwYW5lbFNlcCA9IFwi4pSCXCI7XG5cdFx0XHRyb3dTZXAgPSBgXFxu4pSgJHtBcnJheSh4TGVuKS5maWxsKFwi4pSA4pSAXCIpLmpvaW4oXCLilLxcIil94pSoXFxuYDtcblx0XHR9XG5cblx0XHRyZXR1cm4gKFxuXHRcdFx0aGVhZGVyK1xuXHRcdFx0dGhpcy5maWVsZC5tYXAocm93PT5cblx0XHRcdFx0cGFuZWxPdXRlcitcblx0XHRcdFx0cm93Lm1hcChwYW5lbD0+XG5cdFx0XHRcdFx0XCJcIisocGFuZWwucGllY2UgPz8gcGFuZWwudG9TdHJpbmcoaXNNaW5pbWFtKSlcblx0XHRcdFx0KS5qb2luKHBhbmVsU2VwKStcblx0XHRcdFx0cGFuZWxPdXRlclxuXHRcdFx0KS5qb2luKHJvd1NlcCkrXG5cdFx0XHRmb290ZXIrXG5cdFx0XHR0aGlzLnN0YW5kLnRvU3RyaW5nKGlzTWluaW1hbSlcblx0XHQpO1xuXHR9XG5cblx0LyoqIOeUu+WDj+OCkuWPluW+l1xuXHQgKiBAcGFyYW0ge3N0cmluZ30gZmlsZU5hbWUgLSDjg5XjgqHjgqTjg6vlkI1cblx0ICogQHBhcmFtIHtzdHJpbmd9IGV4dCAtIOaLoeW8teWtkFxuXHQgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn1cblx0ICovXG5cdGFzeW5jIGRvd25sb2FkSW1hZ2UoZmlsZU5hbWUsIGV4dCl7XG5cdFx0YXdhaXQgZG93bmxvYWRJbWFnZSh0aGlzLmNhbnZhcywgZmlsZU5hbWUsIGV4dCk7XG5cdH1cbn1cbiJdLCJuYW1lcyI6WyJiYXNlIiwiaW1wb3J0SnNvbiIsIm5hbWUiLCJ4aHIiLCJjYW52YXNGb250IiwiZ2FtZVNvZnQiLCJnYW1lcyIsImJvYXJkcyIsInBhbmVscyIsInBpZWNlcyIsInBpZWNlUmFuZ2UiLCJwaWVjZUNvc3QiLCJnZXRDaGFycyIsImRpc3BsYXlUZXh0IiwiZGlzcGxheSIsImdvb2dsZVVybCIsImNoYXJzIiwidW5pcXVlIiwibyIsImZvbnROYW1lIiwiZm9udFdlaWdodCIsImZvbnROYW1lUGx1cyIsImZvbnRVcmwiLCJyZXMiLCJtYXRjaFVybHMiLCJ1cmwiLCJmb250RmFjZSIsIl8iLCJsb2FkSW1hZ2UiLCJzcmMiLCJyZXNvbHZlIiwiaW1hZ2UiLCJpbWdTcmNzIiwiaW1nU3JjIiwiY2FudmFzSW1hZ2UiLCJnZXRNaW1lIiwiZXh0IiwiZG93bmxvYWRJbWFnZSIsImNhbnZhcyIsImZpbGVOYW1lIiwidXJsVHlwZSIsIm1pbWUiLCJhIiwiUGFuZWwiLCIjaXNTZWxlY3RlZCIsIiN0YXJnZXRSYW5nZXMiLCJjdHgiLCJjaGFyIiwiY2VudGVyIiwibWlkZGxlIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXJXaWR0aCIsInBYIiwicFkiLCJ2YWx1ZSIsInJhbmdlTmFtZSIsImF0dHJOYW1lIiwieCIsInkiLCJzZWxlY3RDb2xvciIsInRhcmdldENvbG9yIiwibGVmdCIsInRvcCIsInRleHRSb3RhdGUiLCJyYWQiLCJmb250U2l6ZSIsImNvbG9yIiwiaXNNaW5pbWFtIiwiUGllY2UiLCJvcHRpb24iLCJleFBpZWNlcyIsInBpZWNlIiwicHJvbW9LZXlzIiwia2V5IiwicHJvbW8iLCJpIiwiZXhQaWVjZXNPYmoiLCJhbGlhc0tleSIsImFsaWFzIiwidGV4dCIsImRlZ0NoYXIiLCJwaWVjZUNoYXIiLCJkZWciLCJfXyIsImIiLCJ6b29tIiwiZGlzcGxheVB0biIsInNpemUiLCJ1c2VSYW5rU2l6ZSIsImlzRHJhd1NoYWRvdyIsImlzTW92ZWQiLCJybmciLCJyb3ciLCJlIiwicmFuZ2UiLCJ0cmFuc3Bvc2UiLCJjIiwiciIsImltZ1dpZHRoIiwiaW1nSGVpZ2h0IiwiZ2FtZSIsImZvbnRDb2xvciIsImJhY2tncm91bmRDb2xvciIsImJvcmRlckNvbG9yIiwidiIsInJhbmdlT3B0aW9ucyIsImNlbnRlckNoYXJzIiwicG9pbnRDaGFycyIsImxpbmVyQ2hhcnMiLCJnZXRPcmlnaW4iLCJvTGlzdCIsIm93blgiLCJvd25ZIiwiclkiLCJyWCIsInJDaGFyIiwiaXNPd24iLCJjaGVja1RhcmdldCIsImJvYXJkIiwiZmllbGQiLCJ5TGVuIiwiZW5QYXNzYW50IiwiaW5GaWVsZCIsImlzVnNQbyIsInBhbmVsIiwiaXNBdHRhY2tGcm9tUGFvIiwiY2FuTW92ZSIsImlzQXR0YWNrIiwiY2hlY2tSaXZhbERlZyIsImV4aXN0c0NoaWxkIiwiY2hpbGQiLCJvWCIsIm9ZIiwic2V0VGFyZ2V0IiwibW92ZVBvaW50IiwicGFyZW50IiwibW92ZUxpbmVyIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJqbXBzIiwibW92ZXMiLCJpc01vdmVJbmYiLCJqbXBDbnQiLCJtb3ZlQ250IiwiaW5jWCIsImluY1kiLCJfeCIsIl95IiwiaXNKdW1wZWQiLCJyYW5nZU1hcCIsInJhbmdlT3B0aW9uIiwib3JpZ2luIiwidUlDb250cm9sIiwiaXNDbGljayIsImxhc3RYWSIsInNlbGVjdFBhbmVsIiwic2VsZWN0U3RhbmQiLCJmaWVsZFByb2MiLCJmblBhbmVsIiwiZm5BZnRlciIsInZpZXdTdHlsZSIsInJlY3QiLCJkcmFnU3RhcnQiLCJzdG9jayIsImRyYWdNb3ZlIiwiZHJhZ0VuZCIsIkJvZCIsIiNkZWcyUGllY2VDaGFycyIsIiNkZWcyUGllY2VSZWdleGVzIiwiI3BpZWNlQ2hhcjJEZWdzIiwiI2RlZzJTdGFuZFRpdGxlcyIsIiNzdGFuZFRpdGxlMkRlZ3MiLCIja2FuSSIsIiNrYW5YIiwiI251bTJLYW4iLCJudW0iLCJ2aWV3T25lIiwiI2thbjJOdW0iLCJrYW4iLCJlbXB0eU9uZSIsIiNudW0yWmVuIiwiemVuIiwiI3BhbmVsVGV4dCIsIiNnZXRQaWVjZVRleHQiLCIjZ2V0U3RhbmRUZXh0Iiwic3RhbmQiLCJjb3VudGVyIiwiY250IiwiYm9hcmRMaW5lcyIsInN0YW5kTGluZXMiLCJsaW5lIiwidGl0bGUiLCJib2FyZFN0ciIsImJvZENoYXIiLCJzdGFuZFN0ciIsInBhcmFtU3RyIiwicGFyYW0iLCJ4TGVuIiwicGxheWVycyIsImhlYWRlciIsImZvb3RlciIsInBhbmVsT3V0ZXIiLCJwYW5lbFNlcCIsInJvd1NlcCIsInN0YW5kSGVhZGVyIiwic3RhbmRGb290ZXIiLCJTdGFuZCIsIiNkZWdPcmRlciIsInJpZ2h0IiwiYm90dG9tIiwicGFuZWxXaWR0aCIsInBhbmVsSGVpZ2h0IiwidG9QYW5lbCIsIndpbm5lclBpZWNlIiwibG9zZXJQaWVjZSIsImZvcmNlQ2FwdHVyZSIsImZvcmNlQ2FudENhcHR1cmUiLCJwaXRjaFdpZHRoIiwicGl0Y2hIZWlnaHQiLCJwbGF5ZXIiLCJoZWFkIiwiZGVncyIsImdldEluaXQiLCJFblBhc3NhbnQiLCJlcCIsIkJvYXJkIiwicGxheUJvYXJkIiwicGxheVBpZWNlcyIsIm9uRHJhd2VkIiwiZ2FtZU5hbWUiLCJwaWVjZVNldCIsImNhbnZhc1dpZHRoIiwiY2FudmFzSGVpZ2h0IiwiY2FudmFzRml0IiwiYm9hcmRMZWZ0IiwiYm9hcmRUb3AiLCJwaWVjZVNpemUiLCJ1c2VTdGFuZCIsImF1dG9EcmF3aW5nIiwib25HYW1lT3ZlciIsImZyZWVNb2RlIiwiY2FudmFzRm9udEFzeW5jIiwiY2FudmFzSW1hZ2VBc3luYyIsInN0eWxlIiwiI2RlZ05vcm1hbCIsInBsYXllYUlkT3JEZWciLCJwbGF5ZXJJZCIsInBvcyIsInN0YW5kVGl0bGUiLCJ0ZXh0cyIsInN0YW5kVGV4dHMiLCJvZmZzZXREZWciLCJwcm9tb0xpbmUiLCJmb3JjZVByb21vTGluZSIsImQiLCIjZW1pdEdhbWVPdmVyIiwiZ2FtZUFsaXZlIiwiI3Byb21vRGlhbG9nIiwiZnJvbVBhbmVsIiwiY2FuUHJvbW8iLCJmb3JjZVByb21vIiwiYWZ0ZXJQcm9tbyIsImVuZCIsImdldFBYIiwiZ2V0UFkiLCJ0byIsImZyb20iXSwibWFwcGluZ3MiOiJBQUFBLE1BQU1BLElBQU87QUFDYixTQUFTQyxFQUFXQyxHQUFNO0FBQ3pCLFFBQU1DLElBQU0sSUFBSTtBQUdoQixNQUZBQSxFQUFJLEtBQUssT0FBTyxHQUFHSCxDQUFJLEdBQUdFLENBQUksU0FBUyxFQUFLLEdBQzVDQyxFQUFJLEtBQUksR0FDTEEsRUFBSSxXQUFXO0FBQ2pCLFdBQU8sS0FBSyxNQUFNQSxFQUFJLFlBQVk7QUFFbEMsUUFBTSxJQUFJLE1BQU0scUJBQXFCO0FBQ3ZDO0FBU1ksTUFBQ0MsSUFBYUgsRUFBVyxZQUFZLEdBWXBDSSxLQUFXSixFQUFXLFVBQVUsR0FpQmhDSyxJQUFRTCxFQUFXLE9BQU8sR0EwQjFCTSxJQUFTTixFQUFXLFFBQVEsR0Fx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
