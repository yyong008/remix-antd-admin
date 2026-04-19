import { defineConfig } from "vite-plus";

export default defineConfig({
	plugins: [],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./app/__tests__/setup.js",
	},
});
