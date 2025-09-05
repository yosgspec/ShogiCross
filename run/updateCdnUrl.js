import fs from "fs/promises";
import path from "path";

const BASE_URL = "https://cdn.jsdelivr.net/gh/yosgspec/ShogiCross@";

async function updateCdnUrl(targetDir, version){
	const [major, minor] = version.split(".");
	const targetVersion = `${major}.${parseInt(minor)-1}`;
	const newVersion = `${major}.${minor}`;

	const targetUrl = `${BASE_URL}${targetVersion}/`;
	const newUrl = `${BASE_URL}${newVersion}/`;

	console.log(`Target URL: ${targetUrl}`);
	console.log(`New URL: ${newUrl}`);

	const files = (await fs.readdir(targetDir, {recursive: true})).filter(f=>f.match(/\.html$/));

	for(const file of files){
		const filePath = path.join(targetDir, file);
		let content = await fs.readFile(filePath, "utf8");

		if(content.includes(targetUrl)){
			console.log(`Updating ${file}...`);
			content = content.replace(new RegExp(targetUrl.replace(/[.*+?^${}()|[\\]/g, "\\$&" ), "g"), newUrl);
			await fs.writeFile(filePath, content, "utf8");
		}
	}
}
updateCdnUrl(...process.argv.slice(2));
