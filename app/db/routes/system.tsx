import type { Route } from "@ant-design/pro-layout/es/typing";

export const createSystemRoutes = (t: any, lang: string): Route => {
  return {
    key: "system",
    path: `/${lang}/system/`,
    icon: "KeyOutlined",
    name: t("system"),
    children: [
      {
        key: "user",
        path: `user`,
        icon: "KeyOutlined",
        name: t("user"),
      },
      {
        key: "role",
        path: `role`,
        icon: "KeyOutlined",
        name: t("role"),
      },
      {
        key: "menu",
        path: `menu`,
        icon: "KeyOutlined",
        name: t("menu"),
      },
      {
        key: "dept",
        path: `dept`,
        icon: "KeyOutlined",
        name: t("dept"),
      },
      {
        key: "post",
        path: `post`,
        icon: "KeyOutlined",
        name: t("post"),
      },
      {
        key: "dict",
        path: `dict`,
        icon: "KeyOutlined",
        name: t("dict"),
      },
      {
        key: "config",
        path: `config`,
        icon: "KeyOutlined",
        name: t("config"),
      },
      {
        key: "notice",
        path: `notice`,
        icon: "KeyOutlined",
        name: t("notice"),
      },
      {
        key: "log",
        path: `log`,
        icon: "KeyOutlined",
        name: t("system-log"),
        children: [
          {
            key: "operlog",
            path: `operlog`,
            icon: "KeyOutlined",
            name: t("operlog"),
          },
          {
            key: "logininfor",
            path: `logininfor`,
            icon: "KeyOutlined",
            name: t("logininfor"),
          },
        ],
      },
      {
        key: "oss",
        path: `oss`,
        icon: "KeyOutlined",
        name: t("oss"),
      },
      // {
      //   key: "client",
      //   path: `client`,
      //   icon: "KeyOutlined",
      //   name: t("client"),
      // },
    ],
  };
};
