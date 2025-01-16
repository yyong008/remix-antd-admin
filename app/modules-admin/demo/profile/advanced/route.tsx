import {
  CardLastPhoneList,
  CardStep,
  CardUserInfo,
  ThreeCardLoggerTable,
} from "./profileAdvanced";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Space } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
  const data = useLoaderData<typeof loader>();

  return (
    <PageContainer>
      <ProCard>
        <Space direction="vertical" style={{ width: "100%" }}>
          <CardStep />
          <CardUserInfo />
          <CardLastPhoneList />
          <ThreeCardLoggerTable data={data} />
        </Space>
      </ProCard>
    </PageContainer>
  );
}
