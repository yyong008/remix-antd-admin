import {
  StepsForm,
  ProFormCheckbox,
  ProForm,
  ProFormText,
  ProFormDatePicker,
} from "@ant-design/pro-components";

export default function FormStepTwo() {
  return (
    <StepsForm.StepForm<{
      checkbox: string;
    }>
      name="checkbox"
      title="设置参数"
      stepProps={{
        description: "这里填入运维参数",
      }}
      onFinish={async () => {
        return true;
      }}
    >
      <ProFormCheckbox.Group
        name="checkbox"
        label="迁移类型"
        width="lg"
        options={["结构迁移", "全量迁移", "增量迁移", "全量校验"]}
      />
      <ProForm.Group>
        <ProFormText name="dbname" label="业务 DB 用户名" />
        <ProFormDatePicker name="datetime" label="记录保存时间" width="sm" />
        <ProFormCheckbox.Group
          name="checkbox"
          label="迁移类型"
          options={["完整 LOB", "不同步 LOB", "受限制 LOB"]}
        />
      </ProForm.Group>
    </StepsForm.StepForm>
  );
}
