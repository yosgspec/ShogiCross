import path from "path";
import fs from "fs/promises";
import querystring from "querystring";

/** コード最小化 */
async function minifyLib(targetDir){
	const minFiles = (await fs.readdir(targetDir))
		.filter(f=>f.match(/\.js$/));
	await Promise.all(
		minFiles.map(async f=>{
			const baseFile = path.join(targetDir, f);
			const minFile = baseFile.replace(/\.js$/, ".min.js");
			const code = await fs.readFile(baseFile, {encoding: "utf8"});
			const response = await fetch(
				"https://www.toptal.com/developers/javascript-minifier/api/raw", {
					method: "POST",
					headers: {"Content-Type": "application/x-www-form-urlencoded"},
					body: querystring.stringify({input: code}),
				}
            );
			if(!response.ok) throw Error(`minify error. filename: ${minFile}`);
			const minifyCode = await response.text();
			await fs.writeFile(minFile, minifyCode);
			console.log(`Minified: ${f} to ${path.basename(minFile)}`);
		})
	);
	console.log(`Minification completed in: ${targetDir}`);
}
minifyLib(...process.argv.slice(2));
