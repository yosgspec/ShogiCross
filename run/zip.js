import admZip from "adm-zip";

/** ZIPファイルを作成する */
export async function zip(targetDir, outputZip){
	outputZip = outputZip ?? `${targetDir}.zip`;
	const zip = new admZip();
	zip.addLocalFolder(targetDir);
	await zip.writeZipPromise(outputZip);
	console.log(`Created ZIP: ${outputZip}`);
}
zip(...process.argv.slice(2));
