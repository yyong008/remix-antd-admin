// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// cores
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Row, Col } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// components
import { PersonalCard, AAPCard } from "~/components/accountCenter";

// cols
import { colProps, colPropsSS } from "~/components/accountCenter/col";

export const meta: MetaFunction = () => {
  return [
    {
      title: "账户中心",
    },
  ];
};

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = (await import("~/data/accountCenter")).default;
  return json(data);
};

export default function AccountCenterPage() {
  const {
    dataSource,
    tags,
    team,
    userInfo,
    personalDataSource,
    projectsDataSource,
  } = useLoaderData();

  return (
    <PageContainer
      title={null}
      style={{
        background: "transparent",
      }}
    >
      <Row gutter={[10, 10]}>
        <Col {...colProps}>
          <PersonalCard userInfo={userInfo} tags={tags} team={team} />
        </Col>
        <Col {...colPropsSS}>
          <AAPCard
            dataSource={dataSource}
            personalDataSource={personalDataSource}
            projectsDataSource={projectsDataSource}
          />
        </Col>
      </Row>
    </PageContainer>
  );
}
