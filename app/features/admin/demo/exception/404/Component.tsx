import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { useTranslation } from "react-i18next";

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
