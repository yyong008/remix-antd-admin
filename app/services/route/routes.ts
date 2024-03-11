import type { Route } from "@ant-design/pro-layout/es/typing";

// routes
import { createDashboardRoutes } from "~/db/routes/dashboard";
// import { createChatRoutes } from "./routes/chat";
import { createDiseaseRoutes } from "~/db/routes/disease";
import { createFormRoutes } from "~/db/routes/form";
import { createListRoutes } from "~/db/routes/list";
import { createProfileRoutes } from "~/db/routes/profile";
import { createResultRoutes } from "~/db/routes/result";
import { createExceptionRoutes } from "~/db/routes/expection";
import { createAccountRoutes } from "~/db/routes/account";
import { createEditorRoutes } from "~/db/routes/editor";
import { createExcelRoutes } from "~/db/routes/excel";
import { createGameRoutes } from "~/db/routes/game";
import { createStackRoutes } from "~/db/routes/stack";
import { createCalendarRoutes } from "~/db/routes/calendar";
import { createLibRoutes } from "~/db/routes/lib";
import { createSystemRoutes } from "~/db/routes/system";

const createRoutes = (t: any, lang: any) => {
  return [
    createDashboardRoutes(t, lang),
    // createChatRoutes(t, lang),
    createDiseaseRoutes(t, lang),
    createSystemRoutes(t, lang),
    createFormRoutes(t, lang),
    createListRoutes(t, lang),
    createProfileRoutes(t, lang),
    createResultRoutes(t, lang),
    createExceptionRoutes(t, lang),
    createAccountRoutes(t, lang),
    createEditorRoutes(t, lang),
    createExcelRoutes(t, lang),
    createGameRoutes(t, lang),
    createStackRoutes(t, lang),
    createCalendarRoutes(t, lang),
    createLibRoutes(t, lang),
  ];
};

export function createRoute(
  lang: string,
  t: any,
  _routes?: any[],
): { route: Route } {
  return {
    route: {
      path: `/`,
      routes: createRoutes(t, lang),
    },
  };
}
