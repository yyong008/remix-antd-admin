/* eslint-disable jsx-a11y/anchor-is-valid */
import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  RefundRequest,
  ReturnItemsList,
  ReturnProgress,
  UserInfo,
} from "~/modules-admin/demo/profile/basic/profileBasic";

import { Divider } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "react-router";

export function Route() {
  const data = useLoaderData<typeof loader>();
  return (
    <PageContainer>
      <ProCard>
        <RefundRequest />
        <Divider />
        <UserInfo />
        <Divider />
        <ReturnItemsList dataSource={data} />
        <Divider />
        <ReturnProgress dataSource={data} />
      </ProCard>
    </PageContainer>
  );
}
