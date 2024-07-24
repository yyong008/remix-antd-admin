import {
  PageContainer,
  ProCard,
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

import { Button } from "antd";
import FormIsOpen from "./components/form-basic/formIs-open";

export function Route() {
  return (
    <ProForm
      submitter={false}
      {...{ labelCol: { span: 4, offset: 6 }, wrapperCol: { span: 14 } }}
    >
      <PageContainer
        title={false}
        content={
          <ProCard title="基础表单">
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
        <ProCard>
          <ProFormText label="标题" />
          <ProFormDateRangePicker label="起止日期" />
          <ProFormTextArea label="目标描述" />
          <ProFormTextArea label="衡量标准" />
          <ProFormText label="客户（选填）" tooltip="目标的服务对象" />
          <ProFormText label="邀评人（选填）" />
          <ProFormDigit label="权重（选填）" initialValue={15} />
          <FormIsOpen />
        </ProCard>
      </PageContainer>
    </ProForm>
  );
}
