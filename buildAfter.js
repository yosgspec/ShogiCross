import path from "path";
import fs from "fs/promises";
import querystring from "querystring";

const inputName = process.argv[2];
const srcDir = path.dirname(inputName);
const baseDir = path.join(".", "shogiCross");
const distDir = path.join(baseDir, "dist");
const fileName = path.join(distDir, path.parse(inputName).name);
const fileNameExt = ext=>`${fileName}.${ext}`;

// distからdistへビルドファイルを移動
await fs.rename(inputName, fileNameExt("js"));
await fs.rm(srcDir, {recursive: true});

// ライブラリ及び関連ファイルをdistフォルダへコピー
const cpFiles = ["ShogiCross/", "json/", "img/", "ShogiCross.d.ts"];
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
const code = await fs.readFile(fileNameExt("js"), {encoding: "utf8"});
const response = await fetch(
	"https://www.toptal.com/developers/javascript-minifier/api/raw",
	{
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: querystring.stringify({
			input: code
		})
	}
);
const minifyCode = await response.text();
await fs.writeFile(fileNameExt("min.js"), minifyCode);
console.log("Build After Success!");
