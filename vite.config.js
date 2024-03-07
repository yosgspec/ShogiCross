import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	publicDir: "json",
	server: {
		open: "./shogiCross/"
	},
	build: {
		target: "esnext",
		lib: {
			entry: "./shogiCross/ShogiCross/lib.js",
			name: "ShogiCross",
			fileName: "ShogiCross",
			formats: ["es"]
		},
		outDir: "./dist"
	}
});
