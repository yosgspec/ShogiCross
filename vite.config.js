import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	publicDir: "json",
	server: {
		open: "./src/"
	},
	build: {
		target: "esnext",
		sourcemap: true,
		lib: {
			entry: "./src/ShogiCross/lib.js",
			name: "ShogiCross",
			fileName: "ShogiCross",
			formats: ["es", "iife"]
		},
		outDir: "./dist"
	}
});
