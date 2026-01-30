import { Descriptions, Tag } from "antd";

import { BlankLink } from "./blank-link";
import { ProCard } from "@ant-design/pro-components";

export const ProjectInfo = () => {
  const { pkg, lastBuildTime } = __APP_INFO__;
  return (
    <ProCard>
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
    </ProCard>
  );
};
