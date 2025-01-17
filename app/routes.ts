import { type RouteConfig, route } from "@react-router/dev/routes";

// ======================================= api =======================================
const admin_tool_apis = [
  route("api/admin/tools/mail", "apis-server/admin/tools/mail.api.ts"),
  route(
    "api/admin/tools/mail/:id",
    "apis-server/admin/tools/mail-detail.api.ts",
  ),
  route("api/admin/tools/storage", "apis-server/admin/tools/storage.api.ts"),
];

const admin_sys_apis = [
  route("api/admin/system/config", "apis-server/admin/system/config.api.ts"),
  route("api/admin/system/dept", "apis-server/admin/system/dept.api.ts"),
  route("api/admin/system/dict", "apis-server/admin/system/dict.api.ts"),
  route(
    "api/admin/system/dict-item/:id",
    "apis-server/admin/system/dict-item.api.ts",
  ),
  route(
    "api/admin/system/menu-list",
    "apis-server/admin/system/menu-list.api.ts",
  ),
  route("api/admin/system/menu", "apis-server/admin/system/menu.api.ts"),
  route(
    "api/admin/system/menu-role",
    "apis-server/admin/system/menu-role.api.ts",
  ),
  route("api/admin/system/role", "apis-server/admin/system/role.api.ts"),
  route("api/admin/system/user", "apis-server/admin/system/user.api.ts"),
  route(
    "api/admin/system/monitor/loginlog",
    "apis-server/admin/system/monitor/loginlog.api.ts",
  ),
  route(
    "api/admin/system/monitor/serve",
    "apis-server/admin/system/monitor/serve.api.ts",
  ),
  route(
    "api/admin/system/monitor/operate",
    "apis-server/admin/system/monitor/operate.api.ts",
  ),
];

const admin_dashboard_apis = [
  route("api/admin/dashboard", "apis-server/admin/dashboard/index.ts"),
];
const admin_auth_apis = [
  route("api/login", "apis-server/admin-auth/login/index.ts"),
  route("api/logout", "apis-server/admin-auth/logout/index.ts"),
  route("api/register", "apis-server/admin-auth/register/index.ts"),
  route("api/refresh_token", "apis-server/admin-auth/refresh/index.ts"),
];
const amdin_blog_apis = [
  route(
    "api/admin/blog/category",
    "apis-server/admin/blog/blog-category.api.ts",
  ),
  route("api/admin/blog/tag", "apis-server/admin/blog/blog-tag.api.ts"),
  route("api/admin/blog", "apis-server/admin/blog/blog.api.ts"),
  route("api/admin/blog/:id", "apis-server/admin/blog/blog.detail.api.ts"),
];
const admin_news_apis = [
  route(
    "api/admin/news/category",
    "apis-server/admin/news/news-category.api.ts",
  ),
  route("api/admin/news", "apis-server/admin/news/news.api.ts"),
  route("api/admin/news/:id", "apis-server/admin/news/news.detail.api.ts"),
];

const admin_feedback_changelog_apis = [
  route("api/admin/docs/feedback", "apis-server/admin/docs/feedback.api.ts"),
  route("api/admin/docs/changelog", "apis-server/admin/docs/changelog.api.ts"),
];

const admin_profile_apis = [
  route(
    "api/admin/profile/account",
    "apis-server/admin/profile/account.api.ts",
  ),
  route("api/admin/profile/link", "apis-server/admin/profile/link.api.ts"),
  route(
    "api/admin/profile/link/category",
    "apis-server/admin/profile/link-category.api.ts",
  ),
];
const other_apis = [
  route("api/geojson", "apis-server/geojson/index.ts"),
  route("api/healthcheck", "apis-server/healthcheck/index.ts"),
  route("api/signin", "apis-server/signin/index.ts"),
  route("api/upload", "apis-server/upload/api.ts"),
  route("api/userinfo", "apis-server/userinfo/index.ts"),
];

const apis = [
  ...other_apis,
  ...admin_auth_apis,
  ...admin_dashboard_apis,
  ...admin_tool_apis,
  ...amdin_blog_apis,
  ...admin_news_apis,
  ...admin_feedback_changelog_apis,
  ...admin_profile_apis,
  ...admin_sys_apis,
];

// ======================================= route =======================================

const adminAuthRoutes = [
  // admin auth
  route(":lang/admin/login", "modules-admin-auth/login/index.tsx"),
  route(":lang/admin/register", "modules-admin-auth/register/index.tsx"),
  route(":lang/admin/welcome", "modules-admin-auth/welcome/index.tsx"),
];

const clientRoutes = [
  route("/", "modules/home/route.ts"),
  route(":lang/", "modules/layout/client/index.tsx", [
    route("", "modules-client/index/index.tsx", { index: true }),
    route("about", "modules-client/about/index.tsx"),
    route("blog", "modules-client/blog/index.tsx", { index: true }),
    route("blog/:id", "modules-client/blog-detail/index.tsx"),
    route("news", "modules-client/news/index.tsx"),
    route("news/:id", "modules-client/news-detail/index.tsx"),
    route("privacy", "modules-client/privacy/index.tsx"),
  ]),
  // any
  route("*", "modules/any/route.tsx"),
];

const adminRoutes = [
  // admin
  route(":lang/admin", "modules/layout/admin/index.tsx", [
    // dashboard
    route("dashboard", "modules-admin/dashboard/index.tsx"),
    // ai
    route("ai/simplechat", "modules-admin/ai/simplechat/index.tsx"),
    // news
    route("news/edit", "modules-admin/news/edit/index.tsx"),
    route("news/edit/:id", "modules-admin/news/edit-detail/index.tsx"),
    route("news/category", "modules-admin/news/category/index.tsx"),
    route("news/category/:id", "modules-admin/news/list/index.tsx"),
    route("news/result", "modules-admin/news/result/index.tsx"),

    // blog
    route("blog", "modules-admin/blog/index/index.tsx"),
    route("blog/category", "modules-admin/blog/category/index.tsx"),
    route("blog/tag", "modules-admin/blog/tag/index.tsx"),
    route("blog/edit", "modules-admin/blog/create/index.tsx"),
    route("blog/edit/:id", "modules-admin/blog/edit/index.tsx"),
    route("blog/result", "modules-admin/blog/result/index.tsx"),

    // profile
    route("profile/account", "modules-admin/profile/account/index.tsx"),
    route(
      "profile/link/category",
      "modules-admin/profile/link/category/index.tsx",
    ),
    route(
      "profile/link/category/:id",
      "modules-admin/profile/link/category-detail/index.tsx",
    ),

    // system
    route("system/config", "modules-admin/system/config/index.tsx"),
    route("system/dept", "modules-admin/system/dept/index.tsx"),
    route("system/dict", "modules-admin/system/dict/index.tsx"),
    route("system/dict-item/:id", "modules-admin/system/dict-item/index.tsx"),
    route("system/menu", "modules-admin/system/menu/index.tsx"),
    route(
      "system/monitor/login-log",
      "modules-admin/system/monitor/login-log/index.tsx",
    ),
    route(
      "system/monitor/serve",
      "modules-admin/system/monitor/serve/index.tsx",
    ),
    route(
      "system/monitor/operate",
      "modules-admin/system/monitor/operate/index.tsx",
    ),
    route("system/role", "modules-admin/system/role/index.tsx"),
    route("system/user", "modules-admin/system/user/index.tsx"),

    // tools
    route("tools/mail", "modules-admin/tools/mail/index.tsx"),
    route("tools/mail/list", "modules-admin/tools/mail-list/index.tsx"),
    route("tools/mail/:id", "modules-admin/tools/mail-detail/index.tsx"),
    route("tools/storage", "modules-admin/tools/storage/index.tsx"),

    // about
    route("about", "modules-admin/about/index.tsx"),
  ]),
];

const routes = [...clientRoutes, ...adminAuthRoutes, ...adminRoutes];

// ======================================= export =======================================

export default [...routes, ...apis] satisfies RouteConfig;
