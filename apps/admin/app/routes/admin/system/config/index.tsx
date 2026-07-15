import { Card } from "antd";
import { PageContainer } from "~/components/page-container";
import { ConfigProTable } from "./components/config-pro-table";
import { useAntdThemeToken } from "~/hooks/useAntdThemeToken";
import { m } from "~/paraglide/messages";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [{ title: m.system_config_title() }];
};

function HeaderTitle({ title }: { title: string }) {
  const token = useAntdThemeToken();
  return <div style={{ color: token.colorPrimary }}>{title}</div>;
}

export default function Route() {
  return (
    <PageContainer>
      <Card>
        <ConfigProTable headerTitle={<HeaderTitle title={m.system_config_header_title()} />} />
      </Card>
    </PageContainer>
  );
}
