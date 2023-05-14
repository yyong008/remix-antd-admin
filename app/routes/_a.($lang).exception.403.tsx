// types
import { LoaderArgs, LoaderFunction, V2_MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";

// components
import { Button, Result } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// hooks
import { useTranslation } from "react-i18next";

// utils


export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "403",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderArgs) => {
  
  return json({});
};

const Exception403Route: React.FC = () => {
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
          status="403"
          title="403"
          subTitle={t("not-authorized")}
          extra={<Button type="primary">{t("back-home")}</Button>}
        />
      </ProCard>
    </PageContainer>
  );
};

export default Exception403Route;
