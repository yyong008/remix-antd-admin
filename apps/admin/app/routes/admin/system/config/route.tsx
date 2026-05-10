import { Card } from "antd";
import { PageContainer } from "~/components/page-container";

import { ConfigProTable } from "./components/config-pro-table/config-pro-table";

export function Route() {
  return (
    <PageContainer>
      <Card>
        <ConfigProTable />
      </Card>
    </PageContainer>
  );
}
