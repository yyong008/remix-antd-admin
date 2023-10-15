import type { MenuDataItem } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { MessageOutlined } = _icons;

export const createChatRoutes = (lang: string, t: any): MenuDataItem => {
  return {
    key: "chat",
    path: `/${lang}/chat`,
    icon: <MessageOutlined />,
    name: t("chat"),
  };
};
