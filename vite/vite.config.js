import { defineConfig } from "vite";

export default defineConfig({
	root: "../shogiCross/ShogiCross/",
	publicDir: "json",
	build: {
		lib: {
			entry: "lib.js",
			name: "ShogiCross",
			fileName: "ShogiCross"
		},
		rollupOptions: {
			external: [
				"./json/gameSoft.json",
				"./json/boards.json",
				"./json/canvasFont.json",
				"./json/games.json",
				"./json/panels.json",
				"./json/pieceCost.json",
				"./json/pieceRange.json",
				"./json/pieces.json"
			],
		},
		outDir: "../../vite/dist"
	}
});
