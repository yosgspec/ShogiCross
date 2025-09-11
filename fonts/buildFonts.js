import fs from "fs/promises";
import path from "path";
import {constructURL, download} from "google-fonts-helper";
import postcss from "postcss";
import canvasFont from "../src/ShogiCross/data/canvasFont.js";

const FONT_DIR = "./fonts";
const OFL_URL = "https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/notoserif/OFL.txt";
const FONT_CSS_PATH = "./fonts.css";
const MASTER_FONT_NAME = "ShogiCross";

async function buildFonts(){
	// フォントダウンロード
	const url = constructURL({
		families: Object.fromEntries(
			canvasFont.fonts.map(
				([key, wt])=>[key, {wght: ""+wt}]
			)
		)
	});
	const downloader = download(url, {
		base64: false,
		overwriting: true,
		outputDir: './',
	})
	await downloader.execute();

	// ライセンス配置
	const res = await fetch(OFL_URL);
	const ofl_text = await res.text();
	const ofl_path = path.join(FONT_DIR, path.basename(OFL_URL));
	await fs.writeFile(ofl_path, ofl_text, "utf8");

	// フォント用CSS編集
	const css = await fs.readFile(FONT_CSS_PATH, "utf8");
	const root = postcss.parse(css);
	const fontFaces = root.nodes.filter(node=>
		node.type === "atrule" && node.name === "font-face");

	// フォント定義をソート
	fontFaces.sort((...args)=>
		args.map(a=>
			canvasFont.fonts.findIndex(([name])=>
				name === a.nodes.find(n=>n.prop === "font-family").value.replace(/['"]/g, "")
			)
		).reduce((a, b)=>a-b)
	);
	root.nodes = fontFaces;

	// フォント名を統一
	root.walkAtRules("font-face", fontFace=>{
		fontFace.walkDecls("font-family", fontFamily=>{
			if(fontFamily.value.includes("Color")) return;
			fontFamily.value = `'${MASTER_FONT_NAME}'`;
		});
	});

	await fs.writeFile(FONT_CSS_PATH, root.toString());

	console.log("Font Built!");
};
buildFonts();
