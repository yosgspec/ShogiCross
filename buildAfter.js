import path from "path";
import fs from "fs/promises";
import querystring from "querystring";
import admZip from "adm-zip";
import markdownIt from "markdown-it";
const md = markdownIt();

// ライブラリ名
const lib = "ShogiCross";

// パス定義
const srcDir = "./src";
const viteDir = "./dist";
const distDir = path.join(srcDir, "dist");
const paperDir = "./paper";
const docDir = "./doc";
const htmlDir = path.join(srcDir, "pages/md");

/** 出力ファイルを掃除 */
async function clearDist(){
	return (await fs.readdir(distDir, {recursive: true}))
		.filter(f=>!f.match(/\.html$/))
		.map(f=>{
			const distFiles = path.join(distDir, f);
			return fs.rm(distFiles, {recursive: true});
		});
}

/** Viteのビルドファイルを移動 */
async function moveVite(){
	return Promise.all(
		(await fs.readdir(viteDir, {recursive: true}))
		.map(async f=>{
			if(!(await fs.stat(path.join(viteDir, f))).isFile()) return;
			return fs.rename(path.join(viteDir, f), path.join(distDir, path.basename(f)))
		})
	).then(()=>
		fs.rm(viteDir, {recursive: true})
	);
}

/** ライブラリ及び関連ファイルをコピー */
async function copyLib(){
	const cpFiles = ["ShogiCross/", "json/", "img/"];
	return cpFiles.map(f=>{
		const srcFiles = path.join(srcDir, f);
		const distFiles = path.join(distDir, f);
		return fs.cp(srcFiles, distFiles, {recursive: true});
	});
}

/** コード最小化 */
async function minifyLib(){
	const minFiles = (await fs.readdir(distDir))
		.filter(f=>f.match(/\.js$/));
	return minFiles.map(async f=>{
		const baseFile = path.join(distDir, f);
		const minFile = baseFile.replace(/\.js$/, ".min.js");
		const code = await fs.readFile(baseFile, {encoding: "utf8"});
		const response = await fetch(
			"https://www.toptal.com/developers/javascript-minifier/api/raw", {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: querystring.stringify({input: code})
		});
		if(!response.ok) throw Error(`minify error. filename: ${minFile}`);
		const minifyCode = await response.text();
		await fs.writeFile(minFile, minifyCode);
	});
}

/** ZIPファイルを配置する */
async function zipDist(){
	const zipFiles = [
		{in: distDir, out: lib},
		{in: paperDir, out: "paper"}
	];
	return zipFiles.map(f=>{
		const zip = new admZip();
		zip.addLocalFolder(f.in);
		return zip.writeZipPromise(`${srcDir}/${f.out}.zip`);
	});
}

/** mdファイルへ変換 */
async function convMd(){
	return (await fs.readdir(docDir, {recursive: true}))
		.filter(f=>f.match(/\.md$/))
		.map(async f=>{
			const code = await fs.readFile(path.join(docDir, f), {encoding: "utf8"});
			const htmlCode = md.render(code);
			const htmlName = f.replace(/\.md$/, ".html");
			const htmlFile = path.join(htmlDir, htmlName);
			await fs.mkdir(path.dirname(htmlFile), {recursive: true});
			await fs.writeFile(htmlFile, htmlCode);
		}
	);
}

// メイン処理
(async function main(){
	await Promise.all(await clearDist());
	await moveVite();
	await Promise.all([
		await copyLib(),
		await minifyLib(),
		await zipDist(),
		await convMd()
	].flat());
	console.log("Build After Success!");
})();
