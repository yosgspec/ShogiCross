{
	const $ = document.createElement("textarea");
	$.style.width="100%";
	$.style.fontSize="14px";
	$.style.color="#0000FF";
	$.style.backgroundColor="#DDFFFF";
	$.wrap="off";$.readonly="true";
	$.textContent=document.body.innerHTML;
	document.getElementsByTagName("main")[0].appendChild($);
}
