import { Button, Result } from "antd";

import { useTranslation } from "react-i18next";

export function Route() {
  const { t } = useTranslation();
  return (
    <Result
      status="success"
      title={t("submission-success")}
      subTitle={t("check-modify-information-success")}
      extra={[
        <Button type="primary" key="console">
          {t("go-console")}
        </Button>,
        <Button key="buy">{t("buy-again")}</Button>,
      ]}
    />
  );
}
