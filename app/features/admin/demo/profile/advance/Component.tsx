import {
  CardLastPhoneList,
  CardStep,
  CardUserInfo,
  ThreeCardLoggerTable,
} from "~/components/profile/profileAdvanced";
import { PageContainer, ProCard } from "@ant-design/pro-components";

import { Space } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
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
