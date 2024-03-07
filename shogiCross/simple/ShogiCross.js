const N = "./json/ShogiCross/";
async function E(u) {
  return await fetch(`${N}${u}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const $ = await E("canvasFont"), at = await E("gameSoft"), Y = await E("games"), _ = await E("boards"), P = await E("panels"), W = await E("pieces"), q = await E("pieceRange"), G = await E("pieceCost"), V = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(P).map(({ displayText: u }) => u).join("") + Object.values(W).map(({ display: u }) => u ? u.join("") : "").join("")
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
    const u = "https://fonts.googleapis.com/css2?family=", t = V(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = $.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      $.fonts.map(async ([s, i]) => {
        const r = s.replace(/ /g, "+"), o = `${u}${r}:wght@${i}&text=${t}`, h = await fetch(o);
        if (!h.ok)
          return;
        const a = (await h.text()).match(/url\(.+?\)/g);
        if (!a)
          throw new Error("Not found font.");
        for (const c of a) {
          const l = new FontFace(`${s}${e}`, c);
          await l.load(), document.fonts.add(l);
        }
      })
    ).then((s) => this.imported = !0);
  }
});
function Q(u) {
  return new Promise((t) => {
    const e = new Image();
    e.src = u, e.onload = () => t(e);
  });
}
const Z = [...new Set(
  Object.values(P).flatMap(({ imgSrc: u }) => u ?? []).concat(Object.values(W).flatMap(({ imgSrc: u }) => u ?? []))
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
        Z.map(async (u) => {
          this.images[u] = await Q(u);
        })
      ).then((u) => this.imported = !0);
  }
};
class tt {
  #t;
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Object<string, any>} panel - マス目
   * @param {number} center - 描写するX座標(中心原点)
   * @param {number} middle - 描写するY座標(中心原点)
   * @param {number} width - パネル幅
   * @param {number} height - パネル高さ
   */
  constructor(t, e, s, i, r, o, h, n, a) {
    Object.assign(this, P[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = h, this.pX = n, this.pY = a, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: h, displayText: n, textRotate: a } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, h), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, h), t.moveTo(0, h / 2), t.lineTo(o, h / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, h), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, h)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, h)), t.closePath(), t.stroke(), t.restore(), n) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const c = a ? a * Math.PI / 180 : 0;
      t.rotate(c);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${$.names}`;
      const m = t.measureText(n).width, d = l / 2 * 0.8;
      t.fillText(n, -m / 2, d), t.restore();
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
class k {
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
   */
  static getPieces(t) {
    const e = new Map(Object.entries(JSON.parse(JSON.stringify(W))));
    for (const [i, r] of e)
      r.attr ??= [], r.unit && (r.base = r);
    for (const [i, r] of e) {
      if (!r.promo || typeof r.promo != "string")
        continue;
      const o = [...r.promo];
      r.promo = {};
      for (const h of o) {
        const n = e.get(h);
        n.attr.push("promoted"), n.unit = "成", r.promo[h] = n, e.set(h, { ...r, ...n });
      }
    }
    [...e].forEach(([i, r], o) => {
      r.id = o, r.char = i, e.set(i, new k(t, r));
    });
    const s = Object.fromEntries(e);
    for (const [i, r] of e)
      r.alias.forEach((o, h) => {
        const n = r.clone(), a = [...n.display];
        n.displayPtn = h + 1, n.display = a, n.alias[h] = i, s[o] = n;
      });
    return s;
  }
  /** 文字列から駒を取得
   * @param {Object<string, Piece>} piece - 駒
   * @param {string} text - 駒文字列
   */
  static stringToPiece(t, e) {
    if (!e)
      return null;
    const [s, i] = [...e], r = k.charDegs[s];
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
    return this.useRankSize && (t *= k.rankRatio[this.rank]), t;
  }
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Object<string, any>} piece - 駒
   * @param {number} displayPtn - 表示文字列を変更(1〜)
   * @param {number} deg - パネル角度
   * @param {number} size - パネルサイズ
   * @param {boolean} useRankSize - 格の違いによって駒の大きさを変更するか
   * @param {boolean} isDrawShadow - 影の描写有無
   * @param {boolean} isMoved - 初回移動済みか否か
   */
  constructor(t, e, {
    displayPtn: s = 0,
    deg: i = 0,
    size: r = k.size,
    useRankSize: o = k.useRankSize,
    isDrawShadow: h = k.isDrawShadow,
    isMoved: n = !1
  } = {}) {
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = s, this.game = Y[this.gameName], this.cost = G[this.char] ?? 1, this.center = 0, this.middle = 0, this.size = r, this.deg = i, this.useRankSize = o, this.isDrawShadow = h, this.isRotateImg ??= !0, this.isMoved = n, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([a, c]) => {
        Array.isArray(c) || (this.range[a] = q[c].map((l) => [...l]));
      });
    } catch (a) {
      throw console.error(a), e;
    }
  }
  /** 駒をクローン
   * @returns Piece
   */
  clone() {
    const { displayPtn: t, deg: e, size: s, isMoved: i } = this;
    return new k(this.ctx, { ...this }, { displayPtn: t, deg: e, size: s, isMoved: i });
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
          const i = (r) => r[0].map((o, h) => r.map((n) => n[h]));
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
    e.save(), e.translate(0, 12 * t), this.drawMask("#00000066"), e.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    const { ctx: t, game: e, zoom: s } = this;
    let i, r, o;
    this.hasAttr("promoted") ? (i = e.promoteFontColor ?? e.fontColor ?? "#000000", r = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", o = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (i = e.fontColor ?? "#000000", r = e.backgroundColor ?? "#FFFFFF", o = e.borderColor ?? "#777777"), t.strokeStyle = o, t.fillStyle = r, t.lineWidth = 8 * s, this.drawPieceShadow(s), t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = i;
    const h = [..."" + this.display[this.displayPtn]], n = 40 * s;
    t.font = `${n}px ${$.names}`, t.textAlign = "center", h.forEach((a, c) => {
      const l = h.length === 1 ? n / 2 : c * n;
      t.fillText(a, 0, l);
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
    return k.degChars[this.deg] + this.char;
  }
}
Object.entries(k.degChars).forEach(([u, t]) => {
  k.charDegs[t] = u;
});
const et = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], st = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], it = [
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
], B = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let u = 1; u <= 9; u++)
  B.push(["" + u, { moves: u }]);
function rt(u) {
  const t = [];
  let e, s;
  for (let i = 0; i < u.length; i++)
    for (let r = 0; r < u[i].length; r++) {
      const o = u[i][r];
      for (let [h, { isOwn: n }] of st)
        o === h && (t.push({ isOwn: n, oX: r, oY: i }), n && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function ot(u, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = u;
  function h(d, f) {
    return i[f] && i[f][d] && !i[f][d].hasAttr("keepOut");
  }
  function n(d, f, g, p = "", v = !0) {
    if (!i[g] || !i[g][f])
      return !1;
    const S = i[g][f];
    return !S || !o.isTarget(p, S, t) || t.hasAttr("inPalace") && !S.hasAttr("palace") || p.indexOf("palace") === 0 && !(S.hasAttr(p) && i[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= u.getRow(f, g, t.deg) ? !1 : d ? i[g][f].piece ? v ? t.deg !== i[g][f].piece.deg : !0 : !1 : !i[g][f].piece;
  }
  function a(d, f, g, p, v) {
    for (const S of f)
      for (let y = 0; y < d.length; y++)
        for (let w = 0; w < d[y].length; w++) {
          const [x, C] = [w + e - p, y + s - v];
          if (!(!h(x, C) || n(g, 0 | x, 0 | C, "", !1) || d[y][w] !== S))
            return !0;
        }
    return !1;
  }
  function c(d, f, g) {
    const p = i[g][f];
    p.isTarget = !0, o.setTarget(d, p, t);
  }
  function l(d, [f, { isAttack: g }], { oX: p, oY: v, isOwn: S }) {
    if (S)
      for (const [y, { child: w = [] } = {}] of it)
        for (let x = 0; x < d.length; x++)
          for (let C = 0; C < d[x].length; C++) {
            const [b, R] = [C + e - p, x + s - v];
            !h(b, R) || !n(g, b, R, f) || d[x][C] !== y || a(d, w, !1, p, v) || c(f, b, R);
          }
  }
  function m(d, [f, { isAttack: g }], { oX: p, oY: v, isOwn: S, offsetX: y, offsetY: w }) {
    if (!(!S && !n(!1, e + y, s + w)))
      for (const [x, { jmps: C = 0, moves: b = 0 } = {}] of B) {
        const R = !b || b === 0;
        for (let L = v - 1; L <= v + 1; L++)
          for (let j = p - 1; j <= p + 1; j++) {
            if (d[L][j] !== x || j === p && L === v)
              continue;
            let I = C || 0, M = b || 0;
            const [U, K] = [j - p, L - v];
            for (let z = e, H = s; ; ) {
              z += U, H += K;
              const A = z + y, O = H + w;
              if (!h(A, O) || !R && M === 0)
                break;
              const T = I === 0;
              if (T && n(g, A, O, f, T) ? (M--, c(f, A, O)) : C < 1 && M--, i[O][A].piece && (I--, T))
                break;
            }
          }
      }
  }
  (function() {
    const d = t.getRange();
    d.attack ??= d.default;
    for (const f of et) {
      const g = f[0];
      if (t.isMoved && ["start", "castling"].includes(g))
        continue;
      const p = d[g];
      if (p)
        for (const v of rt(p))
          l(p, f, v), m(p, f, v);
    }
  })();
}
function nt(u) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = u, o = (c, l, m = () => {
  }) => {
    const d = window.getComputedStyle(r), f = c.target.getBoundingClientRect();
    let g = r.width / parseFloat(d.width), p = r.height / parseFloat(d.height);
    if (c.clientX)
      g *= c.clientX - f.left, p *= c.clientY - f.top;
    else if (0 < c.touches.length) {
      if (1 < c.touches.length)
        return;
      g *= c.touches[0].clientX - f.left, p *= c.touches[0].clientY - f.top;
    } else
      c.preventDefault(), [g, p] = e;
    u.field.forEach((v, S) => v.forEach((y, w) => l(y, g, p, w, S))), m(g, p), u.draw(), e = [g, p];
  }, h = (c) => {
    t = !0, o(
      c,
      (l, m, d) => {
        const { piece: f, pX: g, pY: p } = l;
        f && l.checkRangeMouse(m, d) && (c.preventDefault(), f.isSelected = !0, s = l, ot(u, f, g, p));
      },
      (l, m) => {
        for (const [d, f] of Object.entries(u.stand.stocks))
          for (let g = f.length - 1; 0 <= g; g--)
            if (f[g].checkRangeMouse(l, m)) {
              c.preventDefault(), f[g].isSelected = !0, i = { deg: d, i: g };
              return;
            }
      }
    );
  }, n = (c) => {
    !t || !(s || i) || o(
      c,
      (l, m, d) => {
        l.isSelected = l.checkRangeMouse(m, d);
      }
    );
  }, a = (c) => {
    t = !1, o(
      c,
      (l, m, d) => {
        l.checkRangeMouse(m, d) && (s && u.movePiece(s, l), i && !l.piece && u.stand.releasePiece(l, i));
      }
    ), o(
      c,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.isTarget = !1;
      },
      () => {
        for (const [l, m] of Object.entries(u.stand.stocks))
          for (let d = m.length - 1; 0 <= d; d--)
            m[d].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", h), r.addEventListener("mousemove", n), r.addEventListener("mouseup", a), r.addEventListener("touchstart", h), r.addEventListener("touchmove", n), r.addEventListener("touchend", a), {
    removeEvent() {
      r.removeEventListener("mousedown", h), r.removeEventListener("mousemove", n), r.removeEventListener("mouseup", a), r.removeEventListener("touchstart", h), r.removeEventListener("touchmove", n), r.removeEventListener("touchend", a);
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
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: h, panelHeight: n, xLen: a, yLen: c } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = h / 2, this.pitchHeight = n, this.xLen = a, this.yLen = c;
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
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: h } = this, { ctx: n, xLen: a, yLen: c } = t;
    n.fillStyle = t.backgroundColor, n.strokeStyle = t.borderColor, n.lineWidth = t.borderWidth, n.save(), n.translate(e, s), n.fillRect(0, 0, i, r), n.strokeRect(0, 0, i, r), n.restore(), this.stocks.forEach((l, m) => {
      let d = 0;
      l = l.slice(-c / 4 * a);
      for (let f = 0 | c / 4 * m; f < c / 4 * (m + 1); f++)
        for (let g = 0; g < a; g++) {
          const p = e + o * (g + 1), v = s + h * (f + 1), S = l[d++];
          if (S == null)
            break;
          S.center = p, S.middle = v, S.draw();
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
      for (const o of Object.values(k.degChars))
        r = r.replace(o, `
${o}持ち駒:${o}`);
    }
    return i + r;
  }
}
const ct = Object.keys(k.degChars), X = () => ({
  panel: null,
  piece: null
});
class ht {
  constructor() {
    this.degs = {}, ct.forEach((t) => this.degs[t] = X());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(t) {
    this.degs[t] = X();
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
class J {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas
   * @param {Object<string, any>} options - オプション
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: n }, a) => 1 < a && n) ? 4 : 2, h = new J(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: n, pieceSet: a }, c) => {
      if (n) {
        a ??= "default";
        try {
          h.putStartPieces(c, n, a);
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
   * @param {number} panelWidth - パネル幅
   * @param {number} panelHeight - パネル高さ
   * @param {boolean} useStand - 駒台の使用有無
   * @param {string} backgroundColor - 背景色(デフォルト無職)
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
    boardTop: n = 5,
    panelWidth: a = 50,
    panelHeight: c = 0 | a * 1.1,
    pieceSize: l = 0 | a * 0.9,
    useStand: m = !1,
    backgroundColor: d = "#00000000",
    autoDrawing: f = !0,
    onDrawed: g,
    freeMode: p = !1
  } = {}) {
    const v = $.importAsync(), S = F.importAsync();
    this.canvas = t;
    const y = t.getContext("2d");
    if (y.clearRect(0, 0, t.width, t.height), this.ctx = y, k.size = l, this.pieces = k.getPieces(y, l), Object.assign(this, _[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = h, this.top = n, this.panelWidth = a, this.panelHeight = c, this.pieceSize = l, this.canvasBackgroundColor = d, this.field = this.field.map(
      (x, C) => [...x].map((b, R) => {
        const L = h + a * (R + 1), j = n + c * (C + 1);
        return new tt(y, b, L, j, a, c, this.borderWidth, R, C);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = h + this.width, this.bottom = n + this.height, this.stand = new D(this), t.width = i ?? (m ? this.stand.right : this.right) + 5, t.height = r ?? this.bottom + 5;
    const { style: w } = t;
    o === "overflow" ? (w.maxWidth === "" && (w.maxWidth = "97vw"), w.maxHeight === "" && (w.maxHeight = "97vh")) : o === "horizontal" ? w.width === "" && (w.width = "97vw") : o === "vertical" ? w.height === "" && (w.height = "97vh") : o === "parentOverflow" ? (w.maxWidth === "" && (w.maxWidth = "100%"), w.maxHeight === "" && (w.maxHeight = "100%")) : o === "parentHorizontal" ? w.width === "" && (w.width = "100%") : o === "parentVertical" && w.height === "" && (w.height = "100%"), this.autoDrawing = f, f && (v.then(() => this.draw()), S.then(() => this.draw()), this.draw()), this.onDrawed ??= g, this.freeMode = p, this.record = [], this.uiControl = nt(this), this.enPassant = new ht();
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
        const i = (r) => r[0].map((o, h) => r.map((n) => n[h]));
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
    const o = Y[e].position[this.xLen][s];
    if (!o)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    o.forEach((h, n) => {
      if (h.length < this.xLen)
        throw Error(h.join(""));
      const a = n + this.yLen - o.length;
      [...h].forEach((c, l) => {
        if (!i[c])
          return;
        const m = i[c].clone(), d = this.field[a][l];
        m.center = d.center, m.middle = d.middle, d.piece = m;
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
    const { pieces: n } = this, a = o ? i : i * 90;
    typeof t == "string" && (t = new k(this.ctx, n[t], { displayPtn: r, deg: a, isMoved: h }));
    const c = this.field[s][e];
    t.center = c.center, t.middle = c.middle, c.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, h = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(k.degChars).map((a) => `
` + a + "持ち駒:")
    ).reduce(
      (a, c) => a.replace(new RegExp(c, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (a) => a.match(/.{2}/g)
    );
    for (let a = 0; a < r; a++)
      for (let c = 0; c < i; c++)
        try {
          const l = h[a][c], m = k.stringToPiece(s, l);
          m.center = e[a][c].center, m.middle = e[a][c].middle, e[a][c].piece = m;
        } catch {
          e[a][c].piece = null;
        }
    this.stand.clear();
    const n = h[r];
    n && n.forEach((a) => {
      const c = k.stringToPiece(s, a);
      c && this.stand.add(c);
    }), this.autoDrawing && this.draw();
  }
  /** 角度基準のパネルの行を取得する
   * @param {Panel} panel - パネル
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
  /** 角度基準のパネルの列を取得する
   * @param {Panel} panel - パネル
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
   * @param {Panel} panel - パネル
   */
  checkCanPromo(t) {
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: o } = s, [h, n] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((c) => e - c - (0 | this.promoLineOffset));
    let a;
    return this.sidePromo ? a = Math.max(
      ...Object.keys(k.degChars).map((c) => 0 | c).filter((c) => c !== o).map(
        (c) => this.getRow(i, r, c, 180)
      )
    ) : a = this.getRow(i, r, o), {
      canPromo: h <= a,
      forcePromo: n <= a
    };
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のパネル
   * @param {Panel} toPanel - 選択中のパネル
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
    const { piece: n } = e;
    n.center = e.center, n.middle = e.middle, n.isMoved = !0;
    const a = this.checkCanPromo(e);
    if (o ||= a.canPromo, h ||= a.forcePromo, r.setMoved(e), !n.promo || n.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [c, { name: l }] of Object.entries(n.promo))
        if (confirm(`成りますか?
	${n.char}:${n.name}
	　↓
	${c}:${l}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), n.promotion(c);
          return;
        }
    while (!i && h);
    this.addRecord(e, { fromPanel: t, end: "不成" });
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のパネル
   * @param {Panel} fromPanel - 移動元のパネル
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
      ({ to: s, from: i, deg: r, pieceChar: o, end: h }) => `${k.degChars[r]}${t(s)}${e(s)}${o}${h} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: o, panelWidth: h, panelHeight: n } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(h / 2, n / 2), t.strokeRect(0, 0, r - h, o - n), t.restore(), this.stand.draw(), this.field.forEach((a) => {
      a.forEach((c) => {
        c.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
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
      (n) => r + n.map(
        (a) => "" + (a.piece || a.toString(t))
      ).join(o) + r
    ).join(h) + i + this.stand.toString(t);
  }
}
export {
  J as Board,
  k as Piece,
  _ as boards,
  $ as canvasFont,
  F as canvasImage,
  at as gameSoft,
  Y as games
};
