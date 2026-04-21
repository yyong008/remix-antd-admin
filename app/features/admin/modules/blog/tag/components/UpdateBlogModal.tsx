import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function UpdateBlogModal({ refetch, record }: any) {
  const [createBlogTag] = [(...args: any): any => {}];
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  return (
    <>
      <Button
        type={"link"}
        icon={<EditOutlined style={{ color: colorPrimary }} />}
        onClick={() => setOpen(true)}
      ></Button>
      <Modal
        title="修改标签"
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
            const result = await createBlogTag(values);
            if (result.data.code !== 0) {
              message.error(result.data.message);
              return false;
            }
            message.success(result.data.message);
            form.resetFields();
            setOpen(false);
            refetch();
            return true;
          }}
        >
          <ModalFormItems />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
