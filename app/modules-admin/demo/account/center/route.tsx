import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Tabs } from "antd";
import { items } from "./components";
import { useGetAccountCenterQuery } from "~/apis-client/admin/demo";

export function Route() {
  const { data: _data, isLoading } = useGetAccountCenterQuery("");
  const { data, provinces, cities } = _data || {};
  return (
    <PageContainer
      title={null}
      style={{
        background: "transparent",
      }}
    >
      <ProCard loading={isLoading}>
        <Tabs
          tabPosition={"left"}
          items={items(provinces, data.accountSettingData, cities)}
        />
      </ProCard>
    </PageContainer>
  );
}
