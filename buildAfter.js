import path from "path";
import fs from "fs/promises";
import querystring from "querystring";
import admZip from "adm-zip";

// パス定義
const inputName = process.argv[2];
const inputNameExt = ext=>`${inputName}.${ext}`;
const srcDir = path.dirname(inputName);
const baseDir = path.join(".", "src");
const distDir = path.join(baseDir, "dist");
const fileName = path.join(distDir, path.parse(inputName).name);
const fileNameExt = ext=>`${fileName}.${ext}`;

// Viteビルドファイルを移動
await fs.rename(inputNameExt("js"), fileNameExt("js"));
await fs.rename(inputNameExt("iife.js"), fileNameExt("g.js"));
await fs.rm(srcDir, {recursive: true});

// ライブラリ及び関連ファイルをコピー
const cpFiles = ["ShogiCross/", "json/", "img/", "ShogiCross.d.ts", "ShogiCross.g.d.ts"];
await Promise.all(
	cpFiles.map(async f=>{
		const srcFiles = path.join(baseDir, f);
		const distFiles = path.join(distDir, f);
		return fs.rm(distFiles, {recursive: true})
			.catch(()=>{})
			.finally(()=>fs.cp(srcFiles, distFiles, {recursive: true}))
			.catch(()=>{});
	})
);

// コード最小化
const minFiles = [fileNameExt("js"), fileNameExt("g.js")];
await Promise.all(minFiles.map(async file=>{
	const code = await fs.readFile(file, {encoding: "utf8"});
	const response = await fetch(
		"https://www.toptal.com/developers/javascript-minifier/api/raw",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: querystring.stringify({
				input: code
			})
		}
	);
	const minifyCode = await response.text();
	await fs.writeFile(file.replace(/\.js$/, ".min.js"), minifyCode);
}))

// ZIPファイルを配置する
const zip = new admZip();
zip.addLocalFolder(distDir);
await zip.writeZipPromise(`${baseDir}/ShogiCross.zip`);

console.log("Build After Success!");
