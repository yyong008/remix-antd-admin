// type
import type { V2_MetaFunction } from "@remix-run/node";

// components:vendor
import { Button, Space } from "antd";
import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";

// components
import { CManager, TManager, TTable } from "~/components/formAdvanced";
export const meta: V2_MetaFunction = () => {
  return [
    {
      title: "表单增强",
    },
  ];
};

export default function FormAdvance() {
  return (
    <ProForm submitter={false}>
      <PageContainer
        title={false}
        content={
          <ProCard title="表单增强">
            表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
          </ProCard>
        }
        footer={[
          <Button key="rest">重置</Button>,
          <Button key="submit" type="primary">
            提交
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <CManager />
          <TManager />
          <TTable />
        </Space>
      </PageContainer>
    </ProForm>
  );
}
