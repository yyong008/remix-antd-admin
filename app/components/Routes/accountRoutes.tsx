// core
import { Link } from "@remix-run/react";

// components
import { UserOutlined } from "@ant-design/icons";

export const accoutRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "account",
    icon: <UserOutlined />,
    name: t("account"),
    children: [
      {
        key: "/account/center",
        path: pathWithLang("/account/center"),
        name: (
          <Link to={pathWithLang("/account/center")}>
            {t("account-center")}
          </Link>
        ),
      },
      {
        key: "/account/settings",
        path: pathWithLang("/account/settings"),
        name: (
          <Link to={pathWithLang("/account/settings")}>
            {t("account-settings")}
          </Link>
        ),
      },
    ],
  };
};
