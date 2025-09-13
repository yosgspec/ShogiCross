import path from "path";
import fs from "fs/promises";
import icongen from "icon-gen";
const conf = JSON.parse(await fs.readFile("./src-tauri/tauri.conf.json"));

const ICON_PATH = "../src/sample/img/favicon.min.svg";
const INDEX_PATH = "../src/app.html";
const LIB_PATH = "../src/dist/ShogiCross_nojson.min.js";
const CSS_PATH = "../src/shogicross.css";
const GAME_DIR = "../src/game";
const FONT_DIR = "../font/fonts";
const OFL_PATH = "../font/OFL.txt";
const IMPORT_LIB_NAME = "ShogiCross/lib.js";
const APP_ICON_DIR = "./src-tauri/icons";
const APP_SRC_DIR = "./src";
const APP_GAME_DIR = "./src/game"
const APP_FONT_DIR = "./src/fonts";
const APP_IMPORT_LIB_NAME = "ShogiCross.js";
const {icon} = conf.bundle;

/** アプリ構築用ファイルを収集 */
async function stageApp(){
	await Promise.all([
		// アプリのアイコンフォルダ作成
		await fs.mkdir(APP_ICON_DIR, {recursive: true}).catch(_=>{})
		// アイコンファイル生成
		.then(()=>icongen(
			ICON_PATH, APP_ICON_DIR, {
				report: true,
				ico: {name: "app"},
				icns: {name: "app"},
				favicon: {name: "app", pngSizes: [192, 512], icoSizes: []},
			}
		))
		// 不要なアイコンファイルを削除
		.then(async ()=>
			(await fs.readdir(APP_ICON_DIR, {recursive: true}))
			.filter(f=>!icon.some(iconName=>iconName.endsWith(f)))
			.map(f=>fs.rm(path.join(APP_ICON_DIR, f)))
		),
		// アプリのソースフォルダ作成
		await fs.mkdir(APP_GAME_DIR, {recursive: true}).catch(_=>{})
		.then(async ()=>[
			// index.htmlをコピー
			await fs.copyFile(INDEX_PATH, path.join(APP_SRC_DIR, "index.html")),
			// コアライブラリをコピー
			await fs.copyFile(LIB_PATH, path.join(APP_SRC_DIR, APP_IMPORT_LIB_NAME)),
			// CSSをコピー
			await fs.copyFile(CSS_PATH, path.join(APP_SRC_DIR, path.basename(CSS_PATH))),
			// ゲーム用ライブラリをコピー
			// コアライブラリを差し替え
			...(await fs.readdir(GAME_DIR)).map(async f=>
				fs.writeFile(
					path.join(APP_GAME_DIR, f),
					(await fs.readFile(path.join(GAME_DIR, f), "utf8"))
					.replace(IMPORT_LIB_NAME, APP_IMPORT_LIB_NAME)
				)
			),
		].flat()),
		// フォントフォルダ作成
		await fs.mkdir(APP_FONT_DIR, {recursive: true}).catch(_=>{})
		.then(async ()=>[
			// フォントライセンスをコピー
			await fs.copyFile(OFL_PATH, path.join("./", path.basename(OFL_PATH))),
			// フォントをコピー
			...(await fs.readdir(FONT_DIR, {recursive: true})).map(f=>
				fs.copyFile(
					path.join(FONT_DIR, f),
					path.join(APP_FONT_DIR, f)
				)
			),
		].flat()),
	]);
	console.log("Collected App Resources.");
}
stageApp();
