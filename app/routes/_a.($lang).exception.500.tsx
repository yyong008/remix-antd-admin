// types
import type { V2_MetaFunction } from "@remix-run/node";

// core
import React from "react";

// components:vendor
import { Button, Result } from "antd";

// hooks
import { useTranslation } from "react-i18next";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "500",
    },
  ];
};

const Expection500: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <ProCard
        style={{
          height: "120vh",
          minHeight: 600,
        }}
      >
        <Result
          status="500"
          title="500"
          subTitle={t("server-error")}
          extra={<Button type="primary">{t("back-home")}</Button>}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Expection500;
