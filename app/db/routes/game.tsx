import type { Route } from "@ant-design/pro-layout/es/typing";

// import * as _icons from "@ant-design/icons";

// const { CoffeeOutlined } = _icons;

export const createGameRoutes = (t: any, lang: string): Route => {
  return {
    key: "game",
    icon: "CoffeeOutlined",
    name: t("game"),
    path: `${lang}/game`,
    children: [
      {
        key: "pocker-guess",
        path: "pocker-guess",
        name: t("pocker-guess"),
      },
    ],
  };
};
