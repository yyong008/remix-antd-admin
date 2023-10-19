import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { HeartOutlined } = _icons;

export const createDiseaseRoutes = (t: any, lang: string): Route => {
  return {
    key: "disease",
    path: `${lang}/disease`,
    icon: "HeartOutlined",
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
  };
};
