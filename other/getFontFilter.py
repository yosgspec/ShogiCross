from typing import Final, List
import os
import glob

class Dir2Any:
	def __init__(self, path: str, prompt: str, format: str):
		cd = os.path.dirname(path)
		if cd != "": os.chdir(cd)
		self._prompt: Final[str] = prompt + " $ "
		self._targetDir: Final[str] = os.path.basename(path)
		self._outputFile: Final[str] = f"{self._targetDir}.{format}"
		self.value = ""

	def compress(self):
		print("Compressed!")

	def extract(self):
		print("Extracted!")

	def read(self):
		with open(self._outputFile, "r") as f:
			self.value = f.read()

	def write(self):
		with open(self._outputFile, "w") as f:
			f.write(self.value)

	def stdin(self):
		self.value = input(self._prompt).strip()

	def stdout(self):
		print(self._prompt)
		print(self.value)

class FontFilter(Dir2Any):
	__encodings: Final[List[str]]  = [
		"utf_8",
		"cp932",
		"euc_jp"
	]

	def __init__(self, path: str):
		super().__init__(path, "json", "json")

	def __getText(self, file: str):
		for e in FontFilter.__encodings:
			try:
				with open(file, encoding=e) as f:
					return f.read()
			except:
				continue
		else:
			with open(file) as f:
				f.read()

	def __readFiles(self):
		os.chdir(self._targetDir)
		self.value = (
			"".join(
				sorted(set(
					"".join([
						self.__getText(f)
						for f in glob.glob("./**", recursive=True)
						if not os.path.isdir(f)
						]
			))))
			.replace("\n", "")
			.replace("\"", "")
			.replace("\\", "")
			.strip()
		)
		os.chdir("..")

	def compress(self):
		self.__readFiles()
		super().compress()

def main():
	targetDir = "shogiCross"
	d2 = FontFilter(targetDir)
	d2.compress()
	# d2.write()
	d2.stdout()

if __name__ == "__main__":
	main()
