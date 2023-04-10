// types
import type { V2_MetaFunction } from "@remix-run/node";

// core
import React from "react";

// components:vendor
import { Button, Result } from "antd";

// hooks
import { useTranslation } from "react-i18next";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "500",
    },
  ];
};

const Expection500: React.FC = () => {
  const { t } = useTranslation()

  return <Result
    status="500"
    title="500"
    subTitle={t("server-error")}
    extra={<Button type="primary">{t("back-home")}</Button>}
  />
}

export default Expection500;
