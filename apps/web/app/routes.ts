import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

const newsRotues = [
  route("news", "routes/news/index.tsx"),
  route("news/:id", "routes/news-detail/index.tsx"),
];

const blogRoutes = [
  route("blog", "routes/blog/index.tsx"),
  route("blog/:id", "routes/blog-detail/index.tsx"),
];

export default [
  ...prefix(":locale?", [
    layout("layout/index.tsx", [
      ...newsRotues,
      ...blogRoutes,
      index("routes/home/index.tsx"),
      route("about", "routes/about/index.tsx"),
      route("privacy", "routes/privacy/index.tsx"),
      route("*", "routes/any/index.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
