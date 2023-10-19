import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { KeyOutlined } = _icons;

export const createAuthRoutes = (t: any, lang: string): Route => {
  return {
    key: "auth",
    path: `/${lang}/auth`,
    icon: "KeyOutlined",
    name: t("auth"),
  };
};
