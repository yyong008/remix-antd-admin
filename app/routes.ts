import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export const clientRoutes = [
  layout("features/mkt/layout/index.tsx", [
    ...prefix(":locale?/", [
      index("routes/mkt/index.tsx"),
      route("about", "routes/mkt/about.tsx"),
      ...prefix("blog", [index("routes/mkt/blog.tsx"), route(":id", "routes/mkt/blog-detail.tsx")]),
      ...prefix("news", [index("routes/mkt/news.tsx"), route(":id", "routes/mkt/news-detail.tsx")]),
    ]),
  ]),
  route("*", "routes/mkt/any.tsx"),
];

export const authRoutes = [
  ...prefix(":locale?/auth", [
    layout("features/auth/layout/index.tsx", [
      route("login", "routes/auth/login.tsx"),
      route("signup", "routes/auth/signup.tsx"),
    ]),
  ]),
];

export const adminRoutes = [
  ...prefix(":locale?/admin", [
    layout("features/admin/layout/index.tsx", [
      ...prefix("dashboard", [index("routes/admin/dashboard.tsx")]),
      ...prefix("ai", [
        route("chatbot", "routes/admin/ai/chatbot.tsx"),
        route("simplechat", "routes/admin/ai/simplechat.tsx"),
      ]),
      ...prefix("news", [
        route("list", "routes/admin/news/list.tsx"),
        route("edit", "routes/admin/news/edit.tsx"),
        route("edit/:id", "routes/admin/news/edit-detail.tsx"),
        route("result", "routes/admin/news/result.tsx"),
      ]),
      ...prefix("blog", [
        index("routes/admin/blog.tsx"),
        route("list", "routes/admin/blog-list.tsx"),
        route("new", "routes/admin/blog/create.tsx"),
        route("edit", "routes/admin/blog/edit-new.tsx"),
        route("edit/:id", "routes/admin/blog/edit.tsx"),
        route("result", "routes/admin/blog/result.tsx"),
      ]),
      ...prefix("profile", [
        route("account", "routes/admin/profile/account.tsx"),
        route("link", "routes/admin/profile/link/category.tsx"),
      ]),
      ...prefix("system", [
        route("config", "routes/admin/system/config.tsx"),
        route("dept", "routes/admin/system/dept.tsx"),
        route("dict", "routes/admin/system/dict.tsx"),
        route("dict-item/:id", "routes/admin/system/dict-item.tsx"),
        route("menu", "routes/admin/system/menu.tsx"),
        ...prefix("monitor", [
          route("loginlog", "routes/admin/system/monitor/loginlog.tsx"),
          route("serve", "routes/admin/system/monitor/serve.tsx"),
          route("operate", "routes/admin/system/monitor/operate.tsx"),
        ]),

        route("role", "routes/admin/system/role.tsx"),
        route("user", "routes/admin/system/user.tsx"),
      ]),
      ...prefix("tools", [
        ...prefix("mail", [
          index("routes/admin/tools/mail.tsx"),
          route("list", "routes/admin/tools/mail-list.tsx"),
          route(":id", "routes/admin/tools/mail-detail.tsx"),
        ]),

        route("storage", "routes/admin/tools/storage.tsx"),
      ]),
      route("about", "routes/admin/about.tsx"),
    ]),
  ]),
];

export const aiRoutes = [
  ...prefix(":locale?/ai", [
    layout("features/ai/layout/index.tsx", [
      index("routes/ai/index.tsx"),
      route("chatbot", "routes/ai/chatbot.tsx"),
      route("chatbot/:id", "routes/ai/chatbot.$id.tsx"),
    ]),
  ]),
];

export default [...clientRoutes, ...authRoutes, ...adminRoutes, ...aiRoutes] satisfies RouteConfig;
