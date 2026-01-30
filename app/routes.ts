import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

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
  ]),
];


const rf_path = (...args: string[]) =>
  "features/admin/modules/" + args.join("/") + "/index.tsx";

export const adminRoutes = [
  ...prefix(":locale?/admin", [
    layout("features/admin/layout/index.tsx", [
      ...prefix("dashboard", [index(rf_path("dashboard"))]),
      ...prefix("ai", [route("simplechat", rf_path("ai", "simplechat"))]),
      ...prefix("news", [
        route("edit", rf_path("news", "edit")),
        route("edit/:id", rf_path("news", "edit-detail")),
        route("category", rf_path("news", "category")),
        route("category/:id", rf_path("news", "list")),
        route("result", rf_path("news", "result")),
      ]),
      ...prefix("blog", [
        index(rf_path("blog", "index")),
        route("category", rf_path("blog", "category")),
        route("tag", rf_path("blog", "tag")),
        route("edit", rf_path("blog", "create")),
        route("edit/:id", rf_path("blog", "edit")),
        route("result", rf_path("blog", "result")),
      ]),
      ...prefix("profile", [
        route("account", rf_path("profile", "account")),
        ...prefix("link", [
          ...prefix("category", [
            index(rf_path("profile", "link", "category")),
            route(":id", rf_path("profile", "link", "category-detail")),
          ]),
        ]),
      ]),
      ...prefix("system", [
        route("config", rf_path("system", "config")),
        route("dept", rf_path("system", "dept")),
        route("dict", rf_path("system", "dict")),
        route("dict-item/:id", rf_path("system", "dict-item")),
        route("menu", rf_path("system", "menu")),
        ...prefix("monitor", [
          route("login-log", rf_path("system", "monitor", "login-log")),
          route("serve", rf_path("system", "monitor", "serve")),
          route("moperate", rf_path("system", "monitor", "operate")),
        ]),

        route("role", rf_path("system", "role")),
        route("user", rf_path("system", "user")),
      ]),
      ...prefix("tools", [
        ...prefix("mail", [
          index(rf_path("tools", "mail")),
          route("list", rf_path("tools", "mail-list")),
          route(":id", rf_path("tools", "mail-detail")),
        ]),

        route("storage", rf_path("tools", "storage")),
      ]),
      route("about", rf_path("about")),
    ]),
  ]),
];

export default [
  ...clientRoutes, ...authRoutes, ...adminRoutes,
] satisfies RouteConfig;
