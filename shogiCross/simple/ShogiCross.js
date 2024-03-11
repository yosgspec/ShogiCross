const _ = "./json/ShogiCross/";
async function $(f) {
  return await fetch(`${_}${f}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const T = await $("canvasFont"), pt = await $("gameSoft"), K = await $("games"), Q = await $("boards"), H = await $("panels"), X = await $("pieces"), Z = await $("pieceRange"), tt = await $("pieceCost"), et = () => [
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
        const r = s.replace(/ /g, "+"), o = `${f}${r}:wght@${i}&text=${t}`, c = await fetch(o);
        if (!c.ok)
          return;
        const n = (await c.text()).match(/url\(.+?\)/g);
        if (!n)
          throw new Error("Not found font.");
        for (const a of n) {
          const l = new FontFace(`${s}${e}`, a);
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
)], B = {
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
function ot(f, t = "image", e = "png") {
  return new Promise((s) => {
    f.toBlob((i) => {
      const r = document.createElement("a");
      return r.href = URL.createObjectURL(i), r.download = `${t}.${e}`, r.click(), URL.revokeObjectURL(r.href), s();
    }, rt(e));
  });
}
class O {
  /** 駒の角度表示
   * @type {Object<string, string>}
   */
  static pieceDegChars = {
    0: " ",
    180: "v"
  };
  /** マス目の表示
   * @type {string}
   */
  static panelText = " ・";
  /** 持駒の角度表示
   * @type {Object<string, string>}
   */
  static standDegChars = {
    0: "先手の持駒：",
    180: "後手の持駒："
  };
  /** 行/持駒用の数字表示(漢数字)
   * @param {number} num - 数字
   * @param {boolean} viewOne - 一を表示
   * @returns {string}
   */
  static num2Row(t, e = !0) {
    if (!e && t <= 1)
      return "";
    const s = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九"], i = ["", "十", "二十", "三十", "四十", "五十", "六十", "七十", "八十", "九十"], r = t % 10, o = 0 | t / 10;
    return i[o] + s[r];
  }
  /** 列用の数字表示(全角/2桁)
   * @param {number} num - 数字
   * @returns {string}
   */
  static num2Col(t) {
    if (10 <= t)
      return t;
    const e = "０１２３４５６７８９", s = t % 10;
    return e[s];
  }
}
class nt {
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
  constructor(t, e, s, i, r, o, c, h, n) {
    Object.assign(this, H[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = c, this.pX = h, this.pY = n, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.clearTarget(), this.attr ??= [];
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
    this.drawPanel(), this.isSelected && this.drawMask(t), this.isTarget && this.drawMask(e), this.piece?.draw();
  }
  /** マス目を描写 */
  drawPanel() {
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: c, displayText: h, textRotate: n } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, c), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, c), t.moveTo(0, c / 2), t.lineTo(o, c / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, c), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, c)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, c)), t.closePath(), t.stroke(), t.restore(), h) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const a = n ? n * Math.PI / 180 : 0;
      t.rotate(a);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${T.names}`;
      const u = t.measureText(h).width, m = l / 2 * 0.8;
      t.fillText(h, -u / 2, m), t.restore();
    }
  }
  /** マス目にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(t) {
    const { ctx: e } = this;
    e.fillStyle = t, e.fillRect(this.left, this.top, this.width, this.height);
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  getBodText() {
    return O.panelText;
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
    for (const [r, o] of s)
      o.attr ??= [], o.unit && o.unit === "成" && (o.base = o);
    for (const [r, o] of s) {
      if (!o.promo || typeof o.promo != "string")
        continue;
      const c = [...o.promo];
      o.promo = {};
      for (const h of c) {
        const n = s.get(h);
        n.attr.push("promoted"), n.unit = "成", o.promo[h] = n, s.set(h, { ...o, ...n });
      }
    }
    [...s].forEach(([r, o], c) => {
      o.id = c, o.char = r, s.set(r, new y(t, o, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, o] of s)
      o.alias.forEach((c, h) => {
        const n = o.clone(), a = [...n.display];
        n.displayPtn = h + 1, n.display = a, n.alias[h] = r, i[c] = n;
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
      size: o = y.size,
      useRankSize: c = y.useRankSize,
      isDrawShadow: h = y.isDrawShadow,
      isMoved: n = !1
    } = s;
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = i, this.game = K[this.gameName], this.cost = tt[this.char] ?? 1, this.center = 0, this.middle = 0, this.deg = r, this.size = o, this.useRankSize = c, this.isDrawShadow = h, this.isRotateImg ??= !0, this.isMoved = n, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([a, l]) => {
        Array.isArray(l) || (this.range[a] = Z[l].map((u) => [...u]));
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
          const i = (r) => r[0].map((o, c) => r.map((h) => h[c]));
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
    this.imgSrc && B.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = B.images[s];
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
    let i, r, o;
    this.hasAttr("promoted") ? (i = e.promoteFontColor ?? e.fontColor ?? "#000000", r = e.promoteBackgroundColor ?? e.backgroundColor ?? "#FFFFFF", o = e.promoteBorderColor ?? e.borderColor ?? "#FF3300") : (i = e.fontColor ?? "#000000", r = e.backgroundColor ?? "#FFFFFF", o = e.borderColor ?? "#777777"), t.strokeStyle = o, t.fillStyle = r, t.lineWidth = 8 * s, this.drawPieceShadow(s), t.save(), this.makePath(s), t.stroke(), t.fill(), t.fillStyle = i;
    const c = [..."" + this.display[this.displayPtn]], h = 40 * s;
    t.font = `${h}px ${T.names}`, t.textAlign = "center", c.forEach((n, a) => {
      const l = c.length === 1 ? h / 2 : a * h;
      t.fillText(n, 0, l);
    }), t.restore();
  }
  /** 駒にマスクを描写
   * @param {string} color - カラーエフェクトの色
   */
  drawMask(t) {
    const { ctx: e, zoom: s } = this;
    e.fillStyle = t, e.save(), this.makePath(s), e.fill(), e.restore();
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  getBodText() {
    return O.pieceDegChars[this.deg] + this.char;
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
], N = [
  ["*", {}],
  ["+", { jmps: 1 }],
  ["|", { jmps: 1, moves: 1 }]
];
for (let f = 1; f <= 9; f++)
  N.push(["" + f, { moves: f }]);
function lt(f) {
  const t = [];
  let e, s;
  for (let i = 0; i < f.length; i++)
    for (let r = 0; r < f[i].length; r++) {
      const o = f[i][r];
      for (let [c, { isOwn: h }] of ct)
        o === c && (t.push({ isOwn: h, oX: r, oY: i }), h && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function dt(f, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = f;
  function c(d, g) {
    return i[g] && i[g][d] && !i[g][d].hasAttr("keepOut");
  }
  function h(d) {
    return d.piece && t.hasAttr("po") && d.piece.hasAttr("po");
  }
  function n(d) {
    return d.piece && !t.isMoved && !d.piece.isMoved && t.hasAttr("pao") && t.cost < d.piece.cost;
  }
  function a(d, g, v, p = "", S = !0) {
    if (!i[v] || !i[v][g])
      return !1;
    const C = i[v][g];
    return !C || h(C) || n(C) || p === "enPassant" && !o.isTarget(C, t) || t.hasAttr("inPalace") && !C.hasAttr("palace") || p.indexOf("palace") === 0 && !(C.hasAttr(p) && i[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= f.getRow(g, v, t.deg) ? !1 : d ? i[v][g].piece ? S ? t.deg !== i[v][g].piece.deg : !0 : !1 : !i[v][g].piece;
  }
  function l(d, g, v, p, S) {
    for (const C of g)
      for (let b = 0; b < d.length; b++)
        for (let j = 0; j < d[b].length; j++) {
          const [R, x] = [j + e - p, b + s - S];
          if (!(!c(R, x) || a(v, 0 | R, 0 | x, "", !1) || d[b][j] !== C))
            return !0;
        }
    return !1;
  }
  function u(d, g, v) {
    const p = i[v][g];
    p.addTarget(d), o.setTarget(p, t);
  }
  function m(d, [g, { isAttack: v }], { oX: p, oY: S, isOwn: C }) {
    if (C)
      for (const [b, { child: j = [] } = {}] of ht)
        for (let R = 0; R < d.length; R++)
          for (let x = 0; x < d[R].length; x++) {
            const [w, L] = [x + e - p, R + s - S];
            !c(w, L) || !a(v, w, L, g) || d[R][x] !== b || l(d, j, !1, p, S) || u(g, w, L);
          }
  }
  function k(d, [g, { isAttack: v }], { oX: p, oY: S, isOwn: C, offsetX: b, offsetY: j }) {
    if (!(!C && !a(!1, e + b, s + j)))
      for (const [R, { jmps: x = 0, moves: w = 0 } = {}] of N) {
        const L = !w || w === 0;
        for (let A = S - 1; A <= S + 1; A++)
          for (let E = p - 1; E <= p + 1; E++) {
            if (d[A][E] !== R || E === p && A === S)
              continue;
            let M = x || 0, F = w || 0;
            const [I, q] = [E - p, A - S];
            for (let Y = e, U = s; ; ) {
              Y += I, U += q;
              const P = Y + b, D = U + j;
              if (!c(P, D) || !L && F === 0)
                break;
              const z = M === 0;
              z && a(v, P, D, g, z) ? (F--, u(g, P, D)) : x < 1 && F--;
              const J = i[D][P];
              if (J.piece && (M--, z || h(J)))
                break;
            }
          }
      }
  }
  (function() {
    const d = t.getRange();
    d.attack ??= d.default;
    for (const g of at) {
      const v = g[0];
      if (t.isMoved && ["start", "castling"].includes(v))
        continue;
      const p = d[v];
      if (p)
        for (const S of lt(p))
          m(p, g, S), k(p, g, S);
    }
  })();
}
function ft(f) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = f, o = (a, l, u = () => {
  }) => {
    const m = window.getComputedStyle(r), k = a.target.getBoundingClientRect();
    let d = r.width / parseFloat(m.width), g = r.height / parseFloat(m.height);
    if (a.clientX)
      d *= a.clientX - k.left, g *= a.clientY - k.top;
    else if (0 < a.touches.length) {
      if (1 < a.touches.length)
        return;
      d *= a.touches[0].clientX - k.left, g *= a.touches[0].clientY - k.top;
    } else
      a.preventDefault(), [d, g] = e;
    f.field.forEach((v, p) => v.forEach((S, C) => l(S, d, g, C, p))), u(d, g), f.draw(), e = [d, g];
  }, c = (a) => {
    t = !0, o(
      a,
      (l, u, m) => {
        const { piece: k, pX: d, pY: g } = l;
        k && l.checkRangeMouse(u, m) && (a.preventDefault(), k.isSelected = !0, s = l, dt(f, k, d, g));
      },
      (l, u) => {
        for (const [m, k] of Object.entries(f.stand.stocks))
          for (let d = k.length - 1; 0 <= d; d--)
            if (k[d].checkRangeMouse(l, u)) {
              a.preventDefault(), k[d].isSelected = !0, i = { deg: m, i: d };
              return;
            }
      }
    );
  }, h = (a) => {
    !t || !(s || i) || o(
      a,
      (l, u, m) => {
        l.isSelected = l.checkRangeMouse(u, m);
      }
    );
  }, n = (a) => {
    t = !1, o(
      a,
      (l, u, m) => {
        l.checkRangeMouse(u, m) && (s && f.movePiece(s, l), i && !l.piece && f.stand.releasePiece(l, i));
      }
    ), o(
      a,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.clearTarget();
      },
      () => {
        for (const [l, u] of Object.entries(f.stand.stocks))
          for (let m = u.length - 1; 0 <= m; m--)
            u[m].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", c), r.addEventListener("mousemove", h), r.addEventListener("mouseup", n), r.addEventListener("touchstart", c), r.addEventListener("touchmove", h), r.addEventListener("touchend", n), {
    removeEvent() {
      r.removeEventListener("mousedown", c), r.removeEventListener("mousemove", h), r.removeEventListener("mouseup", n), r.removeEventListener("touchstart", c), r.removeEventListener("touchmove", h), r.removeEventListener("touchend", n);
    }
  };
}
class W {
  /** 角度からstockの添字を取得
   * @type {Object<string, number>}
   */
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
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: c, panelHeight: h, xLen: n, yLen: a } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = c / 2, this.pitchHeight = h, this.xLen = n, this.yLen = a;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = [...Array(4)].map((t) => []);
  }
  /** 持ち駒からボード上に配置する
   * @param {Panal} toPanell - 配置先のパネル
   * @param {Object} option - オプション
   * @param {number} option.deg - 角度
   * @param {number} option.i - 配置する持ち駒のインデックス
   */
  releasePiece(t, e = {}) {
    const { deg: s, i } = e, { board: r } = this, o = this.stocks[s];
    t.piece = o[i], o[i].center = t.center, o[i].middle = t.middle, r.addRecord(t, { end: "打" }), o.splice(i, 1);
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
   * @param {boolean} forceCapture - 属性を無視して捕縛する
   * @param {boolean} forceCantCapture - 属性を無視して捕縛しない
   */
  capturePiece(t, e, s = !1, i = !1) {
    i || !e || !(s || t.hasAttr("capture")) || e.hasAttr("king") || e.hasAttr("cantCapture") || (e.deg = t.deg, e.isMoved = !0, this.add(e));
  }
  /** 盤を描写 */
  draw() {
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: c } = this, { ctx: h, xLen: n, yLen: a } = t;
    h.fillStyle = t.backgroundColor, h.strokeStyle = t.borderColor, h.lineWidth = t.borderWidth, h.save(), h.translate(e, s), h.fillRect(0, 0, i, r), h.strokeRect(0, 0, i, r), h.restore(), this.stocks.forEach((l, u) => {
      let m = 0;
      l = l.slice(-a / 4 * n);
      for (let k = 0 | a / 4 * u; k < a / 4 * (u + 1); k++)
        for (let d = 0; d < n; d++) {
          const g = e + o * (d + 1), v = s + c * (k + 1), p = l[m++];
          if (p == null)
            break;
          p.center = g, p.middle = v, p.draw();
        }
    });
  }
  /** BOD形式テキストを取得
   * @param {number} deg - 角度
   * @returns {string}
   */
  getBodText(t = 0) {
    const e = /* @__PURE__ */ new Map();
    return this.stocks[W.degId[t]].forEach(({ char: s }) => {
      e.has(s) || e.set(s, 0), e.set(s, e.get(s) + 1);
    }), O.standDegChars[t] + [...e].map(
      ([s, i]) => s + O.num2Row(i)
    ).join(" ");
  }
  /** 文字列形式で取得
   * @param {boolean} isMinimam - 簡易表示
   */
  toString(t = !1) {
    const { xLen: e } = this.board, s = this.stocks.flat().filter((o) => o);
    let i = 0 < s.length ? `
` + "―".repeat(e * 2) + `
` : "", r = s.map((o) => "" + o).join("");
    if (!t) {
      i = "";
      for (const o of Object.values(y.degChars))
        r = r.replace(o, `
${o}持駒：${o}`);
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
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: h }, n) => 1 < n && h) ? 4 : 2, c = new V(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: h, pieceSet: n }, a) => {
      if (h) {
        n ??= "default";
        try {
          c.putStartPieces(a, h, n);
        } catch {
        }
      }
    }), c.onDrawed = r, c;
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
      canvasHeight: o = void 0,
      canvasFit: c = "overflow",
      boardLeft: h = 5,
      boardTop: n = 5,
      panelWidth: a = 50,
      panelHeight: l = 0 | a * 1.1,
      pieceSize: u = 0 | a * 0.9,
      useRankSize: m = !0,
      isDrawShadow: k = !0,
      borderWidth: d = Math.min(a, l) / 30,
      useStand: g = !1,
      backgroundColor: v = "#00000000",
      autoDrawing: p = !0,
      onDrawed: S,
      onGameOver: C = (L) => alert(`プレイヤー${L + 1}の敗北です。`),
      freeMode: b = !1
    } = s, j = T.importAsync(), R = B.importAsync();
    this.canvas = t;
    const x = t.getContext("2d");
    if (x.clearRect(0, 0, t.width, t.height), this.ctx = x, this.pieces = y.getPieces(x, {
      size: u,
      useRankSize: m,
      isDrawShadow: k
    }), Object.assign(this, Q[e]), ![2, 4].includes(i))
      throw Error(`players=${i}, players need 2 or 4.`);
    this.players = i, this.left = h, this.top = n, this.panelWidth = a, this.panelHeight = l, this.borderWidth = d, this.pieceSize = u, this.canvasBackgroundColor = v, this.field = this.field.map(
      (L, A) => [...L].map((E, M) => {
        const F = h + a * (M + 1), I = n + l * (A + 1);
        return new nt(x, E, F, I, a, l, d, M, A);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = h + this.width, this.bottom = n + this.height, this.stand = new W(this), t.width = r ?? (g ? this.stand.right : this.right) + 5, t.height = o ?? this.bottom + 5;
    const { style: w } = t;
    c === "overflow" ? (w.maxWidth === "" && (w.maxWidth = "97vw"), w.maxHeight === "" && (w.maxHeight = "97vh")) : c === "horizontal" ? w.width === "" && (w.width = "97vw") : c === "vertical" ? w.height === "" && (w.height = "97vh") : c === "parentOverflow" ? (w.maxWidth === "" && (w.maxWidth = "100%"), w.maxHeight === "" && (w.maxHeight = "100%")) : c === "parentHorizontal" ? w.width === "" && (w.width = "100%") : c === "parentVertical" && w.height === "" && (w.height = "100%"), this.autoDrawing = p, p && (j.then(() => this.draw()), R.then(() => this.draw()), this.draw()), this.onDrawed = S, this.onGameOver = C, this.gameAlives = new Map(
      [...Array(this.players).keys()].map((L) => [this.#t(L), !0])
    ), this.freeMode = b, this.record = [], this.uiControl = ft(this), this.enPassant = new ut();
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
        const i = (r) => r[0].map((o, c) => r.map((h) => h[c]));
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
    const o = K[e].position[this.xLen][s];
    if (!o)
      throw Error(`games["${e}"].position["${this.xLen}"]["${s}"]is null.`);
    o.forEach((c, h) => {
      if (c.length < this.xLen)
        throw Error(c.join(""));
      const n = h + this.yLen - o.length;
      [...c].forEach((a, l) => {
        if (!i[a])
          return;
        const u = i[a].clone(), m = this.field[n][l];
        u.center = m.center, u.middle = m.middle, m.piece = u;
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
    const { displayPtn: o = 0, isMoved: c = !1 } = r, { pieces: h } = this, n = this.#t(i);
    typeof t == "string" && (t = new y(this.ctx, h[t], { displayPtn: o, deg: n, isMoved: c }));
    const a = this.field[s][e];
    t.center = a.center, t.middle = a.middle, a.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, c = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(y.degChars).map((n) => `
` + n + "持ち駒:")
    ).reduce(
      (n, a) => n.replace(new RegExp(a, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (n) => n.match(/.{2}/g)
    );
    for (let n = 0; n < r; n++)
      for (let a = 0; a < i; a++)
        try {
          const l = c[n][a], u = y.stringToPiece(s, l);
          u.center = e[n][a].center, u.middle = e[n][a].middle, e[n][a].piece = u;
        } catch {
          e[n][a].piece = null;
        }
    this.stand.clear();
    const h = c[r];
    h && h.forEach((n) => {
      const a = y.stringToPiece(s, n);
      a && this.stand.add(a);
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
    return s = this.#t(s + i), s === 0 ? o - 1 - e : s === 90 ? t : s === 180 ? e : s === 270 ? r - 1 - t : -1;
  }
  /** 角度基準のマス目の列を取得する
   * @param {Panel} panel - マス目
   * @param {number} deg - 角度
   * @param {number} offsetDeg - 補正角度
   * @returns {number}
   */
  getCol(t, e, s, i = 0) {
    const { xLen: r, yLen: o } = this;
    return s = this.#t(s + i), s === 0 ? t : s === 90 ? o - 1 - e : s === 180 ? r - 1 - t : s === 270 ? e : -1;
  }
  /** プロモーションエリア内であるか判別
   * @param {Panel} panel - マス目
   */
  checkCanPromo(t) {
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: o } = s, [c, h] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((a) => e - a - (0 | this.promoLineOffset));
    let n;
    return this.sidePromo ? n = Math.max(
      ...Object.keys(y.degChars).map((a) => 0 | a).filter((a) => a !== o).map(
        (a) => this.getRow(i, r, a, 180)
      )
    ) : n = this.getRow(i, r, o), {
      canPromo: c <= n,
      forcePromo: h <= n
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
  #s(t, e, s, i) {
    const { freeMode: r } = this, { piece: o } = e;
    if (!o.promo || o.hasAttr("promoted") || !s) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [c, { name: h }] of Object.entries(o.promo))
        if (confirm(`成りますか?
	${o.char}:${o.name}
	　↓
	${c}:${h}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), o.promotion(c);
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
    let { canPromo: o, forcePromo: c } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: h } = e;
    h.center = e.center, h.middle = e.middle, h.isMoved = !0;
    const n = this.checkCanPromo(e);
    o ||= n.canPromo, c ||= n.forcePromo, r.setMoved(e), this.#s(t, e, o, c), this.#e();
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
      ({ to: s, from: i, deg: r, pieceChar: o, end: c }) => `${y.degChars[r]}${t(s)}${e(s)}${o}${c} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: o, panelWidth: c, panelHeight: h } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(c / 2, h / 2), t.strokeRect(0, 0, r - c, o - h), t.restore(), this.stand.draw(), this.field.forEach((n) => {
      n.forEach((a) => {
        a.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  get bodText() {
    const { xLen: t, players: e, stand: s } = this;
    if (e !== 2) {
      const n = `players=${e}, players need 2.`;
      return console.error(n), n;
    }
    let i = ` ${[...Array(t).keys()].map((n) => ` ${O.num2Col(t - n)}`).join("")}
+${Array(t).fill("---").join("")}+
`, r = `
+${Array(t).fill("---").join("")}+`, o = "|", c = "";
    return `${s.getBodText(180)}
` + i + this.field.map(
      (n, a) => o + n.map(
        (l) => l.piece?.getBodText() ?? l.getBodText()
      ).join(c) + o + O.num2Row(a + 1)
    ).join(`
`) + r + `
${s.getBodText(0)}`;
  }
  /** 駒配置をテキストで取得
   * {boolean} isMinimam - 縮小表示
   */
  toString(t = !1) {
    const { xLen: e } = this;
    let s = "", i = "", r = "", o = "", c = `
`;
    return t || (s = `┏${Array(e).fill("━━").join("┯")}┓
`, i = `
┗${Array(e).fill("━━").join("┷")}┛`, r = "┃", o = "│", c = `
┠${Array(e).fill("──").join("┼")}┨
`), s + this.field.map(
      (h) => r + h.map(
        (n) => "" + (n.piece ?? n.toString(t))
      ).join(o) + r
    ).join(c) + i + this.stand.toString(t);
  }
  /** 画像を取得
   * @param {string} fileName - ファイル名
   * @param {string} ext - 拡張子
   * @returns {Promise<void>}
   */
  async downloadImage(t, e) {
    await ot(this.canvas, t, e);
  }
}
export {
  V as Board,
  y as Piece,
  Q as boards,
  T as canvasFont,
  B as canvasImage,
  pt as gameSoft,
  K as games
};
