import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { useCreateBlogTag } from "~/api-client/queries/blog/blog-tag";
import { ModalFormItems } from "./ModalFormItems";

export function CreateBlogModal({
  refetch,
  open: externalOpen,
  setOpen: externalSetOpen,
  trigger,
}: {
  refetch?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  trigger?: React.ReactNode;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;
  const [form] = Form.useForm();
  const { mutateAsync: createBlogTag, isPending: loading } = useCreateBlogTag();
  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button type="primary" onClick={() => setOpen(true)}>
          新建
        </Button>
      )}
      <Modal
        title="创建标签"
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
          onFinish={async (values) => {
            try {
              await createBlogTag(values);
              message.success("创建成功");
              form.resetFields();
              setOpen(false);
              refetch?.();
              return true;
            } catch (e) {
              message.error(e instanceof Error ? e.message : "创建失败");
              return false;
            }
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
