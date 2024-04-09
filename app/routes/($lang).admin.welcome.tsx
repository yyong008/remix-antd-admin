// types
import type { MetaFunction } from "@remix-run/node";

// components
import { Card } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// i18n
import { useTranslation } from "react-i18next";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "欢迎~",
    },
  ];
};

export default function WelcomePage() {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Card>
        <div>{t("welcome")}</div>
      </Card>
    </PageContainer>
  );
}
