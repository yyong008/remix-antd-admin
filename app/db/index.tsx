import type { Route } from "@ant-design/pro-layout/es/typing";

// routes
import { createDashboardRoutes } from "./routes/dashboard";
// import { createChatRoutes } from "./routes/chat";
import { createDiseaseRoutes } from "./routes/disease";
import { createFormRoutes } from "./routes/form";
import { createListRoutes } from "./routes/list";
import { createProfileRoutes } from "./routes/profile";
import { createResultRoutes } from "./routes/result";
import { createExceptionRoutes } from "./routes/expection";
import { createAccountRoutes } from "./routes/account";
import { createEditorRoutes } from "./routes/editor";
import { createExcelRoutes } from "./routes/excel";
import { createGameRoutes } from "./routes/game";
import { createStackRoutes } from "./routes/stack";
import { createCalendarRoutes } from "./routes/calendar";
import { createLibRoutes } from "./routes/lib";
import { createSystemRoutes } from "./routes/system";

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
