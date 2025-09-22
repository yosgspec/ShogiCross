import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	test: {
		alias: {
			"@": path.resolve(__dirname, "../src/ShogiCross/"),
		},
		globals: true,
		setupFiles: ["./setup.js"],
		environment: "happy-dom",
		include: ["core/**/*.test.js", "data/**/*.test.js"]
	},
});