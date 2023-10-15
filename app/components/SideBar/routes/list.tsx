import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { TableOutlined } = _icons;

export const createListRoutes = (t: any, lang: string): Route => {
  return {
    key: "List",
    path: `${lang}/list`,
    icon: <TableOutlined />,
    name: t("list"),
    children: [
      {
        key: "search",
        path: "search",
        name: t("list-search"),
        children: [
          {
            key: "articles",
            path: "articles",
            name: t("list-search-articles"),
          },
          {
            key: "rojects",
            path: "projects",
            name: t("list-search-projects"),
          },
          {
            key: "applications",
            path: "applications",
            name: t("list-search-applications"),
          },
        ],
      },
      {
        key: "table-list",
        path: "table-list",
        name: t("table-list"),
      },
      {
        key: "basic-list",
        path: "basic-list",
        name: t("basic-list"),
      },
      {
        key: "card-list",
        path: "card-list",
        name: t("card-list"),
      },
    ],
  };
};
