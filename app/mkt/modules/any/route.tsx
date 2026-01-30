import { Button, Result } from "antd";

import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export function Route() {
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
}
