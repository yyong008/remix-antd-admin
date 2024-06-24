import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function anyRoutes(route: DefineRouteFunction) {
  route("*", "routes/any/route.tsx");
}
