import fs from "fs/promises";
import path from "path";
import simpleGit from "simple-git";
import canvasFont from "../../src/ShogiCross/data/canvasFont.js";

const GIT_URL = "https://github.com/google/fonts.git";
const TTF_DIR = "./ttf";
const FONT_DIR = "./fonts";
const TEMP_DIR = "./temp";
const OFL_NAME = "OFL.txt"

async function downloadTtf(){
	await fs.rm(TTF_DIR, {recursive: true, force: true}).catch(()=>{});
	await fs.mkdir(TTF_DIR, {recursive: true});
	await fs.mkdir(FONT_DIR, {recursive: true});

	const git = simpleGit();
	await git.clone(GIT_URL, TEMP_DIR, ["--filter=blob:none", "--sparse"]);

	const tempRepo = simpleGit(TEMP_DIR);

	for(const [fontName] of canvasFont.fonts) {
		const gitPath = path.posix.join(
			"ofl",
			fontName.replace(/\s/g, "").toLowerCase()
		);

		await tempRepo.raw(["sparse-checkout", "set", gitPath]);
		await Promise.all(
			(await fs.readdir(path.join(TEMP_DIR, gitPath)))
			.filter(f=>f.endsWith(".ttf") && !f.includes("Italic"))
			.map(f=>
				fs.copyFile(
					path.join(TEMP_DIR, gitPath, f),
					path.join(TTF_DIR, `${fontName.replace(/\s/g, "")}.ttf`)
				)
			)
		);
		await fs.copyFile(
			path.join(TEMP_DIR, gitPath, OFL_NAME),
			path.join(FONT_DIR, OFL_NAME)
		);
	}
	// ライセンス配置
	await fs.rm(TEMP_DIR, {recursive: true, force: true}).catch(()=>{});
	console.log("Download Fonts!");
}

downloadTtf();
