import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function apiRoutes(route: DefineRouteFunction) {
  apiCommon(route);
  apiAdminRoute(route);
  apiLoginRoute(route);
  apiAdminDemoRoute(route);
  apiAdminBlogRoute(route);
  apiAdminNewsRoute(route);
  apiAdminDocsRoute(route);
  apiAdminProfileRoute(route);
  apiAdminToolsRoute(route);
  apiAdminSystemRoute(route);
}

function apiCommon(route: DefineRouteFunction) {
  route("api/geojson", "apis-server/geojson/index.ts");
  route("api/healthcheck", "apis-server/healthcheck/index.ts");
  route("api/signin", "apis-server/signin/index.ts");
  route("api/upload", "apis-server/upload/api.ts");
  route("api/userinfo", "apis-server/userinfo/index.ts");
}

function apiLoginRoute(route: DefineRouteFunction) {
  route("api/login", "apis-server/admin-auth/login/index.ts");
  route("api/logout", "apis-server/admin-auth/logout/index.ts");
  route("api/register", "apis-server/admin-auth/register/index.ts");
  route("api/refresh_token", "apis-server/admin-auth/refresh/index.ts");
}

function apiAdminRoute(route: DefineRouteFunction) {
  // route(
  //   "api/admin/system/monitor/serve",
  //   "apis-server/admin/system/monitor/serve.api.ts",
  // );
  route("api/dashboard", "apis-server/admin/dashboard/api.dashboard.ts");
}

function apiAdminDemoRoute(route: DefineRouteFunction) {
  route(
    "api/admin/demo/account/center",
    "apis-server/admin/demo/account/center/index.ts",
  );
  route(
    "api/admin/demo/account/settings",
    "apis-server/admin/demo/account/settings/index.ts",
  );
}

function apiAdminBlogRoute(route: DefineRouteFunction) {
  route(
    "api/admin/blog/category",
    "apis-server/admin/blog/blog-category.api.ts",
  );
  route("api/admin/blog/tag", "apis-server/admin/blog/blog-tag.api.ts");
  route("api/admin/blog", "apis-server/admin/blog/blog.api.ts");
  route("api/admin/blog/:id", "apis-server/admin/blog/blog.detail.api.ts");
}

function apiAdminNewsRoute(route: DefineRouteFunction) {
  route(
    "api/admin/news/category",
    "apis-server/admin/news/news-category.api.ts",
  );
  route("api/admin/news", "apis-server/admin/news/news.api.ts");
  route("api/admin/news/:id", "apis-server/admin/news/news.detail.api.ts");
}

function apiAdminDocsRoute(route: DefineRouteFunction) {
  route("api/admin/docs/feedback", "apis-server/admin/docs/feedback.api.ts");
  route("api/admin/docs/changelog", "apis-server/admin/docs/changelog.api.ts");
}

function apiAdminProfileRoute(route: DefineRouteFunction) {
  route(
    "api/admin/profile/account",
    "apis-server/admin/profile/account.api.ts",
  );
  route("api/admin/profile/link", "apis-server/admin/profile/link.api.ts");
  route(
    "api/admin/profile/link/category",
    "apis-server/admin/profile/link-category.api.ts",
  );
}

function apiAdminToolsRoute(route: DefineRouteFunction) {
  route("api/admin/tools/mail", "apis-server/admin/tools/mail.api.ts");
  route(
    "api/admin/tools/mail/:id",
    "apis-server/admin/tools/mail-detail.api.ts",
  );
  route("api/admin/tools/storage", "apis-server/admin/tools/storage.api.ts");
}

function apiAdminSystemRoute(route: DefineRouteFunction) {
  const pathPrefix = "api/admin/system";
  const filePrefix = "apis-server/admin/system";
  const sysetmRoutes = [
    {
      path: `${pathPrefix}/config`,
      file: `${filePrefix}/config.api.ts`,
    },
    {
      path: `${pathPrefix}/dept`,
      file: `${filePrefix}/dept.api.ts`,
    },
    {
      path: `${pathPrefix}/dict`,
      file: `${filePrefix}/dict.api.ts`,
    },
    {
      path: `${pathPrefix}/dict-item/:id`,
      file: `${filePrefix}/dict-item.api.ts`,
    },
    {
      path: `${pathPrefix}/menu`,
      file: `${filePrefix}/menu.api.ts`,
    },
    {
      path: `${pathPrefix}/role`,
      file: `${filePrefix}/role.api.ts`,
    },
    {
      path: `${pathPrefix}/user`,
      file: `${filePrefix}/user.api.ts`,
    },
    {
      path: `${pathPrefix}/monitor/loginlog`,
      file: `${filePrefix}/monitor/loginlog.api.ts`,
    },
    {
      path: `${pathPrefix}/monitor/serve`,
      file: `${filePrefix}/monitor/serve.api.ts`,
    },
  ];

  sysetmRoutes.forEach((rt) => {
    route(rt.path, rt.file);
  });
}
