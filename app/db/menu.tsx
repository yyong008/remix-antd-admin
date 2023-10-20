import { createAccountRoutes } from "./routes/account";
import { createAuthRoutes } from "./routes/auth";
import { createCalendarRoutes } from "./routes/calendar";
import { createCopyBoardRoutes } from "./routes/clipboard";
import { createDashboardRoutes } from "./routes/dashboard";
import { createDiseaseRoutes } from "./routes/disease";
import { createEditorRoutes } from "./routes/editor";
import { createExcelRoutes } from "./routes/excel";
import { createExceptionRoutes } from "./routes/expection";
import { createFormRoutes } from "./routes/form";
import { createGameRoutes } from "./routes/game";
import { createListRoutes } from "./routes/list";
import { createProfileRoutes } from "./routes/profile";
import { createQrcodeRoutes } from "./routes/qrcode";
import { createResultRoutes } from "./routes/result";
import { createSplitPaneRoutes } from "./routes/split-pane";
import { createStackRoutes } from "./routes/stack";

export const menus = (t, lang) => [
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
];
