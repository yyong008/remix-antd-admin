import { Button, Form, Input, Modal, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useParams } from "react-router";

export default function UpdateCategoryNewsModal({ trigger, record }: any) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();

  return (
    <>
      {trigger ?? (
        <Button type={"link"} icon={<EditOutlined />} onClick={() => setOpen(true)}></Button>
      )}
      <Modal
        title="修改Link分类"
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
          initialValues={record}
          onFinish={async (values: any) => {
            const vals = {
              ...values,
            };
            if (id) {
              vals.categoryId = Number(id);
            }
            console.log(vals);
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
                更新
              </Button>
              <Button onClick={() => setOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
