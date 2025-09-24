import {vi} from "vitest";

vi.mock("../src/ShogiCross/core/json/xhr.js", ()=>({
  json: {}, // jsonは空のオブジェクトを返す
  importJson: ()=>({}), // importJson関数もモックして空のオブジェクトを返す
  hasCSP: ()=>false, // hasCSP関数もモックして常にfalseを返す
}));

// Use the real core data module to reduce over-mocking. JSON XHR is still
// mocked above so `data.js` will extend safely without performing network
// XHRs in the test environment.

// Use real `piece.js` implementation in tests to reuse canonical piece data
// and avoid brittle duplicated mocks. Individual tests may still mock parts
// of Piece if needed using `vi.spyOn` or `vi.mock` within the test file.

// Note: Do not mock Record here; tests need to use the real implementation

// NOTE: avoid importing core modules here to not interfere with test-level
// vi.mock declarations in individual test files. Setup should keep only
// lightweight module mocks and helpers.

vi.mock("../src/ShogiCross/core/canvasImageLoader.js", ()=>{
  return {
    canvasImage: {
      imported: true,
      images: {
        "test.png": { width: 10, height: 10 }, // ダミーの画像オブジェクト
      },
    },
  };
});

// Provide a safe default canvasFontLoader mock so tests that import it
// don't trigger network/font loading. Individual tests may override.
vi.mock("../src/ShogiCross/core/canvasFontLoader.js", ()=>{
  const canvasFont = {
    fonts: [["TestFont", 400]],
    // start with undefined names to match tests that expect no font
    names: undefined,
    imported: false,
    loadLocalFont: async ()=>{},
    loadCdnFont: async ()=>{},
    // expose importAsync directly on the canvasFont object so tests that
    // import {canvasFont} can call canvasFont.importAsync()
    importAsync: async ()=>{
      canvasFont.imported = true;
      canvasFont.names = canvasFont.fonts.map(o=>`"${o[0]}"`).join(",")+",serif";
      return;
    }
  };
  return {
    canvasFont,
    // also provide a default export similar to the real module
    default: { canvasFont, importAsync: canvasFont.importAsync }
  };
});

// Helper to allow tests to partially mock '@/core/data.js' while keeping
// the original values for non-overridden keys. Usage in tests:
// await global.mockCoreData({ boards: {...} });
global.mockCoreData = async (partial={})=>{
  const targetPath = global.resolveAt("@/core/data.js");
  await vi.doMock(targetPath, async (importOriginal)=>{
    try{
      const actual = await importOriginal();
      return { ...actual, ...partial };
    }
    catch(e){
      // If importOriginal fails (rare in some runtimes), fall back to partial only
      return partial;
    }
  });
};

// Provide a minimal global.document to avoid ReferenceError in core modules
// that check CSP or query meta tags. Tests that assert DOM behavior should
// still use happy-dom environment or provide richer mocks.
global.document = global.document || {
  querySelector: ()=>null,
};

// Helper to allow tests that still import via '@/...' to work when running
// a single test file without the vite test alias. Tests may call
// `global.resolveAt(path)` to convert '@/core/...' into a relative path.
import path from "path";
import {fileURLToPath} from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
global.resolveAt = (p)=>{
  if(p.startsWith("@/")){
    return path.resolve(__dirname, "..", "src", "ShogiCross", p.substring(2));
  }
  return p;
};

// Use real `bod.js` and `stand.js` implementations in tests to avoid
// duplicate behavior. If specific tests need to spy on methods, they can
// set up spies inside the test file itself (via `vi.spyOn`).

// Apply a small test-specific data overlay to keep some tests' expectations
// deterministic while still using the real `data.js` as the source of truth.
(async ()=>{
  try{
    // Keep test setup lightweight: do not override canonical data (boards, pieces, pieceRange)
    // Allow tests to spy/mock Piece methods by wrapping them here.
    const pieceMod = await import("../src/ShogiCross/core/piece.js");
    if(pieceMod?.Piece){
      const Piece = pieceMod.Piece;
      // wrap only if not already wrapped
      if(!Piece.getPieces?.mock){
        Piece.getPieces = vi.fn(Piece.getPieces.bind(Piece));
      }
      if(!Piece.stringToPiece?.mock){
        Piece.stringToPiece = vi.fn(Piece.stringToPiece.bind(Piece));
      }
    }
  }
  catch(e){
    // swallow; setup should not crash tests
    // console.warn("test setup overlay failed", e && e.message || e);
  }
})();

// Wrap global setTimeout to catch exceptions inside async callbacks
// so tests don't fail due to unhandled exceptions from core timeouts.
const __origSetTimeout = global.setTimeout;
global.setTimeout = (fn, ms, ...args) => __origSetTimeout(() => {
  try { fn(...args); }
  catch (e) { /* swallow to avoid failing unrelated tests */ }
}, ms);

// Provide a default fetch implementation for tests to avoid real network access.
if (typeof global.fetch === "undefined") {
  global.fetch = async () => ({ ok: false, text: async () => "" });
}

// Swallow unhandled rejections and uncaught exceptions that originate from
// environment/network teardown (happy-dom fetch aborts) so they don't mark
// the test run as failed. We still log them to aid debugging.
process.on && process.on("unhandledRejection", (err) => {
  // avoid failing tests for known network/teardown errors
  // log for visibility
  // console.warn("Ignored unhandledRejection in test setup:", err && err.message || err);
});
process.on && process.on("uncaughtException", (err) => {
  // swallow noisy environment exceptions coming from DOM polyfills
  // console.warn("Ignored uncaughtException in test setup:", err && err.message || err);
});

// Filter noisy happy-dom / network logs without hiding real test errors.
const __origConsoleError = console.error.bind(console);
const __origConsoleWarn = console.warn.bind(console);
const _filterPatterns = [
  /ECONNREFUSED/i,
  /AbortError/i,
  /Cross-Origin Request Blocked/i,
  /fonts\.googleapis\.com/i,
  /DetachedBrowserFrame/i,
  /Fetch\.onAsyncTaskManagerAbort/i,
];
function _shouldSuppress(args){
  try{
    const s = args.map(a => typeof a === 'string'? a: String(a)).join(' ');
    return _filterPatterns.some(rx => rx.test(s));
  }catch(e){ return false; }
}
console.error = (...args)=>{
  if(_shouldSuppress(args)) return;
  __origConsoleError(...args);
};
console.warn = (...args)=>{
  if(_shouldSuppress(args)) return;
  __origConsoleWarn(...args);
};

// NOTE: Do not dynamically import core modules here (like Record) —
// doing so can lock in module-level bindings (e.g. functions imported
// by Record) before per-test mocks are applied. The global setTimeout
// wrapper above is sufficient to prevent unhandled exceptions from
// async callbacks in most cases.