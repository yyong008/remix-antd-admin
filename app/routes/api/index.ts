import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function apiRoutes(route: DefineRouteFunction) {
  route("api/geojson", "modules-api/geojson/index.ts");
  route("api/healthcheck", "modules-api/healthcheck/index.ts");
  route("api/signin", "modules-api/signin/index.ts");
  route("api/upload", "modules-api/upload/index.ts");
  route("api/userinfo", "modules-api/userinfo/index.ts");
  apiAdminRoute(route);
  apiLoginRoute(route);
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
  route("api/dashboard", "modules-api/admin/dashboard/index.ts");
}
