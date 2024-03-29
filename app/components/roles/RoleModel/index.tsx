import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import * as _icons from "@ant-design/icons";
import { Button, Form, Tree, message } from "antd";
import { useEffect } from "react";

const { EditOutlined } = _icons;

export default function RoleModal({ trigger, record, menu }: any) {
  const [form] = Form.useForm<{ name: string; company: string }>();

  useEffect(() => {
    form.setFieldsValue(record);
  }, [form, record]);
  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
      title="编辑角色"
      trigger={trigger ?? <Button type="link" icon={<EditOutlined />} />}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log(""),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        message.success("提交成功");
        return true;
      }}
    >
      <ProFormText
        name="name"
        label="名字"
        // tooltip="最长为 24 位"
        placeholder="请输入名称"
      />
      <ProFormText name="description" label="描述" placeholder="请输入名称" />
      <ProForm.Item label="菜单">
        <Tree checkable treeData={menu} />
      </ProForm.Item>
    </ModalForm>
  );
}
