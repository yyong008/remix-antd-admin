import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { DashboardOutlined } = _icons;

export const createDashboardRoutes = (t: any, lang: string): Route => {
  return {
    key: "dashboard",
    path: `${lang}/dashboard`,
    icon: "DashboardOutlined",
    name: t("dashboard"),
    children: [
      {
        key: "analysis",
        path: "analysis",
        name: t("analysis"),
      },
      {
        key: "monitor",
        path: "monitor",
        name: t("monitor"),
      },
      {
        key: "workplace",
        path: "workplace",
        name: t("workplace"),
      },
    ],
  };
};
