//types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// remix
import { json } from "@remix-run/node";
import { Link, useLoaderData, useLocation } from "@remix-run/react";

// components:libs
import { Alert, Card, List, Space } from "antd";
import { PageContainer, ProCard } from "@ant-design/pro-components";

// components
import ReactEcharts from "~/components/health/healthDisable/DiseaseBarChart";

// libs
import { lastValueFrom } from "rxjs";

// services
import { getHealthData$ } from "~/__mock__/disease/health.service";

// config
import { antdGrid } from "~/config/antd-grid";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "disease-health" }];
};

// remix:loader
export const loader: LoaderFunction = async () => {
  const { data } = await lastValueFrom(getHealthData$());
  return json(data);
};

export default function HealthRoute() {
  const data = useLoaderData<typeof loader>();
  const { pathname } = useLocation();

  return (
    <PageContainer>
      <ProCard>
        <Space direction="vertical">
          <Alert
            description="作为程序员，长时间进行电脑工作和专注于屏幕可能导致一些与工作环境相关的疾病和健康问题。以下是一些程序员容易遇到的常见疾病和健康问题："
            type="warning"
            showIcon
          />
          <ReactEcharts />
          <List
            grid={antdGrid}
            dataSource={data as any[]}
            renderItem={(item) => (
              <Link to={pathname.split("/")[0] + "/" + item.path?.slice(1)}>
                <List.Item>
                  <Card title={item.title}>{item.content}</Card>
                </List.Item>
              </Link>
            )}
          />
          <Alert
            description="为了预防这些问题，程序员可以采取以下措施：定期休息和眼部放松、保持良好的姿势和脊柱支撑、进行适度的体育锻炼、保持适当的饮食、减少工作压力、定期眼部检查，并遵循良好的睡眠习惯。此外，经常进行眼部锻炼、保持屏幕适当的亮度和对比度、使用蓝光滤光镜以及使用人体工学键盘等"
            type="info"
            showIcon
          />
        </Space>
      </ProCard>
    </PageContainer>
  );
}
