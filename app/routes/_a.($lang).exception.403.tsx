// types
import type { MetaFunction } from "@remix-run/node";

// components
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// hooks
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [{ title: "exception-403" }];
};

export default function Exception403Route() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <ProCard
        style={{
          height: "100vh",
          minHeight: 600,
        }}
      >
        <Result
          status="403"
          title="403"
          subTitle={t("not-authorized")}
          extra={<Button type="primary">{t("back-home")}</Button>}
        />
      </ProCard>
    </PageContainer>
  );
}
