// routes
import { dashboardRoutes } from "./dashboardRoutes";
import { formRoutes } from "./formRoutes";
import { listRoutes } from "./listRoutes";
import { profileRoutes } from "./profileRoutes";
import { resultRoutes } from "./resultRoutes";
import { expectionRoutes } from "./expectionRoutes";
import { accoutRoutes } from "./accountRoutes";
import { editorRoutes } from "./editorRoutes";

const routes = (lang: string, t: any) => {
  return [
    dashboardRoutes(lang, t),
    formRoutes(lang, t),
    listRoutes(lang, t),
    profileRoutes(lang, t),
    resultRoutes(lang, t),
    expectionRoutes(lang, t),
    accoutRoutes(lang, t),
    editorRoutes(lang, t),
  ];
};

export default {
  route: {
    path: "/",
    routes,
  },
};

export function createRoute(lang: string, t: any) {
  return {
    route: {
      path: "/",
      routes: routes(lang, t),
    },
  };
}
