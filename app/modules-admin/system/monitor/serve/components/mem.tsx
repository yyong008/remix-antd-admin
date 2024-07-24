import { Card, Descriptions } from "antd";

import { getGB } from "../utils";

export function Mem({ data }: any) {
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
