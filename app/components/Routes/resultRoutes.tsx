// core
import { Link } from "@remix-run/react";

// components
import { CheckCircleOutlined } from "@ant-design/icons";

export const resultRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "result",
    icon: <CheckCircleOutlined />,
    name: t("result"),
    children: [
      {
        key: "/result/success",
        path: pathWithLang("/result/success"),
        name: (
          <Link to={pathWithLang("/result/success")}>
            {t("result-success")}
          </Link>
        ),
      },
      {
        key: "/result/fail",
        path: pathWithLang("/result/fail"),
        name: (
          <Link to={pathWithLang("/result/fail")} title="失败">
            {t("result-fail")}
          </Link>
        ),
      },
    ],
  };
};
