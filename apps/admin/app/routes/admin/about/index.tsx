import type { MetaFunction } from "react-router";

import { Space } from "antd";
import { useAboutData } from "~/hooks";
import { AdminAbout } from "~/components/about";
import { PageContainer } from "~/components/page-container";

export const meta: MetaFunction = () => {
  return [{ title: "About" }];
};

export default function Page() {
  const data = useAboutData();

  return (
    <PageContainer style={{ width: "60%", margin: "0 auto" }}>
      <Space orientation="vertical" size="middle" style={{ width: "100%" }}>
        <AdminAbout {...data} />
      </Space>
    </PageContainer>
  );
}
