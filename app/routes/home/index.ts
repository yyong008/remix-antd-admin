import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function homeRoutes(route: DefineRouteFunction) {
  route("/", "modules/home/route.ts");
}
