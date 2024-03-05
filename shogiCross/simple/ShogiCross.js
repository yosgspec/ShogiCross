const _ = "./json/ShogiCross/";
async function E(p) {
  return await fetch(`${_}${p}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const R = await E("canvasFont"), ct = await E("gameSoft"), z = await E("games"), q = await E("boards"), H = await E("panels"), B = await E("pieces"), G = await E("pieceRange"), D = await E("pieceCost");
let X = !1;
const Q = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(H).map(({ displayText: p }) => p).join("") + Object.values(B).map(({ display: p }) => p ? p.join("") : "").join("")
  ])
].sort().join("");
Object.assign(R, {
  /** 読み込むフォントの一覧(","区切り)
   * @type {string}
   */
  names: "",
  /** フォントの読み込み
   * @returns {Promise<void>}
   */
  async importAsync() {
    if (X)
      return;
    const p = "https://fonts.googleapis.com/css2?family=", t = Q(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = R.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      R.fonts.map(async ([s, r]) => {
        const i = s.replace(/ /g, "+"), o = `${p}${i}:wght@${r}&text=${t}`, c = await fetch(o);
        if (!c.ok)
          return;
        const a = (await c.text()).match(/url\(.+?\)/g);
        if (!a)
          throw new Error("Not found font.");
        for (const h of a) {
          const l = new FontFace(`${s}${e}`, h);
          await l.load(), document.fonts.add(l);
        }
      })
    ).then((s) => X = !0);
  }
});
class V {
  #t;
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Object<string, any>} panel - マス目
   * @param {number} center - 描写するX座標(中心原点)
   * @param {number} middle - 描写するY座標(中心原点)
   * @param {number} width - パネル幅
   * @param {number} height - パネル高さ
   */
  constructor(t, e, s, r, i, o, c, n, a) {
    Object.assign(this, H[e]), this.ctx = t, this.center = s, this.middle = r, this.width = i, this.height = o, this.left = s - i / 2, this.top = r - o / 2, this.right = s + i / 2, this.bottom = r + o / 2, this.borderWidth = c, this.pX = n, this.pY = a, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: r, middle: i, width: o, height: c, displayText: n, textRotate: a } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, c), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, c), t.moveTo(0, c / 2), t.lineTo(o, c / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, c), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, c)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, c)), t.closePath(), t.stroke(), t.restore(), n) {
      t.save(), t.translate(r, i), t.fillStyle = this.borderColor;
      const h = a ? a * Math.PI / 180 : 0;
      t.rotate(h);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${R.names}`;
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
  /** 描写サイズ */
  static size = 45;
  /** テキスト出力時のプレイヤー表示 */
  static degChars = {
    0: "▲",
    90: "≫",
    180: "▽",
    270: "＜"
  };
  /** プレイヤー表示から角度を取得 */
  static charDegs = {};
  /** 駒データを初期化
   * @param {any} ctx - Canvas描画コンテキスト
   */
  static getPieces(t) {
    const e = new Map(Object.entries(JSON.parse(JSON.stringify(B))));
    for (const [r, i] of e)
      i.display ??= [], i.alias ??= "", i.alias = [...i.alias], i.attr ??= [], i.img ??= null, i.unit && (i.base = i), D[r] && (i.cost = D[r]), Object.entries(i.range).forEach(([o, c]) => {
        i.range[o] = G[c];
      });
    for (const [r, i] of e) {
      if (!i.promo || typeof i.promo != "string")
        continue;
      const o = [...i.promo];
      i.promo = {};
      for (const c of o) {
        const n = e.get(c);
        n.attr.push("promoted"), n.unit = "成", i.promo[c] = n, e.set(c, { ...i, ...n });
      }
    }
    [...e].forEach(([r, i], o) => {
      i.id = o, i.char = r, e.set(r, new k(t, i));
    });
    const s = Object.fromEntries(e);
    for (const [r, i] of e)
      i.alias.forEach((o, c) => {
        const n = i.clone(), a = [...n.display];
        n.displayPtn = c + 1, n.display = a, n.alias[c] = r, s[o] = n;
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
  // サイズ変更設定値
  static sizes = {
    KR: 1,
    SR: 0.975,
    R: 0.95,
    UC: 0.925,
    C: 0.9
  };
  get rare() {
    return this.cost <= 0 ? "KR" : 24 <= this.cost ? "SR" : 12 <= this.cost ? "R" : 5 <= this.cost ? "UC" : "C";
  }
  /** 拡大率を取得
   * @returns {number}
   */
  get zoom() {
    return this.size / 100;
  }
  /** 画像オブジェクトの取得 */
  initImages() {
    this.img && (this.images = this.img.map((t) => {
      const e = new Image();
      return e.src = t, e;
    }));
  }
  /**
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Object<string, any>} piece - 駒
   * @param {number} displayPtn - 表示文字列を変更(1〜)
   * @param {number} deg - パネル角度
   * @param {number} size - パネルサイズ
   * @param {boolean} isMoved - 初回移動済みか否か
   */
  constructor(t, e, { displayPtn: s = 0, deg: r = 0, size: i = k.size, isMoved: o = !1 } = {}) {
    Object.assign(this, e), this.ctx = t, this.game = z[this.gameName], this.displayPtn = s, this.center = 0, this.middle = 0, this.size = i, this.deg = r, this.initImages(), this.isRotateImg ??= !0, this.isMoved = o, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(
        ([c, n]) => this.range[c] = n.map((a) => [...a])
      );
    } catch (c) {
      throw console.error(c), e;
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
    Object.assign(this, e[t]), this.initImages(), this.char = t;
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
          const r = (i) => i[0].map((o, c) => i.map((n) => n[c]));
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
    this.img ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, images: e, size: s } = this;
    if (!e)
      return;
    t.save(), t.translate(this.center, this.middle), this.isRotateImg && t.rotate(this.rad);
    const r = e[this.displayPtn];
    let i, o;
    r.width * 0.9 < r.height ? (i = r.width / r.height * s, o = s) : (i = s, o = r.height / r.width * s), t.drawImage(r, -i / 2, -o / 2, i, o), t.restore();
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
  /** 駒を描写 */
  drawPiece() {
    const { ctx: t, game: e, zoom: s } = this;
    let r, i, o;
    this.hasAttr("promoted") ? (r = e.promoteFontColor ?? e.fontColor ?? "#000000", i = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", o = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (r = e.fontColor ?? "#000000", i = e.backgroundColor ?? "#FFFFFF", o = e.borderColor ?? "#777777"), t.strokeStyle = o, t.fillStyle = i, t.lineWidth = 8 * s, t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = r;
    const c = [...this.display[this.displayPtn]], n = 40 * s;
    t.font = `${n}px ${R.names}`, t.textAlign = "center", c.forEach((a, h) => {
      const l = c.length === 1 ? n / 2 : h * n;
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
Object.entries(k.degChars).forEach(([p, t]) => {
  k.charDegs[t] = p;
});
const Z = [
  ["default", { isAttack: !1 }],
  ["attack", { isAttack: !0 }],
  ["start", { isAttack: !1 }],
  ["castling", { isAttack: !1 }],
  ["enPassant", { isAttack: !0 }],
  ["palaceSlash", { isAttack: !1 }],
  ["palaceSlash", { isAttack: !0 }]
], tt = [
  ["O", { isOwn: !0 }],
  ["o", {}]
], et = [
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
], J = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let p = 1; p <= 9; p++)
  J.push(["" + p, { moves: p }]);
function st(p) {
  const t = [];
  let e, s;
  for (let r = 0; r < p.length; r++)
    for (let i = 0; i < p[r].length; i++) {
      const o = p[r][i];
      for (let [c, { isOwn: n }] of tt)
        o === c && (t.push({ isOwn: n, oX: i, oY: r }), n && ([e, s] = [i, r]));
    }
  return t.map((r) => (r.offsetX = r.oX - e, r.offsetY = r.oY - s, r));
}
function it(p, t, e, s) {
  const { field: r, yLen: i, enPassant: o } = p;
  function c(d, f) {
    return r[f] && r[f][d] && !r[f][d].hasAttr("keepOut");
  }
  function n(d, f, u, g = "", v = !0) {
    if (!r[u] || !r[u][f])
      return !1;
    const w = r[u][f];
    return !w || !o.isTarget(g, w, t) || t.hasAttr("inPalace") && !w.hasAttr("palace") || g.indexOf("palace") === 0 && !(w.hasAttr(g) && r[s][e].hasAttr(g)) || t.hasAttr("unCrossRiver") && i - (0 | i / 2) <= p.getRow(f, u, t.deg) ? !1 : d ? r[u][f].piece ? v ? t.deg !== r[u][f].piece.deg : !0 : !1 : !r[u][f].piece;
  }
  function a(d, f, u, g, v) {
    for (const w of f)
      for (let C = 0; C < d.length; C++)
        for (let y = 0; y < d[C].length; y++) {
          const [S, b] = [y + e - g, C + s - v];
          if (!(!c(S, b) || n(u, 0 | S, 0 | b, "", !1) || d[C][y] !== w))
            return !0;
        }
    return !1;
  }
  function h(d, f, u) {
    const g = r[u][f];
    g.isTarget = !0, o.setTarget(d, g, t);
  }
  function l(d, [f, { isAttack: u }], { oX: g, oY: v, isOwn: w }) {
    if (w)
      for (const [C, { child: y = [] } = {}] of et)
        for (let S = 0; S < d.length; S++)
          for (let b = 0; b < d[S].length; b++) {
            const [x, L] = [b + e - g, S + s - v];
            !c(x, L) || !n(u, x, L, f) || d[S][b] !== C || a(d, y, !1, g, v) || h(f, x, L);
          }
  }
  function m(d, [f, { isAttack: u }], { oX: g, oY: v, isOwn: w, offsetX: C, offsetY: y }) {
    if (!(!w && !n(!1, e + C, s + y)))
      for (const [S, { jmps: b = 0, moves: x = 0 } = {}] of J) {
        const L = !x || x === 0;
        for (let j = v - 1; j <= v + 1; j++)
          for (let $ = g - 1; $ <= g + 1; $++) {
            if (d[j][$] !== S || $ === g && j === v)
              continue;
            let P = b || 0, F = x || 0;
            const [K, N] = [$ - g, j - v];
            for (let I = e, W = s; ; ) {
              I += K, W += N;
              const O = I + C, A = W + y;
              if (!c(O, A) || !L && F === 0)
                break;
              const M = P === 0;
              if (M && n(u, O, A, f, M) ? (F--, h(f, O, A)) : b < 1 && F--, r[A][O].piece && (P--, M))
                break;
            }
          }
      }
  }
  (function() {
    const d = t.getRange();
    d.attack ??= d.default;
    for (const f of Z) {
      const u = f[0];
      if (t.isMoved && ["start", "castling"].includes(u))
        continue;
      const g = d[u];
      if (g)
        for (const v of st(g))
          l(g, f, v), m(g, f, v);
    }
  })();
}
function rt(p) {
  let t = !1, e = [], s = null, r = null;
  const { canvas: i } = p, o = (h, l, m = () => {
  }) => {
    const d = window.getComputedStyle(i), f = h.target.getBoundingClientRect();
    let u = i.width / parseFloat(d.width), g = i.height / parseFloat(d.height);
    if (h.clientX)
      u *= h.clientX - f.left, g *= h.clientY - f.top;
    else if (0 < h.touches.length) {
      if (1 < h.touches.length)
        return;
      u *= h.touches[0].clientX - f.left, g *= h.touches[0].clientY - f.top;
    } else
      h.preventDefault(), [u, g] = e;
    p.field.forEach((v, w) => v.forEach((C, y) => l(C, u, g, y, w))), m(u, g), p.draw(), e = [u, g];
  }, c = (h) => {
    t = !0, o(
      h,
      (l, m, d) => {
        const { piece: f, pX: u, pY: g } = l;
        f && l.checkRangeMouse(m, d) && (h.preventDefault(), f.isSelected = !0, s = l, it(p, f, u, g));
      },
      (l, m) => {
        for (const [d, f] of Object.entries(p.stand.stocks))
          for (let u = f.length - 1; 0 <= u; u--)
            if (f[u].checkRangeMouse(l, m)) {
              h.preventDefault(), f[u].isSelected = !0, r = { deg: d, i: u };
              return;
            }
      }
    );
  }, n = (h) => {
    !t || !(s || r) || o(
      h,
      (l, m, d) => {
        l.isSelected = l.checkRangeMouse(m, d);
      }
    );
  }, a = (h) => {
    t = !1, o(
      h,
      (l, m, d) => {
        l.checkRangeMouse(m, d) && (s && p.movePiece(s, l), r && !l.piece && p.stand.releasePiece(l, r));
      }
    ), o(
      h,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.isTarget = !1;
      },
      () => {
        for (const [l, m] of Object.entries(p.stand.stocks))
          for (let d = m.length - 1; 0 <= d; d--)
            m[d].isSelected = !1;
        s = null, r = null;
      }
    );
  };
  return i.addEventListener("mousedown", c), i.addEventListener("mousemove", n), i.addEventListener("mouseup", a), i.addEventListener("touchstart", c), i.addEventListener("touchmove", n), i.addEventListener("touchend", a), {
    removeEvent() {
      i.removeEventListener("mousedown", c), i.removeEventListener("mousemove", n), i.removeEventListener("mouseup", a), i.removeEventListener("touchstart", c), i.removeEventListener("touchmove", n), i.removeEventListener("touchend", a);
    }
  };
}
class T {
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
    const { top: e, right: s, bottom: r, width: i, height: o, panelWidth: c, panelHeight: n, xLen: a, yLen: h } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = i / 2, this.height = o, this.right = this.left + this.width, this.bottom = r, this.pitchWidth = c / 2, this.pitchHeight = n, this.xLen = a, this.yLen = h;
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
    const e = this.stocks[T.degId[t.deg]];
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
    const { board: t, left: e, top: s, width: r, height: i, pitchWidth: o, pitchHeight: c } = this, { ctx: n, xLen: a, yLen: h } = t;
    n.fillStyle = t.backgroundColor, n.strokeStyle = t.borderColor, n.lineWidth = t.borderWidth, n.save(), n.translate(e, s), n.fillRect(0, 0, r, i), n.strokeRect(0, 0, r, i), n.restore(), this.stocks.forEach((l, m) => {
      let d = 0;
      l = l.slice(-h / 4 * a);
      for (let f = 0 | h / 4 * m; f < h / 4 * (m + 1); f++)
        for (let u = 0; u < a; u++) {
          const g = e + o * (u + 1), v = s + c * (f + 1), w = l[d++];
          if (w == null)
            break;
          w.center = g, w.middle = v, w.draw();
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
const ot = Object.keys(k.degChars), Y = () => ({
  panel: null,
  piece: null
});
class nt {
  constructor() {
    this.degs = {}, ot.forEach((t) => this.degs[t] = Y());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(t) {
    this.degs[t] = Y();
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
class U {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas
   * @param {Object<string, any>} options - オプション
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: r, onDrawed: i } = e, o = r.some(({ gameName: n }, a) => 1 < a && n) ? 4 : 2, c = new U(t, s, {
      ...e,
      players: o,
      onDrawed: i
    });
    return r.forEach(({ gameName: n, pieceSet: a }, h) => {
      if (n) {
        a ??= "default";
        try {
          c.putStartPieces(h, n, a);
        } catch {
        }
      }
    }), c.onDrawed = i, c;
  }
  /**
   * @typedef {"overflow"|"always"|null} canvasFit
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
    canvasWidth: r = void 0,
    canvasHeight: i = void 0,
    canvasFit: o = "overflow",
    boardLeft: c = 5,
    boardTop: n = 5,
    panelWidth: a = 50,
    panelHeight: h = 0 | a * 1.1,
    pieceSize: l = 0 | a * 0.9,
    useStand: m = !1,
    backgroundColor: d = "#00000000",
    autoDrawing: f = !0,
    onDrawed: u,
    freeMode: g = !1
  } = {}) {
    const v = R.importAsync();
    this.canvas = t;
    const w = t.getContext("2d");
    if (w.clearRect(0, 0, t.width, t.height), this.ctx = w, k.size = l, this.pieces = k.getPieces(w, l), Object.assign(this, q[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = c, this.top = n, this.panelWidth = a, this.panelHeight = h, this.pieceSize = l, this.canvasBackgroundColor = d, this.field = this.field.map(
      (C, y) => [...C].map((S, b) => {
        const x = c + a * (b + 1), L = n + h * (y + 1);
        return new V(w, S, x, L, a, h, this.borderWidth, b, y);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = c + this.width, this.bottom = n + this.height, this.stand = new T(this), t.width = r ?? (m ? this.stand.right : this.right) + 5, t.height = i ?? this.bottom + 5, o === "overflow" ? (t.style.maxWidth = "97vw", t.style.maxHeight = "97vh") : o === "always" && (t.style.width = "97vw", t.style.height = "97vh"), this.autoDrawing = f, f && (v.then(() => this.draw()), this.draw()), this.onDrawed ??= u, this.freeMode = g, this.record = [], this.uiControl = rt(this), this.enPassant = new nt();
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
        const r = (i) => i[0].map((o, c) => i.map((n) => n[c]));
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
    const o = z[e].position[this.xLen][s];
    if (!o)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    o.forEach((c, n) => {
      if (c.length < this.xLen)
        throw Error(c.join(""));
      const a = n + this.yLen - o.length;
      [...c].forEach((h, l) => {
        if (!r[h])
          return;
        const m = r[h].clone(), d = this.field[a][l];
        m.center = d.center, m.middle = d.middle, d.piece = m;
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
  putNewPiece(t, e, s, r, { displayPtn: i = 0, setDeg: o = !1, isMoved: c = !1 } = {}) {
    const { pieces: n } = this, a = o ? r : r * 90;
    typeof t == "string" && (t = new k(this.ctx, n[t], { displayPtn: i, deg: a, isMoved: c }));
    const h = this.field[s][e];
    t.center = h.center, t.middle = h.middle, h.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: r, yLen: i } = this, c = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(k.degChars).map((a) => `
` + a + "持ち駒:")
    ).reduce(
      (a, h) => a.replace(new RegExp(h, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (a) => a.match(/.{2}/g)
    );
    for (let a = 0; a < i; a++)
      for (let h = 0; h < r; h++)
        try {
          const l = c[a][h], m = k.stringToPiece(s, l);
          m.center = e[a][h].center, m.middle = e[a][h].middle, e[a][h].piece = m;
        } catch {
          e[a][h].piece = null;
        }
    this.stand.clear();
    const n = c[i];
    n && n.forEach((a) => {
      const h = k.stringToPiece(s, a);
      h && this.stand.add(h);
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
    const { yLen: e } = this, { piece: s, pX: r, pY: i } = t, { deg: o } = s, [c, n] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((h) => e - h - (0 | this.promoLineOffset));
    let a;
    return this.sidePromo ? a = Math.max(
      ...Object.keys(k.degChars).map((h) => 0 | h).filter((h) => h !== o).map(
        (h) => this.getRow(r, i, h, 180)
      )
    ) : a = this.getRow(r, i, o), {
      canPromo: c <= a,
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
    let { canPromo: o, forcePromo: c } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: n } = e;
    n.center = e.center, n.middle = e.middle, n.isMoved = !0;
    const a = this.checkCanPromo(e);
    if (o ||= a.canPromo, c ||= a.forcePromo, i.setMoved(e), !n.promo || n.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [h, { name: l }] of Object.entries(n.promo))
        if (confirm(`成りますか?
	${n.char}:${n.name}
	　↓
	${h}:${l}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), n.promotion(h);
          return;
        }
    while (!r && c);
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
      ({ to: s, from: r, deg: i, pieceChar: o, end: c }) => `${k.degChars[i]}${t(s)}${e(s)}${o}${c} (${t(r)}${e(r)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: r, width: i, height: o, panelWidth: c, panelHeight: n } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, r), t.fillRect(0, 0, i, o), t.strokeRect(0, 0, i, o), t.translate(c / 2, n / 2), t.strokeRect(0, 0, i - c, o - n), t.restore(), this.stand.draw(), this.field.forEach((a) => {
      a.forEach((h) => {
        h.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** 駒配置をテキストで取得
   * {boolean} isMinimam - 縮小表示
   */
  toString(t = !1) {
    const { xLen: e } = this;
    let s = "", r = "", i = "", o = "", c = `
`;
    return t || (s = `┏${Array(e).fill("━━").join("┯")}┓
`, r = `
┗${Array(e).fill("━━").join("┷")}┛`, i = "┃", o = "│", c = `
┠${Array(e).fill("──").join("┼")}┨
`), s + this.field.map(
      (n) => i + n.map(
        (a) => "" + (a.piece || a.toString(t))
      ).join(o) + i
    ).join(c) + r + this.stand.toString(t);
  }
}
export {
  U as Board,
  k as Piece,
  q as boards,
  R as canvasFont,
  ct as gameSoft,
  z as games
};
