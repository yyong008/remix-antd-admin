import { Card } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";

export function Route() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Card>
        <div>{t("welcome")}</div>
      </Card>
    </PageContainer>
  );
}
