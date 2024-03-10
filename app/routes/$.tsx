// types
import type { MetaFunction } from "@remix-run/node";

// remix
import { useNavigate } from "@remix-run/react";

// components
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "404" }, { name: "404", content: "Not Found" }];
};

export default function NoFoundPage() {
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
