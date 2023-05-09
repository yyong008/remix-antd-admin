import {
  CheckCircleOutlined,
  DashboardOutlined,
  FormOutlined,
  HighlightOutlined,
  KeyOutlined,
  ProfileOutlined,
  TableOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";

export function createRoute(lang: string, t: any, _routes?: any[]) {
  return {
    route: {
      path: `/`,
      routes: [
        {
          key: "dashboard",
          path: `${lang}/dashboard`,
          icon: <DashboardOutlined />,
          name: t("dashboard"),
          children: [
            {
              key: "analysis",
              path: "analysis",
              name: t("analysis"),
            },
            {
              key: "monitor",
              path: "monitor",
              name: t("monitor"),
            },
            {
              key: "workplace",
              path: "workplace",
              name: t("workplace"),
            },
          ],
        },
        {
          key: "auth",
          path: `/${lang}/auth`,
          icon: <KeyOutlined />,
          name: t("auth"),
        },
        {
          key: "form",
          path: `${lang}/form`,
          icon: <FormOutlined />,
          name: t("form"),
          children: [
            {
              key: "Basic Form",
              path: "basic-form",
              name: t("basic-form"),
            },
            {
              key: "Step Form",
              path: "step-form",
              name: t("step-form"),
            },
            {
              key: "Advanced Form",
              path: "advanced-form",
              name: t("advanced-form"),
            },
          ],
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
          key: "expection",
          icon: <WarningOutlined />,
          name: t("exception"),
          path: `${lang}/exception`,
          children: [
            {
              key: "/403",
              path: "403",
              name: t("exception-403"),
            },
            {
              key: "404",
              path: "404",
              name: t("exception-404"),
            },
            {
              key: "500",
              path: "500",
              name: t("exception-500"),
            },
          ],
        },
        {
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
        },
        {
          key: "editor",
          icon: <HighlightOutlined />,
          name: t("editor"),
          path: `${lang}/editor`,
          children: [
            {
              key: "rich",
              path: "rich",
              name: t("editor-rich"),
            },
            {
              key: "markdown",
              path: "markdown",
              name: t("editor-markdown"),
            },
            {
              key: "flow",
              path: "flow",
              name: t("editor-flow"),
            },
            {
              key: "mind",
              path: "mind",
              name: t("editor-mind"),
            },
          ],
        },
      ],
    },
  };
}
