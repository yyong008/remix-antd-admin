// types
import { LoaderFunctionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";

// components:vendor
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// hooks
import { useTranslation } from "react-i18next";


// utils


export const meta: MetaFunction = () => {
  return [
    {
      title: "500",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderFunctionArgs) => {
  
  return json({});
};

const Expection500Route: React.FC = () => {
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
          status="500"
          title="500"
          subTitle={t("server-error")}
          extra={<Button type="primary">{t("back-home")}</Button>}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Expection500Route;
