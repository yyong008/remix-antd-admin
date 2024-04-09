// type
import type { MetaFunction } from "@remix-run/node";

// components
import { Button, Space } from "antd";
import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";
import { CManager, TManager, TTable } from "~/components/form/formAdvanced";

// remix:meta
export const meta: MetaFunction = () => {
  return [{ title: "form-advanced-form" }];
};

export default function FormAdvanceRoute() {
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
