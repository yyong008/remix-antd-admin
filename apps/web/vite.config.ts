import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false }),
    devtoolsJson(),
    tailwindcss(),
    reactRouter(),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./app/paraglide",
      // URL is first so the `:locale?` route prefix under app/routes.ts is the
      // source of truth, with cookie/baseLocale as fallbacks. The strategy here
      // must stay in sync with `i18n:compile` in package.json.
      strategy: ["url", "cookie", "baseLocale"],
      emitTsDeclarations: true,
    }),
  ],
});
