import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function homeRoutes(route: DefineRouteFunction) {
  route("/", "routes/home/route.ts");
}
