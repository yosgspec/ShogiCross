{
	const $ = document.createElement("textarea");
	$.id = "codeViewer";
	$.wrap = "off";
	$.readOnly = "true";
	$.textContent = document.body.innerHTML.split(/\r|\n|\r\n/).slice(0,-1).join("\n");
	Object.assign($.style, {
		width: "100%",
		fontSize: "14px",
		color: "#0000FF",
		backgroundColor: "#DDFFFF",
	});

	const main = document.querySelector("main");
	main.appendChild($);
	main.style.display = "flex";
	const sub = main.firstChild;
	sub.style.width = "50svw";
	sub.style.height = "94svh";
	const canvas = sub.querySelector("#shogiCross");
	canvas.style.maxWidth = "50svw";

	const tgl = document.createElement("button");
	main.appendChild(tgl);
	tgl.textContent = "非表示";
	Object.assign(tgl.style, {
		position: "absolute",
		zIndex: "100",
		top: "10px",
		right: "10px",
		border: "outset 2px #3399FF",
		color: "#000099",
		backgroundColor: "#99DDFF",
	});
	tgl.onclick = (()=>{
		const iter = function*(){
			for(let i=0;;i++){
				if(i%2 === 0){
					$.style.display = "none";
					sub.style.width = "100svw";
					canvas.style.maxWidth = "100svw";
					tgl.textContent = "コード";
				}
				else{
					$.style.display = "block";
					sub.style.width = "50svw";
					canvas.style.maxWidth = "50svw";
					tgl.textContent = "非表示";
				}
				yield;
			}
		}();
		return ()=>iter.next();
	})();
}
