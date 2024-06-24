import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function adminNoLayoutRoutes(route: DefineRouteFunction) {
  route(":lang/admin/login", "routes/admin-no-layout/login.tsx");
  route(":lang/admin/register", "routes/admin-no-layout/register.tsx");
  route(":lang/admin/welcome", "routes/admin-no-layout/welcome.tsx");
}
