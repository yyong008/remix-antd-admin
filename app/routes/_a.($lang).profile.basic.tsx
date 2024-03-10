/* eslint-disable jsx-a11y/anchor-is-valid */
//types
import type {
  LoaderFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components:vendor
import { Divider } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// components
import {
  UserInfo,
  RefundRequest,
  ReturnProgress,
  ReturnItemsList,
  PageContainerContent,
} from "~/components/profileBasic";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "profile-basic" }];
};

// remix:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const { tableListDataSource } = await import("~/data/profileAdvanced");
  return json(tableListDataSource);
};

export default function ProfileBasicPage() {
  const data = useLoaderData<typeof loader>();
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
