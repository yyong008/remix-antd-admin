import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import mdx from "fumadocs-mdx/vite";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import * as MdxConfig from "./source.config";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../package.json"), "utf-8"));
const webPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./package.json"), "utf-8"));

export default defineConfig({
  define: {
    __APP_INFO__: `(${JSON.stringify({
      pkg: {
        name: rootPkg.name,
        version: rootPkg.version,
        repository: { url: rootPkg.repository?.url ?? "" },
        homepage: rootPkg.homepage ?? "",
        dependencies: webPkg.dependencies ?? {},
        devDependencies: webPkg.devDependencies ?? {},
      },
      lastBuildTime: new Date().toISOString().split("T")[0],
    })})`,
  },
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
    mdx(MdxConfig),
    cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false }),
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
