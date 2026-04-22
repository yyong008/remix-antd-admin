import { ProFormRadio, ProFormText, ProFormTextArea } from "~/components/pro-form-kit";

export function ModalFormItems() {
  return (
    <>
      <ProFormText
        name="name"
        label="参数名称"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="key"
        label="参数键名"
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
        label="参数键值"
        placeholder="请输入"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      />
      <ProFormText
        name="type"
        label="参数类型"
        placeholder="请输入"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      />
      <ProFormTextArea
        name="description"
        label="描述"
        placeholder="请输入"
        rules={[
          {
            required: false,
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
        initialValue={1}
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
