import { Button, Space } from "antd";
import { CManager, TManager, TTable } from "~/components/form/formAdvanced";
import { PageContainer, ProCard, ProForm } from "@ant-design/pro-components";

export function Component() {
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
