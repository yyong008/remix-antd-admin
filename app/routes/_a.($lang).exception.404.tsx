// types
import type {
  LoaderFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// components
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// hooks
import { useTranslation } from "react-i18next";

export const meta: MetaFunction = () => {
  return [
    {
      title: "404",
    },
  ];
};

const Expection404: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <ProCard
        style={{
          height: "100vh",
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
};

export default Expection404;
