import type { V2_MetaFunction } from "@remix-run/node";

// cores
import React from "react";

// component:vendors
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "成功",
    },
  ];
};

const SuccessPage: React.FC = () => {
  const { t } = useTranslation()
  return <Result
    status="success"
    title={t("submission-success")}
    subTitle={t('check-modify-information-success')}
    extra={[
      <Button type="primary" key="console">
        {t('go-console')}
      </Button>,
      <Button key="buy">{t('buy-again')}</Button>,
    ]}
  />
}

export default SuccessPage;
