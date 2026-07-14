import fs from "node:fs";
import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import { fileURLToPath } from "node:url";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../package.json"), "utf-8"));
const adminPkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./package.json"), "utf-8"));

function parseCatalog(yamlContent: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = yamlContent.split(/\r?\n/);
  let inCatalog = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s*#.*$/, "");
    if (!line.trim()) continue;

    if (!inCatalog) {
      if (/^catalog:\s*$/.test(line)) {
        inCatalog = true;
      }
      continue;
    }

    const leadingSpaces = line.match(/^(\s*)/)?.[1].length ?? 0;
    if (leadingSpaces === 0) {
      inCatalog = false;
      continue;
    }

    const match = line.match(/^\s+["']?([^"':]+?)["']?\s*:\s*(.+?)\s*$/);
    if (match) {
      result[match[1]] = match[2];
    }
  }

  return result;
}

const workspaceYaml = fs.readFileSync(
  path.resolve(__dirname, "../../pnpm-workspace.yaml"),
  "utf-8",
);
const catalog = parseCatalog(workspaceYaml);

export default defineConfig({
  define: {
    __APP_INFO__: `(${JSON.stringify({
      pkg: {
        name: rootPkg.name,
        version: rootPkg.version,
        repository: { url: rootPkg.repository?.url ?? "" },
        homepage: rootPkg.homepage ?? "",
        dependencies: adminPkg.dependencies ?? {},
        devDependencies: adminPkg.devDependencies ?? {},
      },
      catalog,
      lastBuildTime: new Date().toISOString().split("T")[0],
    })})`,
  },
  server: {
    port: 3001,
    proxy: {
      "/api": {
        target: "http://localhost:3002/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false }),
    devtoolsJson(),
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
