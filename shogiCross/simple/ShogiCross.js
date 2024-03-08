const q = "./json/ShogiCross/";
async function j(d) {
  return await fetch(`${q}${d}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const $ = await j("canvasFont"), gt = await j("gameSoft"), J = await j("games"), G = await j("boards"), D = await j("panels"), W = await j("pieces"), Q = await j("pieceRange"), Z = await j("pieceCost"), tt = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(D).map(({ displayText: d }) => d).join("") + Object.values(W).map(({ display: d }) => d ? d.join("") : "").join("")
  ])
].sort().join("");
Object.assign($, {
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
    const d = "https://fonts.googleapis.com/css2?family=", t = tt(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = $.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      $.fonts.map(async ([s, i]) => {
        const r = s.replace(/ /g, "+"), o = `${d}${r}:wght@${i}&text=${t}`, a = await fetch(o);
        if (!a.ok)
          return;
        const n = (await a.text()).match(/url\(.+?\)/g);
        if (!n)
          throw new Error("Not found font.");
        for (const c of n) {
          const f = new FontFace(`${s}${e}`, c);
          await f.load(), document.fonts.add(f);
        }
      })
    ).then((s) => this.imported = !0);
  }
});
function et(d) {
  return new Promise((t) => {
    const e = new Image();
    e.src = d, e.onload = () => t(e);
  });
}
const st = [...new Set(
  Object.values(D).flatMap(({ imgSrc: d }) => d ?? []).concat(Object.values(W).flatMap(({ imgSrc: d }) => d ?? []))
)], I = {
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
        st.map(async (d) => {
          this.images[d] = await et(d);
        })
      ).then((d) => this.imported = !0);
  }
}, it = (d) => "image/" + d.replace("jpg", "jpeg");
function rt(d, t = "image", e = "png") {
  return new Promise((s) => {
    d.toBlob((i) => {
      const r = document.createElement("a");
      return r.href = URL.createObjectURL(i), r.download = `${t}.${e}`, r.click(), URL.revokeObjectURL(r.href), s();
    }, it(e));
  });
}
class ot {
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
  constructor(t, e, s, i, r, o, a, h, n) {
    Object.assign(this, D[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = a, this.pX = h, this.pY = n, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: a, displayText: h, textRotate: n } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, a), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, a), t.moveTo(0, a / 2), t.lineTo(o, a / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, a), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, a)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, a)), t.closePath(), t.stroke(), t.restore(), h) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const c = n ? n * Math.PI / 180 : 0;
      t.rotate(c);
      const f = Math.min(this.width, this.height) * 0.6;
      t.font = `${f}px ${$.names}`;
      const g = t.measureText(h).width, w = f / 2 * 0.8;
      t.fillText(h, -g / 2, w), t.restore();
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
class S {
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
    SR: 0.975,
    R: 0.95,
    UC: 0.925,
    C: 0.9
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
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(W))));
    for (const [r, o] of s)
      o.attr ??= [], o.unit && (o.base = o);
    for (const [r, o] of s) {
      if (!o.promo || typeof o.promo != "string")
        continue;
      const a = [...o.promo];
      o.promo = {};
      for (const h of a) {
        const n = s.get(h);
        n.attr.push("promoted"), n.unit = "成", o.promo[h] = n, s.set(h, { ...o, ...n });
      }
    }
    [...s].forEach(([r, o], a) => {
      o.id = a, o.char = r, s.set(r, new S(t, o, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, o] of s)
      o.alias.forEach((a, h) => {
        const n = o.clone(), c = [...n.display];
        n.displayPtn = h + 1, n.display = c, n.alias[h] = r, i[a] = n;
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
    const [s, i] = [...e], r = S.charDegs[s];
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
    return this.useRankSize && (t *= S.rankRatio[this.rank]), t;
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
    size: r = S.size,
    useRankSize: o = S.useRankSize,
    isDrawShadow: a = S.isDrawShadow,
    isMoved: h = !1
  } = {}) {
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = s, this.game = J[this.gameName], this.cost = Z[this.char] ?? 1, this.center = 0, this.middle = 0, this.deg = i, this.size = r, this.useRankSize = o, this.isDrawShadow = a, this.isRotateImg ??= !0, this.isMoved = h, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([n, c]) => {
        Array.isArray(c) || (this.range[n] = Q[c].map((f) => [...f]));
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
    return new S(this.ctx, { ...this }, { displayPtn: t, deg: e, size: s, isMoved: i });
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
          const i = (r) => r[0].map((o, a) => r.map((h) => h[a]));
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
    this.imgSrc && I.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = I.images[s];
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
    const a = [..."" + this.display[this.displayPtn]], h = 40 * s;
    t.font = `${h}px ${$.names}`, t.textAlign = "center", a.forEach((n, c) => {
      const f = a.length === 1 ? h / 2 : c * h;
      t.fillText(n, 0, f);
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
    return S.degChars[this.deg] + this.char;
  }
}
Object.entries(S.degChars).forEach(([d, t]) => {
  S.charDegs[t] = d;
});
const nt = [
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
], K = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let d = 1; d <= 9; d++)
  K.push(["" + d, { moves: d }]);
function at(d) {
  const t = [];
  let e, s;
  for (let i = 0; i < d.length; i++)
    for (let r = 0; r < d[i].length; r++) {
      const o = d[i][r];
      for (let [a, { isOwn: h }] of ct)
        o === a && (t.push({ isOwn: h, oX: r, oY: i }), h && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function lt(d, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = d;
  function a(l, u) {
    return i[u] && i[u][l] && !i[u][l].hasAttr("keepOut");
  }
  function h(l) {
    return l.piece && t.hasAttr("po") && l.piece.hasAttr("po");
  }
  function n(l) {
    return l.piece && !t.isMoved && !l.piece.isMoved && t.hasAttr("pao") && t.cost < l.piece.cost;
  }
  function c(l, u, v, p = "", C = !0) {
    if (!i[v] || !i[v][u])
      return !1;
    const y = i[v][u];
    return !y || h(y) || n(y) || !o.isTarget(p, y, t) || t.hasAttr("inPalace") && !y.hasAttr("palace") || p.indexOf("palace") === 0 && !(y.hasAttr(p) && i[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= d.getRow(u, v, t.deg) ? !1 : l ? i[v][u].piece ? C ? t.deg !== i[v][u].piece.deg : !0 : !1 : !i[v][u].piece;
  }
  function f(l, u, v, p, C) {
    for (const y of u)
      for (let m = 0; m < l.length; m++)
        for (let R = 0; R < l[m].length; R++) {
          const [b, x] = [R + e - p, m + s - C];
          if (!(!a(b, x) || c(v, 0 | b, 0 | x, "", !1) || l[m][R] !== y))
            return !0;
        }
    return !1;
  }
  function g(l, u, v) {
    const p = i[v][u];
    p.isTarget = !0, o.setTarget(l, p, t);
  }
  function w(l, [u, { isAttack: v }], { oX: p, oY: C, isOwn: y }) {
    if (y)
      for (const [m, { child: R = [] } = {}] of ht)
        for (let b = 0; b < l.length; b++)
          for (let x = 0; x < l[b].length; x++) {
            const [L, E] = [x + e - p, b + s - C];
            !a(L, E) || !c(v, L, E, u) || l[b][x] !== m || f(l, R, !1, p, C) || g(u, L, E);
          }
  }
  function k(l, [u, { isAttack: v }], { oX: p, oY: C, isOwn: y, offsetX: m, offsetY: R }) {
    if (!(!y && !c(!1, e + m, s + R)))
      for (const [b, { jmps: x = 0, moves: L = 0 } = {}] of K) {
        const E = !L || L === 0;
        for (let A = C - 1; A <= C + 1; A++)
          for (let O = p - 1; O <= p + 1; O++) {
            if (l[A][O] !== b || O === p && A === C)
              continue;
            let H = x || 0, T = L || 0;
            const [V, _] = [O - p, A - C];
            for (let X = e, Y = s; ; ) {
              X += V, Y += _;
              const M = X + m, P = Y + R;
              if (!a(M, P) || !E && T === 0)
                break;
              const F = H === 0;
              F && c(v, M, P, u, F) ? (T--, g(u, M, P)) : x < 1 && T--;
              const U = i[P][M];
              if (U.piece && (H--, F || h(U)))
                break;
            }
          }
      }
  }
  (function() {
    const l = t.getRange();
    l.attack ??= l.default;
    for (const u of nt) {
      const v = u[0];
      if (t.isMoved && ["start", "castling"].includes(v))
        continue;
      const p = l[v];
      if (p)
        for (const C of at(p))
          w(p, u, C), k(p, u, C);
    }
  })();
}
function dt(d) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = d, o = (c, f, g = () => {
  }) => {
    const w = window.getComputedStyle(r), k = c.target.getBoundingClientRect();
    let l = r.width / parseFloat(w.width), u = r.height / parseFloat(w.height);
    if (c.clientX)
      l *= c.clientX - k.left, u *= c.clientY - k.top;
    else if (0 < c.touches.length) {
      if (1 < c.touches.length)
        return;
      l *= c.touches[0].clientX - k.left, u *= c.touches[0].clientY - k.top;
    } else
      c.preventDefault(), [l, u] = e;
    d.field.forEach((v, p) => v.forEach((C, y) => f(C, l, u, y, p))), g(l, u), d.draw(), e = [l, u];
  }, a = (c) => {
    t = !0, o(
      c,
      (f, g, w) => {
        const { piece: k, pX: l, pY: u } = f;
        k && f.checkRangeMouse(g, w) && (c.preventDefault(), k.isSelected = !0, s = f, lt(d, k, l, u));
      },
      (f, g) => {
        for (const [w, k] of Object.entries(d.stand.stocks))
          for (let l = k.length - 1; 0 <= l; l--)
            if (k[l].checkRangeMouse(f, g)) {
              c.preventDefault(), k[l].isSelected = !0, i = { deg: w, i: l };
              return;
            }
      }
    );
  }, h = (c) => {
    !t || !(s || i) || o(
      c,
      (f, g, w) => {
        f.isSelected = f.checkRangeMouse(g, w);
      }
    );
  }, n = (c) => {
    t = !1, o(
      c,
      (f, g, w) => {
        f.checkRangeMouse(g, w) && (s && d.movePiece(s, f), i && !f.piece && d.stand.releasePiece(f, i));
      }
    ), o(
      c,
      (f) => {
        f.piece && (f.piece.isSelected = !1), f.isSelected = !1, f.isTarget = !1;
      },
      () => {
        for (const [f, g] of Object.entries(d.stand.stocks))
          for (let w = g.length - 1; 0 <= w; w--)
            g[w].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", a), r.addEventListener("mousemove", h), r.addEventListener("mouseup", n), r.addEventListener("touchstart", a), r.addEventListener("touchmove", h), r.addEventListener("touchend", n), {
    removeEvent() {
      r.removeEventListener("mousedown", a), r.removeEventListener("mousemove", h), r.removeEventListener("mouseup", n), r.removeEventListener("touchstart", a), r.removeEventListener("touchmove", h), r.removeEventListener("touchend", n);
    }
  };
}
class z {
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
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: a, panelHeight: h, xLen: n, yLen: c } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = a / 2, this.pitchHeight = h, this.xLen = n, this.yLen = c;
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
    const e = this.stocks[z.degId[t.deg]];
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
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: a } = this, { ctx: h, xLen: n, yLen: c } = t;
    h.fillStyle = t.backgroundColor, h.strokeStyle = t.borderColor, h.lineWidth = t.borderWidth, h.save(), h.translate(e, s), h.fillRect(0, 0, i, r), h.strokeRect(0, 0, i, r), h.restore(), this.stocks.forEach((f, g) => {
      let w = 0;
      f = f.slice(-c / 4 * n);
      for (let k = 0 | c / 4 * g; k < c / 4 * (g + 1); k++)
        for (let l = 0; l < n; l++) {
          const u = e + o * (l + 1), v = s + a * (k + 1), p = f[w++];
          if (p == null)
            break;
          p.center = u, p.middle = v, p.draw();
        }
    });
  }
  /** 文字列形式で取得
   * @param {string} - 簡易表示
   */
  toString(t = !1) {
    const { xLen: e } = this.board, s = this.stocks.flat().filter((o) => o);
    let i = 0 < s.length ? `
` + "―".repeat(e * 2) + `
` : "", r = s.map((o) => "" + o).join("");
    if (!t) {
      i = "";
      for (const o of Object.values(S.degChars))
        r = r.replace(o, `
${o}持ち駒:${o}`);
    }
    return i + r;
  }
}
const ft = Object.keys(S.degChars), B = () => ({
  panel: null,
  piece: null
});
class ut {
  constructor() {
    this.degs = {}, ft.forEach((t) => this.degs[t] = B());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(t) {
    this.degs[t] = B();
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
class N {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas
   * @param {Object<string, any>} options - オプション
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: h }, n) => 1 < n && h) ? 4 : 2, a = new N(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: h, pieceSet: n }, c) => {
      if (h) {
        n ??= "default";
        try {
          a.putStartPieces(c, h, n);
        } catch {
        }
      }
    }), a.onDrawed = r, a;
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
    boardLeft: a = 5,
    boardTop: h = 5,
    panelWidth: n = 50,
    panelHeight: c = 0 | n * 1.1,
    pieceSize: f = 0 | n * 0.9,
    borderWidth: g = Math.max(n, c) / 30,
    useStand: w = !1,
    backgroundColor: k = "#00000000",
    autoDrawing: l = !0,
    onDrawed: u,
    freeMode: v = !1
  } = {}) {
    const p = $.importAsync(), C = I.importAsync();
    this.canvas = t;
    const y = t.getContext("2d");
    if (y.clearRect(0, 0, t.width, t.height), this.ctx = y, this.pieces = S.getPieces(y), Object.assign(this, G[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = a, this.top = h, this.panelWidth = n, this.panelHeight = c, this.borderWidth = g, this.pieceSize = f, this.canvasBackgroundColor = k, this.field = this.field.map(
      (R, b) => [...R].map((x, L) => {
        const E = a + n * (L + 1), A = h + c * (b + 1);
        return new ot(y, x, E, A, n, c, g, L, b);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = a + this.width, this.bottom = h + this.height, this.stand = new z(this), t.width = i ?? (w ? this.stand.right : this.right) + 5, t.height = r ?? this.bottom + 5;
    const { style: m } = t;
    o === "overflow" ? (m.maxWidth === "" && (m.maxWidth = "97vw"), m.maxHeight === "" && (m.maxHeight = "97vh")) : o === "horizontal" ? m.width === "" && (m.width = "97vw") : o === "vertical" ? m.height === "" && (m.height = "97vh") : o === "parentOverflow" ? (m.maxWidth === "" && (m.maxWidth = "100%"), m.maxHeight === "" && (m.maxHeight = "100%")) : o === "parentHorizontal" ? m.width === "" && (m.width = "100%") : o === "parentVertical" && m.height === "" && (m.height = "100%"), this.autoDrawing = l, l && (p.then(() => this.draw()), C.then(() => this.draw()), this.draw()), this.onDrawed ??= u, this.freeMode = v, this.record = [], this.uiControl = dt(this), this.enPassant = new ut();
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
        const i = (r) => r[0].map((o, a) => r.map((h) => h[a]));
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
    const o = J[e].position[this.xLen][s];
    if (!o)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    o.forEach((a, h) => {
      if (a.length < this.xLen)
        throw Error(a.join(""));
      const n = h + this.yLen - o.length;
      [...a].forEach((c, f) => {
        if (!i[c])
          return;
        const g = i[c].clone(), w = this.field[n][f];
        g.center = w.center, g.middle = w.middle, w.piece = g;
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
  putNewPiece(t, e, s, i, { displayPtn: r = 0, setDeg: o = !1, isMoved: a = !1 } = {}) {
    const { pieces: h } = this, n = o ? i : i * 90;
    typeof t == "string" && (t = new S(this.ctx, h[t], { displayPtn: r, deg: n, isMoved: a }));
    const c = this.field[s][e];
    t.center = c.center, t.middle = c.middle, c.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, a = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(S.degChars).map((n) => `
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
          const f = a[n][c], g = S.stringToPiece(s, f);
          g.center = e[n][c].center, g.middle = e[n][c].middle, e[n][c].piece = g;
        } catch {
          e[n][c].piece = null;
        }
    this.stand.clear();
    const h = a[r];
    h && h.forEach((n) => {
      const c = S.stringToPiece(s, n);
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
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: o } = s, [a, h] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((c) => e - c - (0 | this.promoLineOffset));
    let n;
    return this.sidePromo ? n = Math.max(
      ...Object.keys(S.degChars).map((c) => 0 | c).filter((c) => c !== o).map(
        (c) => this.getRow(i, r, c, 180)
      )
    ) : n = this.getRow(i, r, o), {
      canPromo: a <= n,
      forcePromo: h <= n
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
    let { canPromo: o, forcePromo: a } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: h } = e;
    h.center = e.center, h.middle = e.middle, h.isMoved = !0;
    const n = this.checkCanPromo(e);
    if (o ||= n.canPromo, a ||= n.forcePromo, r.setMoved(e), !h.promo || h.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [c, { name: f }] of Object.entries(h.promo))
        if (confirm(`成りますか?
	${h.char}:${h.name}
	　↓
	${c}:${f}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), h.promotion(c);
          return;
        }
    while (!i && a);
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
      ({ to: s, from: i, deg: r, pieceChar: o, end: a }) => `${S.degChars[r]}${t(s)}${e(s)}${o}${a} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: o, panelWidth: a, panelHeight: h } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(a / 2, h / 2), t.strokeRect(0, 0, r - a, o - h), t.restore(), this.stand.draw(), this.field.forEach((n) => {
      n.forEach((c) => {
        c.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** 駒配置をテキストで取得
   * {boolean} isMinimam - 縮小表示
   */
  toString(t = !1) {
    const { xLen: e } = this;
    let s = "", i = "", r = "", o = "", a = `
`;
    return t || (s = `┏${Array(e).fill("━━").join("┯")}┓
`, i = `
┗${Array(e).fill("━━").join("┷")}┛`, r = "┃", o = "│", a = `
┠${Array(e).fill("──").join("┼")}┨
`), s + this.field.map(
      (h) => r + h.map(
        (n) => "" + (n.piece || n.toString(t))
      ).join(o) + r
    ).join(a) + i + this.stand.toString(t);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(t, e) {
    await rt(this.canvas, t, e);
  }
}
export {
  N as Board,
  S as Piece,
  G as boards,
  $ as canvasFont,
  I as canvasImage,
  gt as gameSoft,
  J as games
};
