import type {
  LoaderFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";

// component
import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "result-success" }];
};

// remix:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { tableListDataSource } = await import("~/data/listTableList");
  return json(tableListDataSource);
};

export default function SuccessPage() {
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
