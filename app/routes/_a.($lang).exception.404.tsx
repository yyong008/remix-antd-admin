// types
import type { V2_MetaFunction } from "@remix-run/node";

// core
import React from "react";

// components
import { Button, Result } from "antd";

// hooks
import { useTranslation } from "react-i18next";
import { PageContainer, ProCard } from "@ant-design/pro-components";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "404",
    },
  ];
};

const Expection404: React.FC = () => {
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
          status="404"
          title="404"
          subTitle={t("visit-not-exist")}
          extra={<Button type="primary">{t("back-home")}</Button>}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Expection404;
