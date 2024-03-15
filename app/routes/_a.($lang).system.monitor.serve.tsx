// types
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

// components
import { Card, Col, Descriptions, Row, Tag } from "antd";
import { PageContainer } from "@ant-design/pro-components";

// remix
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

// utils
import { getSystemInfo } from "~/utils/systeminfo.service";

// remix:meta
export const meta: MetaFunction = () => {
  return [
    { title: "System-Monitor-server" },
    { name: "System-Monitor-server", content: "System-Monitor-server" },
  ];
};

const getGB = (val: number = 0) => {
  return (val / 1024 / 1024 / 1024).toFixed(1);
};

const getPercent = (val: number = 0) => {
  return (val * 100).toFixed(2) + "%";
};

// remix:loader
export const loader: LoaderFunction = async () => {
  return json({
    dataSource: await getSystemInfo(),
  });
};

export default function SystemNoticeRoute() {
  const { dataSource } = useLoaderData<typeof loader>();
  const {
    nodeRuntime,
    osRuntime,
    diskInfo,
    memInfo,
    cupInfo,
    currentLoadInfo,
  } = dataSource;
  return (
    <PageContainer>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <OsRuntime data={{ nodeRuntime, osRuntime }} />
        </Col>
        <Col span={12}>
          <Disk data={{ diskInfo }} />
        </Col>
        <Col span={12}>
          <Cpu data={{ cupInfo, currentLoadInfo }} />
        </Col>
        <Col span={12}>
          <Mem data={{ memInfo }} />
        </Col>
      </Row>
    </PageContainer>
  );
}

function OsRuntime({ data }: any) {
  const { osRuntime, nodeRuntime } = data;
  return (
    <>
      <Card title="运行系统">
        <Descriptions>
          <Descriptions.Item
            label="操作系统"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            <Tag>{osRuntime?.platform}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label="系统架构"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            <Tag>{osRuntime?.arch}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label="Node版本"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            <Tag>{nodeRuntime?.node}</Tag>
          </Descriptions.Item>
          <Descriptions.Item
            label="NPM版本"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            <Tag>{nodeRuntime?.npm}</Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}

function Disk({ data }) {
  const { diskInfo } = data;

  return (
    <>
      <Card title="磁盘">
        <Descriptions>
          <Descriptions.Item
            label="总空间"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getGB(diskInfo.size)} GB
          </Descriptions.Item>
          <Descriptions.Item
            label="已用空间"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getGB(diskInfo.used)} GB
          </Descriptions.Item>
          <Descriptions.Item
            label="可用空间"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getGB(diskInfo.available)} GB
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}

function Mem({ data }) {
  const { memInfo } = data;
  return (
    <>
      <Card title="内存">
        <Descriptions>
          <Descriptions.Item
            label="总空间"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getGB(memInfo.total)} GB
          </Descriptions.Item>
          <Descriptions.Item
            label="已用空间"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getGB(memInfo.total - memInfo.available)} GB
          </Descriptions.Item>
          <Descriptions.Item
            label="可用空间"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getGB(memInfo.available)} GB
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}

function Cpu({ data }) {
  const { cupInfo, currentLoadInfo } = data;

  return (
    <>
      <Card title="CPU">
        <Descriptions>
          <Descriptions.Item
            label="cpu 信息"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {cupInfo.brand}
          </Descriptions.Item>
          <Descriptions.Item
            label="负载"
            span={24}
            labelStyle={{ width: "50%" }}
          >
            {getPercent(
              currentLoadInfo.rawCurrentLoad /
                currentLoadInfo.rawCurrentLoadIdle,
            )}
          </Descriptions.Item>
          {currentLoadInfo.coresLoad.map((item: any, index: number) => {
            return (
              <Descriptions.Item
                label={`负载 ${index + 1}`}
                key={index}
                span={24}
                labelStyle={{ width: "50%" }}
              >
                {getPercent(item.rawLoad / item.rawLoadIdle)}
              </Descriptions.Item>
            );
          })}
        </Descriptions>
      </Card>
    </>
  );
}
