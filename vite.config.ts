/// <reference types="vitest" />

import {
  defaultClientConditions,
  defaultServerConditions,
  defineConfig,
} from "vite";

import type { Plugin } from "vite";
import dayjs from "dayjs";
import pkg from "./package.json";
import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import serverAdapter from "hono-react-router-adapter/vite";
import { getLoadContext } from './load-context'
const prismaFixPlugin: Plugin = {
  name: "prisma-fix",
  enforce: "post",
  config() {
    return {
      resolve: {
        conditions: [...defaultClientConditions],
      },
      ssr: {
        resolve: {
          conditions: [...defaultServerConditions],
          externalConditions: [...defaultServerConditions],
        },
      },
    };
  },
};

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
    prismaFixPlugin,
    reactRouter(),
    tsconfigPaths(),
    serverAdapter({
      entry: "./server/index.ts",
      getLoadContext
    }),
  ],
  define: {
    __APP_INFO__,
  },
}));
