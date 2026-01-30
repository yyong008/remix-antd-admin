import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./app/__tests__/setup.js",
  },
});
