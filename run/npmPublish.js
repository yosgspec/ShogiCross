import {spawn} from "child_process";

/** Markdownをhtmlに変換 */
async function npmPublish(){
	const stdout = new Promise((resolve, reject)=>{
		const shell = spawn("npm", ["publish"], {shell: true, stdio: "inherit"});
		shell.once("close", o=>resolve(o));
		shell.once("error", e=>reject(e));
	});
	try{
		console.log(await stdout);
	}
	catch(e){
		console.log(e);
	}
}
npmPublish();
