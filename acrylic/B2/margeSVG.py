import xml.etree.ElementTree as ET
import os

# 設定
input_folder = "./games/svg/00_MAX"  # SVGファイルがあるフォルダ
output_file = "MAX"  # 出力ファイル名
viewport = 3000
ratio = 0.1
svg_width = 280  # 各SVGの幅（px）
svg_height = 344  # 各SVGの高さ（px）
x_offset = (viewport*ratio-svg_width)/2
y_offset = -35
columns = 29  # 1行に配置するSVGの数

# 計算: 出力SVGの全体サイズ
num_files = len([f for f in os.listdir(os.path.join(input_folder, "0")) if f.endswith(".svg")])
rows = (num_files + columns - 1) // columns  # 総行数
total_width = columns * svg_width
total_height = rows * svg_height

for side in range(2):
	# 新しいSVGドキュメントを作成
	svg_root = ET.Element(
		"svg",
		{
			"xmlns": "http://www.w3.org/2000/svg",
			"version": "1.1",
			"width": str(total_width),
			"height": str(total_height),
			"viewBox": f"0 0 {total_width} {total_height}"
		}
	)

	# SVGを読み込み、配置
	x, y = 0, 0
	row = 0
	side_folder = os.path.join(input_folder, str(side))
	for i, filename in enumerate(sorted(os.listdir(side_folder))):
		if filename.endswith(".svg"):
			tree = ET.parse(os.path.join(side_folder, filename))
			root = tree.getroot()

			# 読み込んだSVGをグループとして追加
			group = ET.SubElement(svg_root, "g", transform=(
				f"translate({x-x_offset}, {y-y_offset}) scale({ratio})"
			if (row + i) % 2 == 0 else
				f"translate({x+x_offset+svg_width}, {y+y_offset+svg_height}) scale({ratio}) scale(-1, -1)"
			) if side == 0 else (
				f"translate({-x-x_offset-svg_width+total_width}, {y-y_offset}) scale({ratio})"
			if (row + i) % 2 == 0 else
				f"translate({-x+x_offset+total_width}, {y+y_offset+svg_height}) scale({ratio}) scale(-1, -1)"
			))

			group.extend(root)

			# 次の位置を計算
			x += svg_width
			if (i + 1) % columns == 0:  # 改行
				x = 0
				y += svg_height
				row += 1

	# ファイル保存
	tree = ET.ElementTree(svg_root)
	tree.write(f"{output_file}{side}.svg")

print("Complited.")
