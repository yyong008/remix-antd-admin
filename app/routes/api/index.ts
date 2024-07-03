import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function apiRoutes(route: DefineRouteFunction) {
  route("api/geojson", "modules-api/geojson/index.ts");
  route("api/healthcheck", "modules-api/healthcheck/index.ts");
  route("api/signin", "modules-api/signin/index.ts");
  route("api/upload", "modules-api/upload/index.ts");
  route("api/userinfo", "modules-api/userinfo/index.ts");
  apiAdminRoute(route);
  apiLoginRoute(route);
  apiAdminDemoRoute(route);
  apiAdminBlogRoute(route);
}

function apiLoginRoute(route: DefineRouteFunction) {
  route("api/login", "modules-api/admin-auth/login/index.ts");
  route("api/logout", "modules-api/admin-auth/logout/index.ts");
  route("api/register", "modules-api/admin-auth/register/index.ts");
  route("api/refresh_token", "modules-api/admin-auth/refresh/index.ts");
}

function apiAdminRoute(route: DefineRouteFunction) {
  route(
    "api/admin/system/monitor/serve",
    "modules-api/admin/system/monitor/serve/index.ts",
  );
  route("api/dashboard", "modules-api/admin/dashboard/api.dashboard.ts");
}

function apiAdminDemoRoute(route: DefineRouteFunction) {
  route(
    "api/admin/demo/account/center",
    "modules-api/admin/demo/account/center/index.ts",
  );
  route(
    "api/admin/demo/account/settings",
    "modules-api/admin/demo/account/settings/index.ts",
  );
}

function apiAdminBlogRoute(route: DefineRouteFunction) {
  route(
    "api/admin/blog/category",
    "modules-api/admin/blog/blog-category.api.ts",
  );
  route("api/admin/blog/tag", "modules-api/admin/blog/blog-tag.api.ts");
  route("api/admin/blog", "modules-api/admin/blog/blog.api.ts");
  route("api/admin/blog/:id", "modules-api/admin/blog/blog.detail.api.ts");
}