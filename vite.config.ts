import dayjs from "dayjs";
import pkg from "./package.json" with { type: "json" };
import { defineConfig } from "vite-plus";
import { reactRouter } from "@react-router/dev/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { cloudflare } from "@cloudflare/vite-plugin";

const __APP_INFO__ = JSON.stringify({
  pkg,
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
});

export default defineConfig({
  staged: { "*": "vp check --fix" },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    reactRouter(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./app/paraglide",
    }),
  ],
  define: {
    __APP_INFO__,
  },
});
