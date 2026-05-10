import { Form, Input } from "antd";

export function ModalFormItems() {
  return (
    <>
      <Form.Item
        name="name"
        label="标签名"
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
        label="标签描述"
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
