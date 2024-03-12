// type
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Row } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import {
  ContainerContent,
  WorkplaceColOne,
  WorkplaceColTwo,
} from "~/components/dashboardWorkplace";

// styles
import "~/styles/dashboard/workplace.css";

// libs
import { lastValueFrom } from "rxjs";

// db
import { getWorkplaceData$ } from "~/services/dashboard/workplace";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "dashboard-workplace" }];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getWorkplaceData$());
  return json(data);
};

export default function DashboardWorkplacePage() {
  const data = useLoaderData<typeof loader>();
  return (
    <PageContainer breadcrumb={{}} content={<ContainerContent data={data} />}>
      <Row gutter={[8, 8]}>
        <WorkplaceColOne data={data} />
        <WorkplaceColTwo data={data} />
      </Row>
    </PageContainer>
  );
}
