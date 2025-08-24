import path from "path";
import fs from "fs/promises";

/** Viteのビルドファイルを移動 */
async function moveVite(targetDir, outputDir){
	await fs.mkdir(outputDir, {recursive: true});
	await Promise.all(
		(await fs.readdir(targetDir, {recursive: true}))
		.map(async f=>{
			if(!(await fs.stat(path.join(targetDir, f))).isFile()) return;
			fs.rename(path.join(targetDir, f), path.join(outputDir, path.basename(f)));
			console.log(`Moved: ${f} to ${outputDir}`);
		})
	);
	await fs.rm(targetDir, {recursive: true});
	console.log(`Removed original directory: ${targetDir}`);
}
moveVite(...process.argv.slice(2));
