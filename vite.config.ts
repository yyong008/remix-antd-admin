import dayjs from "dayjs";
import pkg from "./package.json";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactRouter } from "@react-router/dev/vite";
import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { cloudflare } from "@cloudflare/vite-plugin";
import mdx from "fumadocs-mdx/vite";
import * as MdxConfig from "./source.config";

const __APP_INFO__ = JSON.stringify({
  pkg,
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
});

export default defineConfig({
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
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    paraglideVitePlugin({
      project: "./project.inlang",
      outdir: "./app/paraglide",
    }),
    tailwindcss(),
    mdx(MdxConfig),
  ],
  define: {
    __APP_INFO__,
  },
});
