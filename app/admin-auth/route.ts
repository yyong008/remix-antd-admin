import { prefix, route } from "@react-router/dev/routes";

const file_path = (...args: string[]) =>
  "admin-auth/modules/" + args.join("/") + "/index.tsx";

export const adminAuthRoutes = [
  ...prefix(":lang/admin", [
    route("login", file_path("login")),
    route("register", file_path("register")),
    route("welcome", file_path("welcome")),
  ]),
];
