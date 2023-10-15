import type { Route } from "@ant-design/pro-layout/es/typing";

import * as _icons from "@ant-design/icons";

const { MacCommandOutlined } = _icons;

export const createStackRoutes = (t: any, lang: string): Route => {
  return {
    key: "stack",
    icon: <MacCommandOutlined />,
    name: "stack",
    path: `${lang}/stack`,
    children: [
      {
        key: "stack-rxjs",
        path: "rxjs/keybr",
        name: "RxJS",
      },
    ],
  };
};
