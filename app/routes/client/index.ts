import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function clientRoutes(route: DefineRouteFunction) {
  route(":lang/", "routes/layout/_c.tsx", () => {
    route("", "modules-client/index/index.tsx", { index: true });
    route("about", "modules-client/about/index.tsx");
    route("blog", "modules-client/blog/index.tsx", { index: true });
    route("blog/:id", "modules-client/blog-detail/index.tsx");
    route("news", "modules-client/news/index.tsx");
    route("news/:id", "modules-client/news-detail/index.tsx");
  });
}
