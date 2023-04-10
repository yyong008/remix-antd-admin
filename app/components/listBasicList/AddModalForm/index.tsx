import { PlusOutlined } from "@ant-design/icons";
import {
  ModalForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Button } from "antd";

const AddModalForm = function () {
  return (
    <ModalForm
      title="任务编辑"
      trigger={
        <Button icon={<PlusOutlined />} type="dashed" block>
          添加
        </Button>
      }
    >
      <ProFormText
        label="任务名称"
        placeholder="请输入"
        rules={[{ message: "输入任务名称", required: true }]}
      />
      <ProFormDatePicker
        label="请选择时间"
        placeholder="请选择"
        rules={[{ message: "输入任务名称", required: true }]}
        fieldProps={{
          showTime: true,
        }}
      />
      <ProFormSelect
        label="任务负责人"
        options={[
          { label: "小A", value: "a" },
          { label: "小B", value: "b" },
        ]}
        rules={[{ message: "输入任务名称", required: true }]}
      />
      <ProFormTextArea label="产品描述" placeholder="请输入不少于五个字" />
    </ModalForm>
  );
};

export default AddModalForm;
