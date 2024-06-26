// styles
import "~/styles/dashboard/workplace.css";

import {
  ContainerContent,
  WorkplaceColOne,
  WorkplaceColTwo,
} from "~/components/dashboard/dashboardWorkplace";

import { PageContainer } from "@ant-design/pro-components";
import { Row } from "antd";
import type { loader } from "./loader";
import { useLoaderData } from "@remix-run/react";

export function Component() {
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
