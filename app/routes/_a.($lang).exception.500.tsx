// types
import type { MetaFunction } from "@remix-run/node";

// components
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// libs
import { useTranslation } from "react-i18next";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "exception-500" }];
};

export default function Expection500Route() {
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
          status="500"
          title="500"
          subTitle={t("server-error")}
          extra={<Button type="primary">{t("back-home")}</Button>}
        />
      </ProCard>
    </PageContainer>
  );
}
