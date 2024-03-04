import { defineConfig } from "vite";

export default defineConfig({
	root: "../shogiCross/ShogiCross/",
	publicDir: "json",
	build: {
		target: "esnext",
		lib: {
			entry: "lib.js",
			name: "ShogiCross",
			fileName: "lib",
			formats: ["es"]
		},
		outDir: "../../vite/dist"
	}
});
