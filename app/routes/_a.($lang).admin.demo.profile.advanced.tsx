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
import { PageContainer, ProCard } from "@ant-design/pro-components";
import {
  CardStep,
  CardUserInfo,
  CardLastPhoneList,
  ThreeCardLoggerTable,
} from "~/components/profile/profileAdvanced";

// lib
import { lastValueFrom } from "rxjs";

// server
import { getLoggers$ } from "~/__mock__/profile/profile.server";

// route:meta
export const meta: MetaFunction = () => {
  return [{ title: "profile-advanced" }];
};

// route:loader
export const loader: LoaderFunction = async ({
  request,
  params,
}: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getLoggers$());
  return json(data);
};

export default function ProfileAdvancedPage() {
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
