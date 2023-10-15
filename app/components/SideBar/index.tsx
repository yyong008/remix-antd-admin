import type { RouterTypes } from "@ant-design/pro-layout/lib/typings";

import * as _icons from "@ant-design/icons";

const {
  BorderHorizontalOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CoffeeOutlined,
  CopyOutlined,
  DashboardOutlined,
  FileExcelOutlined,
  FormOutlined,
  HeartOutlined,
  HighlightOutlined,
  KeyOutlined,
  // MessageOutlined,
  ProfileOutlined,
  QrcodeOutlined,
  TableOutlined,
  UserOutlined,
  WarningOutlined,
} = _icons;

export function createRoute(
  lang: string,
  t: any,
  _routes?: any[],
): { route: RouterTypes } {
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
          key: "disease",
          path: `${lang}/disease`,
          icon: <HeartOutlined />,
          name: t("health"),
          children: [
            {
              key: "health",
              index: true,
              path: `/${lang}/health`,
              name: t("disease"),
            },
            {
              key: "cervical-vertebra",
              path: "cervical-vertebra",
              name: t("cervical-vertebra"),
            },
            {
              key: "vision",
              path: "vision",
              name: t("vision"),
            },
            {
              key: "hand",
              path: "hand",
              name: t("hand"),
            },
            {
              key: "obesity",
              path: "obesity",
              name: t("obesity"),
            },
            {
              key: "anxiety-depression",
              path: "anxiety-depression",
              name: t("anxiety-depression"),
            },
            {
              key: "sleep",
              path: "sleep",
              name: t("sleep"),
            },
            {
              key: "sport",
              path: "sport",
              name: t("sport"),
            },
          ],
        },
        // {
        //   key: "chat",
        //   path: `/${lang}/chat`,
        //   icon: <MessageOutlined />,
        //   name: t("chat"),
        // },
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
          key: "clipboard",
          path: `${lang}/clipboard`,
          icon: <CopyOutlined />,
          name: t("clipboard"),
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
              key: "json-viewer",
              path: "json-viewer",
              name: t("editor-json-viewer"),
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
        {
          key: "excel",
          path: `${lang}/excel`,
          icon: <FileExcelOutlined />,
          name: t("excel"),
          children: [
            {
              key: "export",
              path: "export",
              name: t("excel-export"),
            },
            {
              key: "import",
              path: "import",
              name: t("excel-import"),
            },
          ],
        },
        {
          key: "split-pane",
          path: `${lang}/split-pane`,
          icon: <BorderHorizontalOutlined />,
          name: t("split-pane"),
        },
        {
          key: "game",
          icon: <CoffeeOutlined />,
          name: t("game"),
          path: `${lang}/game`,
          children: [
            {
              key: "pocker-guess",
              path: "pocker-guess",
              name: t("pocker-guess"),
            },
          ],
        },
        {
          key: "qrcode",
          icon: <QrcodeOutlined />,
          name: t("qrcode"),
          path: `${lang}/qrcode`,
          // children: [
          //   {
          //     key: "qrcode",
          //     path: "qrcode",
          //     name: t("qrcode"),
          //   }
          // ],
        },
        {
          key: "calendar",
          icon: <CalendarOutlined />,
          name: t("calendar"),
          path: `${lang}/calendar`,
          children: [
            {
              key: "temporal",
              path: "temporal",
              name: t("calendar-temporal"),
            },
            {
              key: "antd",
              path: "antd",
              name: t("calendar-antd"),
            },
          ],
        },
      ],
    },
  };
}
