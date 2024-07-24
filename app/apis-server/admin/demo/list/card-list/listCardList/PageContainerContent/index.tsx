/* eslint-disable jsx-a11y/anchor-is-valid */
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";

export default function PageContainerContent() {
  return (
    <ProCard>
      <Space direction="vertical">
        <h1>Card List</h1>
        <div>
          段落示意：蚂蚁金服务设计平台
          ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </div>
        <Space>
          <a>快速开始</a>
          <a>产品简介</a>
          <a>产品文档</a>
        </Space>
      </Space>
    </ProCard>
  );
}
