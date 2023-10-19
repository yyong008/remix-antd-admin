import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { BorderHorizontalOutlined } = _icons;

export const createSplitPaneRoutes = (t: any, lang: string): Route => {
  return {
    key: "split-pane",
    path: `${lang}/split-pane`,
    icon: "BorderHorizontalOutlined",
    name: t("split-pane"),
  };
};
