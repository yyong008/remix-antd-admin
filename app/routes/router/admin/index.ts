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
  route("blog", "routes/admin/blog/home.tsx");
  route("blog/category", "routes/admin/blog/blog-category.tsx");
  route("blog/tag", "routes/admin/blog/blog-tag.tsx");
  route("blog/edit", "routes/admin/blog/blog-edit.tsx");
  route("blog/edit/:id", "routes/admin/blog/blog-edit-detail.tsx");
}

function adminRouteDashboard(route: DefineRouteFunction) {
  route("dashboard", "routes/admin/dashboard/route.tsx");
}

function adminRouteDemo(route: DefineRouteFunction) {
  route("demo/account/center", "routes/admin/demo/account/center.tsx");
  route("demo/account/settings", "routes/admin/demo/account/settings.tsx");

  route("demo/calender/antd", "routes/admin/demo/calender/antd.tsx");
  route("demo/calender/temporal", "routes/admin/demo/calender/temporal.tsx");

  route("demo/chat", "routes/admin/demo/chat/chat.tsx");

  route("demo/dashboard/analysis", "routes/admin/demo/dashboard/analysis.tsx");
  route("demo/dashboard/monitor", "routes/admin/demo/dashboard/monitor.tsx");
  route(
    "demo/dashboard/workplace",
    "routes/admin/demo/dashboard/workplace.tsx",
  );

  route("demo/editor/flow", "routes/admin/demo/editor/flow.tsx");
  route("demo/editor/json-viewer", "routes/admin/demo/editor/json-viewer.tsx");
  route("demo/editor/markdown", "routes/admin/demo/editor/markdown.tsx");
  route("demo/editor/mind", "routes/admin/demo/editor/mind.tsx");
  route("demo/editor/rich", "routes/admin/demo/editor/rich.tsx");

  route("demo/excel/import", "routes/admin/demo/excel/import.tsx");
  route("demo/excel/export", "routes/admin/demo/excel/export.tsx");

  route("demo/exception/403", "routes/admin/demo/exception/403.tsx");
  route("demo/exception/404", "routes/admin/demo/exception/404.tsx");
  route("demo/exception/500", "routes/admin/demo/exception/500.tsx");

  route("demo/form/advanced-form", "routes/admin/demo/form/advanced-form.tsx");
  route("demo/form/basic-form", "routes/admin/demo/form/basic-form.tsx");
  route("demo/form/step-form", "routes/admin/demo/form/step-form.tsx");

  route("demo/game/mouse", "routes/admin/demo/game/mouse.tsx");
  route("demo/game/pocker-guess", "routes/admin/demo/game/pocker-guess.tsx");
  route(
    "demo/game/pockercontent:hhmz",
    "routes/admin/demo/game/pockercontent-detail.tsx",
  );
  route("demo/game/rl", "routes/admin/demo/game/rl.tsx");
  route("demo/game/trbl", "routes/admin/demo/game/trbl.tsx");

  route(
    "demo/health/anxiety-depression",
    "routes/admin/demo/health/anxiety-depression.tsx",
  );
  route(
    "demo/health/cervical-vertebra.",
    "routes/admin/demo/health/cervical-vertebra.tsx",
  );
  route("demo/health/hand", "routes/admin/demo/health/hand.tsx");
  route("demo/health/obesity", "routes/admin/demo/health/obesity.tsx");
  route("demo/health/sleep", "routes/admin/demo/health/sleep.tsx");
  route("demo/health/sport", "routes/admin/demo/health/sport.tsx");
  route("demo/health/vision", "routes/admin/demo/health/vision.tsx");

  route("demo/lib/clipboard", "routes/admin/demo/lib/clipboard.tsx");
  route("demo/lib/icons", "routes/admin/demo/lib/icons.tsx");
  route("demo/lib/qrcode", "routes/admin/demo/lib/qrcode.tsx");
  route("demo/lib/split-pane", "routes/admin/demo/lib/split-pane.tsx");

  route("demo/list/basic-list", "routes/admin/demo/list/basic-list.tsx");
  route("demo/list/card-list", "routes/admin/demo/list/card-list.tsx");
  route("demo/list/table-list", "routes/admin/demo/list/table-list.tsx");
  route(
    "demo/list/search/applications",
    "routes/admin/demo/list/search/applications.tsx",
  );
  route(
    "demo/list/search/articles",
    "routes/admin/demo/list/search/articles.tsx",
  );
  route(
    "demo/list/search/projects",
    "routes/admin/demo/list/search/projects.tsx",
  );

  route("demo/profile/advanced", "routes/admin/demo/profile/advanced.tsx");
  route("demo/profile/basic", "routes/admin/demo/profile/basic.tsx");

  route("demo/result/fail", "routes/admin/demo/result/fail.tsx");
  route("demo/result/success", "routes/admin/demo/result/success.tsx");

  route("demo/stack/laxjs/cursor", "routes/admin/demo/stack/laxjs/cursor.tsx");
  route(
    "demo/stack/rxjs/count-down",
    "routes/admin/demo/stack/rxjs/count-down.tsx",
  );
  route("demo/stack/rxjs/keybr", "routes/admin/demo/stack/rxjs/keybr.tsx");
}
function adminRouteDocs(route: DefineRouteFunction) {
  route("docs/change-log", "routes/admin/docs/change-log.tsx");
  route("docs/feedback", "routes/admin/docs/feedback.tsx");
}

function adminRouteNews(route: DefineRouteFunction) {
  route("news/edit", "routes/admin/news/edit.tsx");
  route("news/edit/:id", "routes/admin/news/edit-detail.tsx");
  route("news/category", "routes/admin/news/news-category.tsx");
  route("news/category/:id", "routes/admin/news/news-category-detail.tsx");
}

function adminRouteProfile(route: DefineRouteFunction) {
  route("profile/account", "routes/admin/profile/account.tsx");
  route("profile/link/category", "routes/admin/profile/link/link-category.tsx");
  route(
    "profile/link/category/:id",
    "routes/admin/profile/link/link-category-detail.tsx",
  );
}

function adminRouteSystem(route: DefineRouteFunction) {
  route("system/config", "routes/admin/system/config.tsx");
  route("system/dept", "routes/admin/system/dept.tsx");
  route("system/dict", "routes/admin/system/dict/dict.tsx");
  route("system/dict-item/:id", "routes/admin/system/dict/dict-item.tsx");
  route("system/menu", "routes/admin/system/menu.tsx");
  route(
    "system/monitor/login-log",
    "routes/admin/system/monitor/login-log.tsx",
  );
  route("system/monitor/serve", "routes/admin/system/monitor/serve.tsx");
  route("system/role", "routes/admin/system/role.tsx");
  route("system/user", "routes/admin/system/user.tsx");
}

function adminRouteTools(route: DefineRouteFunction) {
  route("tools/mail", "routes/admin/tools/mail/mail-edit.tsx");
  route("tools/mail/list", "routes/admin/tools/mail/mail-list.tsx");
  route("tools/mail/:id", "routes/admin/tools/mail/mail-detail.tsx");
  route("tools/", "routes/admin/tools/storage.tsx");
}

function adminRouteAbout(route: DefineRouteFunction) {
  route("about", "routes/admin/about/route.tsx");
}
