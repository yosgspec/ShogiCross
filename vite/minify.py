import requests

filename = "ShogiCross.mjs"
with open(filename, "r") as r:
	response = requests.post(
		'https://www.toptal.com/developers/javascript-minifier/api/raw',
		data=dict(input=r.read())
	).text

with open(filename, "w") as w:
	w.write(response)
