/* eslint-disable jsx-a11y/anchor-is-valid */
import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  RefundRequest,
  ReturnItemsList,
  ReturnProgress,
  UserInfo,
} from "~/components/profile/profileBasic";

import { Divider } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
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
