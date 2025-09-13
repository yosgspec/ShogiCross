import fs from "fs/promises";
import path from "path";
import iconv from "iconv-lite";

const CHARS_SRC_PATH = "../src";
const CHARS_PATH = "./chars.txt";

/** フォルダ以下の全テキストファイルから文字を抽出 */
async function extractCharsFromFolder(folderPath) {
	const files = await fs.readdir(folderPath, {withFileTypes: true});
	const allChars = new Set();

	for(const file of files){
		const fullPath = path.join(folderPath, file.name);
		if(file.isDirectory()){
			const nestedChars = await extractCharsFromFolder(fullPath);
			nestedChars.forEach(c=>allChars.add(c));
		}
		else{
			try{
				// バイナリとして読み込む
				const buffer = await fs.readFile(fullPath);
				// UTF-8 として文字列に変換
				const text = buffer.toString("utf8");
				// U+FFFD（Replacement Character）が含まれていれば、UTF-8ではないと判断し無視
				if(!text.includes("\uFFFD")){
					[...text].forEach(c=>allChars.add(c));
				}
			}
			catch(ex){}
		}
	}
	return allChars;
}

async function collectChars(){
	await fs.writeFile(CHARS_PATH, "");
	const charsSet = await extractCharsFromFolder(CHARS_SRC_PATH);
	let chars = ""; // charsを空で初期化

	const charsBuffer = await fs.readFile(CHARS_PATH);
	// UTF-8としてデコードを試みる
	let decodedUtf8 = iconv.decode(charsBuffer, "utf8");
	// U+FFFD（Replacement Character）が含まれていなければ、UTF-8であると判断
	if(!decodedUtf8.includes("\uFFFD"))
		chars = decodedUtf8.replace(/\r?\n/g, "");
	else
		console.warn(`Warning: chars.txt is not UTF-8. Ignoring its content.`);

	// 抽出した文字をcharsに追加
	charsSet.forEach(c=>chars+=c);

	await fs.writeFile(CHARS_PATH, chars, "utf8");
	console.log(`Created Char List: ${chars.length} chars -> ${CHARS_PATH}`);
}

collectChars();
