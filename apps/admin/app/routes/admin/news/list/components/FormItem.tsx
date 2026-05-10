import { Form, Input } from "antd";

export function FormItems() {
  return (
    <>
      <Form.Item
        name="name"
        label="链接名"
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
        name="url"
        label="链接地址"
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
        label="描述"
        rules={[
          {
            required: false,
            message: "请输入",
          },
        ]}
      >
        <Input.TextArea placeholder="请输入" />
      </Form.Item>
    </>
  );
}
