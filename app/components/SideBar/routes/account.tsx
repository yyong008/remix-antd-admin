import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { UserOutlined } = _icons;

export const createAccountRoutes = (t: any, lang: string): Route => {
  return {
    key: "account",
    path: `${lang}/account`,
    icon: <UserOutlined />,
    name: t("account"),
    children: [
      {
        key: "center",
        path: "center",
        name: t("account-center"),
      },
      {
        key: "settings",
        path: "settings",
        name: t("account-settings"),
      },
    ],
  };
};
