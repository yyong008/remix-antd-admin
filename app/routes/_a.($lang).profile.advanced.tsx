// types
import type { LoaderFunctionArgs, LoaderFunction, MetaFunction } from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// components: vendors
import { Space } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import {
  CardStep,
  CardUserInfo,
  CardLastPhoneList,
  ThreeCardLoggerTable,
} from "~/components/profileAdvanced";

// hooks
import { useLoaderData } from "@remix-run/react";

// data
import { loggers as data } from "~/data/profileAdvanced";

// utils


// route:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "基础详情页",
    },
  ];
};

export const loader: LoaderFunction = ({ request, params }: LoaderFunctionArgs) => {
  
  return json(data);
};

export default function ProfileAdvancedPage() {
  const data = useLoaderData();

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
