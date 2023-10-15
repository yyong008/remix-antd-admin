import type {
  LoaderFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// cores
import React from "react";
import { json } from "@remix-run/node";

// component:vendors
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    {
      title: "成功",
    },
  ];
};

export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { tableListDataSource } = await import("~/data/listTableList");
  return json(tableListDataSource);
};

const SuccessPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Result
      status="success"
      title={t("submission-success")}
      subTitle={t("check-modify-information-success")}
      extra={[
        <Button type="primary" key="console">
          {t("go-console")}
        </Button>,
        <Button key="buy">{t("buy-again")}</Button>,
      ]}
    />
  );
};

export default SuccessPage;
