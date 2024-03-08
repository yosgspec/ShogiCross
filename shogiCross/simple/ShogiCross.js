const N = "./json/ShogiCross/";
async function L(d) {
  return await fetch(`${N}${d}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const $ = await L("canvasFont"), dt = await L("gameSoft"), Y = await L("games"), _ = await L("boards"), I = await L("panels"), D = await L("pieces"), q = await L("pieceRange"), G = await L("pieceCost"), V = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(I).map(({ displayText: d }) => d).join("") + Object.values(D).map(({ display: d }) => d ? d.join("") : "").join("")
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
    const d = "https://fonts.googleapis.com/css2?family=", t = V(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = $.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      $.fonts.map(async ([s, r]) => {
        const i = s.replace(/ /g, "+"), o = `${d}${i}:wght@${r}&text=${t}`, h = await fetch(o);
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
function Q(d) {
  return new Promise((t) => {
    const e = new Image();
    e.src = d, e.onload = () => t(e);
  });
}
const Z = [...new Set(
  Object.values(I).flatMap(({ imgSrc: d }) => d ?? []).concat(Object.values(D).flatMap(({ imgSrc: d }) => d ?? []))
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
        Z.map(async (d) => {
          this.images[d] = await Q(d);
        })
      ).then((d) => this.imported = !0);
  }
}, tt = (d) => "image/" + d.replace("jpg", "jpeg");
function et(d, t = "image", e = "png") {
  return new Promise((s) => {
    d.toBlob((r) => {
      const i = document.createElement("a");
      return i.href = URL.createObjectURL(r), i.download = `${t}.${e}`, i.click(), URL.revokeObjectURL(i.href), s();
    }, tt(e));
  });
}
class st {
  #t;
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {string} char - マス目を示す文字
   * @param {number} center - 描写するX座標(中心原点)
   * @param {number} middle - 描写するY座標(中心原点)
   * @param {number} width - パネル幅
   * @param {number} height - パネル高さ
   * @param {number} borderWidth - 枠線の太さ
   * @param {number} pX - ボード上の横方向マス数
   * @param {number} pY - ボード上の縦方向マス数
   */
  constructor(t, e, s, r, i, o, h, n, a) {
    Object.assign(this, I[e]), this.ctx = t, this.center = s, this.middle = r, this.width = i, this.height = o, this.left = s - i / 2, this.top = r - o / 2, this.right = s + i / 2, this.bottom = r + o / 2, this.borderWidth = h, this.pX = n, this.pY = a, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: r, middle: i, width: o, height: h, displayText: n, textRotate: a } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, h), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, h), t.moveTo(0, h / 2), t.lineTo(o, h / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, h), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, h)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, h)), t.closePath(), t.stroke(), t.restore(), n) {
      t.save(), t.translate(r, i), t.fillStyle = this.borderColor;
      const c = a ? a * Math.PI / 180 : 0;
      t.rotate(c);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${$.names}`;
      const m = t.measureText(n).width, f = l / 2 * 0.8;
      t.fillText(n, -m / 2, f), t.restore();
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
    const e = new Map(Object.entries(JSON.parse(JSON.stringify(D))));
    for (const [r, i] of e)
      i.attr ??= [], i.unit && (i.base = i);
    for (const [r, i] of e) {
      if (!i.promo || typeof i.promo != "string")
        continue;
      const o = [...i.promo];
      i.promo = {};
      for (const h of o) {
        const n = e.get(h);
        n.attr.push("promoted"), n.unit = "成", i.promo[h] = n, e.set(h, { ...i, ...n });
      }
    }
    [...e].forEach(([r, i], o) => {
      i.id = o, i.char = r, e.set(r, new k(t, i));
    });
    const s = Object.fromEntries(e);
    for (const [r, i] of e)
      i.alias.forEach((o, h) => {
        const n = i.clone(), a = [...n.display];
        n.displayPtn = h + 1, n.display = a, n.alias[h] = r, s[o] = n;
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
    const [s, r] = [...e], i = k.charDegs[s];
    if (!i)
      return null;
    const o = t[r].clone();
    return o.deg = i, o;
  }
  /** 駒の一覧をリストで取得 */
  static piecesToList(t) {
    return Object.entries(t).sort(([e, { id: s }], [r, { id: i }]) => Math.sign(s - i));
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
    deg: r = 0,
    size: i = k.size,
    useRankSize: o = k.useRankSize,
    isDrawShadow: h = k.isDrawShadow,
    isMoved: n = !1
  } = {}) {
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = s, this.game = Y[this.gameName], this.cost = G[this.char] ?? 1, this.center = 0, this.middle = 0, this.size = i, this.deg = r, this.useRankSize = o, this.isDrawShadow = h, this.isRotateImg ??= !0, this.isMoved = n, this.isSelected = !1, this.attr ??= [];
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
    const { displayPtn: t, deg: e, size: s, isMoved: r } = this;
    return new k(this.ctx, { ...this }, { displayPtn: t, deg: e, size: s, isMoved: r });
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
          const r = (i) => i[0].map((o, h) => i.map((n) => n[h]));
          e[s] = r(e[s]);
        }
        [180, 270].includes(t) && e[s].reverse(), e[s].forEach((r) => {
          [90, 180].includes(t) && r.reverse();
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
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], r = F.images[s];
    if (!r)
      return;
    t.save(), t.translate(this.center, this.middle), this.isRotateImg && t.rotate(this.rad);
    let i, o;
    r.width * 0.9 < r.height ? (i = r.width / r.height * e, o = e) : (i = e, o = r.height / r.width * e), t.drawImage(r, -i / 2, -o / 2, i, o), t.restore();
  }
  /** 駒画像にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMaskImage(t) {
    const { ctx: e, size: s } = this;
    e.fillStyle = t, e.save();
    const r = s * 0.9, i = s;
    e.translate(this.center, this.middle), e.fillRect(-r / 2, -i / 2, r, i), e.restore();
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
    let r, i, o;
    this.hasAttr("promoted") ? (r = e.promoteFontColor ?? e.fontColor ?? "#000000", i = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", o = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (r = e.fontColor ?? "#000000", i = e.backgroundColor ?? "#FFFFFF", o = e.borderColor ?? "#777777"), t.strokeStyle = o, t.fillStyle = i, t.lineWidth = 8 * s, this.drawPieceShadow(s), t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = r;
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
Object.entries(k.degChars).forEach(([d, t]) => {
  k.charDegs[t] = d;
});
const it = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], rt = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], ot = [
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
], U = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let d = 1; d <= 9; d++)
  U.push(["" + d, { moves: d }]);
function nt(d) {
  const t = [];
  let e, s;
  for (let r = 0; r < d.length; r++)
    for (let i = 0; i < d[r].length; i++) {
      const o = d[r][i];
      for (let [h, { isOwn: n }] of rt)
        o === h && (t.push({ isOwn: n, oX: i, oY: r }), n && ([e, s] = [i, r]));
    }
  return t.map((r) => (r.offsetX = r.oX - e, r.offsetY = r.oY - s, r));
}
function ct(d, t, e, s) {
  const { field: r, yLen: i, enPassant: o } = d;
  function h(f, u) {
    return r[u] && r[u][f] && !r[u][f].hasAttr("keepOut");
  }
  function n(f, u, g, p = "", v = !0) {
    if (!r[g] || !r[g][u])
      return !1;
    const S = r[g][u];
    return !S || !o.isTarget(p, S, t) || t.hasAttr("inPalace") && !S.hasAttr("palace") || p.indexOf("palace") === 0 && !(S.hasAttr(p) && r[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && i - (0 | i / 2) <= d.getRow(u, g, t.deg) ? !1 : f ? r[g][u].piece ? v ? t.deg !== r[g][u].piece.deg : !0 : !1 : !r[g][u].piece;
  }
  function a(f, u, g, p, v) {
    for (const S of u)
      for (let C = 0; C < f.length; C++)
        for (let y = 0; y < f[C].length; y++) {
          const [w, b] = [y + e - p, C + s - v];
          if (!(!h(w, b) || n(g, 0 | w, 0 | b, "", !1) || f[C][y] !== S))
            return !0;
        }
    return !1;
  }
  function c(f, u, g) {
    const p = r[g][u];
    p.isTarget = !0, o.setTarget(f, p, t);
  }
  function l(f, [u, { isAttack: g }], { oX: p, oY: v, isOwn: S }) {
    if (S)
      for (const [C, { child: y = [] } = {}] of ot)
        for (let w = 0; w < f.length; w++)
          for (let b = 0; b < f[w].length; b++) {
            const [x, j] = [b + e - p, w + s - v];
            !h(x, j) || !n(g, x, j, u) || f[w][b] !== C || a(f, y, !1, p, v) || c(u, x, j);
          }
  }
  function m(f, [u, { isAttack: g }], { oX: p, oY: v, isOwn: S, offsetX: C, offsetY: y }) {
    if (!(!S && !n(!1, e + C, s + y)))
      for (const [w, { jmps: b = 0, moves: x = 0 } = {}] of U) {
        const j = !x || x === 0;
        for (let R = v - 1; R <= v + 1; R++)
          for (let E = p - 1; E <= p + 1; E++) {
            if (f[R][E] !== w || E === p && R === v)
              continue;
            let O = b || 0, T = x || 0;
            const [J, K] = [E - p, R - v];
            for (let z = e, H = s; ; ) {
              z += J, H += K;
              const A = z + C, M = H + y;
              if (!h(A, M) || !j && T === 0)
                break;
              const P = O === 0;
              if (P && n(g, A, M, u, P) ? (T--, c(u, A, M)) : b < 1 && T--, r[M][A].piece && (O--, P))
                break;
            }
          }
      }
  }
  (function() {
    const f = t.getRange();
    f.attack ??= f.default;
    for (const u of it) {
      const g = u[0];
      if (t.isMoved && ["start", "castling"].includes(g))
        continue;
      const p = f[g];
      if (p)
        for (const v of nt(p))
          l(p, u, v), m(p, u, v);
    }
  })();
}
function ht(d) {
  let t = !1, e = [], s = null, r = null;
  const { canvas: i } = d, o = (c, l, m = () => {
  }) => {
    const f = window.getComputedStyle(i), u = c.target.getBoundingClientRect();
    let g = i.width / parseFloat(f.width), p = i.height / parseFloat(f.height);
    if (c.clientX)
      g *= c.clientX - u.left, p *= c.clientY - u.top;
    else if (0 < c.touches.length) {
      if (1 < c.touches.length)
        return;
      g *= c.touches[0].clientX - u.left, p *= c.touches[0].clientY - u.top;
    } else
      c.preventDefault(), [g, p] = e;
    d.field.forEach((v, S) => v.forEach((C, y) => l(C, g, p, y, S))), m(g, p), d.draw(), e = [g, p];
  }, h = (c) => {
    t = !0, o(
      c,
      (l, m, f) => {
        const { piece: u, pX: g, pY: p } = l;
        u && l.checkRangeMouse(m, f) && (c.preventDefault(), u.isSelected = !0, s = l, ct(d, u, g, p));
      },
      (l, m) => {
        for (const [f, u] of Object.entries(d.stand.stocks))
          for (let g = u.length - 1; 0 <= g; g--)
            if (u[g].checkRangeMouse(l, m)) {
              c.preventDefault(), u[g].isSelected = !0, r = { deg: f, i: g };
              return;
            }
      }
    );
  }, n = (c) => {
    !t || !(s || r) || o(
      c,
      (l, m, f) => {
        l.isSelected = l.checkRangeMouse(m, f);
      }
    );
  }, a = (c) => {
    t = !1, o(
      c,
      (l, m, f) => {
        l.checkRangeMouse(m, f) && (s && d.movePiece(s, l), r && !l.piece && d.stand.releasePiece(l, r));
      }
    ), o(
      c,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.isTarget = !1;
      },
      () => {
        for (const [l, m] of Object.entries(d.stand.stocks))
          for (let f = m.length - 1; 0 <= f; f--)
            m[f].isSelected = !1;
        s = null, r = null;
      }
    );
  };
  return i.addEventListener("mousedown", h), i.addEventListener("mousemove", n), i.addEventListener("mouseup", a), i.addEventListener("touchstart", h), i.addEventListener("touchmove", n), i.addEventListener("touchend", a), {
    removeEvent() {
      i.removeEventListener("mousedown", h), i.removeEventListener("mousemove", n), i.removeEventListener("mouseup", a), i.removeEventListener("touchstart", h), i.removeEventListener("touchmove", n), i.removeEventListener("touchend", a);
    }
  };
}
class W {
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
    const { top: e, right: s, bottom: r, width: i, height: o, panelWidth: h, panelHeight: n, xLen: a, yLen: c } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = i / 2, this.height = o, this.right = this.left + this.width, this.bottom = r, this.pitchWidth = h / 2, this.pitchHeight = n, this.xLen = a, this.yLen = c;
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
    const { board: r } = this, i = this.stocks[e];
    t.piece = i[s], i[s].center = t.center, i[s].middle = t.middle, r.addRecord(t, { end: "打" }), i.splice(s, 1);
  }
  /** 駒台に追加する
   * @param {Piece} piece - 追加する駒
   */
  add(t) {
    const e = this.stocks[W.degId[t.deg]];
    t.turnFront(), e.push(t), e.sort((s, r) => Math.sign(s.id - r.id));
  }
  /** 駒を持ち駒にする
   * @param {Piece|null} winnerPiece - 移動する駒
   * @param {Piece} loserPiece - 捕縛される駒
   */
  capturePiece(t, e, s = !1, r = !1) {
    r || !e || !(s || t.hasAttr("capture")) || e.hasAttr("king") || e.hasAttr("cantCapture") || (e.deg = t.deg, e.isMoved = !0, this.add(e));
  }
  /** 盤を描写 */
  draw() {
    const { board: t, left: e, top: s, width: r, height: i, pitchWidth: o, pitchHeight: h } = this, { ctx: n, xLen: a, yLen: c } = t;
    n.fillStyle = t.backgroundColor, n.strokeStyle = t.borderColor, n.lineWidth = t.borderWidth, n.save(), n.translate(e, s), n.fillRect(0, 0, r, i), n.strokeRect(0, 0, r, i), n.restore(), this.stocks.forEach((l, m) => {
      let f = 0;
      l = l.slice(-c / 4 * a);
      for (let u = 0 | c / 4 * m; u < c / 4 * (m + 1); u++)
        for (let g = 0; g < a; g++) {
          const p = e + o * (g + 1), v = s + h * (u + 1), S = l[f++];
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
    let r = 0 < s.length ? `
` + "―".repeat(e * 2) + `
` : "", i = s.map((o) => "" + o).join("");
    if (!t) {
      r = "";
      for (const o of Object.values(k.degChars))
        i = i.replace(o, `
${o}持ち駒:${o}`);
    }
    return r + i;
  }
}
const at = Object.keys(k.degChars), X = () => ({
  panel: null,
  piece: null
});
class lt {
  constructor() {
    this.degs = {}, at.forEach((t) => this.degs[t] = X());
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
class B {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas
   * @param {Object<string, any>} options - オプション
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: r, onDrawed: i } = e, o = r.some(({ gameName: n }, a) => 1 < a && n) ? 4 : 2, h = new B(t, s, {
      ...e,
      players: o,
      onDrawed: i
    });
    return r.forEach(({ gameName: n, pieceSet: a }, c) => {
      if (n) {
        a ??= "default";
        try {
          h.putStartPieces(c, n, a);
        } catch {
        }
      }
    }), h.onDrawed = i, h;
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
   * @panal {number} borderWidth - 枠線太さ
   * @param {boolean} useStand - 駒台の使用有無
   * @param {string} backgroundColor - 背景色(デフォルト無職)
   * @param {boolean} autoDrawing - 描写の自動更新有無
   * @param {(Board)=>void} onDrawed - 描写イベント
   * @param {boolean} freeMode - フリーモード有効化/無効化
   */
  constructor(t, e, {
    players: s = 2,
    canvasWidth: r = void 0,
    canvasHeight: i = void 0,
    canvasFit: o = "overflow",
    boardLeft: h = 5,
    boardTop: n = 5,
    panelWidth: a = 50,
    panelHeight: c = 0 | a * 1.1,
    pieceSize: l = 0 | a * 0.9,
    borderWidth: m = Math.max(a, c) / 30,
    useStand: f = !1,
    backgroundColor: u = "#00000000",
    autoDrawing: g = !0,
    onDrawed: p,
    freeMode: v = !1
  } = {}) {
    const S = $.importAsync(), C = F.importAsync();
    this.canvas = t;
    const y = t.getContext("2d");
    if (y.clearRect(0, 0, t.width, t.height), this.ctx = y, k.size = l, this.pieces = k.getPieces(y, l), Object.assign(this, _[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = h, this.top = n, this.panelWidth = a, this.panelHeight = c, this.borderWidth = m, this.pieceSize = l, this.canvasBackgroundColor = u, this.field = this.field.map(
      (b, x) => [...b].map((j, R) => {
        const E = h + a * (R + 1), O = n + c * (x + 1);
        return new st(y, j, E, O, a, c, m, R, x);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = h + this.width, this.bottom = n + this.height, this.stand = new W(this), t.width = r ?? (f ? this.stand.right : this.right) + 5, t.height = i ?? this.bottom + 5;
    const { style: w } = t;
    o === "overflow" ? (w.maxWidth === "" && (w.maxWidth = "97vw"), w.maxHeight === "" && (w.maxHeight = "97vh")) : o === "horizontal" ? w.width === "" && (w.width = "97vw") : o === "vertical" ? w.height === "" && (w.height = "97vh") : o === "parentOverflow" ? (w.maxWidth === "" && (w.maxWidth = "100%"), w.maxHeight === "" && (w.maxHeight = "100%")) : o === "parentHorizontal" ? w.width === "" && (w.width = "100%") : o === "parentVertical" && w.height === "" && (w.height = "100%"), this.autoDrawing = g, g && (S.then(() => this.draw()), C.then(() => this.draw()), this.draw()), this.onDrawed ??= p, this.freeMode = v, this.record = [], this.uiControl = ht(this), this.enPassant = new lt();
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
        const r = (i) => i[0].map((o, h) => i.map((n) => n[h]));
        if (e !== s)
          throw Error(`cols=${e} != rows=${s}, Not rows = cols.`);
        this.field = r(this.field);
      }
      [180, 270].includes(t) && this.field.reverse(), this.field.forEach((r) => {
        r.forEach((i) => {
          i.piece && (i.piece.deg += t);
        }), [90, 180].includes(t) && r.reverse();
      });
    }
  }
  /** 駒の初期配置
   * {number} playerId - プレイヤー番号
   * {string} gameName - 駒の配置セット
   * {string} pieceSet - 駒の配置パターン変更
   */
  putStartPieces(t, e, s = "default") {
    const { pieces: r } = this, i = 0 | t * 360 / this.players;
    this.rotateField(i);
    const o = Y[e].position[this.xLen][s];
    if (!o)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    o.forEach((h, n) => {
      if (h.length < this.xLen)
        throw Error(h.join(""));
      const a = n + this.yLen - o.length;
      [...h].forEach((c, l) => {
        if (!r[c])
          return;
        const m = r[c].clone(), f = this.field[a][l];
        m.center = f.center, m.middle = f.middle, f.piece = m;
      });
    }), this.rotateField(-i), this.autoDrawing && this.draw();
  }
  /** 駒の配置
   * @param {string} piece - 駒の表現文字
   * @param {number} pX - X方向配置位置(マス目基準)
   * @param {number} pY - Y方向配置位置(マス目基準)
   * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
   * @param {number} displayPtn - 表示文字列を変更(1〜)
   * @param {boolean} isMoved - 初回移動済みか否か
   */
  putNewPiece(t, e, s, r, { displayPtn: i = 0, setDeg: o = !1, isMoved: h = !1 } = {}) {
    const { pieces: n } = this, a = o ? r : r * 90;
    typeof t == "string" && (t = new k(this.ctx, n[t], { displayPtn: i, deg: a, isMoved: h }));
    const c = this.field[s][e];
    t.center = c.center, t.middle = c.middle, c.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: r, yLen: i } = this, h = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(k.degChars).map((a) => `
` + a + "持ち駒:")
    ).reduce(
      (a, c) => a.replace(new RegExp(c, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (a) => a.match(/.{2}/g)
    );
    for (let a = 0; a < i; a++)
      for (let c = 0; c < r; c++)
        try {
          const l = h[a][c], m = k.stringToPiece(s, l);
          m.center = e[a][c].center, m.middle = e[a][c].middle, e[a][c].piece = m;
        } catch {
          e[a][c].piece = null;
        }
    this.stand.clear();
    const n = h[i];
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
  getRow(t, e, s, r = 0) {
    const { xLen: i, yLen: o } = this;
    s += r;
    do
      s = (s + 360) % 360;
    while (s < 0);
    return s === 0 ? o - 1 - e : s === 90 ? t : s === 180 ? e : s === 270 ? i - 1 - t : -1;
  }
  /** 角度基準のパネルの列を取得する
   * @param {Panel} panel - パネル
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(t, e, s, r = 0) {
    const { xLen: i, yLen: o } = this;
    s += r;
    do
      s = (s + 360) % 360;
    while (s < 0);
    return s === 0 ? t : s === 90 ? o - 1 - e : s === 180 ? i - 1 - t : s === 270 ? e : -1;
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - パネル
   */
  checkCanPromo(t) {
    const { yLen: e } = this, { piece: s, pX: r, pY: i } = t, { deg: o } = s, [h, n] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((c) => e - c - (0 | this.promoLineOffset));
    let a;
    return this.sidePromo ? a = Math.max(
      ...Object.keys(k.degChars).map((c) => 0 | c).filter((c) => c !== o).map(
        (c) => this.getRow(r, i, c, 180)
      )
    ) : a = this.getRow(r, i, o), {
      canPromo: h <= a,
      forcePromo: n <= a
    };
  }
  /** 駒を移動
   * @param {Panel} fromPanel - 移動元のパネル
   * @param {Panel} toPanel - 選択中のパネル
   */
  movePiece(t, e) {
    const { stand: s, freeMode: r, enPassant: i } = this;
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
    if (o ||= a.canPromo, h ||= a.forcePromo, i.setMoved(e), !n.promo || n.hasAttr("promoted") || !o) {
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
    while (!r && h);
    this.addRecord(e, { fromPanel: t, end: "不成" });
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のパネル
   * @param {Panel} fromPanel - 移動元のパネル
   * @param {string} end - オプション=成|不成|打
   */
  addRecord(t, { fromPanel: e, end: s = "" } = {}) {
    const { piece: r } = t;
    this.record.push({
      to: {
        pX: t.pX,
        pY: t.pY
      },
      from: {
        pX: e?.pX,
        pY: e?.pY
      },
      deg: r.deg,
      pieceChar: r.char,
      end: s
    });
  }
  /** 棋譜をテキストで取得
   * @returns {string}
   */
  getTextRecord() {
    const t = ({ pX: s }) => s == null ? "*" : (this.xLen - s).toString(36), e = ({ pY: s }) => s == null ? "*" : (s + 1).toString(36);
    return this.record.map(
      ({ to: s, from: r, deg: i, pieceChar: o, end: h }) => `${k.degChars[i]}${t(s)}${e(s)}${o}${h} (${t(r)}${e(r)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: r, width: i, height: o, panelWidth: h, panelHeight: n } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, r), t.fillRect(0, 0, i, o), t.strokeRect(0, 0, i, o), t.translate(h / 2, n / 2), t.strokeRect(0, 0, i - h, o - n), t.restore(), this.stand.draw(), this.field.forEach((a) => {
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
    let s = "", r = "", i = "", o = "", h = `
`;
    return t || (s = `┏${Array(e).fill("━━").join("┯")}┓
`, r = `
┗${Array(e).fill("━━").join("┷")}┛`, i = "┃", o = "│", h = `
┠${Array(e).fill("──").join("┼")}┨
`), s + this.field.map(
      (n) => i + n.map(
        (a) => "" + (a.piece || a.toString(t))
      ).join(o) + i
    ).join(h) + r + this.stand.toString(t);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(t, e) {
    await et(this.canvas, t, e);
  }
}
export {
  B as Board,
  k as Piece,
  _ as boards,
  $ as canvasFont,
  F as canvasImage,
  dt as gameSoft,
  Y as games
};
