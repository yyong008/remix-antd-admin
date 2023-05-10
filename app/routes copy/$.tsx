// core
import React from "react";

// hooks
import { useNavigate } from "@remix-run/react";

// components:vendor
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

const NoFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Result
      status="404"
      title="404"
      subTitle={t("not-found")}
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          {t("not-found")}
        </Button>
      }
    />
  );
};

export default NoFoundPage;
