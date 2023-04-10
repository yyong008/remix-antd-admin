// core
import { Link } from "@remix-run/react";

// components
import { TableOutlined } from "@ant-design/icons";

export const listRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "List",
    icon: <TableOutlined />,
    name: t("list"),
    children: [
      {
        key: "/list/search",
        name: t("list-search"),
        children: [
          {
            key: "/list/search/articles",
            path: pathWithLang("/list/search/articles"),
            name: (
              <Link to={pathWithLang("/list/search/articles")}>
                {t("list-search-articles")}
              </Link>
            ),
          },
          {
            key: "/list/search/projects",
            path: pathWithLang("/list/search/projects"),
            name: (
              <Link to={pathWithLang("/list/search/projects")}>
                {t("list-search-projects")}
              </Link>
            ),
          },
          {
            key: "/list/search/applications",
            path: pathWithLang("/list/search/applications"),
            name: (
              <Link to={pathWithLang("/list/search/applications")}>
                {" "}
                {t("list-search-applications")}
              </Link>
            ),
          },
        ],
      },
      {
        key: "/list/table-list",
        path: pathWithLang("/list/table-list"),
        name: (
          <Link to={pathWithLang("/list/table-list")}>{t("table-list")}</Link>
        ),
      },
      {
        key: "/lists/basic-list",
        path: pathWithLang("/list/basic-list"),
        name: (
          <Link to={pathWithLang("/list/basic-list")}>{t("basic-list")}</Link>
        ),
      },
      {
        key: "/list/card-list",
        path: pathWithLang("/list/card-list"),
        name: (
          <Link to={pathWithLang("/list/card-list")}>{t("card-list")}</Link>
        ),
      },
    ],
  };
};
