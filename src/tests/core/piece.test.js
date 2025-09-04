import { jest } from '@jest/globals';

// canvasFontLoader.js と canvasImageLoader.js をモック
jest.mock('./canvasFontLoader.js', () => ({
  canvasFont: {
    names: 'sans-serif',
  },
}));
jest.mock('./canvasImageLoader.js', () => ({
  canvasImage: {
    imported: false,
  },
}));


describe('Piece', () => {
  let mockCtx;
  let Piece; // Pieceクラスを保持する変数

  beforeEach(() => {
    // jest.doMockを使用して、各テストの実行前にモックを確実に設定する
    jest.doMock('./data.js', () => ({
      games: {
        Shogi: {
          fontColor: '#000000',
          backgroundColor: '#FFFFFF',
          borderColor: '#777777',
          promoteFontColor: '#FF0000',
          promoteBackgroundColor: '#FFFF00',
          promoteBorderColor: '#0000FF',
        },
      },
      pieces: {
        '歩': { id: 0, char: '歩', gameName: 'Shogi', display: ['歩'], range: 'straight', promo: 'と', alias: ['フ'], unit: '歩', base: { char: '歩' } },
        'と': { id: 1, char: 'と', gameName: 'Shogi', display: ['と'], range: 'complex', attr: ['promoted'], unit: '成' },
        '金': { id: 2, char: '金', gameName: 'Shogi', display: ['金'], range: 'diagonal', unit: '金', base: { char: '金' } },
        '銀': { id: 3, char: '銀', gameName: 'Shogi', display: ['銀'], range: 'testRange1', base: { char: '銀' } },
      },
      pieceRange: {
        'testRange1': [['a', 'b'], ['c', 'd']],
        'testRange2': [['x']],
        'straight': [['', 'x', ''], ['', 'P', ''], ['', 'x', '']],
        'diagonal': [['x', '', 'x'], ['', 'P', ''], ['x', '', 'x']],
        'complex': [['x', 'x', 'x'], ['x', 'P', 'x'], ['x', 'x', 'x']],
      },
      pieceCost: { '歩': 1, '香': 2, 'と': 10, '飛': 0, '金': 0, '銀': 3 },
    }));

    jest.resetModules(); // 各テストの前にモジュールキャッシュをリセット
    Piece = require('./piece.js').Piece; // CommonJS形式でインポート

    // canvasImageLoader.js のモックをリセット
    const { canvasImage } = require('./canvasImageLoader.js');
    canvasImage.imported = false;
    canvasImage.images = {};

    mockCtx = {
      _strokeStyle: '',
      _fillStyle: '',
      _lineWidth: 0,
      _font: '',
      _textAlign: '',

      save: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      fillText: jest.fn(),
      restore: jest.fn(),
      fillRect: jest.fn(),
      drawImage: jest.fn(),

      get strokeStyle() { return this._strokeStyle; },
      set strokeStyle(value) { this._strokeStyle = value; },
      get fillStyle() { return this._fillStyle; },
      set fillStyle(value) { this._fillStyle = value; },
      get lineWidth() { return this._lineWidth; },
      set lineWidth(value) { this._lineWidth = value; },
      get font() { return this._font; },
      set font(value) { this._font = value; },
      get textAlign() { return this._textAlign; },
      set textAlign(value) { this._textAlign = value; },
    };

    // Piece クラスの描画関連メソッドをスパイ
    jest.spyOn(Piece.prototype, 'drawImage');
    jest.spyOn(Piece.prototype, 'drawMaskImage');
    jest.spyOn(Piece.prototype, 'makePath');
    jest.spyOn(Piece.prototype, 'drawPieceShadow');
    jest.spyOn(Piece.prototype, 'drawPiece');
    jest.spyOn(Piece.prototype, 'drawMask');
  });

  test('should be instantiable', () => {
    const pieceData = {
      char: '歩',
      gameName: 'Shogi',
      display: ['歩'],
      range: {},
    };
    const piece = new Piece(mockCtx, pieceData);
    expect(piece).toBeInstanceOf(Piece);
    expect(piece.char).toBe('歩');
    expect(piece.cost).toBe(1);
  });

  test('getRank should return correct rank based on cost', () => {
    const pieceData = { char: '歩', gameName: 'Shogi', display: ['歩'], range: {} };
    const piece = new Piece(mockCtx, pieceData);

    piece.cost = 0;
    expect(piece.rank).toBe('KR');

    piece.cost = 25;
    expect(piece.rank).toBe('SR');

    piece.cost = 15;
    expect(piece.rank).toBe('R');

    piece.cost = 7;
    expect(piece.rank).toBe('UC');

    piece.cost = 3;
    expect(piece.rank).toBe('C');
  });

  describe('stringToPiece', () => {
    let mockPieces; // beforeEachで初期化
    beforeEach(() => {
        mockPieces = {
        '歩': new Piece(mockCtx, { char: '歩', gameName: 'Shogi', display: ['歩'], range: {} }),
        '香': new Piece(mockCtx, { char: '香', gameName: 'Shogi', display: ['香'], range: {} }),
      };
    });


    test('should return a piece object from a valid string', () => {
      const piece = Piece.stringToPiece(mockPieces, '▲歩');
      expect(piece).toBeInstanceOf(Piece);
      expect(piece.char).toBe('歩');
      expect(piece.deg).toBe(0);
    });

    test('should return null for an invalid degree character', () => {
      const piece = Piece.stringToPiece(mockPieces, '？歩');
      expect(piece).toBeNull();
    });

    test('should return null for an invalid piece character', () => {
      const piece = Piece.stringToPiece(mockPieces, '▲銀');
      expect(piece).toBeNull();
    });

    test('should return null for an empty string', () => {
      const piece = Piece.stringToPiece(mockPieces, '');
      expect(piece).toBeNull();
    });
  });

  describe('expandRange', () => {
    test('should expand string range from pieceRange', () => {
      const expanded = Piece.expandRange('testRange1');
      expect(expanded).toEqual([['a', 'b'], ['c', 'd']]);
    });

    test('should return string as is if not in pieceRange', () => {
      const expanded = Piece.expandRange('nonExistentRange');
      expect(expanded).toBe('nonExistentRange');
    });

    test('should recursively expand array elements', () => {
      const expanded = Piece.expandRange(['testRange1', 'testRange2', 'literal']);
      expect(expanded).toEqual([[['a', 'b'], ['c', 'd']], [['x']], 'literal']);
    });

    test('should recursively expand object values', () => {
      const expanded = Piece.expandRange({ key1: 'testRange1', key2: 'literal', key3: ['testRange2'] });
      expect(expanded).toEqual({ key1: [['a', 'b'], ['c', 'd']], key2: 'literal', key3: [[['x']]] });
    });

    test('should return value as is for non-string, non-array, non-object types', () => {
      expect(Piece.expandRange(123)).toBe(123);
      expect(Piece.expandRange(true)).toBe(true);
      expect(Piece.expandRange(null)).toBe(null);
    });
  });

  describe('getRange', () => {
    let mockPiece;
    beforeEach(() => {
      mockPiece = new Piece(mockCtx, { char: '歩', gameName: 'Shogi', display: ['歩'], range: 'straight' });
    });

    test('should return the same range for 0 degrees', () => {
      mockPiece.deg = 0;
      const range = mockPiece.getRange();
      expect(range).toEqual([['', 'x', ''], ['', 'P', ''], ['', 'x', '']]);
    });

    test('should rotate range by 90 degrees', () => {
      mockPiece.deg = 90;
      const range = mockPiece.getRange();
      expect(range).toEqual([['', '', ''], ['x', 'P', 'x'], ['', '', '']]);
    });

    test('should rotate range by 180 degrees', () => {
      mockPiece.deg = 180;
      const range = mockPiece.getRange();
      expect(range).toEqual([['', 'x', ''], ['', 'P', ''], ['', 'x', '']]);
    });

    test('should rotate range by 270 degrees', () => {
      mockPiece.deg = 270;
      const range = mockPiece.getRange();
      expect(range).toEqual([['', '', ''], ['x', 'P', 'x'], ['', '', '']]);
    });

    test('should throw error for invalid degree', () => {
      mockPiece.deg = 45;
      expect(() => mockPiece.getRange()).toThrow('deg=45, deg need multiple of 90.');
    });
  });

  describe('clone', () => {
    let originalPiece;
    beforeEach(() => {
      originalPiece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
        displayPtn: 1,
        deg: 90,
        size: 50,
        isMoved: true,
      });
    });

    test('should create a new Piece instance', () => {
      const clonedPiece = originalPiece.clone();
      expect(clonedPiece).toBeInstanceOf(Piece);
      expect(clonedPiece).not.toBe(originalPiece); // 異なるインスタンスであること
    });

    test('should copy relevant properties to the new instance', () => {
      const clonedPiece = originalPiece.clone();
      expect(clonedPiece.char).toBe(originalPiece.char);
      expect(clonedPiece.gameName).toBe(originalPiece.gameName);
      expect(clonedPiece.display).toEqual(originalPiece.display); // 配列はdeep equality
      expect(clonedPiece.range).toEqual(originalPiece.range); // rangeもdeep equality
      expect(clonedPiece.displayPtn).toBe(originalPiece.displayPtn);
      expect(clonedPiece.deg).toBe(originalPiece.deg);
      expect(clonedPiece.size).toBe(originalPiece.size);
      expect(clonedPiece.isMoved).toBe(originalPiece.isMoved);
    });

    test('should not modify the original piece when cloning', () => {
      const originalDisplayPtn = originalPiece.displayPtn;
      const originalDeg = originalPiece.deg;
      const originalSize = originalPiece.size;
      const originalIsMoved = originalPiece.isMoved;

      const clonedPiece = originalPiece.clone();

      // クローン後のオリジナルピースのプロパティが変更されていないことを確認
      expect(originalPiece.displayPtn).toBe(originalDisplayPtn);
      expect(originalPiece.deg).toBe(originalDeg);
      expect(originalPiece.size).toBe(originalSize);
      expect(originalPiece.isMoved).toBe(originalIsMoved);
    });
  });

  describe('promotion', () => {
    let originalPiece;
    let promotedPieceData;

    beforeEach(() => {
      // 成る前の駒のデータ
      originalPiece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
        promo: 'と', // 'と金'に成る
      });

      // 成った後の駒のデータ（getPiecesで合成される形を模倣）
      promotedPieceData = new Piece(mockCtx, {
        char: 'と',
        gameName: 'Shogi',
        display: ['と'],
        range: 'complex',
        attr: ['promoted'],
        unit: '成',
      });

      // originalPieceのpromoプロパティをモック
      originalPiece.promo = {
        'と': promotedPieceData,
      };
    });

    test('should promote the piece to the specified character', () => {
      originalPiece.promotion('と');
      expect(originalPiece.char).toBe('と');
      expect(originalPiece.display).toEqual(['と']);
      expect(originalPiece.range).toEqual(promotedPieceData.range);
      expect(originalPiece.hasAttr('promoted')).toBe(true);
    });

    test('should throw error if promo property is missing', () => {
      const pieceWithoutPromo = new Piece(mockCtx, { char: '歩', gameName: 'Shogi', display: ['歩'], range: 'straight' });
      expect(() => pieceWithoutPromo.promotion('と')).toThrow('promo=と, Not plomote piece.');
    });

    test('should throw error if promoted key is missing', () => {
      const pieceWithEmptyPromo = new Piece(mockCtx, { char: '歩', gameName: 'Shogi', display: ['歩'], range: 'straight', promo: {} });
      pieceWithEmptyPromo.promo = {}; // promoを空のオブジェクトに設定
      expect(() => pieceWithEmptyPromo.promotion('と')).toThrow('promo=と, Plomote key is missing.');
    });

    test('should throw error if piece is already promoted', () => {
      originalPiece.attr.push('promoted'); // 既に成っている状態にする
      expect(() => originalPiece.promotion('と')).toThrow('promo=と, Promoted piece.');
    });
  });

  describe('turnFront', () => {
    let promotedPiece;
    let basePieceData;

    beforeEach(() => {
      // 元の駒のデータ
      basePieceData = {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
        attr: [], // ここを追加
      };

      // 成った駒のデータ（promotionメソッドで成った状態を模倣）
      promotedPiece = new Piece(mockCtx, {
        char: 'と',
        gameName: 'Shogi',
        display: ['と'],
        range: 'complex',
        attr: ['promoted'],
        unit: '成',
        base: basePieceData, // 元の駒のデータをbaseに設定
      });
    });

    test('should revert the piece to its base form', () => {
      promotedPiece.turnFront();
      expect(promotedPiece.char).toBe(basePieceData.char);
      expect(promotedPiece.display).toEqual(basePieceData.display);
      expect(promotedPiece.range).toEqual(basePieceData.range);
      expect(promotedPiece.hasAttr('promoted')).toBe(false); // promoted属性がなくなること
    });

    test('should not modify the base piece data', () => {
      const originalBaseChar = basePieceData.char;
      promotedPiece.turnFront();
      expect(basePieceData.char).toBe(originalBaseChar); // basePieceDataが変更されていないこと
    });
  });

  describe('hasAttr', () => {
    let pieceWithAttrs;
    let pieceWithoutAttrs;

    beforeEach(() => {
      pieceWithAttrs = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
        attr: ['promoted', 'captured'], // 属性を持つ駒
      });

      pieceWithoutAttrs = new Piece(mockCtx, {
        char: '香',
        gameName: 'Shogi',
        display: ['香'],
        range: 'straight',
        attr: [], // 属性を持たない駒
      });
    });

    test('should return true if the piece has the specified attribute', () => {
      expect(pieceWithAttrs.hasAttr('promoted')).toBe(true);
      expect(pieceWithAttrs.hasAttr('captured')).toBe(true);
    });

    test('should return false if the piece does not have the specified attribute', () => {
      expect(pieceWithAttrs.hasAttr('moved')).toBe(false);
      expect(pieceWithoutAttrs.hasAttr('promoted')).toBe(false);
    });

    test('should return false if the piece has no attributes', () => {
      expect(pieceWithoutAttrs.hasAttr('anyAttribute')).toBe(false);
    });
  });

  describe('checkRangeMouse', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      // 駒の中心座標とサイズを設定
      piece.center = 100;
      piece.middle = 100;
      piece.size = 50; // Piece.size = 45; とは異なる値でテスト
    });

    test('should return true if coordinates are within the piece range', () => {
      // 駒の中心
      expect(piece.checkRangeMouse(100, 100)).toBe(true);
      // 駒の左上隅に近い点
      expect(piece.checkRangeMouse(80, 76)).toBe(true);
      // 駒の右下隅に近い点
      expect(piece.checkRangeMouse(119, 124)).toBe(true);
    });

    test('should return false if coordinates are outside the piece range', () => {
      // 駒の左外
      expect(piece.checkRangeMouse(70, 100)).toBe(false);
      // 駒の右外
      expect(piece.checkRangeMouse(130, 100)).toBe(false);
      // 駒の上外
      expect(piece.checkRangeMouse(100, 70)).toBe(false);
      // 駒の下外
      expect(piece.checkRangeMouse(100, 130)).toBe(false);
    });

    test('should return false if coordinates are exactly on the boundary (excluding right/bottom)', () => {
      // rightとbottomは含まれない
      expect(piece.checkRangeMouse(piece.right, piece.middle)).toBe(false);
      expect(piece.checkRangeMouse(piece.center, piece.bottom)).toBe(false);
    });
  });

  describe('toString', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩', 'フ'], // displayPtn=0で'歩'、displayPtn=1で'フ'
        range: 'straight',
        deg: 0, // ▲
        alias: ['フ'], // エイリアス
      });
    });

    test('should return the correct string for default display (isAlias=false, displayPtn=0)', () => {
      expect(piece.toString()).toBe('▲歩');
    });

    test('should return the correct string for alias display (isAlias=true, displayPtn=1)', () => {
      piece.displayPtn = 1;
      expect(piece.toString(true)).toBe('▲フ');
    });

    test('should return the correct string for different degrees', () => {
      piece.deg = 90;
      expect(piece.toString()).toBe('≫歩');
      piece.deg = 180;
      expect(piece.toString()).toBe('▽歩');
      piece.deg = 270;
      expect(piece.toString()).toBe('＜歩');
    });

    test('should return char if isAlias is true but displayPtn is 0', () => {
      piece.displayPtn = 0;
      expect(piece.toString(true)).toBe('▲歩');
    });
  });

  describe('zoom', () => {
    let piece;

    beforeEach(() => {
      // Piece.size をデフォルト値に戻す
      Piece.size = 45; // ここを45に戻す
      Piece.useRankSize = false;
      Piece.rankRatio = {
        "KR": 1,
        "SR": 0.9,
        "R": 0.8,
        "UC": 0.7,
        "C": 0.6,
      };

      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
        size: 45, // ここで明示的にサイズを設定
      });
    });

    test('should return zoom based on Piece.size when useRankSize is false', () => {
      Piece.useRankSize = false;
      piece.size = 50; // インスタンスのsizeを設定
      console.log('piece.size (test 1):', piece.size);
      console.log('piece.zoom (test 1):', piece.zoom);
      expect(piece.zoom).toBe(0.5); // 50 / 100
    });

    test('should return zoom based on Piece.size and rankRatio when useRankSize is true', () => {
      piece.useRankSize = true;
      piece.size = 100; // インスタンスのsizeを設定
      piece.cost = 0; // KR
      expect(piece.zoom).toBe(1 * Piece.rankRatio["KR"]); // 1 * 1 = 1

      piece.cost = 25; // SR
      expect(piece.zoom).toBe(1 * Piece.rankRatio["SR"]); // 1 * 0.9 = 0.9

      piece.cost = 15; // R
      expect(piece.zoom).toBe(1 * Piece.rankRatio["R"]); // 1 * 0.8 = 0.8

      piece.cost = 7; // UC
      expect(piece.zoom).toBe(1 * Piece.rankRatio["UC"]); // 1 * 0.7 = 0.7

      piece.cost = 3; // C
      expect(piece.zoom).toBe(1 * Piece.rankRatio["C"]); // 1 * 0.6 = 0.6
    });

    test('should use instance size if set', () => {
      Piece.useRankSize = false;
      piece.size = 200;
      console.log('piece.size (test 2):', piece.size);
      console.log('piece.zoom (test 2):', piece.zoom);
      expect(piece.zoom).toBe(2.0); // 200 / 100
    });
  });

  describe('draw', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
    });

    test('should call drawImage and drawMaskImage if imgSrc and canvasImage.imported are true', async () => {
      const { canvasImage } = require('./canvasImageLoader.js');
      canvasImage.imported = true;
      piece.imgSrc = { 0: { 0: 'test.png' } };
      canvasImage.images['test.png'] = { width: 100, height: 100 }; // モック画像データ

      piece.isSelected = true;
      await piece.draw();

      expect(piece.drawImage).toHaveBeenCalledTimes(1);
      expect(piece.drawMaskImage).toHaveBeenCalledTimes(1);
      expect(piece.drawMaskImage).toHaveBeenCalledWith('#FF000055');
      expect(piece.drawPiece).not.toHaveBeenCalled();
      expect(piece.drawMask).not.toHaveBeenCalled();
    });

    test('should call drawPiece and drawMask if imgSrc is null and canvasImage.imported is false', async () => {
      const { canvasImage } = require('./canvasImageLoader.js');
      canvasImage.imported = false;
      piece.imgSrc = null;

      piece.isSelected = true;
      await piece.draw();

      expect(piece.drawPiece).toHaveBeenCalledTimes(1);
      expect(piece.drawMask).toHaveBeenCalledTimes(2);
      expect(piece.drawMask).toHaveBeenCalledWith('#FF000055');
      expect(piece.drawImage).not.toHaveBeenCalled();
      expect(piece.drawMaskImage).not.toHaveBeenCalled();
    });

    test('should not draw anything if ctx is null', async () => {
      piece.ctx = null;
      await piece.draw();

      expect(piece.drawImage).not.toHaveBeenCalled();
      expect(piece.drawMaskImage).not.toHaveBeenCalled();
      expect(piece.drawPiece).not.toHaveBeenCalled();
      expect(piece.drawMask).not.toHaveBeenCalled();
    });
  });

  describe('drawImage', () => {
    let piece;
    let canvasImage;

    beforeEach(() => {
      ({ canvasImage } = require('./canvasImageLoader.js'));
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
    });

    test('should call ctx methods with correct arguments when image is available', () => {
      piece.imgSrc = { 0: { 0: 'test.png' } };
      canvasImage.images['test.png'] = { width: 100, height: 100 };
      piece.deg = 0;
      piece.size = 50;
      piece.center = 100;
      piece.middle = 100;
      piece.isRotateImg = true;

      piece.drawImage();

      expect(mockCtx.save).toHaveBeenCalledTimes(1);
      expect(mockCtx.translate).toHaveBeenCalledWith(100, 100);
      expect(mockCtx.rotate).toHaveBeenCalledWith(0); // deg=0なのでrad=0
      expect(mockCtx.drawImage).toHaveBeenCalledWith(
        canvasImage.images['test.png'],
        expect.any(Number), // -imgWidth/2
        expect.any(Number), // -imgHeight/2
        expect.any(Number), // imgWidth
        expect.any(Number)  // imgHeight
      );
      expect(mockCtx.restore).toHaveBeenCalledTimes(1);
    });

    test('should not draw if ctx is null', () => {
      piece.ctx = null;
      piece.imgSrc = { 0: { 0: 'test.png' } };
      canvasImage.images['test.png'] = { width: 100, height: 100 };

      piece.drawImage();

      expect(mockCtx.save).not.toHaveBeenCalled();
      expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });

    test('should not draw if image is not available', () => {
      piece.imgSrc = { 0: { 0: 'nonexistent.png' } };
      canvasImage.images = {}; // 画像がない状態

      piece.drawImage();

      expect(mockCtx.save).not.toHaveBeenCalled();
      expect(mockCtx.drawImage).not.toHaveBeenCalled();
    });

    test('should use default image source if specific degree image is not available', () => {
      piece.imgSrc = { 0: { 0: 'default.png' }, 90: { 0: undefined } }; // deg=0の画像のみ
      canvasImage.images['default.png'] = { width: 100, height: 100 };
      piece.deg = 90; // 90度の画像はない

      piece.drawImage();

      expect(mockCtx.drawImage).toHaveBeenCalledWith(
        canvasImage.images['default.png'],
        expect.any(Number),
        expect.any(Number),
        expect.any(Number),
        expect.any(Number)
      );
    });

    test('should adjust image dimensions based on aspect ratio (width dominant)', () => {
      piece.imgSrc = { 0: { 0: 'wide.png' } };
      canvasImage.images['wide.png'] = { width: 200, height: 50 }; // 幅が広い画像
      piece.size = 50;
      piece.drawImage();

      const expectedWidth = 50; // size
      const expectedHeight = 50 / (200 / 50); // size / (width / height)
      expect(mockCtx.drawImage).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Number),
        expect.any(Number),
        expectedWidth,
        expectedHeight
      );
    });

    test('should adjust image dimensions based on aspect ratio (height dominant)', () => {
      piece.imgSrc = { 0: { 0: 'tall.png' } };
      canvasImage.images['tall.png'] = { width: 50, height: 200 }; // 高さが高い画像
      piece.size = 50;
      piece.drawImage();

      const expectedWidth = 50 * (50 / 200); // width / height * size
      const expectedHeight = 50; // size
      expect(mockCtx.drawImage).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Number),
        expect.any(Number),
        expectedWidth,
        expectedHeight
      );
    });

    test('should not rotate image if isRotateImg is false', () => {
      piece.imgSrc = { 0: { 0: 'test.png' }, 90: { 0: undefined } };
      canvasImage.images['test.png'] = { width: 100, height: 100 };
      piece.deg = 90;
      piece.isRotateImg = false;

      piece.drawImage();

      expect(mockCtx.rotate).not.toHaveBeenCalled();
    });
  });

  describe('drawMaskImage', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
    });

    test('should call ctx methods with correct arguments', () => {
      piece.center = 100;
      piece.middle = 100;
      piece.size = 50;
      const color = '#123456';

      piece.drawMaskImage(color);

      expect(mockCtx.fillStyle).toBe(color);
      expect(mockCtx.save).toHaveBeenCalledTimes(1);
      expect(mockCtx.translate).toHaveBeenCalledWith(100, 100);
      expect(mockCtx.fillRect).toHaveBeenCalledWith(
        -50 * 0.9 / 2, // -imgWidth/2
        -50 / 2,       // -imgHeight/2
        50 * 0.9,      // imgWidth
        50             // imgHeight
      );
      expect(mockCtx.restore).toHaveBeenCalledTimes(1);
    });

    test('should not draw if ctx is null', () => {
      piece.ctx = null;
      piece.drawMaskImage('#123');
      expect(mockCtx.save).not.toHaveBeenCalled();
      expect(mockCtx.fillRect).not.toHaveBeenCalled();
    });
  });

  describe('makePath', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
    });

    test('should call ctx methods to create the piece path', () => {
      piece.center = 100;
      piece.middle = 100;
      piece.deg = 0;
      const zoom = 1;

      piece.makePath(zoom);

      expect(mockCtx.translate).toHaveBeenCalledWith(100, 100);
      expect(mockCtx.rotate).toHaveBeenCalledWith(0);
      expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
      expect(mockCtx.moveTo).toHaveBeenCalledWith(-30 * zoom, -40 * zoom);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(0 * zoom, -50 * zoom);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(30 * zoom, -40 * zoom);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(45 * zoom, 50 * zoom);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(-45 * zoom, 50 * zoom);
      expect(mockCtx.closePath).toHaveBeenCalledTimes(1);
    });
  });

  describe('drawPieceShadow', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
      jest.spyOn(Piece.prototype, 'drawMask');
    });

    test('should call drawMask with shadow color if isDrawShadow is true', () => {
      piece.isDrawShadow = true;
      const zoom = 1;

      piece.drawPieceShadow(zoom);

      expect(mockCtx.save).toHaveBeenCalledTimes(2);
      expect(mockCtx.translate).toHaveBeenCalledWith(0, 10 * zoom);
      expect(piece.drawMask).toHaveBeenCalledWith('#00000066');
      expect(mockCtx.restore).toHaveBeenCalledTimes(2);
    });

    test('should not draw shadow if isDrawShadow is false', () => {
      piece.isDrawShadow = false;
      const zoom = 1;

      piece.drawPieceShadow(zoom);

      expect(mockCtx.save).not.toHaveBeenCalled();
      expect(piece.drawMask).not.toHaveBeenCalled();
    });
  });

  describe('drawPiece', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
      jest.spyOn(Piece.prototype, 'drawPiece').mockRestore();
      jest.spyOn(Piece.prototype, 'drawPieceShadow');
      jest.spyOn(Piece.prototype, 'makePath');
    });

    test('should call ctx methods with correct arguments for non-promoted piece', () => {
      piece.game = {
        fontColor: '#FONT',
        backgroundColor: '#BG',
        borderColor: '#BORDER',
      };
      piece.display = ['歩'];
      piece.displayPtn = 0;
      piece.size = 100;
      piece.useRankSize = false;

      piece.drawPiece();

      expect(mockCtx.strokeStyle).toBe('#BORDER');
      expect(mockCtx.fillStyle).toBe('#FONT');
      expect(mockCtx.lineWidth).toBe(8 * piece.zoom);
      expect(piece.drawPieceShadow).toHaveBeenCalledWith(piece.zoom);
      expect(mockCtx.save).toHaveBeenCalledTimes(3);
      expect(piece.makePath).toHaveBeenCalledWith(piece.zoom);
      expect(mockCtx.stroke).toHaveBeenCalledTimes(1);
      expect(mockCtx.fill).toHaveBeenCalledTimes(2);
      expect(mockCtx.fillStyle).toBe('#FONT');
      expect(mockCtx.font).toBe('40px sans-serif');
      expect(mockCtx.textAlign).toBe('center');
      expect(mockCtx.fillText).toHaveBeenCalledWith('歩', 0, expect.any(Number));
      expect(mockCtx.restore).toHaveBeenCalledTimes(3);
    });

    test('should call ctx methods with correct arguments for promoted piece', () => {
      piece.game = {
        fontColor: '#FONT',
        backgroundColor: '#BG',
        borderColor: '#BORDER',
        promoteFontColor: '#PFONT',
        promoteBackgroundColor: '#PBG',
        promoteBorderColor: '#PBORDER',
      };
      piece.attr.push('promoted');
      piece.display = ['と'];
      piece.displayPtn = 0;
      piece.size = 100;
      piece.useRankSize = false;

      piece.drawPiece();

      expect(mockCtx.strokeStyle).toBe('#PBORDER');
      expect(mockCtx.fillStyle).toBe('#PFONT');
      expect(mockCtx.lineWidth).toBe(8 * piece.zoom);
      expect(piece.drawPieceShadow).toHaveBeenCalledWith(piece.zoom);
      expect(mockCtx.save).toHaveBeenCalledTimes(3);
      expect(piece.makePath).toHaveBeenCalledWith(piece.zoom);
      expect(mockCtx.stroke).toHaveBeenCalledTimes(1);
      expect(mockCtx.fill).toHaveBeenCalledTimes(2);
      expect(mockCtx.fillStyle).toBe('#PFONT');
      expect(mockCtx.font).toBe('40px sans-serif');
      expect(mockCtx.textAlign).toBe('center');
      expect(mockCtx.fillText).toHaveBeenCalledWith('と', 0, expect.any(Number));
      expect(mockCtx.restore).toHaveBeenCalledTimes(3);
    });

    test('should not draw if ctx is null', () => {
      piece.ctx = null;
      piece.drawPiece();
      expect(mockCtx.strokeStyle).toBe('');
      expect(mockCtx.fillStyle).toBe('');
      expect(mockCtx.lineWidth).toBe(0);
      expect(piece.drawPieceShadow).not.toHaveBeenCalled();
      expect(mockCtx.save).not.toHaveBeenCalled();
      expect(piece.makePath).not.toHaveBeenCalled();
      expect(mockCtx.stroke).not.toHaveBeenCalled();
      expect(mockCtx.fill).not.toHaveBeenCalled();
      expect(mockCtx.fillText).not.toHaveBeenCalled();
      expect(mockCtx.restore).not.toHaveBeenCalled();
    });
  });

  describe('drawMask', () => {
    let piece;

    beforeEach(() => {
      piece = new Piece(mockCtx, {
        char: '歩',
        gameName: 'Shogi',
        display: ['歩'],
        range: 'straight',
      });
      jest.clearAllMocks();
      jest.spyOn(Piece.prototype, 'makePath');
    });

    test('should call ctx methods with correct arguments', () => {
      const color = '#ABCDEF';
      piece.size = 100;

      piece.drawMask(color);

      expect(mockCtx.fillStyle).toBe(color);
      expect(mockCtx.save).toHaveBeenCalledTimes(1);
      expect(piece.makePath).toHaveBeenCalledWith(piece.zoom);
      expect(mockCtx.fill).toHaveBeenCalledTimes(1);
      expect(mockCtx.restore).toHaveBeenCalledTimes(1);
    });

    test('should not draw if ctx is null', () => {
      piece.ctx = null;
      piece.drawMask('#123');
      expect(mockCtx.fillStyle).toBe('');
      expect(mockCtx.save).not.toHaveBeenCalled();
      expect(piece.makePath).not.toHaveBeenCalled();
      expect(mockCtx.fill).not.toHaveBeenCalled();
      expect(mockCtx.restore).not.toHaveBeenCalled();
    });
  });
  
  describe('Piece.getPieces', () => {
    beforeEach(() => {
      mockCtx = {}; // ダミーのctx
    });

    test('should initialize pieces correctly', () => {
      const result = Piece.getPieces(mockCtx);

      // '歩'のテスト
      expect(result['歩']).toBeInstanceOf(Piece);
      expect(result['歩'].char).toBe('歩');
      expect(result['歩'].id).toBe(0);
      expect(result['歩'].gameName).toBe('Shogi');
      expect(result['歩'].display).toEqual(['歩']);
      expect(result['歩'].range).toEqual([['', 'x', ''], ['', 'P', ''], ['', 'x', '']]);
      expect(result['歩'].cost).toBe(1);
      expect(result['歩'].attr).toEqual([]);
      expect(result['歩'].base.char).toBe(result['歩'].char);

      // '金'のテスト
      expect(result['金']).toBeInstanceOf(Piece);
      expect(result['金'].char).toBe('金');
      expect(result['金'].id).toBe(2);
      expect(result['金'].range).toEqual([['x', '', 'x'], ['', 'P', ''], ['x', '', 'x']]);
      expect(result['金'].base.char).toBe(result['金'].char);
    });

    test('should handle promotion correctly', () => {
      const result = Piece.getPieces(mockCtx);

      // '歩'のpromoプロパティのテスト
      expect(result['歩'].promo).toBeDefined();
      expect(result['歩'].promo['と']).not.toBeInstanceOf(Piece);
      expect(result['歩'].promo['と'].char).toBe('と');
      expect(result['歩'].promo['と'].unit).toBe('成');

      // 'と'（成駒）のテスト
      expect(result['と']).toBeInstanceOf(Piece);
      expect(result['と'].char).toBe('と');
      expect(result['と'].hasAttr('promoted')).toBe(true);
      expect(result['と'].unit).toBe('成');
      expect(result['と'].range).toEqual([['x', 'x', 'x'], ['x', 'P', 'x'], ['x', 'x', 'x']]);
    });

    test('should handle aliases correctly', () => {
      const result = Piece.getPieces(mockCtx);

      // 'フ'（エイリアス）のテスト
      expect(result['フ']).toBeInstanceOf(Piece);
      expect(result['フ'].char).toBe('歩');
      expect(result['フ'].displayPtn).toBe(1);
      expect(result['フ'].display).toEqual(['歩']);
      expect(result['フ']).not.toBe(result['歩']);
    });

    test('should apply options correctly', () => {
      const option = {
        displayPtn: 99,
        deg: 180,
        size: 100,
        useRankSize: true,
        isDrawShadow: false,
        isMoved: true,
      };
      const result = Piece.getPieces(mockCtx, option);

      // '歩'のオプション適用テスト
      expect(result['歩'].displayPtn).toBe(99);
      expect(result['歩'].deg).toBe(180);
      expect(result['歩'].size).toBe(100);
      expect(result['歩'].useRankSize).toBe(true);
      expect(result['歩'].isDrawShadow).toBe(false);
      expect(result['歩'].isMoved).toBe(true);
    });

    test('should call expandRange for each piece\'s range', () => {
      const expandRangeSpy = jest.spyOn(Piece, 'expandRange');
      Piece.getPieces(mockCtx);
      expect(expandRangeSpy).toHaveBeenCalledTimes(63);
      expandRangeSpy.mockRestore();
    });
  });

  describe('Piece.piecesToList', () => {
    let piece1, piece2, piece3;

    beforeEach(() => {
      mockCtx = {};
      piece1 = new Piece(mockCtx, { id: 10, char: 'A', gameName: 'Shogi', display: ['A'], range: {}, base: { char: 'A' } });
      piece2 = new Piece(mockCtx, { id: 5, char: 'B', gameName: 'Shogi', display: ['B'], range: {}, base: { char: 'B' } });
      piece3 = new Piece(mockCtx, { id: 20, char: 'C', gameName: 'Shogi', display: ['C'], range: {}, base: { char: 'C' } });
    });

    test('should sort pieces by id in ascending order', () => {
      const piecesMap = {
        'A': piece1,
        'B': piece2,
        'C': piece3,
      };
      const sortedList = Piece.piecesToList(piecesMap);
      expect(sortedList).toEqual([
        ['A', piece1],
        ['B', piece2],
        ['C', piece3],
      ]);
    });

    test('should return an empty array for an empty object', () => {
      const sortedList = Piece.piecesToList({});
      expect(sortedList).toEqual([]);
    });

    test('should handle pieces with same id (order by key)', () => {
      const piece4 = new Piece(mockCtx, { id: 10, char: 'D', gameName: 'Shogi', display: ['D'], range: {}, base: { char: 'D' } });
      const piecesMap = {
        'A': piece1,
        'D': piece4, // 同じIDを持つがキーが異なる
      };
      const sortedList = Piece.piecesToList(piecesMap);
      expect(sortedList).toEqual([
        ['A', piece1],
        ['D', piece4],
      ]);
    });
  });
});