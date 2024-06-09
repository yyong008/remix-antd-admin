import {
  ProFormCheckbox,
  ProFormSelect,
  StepsForm,
} from "@ant-design/pro-components";

export default function FormStepThree() {
  return (
    <StepsForm.StepForm
      name="time"
      title="发布实验"
      stepProps={{
        description: "这里填入发布判断",
      }}
    >
      <ProFormCheckbox.Group
        name="checkbox"
        label="部署单元"
        rules={[
          {
            required: true,
          },
        ]}
        options={["部署单元1", "部署单元2", "部署单元3"]}
      />
      <ProFormSelect
        label="部署分组策略"
        name="remark"
        rules={[
          {
            required: true,
          },
        ]}
        initialValue="1"
        options={[
          {
            value: "1",
            label: "策略一",
          },
          { value: "2", label: "策略二" },
        ]}
      />
      <ProFormSelect
        label="Pod 调度策略"
        name="remark2"
        initialValue="2"
        options={[
          {
            value: "1",
            label: "策略一",
          },
          { value: "2", label: "策略二" },
        ]}
      />
    </StepsForm.StepForm>
  );
}
