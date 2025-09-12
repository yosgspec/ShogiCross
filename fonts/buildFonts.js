import fs from "fs/promises";
import path from "path";
import simpleGit from "simple-git";
const git = simpleGit();
import canvasFont from "../src/ShogiCross/data/canvasFont.js";


const GIT_URL = "https://github.com/google/fonts.git";
const FONT_DIR = "./fonts";
const TEMP_DIR = "./temp";
const OFL_URL = "https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/notoserif/OFL.txt";
const FONT_CSS_PATH = "./fonts.css";
const MASTER_FONT_NAME = "ShogiCross";

async function buildFonts(){
	await fs.rmdir(FONT_DIR, {recursive: true, force: true});
	await fs.mkdir(FONT_DIR);
	await git.clone(GIT_URL, TEMP_DIR, ["--filter=blob:none", "--sparse"]);
	const repo = simpleGit(FONT_DIR);
	for(const [fontName] of canvasFont.font){
		const gitPath = path.join("ofl", fontName.replace(/\s/g, "").toLowerCase());
		await repo.raw(["sparse-checkout", "set", gitPath]);
		await Promise.all(
			(await fs.readdir(gitPath))
			.filter(f=>f.endsWith(".ttf"))
			.map(f=>fs.copyFile(
				path.join(TEMP_DIR, gitPath, f),
				path.join(FONT_DIR, f))
			)
		);
	}

	// ライセンス配置
	const res = await fetch(OFL_URL);
	const ofl_text = await res.text();
	const ofl_path = path.basename(OFL_URL);
	await fs.writeFile(ofl_path, ofl_text, "utf8");

	console.log("Font Built!");
};
buildFonts();
