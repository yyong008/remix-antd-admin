import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { WarningOutlined } = _icons;

export const createExceptionRoutes = (t: any, lang: string): Route => {
  return {
    key: "expection",
    icon: <WarningOutlined />,
    name: t("exception"),
    path: `${lang}/exception`,
    children: [
      {
        key: "/403",
        path: "403",
        name: t("exception-403"),
      },
      {
        key: "404",
        path: "404",
        name: t("exception-404"),
      },
      {
        key: "500",
        path: "500",
        name: t("exception-500"),
      },
    ],
  };
};
