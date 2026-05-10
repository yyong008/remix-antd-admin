import { Button, Form, Input, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function CreateCategoryNewsModal({ trigger }: any) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      {trigger ?? (
        <Button type={"primary"} icon={<EditOutlined />} onClick={() => setOpen(true)}>
          新建
        </Button>
      )}
      <Modal
        title="创建Link分类"
        open={open}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values: any) => {
            console.log(values);
            form.resetFields();
            setOpen(false);
            return true;
          }}
        >
          <Form.Item name="name" label="链接名" rules={[{ required: true, message: "请输入" }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item name="url" label="链接地址" rules={[{ required: true, message: "请输入" }]}>
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: false, message: "请输入" }]}
          >
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
              <Button onClick={() => setOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
