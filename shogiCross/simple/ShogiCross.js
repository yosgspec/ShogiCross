const _ = "./json/ShogiCross/";
async function $(f) {
  return await fetch(`${_}${f}.json`).then(async (t) => await t.json()).catch(() => {
  });
}
const A = await $("canvasFont"), pt = await $("gameSoft"), K = await $("games"), Q = await $("boards"), B = await $("panels"), H = await $("pieces"), Z = await $("pieceRange"), tt = await $("pieceCost"), et = () => [
  .../* @__PURE__ */ new Set([
    ...Object.values(B).map(({ displayText: f }) => f).join("") + Object.values(H).map(({ display: f }) => f ? f.join("") : "").join("")
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
        const r = s.replace(/ /g, "+"), o = `${f}${r}:wght@${i}&text=${t}`, h = await fetch(o);
        if (!h.ok)
          return;
        const a = (await h.text()).match(/url\(.+?\)/g);
        if (!a)
          throw new Error("Not found font.");
        for (const n of a) {
          const l = new FontFace(`${s}${e}`, n);
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
  Object.values(B).flatMap(({ imgSrc: f }) => f ?? []).concat(Object.values(H).flatMap(({ imgSrc: f }) => f ?? []))
)], z = {
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
class M {
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
  constructor(t, e, s, i, r, o, h, c, a) {
    Object.assign(this, B[e]), this.ctx = t, this.center = s, this.middle = i, this.width = r, this.height = o, this.left = s - r / 2, this.top = i - o / 2, this.right = s + r / 2, this.bottom = i + o / 2, this.borderWidth = h, this.pX = c, this.pY = a, this.selectColor ??= "#FF000066", this.targetColor ??= "#00FF0066", this.piece = null, this.isSelected = !1, this.clearTarget(), this.attr ??= [];
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
    const { ctx: t, left: e, top: s, center: i, middle: r, width: o, height: h, displayText: c, textRotate: a } = this;
    if (t.fillStyle = this.backgroundColor, t.strokeStyle = this.borderColor, t.lineWidth = this.borderWidth, t.save(), t.translate(e, s), t.fillRect(0, 0, o, h), this.intersect ? (t.lineWidth = this.borderWidth, t.beginPath(), t.moveTo(o / 2, 0), t.lineTo(o / 2, h), t.moveTo(0, h / 2), t.lineTo(o, h / 2), t.closePath(), t.stroke()) : t.strokeRect(0, 0, o, h), t.lineWidth = this.borderWidth / 2, t.beginPath(), this.borderSlashLeft && (t.moveTo(0, 0), t.lineTo(o, h)), this.borderSlashRight && (t.moveTo(o, 0), t.lineTo(0, h)), t.closePath(), t.stroke(), t.restore(), c) {
      t.save(), t.translate(i, r), t.fillStyle = this.borderColor;
      const n = a ? a * Math.PI / 180 : 0;
      t.rotate(n);
      const l = Math.min(this.width, this.height) * 0.6;
      t.font = `${l}px ${A.names}`;
      const u = t.measureText(c).width, w = l / 2 * 0.8;
      t.fillText(c, -u / 2, w), t.restore();
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
    return M.panelText;
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
    SR: 0.965,
    R: 0.935,
    UC: 0.9,
    C: 0.865
  };
  /** 駒の段階別価値を取得 */
  get rank() {
    return this.cost <= 0 ? "KR" : 20 <= this.cost ? "SR" : 10 <= this.cost ? "R" : 5 <= this.cost ? "UC" : "C";
  }
  /**
   * @typedef {Object} PieceInitOptions - 駒の初期化オプション
   * @property {string} name - 駒の名前
   * @property {string[]} display - 駒に表示する文字列(1、2文字)の配列
   * @property {string} imgSrc - 駒として表示する画像パスの配列
   * @property {boolean}isRotateImg - 過画像を設定する場合回転するか
   * @property {string} alias - キーの別名として定める文字の集合表
   * @property {string} gameName - 駒に対応するゲーム名
   * @property {string} expansion - ゲーム名の細分類
   * @property {"兵"|"馬"|"象"|"車"|"臣"|"王"|"成"} unit - 駒の兵種
   * @property {number}forcePromoLine - 行きどころのない駒となる段
   * @property {Object} range - 駒の移動範囲
   * @property {string[]} range.default - 通常時の移動範囲
   * @property {string[]} range.attack - 駒取得時の移動範囲
   * @property {string[]} range.start - 初回のみの移動範囲
   * @property {string[]} range.castling - キャスリング時の移動範囲
   * @property {string[]} range.enPassant - アンパッサン時の移動範囲
   * @property {string[]} range.palaceSlash - 九宮内での移動範囲
   * @property {string} promo - プロモーション先の駒の一文字表記
   * @property {string[]} attr - 駒の機能のリスト
   */
  /** 駒データを初期化
   * @param {any} ctx - Canvas描画コンテキスト
   * @param {Piece|PieceInitOptions} options - 駒の初期化オプション
   */
  static getPieces(t, e = {}) {
    const s = new Map(Object.entries(JSON.parse(JSON.stringify(H))));
    for (const [r, o] of s)
      o.attr ??= [], o.unit && o.unit === "成" && (o.base = o);
    for (const [r, o] of s) {
      if (!o.promo || typeof o.promo != "string")
        continue;
      const h = [...o.promo];
      o.promo = {};
      for (const c of h) {
        const a = s.get(c);
        a.attr.push("promoted"), a.unit = "成", o.promo[c] = a, s.set(c, { ...o, ...a });
      }
    }
    [...s].forEach(([r, o], h) => {
      o.id = h, o.char = r, s.set(r, new S(t, o, e));
    });
    const i = Object.fromEntries(s);
    for (const [r, o] of s)
      o.alias.forEach((h, c) => {
        const a = o.clone(), n = [...a.display];
        a.displayPtn = c + 1, a.display = n, a.alias[c] = r, i[h] = a;
      });
    return i;
  }
  /** 文字列から駒を取得
   * @param {Piece|PieceInitOptions} piece - 駒
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
   * @param {Piece|PieceInitOptions} piece - 駒
   * @param {Object} options - オプション
   * @param {number} options.displayPtn - 表示文字列を変更(1〜)
   * @param {number} options.deg - 駒の角度
   * @param {number} options.size - 駒の大きさ
   * @param {boolean} options.useRankSize - 駒の大きさを格の違いで変更するか
   * @param {boolean} options.isDrawShadow - 駒の影の描写有無
   * @param {boolean} options.isMoved - 初回移動済みか否か
   */
  constructor(t, e, s = {}) {
    const {
      displayPtn: i = 0,
      deg: r = 0,
      size: o = S.size,
      useRankSize: h = S.useRankSize,
      isDrawShadow: c = S.isDrawShadow,
      isMoved: a = !1
    } = s;
    Object.assign(this, e), this.ctx = t, this.display ??= [""], this.imgSrc ??= null, this.alias = [...this.alias ?? ""], this.displayPtn = i, this.game = K[this.gameName], this.cost = tt[this.char] ?? 1, this.center = 0, this.middle = 0, this.deg = r, this.size = o, this.useRankSize = h, this.isDrawShadow = c, this.isRotateImg ??= !0, this.isMoved = a, this.isSelected = !1, this.attr ??= [];
    try {
      Object.entries(this.range).forEach(([n, l]) => {
        Array.isArray(l) || (this.range[n] = Z[l].map((u) => [...u]));
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
          const i = (r) => r[0].map((o, h) => r.map((c) => c[h]));
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
    this.imgSrc && z.imported ? (this.drawImage(), this.isSelected && this.drawMaskImage(t)) : (this.drawPiece(), this.isSelected && this.drawMask(t));
  }
  /** 駒画像を描写 */
  drawImage() {
    const { ctx: t, size: e } = this, s = this.imgSrc[this.displayPtn], i = z.images[s];
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
    const h = [..."" + this.display[this.displayPtn]], c = 40 * s;
    t.font = `${c}px ${A.names}`, t.textAlign = "center", h.forEach((a, n) => {
      const l = h.length === 1 ? c / 2 : n * c;
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
  /** BOD形式テキストを取得
   * @returns {string}
   */
  getBodText() {
    return M.pieceDegChars[this.deg] + this.char;
  }
  /** 文字列形式で取得 */
  toString() {
    return S.degChars[this.deg] + this.char;
  }
}
Object.entries(S.degChars).forEach(([f, t]) => {
  S.charDegs[t] = f;
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
      for (let [h, { isOwn: c }] of ct)
        o === h && (t.push({ isOwn: c, oX: r, oY: i }), c && ([e, s] = [r, i]));
    }
  return t.map((i) => (i.offsetX = i.oX - e, i.offsetY = i.oY - s, i));
}
function dt(f, t, e, s) {
  const { field: i, yLen: r, enPassant: o } = f;
  function h(d, g) {
    return i[g] && i[g][d] && !i[g][d].hasAttr("keepOut");
  }
  function c(d) {
    return d.piece && t.hasAttr("po") && d.piece.hasAttr("po");
  }
  function a(d) {
    return d.piece && !t.isMoved && !d.piece.isMoved && t.hasAttr("pao") && t.cost < d.piece.cost;
  }
  function n(d, g, v, p = "", y = !0) {
    if (!i[v] || !i[v][g])
      return !1;
    const C = i[v][g];
    return !C || c(C) || a(C) || p === "enPassant" && !o.isTarget(C, t) || t.hasAttr("inPalace") && !C.hasAttr("palace") || p.indexOf("palace") === 0 && !(C.hasAttr(p) && i[s][e].hasAttr(p)) || t.hasAttr("unCrossRiver") && r - (0 | r / 2) <= f.getRow(g, v, t.deg) ? !1 : d ? i[v][g].piece ? y ? t.deg !== i[v][g].piece.deg : !0 : !1 : !i[v][g].piece;
  }
  function l(d, g, v, p, y) {
    for (const C of g)
      for (let b = 0; b < d.length; b++)
        for (let R = 0; R < d[b].length; R++) {
          const [x, m] = [R + e - p, b + s - y];
          if (!(!h(x, m) || n(v, 0 | x, 0 | m, "", !1) || d[b][R] !== C))
            return !0;
        }
    return !1;
  }
  function u(d, g, v) {
    const p = i[v][g];
    p.addTarget(d), o.setTarget(p, t);
  }
  function w(d, [g, { isAttack: v }], { oX: p, oY: y, isOwn: C }) {
    if (C)
      for (const [b, { child: R = [] } = {}] of ht)
        for (let x = 0; x < d.length; x++)
          for (let m = 0; m < d[x].length; m++) {
            const [j, L] = [m + e - p, x + s - y];
            !h(j, L) || !n(v, j, L, g) || d[x][m] !== b || l(d, R, !1, p, y) || u(g, j, L);
          }
  }
  function k(d, [g, { isAttack: v }], { oX: p, oY: y, isOwn: C, offsetX: b, offsetY: R }) {
    if (!(!C && !n(!1, e + b, s + R)))
      for (const [x, { jmps: m = 0, moves: j = 0 } = {}] of N) {
        const L = !j || j === 0;
        for (let E = y - 1; E <= y + 1; E++)
          for (let T = p - 1; T <= p + 1; T++) {
            if (d[E][T] !== x || T === p && E === y)
              continue;
            let F = m || 0, O = j || 0;
            const [q, G] = [T - p, E - y];
            for (let X = e, Y = s; ; ) {
              X += q, Y += G;
              const P = X + b, D = Y + R;
              if (!h(P, D) || !L && O === 0)
                break;
              const I = F === 0;
              I && n(v, P, D, g, I) ? (O--, u(g, P, D)) : m < 1 && O--;
              const U = i[D][P];
              if (U.piece && (F--, I || c(U)))
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
        for (const y of lt(p))
          w(p, g, y), k(p, g, y);
    }
  })();
}
function ft(f) {
  let t = !1, e = [], s = null, i = null;
  const { canvas: r } = f, o = (n, l, u = () => {
  }) => {
    const w = window.getComputedStyle(r), k = n.target.getBoundingClientRect();
    let d = r.width / parseFloat(w.width), g = r.height / parseFloat(w.height);
    if (n.clientX)
      d *= n.clientX - k.left, g *= n.clientY - k.top;
    else if (0 < n.touches.length) {
      if (1 < n.touches.length)
        return;
      d *= n.touches[0].clientX - k.left, g *= n.touches[0].clientY - k.top;
    } else
      n.preventDefault(), [d, g] = e;
    f.field.forEach((v, p) => v.forEach((y, C) => l(y, d, g, C, p))), u(d, g), f.draw(), e = [d, g];
  }, h = (n) => {
    t = !0, o(
      n,
      (l, u, w) => {
        const { piece: k, pX: d, pY: g } = l;
        k && l.checkRangeMouse(u, w) && (n.preventDefault(), k.isSelected = !0, s = l, dt(f, k, d, g));
      },
      (l, u) => {
        for (const [w, k] of Object.entries(f.stand.stocks))
          for (let d = k.length - 1; 0 <= d; d--)
            if (k[d].checkRangeMouse(l, u)) {
              n.preventDefault(), k[d].isSelected = !0, i = { deg: w, i: d };
              return;
            }
      }
    );
  }, c = (n) => {
    !t || !(s || i) || o(
      n,
      (l, u, w) => {
        l.isSelected = l.checkRangeMouse(u, w);
      }
    );
  }, a = (n) => {
    t = !1, o(
      n,
      (l, u, w) => {
        l.checkRangeMouse(u, w) && (s && f.movePiece(s, l), i && !l.piece && f.stand.releasePiece(l, i));
      }
    ), o(
      n,
      (l) => {
        l.piece && (l.piece.isSelected = !1), l.isSelected = !1, l.clearTarget();
      },
      () => {
        for (const [l, u] of Object.entries(f.stand.stocks))
          for (let w = u.length - 1; 0 <= w; w--)
            u[w].isSelected = !1;
        s = null, i = null;
      }
    );
  };
  return r.addEventListener("mousedown", h), r.addEventListener("mousemove", c), r.addEventListener("mouseup", a), r.addEventListener("touchstart", h), r.addEventListener("touchmove", c), r.addEventListener("touchend", a), {
    removeEvent() {
      r.removeEventListener("mousedown", h), r.removeEventListener("mousemove", c), r.removeEventListener("mouseup", a), r.removeEventListener("touchstart", h), r.removeEventListener("touchmove", c), r.removeEventListener("touchend", a);
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
    const { top: e, right: s, bottom: i, width: r, height: o, panelWidth: h, panelHeight: c, xLen: a, yLen: n } = t;
    this.clear(), this.left = s * 1.02, this.top = e, this.width = r / 2, this.height = o, this.right = this.left + this.width, this.bottom = i, this.pitchWidth = h / 2, this.pitchHeight = c, this.xLen = a, this.yLen = n;
  }
  /** 駒台を初期化にする */
  clear() {
    this.stocks = [...Array(4)].map((t) => []);
  }
  /** 持ち駒からボード上に配置する
   * @param {Panal} toPanell - 配置先のパネル
   * @param {Object} options - オプション
   * @param {number} options.deg - 角度
   * @param {number} options.i - 配置する持ち駒のインデックス
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
    const { board: t, left: e, top: s, width: i, height: r, pitchWidth: o, pitchHeight: h } = this, { ctx: c, xLen: a, yLen: n } = t;
    c.fillStyle = t.backgroundColor, c.strokeStyle = t.borderColor, c.lineWidth = t.borderWidth, c.save(), c.translate(e, s), c.fillRect(0, 0, i, r), c.strokeRect(0, 0, i, r), c.restore(), this.stocks.forEach((l, u) => {
      let w = 0;
      l = l.slice(-n / 4 * a);
      for (let k = 0 | n / 4 * u; k < n / 4 * (u + 1); k++)
        for (let d = 0; d < a; d++) {
          const g = e + o * (d + 1), v = s + h * (k + 1), p = l[w++];
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
    }), M.standDegChars[t] + [...e].map(
      ([s, i]) => s + M.num2Row(i)
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
      for (const o of Object.values(S.degChars))
        r = r.replace(o, `
${o}持駒：${o}`);
    }
    return i + r;
  }
}
const gt = Object.keys(S.degChars), J = () => ({
  panel: null,
  piece: null
});
class ut {
  constructor() {
    this.degs = {}, gt.forEach((t) => this.degs[t] = J());
  }
  /** アンパッサン情報をクリア
   * @param {number} deg - アンパッサンされうる陣営の角度
   */
  clear(t) {
    this.degs[t] = J();
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
  /**
   * @typedef {Object} BoardInitOptions - ボードの初期化オプション
   * @property {number} canvasWidth - キャンバス幅
   * @property {number} canvasHeight - キャンバス高さ
   * @property {canvasFit} canvasFit - キャンバスサイズの自動調整
   * @property {number} boardLeft - 描写するX座標
   * @property {number} boardTop - 描写するY座標
   * @property {number} panelWidth - マス目幅
   * @property {number} panelHeight - マス目高さ
   * @property {number} pieceSize - 駒の大きさ
   * @property {boolean} useRankSize - 駒の大きさを格の違いで変更するか
   * @property {boolean} isDrawShadow - 駒の影の描写有無
   * @property {number} borderWidth - 枠線太さ
   * @property {boolean} useStand - 駒台の使用有無
   * @property {string} backgroundColor - 背景色(デフォルト無色)
   * @property {boolean} autoDrawing - 描写の自動更新有無
   * @property {(Board)=>void} onDrawed - 描写イベント
   * @property {boolean} freeMode - フリーモード有効化/無効化
  */
  /** ゲームを実行する
   * @param {HTMLCanvasElement}} canvas - Canvas要素
   * @param {BoardInitOptions} options - ボードの初期化オプション
   * @param {string} options.playBoard - ボードタイプ
   * @param {Object} options.playPieces - 駒セット
   * @param {string} options.playPieces.gameName - ゲーム名(基準となる駒の配置セット)
   * @param {string} options.playPieces.pieceSet - 駒の配置パターン
   * @returns Board
   */
  static run(t, e) {
    const { playBoard: s, playPieces: i, onDrawed: r } = e, o = i.some(({ gameName: c }, a) => 1 < a && c) ? 4 : 2, h = new V(t, s, {
      ...e,
      players: o,
      onDrawed: r
    });
    return i.forEach(({ gameName: c, pieceSet: a }, n) => {
      if (c) {
        a ??= "default";
        try {
          h.putStartPieces(n, c, a);
        } catch {
        }
      }
    }), h.onDrawed = r, h;
  }
  /**
   * @typedef {"overflow"|"horizontal"|"vertical"|"parentOverflow"|"parentHorizontal"|"parentVertical"|null} canvasFit
   */
  /**
   * @param {HTMLCanvasElement} canvas - Canvas要素
   * @param {string} playBoard - ボードタイプ
   * @param {number} players - プレイヤー人数(2 or 4)
   * @param {BoardInitOptions} options - ボードの初期化オプション
   */
  constructor(t, e, s) {
    const {
      players: i = 2,
      canvasWidth: r = void 0,
      canvasHeight: o = void 0,
      canvasFit: h = "overflow",
      boardLeft: c = 5,
      boardTop: a = 5,
      panelWidth: n = 50,
      panelHeight: l = 0 | n * 1.1,
      pieceSize: u = 0 | n * 0.9,
      useRankSize: w = !0,
      isDrawShadow: k = !0,
      borderWidth: d = Math.min(n, l) / 30,
      useStand: g = !1,
      backgroundColor: v = "#00000000",
      autoDrawing: p = !0,
      onDrawed: y,
      freeMode: C = !1
    } = s, b = A.importAsync(), R = z.importAsync();
    this.canvas = t;
    const x = t.getContext("2d");
    if (x.clearRect(0, 0, t.width, t.height), this.ctx = x, this.pieces = S.getPieces(x, {
      size: u,
      useRankSize: w,
      isDrawShadow: k
    }), Object.assign(this, Q[e]), ![2, 4].includes(i))
      throw Error(`players=${i}, players need 2 or 4.`);
    this.players = i, this.left = c, this.top = a, this.panelWidth = n, this.panelHeight = l, this.borderWidth = d, this.pieceSize = u, this.canvasBackgroundColor = v, this.field = this.field.map(
      (j, L) => [...j].map((E, T) => {
        const F = c + n * (T + 1), O = a + l * (L + 1);
        return new nt(x, E, F, O, n, l, d, T, L);
      })
    ), this.xLen = this.field[0].length, this.yLen = this.field.length, this.width = this.panelWidth * (this.xLen + 1), this.height = this.panelHeight * (this.yLen + 1), this.right = c + this.width, this.bottom = a + this.height, this.stand = new W(this), t.width = r ?? (g ? this.stand.right : this.right) + 5, t.height = o ?? this.bottom + 5;
    const { style: m } = t;
    h === "overflow" ? (m.maxWidth === "" && (m.maxWidth = "97vw"), m.maxHeight === "" && (m.maxHeight = "97vh")) : h === "horizontal" ? m.width === "" && (m.width = "97vw") : h === "vertical" ? m.height === "" && (m.height = "97vh") : h === "parentOverflow" ? (m.maxWidth === "" && (m.maxWidth = "100%"), m.maxHeight === "" && (m.maxHeight = "100%")) : h === "parentHorizontal" ? m.width === "" && (m.width = "100%") : h === "parentVertical" && m.height === "" && (m.height = "100%"), this.autoDrawing = p, p && (b.then(() => this.draw()), R.then(() => this.draw()), this.draw()), this.onDrawed ??= y, this.freeMode = C, this.record = [], this.uiControl = ft(this), this.enPassant = new ut();
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
        const i = (r) => r[0].map((o, h) => r.map((c) => c[h]));
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
    o.forEach((h, c) => {
      if (h.length < this.xLen)
        throw Error(h.join(""));
      const a = c + this.yLen - o.length;
      [...h].forEach((n, l) => {
        if (!i[n])
          return;
        const u = i[n].clone(), w = this.field[a][l];
        u.center = w.center, u.middle = w.middle, w.piece = u;
      });
    }), this.rotateField(-r), this.autoDrawing && this.draw();
  }
  /** 駒の配置
   * @param {string} piece - 駒の表現文字
   * @param {number} pX - X方向配置位置(マス目基準)
   * @param {number} pY - Y方向配置位置(マス目基準)
   * @param {number} playeaIdOrDeg - プレイヤー番号または駒の配置角
   * @param {Object} options - オプション
   * @param {number} options.displayPtn - 表示文字列を変更(1〜)
   * @param {boolean} options.isMoved - 初回移動済みか否か
   */
  putNewPiece(t, e, s, i, r = {}) {
    const { displayPtn: o = 0, isMoved: h = !1 } = r, { pieces: c } = this, a = this.#t(i);
    typeof t == "string" && (t = new S(this.ctx, c[t], { displayPtn: o, deg: a, isMoved: h }));
    const n = this.field[s][e];
    t.center = n.center, t.middle = n.middle, n.piece = t, this.autoDrawing && this.draw();
  }
  /** 文字列から駒を配置
   * {string} text - 駒配置を表す文字列
   */
  inputPieces(t) {
    const { field: e, pieces: s, xLen: i, yLen: r } = this, h = [t].concat(
      [..."┏━┯┓┗┷┛┃│┠─┼┨―"],
      Object.values(S.degChars).map((a) => `
` + a + "持ち駒:")
    ).reduce(
      (a, n) => a.replace(new RegExp(n, "g"), "")
    ).replace(/\n\n/g, `
`).replace(/　/g, "・").trim().split(/\n/).map(
      (a) => a.match(/.{2}/g)
    );
    for (let a = 0; a < r; a++)
      for (let n = 0; n < i; n++)
        try {
          const l = h[a][n], u = S.stringToPiece(s, l);
          u.center = e[a][n].center, u.middle = e[a][n].middle, e[a][n].piece = u;
        } catch {
          e[a][n].piece = null;
        }
    this.stand.clear();
    const c = h[r];
    c && c.forEach((a) => {
      const n = S.stringToPiece(s, a);
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
    const { yLen: e } = this, { piece: s, pX: i, pY: r } = t, { deg: o } = s, [h, c] = [
      s.game.promoLine,
      s.forcePromoLine
    ].map((n) => e - n - (0 | this.promoLineOffset));
    let a;
    return this.sidePromo ? a = Math.max(
      ...Object.keys(S.degChars).map((n) => 0 | n).filter((n) => n !== o).map(
        (n) => this.getRow(i, r, n, 180)
      )
    ) : a = this.getRow(i, r, o), {
      canPromo: h <= a,
      forcePromo: c <= a
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
    let { canPromo: o, forcePromo: h } = this.checkCanPromo(t);
    s.capturePiece(
      t.piece,
      e.piece,
      e.hasAttr("capture"),
      e.hasAttr("cantCapture")
    ), e.piece = t.piece, t.piece = null;
    const { piece: c } = e;
    c.center = e.center, c.middle = e.middle, c.isMoved = !0;
    const a = this.checkCanPromo(e);
    if (o ||= a.canPromo, h ||= a.forcePromo, r.setMoved(e), !c.promo || c.hasAttr("promoted") || !o) {
      this.addRecord(e, { fromPanel: t });
      return;
    }
    do
      for (const [n, { name: l }] of Object.entries(c.promo))
        if (confirm(`成りますか?
	${c.char}:${c.name}
	　↓
	${n}:${l}`)) {
          this.addRecord(e, { fromPanel: t, end: "成" }), c.promotion(n);
          return;
        }
    while (!i && h);
    this.addRecord(e, { fromPanel: t, end: "不成" });
  }
  /** 棋譜を追記
   * @param {Panel} toPanel - 移動先のマス目
   * @param {Object} options - オプション
   * @param {Panel} options.fromPanel - 移動元のマス目
   * @param {string} options.end - オプション=成|不成|打
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
      ({ to: s, from: i, deg: r, pieceChar: o, end: h }) => `${S.degChars[r]}${t(s)}${e(s)}${o}${h} (${t(i)}${e(i)})`
    ).join(`
`);
  }
  /** 盤を描写 */
  draw() {
    const { ctx: t, canvas: e, left: s, top: i, width: r, height: o, panelWidth: h, panelHeight: c } = this;
    t.restore(), t.save(), t.clearRect(0, 0, e.width, e.height), t.fillStyle = this.canvasBackgroundColor, t.fillRect(0, 0, e.width, e.height), t.fillStyle = this.backgroundColor, t.lineWidth = this.borderWidth, t.strokeStyle = this.borderColor, t.save(), t.translate(s, i), t.fillRect(0, 0, r, o), t.strokeRect(0, 0, r, o), t.translate(h / 2, c / 2), t.strokeRect(0, 0, r - h, o - c), t.restore(), this.stand.draw(), this.field.forEach((a) => {
      a.forEach((n) => {
        n.draw();
      });
    }), this.onDrawed && this.onDrawed(this);
  }
  /** BOD形式テキストを取得
   * @returns {string}
   */
  get bodText() {
    const { xLen: t, players: e, stand: s } = this;
    if (e !== 2) {
      const a = `players=${e}, players need 2.`;
      return console.error(a), a;
    }
    let i = ` ${[...Array(t).keys()].map((a) => ` ${M.num2Col(t - a)}`).join("")}
+${Array(t).fill("---").join("")}+
`, r = `
+${Array(t).fill("---").join("")}+`, o = "|", h = "";
    return `${s.getBodText(180)}
` + i + this.field.map(
      (a, n) => o + a.map(
        (l) => l.piece?.getBodText() ?? l.getBodText()
      ).join(h) + o + M.num2Row(n + 1)
    ).join(`
`) + r + `
${s.getBodText(0)}`;
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
      (c) => r + c.map(
        (a) => "" + (a.piece ?? a.toString(t))
      ).join(o) + r
    ).join(h) + i + this.stand.toString(t);
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
  S as Piece,
  Q as boards,
  A as canvasFont,
  z as canvasImage,
  pt as gameSoft,
  K as games
};
