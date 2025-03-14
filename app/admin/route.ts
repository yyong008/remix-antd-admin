import { index, layout, prefix, route } from "@react-router/dev/routes";

const rf_path = (...args: string[]) =>
  "admin/modules/" + args.join("/") + "/index.tsx";

export const adminRoutes = [
  ...prefix(":lang?/admin", [
    layout("admin/layout/index.tsx", [
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
        route("link", rf_path("profile", "link")),
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
      ...prefix("docs", [
        route("changelog", rf_path("docs", "changelog")),
        route("feedback", rf_path("docs", "feedback")),
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
