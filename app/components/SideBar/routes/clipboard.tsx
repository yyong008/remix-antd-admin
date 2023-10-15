import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { CopyOutlined } = _icons;

export const createCopyBoardRoutes = (t: any, lang: string): Route => {
  return {
    key: "clipboard",
    path: `${lang}/clipboard`,
    icon: <CopyOutlined />,
    name: t("clipboard"),
  };
};
