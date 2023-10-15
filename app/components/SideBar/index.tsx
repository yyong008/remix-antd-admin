import type { Route } from "@ant-design/pro-layout/es/typing";

// routes
import { createDashboardRoutes } from "./routes/dashboard";
// import { createChatRoutes } from "./routes/chat";
import { createDiseaseRoutes } from "./routes/disease";
import { createAuthRoutes } from "./routes/auth";
import { createFormRoutes } from "./routes/form";
import { createListRoutes } from "./routes/list";
import { createProfileRoutes } from "./routes/profile";
import { createResultRoutes } from "./routes/result";
import { createExceptionRoutes } from "./routes/expection";
import { createAccountRoutes } from "./routes/account";
import { createCopyBoardRoutes } from "./routes/clipboard";
import { createEditorRoutes } from "./routes/editor";
import { createExcelRoutes } from "./routes/excel";
import { createSplitPaneRoutes } from "./routes/split-pane";
import { createGameRoutes } from "./routes/game";
import { createStackRoutes } from "./routes/stack";
import { createQrcodeRoutes } from "./routes/qrcode";
import { createCalendarRoutes } from "./routes/calendar";

export function createRoute(
  lang: string,
  t: any,
  _routes?: any[],
): { route: Route } {
  return {
    route: {
      path: `/`,
      routes: [
        createDashboardRoutes(t, lang),
        // createChatRoutes(t, lang),
        createDiseaseRoutes(t, lang),
        createAuthRoutes(t, lang),
        createFormRoutes(t, lang),
        createListRoutes(t, lang),
        createProfileRoutes(t, lang),
        createResultRoutes(t, lang),
        createExceptionRoutes(t, lang),
        createAccountRoutes(t, lang),
        createCopyBoardRoutes(t, lang),
        createEditorRoutes(t, lang),
        createExcelRoutes(t, lang),
        createSplitPaneRoutes(t, lang),
        createGameRoutes(t, lang),
        createStackRoutes(t, lang),
        createQrcodeRoutes(t, lang),
        createCalendarRoutes(t, lang),
      ],
    },
  };
}
