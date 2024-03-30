import path from "path";
import fs from "fs/promises";
import querystring from "querystring";
import admZip from "adm-zip";
import markdownIt from "markdown-it";
const md = markdownIt();

// ライブラリ名
const libName = "ShogiCross";

// パス定義
const srcDir = "./src";
const viteDir = "./dist";
const viteLib = ext=>`${path.join(viteDir, libName)}.${ext}`;
const distDir = path.join(srcDir, "dist");
const distLib = ext=>`${path.join(distDir, libName)}.${ext}`;
const paperDir = "./paper";
const docDir = "./doc";
const htmlDir = path.join(srcDir, "pages/md");

/** 出力ファイルを掃除 */
async function clearDist(){
	return (await fs.readdir(distDir, {recursive: true}))
		.filter(f=>
			!f.match(/\.html$/)
		).map(f=>{
			const distFiles = path.join(distDir, f);
			return fs.rm(distFiles, {recursive: true});
		});
}

/** Viteのビルドファイルを移動 */
async function moveVite(){
	return Promise.all([
		"js",
		"js.map",
		"iife.js",
		"iife.js.map"
	].map(ext=>
		fs.rename(viteLib(ext), distLib(ext))
	)).then(()=>
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
	const minFiles = [distLib("js"), distLib("iife.js")];
	return minFiles.map(async f=>{
		const code = await fs.readFile(f, {encoding: "utf8"});
		const response = await fetch(
			"https://www.toptal.com/developers/javascript-minifier/api/raw", {
			method: "POST",
			headers: {"Content-Type": "application/x-www-form-urlencoded"},
			body: querystring.stringify({input: code})
		});
		const minifyCode = await response.text();
		if(minifyCode.match(/error/)) throw Error("minify error.");
		await fs.writeFile(f.replace(/\.js$/, ".min.js"), minifyCode);
	});
}

/** ZIPファイルを配置する */
async function zipDist(){
	const zipFiles = [
		{in: distDir, out: libName},
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
	await Promise.all([
		await moveVite(),
		await copyLib(),
		await minifyLib(),
		await zipDist(),
		await convMd()
	].flat());
	console.log("Build After Success!");
})();
