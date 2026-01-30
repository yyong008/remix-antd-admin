import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

import { adminRoutes } from "./admin/route";


const appModulesClient = (...args: string[]) =>
  "features/mkt/modules/" + args.join("/") + "/index.tsx";

export const clientRoutes = [
  layout("features/mkt/layout/index.tsx", [
    ...prefix(":locale?/", [
      index("features/mkt/modules/index/index.tsx"),
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

const auth_file_path = (...args: string[]) =>
  "features/admin-auth/modules/" + args.join("/") + "/index.tsx";

export const authRoutes = [
  ...prefix(":locale?/auth", [
    route("login", auth_file_path("login")),
    route("signup", auth_file_path("signup")),
    route("welcome", auth_file_path("welcome")),
  ]),
];

export default [
  ...clientRoutes, ...authRoutes, ...adminRoutes,
] satisfies RouteConfig;
