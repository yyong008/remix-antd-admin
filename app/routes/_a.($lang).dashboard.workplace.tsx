// type
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

// core
import { json } from "@remix-run/node";

// hooks
import { useLoaderData } from "@remix-run/react";

// components: vendor
import { Row } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import {
  ContainerContent,
  WorkplaceColOne,
  WorkplaceColTwo,
} from "~/components/dashboardWorkplace";

// css
import css from "~/styles/dashboard.workplace.css";
import { lastValueFrom } from "rxjs";
import { getWorkplaceData } from "~/db/workplace";

export const meta: MetaFunction = () => {
  return [{ title: "工作空间" }];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: css,
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getWorkplaceData());
  return json(data);
};

export default function DashboardWorkplacePage() {
  const data = useLoaderData();
  return (
    <PageContainer title={false} content={<ContainerContent data={data} />}>
      <Row gutter={[8, 8]}>
        <WorkplaceColOne data={data} />
        <WorkplaceColTwo data={data} />
      </Row>
    </PageContainer>
  );
}
