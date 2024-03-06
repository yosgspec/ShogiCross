import { defineConfig } from "vite";

export default defineConfig({
	root: ".",
	publicDir: "json",
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
