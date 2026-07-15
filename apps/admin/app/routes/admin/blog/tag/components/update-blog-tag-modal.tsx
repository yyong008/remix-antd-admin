import { Button, Form, Modal, message } from "antd";
import { useEffect } from "react";

import { useUpdateBlogTag } from "~/api-client/queries/blog/blog-tag";
import { m } from "~/paraglide/messages";

import { ModalFormItems } from "./modal-form-items";

export function UpdateBlogTagModal({
  record,
  refetch,
  open,
  onClose,
}: {
  record: { id: string; name?: string; description?: string | null };
  refetch?: () => void;
  open?: boolean;
  onClose?: () => void;
}) {
  const [form] = Form.useForm();
  const { mutateAsync, isPending } = useUpdateBlogTag();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(record);
    }
  }, [open, form, record]);

  const handleClose = () => {
    form.resetFields();
    onClose?.();
  };

  return (
    <Modal
      title={m.blog_tag_update_title()}
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
            await mutateAsync({ ...values, id: record.id });
            message.success(m.blog_tag_toast_updated());
            refetch?.();
            form.resetFields();
            handleClose();
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
  );
}
