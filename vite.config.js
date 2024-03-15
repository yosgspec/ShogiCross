import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	publicDir: "json",
	server: {
		open: "./shogiCross/"
	},
	build: {
		target: "esnext",
		sourcemap: "inline",
		lib: {
			entry: "./shogiCross/ShogiCross/lib.js",
			name: "ShogiCross",
			fileName: "ShogiCross",
			formats: ["es", "iife"]
		},
		outDir: "./dist"
	}
});
