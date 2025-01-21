import { ReactRouterApi } from "./ReactRouterApi";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { commonRouter } from "./common";
import { createOperateMiddleware } from "./ReactRouterApi/middleware/createOperate.middleware";
import { presentatioModeMiddleware } from "./ReactRouterApi/middleware/presentationmode.middleware";

const app = new ReactRouterApi();

app.use(presentatioModeMiddleware);
app.use(createOperateMiddleware);

// 因为国际化 `:lang` 存在，同一个服务提供多个路由，api 可能被匹配为 lang，添加版本号区分即可
app.route("/api/v1", commonRouter);
app.route("/api/v1/auth", authRouter);
app.route("/api/v1/admin", adminRouter);

console.table(app.routes);

const fetch = app.fetch.bind(app);

export const { loader, action } = fetch();
