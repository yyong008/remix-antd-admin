import { index, layout, prefix, route } from "@react-router/dev/routes";

const file_path = (...args: string[]) =>
  "app/modules/" + args.join("/") + "/index.tsx";

export const clientRoutes = [
  route("/", "app/modules/home/route.ts"),
  layout("app/layout/index.tsx", [
    ...prefix(":lang?/", [
      index(file_path("index")),
      route("about", file_path("about")),
      ...prefix("blog", [
        index(file_path("blog")),
        route(":id", file_path("blog-detail")),
      ]),
      ...prefix("news", [
        index(file_path("news")),
        route(":id", file_path("news-detail")),
      ]),
      route("privacy", file_path("privacy")),
    ]),
  ]),
  // any
  route("*", file_path("any")),
];
