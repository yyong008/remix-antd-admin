import { defineConfig } from "vite";

import dayjs from "dayjs";
import pkg from "./package.json";
import tsconfigPaths from "vite-tsconfig-paths";
import { getLoadContext } from "./load-context";
import { reactRouter } from "@react-router/dev/vite";
import serverAdapter from "hono-react-router-adapter/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";

const __APP_INFO__ = JSON.stringify({
  pkg,
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
});

export default defineConfig(({ isSsrBuild, command }) => ({
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
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    serverAdapter({
      entry: "./server/index.ts",
      getLoadContext,
    }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./app/paraglide",
    }),
  ],
  define: {
    __APP_INFO__,
  },
}));
