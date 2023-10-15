import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { CheckCircleOutlined } = _icons;

export const createResultRoutes = (t: any, lang: string): Route => {
  return {
    key: "result",
    icon: <CheckCircleOutlined />,
    name: t("result"),
    path: `${lang}/result`,
    children: [
      {
        key: "success",
        path: "success",
        name: t("result-success"),
      },
      {
        key: "fail",
        path: "fail",
        name: t("result-fail"),
      },
    ],
  };
};
