import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { CalendarOutlined } = _icons;

export const createCalendarRoutes = (t: any, lang: string): Route => {
  return {
    key: "calendar",
    icon: "CalendarOutlined",
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
  };
};
