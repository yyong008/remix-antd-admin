import { Form, Input, Switch } from "antd";

export function ModalFormItems() {
  return (
    <>
      <Form.Item
        name="name"
        label="分类名"
        rules={[
          {
            required: true,
            message: "请输入",
          },
        ]}
      >
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="description"
        label="分类描述"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      >
        <Input.TextArea placeholder="请输入" />
      </Form.Item>
      <Form.Item
        name="showOnClient"
        label="在客户端展示"
        valuePropName="checked"
        initialValue={true}
      >
        <Switch checkedChildren="展示" unCheckedChildren="隐藏" />
      </Form.Item>
    </>
  );
}
