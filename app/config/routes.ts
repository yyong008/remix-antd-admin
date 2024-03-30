import type { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

import { LANG, ADMIN_ROUTE_PREFIX } from "../constants";

const PREFIX = `${LANG}/${ADMIN_ROUTE_PREFIX}`;
const DEMO_PREFIX = `${PREFIX}/demo`;
const DASHBOARD_PREFIX = `${PREFIX}/dashboard`;
const SYSTEM_PREFIX = `${PREFIX}/system`;

export function createAdminDemoRoute(route: DefineRouteFunction) {
  // account
  route(
    `${DEMO_PREFIX}/accout/center`,
    "./routes/admin/demo/account/center.tsx",
  );
  route(
    `${DEMO_PREFIX}/accout/settings`,
    "./routes/admin/demo/account/settings.tsx",
  );

  // calender
  // route(`${PREFIX}/calender/antd`, "./routes/admin/demo/calender/antd.tsx");
  // route(`${PREFIX}/calender/temporal`, "./routes/admin/demo/calender/temporal.tsx");

  // chat
  route(`${DEMO_PREFIX}/chat`, "./routes/admin/demo/chat/chat.tsx");

  // dashboard
  route(
    `${DEMO_PREFIX}/dashboard/analysis`,
    "./routes/admin/demo/dashboard/analysis.tsx",
  );
  route(
    `${DEMO_PREFIX}/dashboard/monitor`,
    "./routes/admin/demo/dashboard/monitor.tsx",
  );
  route(
    `${DEMO_PREFIX}/dashboard/workplace`,
    "./routes/admin/demo/dashboard/workplace.tsx",
  );

  // editor
  route(`${DEMO_PREFIX}/editor/flow"`, "./routes/admin/demo/editor/flow.tsx");
  route(
    `${DEMO_PREFIX}/editor/json-viewer"`,
    "./routes/admin/demo/editor/json-viewer.tsx",
  );
  route(
    `${DEMO_PREFIX}/editor/markdown"`,
    "./routes/admin/demo/editor/markdown.tsx",
  );
  route(`${DEMO_PREFIX}/editor/mind"`, "./routes/admin/demo/editor/mind.tsx");
  route(`${DEMO_PREFIX}/editor/rich"`, "./routes/admin/demo/editor/rich.tsx");

  // excel
  route(`${DEMO_PREFIX}/excel/export"`, "./routes/admin/demo/excel/export.tsx");
  route(`${DEMO_PREFIX}/excel/import"`, "./routes/admin/demo/excel/import.tsx");

  // exception
  route(
    `${DEMO_PREFIX}/exception/403"`,
    "./routes/admin/demo/exception/403.tsx",
  );
  route(
    `${DEMO_PREFIX}/exception/404"`,
    "./routes/admin/demo/exception/404.tsx",
  );
  route(
    `${DEMO_PREFIX}/exception/500"`,
    "./routes/admin/demo/exception/500.tsx",
  );

  // form
  route(
    `${DEMO_PREFIX}/form/advanced-form"`,
    "./routes/admin/demo/form/advanced-form.tsx",
  );
  route(
    `${DEMO_PREFIX}/form/basic-form"`,
    "./routes/admin/demo/form/basic-form.tsx",
  );
  route(
    `${DEMO_PREFIX}/form/step-form"`,
    "./routes/admin/demo/form/step-form.tsx",
  );

  // game
  route(`${DEMO_PREFIX}/game/rl"`, "./routes/admin/demo/game/rl.tsx");
  route(`${DEMO_PREFIX}/game/mouse"`, "./routes/admin/demo/game/mouse.tsx");
  route(
    `${DEMO_PREFIX}/game/pocker-guess"`,
    "./routes/admin/demo/game/pocker-guess.tsx",
  );
  // route(`${PREFIX}/game/pockercontent/:hhmz`, "./routes/admin/demo/game/pockercontent/:hhmz.tsx");
  route(`${DEMO_PREFIX}/game/trbl"`, "./routes/admin/demo/game/trbl.tsx");

  // health
  route(
    `${DEMO_PREFIX}/health/anxiety-depression`,
    "./routes/admin/demo/health/anxiety-depression.tsx",
  );
  route(
    `${DEMO_PREFIX}/health/cervical-vertebra`,
    "./routes/admin/demo/health/cervical-vertebra.tsx",
  );
  route(`${DEMO_PREFIX}/health/hand`, "./routes/admin/demo/health/hand.tsx");
  route(
    `${DEMO_PREFIX}/health/obesity`,
    "./routes/admin/demo/health/obesity.tsx",
  );
  route(`${DEMO_PREFIX}/health/sleep`, "./routes/admin/demo/health/sleep.tsx");
  route(`${DEMO_PREFIX}/health/sport`, "./routes/admin/demo/health/sport.tsx");
  route(
    `${DEMO_PREFIX}/health/vision`,
    "./routes/admin/demo/health/vision.tsx",
  );

  // lib
  route(
    `${DEMO_PREFIX}/lib/clipboard`,
    "./routes/admin/demo/lib/clipboard.tsx",
  );
  route(`${DEMO_PREFIX}/lib/icons`, "./routes/admin/demo/lib/icons.tsx");
  route(`${DEMO_PREFIX}/lib/qrcode`, "./routes/admin/demo/lib/qrcode.tsx");
  route(
    `${DEMO_PREFIX}/lib/split-pane`,
    "./routes/admin/demo/lib/split-pane.tsx",
  );

  // list
  route(
    `${DEMO_PREFIX}/list/basic-list`,
    "./routes/admin/demo/list/basic-list.tsx",
  );
  route(
    `${DEMO_PREFIX}/list/card-list`,
    "./routes/admin/demo/list/card-list.tsx",
  );
  route(
    `${DEMO_PREFIX}/list/search/applications`,
    "./routes/admin/demo/list/search/applications.tsx",
  );
  route(
    `${DEMO_PREFIX}/list/search/articles`,
    "./routes/admin/demo/list/search/articles.tsx",
  );
  route(
    `${DEMO_PREFIX}/list/search/projects`,
    "./routes/admin/demo/list/search/projects.tsx",
  );
  route(
    `${DEMO_PREFIX}/list/table-list`,
    "./routes/admin/demo/list/table-list.tsx",
  );

  // profile
  route(
    `${DEMO_PREFIX}/profile/advanced`,
    "./routes/admin/demo/profile/advanced.tsx",
  );
  route(
    `${DEMO_PREFIX}/profile/basic`,
    "./routes/admin/demo/profile/basic.tsx",
  );

  // result
  route(`${DEMO_PREFIX}/result/fail`, "./routes/admin/demo/result/fail.tsx");
  route(
    `${DEMO_PREFIX}/result/success`,
    "./routes/admin/demo/result/success.tsx",
  );

  // stack
  route(
    `${DEMO_PREFIX}/stack/laxjs/cursor`,
    "./routes/admin/demo/stack/laxjs/cursor.tsx",
  );
  route(
    `${DEMO_PREFIX}/stack/rxjs/count-down`,
    "./routes/admin/demo/stack/rxjs/count-down.tsx",
  );
  route(
    `${DEMO_PREFIX}/stack/rxjs/keybr`,
    "./routes/admin/demo/stack/rxjs/keybr.tsx",
  );
}

export function createAdminDashboard(route: DefineRouteFunction) {
  route(`${DASHBOARD_PREFIX}/main`, "./routes/admin/dashboard/index.tsx");
}
export function createAdminSystem(route: DefineRouteFunction) {
  route(`${SYSTEM_PREFIX}/user`, "./routes/admin/system/user.tsx");
  route(`${SYSTEM_PREFIX}/role`, "./routes/admin/system/role.tsx");
  route(`${SYSTEM_PREFIX}/menu`, "./routes/admin/system/menu.tsx");
  route(`${SYSTEM_PREFIX}/dept`, "./routes/admin/system/dept.tsx");
  route(`${SYSTEM_PREFIX}/config`, "./routes/admin/system/config.tsx");
  route(`${SYSTEM_PREFIX}/dict`, "./routes/admin/system/dict.tsx");
  route(
    `${SYSTEM_PREFIX}/dict-item/:did`,
    "./routes/admin/system/dict-item.tsx",
  );
  route(
    `${SYSTEM_PREFIX}/monitor/serve`,
    "./routes/admin/system/monitor/serve.tsx",
  );
  route(
    `${SYSTEM_PREFIX}/monitor/login-log`,
    "./routes/admin/system/monitor/login-log.tsx",
  );
}

export function createAdminAbout(route: DefineRouteFunction) {
  route(`${PREFIX}/about`, "./routes/admin/about.tsx");
}

export function createAdmin(route: DefineRouteFunction) {
  route(`${PREFIX}/login`, "./routes/admin/login.tsx");
  route(`${PREFIX}/register`, "./routes/admin/register.tsx");
  route(`${PREFIX}/logout`, "./routes/admin/logout.tsx");
  route(`${PREFIX}/welcome`, "./routes/admin/welcome.tsx");
}

export function createAdminTools(route: DefineRouteFunction) {
  route(`${PREFIX}/tools/storage`, "./routes/admin/tools/storage/storage.tsx");
}

export function createApi(route: DefineRouteFunction) {
  route(`api/swagger`, "./routes/apis/api.swagger.tsx");
  route(
    `api/system/monitor/serve`,
    "./routes/apis/api.system.monitor.serve.tsx",
  );
  route(`api/healthcheck`, "./routes/apis/healthcheck.tsx");
  route(`api/upload`, "./routes/apis/upload.tsx");
}
