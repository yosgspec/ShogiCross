const N = "./json/ShogiCross/";
async function L(l) {
  return await fetch(`${N}${l}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const $ = await L("canvasFont"), dt = await L("gameSoft"), Y = await L("games"), _ = await L("boards"), I = await L("panels"), D = await L("pieces"), q = await L("pieceRange"), G = await L("pieceCost"), V = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(I).map(({ displayText: l }) => l).join("") + Object.values(D).map(({ display: l }) => l ? l.join("") : "").join("")
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
    const l = "https://fonts.googleapis.com/css2?family=", t = V(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = $.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      $.fonts.map(async ([s, i]) => {
        const r = s.replace(/ /g, "+"), o = `${l}${r}:wght@${i}&text=${t}`, a = await fetch(o);
        if (!a.ok)
          return;
        const n = (await a.text()).match(/url\(.+?\)/g);
        if (!n)
          throw new Error("Not found font.");
        for (const h of n) {
          const d = new FontFace(`${s}${e}`, h);
          await d.load(), document.fonts.add(d);
        }
      })
    ).then((s) => this.imported = !0);
  }
});
function Q(l) {
  return new Promise((t) => {
    const e = new Image();
    e.src = l, e.onload = () => t(e);
  });
}
const Z = [...new Set(
  Object.values(I).flatMap(({ imgSrc: l }) => l ?? []).concat(Object.values(D).flatMap(({ imgSrc: l }) => l ?? []))
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
        Z.map(async (l) => {
          this.images[l] = await Q(l);
        })
      ).then((l) => this.imported = !0);
  }
}, tt = (l) => "image/" + l.replace("jpg", "jpeg");
function et(l, t = "image", e = "png") {
  return new Promise((s) => {
    l.toBlob((i) => {
      const r = document.createElement("a");
      return r.href = URL.createObjectURL(i), r.download = `${t}.${e}`, r.click(), URL.revokeObjectURL(r.href), s();
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
  constructor(t, e, s, i, r, o, a, c, n) {
    Object.assign(this, I[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = a, this.pX = c, this.pY = n, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: a, displayText: c, textRotate: n } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, a), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, a), t.moveTo(0, a / 2), t.lineTo(o, a / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, a), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, a)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, a)), t.closePath(), t.stroke(), t.restore(), c) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const h = n ? n * Math.PI / 180 : 0;
      t.rotate(h);
      const d = Math.min(this.width, this.height) * 0.6;
      t.font = `${d}px ${$.names}`;
      const m = t.measureText(c).width, f = d / 2 * 0.8;
      t.fillText(c, -m / 2, f), t.restore();
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
class v {
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
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(D))));
    for (const [r, o] of s)
      o.attr ??= [], o.unit && (o.base = o);
    for (const [r, o] of s) {
      if (!o.promo || typeof o.promo != "string")
        continue;
      const a = [...o.promo];
      o.promo = {};
      for (const c of a) {
        const n = s.get(c);
        n.attr.push("promoted"), n.unit = "成", o.promo[c] = n, s.set(c, { ...o, ...n });
      }
    }
    [...s].forEach(([r, o], a) => {
      o.id = a, o.char = r, s.set(r, new v(t, o, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, o] of s)
      o.alias.forEach((a, c) => {
        const n = o.clone(), h = [...n.display];
        n.displayPtn = c + 1, n.display = h, n.alias[c] = r, i[a] = n;
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
    const [s, i] = [...e], r = v.charDegs[s];
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
    return this.useRankSize && (t *= v.rankRatio[this.rank]), t;
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
    size: r = v.size,
    useRankSize: o = v.useRankSize,
    isDrawShadow: a = v.isDrawShadow,
    isMoved: c = !1
  } = {}) {
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = s, this.game = Y[this.gameName], this.cost = G[this.char] ?? 1, this.center = 0, this.middle = 0, this.deg = i, this.size = r, this.useRankSize = o, this.isDrawShadow = a, this.isRotateImg ??= !0, this.isMoved = c, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([n, h]) => {
        Array.isArray(h) || (this.range[n] = q[h].map((d) => [...d]));
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
    return new v(this.ctx, { ...this }, { displayPtn: t, deg: e, size: s, isMoved: i });
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
          const i = (r) => r[0].map((o, a) => r.map((c) => c[a]));
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
    e.save(), e.translate(0, 10 * t), this.drawMask("#00000066"), e.restore();
  }
  /** 駒を描写 */
  drawPiece() {
    const { ctx: t, game: e, zoom: s } = this;
    let i, r, o;
    this.hasAttr("promoted") ? (i = e.promoteFontColor ?? e.fontColor ?? "#000000", r = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", o = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (i = e.fontColor ?? "#000000", r = e.backgroundColor ?? "#FFFFFF", o = e.borderColor ?? "#777777"), t.strokeStyle = o, t.fillStyle = r, t.lineWidth = 8 * s, this.drawPieceShadow(s), t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = i;
    const a = [..."" + this.display[this.displayPtn]], c = 40 * s;
    t.font = `${c}px ${$.names}`, t.textAlign = "center", a.forEach((n, h) => {
      const d = a.length === 1 ? c / 2 : h * c;
      t.fillText(n, 0, d);
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
    return v.degChars[this.deg] + this.char;
  }
}
Object.entries(v.degChars).forEach(([l, t]) => {
  v.charDegs[t] = l;
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
for (let l = 1; l <= 9; l++)
  U.push(["" + l, { moves: l }]);
function nt(l) {
  const t = [];
  let e, s;
  for (let i = 0; i < l.length; i++)
    for (let r = 0; r < l[i].length; r++) {
      const o = l[i][r];
      for (let [a, { isOwn: c }] of rt)
        o === a && (t.push({ isOwn: c, oX: r, oY: i }), c && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function ct(l, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = l;
  function a(f, u) {
    return i[u] && i[u][f] && !i[u][f].hasAttr("keepOut");
  }
  function c(f, u, g, p = "", k = !0) {
    if (!i[g] || !i[g][u])
      return !1;
    const S = i[g][u];
    return !S || !o.isTarget(p, S, t) || t.hasAttr("inPalace") && !S.hasAttr("palace") || p.indexOf("palace") === 0 && !(S.hasAttr(p) && i[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= l.getRow(u, g, t.deg) ? !1 : f ? i[g][u].piece ? k ? t.deg !== i[g][u].piece.deg : !0 : !1 : !i[g][u].piece;
  }
  function n(f, u, g, p, k) {
    for (const S of u)
      for (let C = 0; C < f.length; C++)
        for (let y = 0; y < f[C].length; y++) {
          const [w, b] = [y + e - p, C + s - k];
          if (!(!a(w, b) || c(g, 0 | w, 0 | b, "", !1) || f[C][y] !== S))
            return !0;
        }
    return !1;
  }
  function h(f, u, g) {
    const p = i[g][u];
    p.isTarget = !0, o.setTarget(f, p, t);
  }
  function d(f, [u, { isAttack: g }], { oX: p, oY: k, isOwn: S }) {
    if (S)
      for (const [C, { child: y = [] } = {}] of ot)
        for (let w = 0; w < f.length; w++)
          for (let b = 0; b < f[w].length; b++) {
            const [x, j] = [b + e - p, w + s - k];
            !a(x, j) || !c(g, x, j, u) || f[w][b] !== C || n(f, y, !1, p, k) || h(u, x, j);
          }
  }
  function m(f, [u, { isAttack: g }], { oX: p, oY: k, isOwn: S, offsetX: C, offsetY: y }) {
    if (!(!S && !c(!1, e + C, s + y)))
      for (const [w, { jmps: b = 0, moves: x = 0 } = {}] of U) {
        const j = !x || x === 0;
        for (let R = k - 1; R <= k + 1; R++)
          for (let E = p - 1; E <= p + 1; E++) {
            if (f[R][E] !== w || E === p && R === k)
              continue;
            let O = b || 0, T = x || 0;
            const [J, K] = [E - p, R - k];
            for (let z = e, H = s; ; ) {
              z += J, H += K;
              const A = z + C, M = H + y;
              if (!a(A, M) || !j && T === 0)
                break;
              const P = O === 0;
              if (P && c(g, A, M, u, P) ? (T--, h(u, A, M)) : b < 1 && T--, i[M][A].piece && (O--, P))
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
        for (const k of nt(p))
          d(p, u, k), m(p, u, k);
    }
  })();
}
function ht(l) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = l, o = (h, d, m = () => {
  }) => {
    const f = window.getComputedStyle(r), u = h.target.getBoundingClientRect();
    let g = r.width / parseFloat(f.width), p = r.height / parseFloat(f.height);
    if (h.clientX)
      g *= h.clientX - u.left, p *= h.clientY - u.top;
    else if (0 < h.touches.length) {
      if (1 < h.touches.length)
        return;
      g *= h.touches[0].clientX - u.left, p *= h.touches[0].clientY - u.top;
    } else
      h.preventDefault(), [g, p] = e;
    l.field.forEach((k, S) => k.forEach((C, y) => d(C, g, p, y, S))), m(g, p), l.draw(), e = [g, p];
  }, a = (h) => {
    t = !0, o(
      h,
      (d, m, f) => {
        const { piece: u, pX: g, pY: p } = d;
        u && d.checkRangeMouse(m, f) && (h.preventDefault(), u.isSelected = !0, s = d, ct(l, u, g, p));
      },
      (d, m) => {
        for (const [f, u] of Object.entries(l.stand.stocks))
          for (let g = u.length - 1; 0 <= g; g--)
            if (u[g].checkRangeMouse(d, m)) {
              h.preventDefault(), u[g].isSelected = !0, i = { deg: f, i: g };
              return;
            }
      }
    );
  }, c = (h) => {
    !t || !(s || i) || o(
      h,
      (d, m, f) => {
        d.isSelected = d.checkRangeMouse(m, f);
      }
    );
  }, n = (h) => {
    t = !1, o(
      h,
      (d, m, f) => {
        d.checkRangeMouse(m, f) && (s && l.movePiece(s, d), i && !d.piece && l.stand.releasePiece(d, i));
      }
    ), o(
      h,
      (d) => {
        d.piece && (d.piece.isSelected = !1), d.isSelected = !1, d.isTarget = !1;
      },
      () => {
        for (const [d, m] of Object.entries(l.stand.stocks))
          for (let f = m.length - 1; 0 <= f; f--)
            m[f].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", a), r.addEventListener("mousemove", c), r.addEventListener("mouseup", n), r.addEventListener("touchstart", a), r.addEventListener("touchmove", c), r.addEventListener("touchend", n), {
    removeEvent() {
      r.removeEventListener("mousedown", a), r.removeEventListener("mousemove", c), r.removeEventListener("mouseup", n), r.removeEventListener("touchstart", a), r.removeEventListener("touchmove", c), r.removeEventListener("touchend", n);
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
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: a, panelHeight: c, xLen: n, yLen: h } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = a / 2, this.pitchHeight = c, this.xLen = n, this.yLen = h;
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
    const e = this.stocks[W.degId[t.deg]];
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
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: a } = this, { ctx: c, xLen: n, yLen: h } = t;
    c.fillStyle = t.backgroundColor, c.strokeStyle = t.borderColor, c.lineWidth = t.borderWidth, c.save(), c.translate(e, s), c.fillRect(0, 0, i, r), c.strokeRect(0, 0, i, r), c.restore(), this.stocks.forEach((d, m) => {
      let f = 0;
      d = d.slice(-h / 4 * n);
      for (let u = 0 | h / 4 * m; u < h / 4 * (m + 1); u++)
        for (let g = 0; g < n; g++) {
          const p = e + o * (g + 1), k = s + a * (u + 1), S = d[f++];
          if (S == null)
            break;
          S.center = p, S.middle = k, S.draw();
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
      for (const o of Object.values(v.degChars))
        r = r.replace(o, `
${o}持ち駒:${o}`);
    }
    return i + r;
  }
}
const at = Object.keys(v.degChars), X = () => ({
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
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: c }, n) => 1 < n && c) ? 4 : 2, a = new B(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: c, pieceSet: n }, h) => {
      if (c) {
        n ??= "default";
        try {
          a.putStartPieces(h, c, n);
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
   * @param {number} panelWidth - パネル幅
   * @param {number} panelHeight - パネル高さ
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
    boardTop: c = 5,
    panelWidth: n = 50,
    panelHeight: h = 0 | n * 1.1,
    pieceSize: d = 0 | n * 0.9,
    borderWidth: m = Math.max(n, h) / 30,
    useStand: f = !1,
    backgroundColor: u = "#00000000",
    autoDrawing: g = !0,
    onDrawed: p,
    freeMode: k = !1
  } = {}) {
    const S = $.importAsync(), C = F.importAsync();
    this.canvas = t;
    const y = t.getContext("2d");
    if (y.clearRect(0, 0, t.width, t.height), this.ctx = y, this.pieces = v.getPieces(y), Object.assign(this, _[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = a, this.top = c, this.panelWidth = n, this.panelHeight = h, this.borderWidth = m, this.pieceSize = d, this.canvasBackgroundColor = u, this.field = this.field.map(
      (b, x) => [...b].map((j, R) => {
        const E = a + n * (R + 1), O = c + h * (x + 1);
        return new st(y, j, E, O, n, h, m, R, x);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = a + this.width, this.bottom = c + this.height, this.stand = new W(this), t.width = i ?? (f ? this.stand.right : this.right) + 5, t.height = r ?? this.bottom + 5;
    const { style: w } = t;
    o === "overflow" ? (w.maxWidth === "" && (w.maxWidth = "97vw"), w.maxHeight === "" && (w.maxHeight = "97vh")) : o === "horizontal" ? w.width === "" && (w.width = "97vw") : o === "vertical" ? w.height === "" && (w.height = "97vh") : o === "parentOverflow" ? (w.maxWidth === "" && (w.maxWidth = "100%"), w.maxHeight === "" && (w.maxHeight = "100%")) : o === "parentHorizontal" ? w.width === "" && (w.width = "100%") : o === "parentVertical" && w.height === "" && (w.height = "100%"), this.autoDrawing = g, g && (S.then(() => this.draw()), C.then(() => this.draw()), this.draw()), this.onDrawed ??= p, this.freeMode = k, this.record = [], this.uiControl = ht(this), this.enPassant = new lt();
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
        const i = (r) => r[0].map((o, a) => r.map((c) => c[a]));
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
    o.forEach((a, c) => {
      if (a.length < this.xLen)
        throw Error(a.join(""));
      const n = c + this.yLen - o.length;
      [...a].forEach((h, d) => {
        if (!i[h])
          return;
        const m = i[h].clone(), f = this.field[n][d];
        m.center = f.center, m.middle = f.middle, f.piece = m;
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
    const { pieces: c } = this, n = o ? i : i * 90;
    typeof t == "string" && (t = new v(this.ctx, c[t], { displayPtn: r, deg: n, isMoved: a }));
    const h = this.field[s][e];
    t.center = h.center, t.middle = h.middle, h.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, a = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(v.degChars).map((n) => `
` + n + "持ち駒:")
    ).reduce(
      (n, h) => n.replace(new RegExp(h, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (n) => n.match(/.{2}/g)
    );
    for (let n = 0; n < r; n++)
      for (let h = 0; h < i; h++)
        try {
          const d = a[n][h], m = v.stringToPiece(s, d);
          m.center = e[n][h].center, m.middle = e[n][h].middle, e[n][h].piece = m;
        } catch {
          e[n][h].piece = null;
        }
    this.stand.clear();
    const c = a[r];
    c && c.forEach((n) => {
      const h = v.stringToPiece(s, n);
      h && this.stand.add(h);
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
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: o } = s, [a, c] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((h) => e - h - (0 | this.promoLineOffset));
    let n;
    return this.sidePromo ? n = Math.max(
      ...Object.keys(v.degChars).map((h) => 0 | h).filter((h) => h !== o).map(
        (h) => this.getRow(i, r, h, 180)
      )
    ) : n = this.getRow(i, r, o), {
      canPromo: a <= n,
      forcePromo: c <= n
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
    let { canPromo: o, forcePromo: a } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: c } = e;
    c.center = e.center, c.middle = e.middle, c.isMoved = !0;
    const n = this.checkCanPromo(e);
    if (o ||= n.canPromo, a ||= n.forcePromo, r.setMoved(e), !c.promo || c.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [h, { name: d }] of Object.entries(c.promo))
        if (confirm(`成りますか?
	${c.char}:${c.name}
	　↓
	${h}:${d}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), c.promotion(h);
          return;
        }
    while (!i && a);
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
      ({ to: s, from: i, deg: r, pieceChar: o, end: a }) => `${v.degChars[r]}${t(s)}${e(s)}${o}${a} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: o, panelWidth: a, panelHeight: c } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(a / 2, c / 2), t.strokeRect(0, 0, r - a, o - c), t.restore(), this.stand.draw(), this.field.forEach((n) => {
      n.forEach((h) => {
        h.draw();
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
      (c) => r + c.map(
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
    await et(this.canvas, t, e);
  }
}
export {
  B as Board,
  v as Piece,
  _ as boards,
  $ as canvasFont,
  F as canvasImage,
  dt as gameSoft,
  Y as games
};
