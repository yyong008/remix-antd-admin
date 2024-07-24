import {
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";

export function ModalFormItems() {
  return (
    <>
      <ProFormText
        name="key"
        label="字典名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="value"
        label="字典编码"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        name="remark"
        label="备注"
        placeholder="请输入"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormRadio.Group
        name="status"
        label="状态"
        options={[
          {
            label: "启用",
            value: 1,
          },
          {
            label: "禁用",
            value: 0,
          },
        ]}
      />
    </>
  );
}
