import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { FileExcelOutlined } = _icons;

export const createExcelRoutes = (t: any, lang: string): Route => {
  return {
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
  };
};
