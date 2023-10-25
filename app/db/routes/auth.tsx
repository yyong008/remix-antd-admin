import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { KeyOutlined } = _icons;

export const createAuthRoutes = (t: any, lang: string): Route => {
  return {
    key: "auths",
    path: `/${lang}/`,
    icon: "KeyOutlined",
    name: t("auth"),
    children: [
      {
        key: "role",
        path: `role`,
        icon: "KeyOutlined",
        name: t("role"),
      },
      {
        key: "auth-tree",
        path: `auth`,
        icon: "KeyOutlined",
        name: t("auth"),
      },
    ],
  };
};
