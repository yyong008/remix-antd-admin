import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

import { apiRoutes } from "./router/api";
import { homeRoutes } from "./router/home";
import { clientRoutes } from "./router/client";
import { adminNoLayoutRoutes } from "./router/admin-no-layout";
import { adminRoutes } from "./router/admin";
import { anyRoutes } from "./router/any";

export function allRoutes(route: DefineRouteFunction) {
  homeRoutes(route);
  apiRoutes(route);
  clientRoutes(route);
  adminNoLayoutRoutes(route);
  adminRoutes(route);
  anyRoutes(route);
}
