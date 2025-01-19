import { ProFormText, ProFormTextArea } from "@ant-design/pro-components";

export function ModalFormItems() {
  return (
    <>
      <ProFormText
        name="name"
        label="分类名"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="标签描述"
        placeholder="请输入"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
    </>
  );
}
