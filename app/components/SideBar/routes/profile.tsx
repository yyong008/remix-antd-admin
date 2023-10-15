import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { ProfileOutlined } = _icons;

export const createProfileRoutes = (t: any, lang: string): Route => {
  return {
    key: "profile",
    icon: <ProfileOutlined />,
    name: t("profile"),
    path: `${lang}/profile`,
    children: [
      {
        key: "basic",
        path: "basic",
        name: t("profile-basic"),
      },
      {
        key: "advanced",
        path: "advanced",
        name: t("profile-advanced"),
      },
    ],
  };
};
