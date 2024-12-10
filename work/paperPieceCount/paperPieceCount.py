import csv
import glob
import shutil
from os import path, makedirs

src_path="svg"
dist_path="games"
file_path="paperPieceCount.csv"

with open(file_path, mode="r", encoding="utf-8") as file:
	datas=list(csv.reader(file))
	DATA_ROW=4
	DATA_COL=4

	for i in range(DATA_ROW):
		games=datas.pop(0)[DATA_COL:]

	for row in datas:
		piece="".join(row[:2])
		row=row[DATA_COL:]
		for i,cnt in enumerate(row):
			game=f"{i:02}_{games[i]}"
			game_dir = path.join(dist_path, game)
			if not path.exists(game_dir):
				makedirs(game_dir)
			imgs=glob.glob(f"{src_path}/*{piece}*", recursive=True)
			for j in range(int(cnt)):
				for img in imgs:
					output_file = (path
						.join(game_dir, path.basename(img))
						.replace("A.", f"{j}A.")
						.replace("B.", f"{j}B."))
					shutil.copy(img, output_file)
		print(piece)
