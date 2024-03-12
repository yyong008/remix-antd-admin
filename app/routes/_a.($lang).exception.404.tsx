// types
import type { MetaFunction } from "@remix-run/node";

// components
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// libs
import { useTranslation } from "react-i18next";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "exception-404" }];
};

export default function Expection404() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <ProCard
        style={{
          height: "70vh",
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
}
