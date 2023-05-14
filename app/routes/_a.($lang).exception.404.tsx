// types
import { LoaderArgs, LoaderFunction, V2_MetaFunction } from "@remix-run/node";

// core
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
      title: "404",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderArgs) => {
  
  return json({});
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
