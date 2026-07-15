import { Button, Form, Modal, message } from "antd";
import { useState } from "react";

import { useCreateBlogTag } from "~/api-client/queries/blog/blog-tag";
import { m } from "~/paraglide/messages";

import { ModalFormItems } from "./modal-form-items";

export function CreateBlogTagModal({
  refetch,
  trigger,
  open: externalOpen,
  setOpen: externalSetOpen,
}: {
  refetch?: () => void;
  trigger?: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;
  const [form] = Form.useForm();
  const { mutateAsync, isPending } = useCreateBlogTag();

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      {trigger ? (
        <span onClick={() => setOpen(true)}>{trigger}</span>
      ) : (
        <Button type="primary" onClick={() => setOpen(true)}>
          {m.blog_tag_submit_button()}
        </Button>
      )}
      <Modal
        title={m.blog_tag_create_title()}
        open={open}
        onCancel={handleClose}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={async (values) => {
            try {
              await mutateAsync(values);
              message.success(m.blog_tag_toast_created());
              refetch?.();
              form.resetFields();
              setOpen(false);
              return true;
            } catch (e) {
              message.error(e instanceof Error ? e.message : m.blog_tag_toast_failed());
              return false;
            }
          }}
        >
          <ModalFormItems />
          <Form.Item style={{ marginTop: 16 }}>
            <Button type="primary" htmlType="submit" loading={isPending}>
              {m.blog_tag_submit_button()}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
