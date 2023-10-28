// cores
import React from "react";

// components
import { Card } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// i18n
import { useTranslation } from "react-i18next";

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Card>
        <div>{t("welcome")}</div>
      </Card>
    </PageContainer>
  );
};

export default WelcomePage;
