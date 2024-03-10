// types
import type {
  LoaderFunctionArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  CardStep,
  CardUserInfo,
  CardLastPhoneList,
  ThreeCardLoggerTable,
} from "~/components/profileAdvanced";

// route:meta
export const meta: MetaFunction = () => {
  return [{ title: "profile-advanced" }];
};

// route:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = (await import("~/data/profileAdvanced")).loggers;
  return json(data);
};

export default function ProfileAdvancedPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <PageContainer title={false}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <CardStep />
        <CardUserInfo />
        <CardLastPhoneList />
        <ThreeCardLoggerTable data={data} />
      </Space>
    </PageContainer>
  );
}
