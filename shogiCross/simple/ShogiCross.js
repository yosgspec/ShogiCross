const q = "./json/ShogiCross/";
async function E(f) {
  return await fetch(`${q}${f}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const O = await E("canvasFont"), gt = await E("gameSoft"), J = await E("games"), G = await E("boards"), W = await E("panels"), z = await E("pieces"), Q = await E("pieceRange"), Z = await E("pieceCost"), tt = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(W).map(({ displayText: f }) => f).join("") + Object.values(z).map(({ display: f }) => f ? f.join("") : "").join("")
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
    const f = "https://fonts.googleapis.com/css2?family=", t = tt(), e = (/* @__PURE__ */ new Date()).getTime().toString();
    return this.names = O.fonts.map((s) => `"${s[0]}${e}"`).join(",") + ",serif", Promise.all(
      O.fonts.map(async ([s, i]) => {
        const r = s.replace(/ /g, "+"), o = `${f}${r}:wght@${i}&text=${t}`, a = await fetch(o);
        if (!a.ok)
          return;
        const c = (await a.text()).match(/url\(.+?\)/g);
        if (!c)
          throw new Error("Not found font.");
        for (const n of c) {
          const l = new FontFace(`${s}${e}`, n);
          await l.load(), document.fonts.add(l);
        }
      })
    ).then((s) => this.imported = !0);
  }
});
function et(f) {
  return new Promise((t) => {
    const e = new Image();
    e.src = f, e.onload = () => t(e);
  });
}
const st = [...new Set(
  Object.values(W).flatMap(({ imgSrc: f }) => f ?? []).concat(Object.values(z).flatMap(({ imgSrc: f }) => f ?? []))
)], D = {
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
        st.map(async (f) => {
          this.images[f] = await et(f);
        })
      ).then((f) => this.imported = !0);
  }
}, it = (f) => "image/" + f.replace("jpg", "jpeg");
function rt(f, t = "image", e = "png") {
  return new Promise((s) => {
    f.toBlob((i) => {
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
  constructor(t, e, s, i, r, o, a, h, c) {
    Object.assign(this, W[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = a, this.pX = h, this.pY = c, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.isTarget = !1, this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: a, displayText: h, textRotate: c } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, a), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, a), t.moveTo(0, a / 2), t.lineTo(o, a / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, a), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, a)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, a)), t.closePath(), t.stroke(), t.restore(), h) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const n = c ? c * Math.PI / 180 : 0;
      t.rotate(n);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${O.names}`;
      const g = t.measureText(h).width, w = l / 2 * 0.8;
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
    SR: 0.96,
    R: 0.92,
    UC: 0.88,
    C: 0.84
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
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(z))));
    for (const [r, o] of s)
      o.attr ??= [], o.unit && (o.base = o);
    for (const [r, o] of s) {
      if (!o.promo || typeof o.promo != "string")
        continue;
      const a = [...o.promo];
      o.promo = {};
      for (const h of a) {
        const c = s.get(h);
        c.attr.push("promoted"), c.unit = "成", o.promo[h] = c, s.set(h, { ...o, ...c });
      }
    }
    [...s].forEach(([r, o], a) => {
      o.id = a, o.char = r, s.set(r, new S(t, o, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, o] of s)
      o.alias.forEach((a, h) => {
        const c = o.clone(), n = [...c.display];
        c.displayPtn = h + 1, c.display = n, c.alias[h] = r, i[a] = c;
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
      Object.entries(this.range).forEach(([c, n]) => {
        Array.isArray(n) || (this.range[c] = Q[n].map((l) => [...l]));
      });
    } catch (c) {
      throw console.error(c), e;
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
    this.imgSrc && D.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = D.images[s];
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
    t.font = `${h}px ${O.names}`, t.textAlign = "center", a.forEach((c, n) => {
      const l = a.length === 1 ? h / 2 : n * h;
      t.fillText(c, 0, l);
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
Object.entries(S.degChars).forEach(([f, t]) => {
  S.charDegs[t] = f;
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
], N = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let f = 1; f <= 9; f++)
  N.push(["" + f, { moves: f }]);
function at(f) {
  const t = [];
  let e, s;
  for (let i = 0; i < f.length; i++)
    for (let r = 0; r < f[i].length; r++) {
      const o = f[i][r];
      for (let [a, { isOwn: h }] of ct)
        o === a && (t.push({ isOwn: h, oX: r, oY: i }), h && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function lt(f, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = f;
  function a(d, u) {
    return i[u] && i[u][d] && !i[u][d].hasAttr("keepOut");
  }
  function h(d) {
    return d.piece && t.hasAttr("po") && d.piece.hasAttr("po");
  }
  function c(d) {
    return d.piece && !t.isMoved && !d.piece.isMoved && t.hasAttr("pao") && t.cost < d.piece.cost;
  }
  function n(d, u, v, p = "", y = !0) {
    if (!i[v] || !i[v][u])
      return !1;
    const C = i[v][u];
    return !C || h(C) || c(C) || !o.isTarget(p, C, t) || t.hasAttr("inPalace") && !C.hasAttr("palace") || p.indexOf("palace") === 0 && !(C.hasAttr(p) && i[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= f.getRow(u, v, t.deg) ? !1 : d ? i[v][u].piece ? y ? t.deg !== i[v][u].piece.deg : !0 : !1 : !i[v][u].piece;
  }
  function l(d, u, v, p, y) {
    for (const C of u)
      for (let R = 0; R < d.length; R++)
        for (let b = 0; b < d[R].length; b++) {
          const [m, x] = [b + e - p, R + s - y];
          if (!(!a(m, x) || n(v, 0 | m, 0 | x, "", !1) || d[R][b] !== C))
            return !0;
        }
    return !1;
  }
  function g(d, u, v) {
    const p = i[v][u];
    p.isTarget = !0, o.setTarget(d, p, t);
  }
  function w(d, [u, { isAttack: v }], { oX: p, oY: y, isOwn: C }) {
    if (C)
      for (const [R, { child: b = [] } = {}] of ht)
        for (let m = 0; m < d.length; m++)
          for (let x = 0; x < d[m].length; x++) {
            const [j, A] = [x + e - p, m + s - y];
            !a(j, A) || !n(v, j, A, u) || d[m][x] !== R || l(d, b, !1, p, y) || g(u, j, A);
          }
  }
  function k(d, [u, { isAttack: v }], { oX: p, oY: y, isOwn: C, offsetX: R, offsetY: b }) {
    if (!(!C && !n(!1, e + R, s + b)))
      for (const [m, { jmps: x = 0, moves: j = 0 } = {}] of N) {
        const A = !j || j === 0;
        for (let L = y - 1; L <= y + 1; L++)
          for (let $ = p - 1; $ <= p + 1; $++) {
            if (d[L][$] !== m || $ === p && L === y)
              continue;
            let M = x || 0, F = j || 0;
            const [V, _] = [$ - p, L - y];
            for (let H = e, Y = s; ; ) {
              H += V, Y += _;
              const P = H + R, T = Y + b;
              if (!a(P, T) || !A && F === 0)
                break;
              const I = M === 0;
              I && n(v, P, T, u, I) ? (F--, g(u, P, T)) : x < 1 && F--;
              const U = i[T][P];
              if (U.piece && (M--, I || h(U)))
                break;
            }
          }
      }
  }
  (function() {
    const d = t.getRange();
    d.attack ??= d.default;
    for (const u of nt) {
      const v = u[0];
      if (t.isMoved && ["start", "castling"].includes(v))
        continue;
      const p = d[v];
      if (p)
        for (const y of at(p))
          w(p, u, y), k(p, u, y);
    }
  })();
}
function dt(f) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = f, o = (n, l, g = () => {
  }) => {
    const w = window.getComputedStyle(r), k = n.target.getBoundingClientRect();
    let d = r.width / parseFloat(w.width), u = r.height / parseFloat(w.height);
    if (n.clientX)
      d *= n.clientX - k.left, u *= n.clientY - k.top;
    else if (0 < n.touches.length) {
      if (1 < n.touches.length)
        return;
      d *= n.touches[0].clientX - k.left, u *= n.touches[0].clientY - k.top;
    } else
      n.preventDefault(), [d, u] = e;
    f.field.forEach((v, p) => v.forEach((y, C) => l(y, d, u, C, p))), g(d, u), f.draw(), e = [d, u];
  }, a = (n) => {
    t = !0, o(
      n,
      (l, g, w) => {
        const { piece: k, pX: d, pY: u } = l;
        k && l.checkRangeMouse(g, w) && (n.preventDefault(), k.isSelected = !0, s = l, lt(f, k, d, u));
      },
      (l, g) => {
        for (const [w, k] of Object.entries(f.stand.stocks))
          for (let d = k.length - 1; 0 <= d; d--)
            if (k[d].checkRangeMouse(l, g)) {
              n.preventDefault(), k[d].isSelected = !0, i = { deg: w, i: d };
              return;
            }
      }
    );
  }, h = (n) => {
    !t || !(s || i) || o(
      n,
      (l, g, w) => {
        l.isSelected = l.checkRangeMouse(g, w);
      }
    );
  }, c = (n) => {
    t = !1, o(
      n,
      (l, g, w) => {
        l.checkRangeMouse(g, w) && (s && f.movePiece(s, l), i && !l.piece && f.stand.releasePiece(l, i));
      }
    ), o(
      n,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.isTarget = !1;
      },
      () => {
        for (const [l, g] of Object.entries(f.stand.stocks))
          for (let w = g.length - 1; 0 <= w; w--)
            g[w].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", a), r.addEventListener("mousemove", h), r.addEventListener("mouseup", c), r.addEventListener("touchstart", a), r.addEventListener("touchmove", h), r.addEventListener("touchend", c), {
    removeEvent() {
      r.removeEventListener("mousedown", a), r.removeEventListener("mousemove", h), r.removeEventListener("mouseup", c), r.removeEventListener("touchstart", a), r.removeEventListener("touchmove", h), r.removeEventListener("touchend", c);
    }
  };
}
class X {
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
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: a, panelHeight: h, xLen: c, yLen: n } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = a / 2, this.pitchHeight = h, this.xLen = c, this.yLen = n;
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
    const e = this.stocks[X.degId[t.deg]];
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
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: a } = this, { ctx: h, xLen: c, yLen: n } = t;
    h.fillStyle = t.backgroundColor, h.strokeStyle = t.borderColor, h.lineWidth = t.borderWidth, h.save(), h.translate(e, s), h.fillRect(0, 0, i, r), h.strokeRect(0, 0, i, r), h.restore(), this.stocks.forEach((l, g) => {
      let w = 0;
      l = l.slice(-n / 4 * c);
      for (let k = 0 | n / 4 * g; k < n / 4 * (g + 1); k++)
        for (let d = 0; d < c; d++) {
          const u = e + o * (d + 1), v = s + a * (k + 1), p = l[w++];
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
class K {
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas
   * @param {Object<string, any>} options - オプション
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: h }, c) => 1 < c && h) ? 4 : 2, a = new K(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: h, pieceSet: c }, n) => {
      if (h) {
        c ??= "default";
        try {
          a.putStartPieces(n, h, c);
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
    panelWidth: c = 50,
    panelHeight: n = 0 | c * 1.1,
    pieceSize: l = 0 | c * 0.9,
    useRankSize: g = !0,
    isDrawShadow: w = !0,
    borderWidth: k = Math.min(c, n) / 30,
    useStand: d = !1,
    backgroundColor: u = "#00000000",
    autoDrawing: v = !0,
    onDrawed: p,
    freeMode: y = !1
  } = {}) {
    const C = O.importAsync(), R = D.importAsync();
    this.canvas = t;
    const b = t.getContext("2d");
    if (b.clearRect(0, 0, t.width, t.height), this.ctx = b, this.pieces = S.getPieces(b, {
      size: l,
      useRankSize: g,
      isDrawShadow: w
    }), Object.assign(this, G[e]), ![2, 4].includes(s))
      throw Error(`players=${s}, players need 2 or 4.`);
    this.players = s, this.left = a, this.top = h, this.panelWidth = c, this.panelHeight = n, this.borderWidth = k, this.pieceSize = l, this.canvasBackgroundColor = u, this.field = this.field.map(
      (x, j) => [...x].map((A, L) => {
        const $ = a + c * (L + 1), M = h + n * (j + 1);
        return new ot(b, A, $, M, c, n, k, L, j);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = a + this.width, this.bottom = h + this.height, this.stand = new X(this), t.width = i ?? (d ? this.stand.right : this.right) + 5, t.height = r ?? this.bottom + 5;
    const { style: m } = t;
    o === "overflow" ? (m.maxWidth === "" && (m.maxWidth = "97vw"), m.maxHeight === "" && (m.maxHeight = "97vh")) : o === "horizontal" ? m.width === "" && (m.width = "97vw") : o === "vertical" ? m.height === "" && (m.height = "97vh") : o === "parentOverflow" ? (m.maxWidth === "" && (m.maxWidth = "100%"), m.maxHeight === "" && (m.maxHeight = "100%")) : o === "parentHorizontal" ? m.width === "" && (m.width = "100%") : o === "parentVertical" && m.height === "" && (m.height = "100%"), this.autoDrawing = v, v && (C.then(() => this.draw()), R.then(() => this.draw()), this.draw()), this.onDrawed ??= p, this.freeMode = y, this.record = [], this.uiControl = dt(this), this.enPassant = new ut();
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
      const c = h + this.yLen - o.length;
      [...a].forEach((n, l) => {
        if (!i[n])
          return;
        const g = i[n].clone(), w = this.field[c][l];
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
    const { pieces: h } = this, c = o ? i : i * 90;
    typeof t == "string" && (t = new S(this.ctx, h[t], { displayPtn: r, deg: c, isMoved: a }));
    const n = this.field[s][e];
    t.center = n.center, t.middle = n.middle, n.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, a = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(S.degChars).map((c) => `
` + c + "持ち駒:")
    ).reduce(
      (c, n) => c.replace(new RegExp(n, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (c) => c.match(/.{2}/g)
    );
    for (let c = 0; c < r; c++)
      for (let n = 0; n < i; n++)
        try {
          const l = a[c][n], g = S.stringToPiece(s, l);
          g.center = e[c][n].center, g.middle = e[c][n].middle, e[c][n].piece = g;
        } catch {
          e[c][n].piece = null;
        }
    this.stand.clear();
    const h = a[r];
    h && h.forEach((c) => {
      const n = S.stringToPiece(s, c);
      n && this.stand.add(n);
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
    ].map((n) => e - n - (0 | this.promoLineOffset));
    let c;
    return this.sidePromo ? c = Math.max(
      ...Object.keys(S.degChars).map((n) => 0 | n).filter((n) => n !== o).map(
        (n) => this.getRow(i, r, n, 180)
      )
    ) : c = this.getRow(i, r, o), {
      canPromo: a <= c,
      forcePromo: h <= c
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
    const c = this.checkCanPromo(e);
    if (o ||= c.canPromo, a ||= c.forcePromo, r.setMoved(e), !h.promo || h.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [n, { name: l }] of Object.entries(h.promo))
        if (confirm(`成りますか?
	${h.char}:${h.name}
	　↓
	${n}:${l}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), h.promotion(n);
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
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(a / 2, h / 2), t.strokeRect(0, 0, r - a, o - h), t.restore(), this.stand.draw(), this.field.forEach((c) => {
      c.forEach((n) => {
        n.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** BOD形式テキストを取得
   * {boolean} isMinimam - 縮小表示
   */
  get bodText() {
    const t = "０１２３４５６７８９", e = "０⑩⑳㉚㊵㊿", s = "〇一二三四五六七八九", i = "零十弐参肆伍";
    for (let n = 1; n <= 50; n++) {
      const l = n % 10, g = 0 | n / 10;
      console.log([
        l === 0 ? e[g] : t[l],
        l === 0 ? i[g] : s[l]
      ]);
    }
    let r = "", o = "", a = "", h = "";
    return r + this.field.map(
      (n) => a + n.map(
        (l) => "" + (l.piece || l.toString(!1))
      ).join(h) + a
    ).join(`
`) + o + this.stand.toString(!1);
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
        (c) => "" + (c.piece || c.toString(t))
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
  K as Board,
  S as Piece,
  G as boards,
  O as canvasFont,
  D as canvasImage,
  gt as gameSoft,
  J as games
};
