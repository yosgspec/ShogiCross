import requests

filename = "ShogiCross.mjs"
filename_min = "ShogiCross.min.mjs"
with open(filename, "r") as r:
	response = requests.post(
		'https://www.toptal.com/developers/javascript-minifier/api/raw',
		data=dict(input=r.read())
	).text

with open(filename_min, "w") as w:
	w.write(response)
