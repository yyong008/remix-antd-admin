import { type RouteConfig, index, layout, prefix, route  } from "@react-router/dev/routes";

import { adminAuthRoutes } from "./admin-auth/route";
import { adminRoutes } from "./admin/route";


const appModulesClient = (...args: string[]) =>
  "app/modules/" + args.join("/") + "/index.tsx";

export const clientRoutes = [
  layout("app/layout/index.tsx", [
    ...prefix(":locale?/", [
      index("app/modules/index/index.tsx"),
      route("about", appModulesClient("about")),
      ...prefix("blog", [
        index(appModulesClient("blog")),
        route(":id", appModulesClient("blog-detail")),
      ]),
      ...prefix("news", [
        index(appModulesClient("news")),
        route(":id", appModulesClient("news-detail")),
      ]),
      route("privacy", appModulesClient("privacy")),
    ]),
  ]),
  // any
  route("*", appModulesClient("any")),
];

// ======================================= route =======================================

const routes = [...clientRoutes, ...adminAuthRoutes, ...adminRoutes];

// ======================================= export =======================================

export default [
  ...routes,
] satisfies RouteConfig;
