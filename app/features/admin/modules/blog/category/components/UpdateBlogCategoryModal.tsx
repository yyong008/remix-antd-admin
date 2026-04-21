import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import { ModalFormItems } from "./ModalFormItems";
import { useColorPrimary } from "~/hooks/useColorPrimary";

export function UpdateBlogCategoryModal({ loading, trigger, title, record, refetch }: any) {
  const [form] = Form.useForm();
  const { colorPrimary } = useColorPrimary();
  const [update] = [(...args: any): any => {}];
  const [open, setOpen] = useState(false);
  return (
    <>
      {trigger ?? (
        <Button
          type={"link"}
          icon={<EditOutlined style={{ color: colorPrimary }} />}
          onClick={() => setOpen(true)}
        ></Button>
      )}
      <Modal
        title={title}
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
          onFinish={async (values) => {
            values.id = record.id;
            const result = await update(values).unwrap();
            if (result && result.code !== 0) {
              message.error(result.message);
              return false;
            }
            message.success(result.message);
            refetch?.();
            form.resetFields();
            setOpen(false);
            return true;
          }}
        >
          <ModalFormItems />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
