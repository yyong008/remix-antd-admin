// core
import { Link } from "@remix-run/react";

// components
import { WarningOutlined } from "@ant-design/icons";

export const expectionRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "expection",
    icon: <WarningOutlined />,
    name: t("exception"),
    children: [
      {
        key: "/exception/403",
        path: pathWithLang("/exception/403"),
        name: (
          <Link to={pathWithLang("/exception/403")}>{t("exception-403")}</Link>
        ),
      },
      {
        key: "/exception/404",
        path: pathWithLang("/exception/404"),
        name: (
          <Link to={pathWithLang("/exception/404")}>{t("exception-404")}</Link>
        ),
      },
      {
        key: "/exception/500",
        path: pathWithLang("/exception/500"),
        name: (
          <Link to={pathWithLang("/exception/500")}>{t("exception-500")}</Link>
        ),
      },
    ],
  };
};
