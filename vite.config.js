import {defineConfig, loadEnv} from "vite";

export default defineConfig(({mode})=>{
	const env = loadEnv(mode, process.cwd());
	return {
		root: ".",
		publicDir: "json",
		server: {
			open: "./src/"
		},
		resolve: {
			alias: {
				"./json/xhr.js": env.VITE_FROM_JSON
			}
		},
		build: {
			target: "esnext",
			sourcemap: true,
			lib: {
				entry: "./src/ShogiCross/lib.js",
				name: env.VITE_NAME,
				fileName: env.VITE_NAME,
				formats: ["es", "iife"]
			},
			outDir: "./dist/"+env.VITE_NAME
		}
	}
});
