import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function clientRoutes(route: DefineRouteFunction) {
  route(":lang/", "routes/layout/_c.tsx", () => {
    route("", "routes/client/index.tsx", { index: true });
    route("about", "routes/client/about.tsx");
    route("blog", "routes/client/blog.tsx", { index: true });
    route("blog/:id", "routes/client/blog-detail.tsx");
    route("news", "routes/client/news.tsx");
    route("news/:id", "routes/client/news-detail.tsx");
  });
}
