/* eslint-disable jsx-a11y/anchor-is-valid */
//types
import type { V2_MetaFunction } from "@remix-run/node";

// hooks
import { useLoaderData } from "@remix-run/react";

// components:vendor
import { Divider } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// components
import {
  PageContainerContent,
  RefundRequest,
  ReturnItemsList,
  ReturnProgress,
  UserInfo,
} from "~/components/profileBasic";

// data
import { tableListDataSource } from "~/data/profileAdvanced";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "基础详情页",
    },
  ];
};

export const loader = () => {
  return tableListDataSource;
};

export default function ProfileBasicPage() {
  const data = useLoaderData();
  return (
    <PageContainer title={false} content={<PageContainerContent />}>
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
