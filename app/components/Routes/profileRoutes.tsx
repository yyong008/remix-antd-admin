// core
import { Link } from "@remix-run/react";

// components
import { ProfileOutlined } from "@ant-design/icons";

export const profileRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "profile",
    icon: <ProfileOutlined />,
    name: t("profile"),
    children: [
      {
        key: "/profile/basic",
        path: pathWithLang("/profile/basic"),
        name: (
          <Link to={pathWithLang("/profile/basic")}>{t("profile-basic")}</Link>
        ),
      },
      {
        key: "/profile/advanced",
        path: pathWithLang("/profile/advanced"),
        name: (
          <Link to={pathWithLang("/profile/advanced")}>
            {t("profile-advanced")}
          </Link>
        ),
      },
    ],
  };
};
