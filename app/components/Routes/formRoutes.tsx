// core
import { Link } from "@remix-run/react";

// components
import { FormOutlined } from "@ant-design/icons";

export const formRoutes = (lang: string, t: any) => {
  const pathWithLang = function (path: string) {
    return `${lang}${path}`;
  };
  return {
    key: "form",
    icon: <FormOutlined />,
    name: t("form"),
    children: [
      {
        key: "Basic Form",
        path: pathWithLang("/form/basic-form"),
        name: (
          <Link to={pathWithLang("/form/basic-form")}>{t("basic-form")}</Link>
        ),
      },
      {
        key: "Step Form",
        path: pathWithLang("/form/step-form"),
        name: (
          <Link to={pathWithLang("/form/step-form")}>{t("step-form")}</Link>
        ),
      },
      {
        key: "Advanced Form",
        path: pathWithLang("/form/advanced-form"),
        name: (
          <Link to={pathWithLang("/form/advanced-form")}>
            {t("advanced-form")}
          </Link>
        ),
      },
    ],
  };
};
