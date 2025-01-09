/// <reference types="vitest" />

import dayjs from "dayjs";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import pkg from "./package.json";
import { vitePlugin as remix } from "@remix-run/dev";
import tsconfigPaths from "vite-tsconfig-paths";
// import { visualizer } from "rollup-plugin-visualizer";

installGlobals();

export default defineConfig({
  server: {
    port: 3333,
  },
  ssr: {
    noExternal: [
      "@ant-design/icons",
      "@ant-design/pro-chat",
      "@ant-design/pro-editor",
      "react-intersection-observer",
    ],
    optimizeDeps: {
      include: [
        "@ant-design/icons",
        "@ant-design/pro-chat",
        "@ant-design/pro-editor",
        "react-intersection-observer",
      ],
    },
  },
  define: {
    __APP_INFO__: JSON.stringify({
      pkg,
      lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    }),
  },
  plugins: [
    remix({
      ssr: true,
      ignoredRouteFiles: ["**/*.css"],
      future: {
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
        v3_routeConfig: true,
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
    // visualizer(),
  ],
});
