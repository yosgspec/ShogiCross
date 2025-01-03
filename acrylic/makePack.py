import xml.etree.ElementTree as ET
import os

# 設定
input_dir = "./games/svg/00_MAX"  # SVGファイルのフォルダ
output_file = "MAX"  # 出力ファイルの接頭辞
viewport = 3000  # ビューポートサイズ
ratio = 0.0410  # スケール比
delta_x = ratio * 2670  # SVGの幅（px）
delta_y = ratio * 3550  # SVGの高さ（px）
offset_x = (viewport * ratio - delta_x) / 2
offset_y = ratio * -350
max_cols = 7  # 1行に配置するSVGの数
max_rows = 8  # 出力ファイルごとの最大行数
is_mirror = True
is_swap = True

# 総行数計算
num_files = len([f for f in os.listdir(os.path.join(input_dir, "0")) if f.endswith(".svg")])
total_rows = (num_files + max_cols - 1) // max_cols

# 処理
for side in range(2):
	side_path = os.path.join(input_dir, str(side))
	input_files = sorted([f for f in os.listdir(side_path) if f.endswith(".svg")])
	if is_swap:
		input_files, unswap_files = [], input_files
		result = []
		i = -1
		while unswap_files:
			input_files.append(unswap_files.pop(0 if (i := i + 1) % 2 == 0 else -1))

	# 分割ファイル生成
	for file_id in range((total_rows + max_rows - 1) // max_rows):
		# 出力SVGサイズ
		start_row = file_id * max_rows
		end_row = min(start_row + max_rows, total_rows)
		output_height = (end_row - start_row) * delta_y
		output_width = max_cols * delta_x

		# SVGドキュメント作成
		svg_root = ET.Element("svg", {
			"xmlns": "http://www.w3.org/2000/svg",
			"version": "1.1",
			"width": str(output_height),  # 高さと幅を逆転
			"height": str(output_width),
			"viewBox": f"0 0 {output_height} {output_width}"  # viewBoxも逆転
		})

		# 回転用グループ作成
		transform_group = ET.SubElement(svg_root, "g", {
			"transform": f"rotate(-90) translate(-{output_width}, 0)"  # 回転と移動を設定
		})

		x, y = 0, 0
		current_row = start_row
		for index, filename in enumerate(input_files[start_row * max_cols:end_row * max_cols]):
			tree = ET.parse(os.path.join(side_path, filename))
			root = tree.getroot()

			# グループ作成
			transform = (
				f"translate({x-offset_x}, {y-offset_y}) scale({ratio})"
				if (current_row + index) % 2 == 0 else
				f"translate({x+offset_x+delta_x}, {y+offset_y+delta_y}) scale({ratio}) scale(-1, -1)"
			) if side == 0 else (
				(
					f"translate({x+offset_x+delta_x}, {y-offset_y}) scale({ratio}) scale(-1, 1)"
					if (current_row + index) % 2 == 0 else
					f"translate({x-offset_x}, {y+offset_y+delta_y}) scale({ratio}) scale(1, -1)"
				) if is_mirror else (
					f"translate({-x-offset_x-delta_x+max_cols*delta_x}, {y-offset_y}) scale({ratio})"
					if (current_row + index) % 2 == 0 else
					f"translate({-x+offset_x+max_cols*delta_x}, {y+offset_y+delta_y}) scale({ratio}) scale(-1, -1)"
				)
			)

			group = ET.SubElement(transform_group, "g", transform=transform)
			group.extend(root)

			# 位置更新
			x += delta_x
			if (index + 1) % max_cols == 0:  # 改行
				x = 0
				y += delta_y
				current_row += 1

		# ファイル保存
		tree = ET.ElementTree(svg_root)
		tree.write(f"{output_file}{side}_{file_id}.svg")

print("Completed.")
