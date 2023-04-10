// types
import type { V2_MetaFunction } from "@remix-run/node";

// core
import React from "react";

// components
import { Button, Result } from "antd";

// hooks
import { useTranslation } from "react-i18next";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "403",
    },
  ];
};

const Exception403: React.FC = () => {
  const { t } = useTranslation()

  return <Result
    status="403"
    title="403"
    subTitle={t("not-authorized")}
    extra={<Button type="primary">{t("back-home")}</Button>}
  />
}

export default Exception403;
