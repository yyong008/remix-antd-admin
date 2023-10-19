import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { HighlightOutlined } = _icons;

export const createEditorRoutes = (t: any, lang: string): Route => {
  return {
    key: "editor",
    icon: "HighlightOutlined",
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
  };
};
