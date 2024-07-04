import { type DefineRouteFunction } from "@remix-run/dev/dist/config/routes";

export function adminRoutes(route: DefineRouteFunction) {
  route(":lang/admin", "modules/layout/_a/index.tsx", () => {
    adminRouteBlog(route);
    adminRouteDashboard(route);
    adminRouteDemo(route);
    adminRouteDocs(route);
    adminRouteNews(route);
    adminRouteProfile(route);
    adminRouteSystem(route);
    adminRouteTools(route);
    adminRouteAbout(route);
  });
}

function adminRouteBlog(route: DefineRouteFunction) {
  route("blog", "modules-admin/blog/index/index.tsx");
  route("blog/category", "modules-admin/blog/category/index.tsx");
  route("blog/tag", "modules-admin/blog/tag/index.tsx");
  route("blog/edit", "modules-admin/blog/create/index.tsx");
  route("blog/edit/:id", "modules-admin/blog/edit/index.tsx");
  route("blog/result", "modules-admin/blog/result/index.tsx");
}

function adminRouteDashboard(route: DefineRouteFunction) {
  route("dashboard", "modules-admin/dashboard/index.tsx");
}

function adminRouteDemo(route: DefineRouteFunction) {
  route("demo/account/center", "modules-admin/demo/account/center/index.tsx");
  route(
    "demo/account/settings",
    "modules-admin/demo/account/settings/index.tsx",
  );

  route("demo/calender/antd", "modules-admin/demo/calender/antd/index.tsx");
  route(
    "demo/calender/temporal",
    "modules-admin/demo/calender/temporal/index.tsx",
  );

  route("demo/chat", "modules-admin/demo/chat/index.tsx");

  route(
    "demo/dashboard/analysis",
    "modules-admin/demo/dashboard/analysis/index.tsx",
  );
  route(
    "demo/dashboard/monitor",
    "modules-admin/demo/dashboard/monitor/index.tsx",
  );
  route(
    "demo/dashboard/workplace",
    "modules-admin/demo/dashboard/workplace/index.tsx",
  );

  route("demo/editor/flow", "modules-admin/demo/editor/flow/index.tsx");
  route(
    "demo/editor/json-viewer",
    "modules-admin/demo/editor/json-viewer/index.tsx",
  );
  route("demo/editor/markdown", "modules-admin/demo/editor/markdown/index.tsx");
  route("demo/editor/mind", "modules-admin/demo/editor/mind/index.tsx");
  route("demo/editor/rich", "modules-admin/demo/editor/rich/index.tsx");

  route("demo/excel/import", "modules-admin/demo/excel/import/index.tsx");
  route("demo/excel/export", "modules-admin/demo/excel/export/index.tsx");

  route("demo/exception/403", "modules-admin/demo/exception/403/index.tsx");
  route("demo/exception/404", "modules-admin/demo/exception/404/index.tsx");
  route("demo/exception/500", "modules-admin/demo/exception/500/index.tsx");

  route(
    "demo/form/advanced-form",
    "modules-admin/demo/form/advanced-form/index.tsx",
  );
  route("demo/form/basic-form", "modules-admin/demo/form/basic-form/index.tsx");
  route("demo/form/step-form", "modules-admin/demo/form/step-form/index.tsx");

  route("demo/game/mouse", "modules-admin/demo/game/mouse/index.tsx");
  route(
    "demo/game/pocker-guess",
    "modules-admin/demo/game/pocker-guess/index.tsx",
  );
  route(
    "demo/game/pockercontent:hhmz",
    "modules-admin/demo/game/pocker-content/index.tsx",
  );
  route("demo/game/rl", "modules-admin/demo/game/rl/index.tsx");
  route("demo/game/trbl", "modules-admin/demo/game/trbl/index.tsx");

  route(
    "demo/health/anxiety-depression",
    "modules-admin/demo/health/anxiety-depression/index.tsx",
  );
  route(
    "demo/health/cervical-vertebra.",
    "modules-admin/demo/health/cervical-vertebra/index.tsx",
  );
  route("demo/health/hand", "modules-admin/demo/health/hand/index.tsx");
  route("demo/health/obesity", "modules-admin/demo/health/obesity/index.tsx");
  route("demo/health/sleep", "modules-admin/demo/health/sleep/index.tsx");
  route("demo/health/sport", "modules-admin/demo/health/sport/index.tsx");
  route("demo/health/vision", "modules-admin/demo/health/vision/index.tsx");

  route("demo/lib/clipboard", "modules-admin/demo/lib/clipboard/index.tsx");
  route("demo/lib/icons", "modules-admin/demo/lib/icons/index.tsx");
  route("demo/lib/qrcode", "modules-admin/demo/lib/qrcode/index.tsx");
  route("demo/lib/split-pane", "modules-admin/demo/lib/split-pane/index.tsx");

  route("demo/list/basic-list", "modules-admin/demo/list/basic-list/index.tsx");
  route("demo/list/card-list", "modules-admin/demo/list/card-list/index.tsx");
  route("demo/list/table-list", "modules-admin/demo/list/table-list/index.tsx");
  route(
    "demo/list/search/applications",
    "modules-admin/demo/list/search/applications/index.tsx",
  );
  route(
    "demo/list/search/articles",
    "modules-admin/demo/list/search/articles/index.tsx",
  );
  route(
    "demo/list/search/projects",
    "modules-admin/demo/list/search/projects/index.tsx",
  );

  route(
    "demo/profile/advanced",
    "modules-admin/demo/profile/advanced/index.tsx",
  );
  route("demo/profile/basic", "modules-admin/demo/profile/basic/index.tsx");

  route("demo/result/fail", "modules-admin/demo/result/fail/index.tsx");
  route("demo/result/success", "modules-admin/demo/result/success/index.tsx");

  route("demo/stack/laxjs/cursor", "modules-admin/demo/stack/laxjs/cursor.tsx");
  route(
    "demo/stack/rxjs/count-down",
    "modules-admin/demo/stack/rxjs/count-down.tsx",
  );
  route("demo/stack/rxjs/keybr", "modules-admin/demo/stack/rxjs/keybr.tsx");
}
function adminRouteDocs(route: DefineRouteFunction) {
  route("docs/change-log", "modules-admin/docs/change-log/index.tsx");
  route("docs/feedback", "modules-admin/docs/feedback/index.tsx");
}

function adminRouteNews(route: DefineRouteFunction) {
  route("news/edit", "modules-admin/news/edit/index.tsx");
  route("news/edit/:id", "modules-admin/news/edit-detail/index.tsx");
  route("news/category", "modules-admin/news/category/index.tsx");
  route("news/category/:id", "modules-admin/news/list/index.tsx");
  route("news/result", "modules-admin/news/result/index.tsx");
}

function adminRouteProfile(route: DefineRouteFunction) {
  route("profile/account", "modules-admin/profile/account/index.tsx");
  route(
    "profile/link/category",
    "modules-admin/profile/link/category/index.tsx",
  );
  route(
    "profile/link/category/:id",
    "modules-admin/profile/link/category-detail/index.tsx",
  );
}

function adminRouteSystem(route: DefineRouteFunction) {
  route("system/config", "modules-admin/system/config/index.tsx");
  route("system/dept", "modules-admin/system/dept/index.tsx");
  route("system/dict", "modules-admin/system/dict/index.tsx");
  route("system/dict-item/:id", "modules-admin/system/dict-item/index.tsx");
  route("system/menu", "modules-admin/system/menu/index.tsx");
  route(
    "system/monitor/login-log",
    "modules-admin/system/monitor/login-log/index.tsx",
  );
  route("system/monitor/serve", "modules-admin/system/monitor/serve/index.tsx");
  route("system/role", "modules-admin/system/role/index.tsx");
  route("system/user", "modules-admin/system/user/index.tsx");
}

function adminRouteTools(route: DefineRouteFunction) {
  route("tools/mail", "modules-admin/tools/mail/index.tsx");
  route("tools/mail/list", "modules-admin/tools/mail-list/index.tsx");
  route("tools/mail/:id", "modules-admin/tools/mail-detail/index.tsx");
  route("tools/", "modules-admin/tools/storage/index.tsx");
}

function adminRouteAbout(route: DefineRouteFunction) {
  route("about", "modules-admin/about/index.tsx");
}
