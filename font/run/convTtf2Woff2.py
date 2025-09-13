from typing import Final
from concurrent.futures import ProcessPoolExecutor
import json
from os import path, makedirs
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

TTF_DIR: Final = "./ttf";
FONT_DIR: Final = "./fonts";

def genFont(args):
	fontName, wght = args
	baseName = fontName.replace(" ", "")
	basePath = path.join(TTF_DIR, baseName)
	masterPath = path.join(FONT_DIR, f"{baseName}.woff2")

	with open("chars.txt", encoding="utf-8") as f:
		text = f.read()
	unicodes = [ord(ch) for ch in text if not ch.isspace()]

	options = subset.Options()
	options.set(layout_features="*")
	subsetter = subset.Subsetter(options=options)
	subsetter.populate(unicodes=unicodes)

	with TTFont(f"{basePath}.ttf") as font:
		if "fvar" in font:
			font = instantiateVariableFont(font, {"wght": wght})
		subsetter.subset(font)
		# font.save(f"{masterPath}.ttf")
		font.flavor = "woff2"
		font.save(masterPath)

		print(f"Generated {masterPath}")
		return masterPath

if __name__ == "__main__":
	makedirs(FONT_DIR, exist_ok=True)
	with open("../src/ShogiCross/data/canvasFont.js", encoding="utf-8") as f:
		text = f.read()
		fonts = json.loads(text[text.find("{"):])["fonts"]
		print(fonts)

	with ProcessPoolExecutor(max_workers=len(fonts)) as exec:
		exec.map(genFont, fonts)
