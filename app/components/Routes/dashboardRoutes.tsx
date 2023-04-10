// core
import { Link } from "@remix-run/react";

// components
import { DashboardOutlined } from "@ant-design/icons";

export const dashboardRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "dashboard",
    icon: <DashboardOutlined />,
    name: t("dashboard"),
    children: [
      {
        key: "analysis",
        path: pathWithLang("/dashboard/analysis"),
        name: (
          <Link to={pathWithLang("/dashboard/analysis")}>{t("analysis")}</Link>
        ),
      },
      {
        key: "monitor",
        path: pathWithLang("/dashboard/monitor"),
        name: (
          <Link to={pathWithLang("/dashboard/monitor")}>{t("monitor")}</Link>
        ),
      },
      {
        key: "workplace",
        path: pathWithLang("/dashboard/workplace"),
        name: (
          <Link to={pathWithLang("/dashboard/workplace")}>
            {t("workplace")}
          </Link>
        ),
      },
    ],
  };
};
