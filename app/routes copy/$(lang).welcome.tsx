// cores
import React from "react";
import styled from "styled-components";

// components
import { Card } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// i18n
import { useTranslation } from "react-i18next";

// components
const WrapCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  font-size: 40px;
`;

const WelcomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <WrapCard>
        <div>{t("welcome")}</div>
      </WrapCard>
    </PageContainer>
  );
};

export default WelcomePage;
