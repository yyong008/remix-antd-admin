/// <reference types="vitest" />

import { allRoutes } from "./app/routes";
import dayjs from "dayjs";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import pkg from "./package.json";
import { vitePlugin as remix } from "@remix-run/dev";
import { remixDevTools } from "remix-development-tools";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

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
    remixDevTools(),
    remix({
      ssr: true,
      ignoredRouteFiles: ["**/*.css"],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes(defineRoutes) {
        return defineRoutes((route) => {
          allRoutes(route);
        });
      },
    }),
    tsconfigPaths(),
    visualizer(),
  ],
});
