import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

const authRoutes = [
  ...prefix("auth", [
    layout("layout/auth/index.tsx", [
      route("login", "routes/auth/login/index.tsx"),
      route("signup", "routes/auth/signup/index.tsx"),
    ]),
  ]),
];

const adminDashboardRoutes = [...prefix("dashboard", [index("routes/admin/dashboard/index.tsx")])];

const adminBlogRoutes = [
  ...prefix("blog", [
    route("list", "routes/admin/blog/index/index.tsx"),
    route("new", "routes/admin/blog/create/index.tsx"),
    route("edit", "routes/admin/blog/edit/index.tsx"),
    route("edit/:id", "routes/admin/blog/edit/index.tsx", {
      id: "admin-blog-edit-id",
    }),
    route("result", "routes/admin/blog/result/index.tsx"),
  ]),
];

const adminNewsRoutes = [
  ...prefix("news", [
    route("list", "routes/admin/news/list/index.tsx"),
    route("edit", "routes/admin/news/edit/index.tsx"),
    route("edit/:id", "routes/admin/news/edit-detail/index.tsx"),
    route("result", "routes/admin/news/result/index.tsx"),
  ]),
];

const adminProfileRoutes = [
  ...prefix("profile", [
    route("account", "routes/admin/profile/account/index.tsx"),
    route("link", "routes/admin/profile/link/category/index.tsx"),
  ]),
];

const adminSystemRoutes = [
  ...prefix("system", [
    route("config", "routes/admin/system/config/index.tsx"),
    route("dept", "routes/admin/system/dept/index.tsx"),
    route("dict", "routes/admin/system/dict/index.tsx"),
    route("dict-item/:id", "routes/admin/system/dict-item/index.tsx"),
    route("menu", "routes/admin/system/menu/index.tsx"),
    ...prefix("monitor", [
      route("loginlog", "routes/admin/system/monitor/login-log/index.tsx"),
      route("serve", "routes/admin/system/monitor/serve/index.tsx"),
      route("operate", "routes/admin/system/monitor/operate/index.tsx"),
    ]),
    route("role", "routes/admin/system/role/index.tsx"),
    route("user", "routes/admin/system/user/index.tsx"),
  ]),
];

const adminToolsRoues = [
  ...prefix("tools", [
    ...prefix("mail", [
      index("routes/admin/tools/mail/index.tsx"),
      route("list", "routes/admin/tools/mail-list/index.tsx"),
      route(":id", "routes/admin/tools/mail-detail/index.tsx"),
    ]),
    route("storage", "routes/admin/tools/storage/index.tsx"),
  ]),
];

const adminAIRoutes = [
  route("ai", "routes/admin/ai/index.tsx"),
  route("ai/:id", "routes/admin/ai/index.tsx", { id: "ai-chat-id" }),
];

export default [
  ...prefix(":locale?", [
    index("routes/home.tsx"),
    ...authRoutes,
    ...prefix("admin", [
      layout("layout/admin/index.tsx", [
        ...adminDashboardRoutes,
        ...adminBlogRoutes,
        ...adminNewsRoutes,
        ...adminProfileRoutes,
        ...adminSystemRoutes,
        ...adminToolsRoues,
        ...adminAIRoutes,
        route("about", "routes/admin/about/index.tsx"),
        route("welcome", "routes/admin/welcome/index.tsx"),
        route("docs/change-log", "routes/admin/docs/change-log/index.tsx"),
        route("docs/feedback", "routes/admin/docs/feedback/index.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
