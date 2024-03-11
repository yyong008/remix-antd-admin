// types
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// components
import { Row, Col } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { PersonalCard, AAPCard } from "~/components/accountCenter";

// cols
import { colProps, colPropsSS } from "~/components/accountCenter/col";
import { getAccountData$ } from "~/services/account/center";
import { lastValueFrom } from "rxjs";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    {
      title: "account-center",
    },
  ];
};

// remix:loader
export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const data = await lastValueFrom(getAccountData$());
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
  } = useLoaderData<typeof loader>();

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
