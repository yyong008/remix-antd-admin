import type { MetaFunction } from "react-router";

import { Space } from "antd";
import { useAboutData } from "~/hooks";
import { m } from "~/paraglide/messages";
import { AdminAbout } from "~/components/about";
import { PageContainer } from "~/components/page-container";

export const handle = () => ({
  breadcrumb: [{ label: m.breadcrumb_about() }],
});

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
