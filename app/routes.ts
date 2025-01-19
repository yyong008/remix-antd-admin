import { type RouteConfig, route } from "@react-router/dev/routes";
import { clientRoutes } from "./app/route";
import { adminAuthRoutes } from "./admin-auth/route";
import { adminRoutes } from "./admin/route";

// ======================================= route =======================================

const routes = [...clientRoutes, ...adminAuthRoutes, ...adminRoutes];

// ======================================= export =======================================

export default [
  ...routes,
  route("/api/*", "apis.server/index.ts"),
] satisfies RouteConfig;
