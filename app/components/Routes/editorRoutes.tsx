// core
import { Link } from "@remix-run/react";

// components
import { HighlightOutlined } from "@ant-design/icons";

export const editorRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "editor",
    icon: <HighlightOutlined />,
    name: t("editor"),
    children: [
      {
        key: "/editor/flow",
        path: pathWithLang("/editor/flow"),
        name: <Link to={pathWithLang("/editor/flow")}>{t("editor-flow")}</Link>,
      },
      {
        key: "/editor/mind",
        path: pathWithLang("/editor/mind"),
        name: <Link to={pathWithLang("/editor/mind")}>{t("editor-mind")}</Link>,
      },
    ],
  };
};
