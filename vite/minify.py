import requests
import os

name = "ShogiCross"

os.rename(f"{name}.mjs", f"{name}.js")
with open(f"{name}.js", "r") as r:
	response = requests.post(
		'https://www.toptal.com/developers/javascript-minifier/api/raw',
		data=dict(input=r.read())
	).text

with open(f"{name}.min.js", "w") as w:
	w.write(response)
