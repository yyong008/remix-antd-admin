import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

const authRoutes = [
  layout("layout/auth/index.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("signup", "routes/auth/signup.tsx"),
  ]),
];

const adminDashboardRoutes = [...prefix("dashboard", [index("routes/admin/dashboard/index.tsx")])];

const adminBlogRoutes = [
  layout("routes/admin/blog/_layout.tsx", [
    ...prefix("blog", [
      route("list", "routes/admin/blog/list/index.tsx"),
      route("category", "routes/admin/blog/category/index.tsx"),
      route("tag", "routes/admin/blog/tag/index.tsx"),
      route("new", "routes/admin/blog/edit/index.tsx", { id: "admin-blog-new" }),
      route("edit", "routes/admin/blog/edit/index.tsx", { id: "admin-blog-edit" }),
      route("edit/:id", "routes/admin/blog/edit/index.tsx", {
        id: "admin-blog-edit-id",
      }),
      route("result", "routes/admin/blog/result/index.tsx"),
    ]),
  ]),
];

const adminNewsRoutes = [
  layout("routes/admin/news/news-layout.tsx", [
    ...prefix("news", [
      route("list", "routes/admin/news/list-news.tsx"),
      route("edit", "routes/admin/news/edit-news.tsx"),
      route("edit/:id", "routes/admin/news/edit-news.tsx", { id: "admin-news-edit-id" }),
      route("result", "routes/admin/news/result-news.tsx"),
    ]),
  ]),
];

const adminProfileRoutes = [
  layout("routes/admin/profile/layout.tsx", [
    ...prefix("profile", [
      route("account", "routes/admin/profile/account/index.tsx"),
      route("link", "routes/admin/profile/link/index.tsx"),
    ]),
  ]),
];

const adminSystemRoutes = [
  layout("routes/admin/system/system-layout.tsx", [
    ...prefix("system", [
      route("config", "routes/admin/system/config/index.tsx"),
      route("dept", "routes/admin/system/dept/index.tsx"),
      route("dict", "routes/admin/system/dict/index.tsx"),
      route("dict-item/:id", "routes/admin/system/dict-item/index.tsx"),
      route("menu", "routes/admin/system/menu/index.tsx"),
      layout("routes/admin/system/monitor/monitor-layout.tsx", [
        ...prefix("monitor", [
          route("loginlog", "routes/admin/system/monitor/login-log/index.tsx"),
          route("serve", "routes/admin/system/monitor/serve/index.tsx"),
          route("operate", "routes/admin/system/monitor/operate/index.tsx"),
        ]),
      ]),
      route("role", "routes/admin/system/role/index.tsx"),
      route("user", "routes/admin/system/user/index.tsx"),
    ]),
  ]),
];

const adminToolsRoues = [
  layout("routes/admin/tools/tools-layout.tsx", [
    ...prefix("tools", [
      layout("routes/admin/tools/mail/mail-layout.tsx", [
        ...prefix("mail", [
          index("routes/admin/tools/mail/index.tsx"),
          route("list", "routes/admin/tools/mail-list/index.tsx"),
          route(":id", "routes/admin/tools/mail-detail/index.tsx"),
        ]),
      ]),
      route("storage", "routes/admin/tools/storage/index.tsx"),
    ]),
  ]),
];

const adminAIRoutes = [route("ai/chatbot", "routes/admin/ai/index.tsx")];

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
        route("docs/changelog", "routes/admin/docs/changelog/index.tsx"),
        route("docs/feedback", "routes/admin/docs/feedback/index.tsx"),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
