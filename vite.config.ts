import { defineConfig } from "vite";

import { vitePlugin as remix } from "@remix-run/dev";

import tsconfigPaths from "vite-tsconfig-paths";
import { installGlobals } from "@remix-run/node";

import { remixDevTools } from "remix-development-tools";
import dayjs from "dayjs";

import pkg from "./package.json";

// runtime route
import  * as createRoutes from "./app/config/routes";

installGlobals();

const __APP_INFO__ = {
  pkg,
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
};

export default defineConfig({
  server: {
    port: 3000,
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__),
  },
  plugins: [
    remixDevTools(),
    remix({
      ssr: true,
      ignoredRouteFiles: ["**/*.css"],
      routes: async (defineRoute) => {
        return defineRoute((route) => {
          createRoutes.createAdmin(route);

          route("", "routes/admin/_a.tsx", () => {
            createRoutes.createAdminDashboard(route)
            createRoutes.createAdminDemoRoute(route);
            createRoutes.createAdminSystem(route);
            createRoutes.createAdminAbout(route)
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});

