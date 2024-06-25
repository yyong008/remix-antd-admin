import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function apiRoutes(route: DefineRouteFunction) {
  route(
    "api/admin/system/monitor/serve",
    "routes/api/admin/system/monitor/serve/route.ts",
  );
  route("api/dashboard", "routes/api/admin/dashboard/route.ts");
  route("api/geojson", "routes/api/geojson.ts");
  route("api/healthcheck", "routes/api/healthcheck.ts");
  route("api/signin", "routes/api/signin.ts");
  route("api/upload", "routes/api/upload.ts");
  route("api/userinfo", "routes/api/userinfo.ts");

  apiLoginRoute(route);
}

function apiLoginRoute(route: DefineRouteFunction) {
  route("api/login", "routes/api/admin-auth/login.ts");
  route("api/logout", "routes/api/admin-auth/logout.ts");
  route("api/register", "routes/api/admin-auth/register.ts");
  route("api/refresh_token", "routes/api/admin-auth/refresh_token.ts");
}
