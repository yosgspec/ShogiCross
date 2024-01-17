import json
import copy

class Piece:
	def __init__(self, turnFirst, symbol, piece, extend=None):
		turnSymbols = [
			["▲", "▼"],
			["△", "▽"]
		]
		self.turnSymbol = turnSymbols[turnFirst]
		self.turnFirst = turnFirst
		self.turn = 0
		self.symbol = symbol
		self.baseSymbol = symbol if extend is None else extend.symbol
		self.name = piece["name"] if "name" in piece else extend.name
		self.display = piece["display"][0] if "display" in piece else extend.display
		self.game = piece["game"] if "game" in piece else extend.game
		self.unit = piece["unit"] if "unit" in piece else "成"
		self.attr = piece["attr"] if "attr" in piece else []
		self.range = piece["range"]
		self.promo = {} if "promo" not in piece or piece["promo"] is None else {
			k: Piece(turnFirst, k, v, self)
			for k, v in piece["promo"].items()
		}

	def rotate(self):
		self.turn += 1

	def __str__(self):
		return self.turnSymbol[self.turn % len(self.turnSymbol)] + self.symbol

class Panel:
	def __init__(self):
		self.prop = "default"

	def __str__(self):
		return "　　"

class RiverPanel:
	def __init__(self):
		self.prop = "river"

	def __str__(self):
		return "＝＝"

class PalacePanel:
	def __init__(self):
		self.prop = "palace"

	def __str__(self):
		return "　・"

class PalaceRSlushPanel:
	def __init__(self):
		self.prop = "palacerslush"

	def __str__(self):
		return "　／"

class PalaceLSlushPanel:
	def __init__(self):
		self.prop = "palacelslush"

	def __str__(self):
		return "　＼"

class PalaceCrossPanel:
	def __init__(self):
		self.prop = "palacecross"

	def __str__(self):
		return "　※"

class BaseField:
	def __init__(self, xMax, yMax, games):
		self.xMax = xMax
		self.yMax = yMax
		self.panels = [[Panel() for x in range(self.xMax)] for y in range(self.yMax)]
		with open("crossChessPieces.json", "r") as f:
			self.piece = json.loads(f.read())
		with open("crossChessGames.json", "r") as f:
			self.position = json.loads(f.read())

		self.pieces = [[None] * self.xMax for i in range(self.yMax)]
		for turnFirst, game in enumerate(games):
			game, ptn = (game, "default") if type(game) is str else game
			pos = self.position[game]["position"][ptn]
			for i, row in enumerate(pos):
				y = i + self.yMax - len(pos)
				for x, symbol in enumerate(row):
					self.pieces[y][x] = (
						Piece(turnFirst, symbol, self.piece[symbol])
							if symbol in self.piece else
						None)
			self.boardRotate()

	def boardRotate(self):
		self.pieces.reverse()
		for row in self.pieces:
			row.reverse()
			for p in row:
				if p is not None:
					p.rotate()

	def displayLayer(self, layers):
		display = [[None] * self.xMax for i in range(self.yMax)]
		for layer in layers:
			for y, row in enumerate(layer):
				for x, p in enumerate(row):
					if p is not None: 
						display[y][x] = str(p)

		lineLen = self.xMax - 1
		return (
			"┏" + "┯".join(["━━"] * self.xMax) + "┓\n" +
			("┠" + "┼".join(["──"] * self.xMax) + "┨\n").join([
				"┃" +
				"│".join([x for x in y]) +
				"┃\n"
			for y in display]) +
			"┗" + "┷".join(["━━"] * self.xMax) + "┛"
		)

	def __str__(self):
		return self.displayLayer([self.panels, self.pieces])

class CrossChessField(BaseField):
	def __init__(self, games):
		super().__init__(9, 9, games)
		self.panels[4] = [RiverPanel() for x in range(self.xMax)]
		for x, y in [[3, 1], [3, 7], [4, 0], [4, 2], [4, 6], [4, 8], [5, 1], [5, 7]]:
			self.panels[y][x] = PalacePanel()
		for x, y in [[3, 2], [3, 8], [5, 0], [5, 6]]:
			self.panels[y][x] = PalaceRSlushPanel()
		for x, y in [[3, 0], [3, 6], [5, 2], [5, 8]]:
			self.panels[y][x] = PalaceLSlushPanel()
		for x, y in [[4, 1], [4, 7]]:
			self.panels[y][x] = PalaceCrossPanel()


def main():
	field= CrossChessField(["将棋", ["チャンギ", "left"]])
	#field= CrossChessField(["マークルック", ["チャンギ", 3]])
	print(str(field))

if __name__ == "__main__":
	main()
