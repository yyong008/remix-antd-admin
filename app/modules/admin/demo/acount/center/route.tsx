import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Tabs } from "antd";
import { items } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const _data: any = useLoaderData<typeof loader>();
  const { data, provinces, cities } = _data.data;

  return (
    <PageContainer
      title={null}
      style={{
        background: "transparent",
      }}
    >
      <ProCard>
        <Tabs tabPosition={"left"} items={items(provinces, data, cities)} />
      </ProCard>
    </PageContainer>
  );
}
