import {
  StepsForm,
  ProFormText,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormTextArea,
} from "@ant-design/pro-components";

export default function FormStepOne() {
  return (
    <StepsForm.StepForm<{
      name: string;
    }>
      name="base"
      title="创建实验"
      stepProps={{
        description: "这里填入的都是基本信息",
      }}
    >
      <ProFormText
        name="name"
        label="实验名称"
        width="md"
        tooltip="最长为 24 位，用于标定的唯一 id"
        placeholder="请输入名称"
        rules={[{ required: true }]}
      />
      <ProFormDatePicker name="date" label="日期" />
      <ProFormDateRangePicker name="dateTime" label="时间区间" />
      <ProFormTextArea
        name="remark"
        label="备注"
        width="lg"
        placeholder="请输入备注"
      />
    </StepsForm.StepForm>
  );
}
