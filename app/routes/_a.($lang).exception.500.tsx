// types
import type { MetaFunction } from "@remix-run/node";

// components:vendor
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// hooks
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    {
      title: "500",
    },
  ];
};

const Expection500Route: React.FC = () => {
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
};

export default Expection500Route;
