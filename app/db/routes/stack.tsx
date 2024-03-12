import type { Route } from "@ant-design/pro-layout/es/typing";

export const createStackRoutes = (t: any, lang: string): Route => {
  return {
    key: "stack",
    icon: "MacCommandOutlined",
    name: "stack",
    path: `${lang}/stack`,
    children: [
      {
        key: "stack-rxjs",
        path: "rxjs/keybr",
        name: "RxJS Keyboard",
      },
      {
        key: "stack-rxjs-count-down",
        path: "rxjs/count-down",
        name: "RxJS CountDown",
      },
      {
        key: "laxjs-cursor",
        path: "laxjs/cursor",
        name: "Laxjs Cursor",
      },
    ],
  };
};
