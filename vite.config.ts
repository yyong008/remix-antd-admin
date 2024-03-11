import { defineConfig } from "vite";

import { vitePlugin as remix } from "@remix-run/dev";

import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

import { remixDevTools } from "remix-development-tools";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remixDevTools(),
    remix({
      ssr: true,
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
  ],
});
