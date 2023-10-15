import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { QrcodeOutlined } = _icons;

export const createQrcodeRoutes = (t: any, lang: string): Route => {
  return {
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
  };
};
