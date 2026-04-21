import { Card, Descriptions, Tag } from "antd";

import { BlankLink } from "./blank-link";

export const ProjectInfo = () => {
  const { pkg, lastBuildTime } = __APP_INFO__;
  return (
    <Card>
      <Descriptions title="项目信息" column={2} bordered>
        <Descriptions.Item label="版本">
          <Tag color="processing">{pkg.version}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="最后编译时间">
          <Tag color="processing">{lastBuildTime}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="GitHub">
          <BlankLink url={pkg.repository.url} text="GitHub" />
        </Descriptions.Item>
        <Descriptions.Item label="预览地址">
          <BlankLink url={pkg.homepage} text="预览地址" />
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
