import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Tabs } from "antd";
import { items } from "./components";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Route() {
  const { data, provinces, cities }: any = useLoaderData<typeof loader>();
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
