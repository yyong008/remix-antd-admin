import type { Route } from "@ant-design/pro-layout/es/typing";

export const createLibRoutes = (t: any, lang: string): Route => {
  return {
    key: "lib",
    icon: "BuildOutlined",
    name: t("lib"),
    path: `${lang}/lib/`,
    children: [
      {
        key: "qrcode",
        icon: "QrcodeOutlined",
        name: t("qrcode"),
        path: `qrcode`,
      },
      {
        key: "clipboard",
        path: `clipboard`,
        icon: "CopyOutlined",
        name: t("clipboard"),
      },
      {
        key: "split-pane",
        path: `split-pane`,
        icon: "BorderHorizontalOutlined",
        name: t("split-pane"),
      },
      {
        key: "antd-icons",
        path: `icons`,
        icon: "BorderHorizontalOutlined",
        name: t("antd-icons"),
      },
    ],
  };
};
