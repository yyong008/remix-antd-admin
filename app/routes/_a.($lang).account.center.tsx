// types
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

// cores
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

// components
import { Row, Col } from "antd";

// data
import data from "~/data/accountCenter";

// components
import { PersonalCard, AAPCard } from "~/components/accountCenter";

// cols
import { colProps, colPropsSS } from "~/components/accountCenter/col";

// utils
import { PageContainer } from "@ant-design/pro-components";

export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "账户中心",
    },
  ];
};

export const loader = ({ request, params }: LoaderArgs) => {
  return data;
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
