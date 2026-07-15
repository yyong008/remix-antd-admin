import { Card } from "antd";
import type { MetaFunction } from "react-router";
import { PageContainer } from "~/components/page-container";
import { useParams } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: "欢迎~" }];
};

export default function Page() {
  const { locale } = useParams();
  const label = locale === "zh" ? "欢迎" : "Welcome";

  return (
    <PageContainer>
      <Card>
        <div>{label}</div>
      </Card>
    </PageContainer>
  );
}
