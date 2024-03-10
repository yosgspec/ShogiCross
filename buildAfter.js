import path from "path";
import fs from "fs/promises";
import querystring from "querystring";

const inputName = process.argv[2];
const srcDir = path.dirname(inputName);
const baseDir = path.join(".", "shogiCross");
const distDir = path.join(baseDir, "simple");
const fileName = path.join(distDir, path.parse(inputName).name);
const fileNameExt = ext=>`${fileName}.${ext}`;

await fs.rename(inputName, fileNameExt("js"));
await fs.rmdir(srcDir);

const cpFiles = ["ShogiCross/", "json/", "img/"];
await Promise.all(
	cpFiles.map(async f=>{
		const srcJson = path.join(baseDir, f);
		const distJson = path.join(distDir, f);
		await fs.rmdir(distJson, {recursive:true});
		return fs.cp(srcJson, distJson, {recursive: true});
	})
);

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
