import { LoaderArgs, LoaderFunction, V2_MetaFunction } from "@remix-run/node";

// cores
import React from "react";
import { json } from "@remix-run/node";

// component:vendors
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { tableListDataSource } from "~/data/listTableList";


export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "成功",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderArgs) => {
  
  return json(tableListDataSource);
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
