import { ReactRouterApi } from "./ReactRouterApi";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { commonRouter } from "./common";
import { createOperateMiddleware } from "./ReactRouterApi/middleware/createOperate.middleware";
import { presentatioModeMiddleware } from "./ReactRouterApi/middleware/presentationmode.middleware";

const app = new ReactRouterApi();

app.use(presentatioModeMiddleware);
app.use(createOperateMiddleware);

app.route("/api", commonRouter);
app.route("/api/auth", authRouter);
app.route("/api/admin", adminRouter);

console.table(app.routes);

const handler = app.handler.bind(app);

export const { loader, action } = handler();
