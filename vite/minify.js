import path from "path";
import fs from "fs/promises";
import querystring from "querystring";

const inputName = process.argv[2];
const baseName = `${path.dirname(inputName)}/${path.parse(inputName).name}`;
await fs.rename(inputName, `${baseName}.js`)

const code = await fs.readFile(`${baseName}.js`, {encoding: "utf8"});
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
await fs.writeFile(`${baseName}.min.js`, minifyCode);
console.log("Minify Success!")