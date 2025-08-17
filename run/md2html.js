import path from "path";
import fs from "fs/promises";
import markdownIt from "markdown-it";
const md = markdownIt();

/** Markdownをhtmlに変換 */
async function md2Html(mdDir, htmlDir){
	await Promise.all(
		(await fs.readdir(mdDir, {recursive: true}))
		.filter(f=>f.match(/\.md$/))
		.map(async f=>{
			const code = await fs.readFile(path.join(mdDir, f), {encoding: "utf8"});
			const htmlCode = md.render(code);
			const htmlName = f.replace(/\.md$/, ".html");
			const htmlFile = path.join(htmlDir, htmlName);
			await fs.mkdir(path.dirname(htmlFile), {recursive: true});
			await fs.writeFile(htmlFile, htmlCode);
		})
	);
	console.log(`Converted Markdown in ${mdDir} to HTML in ${htmlDir}`);
}
md2Html(...process.argv.slice(2));
