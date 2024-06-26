import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function adminNoLayoutRoutes(route: DefineRouteFunction) {
  route(":lang/admin/login", "modules-admin-auth/login/index.tsx");
  route(":lang/admin/register", "modules-admin-auth/register/index.tsx");
  route(":lang/admin/welcome", "modules-admin-auth/welcome/index.tsx");
}
