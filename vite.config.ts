/// <reference types="vitest" />
import { defineConfig } from "vite";

import tsconfigPaths from "vite-tsconfig-paths";

import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { remixDevTools } from "remix-development-tools";
import Inspect from 'vite-plugin-inspect'

import dayjs from "dayjs";

import pkg from "./package.json";

installGlobals();

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default defineConfig({
  server: {
    port: 3333,
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  plugins: [
    remixDevTools(),
    remix({
      ssr: true,
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
    Inspect()
  ],
  test: {
    globals: true,
  },
});

