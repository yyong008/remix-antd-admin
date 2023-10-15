import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { FormOutlined } = _icons;

export const createFormRoutes = (t: any, lang: string): Route => {
  return {
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
  };
};
